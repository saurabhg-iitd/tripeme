import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GlobalDataService } from './global-data.service';
var httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*" })
};
var ThemeService = /** @class */ (function () {
    function ThemeService(http, globalService) {
        this.http = http;
        this.globalService = globalService;
        this.baseUrl = globalService.getApiUrl();
    }
    ThemeService.prototype.getThemes = function () {
        return this.http.get(this.baseUrl + "themes", httpOptions);
    };
    ThemeService.prototype.addTheme = function (theme) {
        return this.http.post(this.baseUrl + "theme", theme, httpOptions);
    };
    ThemeService = tslib_1.__decorate([
        Injectable({ providedIn: 'root' }),
        tslib_1.__metadata("design:paramtypes", [HttpClient, GlobalDataService])
    ], ThemeService);
    return ThemeService;
}());
export { ThemeService };
//# sourceMappingURL=theme.service.js.map