import { ResourceType } from "../../utils/EnumSupport";
import { TimeRange } from "./TimeRange";

export default interface Booking {
    resourceID: number;
    resourceType: ResourceType;
    resourceName: string;
    startDate: Date | null;
    endDate: Date | null;
    pickupTime: TimeRange;
    dropoffTime: TimeRange;
  }