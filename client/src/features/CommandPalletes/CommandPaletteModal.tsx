import React, { useState, useEffect } from "react";
import { Command } from "cmdk";

export const GlobalCommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false);

  // Toggle on Cmd+K / Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <style>{`
        /* Styles for cmdk integration */
        .kbd-badge {
          font-family: var(--font-code-sm, 'JetBrains Mono', monospace);
          font-size: 11px;
          line-height: 14px;
          background-color: #34343d;
          color: #c7c4d7;
          padding: 2px 6px;
          border-radius: 4px;
          border: 1px solid #464554;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 -1px 0 rgba(0,0,0,0.5);
        }
        .modal-shadow {
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
        }
        .inner-glow {
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }

        /* Target selected item rendered by cmdk */
        [cmdk-item][data-selected='true'] {
          background-color: rgba(128, 131, 255, 0.1);
          color: #c0c1ff;
          border-color: #c0c1ff;
        }
        [cmdk-item][data-selected='true'] .item-icon {
          color: #c0c1ff;
        }
        [cmdk-item][data-selected='true'] .kbd-badge {
          background-color: #13131b;
          border-color: rgba(70, 69, 84, 0.3);
          color: #c0c1ff;
        }

        /* Group Heading styling */
        [cmdk-group-heading] {
          padding: 12px 8px 4px 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #c7c4d7;
        }
      `}</style>

      {/* Command.Dialog provides Backdrop + Focus Trap + ESC to close + ARIA standards automatically */}
      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Global Command Palette"
        container={document.body}
        className="fixed inset-0 z-50 flex items-start justify-center pt-[153px] p-4 bg-background/50 backdrop-blur-sm"
      >
        <div className="w-full max-w-[640px] bg-surface-container rounded-xl border border-outline-variant modal-shadow inner-glow flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Input Header */}
          <div className="flex items-center px-4 h-14 border-b border-outline-variant shrink-0 bg-surface focus-within:ring-2 ring-primary ring-inset transition-shadow relative">
            <span
              aria-hidden="true"
              className="material-symbols-outlined text-on-surface-variant mr-3 text-[20px]"
            >
              search
            </span>
            <Command.Input
              placeholder="Type a command or search workspace..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-on-surface font-body-base text-body-base placeholder:text-on-surface-variant/50 outline-none h-full"
            />
            <div className="ml-3 shrink-0">
              <kbd className="kbd-badge">ESC</kbd>
            </div>
          </div>

          {/* List Container */}
          <Command.List className="overflow-y-auto max-h-[614px] py-2 flex flex-col gap-1 px-2">
            <Command.Empty className="px-4 py-8 text-center text-on-surface-variant font-body-sm">
              No matching commands found.
            </Command.Empty>

            {/* Actions Group */}
            <Command.Group heading="Actions">
              <Command.Item
                onSelect={() => {
                  console.log("Create Task");
                  setOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-on-surface hover:bg-surface-variant cursor-pointer transition-colors outline-none border border-transparent"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px] item-icon">
                    add_circle
                  </span>
                  <span className="font-body-sm text-body-sm font-medium">
                    Create new task
                  </span>
                </div>
                <div className="flex gap-1">
                  <kbd className="kbd-badge">Cmd</kbd>
                  <kbd className="kbd-badge">N</kbd>
                </div>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  console.log("Breakdown AI");
                  setOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-on-surface hover:bg-surface-variant cursor-pointer transition-colors outline-none border border-transparent"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px] item-icon">
                    smart_toy
                  </span>
                  <span className="font-body-sm text-body-sm">
                    Breakdown complex goal with AI
                  </span>
                </div>
                <div className="flex gap-1">
                  <kbd className="kbd-badge">/breakdown</kbd>
                </div>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  console.log("Filter Tag");
                  setOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-on-surface hover:bg-surface-variant cursor-pointer transition-colors outline-none border border-transparent"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px] item-icon">
                    label
                  </span>
                  <span className="font-body-sm text-body-sm">
                    Filter tasks by tag
                  </span>
                </div>
                <div className="flex gap-1">
                  <kbd className="kbd-badge">Cmd</kbd>
                  <kbd className="kbd-badge">T</kbd>
                </div>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  console.log("Invite Team");
                  setOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-on-surface hover:bg-surface-variant cursor-pointer transition-colors outline-none border border-transparent"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px] item-icon">
                    person_add
                  </span>
                  <span className="font-body-sm text-body-sm">
                    Invite team member to workspace
                  </span>
                </div>
                <div className="flex gap-1">
                  <kbd className="kbd-badge">Cmd</kbd>
                  <kbd className="kbd-badge">I</kbd>
                </div>
              </Command.Item>
            </Command.Group>

            <Command.Separator className="h-px bg-outline-variant/30 my-2 mx-2" />

            {/* Recent Tasks Group */}
            <Command.Group heading="Recent Tasks">
              <Command.Item
                onSelect={() => {
                  console.log("Task selected");
                  setOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-on-surface hover:bg-surface-variant cursor-pointer transition-colors outline-none border border-transparent"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px] item-icon">
                    check_box_outline_blank
                  </span>
                  <span className="font-body-sm text-body-sm truncate pr-4">
                    Refactor authentication middleware
                  </span>
                </div>
                <span className="px-1.5 py-0.5 rounded bg-secondary/10 text-secondary font-code-sm text-code-sm shrink-0">
                  #backend
                </span>
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  console.log("Done task selected");
                  setOpen(false);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-on-surface hover:bg-surface-variant cursor-pointer transition-colors outline-none border border-transparent"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="material-symbols-outlined text-primary text-[18px]">
                    check_box
                  </span>
                  <span className="font-body-sm text-body-sm line-through text-on-surface-variant truncate pr-4">
                    Deploy WebSocket sync cluster
                  </span>
                </div>
                <span className="font-code-sm text-code-sm text-on-surface-variant shrink-0">
                  Done
                </span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          {/* Footer */}
          <div className="border-t border-outline-variant h-10 px-4 bg-surface-container-lowest flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4 text-on-surface-variant font-code-sm text-code-sm">
              <div className="flex items-center gap-1.5">
                <kbd className="kbd-badge !text-[10px] !px-1">↑</kbd>
                <kbd className="kbd-badge !text-[10px] !px-1">↓</kbd>
                <span>to navigate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="kbd-badge !text-[10px] !px-1">↵</kbd>
                <span>to select</span>
              </div>
              <div className="flex items-center gap-1.5">
                <kbd className="kbd-badge !text-[10px] !px-1">ESC</kbd>
                <span>to dismiss</span>
              </div>
            </div>
            <div className="font-headline-md text-headline-md text-primary font-bold opacity-50 text-[14px]">
              Workly
            </div>
          </div>
        </div>
      </Command.Dialog>
    </>
  );
};
