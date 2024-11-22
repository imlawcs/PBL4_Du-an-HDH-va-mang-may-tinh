import { ApiConstants } from "./ApiConstants";

export const TagRoutes = {
    getAllTags: async () => {
        try{
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.TAG.GET_TAGS);
            if(!response.ok) {
                throw new Error("Failed to get tags");
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error(error);
        }
    },
    getTagById: async (tagId: string) => {
        try{
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.TAG.GET_TAG_BY_ID + tagId);
            if(!response.ok) {
                throw new Error("Failed to get tag");
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error(error);
        }
    },
    createTag: async (data: any) => {
        try{
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.TAG.GET_TAGS, {
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
                throw new Error("Failed to create tag");
            }
            return responseText;
        }
        catch (error) {
            console.error(error);
        }
    },
}