import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { TripService } from '../trip.service';
import { ActivatedRoute } from '@angular/router';
var TripDetailPage = /** @class */ (function () {
    function TripDetailPage(tripService, route) {
        this.tripService = tripService;
        this.route = route;
        this.slideOpts = {
            effect: 'flip'
        };
    }
    TripDetailPage.prototype.ngOnInit = function () {
        this.getTripDetails();
        // throw new Error("Method not implemented.");
    };
    TripDetailPage.prototype.getTripDetails = function () {
        var _this = this;
        var id = +this.route.snapshot.paramMap.get('id');
        this.tripService.getTripDetails(id)
            .subscribe(function (trip) {
            _this.trip = trip;
            console.log(trip);
            console.log(trip.images);
            _this.images = trip.images;
        });
    };
    TripDetailPage.prototype.book = function () {
        var _this = this;
        this.tripService.bookTrip(this.trip.tripId, this.numBookings).subscribe(function (trip) { return _this.trip = trip; });
        ;
    };
    TripDetailPage = tslib_1.__decorate([
        Component({
            selector: 'app-trip-detail',
            templateUrl: './trip-detail.page.html',
            styleUrls: ['./trip-detail.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [TripService, ActivatedRoute])
    ], TripDetailPage);
    return TripDetailPage;
}());
export { TripDetailPage };
//# sourceMappingURL=trip-detail.page.js.map