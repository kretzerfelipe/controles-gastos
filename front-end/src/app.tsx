import { RouterProvider } from "react-router";
import { router } from "./routes/routes";
import "ldrs/react/Ring.css";
import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "./@types/user";
import { getAuthMe } from "./api/auth/get-auth-me";
import { Ring } from "ldrs/react";

// Tipagem do contexto
interface AuthContextValue {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used inside AuthProvider");
  }
  return context;
}

export function App() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const authUser = await getAuthMe();
        setUser(authUser);
      } catch {
        setUser(undefined);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
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
