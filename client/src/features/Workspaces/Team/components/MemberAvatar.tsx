import type { TeamMember } from "../types/types";
import { STATUS_STYLES } from "./styles";

export default function MemberAvatar({ member }: { member: TeamMember }) {
  const status = STATUS_STYLES[member.status];

  return (
    <div className="relative h-10 w-10 shrink-0">
      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#252932] bg-[#1a1c20] text-xs font-bold text-[#c2c6d7]">
        {member.avatarUrl ? (
          <img
            src={member.avatarUrl}
            alt={member.name}
            className="h-full w-full object-cover"
          />
        ) : (
          member.initials
        )}
      </div>
      <span
        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#111827] ${status.dot}`}
      />
    </div>
  );
}
