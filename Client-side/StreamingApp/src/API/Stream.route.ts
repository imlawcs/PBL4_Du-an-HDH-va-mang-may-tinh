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
    },
    createStream: async (data: any) => {
        try{
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.STREAM.GET_STREAMS, {
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
                throw new Error("Failed to create stream");
            }
            return responseText;
        }
        catch (error) {
            console.error(error);
        }
    },
    updateStream: async (id: string, data: any) => {
        try{
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.STREAM.GET_STREAMS + id, {
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
                throw new Error("Failed to update stream");
            }
            return responseText;
        }
        catch (error) {
            console.error(error);
        }
    },
    getMostRecentStreamByUser: async (userid: string) => {
        await StreamRoutes.getAllStreams().then((streams) => {
            const userStreams = streams.filter((stream: any) => stream.userId === userid);
            const mostRecentStream = userStreams.reduce((prev: any, current: any) => {
                return (new Date(prev.streamDate) > new Date(current.streamDate)) ? prev : current;
            });
            return mostRecentStream;
        });
    }
}