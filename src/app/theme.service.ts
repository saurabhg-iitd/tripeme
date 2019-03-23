import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Theme } from "./theme";
import { GlobalDataService } from './global-data.service';


const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" })
};

@Injectable({ providedIn: 'root' })
export class ThemeService {

    private baseUrl;  // URL to web api

    constructor(
        private http: HttpClient, private globalService: GlobalDataService) { this.baseUrl=globalService.getApiUrl()}

    getThemes(): Observable<Theme[]> {
        return this.http.get<Theme[]>(this.baseUrl+"themes", httpOptions);
    }

    addTheme(theme: Theme): Observable<Theme> {
        return this.http.post<Theme>(this.baseUrl+"theme", theme, httpOptions);
    }
}