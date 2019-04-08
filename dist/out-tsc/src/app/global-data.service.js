import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
var GlobalDataService = /** @class */ (function () {
    function GlobalDataService() {
        this.apiUrl = {
            dev: "http://192.168.0.111:9090/"
        };
        this.httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*", "withCredentials": "true" })
        };
    }
    GlobalDataService.prototype.getApiUrl = function () {
        return this.apiUrl.dev;
    };
    GlobalDataService.prototype.getHttpOptions = function () {
        return this.httpOptions;
    };
    GlobalDataService.prototype.isAdmin = function () {
        return JSON.parse(localStorage.getItem(this.sessionToken)).admin;
    };
    GlobalDataService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], GlobalDataService);
    return GlobalDataService;
}());
export { GlobalDataService };
//# sourceMappingURL=global-data.service.js.map