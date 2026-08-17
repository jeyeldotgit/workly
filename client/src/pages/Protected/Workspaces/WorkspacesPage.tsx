import { Sparkles, Keyboard, UserPlus, Link as LinkIcon } from "lucide-react";

export default function WorkspacePage() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
      {/* Subtle Radial Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(#424654 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="w-full max-w-2xl relative z-10 flex flex-col items-center text-center space-y-8 my-auto">
        {/* Welcome Heading */}
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#b0c6ff]">
              Engineering
            </span>
          </h1>
          <p className="text-sm md:text-base text-[#c2c6d7] max-w-lg mx-auto">
            Your workspace is initialized. Local sync is active. You're ready to
            start building.
          </p>
        </div>

        {/* Primary Action Input */}
        <div className="w-full relative mt-4 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#6366F1] to-[#b0c6ff] rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-500" />
          <div className="relative bg-[#111827] border border-[#252932] rounded-xl shadow-2xl p-2 flex flex-col transition-all">
            <div className="flex items-center px-3 py-2">
              <Sparkles className="w-5 h-5 text-[#6366F1] mr-3 shrink-0" />
              <input
                autoFocus
                type="text"
                placeholder="Create a new task, document, or project..."
                className="w-full bg-transparent border-none text-white focus:outline-none text-sm placeholder-[#424654]"
              />
              <span className="font-mono text-[10px] border border-[#424654] bg-[#1a1c20] text-[#c2c6d7] rounded px-1.5 py-0.5 ml-2 shrink-0">
                ↵ Enter
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 pb-2 pt-1 mt-1 border-t border-[#252932]/50">
              <span className="text-[10px] font-semibold text-[#8c90a0] uppercase tracking-wider">
                Suggestions:
              </span>
              <button className="px-2 py-0.5 rounded bg-[#6366F1]/10 text-[#b0c6ff] border border-[#6366F1]/20 text-xs hover:bg-[#6366F1]/20 transition-colors cursor-pointer">
                <code className="font-mono text-[10px] text-[#6366F1] mr-1">
                  /bug
                </code>{" "}
                Frontend crash on load
              </button>
              <button className="px-2 py-0.5 rounded bg-[#333539] text-[#c2c6d7] border border-[#252932] text-xs hover:text-white transition-colors cursor-pointer">
                <code className="font-mono text-[10px] text-[#8c90a0] mr-1">
                  /doc
                </code>{" "}
                API Architecture
              </button>
            </div>
          </div>
        </div>

        {/* Bento Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="bg-[#111827]/60 backdrop-blur-md border border-[#252932] hover:border-[#6366F1]/40 rounded-xl p-5 text-left flex flex-col justify-between transition-colors group">
            <div>
              <div className="w-8 h-8 rounded-lg bg-[#333539] flex items-center justify-center mb-4 group-hover:bg-[#6366F1]/20 transition-colors">
                <Keyboard className="w-4 h-4 text-[#c2c6d7] group-hover:text-[#b0c6ff]" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">
                Quick Actions
              </h3>
              <p className="text-xs text-[#8c90a0]">
                Master the workspace with keyboard shortcuts.
              </p>
            </div>
            <ul className="mt-6 space-y-2 font-mono text-xs text-[#c2c6d7]">
              <li className="flex justify-between items-center py-1 border-b border-[#252932]">
                <span>Command Palette</span>
                <span className="border border-[#424654] bg-[#1a1c20] px-1.5 py-0.5 rounded text-[10px]">
                  ⌘K
                </span>
              </li>
              <li className="flex justify-between items-center py-1 border-b border-[#252932]">
                <span>New Pull Request</span>
                <span className="border border-[#424654] bg-[#1a1c20] px-1.5 py-0.5 rounded text-[10px]">
                  ⌘⇧P
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-[#111827]/60 backdrop-blur-md border border-[#252932] hover:border-[#6366F1]/40 rounded-xl p-5 text-left flex flex-col justify-between transition-colors group relative overflow-hidden">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-[#6366F1] rounded-full blur-[50px] opacity-10 group-hover:opacity-20 transition-opacity" />
            <div>
              <div className="w-8 h-8 rounded-lg bg-[#333539] flex items-center justify-center mb-4 group-hover:bg-[#6366F1]/20 transition-colors relative z-10">
                <UserPlus className="w-4 h-4 text-[#c2c6d7] group-hover:text-[#b0c6ff]" />
              </div>
              <h3 className="text-sm font-semibold text-white mb-1 relative z-10">
                Invite your team
              </h3>
              <p className="text-xs text-[#8c90a0] relative z-10">
                Add members to start collaborating in real-time.
              </p>
            </div>
            <div className="mt-6 relative z-10">
              <button className="bg-[#1a1c20] hover:bg-[#252932] border border-[#252932] text-white text-xs font-medium py-2 px-4 rounded-md transition-colors w-full flex justify-center items-center gap-2 cursor-pointer">
                <LinkIcon className="w-3.5 h-3.5" />
                Copy Invite Link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
