import { createBrowserRouter } from "react-router-dom";
import { NewClientPage } from "./NewClientPage";
import { DefaultPagesContainer } from "./DefaultPagesContainer";
import { LoginPage } from "./LoginPage";
import { ClientListPage } from "./ClientListPage";
import { ProtectedRoute } from "@components/auth/ProtectedRoute";
import { ContributionsListPage } from "./ContributionsListPage";
import { NewContributionPage } from "./NewContributionPage";

export const CLIENT_ROUTES = {
  CLIENTS: "/clients",
  NEW_CLIENT: "/clients/add",
};

export const ROUTER_PATHS = {
  LOGIN: "/login",
  HOME: "/",
  CONTRIBUTIONS: "/contributions",
  ...CLIENT_ROUTES,
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
          { path: ROUTER_PATHS.NEW_CLIENT, element: <NewClientPage /> },
        ],
      },
    ],
  },
]);
