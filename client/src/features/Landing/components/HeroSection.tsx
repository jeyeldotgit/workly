import React, { useState } from "react";

interface CommandAction {
  id: string;
  icon: string;
  label: string;
  iconColor?: string;
  shortcut?: string;
  active?: boolean;
}

const SUGGESTED_ACTIONS: CommandAction[] = [
  {
    id: "create-project",
    icon: "add_box",
    label: "Create new project 'Apollo'",
    iconColor: "text-primary",
    shortcut: "↵",
    active: true,
  },
  {
    id: "invite-team",
    icon: "group_add",
    label: "Invite team to 'Apollo'",
  },
  {
    id: "project-settings",
    icon: "settings",
    label: "Project Settings",
  },
];

export const HeroSection: React.FC = () => {
  const [searchValue, setSearchValue] = useState("> create project Apollo");
  const [selectedId, setSelectedId] = useState<string>("create-project");

  return (
    <section className="relative px-margin-page mx-auto max-w-7xl pt-16 pb-24 hero-gradient">
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto gap-8">
        <h1 className="font-display-lg text-display-lg text-on-surface tracking-tighter leading-tight">
          Manage workflow{" "}
          <span className="text-primary-container">with ease</span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
          Command-palette driven productivity meets real-time CRDT-backed
          collaboration. Stay in the flow, never lift your hands from the
          keyboard, and sync instantly with your team.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-4">
          <button className="bg-primary-container text-on-primary-container px-6 py-3 rounded-lg font-label-md text-label-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-2">
            Get Started
            <span className="font-mono-code text-mono-code opacity-70 ml-2">
              ⌘+Enter
            </span>
          </button>
          <button className="bg-transparent border border-outline-variant text-on-surface px-6 py-3 rounded-lg font-label-md text-label-md hover:bg-surface-container-high active:scale-95 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">
              play_circle
            </span>
            Watch Demo
          </button>
        </div>
      </div>

      {/* Command Palette Mockup */}
      <div className="mt-16 w-full max-w-2xl mx-auto rounded-xl border border-surface-container-highest bg-surface-container-low/80 backdrop-blur-md shadow-2xl overflow-hidden relative z-10">
        <div className="border-b border-surface-container-highest p-4 flex items-center gap-3">
          <span className="material-symbols-outlined text-on-surface-variant">
            search
          </span>
          <input
            className="bg-transparent border-none w-full text-on-surface font-body-lg text-body-lg focus:ring-0 placeholder:text-on-surface-variant/50 focus:outline-none"
            placeholder="Type a command or search..."
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <div className="p-2 flex flex-col gap-1">
          <div className="px-3 py-2 text-label-sm font-label-sm text-on-surface-variant uppercase tracking-wider">
            Suggested Actions
          </div>
          {SUGGESTED_ACTIONS.map((action) => {
            const isSelected = selectedId === action.id;
            return (
              <div
                key={action.id}
                onClick={() => setSelectedId(action.id)}
                className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-surface-container-highest text-on-surface"
                    : "text-on-surface-variant hover:bg-surface-container"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`material-symbols-outlined ${
                      action.iconColor ?? ""
                    }`}
                  >
                    {action.icon}
                  </span>
                  <span className="font-label-md text-label-md">
                    {action.label}
                  </span>
                </div>
                {action.shortcut && (
                  <span className="font-mono-code text-mono-code text-on-surface-variant bg-surface-container p-1 rounded">
                    {action.shortcut}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
