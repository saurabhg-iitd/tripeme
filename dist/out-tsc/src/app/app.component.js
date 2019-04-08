import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { GlobalDataService } from './global-data.service';
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar, authenticationService, router, globalData) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.authenticationService = authenticationService;
        this.router = router;
        this.globalData = globalData;
        this.initializeApp();
    }
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            // this.authenticationService.authenticationState.subscribe(state => {
            //   console.log("state "+state);
            //   if (state) {
            //     this.router.navigate(['locations']);
            //   } else {
            //     this.router.navigate(['login']);
            //   }
            // });
            if (localStorage.getItem(_this.authenticationService.sessionToken) == null || localStorage.getItem(_this.authenticationService.sessionToken) == "") {
                _this.router.navigate(['login']);
            }
        });
    };
    AppComponent = tslib_1.__decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        tslib_1.__metadata("design:paramtypes", [Platform,
            SplashScreen,
            StatusBar,
            AuthenticationService,
            Router,
            GlobalDataService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map