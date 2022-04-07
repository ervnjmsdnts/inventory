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

export const UserContext = createContext<AuthContext>({} as AuthContext);

export const useUser = (): AuthContext => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState(false);

  let token = "";

  if (typeof window !== "undefined") {
    token = localStorage.getItem("token")!;
  }

  useEffect(() => {
    if (token) {
      verify(token, "secret", (err, decoded) => {
        if (!err && decoded) {
          setUser(decoded as User);
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
    setUser(null);
    setIsAuth(false);
  };

  return { user, login, logout, isAuth };
};

export const UserProvider: React.FC = ({ children }) => {
  const auth = useUser();
  return <UserContext.Provider value={auth}>{children}</UserContext.Provider>;
};

export const UserConsumer = () => useContext(UserContext);
