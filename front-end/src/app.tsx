import { RouterProvider } from "react-router";
import { router } from './routes/routes';

export function App() {
  return (
    <RouterProvider router={router} />
  );
}
