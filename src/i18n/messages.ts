export const messages = {
  en: {
    nav: {
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      automations: 'Automations',
      blog: 'Blog',
      subscribe: 'PowerAI',
      workWithMe: 'Work with me',
    },
    hero: {
      kicker: 'TECH LEAD · AI ORCHESTRATOR · LATAM',
      cert: 'ANTHROPIC CERTIFIED',
      certSub: 'Claude Code in Action · 2026',
      brand: 'crisfon6',
      headlinePrefix: 'I build AI systems that',
      headlineAccent: 'run in production.',
      description:
        'I build agentic systems, MCP workflows, and LLM pipelines that run against real data at scale.',
      businessAngle:
        'Technology serves the business, not the other way around. I build what moves the metric, not what looks good in the codebase.',
      cta1: 'Get the latest AI blueprint',
      cta2: "See what I've built",
      bridge: 'Six chapters. One order: product, business, then code.',
      fullWorkHistory: 'Full work history →',
    },
    chapters: {
      label: 'Chapter',
      seeCase: 'Read the case',
      workWithMe: 'Work with me',
      items: {
        blueprint: {
          title: 'Start with the blueprint',
          claim: 'Before any code, I ask who it hurts and what it costs.',
        },
        compute: {
          title: 'Cut the bill',
          claim: 'The cloud bill was a business problem, not an infrastructure one.',
        },
        data: {
          title: 'Make data instant',
          claim: 'Teams stopped waiting on reports and started deciding.',
        },
        agents: {
          title: 'Put agents to work',
          claim: 'A backlog went in. Reviewed pull requests came out, in a day.',
        },
        delivery: {
          title: 'Deliver to real users',
          claim: 'Real users, inside a much bigger ecosystem.',
        },
        reveal: {
          title: 'See it run',
          claim: 'Years in production teach what demos never show.',
        },
      },
    },
    footer: {
      tagline:
        'AI systems engineer. Building and shipping in public. Production blueprints from systems that actually run.',
      pages: 'PAGES',
      connect: 'CONNECT',
      aiMedia: 'The hero film and its imagery were generated with AI.',
    },
    cta: {
      productionBlueprints: 'PRODUCTION BLUEPRINTS',
      getFreeTemplate: 'Production blueprints from systems that actually run',
      noFluff:
        'Architecture diagrams, deployment guides, cost breakdowns, and working code. Shipped from production, not tutorials.',
      dontMiss: 'Get the latest AI blueprint',
      freeForever: 'Free forever. Unsubscribe anytime.',
      letsTalk: "LET'S CONNECT",
      buildingSomething: "Building AI into your product? Let's talk.",
      openTo: 'I connect with founders, CTOs, and senior engineers shipping products at scale.',
      connectLinkedIn: 'Connect on LinkedIn',
      emailMe: 'Email me',
      subscribeNewsletter: 'Subscribe to newsletter',
      subscribeZTP: 'Subscribe to PowerAI',
      viewBlueprint: 'View blueprint',
      viewAll: 'View all',
    },
    automation: {
      sectionTitle: 'FEATURED AUTOMATION',
      live: 'LIVE',
      title: 'AI-Powered Document Processor',
      description:
        'Ingest PDFs, extract structured data with Claude API, store in PostgreSQL. Deployed on AWS Lambda with S3 triggers.',
      infraCost: 'INFRA COST',
      infraCostValue: '~$12/month',
      timeSaved: 'TIME SAVED',
      timeSavedValue: '12h/week',
      value: 'Value: ~$2,000 in dev time',
      cta: 'See full blueprint',
    },
    pipeline: {
      nodes: [
        { label: 'S3', sub: 'ingest' },
        { label: 'Lambda', sub: 'orchestrate' },
        { label: 'Claude', sub: 'extract' },
        { label: 'Postgres', sub: 'store' },
      ] as readonly { label: string; sub: string }[],
    },
    marquee: {
      items: [
        'AWS',
        'CDK',
        'Lambda',
        'Claude API',
        'MCP',
        'Next.js',
        'Python',
        'FastAPI',
        'TypeScript',
        'Angular',
        'Node',
        'PostgreSQL',
        'pgvector',
        'S3',
        'DynamoDB',
      ] as readonly string[],
    },
    featuredProjects: 'Featured Projects',
    about: {
      heading1: 'I build AI systems that run at scale.',
      heading2: 'And I document everything.',
      intro1:
        "I'm Cristhian Fonseca — a Technical Lead with 5+ years building cloud-native FinTech and banking platforms.",
      businessAngle:
        'Technology serves the business, not the other way around. I build what moves the metric, not what looks good in the codebase.',
      intro2:
        "Right now I lead engineering for a digital credit marketplace inside a major telecom's Super App — ~100K monthly active users within a 45M-user ecosystem. Cloud-native on AWS, automated provisioning, zero-paperwork loans.",
      intro3:
        'I specialize in agentic AI systems — MCP agents, multi-step LLM pipelines, and automation architectures that handle real data volumes with real cost constraints. Every system I publish is first deployed in production.',
      intro4:
        "I believe the best engineers don't just write code — they build systems that compound. And they share what they learn.",
      coreStack: 'CORE STACK',
      experience: 'EXPERIENCE',
      education: 'EDUCATION & CERTIFICATIONS',
      ctaHeading: "Building with AI at scale? Let's connect.",
      ctaDescription:
        'Always open to connecting with founders, CTOs, and engineers shipping ambitious products.',
      whyBuildInPublicLabel: 'WHY I BUILD IN PUBLIC',
      whyPara1:
        "Most engineers keep their best architecture decisions private. I think that's backwards. When I ship something that works, I document it and publish it. The community makes me better.",
      whyPara2:
        "This isn't hypothetical. Every automation template in PowerAI was first deployed in a real system. Every architecture diagram was drawn after the code ran in production.",
      whyPara3:
        "If you're building with AI, I want to hear what you're solving. The best ideas in this newsletter come from conversations with engineers who are actually shipping.",
    },
    projects: {
      heading: "Systems I've shipped.",
      description:
        'FinTech and banking platforms in production, cloud infrastructure for a US platform, and AI agents that run on real data — each tied to the employer, period and role.',
      ctaHeading: 'Want the AI architecture blueprints?',
      ctaDescription:
        'Production blueprints from systems that actually run: architecture diagrams, deployment guides, and working code.',
      roleLink: 'See role in experience →',
      context: 'Context',
      whatIDid: 'What I did',
      outcome: 'Outcome',
      tierA: 'FEATURED',
      tierB: 'PRODUCTION ENGINEERING',
      tierC: 'EARLIER WORK',
      preLaunch:
        'Pre-launch: no user metrics yet. Code is private; happy to walk through it in an interview.',
    },
    experience: {
      label: 'EXPERIENCE',
      keyFacts: 'AT A GLANCE',
      history: 'WORK HISTORY',
      current: 'Current',
      present: 'Present',
      seeCaseStudy: 'See case study →',
      education: 'EDUCATION & CERTIFICATIONS',
      verify: 'Verify ↗',
      openTo: 'Open to',
      print: 'Save as PDF',
      emailMe: 'Email me',
      confidential:
        "Client names are withheld under confidentiality agreements. I'm happy to share them — and references — during a hiring process.",
      ctaHeading: 'Hiring for a remote Technical Lead?',
      ctaDescription: "Email me and I'll share references and client details for your process.",
      founderWork: 'FOUNDER WORK',
      howIWork: 'HOW I WORK',
      writing: 'WRITING',
      testimonials: 'WHAT PEOPLE SAY',
    },
    automations: {
      heading: 'AI automations you can steal.',
      description:
        'Every template in this library is built by an engineer certified in Claude Code in Action (Anthropic, 2026) — architecture-first, cost-conscious, production-ready. Production blueprints from systems that actually run, with architecture diagrams, deployment guides, cost breakdowns, and working code. Built from real systems, not tutorials.',
      subscribeTo: 'Subscribe to',
      toGetDelivered: 'to get each one delivered.',
      ctaLabel: 'AI BLUEPRINTS',
      ctaHeading: 'Get the blueprint before everyone else',
      ctaDescription:
        'Architecture diagrams, deployment guides, cost breakdowns, and working code. Delivered to your inbox. Free.',
      githubLabel: 'OPEN SOURCE',
      githubHeading: 'All code is on GitHub.',
      githubDescription:
        'Every template ships with the full working code — no paywalls, no login required. Star the repo and follow along as new automations land.',
      githubCta: 'View on GitHub',
    },
    blog: {
      heading: 'Lessons from the trenches.',
      description:
        'Deep technical dives from someone who runs AI systems in production — not tutorials, not hot takes. Architecture breakdowns and hard-won lessons from building at scale.',
      comingNext: 'COMING NEXT',
      ctaHeading: 'Be the first to read each deep dive',
      ctaDescription: 'Get every article and automation template delivered to your inbox.',
    },
    newsletter: {
      heading: 'PowerAI',
      description:
        'Production blueprints from systems that actually run. Architecture diagrams, deployment guides, cost breakdowns, and working code — not recycled tutorials.',
      authority: 'Built by an Anthropic-certified AI engineer shipping at LATAM scale.',
      joinBuilders: 'FREE · PRODUCTION BLUEPRINTS',
      startGetting: 'Start getting blueprints',
      noSpam: 'Free forever — cancel anytime. No spam, ever.',
      whatYouGet: 'WHAT YOU GET',
      recentTemplates: 'RECENT & UPCOMING TEMPLATES',
      whoIsThisFor: 'WHO IS THIS FOR',
      finalCtaHeading: "The most useful AI engineering newsletter you'll read this week.",
      finalCtaDescription:
        'Tested, production-ready AI automation templates delivered to your inbox. Built by someone who ships.',
    },
    workWithMe: {
      heading: "Let's build something with AI that actually works.",
      description:
        "I'm always looking to connect with ambitious founders, CTOs, and engineers shipping products at scale.",
      strategic: 'Strategic Conversations',
      strategicDescription:
        "I enjoy meeting founders and CTOs navigating AI adoption, agentic systems, and engineering at scale. If you're building something ambitious, let's talk.",
      openSource: 'Open Source & Collaboration',
      openSourceDescription:
        "I publish production-ready AI automation templates from systems that actually run. If you're building in the AI/automation space, I'm open to collaborating on projects.",
      leadership: 'Leadership Opportunities',
      leadershipDescription:
        'Remote Technical Lead / Staff roles with US teams (CT/ET overlap), full-time or contract.',
      advisory: 'AI Engineering Advisory',
      advisoryDescription:
        "If you're a founder evaluating AI systems architecture, I consult on build vs. buy decisions, stack selection, and production deployment strategy.",
      advisoryCta: 'Email me',
      proofHeading: 'TRACK RECORD',
      stayConnected: 'The best way to stay connected',
      stayConnectedDescription:
        'Production blueprints from systems that actually run — architecture diagrams, cost breakdowns, and working code.',
      services: [
        {
          title: 'Strategic Conversations',
          description:
            'Founders & CTOs navigating AI adoption, agentic systems, engineering at scale.',
        },
        {
          title: 'Open Source & Collaboration',
          description: 'Production-ready AI automation templates. Open to building together.',
        },
        {
          title: 'Leadership Opportunities',
          description: 'Remote Technical Lead / Staff roles with US teams, full-time or contract.',
        },
        {
          title: 'AI Engineering Advisory',
          description: 'Build vs buy, stack selection, production deployment strategy.',
        },
      ] as readonly { title: string; description: string }[],
      contact: {
        linkedinLabel: 'LinkedIn',
        linkedinSub: '/in/crisfon6',
        emailLabel: 'Email',
        emailSub: 'crisfon6@crisfon6.com',
        githubLabel: 'GitHub',
        githubSub: '@Crisfon6-dev',
      },
    },
    building: {
      sectionLabel: "WHAT I'M BUILDING",
      liveLabel: 'LIVE',
      subscribersLabel: 'SUBSCRIBERS',
      subscribeLabel: 'Subscribe free',
      nextLabel: 'COMING SOON',
      nextTitle: 'Next Project',
      nextProjectDesc:
        'An AI-native tool for engineering teams. Building in public. Follow the process.',
      followAlong: 'Follow along',
    },
  },
  es: {
    nav: {
      about: 'Sobre mi',
      experience: 'Experiencia',
      projects: 'Proyectos',
      automations: 'Automatizaciones',
      blog: 'Blog',
      subscribe: 'PowerAI',
      workWithMe: 'Trabajemos juntos',
    },
    hero: {
      kicker: 'TECH LEAD · ORQUESTADOR DE IA · LATAM',
      cert: 'CERTIFICADO POR ANTHROPIC',
      certSub: 'Claude Code in Action · 2026',
      brand: 'crisfon6',
      headlinePrefix: 'Construyo sistemas de AI que',
      headlineAccent: 'corren en producción.',
      description:
        'Construyo sistemas agénticos, workflows MCP y pipelines de LLMs que corren contra datos reales a escala.',
      businessAngle:
        'La tecnología obedece al negocio, no al revés. Construyo lo que mueve la métrica, no lo que luce bonito en el código.',
      cta1: 'Obtén el último blueprint de AI',
      cta2: 'Ver lo que construí',
      bridge: 'Seis capítulos. Un orden: producto, negocio y, al final, código.',
      fullWorkHistory: 'Historia laboral completa →',
    },
    chapters: {
      label: 'Capítulo',
      seeCase: 'Leer el caso',
      workWithMe: 'Trabaja conmigo',
      items: {
        blueprint: {
          title: 'Empieza por el plano',
          claim: 'Antes del código, pregunto a quién le duele y cuánto cuesta.',
        },
        compute: {
          title: 'Recorta la factura',
          claim: 'La factura de nube era un problema de negocio, no de infraestructura.',
        },
        data: {
          title: 'Datos al instante',
          claim: 'Los equipos dejaron de esperar reportes y empezaron a decidir.',
        },
        agents: {
          title: 'Pon a trabajar a los agentes',
          claim: 'Entra un backlog. Salen pull requests revisados, en un día.',
        },
        delivery: {
          title: 'Entrega a usuarios reales',
          claim: 'Usuarios reales, dentro de un ecosistema mucho mayor.',
        },
        reveal: {
          title: 'Míralo funcionar',
          claim: 'Los años en producción enseñan lo que ninguna demo muestra.',
        },
      },
    },
    footer: {
      tagline:
        'Ingeniero de sistemas AI. Construyendo y publicando en público. Blueprints de producción, de sistemas que de verdad corren.',
      pages: 'PAGINAS',
      connect: 'CONECTAR',
      aiMedia: 'La película del hero y sus imágenes fueron generadas con IA.',
    },
    cta: {
      productionBlueprints: 'BLUEPRINTS DE PRODUCCIÓN',
      getFreeTemplate: 'Blueprints de producción, de sistemas que de verdad corren',
      noFluff:
        'Diagramas de arquitectura, guías de deploy, análisis de costos y código funcional. De producción, no de tutoriales.',
      dontMiss: 'Obtén el último blueprint de AI',
      freeForever: 'Gratis para siempre. Cancela cuando quieras.',
      letsTalk: 'CONECTEMOS',
      buildingSomething: '¿Integrando AI en tu producto? Hablemos.',
      openTo: 'Conecto con founders, CTOs e ingenieros senior creando productos a escala.',
      connectLinkedIn: 'Conectar en LinkedIn',
      emailMe: 'Enviar email',
      subscribeNewsletter: 'Suscribirse al newsletter',
      subscribeZTP: 'Suscribirse a PowerAI',
      viewBlueprint: 'Ver blueprint',
      viewAll: 'Ver todos',
    },
    automation: {
      sectionTitle: 'AUTOMATIZACIÓN DESTACADA',
      live: 'EN VIVO',
      title: 'Procesador de Documentos con IA',
      description:
        'Ingesta de PDFs, extracción de datos estructurados con Claude API, almacenamiento en PostgreSQL. Deployado en AWS Lambda con triggers de S3.',
      infraCost: 'COSTO INFRA',
      infraCostValue: '~$12/mes',
      timeSaved: 'TIEMPO AHORRADO',
      timeSavedValue: '12h/semana',
      value: 'Valor: ~$2,000 en tiempo de desarrollo',
      cta: 'Ver blueprint completo',
    },
    pipeline: {
      nodes: [
        { label: 'S3', sub: 'ingesta' },
        { label: 'Lambda', sub: 'orquesta' },
        { label: 'Claude', sub: 'extrae' },
        { label: 'Postgres', sub: 'almacena' },
      ] as readonly { label: string; sub: string }[],
    },
    marquee: {
      items: [
        'AWS',
        'CDK',
        'Lambda',
        'Claude API',
        'MCP',
        'Next.js',
        'Python',
        'FastAPI',
        'TypeScript',
        'Angular',
        'Node',
        'PostgreSQL',
        'pgvector',
        'S3',
        'DynamoDB',
      ] as readonly string[],
    },
    featuredProjects: 'Proyectos Destacados',
    about: {
      heading1: 'Construyo sistemas de AI que corren a escala.',
      heading2: 'Y documento todo.',
      intro1:
        'Soy Cristhian Fonseca — Technical Lead con más de 5 años construyendo plataformas cloud-native de FinTech y banca.',
      businessAngle:
        'La tecnología obedece al negocio, no al revés. Construyo lo que mueve la métrica, no lo que luce bonito en el código.',
      intro2:
        'Hoy lidero la ingeniería de un marketplace de crédito digital dentro de la Super App de una gran telco — ~100K usuarios activos mensuales en un ecosistema de 45M. Cloud-native en AWS, aprovisionamiento automatizado, créditos sin papeles.',
      intro3:
        'Me especializo en sistemas de AI agénticos — agentes MCP, pipelines de LLMs multi-paso y arquitecturas de automatización que manejan volúmenes de datos reales con restricciones de costo reales. Cada sistema que publico fue primero deployado en producción.',
      intro4:
        'Creo que los mejores ingenieros no solo escriben código — construyen sistemas que se componen. Y comparten lo que aprenden.',
      coreStack: 'STACK PRINCIPAL',
      experience: 'EXPERIENCIA',
      education: 'EDUCACIÓN Y CERTIFICACIONES',
      ctaHeading: '¿Construyendo con AI a escala? Conectemos.',
      ctaDescription:
        'Siempre abierto a conectar con founders, CTOs e ingenieros creando productos ambiciosos.',
      whyBuildInPublicLabel: 'POR QUÉ CONSTRUYO EN PÚBLICO',
      whyPara1:
        'La mayoría de los ingenieros mantienen sus mejores decisiones de arquitectura en privado. Creo que eso está al revés. Cuando construyo algo que funciona, lo documento y lo publico. La comunidad me hace mejor.',
      whyPara2:
        'Esto no es teórico. Cada template de automatización en PowerAI fue primero deployado en un sistema real. Cada diagrama de arquitectura fue dibujado después de que el código corrió en producción.',
      whyPara3:
        'Si estás construyendo con AI, quiero escuchar qué estás resolviendo. Las mejores ideas de este newsletter vienen de conversaciones con ingenieros que realmente están enviando a producción.',
    },
    projects: {
      heading: 'Sistemas que he deployado.',
      description:
        'Plataformas FinTech y bancarias en producción, infraestructura cloud para una plataforma de EE. UU. y agentes de IA sobre datos reales — cada uno ligado a la empresa, el periodo y el cargo.',
      ctaHeading: '¿Querés los blueprints de arquitectura AI?',
      ctaDescription:
        'Blueprints de producción, de sistemas que de verdad corren: diagramas de arquitectura, guías de deploy y código funcional.',
      roleLink: 'Ver cargo en experiencia →',
      context: 'Contexto',
      whatIDid: 'Qué hice',
      outcome: 'Resultado',
      tierA: 'DESTACADOS',
      tierB: 'INGENIERÍA EN PRODUCCIÓN',
      tierC: 'TRABAJO ANTERIOR',
      preLaunch:
        'Pre-lanzamiento: aún no hay métricas de usuarios. El código es privado; con gusto lo recorro en una entrevista.',
    },
    experience: {
      label: 'EXPERIENCIA',
      keyFacts: 'EN RESUMEN',
      history: 'HISTORIA LABORAL',
      current: 'Actual',
      present: 'Presente',
      seeCaseStudy: 'Ver caso →',
      education: 'EDUCACIÓN Y CERTIFICACIONES',
      verify: 'Verificar ↗',
      openTo: 'Disponible para',
      print: 'Guardar como PDF',
      emailMe: 'Escríbeme',
      confidential:
        'Los nombres de clientes se omiten por acuerdos de confidencialidad. Con gusto los comparto — junto con referencias — dentro de un proceso de contratación.',
      ctaHeading: '¿Buscas un Technical Lead remoto?',
      ctaDescription: 'Escríbeme y te comparto referencias y detalles de clientes para tu proceso.',
      founderWork: 'PROYECTOS PROPIOS',
      howIWork: 'CÓMO TRABAJO',
      writing: 'ESCRITOS',
      testimonials: 'LO QUE DICEN',
    },
    automations: {
      heading: 'Automatizaciones con IA que podés robar.',
      description:
        'Cada template en esta biblioteca lo crea un ingeniero certificado en Claude Code in Action (Anthropic, 2026) — architecture-first, cost-conscious, production-ready. Blueprints de producción, de sistemas que de verdad corren, con diagramas de arquitectura, guías de deploy, análisis de costos y código funcional. De sistemas reales, no tutoriales.',
      subscribeTo: 'Suscribete a',
      toGetDelivered: 'para recibirlos.',
      ctaLabel: 'BLUEPRINTS DE AI',
      ctaHeading: 'Recibí el blueprint antes que todos',
      ctaDescription:
        'Diagramas de arquitectura, guías de deploy, análisis de costos y código funcional. Directo a tu inbox. Gratis.',
      githubLabel: 'CÓDIGO ABIERTO',
      githubHeading: 'Todo el código está en GitHub.',
      githubDescription:
        'Cada template viene con el código completo y funcional — sin paywalls, sin login requerido. Dale una estrella al repo y seguí cada automatización nueva que se publique.',
      githubCta: 'Ver en GitHub',
    },
    blog: {
      heading: 'Lecciones desde las trincheras.',
      description:
        'Deep dives técnicos de alguien que corre sistemas de AI en producción — no tutoriales, no hot takes. Análisis de arquitectura y lecciones ganadas a pulso construyendo a escala.',
      comingNext: 'PRÓXIMAMENTE',
      ctaHeading: 'Sé el primero en leer cada deep dive',
      ctaDescription: 'Recibí cada artículo y template de automatización en tu inbox.',
    },
    newsletter: {
      heading: 'PowerAI',
      description:
        'Blueprints de producción, de sistemas que de verdad corren. Diagramas de arquitectura, guías de deploy, análisis de costos y código funcional — no tutoriales reciclados.',
      authority:
        'Creado por un ingeniero de AI certificado por Anthropic construyendo a escala LATAM.',
      joinBuilders: 'GRATIS · BLUEPRINTS DE PRODUCCIÓN',
      startGetting: 'Empezá a recibir blueprints',
      noSpam: 'Gratis para siempre — cancelá cuando quieras. Sin spam.',
      whatYouGet: 'LO QUE RECIBÍS',
      recentTemplates: 'TEMPLATES RECIENTES Y PRÓXIMOS',
      whoIsThisFor: 'PARA QUIÉN ES ESTO',
      finalCtaHeading: 'El newsletter de ingeniería AI más útil que vas a leer esta semana.',
      finalCtaDescription:
        'Templates de automatización listos para producción en tu inbox. Creados por alguien que envía a producción.',
    },
    workWithMe: {
      heading: 'Construyamos algo con AI que realmente funcione.',
      description:
        'Siempre busco conectar con founders, CTOs e ingenieros ambiciosos creando productos a escala.',
      strategic: 'Conversaciones Estratégicas',
      strategicDescription:
        'Me gusta conocer founders y CTOs navegando la adopción de AI, sistemas agénticos e ingeniería a escala. Si estás construyendo algo ambicioso, hablemos.',
      openSource: 'Open Source y Colaboración',
      openSourceDescription:
        'Publico templates de automatización con AI listos para producción, de sistemas que de verdad corren. Si construís en el espacio de AI/automatización, estoy abierto a colaborar.',
      leadership: 'Oportunidades de Liderazgo',
      leadershipDescription:
        'Roles remotos de Technical Lead / Staff con equipos de EE. UU. (horario CT/ET), tiempo completo o contrato.',
      advisory: 'Asesoría en Ingeniería AI',
      advisoryDescription:
        'Si sos un founder evaluando arquitectura de sistemas AI, consulto sobre decisiones de build vs. buy, selección de stack y estrategia de deployment a producción.',
      advisoryCta: 'Enviar email',
      proofHeading: 'TRAYECTORIA',
      stayConnected: 'La mejor forma de mantenernos conectados',
      stayConnectedDescription:
        'Blueprints de producción, de sistemas que de verdad corren — con diagramas de arquitectura, análisis de costos y código funcional.',
      services: [
        {
          title: 'Conversaciones Estratégicas',
          description:
            'Founders y CTOs navegando adopción de AI, sistemas agénticos, ingeniería a escala.',
        },
        {
          title: 'Open Source y Colaboración',
          description:
            'Templates de automatización con AI listos para producción. Abierto a colaborar.',
        },
        {
          title: 'Oportunidades de Liderazgo',
          description:
            'Roles remotos de Technical Lead / Staff con equipos de EE. UU., tiempo completo o contrato.',
        },
        {
          title: 'Asesoría en Ingeniería AI',
          description: 'Build vs buy, selección de stack, estrategia de deployment a producción.',
        },
      ] as readonly { title: string; description: string }[],
      contact: {
        linkedinLabel: 'LinkedIn',
        linkedinSub: '/in/crisfon6',
        emailLabel: 'Email',
        emailSub: 'crisfon6@crisfon6.com',
        githubLabel: 'GitHub',
        githubSub: '@Crisfon6-dev',
      },
    },
    building: {
      sectionLabel: 'LO QUE ESTOY CONSTRUYENDO',
      liveLabel: 'EN VIVO',
      subscribersLabel: 'SUSCRIPTORES',
      subscribeLabel: 'Suscribirse gratis',
      nextLabel: 'PRÓXIMAMENTE',
      nextTitle: 'Próximo Proyecto',
      nextProjectDesc:
        'Una herramienta AI-native para equipos de ingeniería. Construyendo en público. Seguí el proceso.',
      followAlong: 'Seguir el proceso',
    },
  },
} as const;

export type Locale = keyof typeof messages;
export type Messages = (typeof messages)[Locale];
