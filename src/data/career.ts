export type L = { en: string; es: string };
export type YearMonth = `${number}-${string}`;
export type Year = `${number}`;
export type DatePrecision = YearMonth | Year;

export type Role = {
  id: 'prosperas' | 'esoluzion' | 'imkglobal' | 'dualboot' | 'accenture' | 'founder';
  kind: 'employment' | 'founder';
  employer: L;
  title: L;
  start: DatePrecision;
  end: DatePrecision | null;
  type: L;
  location?: string;
  clientLine: L;
  bullets: readonly L[];
  stack: readonly string[];
  caseStudyIds: readonly CaseStudy['id'][];
};

export type Incident = { symptom: L; cause?: L; fix?: L };

export type CaseStudy = {
  id:
    | 'ai-in-production'
    | 'credit-marketplace'
    | 'aws-cost-audit'
    | 'conversational-ai-product'
    | 'analytics-platform'
    | 'production-reliability'
    | 'identity-integrity'
    | 'public-platform-surfaces'
    | 'core-banking-modules'
    | 'us-car-rental-cloud'
    | 'govtech-tourism-apps'
    | 'banking-telecom-data';
  tier: 'A' | 'B' | 'C';
  incidents?: readonly Incident[];
  footnote?: L;
  roleId: Role['id'];
  tag: string;
  status: L;
  title: L;
  context?: L;
  whatIDid: readonly L[];
  outcomes: readonly L[];
  stack: readonly string[];
  featured?: boolean;
  repoUrl?: string;
  liveUrl?: string;
};

export type Credential = {
  name: L;
  issuer: string;
  date: string;
  verifyUrl?: string;
  kind: 'degree' | 'cert';
};

export type KeyFact = { value: string; label: L };
export type Principle = { title: L; proof: L };
export type WritingEntry = { date: string; title: L; lesson: string; url?: string };
export type Testimonial = { quote: L; name: string; role: string; relation: string };
export type StackGroup = { group: string; items: readonly string[] };
export type Profile = {
  displayName: string;
  legalName: string;
  title: L;
  tagline: L;
  location: L;
  email: string;
  linkedin: string;
  github: string;
  openTo: L;
  summary: L;
  confidential: L;
};

export const PROFILE: Profile = {
  displayName: 'Cristhian Fonseca',
  legalName: 'Cristhian Javier Delgado Fonseca',
  title: { en: 'Technical Lead', es: 'Technical Lead' },
  tagline: {
    en: 'AI agents in production · FinTech at scale on AWS',
    es: 'Agentes de IA en producción · FinTech a escala en AWS',
  },
  location: {
    en: 'Colombia · Remote (CT/ET overlap)',
    es: 'Colombia · Remoto (horario CT/ET)',
  },
  email: 'crisfon6@crisfon6.com',
  linkedin: 'https://www.linkedin.com/in/crisfon6/',
  github: 'https://github.com/Crisfon6-dev',
  openTo: {
    en: 'Remote Technical Lead / Senior AI Engineer roles with US teams · full-time or contract',
    es: 'Roles remotos de Technical Lead / Senior AI Engineer con equipos de EE. UU. · tiempo completo o contrato',
  },
  summary: {
    en: "Technical Lead and full-stack engineer with 5+ years building cloud-native FinTech and banking platforms. I lead engineering for a digital credit marketplace embedded in a major telecom's Super App — ~100K monthly active users inside a 45M-user ecosystem — and since 2022 I've built core banking modules for an enterprise banking client. I build AI systems that run in production — an MCP server the business uses to query live data, an autonomous triage agent, a multi-agent delivery pipeline — and I own the AWS underneath: I cut our cloud bill by 43% and trace every incident to root cause.",
    es: 'Technical Lead e ingeniero full-stack con más de 5 años construyendo plataformas cloud-native de FinTech y banca. Lidero la ingeniería de un marketplace de crédito digital integrado en la Super App de una gran telco — ~100K usuarios activos mensuales dentro de un ecosistema de 45M — y desde 2022 construyo módulos de core bancario para un cliente de banca empresarial. Construyo sistemas de IA que corren en producción — un servidor MCP con el que el negocio consulta datos en vivo, un agente autónomo de triage, un pipeline de entrega multiagente — y soy dueño del AWS que hay debajo: bajé nuestra factura cloud un 43% y llevo cada incidente hasta su causa raíz.',
  },
  confidential: {
    en: "Client names are withheld under confidentiality agreements. I'm happy to share them — and references — during a hiring process.",
    es: 'Los nombres de clientes se omiten por acuerdos de confidencialidad. Con gusto los comparto — junto con referencias — dentro de un proceso de contratación.',
  },
};

export const KEY_FACTS: readonly KeyFact[] = [
  {
    value: '5+',
    label: {
      en: 'Years shipping to production (since 2021)',
      es: 'Años llevando software a producción (desde 2021)',
    },
  },
  {
    value: '~100K',
    label: {
      en: 'Monthly active users on my current platform',
      es: 'Usuarios activos mensuales en mi plataforma actual',
    },
  },
  {
    value: '−43%',
    label: {
      en: 'AWS bill after the cost audit I led',
      es: 'Factura de AWS tras la auditoría de costos que lideré',
    },
  },
  {
    value: '30×',
    label: {
      en: 'Faster bulk data export (638K rows in 21 s)',
      es: 'Exportación masiva más rápida (638K filas en 21 s)',
    },
  },
];

export const ROLES: readonly Role[] = [
  {
    id: 'prosperas',
    kind: 'employment',
    employer: { en: 'Prosperas', es: 'Prosperas' },
    title: { en: 'Technical Lead', es: 'Technical Lead' },
    start: '2025-05',
    end: null,
    type: { en: 'Full-time', es: 'Tiempo completo' },
    location: 'Bogotá, Colombia',
    clientLine: {
      en: "Credit marketplace inside a major telecom's Super App",
      es: 'Marketplace de crédito dentro de la Super App de una gran telco',
    },
    bullets: [
      {
        en: 'Lead architecture and full-stack delivery of a cloud-native credit marketplace used by ~100K monthly active users within a 45M-user ecosystem.',
        es: 'Lidero la arquitectura y la entrega full-stack de un marketplace de crédito cloud-native usado por ~100K usuarios activos mensuales dentro de un ecosistema de 45M.',
      },
      {
        en: 'Lead a cross-functional engineering team: technical standards, architecture patterns, code-review guidelines and a DevOps-first culture. Main technical interface with the partner and senior leadership.',
        es: 'Lidero un equipo de ingeniería multifuncional: estándares técnicos, patrones de arquitectura, guías de code review y cultura DevOps-first. Interlocutor técnico principal con el aliado y la alta dirección.',
      },
      {
        en: 'Implemented user authentication with AWS Cognito and secret management with Secrets Manager across dev → staging → production pipelines, with CloudWatch monitoring and alerting.',
        es: 'Implementé la autenticación de usuarios con AWS Cognito y el manejo de secretos con Secrets Manager en los pipelines dev → staging → producción, con monitoreo y alertas en CloudWatch.',
      },
      {
        en: 'Built a read-only MCP server that lets managers and analysts query production data in natural language. I found and fixed a 98.4% undercount at its root cause, and closed its security gaps under adversarial review.',
        es: 'Construí un servidor MCP de solo lectura con el que gerentes y analistas consultan datos de producción en lenguaje natural. Encontré y corregí de raíz un subconteo del 98,4% y cerré sus brechas de seguridad con revisión adversarial.',
      },
      {
        en: 'Built an autonomous production-triage agent (headless Claude Code with the Sentry, Jira and Slack MCPs) that runs every weekday under a strict no-commit contract.',
        es: 'Construí un agente autónomo de triage de producción (Claude Code headless con los MCP de Sentry, Jira y Slack) que corre cada día hábil bajo un contrato estricto de cero commits.',
      },
      {
        en: 'Led an AWS cost audit across 17 regions that cut the monthly bill by 43%, with budgets, anomaly alerts and retention policies so the savings hold.',
        es: 'Lideré una auditoría de costos de AWS en 17 regiones que bajó la factura mensual un 43%, con presupuestos, alertas de anomalías y políticas de retención para que el ahorro se mantenga.',
      },
      {
        en: 'Replaced a managed BI service with charts-as-code (Angular, ECharts, FastAPI, Postgres materialized views) at exact parity with the legacy dashboards; bulk export became 30× faster.',
        es: 'Reemplacé un servicio de BI administrado con gráficos como código (Angular, ECharts, FastAPI, vistas materializadas de Postgres) con paridad exacta frente a los dashboards anteriores; la exportación masiva quedó 30× más rápida.',
      },
      {
        en: 'Optimized analytical queries across 2M+ records and resolved production incidents to root cause: storage burst exhaustion, database locks, an orphaned queue, and WAF false positives.',
        es: 'Optimicé consultas analíticas sobre más de 2M de registros y resolví incidentes de producción hasta la causa raíz: agotamiento de ráfaga de almacenamiento, bloqueos de base de datos, una cola huérfana y falsos positivos del WAF.',
      },
    ],
    stack: [
      'AWS CDK',
      'Lambda',
      'RDS/PostgreSQL',
      'ElastiCache/Redis',
      'S3',
      'API Gateway',
      'Cognito',
      'Secrets Manager',
      'CloudWatch',
      'Python',
      'FastAPI',
      'Angular',
      'TypeScript',
      'Claude API',
      'MCP',
    ],
    caseStudyIds: [
      'ai-in-production',
      'credit-marketplace',
      'aws-cost-audit',
      'analytics-platform',
      'production-reliability',
      'identity-integrity',
      'public-platform-surfaces',
    ],
  },
  {
    id: 'esoluzion',
    kind: 'employment',
    employer: { en: 'eSoluzion', es: 'eSoluzion' },
    title: {
      en: 'Full-Stack Developer (Frontend consulting)',
      es: 'Full-Stack Developer (consultoría frontend)',
    },
    start: '2022-10',
    end: null,
    type: { en: 'Contract · Remote', es: 'Contrato · Remoto' },
    location: 'Remote',
    clientLine: {
      en: 'Core banking modules for an enterprise banking client',
      es: 'Módulos de core bancario para un cliente de banca empresarial',
    },
    bullets: [
      {
        en: 'Build and maintain Angular interfaces across multiple core banking modules.',
        es: 'Construyo y mantengo interfaces en Angular para varios módulos de core bancario.',
      },
      {
        en: "Designed end-to-end modules in Java (Spring Boot) and Thymeleaf that meet the bank's code-quality and regulatory-compliance standards.",
        es: 'Diseñé módulos de punta a punta en Java (Spring Boot) y Thymeleaf que cumplen los estándares de calidad de código y de cumplimiento regulatorio del banco.',
      },
      {
        en: 'Remediated security vulnerabilities in a legacy Java codebase by replacing unsafe regex-based methods.',
        es: 'Remedié vulnerabilidades de seguridad en un código Java legado reemplazando métodos inseguros basados en regex.',
      },
      {
        en: 'Deliver features with product owners and QA against business requirements.',
        es: 'Entrego funcionalidades junto a product owners y QA contra requerimientos de negocio.',
      },
      {
        en: "Integrating an AI chat assistant into an internal credit-analysis application through the bank's corporate AI gateway, including enterprise authentication flows (Spring MVC, Thymeleaf).",
        es: 'Integro un asistente de chat con IA en una aplicación interna de análisis de crédito a través del gateway corporativo de IA del banco, incluyendo flujos de autenticación empresariales (Spring MVC, Thymeleaf).',
      },
    ],
    stack: ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'Thymeleaf'],
    caseStudyIds: ['core-banking-modules'],
  },
  {
    id: 'imkglobal',
    kind: 'employment',
    employer: {
      en: 'ImkGlobal (Ingenieros de Marketing)',
      es: 'ImkGlobal (Ingenieros de Marketing)',
    },
    title: { en: 'Lead Developer', es: 'Lead Developer' },
    start: '2024-11',
    end: '2025-03',
    type: { en: 'Full-time · Remote', es: 'Tiempo completo · Remoto' },
    clientLine: {
      en: 'Apps for government-backed regional tourism services',
      es: 'Apps para servicios de turismo regional respaldados por el gobierno',
    },
    bullets: [
      {
        en: 'Led a development team: technical decisions, architecture and sprint planning in an agile environment.',
        es: 'Lideré un equipo de desarrollo: decisiones técnicas, arquitectura y planeación de sprints en un entorno ágil.',
      },
      {
        en: 'Built cross-platform mobile and web applications in Flutter for government-backed regional tourism services.',
        es: 'Construí aplicaciones móviles y web multiplataforma en Flutter para servicios de turismo regional respaldados por el gobierno.',
      },
      {
        en: 'Bridged technical teams and non-technical stakeholders, turning business requirements into development tasks.',
        es: 'Hice de puente entre equipos técnicos y stakeholders no técnicos, convirtiendo requerimientos de negocio en tareas de desarrollo.',
      },
    ],
    stack: ['Flutter', 'Dart', 'REST APIs'],
    caseStudyIds: ['govtech-tourism-apps'],
  },
  {
    id: 'dualboot',
    kind: 'employment',
    employer: { en: 'Dualboot Partners', es: 'Dualboot Partners' },
    title: { en: 'Software Engineer', es: 'Software Engineer' },
    start: '2022-04',
    end: '2023-03',
    type: { en: 'Full-time · Remote', es: 'Tiempo completo · Remoto' },
    clientLine: {
      en: 'Cloud services for a US-based car-rental platform',
      es: 'Servicios cloud para una plataforma de alquiler de carros en EE. UU.',
    },
    bullets: [
      {
        en: 'Designed and deployed AWS services for message delivery, notifications and operational workflows.',
        es: 'Diseñé y desplegué servicios en AWS para envío de mensajes, notificaciones y flujos operativos.',
      },
      {
        en: 'Built serverless architectures with AWS Lambda and Chalice, automating data flows and removing manual processing bottlenecks.',
        es: 'Construí arquitecturas serverless con AWS Lambda y Chalice, automatizando flujos de datos y eliminando cuellos de botella de procesamiento manual.',
      },
      {
        en: 'Configured high-availability infrastructure (EC2, Elastic Load Balancers, Route 53, API Gateway) and Python/Django services on PostgreSQL/MySQL with SES and SNS.',
        es: 'Configuré infraestructura de alta disponibilidad (EC2, Elastic Load Balancers, Route 53, API Gateway) y servicios Python/Django sobre PostgreSQL/MySQL con SES y SNS.',
      },
    ],
    stack: [
      'Python',
      'Django',
      'AWS Lambda',
      'Chalice',
      'EC2',
      'ELB',
      'Route 53',
      'API Gateway',
      'SES',
      'SNS',
      'PostgreSQL',
      'MySQL',
    ],
    caseStudyIds: ['us-car-rental-cloud'],
  },
  {
    id: 'accenture',
    kind: 'employment',
    employer: { en: 'Accenture', es: 'Accenture' },
    title: {
      en: 'Data Analyst / Java Developer / Full-Stack Developer',
      es: 'Data Analyst / Java Developer / Full-Stack Developer',
    },
    start: '2021-05',
    end: '2022-06',
    type: { en: 'Full-time · Remote', es: 'Tiempo completo · Remoto' },
    clientLine: {
      en: "A global bank's Colombian operation and a telecom operator",
      es: 'La operación colombiana de un banco global y un operador de telecomunicaciones',
    },
    bullets: [
      {
        en: "Built Java (Spring Boot) backend services on the bank's batch and online frameworks, plus full-stack features on the MEAN stack.",
        es: 'Construí servicios backend en Java (Spring Boot) sobre los frameworks batch y online del banco, además de funcionalidades full-stack en el stack MEAN.',
      },
      {
        en: 'Built administrative dashboards (Google Apps Script, Data Studio) that helped recover a project running one year behind schedule.',
        es: 'Construí dashboards administrativos (Google Apps Script, Data Studio) que ayudaron a recuperar un proyecto que iba un año atrasado.',
      },
      {
        en: 'Built Power BI dashboards integrating Oracle and MongoDB sources for real-time telecom incident statistics.',
        es: 'Construí dashboards en Power BI integrando fuentes Oracle y MongoDB para estadísticas de incidentes de telecomunicaciones en tiempo real.',
      },
    ],
    stack: [
      'Java',
      'Spring Boot',
      'MEAN stack',
      'Power BI',
      'Oracle',
      'MongoDB',
      'Google Apps Script',
      'Data Studio',
    ],
    caseStudyIds: ['banking-telecom-data'],
  },
  {
    id: 'founder',
    kind: 'founder',
    employer: {
      en: 'Conversational AI product (stealth)',
      es: 'Producto de IA conversacional (stealth)',
    },
    title: { en: 'Founder & Tech Lead', es: 'Fundador y Tech Lead' },
    start: '2026',
    end: null,
    type: { en: 'Side project · Founder', es: 'Proyecto propio · Fundador' },
    clientLine: {
      en: 'Pre-launch. Details under NDA; happy to walk through the code in an interview.',
      es: 'Pre-lanzamiento. Detalles bajo confidencialidad; con gusto recorro el código en una entrevista.',
    },
    bullets: [
      {
        en: 'Founded and build, solo, a multi-sided conversational AI product: hexagonal architecture, two-tier conversational memory with crypto-shredding erasure, a pre-LLM safety gate, and signed idempotent payments.',
        es: 'Fundé y construyo, solo, un producto de IA conversacional de varios lados: arquitectura hexagonal, memoria conversacional de dos niveles con borrado por crypto-shredding, un filtro de seguridad previo al LLM y pagos firmados e idempotentes.',
      },
      {
        en: 'Deliver with a multi-agent software factory (planner, coder and adversarial reviewer agents working from specs), backed by 3,000+ automated tests and rollback exercised in production.',
        es: 'Entrego con una fábrica de software multiagente (agentes planificador, programador y revisor adversarial trabajando desde specs), respaldada por más de 3.000 tests automatizados y rollback ejercitado en producción.',
      },
    ],
    stack: [
      'TypeScript',
      'Next.js',
      'PostgreSQL',
      'pgvector',
      'Docker',
      'Terraform',
      'Cloudflare',
      'Claude Code',
    ],
    caseStudyIds: ['conversational-ai-product'],
  },
];

export const CASE_STUDIES: readonly CaseStudy[] = [
  // Tier A — Featured
  {
    id: 'ai-in-production',
    tier: 'A',
    featured: true,
    roleId: 'prosperas',
    tag: 'AI · MCP · AGENTS',
    status: { en: 'In production', es: 'En producción' },
    title: {
      en: 'An MCP server that lets the business query production data — and get the right number',
      es: 'Un servidor MCP para que el negocio consulte datos de producción — y reciba el número correcto',
    },
    context: {
      en: 'Executives, managers and analysts wanted answers from production data without waiting on engineering. The first version of the natural-language-to-SQL assistant returned plausible but wrong numbers.',
      es: 'Directivos, gerentes y analistas querían respuestas de los datos de producción sin esperar a ingeniería. La primera versión del asistente de lenguaje natural a SQL devolvía números plausibles pero equivocados.',
    },
    whatIDid: [
      {
        en: 'Built a remote, read-only MCP server inside the FastAPI backend with 8 tools (query, cursor pagination, fuzzy user search, schema discovery), API keys issued from the admin portal, and per-tenant scoping enforced by rewriting every SQL statement with sqlglot.',
        es: 'Construí un servidor MCP remoto y de solo lectura dentro del backend FastAPI con 8 herramientas (consulta, paginación con cursor, búsqueda difusa de usuarios, descubrimiento de esquema), API keys emitidas desde el portal admin y aislamiento por cliente aplicado reescribiendo cada sentencia SQL con sqlglot.',
      },
      {
        en: "Traced the wrong answers to root causes, not prompts: a missing business rule caused a 98.4% undercount of approvals, an INNER JOIN dropped records, and the model was offered views that didn't exist. Fixed them with a single source of business rules embedded in the server, guarded by a drift test.",
        es: 'Rastreé las respuestas equivocadas hasta sus causas raíz, no hasta el prompt: una regla de negocio ausente producía un subconteo del 98,4% en aprobaciones, un INNER JOIN perdía registros y al modelo se le ofrecían vistas que no existían. Lo corregí con una única fuente de reglas de negocio embebida en el servidor y protegida con un test de deriva.',
      },
      {
        en: 'Ran an adversarial security review of my own server: closed scope-bypass and PII-exposure paths and tested 30+ attack shapes with zero leaks.',
        es: 'Hice una revisión de seguridad adversarial de mi propio servidor: cerré caminos para saltarse el aislamiento y exponer datos personales, y probé más de 30 formas de ataque sin ninguna fuga.',
      },
      {
        en: 'Built an autonomous morning triage agent (headless Claude Code with the Sentry, Jira and Slack MCPs). It root-causes production errors against the repo and files at most 3 tickets per run through a 4-condition gate, and it is not allowed to commit code or open PRs.',
        es: 'Construí un agente autónomo de triage matutino (Claude Code headless con los MCP de Sentry, Jira y Slack). Busca la causa raíz de los errores de producción en el repositorio y abre como máximo 3 tickets por corrida tras un filtro de 4 condiciones; no tiene permitido hacer commits ni abrir PRs.',
      },
    ],
    outcomes: [
      { en: '98.4% undercount found and fixed', es: 'Subconteo del 98,4% encontrado y corregido' },
      {
        en: 'Reconciled exactly against independent counts',
        es: 'Conciliado exacto contra conteos independientes',
      },
      { en: '30+ attack shapes, 0 leaks', es: '30+ formas de ataque, 0 fugas' },
      { en: 'Triage agent runs every weekday', es: 'Agente de triage corre cada día hábil' },
    ],
    stack: [
      'MCP',
      'Claude Code',
      'Claude API',
      'Python',
      'FastAPI',
      'sqlglot',
      'PostgreSQL',
      'Sentry',
      'Jira',
      'Slack',
    ],
  },
  {
    id: 'credit-marketplace',
    tier: 'A',
    roleId: 'prosperas',
    tag: 'FINTECH',
    status: { en: 'In production', es: 'En producción' },
    title: {
      en: 'Digital credit marketplace inside a telecom Super App',
      es: 'Marketplace de crédito digital dentro de una Super App de telecomunicaciones',
    },
    context: {
      en: 'A major telecom operator wanted to offer credit to the users of its Super App — fully digital, with no paperwork and no branch visits.',
      es: 'Una gran telco quería ofrecer crédito a los usuarios de su Super App — 100% digital, sin papeles y sin ir a una oficina.',
    },
    whatIDid: [
      {
        en: 'Own the end-to-end AWS architecture with CDK and standardized multi-environment provisioning (dev → staging → prod).',
        es: 'Soy dueño de la arquitectura AWS de punta a punta con CDK y estandaricé el aprovisionamiento multi-ambiente (dev → staging → prod).',
      },
      {
        en: 'Implemented user authentication with Cognito and secrets with Secrets Manager inside CI/CD, with CloudWatch alerting.',
        es: 'Implementé la autenticación con Cognito y los secretos con Secrets Manager dentro de CI/CD, con alertas en CloudWatch.',
      },
      {
        en: 'Optimized analytical queries over 2M+ records to cut dashboard latency and AWS cost.',
        es: 'Optimicé consultas analíticas sobre más de 2M de registros para bajar la latencia de los dashboards y el costo de AWS.',
      },
      {
        en: 'Lead the engineering team and act as the technical interface with the partner.',
        es: 'Lidero el equipo de ingeniería y soy el interlocutor técnico con el aliado.',
      },
    ],
    outcomes: [
      { en: '~100K monthly active users', es: '~100K usuarios activos mensuales' },
      { en: '45M-user ecosystem', es: 'Ecosistema de 45M de usuarios' },
      { en: '100% digital, zero paperwork', es: '100% digital, sin papeles' },
      {
        en: 'dev → staging → prod, fully provisioned in CDK',
        es: 'dev → staging → prod, aprovisionado 100% con CDK',
      },
    ],
    stack: [
      'AWS CDK',
      'Lambda',
      'RDS PostgreSQL',
      'ElastiCache Redis',
      'S3',
      'API Gateway',
      'Cognito',
      'Secrets Manager',
      'CloudWatch',
      'Python',
      'FastAPI',
      'Angular',
    ],
  },
  {
    id: 'aws-cost-audit',
    tier: 'A',
    roleId: 'prosperas',
    tag: 'CLOUD · FINOPS',
    status: { en: 'Delivered', es: 'Entregado' },
    title: {
      en: 'Cutting the AWS bill by 43% without touching production performance',
      es: 'Bajar la factura de AWS un 43% sin tocar el rendimiento de producción',
    },
    context: {
      en: 'The AWS bill had grown for years across 17 enabled regions, with no budget, no anomaly alerts and no one who could say what each resource was for.',
      es: 'La factura de AWS había crecido durante años en 17 regiones habilitadas, sin presupuesto, sin alertas de anomalías y sin nadie que supiera para qué servía cada recurso.',
    },
    whatIDid: [
      {
        en: 'Ran a read-only sweep of every enabled region, then removed spend in order of evidence. I retired a BI service that I had already replaced, closed an unused account, deleted a database with zero connections in 13 months, and turned off non-production insights.',
        es: 'Hice un barrido de solo lectura en todas las regiones habilitadas y luego eliminé gasto en orden de evidencia. Retiré un servicio de BI que ya había reemplazado, cerré una cuenta sin uso, borré una base de datos con cero conexiones en 13 meses y apagué el monitoreo detallado fuera de producción.',
      },
      {
        en: 'Refused a tempting downsize. The production cluster averaged 12.7% CPU, but its p99 was 97.5%.',
        es: 'Rechacé una reducción tentadora: el clúster de producción promediaba 12,7% de CPU, pero su p99 era 97,5%.',
      },
      {
        en: "Put guardrails in place so it doesn't creep back: an anomaly monitor, a monthly budget, log retention on 240 of 240 log groups, and ECR lifecycle rules that took the registry from 229 GB to 21 GB.",
        es: 'Dejé controles para que el gasto no volviera a crecer: monitor de anomalías, presupuesto mensual, retención de logs en 240 de 240 grupos y reglas de ciclo de vida en ECR que bajaron el registro de 229 GB a 21 GB.',
      },
    ],
    outcomes: [
      { en: '−43% monthly AWS bill', es: '−43% en la factura mensual de AWS' },
      { en: 'ECR 229 GB → 21 GB', es: 'ECR de 229 GB a 21 GB' },
      { en: 'Retention on 240/240 log groups', es: 'Retención en 240/240 grupos de logs' },
      { en: 'Budget + anomaly alerts', es: 'Presupuesto + alertas de anomalías' },
    ],
    stack: ['AWS Cost Explorer', 'Budgets', 'CloudWatch', 'RDS (gp3, Graviton)', 'ECR', 'AWS CDK'],
  },
  {
    id: 'conversational-ai-product',
    tier: 'A',
    roleId: 'founder',
    tag: 'AI · FOUNDER',
    status: { en: 'Pre-launch', es: 'Pre-lanzamiento' },
    title: {
      en: 'Founding and building a conversational AI product, solo, with an AI agent team',
      es: 'Fundar y construir un producto de IA conversacional, solo, con un equipo de agentes de IA',
    },
    context: {
      en: 'A multi-sided platform where creators design AI personas that hold long-running conversations. One engineer: me. So the architecture, the infrastructure and the delivery process had to make one person as effective as a team.',
      es: 'Una plataforma de varios lados donde creadores diseñan personas de IA que sostienen conversaciones largas. Un solo ingeniero: yo. La arquitectura, la infraestructura y el proceso de entrega tenían que hacer que una persona rindiera como un equipo.',
    },
    whatIDid: [
      {
        en: 'Designed a hexagonal modular monolith (Next.js, TypeScript). Its 10+ bounded contexts have dependency rules enforced in CI, and every LLM call goes through a port, so switching models is a config change.',
        es: 'Diseñé un monolito modular hexagonal (Next.js, TypeScript). Sus más de 10 contextos acotados tienen reglas de dependencia validadas en CI, y cada llamada a un LLM pasa por un puerto, así que cambiar de modelo es un cambio de configuración.',
      },
      {
        en: 'Designed two-tier conversational memory: structured facts plus a rolling summary are always loaded, and semantic recall from pgvector is top-k only, each layer with its own token budget. A per-user encryption key makes a deletion request a key deletion (crypto-shredding).',
        es: 'Diseñé una memoria conversacional de dos niveles: hechos estructurados y un resumen móvil siempre cargados, y la recuperación semántica desde pgvector solo como top-k, cada capa con su propio presupuesto de tokens. Una llave de cifrado por usuario convierte una solicitud de borrado en borrar una llave (crypto-shredding).',
      },
      {
        en: 'Built a mandatory safety gate before any LLM call. Blocked messages are never persisted and never reach the model, and every block is audited.',
        es: 'Construí un filtro de seguridad obligatorio antes de cualquier llamada al LLM. Los mensajes bloqueados nunca se persisten ni llegan al modelo, y cada bloqueo queda auditado.',
      },
      {
        en: 'Built payments on an append-only ledger with signed, idempotent webhooks, verified adversarially: replays, forged signatures and tampered amounts all fail safely.',
        es: 'Construí los pagos sobre un ledger de solo inserción con webhooks firmados e idempotentes, verificados de forma adversarial: repeticiones, firmas falsas y montos alterados fallan de forma segura.',
      },
      {
        en: 'Built provider-portable infrastructure (Docker, Caddy, Cloudflare, Terraform). The app moved across three hosting providers without a rewrite, and rollback is exercised in production.',
        es: 'Construí infraestructura portable entre proveedores (Docker, Caddy, Cloudflare, Terraform). La app pasó por tres proveedores de hosting sin reescribirse, y el rollback está ejercitado en producción.',
      },
      {
        en: 'Run delivery with a multi-agent software factory: planner, coder and adversarial reviewer agents working from specs. In the first full run, 13 issues became 11 PRs merged the same day.',
        es: 'Entrego con una fábrica de software multiagente: agentes planificador, programador y revisor adversarial trabajando desde specs. En la primera corrida completa, 13 issues se convirtieron en 11 PRs mergeados el mismo día.',
      },
    ],
    outcomes: [
      { en: '3,000+ automated tests', es: '3.000+ tests automatizados' },
      {
        en: 'Rollback in 17 s, exercised in prod',
        es: 'Rollback en 17 s, ejercitado en producción',
      },
      { en: '~$86/mo infrastructure', es: 'Infraestructura de ~US$86/mes' },
      { en: '13 issues → 11 PRs in one day', es: '13 issues → 11 PRs en un día' },
    ],
    footnote: {
      en: 'Pre-launch: no user metrics yet. Code is private; happy to walk through it in an interview.',
      es: 'Pre-lanzamiento: aún no hay métricas de usuarios. El código es privado; con gusto lo recorro en una entrevista.',
    },
    stack: [
      'TypeScript',
      'Next.js',
      'PostgreSQL',
      'pgvector',
      'Drizzle',
      'Docker',
      'Caddy',
      'Cloudflare',
      'Terraform',
      'OpenRouter',
      'Claude Code',
    ],
  },
  // Tier B — Production engineering at Prosperas
  {
    id: 'analytics-platform',
    tier: 'B',
    roleId: 'prosperas',
    tag: 'DATA · ANALYTICS',
    status: { en: 'In production', es: 'En producción' },
    title: {
      en: 'Replacing a managed BI tool with charts-as-code — at exact parity',
      es: 'Reemplazar una herramienta de BI administrada con gráficos como código — con paridad exacta',
    },
    context: {
      en: "Dashboards lived in a managed BI service that was expensive, froze silently for weeks, and couldn't enforce the multi-tenant access rules the product already had.",
      es: 'Los dashboards vivían en un servicio de BI administrado que era caro, se congelaba en silencio durante semanas y no podía aplicar las reglas de acceso multi-cliente que el producto ya tenía.',
    },
    whatIDid: [
      {
        en: 'I used a strangler-pattern migration to ECharts in the Angular portal, backed by FastAPI endpoints over Postgres materialized views, and reused the existing tenant scoping instead of rebuilding it in a BI tool. I proved parity against the legacy dashboards on seven months of production data before retiring the old service. I also added CSV export for every chart and table, with bulk export through Postgres `COPY`.',
        es: 'Migré con el patrón strangler a ECharts en el portal Angular, sobre endpoints FastAPI y vistas materializadas de Postgres, y reutilicé el aislamiento por cliente existente en vez de reconstruirlo en una herramienta de BI. Demostré paridad contra los dashboards anteriores con siete meses de datos de producción antes de retirar el servicio viejo. También agregué exportación CSV para cada gráfico y tabla, con exportación masiva usando `COPY` de Postgres.',
      },
    ],
    outcomes: [
      {
        en: 'Exact parity on 7 months of prod data',
        es: 'Paridad exacta en 7 meses de datos de producción',
      },
      { en: '1,146 FE + 108 BE tests green', es: '1.146 tests FE + 108 BE en verde' },
      {
        en: 'CSV export 30× faster (638K rows in 21 s)',
        es: 'Exportación CSV 30× más rápida (638K filas en 21 s)',
      },
      { en: 'Legacy BI decommissioned', es: 'BI anterior retirado' },
    ],
    stack: ['Angular', 'ECharts', 'FastAPI', 'PostgreSQL (materialized views, COPY)', 'AWS CDK'],
  },
  {
    id: 'production-reliability',
    tier: 'B',
    roleId: 'prosperas',
    tag: 'RELIABILITY · SRE',
    status: { en: 'In production', es: 'En producción' },
    title: {
      en: 'Production incidents, traced to root cause and closed for good',
      es: 'Incidentes de producción, rastreados hasta la causa raíz y cerrados para siempre',
    },
    incidents: [
      {
        symptom: {
          en: 'API p99 reached 7.9 s during a view rebuild.',
          es: 'El p99 de la API llegó a 7,9 s durante la reconstrucción de una vista.',
        },
        cause: {
          en: 'Exhausted gp2 storage burst credits, not a bad query.',
          es: 'Créditos de ráfaga de almacenamiento gp2 agotados, no una mala consulta.',
        },
        fix: {
          en: 'Migrated production databases to gp3 in two countries and fixed the infra-as-code drift; the same query then ran in about 2 minutes.',
          es: 'Migré las bases de producción a gp3 en dos países y corregí la deriva de la infraestructura como código; la misma consulta pasó a correr en unos 2 minutos.',
        },
      },
      {
        symptom: {
          en: 'A production database was locked for about 2 hours.',
          es: 'Una base de producción quedó bloqueada unas 2 horas.',
        },
        cause: {
          en: 'Four chained bugs in materialized-view refreshes.',
          es: 'Cuatro bugs encadenados en el refresco de vistas materializadas.',
        },
        fix: {
          en: 'A tiered refresh with per-tier timeouts and a watchdog, and 11 of 20 views pruned.',
          es: 'Refresco por niveles con timeouts por nivel y un watchdog, y 11 de 20 vistas eliminadas.',
        },
      },
      {
        symptom: {
          en: 'Redis memory was heading toward an out-of-memory crash.',
          es: 'La memoria de Redis iba camino a quedarse sin espacio.',
        },
        cause: {
          en: 'An orphaned queue holding 250K messages.',
          es: 'Una cola huérfana con 250K mensajes.',
        },
        fix: {
          en: 'Purged the queue and added a kill switch; memory went from 287.89 MB to 6.98 MB.',
          es: 'Purgué la cola y agregué un interruptor de apagado; la memoria bajó de 287,89 MB a 6,98 MB.',
        },
      },
      {
        symptom: {
          en: "A partner's webhooks were silently blocked at the WAF.",
          es: 'Los webhooks de un aliado se bloqueaban en silencio en el WAF.',
        },
        cause: {
          en: 'A managed rule matched their requests.',
          es: 'Una regla administrada coincidía con sus solicitudes.',
        },
        fix: {
          en: 'I diagnosed it by separating edge blocks from app errors, then added a rate-limit-plus-allow rule.',
          es: 'Lo diagnostiqué separando bloqueos en el borde de errores de la aplicación y agregué una regla de rate-limit con permiso explícito.',
        },
      },
      {
        symptom: {
          en: 'Credentials were rotated across 4 database environments with 0 failures (37 of 37 probes returned 200).',
          es: 'Roté credenciales en 4 ambientes de base de datos con 0 fallos (37 de 37 sondas respondieron 200).',
        },
      },
    ],
    whatIDid: [
      {
        en: 'Also shipped: production monitoring for the consumer PWA (Sentry with client-side PII scrubbing and source maps from CI), plus an ingestion watchdog that alerts when errors stop arriving.',
        es: 'También entregué: monitoreo de producción para la PWA de consumidor (Sentry con limpieza de PII en cliente y source maps desde CI), además de un watchdog de ingestión que alerta cuando los errores dejan de llegar.',
      },
    ],
    outcomes: [],
    stack: ['AWS RDS', 'ElastiCache/Redis', 'Celery', 'WAFv2', 'CloudWatch', 'Sentry', 'AWS CDK'],
  },
  {
    id: 'identity-integrity',
    tier: 'B',
    roleId: 'prosperas',
    tag: 'DATA INTEGRITY · SECURITY',
    status: { en: 'Delivered', es: 'Entregado' },
    title: {
      en: 'Fixing duplicate identities in a live credit platform — measuring before touching anything',
      es: 'Corregir identidades duplicadas en una plataforma de crédito en vivo — midiendo antes de tocar nada',
    },
    whatIDid: [
      {
        en: 'I led a 5-week program: 15 PRs, 4 migrations and 4 databases audited. I hardened how returning users are matched, so identity comes only from a key asserted by the partner and never from typed data. Before every destructive step I wrote the expected numbers down and rehearsed against a copy of production, and that rehearsal caught 6 errors. I backfilled 94% of accounts in idempotent batches.',
        es: 'Lideré un programa de 5 semanas: 15 PRs, 4 migraciones y 4 bases de datos auditadas. Endurecí cómo se reconoce a un usuario que regresa: la identidad sale solo de una llave asegurada por el aliado, nunca de datos digitados. Antes de cada paso destructivo escribí los números esperados y ensayé contra una copia de producción, y ese ensayo atrapó 6 errores. Completé el 94% de las cuentas en lotes idempotentes.',
      },
    ],
    outcomes: [
      { en: '15 PRs · 4 migrations', es: '15 PRs · 4 migraciones' },
      {
        en: 'Rehearsal caught 6 errors before prod',
        es: 'El ensayo atrapó 6 errores antes de producción',
      },
      { en: 'Match rate 83.4% → 100%', es: 'Tasa de coincidencia de 83,4% a 100%' },
    ],
    stack: [],
  },
  {
    id: 'public-platform-surfaces',
    tier: 'B',
    roleId: 'prosperas',
    tag: 'PLATFORM',
    status: { en: 'Live', es: 'En vivo' },
    title: {
      en: 'A short-links service and a docs site anyone can open',
      es: 'Un servicio de enlaces cortos y un sitio de documentación que cualquiera puede abrir',
    },
    whatIDid: [
      {
        en: 'Short-links service: five CDK stacks (Fargate behind an ALB, CloudFront plus WAF, SQS with a DLQ, an SLO dashboard, a Route 53 health probe) and a dedicated least-privilege database. The first real link redirected in about 0.4 s, and a dev rehearsal caught two bugs that would have broken the first create in production. I also built a reusable Claude Code skill that renders the launch video from an HTML timeline.',
        es: 'Servicio de enlaces cortos: cinco stacks de CDK (Fargate detrás de un ALB, CloudFront con WAF, SQS con DLQ, un dashboard de SLO, una sonda de salud en Route 53) y una base de datos propia con mínimo privilegio. El primer enlace real redirigió en unos 0,4 s, y un ensayo en dev atrapó dos bugs que habrían roto la primera creación en producción. También construí una skill reutilizable de Claude Code que genera el video de lanzamiento desde un timeline HTML.',
      },
      {
        en: 'Public docs site rebuilt from WordPress to Astro Starlight on S3 and CloudFront, bilingual (EN/ES) with full-text search. TTFB is 50–80 ms after I fixed a CloudFront caching trap that added about 1.5 s.',
        es: 'Sitio público de documentación reconstruido de WordPress a Astro Starlight sobre S3 y CloudFront, bilingüe (EN/ES) y con búsqueda de texto completo. El TTFB quedó en 50–80 ms después de corregir una trampa de caché de CloudFront que sumaba unos 1,5 s.',
      },
    ],
    outcomes: [],
    liveUrl: 'https://docs.prosperas.com',
    stack: [
      'AWS CDK',
      'ECS Fargate',
      'ALB',
      'CloudFront',
      'WAF',
      'SQS',
      'Route 53',
      'Astro Starlight',
      'Playwright',
      'ffmpeg',
    ],
  },
  // Tier C — Earlier work
  {
    id: 'core-banking-modules',
    tier: 'C',
    roleId: 'esoluzion',
    tag: 'BANKING',
    status: { en: 'In production', es: 'En producción' },
    title: {
      en: 'Core banking modules for an enterprise bank',
      es: 'Módulos de core bancario para un banco empresarial',
    },
    context: {
      en: 'A regulated bank needed new and maintained modules across its core banking web applications, under strict code-quality and compliance standards.',
      es: 'Un banco regulado necesitaba módulos nuevos y mantenimiento en sus aplicaciones web de core bancario, bajo estándares estrictos de calidad de código y cumplimiento.',
    },
    whatIDid: [
      {
        en: 'Built and maintain Angular interfaces across multiple core banking modules.',
        es: 'Construyo y mantengo interfaces en Angular para varios módulos de core bancario.',
      },
      {
        en: 'Designed end-to-end modules in Java (Spring Boot) and Thymeleaf.',
        es: 'Diseñé módulos de punta a punta en Java (Spring Boot) y Thymeleaf.',
      },
      {
        en: 'Remediated security vulnerabilities in legacy Java by replacing unsafe regex-based methods.',
        es: 'Remedié vulnerabilidades de seguridad en Java legado reemplazando métodos inseguros basados en regex.',
      },
      {
        en: "Integrating an AI chat assistant into an internal credit-analysis banking application through the bank's corporate AI gateway, including enterprise authentication flows (Spring MVC, Thymeleaf).",
        es: 'Integración de un asistente de chat con IA en una aplicación bancaria interna de análisis de crédito a través del gateway corporativo de IA del banco, incluyendo flujos de autenticación empresariales (Spring MVC, Thymeleaf).',
      },
    ],
    outcomes: [
      { en: 'Continuous engagement since Oct 2022', es: 'Relación continua desde oct 2022' },
      { en: 'Regulatory compliance', es: 'Cumplimiento regulatorio' },
      { en: 'Legacy Java security remediation', es: 'Remediación de seguridad en Java legado' },
    ],
    stack: ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'Thymeleaf'],
  },
  {
    id: 'us-car-rental-cloud',
    tier: 'C',
    roleId: 'dualboot',
    tag: 'CLOUD · SERVERLESS',
    status: { en: 'Delivered', es: 'Entregado' },
    title: {
      en: 'Serverless operations for a US car-rental platform',
      es: 'Operaciones serverless para una plataforma de alquiler de carros en EE. UU.',
    },
    context: {
      en: 'A US car-rental platform needed reliable notifications, message delivery and operational workflows without manual data handling.',
      es: 'Una plataforma de alquiler de carros en EE. UU. necesitaba notificaciones, envío de mensajes y flujos operativos confiables, sin manejo manual de datos.',
    },
    whatIDid: [
      {
        en: 'Designed and deployed AWS services for message delivery, notifications and operational workflows.',
        es: 'Diseñé y desplegué servicios en AWS para envío de mensajes, notificaciones y flujos operativos.',
      },
      {
        en: 'Built serverless architectures with AWS Lambda and Chalice, automating data flows and removing manual processing bottlenecks.',
        es: 'Construí arquitecturas serverless con AWS Lambda y Chalice, automatizando flujos de datos y eliminando cuellos de botella de procesamiento manual.',
      },
      {
        en: 'Configured high-availability infrastructure (EC2, Elastic Load Balancers, Route 53, API Gateway) and Python/Django services on PostgreSQL/MySQL with SES and SNS.',
        es: 'Configuré infraestructura de alta disponibilidad (EC2, Elastic Load Balancers, Route 53, API Gateway) y servicios Python/Django sobre PostgreSQL/MySQL con SES y SNS.',
      },
    ],
    outcomes: [
      {
        en: 'Manual processing removed from data flows',
        es: 'Procesamiento manual eliminado de los flujos de datos',
      },
      { en: 'High-availability setup', es: 'Infraestructura de alta disponibilidad' },
    ],
    stack: [
      'Python',
      'Django',
      'AWS Lambda',
      'Chalice',
      'EC2',
      'ELB',
      'Route 53',
      'API Gateway',
      'SES',
      'SNS',
    ],
  },
  {
    id: 'govtech-tourism-apps',
    tier: 'C',
    roleId: 'imkglobal',
    tag: 'GOVTECH · MOBILE',
    status: { en: 'Delivered', es: 'Entregado' },
    title: {
      en: 'Cross-platform apps for regional tourism services',
      es: 'Apps multiplataforma para servicios de turismo regional',
    },
    context: {
      en: 'Government-backed tourism services needed one codebase for mobile and web, delivered by a small team on a fixed timeline.',
      es: 'Servicios de turismo respaldados por el gobierno necesitaban una sola base de código para móvil y web, entregada por un equipo pequeño con fecha fija.',
    },
    whatIDid: [
      {
        en: 'Led a development team: technical decisions, architecture and sprint planning in an agile environment.',
        es: 'Lideré un equipo de desarrollo: decisiones técnicas, arquitectura y planeación de sprints en un entorno ágil.',
      },
      {
        en: 'Built cross-platform mobile and web applications in Flutter for government-backed regional tourism services.',
        es: 'Construí aplicaciones móviles y web multiplataforma en Flutter para servicios de turismo regional respaldados por el gobierno.',
      },
      {
        en: 'Bridged technical teams and non-technical stakeholders, turning business requirements into development tasks.',
        es: 'Hice de puente entre equipos técnicos y stakeholders no técnicos, convirtiendo requerimientos de negocio en tareas de desarrollo.',
      },
    ],
    outcomes: [
      { en: 'Team lead', es: 'Líder de equipo' },
      {
        en: 'One Flutter codebase for mobile + web',
        es: 'Una base de código Flutter para móvil + web',
      },
    ],
    stack: ['Flutter', 'Dart', 'REST APIs'],
  },
  {
    id: 'banking-telecom-data',
    tier: 'C',
    roleId: 'accenture',
    tag: 'BANKING · DATA',
    status: { en: 'Delivered', es: 'Entregado' },
    title: {
      en: 'Banking backends and dashboards that got a late project back on track',
      es: 'Backends bancarios y dashboards que devolvieron a tiempo un proyecto atrasado',
    },
    context: {
      en: 'A bank project was running one year behind schedule, and a telecom operator had no real-time view of incidents.',
      es: 'Un proyecto bancario iba un año atrasado y un operador de telecomunicaciones no tenía visibilidad en tiempo real de sus incidentes.',
    },
    whatIDid: [
      {
        en: "Built Java (Spring Boot) backend services on the bank's batch and online frameworks, plus full-stack features on the MEAN stack.",
        es: 'Construí servicios backend en Java (Spring Boot) sobre los frameworks batch y online del banco, además de funcionalidades full-stack en el stack MEAN.',
      },
      {
        en: 'Built administrative dashboards (Google Apps Script, Data Studio) that helped recover a project running one year behind schedule.',
        es: 'Construí dashboards administrativos (Google Apps Script, Data Studio) que ayudaron a recuperar un proyecto que iba un año atrasado.',
      },
      {
        en: 'Built Power BI dashboards integrating Oracle and MongoDB sources for real-time telecom incident statistics.',
        es: 'Construí dashboards en Power BI integrando fuentes Oracle y MongoDB para estadísticas de incidentes de telecomunicaciones en tiempo real.',
      },
    ],
    outcomes: [
      {
        en: 'Helped recover a project 1 year behind',
        es: 'Ayudé a recuperar un proyecto con 1 año de atraso',
      },
      { en: 'Real-time incident dashboards', es: 'Dashboards de incidentes en tiempo real' },
    ],
    stack: ['Java', 'Spring Boot', 'MEAN', 'Power BI', 'Oracle', 'MongoDB', 'Google Apps Script'],
  },
];

export const CREDENTIALS: readonly Credential[] = [
  {
    name: { en: 'B.Eng. Systems Engineering', es: 'Ingeniería de Sistemas (pregrado)' },
    issuer: 'Universidad Autónoma de Bucaramanga (UNAB)',
    date: '2016 – 2020',
    kind: 'degree',
  },
  {
    name: { en: 'Technical Degree in Computer Systems', es: 'Técnico en Sistemas' },
    issuer: 'SENA',
    date: '2014 – 2016',
    kind: 'degree',
  },
  {
    name: { en: 'Claude Code in Action', es: 'Claude Code in Action' },
    issuer: 'Anthropic',
    date: 'Feb 2026',
    kind: 'cert',
  },
  {
    name: {
      en: 'AWS Partner: Accreditation (Technical)',
      es: 'AWS Partner: Accreditation (Technical)',
    },
    issuer: 'Amazon Web Services',
    date: 'Jul 2020',
    kind: 'cert',
  },
  {
    name: { en: 'Neural Networks and Deep Learning', es: 'Neural Networks and Deep Learning' },
    issuer: 'deeplearning.ai / Coursera',
    date: 'Sep 2020',
    kind: 'cert',
  },
];

export const PRINCIPLES: readonly Principle[] = [
  {
    title: { en: 'Measure before you execute.', es: 'Medir antes de ejecutar.' },
    proof: {
      en: 'Before a destructive data operation I write down the expected numbers and rehearse on a copy of production; that rehearsal once caught 6 errors before they reached users.',
      es: 'Antes de una operación destructiva sobre datos escribo los números esperados y ensayo en una copia de producción; ese ensayo atrapó una vez 6 errores antes de que llegaran a los usuarios.',
    },
  },
  {
    title: { en: 'Percentiles over averages.', es: 'Percentiles, no promedios.' },
    proof: {
      en: 'A cluster averaging 12.7% CPU looked oversized; its p99 was 97.5%. I kept it.',
      es: 'Un clúster con 12,7% de CPU promedio parecía sobredimensionado; su p99 era 97,5%. Lo dejé como estaba.',
    },
  },
  {
    title: {
      en: 'A merge to infrastructure is not a deploy.',
      es: 'Un merge a infraestructura no es un deploy.',
    },
    proof: {
      en: 'A fix merged weeks earlier had never reached the CDN. Now I verify the running artifact, not the pull request.',
      es: 'Un fix mergeado semanas antes nunca había llegado al CDN. Ahora verifico el artefacto que está corriendo, no el pull request.',
    },
  },
  {
    title: {
      en: 'Monitor the outcome, not the mechanism.',
      es: 'Monitorear el resultado, no el mecanismo.',
    },
    proof: {
      en: 'Every check was green while production ran a 38-day-old build. I added an ancestry gate and a staleness alarm.',
      es: 'Todos los checks estaban en verde mientras producción corría un build de hace 38 días. Agregué un gate de ancestría y una alarma de desactualización.',
    },
  },
  {
    title: {
      en: "An agent's report is a claim, not evidence.",
      es: 'El reporte de un agente es una afirmación, no evidencia.',
    },
    proof: {
      en: 'I use AI agents heavily, and every delivery goes through adversarial reviewer agents and a check against the real tree before it counts as done.',
      es: 'Uso agentes de IA a fondo, y cada entrega pasa por agentes revisores adversariales y una verificación contra el árbol real antes de darse por terminada.',
    },
  },
];

export const WRITING: readonly WritingEntry[] = [
  {
    date: '2026-09-08',
    title: {
      en: 'An AI agent asked a user something they had already answered two days earlier',
      es: 'Un agente de IA le preguntó a un usuario algo que ya había respondido hacía dos días',
    },
    lesson:
      'Memory for a conversational product: layered SQL + rolling summary + top-k vector recall, not "store everything in the prompt".',
    // url intentionally omitted — TODO(Cristhian): LinkedIn post URL. Hidden until filled.
  },
];

export const TESTIMONIALS: readonly Testimonial[] = [];

export const STACK_GROUPS: readonly StackGroup[] = [
  {
    group: 'AI & agents',
    items: [
      'Claude API',
      'Claude Code (skills, headless, sub-agents, hooks)',
      'MCP servers',
      'LLM routing (OpenRouter)',
      'pgvector / RAG',
      'agent memory',
      'adversarial review agents',
      'spec-driven development (OpenSpec)',
    ],
  },
  {
    group: 'Cloud & infra',
    items: [
      'AWS CDK',
      'ECS Fargate',
      'Lambda',
      'RDS/PostgreSQL (gp3, Graviton)',
      'ElastiCache/Redis',
      'S3',
      'CloudFront',
      'WAF',
      'SQS',
      'Route 53',
      'Cognito',
      'Secrets Manager',
      'CloudWatch',
      'Cost Explorer/Budgets',
      'Terraform',
      'Docker',
      'Caddy',
      'Cloudflare',
    ],
  },
  {
    group: 'Backend',
    items: [
      'Python',
      'FastAPI',
      'SQLAlchemy',
      'Alembic',
      'Celery',
      'sqlglot',
      'Java',
      'Spring Boot',
      'Node.js',
      'TypeScript',
    ],
  },
  {
    group: 'Frontend',
    items: ['Angular', 'ECharts', 'SvelteKit', 'Next.js', 'Thymeleaf', 'Flutter'],
  },
  {
    group: 'Data',
    items: [
      'PostgreSQL (materialized views, COPY, locking, partial indexes)',
      'MySQL',
      'Oracle',
      'MongoDB',
      'Power BI',
    ],
  },
  {
    group: 'Observability',
    items: ['Sentry', 'CloudWatch alarms', 'synthetic probes'],
  },
];

export function formatPeriod(
  start: DatePrecision,
  end: DatePrecision | null,
  locale: 'en' | 'es',
  presentLabel: string
): string {
  const monthFmt = new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' });
  const yearFmt = new Intl.DateTimeFormat(locale, { year: 'numeric' });
  const formatOne = (value: DatePrecision) => {
    if (/^\d{4}$/.test(value)) {
      return yearFmt.format(new Date(Number(value), 0, 1));
    }
    const [year, month] = value.split('-').map(Number);
    return monthFmt.format(new Date(year, month - 1, 1));
  };
  const startLabel = formatOne(start);
  const endLabel = end ? formatOne(end) : presentLabel;
  return `${startLabel} – ${endLabel}`;
}

export function formatRolePeriod(role: Role, locale: 'en' | 'es', presentLabel: string): string {
  return formatPeriod(role.start, role.end, locale, presentLabel);
}

export function sortRoles(roles: readonly Role[]): Role[] {
  const founder = roles.filter((r) => r.kind === 'founder');
  const employment = roles.filter((r) => r.kind === 'employment');
  const byStartDesc = (a: Role, b: Role) => (a.start < b.start ? 1 : a.start > b.start ? -1 : 0);
  const current = employment.filter((r) => r.end === null).sort(byStartDesc);
  const past = employment.filter((r) => r.end !== null).sort(byStartDesc);
  return [...current, ...past, ...founder];
}
