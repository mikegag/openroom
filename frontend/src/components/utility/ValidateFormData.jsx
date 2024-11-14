// Trim whitespace and Uppercase for each text input, returns formatted form data
export default function validateFormData(data) {
    const sanitizedData = { ...data };
    for (const key in sanitizedData) {
        if (key === 'licenseNumber') {
            // Base Case: User did not include '-', form ensures minimum of 15 characters
            if (sanitizedData[key].trim().length === 15){
                let formattedData = sanitizedData[key].trim()
                sanitizedData[key] = formattedData.slice(0,5)+'-'+formattedData.slice(6,11)+'-'+formattedData.slice(12,15)
            }
        }
        if (typeof sanitizedData[key] === 'string') {
            sanitizedData[key] = sanitizedData[key].trim().toUpperCase();
        }
    }
    return sanitizedData;
}