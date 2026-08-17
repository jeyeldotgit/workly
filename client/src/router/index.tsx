import { createBrowserRouter } from "react-router";
import App from "../App";

import Pokemon from "../pages/Pokemon";
import { loader as pokemonLoader } from "../pages/fetching";
import { queryClient } from "../utils/queryClient";

import { ROUTES } from "./routes";

// Pages
import LandingPage from "../pages/Landing/LandingPage";
import WorklyLoginPage from "../pages/Auth/LoginPage";
import AuthCallback from "../features/Authentication/components/AuthCallback";
import WorkspaceSelectionPage from "../pages/Protected/Workspaces/WorkspacesSelection";
import WorkspacePage from "../pages/Protected/Workspaces/WorkspacesPage";
import TasksPage from "../pages/Protected/Tasks/TasksPage";
import ProjectsCanvasPage from "../pages/Protected/Projects/KanbanPage";
import TeamPage from "../pages/Protected/Team/TeamPage";
import DashboardLayout from "../layouts/DashboardLayout";
const router = createBrowserRouter([
  {
    path: ROUTES.LANDING,
    element: <LandingPage />,
  },
  {
    path: ROUTES.LOGIN,
    element: <WorklyLoginPage />,
  },
  {
    path: ROUTES.REACT_APP,
    element: <App />,
  },
  {
    path: ROUTES.AUTH_CALLBACK,
    element: <AuthCallback />,
  },
  {
    path: ROUTES.POKEMON,
    element: <Pokemon />,
    loader: pokemonLoader(queryClient),
  },
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        path: ROUTES.WORKSPACES,
        element: <WorkspaceSelectionPage />,
        // loader: put a tanstack query here after
      },
      {
        path: ROUTES.WORKSPACES_ID,
        element: <WorkspacePage />,
      },
      {
        path: ROUTES.TASKS,
        element: <TasksPage />,
      },
      {
        path: ROUTES.KANBAN,
        element: <ProjectsCanvasPage />,
      },
      {
        path: ROUTES.TEAM,
        element: <TeamPage />,
      },
    ],
  },
]);

export default router;
