type ViewMode = "board" | "grid" | "timeline";
type TagType = "frontend" | "bug" | "infrastructure" | "design" | "api";
type ColumnTone = "neutral" | "active" | "review" | "done";

interface KanbanCard {
  id: string;
  title: string;
  description: string;
  tag: string;
  tagType: TagType;
  assignees: string[];
  meta: string;
  metaType?: "date" | "tasks" | "pr" | "done";
  progress?: number;
  active?: boolean;
  completed?: boolean;
}

interface KanbanColumn {
  id: string;
  title: string;
  tone: ColumnTone;
  cards: KanbanCard[];
}

export type { ViewMode, TagType, ColumnTone, KanbanCard, KanbanColumn };
