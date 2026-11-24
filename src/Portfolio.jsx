import { scrollSuavePara } from './NavGuiasAnimadas';
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  ArrowUpRight,
  ArrowDown,
  ArrowUp,
  X,
  Check,
  Copy,
  Menu,
  Plus,
  RotateCcw,
  Wifi,
  WifiOff,
  AlertTriangle,
  ExternalLink,
  Send,
  Layers,
  Terminal,
  ShieldCheck,
} from 'lucide-react';

// ============================================================================
// CONFIGURAÇÕES GLOBAIS & DADOS DO PORTFÓLIO (rcp.dev)
// ============================================================================

const WHATSAPP_NUMBER = '5511943094993';

const CATEGORIES = [
  { id: 'TODOS', label: 'TODOS' },
  { id: 'SITES', label: 'SITES' },
  { id: 'LINKTREES', label: 'LINKTREES' },
  { id: 'APPS', label: 'APPS' },
  { id: 'SOFTWARES', label: 'SOFTWARES & PDV' },
];

const PROJECTS = [
  {
    id: 'caixapro-pdv',
    index: '01',
    title: 'CaixaPro PDV',
    subtitle: 'Frente de Caixa & Controle de Estoque',
    category: 'SOFTWARES',
    categoryLabel: 'SOFTWARES & PDV',
    briefingType: 'Software / PDV',
    recommendedModules: ['Login & Banco de Dados', 'Painel Administrativo', 'Controle de Estoque / Caixa'],
    year: '2026',
    role: 'Arquitetura Full-Stack & UI',
    architecture: 'SPA Reativa + API C# + PostgreSQL/Supabase',
    summary:
      'Sistema comercial de ponto de venda projetado para operação contínua no balcão, com leitura rápida de itens, baixa automática de estoque e fechamento de caixa sem travamentos.',
    challenge:
      'Comércios locais perdem tempo em horários de pico com sistemas legados lentos, telas poluídas e quedas de conexão que travam o atendimento no caixa.',
    solution:
      'Interface minimalista orientada a atalhos de teclado e toque rápido, estado otimista para registro instantâneo de vendas, sincronização em tempo real via Supabase e retaguarda em C# para emissão e auditoria fiscal.',
    metrics: [
      { label: 'Tempo médio por venda', value: '6.4s' },
      { label: 'Disponibilidade operacional', value: '99.9%' },
      { label: 'Redução de divergência de caixa', value: '-84%' },
    ],
    stack: ['React', 'C#', 'Supabase'],
    previewType: 'pos',
  },
  {
    id: 'studio-ink-bio',
    index: '02',
    title: 'Studio Ink — Bio Interativa',
    subtitle: 'Hub Editorial & Pré-Agendamento',
    category: 'LINKTREES',
    categoryLabel: 'LINKTREES',
    briefingType: 'Linktree Interativo',
    recommendedModules: ['Design 100% Sob Medida', 'Animações Avançadas', 'Integração WhatsApp'],
    year: '2026',
    role: 'Design de Interface & Front-End',
    architecture: 'Web App Leve + Firebase Analytics',
    summary:
      'Linktree sob medida de alto contraste para estúdio de tatuagem. O cliente escolhe o estilo desejado direto na bio e inicia a conversa já com o contexto estruturado.',
    challenge:
      'Links genéricos de agregadores gratuitos não transmitiam o nível artístico do estúdio e geravam dezenas de mensagens rasas do tipo "quanto custa?" sem referência de estilo.',
    solution:
      'Experiência mobile-first construída do zero com seletor tátil de estilos (Fineline, Blackwork, Realismo), micro-interações instantâneas e geração dinâmica de link do WhatsApp com briefing pré-preenchido.',
    metrics: [
      { label: 'Taxa de clique para agendamento', value: '+62%' },
      { label: 'Carregamento inicial (4G)', value: '0.4s' },
      { label: 'Leads já qualificados no 1º contato', value: '88%' },
    ],
    stack: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
    previewType: 'tattoo-linktree',
  },
  {
    id: 'construtora-reformas',
    index: '03',
    title: 'Construtora & Reformas',
    subtitle: 'Landing Page Editorial de Alta Conversão',
    category: 'SITES',
    categoryLabel: 'SITES',
    briefingType: 'Site / Landing Page',
    recommendedModules: ['Design 100% Sob Medida', 'Animações Avançadas', 'Integração WhatsApp'],
    year: '2025',
    role: 'UI Engineering & Conversão',
    architecture: 'React SPA + Tailwind + WhatsApp API',
    summary:
      'Site institucional e página de captação para empreiteira e engenharia civil, com seletor interativo de escopo de obra, prazos transparentes e orçamento direto.',
    challenge:
      'A empresa dependia apenas de indicação boca a boca e precisava de presença digital sólida que passasse confiança técnica para fechar contratos de ticket médio alto.',
    solution:
      'Layout arquitetural limpo, grid de especificações de obra com alternância interativa por perfil de cliente (Residencial, Comercial, Alto Padrão) e fluxo de orçamento direto sem formulários cansativos.',
    metrics: [
      { label: 'Performance Lighthouse', value: '99/100' },
      { label: 'Aumento em pedidos de visita técnica', value: '3.1x' },
      { label: 'Tempo médio na página', value: '2m 40s' },
    ],
    stack: ['React', 'Tailwind', 'WhatsApp API'],
    previewType: 'construction-site',
  },
  {
    id: 'rotaexpress-app',
    index: '04',
    title: 'RotaExpress',
    subtitle: 'App Mobile de Entregas & Finanças Diárias',
    category: 'APPS',
    categoryLabel: 'APPS',
    briefingType: 'Aplicativo Mobile',
    recommendedModules: ['Login & Banco de Dados', 'Painel Administrativo'],
    year: '2025',
    role: 'Desenvolvimento Mobile & Integração',
    architecture: 'Flutter + Firebase Auth/Firestore + REST',
    summary:
      'Aplicativo mobile para entregadores autônomos e pequenas frotas acompanharem corridas, status de disponibilidade e fechamento financeiro líquido em tempo real.',
    challenge:
      'Entregadores controlavam ganhos, taxas e combustível em planilhas soltas ou cadernos, sem visão clara do lucro real por turno.',
    solution:
      'Aplicação mobile nativa compilada em Flutter com alternância de turno em um toque, registro rápido de corridas, cálculo automático de metas diárias e persistência offline-first no Firebase.',
    metrics: [
      { label: 'Fluidez de navegação', value: '60 fps' },
      { label: 'Registro de entrega em', value: '2 toques' },
      { label: 'Sincronização offline', value: '100%' },
    ],
    stack: ['Flutter', 'Firebase', 'REST API'],
    previewType: 'delivery-app',
  },
  {
    id: 'atelie-estetica-bio',
    index: '05',
    title: 'Ateliê Estética',
    subtitle: 'Linktree Editorial & Montador de Orçamento',
    category: 'LINKTREES',
    categoryLabel: 'LINKTREES',
    briefingType: 'Linktree Interativo',
    recommendedModules: ['Design 100% Sob Medida', 'Animações Avançadas', 'Integração WhatsApp'],
    year: '2026',
    role: 'Front-End & Direção Interativa',
    architecture: 'React + CSS Motion Architecture',
    summary:
      'Página de bio minimalista com seletor de procedimentos estéticos que monta automaticamente a mensagem de agendamento personalizada para a recepção.',
    challenge:
      'A clínica recebia alto volume de cliques vindos do Instagram, mas perdia clientes durante a troca demorada de mensagens para explicar serviços básicos.',
    solution:
      'Micro-experiência elegante com seleção interativa de protocolos, visualização imediata da duração e mensagem pronta enviada em um toque para o atendimento.',
    metrics: [
      { label: 'Conversão bio → WhatsApp', value: '+47%' },
      { label: 'Tempo de triagem na recepção', value: '-55%' },
      { label: 'Peso total da página', value: '< 120kb' },
    ],
    stack: ['React', 'CSS Animations'],
    previewType: 'aesthetics-linktree',
  },
  {
    id: 'gestaostock-erp',
    index: '06',
    title: 'GestãoStock Cloud',
    subtitle: 'Painel ERP, Fluxo de Caixa & Alertas',
    category: 'SOFTWARES',
    categoryLabel: 'SOFTWARES & PDV',
    briefingType: 'Software / PDV',
    recommendedModules: ['Login & Banco de Dados', 'Painel Administrativo', 'Controle de Estoque / Caixa'],
    year: '2026',
    role: 'Arquitetura Front-End & Banco de Dados',
    architecture: 'React + Supabase Realtime + PostgreSQL',
    summary:
      'Painel gerencial em nuvem para acompanhar faturamento diário, abertura e fechamento de turnos de caixa e alertas críticos de reposição de mercadoria.',
    challenge:
      'Gestores precisavam consolidar vendas de múltiplos caixas e identificar produtos próximos da ruptura antes do fim de semana sem depender de relatórios manuais.',
    solution:
      'Dashboard analítico com gráficos vetoriais responsivos, assinatura em tempo real no PostgreSQL via Supabase e alertas imediatos de estoque mínimo com nível de criticidade.',
    metrics: [
      { label: 'Atualização de dados', value: 'Realtime' },
      { label: 'Prevenção de ruptura de estoque', value: '+73%' },
      { label: 'Consultas SQL otimizadas', value: '< 45ms' },
    ],
    stack: ['React', 'Supabase', 'PostgreSQL'],
    previewType: 'erp-dashboard',
  },
];

const PROCESS_STEPS = [
  {
    number: '01',
    tag: 'ARQUITETURA & PERFORMANCE',
    title: 'Código limpo, rápido e previsível.',
    description:
      'Cada projeto nasce com estrutura modular, bundle enxuto e semântica rigorosa. Carregamento imediato em redes móveis, animações aceleradas por GPU e zero peso morto de bibliotecas desnecessárias.',
    specs: ['Tempo de carregamento < 1s', 'Arquitetura de componentes escalável', 'SEO técnico & acessibilidade'],
  },
  {
    number: '02',
    tag: 'DESIGN & MICRO-INTERAÇÕES',
    title: 'Identidade própria com movimento intencional.',
    description:
      'Nenhuma página parece um modelo pronto. Tipografia bem resolvida, hierarquia de contraste afiada e micro-interações táteis que guiam a atenção do usuário sem poluir a navegação.',
    specs: ['Direção de arte sob medida', 'Transições fluidas a 60fps', 'Responsividade real mobile-first'],
  },
  {
    number: '03',
    tag: 'SISTEMAS REAIS & DADOS',
    title: 'Engenharia preparada para operação diária.',
    description:
      'De autenticação segura com Firebase a bancos relacionais e storage em nuvem no Supabase. Fluxos tolerantes a falhas pensados para quem usa o software no balcão, na rua ou no escritório.',
    specs: ['Auth, Realtime & PostgreSQL', 'Confiabilidade para PDV e caixa', 'Integrações via REST & Webhooks'],
  },
  {
    number: '04',
    tag: 'FOCO EM CONVERSÃO',
    title: 'Estética a serviço do faturamento.',
    description:
      'Interface bonita que não gera resultado é apenas decoração. Estruturo jornadas curtas para transformar visitas em mensagens qualificadas no WhatsApp, agendamentos e rotinas operacionais mais ágeis.',
    specs: ['CTAs estratégicos & rastreáveis', 'Fluxos sem atrito para o cliente', 'Métricas claras de negócio'],
  },
];

const CAPABILITIES = [
  { id: 'ALL', label: 'Visão Geral' },
  { id: 'SITES', label: 'Sites & Landing Pages' },
  { id: 'LINKTREES', label: 'Linktrees Interativos' },
  { id: 'APPS', label: 'Aplicativos Mobile' },
  { id: 'SOFTWARES', label: 'Softwares & PDV' },
];

const TECH_MATRIX = [
  {
    code: 'T-01',
    name: 'React',
    role: 'Interface & SPA',
    detail: 'Interfaces reativas, dashboards gerenciais, frentes de caixa web e landing pages modulares.',
    capabilities: ['SITES', 'LINKTREES', 'SOFTWARES'],
  },
  {
    code: 'T-02',
    name: 'JavaScript / ES6+',
    role: 'Lógica & Interatividade',
    detail: 'Micro-interações de alta precisão, manipulação assíncrona de dados e regras de negócio.',
    capabilities: ['SITES', 'LINKTREES', 'SOFTWARES'],
  },
  {
    code: 'T-03',
    name: 'Flutter',
    role: 'Apps Nativos iOS/Android',
    detail: 'Aplicativos mobile fluidos com base de código unificada, performance nativa e suporte offline.',
    capabilities: ['APPS'],
  },
  {
    code: 'T-04',
    name: 'C#',
    role: 'Sistemas Desktop / Backend',
    detail: 'APIs robustas, módulos de PDV, retaguarda comercial e integrações de alta confiabilidade.',
    capabilities: ['SOFTWARES'],
  },
  {
    code: 'T-05',
    name: 'HTML5 / CSS3',
    role: 'Semântica & Motion',
    detail: 'Arquitetura visual responsiva, grids editoriais, animações GPU e páginas ultra leves.',
    capabilities: ['SITES', 'LINKTREES'],
  },
  {
    code: 'T-06',
    name: 'Firebase',
    role: 'Auth & Realtime',
    detail: 'Autenticação segura, banco NoSQL em tempo real, hospedagem rápida e telemetria de uso.',
    capabilities: ['LINKTREES', 'APPS', 'SITES'],
  },
  {
    code: 'T-07',
    name: 'Supabase',
    role: 'Storage & PostgreSQL',
    detail: 'Banco relacional estruturado para estoque, vendas, permissões por nível de acesso e backups.',
    capabilities: ['SOFTWARES', 'APPS', 'SITES'],
  },
  {
    code: 'T-08',
    name: 'Git / Deploy CI',
    role: 'Versionamento & Entrega',
    detail: 'Fluxo profissional de commits, ambientes de homologação e publicação contínua sem downtime.',
    capabilities: ['SITES', 'LINKTREES', 'APPS', 'SOFTWARES'],
  },
];

const BRIEFING_TYPES = [
  { id: 'Site / Landing Page', baseComplexity: 1, baseDays: [7, 14] },
  { id: 'Linktree Interativo', baseComplexity: 1, baseDays: [3, 6] },
  { id: 'Aplicativo Mobile', baseComplexity: 3, baseDays: [25, 45] },
  { id: 'Software / PDV', baseComplexity: 3, baseDays: [20, 40] },
];

const BRIEFING_MODULES = [
  { id: 'Design 100% Sob Medida', weight: 1 },
  { id: 'Animações Avançadas', weight: 1 },
  { id: 'Login & Banco de Dados', weight: 2 },
  { id: 'Painel Administrativo', weight: 2 },
  { id: 'Integração WhatsApp', weight: 1 },
  { id: 'Controle de Estoque / Caixa', weight: 2 },
];

// ============================================================================
// HOOKS UTILITÁRIOS
// ============================================================================

/**
 * Monitora o progresso de rolagem da página (0 a 100) usando requestAnimationFrame.
 */
function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let rafId = null;

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const ratio = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setProgress(ratio);
      rafId = null;
    };

    const handleScroll = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return progress;
}

/**
 * Relógio em tempo real no fuso de Brasília (BRT - America/Sao_Paulo).
 */
function useBRTClock() {
  const formatTime = () => {
    try {
      return new Intl.DateTimeFormat('pt-BR', {
        timeZone: 'America/Sao_Paulo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(new Date());
    } catch {
      const now = new Date();
      return now.toTimeString().slice(0, 8);
    }
  };

  const [time, setTime] = useState(formatTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}

/**
 * Observer de entrada na viewport com fallback seguro para que nenhum conteúdo fique oculto.
 */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);

    // Fallback de segurança caso o elemento esteja acima do fold em telas específicas
    const safetyTimer = setTimeout(() => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 1.1) {
        setIsVisible(true);
      }
    }, 600);

    return () => {
      observer.disconnect();
      clearTimeout(safetyTimer);
    };
  }, [threshold]);

  return [ref, isVisible];
}

// ============================================================================
// COMPONENTES DE INTERAÇÃO & INFRAESTRUTURA VISUAL
// ============================================================================

/**
 * Cursor magnético customizado para dispositivos desktop (pointer: fine).
 * Desabilitado automaticamente em telas touch.
 */
function MagneticCursor() {
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState('');
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const targetRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    setEnabled(true);

    let rafId;

    const onMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      const targetEl = e.target.closest('[data-cursor], a, button');
      if (targetEl) {
        const customLabel = targetEl.getAttribute('data-cursor');
        if (customLabel) {
          setLabel(customLabel);
          setIsHovering(true);
        } else {
          setLabel('');
          setIsHovering(true);
        }
      } else {
        setLabel('');
        setIsHovering(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    const animate = () => {
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.18;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetRef.current.x}px, ${targetRef.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (!enabled) return null;

  return (
    <>
      {/* Halo / Pill contextual */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[90] flex items-center justify-center rounded-full transition-[width,height,background-color,border-color,opacity] duration-200 ease-out ${
          !isVisible ? 'opacity-0' : 'opacity-100'
        } ${
          label
            ? 'h-9 min-w-[92px] border border-[#FF4800] bg-[#FF4800] px-3.5 text-[#09090B]'
            : isHovering
            ? 'h-10 w-10 border border-[#FF4800]/80 bg-[#FF4800]/10'
            : 'h-7 w-7 border border-[#F3F1EC]/25 bg-transparent'
        }`}
      >
        {label && (
          <span className="font-mono text-[10px] font-semibold tracking-[0.12em] uppercase whitespace-nowrap">
            {label}
          </span>
        )}
      </div>

      {/* Ponto central de precisão */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[91] h-1.5 w-1.5 rounded-full bg-[#FF4800] transition-opacity duration-150 ${
          !isVisible || label ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </>
  );
}

/**
 * Botão com sutil atração magnética em desktop (pointer: fine).
 */
function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  target,
  rel,
  type = 'button',
  cursorLabel,
  strength = 0.22,
  ariaLabel,
}) {
  const ref = useRef(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    setOffset({ x: dx * strength, y: dy * strength });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  const style = {
    transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
    transition: offset.x === 0 && offset.y === 0 ? 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)' : 'transform 0.08s linear',
  };

  const commonProps = {
    ref,
    style,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className,
    'data-cursor': cursorLabel,
    'aria-label': ariaLabel,
  };

  if (href) {
    return (
      <a href={href} target={target} rel={rel} onClick={onClick} {...commonProps}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} {...commonProps}>
      {children}
    </button>
  );
}

/**
 * Canvas de engenharia leve (60fps) no fundo do Hero.
 * Desenha uma malha técnica de pontos e cruzes arquiteturais que reagem sutilmente ao cursor.
 */
function EngineeringGridCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const mouse = { x: -9999, y: -9999, active: false };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.clientWidth;
      height = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const spacing = width < 640 ? 40 : 48;
      const influenceRadius = 150;

      // Linhas sutis de referência arquitetural
      ctx.strokeStyle = 'rgba(243, 241, 236, 0.028)';
      ctx.lineWidth = 1;

      for (let x = spacing; x < width; x += spacing * 3) {
        ctx.beginPath();
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, height);
        ctx.stroke();
      }

      // Grade de pontos interativos
      for (let y = spacing; y < height; y += spacing) {
        for (let x = spacing; x < width; x += spacing) {
          let drawX = x;
          let drawY = y;
          let alpha = 0.14;
          let isAccent = false;

          if (mouse.active) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < influenceRadius && dist > 0.01) {
              const factor = 1 - dist / influenceRadius;
              const push = factor * 7;
              drawX += (dx / dist) * push;
              drawY += (dy / dist) * push;
              alpha = 0.16 + factor * 0.65;
              if (factor > 0.45) isAccent = true;
            }
          }

          ctx.fillStyle = isAccent
            ? `rgba(255, 72, 0, ${alpha})`
            : `rgba(243, 241, 236, ${alpha})`;

          const size = isAccent ? 2.2 : 1.3;
          ctx.fillRect(drawX - size / 2, drawY - size / 2, size, size);
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

// ============================================================================
// DEMOS INTERATIVAS CODIFICADAS PARA CADA PROJETO (ZERO IMAGENS GENÉRICAS)
// ============================================================================

/**
 * Demo 01: CaixaPro PDV — Mini terminal interativo que soma itens reais no subtotal.
 */
function PosMiniDemo({ expanded = false }) {
  const catalog = [
    { id: 1, code: '001', name: 'Café Expresso', price: 8.5 },
    { id: 2, code: '002', name: 'Pão na Chapa', price: 9.0 },
    { id: 3, code: '003', name: 'Suco Natural', price: 12.0 },
    { id: 4, code: '004', name: 'Combo Manhã', price: 22.5 },
  ];

  const [cart, setCart] = useState([
    { id: 1, name: 'Café Expresso', price: 8.5, qty: 1 },
    { id: 4, name: 'Combo Manhã', price: 22.5, qty: 1 },
  ]);
  const [saleConfirmed, setSaleConfirmed] = useState(false);

  const addItem = (e, item) => {
    e.stopPropagation();
    setSaleConfirmed(false);
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const resetCart = (e) => {
    e.stopPropagation();
    setCart([]);
    setSaleConfirmed(false);
  };

  const finalizeSale = (e) => {
    e.stopPropagation();
    if (cart.length === 0) return;
    setSaleConfirmed(true);
    setTimeout(() => {
      setCart([]);
      setSaleConfirmed(false);
    }, 1500);
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const itemCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`flex h-full w-full flex-col justify-between bg-[#0C0C0F] p-3.5 font-mono text-[11px] text-[#F3F1EC] select-none ${
        expanded ? 'p-5 text-xs' : ''
      }`}
    >
      {/* Top Bar do Terminal */}
      <div className="mb-2.5 flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
          <span className="tracking-wider text-[#F3F1EC]/90">CAIXA 01 • ABERTO</span>
        </div>
        <span className="text-[10px] text-[#84848D]">OPERADOR: R.P</span>
      </div>

      {/* Área Principal: Catálogo clicável + Cupom */}
      <div className="grid flex-1 grid-cols-12 gap-2.5">
        <div className="col-span-7 flex flex-col gap-1.5">
          <div className="text-[9px] uppercase tracking-[0.14em] text-[#84848D]">
            Toque para lançar item
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {catalog.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={(e) => addItem(e, item)}
                className="group flex flex-col justify-between border border-white/10 bg-[#141418] p-2 text-left transition-colors hover:border-[#FF4800] hover:bg-[#1A1A20] active:scale-[0.98]"
              >
                <div className="flex items-center justify-between text-[9px] text-[#84848D]">
                  <span>#{item.code}</span>
                  <Plus className="h-2.5 w-2.5 text-[#FF4800] opacity-70 group-hover:opacity-100" />
                </div>
                <span className="mt-1 truncate font-sans text-[11px] font-medium text-[#F3F1EC]">
                  {item.name}
                </span>
                <span className="mt-0.5 text-[10px] text-[#FF4800]">
                  R$ {item.price.toFixed(2).replace('.', ',')}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Cupom em Tempo Real */}
        <div className="col-span-5 flex flex-col justify-between border border-white/10 bg-[#111114] p-2.5">
          <div>
            <div className="mb-1.5 flex items-center justify-between border-b border-white/10 pb-1 text-[9px] text-[#84848D]">
              <span>CUPOM ({itemCount})</span>
              <button
                type="button"
                onClick={resetCart}
                title="Limpar cupom"
                className="text-[#84848D] transition-colors hover:text-[#F3F1EC]"
              >
                <RotateCcw className="h-3 w-3" />
              </button>
            </div>
            <div className="max-h-[76px] space-y-1 overflow-y-auto pr-0.5">
              {saleConfirmed ? (
                <div className="py-3 text-center text-[10px] text-[#22C55E]">
                  VENDA REGISTRADA
                </div>
              ) : cart.length === 0 ? (
                <div className="py-3 text-center text-[10px] text-[#84848D]">
                  Caixa livre
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-[10px]">
                    <span className="truncate pr-1 text-[#F3F1EC]/85">
                      {item.qty}x {item.name.split(' ')[0]}
                    </span>
                    <span className="shrink-0 text-[#84848D]">
                      {(item.price * item.qty).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-2 border-t border-white/10 pt-2">
            <div className="flex items-baseline justify-between">
              <span className="text-[9px] text-[#84848D]">TOTAL</span>
              <span className="text-xs font-semibold text-[#F3F1EC]">
                R$ {total.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <button
              type="button"
              onClick={finalizeSale}
              className="mt-1.5 w-full bg-[#FF4800] py-1 text-center text-[10px] font-semibold tracking-wider text-[#09090B] transition-colors hover:bg-[#FF6424]"
            >
              {saleConfirmed ? 'OK ✓' : 'FINALIZAR [F2]'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Demo 02: Studio Ink — Linktree Interativo para Estúdio de Tatuagem.
 */
function TattooLinktreeDemo({ expanded = false }) {
  const styles = ['Fineline', 'Blackwork', 'Realismo'];
  const [selected, setSelected] = useState('Blackwork');

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex h-full w-full items-center justify-center bg-[#0C0C0F] p-3.5 select-none"
    >
      {/* Moldura Mobile */}
      <div
        className={`flex w-full ${
          expanded ? 'max-w-[300px]' : 'max-w-[235px]'
        } flex-col border border-white/15 bg-[#121215] p-3.5 shadow-2xl`}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
          <div>
            <div className="font-mono text-[9px] tracking-[0.18em] text-[#FF4800]">
              ESTÚDIO PRIVADO • SP
            </div>
            <div className="font-display text-sm font-bold tracking-tight text-[#F3F1EC]">
              STUDIO INK.
            </div>
          </div>
          <div className="flex h-7 w-7 items-center justify-center border border-white/15 font-mono text-[10px] text-[#F3F1EC]">
            SI
          </div>
        </div>

        {/* Seletor de Estilo Interativo */}
        <div className="mt-2.5">
          <div className="mb-1.5 font-mono text-[9px] uppercase tracking-wider text-[#84848D]">
            Escolha seu estilo:
          </div>
          <div className="grid grid-cols-3 gap-1">
            {styles.map((st) => (
              <button
                key={st}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(st);
                }}
                className={`border py-1 font-mono text-[9px] transition-colors ${
                  selected === st
                    ? 'border-[#FF4800] bg-[#FF4800] font-semibold text-[#09090B]'
                    : 'border-white/10 bg-[#18181D] text-[#84848D] hover:border-white/30 hover:text-[#F3F1EC]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Links táteis */}
        <div className="mt-2.5 space-y-1.5">
          <div className="flex items-center justify-between border border-[#FF4800]/60 bg-[#FF4800]/10 px-2.5 py-2 text-[10px] text-[#F3F1EC]">
            <span className="font-medium truncate">Orçar {selected} no WhatsApp</span>
            <ArrowUpRight className="h-3 w-3 shrink-0 text-[#FF4800]" />
          </div>
          <div className="flex items-center justify-between border border-white/10 bg-[#16161A] px-2.5 py-1.5 text-[10px] text-[#84848D]">
            <span>Portfólio Recente (2026)</span>
            <ArrowUpRight className="h-3 w-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Demo 03: Construtora & Reformas — Landing Page Editorial com Seletor de Escopo.
 */
function ConstructionSiteDemo({ expanded = false }) {
  const scopes = {
    Residencial: { prazo: '1–7 dias', garantia: '5 anos', tag: 'CHAVE NA MÃO' },
    Comercial: { prazo: '1–7 dias', garantia: '3 anos', tag: 'ENTREGA RÁPIDA' },
    'Alto Padrão': { prazo: '1–30 dias', garantia: '5 anos', tag: 'EXECUÇÃO PREMIUM' },
  };
  const [scope, setScope] = useState('Residencial');
  const current = scopes[scope];

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`flex h-full w-full flex-col justify-between bg-[#0C0C0F] p-4 select-none ${
        expanded ? 'p-6' : ''
      }`}
    >
      {/* Barra simulada do navegador */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2 font-mono text-[9px] text-[#84848D]">
        <span className="text-[#F3F1EC]">CONSTRUTORA VÉRTICE</span>
        <span className="border border-white/10 px-1.5 py-0.5 text-[8px] text-[#FF4800]">
          {current.tag}
        </span>
      </div>

      {/* Headline Editorial Mini */}
      <div className="my-2">
        <div className="font-display text-base font-semibold leading-tight text-[#F3F1EC]">
          Obras com cronograma fechado e engenharia transparente.
        </div>
      </div>

      {/* Seletor de Escopo */}
      <div className="space-y-2">
        <div className="flex gap-1">
          {Object.keys(scopes).map((key) => (
            <button
              key={key}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setScope(key);
              }}
              className={`flex-1 border py-1 font-mono text-[9px] transition-colors ${
                scope === key
                  ? 'border-[#F3F1EC] bg-[#F3F1EC] font-semibold text-[#09090B]'
                  : 'border-white/10 bg-[#141418] text-[#84848D] hover:text-[#F3F1EC]'
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        {/* Métricas dinâmicas */}
        <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-2 font-mono">
          <div>
            <div className="text-[8px] uppercase text-[#84848D]">Prazo Médio</div>
            <div className="text-xs font-semibold text-[#F3F1EC]">{current.prazo}</div>
          </div>
          <div>
            <div className="text-[8px] uppercase text-[#84848D]">Garantia Estrutural</div>
            <div className="text-xs font-semibold text-[#FF4800]">{current.garantia}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Demo 04: RotaExpress — App Mobile de Entregas & Ganhos Diários.
 */
function DeliveryAppDemo({ expanded = false }) {
  const [online, setOnline] = useState(true);
  const [trips, setTrips] = useState(11);
  const [earnings, setEarnings] = useState(214.5);

  const addTrip = (e) => {
    e.stopPropagation();
    if (!online) return;
    setTrips((t) => t + 1);
    setEarnings((val) => val + 18.5);
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex h-full w-full items-center justify-center bg-[#0C0C0F] p-3.5 select-none"
    >
      <div
        className={`flex w-full ${
          expanded ? 'max-w-[300px]' : 'max-w-[240px]'
        } flex-col border border-white/15 bg-[#121216] p-3.5 font-mono`}
      >
        {/* Status Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <span className="font-sans text-xs font-semibold text-[#F3F1EC]">RotaExpress</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOnline((v) => !v);
            }}
            className={`flex items-center gap-1.5 border px-2 py-0.5 text-[9px] font-semibold transition-colors ${
              online
                ? 'border-[#22C55E]/50 bg-[#22C55E]/15 text-[#22C55E]'
                : 'border-white/15 bg-white/5 text-[#84848D]'
            }`}
          >
            {online ? <Wifi className="h-2.5 w-2.5" /> : <WifiOff className="h-2.5 w-2.5" />}
            {online ? 'ONLINE' : 'OFFLINE'}
          </button>
        </div>

        {/* Painel de Ganhos */}
        <div className="my-3">
          <div className="text-[9px] uppercase tracking-wider text-[#84848D]">Ganhos Hoje</div>
          <div className="mt-0.5 font-display text-2xl font-bold tracking-tight text-[#F3F1EC]">
            R$ {earnings.toFixed(2).replace('.', ',')}
          </div>
          <div className="mt-1 flex items-center justify-between text-[10px] text-[#84848D]">
            <span>{trips} entregas</span>
            <span className="text-[#FF4800]">Meta: 85%</span>
          </div>
        </div>

        {/* Botão interativo para simular entrega */}
        <button
          type="button"
          onClick={addTrip}
          disabled={!online}
          className={`w-full border py-1.5 text-[10px] font-semibold tracking-wider transition-colors ${
            online
              ? 'border-[#FF4800] bg-[#FF4800] text-[#09090B] hover:bg-[#FF6424]'
              : 'cursor-not-allowed border-white/10 bg-[#18181C] text-[#84848D]'
          }`}
        >
          {online ? '+ REGISTRAR ENTREGA (R$ 18,50)' : 'FIQUE ONLINE PARA OPERAR'}
        </button>
      </div>
    </div>
  );
}

/**
 * Demo 05: Ateliê Estética — Linktree com Montador Automático de Agendamento.
 */
function AestheticsLinktreeDemo({ expanded = false }) {
  const procedures = [
    { name: 'Limpeza Profunda', time: '60 min' },
    { name: 'Microagulhamento', time: '50 min' },
    { name: 'Drenagem Facial', time: '45 min' },
  ];
  const [selected, setSelected] = useState(procedures[0]);

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="flex h-full w-full items-center justify-center bg-[#0C0C0F] p-3.5 select-none"
    >
      <div
        className={`flex w-full ${
          expanded ? 'max-w-[310px]' : 'max-w-[250px]'
        } flex-col border border-white/15 bg-[#141315] p-3.5`}
      >
        <div className="flex items-baseline justify-between border-b border-white/10 pb-2">
          <span className="font-serif-editorial text-lg italic text-[#F3F1EC]">Ateliê Lumière</span>
          <span className="font-mono text-[9px] text-[#84848D]">ESTÉTICA</span>
        </div>

        <div className="mt-2.5 space-y-1">
          {procedures.map((proc) => {
            const active = selected.name === proc.name;
            return (
              <button
                key={proc.name}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(proc);
                }}
                className={`flex w-full items-center justify-between border px-2.5 py-1.5 text-left text-[10px] transition-colors ${
                  active
                    ? 'border-[#FF4800] bg-[#1E1A18] text-[#F3F1EC]'
                    : 'border-white/10 bg-transparent text-[#84848D] hover:border-white/25 hover:text-[#F3F1EC]'
                }`}
              >
                <span>{proc.name}</span>
                <span className="font-mono text-[9px] text-[#84848D]">{proc.time}</span>
              </button>
            );
          })}
        </div>

        {/* Preview da mensagem automática */}
        <div className="mt-2.5 border border-white/10 bg-[#0D0D10] p-2 font-mono text-[9px] leading-relaxed text-[#84848D]">
          <span className="text-[#FF4800]">MSG AUTO:</span> &quot;Olá, gostaria de consultar
          horários para <span className="text-[#F3F1EC]">{selected.name}</span> ({selected.time}
          ).&quot;
        </div>
      </div>
    </div>
  );
}

/**
 * Demo 06: GestãoStock Cloud — Painel ERP com Gráfico Vetorial Interativo e Alertas.
 */
function ErpDashboardDemo({ expanded = false }) {
  const days = [
    { day: 'SEG', value: 4280, pct: 58 },
    { day: 'TER', value: 3890, pct: 52 },
    { day: 'QUA', value: 5120, pct: 70 },
    { day: 'QUI', value: 4760, pct: 64 },
    { day: 'SEX', value: 6840, pct: 92 },
    { day: 'SÁB', value: 7420, pct: 100 },
    { day: 'DOM', value: 3150, pct: 43 },
  ];

  const [activeIdx, setActiveIdx] = useState(5);
  const activeDay = days[activeIdx];

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`flex h-full w-full flex-col justify-between bg-[#0C0C0F] p-3.5 font-mono select-none ${
        expanded ? 'p-5' : ''
      }`}
    >
      {/* Cabeçalho KPI */}
      <div className="flex items-start justify-between border-b border-white/10 pb-2">
        <div>
          <div className="text-[9px] uppercase tracking-wider text-[#84848D]">
            Faturamento • {activeDay.day}
          </div>
          <div className="font-display text-lg font-bold text-[#F3F1EC]">
            R$ {activeDay.value.toLocaleString('pt-BR')},00
          </div>
        </div>
        <div className="flex items-center gap-1 border border-[#FF4800]/40 bg-[#FF4800]/10 px-2 py-0.5 text-[9px] text-[#FF4800]">
          <AlertTriangle className="h-2.5 w-2.5" />
          <span>3 ITENS BAIXOS</span>
        </div>
      </div>

      {/* Gráfico de Barras Interativo */}
      <div className="my-3 flex h-[92px] items-end gap-1.5 pt-2">
        {days.map((item, idx) => {
          const isSelected = idx === activeIdx;
          return (
            <button
              key={item.day}
              type="button"
              onMouseEnter={() => setActiveIdx(idx)}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIdx(idx);
              }}
              className="group flex h-full flex-1 flex-col items-center justify-end gap-1 focus:outline-none"
            >
              <div className="relative flex w-full flex-1 items-end">
                <div
                  style={{ height: `${item.pct}%` }}
                  className={`w-full transition-all duration-200 ${
                    isSelected
                      ? 'bg-[#FF4800]'
                      : 'bg-white/15 group-hover:bg-white/30'
                  }`}
                />
              </div>
              <span
                className={`text-[8px] ${
                  isSelected ? 'font-semibold text-[#F3F1EC]' : 'text-[#84848D]'
                }`}
              >
                {item.day}
              </span>
            </button>
          );
        })}
      </div>

      {/* Rodapé de status do ERP */}
      <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[9px] text-[#84848D]">
        <span>CAIXA CONCILIADO • SUPABASE LIVE</span>
        <span className="text-[#22C55E]">● SYNC</span>
      </div>
    </div>
  );
}

/**
 * Renderiza o componente interativo certo baseado no projeto.
 */
function ProjectPreviewRenderer({ type, expanded = false }) {
  switch (type) {
    case 'pos':
      return <PosMiniDemo expanded={expanded} />;
    case 'tattoo-linktree':
      return <TattooLinktreeDemo expanded={expanded} />;
    case 'construction-site':
      return <ConstructionSiteDemo expanded={expanded} />;
    case 'delivery-app':
      return <DeliveryAppDemo expanded={expanded} />;
    case 'aesthetics-linktree':
      return <AestheticsLinktreeDemo expanded={expanded} />;
    case 'erp-dashboard':
      return <ErpDashboardDemo expanded={expanded} />;
    default:
      return null;
  }
}

// ============================================================================
// DRAWER DE CASE COMPLETO (SLIDE-OVER ARQUITETURAL)
// ============================================================================

function CaseStudyDrawer({ project, onClose, onRequestSimilar }) {
  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[70] flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-project-title"
    >
      {/* Backdrop escuro fosco */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-[2px] transition-opacity"
      />

      {/* Painel Lateral */}
      <div className="relative z-10 flex h-full w-full max-w-2xl flex-col overflow-y-auto border-l border-white/10 bg-[#0D0D10] text-[#F3F1EC] shadow-2xl animate-drawer-in">
        {/* Topo fixo do Drawer */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[#0D0D10]/95 px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-3 font-mono text-xs text-[#84848D]">
            <span className="text-[#FF4800]">[{project.index}]</span>
            <span>CASE TÉCNICO</span>
            <span>•</span>
            <span>{project.year}</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar case"
            className="flex h-9 w-9 items-center justify-center border border-white/10 text-[#F3F1EC] transition-colors hover:border-[#FF4800] hover:text-[#FF4800]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1 space-y-8 p-6 sm:p-8">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#FF4800]">
              {project.categoryLabel}
            </div>
            <h2
              id="drawer-project-title"
              className="mt-2 font-display text-3xl font-bold tracking-tight text-[#F3F1EC] sm:text-4xl"
            >
              {project.title}
            </h2>
            <p className="mt-2 text-base text-[#84848D]">{project.subtitle}</p>
          </div>

          {/* Ficha Técnica */}
          <div className="grid grid-cols-2 gap-4 border-y border-white/10 py-4 font-mono text-xs sm:grid-cols-3">
            <div>
              <div className="text-[10px] uppercase text-[#84848D]">Papel</div>
              <div className="mt-1 text-[#F3F1EC]">{project.role}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase text-[#84848D]">Ano</div>
              <div className="mt-1 text-[#F3F1EC]">{project.year}</div>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <div className="text-[10px] uppercase text-[#84848D]">Arquitetura</div>
              <div className="mt-1 text-[#F3F1EC]">{project.architecture}</div>
            </div>
          </div>

          {/* Demo Interativa Ampliada */}
          <div>
            <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-[#84848D]">
              <span>PROTOTIPAGEM FUNCIONAL INTERATIVA</span>
              <span className="text-[#FF4800]">TESTE OS CONTROLES ABAIXO</span>
            </div>
            <div className="min-h-[260px] border border-white/15 bg-[#09090B]">
              <ProjectPreviewRenderer type={project.previewType} expanded />
            </div>
          </div>

          {/* Métricas & Resultados */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="border border-white/10 bg-[#131317] p-4"
              >
                <div className="font-display text-2xl font-bold text-[#FF4800]">
                  {metric.value}
                </div>
                <div className="mt-1 font-mono text-[11px] leading-snug text-[#84848D]">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Desafio & Solução */}
          <div className="space-y-6">
            <div className="border-l-2 border-white/15 pl-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#84848D]">
                01 // O Desafio
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#F3F1EC]/90">
                {project.challenge}
              </p>
            </div>

            <div className="border-l-2 border-[#FF4800] pl-4">
              <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#FF4800]">
                02 // Solução Técnica
              </div>
              <p className="mt-2 text-sm leading-relaxed text-[#F3F1EC]/90">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Stack Utilizada */}
          <div>
            <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-[#84848D]">
              Stack Empregada
            </div>
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="border border-white/15 bg-[#15151A] px-3 py-1 font-mono text-xs text-[#F3F1EC]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Rodapé de Ação do Drawer */}
        <div className="sticky bottom-0 border-t border-white/10 bg-[#0D0D10]/95 p-6 backdrop-blur-sm">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="font-mono text-xs text-[#84848D]">
              Precisa de uma solução nessa linha?
            </div>
            <button
              type="button"
              onClick={() => onRequestSimilar(project)}
              className="inline-flex items-center justify-center gap-2 bg-[#FF4800] px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-[#09090B] transition-colors hover:bg-[#FF6424]"
            >
              <span>Solicitar projeto similar</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// CARD DE PROJETO COM REVEAL E DEMO EMBUTIDA
// ============================================================================

function ProjectCard({ project, onOpenCase }) {
  const [ref, isVisible] = useReveal(0.1);

  return (
    <article
      ref={ref}
      className={`group flex flex-col justify-between border border-white/[0.09] bg-[#111114] transition-all duration-700 hover:border-white/20 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      {/* Topo do Card: Índice & Categoria */}
      <div>
        <div className="flex items-center justify-between border-b border-white/[0.09] px-5 py-3.5 font-mono text-[11px]">
          <div className="flex items-center gap-2.5">
            <span className="text-[#FF4800]">[{project.index}]</span>
            <span className="uppercase tracking-[0.12em] text-[#84848D]">
              {project.categoryLabel}
            </span>
          </div>
          <span className="text-[#84848D]">{project.year}</span>
        </div>

        {/* Área Interativa Codificada */}
        <div
          data-cursor="INTERAGIR"
          className="relative h-[245px] w-full overflow-hidden border-b border-white/[0.09] bg-[#0C0C0F]"
        >
          <ProjectPreviewRenderer type={project.previewType} />
          <div className="pointer-events-none absolute right-2.5 bottom-2 font-mono text-[9px] tracking-wider text-[#84848D]/70">
            DEMO LIVE
          </div>
        </div>

        {/* Descrição Editorial */}
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-display text-xl font-bold tracking-tight text-[#F3F1EC] sm:text-2xl">
                {project.title}
              </h3>
              <p className="mt-0.5 font-mono text-xs text-[#84848D]">
                {project.subtitle}
              </p>
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-[#F3F1EC]/75">
            {project.summary}
          </p>
        </div>
      </div>

      {/* Rodapé do Card: Stack & Botão de Case */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.09] px-5 py-4 sm:px-6">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="border border-white/10 bg-[#16161A] px-2 py-0.5 font-mono text-[10px] text-[#84848D]"
            >
              {tech}
            </span>
          ))}
        </div>

        <button
          type="button"
          data-cursor="VER CASE"
          onClick={() => onOpenCase(project)}
          className="inline-flex items-center gap-1.5 font-mono text-xs font-medium text-[#F3F1EC] transition-colors hover:text-[#FF4800]"
        >
          <span>Abrir Case Completo</span>
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>
      </div>
    </article>
  );
}

// ============================================================================
// BLOCO DE PROCESSO COM REVEAL
// ============================================================================

function ProcessBlock({ step }) {
  const [ref, isVisible] = useReveal(0.15);

  return (
    <div
      ref={ref}
      className={`border border-white/[0.09] bg-[#111114] p-6 transition-all duration-700 hover:border-[#FF4800]/40 sm:p-8 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <div className="flex items-center justify-between font-mono text-xs">
        <span className="tracking-[0.16em] text-[#FF4800]">
          {step.number} // {step.tag}
        </span>
        <span className="h-1.5 w-1.5 bg-[#FF4800]" />
      </div>

      <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-[#F3F1EC]">
        {step.title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-[#84848D] sm:text-base">
        {step.description}
      </p>

      <div className="mt-6 grid grid-cols-1 gap-2 border-t border-white/[0.09] pt-4 sm:grid-cols-3">
        {step.specs.map((spec) => (
          <div key={spec} className="flex items-start gap-2 font-mono text-[11px] text-[#F3F1EC]/80">
            <span className="mt-1 h-1 w-1 shrink-0 bg-[#FF4800]" />
            <span>{spec}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// APLICAÇÃO PRINCIPAL — PORTFÓLIO rcp.dev
// ============================================================================

export default function App() {
  const scrollProgress = useScrollProgress();
  const brtTime = useBRTClock();

  // Navegação mobile e drawer de case
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('TODOS');
  const [selectedProject, setSelectedProject] = useState(null);

  // Estado da Matriz de Tecnologias
  const [activeCapability, setActiveCapability] = useState('ALL');
  const [hoveredCapability, setHoveredCapability] = useState(null);

  // Estado do Configurador de Briefing
  const [briefingType, setBriefingType] = useState('Site / Landing Page');
  const [selectedModules, setSelectedModules] = useState([
    'Design 100% Sob Medida',
    'Integração WhatsApp',
  ]);
  const [clientName, setClientName] = useState('');
  const [clientBusiness, setClientBusiness] = useState('');
  const [clientNotes, setClientNotes] = useState('');

  // Notificação Toast discreta (sem alert/confirm)
  const [toastMessage, setToastMessage] = useState('');

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? '' : current));
    }, 3000);
  }, []);

  // Contagem por categoria no portfólio
  const categoryCounts = useMemo(() => {
    const counts = { TODOS: PROJECTS.length };
    PROJECTS.forEach((p) => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'TODOS') return PROJECTS;
    return PROJECTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Capacidade ativa na matriz técnica (hover tem precedência temporária)
  const effectiveCapability = hoveredCapability || activeCapability;

  // Alternar módulos do briefing
  const toggleModule = (modId) => {
    setSelectedModules((prev) =>
      prev.includes(modId) ? prev.filter((item) => item !== modId) : [...prev, modId]
    );
  };

  // Cálculo dinâmico de complexidade e prazo estimado
  const briefingMetrics = useMemo(() => {
    const typeObj = BRIEFING_TYPES.find((t) => t.id === briefingType) || BRIEFING_TYPES[0];
    const moduleScore = selectedModules.reduce((acc, modId) => {
      const found = BRIEFING_MODULES.find((m) => m.id === modId);
      return acc + (found ? found.weight : 1);
    }, 0);

    const totalScore = typeObj.baseComplexity + moduleScore;
    let level = 'ESSENCIAL';
    if (totalScore >= 1) level = 'ENTERPRISE';
    else if (totalScore >= 1) level = 'ESTRUTURADO';
    else if (totalScore >= 1) level = 'INTERMEDIÁRIO';

    const minDays = typeObj.baseDays[0] + Math.max(0, selectedModules.length - 1) * 0;
    const maxDays = typeObj.baseDays[1] + Math.max(0, selectedModules.length - 1) * 2;

    return { level, minDays, maxDays };
  }, [briefingType, selectedModules]);

  // Mensagem formatada do Briefing Técnico
  const generatedMessage = useMemo(() => {
    const nameLine = clientName.trim() || '[Seu Nome]';
    const businessLine = clientBusiness.trim() || '[Seu Negócio / Segmento]';
    const modulesList =
      selectedModules.length > 0
        ? selectedModules.map((m) => `- ${m}`).join('\n')
        : '- Escopo base a definir';
    const notesBlock = clientNotes.trim()
      ? `\nDetalhes adicionais:\n${clientNotes.trim()}`
      : '';

    return `Olá Ricardo (rcp.dev), montei um briefing pelo seu portfólio:

*Cliente:* ${nameLine}
*Negócio / Nicho:* ${businessLine}
*Tipo de Projeto:* ${briefingType}
*Escopo Estimado:* ${briefingMetrics.level} (${briefingMetrics.minDays}–${briefingMetrics.maxDays} dias úteis)

*Módulos Selecionados:*
${modulesList}${notesBlock}

Podemos alinhar os próximos passos?`;
  }, [clientName, clientBusiness, briefingType, selectedModules, clientNotes, briefingMetrics]);

  // Fluxo "Solicitar projeto similar" vindo do Drawer
  const handleRequestSimilar = (project) => {
  setSelectedProject(null);
  setBriefingType(project.briefingType);
  setSelectedModules(project.recommendedModules);
  setClientNotes(`Referência de interesse: projeto similar ao "${project.title}".`);
  showToast(`Briefing pré-configurado para ${project.briefingType}.`);

  setTimeout(() => {
    scrollSuavePara('briefing', { offset: 72, duration: 900 });
  }, 120);
};


  // Copiar resumo com fallback seguro
  const handleCopyBriefing = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(generatedMessage);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = generatedMessage;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      showToast('Resumo técnico copiado para a área de transferência.');
    } catch {
      showToast('Não foi possível copiar automaticamente. Selecione o texto no resumo.');
    }
  };

  // Link formatado do WhatsApp
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    generatedMessage
  )}`;

  const scrollToSection = (e, id) => {
  e.preventDefault();
  setMobileMenuOpen(false);
  scrollSuavePara(id, { offset: 72, duration: 900 });
};

const scrollToTop = () => {
  scrollSuavePara('topo', { offset: 0, duration: 900 });
};

  return (
    <div className="relative min-h-screen bg-[#09090B] text-[#F3F1EC] antialiased selection:bg-[#FF4800] selection:text-[#09090B] [overflow-x:clip]">
      {/* Fontes Editoriais & Estilos Arquiteturais */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        :root {
          --bg-carbon: #09090B;
          --surface-charcoal: #111114;
          --surface-elevated: #16161A;
          --text-bone: #F3F1EC;
          --text-muted: #84848D;
          --accent-vermilion: #FF4800;
        }

        html {
          background-color: #09090B;
        }

        body {
          font-family: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
          background-color: #09090B;
          color: #F3F1EC;
        }

        .font-display {
          font-family: 'Space Grotesk', sans-serif;
        }

        .font-serif-editorial {
          font-family: 'Instrument Serif', Georgia, serif;
        }

        .font-mono {
          font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;
        }

        /* Animação de entrada mascarada no Hero */
        @keyframes heroReveal {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-hero-1 {
          animation: heroReveal 0.65s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .animate-hero-2 {
          animation: heroReveal 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both;
        }
        .animate-hero-3 {
          animation: heroReveal 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.2s both;
        }
        .animate-hero-4 {
          animation: heroReveal 0.75s cubic-bezier(0.22, 1, 0.36, 1) 0.3s both;
        }

        /* Marquee horizontal infinito */
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marqueeScroll 32s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }

        /* Drawer slide-in */
        @keyframes drawerSlideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0%); }
        }

        .animate-drawer-in {
          animation: drawerSlideIn 0.32s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        /* Scrollbar refinada */
        ::-webkit-scrollbar {
          width: 7px;
          height: 7px;
        }
        ::-webkit-scrollbar-track {
          background: #09090B;
        }
        ::-webkit-scrollbar-thumb {
          background: #232329;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #FF4800;
        }
      `}</style>

      {/* Textura sutil de granulação cinematográfica (~3% opacidade) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[80] opacity-[0.032] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Cursor Magnético Desktop */}
      <MagneticCursor />

      {/* ====================================================================
          1. HUD HEADER PERSISTENTE + BARRA DE PROGRESSO
         ==================================================================== */}
      <header className="sticky top-0 z-50 border-b border-white/[0.09] bg-[#09090B]/92 backdrop-blur-md">
        {/* Hairline de progresso de leitura */}
        <div className="h-[2px] w-full bg-white/[0.04]">
          <div
            className="h-full bg-[#FF4800] transition-[width] duration-75 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        <div className="mx-auto flex h-16 max-w-[1380px] items-center justify-between px-4 sm:px-6 lg:px-10">
          {/* Wordmark */}
          <a
  href="#topo"
  onClick={(e) => {
    e.preventDefault();
    scrollToTop();
  }}
  data-cursor="INÍCIO"
  className="flex items-center gap-3 font-display text-lg font-bold tracking-tight text-[#F3F1EC]"
>
  <span>Ricardo Pereira</span><span></span>
  <span className="flex items-center gap-1.5">
    <span className="font-normal text-[#FF4800]">|</span>
    <span>
      rcp<span className="text-[#FF4800]">.</span>dev
    </span>
    <span className="font-normal text-[#FF4800]">|</span>
  </span>
</a>

          {/* Navegação Desktop */}
          <nav aria-label="Navegação principal" className="hidden items-center gap-8 md:flex">
            {[
              { label: 'Projetos', id: 'projetos' },
              { label: 'Especialidades', id: 'processo' },
              { label: 'Stack', id: 'stack' },
              { label: 'Orçamento', id: 'briefing' },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => scrollToSection(e, item.id)}
                className="font-mono text-xs uppercase tracking-[0.12em] text-[#84848D] transition-colors hover:text-[#F3F1EC]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Status ao vivo + CTA */}
          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 border border-white/[0.09] bg-[#111114] px-3 py-1.5 font-mono text-[11px] text-[#84848D] xl:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#22C55E] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#22C55E]" />
              </span>
              <span className="text-[#F3F1EC]">DISPONÍVEL</span>
              <span>•</span>
              <span>BRT {brtTime}</span>
            </div>

            <MagneticButton
              href="#briefing"
              onClick={(e) => scrollToSection(e, 'briefing')}
              cursorLabel="INICIAR"
              className="hidden items-center gap-1.5 bg-[#FF4800] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#09090B] transition-colors hover:bg-[#FF6424] sm:inline-flex"
            >
              <span>Iniciar Projeto</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </MagneticButton>

            {/* Botão Menu Mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
              className="flex h-10 w-10 items-center justify-center border border-white/10 text-[#F3F1EC] md:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Drawer de Navegação Mobile */}
        {mobileMenuOpen && (
          <div className="border-t border-white/[0.09] bg-[#0D0D10] px-4 py-5 md:hidden">
            <div className="mb-4 flex items-center gap-2 font-mono text-[11px] text-[#84848D]">
              <span className="h-2 w-2 rounded-full bg-[#22C55E]" />
              <span className="text-[#F3F1EC]">DISPONÍVEL PARA NOVOS PROJETOS</span>
              <span>•</span>
              <span>{brtTime}</span>
            </div>
            <div className="flex flex-col divide-y divide-white/[0.07]">
              {[
                { label: '01 // Projetos Selecionados', id: 'projetos' },
                { label: '02 // Como eu construo', id: 'processo' },
                { label: '03 // Ecossistema Técnico', id: 'stack' },
                { label: '04 // Montar Briefing', id: 'briefing' },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className="py-3.5 font-mono text-xs uppercase tracking-wider text-[#F3F1EC]"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <a
              href="#briefing"
              onClick={(e) => scrollToSection(e, 'briefing')}
              className="mt-4 flex w-full items-center justify-center gap-2 bg-[#FF4800] py-3 font-mono text-xs font-semibold uppercase tracking-wider text-[#09090B]"
            >
              <span>Iniciar Projeto</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        )}
      </header>

      <main id="topo">
        {/* ==================================================================
            2. HERO EDITORIAL ASSIMÉTRICO + CANVAS INTERATIVO
           ================================================================== */}
        <section className="relative border-b border-white/[0.09]">
          <EngineeringGridCanvas />

          <div className="relative z-10 mx-auto max-w-[1380px] px-4 pt-16 pb-16 sm:px-6 sm:pt-24 sm:pb-24 lg:px-10 lg:pt-28 lg:pb-28">
            {/* Metadados superiores */}
            <div className="animate-hero-1 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.09] pb-5 font-mono text-[11px] tracking-[0.14em] text-[#84848D]">
              <span>[ PORTFOLIO 2026 — SITES / LINKTREES / APPS / SOFTWARES ]</span>
              <span className="hidden sm:inline">24.0058° S, 46.4028° W • PRAIA GRANDE, SP</span>
            </div>

            {/* Grid Editorial 12 Colunas */}
            <div className="mt-10 grid grid-cols-1 gap-12 lg:mt-14 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <h1 className="animate-hero-2 font-display text-[2.65rem] font-bold leading-[1.03] tracking-[-0.03em] text-[#F3F1EC] sm:text-6xl lg:text-[4.75rem]">
                  Engenharia digital{' '}
                  <span className="font-serif-editorial font-normal italic text-[#FF4800]">
                    sob medida
                  </span>{' '}
                  para negócios reais.
                </h1>

                <p className="animate-hero-3 mt-7 max-w-2xl text-base leading-relaxed text-[#84848D] sm:text-lg">
                  <strong className="font-medium text-[#F3F1EC]">Ricardo Pereira</strong> —
                  Desenvolvedor focado em interfaces de alta performance, linktrees interativos,
                  aplicativos mobile e sistemas comerciais (PDV, estoque e gestão) sem cara de
                  template.
                </p>

                {/* Botões Magnéticos */}
                <div className="animate-hero-4 mt-9 flex flex-wrap items-center gap-4">
                  <MagneticButton
                    href="#projetos"
                    onClick={(e) => scrollToSection(e, 'projetos')}
                    cursorLabel="EXPLORAR"
                    className="inline-flex items-center gap-2.5 bg-[#F3F1EC] px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#09090B] transition-colors hover:bg-[#FF4800]"
                  >
                    <span>Explorar Projetos</span>
                    <ArrowDown className="h-4 w-4" />
                  </MagneticButton>

                  <MagneticButton
                    href="#briefing"
                    onClick={(e) => scrollToSection(e, 'briefing')}
                    cursorLabel="BRIEFING"
                    className="inline-flex items-center gap-2.5 border border-white/20 bg-[#111114]/90 px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[#F3F1EC] transition-colors hover:border-[#FF4800] hover:text-[#FF4800]"
                  >
                    <span>Montar Briefing</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </MagneticButton>
                </div>
              </div>

              {/* Coluna Direita: Ficha Técnica de Engenharia */}
              <div className="animate-hero-4 lg:col-span-4">
                <div className="border border-white/[0.09] bg-[#111114]/90 p-5 font-mono text-xs">
                  <div className="flex items-center justify-between border-b border-white/[0.09] pb-3 text-[10px] tracking-[0.15em] text-[#84848D]">
                    <span>ESPECIFICAÇÃO TÉCNICA</span>
                    <span className="text-[#FF4800]">v2026.1</span>
                  </div>
                  <dl className="mt-3 divide-y divide-white/[0.07]">
                    <div className="flex justify-between py-2.5">
                      <dt className="text-[#84848D]">Especialidade</dt>
                      <dd className="text-right text-[#F3F1EC]">Web, Mobile & PDV</dd>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <dt className="text-[#84848D]">Stack Principal</dt>
                      <dd className="text-right text-[#F3F1EC]">React • Flutter • C#</dd>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <dt className="text-[#84848D]">Cloud & Dados</dt>
                      <dd className="text-right text-[#F3F1EC]">Supabase • Firebase</dd>
                    </div>
                    <div className="flex justify-between pt-2.5">
                      <dt className="text-[#84848D]">Atendimento</dt>
                      <dd className="text-right text-[#22C55E]">Agenda Aberta</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Marquee Horizontal Arquitetural */}
          <div className="overflow-hidden border-t border-white/[0.09] bg-[#0D0D10] py-3.5">
            <div className="animate-marquee font-mono text-xs tracking-[0.18em] text-[#84848D]">
              {[0, 1].map((dup) => (
                <div key={dup} className="flex shrink-0 items-center">
                  {[
                    'SITES DE ALTA CONVERSÃO',
                    'LINKTREES INTERATIVOS',
                    'APLICATIVOS MOBILE',
                    'SISTEMAS PDV & GESTÃO',
                    'ARQUITETURA FULL-STACK',
                    'MICRO-INTERAÇÕES',
                  ].map((label) => (
                    <span key={`${dup}-${label}`} className="flex items-center">
                      <span className="px-6 text-[#F3F1EC]/85">{label}</span>
                      <span className="text-[#FF4800]">—</span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================
            3. SHOWCASE DE PROJETOS COM DEMOS FUNCIONAIS AO VIVO
           ================================================================== */}
        <section id="projetos" className="scroll-mt-20 border-b border-white/[0.09] py-20 sm:py-28">
          <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
            {/* Cabeçalho da Seção */}
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div>
                <div className="font-mono text-xs tracking-[0.16em] text-[#FF4800]">
                  [01] // TRABALHOS EM PRODUÇÃO & PROTÓTIPOS
                </div>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#F3F1EC] sm:text-5xl">
                  Projetos{' '}
                  <span className="font-serif-editorial font-normal italic text-[#F3F1EC]/90">
                    Selecionados
                  </span>
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#84848D] sm:text-base">
                  Em vez de telas estáticas, cada card abaixo traz uma demonstração interativa real.
                  Teste os controles diretamente no card ou abra o estudo técnico completo.
                </p>
              </div>

              {/* Barra de Filtros com Contagem */}
              <div
                role="tablist"
                aria-label="Filtrar projetos por categoria"
                className="flex flex-wrap gap-2"
              >
                {CATEGORIES.map((cat) => {
                  const active = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`inline-flex items-center gap-2 border px-3.5 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                        active
                          ? 'border-[#FF4800] bg-[#FF4800] font-semibold text-[#09090B]'
                          : 'border-white/[0.1] bg-[#111114] text-[#84848D] hover:border-white/30 hover:text-[#F3F1EC]'
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`text-[10px] ${
                          active ? 'text-[#09090B]/75' : 'text-[#84848D]/70'
                        }`}
                      >
                        ({categoryCounts[cat.id] || 0})
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Grid de Projetos */}
            <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenCase={setSelectedProject}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ==================================================================
            4. PROCESSO DE ENGENHARIA (COLUNA ESQUERDA STICKY)
           ================================================================== */}
        <section id="processo" className="scroll-mt-20 border-b border-white/[0.09] py-20 sm:py-28">
          <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              {/* Coluna Esquerda Fixa (Sticky) */}
              <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
                <div className="font-mono text-xs tracking-[0.16em] text-[#FF4800]">
                  [02] // COMO EU CONSTRUO
                </div>
                <h2 className="mt-3 font-display text-3xl font-bold leading-[1.08] tracking-tight text-[#F3F1EC] sm:text-5xl">
                  Zero template.{' '}
                  <span className="font-serif-editorial font-normal italic text-[#F3F1EC]/90">
                    Código feito
                  </span>{' '}
                  para durar.
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-[#84848D] sm:text-base">
                  Meu trabalho une mentalidade de engenharia de software com sensibilidade de design
                  editorial. Seja um linktree que precisa carregar em meio segundo no 4G ou um PDV
                  que vai rodar 12 horas por dia no caixa, o padrão técnico é o mesmo.
                </p>

                <div className="mt-8 border-t border-white/[0.09] pt-6">
                  <div className="grid grid-cols-2 gap-6 font-mono">
                    <div>
                      <div className="text-2xl font-bold text-[#F3F1EC]">100%</div>
                      <div className="mt-1 text-[11px] text-[#84848D]">
                        Código autoral sob medida
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-[#FF4800]">Direto</div>
                      <div className="mt-1 text-[11px] text-[#84848D]">
                        Sem intermediários na entrega
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coluna Direita: 4 Blocos Numerados */}
              <div className="space-y-6 lg:col-span-7">
                {PROCESS_STEPS.map((step) => (
                  <ProcessBlock key={step.number} step={step} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================================================================
            5. MATRIZ INTERATIVA DE ECOSSISTEMA TÉCNICO (SEM BARRAS DE %)
           ================================================================== */}
        <section id="stack" className="scroll-mt-20 border-b border-white/[0.09] py-20 sm:py-28">
          <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
              <div>
                <div className="font-mono text-xs tracking-[0.16em] text-[#FF4800]">
                  [03] // ECOSSISTEMA TÉCNICO
                </div>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#F3F1EC] sm:text-5xl">
                  Ferramenta certa para cada{' '}
                  <span className="font-serif-editorial font-normal italic text-[#F3F1EC]/90">
                    arquitetura.
                  </span>
                </h2>
              </div>
              <p className="max-w-md font-mono text-xs leading-relaxed text-[#84848D]">
                Passe o mouse ou selecione uma disciplina abaixo para destacar exatamente qual
                conjunto de tecnologias entra em produção.
              </p>
            </div>

            {/* Seletor de Capacidades */}
            <div className="mt-10 flex flex-wrap gap-2">
              {CAPABILITIES.map((cap) => {
                const isSelected = activeCapability === cap.id;
                const isHovered = hoveredCapability === cap.id;
                return (
                  <button
                    key={cap.id}
                    type="button"
                    onClick={() => setActiveCapability(cap.id)}
                    onMouseEnter={() => setHoveredCapability(cap.id)}
                    onMouseLeave={() => setHoveredCapability(null)}
                    className={`border px-4 py-2.5 font-mono text-xs transition-colors ${
                      isSelected || isHovered
                        ? 'border-[#FF4800] bg-[#FF4800]/12 text-[#F3F1EC]'
                        : 'border-white/[0.09] bg-[#111114] text-[#84848D] hover:text-[#F3F1EC]'
                    }`}
                  >
                    {cap.label}
                  </button>
                );
              })}
            </div>

            {/* Matriz Industrial de Especificações */}
            <div className="mt-8 grid grid-cols-1 gap-px border border-white/[0.09] bg-white/[0.09] sm:grid-cols-2 lg:grid-cols-4">
              {TECH_MATRIX.map((tech) => {
                const isHighlighted =
                  effectiveCapability === 'ALL' ||
                  tech.capabilities.includes(effectiveCapability);

                return (
                  <div
                    key={tech.code}
                    className={`flex flex-col justify-between p-6 transition-all duration-300 ${
                      isHighlighted
                        ? 'bg-[#111114] opacity-100'
                        : 'bg-[#0B0B0D] opacity-30'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between font-mono text-[10px]">
                        <span className={isHighlighted && effectiveCapability !== 'ALL' ? 'text-[#FF4800]' : 'text-[#84848D]'}>
                          {tech.code}
                        </span>
                        <span
                          className={`h-1.5 w-1.5 transition-colors ${
                            isHighlighted && effectiveCapability !== 'ALL'
                              ? 'bg-[#FF4800]'
                              : 'bg-white/15'
                          }`}
                        />
                      </div>

                      <h3 className="mt-4 font-display text-xl font-bold tracking-tight text-[#F3F1EC]">
                        {tech.name}
                      </h3>
                      <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-[#FF4800]">
                        {tech.role}
                      </div>

                      <p className="mt-3 text-xs leading-relaxed text-[#84848D]">
                        {tech.detail}
                      </p>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-1 border-t border-white/[0.07] pt-3 font-mono text-[9px] uppercase text-[#84848D]">
                      {tech.capabilities.map((c) => (
                        <span
                          key={c}
                          className={`border px-1.5 py-0.5 ${
                            effectiveCapability === c
                              ? 'border-[#FF4800] text-[#F3F1EC]'
                              : 'border-white/10'
                          }`}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==================================================================
            6. CONFIGURADOR DE BRIEFING & ORÇAMENTO (ALTA CONVERSÃO)
           ================================================================== */}
        <section id="briefing" className="scroll-mt-20 border-b border-white/[0.09] py-20 sm:py-28">
          <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
            <div className="max-w-2xl">
              <div className="font-mono text-xs tracking-[0.16em] text-[#FF4800]">
                [04] // INICIAR UM PROJETO
              </div>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#F3F1EC] sm:text-5xl">
                Monte seu{' '}
                <span className="font-serif-editorial font-normal italic text-[#FF4800]">
                  briefing técnico
                </span>{' '}
                em 30 segundos.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#84848D] sm:text-base">
                Selecione o formato do produto e os recursos necessários. O resumo é gerado em tempo
                real para enviarmos direto ao WhatsApp já organizado.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
              {/* Coluna Esquerda: Passos do Configurador */}
              <div className="space-y-8 lg:col-span-7">
                {/* Passo 01 */}
                <div className="border border-white/[0.09] bg-[#111114] p-6">
                  <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#84848D]">
                    <span className="text-[#FF4800]">PASSO 01</span> // O QUE VAMOS CONSTRUIR?
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {BRIEFING_TYPES.map((item) => {
                      const active = briefingType === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setBriefingType(item.id)}
                          className={`flex items-center justify-between border px-4 py-3.5 text-left transition-colors ${
                            active
                              ? 'border-[#FF4800] bg-[#FF4800]/12 text-[#F3F1EC]'
                              : 'border-white/10 bg-[#16161A] text-[#84848D] hover:border-white/25 hover:text-[#F3F1EC]'
                          }`}
                        >
                          <span className="font-display text-sm font-semibold">{item.id}</span>
                          <span
                            className={`flex h-4 w-4 items-center justify-center border ${
                              active ? 'border-[#FF4800] bg-[#FF4800] text-[#09090B]' : 'border-white/20'
                            }`}
                          >
                            {active && <Check className="h-3 w-3" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Passo 02 */}
                <div className="border border-white/[0.09] bg-[#111114] p-6">
                  <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em] text-[#84848D]">
                    <span>
                      <span className="text-[#FF4800]">PASSO 02</span> // MÓDULOS & RECURSOS
                    </span>
                    <span className="text-[10px]">{selectedModules.length} selecionados</span>
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {BRIEFING_MODULES.map((mod) => {
                      const active = selectedModules.includes(mod.id);
                      return (
                        <button
                          key={mod.id}
                          type="button"
                          onClick={() => toggleModule(mod.id)}
                          className={`flex items-center justify-between border px-4 py-3 text-left font-mono text-xs transition-colors ${
                            active
                              ? 'border-[#F3F1EC] bg-[#F3F1EC] font-medium text-[#09090B]'
                              : 'border-white/10 bg-[#16161A] text-[#84848D] hover:border-white/25 hover:text-[#F3F1EC]'
                          }`}
                        >
                          <span>{mod.id}</span>
                          {active ? (
                            <Check className="h-3.5 w-3.5 shrink-0" />
                          ) : (
                            <Plus className="h-3.5 w-3.5 shrink-0 opacity-50" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Passo 03 */}
                <div className="border border-white/[0.09] bg-[#111114] p-6">
                  <div className="font-mono text-xs uppercase tracking-[0.14em] text-[#84848D]">
                    <span className="text-[#FF4800]">PASSO 03</span> // SEUS DADOS
                  </div>
                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="client-name"
                        className="mb-1.5 block font-mono text-[11px] uppercase text-[#84848D]"
                      >
                        Seu Nome
                      </label>
                      <input
                        id="client-name"
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        placeholder="Ex: Marcos Oliveira"
                        className="w-full border border-white/15 bg-[#0C0C0F] px-3.5 py-2.5 text-sm text-[#F3F1EC] placeholder-[#84848D]/50 focus:border-[#FF4800] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="client-business"
                        className="mb-1.5 block font-mono text-[11px] uppercase text-[#84848D]"
                      >
                        Empresa / Segmento
                      </label>
                      <input
                        id="client-business"
                        type="text"
                        value={clientBusiness}
                        onChange={(e) => setClientBusiness(e.target.value)}
                        placeholder="Ex: Loja de Autopeças, Clínica..."
                        className="w-full border border-white/15 bg-[#0C0C0F] px-3.5 py-2.5 text-sm text-[#F3F1EC] placeholder-[#84848D]/50 focus:border-[#FF4800] focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="client-notes"
                        className="mb-1.5 block font-mono text-[11px] uppercase text-[#84848D]"
                      >
                        Observações ou Referência (Opcional)
                      </label>
                      <textarea
                        id="client-notes"
                        rows={3}
                        value={clientNotes}
                        onChange={(e) => setClientNotes(e.target.value)}
                        placeholder="Conte rapidamente o objetivo principal ou algum prazo desejado..."
                        className="w-full resize-none border border-white/15 bg-[#0C0C0F] px-3.5 py-2.5 text-sm text-[#F3F1EC] placeholder-[#84848D]/50 focus:border-[#FF4800] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Coluna Direita: Resumo Técnico Estilo Terminal */}
              <div className="lg:col-span-5">
                <div className="flex h-full flex-col justify-between border border-white/15 bg-[#0D0D10] lg:sticky lg:top-24">
                  <div>
                    {/* Cabeçalho Terminal */}
                    <div className="flex items-center justify-between border-b border-white/10 bg-[#141418] px-5 py-3.5 font-mono text-[11px]">
                      <div className="flex items-center gap-2 text-[#F3F1EC]">
                        <Terminal className="h-3.5 w-3.5 text-[#FF4800]" />
                        <span>RESUMO TÉCNICO DO BRIEFING</span>
                      </div>
                      <span className="text-[#22C55E]">● READY</span>
                    </div>

                    {/* Indicadores de Escopo */}
                    <div className="grid grid-cols-2 border-b border-white/10 font-mono">
                      <div className="border-r border-white/10 p-4">
                        <div className="text-[10px] uppercase text-[#84848D]">Complexidade</div>
                        <div className="mt-1 text-sm font-semibold text-[#FF4800]">
                          {briefingMetrics.level}
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="text-[10px] uppercase text-[#84848D]">Prazo Estimado</div>
                        <div className="mt-1 text-sm font-semibold text-[#F3F1EC]">
                          {briefingMetrics.minDays}–{briefingMetrics.maxDays} dias úteis
                        </div>
                      </div>
                    </div>

                    {/* Preview Dinâmico da Mensagem */}
                    <div className="p-5">
                      <div className="mb-2 font-mono text-[10px] uppercase tracking-wider text-[#84848D]">
                        Prévia da Mensagem Gerada
                      </div>
                      <pre className="max-h-[300px] overflow-y-auto whitespace-pre-wrap border border-white/10 bg-[#09090B] p-4 font-mono text-xs leading-relaxed text-[#F3F1EC]/85">
                        {generatedMessage}
                      </pre>
                    </div>
                  </div>

                  {/* Ações de Envio e Cópia */}
                  <div className="space-y-3 border-t border-white/10 p-5">
                    <MagneticButton
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      cursorLabel="WHATSAPP"
                      className="flex w-full items-center justify-center gap-2 bg-[#FF4800] px-5 py-3.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#09090B] transition-colors hover:bg-[#FF6424]"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Enviar Briefing no WhatsApp</span>
                      <ArrowUpRight className="h-4 w-4" />
                    </MagneticButton>

                    <button
                      type="button"
                      data-cursor="COPIAR"
                      onClick={handleCopyBriefing}
                      className="flex w-full items-center justify-center gap-2 border border-white/15 bg-[#141418] px-5 py-3 font-mono text-xs uppercase tracking-wider text-[#F3F1EC] transition-colors hover:border-white/40"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copiar Resumo</span>
                    </button>

                    <div className="flex items-center justify-center gap-2 pt-1 font-mono text-[10px] text-[#84848D]">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#FF4800]" />
                      <span>Resposta direta com Ricardo Pereira em horário comercial.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ====================================================================
          7. RODAPÉ EDITORIAL
         ==================================================================== */}
      <footer className="bg-[#09090B] pt-16 pb-10">
        <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
          {/* Assinatura Tipográfica Monumental */}
          <div className="border-b border-white/[0.09] pb-10">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div className="font-display text-[clamp(3.75rem,13vw,11rem)] font-bold leading-[0.86] tracking-[-0.04em] text-[#F3F1EC] select-none">
                rcp<span className="text-[#FF4800]">.</span>dev
              </div>

              <MagneticButton
                onClick={scrollToTop}
                cursorLabel="TOPO"
                className="inline-flex w-fit items-center gap-2 border border-white/15 bg-[#111114] px-4 py-3 font-mono text-xs uppercase tracking-wider text-[#F3F1EC] transition-colors hover:border-[#FF4800] hover:text-[#FF4800]"
              >
                <span>Voltar ao topo</span>
                <ArrowUp className="h-4 w-4" />
              </MagneticButton>
            </div>
          </div>

          {/* Barra Inferior de Metadados & Contatos */}
          <div className="mt-8 flex flex-col justify-between gap-6 font-mono text-xs text-[#84848D] md:flex-row md:items-center">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4">
              <span className="text-[#F3F1EC]">© 2026 Ricardo Pereira Angelo</span>
              <span className="hidden sm:inline">•</span>
              <span>Praia Grande, SP — Brasil</span>
            </div>

            <div className="flex flex-wrap items-center gap-6">
              {[
                { label: 'GitHub', href: 'https://github.com/rickrlem123' },
                { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ricardo-pereira-621290331/' },
                { label: 'Email', href: 'https://mail.google.com/mail/?view=cm&to=ricardo@angelo.net.br' },
                { label: 'WhatsApp', href: `https://wa.me/5511943094993` },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="inline-flex items-center gap-1 text-[#84848D] transition-colors hover:text-[#FF4800]"
                >
                  <span>{link.label}</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Drawer de Case Completo */}
      <CaseStudyDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onRequestSimilar={handleRequestSimilar}
      />

      {/* Toast Tátil de Feedback */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed right-5 bottom-5 z-[95] flex items-center gap-3 border border-[#FF4800] bg-[#111114] px-4 py-3 font-mono text-xs text-[#F3F1EC] shadow-2xl"
        >
          <Layers className="h-4 w-4 text-[#FF4800]" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}