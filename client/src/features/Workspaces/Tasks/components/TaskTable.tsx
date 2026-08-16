import { Check, Edit3, Folder, Trash2, UserPlus } from "lucide-react";
import type { Task } from "../types/types";
import { PRIORITY_CONFIG, STATUS_CONFIG } from "../data/data";

interface TaskTableProps { 
    tasks: Task[]
    toggleTask: (id:string) => void;
}

export default function TaskTable({tasks, toggleTask}: TaskTableProps) {
    return(
    <div className="flex-1 flex flex-col gap-2.5 min-h-[400px]">
      {tasks.map((task) => {
        const priority = PRIORITY_CONFIG[task.priority];
        const status = STATUS_CONFIG[task.status];
        const StatusIcon = status.icon;

        return (
          <div
            key={task.id}
            className={`group relative flex items-center justify-between gap-4 p-3.5 sm:px-4 rounded-xl bg-[#111827] border transition-all duration-200 ${
              task.completed
                ? 'border-[#252932]/50 bg-[#0d121d] opacity-60'
                : 'border-[#252932] hover:border-[#6366F1]/40 hover:bg-[#151c2e] hover:shadow-lg hover:shadow-[#6366F1]/5'
            }`}
          >
            {/* Left Section: Custom Checkbox & Task Meta */}
            <div className="flex items-center gap-3.5 min-w-0 flex-1">
              {/* Custom Circular Checkbox */}
              <button
                type="button"
                onClick={() => toggleTask(task.id)}
                aria-label={`Mark as ${task.completed ? 'incomplete' : 'complete'}`}
                className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-200 shrink-0 cursor-pointer ${
                  task.completed
                    ? 'bg-[#6366F1] border-[#6366F1] text-white shadow-sm shadow-[#6366F1]/50'
                    : 'border-[#424654] hover:border-[#6366F1] bg-[#0c1322] text-transparent'
                }`}
              >
                <Check
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    task.completed ? 'scale-100' : 'scale-0'
                  }`}
                  strokeWidth={3}
                />
              </button>

              {/* Task Title & Project Tag */}
              <div className="flex flex-col min-w-0 gap-1">
                <span
                  className={`text-xs sm:text-sm font-medium transition-colors truncate ${
                    task.completed
                      ? 'line-through text-[#8c90a0]'
                      : 'text-[#e2e2e8] group-hover:text-white'
                  }`}
                >
                  {task.title}
                </span>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#1a1c20] border border-[#252932] text-[11px] text-[#8c90a0] font-medium">
                    <Folder className="w-3 h-3 text-[#6366F1]" />
                    {task.project}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Section: Badges & Actions */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Priority Tag */}
              <span
                className={`hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider border ${priority.color}`}
              >
                {priority.label}
              </span>

              {/* Status Badge */}
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium border ${status.color}`}
              >
                <StatusIcon className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{status.label}</span>
              </span>

              {/* Assignee Avatar */}
              <div className="flex items-center pl-2 border-l border-[#252932]">
                {task.assignee ? (
                  <img
                    src={task.assignee.avatar}
                    alt={task.assignee.name}
                    title={task.assignee.name}
                    className="w-6 h-6 rounded-full object-cover border border-[#424654]"
                  />
                ) : (
                  <div
                    title="Unassigned"
                    className="w-6 h-6 rounded-full border border-dashed border-[#424654] flex items-center justify-center bg-[#1a1c20] text-[#8c90a0]"
                  >
                    <UserPlus className="w-3 h-3" />
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                <button
                  type="button"
                  aria-label="Edit task"
                  className="p-1.5 text-[#8c90a0] hover:text-[#e2e2e8] hover:bg-[#1a1c20] rounded-lg transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  aria-label="Delete task"
                  className="p-1.5 text-[#8c90a0] hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>

    )
}