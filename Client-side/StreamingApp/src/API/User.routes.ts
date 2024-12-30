import { jwtDecode, JwtPayload } from "jwt-decode";
import { ApiConstants } from "./ApiConstants";


export const UserRoutes = {
    getUsers: async () => {
        try{
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.USER.GET_USER);
            if(!response.ok) {
                throw new Error("Failed to get users");
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error(error);
        }
    },
    getUserById: async (id: string) => {
        try{
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.USER.GET_USER_BY_ID + id);
            if(!response.ok) {
                throw new Error("Failed to get user with id:" + id);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error(error);
        }
    },
    getUserByName: async (name: string) => {
        try{
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.USER.GET_USER_BY_NAME + name);
            if(!response.ok) {
                throw new Error("Failed to get user with name:" + name);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error(error);
        }
    },
    addUser: async (data: any) => {
        try{
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.USER.GET_USER, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Connection": "keep-alive"
                },
                body: JSON.stringify(data)
            });
            const responseText = await response.text();
            if(!response.ok) {
                throw new Error(responseText.split('\"')[1]);
            }
            return responseText;
        }
        catch (error) {
            console.error(error);
        }
    },
    updateUser: async (id: string, data: any) => {
        try{
            console.log(JSON.stringify(data));
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.USER.GET_USER_BY_ID + id, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Connection": "keep-alive"
                },
                body: JSON.stringify(data)
            });
            const responseText = await response.text();
            if(!response.ok) {
                throw new Error("Failed to update user with id:" + id);
            }
            return responseText;
        }
        catch (error) {
            console.error(error);
        }
    },
    updatePassword: async (id: string, data: any) => {
        try {
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.USER.GET_USER_BY_ID + id + "/update-password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Connection": "keep-alive"
                },
                body: JSON.stringify(data)
            });
            const responseText = await response.text();
            console.log(responseText);
            if(!response.ok) {
                throw new Error(responseText.split('\"')[1]);
            }
            return responseText;


        } catch (error) {
            console.error(error.message);
            return error.message;
        }
    },
    deleteUser: async (id: string) => {
        try{
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.USER.GET_USER_BY_ID + id, {
                method: "DELETE"
            });
            const responseText = await response.text();
            if(!response.ok) {
                throw new Error("Failed to delete user with id:" + id);
            }
            return responseText;
        }
        catch (error) {
            console.error(error);
        }
    },
    fetchUser: async (token: string) => {
        try 
        {
            const decoded = jwtDecode<JwtPayload>(token, { header: false });
            console.log("Decoded token: ", decoded);
            const userData = await UserRoutes.getUserById(decoded[ApiConstants.CLAIMS.NAME_IDENTIFIER]);
            return userData;
        } catch (error) {
            console.error("Error decoding token: ", error);
            return null;
        }
    }
    
};
