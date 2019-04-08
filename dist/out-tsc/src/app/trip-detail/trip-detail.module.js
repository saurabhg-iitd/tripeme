import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TripDetailPage } from './trip-detail.page';
var routes = [
    {
        path: '',
        component: TripDetailPage
    }
];
var TripDetailPageModule = /** @class */ (function () {
    function TripDetailPageModule() {
    }
    TripDetailPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [TripDetailPage]
        })
    ], TripDetailPageModule);
    return TripDetailPageModule;
}());
export { TripDetailPageModule };
//# sourceMappingURL=trip-detail.module.js.map