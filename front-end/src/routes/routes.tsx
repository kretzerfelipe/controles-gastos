import { createBrowserRouter } from "react-router";
import { PublicLayout } from "./public-layout";
import { Home } from "@/pages/home";
import { Login } from "@/pages/login";
import { Signup } from "@/pages/signup";
import { Income } from "@/pages/income";
import { Expense } from "@/pages/expense";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/income", element: <Income /> },
      { path: "/expense", element: <Expense /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);
