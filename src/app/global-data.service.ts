import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  private admin:boolean;
  private sessionToken:"userSession";


  private apiUrl={
    dev:"http://localhost:9090/"
  }
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',"Access-Control-Allow-Origin":"*" })
  };

  constructor() { }

  getApiUrl(){
    return this.apiUrl.dev;
  }

  getHttpOptions(){
    return this.httpOptions;
  }
  isAdmin(){
    return JSON.parse(localStorage.getItem(this.sessionToken)).admin;

  }
}
