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
      kicker: 'TECHNICAL LEAD · AI SYSTEMS · LATAM',
      cert: 'ANTHROPIC CERTIFIED',
      certSub: 'Claude Code in Action · 2026',
      brand: 'crisfon6',
      headlinePrefix: 'I build AI systems that',
      typewords: [
        'run in production.',
        'serve 100K+ users a month.',
        'save 15h/week.',
        'ship weekly.',
      ] as readonly string[],
      description:
        'Certified by Anthropic (Claude Code in Action, 2026). I build agentic systems, MCP workflows, and LLM pipelines that run against real data at scale — then I document the architecture, costs, and working code publicly every week.',
      cta1: "Get this week's AI blueprint",
      cta2: "See what I've built",
      proof: '−43% AWS bill · 30× faster data exports · 5+ years in production',
      fullWorkHistory: 'Full work history →',
    },
    footer: {
      tagline:
        'AI systems engineer. Building and shipping in public. Weekly blueprints you can deploy.',
      pages: 'PAGES',
      connect: 'CONNECT',
    },
    cta: {
      weeklyBlueprints: 'WEEKLY BLUEPRINTS',
      getFreeTemplate: 'Get a production-ready AI template every week',
      noFluff:
        'Architecture diagrams, deployment guides, cost breakdowns, and working code. Shipped from production, not tutorials.',
      dontMiss: "Get this week's AI blueprint",
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
      sectionTitle: 'AUTOMATION OF THE WEEK',
      live: 'LIVE',
      edition: '#06',
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
        'Every week I publish a new AI automation template with architecture diagrams, deployment guides, and working code.',
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
        'Every template in this library is built by an engineer certified in Claude Code in Action (Anthropic, 2026) — architecture-first, cost-conscious, production-ready. Published every week with architecture diagrams, deployment guides, cost breakdowns, and working code. Built from real systems, not tutorials.',
      subscribeTo: 'Subscribe to',
      toGetDelivered: 'to get each one delivered.',
      ctaLabel: 'WEEKLY AI BLUEPRINT',
      ctaHeading: 'Get the blueprint before everyone else',
      ctaDescription:
        'Architecture diagrams, deployment guides, cost breakdowns, and working code. Delivered every week. Free.',
      githubLabel: 'OPEN SOURCE',
      githubHeading: 'All code is on GitHub.',
      githubDescription:
        'Every template ships with the full working code — no paywalls, no login required. Star the repo and follow along as new automations drop weekly.',
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
        'A production-ready AI automation template every week. Architecture diagrams, deployment guides, cost breakdowns, and working code — shipped from real systems, not recycled tutorials.',
      authority: 'Built by an Anthropic-certified AI engineer shipping at LATAM scale.',
      joinBuilders: 'FREE — EVERY WEEK',
      startGetting: 'Start getting blueprints',
      noSpam: 'Free forever — cancel anytime. No spam, ever.',
      whatYouGet: 'WHAT YOU GET EVERY WEEK',
      recentTemplates: 'RECENT & UPCOMING TEMPLATES',
      whoIsThisFor: 'WHO IS THIS FOR',
      finalCtaHeading: "The most useful AI engineering newsletter you'll read this week.",
      finalCtaDescription:
        'Tested, production-ready AI automation templates delivered to your inbox every week. Built by someone who ships.',
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
        "Every week I publish production-ready AI automation templates. If you're building in the AI/automation space, I'm open to collaborating on projects.",
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
        'Every week I share a production-ready AI automation blueprint with architecture diagrams, cost breakdowns, and working code.',
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
      currentWeekLabel: 'CURRENT EDITION',
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
      kicker: 'TECHNICAL LEAD · SISTEMAS DE IA · LATAM',
      cert: 'CERTIFICADO POR ANTHROPIC',
      certSub: 'Claude Code in Action · 2026',
      brand: 'crisfon6',
      headlinePrefix: 'Construyo sistemas de AI que',
      typewords: [
        'corren en producción.',
        'sirven a 100K+ usuarios al mes.',
        'ahorran 15h/semana.',
        'envían cada semana.',
      ] as readonly string[],
      description:
        'Certificado por Anthropic (Claude Code in Action, 2026). Construyo sistemas agénticos, workflows MCP y pipelines de LLMs que corren contra datos reales a escala — y documento la arquitectura, costos y código funcional públicamente cada semana.',
      cta1: 'Obtén el blueprint de AI de esta semana',
      cta2: 'Ver lo que construí',
      proof: '−43% en la factura de AWS · exportaciones 30× más rápidas · 5+ años en producción',
      fullWorkHistory: 'Historia laboral completa →',
    },
    footer: {
      tagline:
        'Ingeniero de sistemas AI. Construyendo y publicando en público. Blueprints que podés deployar, cada semana.',
      pages: 'PAGINAS',
      connect: 'CONECTAR',
    },
    cta: {
      weeklyBlueprints: 'BLUEPRINTS SEMANALES',
      getFreeTemplate: 'Recibe un template de automatización listo para producción cada semana',
      noFluff:
        'Diagramas de arquitectura, guías de deploy, análisis de costos y código funcional. De producción, no de tutoriales.',
      dontMiss: 'Obtén el blueprint de AI de esta semana',
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
      sectionTitle: 'AUTOMATIZACIÓN DE LA SEMANA',
      live: 'EN VIVO',
      edition: '#06',
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
        'Cada semana publico un nuevo template de automatización con IA, diagramas de arquitectura, guías de deploy y código funcional.',
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
        'Cada template en esta biblioteca lo crea un ingeniero certificado en Claude Code in Action (Anthropic, 2026) — architecture-first, cost-conscious, production-ready. Publicados cada semana con diagramas de arquitectura, guías de deploy, análisis de costos y código funcional. De sistemas reales, no tutoriales.',
      subscribeTo: 'Suscribete a',
      toGetDelivered: 'para recibirlos.',
      ctaLabel: 'BLUEPRINT DE AI SEMANAL',
      ctaHeading: 'Recibí el blueprint antes que todos',
      ctaDescription:
        'Diagramas de arquitectura, guías de deploy, análisis de costos y código funcional. Cada semana. Gratis.',
      githubLabel: 'CÓDIGO ABIERTO',
      githubHeading: 'Todo el código está en GitHub.',
      githubDescription:
        'Cada template viene con el código completo y funcional — sin paywalls, sin login requerido. Dale una estrella al repo y seguí cada automatización nueva que sale cada semana.',
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
        'Un template de automatización con AI listo para producción cada semana. Diagramas de arquitectura, guías de deploy, análisis de costos y código funcional — de sistemas reales, no tutoriales reciclados.',
      authority:
        'Creado por un ingeniero de AI certificado por Anthropic construyendo a escala LATAM.',
      joinBuilders: 'GRATIS — CADA SEMANA',
      startGetting: 'Empezá a recibir blueprints',
      noSpam: 'Gratis para siempre — cancelá cuando quieras. Sin spam.',
      whatYouGet: 'LO QUE RECIBÍS CADA SEMANA',
      recentTemplates: 'TEMPLATES RECIENTES Y PRÓXIMOS',
      whoIsThisFor: 'PARA QUIÉN ES ESTO',
      finalCtaHeading: 'El newsletter de ingeniería AI más útil que vas a leer esta semana.',
      finalCtaDescription:
        'Templates de automatización listos para producción en tu inbox cada semana. Creados por alguien que envía a producción.',
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
        'Cada semana publico templates de automatización con AI listos para producción. Si construís en el espacio de AI/automatización, estoy abierto a colaborar.',
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
        'Cada semana comparto un blueprint de automatización con AI listo para producción con diagramas de arquitectura, análisis de costos y código funcional.',
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
      currentWeekLabel: 'EDICIÓN ACTUAL',
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
