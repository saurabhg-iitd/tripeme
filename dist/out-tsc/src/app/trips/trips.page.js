import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TripService } from '../trip.service';
import { ActivatedRoute, Router } from '@angular/router';
var TripsPage = /** @class */ (function () {
    function TripsPage(tripService, route, router) {
        this.tripService = tripService;
        this.route = route;
        this.router = router;
    }
    TripsPage.prototype.ngOnInit = function () {
        this.getTripsByLocation();
        // throw new Error("Method not implemented.");
    };
    TripsPage.prototype.getTripsByLocation = function () {
        var _this = this;
        var id = +this.route.snapshot.paramMap.get('id');
        this.tripService.getTripsByLocationId(id)
            .subscribe(function (trips) { return _this.trips = trips; });
    };
    TripsPage.prototype.tripDetails = function (id) {
        this.router.navigate(["tabs/tab1/trip/" + id]);
    };
    TripsPage = tslib_1.__decorate([
        Component({
            selector: 'app-trips',
            templateUrl: './trips.page.html',
            styleUrls: ['./trips.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [TripService, ActivatedRoute, Router])
    ], TripsPage);
    return TripsPage;
}());
export { TripsPage };
//# sourceMappingURL=trips.page.js.map