import { createBrowserRouter } from "react-router";
import { PublicLayout } from "./public-layout";
import { Home } from "@/pages/home";
import { Login } from "@/pages/login";
import { Signup } from "@/pages/signup";
import { Income } from "@/pages/income";
import { Expense } from "@/pages/expense";
import { Settings } from "@/pages/settings";
import { NonProtectedRoute, ProtectedRoute } from "./protected-route";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <PublicLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/income", element: <Income /> },
      { path: "/expense", element: <Expense /> },
      { path: "/settings", element: <Settings /> },
    ],
  },
  {
    path: "/login",
    element: (
      <NonProtectedRoute>
        <Login />
      </NonProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <NonProtectedRoute>
        <Signup />
      </NonProtectedRoute>
    ),
  },
]);
