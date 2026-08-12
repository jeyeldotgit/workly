export interface CommandItem {
  id: string;
  category: "Actions" | "Recent Tasks";
  label: string;
  icon: string;
  shortcut?: string[];
  tag?: string;
  isCompleted?: boolean;
  onSelect?: () => void;
}

export const DEFAULT_COMMANDS: CommandItem[] = [
  {
    id: "1",
    category: "Actions",
    label: "Create new task",
    icon: "add_circle",
    shortcut: ["Cmd", "N"],
  },
  {
    id: "2",
    category: "Actions",
    label: "Breakdown complex goal with AI",
    icon: "smart_toy",
    shortcut: ["/breakdown"],
  },
  {
    id: "3",
    category: "Actions",
    label: "Filter tasks by tag",
    icon: "label",
    shortcut: ["Cmd", "T"],
  },
  {
    id: "4",
    category: "Actions",
    label: "Invite team member to workspace",
    icon: "person_add",
    shortcut: ["Cmd", "I"],
  },
  {
    id: "5",
    category: "Recent Tasks",
    label: "Refactor authentication middleware",
    icon: "check_box_outline_blank",
    tag: "#backend",
  },
  {
    id: "6",
    category: "Recent Tasks",
    label: "Deploy WebSocket sync cluster",
    icon: "check_box",
    isCompleted: true,
    tag: "Done",
  },
];
