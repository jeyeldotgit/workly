import { ROLE_STYLES } from "./styles";
import type { TeamMember } from "../types/types";

export default function RoleBadge({ role }: { role: TeamMember["role"] }) {
  const roleStyle = ROLE_STYLES[role];
  const Icon = roleStyle.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[11px] font-semibold ${roleStyle.className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {role}
    </span>
  );
}
