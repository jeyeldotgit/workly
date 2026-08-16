export interface Task {
  id: string;
  title: string;
  project: string;
  assignee?: {
    name: string;
    avatar: string;
  };
  priority: 'high' | 'medium' | 'low';
  status: 'done' | 'todo' | 'review';
  completed: boolean;
}