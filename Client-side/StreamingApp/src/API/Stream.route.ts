import { ApiConstants } from "./ApiConstants";
export enum StreamStatus {
    UNFINISHED,
    FINISHED,
    ERROR,
}
export function isEmpty(obj: any): boolean {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return false;
      }
    }
  
    return true;
}
export function compareDates(date1: Date, date2: Date): boolean {
    if (date1.getFullYear() !== date2.getFullYear()) {
        return date1.getFullYear() > date2.getFullYear();
    }
    if (date1.getMonth() !== date2.getMonth()) {
        return date1.getMonth() > date2.getMonth();
    }
    if (date1.getDate() !== date2.getDate()) {
        return date1.getDate() > date2.getDate();
    }
    if (date1.getHours() !== date2.getHours()) {
        return date1.getHours() > date2.getHours();
    }
    if (date1.getMinutes() !== date2.getMinutes()) {
        return date1.getMinutes() > date2.getMinutes();
    }
    if (date1.getSeconds() !== date2.getSeconds()) {
        return date1.getSeconds() > date2.getSeconds();
    }
    return date1.getMilliseconds() > date2.getMilliseconds();
}
export const StreamRoutes = {
    getAllStreams: async () => {
        try{
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.STREAM.GET_STREAMS);
            if(!response.ok) {
                throw new Error("Failed to get streams");
            }
            const data = await response.json();
            return data || [];
        }
        catch (error) {
            console.error(error);
        }
    },
    getStreamById: async (id: string) => {
        try{
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.STREAM.GET_STREAM_BY_ID + id);
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
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.STREAM.GET_STREAM_BY_ID + id, {
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
        try {
            const data = await StreamRoutes.getAllStreams().then((streams) => {
                if(streams.length > 0) {
                    const userStreams = streams.filter((stream: any) => stream.userId === userid);
                    // console.log(userStreams);
                    if(userStreams.length > 0)
                    {
                        const mostRecentStream = userStreams.reduce((prev: any, current: any) => {
                            return (compareDates(new Date(prev.streamDate), new Date(current.streamDate))) ? prev : current;
                        }, userStreams[0]);
                        // console.log("most: " + JSON.stringify(mostRecentStream));
                        return mostRecentStream;
                    }
                }
            });
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    getStreamsWithCategory: async (categoryId: string) => {
        try {
            await StreamRoutes.getAllStreams().then((streams) => {
                if(streams.length > 0) {
                    const categoryStreams = streams.filter((stream: any) => stream.streamCategories[0].categoryId === categoryId);
                    return categoryStreams;
                }
            });
        } catch (error) {
            console.error(error);
        }
    }
}