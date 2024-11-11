import axios, { AxiosResponse } from "axios";
import { ResourceType } from "./EnumSupport";
import { getUserRole, UserRole } from "./authConfig";

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:8080/api/";
  }

  public async fetchData<T>(endpoint: string): Promise<AxiosResponse<T>> {
    try {
      return await axios.get<T>(this.baseUrl + endpoint, {
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  }

  public async editUser(id: number, data: object): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.put(`${this.baseUrl}tenant/${id}`, data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error updating user:", error.response?.data || error.message);
      } else {
        console.error("Unexpected error:", error);
      }
      throw error;
    }
  }

  //JPA 
  public async editData(id: number, data: string): Promise<AxiosResponse<any>> {
    try {
      return await axios.put(`${this.baseUrl}tool/${id}`, data, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error editing user", error);
      throw error;
    }
  }
  

  public async signUp(details: {
    user: object;
    profilePicture?: File;
  }): Promise<AxiosResponse<any>> {
    const formData = new FormData();

    formData.append("user", JSON.stringify(details.user));

    if (details.profilePicture) {
      formData.append("profilePicture", details.profilePicture);
    }

    try {
      const response = await axios.post(
        `${this.baseUrl}tenant/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response;
    } catch (error) {
      console.error("Error signing up", error);
      throw error;
    }
  }

  public async login(credentials: {
    username: string;
    password: string;
  }): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.post(`${this.baseUrl}login`, credentials, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async fetchResources(
    resourceType: ResourceType
  ): Promise<AxiosResponse<any>> {
    try {
      let endpoint = "/get-all";
      return await this.fetchByResourceType(resourceType, endpoint);
    } catch (error) {
      throw error;
    }
  }

  private async fetchByResourceType(
    resourceType: ResourceType,
    endPoint: string
  ): Promise<AxiosResponse<any>> {
    try {
      let resourceTypePath = "";
      switch (resourceType) {
        case ResourceType.TOOL:
          resourceTypePath = "tool";
          break;
        case ResourceType.UTILITY:
          resourceTypePath = "utility";
          break;
        case ResourceType.HOSPITALITY:
          resourceTypePath = "hospitality";
          break;
        default:
          console.error("Unknown resource type:", resourceType);
          throw new Error("Unknown resource type");
      }
      console.log(resourceTypePath + endPoint);
      return await this.fetchData(resourceTypePath + endPoint);
    } catch (error) {
      throw error;
    }
  }

  public async fetchBookings(
    resourceType: ResourceType,
    id: number
  ): Promise<AxiosResponse<any>> {
    try {
      let endpoint = `/${id}/booked-dates`;
      return await this.fetchByResourceType(resourceType, endpoint);
    } catch (error) {
      throw error;
    }
  }

  public async createBooking(booking: object): Promise<AxiosResponse<any>> {
    try {
      let role = getUserRole();
      let userType = role === "ROLE_TENANT" ? "tenant" : "admin";

      return await axios.post(`${this.baseUrl}${userType}/book-resource`, booking, {
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  }

}

export default new ApiService();
