import type { Workspace } from "../types/types";

export const WORKSPACES: Workspace[] = [
  {
    id: '1',
    name: 'Engineering Team',
    detail: '12 members',
    badge: '⚡',
    gradient: 'from-[#FFB95F] to-[#CA8100]',
    textColor: 'text-[#2A1700]',
  },
  {
    id: '2',
    name: 'Design Studio',
    detail: '4 active projects',
    badge: 'DS',
    gradient: 'from-[#4EDEA3] to-[#00A572]',
    textColor: 'text-[#00311F]',
  },
  {
    id: '3',
    name: 'Acme Corp',
    detail: 'Enterprise plan',
    badge: 'AC',
    gradient: 'from-[#558DFF] to-[#0058CA]',
    textColor: 'text-[#001944]',
  },
];
