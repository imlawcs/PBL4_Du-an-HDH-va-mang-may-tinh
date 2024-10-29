import React, { useContext, createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiConstants } from "../API/ApiConstants";

interface AuthContextType {
    token: string;
    user: any;
    logIn: (data: any) => Promise<void>;
    logOut: () => void;
    signUp: (data: any) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();
    const location = useLocation();
    const logIn = async (data: any) => {
        try {
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.LOGIN, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
  
            if (response.ok) {
              const data = await response.json();
              setUser(data.User);
              localStorage.setItem("site", data.token); // Store the JWT token
              navigate(0); // Redirect to the home page
              return;
               // Call the login function passed via props
            } else {
              const errorData = await response.json();
              console.error({ form: errorData.error });
              return;
            }
          } catch (error) {
            console.log({ form: error.message });
          }
    }
    const logOut = function () {
        setUser(null);
        setToken("");
        localStorage.removeItem("site");
        navigate("/");
    };
    const signUp = async (data: any) => {
        try {
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.SIGNUP, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
            });
  
            if (response.ok) {
              alert("Signed up successfully, please login"); // Store the JWT token
              navigate('/');// Redirect to the home page
              return true;
               // Call the login function passed via props
            } else {
              const errorData = await response.json();
              console.error({ form: errorData.error });
              return { form: errorData.error };
            }
          } catch (error) {
            console.log({ form: error.message });
            return { form: error.message };
          } finally {
            console.log("Sign up request completed.");
          }
    };
    return (
        <AuthContext.Provider value={{ token, user, logIn, logOut, signUp }}>
            {children}
        </AuthContext.Provider>    
    );
}

export default AuthProvider;
export const useAuth = () => {
    return useContext(AuthContext);
};