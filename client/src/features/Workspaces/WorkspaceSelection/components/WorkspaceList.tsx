import { ChevronRight, FolderPlus, Layers, Check } from "lucide-react";
import type { Workspace } from "../types/types";

interface WorkspaceListProps {
  workspaces: Workspace[];
  selectedId: string | number | null;
  onSelectWorkspace: (workspace: Workspace) => void;
  onCreateWorkspace: () => void;
}

function WorkspaceList({ 
  workspaces, 
  selectedId, 
  onSelectWorkspace,
  onCreateWorkspace 
}: WorkspaceListProps) {
  // Empty State
  if (!workspaces || workspaces.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 rounded-xl border border-dashed border-[#252932] bg-[#161922]/40 text-center">
        <div className="w-10 h-10 rounded-full bg-[#558dff]/10 border border-[#558dff]/20 flex items-center justify-center mb-3">
          <Layers className="w-5 h-5 text-[#558dff]" />
        </div>
        <h3 className="text-xs font-semibold text-[#e2e2e8] mb-1">
          No workspaces found
        </h3>
        <p className="text-xs text-[#c2c6d7]/70 max-w-[210px] mb-4 leading-relaxed">
          You don't have any active workspaces yet. Create one to get started.
        </p>
        <button
          type="button"
          onClick={onCreateWorkspace}
          className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-[#e2e2e8] bg-[#252932] hover:bg-[#333539] hover:text-white rounded-lg border border-[#424654]/40 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#558dff]"
        >
          <FolderPlus className="w-4 h-4 text-[#558dff]" />
          <span>Create Workspace</span>
        </button>
      </div>
    );
  }

  // Active List State
  return (
    <div className="flex flex-col gap-1.5" role="listbox" aria-label="Workspaces">
      {workspaces.map((ws) => {
        const isSelected = selectedId === ws.id;

        return (
          <button
            key={ws.id}
            type="button"
            role="option"
            aria-selected={isSelected}
            onClick={() => onSelectWorkspace(ws)}
            className={`group w-full flex items-center justify-between p-2.5 rounded-lg border text-left cursor-pointer transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#558dff] ${
              isSelected
                ? 'border-[#558dff]/80 bg-[#558dff]/10 shadow-[0_0_20px_rgba(85,141,255,0.12)]'
                : 'border-[#252932] hover:border-[#424654] hover:bg-[#558dff]/5'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0">
              {/* Badge Avatar */}
              <div
                className={`w-9 h-9 rounded-md bg-gradient-to-br ${ws.gradient} flex items-center justify-center font-semibold text-xs ring-1 ring-white/15 shrink-0 shadow-sm ${ws.textColor}`}
              >
                {ws.badge}
              </div>

              {/* Name & Details */}
              <div className="flex flex-col truncate">
                <span className={`text-xs font-medium truncate transition-colors ${
                  isSelected ? 'text-white font-semibold' : 'text-[#e2e2e8] group-hover:text-[#558dff]'
                }`}>
                  {ws.name}
                </span>
                <span className="text-[11px] text-[#c2c6d7]/70 truncate mt-0.5">
                  {ws.detail}
                </span>
              </div>
            </div>

            {/* Right Action / Indicator */}
            <div className="flex items-center gap-2 pl-2 shrink-0">
              {isSelected ? (
                <div className="w-4 h-4 rounded-full bg-[#558dff]/20 text-[#558dff] flex items-center justify-center">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              ) : (
                <ChevronRight className="w-4 h-4 text-[#c2c6d7] opacity-40 group-hover:opacity-100 group-hover:text-[#558dff] transition-all group-hover:translate-x-0.5" />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

export default WorkspaceList;