import axios, { AxiosResponse } from "axios";
import { ResourceType } from "./EnumSupport";
import { getUserRole, UserRole } from "./authConfig";
import Resource from "../components/modelInterfaces/Resource";

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

  public async editUser(id: number, data: object, profilePicture?: File): Promise<AxiosResponse<any>> {
    try {
      let response;

      if (profilePicture) {
        const formData = new FormData();
        formData.append("user", JSON.stringify(data));
        formData.append("profilePicture", profilePicture);

        response = await axios.put(`${this.baseUrl}tenant/updateUser/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        });
      } else {
        response = await axios.put(`${this.baseUrl}tenant/updateUser/${id}`, data, {
          withCredentials: true,
        });
      }

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

  public async editUserAdmin(id: number, data: object): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.put(`${this.baseUrl}admin/updateTenant/${id}`, data, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error updating user:",
          error.response?.data || error.message
        );
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
      //console.log(resourceTypePath + endPoint);
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

      return await axios.post(
        `${this.baseUrl}${userType}/book-resource`,
        booking,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      throw error;
    }
  }

  public async deleteResource(
    resourceID: number,
    resourceType: ResourceType
  ): Promise<AxiosResponse<any>> {
    try {
      //construct endpoint
      const endpoint = `${
        this.baseUrl
      }${resourceType.toLocaleLowerCase()}/api/resource/${resourceID}`;
      console.log("delete resource:", endpoint);

      //call
      return await axios.delete(endpoint, { withCredentials: true });
    } catch (error) {
      console.error("Error deleting resource:", error);
      throw error;
    }
  }

  public async updateResource(
    resource: Resource,
    resourceType: ResourceType,
    resourceId: number
  ): Promise<AxiosResponse<any>> {
    //NOT WORKING
    try {
      //construct endpoint
      let endpoint = `${
        this.baseUrl
      }${resourceType.toLowerCase()}/update/${resourceId}`;
      console.log("update resource:", endpoint);
      console.log("send resource:", resource);
      console.log("send id:", resourceId);
      //call
      return await axios.put(endpoint, resource, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error updating resource:", error);
      throw error;
    }
  }

  public async deleteBooking(bookingID: number): Promise<AxiosResponse<any>> {
    try {
      //construct endpoint
      const endpoint = `${this.baseUrl}booking/delete/${bookingID}`;
      console.log("delete booking:", endpoint);

      //call
      return await axios.delete(endpoint, { withCredentials: true });
    } catch (error) {
      console.error("Error deleting booking:", error);
      throw error;
    }
  }

  async getAllCaretakerInitials() {
    const endpoint = "caretaker-initials/get-all";
    try {
      const response = await axios.get(this.baseUrl + endpoint, {
        withCredentials: true,
      });
      return response.data.map((item: { initials: string }) => item.initials);
    } catch (error) {
      console.error("Error fetching caretaker initials:", error);
      throw error;
    }
  }

  public async setInitialToBooking(bookingId: number, initials: string) {
    try {
      const response = await axios.post(
        `${this.baseUrl}booking/set-initials/${bookingId}`,
        initials,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error setting initials:", error);
      throw error;
    }
  }

  public async deleteData(endpoint: string): Promise<AxiosResponse<any>> {
    try {
      return await axios.delete(this.baseUrl + endpoint, {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error deleting data:", error);
      throw error;
    }
  }
}

export default new ApiService();
