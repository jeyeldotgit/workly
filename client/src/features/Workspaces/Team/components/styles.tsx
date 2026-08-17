import { Crown, Shield, UserCheck } from "lucide-react";
import type { TeamMember } from "../types/types";

const ROLE_STYLES: Record<
  TeamMember["role"],
  { icon: typeof Shield; className: string }
> = {
  Admin: {
    icon: Crown,
    className: "border-[#6366F1]/20 bg-[#6366F1]/10 text-[#b0c6ff]",
  },
  Member: {
    icon: UserCheck,
    className: "border-[#4edea3]/20 bg-[#4edea3]/10 text-[#4edea3]",
  },
  Guest: {
    icon: Shield,
    className: "border-[#424654] bg-[#1a1c20] text-[#8c90a0]",
  },
};

const STATUS_STYLES: Record<
  TeamMember["status"],
  { label: string; dot: string; text: string }
> = {
  online: {
    label: "Online",
    dot: "bg-[#4edea3] shadow-[0_0_8px_rgba(78,222,163,0.55)]",
    text: "text-[#4edea3]",
  },
  away: {
    label: "Away",
    dot: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.35)]",
    text: "text-amber-300",
  },
  offline: {
    label: "Offline",
    dot: "bg-[#424654]",
    text: "text-[#8c90a0]",
  },
};

export { ROLE_STYLES, STATUS_STYLES };
