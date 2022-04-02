import { verify } from "jsonwebtoken";
import { createContext, useContext, useEffect, useState } from "react";

interface AuthContext {
  user: any;
  login: (token: string) => void;
  logout: () => void;
  isAuth: boolean;
}

interface User {
  name: string;
  role: string;
  iat: number;
}

export const UserContext = createContext<AuthContext | null>({} as AuthContext);

export const useUser = () => {
  const [user, setUser] = useState<User>({} as User);
  const [isAuth, setIsAuth] = useState(false);

  let token = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token")!;
  }

  useEffect(() => {
    if (token) {
      verify(token, "secret", (err, decoded) => {
        if (!err && decoded) {
          const { name, role, iat } = decoded as User;
          setUser({ name, role, iat });
          setIsAuth(true);
        }
      });
    }
  }, [token]);

  const login = (token: string) => {
    localStorage.setItem("token", token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser({} as User);
    setIsAuth(false);
  };

  return { user, login, logout, isAuth };
};

export const UserConsumer = () => useContext(UserContext);