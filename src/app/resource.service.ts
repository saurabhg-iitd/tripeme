import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Resource } from "./resource";
import { GlobalDataService } from './global-data.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" })
};

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor( private http: HttpClient,private globalService:GlobalDataService ) {

  }
  getResources(sourceType:string,sourceId:number): Observable<Resource[]> {
    return this.http.get<Resource[]>(this.globalService.getApiUrl()+"resource/"+sourceType+"/"+sourceId, httpOptions);
  }

  getResource(id:number): Observable<Resource> {
    return this.http.get<Resource>(this.globalService.getApiUrl()+"resource/"+id, httpOptions);
  }

  updateResource(resource:Resource):Observable<Resource> {
    return this.http.post<Resource>(this.globalService.getApiUrl()+"resource",resource, httpOptions);
  }

  deleteResource(id:number):Observable<String> {
    const url = `${this.globalService.getApiUrl()}resource/${id}`;
    return this.http.delete<String>(url, this.globalService.getHttpOptions());
  }
}

