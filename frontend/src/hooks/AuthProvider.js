import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("accessToken") || "");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (token) {
  //       // Fetch user data or validate token here if needed
  //       // Example:
  //       // const fetchUserData = async () => {
  //       //   const res = await authService.getUserData(token);
  //       //   setUser(res.data);
  //       // };
  //       // fetchUserData();
  //     }
  //   }, [token]);

  const loginAction = async (data) => {
    try {
      const res = await authService.login(data.email, data.password);
      if (res.token) {
        localStorage.setItem("accessToken", res.token);
        setToken(res.token);
        setUser(res.data); // Assuming the user data is returned here
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
