import { ResourceType } from "../../utils/EnumSupport";

export default interface Booking {
    id: number;
    resourceID: number;
    resourceType: ResourceType;
    resourceName: string;
    startDate: Date | null;
    endDate: Date | null;
    pickupTime: string;
    dropoffTime: string;
  }