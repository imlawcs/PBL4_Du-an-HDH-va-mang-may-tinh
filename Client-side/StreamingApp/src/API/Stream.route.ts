import { ApiConstants } from "./ApiConstants";

export const StreamRoutes = {
    getAllStreams: async () => {
        try{
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.STREAM.GET_STREAMS);
            if(!response.ok) {
                throw new Error("Failed to get streams");
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error(error);
        }
    },
    getStreamById: async (id: string) => {
        try{
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.STREAM.GET_STREAMS + id);
            if(!response.ok) {
                throw new Error("Failed to get streams");
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error(error);
        }
    }

}