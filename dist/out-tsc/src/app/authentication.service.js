import * as tslib_1 from "tslib";
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { HttpClient } from '@angular/common/http';
import { GlobalDataService } from './global-data.service';
import { Router } from '@angular/router';
var TOKEN_KEY = 'auth-token';
var AuthenticationService = /** @class */ (function () {
    function AuthenticationService(plt, googlePlus, http, globalService, router) {
        this.plt = plt;
        this.googlePlus = googlePlus;
        this.http = http;
        this.globalService = globalService;
        this.router = router;
        this.TOKEN_KEY = 'auth-token';
        this.sessionToken = 'userSession';
        this.authenticationState = new BehaviorSubject(false);
        this.isLoggedIn = false;
        this.baseUrl = globalService.getApiUrl();
        this.httpOptions = globalService.getHttpOptions();
        this.plt.ready().then(function () {
            // this.storage.ready().then(()=>{
            // this.checkToken();
            // });
        });
    }
    AuthenticationService.prototype.checkToken = function () {
        if (localStorage.getItem(this.sessionToken) != null && localStorage.getItem(this.sessionToken) == "") {
            this.authenticationState.next(true);
        }
    };
    AuthenticationService.prototype.googleLogin = function () {
        return this.googlePlus.login({
            'webClientId': '708238941640-2gk1fqo1fpthkpbghpv3500m07g0r1m2.apps.googleusercontent.com'
        }).then(function (res) {
            console.log(res);
        }).catch(function (err) { return console.error(err); });
    };
    AuthenticationService.prototype.login = function () {
        var _this = this;
        return new Observable(function (observer) {
            _this.googlePlus.login({
                'webClientId': '708238941640-2gk1fqo1fpthkpbghpv3500m07g0r1m2.apps.googleusercontent.com'
            }).then(function (res) {
                //  this.res = this.googleLogin();
                //  console.log(this.res);
                // return this.http.post<UserSession>(this.baseUrl+"user/authenticate",this.res);
                console.log(res);
                console.log(res.accessToken);
                console.log(res.idToken);
                console.log(res.serverAuthCode);
                _this.displayName = res.displayName;
                _this.email = res.email;
                _this.familyName = res.familyName;
                _this.givenName = res.givenName;
                _this.userId = res.userId;
                _this.imageUrl = res.imageUrl;
                _this.accessToken = res.accessToken;
                _this.isLoggedIn = true;
                localStorage.setItem('TOKEN_KEY', JSON.stringify(res.accessToken));
                _this.authenticationState.next(true);
                return _this.http.post(_this.baseUrl + "user/authenticate", { "idToken": res.idToken });
                // return this.accessToken;
                // return this.isLoggedIn;
            })
                .catch(function (err) {
                console.error(err);
                return _this.http.post(_this.baseUrl + "user/authenticate", _this.res);
            });
        });
        // this.isLoggedIn = true;
        // localStorage.setItem(TOKEN_KEY, "abc");
        // this.authenticationState.next(true);
        // return this.isLoggedIn;
    };
    AuthenticationService.prototype.logout = function () {
        var _this = this;
        this.googlePlus.logout()
            .then(function (res) {
            localStorage.removeItem(_this.sessionToken);
            _this.router.navigate(["/login"]);
        })
            .catch(function (err) { return console.error(err); });
    };
    AuthenticationService.prototype.isAuthenticated = function () {
        return this.authenticationState.value;
    };
    AuthenticationService.prototype.func = function () {
        var _this = this;
        this.googlePlus.login({
            'webClientId': '708238941640-2gk1fqo1fpthkpbghpv3500m07g0r1m2.apps.googleusercontent.com'
        }).then(function (res) {
            _this.http.post(_this.baseUrl + "user/authenticate", { "idToken": res.idToken }).subscribe(function (x) { return _this.logicPostFuntion(x); }, function (e) { return console.log("error"); }, function () { return console.log("completed"); });
            // this.authenticationState.next(true);
        }).catch(function (err) { return console.error(err); });
    };
    AuthenticationService.prototype.logicPostFuntion = function (us) {
        localStorage.setItem(this.sessionToken, JSON.stringify(us));
        this.router.navigate(["/locations"]);
    };
    AuthenticationService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [Platform, GooglePlus, HttpClient, GlobalDataService, Router])
    ], AuthenticationService);
    return AuthenticationService;
}());
export { AuthenticationService };
//# sourceMappingURL=authentication.service.js.map