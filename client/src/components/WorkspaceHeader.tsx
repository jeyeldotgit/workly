import { Sparkles } from "lucide-react";

interface WorkspaceHeaderProps {
  workspaceName: string;
  tab: string;
  tabDescription: string;
}

export default function WorkspaceHeader({
  workspaceName,
  tab,
  tabDescription,
}: WorkspaceHeaderProps) {
  return (
    <div>
      <div className="mb-2 inline-flex items-center gap-2 rounded-md border border-[#252932] bg-[#141b2b] px-2.5 py-1 text-[11px] font-medium text-[#b0c6ff]">
        <Sparkles className="h-3.5 w-3.5 text-[#6366F1]" />
        {workspaceName} workspace
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-[#e2e2e8] sm:text-3xl">
        {tab}
      </h1>
      <p className="mt-1 text-xs text-[#8c90a0] sm:text-sm">{tabDescription}</p>
    </div>
  );
}
