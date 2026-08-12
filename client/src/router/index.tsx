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
]);

export default router;
