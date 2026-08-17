import type { ColumnTone, TagType } from "../types/types";

const TAG_STYLES: Record<TagType, string> = {
  frontend: "text-[#b0c6ff] bg-[#6366F1]/10 border-[#6366F1]/20",
  bug: "text-rose-300 bg-rose-500/10 border-rose-500/20",
  infrastructure: "text-cyan-200 bg-cyan-500/10 border-cyan-500/20",
  design: "text-fuchsia-200 bg-fuchsia-500/10 border-fuchsia-500/20",
  api: "text-[#4edea3] bg-[#4edea3]/10 border-[#4edea3]/20",
};

const COLUMN_TONES: Record<ColumnTone, string> = {
  neutral: "bg-[#8c90a0]",
  active: "bg-[#6366F1] shadow-[0_0_12px_rgba(99,102,241,0.55)]",
  review: "bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.35)]",
  done: "bg-[#4edea3]",
};

export { TAG_STYLES, COLUMN_TONES };
