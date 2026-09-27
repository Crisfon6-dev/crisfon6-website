# Content — Verifiable portfolio

**v2 (2026-09-27).** The facts below come from three sources:

- Cristhian's CV 2026, the version sent to employers.
- His LinkedIn profile.
- Three private engineering knowledge bases he keeps: the Prosperas engineering records, the side product's records, and his personal records. The source ledger stays in those private vaults and is not in this repo. **Do not add numbers, employers, dates or outcomes that are not in this file.**
  Where a fact is missing, the slot is marked `TODO(Cristhian)` and the UI MUST hide that slot
  until it is filled — never render a placeholder.

---

## 0. Confidentiality rule (hard)

Client names are **never** written in code, copy, alt text, metadata, JSON-LD, tests or commit
messages. Only the **employer** is named; the client is described generically:

| Where he worked   | How the client is written (EN)                           | ES                                                                             |
| ----------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Prosperas         | a major telecom's Super App (45M-user ecosystem)         | la Super App de una gran telco (ecosistema de 45M de usuarios)                 |
| eSoluzion         | an enterprise banking client                             | un cliente de banca empresarial                                                |
| Accenture         | a global bank's Colombian operation · a telecom operator | la operación colombiana de un banco global · un operador de telecomunicaciones |
| Dualboot Partners | a US-based car-rental platform                           | una plataforma de alquiler de carros en EE. UU.                                |
| ImkGlobal         | government-backed regional tourism services              | servicios de turismo regional respaldados por el gobierno                      |

Also forbidden anywhere in the repo:

- names of proprietary client frameworks, internal gateway or internal app names;
- names of Prosperas partners, lenders, payment providers and data vendors, or of any person;
- AWS account IDs, IPs, hostnames, or anything that looks like a key;
- Jira or Linear ticket keys, and internal PR numbers;
- the Prosperas email address.

**Side product (§3.4):** never write its name, domain, repository, vertical, personas,
competitors, or payment/hosting vendors. The only allowed descriptor is "a conversational AI
product I founded" / "un producto de IA conversacional que fundé". No screenshots.

**Open security findings:** never publish open or unresolved security findings, or how many
vulnerabilities existed. Only what was built or closed, described in general terms.

Line shown on `/experience` and `/projects` (small, muted, under the header):

- **EN:** Client names are withheld under confidentiality agreements. I'm happy to share them — and references — during a hiring process.
- **ES:** Los nombres de clientes se omiten por acuerdos de confidencialidad. Con gusto los comparto — junto con referencias — dentro de un proceso de contratación.

---

## 1. Identity (used in header + JSON-LD)

| Field                                                        | Value                                                                                                    |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| Display name                                                 | Cristhian Fonseca                                                                                        |
| Legal name (shown small under display name on `/experience`) | Cristhian Javier Delgado Fonseca                                                                         |
| Title                                                        | Technical Lead                                                                                           |
| Tagline EN                                                   | AI agents in production · FinTech at scale on AWS                                                        |
| Tagline ES                                                   | Agentes de IA en producción · FinTech a escala en AWS                                                    |
| Location EN / ES                                             | Colombia · Remote (CT/ET overlap) / Colombia · Remoto (horario CT/ET)                                    |
| Email                                                        | crisfon6@crisfon6.com                                                                                    |
| LinkedIn                                                     | https://www.linkedin.com/in/crisfon6/                                                                    |
| GitHub                                                       | https://github.com/Crisfon6-dev                                                                          |
| Open to EN                                                   | Remote Technical Lead / Senior AI Engineer roles with US teams · full-time or contract                   |
| Open to ES                                                   | Roles remotos de Technical Lead / Senior AI Engineer con equipos de EE. UU. · tiempo completo o contrato |

### Summary

**EN**

> Technical Lead and full-stack engineer with 5+ years building cloud-native FinTech and banking
> platforms. I lead engineering for a digital credit marketplace embedded in a major telecom's
> Super App — ~100K monthly active users inside a 45M-user ecosystem — and since 2022 I've built
> core banking modules for an enterprise banking client. I build AI systems that run in
> production — an MCP server the business uses to query live data, an autonomous triage agent,
> a multi-agent delivery pipeline — and I own the AWS underneath: I cut our cloud bill by 43%
> and trace every incident to root cause.

**ES**

> Technical Lead e ingeniero full-stack con más de 5 años construyendo plataformas cloud-native
> de FinTech y banca. Lidero la ingeniería de un marketplace de crédito digital integrado en la
> Super App de una gran telco — ~100K usuarios activos mensuales dentro de un ecosistema de 45M —
> y desde 2022 construyo módulos de core bancario para un cliente de banca empresarial. Construyo
> sistemas de IA que corren en producción — un servidor MCP con el que el negocio consulta datos
> en vivo, un agente autónomo de triage, un pipeline de entrega multiagente — y soy dueño del AWS
> que hay debajo: bajé nuestra factura cloud un 43% y llevo cada incidente hasta su causa raíz.

### Key facts (4 tiles on `/experience`, also replaces home `StatsSection`)

| Value | Label EN                                    | Label ES                                              | Source                               |
| ----- | ------------------------------------------- | ----------------------------------------------------- | ------------------------------------ |
| 5+    | Years shipping to production (since 2021)   | Años llevando software a producción (desde 2021)      | first role May 2021                  |
| ~100K | Monthly active users on my current platform | Usuarios activos mensuales en mi plataforma actual    | CV (stated by Cristhian; see §12 D3) |
| −43%  | AWS bill after the cost audit I led         | Factura de AWS tras la auditoría de costos que lideré | Prosperas records, Aug 2026          |
| 30×   | Faster bulk data export (638K rows in 21 s) | Exportación masiva más rápida (638K filas en 21 s)    | Prosperas records, Jul 2026          |

---

## 2. Work history (`/experience`, newest first by start date; current roles first)

> Two roles overlap in time (Prosperas full-time + eSoluzion contract). Show them exactly as
> they are — each with its own "Current" chip. Do not hide the overlap.

### 2.1 Prosperas — Technical Lead

| Field               | Value                                                                                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id                  | `prosperas`                                                                                                                                                                    |
| Period              | May 2025 – Present                                                                                                                                                             |
| Type EN / ES        | Full-time / Tiempo completo                                                                                                                                                    |
| Location            | Bogotá, Colombia                                                                                                                                                               |
| Client line EN / ES | Credit marketplace inside a major telecom's Super App / Marketplace de crédito dentro de la Super App de una gran telco                                                        |
| Case studies        | `ai-in-production`, `credit-marketplace`, `aws-cost-audit`, `analytics-platform`, `production-reliability`, `identity-integrity`, `public-platform-surfaces`                   |
| Stack               | AWS CDK · Lambda · RDS/PostgreSQL · ElastiCache/Redis · S3 · API Gateway · Cognito · Secrets Manager · CloudWatch · Python · FastAPI · Angular · TypeScript · Claude API · MCP |

**Bullets EN**

- Lead architecture and full-stack delivery of a cloud-native credit marketplace used by ~100K monthly active users within a 45M-user ecosystem.
- Lead a cross-functional engineering team: technical standards, architecture patterns, code-review guidelines and a DevOps-first culture. Main technical interface with the partner and senior leadership.
- Implemented user authentication with AWS Cognito and secret management with Secrets Manager across dev → staging → production pipelines, with CloudWatch monitoring and alerting.
- Built a read-only MCP server that lets managers and analysts query production data in natural language. I found and fixed a 98.4% undercount at its root cause, and closed its security gaps under adversarial review.
- Built an autonomous production-triage agent (headless Claude Code with the Sentry, Jira and Slack MCPs) that runs every weekday under a strict no-commit contract.
- Led an AWS cost audit across 17 regions that cut the monthly bill by 43%, with budgets, anomaly alerts and retention policies so the savings hold.
- Replaced a managed BI service with charts-as-code (Angular, ECharts, FastAPI, Postgres materialized views) at exact parity with the legacy dashboards; bulk export became 30× faster.
- Optimized analytical queries across 2M+ records and resolved production incidents to root cause: storage burst exhaustion, database locks, an orphaned queue, and WAF false positives.

**Bullets ES**

- Lidero la arquitectura y la entrega full-stack de un marketplace de crédito cloud-native usado por ~100K usuarios activos mensuales dentro de un ecosistema de 45M.
- Lidero un equipo de ingeniería multifuncional: estándares técnicos, patrones de arquitectura, guías de code review y cultura DevOps-first. Interlocutor técnico principal con el aliado y la alta dirección.
- Implementé la autenticación de usuarios con AWS Cognito y el manejo de secretos con Secrets Manager en los pipelines dev → staging → producción, con monitoreo y alertas en CloudWatch.
- Construí un servidor MCP de solo lectura con el que gerentes y analistas consultan datos de producción en lenguaje natural. Encontré y corregí de raíz un subconteo del 98,4% y cerré sus brechas de seguridad con revisión adversarial.
- Construí un agente autónomo de triage de producción (Claude Code headless con los MCP de Sentry, Jira y Slack) que corre cada día hábil bajo un contrato estricto de cero commits.
- Lideré una auditoría de costos de AWS en 17 regiones que bajó la factura mensual un 43%, con presupuestos, alertas de anomalías y políticas de retención para que el ahorro se mantenga.
- Reemplacé un servicio de BI administrado con gráficos como código (Angular, ECharts, FastAPI, vistas materializadas de Postgres) con paridad exacta frente a los dashboards anteriores; la exportación masiva quedó 30× más rápida.
- Optimicé consultas analíticas sobre más de 2M de registros y resolví incidentes de producción hasta la causa raíz: agotamiento de ráfaga de almacenamiento, bloqueos de base de datos, una cola huérfana y falsos positivos del WAF.

### 2.2 eSoluzion — Full-Stack Developer (Frontend consulting)

| Field               | Value                                                                                                                 |
| ------------------- | --------------------------------------------------------------------------------------------------------------------- |
| id                  | `esoluzion`                                                                                                           |
| Period              | Oct 2022 – Present                                                                                                    |
| Type EN / ES        | Contract · Remote / Contrato · Remoto                                                                                 |
| Location            | Remote                                                                                                                |
| Client line EN / ES | Core banking modules for an enterprise banking client / Módulos de core bancario para un cliente de banca empresarial |
| Case studies        | `core-banking-modules`                                                                                                |
| Stack               | Angular · TypeScript · Java · Spring Boot · Thymeleaf                                                                 |

**Bullets EN**

- Build and maintain Angular interfaces across multiple core banking modules.
- Designed end-to-end modules in Java (Spring Boot) and Thymeleaf that meet the bank's code-quality and regulatory-compliance standards.
- Remediated security vulnerabilities in a legacy Java codebase by replacing unsafe regex-based methods.
- Deliver features with product owners and QA against business requirements.
- Integrating an AI chat assistant into an internal credit-analysis application through the bank's corporate AI gateway, including enterprise authentication flows (Spring MVC, Thymeleaf).

**Bullets ES**

- Construyo y mantengo interfaces en Angular para varios módulos de core bancario.
- Diseñé módulos de punta a punta en Java (Spring Boot) y Thymeleaf que cumplen los estándares de calidad de código y de cumplimiento regulatorio del banco.
- Remedié vulnerabilidades de seguridad en un código Java legado reemplazando métodos inseguros basados en regex.
- Entrego funcionalidades junto a product owners y QA contra requerimientos de negocio.
- Integro un asistente de chat con IA en una aplicación interna de análisis de crédito a través del gateway corporativo de IA del banco, incluyendo flujos de autenticación empresariales (Spring MVC, Thymeleaf).

### 2.3 ImkGlobal (Ingenieros de Marketing) — Lead Developer

| Field               | Value                                                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| id                  | `imkglobal`                                                                                                                |
| Period              | Nov 2024 – Mar 2025                                                                                                        |
| Type EN / ES        | Full-time · Remote / Tiempo completo · Remoto                                                                              |
| Client line EN / ES | Apps for government-backed regional tourism services / Apps para servicios de turismo regional respaldados por el gobierno |
| Case studies        | `govtech-tourism-apps`                                                                                                     |
| Stack               | Flutter · Dart · REST APIs                                                                                                 |

**Bullets EN**

- Led a development team: technical decisions, architecture and sprint planning in an agile environment.
- Built cross-platform mobile and web applications in Flutter for government-backed regional tourism services.
- Bridged technical teams and non-technical stakeholders, turning business requirements into development tasks.

**Bullets ES**

- Lideré un equipo de desarrollo: decisiones técnicas, arquitectura y planeación de sprints en un entorno ágil.
- Construí aplicaciones móviles y web multiplataforma en Flutter para servicios de turismo regional respaldados por el gobierno.
- Hice de puente entre equipos técnicos y stakeholders no técnicos, convirtiendo requerimientos de negocio en tareas de desarrollo.

### 2.4 Dualboot Partners — Software Engineer

| Field               | Value                                                                                                                    |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| id                  | `dualboot`                                                                                                               |
| Period              | Apr 2022 – Mar 2023                                                                                                      |
| Type EN / ES        | Full-time · Remote / Tiempo completo · Remoto                                                                            |
| Client line EN / ES | Cloud services for a US-based car-rental platform / Servicios cloud para una plataforma de alquiler de carros en EE. UU. |
| Case studies        | `us-car-rental-cloud`                                                                                                    |
| Stack               | Python · Django · AWS Lambda · Chalice · EC2 · ELB · Route 53 · API Gateway · SES · SNS · PostgreSQL · MySQL             |

**Bullets EN**

- Designed and deployed AWS services for message delivery, notifications and operational workflows.
- Built serverless architectures with AWS Lambda and Chalice, automating data flows and removing manual processing bottlenecks.
- Configured high-availability infrastructure (EC2, Elastic Load Balancers, Route 53, API Gateway) and Python/Django services on PostgreSQL/MySQL with SES and SNS.

**Bullets ES**

- Diseñé y desplegué servicios en AWS para envío de mensajes, notificaciones y flujos operativos.
- Construí arquitecturas serverless con AWS Lambda y Chalice, automatizando flujos de datos y eliminando cuellos de botella de procesamiento manual.
- Configuré infraestructura de alta disponibilidad (EC2, Elastic Load Balancers, Route 53, API Gateway) y servicios Python/Django sobre PostgreSQL/MySQL con SES y SNS.

### 2.5 Accenture — Data Analyst / Java Developer / Full-Stack Developer

| Field               | Value                                                                                                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| id                  | `accenture`                                                                                                                                 |
| Period              | May 2021 – Jun 2022                                                                                                                         |
| Type EN / ES        | Full-time · Remote / Tiempo completo · Remoto                                                                                               |
| Client line EN / ES | A global bank's Colombian operation and a telecom operator / La operación colombiana de un banco global y un operador de telecomunicaciones |
| Case studies        | `banking-telecom-data`                                                                                                                      |
| Stack               | Java · Spring Boot · MEAN stack · Power BI · Oracle · MongoDB · Google Apps Script · Data Studio                                            |

**Bullets EN**

- Built Java (Spring Boot) backend services on the bank's batch and online frameworks, plus full-stack features on the MEAN stack.
- Built administrative dashboards (Google Apps Script, Data Studio) that helped recover a project running one year behind schedule.
- Built Power BI dashboards integrating Oracle and MongoDB sources for real-time telecom incident statistics.

**Bullets ES**

- Construí servicios backend en Java (Spring Boot) sobre los frameworks batch y online del banco, además de funcionalidades full-stack en el stack MEAN.
- Construí dashboards administrativos (Google Apps Script, Data Studio) que ayudaron a recuperar un proyecto que iba un año atrasado.
- Construí dashboards en Power BI integrando fuentes Oracle y MongoDB para estadísticas de incidentes de telecomunicaciones en tiempo real.

### 2.6 Founder project — Founder & Tech Lead (side project)

| Field                  | Value                                                                                                                                                                            |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| id                     | `founder`                                                                                                                                                                        |
| Employer label EN / ES | Conversational AI product (stealth) / Producto de IA conversacional (stealth)                                                                                                    |
| Period                 | 2026 – Present                                                                                                                                                                   |
| Type EN / ES           | Side project · Founder / Proyecto propio · Fundador                                                                                                                              |
| Client line EN / ES    | Pre-launch. Details under NDA; happy to walk through the code in an interview. / Pre-lanzamiento. Detalles bajo confidencialidad; con gusto recorro el código en una entrevista. |
| Case studies           | `conversational-ai-product`                                                                                                                                                      |
| Stack                  | TypeScript · Next.js · PostgreSQL · pgvector · Docker · Terraform · Cloudflare · Claude Code                                                                                     |

**Display rules:**

- Render this role **after the employment roles, under a small sub-heading** "Founder work" / "Proyectos propios", so it doesn't read as a sixth employer.
- It gets **no "Current" chip**, so a recruiter doesn't read it as a competing job.
- Show **2 bullets only**. The detail lives in case study §3.4.

**Bullets EN**

- Founded and build, solo, a multi-sided conversational AI product: hexagonal architecture, two-tier conversational memory with crypto-shredding erasure, a pre-LLM safety gate, and signed idempotent payments.
- Deliver with a multi-agent software factory (planner, coder and adversarial reviewer agents working from specs), backed by 3,000+ automated tests and rollback exercised in production.

**Bullets ES**

- Fundé y construyo, solo, un producto de IA conversacional de varios lados: arquitectura hexagonal, memoria conversacional de dos niveles con borrado por crypto-shredding, un filtro de seguridad previo al LLM y pagos firmados e idempotentes.
- Entrego con una fábrica de software multiagente (agentes planificador, programador y revisor adversarial trabajando desde specs), respaldada por más de 3.000 tests automatizados y rollback ejercitado en producción.

---

## 3. Case studies (`/projects`)

The case studies are split into three tiers. Order is display order.

- **Tier A, featured.** Large cards with the full story: Context → What I did → Outcome → Stack.
- **Tier B, production engineering.** Two-column cards with the same fields and shorter text.
- **Tier C, earlier work.** Compact cards: title, meta line, 2 bullets and stack.

Every card has a meta line **Employer · Period · Role** and a footer link
**"See role in experience →"** (`/experience#<roleId>`).

**Outcome chips only contain engineering metrics.** Company business metrics such as leads,
disbursements, user counts or AWS spend in dollars are deliberately excluded (see §12).

### Tier A — Featured

#### 3.1 `ai-in-production` (featured, full width, first)

- **Tag:** AI · MCP · AGENTS · **Status:** In production / En producción
- **Role:** `prosperas` · **Period:** 2025 – Present · Technical Lead
- **Title EN:** An MCP server that lets the business query production data — and get the right number
- **Title ES:** Un servidor MCP para que el negocio consulte datos de producción — y reciba el número correcto
- **Context EN:** Executives, managers and analysts wanted answers from production data without waiting on engineering. The first version of the natural-language-to-SQL assistant returned plausible but wrong numbers.
- **Context ES:** Directivos, gerentes y analistas querían respuestas de los datos de producción sin esperar a ingeniería. La primera versión del asistente de lenguaje natural a SQL devolvía números plausibles pero equivocados.
- **What I did EN:**
  - Built a remote, read-only MCP server inside the FastAPI backend with 8 tools (query, cursor pagination, fuzzy user search, schema discovery), API keys issued from the admin portal, and per-tenant scoping enforced by rewriting every SQL statement with sqlglot.
  - Traced the wrong answers to root causes, not prompts: a missing business rule caused a 98.4% undercount of approvals, an INNER JOIN dropped records, and the model was offered views that didn't exist. Fixed them with a single source of business rules embedded in the server, guarded by a drift test.
  - Ran an adversarial security review of my own server: closed scope-bypass and PII-exposure paths and tested 30+ attack shapes with zero leaks.
  - Built an autonomous morning triage agent (headless Claude Code with the Sentry, Jira and Slack MCPs). It root-causes production errors against the repo and files at most 3 tickets per run through a 4-condition gate, and it is not allowed to commit code or open PRs.
- **What I did ES:**
  - Construí un servidor MCP remoto y de solo lectura dentro del backend FastAPI con 8 herramientas (consulta, paginación con cursor, búsqueda difusa de usuarios, descubrimiento de esquema), API keys emitidas desde el portal admin y aislamiento por cliente aplicado reescribiendo cada sentencia SQL con sqlglot.
  - Rastreé las respuestas equivocadas hasta sus causas raíz, no hasta el prompt: una regla de negocio ausente producía un subconteo del 98,4% en aprobaciones, un INNER JOIN perdía registros y al modelo se le ofrecían vistas que no existían. Lo corregí con una única fuente de reglas de negocio embebida en el servidor y protegida con un test de deriva.
  - Hice una revisión de seguridad adversarial de mi propio servidor: cerré caminos para saltarse el aislamiento y exponer datos personales, y probé más de 30 formas de ataque sin ninguna fuga.
  - Construí un agente autónomo de triage matutino (Claude Code headless con los MCP de Sentry, Jira y Slack). Busca la causa raíz de los errores de producción en el repositorio y abre como máximo 3 tickets por corrida tras un filtro de 4 condiciones; no tiene permitido hacer commits ni abrir PRs.
- **Outcome chips EN:** `98.4% undercount found and fixed` · `Reconciled exactly against independent counts` · `30+ attack shapes, 0 leaks` · `Triage agent runs every weekday`
- **Outcome chips ES:** `Subconteo del 98,4% encontrado y corregido` · `Conciliado exacto contra conteos independientes` · `30+ formas de ataque, 0 fugas` · `Agente de triage corre cada día hábil`
- **Stack:** MCP, Claude Code, Claude API, Python, FastAPI, sqlglot, PostgreSQL, Sentry, Jira, Slack

#### 3.2 `credit-marketplace` (featured)

Keep the text from the previous version (context, 4 "What I did" bullets, stack). Replace the
outcome chips with these:

- **Outcome chips EN:** `~100K monthly active users` · `45M-user ecosystem` · `100% digital, zero paperwork` · `dev → staging → prod, fully provisioned in CDK`
- **Outcome chips ES:** `~100K usuarios activos mensuales` · `Ecosistema de 45M de usuarios` · `100% digital, sin papeles` · `dev → staging → prod, aprovisionado 100% con CDK`
- The "Loans from COP 300K to COP 70M" chip is **removed** until Cristhian confirms it (§12, D3).

#### 3.3 `aws-cost-audit` (featured)

- **Tag:** CLOUD · FINOPS · **Status:** Delivered / Entregado
- **Role:** `prosperas` · **Period:** 2026 · Technical Lead
- **Title EN:** Cutting the AWS bill by 43% without touching production performance
- **Title ES:** Bajar la factura de AWS un 43% sin tocar el rendimiento de producción
- **Context EN:** The AWS bill had grown for years across 17 enabled regions, with no budget, no anomaly alerts and no one who could say what each resource was for.
- **Context ES:** La factura de AWS había crecido durante años en 17 regiones habilitadas, sin presupuesto, sin alertas de anomalías y sin nadie que supiera para qué servía cada recurso.
- **What I did EN:**
  - Ran a read-only sweep of every enabled region, then removed spend in order of evidence. I retired a BI service that I had already replaced, closed an unused account, deleted a database with zero connections in 13 months, and turned off non-production insights.
  - Refused a tempting downsize. The production cluster averaged 12.7% CPU, but its p99 was 97.5%.
  - Put guardrails in place so it doesn't creep back: an anomaly monitor, a monthly budget, log retention on 240 of 240 log groups, and ECR lifecycle rules that took the registry from 229 GB to 21 GB.
- **What I did ES:**
  - Hice un barrido de solo lectura en todas las regiones habilitadas y luego eliminé gasto en orden de evidencia. Retiré un servicio de BI que ya había reemplazado, cerré una cuenta sin uso, borré una base de datos con cero conexiones en 13 meses y apagué el monitoreo detallado fuera de producción.
  - Rechacé una reducción tentadora: el clúster de producción promediaba 12,7% de CPU, pero su p99 era 97,5%.
  - Dejé controles para que el gasto no volviera a crecer: monitor de anomalías, presupuesto mensual, retención de logs en 240 de 240 grupos y reglas de ciclo de vida en ECR que bajaron el registro de 229 GB a 21 GB.
- **Outcome chips EN:** `−43% monthly AWS bill` · `ECR 229 GB → 21 GB` · `Retention on 240/240 log groups` · `Budget + anomaly alerts`
- **Outcome chips ES:** `−43% en la factura mensual de AWS` · `ECR de 229 GB a 21 GB` · `Retención en 240/240 grupos de logs` · `Presupuesto + alertas de anomalías`
- **Stack:** AWS Cost Explorer, Budgets, CloudWatch, RDS (gp3, Graviton), ECR, AWS CDK
- **Not published:** dollar amounts and annual savings, because they reveal the company's spend (§12, D4).

#### 3.4 `conversational-ai-product` (featured) — side project, anonymized

**Hard rule:** no brand, no domain, no repository link, no description of the vertical, no
screenshots. The product is described **only** as "a conversational AI product I founded".
Do not add anything that is not in this block.

- **Tag:** AI · FOUNDER · **Status EN/ES:** Pre-launch / Pre-lanzamiento
- **Role:** new role `founder` (see §2.6) · **Period:** 2026 – Present · Founder & Tech Lead
- **Title EN:** Founding and building a conversational AI product, solo, with an AI agent team
- **Title ES:** Fundar y construir un producto de IA conversacional, solo, con un equipo de agentes de IA
- **Context EN:** A multi-sided platform where creators design AI personas that hold long-running conversations. One engineer: me. So the architecture, the infrastructure and the delivery process had to make one person as effective as a team.
- **Context ES:** Una plataforma de varios lados donde creadores diseñan personas de IA que sostienen conversaciones largas. Un solo ingeniero: yo. La arquitectura, la infraestructura y el proceso de entrega tenían que hacer que una persona rindiera como un equipo.
- **What I did EN:**
  - Designed a hexagonal modular monolith (Next.js, TypeScript). Its 10+ bounded contexts have dependency rules enforced in CI, and every LLM call goes through a port, so switching models is a config change.
  - Designed two-tier conversational memory: structured facts plus a rolling summary are always loaded, and semantic recall from pgvector is top-k only, each layer with its own token budget. A per-user encryption key makes a deletion request a key deletion (crypto-shredding).
  - Built a mandatory safety gate before any LLM call. Blocked messages are never persisted and never reach the model, and every block is audited.
  - Built payments on an append-only ledger with signed, idempotent webhooks, verified adversarially: replays, forged signatures and tampered amounts all fail safely.
  - Built provider-portable infrastructure (Docker, Caddy, Cloudflare, Terraform). The app moved across three hosting providers without a rewrite, and rollback is exercised in production.
  - Run delivery with a multi-agent software factory: planner, coder and adversarial reviewer agents working from specs. In the first full run, 13 issues became 11 PRs merged the same day.
- **What I did ES:**
  - Diseñé un monolito modular hexagonal (Next.js, TypeScript). Sus más de 10 contextos acotados tienen reglas de dependencia validadas en CI, y cada llamada a un LLM pasa por un puerto, así que cambiar de modelo es un cambio de configuración.
  - Diseñé una memoria conversacional de dos niveles: hechos estructurados y un resumen móvil siempre cargados, y la recuperación semántica desde pgvector solo como top-k, cada capa con su propio presupuesto de tokens. Una llave de cifrado por usuario convierte una solicitud de borrado en borrar una llave (crypto-shredding).
  - Construí un filtro de seguridad obligatorio antes de cualquier llamada al LLM. Los mensajes bloqueados nunca se persisten ni llegan al modelo, y cada bloqueo queda auditado.
  - Construí los pagos sobre un ledger de solo inserción con webhooks firmados e idempotentes, verificados de forma adversarial: repeticiones, firmas falsas y montos alterados fallan de forma segura.
  - Construí infraestructura portable entre proveedores (Docker, Caddy, Cloudflare, Terraform). La app pasó por tres proveedores de hosting sin reescribirse, y el rollback está ejercitado en producción.
  - Entrego con una fábrica de software multiagente: agentes planificador, programador y revisor adversarial trabajando desde specs. En la primera corrida completa, 13 issues se convirtieron en 11 PRs mergeados el mismo día.
- **Outcome chips EN:** `3,000+ automated tests` · `Rollback in 17 s, exercised in prod` · `~$86/mo infrastructure` · `13 issues → 11 PRs in one day`
- **Outcome chips ES:** `3.000+ tests automatizados` · `Rollback en 17 s, ejercitado en producción` · `Infraestructura de ~US$86/mes` · `13 issues → 11 PRs en un día`
- **Honesty line under the card EN / ES:** Pre-launch: no user metrics yet. Code is private; happy to walk through it in an interview. / Pre-lanzamiento: aún no hay métricas de usuarios. El código es privado; con gusto lo recorro en una entrevista.
- **Stack:** TypeScript, Next.js, PostgreSQL, pgvector, Drizzle, Docker, Caddy, Cloudflare, Terraform, OpenRouter, Claude Code

### Tier B — Production engineering at Prosperas

#### 3.5 `analytics-platform`

- **Tag:** DATA · ANALYTICS · **Status:** In production
- **Role:** `prosperas` · **Period:** 2026
- **Title EN:** Replacing a managed BI tool with charts-as-code — at exact parity
- **Title ES:** Reemplazar una herramienta de BI administrada con gráficos como código — con paridad exacta
- **Context EN:** Dashboards lived in a managed BI service that was expensive, froze silently for weeks, and couldn't enforce the multi-tenant access rules the product already had.
- **Context ES:** Los dashboards vivían en un servicio de BI administrado que era caro, se congelaba en silencio durante semanas y no podía aplicar las reglas de acceso multi-cliente que el producto ya tenía.
- **What I did EN:** I used a strangler-pattern migration to ECharts in the Angular portal, backed by FastAPI endpoints over Postgres materialized views, and reused the existing tenant scoping instead of rebuilding it in a BI tool. I proved parity against the legacy dashboards on seven months of production data before retiring the old service. I also added CSV export for every chart and table, with bulk export through Postgres `COPY`.
- **What I did ES:** Migré con el patrón strangler a ECharts en el portal Angular, sobre endpoints FastAPI y vistas materializadas de Postgres, y reutilicé el aislamiento por cliente existente en vez de reconstruirlo en una herramienta de BI. Demostré paridad contra los dashboards anteriores con siete meses de datos de producción antes de retirar el servicio viejo. También agregué exportación CSV para cada gráfico y tabla, con exportación masiva usando `COPY` de Postgres.
- **Outcome chips EN:** `Exact parity on 7 months of prod data` · `1,146 FE + 108 BE tests green` · `CSV export 30× faster (638K rows in 21 s)` · `Legacy BI decommissioned`
- **Outcome chips ES:** `Paridad exacta en 7 meses de datos de producción` · `1.146 tests FE + 108 BE en verde` · `Exportación CSV 30× más rápida (638K filas en 21 s)` · `BI anterior retirado`
- **Stack:** Angular, ECharts, FastAPI, PostgreSQL (materialized views, COPY), AWS CDK

#### 3.6 `production-reliability`

- **Tag:** RELIABILITY · SRE · **Status:** In production
- **Role:** `prosperas` · **Period:** 2026
- **Title EN:** Production incidents, traced to root cause and closed for good
- **Title ES:** Incidentes de producción, rastreados hasta la causa raíz y cerrados para siempre
- **Format:** a short list of incidents, each with the pattern _symptom → root cause → fix_.
  - **EN:** API p99 reached 7.9 s during a view rebuild. **Root cause:** exhausted gp2 storage burst credits, not a bad query. **Fix:** migrated production databases to gp3 in two countries and fixed the infra-as-code drift; the same query then ran in about 2 minutes.
    **ES:** El p99 de la API llegó a 7,9 s durante la reconstrucción de una vista. **Causa:** créditos de ráfaga de almacenamiento gp2 agotados, no una mala consulta. **Solución:** migré las bases de producción a gp3 en dos países y corregí la deriva de la infraestructura como código; la misma consulta pasó a correr en unos 2 minutos.
  - **EN:** A production database was locked for about 2 hours. **Root cause:** four chained bugs in materialized-view refreshes. **Fix:** a tiered refresh with per-tier timeouts and a watchdog, and 11 of 20 views pruned.
    **ES:** Una base de producción quedó bloqueada unas 2 horas. **Causa:** cuatro bugs encadenados en el refresco de vistas materializadas. **Solución:** refresco por niveles con timeouts por nivel y un watchdog, y 11 de 20 vistas eliminadas.
  - **EN:** Redis memory was heading toward an out-of-memory crash. **Root cause:** an orphaned queue holding 250K messages. **Fix:** purged the queue and added a kill switch; memory went from 287.89 MB to 6.98 MB.
    **ES:** La memoria de Redis iba camino a quedarse sin espacio. **Causa:** una cola huérfana con 250K mensajes. **Solución:** purgué la cola y agregué un interruptor de apagado; la memoria bajó de 287,89 MB a 6,98 MB.
  - **EN:** A partner's webhooks were silently blocked at the WAF. **Root cause:** a managed rule matched their requests. **Fix:** I diagnosed it by separating edge blocks from app errors, then added a rate-limit-plus-allow rule.
    **ES:** Los webhooks de un aliado se bloqueaban en silencio en el WAF. **Causa:** una regla administrada coincidía con sus solicitudes. **Solución:** lo diagnostiqué separando bloqueos en el borde de errores de la aplicación y agregué una regla de rate-limit con permiso explícito.
  - **EN:** Credentials were rotated across 4 database environments with 0 failures (37 of 37 probes returned 200).
    **ES:** Roté credenciales en 4 ambientes de base de datos con 0 fallos (37 de 37 sondas respondieron 200).
- **Also shipped:** production monitoring for the consumer PWA (Sentry with client-side PII scrubbing and source maps from CI), plus an ingestion watchdog that alerts when errors _stop_ arriving.
- **Stack:** AWS RDS, ElastiCache/Redis, Celery, WAFv2, CloudWatch, Sentry, AWS CDK

#### 3.7 `identity-integrity`

- **Tag:** DATA INTEGRITY · SECURITY · **Status:** Delivered
- **Role:** `prosperas` · **Period:** 2026
- **Title EN:** Fixing duplicate identities in a live credit platform — measuring before touching anything
- **Title ES:** Corregir identidades duplicadas en una plataforma de crédito en vivo — midiendo antes de tocar nada
- **What I did EN:** I led a 5-week program: 15 PRs, 4 migrations and 4 databases audited. I hardened how returning users are matched, so identity comes only from a key asserted by the partner and never from typed data. Before every destructive step I wrote the expected numbers down and rehearsed against a copy of production, and that rehearsal caught 6 errors. I backfilled 94% of accounts in idempotent batches.
- **What I did ES:** Lideré un programa de 5 semanas: 15 PRs, 4 migraciones y 4 bases de datos auditadas. Endurecí cómo se reconoce a un usuario que regresa: la identidad sale solo de una llave asegurada por el aliado, nunca de datos digitados. Antes de cada paso destructivo escribí los números esperados y ensayé contra una copia de producción, y ese ensayo atrapó 6 errores. Completé el 94% de las cuentas en lotes idempotentes.
- **Outcome chips EN:** `15 PRs · 4 migrations` · `Rehearsal caught 6 errors before prod` · `Match rate 83.4% → 100%`
- **Outcome chips ES:** `15 PRs · 4 migraciones` · `El ensayo atrapó 6 errores antes de producción` · `Tasa de coincidencia de 83,4% a 100%`
- **Do NOT publish:** how many account-takeover paths existed, user counts, or any open finding.

#### 3.8 `public-platform-surfaces` (verifiable: public URLs)

- **Tag:** PLATFORM · **Status:** Live / En vivo
- **Role:** `prosperas` · **Period:** 2026
- **Title EN:** A short-links service and a docs site anyone can open
- **Title ES:** Un servicio de enlaces cortos y un sitio de documentación que cualquiera puede abrir
- **Bullets EN:**
  - Short-links service: five CDK stacks (Fargate behind an ALB, CloudFront plus WAF, SQS with a DLQ, an SLO dashboard, a Route 53 health probe) and a dedicated least-privilege database. The first real link redirected in about 0.4 s, and a dev rehearsal caught two bugs that would have broken the first create in production. I also built a reusable Claude Code skill that renders the launch video from an HTML timeline.
  - Public docs site rebuilt from WordPress to Astro Starlight on S3 and CloudFront, bilingual (EN/ES) with full-text search. TTFB is 50–80 ms after I fixed a CloudFront caching trap that added about 1.5 s.
- **Bullets ES:**
  - Servicio de enlaces cortos: cinco stacks de CDK (Fargate detrás de un ALB, CloudFront con WAF, SQS con DLQ, un dashboard de SLO, una sonda de salud en Route 53) y una base de datos propia con mínimo privilegio. El primer enlace real redirigió en unos 0,4 s, y un ensayo en dev atrapó dos bugs que habrían roto la primera creación en producción. También construí una skill reutilizable de Claude Code que genera el video de lanzamiento desde un timeline HTML.
  - Sitio público de documentación reconstruido de WordPress a Astro Starlight sobre S3 y CloudFront, bilingüe (EN/ES) y con búsqueda de texto completo. El TTFB quedó en 50–80 ms después de corregir una trampa de caché de CloudFront que sumaba unos 1,5 s.
- **Links:** `liveUrl` = `https://docs.prosperas.com`. For the short-links domain, **ask Cristhian** whether to link it (§12, D5).
- **Stack:** AWS CDK, ECS Fargate, ALB, CloudFront, WAF, SQS, Route 53, Astro Starlight, Playwright, ffmpeg

### Tier C — Earlier work (compact cards)

- 3.9 `core-banking-modules`: same content as the previous version, plus one bullet.
  - **EN:** Integrating an AI chat assistant into an internal credit-analysis banking application through the bank's corporate AI gateway, including enterprise authentication flows (Spring MVC, Thymeleaf).
  - **ES:** Integración de un asistente de chat con IA en una aplicación bancaria interna de análisis de crédito a través del gateway corporativo de IA del banco, incluyendo flujos de autenticación empresariales (Spring MVC, Thymeleaf).
  - **Do not name** the gateway or the application.
- 3.10 `us-car-rental-cloud`: same content as the previous version.
- 3.11 `govtech-tourism-apps`: same content as the previous version.
- 3.12 `banking-telecom-data`: same content as the previous version.

### 3.13 "Building in public" strip

Same as the previous version. Add a link to the **Writing** section (§9).

The public repo `Hermes-Multi-Agents-Kit` is **not linked** until Cristhian cleans up its README
(§12, D6).

---

## 4. Education & certifications

| Item                                                       | Issuer                                     | Date        | Verify URL                                                         |
| ---------------------------------------------------------- | ------------------------------------------ | ----------- | ------------------------------------------------------------------ |
| B.Eng. Systems Engineering                                 | Universidad Autónoma de Bucaramanga (UNAB) | 2016 – 2020 | —                                                                  |
| Technical Degree in Computer Systems / Técnico en Sistemas | SENA                                       | 2014 – 2016 | —                                                                  |
| Claude Code in Action                                      | Anthropic                                  | Feb 2026    | `TODO(Cristhian)` — copy from LinkedIn → Licenses & certifications |
| AWS Partner: Accreditation (Technical)                     | Amazon Web Services                        | Jul 2020    | `TODO(Cristhian)`                                                  |
| Neural Networks and Deep Learning                          | deeplearning.ai / Coursera                 | Sep 2020    | `TODO(Cristhian)`                                                  |

Render "Verify ↗" only when a URL exists.

ES labels: _Ingeniería de Sistemas (pregrado)_ · _Técnico en Sistemas_.

---

## 5. "How to verify" block (`/experience`, near the end)

**Heading EN / ES:** How to verify this / Cómo verificar esto

| Row EN                                            | Row ES                                           | Link                                                       |
| ------------------------------------------------- | ------------------------------------------------ | ---------------------------------------------------------- |
| Same roles and dates on LinkedIn                  | Los mismos cargos y fechas en LinkedIn           | https://www.linkedin.com/in/crisfon6/                      |
| Code and open-source work                         | Código y trabajo open source                     | https://github.com/Crisfon6-dev                            |
| Anthropic certificate                             | Certificado de Anthropic                         | cert URL (hide row if TODO)                                |
| References from managers and clients — on request | Referencias de jefes y clientes — bajo solicitud | `mailto:crisfon6@crisfon6.com?subject=Reference%20request` |

---

## 6. UI strings — new `experience` key in `messages.ts`

| Key                         | EN                                                                      | ES                                                                          |
| --------------------------- | ----------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `nav.experience`            | Experience                                                              | Experiencia                                                                 |
| `experience.label`          | EXPERIENCE                                                              | EXPERIENCIA                                                                 |
| `experience.heading`        | Technical Lead.                                                         | Technical Lead.                                                             |
| `experience.keyFacts`       | AT A GLANCE                                                             | EN RESUMEN                                                                  |
| `experience.history`        | WORK HISTORY                                                            | HISTORIA LABORAL                                                            |
| `experience.current`        | Current                                                                 | Actual                                                                      |
| `experience.present`        | Present                                                                 | Presente                                                                    |
| `experience.seeCaseStudy`   | See case study →                                                        | Ver caso →                                                                  |
| `experience.education`      | EDUCATION & CERTIFICATIONS                                              | EDUCACIÓN Y CERTIFICACIONES                                                 |
| `experience.verify`         | Verify ↗                                                                | Verificar ↗                                                                 |
| `experience.openTo`         | Open to                                                                 | Disponible para                                                             |
| `experience.print`          | Save as PDF                                                             | Guardar como PDF                                                            |
| `experience.emailMe`        | Email me                                                                | Escríbeme                                                                   |
| `experience.confidential`   | (line from §0)                                                          | (line from §0)                                                              |
| `experience.ctaHeading`     | Hiring for a remote Technical Lead?                                     | ¿Buscas un Technical Lead remoto?                                           |
| `experience.ctaDescription` | Email me and I'll share references and client details for your process. | Escríbeme y te comparto referencias y detalles de clientes para tu proceso. |
| `projects.roleLink`         | See role in experience →                                                | Ver cargo en experiencia →                                                  |
| `projects.context`          | Context                                                                 | Contexto                                                                    |
| `projects.whatIDid`         | What I did                                                              | Qué hice                                                                    |
| `projects.outcome`          | Outcome                                                                 | Resultado                                                                   |
| `projects.tierA`            | FEATURED                                                                | DESTACADOS                                                                  |
| `projects.tierB`            | PRODUCTION ENGINEERING                                                  | INGENIERÍA EN PRODUCCIÓN                                                    |
| `projects.tierC`            | EARLIER WORK                                                            | TRABAJO ANTERIOR                                                            |
| `projects.preLaunch`        | (honesty line from §3.4)                                                | (línea de §3.4)                                                             |
| `experience.founderWork`    | FOUNDER WORK                                                            | PROYECTOS PROPIOS                                                           |
| `experience.howIWork`       | HOW I WORK                                                              | CÓMO TRABAJO                                                                |
| `experience.writing`        | WRITING                                                                 | ESCRITOS                                                                    |
| `experience.testimonials`   | WHAT PEOPLE SAY                                                         | LO QUE DICEN                                                                |

Month names: use `Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric' })` from an
ISO `YYYY-MM` — don't hardcode.

---

## 7. Claim alignment — existing copy to change

Every row below is a place where the live site disagrees with the CV. Fix all MUST rows.

| Where                                                                            | Current                                                                                    | New EN                                                                                                                                                                                                                        | New ES                                                                                                                                                                                                                                        | Level                                                                            |
| -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| `StatsSection` years                                                             | 4+                                                                                         | 5+                                                                                                                                                                                                                            | 5+                                                                                                                                                                                                                                            | MUST                                                                             |
| `StatsSection` users                                                             | 1M+ "Users served"                                                                         | ~100K "Monthly active users" (use §1 tiles)                                                                                                                                                                                   | ~100K "Usuarios activos mensuales"                                                                                                                                                                                                            | MUST                                                                             |
| `hero.typewords[1]`                                                              | scale to millions.                                                                         | serve 100K+ users a month.                                                                                                                                                                                                    | sirven a 100K+ usuarios al mes.                                                                                                                                                                                                               | MUST                                                                             |
| `hero.kicker`                                                                    | AI SYSTEMS ENGINEER · LATAM                                                                | TECHNICAL LEAD · AI SYSTEMS · LATAM                                                                                                                                                                                           | TECHNICAL LEAD · SISTEMAS DE IA · LATAM                                                                                                                                                                                                       | MUST                                                                             |
| `hero.proof`                                                                     | 2M+ records processed · … −43% AWS bill · 30× faster data exports · 5+ years in production | −43% en la factura de AWS · exportaciones 30× más rápidas · 5+ años en producción                                                                                                                                             | MUST                                                                                                                                                                                                                                          |
| `about.intro1`                                                                   | 4+ years … serve millions of users                                                         | I'm Cristhian Fonseca — a Technical Lead with 5+ years building cloud-native FinTech and banking platforms.                                                                                                                   | Soy Cristhian Fonseca — Technical Lead con más de 5 años construyendo plataformas cloud-native de FinTech y banca.                                                                                                                            | MUST                                                                             |
| `about.intro2`                                                                   | serving millions of underbanked users                                                      | Right now I lead engineering for a digital credit marketplace inside a major telecom's Super App — ~100K monthly active users within a 45M-user ecosystem. Cloud-native on AWS, automated provisioning, zero-paperwork loans. | Hoy lidero la ingeniería de un marketplace de crédito digital dentro de la Super App de una gran telco — ~100K usuarios activos mensuales en un ecosistema de 45M. Cloud-native en AWS, aprovisionamiento automatizado, créditos sin papeles. | MUST                                                                             |
| `about.timeline` (4 generic items, "2020 Entered FinTech", "First LATAM cohort") | —                                                                                          | Generate from `career.ts` roles (5 items: period + "Role · Employer" + client line) and add the Anthropic cert as a 6th item without "First LATAM cohort"                                                                     | idem                                                                                                                                                                                                                                          | MUST                                                                             |
| `projects` metadata / `projects.description`                                     | "serving millions"                                                                         | FinTech and banking platforms in production, cloud infrastructure for a US platform, and AI agents that run on real data — each tied to the employer, period and role.                                                        | Plataformas FinTech y bancarias en producción, infraestructura cloud para una plataforma de EE. UU. y agentes de IA sobre datos reales — cada uno ligado a la empresa, el periodo y el cargo.                                                 | MUST                                                                             |
| About metadata                                                                   | 4+ years                                                                                   | 5+ years                                                                                                                                                                                                                      | —                                                                                                                                                                                                                                             | MUST                                                                             |
| `FeaturedProjectsSection`                                                        | "Millions of users served", "3+ years in production"                                       | read 3 case studies from `career.ts`: `credit-marketplace`, `ai-in-production`, `core-banking-modules`                                                                                                                        | —                                                                                                                                                                                                                                             | MUST                                                                             |
| Enterprise Banking card stack                                                    | lists Oracle                                                                               | Angular, TypeScript, Java, Spring Boot, Thymeleaf                                                                                                                                                                             | —                                                                                                                                                                                                                                             | MUST                                                                             |
| `HeroSection` GitHub link                                                        | github.com/crisfon6                                                                        | https://github.com/Crisfon6-dev                                                                                                                                                                                               | —                                                                                                                                                                                                                                             | MUST                                                                             |
| `layout.tsx` Person `jobTitle`                                                   | AI Systems Engineer · LATAM                                                                | Technical Lead                                                                                                                                                                                                                | —                                                                                                                                                                                                                                             | MUST                                                                             |
| "Anthropic-certified AI engineering patterns" (automations/newsletter copy)      | implies Anthropic certified the patterns                                                   | "Built by an engineer certified in Claude Code in Action (Anthropic, 2026)"                                                                                                                                                   | "Creado por un ingeniero certificado en Claude Code in Action (Anthropic, 2026)"                                                                                                                                                              | SHOULD                                                                           |
| `newsletter.joinBuilders`                                                        | FREE — JOIN 500+ BUILDERS                                                                  | FREE — EVERY WEEK                                                                                                                                                                                                             | GRATIS — CADA SEMANA                                                                                                                                                                                                                          | Resuelto (2026-09-27): newsletter no está operando actualmente, usar el fallback |
| `workWithMe.leadership`                                                          | VP Engineering or CTO                                                                      | Remote Technical Lead / Staff roles with US teams (CT/ET overlap), full-time or contract                                                                                                                                      | Roles remotos de Technical Lead / Staff con equipos de EE. UU. (horario CT/ET), tiempo completo o contrato                                                                                                                                    | SHOULD                                                                           |

---

## 8. JSON-LD

`layout.tsx` — replace the `Person` object:

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Cristhian Fonseca",
  "alternateName": "Cristhian Javier Delgado Fonseca",
  "url": "https://crisfon6.com",
  "jobTitle": "Technical Lead",
  "email": "mailto:crisfon6@crisfon6.com",
  "address": { "@type": "PostalAddress", "addressCountry": "CO" },
  "worksFor": { "@type": "Organization", "name": "Prosperas" },
  "alumniOf": { "@type": "CollegeOrUniversity", "name": "Universidad Autónoma de Bucaramanga" },
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "name": "Claude Code in Action",
      "recognizedBy": { "@type": "Organization", "name": "Anthropic" },
      "dateCreated": "2026-02"
    },
    {
      "@type": "EducationalOccupationalCredential",
      "name": "AWS Partner: Accreditation (Technical)",
      "recognizedBy": { "@type": "Organization", "name": "Amazon Web Services" },
      "dateCreated": "2020-07"
    }
  ],
  "knowsAbout": [
    "AWS",
    "AWS CDK",
    "Model Context Protocol",
    "LLM agents",
    "Claude API",
    "FastAPI",
    "Angular",
    "Java Spring Boot",
    "PostgreSQL",
    "FinTech"
  ],
  "sameAs": [
    "https://www.linkedin.com/in/crisfon6/",
    "https://github.com/Crisfon6-dev",
    "https://www.instagram.com/crisfon6/"
  ]
}
```

`/experience/page.tsx` — add `{ "@type": "ProfilePage", "mainEntity": { "@id": "https://crisfon6.com/#person" } }`
and give the Person above `"@id": "https://crisfon6.com/#person"`.

Metadata for `/experience`:

- **title:** Experience — Cristhian Fonseca, Technical Lead
- **description:** 5+ years building FinTech and banking platforms on AWS and AI agents in production. Full work history, case studies, certifications and how to verify them.

## 9. Writing (`/experience`, small section before "How to verify"; also linked from `/projects`)

Only **published** posts appear here, and each needs a real URL. An entry without `url` is
hidden.

| Date       | Title EN                                                                      | Title ES                                                                             | Lesson (1 line, EN)                                                                                                             | url                                  |
| ---------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| 2026-09-08 | An AI agent asked a user something they had already answered two days earlier | Un agente de IA le preguntó a un usuario algo que ya había respondido hacía dos días | Memory for a conversational product: layered SQL + rolling summary + top-k vector recall, not "store everything in the prompt". | `TODO(Cristhian)`: LinkedIn post URL |

Add the post scheduled for 2026-09-29 ("four green gates, no way out") only once it's published.
Don't list the 2026-09-24 post.

---

## 10. How I work (`/experience`, after Work history; 5 short rows)

Each row has a principle (bold) and one sentence of proof. Every row comes from a real case in
the records. Don't add new rows.

| #   | EN                                                                                                                                                                                                         | ES                                                                                                                                                                                                                       |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | **Measure before you execute.** Before a destructive data operation I write down the expected numbers and rehearse on a copy of production; that rehearsal once caught 6 errors before they reached users. | **Medir antes de ejecutar.** Antes de una operación destructiva sobre datos escribo los números esperados y ensayo en una copia de producción; ese ensayo atrapó una vez 6 errores antes de que llegaran a los usuarios. |
| 2   | **Percentiles over averages.** A cluster averaging 12.7% CPU looked oversized; its p99 was 97.5%. I kept it.                                                                                               | **Percentiles, no promedios.** Un clúster con 12,7% de CPU promedio parecía sobredimensionado; su p99 era 97,5%. Lo dejé como estaba.                                                                                    |
| 3   | **A merge to infrastructure is not a deploy.** A fix merged weeks earlier had never reached the CDN. Now I verify the running artifact, not the pull request.                                              | **Un merge a infraestructura no es un deploy.** Un fix mergeado semanas antes nunca había llegado al CDN. Ahora verifico el artefacto que está corriendo, no el pull request.                                            |
| 4   | **Monitor the outcome, not the mechanism.** Every check was green while production ran a 38-day-old build. I added an ancestry gate and a staleness alarm.                                                 | **Monitorear el resultado, no el mecanismo.** Todos los checks estaban en verde mientras producción corría un build de hace 38 días. Agregué un gate de ancestría y una alarma de desactualización.                      |
| 5   | **An agent's report is a claim, not evidence.** I use AI agents heavily, and every delivery goes through adversarial reviewer agents and a check against the real tree before it counts as done.           | **El reporte de un agente es una afirmación, no evidencia.** Uso agentes de IA a fondo, y cada entrega pasa por agentes revisores adversariales y una verificación contra el árbol real antes de darse por terminada.    |

---

## 11. Stack evidenced (replace About → Core stack; the same lists feed `knowsAbout`)

| Group         | Items                                                                                                                                                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AI & agents   | Claude API, Claude Code (skills, headless, sub-agents, hooks), MCP servers, LLM routing (OpenRouter), pgvector / RAG, agent memory, adversarial review agents, spec-driven development (OpenSpec)                      |
| Cloud & infra | AWS CDK, ECS Fargate, Lambda, RDS/PostgreSQL (gp3, Graviton), ElastiCache/Redis, S3, CloudFront, WAF, SQS, Route 53, Cognito, Secrets Manager, CloudWatch, Cost Explorer/Budgets, Terraform, Docker, Caddy, Cloudflare |
| Backend       | Python, FastAPI, SQLAlchemy, Alembic, Celery, sqlglot, Java, Spring Boot, Node.js, TypeScript                                                                                                                          |
| Frontend      | Angular, ECharts, SvelteKit, Next.js, Thymeleaf, Flutter                                                                                                                                                               |
| Data          | PostgreSQL (materialized views, COPY, locking, partial indexes), MySQL, Oracle, MongoDB, Power BI                                                                                                                      |
| Observability | Sentry, CloudWatch alarms, synthetic probes                                                                                                                                                                            |

---

## 12. Open decisions for Cristhian (the builder session must NOT decide these)

| #   | Decision                                                                                                                                                                             | Why it matters                                                                                             | Default until decided                                         |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| D1  | **Title at Prosperas:** "Technical Lead" (CV, LinkedIn) or "Senior Full-Stack & Cloud Engineer".                                                                                     | A background check confirms the title on the contract. If the site says something else, that's a red flag. | Technical Lead (matches CV and LinkedIn)                      |
| D2  | **Location:** Bogotá (LinkedIn) or Santander.                                                                                                                                        | Consistency across CV, LinkedIn and site.                                                                  | Site shows only "Colombia"                                    |
| D3  | **~100K MAU / 45M ecosystem / COP 300K–70M.** The engineering records don't contain these figures: they measure registered users and leads, not MAU, and the loan range isn't there. | You'll be asked "how do you measure MAU?" in an interview.                                                 | Show 100K/45M (you stated them); hide the loan range          |
| D4  | **Company business metrics** (AWS dollars saved, users, leads, disbursements).                                                                                                       | Prosperas data; publishing it can breach confidentiality.                                                  | Excluded; only percentages and engineering metrics            |
| D5  | **Cite Prosperas public sites** (docs site, short-links service) as your work.                                                                                                       | Needs to be OK with Prosperas.                                                                             | Docs site linked; short-links not linked                      |
| D6  | **Public multi-agent kit repo:** its README's examples folder names the side product.                                                                                                | Linking GitHub leads a recruiter straight to it.                                                           | Repo not linked from the site; GitHub profile link stays      |
| D7  | **Show the founder project at all.**                                                                                                                                                 | Strongest AI evidence, but a recruiter may read "not available".                                           | Shown as "Founder work", stealth, no "Current" chip           |
| D8  | **Cognito wording:** records show you operating auth for the admin/lender portal; the CV says "implemented user authentication".                                                     | Be precise about what you built vs. what you operate.                                                      | Keep CV wording                                               |
| D9  | **"Lead a cross-functional team":** records show stakeholders, QA, a data team and AI agents, but no named direct reports.                                                           | Interview question: "how many people report to you?"                                                       | Keep; be ready with the real team shape                       |
| D10 | **Testimonials:** 0 LinkedIn recommendations today. Ask 2–3 (a Prosperas lead, the eSoluzion/bank lead, an ex-Dualboot lead).                                                        | Third-party proof is what verification pages lack most.                                                    | Section `testimonials` exists in `career.ts` as `[]` → hidden |

---

## Appendix A — Full text of cards reused from v1 (referenced as "same content as the previous version")

#### v1 · `credit-marketplace` (featured, full width)

- **Tag:** FINTECH · **Status EN/ES:** In production / En producción
- **Role link:** `prosperas` · **Period:** 2025 – Present · **Role:** Technical Lead
- **Title EN:** Digital credit marketplace inside a telecom Super App
- **Title ES:** Marketplace de crédito digital dentro de una Super App de telecomunicaciones
- **Context EN:** A major telecom operator wanted to offer credit to the users of its Super App — fully digital, with no paperwork and no branch visits.
- **Context ES:** Una gran telco quería ofrecer crédito a los usuarios de su Super App — 100% digital, sin papeles y sin ir a una oficina.
- **What I did EN:**
  - Own the end-to-end AWS architecture with CDK and standardized multi-environment provisioning (dev → staging → prod).
  - Implemented user authentication with Cognito and secrets with Secrets Manager inside CI/CD, with CloudWatch alerting.
  - Optimized analytical queries over 2M+ records to cut dashboard latency and AWS cost.
  - Lead the engineering team and act as the technical interface with the partner.
- **What I did ES:**
  - Soy dueño de la arquitectura AWS de punta a punta con CDK y estandaricé el aprovisionamiento multi-ambiente (dev → staging → prod).
  - Implementé la autenticación con Cognito y los secretos con Secrets Manager dentro de CI/CD, con alertas en CloudWatch.
  - Optimicé consultas analíticas sobre más de 2M de registros para bajar la latencia de los dashboards y el costo de AWS.
  - Lidero el equipo de ingeniería y soy el interlocutor técnico con el aliado.
- **Outcome chips EN:** `~100K monthly active users` · `45M-user ecosystem` · `Loans from COP 300K to COP 70M` · `100% digital, zero paperwork`
- **Outcome chips ES:** `~100K usuarios activos mensuales` · `Ecosistema de 45M de usuarios` · `Créditos de COP 300K a COP 70M` · `100% digital, sin papeles`
- **Stack:** AWS CDK, Lambda, RDS PostgreSQL, ElastiCache Redis, S3, API Gateway, Cognito, Secrets Manager, CloudWatch, Python, FastAPI, Angular

#### v1 · `core-banking-modules`

- **Tag:** BANKING · **Status:** In production / En producción
- **Role link:** `esoluzion` · **Period:** 2022 – Present · **Role:** Full-Stack Developer
- **Title EN:** Core banking modules for an enterprise bank
- **Title ES:** Módulos de core bancario para un banco empresarial
- **Context EN:** A regulated bank needed new and maintained modules across its core banking web applications, under strict code-quality and compliance standards.
- **Context ES:** Un banco regulado necesitaba módulos nuevos y mantenimiento en sus aplicaciones web de core bancario, bajo estándares estrictos de calidad de código y cumplimiento.
- **What I did EN:**
  - Built and maintain Angular interfaces across multiple core banking modules.
  - Designed end-to-end modules in Java (Spring Boot) and Thymeleaf.
  - Remediated security vulnerabilities in legacy Java by replacing unsafe regex-based methods.
- **What I did ES:**
  - Construyo y mantengo interfaces en Angular para varios módulos de core bancario.
  - Diseñé módulos de punta a punta en Java (Spring Boot) y Thymeleaf.
  - Remedié vulnerabilidades de seguridad en Java legado reemplazando métodos inseguros basados en regex.
- **Outcome chips EN:** `Continuous engagement since Oct 2022` · `Regulatory compliance` · `Legacy Java security remediation`
- **Outcome chips ES:** `Relación continua desde oct 2022` · `Cumplimiento regulatorio` · `Remediación de seguridad en Java legado`
- **Stack:** Angular, TypeScript, Java, Spring Boot, Thymeleaf

#### v1 · `us-car-rental-cloud`

- **Tag:** CLOUD · SERVERLESS · **Status:** Delivered / Entregado
- **Role link:** `dualboot` · **Period:** 2022 – 2023 · **Role:** Software Engineer
- **Title EN:** Serverless operations for a US car-rental platform
- **Title ES:** Operaciones serverless para una plataforma de alquiler de carros en EE. UU.
- **Context EN:** A US car-rental platform needed reliable notifications, message delivery and operational workflows without manual data handling.
- **Context ES:** Una plataforma de alquiler de carros en EE. UU. necesitaba notificaciones, envío de mensajes y flujos operativos confiables, sin manejo manual de datos.
- **What I did EN / ES:** use the 3 bullets of role 2.4.
- **Outcome chips EN:** `Manual processing removed from data flows` · `High-availability setup`
- **Outcome chips ES:** `Procesamiento manual eliminado de los flujos de datos` · `Infraestructura de alta disponibilidad`
- **Stack:** Python, Django, AWS Lambda, Chalice, EC2, ELB, Route 53, API Gateway, SES, SNS

#### v1 · `govtech-tourism-apps`

- **Tag:** GOVTECH · MOBILE · **Status:** Delivered / Entregado
- **Role link:** `imkglobal` · **Period:** 2024 – 2025 · **Role:** Lead Developer
- **Title EN:** Cross-platform apps for regional tourism services
- **Title ES:** Apps multiplataforma para servicios de turismo regional
- **Context EN:** Government-backed tourism services needed one codebase for mobile and web, delivered by a small team on a fixed timeline.
- **Context ES:** Servicios de turismo respaldados por el gobierno necesitaban una sola base de código para móvil y web, entregada por un equipo pequeño con fecha fija.
- **What I did EN / ES:** use the 3 bullets of role 2.3.
- **Outcome chips EN:** `Team lead` · `One Flutter codebase for mobile + web`
- **Outcome chips ES:** `Líder de equipo` · `Una base de código Flutter para móvil + web`
- **Stack:** Flutter, Dart, REST APIs

#### v1 · `banking-telecom-data`

- **Tag:** BANKING · DATA · **Status:** Delivered / Entregado
- **Role link:** `accenture` · **Period:** 2021 – 2022 · **Role:** Java / Full-Stack Developer · Data Analyst
- **Title EN:** Banking backends and dashboards that got a late project back on track
- **Title ES:** Backends bancarios y dashboards que devolvieron a tiempo un proyecto atrasado
- **Context EN:** A bank project was running one year behind schedule, and a telecom operator had no real-time view of incidents.
- **Context ES:** Un proyecto bancario iba un año atrasado y un operador de telecomunicaciones no tenía visibilidad en tiempo real de sus incidentes.
- **What I did EN / ES:** use the 3 bullets of role 2.5.
- **Outcome chips EN:** `Helped recover a project 1 year behind` · `Real-time incident dashboards`
- **Outcome chips ES:** `Ayudé a recuperar un proyecto con 1 año de atraso` · `Dashboards de incidentes en tiempo real`
- **Stack:** Java, Spring Boot, MEAN, Power BI, Oracle, MongoDB, Google Apps Script

#### v1 · "Building in public" strip (below the case studies, not a card)

- **EN:** Outside client work I publish what I learn: weekly AI automation blueprints in **PowerAI**, technical deep dives on the **blog**, and code on **GitHub**.
- **ES:** Fuera del trabajo con clientes publico lo que aprendo: blueprints semanales de automatización con IA en **PowerAI**, análisis técnicos en el **blog** y código en **GitHub**.
- Links: `/newsletter`, `/blog`, `/automations`, `https://github.com/Crisfon6-dev`

**Removed from `/projects`** (no public repo or live URL could be found under
`github.com/Crisfon6-dev` on 2026-09-27): _MCP Server Starter_, _LLM Cost Calculator_. The
_AI Automation Library_ card becomes the strip above. Re-add any of them only as a card with a
working `repoUrl` or `liveUrl`.

---
