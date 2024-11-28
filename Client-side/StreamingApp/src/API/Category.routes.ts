import { ApiConstants } from "./ApiConstants";

export const CategoryRoutes = {
    getAllCategories: async () => {
        try{
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.CATEGORY.GET_CATEGORIES);
            if(!response.ok) {
                throw new Error("Failed to get categories");
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error(error);
        }
    },
    getCategoryById: async (categoryId: string) => {
        try{
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.CATEGORY.GET_CATEGORIES_BY_ID + categoryId);
            if(!response.ok) {
                throw new Error("Failed to get category with id: " + categoryId);
            }
            const data = await response.json();
            return data;
        }
        catch (error) {
            console.error(error);
        }
    },
}