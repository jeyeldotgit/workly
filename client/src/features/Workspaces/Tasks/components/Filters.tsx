import { Calendar, CheckCircle, Filter, Flag, User } from "lucide-react";

export default function Filters() {
    return (      
    <div className="flex flex-wrap items-center gap-2 p-2 bg-[#141b2b] border border-[#252932] rounded-lg text-xs">
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#191f2f] text-[#dce2f7] border border-[#252932] hover:border-[#6366F1] transition-colors">
          <User className="w-3.5 h-3.5 text-[#8c90a0]" />
          <span>Assignee</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#191f2f] text-[#dce2f7] border border-[#252932] hover:border-[#6366F1] transition-colors">
          <Calendar className="w-3.5 h-3.5 text-[#8c90a0]" />
          <span>Due Date</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#191f2f] text-[#dce2f7] border border-[#252932] hover:border-[#6366F1] transition-colors">
          <Flag className="w-3.5 h-3.5 text-[#8c90a0]" />
          <span>Priority</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#191f2f] text-[#dce2f7] border border-[#252932] hover:border-[#6366F1] transition-colors">
          <CheckCircle className="w-3.5 h-3.5 text-[#8c90a0]" />
          <span>Status</span>
        </button>
        <div className="w-px h-5 bg-[#252932] mx-1 hidden sm:block" />
        <button className="text-[#8c90a0] hover:text-[#e2e2e8] flex items-center gap-1.5 transition-colors ml-auto sm:ml-0 px-2 py-1.5">
          <Filter className="w-3.5 h-3.5" />
          <span>Clear Filters</span>
        </button>
    </div>)
}