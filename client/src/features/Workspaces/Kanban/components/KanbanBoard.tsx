import { MoreHorizontal, Plus } from "lucide-react";
import { COLUMN_TONES } from "../styling/styling";
import type { KanbanColumn } from "../types/types";
import KanbanCardItem from "./KanbanCardItem";

interface KanbanBoardProps {
  kanbanColumn: KanbanColumn[];
}

export default function KanbanBoard({ kanbanColumn }: KanbanBoardProps) {
  return (
    <div className="h-full overflow-x-auto overflow-y-hidden p-4 [scrollbar-color:#424654_#111827] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#111827] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#424654] [&::-webkit-scrollbar-thumb:hover]:bg-[#6366F1] sm:p-5">
      <div className="flex h-full w-max items-start gap-4 pb-4">
        {kanbanColumn.map((column) => (
          <section
            key={column.id}
            className="flex h-full w-[300px] shrink-0 flex-col rounded-lg border border-[#252932] bg-[#111827]/60 p-3 sm:w-[340px]"
          >
            {/* Column Header */}
            <div className="mb-3 flex items-center justify-between px-1">
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className={`h-2 w-2 rounded-full ${COLUMN_TONES[column.tone]}`}
                />
                <h2 className="truncate text-sm font-semibold text-[#e2e2e8]">
                  {column.title}
                </h2>
                <span className="rounded-md border border-[#252932] bg-[#1a1c20] px-2 py-0.5 font-mono text-[11px] text-[#8c90a0]">
                  {column.cards.length}
                </span>
              </div>
              <button
                type="button"
                aria-label={`${column.title} column actions`}
                className="rounded-md p-1 text-[#8c90a0] transition-colors hover:bg-[#1a1c20] hover:text-[#e2e2e8]"
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
            </div>

            {/* Column Cards & Add Button */}
            <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1 [scrollbar-color:#424654_#111827] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#111827] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#424654] [&::-webkit-scrollbar-thumb:hover]:bg-[#6366F1]">
              {column.cards.map((card) => (
                <KanbanCardItem key={card.id} card={card} />
              ))}

              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#424654] bg-[#0d121d] py-2.5 text-xs font-medium text-[#8c90a0] transition-colors hover:border-[#6366F1] hover:bg-[#151c2e] hover:text-[#e2e2e8]"
              >
                <Plus className="h-3.5 w-3.5" />
                Add Card
              </button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
