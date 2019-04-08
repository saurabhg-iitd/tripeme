import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LocationService } from '../location.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
var Tab1Page = /** @class */ (function () {
    function Tab1Page(locationService, authService, router) {
        this.locationService = locationService;
        this.authService = authService;
        this.router = router;
    }
    Tab1Page.prototype.ngOnInit = function () {
        if (localStorage.getItem(this.authService.sessionToken) == null || localStorage.getItem(this.authService.sessionToken) == "") {
            this.router.navigate(['login']);
        }
        else {
            this.isAdmin = JSON.parse(localStorage.getItem(this.authService.sessionToken)).admin;
            this.isAdmin = false;
            console.log("admin: " + this.isAdmin);
            this.getLocations();
        }
        // throw new Error("Method not implemented.");
    };
    Tab1Page.prototype.getLocations = function () {
        var _this = this;
        // this.trips=[{id:1,name:"Delhi"}];
        this.locationService.getTripLocations().subscribe(function (locations) { return _this.locations = locations; });
    };
    Tab1Page.prototype.add = function (name, city, state, country) {
        var _this = this;
        name = name.trim();
        city = city.trim();
        state = state.trim();
        country = state.trim();
        if (!name) {
            return;
        }
        this.locationService.addLocation({ name: name, city: city, state: state, country: country })
            .subscribe(function (location) {
            _this.locations.push(location);
        });
    };
    Tab1Page = tslib_1.__decorate([
        Component({
            selector: 'app-tab1',
            templateUrl: 'tab1.page.html',
            styleUrls: ['tab1.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [LocationService, AuthenticationService, Router])
    ], Tab1Page);
    return Tab1Page;
}());
export { Tab1Page };
//# sourceMappingURL=tab1.page.js.map