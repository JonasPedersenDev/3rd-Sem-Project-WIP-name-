import axios, { AxiosResponse } from "axios";
import { ResourceType } from "./EnumSupport";
import { getUserRole } from "./authConfig";
import Resource from "../components/modelInterfaces/Resource";

class ApiService {
  private baseUrl: string;

  constructor() {
    // Dev backend url
    this.baseUrl = "http://localhost:8080/api/";
    // Production backend url
    // TBD
  }

  private async makeRequest<T>(
    method: 'get' | 'post' | 'put' | 'delete',
    endpoint: string,
    data?: any
  ): Promise<AxiosResponse<T>> {
    try {
      return await axios.request<T>({
        method,
        url: this.baseUrl + endpoint,
        data,
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  }
  
  public async fetchData<T>(endpoint: string): Promise<AxiosResponse<T>> {
    return this.makeRequest<T>('get', endpoint);
  }
  
  public async sendData<T>(endpoint: string, data?: any): Promise<AxiosResponse<T>> {
    return this.makeRequest<T>('post', endpoint, data);
  }
  
  public async updateData<T>(endpoint: string, data?: any): Promise<AxiosResponse<T>> {
    return this.makeRequest<T>('put', endpoint, data);
  }
  
  public async deleteData<T>(endpoint: string): Promise<AxiosResponse<T>> {
    return this.makeRequest<T>('delete', endpoint);
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

  
  public async editUser(id: number, data: object): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.put(`${this.baseUrl}tenant/${id}`, data, {
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



  public async editUserAdmin(
    id: number,
    data: object
  ): Promise<AxiosResponse<any>> {
    try {
      const response = await axios.put(
        `${this.baseUrl}admin/updateTenant/${id}`,
        data,
        {
          withCredentials: true,
        }
      );
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

  public async bookForTenant(booking: object): Promise<AxiosResponse<any>> {
    try {
      return await axios.post(`${this.baseUrl}admin/book-for-tenant`, booking, {
        withCredentials: true,
      });
    } catch (error) {
      throw error;
    }
  }

  public async deleteTenant(id: number): Promise<AxiosResponse<any>> {
    try {
      const endpoint = `${this.baseUrl}tenant/deleteTenant/${id}`;
      console.log("Deleting tenant:", endpoint);
      return await axios.delete(endpoint, {
        withCredentials: true,
        
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error deleting tenant:",
          error.response?.data || error.message
        );
      } else {
        console.error("Unexpected error:", error);
      }
      throw error;
    }
  }

  public async createResource(
    resource: object,
    img: File,
    resourceType: ResourceType
  ): Promise<AxiosResponse<any>> {
    try {
      //construct endpoint
      const endpoint = `${
        this.baseUrl
      }${resourceType.toLocaleLowerCase()}/create`;
      console.log("create resource endpoint:", endpoint);
      //call
      const formData = new FormData();
      formData.append(resourceType.toLowerCase(), JSON.stringify(resource));
      formData.append("resourcePictures", img);

      for (const pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      return await axios.post(endpoint, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("Error creating resource:", error);
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

public async getAllCaretakerNames(): Promise<AxiosResponse<string[]>> {
  try {
    return await axios.get<string[]>(`${this.baseUrl}admin/getAllCaretakerNames`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Error fetching caretaker names:", error);
    throw error;
  }
}

public async addCaretakerName(caretakerName: string): Promise<AxiosResponse<void>> {
  try {
    return await axios.put(`${this.baseUrl}admin/addCaretakerName`, caretakerName, {
      withCredentials: true,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Error adding caretaker name:", error);
    throw error;
  }
}

public async removeCaretakerName(caretakerName: string): Promise<AxiosResponse<void>> {
  try {
    return await axios.delete(`${this.baseUrl}admin/removeCaretakerName`, {
      data: caretakerName,
      withCredentials: true,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Error removing caretaker name:", error);
    throw error;
  }
}

public async setReceiverName(bookingId: number, receiverName: string): Promise<AxiosResponse<void>> {
  try {
    const endpoint = `${this.baseUrl}booking/${bookingId}/receiver-name`;
    return await axios.put(endpoint, null, {
      params: { receiverName },
      withCredentials: true,
    });
  } catch (error) {
    console.error("Error setting receiver name:", error);
    throw error;
  }
}

public async setHandoverName(bookingId: number, handoverName: string): Promise<AxiosResponse<void>> {
  try {
    const endpoint = `${this.baseUrl}booking/${bookingId}/handover-name`;
    return await axios.put(endpoint, null, {
      params: { handoverName },
      withCredentials: true,
    });
  } catch (error) {
    console.error("Error setting handover name:", error);
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