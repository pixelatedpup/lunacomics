import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export const useUser = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error("useUser must be used within a UserProvider");
  }

  const { user, login, logout } = userContext;
  const isLoggedIn = !!user;

  return { user, isLoggedIn, login, logout };
};