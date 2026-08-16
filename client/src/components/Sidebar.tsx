import { 
  LayoutDashboard, 
  FolderKanban, 
  CheckSquare, 
  FileText, 
  BarChart3, 
  Users, 
  HelpCircle, 
  Layers 
} from 'lucide-react';
import { NavLink } from 'react-router';

export default function Sidebar() {
  const navItems = [
    { label: 'Home', icon: LayoutDashboard, href: '#', active: true },
    { label: 'Projects', icon: FolderKanban, href: '#' },
    { label: 'Tasks', icon: CheckSquare, href: '#' },
    { label: 'Documents', icon: FileText, href: '#' },
    { label: 'Analytics', icon: BarChart3, href: '#' },
    { label: 'Team', icon: Users, href: '#' },
  ];

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-[240px] z-40 py-4 bg-[#1a1c20] border-r border-[#424654]/40">
      {/* Workspace Header */}
      <div className="px-3 mb-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-inner relative">
          <Layers className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-[#e2e2e8] tracking-tight">
            Acme Workspace
          </h2>

        </div>
      </div>


      {/* Dynamic Navigation Links */}
      <nav className="flex-1 px-3 flex flex-col gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.href}
              className={`flex items-center gap-3 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                item.active
                  ? 'bg-[#6366F1]/10 text-[#b0c6ff] border-l-2 border-[#6366F1]'
                  : 'text-[#c2c6d7] hover:bg-[#333539]/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer Support Link */}
      <div className="px-3 flex flex-col gap-1 mt-auto pt-4 border-t border-[#424654]/30">
        <a
          href="#"
          className="flex items-center gap-3 px-2.5 py-1.5 rounded-md text-[#c2c6d7] hover:bg-[#333539]/50 transition-colors text-xs font-medium"
        >
          <HelpCircle className="w-4 h-4" />
          Help & Feedback
        </a>
      </div>
    </aside>
  );
}