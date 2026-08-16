import React from 'react';
import { LayoutGrid, Code2, AlertCircle, Sliders } from 'lucide-react';

export default function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-4 py-2 lg:hidden bg-[#1f2229]/90 backdrop-blur-xl border-t border-[#424654]/40">
      <a href="#" className="flex flex-col items-center justify-center text-[#b0c6ff] bg-[#558dff]/10 rounded-lg p-1 w-14">
        <LayoutGrid className="w-5 h-5" />
        <span className="text-[10px] font-medium mt-0.5">Home</span>
      </a>
      <a href="#" className="flex flex-col items-center justify-center text-[#c2c6d7] hover:text-[#b0c6ff] w-14">
        <Code2 className="w-5 h-5" />
        <span className="text-[10px] font-medium mt-0.5">Code</span>
      </a>
      <a href="#" className="flex flex-col items-center justify-center text-[#c2c6d7] hover:text-[#b0c6ff] w-14">
        <AlertCircle className="w-5 h-5" />
        <span className="text-[10px] font-medium mt-0.5">Tasks</span>
      </a>
      <a href="#" className="flex flex-col items-center justify-center text-[#c2c6d7] hover:text-[#b0c6ff] w-14">
        <Sliders className="w-5 h-5" />
        <span className="text-[10px] font-medium mt-0.5">Config</span>
      </a>
    </nav>
  );
}