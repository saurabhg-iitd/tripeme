import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { UploadPage } from './upload.page';
var routes = [
    {
        path: '',
        component: UploadPage
    }
];
var UploadPageModule = /** @class */ (function () {
    function UploadPageModule() {
    }
    UploadPageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [UploadPage]
        })
    ], UploadPageModule);
    return UploadPageModule;
}());
export { UploadPageModule };
//# sourceMappingURL=upload.module.js.map