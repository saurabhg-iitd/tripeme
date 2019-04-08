import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalDataService } from './global-data.service';
import { AuthenticationService } from './authentication.service';
var httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" })
};
var TripService = /** @class */ (function () {
    function TripService(http, globalService, auth) {
        this.http = http;
        this.auth = auth;
        this.baseUrl = globalService.getApiUrl();
        this.userId = JSON.parse(localStorage.getItem(this.auth.sessionToken)).userId;
    }
    TripService.prototype.getTrips = function () {
        return this.http.get(this.baseUrl + "trip", httpOptions);
    };
    TripService.prototype.getTripsByLocationId = function (id) {
        var url = this.baseUrl + "/trip/locationId/" + id;
        return this.http.get(url, httpOptions);
    };
    TripService.prototype.getTripDetails = function (id) {
        var url = this.baseUrl + "/trip/" + id;
        return this.http.get(url, httpOptions);
    };
    TripService.prototype.bookTrip = function (tripId, numBookings) {
        var url = this.baseUrl + "user/trip";
        var param = { "userId": this.userId, "tripId": tripId, "totalBookings": 2 };
        return this.http.post(url, param, httpOptions);
    };
    TripService.prototype.addTrip = function (trip) {
        var url = this.baseUrl + "trip";
        return this.http.post(url, trip, httpOptions);
    };
    TripService.prototype.updateTrip = function (trip, id) {
        var url = this.baseUrl + "trip/" + id;
        return this.http.put(url, trip, httpOptions);
    };
    TripService = tslib_1.__decorate([
        Injectable({ providedIn: 'root' }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, GlobalDataService, AuthenticationService])
    ], TripService);
    return TripService;
}());
export { TripService };
//# sourceMappingURL=trip.service.js.map