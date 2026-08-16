import { useState } from 'react';
import {
  Calendar,
  CheckCircle2,
  CircleDot,
  Filter,
  Grid3X3,
  Kanban,
  ListChecks,
  MoreHorizontal,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
  Timeline,
} from 'lucide-react';
import DashboardLayout from '../../../layouts/DashboardLayout';

type ViewMode = 'board' | 'grid' | 'timeline';
type TagType = 'frontend' | 'bug' | 'infrastructure' | 'design' | 'api';
type ColumnTone = 'neutral' | 'active' | 'review' | 'done';

interface ProjectCard {
  id: string;
  title: string;
  description: string;
  tag: string;
  tagType: TagType;
  assignees: string[];
  meta: string;
  metaType?: 'date' | 'tasks' | 'pr' | 'done';
  progress?: number;
  active?: boolean;
  completed?: boolean;
}

interface ProjectColumn {
  id: string;
  title: string;
  tone: ColumnTone;
  cards: ProjectCard[];
}

const TAG_STYLES: Record<TagType, string> = {
  frontend: 'text-[#b0c6ff] bg-[#6366F1]/10 border-[#6366F1]/20',
  bug: 'text-rose-300 bg-rose-500/10 border-rose-500/20',
  infrastructure: 'text-cyan-200 bg-cyan-500/10 border-cyan-500/20',
  design: 'text-fuchsia-200 bg-fuchsia-500/10 border-fuchsia-500/20',
  api: 'text-[#4edea3] bg-[#4edea3]/10 border-[#4edea3]/20',
};

const COLUMN_TONES: Record<ColumnTone, string> = {
  neutral: 'bg-[#8c90a0]',
  active: 'bg-[#6366F1] shadow-[0_0_12px_rgba(99,102,241,0.55)]',
  review: 'bg-amber-400 shadow-[0_0_12px_rgba(251,191,36,0.35)]',
  done: 'bg-[#4edea3]',
};

const PROJECT_COLUMNS: ProjectColumn[] = [
  {
    id: 'todo',
    title: 'To Do',
    tone: 'neutral',
    cards: [
      {
        id: 'auth-flow',
        title: 'Implement Authentication Flow',
        description: 'Wire up OAuth providers and establish session management using the new JWT strategy.',
        tag: 'Frontend',
        tagType: 'frontend',
        assignees: ['SJ'],
        meta: '0/5',
        metaType: 'tasks',
      },
      {
        id: 'nav-hydration',
        title: 'Fix Navigation State Hydration',
        description: 'Active state styling is dropping on hard reload for nested child routes.',
        tag: 'Bug',
        tagType: 'bug',
        assignees: ['UN'],
        meta: 'Oct 12',
        metaType: 'date',
      },
      {
        id: 'schema-cleanup',
        title: 'Normalize Workspace Schema',
        description: 'Consolidate project ownership fields before workspace analytics ships.',
        tag: 'API',
        tagType: 'api',
        assignees: ['MD'],
        meta: '2/7',
        metaType: 'tasks',
      },
    ],
  },
  {
    id: 'progress',
    title: 'In Progress',
    tone: 'active',
    cards: [
      {
        id: 'db-cluster',
        title: 'Migrate Database Cluster',
        description: 'Scale Postgres instances and optimize indexing for dashboard queries.',
        tag: 'Infrastructure',
        tagType: 'infrastructure',
        assignees: ['MD', 'AL'],
        meta: '8/12',
        metaType: 'tasks',
        progress: 65,
        active: true,
      },
      {
        id: 'design-tokens',
        title: 'Design System Token Update',
        description: 'Align semantic color tokens with the new product shell and dark surfaces.',
        tag: 'Design',
        tagType: 'design',
        assignees: ['JS'],
        meta: 'Oct 18',
        metaType: 'date',
        progress: 42,
      },
      {
        id: 'usage-events',
        title: 'Track Usage Events',
        description: 'Emit project, task, and command palette events for workspace insights.',
        tag: 'API',
        tagType: 'api',
        assignees: ['RK'],
        meta: '4/9',
        metaType: 'tasks',
        progress: 38,
      },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    tone: 'review',
    cards: [
      {
        id: 'stripe-webhook',
        title: 'Stripe Webhook Integration',
        description: 'Handle subscription lifecycle events and update local user states.',
        tag: 'API',
        tagType: 'api',
        assignees: ['SJ'],
        meta: 'PR #1042',
        metaType: 'pr',
      },
      {
        id: 'canvas-memory',
        title: 'Canvas Memory Patch',
        description: 'Confirm cleanup behavior after the render loop fix lands in staging.',
        tag: 'Bug',
        tagType: 'bug',
        assignees: ['AL'],
        meta: 'PR #1047',
        metaType: 'pr',
      },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    tone: 'done',
    cards: [
      {
        id: 'monorepo',
        title: 'Setup Monorepo Structure',
        description: 'Create shared workspace boundaries and package-level scripts.',
        tag: 'Infrastructure',
        tagType: 'infrastructure',
        assignees: ['AL'],
        meta: 'Oct 01',
        metaType: 'done',
        completed: true,
      },
      {
        id: 'readme',
        title: 'Refresh API README',
        description: 'Document local environment variables and workspace bootstrap steps.',
        tag: 'API',
        tagType: 'api',
        assignees: ['SJ'],
        meta: 'Oct 04',
        metaType: 'done',
        completed: true,
      },
    ],
  },
];

const viewOptions: Array<{ id: ViewMode; label: string; icon: typeof Kanban }> = [
  { id: 'board', label: 'Board', icon: Kanban },
  { id: 'grid', label: 'Grid', icon: Grid3X3 },
  { id: 'timeline', label: 'Timeline', icon: Timeline },
];

function ProjectMeta({ card }: { card: ProjectCard }) {
  if (card.metaType === 'done') {
    return (
      <span className="flex items-center gap-1 text-[#4edea3]">
        <CheckCircle2 className="w-3.5 h-3.5" />
        {card.meta}
      </span>
    );
  }

  if (card.metaType === 'date') {
    return (
      <span className="flex items-center gap-1 text-amber-300">
        <Calendar className="w-3.5 h-3.5" />
        {card.meta}
      </span>
    );
  }

  if (card.metaType === 'pr') {
    return <span className="text-[#b0c6ff]">{card.meta}</span>;
  }

  return (
    <span className="flex items-center gap-1 text-[#8c90a0]">
      <ListChecks className="w-3.5 h-3.5" />
      {card.meta}
    </span>
  );
}

function ProjectCardItem({ card }: { card: ProjectCard }) {
  return (
    <article
      className={`group relative flex flex-col gap-3 rounded-lg border p-4 transition-all duration-200 ${
        card.completed
          ? 'border-[#252932]/60 bg-[#0d121d] opacity-70'
          : card.active
            ? 'border-[#6366F1]/50 bg-[#111827] shadow-lg shadow-[#6366F1]/10'
            : 'border-[#252932] bg-[#111827] hover:border-[#6366F1]/40 hover:bg-[#151c2e] hover:shadow-lg hover:shadow-[#6366F1]/5'
      }`}
    >
      {card.active ? <div className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-[#6366F1]" /> : null}

      <div className="flex items-start justify-between gap-3">
        <span className={`inline-flex w-fit items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${TAG_STYLES[card.tagType]}`}>
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
            card.completed ? 'text-[#8c90a0] line-through' : 'text-[#e2e2e8] group-hover:text-white'
          }`}
        >
          {card.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#8c90a0]">
          {card.description}
        </p>
      </div>

      {typeof card.progress === 'number' ? (
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
          <ProjectMeta card={card} />
        </div>
      </div>
    </article>
  );
}

export default function ProjectsCanvasPage() {
  const [activeView, setActiveView] = useState<ViewMode>('board');
  const totalCards = PROJECT_COLUMNS.reduce((sum, column) => sum + column.cards.length, 0);
  const inProgress = PROJECT_COLUMNS.find((column) => column.id === 'progress')?.cards.length ?? 0;

  return (
    <DashboardLayout>
      <div className="flex min-h-0 flex-1 flex-col gap-6 p-4 sm:p-6 lg:p-8">
        <div className="mx-auto flex w-full max-w-[1600px] min-h-0 flex-1 flex-col gap-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-md border border-[#252932] bg-[#141b2b] px-2.5 py-1 text-[11px] font-medium text-[#b0c6ff]">
                <Sparkles className="h-3.5 w-3.5 text-[#6366F1]" />
                Engineering workspace
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-[#e2e2e8] sm:text-3xl">
                Projects Canvas
              </h1>
              <p className="mt-1 text-xs text-[#8c90a0] sm:text-sm">
                Plan active work, review handoffs, and track delivery across project lanes.
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative w-full lg:w-[280px]">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8c90a0]" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="h-9 w-full rounded-md border border-[#252932] bg-[#111827] pl-9 pr-3 text-xs text-[#e2e2e8] outline-none transition-colors placeholder:text-[#424654] focus:border-[#6366F1]"
                />
              </div>

              <div className="flex items-center gap-2">
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
                            ? 'bg-[#6366F1] text-white shadow-sm'
                            : 'text-[#8c90a0] hover:bg-[#191f2f] hover:text-[#e2e2e8]'
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">{option.label}</span>
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  aria-label="Filter projects"
                  className="flex h-9 w-9 items-center justify-center rounded-md border border-[#252932] bg-[#111827] text-[#8c90a0] transition-colors hover:border-[#6366F1]/50 hover:text-[#e2e2e8]"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                </button>

                <button className="flex h-9 items-center gap-2 rounded-md bg-[#6366F1] px-4 text-xs font-medium text-white shadow-sm transition-colors hover:bg-indigo-500">
                  <Plus className="h-4 w-4" />
                  <span>New Project</span>
                </button>
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-[#252932] bg-[#111827] px-4 py-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-[#8c90a0]">Active cards</p>
              <p className="mt-1 text-2xl font-bold text-[#e2e2e8]">{totalCards}</p>
            </div>
            <div className="rounded-lg border border-[#252932] bg-[#111827] px-4 py-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-[#8c90a0]">In progress</p>
              <p className="mt-1 text-2xl font-bold text-[#b0c6ff]">{inProgress}</p>
            </div>
            <div className="rounded-lg border border-[#252932] bg-[#111827] px-4 py-3">
              <p className="text-[11px] font-medium uppercase tracking-wider text-[#8c90a0]">Review queue</p>
              <p className="mt-1 text-2xl font-bold text-amber-300">
                {PROJECT_COLUMNS.find((column) => column.id === 'review')?.cards.length ?? 0}
              </p>
            </div>
          </div>

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

          <div className="relative min-h-[460px] flex-1 overflow-hidden rounded-lg border border-[#252932] bg-[#0d121d]">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#0d121d] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#0d121d] to-transparent" />

            <div className="h-full overflow-x-auto overflow-y-hidden p-4 [scrollbar-color:#424654_#111827] [scrollbar-width:thin] [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#111827] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#424654] [&::-webkit-scrollbar-thumb:hover]:bg-[#6366F1] sm:p-5">
              <div className="flex h-full w-max items-start gap-4 pb-4">
                {PROJECT_COLUMNS.map((column) => (
                  <section
                    key={column.id}
                    className="flex h-full w-[300px] shrink-0 flex-col rounded-lg border border-[#252932] bg-[#111827]/60 p-3 sm:w-[340px]"
                  >
                    <div className="mb-3 flex items-center justify-between px-1">
                      <div className="flex min-w-0 items-center gap-2">
                        <span className={`h-2 w-2 rounded-full ${COLUMN_TONES[column.tone]}`} />
                        <h2 className="truncate text-sm font-semibold text-[#e2e2e8]">{column.title}</h2>
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

                    <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto pr-1 [scrollbar-color:#424654_#111827] [scrollbar-width:thin] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-[#111827] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#424654] [&::-webkit-scrollbar-thumb:hover]:bg-[#6366F1]">
                      {column.cards.map((card) => (
                        <ProjectCardItem key={card.id} card={card} />
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
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
