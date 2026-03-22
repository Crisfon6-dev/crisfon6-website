export const messages = {
  en: {
    nav: {
      about: "About",
      projects: "Projects",
      automations: "Automations",
      blog: "Blog",
      subscribe: "Subscribe",
    },
    hero: {
      tagline: "TECHNICAL LEAD & AI BUILDER",
      heading1: "I ship FinTech at scale",
      heading2: "and build AI automations",
      heading3: "you can steal.",
      description:
        "Technical Lead building a national-scale credit marketplace by day. AI automation builder sharing blueprints and templates in public.",
      cta1: "Don't miss this week's blueprint",
      cta2: "See my work",
      socialProof: "Join 500+ engineers getting weekly blueprints",
    },
    footer: {
      tagline:
        "FinTech at scale by day. AI automations in public by night. Blueprints you can deploy, every week.",
      pages: "PAGES",
      connect: "CONNECT",
    },
    cta: {
      weeklyBlueprints: "WEEKLY BLUEPRINTS",
      getFreeTemplate: "Get a free automation template every week",
      noFluff:
        "Architecture diagrams, deployment guides, cost breakdowns, and working code. No fluff.",
      dontMiss: "Don't miss this week's blueprint",
      freeForever: "Free forever. Unsubscribe anytime.",
      letsTalk: "LET'S CONNECT",
      buildingSomething: "Building something interesting? Let's talk.",
      openTo:
        "Open to connecting with founders, CTOs, and builders shipping ambitious products.",
      connectLinkedIn: "Connect on LinkedIn",
    },
  },
  es: {
    nav: {
      about: "Sobre mi",
      projects: "Proyectos",
      automations: "Automatizaciones",
      blog: "Blog",
      subscribe: "Suscribirse",
    },
    hero: {
      tagline: "TECHNICAL LEAD & AI BUILDER",
      heading1: "Construyo FinTech a escala",
      heading2: "y creo automatizaciones con IA",
      heading3: "que puedes robar.",
      description:
        "Technical Lead construyendo un marketplace de credito a escala nacional. Builder de automatizaciones con IA compartiendo blueprints en publico.",
      cta1: "No te pierdas el blueprint de esta semana",
      cta2: "Ver mi trabajo",
      socialProof: "Unete a 500+ ingenieros recibiendo blueprints semanales",
    },
    footer: {
      tagline:
        "FinTech a escala de dia. Automatizaciones con IA de noche. Blueprints que puedes desplegar, cada semana.",
      pages: "PAGINAS",
      connect: "CONECTAR",
    },
    cta: {
      weeklyBlueprints: "BLUEPRINTS SEMANALES",
      getFreeTemplate:
        "Recibe un template de automatizacion gratis cada semana",
      noFluff:
        "Diagramas de arquitectura, guias de deploy, analisis de costos y codigo funcional.",
      dontMiss: "No te pierdas el blueprint de esta semana",
      freeForever: "Gratis para siempre. Cancela cuando quieras.",
      letsTalk: "CONECTEMOS",
      buildingSomething: "Construyendo algo interesante? Hablemos.",
      openTo:
        "Abierto a conectar con founders, CTOs y builders creando productos ambiciosos.",
      connectLinkedIn: "Conectar en LinkedIn",
    },
  },
} as const;

export type Locale = keyof typeof messages;
export type Messages = (typeof messages)[Locale];
