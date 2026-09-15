I've spent 20+ years building teams and shipping high-impact software across
mortgage, real estate, education, and government domains. A background in
graphic and visual design gives my frontend work an eye for detail and user
experience that's rare at the senior engineering level, and a consistent focus
on team culture means the teams I build become places people want to stay.

## Employment

- <span>01/2026 - 10/2026</span> <i>|</i> **Software Engineer** <i>|</i> Khan
  Academy
  - **Full-Stack Contract Expiration Tracking**: Authored the design doc and
    implemented a system end-to-end (Go / GraphQL / React + TypeScript):
    encrypted multi-valued contact storage, a derived state machine, a scheduled
    reconciliation job with an auditable transition ledger, and an admin UI
  - **CI/CD Security Vulnerability**: Root-caused and patched a zero-review
    auto-merge hole where a PR touching one workflow file could land its entire
    diff to production, then fixed and verified live by triggering the patch
    against its own landing PR
  - **Parity-Validated Migration Pattern**: Designed a reusable pipeline
    migration pattern (hidden-URL shadow traffic, schema-driven diff engine,
    PII-safe structured logging) adopted as the team standard for every future
    report migration
  - **Architecture Benchmarking**: Benchmarked pure-Go, in-process SQLite, and
    DuckDB for a CSV roll-ups pipeline at 10K-student scale, ruling out DuckDB
    at 4.85s vs. a 30.55ms baseline (158× slower) with measured numbers
  - **AI-Assisted Engineering**: Applied Claude Code for design, planning, and
    implementation with strict PII discipline maintained throughout under FERPA
- <span>10/2024 - 01/2026</span> <i>|</i> **Lead Fullstack Engineer** <i>|</i>
  Hypergiant
  - **Secure Delivery Across Classification Levels**: Built and delivered
    Next.js applications (Vite, React Server Components) across unclassified and
    classified government environments, including a reusable open-source design
    system in React and TypeScript
- <span>05/2023 - 09/2024</span> <i>|</i> **Team Leader** <i>|</i> Visiting
  Media
  - **Transformed Engineering Quality**: Raised test coverage from 0% to 80% in
    8 months (100% for new code), implementing CI/CD automation and ephemeral PR
    environments
  - **RBAC Architecture and Adoption**: Designed role-based access control
    architecture and drove company-wide adoption
- <span>12/2021 - 07/2022</span> <i>|</i> **Team Leader** <i>|</i> Guaranteed
  Rate
  - **Stabilized Engineering Leadership**: Restored stable leadership to two
    engineering teams that had experienced chronic instability, stepping into
    the role despite not being hired for it
- <span>04/2012 - 12/2021</span> <i>|</i> **Team Leader** <i>|</i> Rocket
  Mortgage
  - **Warren Buffett's Billion Dollar Bracket**: Led frontend development for
    Quicken Loans' $1 billion NCAA tournament contest, handling national
    marketing exposure, massive traffic spikes, and secure identity verification
    under aggressive timelines
  - **Built Zero-Downtime SRE Organization**: Grew Site Reliability Engineering
    from 0 to 11 members, achieving 99.9–99.99% uptime, zero self-inflicted
    outages, and reduced MTTR by 10% via a distributed service status page
  - **$100B+ in Closed Loans**: Led engineering for mortgage pricing systems via
    a custom DSL and editor, handling all company pricing rules and supporting
    over $100 billion in closed loan revenue
  - **Super Bowl Campaigns (2016–2018)**: Engineered systems for Rocket
    Mortgage's Super Bowl commercials three years running, sustaining massive
    traffic bursts securely under national exposure
  - **Enterprise Architecture Standards**: Designed and rolled out RESTful API
    framework adopted by 100+ microservices and hundreds of developers, creating
    productivity economies of scale across the organization

<!--
- <span>03/2018 - 12/2021</span> <i>|</i> **Team Leader** <i>|</i> Rocket Mortgage
- <span>11/2015 - 03/2018</span> <i>|</i> **Software Architect** <i>|</i> Rocket Mortgage
  - **Architected Fintech Services**: Designed secure, scalable networks for
    distributed fintech applications
  - **Led Cloud Migration**: Championed cloud-native standards for AWS migration
    across the enterprise
  - **Enhanced Developer Experience**: Created an open-source API spec linter to
    improve development workflows and reduce review times
  - **Empowered Engineering Teams**: Delivered internal workshops on RESTful
    design principles, accelerating API adoption and skill development
- <span>04/2012 - 11/2015</span> <i>|</i> **Staff Software Engineer** <i>|</i> Rocket Mortgage
  - **Fostered Collaboration**: Established a community of practice to enhance
    code reuse and cross-team communication
  - **Enhanced UX and Design**: Improved design systems and usability across
    internal and external-facing applications
  - **Innovation**: Designed and implemented a domain-specific language (DSL)
    and custom editor for defining mortgage pricing rules, reducing user input
    time and improving execution speed
- <span>09/2010 - 04/2012</span> <i>|</i> **Senior Software Engineer** <i>|</i> Centurion Medical Products
  - **Directed CMS Selection**: Led a strategic CMS evaluation, choosing an
    open-source solution that reduced costs and accelerated delivery
- <span>04/2003 - 06/2010</span> <i>|</i> **Software Engineer** <i>|</i> Michigan State University
  - **Database Normalization**: Reorganized content storage and redesigned
    database schema to improve data classification and searchability, supporting
    more dynamic linking across the CMS
-->

## Independent Work

- **Vela Navigator**: Real estate technology platform (Deno, TypeScript,
  PostgreSQL)
  - **Real Estate Coordinator Portal**: Architected a multi-tenant SaaS platform
    from scratch, with multi-provider OIDC/PKCE auth and per-tenant credential
    config, zero-deploy-time tenant resolution, and type-safe schema across a
    multi-schema PostgreSQL database
  - **AI-Augmented Development Model**: Designed a contribution workflow
    enabling non-technical real estate consultants to author PRs via AI
    assistant, with engineer-owned review gates bringing domain expertise
    directly into the codebase safely
- **Speculate**: Personal investment decision-support tool (Deno, Preact,
  SQLite, TypeScript, Go)
  - **Stock Screening Platform**: Built a full-stack platform managing 5,000+
    symbol price histories: Deno server, Preact SPA, SQLite storage, Alpaca
    Markets and Yahoo Finance integrated via a concurrent batch fetch pipeline
  - **Mean-Reversion Signal Engine**: Implemented using OLS trend fitting,
    amplitude/frequency metrics, and R² scoring to surface buy/sell candidates
    with statistical backing
  - **Go Performance Migration**: Moved computationally intensive analysis
    passes to a Go binary, improving scan throughput across the full 5,000+
    symbol universe

## Skills

- **Languages & Runtimes**: Bun, CSS, Deno, Go, HTML, JavaScript, Node.js, PHP,
  TypeScript
- **Frameworks & Libraries**: CSS-in-JS, Fresh, Next.js, Preact, React, Tailwind
- **Architecture & Patterns**: Domain-driven design, gRPC, GraphQL,
  microservices, multi-tenant SaaS, OIDC / OAuth 2.0 (PKCE), queues, RBAC,
  RESTful API design, Site Reliability Engineering (SRE)
- **Data & Infrastructure**: AWS, data normalization, Drizzle ORM, GCP,
  PostgreSQL, SQL, SQLite
- **Design**: Adobe Illustrator, Adobe Photoshop, Figma, UI/UX design, visual
  design
- **Practices & Tooling**: Agile, agentic development workflows, CI/CD
  automation, Claude Code, custom DSL design, ephemeral PR environments, SAFe,
  Scrum, test-driven development (TDD)

## Education

- **Michigan State University** <i>|</i> BA, Information Science
  <span>05/2006</span>
