import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Location } from "./location";
import { GlobalDataService } from './global-data.service';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',"Access-Control-Allow-Origin":"*" })
  };

@Injectable({ providedIn: 'root' })
export class LocationService{
    
  private baseUrl;  // URL to web api

  constructor(
    private http: HttpClient, private globalService: GlobalDataService) { this.baseUrl=globalService.getApiUrl()}

getLocations (): Observable<Location[]> {
        return this.http.get<Location[]>(this.baseUrl+"location/trip",httpOptions);
      }
      addLocation(location: Location): Observable<Location> {
        return this.http.post<Location>(this.baseUrl+"location", location, httpOptions);
    }
    
}
