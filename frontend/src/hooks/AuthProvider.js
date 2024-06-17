import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import userService from "../services/userService";
import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("accessToken") || "");

  useEffect(() => {
    if (token !== "") {
      const fetchUserData = async () => {
        try {
          const res = await userService.getUser(token);
          setUser(res);
        } catch (error) {
          console.error("Failed to fetch user data", error);
          throw Error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [token]);

  const loginAction = async (data) => {
    try {
      const res = await authService.login(data.email, data.password);
      if (res.token) {
        localStorage.setItem("accessToken", res.token);
        setToken(res.token);
        setUser(res.data);
        navigate("/");
        return;
      }
    } catch (error) {
      console.error("Failed to login", error.message);
      throw Error(error);
    }
  };

  const registerAction = async (data) => {
    try {
      const res = await authService.register(data);
      if (res.token) {
        localStorage.setItem("accessToken", res.token);
        setToken(res.token);
        setUser(res.data);
        navigate("/");
        return;
      }
    } catch (error) {
      console.error("Failed to register", error.message);
      throw Error(error);
    }
  };

  const googleLoginAction = async (tokenId) => {
    try {
      const res = await authService.googleLogin(tokenId);
      if (res.token) {
        localStorage.setItem("accessToken", res.token);
        setToken(res.token);
        setUser(res.data);
        navigate("/");
        return;
      }
    } catch (error) {
      console.error("Failed to login with Google", error.message);
    }
  };

  const githubLoginAction = async (tokenId) => {
    try {
      const res = await authService.githubLogin(tokenId);
      if (res.token) {
        localStorage.setItem("accessToken", res.token);
        setToken(res.token);
        setUser(res.data);
        navigate("/");
        return;
      }
    } catch (error) {
      console.error("Failed to login with GitHub", error.message);
    }
  };

  const logOut = () => {
    localStorage.removeItem("accessToken");
    setToken("");
    setUser(null);
    navigate("/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loginAction,
        googleLoginAction,
        githubLoginAction,
        registerAction,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
