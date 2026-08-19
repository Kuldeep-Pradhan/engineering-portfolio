export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  summary: string;
  achievements: string[];
  technologies: string[];
  recognitions?: string[];
  isCurrent?: boolean;
}

export const experienceData: ExperienceItem[] = [
  {
    id: "iserveu",
    role: "Software Engineer - II",
    company: "iServeu Technology",
    location: "Bhubaneswar, Odisha, India",
    period: "June 2023 – Aug 2026",
    type: "Full-Time",
    isCurrent: true,
    summary:
      "Core backend and full-stack contributor designing high-throughput fintech microservices, banking partner integrations, and merchant operations dashboards.",
    achievements: [
      "Engineered high-concurrency Node.js/Express microservices on GCP Kubernetes handling 2,500+ TPS peak banking transaction volume.",
      "Built 2 greenfield React.js/TypeScript applications from scratch and scaled merchant dashboards serving 300K+ users per banking partner.",
      "Architected end-to-end KYC verification state machines (Aadhaar, PAN, Biometric, Liveness) for major banking partners including Kotak, NSDL, and CSC.",
      "Designed high-availability RBI-compliant OTP/TOTP 2FA microservices; replaced Cassandra state-storage with stateless HMAC tokens to eliminate database I/O and cut latency by ~60%.",
      "Constructed a centralized Notification Dashboard integrating Novu SDK and GCP Pub/Sub for multi-channel SMS/Email/Push alerts, cutting template updates by ~40%.",
      "Developed hierarchical mATM device mapping REST APIs for banking correspondents, tracking 5,000+ active devices with Firebase real-time alerts.",
      "Managed CI/CD pipelines via Jenkins/Docker, authored BDD test suites with Jest-Cucumber, and mentored a pod of 4 junior engineers.",
    ],
    technologies: [
      "Node.js",
      "Express.js",
      "React.js",
      "TypeScript",
      "GCP Kubernetes",
      "GCP Pub/Sub",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "Docker",
      "Jenkins",
      "Jest-Cucumber",
    ],
    recognitions: [
      "Awarded Batch Topper in iServeu React/Next.js Training Program for building a full-featured SSR application.",
    ],
  },
  {
    id: "magtapp",
    role: "MERN Stack Developer",
    company: "MAGTAPP Technology",
    location: "Bhubaneswar, Odisha, India",
    period: "July 2022 – May 2023",
    type: "Full-Time",
    summary:
      "Developed web frontends and cloud-backed ad-serving microservices across the M Plus digital content platform.",
    achievements: [
      "Developed responsive web interfaces using React.js, Next.js, Tailwind CSS, and Material UI.",
      "Built backend REST and gRPC microservice APIs in Node.js and Express.js.",
      "Integrated AWS Lambda, EC2, S3, and DynamoDB for media file storage and high-availability ad-serving workflows.",
      "Conducted peer code reviews, optimized database queries, and debugged production issues to maintain high service uptime.",
    ],
    technologies: [
      "React.js",
      "Next.js",
      "Node.js",
      "Express.js",
      "AWS Lambda",
      "AWS S3",
      "DynamoDB",
      "Tailwind CSS",
      "gRPC",
    ],
    recognitions: [
      "Awarded Employee of the Month twice (January 2023 & February 2023) for outstanding productivity and delivery.",
    ],
  },
  {
    id: "infosys",
    role: "Operation Executive – Trainee",
    company: "INFOSYS Limited",
    location: "Mysore, Karnataka, India",
    period: "February 2022 – July 2022",
    type: "Full-Time",
    summary:
      "Completed rigorous enterprise engineering training in core Java, database management, and Spring Boot web services.",
    achievements: [
      "Completed comprehensive Java 11 & Spring Boot full-stack development curriculum.",
      "Engineered Ekart e-commerce software module for customer and product inventory data management.",
      "Mastered clean coding practices, object-oriented design, and SQL relational schema design.",
    ],
    technologies: ["Java 11", "Spring Boot", "MySQL", "REST APIs", "Git"],
  },
];

export const educationData = [
  {
    degree: "B.Sc, Information Technology Management",
    institution: "Ravenshaw University",
    location: "Cuttack, Odisha",
    period: "07/2016 – 10/2020",
    highlights: ["Information Systems", "Data Structures & Algorithms", "Database Management"],
  },
  {
    degree: "FDE Certification",
    institution: "In Progress",
    location: "Online",
    period: "Currently Learning",
    highlights: ["Awaiting Certificate Delivery"],
  },
  {
    degree: "React & Next.js Advanced Engineering",
    institution: "iServeu In-House Academy",
    location: "Bhubaneswar, Odisha",
    period: "Awarded Batch Topper",
    highlights: ["Top Score in Cohort", "Server-Side Rendering & Next.js Architecture"],
  },
];
