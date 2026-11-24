import { useEffect } from 'react';

// Referências globais para garantir que apenas uma rolagem rode por vez
let activeRafId = null;
let cleanupInterrupts = null;
let restoreScrollStyles = null;

/**
 * Curva de desaceleração suave (easeInOutQuart):
 * começa macia, ganha fluidez no meio e freia sem tranco ao chegar na seção.
 */
function easeInOutQuart(t) {
  return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
}

/**
 * Verifica se o container rolável é a janela/documento principal.
 */
function isRootScroller(el) {
  return (
    !el ||
    el === document.scrollingElement ||
    el === document.documentElement ||
    el === document.body
  );
}

/**
 * Descobre qual elemento realmente possui a barra de rolagem
 * (suporta tanto a página normal quanto wrappers com overflow-y: auto).
 */
function getScrollContainer(targetEl) {
  if (typeof window === 'undefined') return null;

  let current = targetEl ? targetEl.parentElement : null;
  while (
    current &&
    current !== document.body &&
    current !== document.documentElement
  ) {
    const style = window.getComputedStyle(current);
    const overflowY = style.overflowY;
    const isScrollable =
      (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') &&
      current.scrollHeight > current.clientHeight + 2;

    if (isScrollable) {
      return current;
    }
    current = current.parentElement;
  }

  return document.scrollingElement || document.documentElement;
}

function getScrollTop(container) {
  if (isRootScroller(container)) {
    return (
      window.scrollY ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0
    );
  }
  return container.scrollTop;
}

function getMaxScroll(container) {
  if (isRootScroller(container)) {
    const doc = document.scrollingElement || document.documentElement;
    return Math.max(0, doc.scrollHeight - window.innerHeight);
  }
  return Math.max(0, container.scrollHeight - container.clientHeight);
}

/**
 * Restaura o scroll-behavior original e cancela qualquer animação em andamento.
 */
function stopSmoothScroll() {
  if (activeRafId !== null) {
    window.cancelAnimationFrame(activeRafId);
    activeRafId = null;
  }

  if (cleanupInterrupts) {
    cleanupInterrupts();
    cleanupInterrupts = null;
  }

  if (restoreScrollStyles) {
    restoreScrollStyles();
    restoreScrollStyles = null;
  }
}

/**
 * Move o scroll instantaneamente no frame atual sem interferência do CSS nativo.
 */
function setScrollPosition(container, y) {
  if (isRootScroller(container)) {
    try {
      window.scrollTo({ top: y, left: 0, behavior: 'instant' });
    } catch {
      window.scrollTo(0, y);
    }
    document.documentElement.scrollTop = y;
    document.body.scrollTop = y;
  } else {
    container.scrollTop = y;
  }
}

/**
 * Desativa temporariamente `scroll-behavior: smooth` com !important para que o
 * navegador não trave nem dispute com o loop de 60fps do requestAnimationFrame.
 */
function disableNativeSmoothScroll(container) {
  const elements = Array.from(
    new Set([document.documentElement, document.body, container].filter(Boolean))
  );

  const saved = elements.map((el) => ({
    el,
    value: el.style.getPropertyValue('scroll-behavior'),
    priority: el.style.getPropertyPriority('scroll-behavior'),
  }));

  elements.forEach((el) => {
    el.style.setProperty('scroll-behavior', 'auto', 'important');
  });

  return () => {
    saved.forEach(({ el, value, priority }) => {
      if (value) {
        el.style.setProperty('scroll-behavior', value, priority);
      } else {
        el.style.removeProperty('scroll-behavior');
      }
    });
  };
}

/**
 * Executa a rolagem suave até um ID de seção ou até o topo.
 *
 * @param {string} targetId - ID do elemento (com ou sem '#'). Use 'topo' para voltar ao início.
 * @param {Object} [options]
 * @param {number} [options.offset=72] - Altura do seu header fixo em px para não cobrir o título.
 * @param {number} [options.duration=900] - Duração base da descida em milissegundos.
 * @param {boolean} [options.respectReducedMotion=false] - Se true, desativa a animação quando o SO estiver com animações desligadas.
 */
export function scrollSuavePara(
  targetId,
  { offset = 72, duration = 900, respectReducedMotion = false } = {}
) {
  if (typeof window === 'undefined') return;

  const cleanId = String(targetId || '').replace(/^\/?#/, '');
  const targetEl = cleanId ? document.getElementById(cleanId) : null;

  if (cleanId && cleanId !== 'topo' && !targetEl) return;

  const scrollContainer = getScrollContainer(targetEl);
  const startY = getScrollTop(scrollContainer);
  let targetY = 0;

  if (cleanId && cleanId !== 'topo' && targetEl) {
    const rect = targetEl.getBoundingClientRect();
    const containerTop = isRootScroller(scrollContainer)
      ? 0
      : scrollContainer.getBoundingClientRect().top;
    const rawTargetY = rect.top - containerTop + startY - offset;
    targetY = Math.max(0, Math.min(rawTargetY, getMaxScroll(scrollContainer)));
  }

  stopSmoothScroll();

  const distance = targetY - startY;
  const absDistance = Math.abs(distance);

  const prefersReducedMotion =
    respectReducedMotion &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || absDistance < 2) {
    restoreScrollStyles = disableNativeSmoothScroll(scrollContainer);
    setScrollPosition(scrollContainer, targetY);
    stopSmoothScroll();
    return;
  }

  restoreScrollStyles = disableNativeSmoothScroll(scrollContainer);

  // Ajusta levemente o tempo pela distância para ficar sempre fluido
  const adaptiveDuration = Math.round(
    Math.min(duration + 300, Math.max(550, duration * 0.75 + absDistance * 0.14))
  );
  const startTime = performance.now();

  // Se o usuário girar a rodinha do mouse, tocar na tela ou apertar setas, cancela na hora
  const handleUserInterrupt = () => stopSmoothScroll();
  const handleKeyInterrupt = (event) => {
    if (
      ['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', ' ', 'Home', 'End'].includes(
        event.key
      )
    ) {
      stopSmoothScroll();
    }
  };

  window.addEventListener('wheel', handleUserInterrupt, { passive: true });
  window.addEventListener('touchstart', handleUserInterrupt, { passive: true });
  window.addEventListener('keydown', handleKeyInterrupt, { passive: true });

  cleanupInterrupts = () => {
    window.removeEventListener('wheel', handleUserInterrupt);
    window.removeEventListener('touchstart', handleUserInterrupt);
    window.removeEventListener('keydown', handleKeyInterrupt);
  };

  const animateFrame = (now) => {
    const elapsed = now - startTime;
    const progress = Math.min(1, elapsed / adaptiveDuration);
    const eased = easeInOutQuart(progress);

    setScrollPosition(scrollContainer, startY + distance * eased);

    if (progress < 1) {
      activeRafId = window.requestAnimationFrame(animateFrame);
    } else {
      setScrollPosition(scrollContainer, targetY);
      stopSmoothScroll();
    }
  };

  activeRafId = window.requestAnimationFrame(animateFrame);
}

export default function SmoothScroll({
  offset = 72,
  duration = 900,
  respectReducedMotion = false,
  selector = 'a[href^="#"], a[href^="/#"], [data-scroll-to]',
}) {
  useEffect(() => {
    const handleDocumentClick = (event) => {
      // Ignora cliques com teclas modificadoras (abrir em nova aba, etc.)
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const trigger = event.target?.closest?.(selector);
      if (!trigger) return;

      const dataTarget = trigger.getAttribute('data-scroll-to');
      const href = trigger.getAttribute('href');
      const rawTarget = dataTarget || href;

      if (!rawTarget || rawTarget === '#' || rawTarget === '/#') return;

      const id = rawTarget.replace(/^\/?#/, '');
      if (id !== 'topo' && !document.getElementById(id)) return;

      event.preventDefault();
      scrollSuavePara(id, { offset, duration, respectReducedMotion });

      // Atualiza a URL sem dar o pulo seco padrão do navegador
      if (href && href.includes('#')) {
        try {
          window.history.replaceState(null, '', `#${id}`);
        } catch {
          // Ignora caso o ambiente sandbox bloqueie history.replaceState
        }
      }
    };

    // capture: true garante interceptação ANTES do pulo padrão ou handlers conflitantes
    document.addEventListener('click', handleDocumentClick, true);

    return () => {
      document.removeEventListener('click', handleDocumentClick, true);
      stopSmoothScroll();
    };
  }, [offset, duration, respectReducedMotion, selector]);

  return null;
}