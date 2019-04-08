import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { HttpClient } from '@angular/common/http';
import { File } from '@ionic-native/file/ngx';
import { finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { LocationService } from '../location.service';
import { ThemeService } from '../theme.service';
import { TripService } from '../trip.service';
import { GlobalDataService } from '../global-data.service';
var UploadPage = /** @class */ (function () {
    function UploadPage(navCtrl, transfer, camera, file, http, loadingCtrl, toastCtrl, globalService, locationService, themeService, tripService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.transfer = transfer;
        this.camera = camera;
        this.file = file;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.toastCtrl = toastCtrl;
        this.globalService = globalService;
        this.locationService = locationService;
        this.themeService = themeService;
        this.tripService = tripService;
        of(this.getImageType().then(function (res) {
            _this.imageTypes = res;
        }));
    }
    UploadPage.prototype.ngOnInit = function () {
    };
    UploadPage.prototype.getImage = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.imageURI = imageData;
        }, function (err) {
            console.log(err);
            _this.presentToast(err);
        });
    };
    UploadPage.prototype.uploadFile = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loader, fileTransfer, options;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingCtrl.create()];
                    case 1:
                        loader = _a.sent();
                        loader.present();
                        fileTransfer = this.transfer.create();
                        options = {
                            fileKey: 'ionicfile',
                            fileName: 'ionicfile',
                            chunkedMode: false,
                            mimeType: "image/jpeg",
                            headers: {}
                        };
                        fileTransfer.upload(this.imageURI, 'http://localhost:9090/uploadFile', options)
                            .then(function (data) {
                            console.log(data + " Uploaded Successfully");
                            _this.imageFileName = "http://192.168.0.7:8080/static/images/ionicfile.jpg";
                            loader.dismiss();
                            _this.presentToast("Image uploaded successfully");
                        }, function (err) {
                            console.log(err);
                            loader.dismiss();
                            _this.presentToast(err);
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    UploadPage.prototype.presentToast = function (msg) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var toast;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: msg,
                            duration: 3000,
                            position: 'bottom'
                        })];
                    case 1:
                        toast = _a.sent();
                        // toast.onDidDismiss(() => {
                        //   console.log('Dismissed toast');
                        // });
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    UploadPage.prototype.startUpload = function () {
        var _this = this;
        this.file.resolveLocalFilesystemUrl(this.imageURI)
            .then(function (entry) {
            entry.file(function (file) { return _this.readFile(file); });
        })
            .catch(function (err) {
            _this.presentToast('Error while reading file.');
        });
    };
    UploadPage.prototype.readFile = function (file) {
        var _this = this;
        var reader = new FileReader();
        reader.onloadend = function () {
            var formData = new FormData();
            var imgBlob = new Blob([reader.result], {
                type: file.type
            });
            formData.append('file', imgBlob, file.name);
            formData.append('imageType', _this.typeSelected.name);
            formData.append('id', _this.resourceId);
            _this.uploadImageData(formData);
        };
        reader.readAsArrayBuffer(file);
    };
    UploadPage.prototype.uploadImageData = function (formData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var loading;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadingCtrl.create({})];
                    case 1:
                        loading = _a.sent();
                        return [4 /*yield*/, loading.present()];
                    case 2:
                        _a.sent();
                        this.http.post("http://192.168.0.111:9090/uploadFile", formData)
                            .pipe(finalize(function () {
                            loading.dismiss();
                        }))
                            .subscribe(function (res) {
                            if (res['success']) {
                                _this.presentToast('File upload complete.');
                            }
                            else {
                                _this.presentToast('File upload failed.');
                            }
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    UploadPage.prototype.getImageType = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.imageTypes = [{ "id": 1, "name": "trip" }, { "id": 2, "name": "theme" }, { "id": 3, "name": "location" }]];
            });
        });
    };
    UploadPage.prototype.onTypeSelect = function () {
        var _this = this;
        console.log("on changes");
        if (this.typeSelected.name == "trip") {
            this.tripService.getTrips().subscribe(function (res) {
                _this.resources = res;
            });
        }
        else if (this.typeSelected.name == "theme") {
            this.themeService.getThemes().subscribe(function (res) {
                _this.resources = res;
            });
        }
        else if (this.typeSelected.name = "location") {
            this.locationService.getAllLocations().subscribe(function (res) {
                _this.resources = res;
            });
        }
    };
    UploadPage.prototype.onResourceSelect = function () {
        console.log(this.typeSelected);
        if (this.typeSelected.name == "trip") {
            this.resourceId = this.selectedResource.tripId;
        }
        else if (this.typeSelected.name == "theme") {
            this.resourceId = this.selectedResource.themeId;
        }
        else if (this.typeSelected.name = "location") {
            this.resourceId = this.selectedResource.locationId;
        }
    };
    UploadPage = tslib_1.__decorate([
        Component({
            selector: 'app-upload',
            templateUrl: './upload.page.html',
            styleUrls: ['./upload.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [NavController,
            FileTransfer,
            Camera,
            File,
            HttpClient,
            LoadingController,
            ToastController,
            GlobalDataService,
            LocationService, ThemeService, TripService])
    ], UploadPage);
    return UploadPage;
}());
export { UploadPage };
//# sourceMappingURL=upload.page.js.map