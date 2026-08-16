import { AlertCircle, CheckCircle2, Clock } from "lucide-react";
import type { Task } from "../types/types";

const INITIAL_TASKS: Task[] = [
  {
    id: '1',
    title: 'Implement new auth flow endpoints',
    project: 'Acme / Core API',
    assignee: {
      name: 'Sarah J.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    priority: 'low',
    status: 'done',
    completed: true,
  },
  {
    id: '2',
    title: 'Resolve memory leak in main canvas render loop',
    project: 'Workly / Web App',
    assignee: {
      name: 'Mike D.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    },
    priority: 'high',
    status: 'todo',
    completed: false,
  },
  {
    id: '3',
    title: 'Design System v2.0 Components Update',
    project: 'Acme / Design',
    priority: 'medium',
    status: 'review',
    completed: false,
  },
  {
    id: '4',
    title: 'Update README documentation with new env vars',
    project: 'Workly / Core API',
    assignee: {
      name: 'Sarah J.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    },
    priority: 'low',
    status: 'todo',
    completed: false,
  },
];

const PRIORITY_CONFIG = {
  high: { label: 'High', color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
  medium: { label: 'Medium', color: 'text-[#b0c6ff] bg-[#6366F1]/10 border-[#6366F1]/20' },
  low: { label: 'Low', color: 'text-[#8c90a0] bg-[#1a1c20] border-[#252932]' },
};

const STATUS_CONFIG = {
  done: { label: 'Done', icon: CheckCircle2, color: 'text-[#4edea3] bg-[#4edea3]/10 border-[#4edea3]/20' },
  todo: { label: 'To Do', icon: Clock, color: 'text-[#b0c6ff] bg-[#6366F1]/10 border-[#6366F1]/20' },
  review: { label: 'In Review', icon: AlertCircle, color: 'text-amber-300 bg-amber-500/10 border-amber-500/20' },
};

export {INITIAL_TASKS, PRIORITY_CONFIG, STATUS_CONFIG}