import { createContext, useState, useEffect, type ReactNode } from "react";
import { API_BASE } from "../config";

interface User {
  id: string;
  username: string;
  isCreator: boolean;
  name: string;
  dateCreated: string;
  following: [];
  followers: [];
  imageId?: string;
}

interface UserContextType {
  user: User | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  token: string | null;
  isLoggedIn: boolean;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) return;

      setToken(storedToken);
      try {
        const response = await fetch(`${API_BASE}/api/user/me`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        });

        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          setUser(null);
          setToken(null);
          return;
        }

        if (!response.ok) throw new Error("Failed to fetch user");

        const freshUser = await response.json();
        console.log("User from backend:", freshUser);
        setUser(freshUser);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
      }
    };

    fetchUser();
  }, []);

  const login = (user: User, newToken: string) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", newToken);
    setUser(user);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  const isLoggedIn = !!user && !!token;

  return (
    <UserContext.Provider value={{ user, login, logout, token, isLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};
