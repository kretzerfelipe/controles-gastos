import { Routes, Route } from "react-router";
import { Login } from "./pages/login";

export function RoutesConfig() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
