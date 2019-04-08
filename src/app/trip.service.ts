import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Trip } from './trip';
import { GlobalDataService } from './global-data.service';
import { AuthenticationService } from './authentication.service';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',"Access-Control-Allow-Origin":"*" })
  };

@Injectable({ providedIn: 'root' })
export class TripService{
    
  private baseUrl;  // URL to web api
  // private userId;

  constructor(
    private http: HttpClient, globalService:GlobalDataService, private auth : AuthenticationService) { 
      this.baseUrl=globalService.getApiUrl();
      // this.userId = JSON.parse(localStorage.getItem(this.auth.sessionToken)).userId;
     }

getTrips (): Observable<Trip[]> {
        return this.http.get<Trip[]>(this.baseUrl+"trip",httpOptions);
      }

     

getTripsByLocationId (id:number): Observable<Trip[]> {
        const url = `${this.baseUrl}/trip/locationId/${id}`;
        return this.http.get<Trip[]>(url,httpOptions);
      }
      getTripDetails (id:number): Observable<Trip> {
        const url = `${this.baseUrl}/trip/${id}`;
        return this.http.get<Trip>(url,httpOptions);
      }

  bookTrip(tripId:number, numBookings: number) : Observable<Trip>{
    const url = `${this.baseUrl}user/trip`;
    // const param = {"userId":this.userId,"tripId":tripId,"totalBookings":2};
    return this.http.post<Trip>(url,"",httpOptions);
  }

  addTrip(trip:Trip):Observable<Trip>{
    const url = `${this.baseUrl}trip`;
    return this.http.post<Trip>(url,trip,httpOptions);

  }

  updateTrip(trip:Trip,id:number):Observable<Trip>{
    const url = `${this.baseUrl}trip/${id}`;
    return this.http.post<Trip>(url,trip,httpOptions);

  }
}