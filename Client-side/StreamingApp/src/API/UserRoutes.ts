import { ApiConstants } from "./ApiConstants";


export const UserRoutes = {
    GetUsers: async () => {
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
    GetUserById: async (id: string) => {
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
    GetUserByName: async (name: string) => {
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
    
};
