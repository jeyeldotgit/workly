export interface Workspace {
  id: string;
  name: string;
  detail: string;
  badge: string;
  gradient: string;
  textColor: string;
}

export interface CreateWorkspaceData {
  name: string;
  slug: string;
  members: string[];
}