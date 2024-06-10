import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import userService from "../services/userService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken") || "");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const fetchUserData = async () => {
        try {
          const res = await userService.getUser(token);
          setUser(res);
        } catch (error) {
          console.error("Failed to fetch user data", error);
          setError("Unable to fetch user data. Please try again.");
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
      } else {
        setError("Invalid credentials");
      }
    } catch (error) {
      console.error("Failed to login", error.message);
      setError("Unable to login. Please try again.");
    }
  };

  const logOut = () => {
    setToken("");
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ token, user, error, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
