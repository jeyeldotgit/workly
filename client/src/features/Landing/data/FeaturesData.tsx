import type { Feature } from "../types/types";

export const FEATURES: Feature[] = [
  {
    icon: "keyboard_command_key",
    iconColor: "text-primary",
    title: "Global Command Palette",
    description:
      "Access any feature, create tasks, or navigate projects with a single keystroke. Never touch your mouse again.",
    badge: (
      <div className="mt-4 flex gap-2">
        <span className="font-mono-code text-mono-code bg-surface-container-highest px-2 py-0.5 rounded text-on-surface-variant border border-outline-variant/30">
          ctrl⌘
        </span>
        <span className="font-mono-code text-mono-code bg-surface-container-highest px-2 py-0.5 rounded text-on-surface-variant border border-outline-variant/30">
          +
        </span>
        <span className="font-mono-code text-mono-code bg-surface-container-highest px-2 py-0.5 rounded text-on-surface-variant border border-outline-variant/30">
          K
        </span>
      </div>
    ),
  },
  {
    icon: "smart_toy",
    iconColor: "text-secondary",
    title: "Smart NLP Parser",
    description:
      'Type naturally. "Meeting with Sarah tomorrow at 3pm #urgent" automatically creates, tags, prioritizes, and schedules the task.',
    badge: (
      <div className="mt-4 bg-surface-container p-2 rounded border border-outline-variant/20 font-label-sm text-label-sm flex items-center gap-2">
        <span className="text-on-surface">Deploy API</span>
        <span className="bg-primary/20 text-primary px-1.5 py-0.5 rounded">
          tomorrow
        </span>
      </div>
    ),
  },
  {
    icon: "sync_alt",
    iconColor: "text-tertiary",
    title: "Real-time CRDT Sync",
    description:
      "Work entirely offline. Our local-first architecture uses CRDTs to ensure conflict-free merges the moment you reconnect.",
    badge: (
      <div className="mt-4 flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
        <span>Latency</span>
        <span className="text-secondary font-mono-code">&lt; 1ms local</span>
      </div>
    ),
  },
];
