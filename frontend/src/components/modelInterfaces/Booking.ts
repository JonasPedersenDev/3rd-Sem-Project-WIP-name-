import { ResourceType } from "../../utils/EnumSupport";

export default interface Booking {
    id: number;
    resourceId: number;
    resourceType: ResourceType;
    resourceName: string;
    bookStartDate: Date | null;
    bookEndDate: Date | null;
    pickupTime: string;
    dropoffTime: string;
  }