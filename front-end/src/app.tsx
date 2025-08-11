import { RouterProvider } from "react-router";
import { router } from "./routes/routes";
import "ldrs/react/Ring.css";
import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "./@types/user";
import { useAuth } from "./queries/auth";
import { Ring } from "ldrs/react";

const AuthContext = createContext<
  | { user: User | undefined; setUser: (user: User | undefined) => void }
  | undefined
>(undefined);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuthContext must be used inside AuthProvider");
  return context;
}

export function App() {
  const { user: queryUser, query } = useAuth();

  const [user, setUser] = useState<User | undefined>(undefined);

  console.log(user);

  useEffect(() => {
    if (queryUser) {
      setUser(queryUser);
    }
  }, [queryUser]);

  if (query.isLoading) {
    return (
      <div className="flex-container justify-center items-center h-screen">
        <Ring
          size="40"
          stroke="5"
          bgOpacity="0"
          speed="2"
          color="var(--foreground)"
        />
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}
