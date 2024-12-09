const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const apiEndpoints = {
    LOGIN: `${API_BASE_URL}/auth/login`,
    REGISTER: `${API_BASE_URL}/auth/register`,
};

export default apiEndpoints;
