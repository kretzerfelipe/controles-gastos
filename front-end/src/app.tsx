import { BrowserRouter } from "react-router";
import { RoutesConfig } from "./routes";

export function App() {
  return (
    <BrowserRouter>
      <RoutesConfig />
    </BrowserRouter>
  );
}
