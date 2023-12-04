import { createBrowserRouter } from "react-router-dom";

import { DefaultPagesContainer } from "./DefaultPagesContainer";
import { LoginPage } from "./LoginPage";
import { HomePage } from "./HomePage";
import { ClientListPage } from "./ClientListPage";
import { ProtectedRoute } from "@components/auth/ProtectedRoute";
import { ContributionsListPage } from "./ContributionsListPage";
import { NewContributionPage } from "./NewContributionPage";

export const ROUTER_PATHS = {
  LOGIN: "/login",
  HOME: "/",
  CONTRIBUTIONS: "/contributions",
  CLIENTS: "/clients",
};

export const router = createBrowserRouter([
  {
    path: ROUTER_PATHS.LOGIN,
    element: <LoginPage redirectUrl={ROUTER_PATHS.HOME} />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <DefaultPagesContainer />,
        children: [
          { path: ROUTER_PATHS.HOME, element: <NewContributionPage /> },
          {
            path: ROUTER_PATHS.CONTRIBUTIONS,
            element: <ContributionsListPage />,
          },
          { path: ROUTER_PATHS.CLIENTS, element: <ClientListPage /> },
        ],
      },
    ],
  },
]);
