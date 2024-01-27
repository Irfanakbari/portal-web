import useAxiosAuth from "@/lib/hooks/useAxiosAuth";

const API_BASE_URL = process.env.KEYCLOAK_BASE_URL; // Ganti dengan URL API yang sesuai
const REALM = process.env.KEYCLOAK_REALM; // Ganti dengan realm yang sesuai
export const fetchUserAccount = async (): Promise<UserAccount> => {
    try {
        const axiosAuth = useAxiosAuth();
        const response = await axiosAuth.get(`${API_BASE_URL}/realms/${REALM}/account/`);

        return response.data
    } catch (error) {
        throw error;
    }
};

export const fetchUserApplication = async (): Promise<UserAccountApplication[]> => {
    try {
        const axiosAuth = useAxiosAuth();
        const response = await axiosAuth.get(`${API_BASE_URL}/realms/${REALM}/account/application`);

        return response.data
    } catch (error) {
        throw error;
    }
};
