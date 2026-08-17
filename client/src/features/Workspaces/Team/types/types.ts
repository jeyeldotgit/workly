interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Member" | "Guest";
  status: "online" | "offline" | "away";
  lastActive: string;
  department: string;
  assignedWork: number;
  avatarUrl?: string;
  initials: string;
}

export type { TeamMember };
