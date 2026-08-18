import { Menu, Search, Bell, Settings } from "lucide-react";

interface HeaderProps {
  onOpenSearch: () => void;
}

export default function Header({ onOpenSearch }: HeaderProps) {
  return (
    <header className="flex justify-between items-center w-full px-4 h-14 z-30 bg-[#111827] border-b border-[#252932] shrink-0">
      <div className="flex items-center gap-6">
        <button className="lg:hidden text-[#c2c6d7] p-1.5 rounded-md hover:bg-[#1a1c20]">
          <Menu className="w-5 h-5" />
        </button>

        {/* Breadcrumb Context */}
        <div className="text-sm font-bold text-[#b0c6ff] tracking-tight hidden md:block">
          Workly <span className="text-[#424654] font-normal mx-1">/</span>{" "}
          Engineering
        </div>

        {/* Top Links */}
        <nav className="hidden md:flex gap-1">
          <a
            href="#"
            className="px-3 py-1.5 rounded-md text-[#c2c6d7] hover:bg-[#1a1c20] transition-colors text-xs font-medium"
          >
            Projects
          </a>
          <a
            href="#"
            className="px-3 py-1.5 rounded-md text-[#c2c6d7] hover:bg-[#1a1c20] transition-colors text-xs font-medium"
          >
            Vault
          </a>
          <a
            href="#"
            className="px-3 py-1.5 rounded-md text-[#c2c6d7] hover:bg-[#1a1c20] transition-colors text-xs font-medium"
          >
            Insights
          </a>
        </nav>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSearch}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#1a1c20] border border-[#252932] rounded-md text-[#c2c6d7] hover:border-[#424654] transition-colors cursor-pointer"
        >
          <Search className="w-4 h-4 text-[#8c90a0]" />
          <span className="text-xs">Search...</span>
          <span className="font-mono text-[10px] border border-[#424654] bg-[#111317] rounded px-1.5 py-0.5 ml-2 text-[#8c90a0]">
            ⌘K
          </span>
        </button>

        <div className="flex items-center gap-1">
          <button className="p-1.5 rounded-md text-[#c2c6d7] hover:bg-[#1a1c20] transition-colors relative">
            <Bell className="w-4 h-4" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#6366F1] rounded-full border border-[#111827]" />
          </button>
          <button className="p-1.5 rounded-md text-[#c2c6d7] hover:bg-[#1a1c20] transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* User Profile Avatar */}
        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#333539] to-[#424654] p-[2px] cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
            alt="User Avatar"
            className="w-full h-full rounded-full object-cover border border-[#111827]"
          />
        </div>
      </div>
    </header>
  );
}
