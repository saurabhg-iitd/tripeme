import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ThemePage } from './theme.page';
var routes = [
    {
        path: '',
        component: ThemePage
    }
];
var ThemePageModule = /** @class */ (function () {
    function ThemePageModule() {
    }
    ThemePageModule = tslib_1.__decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [ThemePage]
        })
    ], ThemePageModule);
    return ThemePageModule;
}());
export { ThemePageModule };
//# sourceMappingURL=theme.module.js.map