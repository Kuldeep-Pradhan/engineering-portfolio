export interface ProjectCaseStudy {
  id: string;
  slug: string;
  index: string;
  title: string;
  category: string;
  status: "In Production" | "AWS Deployed" | "Open Source" | "Internal System";
  statusColor: string;
  hook: string;
  summary: string;
  heroMetric: {
    value: string;
    label: string;
  };
  problem: string;
  solution: string;
  architectureHighlights: string[];
  outcomes: string[];
  technologies: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  badge: string;
}

export const projectsData: ProjectCaseStudy[] = [
  {
    id: "trustonboard",
    slug: "trustonboard",
    index: "01 / 06",
    title: "TrustOnboard",
    category: "Fintech KYC & Compliance Platform",
    status: "AWS Deployed",
    statusColor: "#4FD188",
    hook: "Institutional Multi-Step KYC & Risk Onboarding Platform with AWS CDK Infrastructure",
    summary:
      "Enterprise-grade merchant and institutional onboarding engine engineered for strict regulatory compliance, featuring automated S3 secrets injection, ECS Fargate orchestration, and multi-tier KYC verification state machines.",
    heroMetric: {
      value: "Zero-Downtime",
      label: "Automated AWS CDK Deployments",
    },
    problem:
      "Traditional onboarding workflows suffered from fragmented document verification, brittle manual secret rotations, and disconnected risk profiling across banking partners.",
    solution:
      "Engineered an end-to-end full-stack platform with a React/TypeScript frontend and Node.js microservices. Integrated AWS CDK for declarative infrastructure-as-code, automated runtime secret delivery via S3, and strict multi-step KYC state machine verification.",
    architectureHighlights: [
      "Containerized microservices running on AWS ECS Fargate with CloudFront CDN & Route 53 DNS.",
      "Declarative AWS CDK TypeScript stacks for repeatable multi-region infrastructure provisioning.",
      "Multi-step verification state machine (Aadhaar, PAN, Biometric & Liveness) with MongoDB session storage and PostgreSQL audit logging.",
      "Stateless cryptographic JWT token validation with auto-refresh rotation.",
    ],
    outcomes: [
      "Reduced cloud deployment and teardown cycle to a single automated CDK command.",
      "Streamlined institutional onboarding time with unified risk assessment workflows.",
      "100% compliance audit trail tracking for regulatory oversight.",
    ],
    technologies: [
      "React.js",
      "TypeScript",
      "Node.js",
      "Express.js",
      "AWS CDK",
      "AWS ECS Fargate",
      "AWS S3",
      "CloudFront",
      "PostgreSQL",
      "MongoDB",
      "Docker",
    ],
    githubUrl: "https://github.com/Kuldeep-Pradhan",
    badge: "Flagship Architecture",
  },
  {
    id: "totp-service",
    slug: "totp-service",
    index: "02 / 06",
    title: "Stateless TOTP & 2FA Service",
    category: "High-Availability Security Microservice",
    status: "In Production",
    statusColor: "#4FD188",
    hook: "RFC 6238 2FA Microservice slashing Auth Latency by ~60% via Stateless HMAC Tokens",
    summary:
      "High-availability, RBI-compliant authentication engine eliminating database state bottlenecks by utilizing client-held HMAC-SHA256 tokens and constant-time cryptographic comparisons.",
    heroMetric: {
      value: "~60% Lower",
      label: "Authentication Latency",
    },
    problem:
      "Storing short-lived 2FA sessions in distributed Cassandra clusters introduced heavy database I/O, network hops, and write locks during high-concurrency peak traffic periods.",
    solution:
      "Redesigned the authentication architecture into a horizontally scalable stateless microservice using cryptographically signed HMAC-SHA256 tokens. The client holds the verifiable encrypted state, eliminating database read/write cycles entirely during verification.",
    architectureHighlights: [
      "Full compliance with RFC 6238 (Time-Based One-Time Password Algorithm) and RBI 2FA directives.",
      "Stateless HMAC-SHA256 token verification eliminating database read/write I/O bottleneck.",
      "Constant-time cryptographic comparison (`crypto.timingSafeEqual`) to prevent side-channel timing attacks.",
      "Sub-millisecond verification cycles with horizontal container scalability.",
    ],
    outcomes: [
      "Cut end-to-end authentication latency by approximately 60%.",
      "Eliminated Cassandra storage costs and disk contention for transient OTP sessions.",
      "Guaranteed linear horizontal scalability under flash traffic surges.",
    ],
    technologies: [
      "Node.js",
      "TypeScript",
      "HMAC-SHA256",
      "RFC 6238",
      "Express.js",
      "Docker",
      "Jest",
      "GCP Kubernetes",
    ],
    githubUrl: "https://github.com/Kuldeep-Pradhan/totp_service",
    badge: "Security Core",
  },
  {
    id: "notification-engine",
    slug: "notification-engine",
    index: "03 / 06",
    title: "Multi-Channel Notification Engine",
    category: "Distributed Event-Driven Architecture",
    status: "In Production",
    statusColor: "#4FD188",
    hook: "Centralized Multi-Channel Alert Platform cutting Template Maintenance by 40%",
    summary:
      "High-throughput event-driven messaging service built with NestJS, React, and GCP Pub/Sub, orchestrating transactional SMS, Email, and Push alerts across banking correspondents and merchants.",
    heroMetric: {
      value: "-40%",
      label: "Engineering Template Overhead",
    },
    problem:
      "Disparate third-party notification vendors and hardcoded templates created high maintenance overhead and lacked unified delivery tracking across SMS, email, and mobile push channels.",
    solution:
      "Engineered a centralized notification microservice platform integrating Novu SDK and GCP Pub/Sub. Built an administrative dashboard in React for dynamic template authoring, fallbacks, and real-time delivery analytics.",
    architectureHighlights: [
      "Asynchronous message consumption and rate-limiting using GCP Pub/Sub message queues.",
      "Modular multi-provider routing (SMS gateways, SendGrid, FCM push notifications) with automatic failover.",
      "Role-based administrative portal in React for dynamic template creation without code deployments.",
      "Delivery analytics and webhook retry queue for transient gateway failures.",
    ],
    outcomes: [
      "Reduced developer maintenance overhead for message templates by ~40%.",
      "Delivered reliable transactional alerts across 300K+ monthly active merchants.",
      "Sub-second alert dispatch latency with automatic retry guarantees.",
    ],
    technologies: [
      "NestJS",
      "React.js",
      "GCP Pub/Sub",
      "Novu SDK",
      "TypeScript",
      "Redis",
      "Tailwind CSS",
      "Docker",
    ],
    githubUrl: "https://github.com/Kuldeep-Pradhan/notification_dashboard_nestjs",
    badge: "Event-Driven",
  },
  {
    id: "nodejs-boilerplate",
    slug: "nodejs-boilerplate",
    index: "04 / 06",
    title: "Enterprise Layered Node.js Boilerplate",
    category: "Microservice Framework & Architecture",
    status: "Open Source",
    statusColor: "#E8B54D",
    hook: "Clean Architecture Microservice Starter with Multi-Database Repositories",
    summary:
      "Production-ready enterprise boilerplate implementing domain-driven design, generic repository abstractions (MongoDB, PostgreSQL, Cassandra), and schema-driven request validation.",
    heroMetric: {
      value: "Multi-DB",
      label: "Generic Repository Layer",
    },
    problem:
      "Spinning up new enterprise microservices frequently resulted in boilerplate duplication, inconsistent error handling formats, and tightly coupled database queries.",
    solution:
      "Architected a standardized, modular starter kit featuring layered separation of concerns (Controller, Service, Repository), generic DB connectors, centralized structured logging, and BDD testing harness.",
    architectureHighlights: [
      "Clean Architecture with strict boundary separation between business logic and database drivers.",
      "Unified repository interfaces with swappable implementations for PostgreSQL, MongoDB, and Cassandra.",
      "Strict schema validation pipeline with automatic type inference and sanitized error responses.",
      "Configured Docker Compose environments for one-command local developer bootstrapping.",
    ],
    outcomes: [
      "Accelerated new microservice onboarding and MVP scaffolding time by 3x.",
      "Enforced uniform API contracts, health check routes, and Prometheus telemetry metrics.",
      "Over 90% unit and integration test coverage out of the box using Jest.",
    ],
    technologies: [
      "Node.js",
      "Express.js",
      "TypeScript",
      "PostgreSQL",
      "MongoDB",
      "Cassandra",
      "Docker",
      "Jest",
    ],
    githubUrl: "https://github.com/Kuldeep-Pradhan/nodejs-boilerplate",
    badge: "Architectural Pattern",
  },
  {
    id: "banking-portal",
    slug: "banking-portal",
    index: "05 / 06",
    title: "High-Throughput Banking & Merchant Portal",
    category: "Fintech Systems & Device Management",
    status: "In Production",
    statusColor: "#4FD188",
    hook: "Mission-Critical Banking Operations Dashboard serving 300K+ Active Users at 2,500+ TPS",
    summary:
      "Enterprise merchant and banking operations platform managing transaction workflows, micro-ATM device mappings, and administrative hierarchies for tier-1 banking partners.",
    heroMetric: {
      value: "2,500+ TPS",
      label: "Peak Transaction Capacity",
    },
    problem:
      "High-concurrency merchant transactions across micro-ATMs and point-of-sale terminals required real-time hierarchy mapping, live device health monitoring, and audit-grade performance.",
    solution:
      "Built resilient backend REST APIs on GCP with Docker & Kubernetes. Developed high-speed device mapping services tracking 5,000+ active mATM units alongside Firebase live status streaming and a high-performance React dashboard.",
    architectureHighlights: [
      "Distributed microservices topology handling 2,500+ peak TPS with zero drop-off.",
      "Hierarchical device tracking engine mapping 5,000+ banking correspondent mATMs.",
      "Real-time status alerts and telemetry powered by Firebase & WebSockets.",
      "Responsive merchant and admin interfaces supporting 300K+ monthly active merchants.",
    ],
    outcomes: [
      "Maintained 99.99% system availability during critical banking settlement windows.",
      "Successfully integrated and scaled workflows for Kotak, NSDL, and CSC banking partners.",
      "Empowered 500+ internal administrators with instant device diagnostic capabilities.",
    ],
    technologies: [
      "React.js",
      "TypeScript",
      "Node.js",
      "GCP Kubernetes",
      "MongoDB",
      "Firebase",
      "REST APIs",
      "Docker",
    ],
    githubUrl: "https://github.com/Kuldeep-Pradhan/idbi_portal",
    badge: "High-Throughput Scale",
  },
  {
    id: "sdlc-automation",
    slug: "sdlc-automation",
    index: "06 / 06",
    title: "SDLC & Workflow Automation Pipeline",
    category: "DevOps & Engineering Productivity",
    status: "Internal System",
    statusColor: "#E8B54D",
    hook: "Automated Jira-to-Jenkins CI/CD Pipeline & QA Documentation Sync via n8n",
    summary:
      "Self-initiated developer platform connecting Jira ticket status transitions directly to automated Jenkins builds, production health-check verifications, and Obsidian QA documentation handoffs.",
    heroMetric: {
      value: "Automated",
      label: "Release & QA Verification",
    },
    problem:
      "Manual coordination between Jira sprint boards, Jenkins build executions, and deployment health-check logs introduced friction and delayed QA verification cycles.",
    solution:
      "Designed and deployed an automated workflow pipeline using n8n. Configured webhooks to trigger Jenkins builds upon Jira ticket movement, poll endpoint health, and automatically generate formatted release notes.",
    architectureHighlights: [
      "Event-driven webhook orchestration connecting Jira Cloud APIs with on-premise Jenkins runners.",
      "Automated smoke-testing runner verifying service `/health` and `/ready` endpoints post-deployment.",
      "Automated markdown changelog synchronization into team Obsidian knowledge bases.",
      "Slack/Email release notifications with build artifacts and test coverage summaries.",
    ],
    outcomes: [
      "Eliminated manual build trigger overhead and release documentation lag.",
      "Provided instant visibility into deployment status and automated test run results.",
      "Adopted across engineering pods for continuous deployment workflows.",
    ],
    technologies: [
      "n8n",
      "Jenkins",
      "Jira API",
      "Obsidian",
      "Docker",
      "Bash / Node.js",
      "Webhooks",
    ],
    githubUrl: "https://github.com/Kuldeep-Pradhan",
    badge: "Developer Experience",
  },
];
