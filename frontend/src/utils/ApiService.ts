import axios, { AxiosResponse } from "axios";

class ApiService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = "http://localhost:8080/api/";
    }

    public async signUp(details: { user: object, profilePicture?: File }): Promise<AxiosResponse<any>> {
        const formData = new FormData();
        
        formData.append('user', JSON.stringify(details.user));

        if (details.profilePicture) {
            formData.append('profilePicture', details.profilePicture);
        }

        try {
            const response = await axios.post(`${this.baseUrl}tenant/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response;
        }
        catch (error) {
            console.error("Error signing up", error);
            throw error;
        }
    }

    public async login(credentials: { username: string, password: string }): Promise<AxiosResponse<any>> {
        try {
            const response = await axios.post(`${this.baseUrl}login`, credentials, {
                withCredentials: true,
            });
            return response;

        }
        catch (error) {
            throw error;
        }
    }

    public async fetchData<T>(endpoint: string): Promise<AxiosResponse<T>> {
        try {
            return await axios.get<T>(this.baseUrl + endpoint);
        }
        catch (error) {
            throw error;
        }
    }


}

export default new ApiService();