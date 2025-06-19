import { createBrowserRouter } from "react-router-dom";
import EntryPage from "./pages/EntryPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import AdminMainPage from "./pages/AdminMainPage.tsx";
import UserMainPage from "./pages/UserMainPage.tsx";
import AdminResultsPage from "./pages/AdminPageResult.tsx";
import LivePage from "./pages/LivePage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <EntryPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/admin-signup",
    element: <SignupPage />,
  },
  {
    path: "/admin",
    element: <AdminMainPage />,
  },
  {
    path: "/user",
    element: <UserMainPage />,
  },
  {
    path: "/admin/results",
    element: <AdminResultsPage />,
  },
  {
    path: "/admin/live",
    element: <LivePage />,
  },
  {
    path: "/live",
    element: <LivePage />,
  },
]);

export default router;
