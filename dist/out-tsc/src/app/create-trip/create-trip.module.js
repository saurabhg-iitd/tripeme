import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CreateTripPage } from './create-trip.page';
var routes = [
    {
        path: '',
        component: CreateTripPage
    }
];
var CreateTripPageModule = /** @class */ (function () {
    function CreateTripPageModule() {
    }
    CreateTripPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [CreateTripPage]
        })
    ], CreateTripPageModule);
    return CreateTripPageModule;
}());
export { CreateTripPageModule };
//# sourceMappingURL=create-trip.module.js.map