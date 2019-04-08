import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
var AuthGuard = /** @class */ (function () {
    function AuthGuard(auth) {
        this.auth = auth;
    }
    AuthGuard.prototype.canActivate = function () {
        return this.auth.isAuthenticated();
    };
    AuthGuard = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [AuthenticationService])
    ], AuthGuard);
    return AuthGuard;
}());
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map