import { Calendar, CheckCircle2, ListChecks } from "lucide-react";
import type { KanbanCard } from "../types/types";

export default function KanbanMeta({ card }: { card: KanbanCard }) {
  if (card.metaType === "done") {
    return (
      <span className="flex items-center gap-1 text-[#4edea3]">
        <CheckCircle2 className="w-3.5 h-3.5" />
        {card.meta}
      </span>
    );
  }

  if (card.metaType === "date") {
    return (
      <span className="flex items-center gap-1 text-amber-300">
        <Calendar className="w-3.5 h-3.5" />
        {card.meta}
      </span>
    );
  }

  if (card.metaType === "pr") {
    return <span className="text-[#b0c6ff]">{card.meta}</span>;
  }

  return (
    <span className="flex items-center gap-1 text-[#8c90a0]">
      <ListChecks className="w-3.5 h-3.5" />
      {card.meta}
    </span>
  );
}
