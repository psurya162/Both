

export const API_URL = "http://localhost:5000/api/v1";
export const API_URL_1 = "http://localhost:5000/onboard";
export const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};
