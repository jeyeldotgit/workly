import type { KanbanColumn } from "../types/types";

interface SummaryCardProps {
  kanbanColumns: KanbanColumn[];
  totalCards: number;
  inProgress: number;
}

export default function SummaryCard({
  kanbanColumns,
  totalCards,
  inProgress,
}: SummaryCardProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <div className="rounded-lg border border-[#252932] bg-[#111827] px-4 py-3">
        <p className="text-[11px] font-medium uppercase tracking-wider text-[#8c90a0]">
          Active cards
        </p>
        <p className="mt-1 text-2xl font-bold text-[#e2e2e8]">{totalCards}</p>
      </div>
      <div className="rounded-lg border border-[#252932] bg-[#111827] px-4 py-3">
        <p className="text-[11px] font-medium uppercase tracking-wider text-[#8c90a0]">
          In progress
        </p>
        <p className="mt-1 text-2xl font-bold text-[#b0c6ff]">{inProgress}</p>
      </div>
      <div className="rounded-lg border border-[#252932] bg-[#111827] px-4 py-3">
        <p className="text-[11px] font-medium uppercase tracking-wider text-[#8c90a0]">
          Review queue
        </p>
        <p className="mt-1 text-2xl font-bold text-amber-300">
          {kanbanColumns.find((column) => column.id === "review")?.cards
            .length ?? 0}
        </p>
      </div>
    </div>
  );
}
