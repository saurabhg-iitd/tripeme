import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalDataService } from './global-data.service';
var httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" })
};
var LocationService = /** @class */ (function () {
    function LocationService(http, globalService) {
        this.http = http;
        this.globalService = globalService;
        this.baseUrl = globalService.getApiUrl();
    }
    LocationService.prototype.getTripLocations = function () {
        return this.http.get(this.baseUrl + "location/trip", httpOptions);
    };
    LocationService.prototype.getAllLocations = function () {
        return this.http.get(this.baseUrl + "location", httpOptions);
    };
    LocationService.prototype.addLocation = function (location) {
        return this.http.post(this.baseUrl + "location", location, httpOptions);
    };
    LocationService = tslib_1.__decorate([
        Injectable({ providedIn: 'root' }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, GlobalDataService])
    ], LocationService);
    return LocationService;
}());
export { LocationService };
//# sourceMappingURL=location.service.js.map