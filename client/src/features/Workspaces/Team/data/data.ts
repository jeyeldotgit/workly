import type { TeamMember } from "../types/types";

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "1",
    name: "Sarah Chen",
    email: "sarah.c@acme.inc",
    role: "Admin",
    status: "online",
    lastActive: "Just now",
    department: "Platform",
    assignedWork: 8,
    initials: "SC",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCGwHWa6a5NDlLxvw1qV1ziADjsGzXTzKcR5_P1gUjKmwR9KbGG9O7Yr3MVYxOMFve-hunmMrW-fQoB_TYVI3H1ixrMV-vHIANSIp82hzwoNO1_8Y36JQh3kzXVG1QSjWRLvu2uGs0M6vTIDJl9UTIBfBl4Tc41P5a7tuDRO2zL-XcNV9AJYXNTKXgOV6ZzKlUEIk6plW1E-_n3KuUISlx28Fj0x7C_Cf36SRbrND1DewXkN0D1Yk-ipQ",
  },
  {
    id: "2",
    name: "Marcus Johnson",
    email: "mjohnson@acme.inc",
    role: "Member",
    status: "online",
    lastActive: "2 mins ago",
    department: "Product",
    assignedWork: 5,
    initials: "MJ",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAfKMVertAhYVmSeTeD0Is96cBg8QypNPD0C7NZW8JpuIvGp2Hboj7XfbW3xqiVQm5mY5hYnN8EimWzaBhLBYkGFcIz1gCzrhf3gg8BQQb0mzNhJYlBFbKOO3nbTP7sc5EE-dPbVgpxvIQ3GzeHC_AbHsrGINdkt_-kQS6JJgLGlBhSrXbc-aMtsy3ZqiKdJMWgcWWfIxFcDMQjYVKkugtehlMy6e5Me-8Idf-kp4k5ZSfTbnLsBzGUfw",
  },
  {
    id: "3",
    name: "Elena Rodriguez",
    email: "elena@contractor.co",
    role: "Guest",
    status: "offline",
    lastActive: "14 hours ago",
    department: "Design",
    assignedWork: 2,
    initials: "ER",
  },
  {
    id: "4",
    name: "Alex Lee",
    email: "alex.lee@acme.inc",
    role: "Member",
    status: "away",
    lastActive: "24 mins ago",
    department: "Infrastructure",
    assignedWork: 7,
    initials: "AL",
  },
  {
    id: "5",
    name: "Jordan Smith",
    email: "jordan@partner.dev",
    role: "Guest",
    status: "online",
    lastActive: "6 mins ago",
    department: "QA",
    assignedWork: 3,
    initials: "JS",
  },
];

export { TEAM_MEMBERS };
