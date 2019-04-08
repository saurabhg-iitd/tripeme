import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Destination } from "./destination";
import { GlobalDataService } from './global-data.service';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',"Access-Control-Allow-Origin":"*" })
  };

@Injectable({ providedIn: 'root' })
export class DestinationService{
    
  private baseUrl;  // URL to web api

  constructor(
    private http: HttpClient, private globalService: GlobalDataService) { this.baseUrl=globalService.getApiUrl()}

getTripDestinations (): Observable<Destination[]> {
        return this.http.get<Destination[]>(this.baseUrl+"destination/trip",httpOptions);
      }
      getAllDestinations (): Observable<Destination[]> {
        return this.http.get<Destination[]>(this.baseUrl+"destination",httpOptions);
      }
      addDestination(destination: Destination): Observable<Destination> {
        return this.http.post<Destination>(this.baseUrl+"destination", destination, httpOptions);
    }
    getDestination(id:number): Observable<Destination> {
      return this.http.get<Destination>(this.baseUrl+"destination/"+id,httpOptions);
    }

    updateDestination(destination: Destination,id:number): Observable<Destination> {
      return this.http.post<Destination>(this.baseUrl+"destination/"+id, destination, httpOptions);
  }
    
}
