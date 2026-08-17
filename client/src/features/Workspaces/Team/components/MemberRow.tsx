import {
  Activity,
  CheckCircle2,
  Clock,
  Edit3,
  Mail,
  MoreHorizontal,
} from "lucide-react";
import MemberAvatar from "./MemberAvatar";
import { STATUS_STYLES } from "./styles";
import type { TeamMember } from "../types/types";
import RoleBadge from "./RoleBadge";

export default function MemberRow({ member }: { member: TeamMember }) {
  const status = STATUS_STYLES[member.status];

  return (
    <article className="group rounded-xl border border-[#252932] bg-[#111827] p-3.5 transition-all duration-200 hover:border-[#6366F1]/40 hover:bg-[#151c2e] hover:shadow-lg hover:shadow-[#6366F1]/5 sm:px-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-3.5">
          <MemberAvatar member={member} />
          <div className="min-w-0">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <h2 className="truncate text-sm font-semibold text-[#e2e2e8] group-hover:text-white">
                {member.name}
              </h2>
              <span
                className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[11px] font-medium ${status.text} bg-[#1a1c20]`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                {status.label}
              </span>
            </div>
            <div className="mt-1 flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#8c90a0]">
              <span className="flex min-w-0 items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 shrink-0" />
                <span className="truncate">{member.email}</span>
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-[#424654] sm:block" />
              <span>{member.department}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-[#252932]/80 pt-3 lg:shrink-0 lg:border-t-0 lg:pt-0">
          <RoleBadge role={member.role} />

          <span className="inline-flex items-center gap-1.5 rounded-md border border-[#252932] bg-[#1a1c20] px-2 py-1 font-mono text-[11px] text-[#8c90a0]">
            {member.status === "online" ? (
              <CheckCircle2 className="h-3.5 w-3.5 text-[#4edea3]" />
            ) : (
              <Clock className="h-3.5 w-3.5" />
            )}
            {member.lastActive}
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-md border border-[#252932] bg-[#1a1c20] px-2 py-1 text-[11px] font-medium text-[#c2c6d7]">
            <Activity className="h-3.5 w-3.5 text-[#6366F1]" />
            {member.assignedWork} active
          </span>

          <div className="ml-auto flex items-center gap-1 lg:ml-1">
            <button
              type="button"
              aria-label={`Edit ${member.name}`}
              className="flex h-8 w-8 items-center justify-center rounded-md text-[#8c90a0] opacity-100 transition-colors hover:bg-[#1a1c20] hover:text-[#e2e2e8] sm:opacity-0 sm:group-hover:opacity-100"
            >
              <Edit3 className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label={`Open actions for ${member.name}`}
              className="flex h-8 w-8 items-center justify-center rounded-md text-[#8c90a0] opacity-100 transition-colors hover:bg-[#1a1c20] hover:text-[#e2e2e8] sm:opacity-0 sm:group-hover:opacity-100"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
