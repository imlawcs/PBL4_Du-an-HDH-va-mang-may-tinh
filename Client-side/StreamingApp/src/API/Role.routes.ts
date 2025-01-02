import { ApiConstants } from "./ApiConstants";

export const RoleRoutes = {
    getAllRoles: async () => {

    },
    getRoleById: async (id: string) => {

    },
    addRole: async (data: any) => {
        try {
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.ROLE.ASSIGN_ROLE, {
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
        } catch (error) {
            console.error(error);
        }
    },
    removeRole: async (data: any) => {
        try {
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.ROLE.REMOVE_ROLE, {
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
        } catch (error) {
            console.error(error);
        }
    },
    getModOfChannel: async (channelId: string) => {
        try {
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.ROLE.GET_MODS_OF_CHANNEL(channelId), {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*",
                    "Accept-Encoding": "gzip, deflate, br",
                    "Connection": "keep-alive"
                }
            });
            if(!response.ok) {
                return [];
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    assignModerator: async (data: any) => {
        try{
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.ROLE.ASSIGN_MOD, {
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
    removeModerator: async (data: any) => {
        try{
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.ROLE.REMOVE_MOD, {
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
    }
}