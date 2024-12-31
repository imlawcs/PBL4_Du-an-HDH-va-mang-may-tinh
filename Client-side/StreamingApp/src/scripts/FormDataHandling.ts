export const prepareFormData = (data: any) => {
    const formData = new FormData();
    // Append other fields
    Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
    });
    return formData;
};