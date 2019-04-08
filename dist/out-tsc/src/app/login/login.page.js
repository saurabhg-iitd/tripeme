import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
var LoginPage = /** @class */ (function () {
    function LoginPage(authService, router) {
        this.authService = authService;
        this.router = router;
        this.isLoggedIn = false;
    }
    LoginPage.prototype.login = function () {
        // this.isLoggedIn=this.authService.login();
        this.authService.func();
        // this.authService.saveLoginData().subscribe(userSession => this.userSession = userSession);
        // this.router.navigate([`/locations`]);
    };
    LoginPage.prototype.logout = function () {
        this.authService.logout();
    };
    LoginPage.prototype.ngOnInit = function () {
        console.log("logged In:" + this.authService.isLoggedIn);
        if (localStorage.getItem(this.authService.sessionToken) == null || localStorage.getItem(this.authService.sessionToken) == "") {
            this.router.navigate(['login']);
        }
        else {
            this.router.navigate(['']);
        }
    };
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
            providers: [GooglePlus]
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService, Router])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map