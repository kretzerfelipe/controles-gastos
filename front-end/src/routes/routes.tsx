import { createBrowserRouter } from "react-router";
import { PublicLayout } from "./public-layout";
import { Home } from "@/pages/home";
import { Login } from "@/pages/login";
import { Signup } from "@/pages/signup";
import { Income } from "@/pages/income";
import { Expense } from "@/pages/expense";
import { Categories } from "@/pages/categories";
import { NonProtectedRoute, ProtectedRoute } from "./protected-route";
import { Accounts } from "@/pages/accounts";

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
      { path: "/categories", element: <Categories /> },
      { path: "/accounts", element: <Accounts /> },
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
