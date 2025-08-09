import { Routes, Route } from "react-router";
import { Login } from "./pages/login";
import { Signup } from "./pages/signup";

export function RoutesConfig() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}
