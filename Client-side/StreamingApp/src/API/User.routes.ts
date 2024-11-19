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
