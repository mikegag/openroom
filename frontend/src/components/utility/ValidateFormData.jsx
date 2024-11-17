// Trim whitespace and Uppercase for each text input, returns formatted form data
export default function validateFormData(data) {
    const sanitizedData = { ...data };
    for (const key in sanitizedData) {
        if (key === 'licenseNumber') {
            // Base Case: User did not include '-', form ensures minimum of 15 characters
            if (sanitizedData[key].trim().length === 15){
                // Format license number as `XXXXX-XXXXX-XXXXX`
                let value = sanitizedData[key].trim()
                sanitizedData[key] = `${value.slice(0, 5)}-${value.slice(5, 10)}-${value.slice(10, 15)}`;
            }
        } // Trim and uppercase strings
        if (typeof sanitizedData[key] === 'string') {
            sanitizedData[key] = sanitizedData[key].trim().toUpperCase();
        } // Ensure integer fields remain integers
        if(key === 'height' || key === 'unitNumber' || key === 'streetNumber' || key === 'id') {
            sanitizedData[key] = parseInt(sanitizedData[key]);
        }
    }
    return sanitizedData;
}