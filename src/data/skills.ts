export interface SkillCategory {
  id: string;
  category: string;
  code: string;
  description: string;
  skills: {
    name: string;
    level: "Expert" | "Advanced" | "Proficient";
    highlight?: boolean;
    tag?: string;
  }[];
}

export const skillsData: SkillCategory[] = [
  {
    id: "core-stack",
    category: "Core Stack",
    code: "DOM.01",
    description: "The primary technologies I use daily to build full-stack web applications and services.",
    skills: [
      { name: "Node.js", level: "Expert", highlight: true, tag: "Backend" },
      { name: "TypeScript", level: "Expert", highlight: true, tag: "Language" },
      { name: "React.js", level: "Expert", highlight: true, tag: "Frontend" },
      { name: "Next.js", level: "Advanced", highlight: true, tag: "SSR/SSG" },
      { name: "Express.js", level: "Expert", tag: "API" },
      { name: "PostgreSQL", level: "Advanced", highlight: true, tag: "SQL" },
      { name: "MongoDB", level: "Expert", tag: "NoSQL" },
      { name: "Apache Cassandra", level: "Advanced", highlight: true, tag: "Wide-Column" }
    ],
  },
  {
    id: "backend-architecture",
    category: "Backend & Architecture",
    code: "DOM.02",
    description: "Design patterns and systems enabling high-throughput and scalable distributed applications.",
    skills: [
      { name: "Microservices", level: "Expert", highlight: true, tag: "Architecture" },
      { name: "REST APIs", level: "Expert", tag: "Design" },
      { name: "gRPC", level: "Advanced", tag: "RPC" },
      { name: "Event-driven Systems", level: "Advanced", tag: "Design" },
      { name: "Redis", level: "Advanced", highlight: true, tag: "Caching" },
      { name: "WebSockets", level: "Advanced", tag: "Real-time" }
    ],
  },
  {
    id: "cloud-devops",
    category: "Cloud, Containers & CI/CD",
    code: "DOM.04",
    description: "Cloud-native deployments on Google Cloud Platform and AWS with Docker containerization and automated CI/CD pipelines.",
    skills: [
      { name: "Google Cloud Platform (GCP)", level: "Advanced", highlight: true, tag: "GKE / VM" },
      { name: "GCP Pub/Sub", level: "Advanced", highlight: true, tag: "Messaging" },
      { name: "AWS (ECS, Lambda, S3, EC2)", level: "Advanced", highlight: true, tag: "Cloud" },
      { name: "AWS CDK", level: "Advanced", tag: "IaC" },
      { name: "Docker", level: "Expert", highlight: true, tag: "Containers" },
      { name: "Kubernetes", level: "Advanced", tag: "Orchestration" },
      { name: "Jenkins CI/CD", level: "Advanced", tag: "Automation" },
      { name: "GitHub Actions", level: "Advanced", tag: "Workflows" },
      { name: "Firebase", level: "Advanced", tag: "Live Alerts" },
    ],
  },
  {
    id: "security-testing",
    category: "Security, Auth & Quality Assurance",
    code: "DOM.05",
    description: "RBI-compliant authentication, cryptographic token generation, and comprehensive automated test suites.",
    skills: [
      { name: "RFC 6238 TOTP / OTP 2FA", level: "Expert", highlight: true, tag: "Security" },
      { name: "HMAC-SHA256 Stateless Auth", level: "Expert", highlight: true, tag: "Crypto" },
      { name: "OAuth 2.0 & OpenID Connect", level: "Advanced", tag: "Auth Protocol" },
      { name: "SSO (Auth0)", level: "Advanced", tag: "Enterprise" },
      { name: "JWT Architecture", level: "Expert", tag: "Tokens" },
      { name: "Jest & Jest-Cucumber (BDD)", level: "Advanced", highlight: true, tag: "Testing" },
      { name: "n8n Automation", level: "Advanced", tag: "Productivity" },
    ],
  }
];
