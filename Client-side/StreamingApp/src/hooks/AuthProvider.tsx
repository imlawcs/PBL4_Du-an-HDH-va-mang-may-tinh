import React, { useContext, createContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ApiConstants } from "../API/ApiConstants";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { UserRoutes } from "../API/User.routes";

interface AuthContextType {
    token: string;
    logIn: (data: any) => Promise<void>;
    logOut: () => void;
    signUp: (data: any) => Promise<any>;
    updateUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("site") || "");
    const navigate = useNavigate();

    
    const logIn = async (data: any) => {
        try {
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.LOGIN, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
              },
              body: JSON.stringify(data),
            });
  
            if (response.ok) {
              const data = await response.json();
              localStorage.setItem("site", data.token);
              const userData = await UserRoutes.fetchUser(data.token);
              console.log(userData);
              if(userData) localStorage.setItem("user", JSON.stringify(userData))// Store the JWT token
              navigate(0); // Redirect to the home page
              return;
               // Call the login function passed via props
            } else {
              const errorData = await response.json();
              alert({ form: errorData.error });
              return;
            }
          } catch (error) {
            console.log({ form: error.message });
          }
    }
    const logOut = function () {
        setToken("");
        localStorage.removeItem("site");
        localStorage.removeItem("user");
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
              alert("Signed up successfully, please login"); // Store the JWT token// Redirect to the home page
              return true;
               // Call the login function passed via props
            } else {
              const errorData = await response.json();
              alert(JSON.stringify({ form: errorData.error }));
              return { form: errorData.error };
            }
          } catch (error) {
            console.log({ form: error.message });
            return { form: error.message };
          } finally {
            console.log("Sign up request completed.");
          }
    };
    const updateUserData = async () => {
        const userData = await UserRoutes.fetchUser(token);
        localStorage.setItem("user", JSON.stringify(userData));
        // navigate(0);
    }

    
    return (
        <AuthContext.Provider value={{ token, logIn, logOut, signUp, updateUserData }}>
            {children}
        </AuthContext.Provider>    
    );
}

export default AuthProvider;
export const useAuth = () => {
  return useContext(AuthContext);
};