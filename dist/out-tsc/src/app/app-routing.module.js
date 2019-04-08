import * as tslib_1 from "tslib";
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule } from '@angular/router';
var routes = [
    { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
    { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
    { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
    { path: 'locations', loadChildren: './tab1/tab1.module#Tab1PageModule' },
    // { path: 'trip/location/:id',loadChildren: './trips/trips.module#TripsPageModule'},
    // { path: 'trips', loadChildren: './trips/trips.module#TripsPageModule' },
    // { path: 'trip/:id', loadChildren: './trip-detail/trip-detail.module#TripDetailPageModule' },
    { path: 'theme', loadChildren: './theme/theme.module#ThemePageModule' },
    { path: 'tab4', loadChildren: './tab4/tab4.module#Tab4PageModule' },
    { path: 'create-trip', loadChildren: './create-trip/create-trip.module#CreateTripPageModule' },
    { path: 'upload', loadChildren: './upload/upload.module#UploadPageModule' },
    { path: 'trip-form', loadChildren: './trip-form/trip-form.module#TripFormPageModule' },
    { path: 'trip-form/:id', loadChildren: './trip-form/trip-form.module#TripFormPageModule' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib_1.__decorate([
        NgModule({
            imports: [
                RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
            ],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map