import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Trip } from './trip';
import { GlobalDataService } from './global-data.service';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',"Access-Control-Allow-Origin":"*" })
  };

@Injectable({ providedIn: 'root' })
export class TripService{
    
  private baseUrl;  // URL to web api

  constructor(
    private http: HttpClient, globalService:GlobalDataService) { this.baseUrl=globalService.getApiUrl() }

getTrips (): Observable<Trip[]> {
        return this.http.get<Trip[]>(this.baseUrl+"location",httpOptions);
      }

getTripsByLocationId (id:number): Observable<Trip[]> {
        const url = `${this.baseUrl}/trip/locationId/${id}`;
        return this.http.get<Trip[]>(url,httpOptions);
      }
      getTripDetails (id:number): Observable<Trip> {
        const url = `${this.baseUrl}/trip/${id}`;
        return this.http.get<Trip>(url,httpOptions);
      }
}