import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TripFormPage } from './trip-form.page';
var routes = [
    {
        path: '',
        component: TripFormPage
    }
];
var TripFormPageModule = /** @class */ (function () {
    function TripFormPageModule() {
    }
    TripFormPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                ReactiveFormsModule,
                RouterModule.forChild(routes)
            ],
            declarations: [TripFormPage]
        })
    ], TripFormPageModule);
    return TripFormPageModule;
}());
export { TripFormPageModule };
//# sourceMappingURL=trip-form.module.js.map