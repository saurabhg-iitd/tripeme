import { Location } from "./location";
import { Theme } from "./theme";
export class Trip  {
    tripId:Number;
    location:Location;
    endDate:Date;
    startDate:Date;
    maxBookings:Number;
    theme:Theme;
}