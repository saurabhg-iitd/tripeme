import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { LocationService } from '../location.service';
import { ThemeService } from '../theme.service';
import { TripService } from '../trip.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
// @Component({
//   selector: 'app-trip-form',
//   templateUrl: './trip-form.page.html',
//   styleUrls: ['./trip-form.page.scss'],
// })
var TripFormPage = /** @class */ (function () {
    function TripFormPage(formBuilder, locationService, themeService, tripService, route) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.locationService = locationService;
        this.themeService = themeService;
        this.tripService = tripService;
        this.route = route;
        this.tripForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: [''],
            startDate: [''],
            endDate: [''],
            maxBookings: [''],
            location: [''],
            theme: ['']
        });
        var id = +this.route.snapshot.paramMap.get('id');
        this.tripId = id;
        if (id) {
            of(this.tripService.getTripDetails(id)
                .subscribe(function (trip) {
                _this.tripForm.patchValue({
                    name: trip.name,
                    description: trip.description,
                    startDate: trip.startDate,
                    endDate: trip.endDate,
                    maxBookings: trip.maxBookings,
                    location: trip.location,
                    theme: trip.theme
                });
                console.log(trip);
            }));
        }
        of(this.themeService.getThemes().subscribe(function (themes) {
            _this.themes = themes;
            console.log(_this.themes);
            // this.tripForm.controls.theme.patchValue(this.trip.theme);
        }));
        of(this.locationService.getAllLocations().subscribe(function (locations) {
            _this.locations = locations;
            console.log(_this.locations);
            // this.tripForm.controls.location.patchValue(this.trip.location);
            // this.tripForm.get("")
        }));
    }
    TripFormPage.prototype.submitForm = function () {
        this.trip = this.tripForm.value;
        console.log(this.trip);
        if (this.tripId) {
            this.trip.tripId = this.tripId;
            this.updateTrip();
        }
        else {
            this.addTrip();
        }
    };
    TripFormPage.prototype.addTrip = function () {
        var _this = this;
        this.tripService.addTrip(this.trip).subscribe(function (res) {
            _this.trip = res;
        });
    };
    TripFormPage.prototype.updateTrip = function () {
        var _this = this;
        this.tripService.updateTrip(this.trip, this.tripId).subscribe(function (res) {
            _this.trip = res;
        });
    };
    TripFormPage = tslib_1.__decorate([
        Component({
            template: "\n    <form [formGroup]=\"tripForm\" (ngSubmit)=\"submitForm()\">\n      <ion-item>\n        <ion-label>Name</ion-label>\n        <ion-input type=\"text\" formControlName=\"name\"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label>Description</ion-label>\n        <ion-textarea formControlName=\"description\"></ion-textarea>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Start Date</ion-label>\n        <ion-datetime  formControlName=\"startDate\" display-format=\"MMM DD, YYYY HH:mm\"></ion-datetime>\n      </ion-item>\n      <ion-item>\n        <ion-label>End Date</ion-label>\n        <ion-datetime  formControlName=\"endDate\" display-format=\"MMM DD, YYYY HH:mm\"></ion-datetime>\n      </ion-item>\n\n      <ion-item>\n      <ion-label>Max Booking</ion-label>\n      <ion-input type=\"number\"  formControlName=\"maxBookings\"></ion-input>\n      </ion-item>\n      <ion-item>\n        <ion-label>Location</ion-label>\n        <ion-select placeholder=\"Select Location\"   formControlName=\"location\">\n          <ion-select-option   *ngFor=\"let l of locations; let i=index\" [value]=\"locations[i]\">{{locations[i].name}}</ion-select-option> \n        </ion-select>\n      </ion-item>\n      <ion-item>\n        <ion-label>Theme</ion-label>\n        <ion-select placeholder=\"Select Theme\"  formControlName=\"theme\">\n          <ion-select-option   *ngFor=\"let t of themes; let i=index\"  [value]=\"themes[i]\">{{themes[i].name}}</ion-select-option> \n        </ion-select>\n      </ion-item>\n      <button ion-button type=\"submit\" [disabled]=\"!tripForm.valid\">Submit</button>\n    </form>\n  "
        }),
        tslib_1.__metadata("design:paramtypes", [FormBuilder, LocationService, ThemeService, TripService, ActivatedRoute])
    ], TripFormPage);
    return TripFormPage;
}());
export { TripFormPage };
//# sourceMappingURL=trip-form.page.js.map