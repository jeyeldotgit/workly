import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination() {
    return(
        <div className="px-4 py-2.5 border-t border-[#252932] bg-[#1a1c20] flex justify-between items-center text-[#8c90a0] text-xs">
          <span>Showing 1-4 of 42 tasks</span>
          <div className="flex items-center gap-2">
            <button
              disabled
              aria-label="Previous page"
              className="p-1 hover:text-[#e2e2e8] transition-colors disabled:opacity-30 disabled:hover:text-[#8c90a0] cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-medium text-[#e2e2e8]">Page 1</span>
            <button
              aria-label="Next page"
              className="p-1 hover:text-[#e2e2e8] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
    )
}

