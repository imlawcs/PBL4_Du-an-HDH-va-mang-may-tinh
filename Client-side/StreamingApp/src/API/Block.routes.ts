import { ApiConstants } from "./ApiConstants";

export const BlockRoutes = {
    getAllBlockedUsers: async() => {
        try{
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.BLOCK.GET_ALL_BLOCKED);
            if(!response.ok) {
                throw new Error("Failed to get blocked users");
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error(error);
        }
    },
    getBlockedUsersById: async(id: string) => {
        try{
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.BLOCK.GET_BLOCKED_BY_ID + id);
            if(!response.ok) {
                throw new Error("Failed to get blocked users with id:" + id);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error(error);
        }
    },
    blockUser: async(data: any) => {
        try{
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.BLOCK.BLOCK, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if(!response.ok) {
                throw new Error("Failed to block user");
            }
            const result = await response.json();
            return result;
        }
        catch (error) {
            console.error(error);
        }
    },
    unblockUser: async(data: any) => {
        try{
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.BLOCK.UNBLOCK, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            if(!response.ok) {
                throw new Error("Failed to unblock user");
            }
            const result = await response.json();
            return result;
        }
        catch (error) {
            console.error(error);
        }
    }
}