import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LocationService } from '../location.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
var TabsPage = /** @class */ (function () {
    function TabsPage(locationService, authService, router) {
        this.locationService = locationService;
        this.authService = authService;
        this.router = router;
    }
    TabsPage.prototype.ngOnInit = function () {
        if (localStorage.getItem(this.authService.sessionToken) == null || localStorage.getItem(this.authService.sessionToken) == "") {
            this.router.navigate(['login']);
        }
        else {
            this.isAdmin = JSON.parse(localStorage.getItem(this.authService.sessionToken)).admin;
        }
        // throw new Error("Method not implemented.");
    };
    TabsPage = tslib_1.__decorate([
        Component({
            selector: 'app-tabs',
            templateUrl: 'tabs.page.html',
            styleUrls: ['tabs.page.scss']
        }),
        tslib_1.__metadata("design:paramtypes", [LocationService, AuthenticationService, Router])
    ], TabsPage);
    return TabsPage;
}());
export { TabsPage };
//# sourceMappingURL=tabs.page.js.map