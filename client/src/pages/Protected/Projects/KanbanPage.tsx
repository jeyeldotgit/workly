import { useState } from "react";
import {
  Calendar,
  CircleDot,
  Filter,
  Grid3X3,
  Kanban,
  Plus,
  Search,
  SlidersHorizontal,
  Timeline,
} from "lucide-react";
import type { ViewMode } from "../../../features/Workspaces/Kanban/types/types";
import { KANBAN_COLUMNS } from "../../../features/Workspaces/Kanban/data/data";

import WorkspaceHeader from "../../../components/WorkspaceHeader";
import SummaryCard from "../../../features/Workspaces/Kanban/components/SummaryCard";
import KanbanBoard from "../../../features/Workspaces/Kanban/components/KanbanBoard";

/* ============================================================================
   CONFIG & CONSTANTS
   ============================================================================ */

const viewOptions: Array<{ id: ViewMode; label: string; icon: typeof Kanban }> =
  [
    { id: "board", label: "Board", icon: Kanban },
    { id: "grid", label: "Grid", icon: Grid3X3 },
    { id: "timeline", label: "Timeline", icon: Timeline },
  ];

/* ============================================================================
   MAIN COMPONENT
   ============================================================================ */

export default function KanbanPage() {
  // --------------------------------------------------------------------------
  // State & Data Calculations
  // --------------------------------------------------------------------------
  const [activeView, setActiveView] = useState<ViewMode>("board");

  const totalCards = KANBAN_COLUMNS.reduce(
    (sum, column) => sum + column.cards.length,
    0,
  );

  const inProgress =
    KANBAN_COLUMNS.find((column) => column.id === "progress")?.cards.length ??
    0;

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto flex w-full max-w-[1600px] min-h-0 flex-1 flex-col gap-6">
        {/* ===================================================================
            1. PAGE HEADER & TOOLBAR
           =================================================================== */}
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          {/* Workspace Title & Badge */}
          <WorkspaceHeader
            workspaceName="Engineering"
            tab="Kanban Board"
            tabDescription="Plan active work, review handoffs, and track delivery across
              project lanes."
          />

          {/* Search, View Switcher & Action Controls */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            {/* Search Input */}
            <div className="relative w-full lg:w-[280px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8c90a0]" />
              <input
                type="text"
                placeholder="Search projects..."
                className="h-9 w-full rounded-md border border-[#252932] bg-[#111827] pl-9 pr-3 text-xs text-[#e2e2e8] outline-none transition-colors placeholder:text-[#424654] focus:border-[#6366F1]"
              />
            </div>

            {/* View & Action Buttons */}
            <div className="flex items-center gap-2">
              {/* View Mode Switcher */}
              <div className="inline-flex rounded-lg border border-[#252932] bg-[#141b2b] p-1">
                {viewOptions.map((option) => {
                  const Icon = option.icon;

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setActiveView(option.id)}
                      className={`flex h-8 items-center gap-2 rounded-md px-3 text-xs font-medium transition-colors ${
                        activeView === option.id
                          ? "bg-[#6366F1] text-white shadow-sm"
                          : "text-[#8c90a0] hover:bg-[#191f2f] hover:text-[#e2e2e8]"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">{option.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Filter Button */}
              <button
                type="button"
                aria-label="Filter projects"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-[#252932] bg-[#111827] text-[#8c90a0] transition-colors hover:border-[#6366F1]/50 hover:text-[#e2e2e8]"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </button>

              {/* Primary Action Button */}
              <button className="flex h-9 items-center gap-2 rounded-md bg-[#6366F1] px-4 text-xs font-medium text-white shadow-sm transition-colors hover:bg-indigo-500">
                <Plus className="h-4 w-4" />
                <span>New Project</span>
              </button>
            </div>
          </div>
        </div>

        {/* ===================================================================
            2. METRICS & SUMMARY CARDS
           =================================================================== */}
        <SummaryCard
          kanbanColumns={KANBAN_COLUMNS}
          totalCards={totalCards}
          inProgress={inProgress}
        />

        {/* ===================================================================
            3. ACTIVE FILTERS TOOLBAR
           =================================================================== */}
        <div className="flex flex-wrap items-center gap-2 rounded-lg border border-[#252932] bg-[#141b2b] p-2 text-xs">
          <button className="flex items-center gap-2 rounded-md border border-[#6366F1]/30 bg-[#6366F1]/10 px-3 py-1.5 text-[#b0c6ff] transition-colors hover:bg-[#6366F1]/20">
            <CircleDot className="h-3.5 w-3.5" />
            <span>In Progress</span>
          </button>
          <button className="flex items-center gap-2 rounded-md border border-[#252932] bg-[#191f2f] px-3 py-1.5 text-[#dce2f7] transition-colors hover:border-[#6366F1]">
            <Calendar className="h-3.5 w-3.5 text-[#8c90a0]" />
            <span>Due Date</span>
          </button>
          <button className="flex items-center gap-2 rounded-md border border-[#252932] bg-[#191f2f] px-3 py-1.5 text-[#dce2f7] transition-colors hover:border-[#6366F1]">
            <Kanban className="h-3.5 w-3.5 text-[#8c90a0]" />
            <span>Lane</span>
          </button>
          <div className="mx-1 hidden h-5 w-px bg-[#252932] sm:block" />
          <button className="ml-auto flex items-center gap-1.5 px-2 py-1.5 text-[#8c90a0] transition-colors hover:text-[#e2e2e8] sm:ml-0">
            <Filter className="h-3.5 w-3.5" />
            <span>Clear Filters</span>
          </button>
        </div>

        {/* ===================================================================
            4. KANBAN BOARD CANVAS
           =================================================================== */}
        <div className="relative min-h-[460px] flex-1 overflow-hidden rounded-lg border border-[#252932] bg-[#0d121d]">
          {/* Scroll indicators / Fading edge masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#0d121d] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#0d121d] to-transparent" />

          {/* Board Scroll Container */}
          <KanbanBoard kanbanColumn={KANBAN_COLUMNS} />
        </div>
      </div>
    </div>
  );
}
