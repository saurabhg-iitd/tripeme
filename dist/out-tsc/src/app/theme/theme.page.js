import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { ThemeService } from '../theme.service';
import { AuthenticationService } from '../authentication.service';
var ThemePage = /** @class */ (function () {
    function ThemePage(themeService, auth) {
        this.themeService = themeService;
        this.auth = auth;
    }
    ThemePage.prototype.ngOnInit = function () {
        this.getThemes();
    };
    ThemePage.prototype.getThemes = function () {
        var _this = this;
        this.themeService.getThemes()
            .subscribe(function (themes) { return _this.themes = themes; });
    };
    ThemePage.prototype.add = function (name, description) {
        var _this = this;
        name = name.trim();
        description = description.trim();
        if (!name) {
            return;
        }
        this.themeService.addTheme({ name: name, description: description })
            .subscribe(function (theme) {
            _this.themes.push(theme);
        });
    };
    ThemePage = tslib_1.__decorate([
        Component({
            selector: 'app-theme',
            templateUrl: './theme.page.html',
            styleUrls: ['./theme.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [ThemeService, AuthenticationService])
    ], ThemePage);
    return ThemePage;
}());
export { ThemePage };
//# sourceMappingURL=theme.page.js.map