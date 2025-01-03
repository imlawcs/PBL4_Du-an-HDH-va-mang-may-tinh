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
              console.log(userData.UserStatus);
              if(userData.UserStatus != null && userData.UserStatus == false) {
                logOut();
                return({error: "User is suspended."});
              }
              if(userData) localStorage.setItem("user", JSON.stringify(userData))// Store the JWT token
              navigate(0); // Redirect to the home page
              return;
               // Call the login function passed via props
            } else {
              const errorData = await response.json();
              console.log(errorData);
              return(errorData);
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
               // Store the JWT token// Redirect to the home page
              console.log("ok");
              const data = await response.json();
              console.log(data);
              return data;
               // Call the login function passed via props
            } else {
              const errorData = await response.json();
              console.log(errorData);
              return errorData;
            }
          } catch (error) {
            console.log(error);
            return error;
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