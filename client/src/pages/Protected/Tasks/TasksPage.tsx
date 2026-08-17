import { useState } from "react";
import { Plus } from "lucide-react";
import type { Task } from "../../../features/Workspaces/Tasks/types/types";
import { INITIAL_TASKS } from "../../../features/Workspaces/Tasks/data/data";
import Filters from "../../../features/Workspaces/Tasks/components/Filters";
import TaskTable from "../../../features/Workspaces/Tasks/components/TaskTable";
import Pagination from "../../../features/Workspaces/Tasks/components/Pagination";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS); // repace this with actual task fetching api

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col gap-6 max-w-[1600px] w-full mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#e2e2e8] tracking-tight">
            Tasks
          </h1>
          <p className="text-xs sm:text-sm text-[#8c90a0] mt-1">
            Manage and track your high-priority items across all active
            projects.
          </p>
        </div>
        <button className="bg-[#6366F1] hover:bg-indigo-500 text-white text-xs font-medium h-9 px-4 rounded-md flex items-center gap-2 transition-colors shadow-sm cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
          <span className="opacity-60 font-mono text-[10px] ml-1">⌘N</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <Filters />

      {/* High-Density Data Table */}
      <TaskTable tasks={tasks} toggleTask={toggleTask} />

      {/* Table Footer / Pagination */}
      <Pagination />
    </div>
  );
}
