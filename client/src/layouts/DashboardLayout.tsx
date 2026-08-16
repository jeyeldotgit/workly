import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import MobileNav from '../components/MobileNav';
import { GlobalCommandPalette } from '../features/CommandPalletes/CommandPaletteModal';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCmdOpen, setIsCmdOpen] = useState(false);

  // Global shortcut listener for Command Palette (⌘K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCmdOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex h-screen w-full bg-[#090D16] text-[#e2e2e8] font-sans overflow-hidden antialiased selection:bg-[#558dff]/30">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Wrapper */}
      <div className="flex-1 lg:ml-[240px] flex flex-col h-full relative overflow-hidden">
        {/* Top Header */}
        <Header onOpenSearch={() => setIsCmdOpen(true)} />

        {/* Page Main Content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#090D16] relative flex flex-col">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <MobileNav />

      {/* Command Palette Overlay */}
      <GlobalCommandPalette />
    </div>
  );
}