import axios, { AxiosResponse } from "axios";

enum ResourceType {
    TOOL = 'TOOL',
    UTILITY = 'UTILITY',
    HOSPITALITY = 'HOSPITALITY'
}


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

    public async fetchResources(resourceType: ResourceType): Promise<AxiosResponse<any>> {
        try {
            let endpoint = '';
            switch (resourceType) {
                case ResourceType.TOOL:
                    endpoint = 'tool/get-all';
                    break;
                case ResourceType.UTILITY:
                    endpoint = 'utility/get-all';
                    break;
                case ResourceType.HOSPITALITY:
                    endpoint = 'hospitality/get-all';
                    break;
                default:
                    throw new Error('Unknown resource type');
            }
            return await axios.get<any>(`${this.baseUrl}${endpoint}`, {
                withCredentials: true
            });
        } catch (error) {
            throw error;
        }
    }

    public async fetchTools(): Promise<AxiosResponse<any>> {
        return this.fetchResources(ResourceType.TOOL);
    }

    public async fetchUtilities(): Promise<AxiosResponse<any>> {
        return this.fetchResources(ResourceType.UTILITY);
    }

    public async fetchHospitalities(): Promise<AxiosResponse<any>> {
        return this.fetchResources(ResourceType.HOSPITALITY);
    }
}

export default new ApiService();