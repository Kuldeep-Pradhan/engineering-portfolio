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
    id: "backend-frameworks",
    category: "Backend & Distributed Systems",
    code: "DOM.01",
    description:
      "High-throughput microservices, scalable REST & gRPC APIs, and event-driven architectures.",
    skills: [
      { name: "Node.js", level: "Expert", highlight: true, tag: "Core" },
      { name: "TypeScript", level: "Expert", highlight: true, tag: "Core" },
      { name: "Express.js", level: "Expert", highlight: true, tag: "Core" },
      { name: "NestJS", level: "Advanced", highlight: true, tag: "Production" },
      { name: "gRPC", level: "Advanced", tag: "Microservices" },
      { name: "REST APIs", level: "Expert", tag: "Design" },
      { name: "WebSockets / Socket.io", level: "Advanced", tag: "Real-time" },
      { name: "Microservices Architecture", level: "Expert", highlight: true, tag: "Fintech" },
      { name: "System Design", level: "Advanced", tag: "Architecture" },
    ],
  },
  {
    id: "frontend-technologies",
    category: "Frontend & Full Stack Engineering",
    code: "DOM.02",
    description:
      "High-performance, responsive web interfaces, complex financial dashboards, and server-rendered web applications.",
    skills: [
      { name: "React.js", level: "Expert", highlight: true, tag: "Batch Topper" },
      { name: "Next.js (App Router)", level: "Advanced", highlight: true, tag: "SSR/SSG" },
      { name: "Tailwind CSS", level: "Expert", tag: "Styling" },
      { name: "Material UI", level: "Advanced", tag: "Design System" },
      { name: "State Management (Redux/Zustand)", level: "Advanced", tag: "Client State" },
      { name: "HTML5 / Modern ES6+ JS", level: "Expert", tag: "Foundation" },
      { name: "Video.js", level: "Proficient", tag: "Media" },
    ],
  },
  {
    id: "databases-caching",
    category: "Databases & Distributed Storage",
    code: "DOM.03",
    description:
      "Relational, document, wide-column, and in-memory databases modeled for high concurrency and audit compliance.",
    skills: [
      { name: "PostgreSQL", level: "Advanced", highlight: true, tag: "ACID / Audit" },
      { name: "MongoDB", level: "Expert", highlight: true, tag: "Session / Data" },
      { name: "Apache Cassandra", level: "Advanced", tag: "Wide-Column" },
      { name: "AWS DynamoDB", level: "Advanced", tag: "NoSQL Scale" },
      { name: "Redis", level: "Advanced", highlight: true, tag: "Caching / Queue" },
    ],
  },
  {
    id: "cloud-devops",
    category: "Cloud, Containers & CI/CD",
    code: "DOM.04",
    description:
      "Cloud-native deployments on Google Cloud Platform and AWS with Docker containerization and automated CI/CD pipelines.",
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
    description:
      "RBI-compliant authentication, cryptographic token generation, and comprehensive automated test suites.",
    skills: [
      { name: "RFC 6238 TOTP / OTP 2FA", level: "Expert", highlight: true, tag: "Security" },
      { name: "HMAC-SHA256 Stateless Auth", level: "Expert", highlight: true, tag: "Crypto" },
      { name: "OAuth 2.0 & OpenID Connect", level: "Advanced", tag: "Auth Protocol" },
      { name: "SSO (Auth0)", level: "Advanced", tag: "Enterprise" },
      { name: "JWT Architecture", level: "Expert", tag: "Tokens" },
      { name: "Jest & Jest-Cucumber (BDD)", level: "Advanced", highlight: true, tag: "Testing" },
      { name: "n8n Automation", level: "Advanced", tag: "Productivity" },
    ],
  },
];
