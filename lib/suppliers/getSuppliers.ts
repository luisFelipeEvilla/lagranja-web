export const getSuppliers = async (token: String, startDate: Date, endDate: Date) => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    let queryString = '';

    if (startDate && endDate) queryString = `startDate=${startDate}&endDate=${endDate}`;

    const response = await fetch(`${API_BASE_URL}/suppliers?${queryString}`, {
        headers: {
            Authorization: "Bearer " + token
        }
    })

    const suppliers = await response.json();
    
    return suppliers;
}