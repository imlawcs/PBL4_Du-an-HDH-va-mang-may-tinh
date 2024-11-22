import { ApiConstants } from "./ApiConstants";

export const CategoryRoutes = {
    getAllCategories: async () => {
        try{
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.CATEGORY.GET_CATEGORIES);
            if(!response.ok) {
                throw new Error("Failed to get tags");
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error(error);
        }
    }
}