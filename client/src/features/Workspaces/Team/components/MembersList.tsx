import { Users } from "lucide-react";
import MemberRow from "./MemberRow";
import type { TeamMember } from "../types/types";

interface MembersListProps {
  filteredMembers: TeamMember[];
}

export default function MembersList({ filteredMembers }: MembersListProps) {
  return (
    <div className="min-h-0 flex-1 overflow-hidden rounded-lg border border-[#252932] bg-[#0d121d] p-3 sm:p-4">
      <div className="flex h-full flex-col gap-2.5 overflow-y-auto pr-1 [scrollbar-color:#424654_#111827] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#111827] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#424654] [&::-webkit-scrollbar-thumb:hover]:bg-[#6366F1]">
        {/* Member Rows */}
        {filteredMembers.map((member) => (
          <MemberRow key={member.id} member={member} />
        ))}

        {/* Empty State */}
        {filteredMembers.length === 0 ? (
          <div className="flex min-h-[260px] flex-col items-center justify-center px-4 text-center">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg border border-[#252932] bg-[#111827] text-[#8c90a0]">
              <Users className="h-5 w-5" />
            </div>
            <p className="text-sm font-semibold text-[#e2e2e8]">
              No members found
            </p>
            <p className="mt-1 text-xs text-[#8c90a0]">
              Try a different name, email, or department.
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
