export const prepareFormData = (data: any) => {
    const formData = new FormData();
    // // Handle image data
    // if (data.ImagePath) {
    // try {
    //     const base64Data = data.ImagePath.split(',')[1];
    //     const mimeType = data.ImagePath.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];
    //     const byteString = atob(base64Data);
    //     const ab = new ArrayBuffer(byteString.length);
    //     const ia = new Uint8Array(ab);
        
    //     for (let i = 0; i < byteString.length; i++) {
    //         ia[i] = byteString.charCodeAt(i);
    //     }
        
    //     const blob = new Blob([ab], { type: mimeType });
    //     formData.append('ImageFile', blob, 'image.jpg');
    //     } catch (error) {
    //         console.error('Error processing image:', error);
    //     }
    // }

    // Append other fields
    Object.keys(data).forEach(key => {
        //if (key !== 'ImagePath') {
        formData.append(key, data[key]);
    });
    return formData;
};