import { MoreHorizontal } from "lucide-react";
import type { KanbanCard } from "../types/types";
import KanbanMeta from "./KanbanMeta";
import { TAG_STYLES } from "../styling/styling";

export default function KanbanCardItem({ card }: { card: KanbanCard }) {
  return (
    <article
      className={`group relative flex flex-col gap-3 rounded-lg border p-4 transition-all duration-200 ${
        card.completed
          ? "border-[#252932]/60 bg-[#0d121d] opacity-70"
          : card.active
            ? "border-[#6366F1]/50 bg-[#111827] shadow-lg shadow-[#6366F1]/10"
            : "border-[#252932] bg-[#111827] hover:border-[#6366F1]/40 hover:bg-[#151c2e] hover:shadow-lg hover:shadow-[#6366F1]/5"
      }`}
    >
      {card.active ? (
        <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-[#6366F1]" />
      ) : null}

      <div className="flex items-start justify-between gap-3">
        <span
          className={`inline-flex w-fit items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${TAG_STYLES[card.tagType]}`}
        >
          {card.tag}
        </span>
        <button
          type="button"
          aria-label={`Open actions for ${card.title}`}
          className="rounded-md p-1 text-[#8c90a0] opacity-100 transition-colors hover:bg-[#1a1c20] hover:text-[#e2e2e8] sm:opacity-0 sm:group-hover:opacity-100"
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="min-w-0">
        <h3
          className={`text-sm font-semibold leading-5 ${
            card.completed
              ? "text-[#8c90a0] line-through"
              : "text-[#e2e2e8] group-hover:text-white"
          }`}
        >
          {card.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#8c90a0]">
          {card.description}
        </p>
      </div>

      {typeof card.progress === "number" ? (
        <div className="space-y-1">
          <div className="h-1.5 overflow-hidden rounded-full bg-[#252932]">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#6366F1] to-[#b0c6ff]"
              style={{ width: `${card.progress}%` }}
            />
          </div>
          <div className="flex justify-between text-[10px] font-medium text-[#8c90a0]">
            <span>Progress</span>
            <span>{card.progress}%</span>
          </div>
        </div>
      ) : null}

      <div className="mt-auto flex items-center justify-between border-t border-[#252932]/80 pt-3">
        <div className="flex -space-x-2">
          {card.assignees.map((assignee) => (
            <div
              key={assignee}
              className="flex h-6 w-6 items-center justify-center rounded-full border border-[#424654] bg-[#1a1c20] text-[10px] font-bold text-[#c2c6d7]"
              title={assignee}
            >
              {assignee}
            </div>
          ))}
        </div>
        <div className="font-mono text-[11px]">
          <KanbanMeta card={card} />
        </div>
      </div>
    </article>
  );
}
