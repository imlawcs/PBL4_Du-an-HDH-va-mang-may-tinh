import { ApiConstants } from "./ApiConstants";

export const CategoryRoutes = {
    IMAGE_PATH: ApiConstants.BASE_URL,
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
    addNewCategory: async (category: FormData) => {
        const formData = new FormData();
        formData.append('CategoryName', category["CategoryName"] as string);
        formData.append('CategoryDesc', category["CategoryDesc"] as string);
        formData.append('ImagePath', category["ImagePath"] as File);
        try {
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.CATEGORY.GET_CATEGORIES, {
                method: 'POST',
                body: formData
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server response:', errorText);
                return "Failed to add new category";
            }
            
            const data = await response.text();
            return data;
        } catch (error) {
            console.error('Error:', error);
            return "Error occurred while adding category";
        }
    },
    deleteCategory: async (categoryId: string) => {
        try {
            const response = await fetch(ApiConstants.BASE_URL + ApiConstants.CATEGORY.GET_CATEGORIES_BY_ID + categoryId, {
                method: 'DELETE'
            });
            
            if (!response.ok) {
                const errorText = await response.text();
                console.error('Server response:', errorText);
                return "Failed to delete category with id: " + categoryId;
            }
            
            const data = await response.text();
            return data;
        } catch (error) {
            console.error('Error:', error);
            return "Error occurred while deleting category";
        }
    }
}
