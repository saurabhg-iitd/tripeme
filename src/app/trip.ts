import { Destination } from "./destination";
import { Theme } from "./theme";
import { Image } from "./image";
export class Trip  {
    id:number;
    name:string;
    description:string;
    destination:Destination;
    endDate:Date;
    startDate:Date;
    maxBookings:number;
    theme:Theme;
    cost:number;
    active:boolean;
    videoUrl:string;
    startLocation:string;
    endLocation:string;
    createdOn:Date;
    updatedOn:Date;
    images:Image[];
}