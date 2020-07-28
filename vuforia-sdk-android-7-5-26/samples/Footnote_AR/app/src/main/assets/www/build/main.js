webpackJsonp([9],{

/***/ 114:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__http_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Provider for Authentication
 */
var AuthProvider = /** @class */ (function () {
    /**
     * Constructor
     */
    function AuthProvider(http) {
        this.http = http;
    }
    /**
     * Login
     *
     * Posts Username and Password
     */
    AuthProvider.prototype.login = function (username, password) {
        return this.http.http.post(this.http.url + 'rest/auth/login', {
            email: username,
            password: password
        }, { responseType: "json" });
    };
    /**
     * Register user
     *
     * @param user
     */
    AuthProvider.prototype.register = function (user) {
        return this.http.http.post(this.http.url + 'rest/user/register', user, { responseType: "json" });
    };
    /**
     * Is this token valid?
     * @param token
     */
    AuthProvider.prototype.reauthenticate = function (token) {
        return this.http.http.post(this.http.url + 'rest/auth/checkTokenExpiration', token, { responseType: "json" });
    };
    AuthProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__http_http__["a" /* HttpProvider */]])
    ], AuthProvider);
    return AuthProvider;
}());

//# sourceMappingURL=auth.js.map

/***/ }),

/***/ 115:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavProxyUserGroupService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_placeholder_placeholder__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_FeedPage__ = __webpack_require__(212);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NavProxyUserGroupService = /** @class */ (function () {
    function NavProxyUserGroupService() {
        this._masterNav = null;
        this._detailNav = null;
        this._isOn = false;
    }
    Object.defineProperty(NavProxyUserGroupService.prototype, "masterNav", {
        get: function () {
            return this._masterNav;
        },
        set: function (value) {
            this._masterNav = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavProxyUserGroupService.prototype, "detailNav", {
        get: function () {
            return this._detailNav;
        },
        set: function (value) {
            this._detailNav = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavProxyUserGroupService.prototype, "isOn", {
        get: function () {
            return this._isOn;
        },
        set: function (value) {
            this._isOn = value;
        },
        enumerable: true,
        configurable: true
    });
    NavProxyUserGroupService.prototype.pushDetail = function (page, params) {
        (this.isOn) ?
            this.detailNav.setRoot(page, params) :
            this.masterNav.push(page, params);
    };
    NavProxyUserGroupService.prototype.pushMaster = function (page, params) {
        this.masterNav.push(page, params);
    };
    NavProxyUserGroupService.prototype.onSplitPaneChanged = function (isOn) {
        // set local 'isOn' flag...
        this.isOn = isOn;
        // if the nav controllers have been instantiated...
        if (this.masterNav && this.detailNav) {
            (isOn) ? this.activateSplitView() :
                this.deactivateSplitView();
        }
    };
    NavProxyUserGroupService.prototype.activateSplitView = function () {
        var currentView = this.masterNav.getActive();
        if (currentView != null) {
            if (currentView.component.prototype
                instanceof __WEBPACK_IMPORTED_MODULE_2__pages_FeedPage__["a" /* _FeedPage */]) {
                // if the current view is a 'Detail' page...
                // - remove it from the 'master' nav stack...
                this.masterNav.pop();
                // - and add it to the 'detail' nav stack...
                this.detailNav.setRoot(currentView.component, currentView.data);
            }
        }
    };
    NavProxyUserGroupService.prototype.deactivateSplitView = function () {
        var detailView = this.detailNav.getActive();
        this.detailNav.setRoot(__WEBPACK_IMPORTED_MODULE_1__pages_placeholder_placeholder__["a" /* PlaceholderPage */]);
        if (detailView.component.prototype instanceof __WEBPACK_IMPORTED_MODULE_2__pages_FeedPage__["a" /* _FeedPage */]) {
            // if the current detail view is a 'Detail' page...
            // ...so, not the placeholder page:
            var index = this.masterNav.getViews().length;
            // add it to the master view...
            this.masterNav.insert(index, detailView.component, detailView.data);
        }
    };
    NavProxyUserGroupService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], NavProxyUserGroupService);
    return NavProxyUserGroupService;
}());

//# sourceMappingURL=navProxyUserGroup.service.js.map

/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rest_rest__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__add_info_add_info__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__DetailPage__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_http_http__ = __webpack_require__(32);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Detail page
 *
 * Page which shows the image, the title, the description and the notes
 */
var DetailPage = /** @class */ (function (_super) {
    __extends(DetailPage, _super);
    /**
     * Constructor
     * @param navCtrl
     * @param platform
     * @param params
     * @param viewCtrl
     * @param rest
     * @param http
     * @param modalCtrl
     */
    function DetailPage(navCtrl, platform, params, viewCtrl, rest, http, modalCtrl) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.platform = platform;
        _this.params = params;
        _this.viewCtrl = viewCtrl;
        _this.rest = rest;
        _this.http = http;
        _this.modalCtrl = modalCtrl;
        _this.object = _this.params.get('object');
        _this.usergroupid = _this.params.get('id');
        return _this;
    }
    /**
     * close this window
     */
    DetailPage.prototype.dismiss = function () {
        if (this.platform.is("android") || this.platform.is("ios")) {
            this.navCtrl.pop();
        }
    };
    /**
     * make this row editable
     * @param i
     */
    DetailPage.prototype.edit = function (i) {
        this.object.notes[i].isEditable = true;
    };
    /**
     * Save the editet things to the server
     * @param i
     */
    DetailPage.prototype.done = function (i) {
        this.object.notes[i].isEditable = false;
        var info = this.object.notes[i];
        delete info.isEditable;
        this.rest.editInfo(info).subscribe(function (data) {
            console.log("Info updated!");
        });
    };
    /**
     * Returns the Filepath
     * @param filename
     */
    DetailPage.prototype.getFile = function (filename) {
        return this.http.url + "FileHandlerServlet?filename=" + filename;
    };
    /**
     * Delete Note
     * @param i
     */
    DetailPage.prototype.delete = function (i) {
        this.object.notes[i].isEditable = false;
        var info = this.object.notes[i];
        delete info.isEditable;
        this.object.notes.splice(i, 1);
        this.rest.deleteInfo(this.object).subscribe(function (data) {
            console.log("gelöscht");
        });
    };
    /**
     * Open the add Note
     * @param i
     */
    DetailPage.prototype.addNote = function (i) {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__add_info_add_info__["a" /* AddInfoPage */], { info: this.object, id: this.usergroupid });
        modal.onDidDismiss(function (data) {
        });
        modal.present();
        console.log("add Note");
    };
    /**
     * Returns the imagepath
     * @param image
     */
    DetailPage.prototype.getImage = function (image) {
        return this.http.url + "FileHandlerServlet?filename=" + image;
    };
    DetailPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-detail',template:/*ion-inline-start:"D:\Diplomarbeit\footnote_31_01\Footnote\footnote_client\src\pages\detail\detail.html"*/'<!--\n\n  Detail page. Notes can be added, edited and deleded.\n\n-->\n\n<ion-header>\n\n  <ion-toolbar>\n\n    <ion-buttons start>\n\n      <button ion-button ion-button (click)="dismiss()">\n\n        <span ion-text color="primary" showWhen="ios">Cancel</span>\n\n        <ion-icon name="md-close" showWhen="android"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n    <ion-title>\n\n      Notizen {{object.name}}\n\n    </ion-title>\n\n  </ion-toolbar>\n\n</ion-header>\n\n<ion-content>\n\n  <ion-list>\n\n    <ion-item>\n\n      <ion-thumbnail slot="start">\n\n        <img-loader [src]="getImage(object.image)" useImg></img-loader>\n\n      </ion-thumbnail>\n\n    </ion-item>\n\n    <ion-item>\n\n      <b>Beschreibung:</b>\n\n      <p [innerHTML]="object.description"></p>\n\n    </ion-item>\n\n    <ion-item text-wrap>\n\n      <b>Notizen:</b>\n\n      <div *ngFor="let in of object.notes; let i = index">\n\n        <div *ngIf=\'!in.isEditable\' [innerHTML]="in.content"></div>\n\n        <div *ngIf=\'in.isEditable\'>\n\n          <quill-editor [(ngModel)]="in.content"></quill-editor>\n\n        </div>\n\n        <div *ngFor="let file of in.files.split(\';\'); let i = index">\n\n          <a [attr.href]="getFile(file)">{{file}}</a>\n\n        </div>\n\n        <button ion-button round icon-only (click)="delete(i)">\n\n          <ion-icon md-name="delete"></ion-icon>\n\n        </button>\n\n        <button ion-button round icon-only *ngIf=\'!in.isEditable\' (click)="edit(i)">\n\n          <ion-icon md-name="edit"></ion-icon>\n\n        </button>\n\n        <button ion-button round icon-only *ngIf=\'in.isEditable\' (click)="done(i)">\n\n          <ion-icon md-name="done"></ion-icon>\n\n        </button>\n\n      </div>\n\n    </ion-item>\n\n    <ion-item>\n\n      <button ion-button round color="primary" (click)="addNote(i)">\n\n        <ion-icon md-name="note_add"></ion-icon>Notiz hinzufügen\n\n      </button>\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Diplomarbeit\footnote_31_01\Footnote\footnote_client\src\pages\detail\detail.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_rest_rest__["a" /* RestProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_http_http__["a" /* HttpProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]])
    ], DetailPage);
    return DetailPage;
}(__WEBPACK_IMPORTED_MODULE_4__DetailPage__["a" /* _DetailPage */]));

//# sourceMappingURL=detail.js.map

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ts_md5_dist_md5__ = __webpack_require__(314);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ts_md5_dist_md5___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_ts_md5_dist_md5__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_http_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var RegisterPage = /** @class */ (function () {
    function RegisterPage(navCtrl, navParams, loadingCtrl, auth, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.auth = auth;
        this.http = http;
        this.email = "";
        this.password1 = "";
        this.password2 = "";
        this.firstname = "";
        this.lastname = "";
        this.salt = "salt";
    }
    /**
     * Register User
     */
    RegisterPage.prototype.register = function () {
        var _this = this;
        if (this.validateEmail(this.email) && this.password1 == this.password2) {
            var passwordhash = __WEBPACK_IMPORTED_MODULE_0_ts_md5_dist_md5__["Md5"].hashStr(this.password1 + this.salt);
            var user = { "firstname": this.firstname, "lastname": this.lastname, "email": this.email, "passwordhash": passwordhash, "passwordsalt": this.salt, "mobile": "068181", "role": "USER" };
            this.auth.register(user).subscribe(function (objects) {
                _this.http.presentToast("Registrierung erfolgreich! Bitte Aktivierungslink in E-Mail klicken!");
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
            });
        }
        else {
            this.http.presentToast("E-Mail oder Passwort ist falsch!");
        }
    };
    /**
     * check this email
     */
    RegisterPage.prototype.validateEmail = function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    RegisterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-register',template:/*ion-inline-start:"D:\Diplomarbeit\footnote_31_01\Footnote\footnote_client\src\pages\register\register.html"*/'<ion-content padding class="animated fadeIn login auth-page">\n\n  <div class="login-content">\n\n    <ion-grid>\n\n      <div padding-horizontal text-center class="animated fadeInDown">\n\n        <div class="logo"><img src="../../assets/imgs/logo.png" height="50px"></div>\n\n        <h2 ion-text class="text-primary">\n\n          <strong>Footnote</strong> Login\n\n        </h2>\n\n      </div>\n\n      <ion-row justify-content-center>\n\n        <ion-col align-self-center size-md="6" size-lg="5" size-xs="12">\n\n          <!-- Login form -->\n\n          <form class="list-form" name="login">\n\n            <ion-item>\n\n              <ion-label floating>\n\n                <ion-icon name="vname" item-start class="text-primary"></ion-icon>\n\n                Vorname\n\n              </ion-label>\n\n              <ion-input name="vname" type="text" [(ngModel)]=\'firstname\'></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n              <ion-label floating>\n\n                <ion-icon name="nname" item-start class="text-primary"></ion-icon>\n\n                Nachname\n\n              </ion-label>\n\n              <ion-input name="nname" type="text" [(ngModel)]=\'lastname\'></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n              <ion-label floating>\n\n                <ion-icon name="mail" item-start class="text-primary"></ion-icon>\n\n                Email\n\n              </ion-label>\n\n              <ion-input name="email" type="email" [(ngModel)]=\'email\'></ion-input>\n\n            </ion-item>\n\n\n\n            <ion-item>\n\n              <ion-label floating>\n\n                <ion-icon name="lock" item-start class="text-primary"></ion-icon>\n\n                Password\n\n              </ion-label>\n\n              <ion-input name="password1" type="password" [(ngModel)]=\'password1\'></ion-input>\n\n            </ion-item>\n\n\n\n            <ion-item>\n\n              <ion-label floating>\n\n                <ion-icon name="lock" item-start class="text-primary"></ion-icon>\n\n                Password wiederholen\n\n              </ion-label>\n\n              <ion-input name="password2" type="password" [(ngModel)]=\'password2\'></ion-input>\n\n            </ion-item>\n\n          </form>\n\n\n\n          <div>\n\n            <button ion-button icon-start block color="dark" tappable (click)="register()">\n\n              <ion-icon name="log-in"></ion-icon>\n\n              Registrieren\n\n            </button>\n\n\n\n          </div>\n\n\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n\n\n\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Diplomarbeit\footnote_31_01\Footnote\footnote_client\src\pages\register\register.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_4__providers_auth_auth__["a" /* AuthProvider */], __WEBPACK_IMPORTED_MODULE_1__providers_http_http__["a" /* HttpProvider */]])
    ], RegisterPage);
    return RegisterPage;
}());

//# sourceMappingURL=register.js.map

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MasterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rest_rest__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__detail_detail__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__add_object_add_object__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_http_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__MasterPage__ = __webpack_require__(315);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_navProxy_service__ = __webpack_require__(67);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Page for overview over object
 */
var MasterPage = /** @class */ (function (_super) {
    __extends(MasterPage, _super);
    function MasterPage(modalCtrl, params, navCtrl, rest, app, platform, http, navProxy) {
        var _this = _super.call(this) || this;
        _this.modalCtrl = modalCtrl;
        _this.params = params;
        _this.navCtrl = navCtrl;
        _this.rest = rest;
        _this.app = app;
        _this.platform = platform;
        _this.http = http;
        _this.navProxy = navProxy;
        _this.isAndroid = false;
        _this.usergroupid = _this.params.get('id');
        return _this;
    }
    /**
     * Open the detail page
     * @param i
     */
    MasterPage.prototype.openModal = function (i) {
        this.navProxy.pushDetail(__WEBPACK_IMPORTED_MODULE_3__detail_detail__["a" /* DetailPage */], { object: this.objects[i], id: this.usergroupid });
    };
    MasterPage.prototype.ionViewDidLoad = function () {
        this.isAndroid = this.platform.is('android');
    };
    MasterPage.prototype.ionViewWillEnter = function () {
        if (this.usergroupid == undefined || this.usergroupid == 0) {
            this.getObjects();
        }
        else {
            this.getObjectsperUserGroup(this.usergroupid);
        }
        this.http.presentToast("Objekte geladen!");
    };
    /**
     * get Users by User Group
     * @param usergroupid
     */
    MasterPage.prototype.getObjectsperUserGroup = function (usergroupid) {
        var _this = this;
        this.rest.getObjectsPerFeed(usergroupid)
            .subscribe(function (objects) {
            _this.setObjects(objects);
        }, function (error) { _this.objects = []; _this.errorMessage = error; });
    };
    /**
     * Set the objects
     * @param objects
     */
    MasterPage.prototype.setObjects = function (objects) {
        debugger;
        this.objects = objects;
        this.objectsToShow = objects;
    };
    /**
     * get the Objects from the server
     */
    MasterPage.prototype.getObjects = function () {
        var _this = this;
        this.rest.getObjects()
            .subscribe(function (objects) {
            _this.setObjects(objects);
        }, function (error) { _this.objects = []; _this.errorMessage = error; });
    };
    /**
     * Search throug the list of objects
     * @param ev
     */
    MasterPage.prototype.filterItems = function (ev) {
        var val = ev.target.value;
        if (val && val.trim() !== '') {
            this.objectsToShow = this.objects.filter(function (item) {
                return item.name.toLowerCase().includes(val.toLowerCase());
            });
        }
        else {
            this.objectsToShow = this.objects;
        }
    };
    /**
     * Insert New Object
     */
    MasterPage.prototype.addObject = function () {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__add_object_add_object__["a" /* AddObjectPage */], { "id": this.usergroupid });
        modal.onDidDismiss(function (data) {
            _this.getObjects();
        });
        modal.present();
    };
    /**
     * Returns the Imagepath
     * @param image
     */
    MasterPage.prototype.getImage = function (image) {
        return this.http.url + "FileHandlerServlet?filename=" + image;
    };
    /**
     * make this row editable
     * @param i
     */
    MasterPage.prototype.edit = function (i) {
        this.objectsToShow[i].isEditable = true;
    };
    /**
     * Save the edited things to the server
     * @param i
     */
    MasterPage.prototype.done = function (i) {
        var _this = this;
        this.objectsToShow[i].isEditable = false;
        var objects = this.objects[i];
        delete this.objectsToShow[i].isEditable;
        this.rest.editObject(objects).subscribe(function (data) {
            _this.http.presentToast("Objekt erfolgreich bearbeitet!");
        });
    };
    /**
     * Delete Objekt
     * @param i
     */
    MasterPage.prototype.delete = function (i) {
        var _this = this;
        this.objects[i].isEditable = false;
        this.rest.deleteObject(this.objects[i].id).subscribe(function (data) {
            _this.http.presentToast("gelöscht");
            _this.getObjects();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], MasterPage.prototype, "_content", void 0);
    MasterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-master',template:/*ion-inline-start:"D:\Diplomarbeit\footnote_31_01\Footnote\footnote_client\src\pages\master\master.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <button ion-button menuToggle>\n\n      <ion-icon name="menu"></ion-icon>\n\n    </button>\n\n    <ion-title>Footnote\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-searchbar placeholder="Suchen" showCancelButton color="danger" (ionInput)="filterItems($event)"></ion-searchbar>\n\n  <div *ngIf="objectsToShow==[]">Es können derzeit keine Objekte angezeigt werden.</div>\n\n  <ion-list>\n\n    <ion-item *ngFor="let object of objectsToShow; let i = index">\n\n      <div (click)="openModal(i)">\n\n        <ion-avatar item-start>\n\n          <img-loader [src]="getImage(object.image)" useImg></img-loader>\n\n        </ion-avatar>\n\n        <b>{{object.name}}</b><br>\n\n        <span [innerHTML]="object.description"></span>\n\n      </div>\n\n      <div *ngIf="object.isEditable">\n\n        <input [(ngModel)]="object.name">\n\n        <quill-editor [(ngModel)]="object.description">\n\n          <div quill-editor-toolbar>\n\n            <span class="ql-formats">\n\n              <button class="ql-bold" [title]="\'Bold\'"></button>\n\n            </span>\n\n            <span class="ql-formats">\n\n              <button class="ql-italic" [title]="\'Italic\'"></button>\n\n            </span>\n\n            <span class="ql-formats">\n\n              <button class="ql-underline" [title]="\'Underline\'"></button>\n\n            </span>\n\n          </div>\n\n        </quill-editor>\n\n      </div>\n\n      <button ion-button round icon-only (click)="delete(i)">\n\n        <ion-icon md-name="delete"></ion-icon>\n\n      </button>\n\n      <button *ngIf="!object.isEditable" ion-button round icon-only (click)="edit(i)">\n\n        <ion-icon md-name="edit"></ion-icon>\n\n      </button>\n\n      <button *ngIf="object.isEditable" ion-button round icon-only (click)="done(i)">\n\n        <ion-icon md-name="done"></ion-icon>\n\n      </button>\n\n    </ion-item>\n\n    <ion-item>\n\n      <button ion-button round color="primary" (click)="addObject()">\n\n        <ion-icon md-name="note_add"></ion-icon>Objekt hinzufügen\n\n      </button>\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Diplomarbeit\footnote_31_01\Footnote\footnote_client\src\pages\master\master.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_rest_rest__["a" /* RestProvider */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_5__providers_http_http__["a" /* HttpProvider */], __WEBPACK_IMPORTED_MODULE_7__services_navProxy_service__["a" /* NavProxyService */]])
    ], MasterPage);
    return MasterPage;
}(__WEBPACK_IMPORTED_MODULE_6__MasterPage__["a" /* _MasterPage */]));

//# sourceMappingURL=master.js.map

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserGroupSplitPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_navProxyUserGroup_service__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__placeholder_placeholder__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_group_user_group__ = __webpack_require__(146);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * UserGroupSlitPage
 */
var UserGroupSplitPage = /** @class */ (function () {
    function UserGroupSplitPage(navCtrl, platform, navProxy) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.navProxy = navProxy;
        platform.ready().then(function () {
            // Add our nav controllers to
            // the nav proxy service...
            navProxy.masterNav = _this.masterNav;
            navProxy.detailNav = _this.detailNav;
            // set initial pages for
            // our nav controllers...
            _this.masterNav.setRoot(__WEBPACK_IMPORTED_MODULE_4__user_group_user_group__["a" /* UserGroupPage */], { detailNavCtrl: _this.detailNav });
            _this.detailNav.setRoot(__WEBPACK_IMPORTED_MODULE_3__placeholder_placeholder__["a" /* PlaceholderPage */]);
        });
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('detailNav'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
    ], UserGroupSplitPage.prototype, "detailNav", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('masterNav'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
    ], UserGroupSplitPage.prototype, "masterNav", void 0);
    UserGroupSplitPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-user-group-split',template:/*ion-inline-start:"D:\Diplomarbeit\footnote_31_01\Footnote\footnote_client\src\pages\user-group-split\user-group-split.html"*/'<ion-split-pane (ionChange)="navProxy.onSplitPaneChanged($event._visible)">\n  <ion-nav [root]="userGroupPage" #masterNav>\n  </ion-nav>\n  <ion-nav [root]="FeedPage" #detailNav main>\n  </ion-nav>\n</ion-split-pane>\n'/*ion-inline-end:"D:\Diplomarbeit\footnote_31_01\Footnote\footnote_client\src\pages\user-group-split\user-group-split.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__services_navProxyUserGroup_service__["a" /* NavProxyUserGroupService */]])
    ], UserGroupSplitPage);
    return UserGroupSplitPage;
}());

//# sourceMappingURL=user-group-split.js.map

/***/ }),

/***/ 146:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserGroupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__UserGroupPage__ = __webpack_require__(317);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__feed_feed__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_navProxyUserGroup_service__ = __webpack_require__(115);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Choose Usergroup
 */
var UserGroupPage = /** @class */ (function (_super) {
    __extends(UserGroupPage, _super);
    function UserGroupPage(navCtrl, navParams, rest, navProxy) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.navParams = navParams;
        _this.rest = rest;
        _this.navProxy = navProxy;
        return _this;
    }
    UserGroupPage.prototype.ionViewDidEnter = function () {
        this.getUserGroups();
    };
    UserGroupPage.prototype.ionicViewDidLoad = function () {
        this.getUserGroups();
    };
    UserGroupPage.prototype.getUserGroups = function () {
        var _this = this;
        var id = localStorage.getItem("id");
        this.rest.getUserGroups(id).subscribe(function (data) {
            _this.userGroups = data;
        });
    };
    UserGroupPage.prototype.openModal = function (i) {
        this.navProxy.pushDetail(__WEBPACK_IMPORTED_MODULE_4__feed_feed__["a" /* FeedPage */], { object: this.userGroups[i] });
        //this.navCtrl.push(DetailPage, { object: this.objects[i] });
    };
    UserGroupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-user-group',template:/*ion-inline-start:"D:\Diplomarbeit\footnote_31_01\Footnote\footnote_client\src\pages\user-group\user-group.html"*/'<!--\n  Generated template for the UserGroupPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Benutzergruppen</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n    <ion-item *ngFor="let userGroup of userGroups; let i = index">\n      <div (click)="openModal(i)">\n        {{userGroup.name}}\n        <p>{{userGroup.description}}</p>\n      </div>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"D:\Diplomarbeit\footnote_31_01\Footnote\footnote_client\src\pages\user-group\user-group.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__["a" /* RestProvider */], __WEBPACK_IMPORTED_MODULE_5__services_navProxyUserGroup_service__["a" /* NavProxyUserGroupService */]])
    ], UserGroupPage);
    return UserGroupPage;
}(__WEBPACK_IMPORTED_MODULE_2__UserGroupPage__["a" /* _UserGroupPage */]));

//# sourceMappingURL=user-group.js.map

/***/ }),

/***/ 147:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FeedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__FeedPage__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_home__ = __webpack_require__(77);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Page to choose Feed
 */
var FeedPage = /** @class */ (function (_super) {
    __extends(FeedPage, _super);
    /**
     * Constructor
     * @param navCtrl
     * @param params
     * @param rest
     */
    function FeedPage(navCtrl, params, rest) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.params = params;
        _this.rest = rest;
        _this.usergroup = _this.params.get('object');
        return _this;
    }
    FeedPage.prototype.ionViewDidEnter = function () {
        this.getUserGroups();
    };
    FeedPage.prototype.ionicViewDidLoad = function () {
        this.getUserGroups();
    };
    FeedPage.prototype.getUserGroups = function () {
        var _this = this;
        var id = this.usergroup.id;
        this.rest.getUserGroupFeeds(id).subscribe(function (data) {
            _this.feeds = data;
        });
    };
    FeedPage.prototype.openModal = function (i) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__home_home__["a" /* HomePage */], { id: this.feeds[i].id });
    };
    FeedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-feed',template:/*ion-inline-start:"D:\Diplomarbeit\footnote_31_01\Footnote\footnote_client\src\pages\feed\feed.html"*/'<!--\n  Generated template for the FeedPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Feed</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n    <ion-item *ngFor="let feed of feeds; let i = index">\n      <div (click)="openModal(i)">\n        {{feed.description}}\n      </div>\n    </ion-item>\n  </ion-list>\n</ion-content>\n'/*ion-inline-end:"D:\Diplomarbeit\footnote_31_01\Footnote\footnote_client\src\pages\feed\feed.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_rest_rest__["a" /* RestProvider */]])
    ], FeedPage);
    return FeedPage;
}(__WEBPACK_IMPORTED_MODULE_2__FeedPage__["a" /* _FeedPage */]));

//# sourceMappingURL=feed.js.map

/***/ }),

/***/ 157:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 157;

/***/ }),

/***/ 201:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/detail/detail.module": [
		446,
		2
	],
	"../pages/dialog/dialog.module": [
		447,
		1
	],
	"../pages/feed/feed.module": [
		448,
		8
	],
	"../pages/home/home.module": [
		449,
		0
	],
	"../pages/master/master.module": [
		451,
		7
	],
	"../pages/placeholder/placeholder.module": [
		453,
		6
	],
	"../pages/register/register.module": [
		450,
		5
	],
	"../pages/user-group-split/user-group-split.module": [
		452,
		4
	],
	"../pages/user-group/user-group.module": [
		454,
		3
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 201;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpAngularProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_fromPromise__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_fromPromise__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Provider with Angular-HttpClient
 */
var HttpAngularProvider = /** @class */ (function () {
    function HttpAngularProvider(http) {
        this.http = http;
    }
    HttpAngularProvider.prototype.get = function (url, params, options) {
        if (options === void 0) { options = {}; }
        return this.http.get(url, options);
    };
    HttpAngularProvider.prototype.post = function (url, params, options) {
        if (options === void 0) { options = {}; }
        return this.http.post(url, params, options);
    };
    HttpAngularProvider.prototype.put = function (url, params, options) {
        if (options === void 0) { options = {}; }
        return this.http.put(url, params, options);
    };
    HttpAngularProvider.prototype.delete = function (url, params, options) {
        if (options === void 0) { options = {}; }
        return this.http.delete(url, options);
    };
    HttpAngularProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */]])
    ], HttpAngularProvider);
    return HttpAngularProvider;
}());

//# sourceMappingURL=http-angular.js.map

/***/ }),

/***/ 205:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpNativeProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_http__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_fromPromise__ = __webpack_require__(204);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_observable_fromPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_auth_auth_service__ = __webpack_require__(65);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Provider with Http-Native-Plugin
 */
var HttpNativeProvider = /** @class */ (function () {
    function HttpNativeProvider(http, auth) {
        this.http = http;
        this.auth = auth;
    }
    HttpNativeProvider.prototype.get = function (url, params, options) {
        if (options === void 0) { options = {}; }
        //this.http.setDataSerializer('json');
        var responseData = this.http.get(url, params, this.getToken(url))
            .then(function (resp) { return options.responseType == 'text' ? resp.data : JSON.parse(resp.data); }, function (err) { return console.log(err); });
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromPromise(responseData);
    };
    HttpNativeProvider.prototype.post = function (url, params, options) {
        if (options === void 0) { options = {}; }
        if (!url.includes("FileHandlerServlet")) {
            this.http.setDataSerializer('json');
            var responseData = this.http.post(url, params, this.getToken(url))
                .then(function (resp) {
                return options.responseType == 'text' ? resp.data : JSON.parse(resp.data);
            }, function (err) { return console.log(err); });
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromPromise(responseData);
        }
        else {
            this.http.setDataSerializer('utf8');
            var responseData = this.http.post(url, params, { 'Authorization': 'Bearer ' + this.auth.getToken() }).then(function (resp) {
                return options.responseType == 'text' ? resp.data : JSON.parse(resp.data);
            }, function (err) { return console.log(err); });
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromPromise(responseData);
        }
    };
    HttpNativeProvider.prototype.put = function (url, params, options) {
        if (options === void 0) { options = {}; }
        this.http.setDataSerializer('json');
        var responseData = this.http.put(url, params, this.getToken(url))
            .then(function (resp) {
            return options.responseType == 'text' ? resp.data : JSON.parse(resp.data);
        }, function (err) { return console.log(err); });
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromPromise(responseData);
    };
    HttpNativeProvider.prototype.delete = function (url, params, options) {
        if (options === void 0) { options = {}; }
        this.http.setDataSerializer('json');
        var responseData = this.http.delete(url, params, this.getToken(url))
            .then(function (resp) { return options.responseType == 'text' ? resp.data : JSON.parse(resp.data); }, function (err) { return console.log(err); });
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].fromPromise(responseData);
    };
    HttpNativeProvider.prototype.getToken = function (url) {
        if (this.auth.getToken() != null && !url.includes("rest/auth") && !url.includes("rest/json") && !url.includes("rest/user/register")) {
            return { "Authorization": "Bearer " + this.auth.getToken() };
        }
        else {
            return {};
        }
    };
    HttpNativeProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_http__["a" /* HTTP */], __WEBPACK_IMPORTED_MODULE_4__pages_auth_auth_service__["a" /* AuthService */]])
    ], HttpNativeProvider);
    return HttpNativeProvider;
}());

//# sourceMappingURL=http-native.js.map

/***/ }),

/***/ 209:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddObjectPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_rest_rest__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__dialog_dialog__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_http_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__DetailPage__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__tabs_tabs__ = __webpack_require__(56);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Page to add Objects
 */
var AddObjectPage = /** @class */ (function (_super) {
    __extends(AddObjectPage, _super);
    /**
     * Constructor
     * @param camera
     * @param geolocation
     * @param navCtrl
     * @param params
     * @param http
     * @param rest
     * @param viewCtrl
     * @param modalCtrl
     */
    function AddObjectPage(geolocation, navCtrl, params, http, rest, viewCtrl, modalCtrl, platform) {
        var _this = _super.call(this) || this;
        _this.geolocation = geolocation;
        _this.navCtrl = navCtrl;
        _this.params = params;
        _this.http = http;
        _this.rest = rest;
        _this.viewCtrl = viewCtrl;
        _this.modalCtrl = modalCtrl;
        _this.platform = platform;
        _this.usergroupid = { "id": _this.params.get('id') };
        _this.platform.ready().then(function () {
            _this.geolocation.getCurrentPosition().then(function (resp) {
                _this.lat = resp.coords.latitude;
                _this.long = resp.coords.longitude;
            }).catch(function (error) {
                console.log('Error getting location', error);
            });
            var watch = _this.geolocation.watchPosition();
            watch.subscribe(function (data) {
                _this.lat = data.coords.latitude;
                _this.long = data.coords.longitude;
            });
        });
        return _this;
    }
    /**
     * Save Info
     */
    AddObjectPage.prototype.done = function () {
        var obj;
        obj = { "name": this.newContent, "description": this.detail, "longitude": this.long, "latitude": this.lat };
        this.insertObject(obj);
    };
    /**
     * insert Object
     *
     * If insert was sucessful then open a Dialog-Page for uploading a Image
     * @param obj
     */
    AddObjectPage.prototype.insertObject = function (obj) {
        var _this = this;
        this.rest.insertObject(obj).subscribe(function (data) {
            console.log("Object inserted!" + data + "id:" + data.id);
            _this.http.presentToast("Objekt gespeichert!");
            _this.openUploadDialog(data.id);
        }, function (err) {
            _this.http.presentToast("Error");
        });
    };
    /**
     * close this window
     */
    AddObjectPage.prototype.dismiss = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__tabs_tabs__["a" /* TabsPage */], this.usergroupid);
    };
    /**
     * Open the File Upload Window
     */
    AddObjectPage.prototype.openUploadDialog = function (id) {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_4__dialog_dialog__["a" /* DialogPage */], { id: id, typ: "realobjectid", usergroupid: this.usergroupid.id }, {});
        modal.onDidDismiss(function (data) {
            _this.dismiss();
        });
        modal.present();
    };
    AddObjectPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-add-object',template:/*ion-inline-start:"D:\Diplomarbeit\footnote_31_01\Footnote\footnote_client\src\pages\add-object\add-object.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Objekt hinzufügen</ion-title>\n\n    <ion-buttons start>\n\n      <button ion-button ion-button (click)="dismiss()">\n\n        <span ion-text color="primary" showWhen="ios">Cancel</span>\n\n        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-item>\n\n    <ion-label color="primary" stacked>Objekt</ion-label>\n\n    <ion-input type="text" [(ngModel)]="newContent"></ion-input>\n\n  </ion-item>\n\n  <quill-editor [(ngModel)]="detail"></quill-editor>\n\n  <button ion-button round icon-only (click)="done()">\n\n    <ion-icon md-name="done"></ion-icon>\n\n  </button>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Diplomarbeit\footnote_31_01\Footnote\footnote_client\src\pages\add-object\add-object.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__providers_http_http__["a" /* HttpProvider */], __WEBPACK_IMPORTED_MODULE_1__providers_rest_rest__["a" /* RestProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* ModalController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["l" /* Platform */]])
    ], AddObjectPage);
    return AddObjectPage;
}(__WEBPACK_IMPORTED_MODULE_6__DetailPage__["a" /* _DetailPage */]));

//# sourceMappingURL=add-object.js.map

/***/ }),

/***/ 212:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _FeedPage; });
var _FeedPage = /** @class */ (function () {
    function _FeedPage() {
    }
    return _FeedPage;
}());

//# sourceMappingURL=_FeedPage.js.map

/***/ }),

/***/ 213:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddInfoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_rest_rest__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__dialog_dialog__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__DetailPage__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tabs_tabs__ = __webpack_require__(56);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Page to add Info-Pieces
 */
var AddInfoPage = /** @class */ (function (_super) {
    __extends(AddInfoPage, _super);
    /**
     * Constructor
     *
     * @param navCtrl
     * @param params
     * @param rest
     * @param modalCtrl
     */
    function AddInfoPage(navCtrl, params, rest, modalCtrl) {
        var _this = _super.call(this) || this;
        _this.navCtrl = navCtrl;
        _this.params = params;
        _this.rest = rest;
        _this.modalCtrl = modalCtrl;
        _this.object = _this.params.get('info');
        _this.usergroupid = { "id": _this.params.get('id') };
        return _this;
    }
    /**
     * Save Info
     */
    AddInfoPage.prototype.done = function () {
        var _this = this;
        this.rest.saveInfo(this.newContent, this.object.id).subscribe(function (data) {
            console.log("Info updated! id: " + data.id);
            _this.openUploadDialog(data.id);
        });
    };
    /**
     * close this window
     */
    AddInfoPage.prototype.dismiss = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__tabs_tabs__["a" /* TabsPage */], this.usergroupid);
    };
    /**
    * Open the File Upload Window
    */
    AddInfoPage.prototype.openUploadDialog = function (id) {
        var _this = this;
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__dialog_dialog__["a" /* DialogPage */], { id: id, typ: "noteid", usergroupid: this.usergroupid.id }, {});
        modal.onDidDismiss(function (data) {
            _this.dismiss();
        });
        modal.present();
    };
    AddInfoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-add-info',template:/*ion-inline-start:"D:\Diplomarbeit\footnote_31_01\Footnote\footnote_client\src\pages\add-info\add-info.html"*/'<!--\n\n  Add Infos\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Notiz hinzufügen</ion-title>\n\n    <ion-buttons start>\n\n      <button ion-button ion-button (click)="dismiss()">\n\n        <span ion-text color="primary" showWhen="ios">Cancel</span>\n\n        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <quill-editor [(ngModel)]="newContent"></quill-editor>\n\n\n\n  <button ion-button round icon-only (click)="done()">\n\n    <ion-icon md-name="done"></ion-icon>\n\n  </button>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Diplomarbeit\footnote_31_01\Footnote\footnote_client\src\pages\add-info\add-info.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1__providers_rest_rest__["a" /* RestProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* ModalController */]])
    ], AddInfoPage);
    return AddInfoPage;
}(__WEBPACK_IMPORTED_MODULE_4__DetailPage__["a" /* _DetailPage */]));

//# sourceMappingURL=add-info.js.map

/***/ }),

/***/ 276:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(277);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(284);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(47);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(434);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_detail_detail__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_rest_rest__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_ionic2_material_icons__ = __webpack_require__(435);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_add_info_add_info__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_dialog_dialog__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_register_register__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_add_object_add_object__ = __webpack_require__(209);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_ngx_quill__ = __webpack_require__(437);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ionic_native_geolocation__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_login_login__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__providers_auth_auth__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_auth_auth_service__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_auth_token_interceptor__ = __webpack_require__(444);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__ionic_native_camera__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__ionic_native_http__ = __webpack_require__(206);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__providers_http_angular_http_angular__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__providers_http_native_http_native__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_http_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__ionic_native_native_storage__ = __webpack_require__(445);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_tabs_tabs__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__services_navProxy_service__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_placeholder_placeholder__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_master_master__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31_ionic_image_loader__ = __webpack_require__(275);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_user_group_user_group__ = __webpack_require__(146);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_feed_feed__ = __webpack_require__(147);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_user_group_split_user_group_split__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__services_navProxyUserGroup_service__ = __webpack_require__(115);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_detail_detail__["a" /* DetailPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_add_info_add_info__["a" /* AddInfoPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_dialog_dialog__["a" /* DialogPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_add_object_add_object__["a" /* AddObjectPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_placeholder_placeholder__["a" /* PlaceholderPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_master_master__["a" /* MasterPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_user_group_user_group__["a" /* UserGroupPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_feed_feed__["a" /* FeedPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_user_group_split_user_group_split__["a" /* UserGroupSplitPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_9__angular_common_http__["c" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_31_ionic_image_loader__["a" /* IonicImageLoader */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {
                    links: [
                        { component: __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */], name: 'Home', segment: 'home' },
                        { component: __WEBPACK_IMPORTED_MODULE_30__pages_master_master__["a" /* MasterPage */], name: 'Master', segment: 'master' },
                        { component: __WEBPACK_IMPORTED_MODULE_27__pages_tabs_tabs__["a" /* TabsPage */], name: 'Tabs', segment: 'tabs' },
                        { component: __WEBPACK_IMPORTED_MODULE_17__pages_login_login__["a" /* LoginPage */], name: 'Login', segment: 'login' },
                        { component: __WEBPACK_IMPORTED_MODULE_5__pages_detail_detail__["a" /* DetailPage */], name: 'Detail', segment: 'detail', defaultHistory: [__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]] },
                        { component: __WEBPACK_IMPORTED_MODULE_14__pages_add_object_add_object__["a" /* AddObjectPage */], name: 'page-add-object', segment: 'addObject', defaultHistory: [__WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */]] }
                    ]
                }, {
                    links: [
                        { loadChildren: '../pages/detail/detail.module#DetailPageModule', name: 'DetailPage', segment: 'detail', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/dialog/dialog.module#DialogPageModule', name: 'DialogPage', segment: 'dialog', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/feed/feed.module#FeedPageModule', name: 'FeedPage', segment: 'feed', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#HomePageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/register/register.module#RegisterPageModule', name: 'RegisterPage', segment: 'register', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/master/master.module#MasterPageModule', name: 'MasterPage', segment: 'master', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/user-group-split/user-group-split.module#UserGroupSplitPageModule', name: 'UserGroupSplitPage', segment: 'user-group-split', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/placeholder/placeholder.module#PlaceholderPageModule', name: 'PlaceholderPage', segment: 'placeholder', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/user-group/user-group.module#UserGroupPageModule', name: 'UserGroupPage', segment: 'user-group', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_15_ngx_quill__["a" /* QuillModule */],
                __WEBPACK_IMPORTED_MODULE_20__pages_auth_token_interceptor__["a" /* InterceptorModule */],
                __WEBPACK_IMPORTED_MODULE_10_ionic2_material_icons__["a" /* MaterialIconsModule */],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_detail_detail__["a" /* DetailPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_add_info_add_info__["a" /* AddInfoPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_dialog_dialog__["a" /* DialogPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_add_object_add_object__["a" /* AddObjectPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_register_register__["a" /* RegisterPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_placeholder_placeholder__["a" /* PlaceholderPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_master_master__["a" /* MasterPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_user_group_user_group__["a" /* UserGroupPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_feed_feed__["a" /* FeedPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_user_group_split_user_group_split__["a" /* UserGroupSplitPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_6__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_19__pages_auth_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicErrorHandler */] },
                { provide: __WEBPACK_IMPORTED_MODULE_9__angular_common_http__["a" /* HTTP_INTERCEPTORS */], useClass: __WEBPACK_IMPORTED_MODULE_20__pages_auth_token_interceptor__["b" /* TokenInterceptor */], multi: true },
                __WEBPACK_IMPORTED_MODULE_8__providers_rest_rest__["a" /* RestProvider */],
                __WEBPACK_IMPORTED_MODULE_16__ionic_native_geolocation__["a" /* Geolocation */],
                __WEBPACK_IMPORTED_MODULE_18__providers_auth_auth__["a" /* AuthProvider */],
                __WEBPACK_IMPORTED_MODULE_21__ionic_native_camera__["a" /* Camera */],
                __WEBPACK_IMPORTED_MODULE_22__ionic_native_http__["a" /* HTTP */],
                __WEBPACK_IMPORTED_MODULE_23__providers_http_angular_http_angular__["a" /* HttpAngularProvider */],
                __WEBPACK_IMPORTED_MODULE_24__providers_http_native_http_native__["a" /* HttpNativeProvider */],
                __WEBPACK_IMPORTED_MODULE_25__providers_http_http__["a" /* HttpProvider */],
                __WEBPACK_IMPORTED_MODULE_26__ionic_native_native_storage__["a" /* NativeStorage */],
                __WEBPACK_IMPORTED_MODULE_28__services_navProxy_service__["a" /* NavProxyService */],
                __WEBPACK_IMPORTED_MODULE_35__services_navProxyUserGroup_service__["a" /* NavProxyUserGroupService */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__http_http__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_tabs_tabs__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Provider for Rest-Requests
 */
var RestProvider = /** @class */ (function () {
    /**
     * Constructor
     * @param http
     * @param app
     * @param HTTP
     */
    function RestProvider(http, app) {
        this.http = http;
        this.app = app;
    }
    /**
     * test server
     */
    RestProvider.prototype.json = function () {
        return this.http.http.get(this.http.url + 'rest/json', {}, { responseType: "json" });
    };
    /**
     * get Objects
     */
    RestProvider.prototype.getObjects = function () {
        return this.http.http.get(this.http.url + 'rest/realObject', {}, { responseType: "json" });
    };
    /**
     * save info
     * @param info
     * @param id
     */
    RestProvider.prototype.saveInfo = function (info, id) {
        return this.http.http.post(this.http.url + 'rest/note/insertNote/' + id, { "content": info }, { responseType: 'json' });
    };
    /**
     * edit info
     * @param info
     */
    RestProvider.prototype.editInfo = function (info) {
        return this.http.http.post(this.http.url + 'rest/note', info, { responseType: 'text' });
    };
    /**
     * delete info
     * @param info
     */
    RestProvider.prototype.deleteInfo = function (info) {
        return this.http.http.post(this.http.url + 'rest/realObject', info, { responseType: 'json' });
    };
    /**
     * edit Object
     * @param object
     */
    RestProvider.prototype.editObject = function (object) {
        return this.http.http.post(this.http.url + 'rest/realObject', object, { responseType: 'text' });
    };
    /**
     * delete Object
     * @param object
     */
    RestProvider.prototype.deleteObject = function (object) {
        return this.http.http.delete(this.http.url + 'rest/realObject/' + object, {}, { responseType: 'json' });
    };
    /**
     * insert Object
     * @param obj
     */
    RestProvider.prototype.insertObject = function (obj) {
        return this.http.http.put(this.http.url + 'rest/realObject', obj, { responseType: 'json' });
    };
    /**
     * get Notes of Objects
     * @param id
     */
    RestProvider.prototype.getObjectsNotes = function (id) {
        return this.http.http.get(this.http.url + 'rest/realObject/getObjectsNotes/' + id, {}, { responseType: "json" });
    };
    /**
     * get File with Path
     * @param image
     */
    RestProvider.prototype.getFileWithPath = function (image) {
        return this.http.http.get(this.http.url + "FileHandlerServlet?filename=" + image, {}, {});
    };
    /**
     * upload Image
     * @param blob
     * @param filename
     */
    RestProvider.prototype.uploadFile = function (url, blob, params) {
        return this.http.http.post(url, blob, { responseType: "json", params: params });
    };
    /**
     * post new Target on Vuforia
     * @param json
     */
    RestProvider.prototype.postNewTarget = function (json) {
        return this.http.http.post(this.http.url + "rest/realObject/postNewTarget", json, {});
    };
    /**
     * get Feeds by Usergroup
     * @param id
     */
    RestProvider.prototype.getFeedsPerUserGroup = function (id) {
        return this.http.http.get(this.http.url + 'rest/realObjectFeed/findRealObjectFeedsbyUsergroup/' + id, {}, { responseType: "json" });
    };
    /**
     * get Usergroup
     * @param id
     */
    RestProvider.prototype.getUserGroups = function (id) {
        return this.http.http.get(this.http.url + 'rest/UserGroup/getUserGroupsbyUserid/' + id, {}, { responseType: "json" });
    };
    /**
     * get feed by usergroup
     * @param id
     */
    RestProvider.prototype.getUserGroupFeeds = function (id) {
        return this.http.http.get(this.http.url + 'rest/realObjectFeed/findRealObjectFeedsbyUsergroup/' + id, {}, { responseType: "json" });
    };
    /**
     * get Objects per feeed
     * @param id
     */
    RestProvider.prototype.getObjectsPerFeed = function (id) {
        return this.http.http.get(this.http.url + 'rest/realObject/findRealObjectbyFeed/' + id, {}, { responseType: "json" });
    };
    /**
     * get Token
     */
    RestProvider.prototype.getToken = function () {
        return localStorage.getItem('token');
    };
    /**
     * uploads an image
     */
    RestProvider.prototype.upload = function (files, id, typ, usergroupid) {
        var _this = this;
        this.id = id;
        this.usergroupid = usergroupid;
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            var id = id;
            // create a http-post request and pass the form
            // tell it to report the upload progress
            var reader = new FileReader();
            reader.onload = function (e) {
                var dataURI = reader.result;
                console.log(dataURI);
                var url = _this.http.url + "FileHandlerServlet?filename=" + file.name + "&" + typ + "=" + _this.id;
                var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["d" /* HttpParams */]()
                    .set("filename", file.name)
                    .set(typ, _this.id);
                _this.uploadFile(url, dataURI, params).subscribe(function (data) {
                    _this.http.presentToast("Bild auf Server hochgeladen");
                    // If it is a realobject the image have to be uploaded in vuforia
                    debugger;
                    if (_this.id > 0 && typ === "realobjectid") {
                        var json = { "id": _this.id, "targetname": file.name };
                        _this.postNewTarget(json).subscribe(function (data) {
                            _this.http.presentToast("Bild auf Vuforia hochgeladen");
                        }, function (error) {
                            _this.http.presentToast("Beim hochladen auf Vuforia ist ein Fehler aufgetreten");
                        });
                    }
                    _this.app.getActiveNav().setRoot(__WEBPACK_IMPORTED_MODULE_3__pages_tabs_tabs__["a" /* TabsPage */], _this.id);
                }, function (err) {
                    _this.http.presentToast("Fehler beim hochladen des Bildes!");
                    _this.app.getActiveNav().setRoot(__WEBPACK_IMPORTED_MODULE_3__pages_tabs_tabs__["a" /* TabsPage */], _this.id);
                });
            };
            reader.readAsDataURL(file);
        }
    };
    RestProvider.prototype.getTokenHeader = function (url) {
        return { "Authorization": "Bearer " + this.getToken() };
    };
    RestProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__http_http__["a" /* HttpProvider */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["a" /* App */]])
    ], RestProvider);
    return RestProvider;
}());

//# sourceMappingURL=rest.js.map

/***/ }),

/***/ 315:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _MasterPage; });
var _MasterPage = /** @class */ (function () {
    function _MasterPage() {
    }
    return _MasterPage;
}());

//# sourceMappingURL=_MasterPage.js.map

/***/ }),

/***/ 316:
/***/ (function(module, exports) {

module.exports = {
  packageLaunch: function (appSchemeStr, jwt) {
    // launch app using action name (for Android devices)
    window.plugins.launcher.launch({
      actionName: appSchemeStr,
      extras: [{
        "name": "jwt",
        "value": jwt,
        "dataType": "String"
      }],
      successCallback: function (json) {
        console.log('App opened')
      },
      function () {
        console.log('Failed to open app')
      }
    });
  },
}


/***/ }),

/***/ 317:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _UserGroupPage; });
var _UserGroupPage = /** @class */ (function () {
    function _UserGroupPage() {
    }
    return _UserGroupPage;
}());

//# sourceMappingURL=_UserGroupPage.js.map

/***/ }),

/***/ 32:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HttpProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__http_angular_http_angular__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__http_native_http_native__ = __webpack_require__(205);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * HttpProvider
 *
 * When the Platform is Android or Ios then use the Http-Native-Provider otherwise use the Http-Angular-Provider
 */
var HttpProvider = /** @class */ (function () {
    /**
     * Constructor
     * @param toastCtrl
     * @param platform
     * @param angularHttp
     * @param nativeHttp
     */
    function HttpProvider(toastCtrl, platform, angularHttp, nativeHttp) {
        this.toastCtrl = toastCtrl;
        this.platform = platform;
        this.angularHttp = angularHttp;
        this.nativeHttp = nativeHttp;
        // url = 'http://localhost:8080/footnote/';
        this.url = 'https://vm68.htl-leonding.ac.at/javaendpoint/footnote/';
        console.log("android:" + this.platform.is('android'));
        console.log("ios:" + this.platform.is('ios'));
        this.http = this.platform.is('ios') || this.platform.is('android') ? this.nativeHttp : this.angularHttp;
    }
    /**
     * Present a Toast Message
     * @param mes Text to show
     */
    HttpProvider.prototype.presentToast = function (mes) {
        var toast = this.toastCtrl.create({
            message: mes,
            duration: 3000,
            position: 'bottom',
            showCloseButton: true,
            closeButtonText: 'x',
        });
        toast.present();
    };
    HttpProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__http_angular_http_angular__["a" /* HttpAngularProvider */], __WEBPACK_IMPORTED_MODULE_3__http_native_http_native__["a" /* HttpNativeProvider */]])
    ], HttpProvider);
    return HttpProvider;
}());

//# sourceMappingURL=http.js.map

/***/ }),

/***/ 434:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(271);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * App-Component
 */
var MyApp = /** @class */ (function () {
    function MyApp(platform, statusBar, splashScreen) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        this.isApp = false;
        this.initializeApp(statusBar, splashScreen);
        platform.ready().then(function () {
            _this.isApp = document.URL.indexOf('http') !== 0;
            if (_this.isApp) {
                // Okay, so the platform is ready and our plugins are available.
                // Here you can do any higher level native things you might need.
                statusBar.styleDefault();
                /** Enter your Wikitude (trial) License Key here. You can register and download your free license key here: http://www.wikitude.com/developer/licenses */
                WikitudePlugin._sdkKey = "RlnIchZW2mOGYOKruqxN8OH3x+FeyFIC8CluKQMtu9zzBHJ9P8mZTNeL+SX0VaO+ucui/5aThrU0zkR+RKH+b9iv/aQToVfaYvppLLMaq2PdaL2P6VXbOvXCs1Q9mGvbiJlEwd7TnWE4ZhmiwBEV/YIRmWy11Ry30MQTk96knj9TYWx0ZWRfX0bXDsDhpVXNlaH8n1AugfbEPPAMpZtyG6w/0ZcY91rx7R1DoTgvQpkxIYoU4o8rHN+BNAMHnCYM8G7wTQ06smWJ8J8GE+FRAaa+3hDvLi7MYtb8TZXlkmEpGoHi3aY6XEGAqHcAvcLCwXSHp1Gq4QqXOJ5epep5UMchE9dinKMOdjn+bxp8dOY+zzV1rYVox1Q+625hDsLbaOkjxNmiKZW9MZApUERs9phlUs7CHDcKa0a7OR/X9FI1lJh3Ws3T/n2ff3HpI3LeoUy3dX/gCmz8YEA25zkt8Mby/GqX3JGjSRbzOVpx1lgGiEI7EMqA14G1HbrflvY8N1EHMYpD4ibRhD8pvnVCZB55u0afgGFNY0++mOvqIv9uIQkKG2rzflUv20L++c/eLFzsB1h63HJK8vDd31APhq+/o60R0cLoJeDW6+xhEn0ERnYcDo2iRtQsORixNxhAIR/OkZNhfI0cC2ikDLZyGoVEGb56V2XaGPTYzu7ycb+UsPPM9opQS8Zg4crIR4Lgkf6pnpXccOPGW+8ZfoUp14byBt7F6kKP4QQtprihix1HoXnCRzgdJpLXdG/YNiLF";
                /** The Wikitude AR View creates it's own context. Communication between the main Ionic App and Wikitude SDK works
                 * through the function below for the direction Ionic2 app --> Wikitude SDK
                 * For calls from Wikitude SDK --> Ionic2 app see the captureScreen example in
                 * WikitudeIonic2StarterApp/www/assets/3_3dModels_6_3dModelAtGeoLocation/js/3dmodelatgeolocation.js*/
                // set the function to be called, when a "communication" is indicated from the AR View  
                WikitudePlugin.setOnUrlInvokeCallback(function (url) {
                    // this an example of how to receive a call from a function in the Wikitude SDK (Wikitude SDK --> Ionic2)
                    if (url.indexOf('captureScreen') > -1) {
                        WikitudePlugin.captureScreen(function (absoluteFilePath) {
                            console.log("snapshot stored at:\n" + absoluteFilePath);
                            // this an example of how to call a function in the Wikitude SDK (Ionic2 app --> Wikitude SDK)
                            WikitudePlugin.callJavaScript("World.testFunction('Screenshot saved at: " + absoluteFilePath + "');");
                        }, function (errorMessage) {
                            console.log(errorMessage);
                        }, true, null);
                    }
                    else {
                        alert(url + "not handled");
                    }
                });
                /**
                 * Define the generic ok callback
                 */
                WikitudePlugin.onWikitudeOK = function () {
                    console.log("Things went ok.");
                };
                /**
                 * Define the generic failure callback
                 */
                WikitudePlugin.onWikitudeError = function () {
                    console.log("Something went wrong");
                };
                // Just as an example: set the location within the Wikitude SDK, if you need this (You can get the geo coordinates by using ionic native 
                // GeoLocation plugin: http://ionicframework.com/docs/v2/native/geolocation/
                //WikitudePlugin.setLocation(47, 13, 450, 1);
                // for Android only
                WikitudePlugin.setBackButtonCallback(function () {
                    console.log("Back button has been pressed...");
                });
            }
        });
    }
    MyApp.prototype.initializeApp = function (statusBar, splashScreen) {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\Diplomarbeit\footnote_31_01\Footnote\footnote_client\src\app\app.html"*/'<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n\n'/*ion-inline-end:"D:\Diplomarbeit\footnote_31_01\Footnote\footnote_client\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 444:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return TokenInterceptor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InterceptorModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_service__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TokenInterceptor = /** @class */ (function () {
    function TokenInterceptor(auth) {
        this.auth = auth;
    }
    TokenInterceptor.prototype.intercept = function (request, next) {
        //when Token is not set and the url is not one of the urls which needs no token, then add the token as header to the request
        if (this.auth.getToken() != null && !request.url.includes("rest/auth") && !request.url.includes("rest/json") && !request.url.includes("rest/user/register")) {
            request = request.clone({
                setHeaders: {
                    Authorization: "Bearer " + this.auth.getToken()
                }
            });
        }
        return next.handle(request);
    };
    TokenInterceptor = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__auth_service__["a" /* AuthService */]])
    ], TokenInterceptor);
    return TokenInterceptor;
}());

var InterceptorModule = /** @class */ (function () {
    function InterceptorModule() {
    }
    InterceptorModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            providers: [
                { provide: __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HTTP_INTERCEPTORS */], useClass: TokenInterceptor, multi: true }
            ]
        })
    ], InterceptorModule);
    return InterceptorModule;
}());

//# sourceMappingURL=token.interceptor.js.map

/***/ }),

/***/ 49:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PlaceholderPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Page as Placeholder when no Detail-Page is opened
 */
var PlaceholderPage = /** @class */ (function () {
    /**
     * Constructor
     * @param navCtrl
     * @param navParams
     */
    function PlaceholderPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    PlaceholderPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-placeholder',template:/*ion-inline-start:"D:\Diplomarbeit\footnote_31_01\Footnote\footnote_client\src\pages\placeholder\placeholder.html"*/'<!--\n  Generated template for the PlaceholderPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    \n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"D:\Diplomarbeit\footnote_31_01\Footnote\footnote_client\src\pages\placeholder\placeholder.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], PlaceholderPage);
    return PlaceholderPage;
}());

//# sourceMappingURL=placeholder.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__login_login__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_js_start_app__ = __webpack_require__(316);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__assets_js_start_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__assets_js_start_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_auth_auth_service__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_navProxy_service__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__user_group_split_user_group_split__ = __webpack_require__(145);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Page to show the Tabs
 */
var TabsPage = /** @class */ (function () {
    /**
     * Constructor
     * @param navCtrl
     * @param auth
     * @param params
     * @param platform
     * @param navProxy
     */
    function TabsPage(navCtrl, auth, params, platform, navProxy) {
        this.navCtrl = navCtrl;
        this.auth = auth;
        this.params = params;
        this.platform = platform;
        this.navProxy = navProxy;
        this.home = __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */];
        this.usergroup = __WEBPACK_IMPORTED_MODULE_7__user_group_split_user_group_split__["a" /* UserGroupSplitPage */];
        this.id = { "id": this.params.get('id') };
    }
    /**
     * View did load
     */
    TabsPage.prototype.ionViewDidLoad = function () {
        this.isAndroid = this.platform.is('android');
        this.isIOS = this.platform.is("ios");
    };
    /**
     * open Vuforia with an App-Launcher
     */
    TabsPage.prototype.openVuforia = function () {
        __WEBPACK_IMPORTED_MODULE_3__assets_js_start_app__["packageLaunch"]("com.vuforia.Objects.intent.action.Vuforia", this.auth.getToken());
    };
    TabsPage.prototype.openWikitude = function () {
        WikitudePlugin.isDeviceSupported(function (success) {
            console.log("Your platform supports AR/Wikitude. Have fun developing!!");
            var startupConfiguration = { "camera_position": "back" };
            WikitudePlugin.loadARchitectWorld(function (success) {
                console.log("ARchitect World loaded successfully.");
                WikitudePlugin.callJavaScript("World.setToken('" + localStorage.getItem("token") + "')");
            }, function (fail) {
                console.log("Failed to load ARchitect World!");
            }, 
            //          "www/assets/3_3dModels_1_3dModelOnTarget/index.html", // (1) if you have a IR (Image Recognition) World, use this
            //          ["ir"], // (1) if you have a IR (Image Recognition) World, use this
            "www/assets/wikitude_POI/index.html", // (2) if you have a GeoLocation World, use this
            ["geo"], // (2) if you have a GeoLocation World, use this
            // you find other samples or Wikitude worlds in Wikitude Cordova Plugin
            // which can be downloaded from here: https://github.com/Wikitude/wikitude-cordova-plugin/archive/v5.3.1-3.3.2.zip
            startupConfiguration);
        }, function (fail) {
            console.log("Your platform failed to run AR/Wikitude: " + fail);
        }, [WikitudePlugin.FeatureGeo] // or WikitudePlugin.Feature2DTracking 
        );
    };
    /**
     * logout User
     */
    TabsPage.prototype.logout = function () {
        localStorage.removeItem("token");
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_1__login_login__["a" /* LoginPage */]);
    };
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\Diplomarbeit\footnote_31_01\Footnote\footnote_client\src\pages\tabs\tabs.html"*/'<ion-tabs>\n\n  <ion-tab [root]="home" [rootParams]="id" tabTitle="Home" tabIcon="home"></ion-tab>\n\n  <ion-tab [root]="usergroup" tabTitle="Gruppen" tabIcon="people"></ion-tab>\n\n  <ion-tab (ionSelect)="openWikitude()" tabTitle="GPS" [show]="isAndroid||isIOS" tabIcon="navigate"></ion-tab>\n\n\n\n  <ion-tab tabTitle="Vuforia" tabIcon="aperture" [show]="isAndroid" (ionSelect)="openVuforia()"></ion-tab>\n\n  <ion-tab tabTitle="ausloggen" tabIcon="log-out" (ionSelect)="logout()"></ion-tab>\n\n</ion-tabs>\n\n'/*ion-inline-end:"D:\Diplomarbeit\footnote_31_01\Footnote\footnote_client\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__pages_auth_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_6__services_navProxy_service__["a" /* NavProxyService */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AuthService = /** @class */ (function () {
    function AuthService() {
        this.cachedRequests = [];
    }
    AuthService.prototype.getToken = function () {
        return localStorage.getItem('token');
    };
    AuthService.prototype.isAuthenticated = function () {
        // get the token
        //const token = this.getToken();
        // return a boolean reflecting 
        // whether or not the token is expired
        return true; //tokenNotExpired(null, token);
    };
    AuthService.prototype.collectFailedRequest = function (request) {
        this.cachedRequests.push(request);
    };
    AuthService.prototype.retryFailedRequests = function () {
        // retry the requests. this method can
        // be called after the token is refreshed
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__register_register__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_rest_rest__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_http_http__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Page for Login
 */
var LoginPage = /** @class */ (function () {
    /**
     * Konstruktor
     * @param navCtrl
     * @param navParams
     * @param loadingCtrl
     * @param auth
     * @param rest
     * @param http
     */
    function LoginPage(navCtrl, navParams, loadingCtrl, auth, rest, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.auth = auth;
        this.rest = rest;
        this.http = http;
        this.username = "";
        this.password = "";
    }
    /**
     * View Did Enter
     */
    LoginPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.showLoader();
        var token = localStorage.getItem('token');
        if (typeof (token) !== 'undefined' && token != null) {
            console.log("authenticating with token: ", token);
            this.loading.dismiss();
            this.auth.reauthenticate({ "value": token }).subscribe(function (data) {
                if (data.value == "true" || data.value == true) {
                    // this.navCtrl.setRoot(TabsPage, { id: 0 });
                    _this.navCtrl.insert(0, __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */], { id: 0 });
                    _this.navCtrl.popToRoot();
                    _this.http.presentToast("bereits eingeloggt");
                }
                else {
                    _this.http.presentToast("Token abgelaufen! Du musst dich erneut anmelden.");
                }
            });
        }
        else {
            this.loading.dismiss();
        }
    };
    /**
     * Login
     */
    LoginPage.prototype.login = function () {
        var _this = this;
        this.showLoader();
        this.rest.json().subscribe(function (data) {
            console.log(data);
        });
        this.auth.login(this.username, this.password).subscribe(function (res) {
            _this.loading.dismiss();
            console.log(res);
            if (res != null && res != 'null') {
                localStorage.setItem('token', res.token);
                localStorage.setItem('id', res.id);
                _this.navCtrl.insert(0, __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */], { id: 0 });
                _this.navCtrl.popToRoot();
            }
            else {
                _this.http.presentToast("Login fehlgeschlagen!");
            }
        }, function (error) {
            _this.loading.dismiss();
            _this.http.presentToast("Login fehlgeschlagen");
        });
    };
    /**
     * Show Spinner
     */
    LoginPage.prototype.showLoader = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Authentifizieren...'
        });
        this.loading.present();
    };
    /**
     * Show Register Page
     */
    LoginPage.prototype.register = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__register_register__["a" /* RegisterPage */]);
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"D:\Diplomarbeit\footnote_31_01\Footnote\footnote_client\src\pages\login\login.html"*/'<ion-content padding class="animated fadeIn login auth-page">\n\n  <div class="login-content">\n\n    <ion-grid>\n\n      <div padding-horizontal text-center class="animated fadeInDown">\n\n        <div class="logo">\n\n          <img src="../../assets/imgs/logo.png" height="50px">\n\n        </div>\n\n        <h2 ion-text class="text-primary">\n\n          <strong>Footnote</strong> Login\n\n        </h2>\n\n      </div>\n\n      <ion-row justify-content-center>\n\n        <ion-col align-self-center size-md="6" size-lg="5" size-xs="12">\n\n          <form class="list-form" name="login">\n\n            <ion-item>\n\n              <ion-label floating>\n\n                <ion-icon name="mail" item-start class="text-primary"></ion-icon>\n\n                Email\n\n              </ion-label>\n\n              <ion-input name="email" type="email" [(ngModel)]=\'username\'></ion-input>\n\n            </ion-item>\n\n            <ion-item>\n\n              <ion-label floating>\n\n                <ion-icon name="lock" item-start class="text-primary"></ion-icon>\n\n                Passwort\n\n              </ion-label>\n\n              <ion-input name="password" type="password" [(ngModel)]=\'password\'></ion-input>\n\n            </ion-item>\n\n          </form>\n\n          <div>\n\n            <button ion-button icon-start block color="dark" tappable (click)="login()">\n\n              <ion-icon name="log-in"></ion-icon>\n\n              einloggen\n\n            </button>\n\n          </div>\n\n\n\n          <div text-center margin-top>\n\n            <span ion-text color="primary" tappable (click)="register()">Neu hier? <strong>registrieren</strong></span>\n\n          </div>\n\n        </ion-col>\n\n      </ion-row>\n\n    </ion-grid>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Diplomarbeit\footnote_31_01\Footnote\footnote_client\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_2__providers_auth_auth__["a" /* AuthProvider */],
            __WEBPACK_IMPORTED_MODULE_5__providers_rest_rest__["a" /* RestProvider */], __WEBPACK_IMPORTED_MODULE_6__providers_http_http__["a" /* HttpProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NavProxyService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_placeholder_placeholder__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_DetailPage__ = __webpack_require__(68);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var NavProxyService = /** @class */ (function () {
    function NavProxyService() {
        this._masterNav = null;
        this._detailNav = null;
        this._isOn = false;
    }
    Object.defineProperty(NavProxyService.prototype, "masterNav", {
        get: function () {
            return this._masterNav;
        },
        set: function (value) {
            this._masterNav = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavProxyService.prototype, "detailNav", {
        get: function () {
            return this._detailNav;
        },
        set: function (value) {
            this._detailNav = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NavProxyService.prototype, "isOn", {
        get: function () {
            return this._isOn;
        },
        set: function (value) {
            this._isOn = value;
        },
        enumerable: true,
        configurable: true
    });
    NavProxyService.prototype.pushDetail = function (page, params) {
        (this.isOn) ?
            this.detailNav.setRoot(page, params) :
            this.masterNav.push(page, params);
    };
    NavProxyService.prototype.pushMaster = function (page, params) {
        this.masterNav.push(page, params);
    };
    NavProxyService.prototype.onSplitPaneChanged = function (isOn) {
        // set local 'isOn' flag...
        this.isOn = isOn;
        // if the nav controllers have been instantiated...
        if (this.masterNav && this.detailNav) {
            (isOn) ? this.activateSplitView() :
                this.deactivateSplitView();
        }
    };
    NavProxyService.prototype.activateSplitView = function () {
        var currentView = this.masterNav.getActive();
        if (currentView != null) {
            if (currentView.component.prototype
                instanceof __WEBPACK_IMPORTED_MODULE_2__pages_DetailPage__["a" /* _DetailPage */]) {
                // if the current view is a 'Detail' page...
                // - remove it from the 'master' nav stack...
                this.masterNav.pop();
                // - and add it to the 'detail' nav stack...
                this.detailNav.setRoot(currentView.component, currentView.data);
            }
        }
    };
    NavProxyService.prototype.deactivateSplitView = function () {
        var detailView = this.detailNav.getActive();
        this.detailNav.setRoot(__WEBPACK_IMPORTED_MODULE_1__pages_placeholder_placeholder__["a" /* PlaceholderPage */]);
        if (detailView.component.prototype instanceof __WEBPACK_IMPORTED_MODULE_2__pages_DetailPage__["a" /* _DetailPage */]) {
            // if the current detail view is a 'Detail' page...
            // ...so, not the placeholder page:
            var index = this.masterNav.getViews().length;
            // add it to the master view...
            this.masterNav.insert(index, detailView.component, detailView.data);
        }
    };
    NavProxyService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])()
    ], NavProxyService);
    return NavProxyService;
}());

//# sourceMappingURL=navProxy.service.js.map

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _DetailPage; });
var _DetailPage = /** @class */ (function () {
    function _DetailPage() {
    }
    return _DetailPage;
}());

//# sourceMappingURL=_DetailPage.js.map

/***/ }),

/***/ 77:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_placeholder_placeholder__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_navProxy_service__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__master_master__ = __webpack_require__(144);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Page to Split Master and Detail View
 */
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, params, platform, navProxy) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.params = params;
        this.platform = platform;
        this.navProxy = navProxy;
        platform.ready().then(function () {
            _this.id = _this.params.get('id');
            // Add our nav controllers to
            // the nav proxy service...
            navProxy.masterNav = _this.masterNav;
            navProxy.detailNav = _this.detailNav;
            // set initial pages for
            // our nav controllers...
            _this.masterNav.setRoot(__WEBPACK_IMPORTED_MODULE_4__master_master__["a" /* MasterPage */], { detailNavCtrl: _this.detailNav, "id": _this.id });
            _this.detailNav.setRoot(__WEBPACK_IMPORTED_MODULE_2__pages_placeholder_placeholder__["a" /* PlaceholderPage */]);
        });
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('detailNav'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
    ], HomePage.prototype, "detailNav", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('masterNav'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
    ], HomePage.prototype, "masterNav", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"D:\Diplomarbeit\footnote_31_01\Footnote\footnote_client\src\pages\home\home.html"*/'<ion-split-pane (ionChange)="navProxy.onSplitPaneChanged($event._visible)">\n\n  <ion-nav [root]="masterPage" [rootParams]="id" #masterNav>\n\n  </ion-nav>\n\n  <ion-nav [root]="detailPage" #detailNav main>\n\n  </ion-nav>\n\n</ion-split-pane>\n\n'/*ion-inline-end:"D:\Diplomarbeit\footnote_31_01\Footnote\footnote_client\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_3__services_navProxy_service__["a" /* NavProxyService */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 78:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DialogPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_rest_rest__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_http_http__ = __webpack_require__(32);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Dialog Page
 */
var DialogPage = /** @class */ (function () {
    /**
     * Constructor
     * @param navCtrl
     * @param navParams
     * @param viewCtrl
     * @param rest
     */
    function DialogPage(camera, navCtrl, navParams, viewCtrl, rest, http) {
        this.camera = camera;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.rest = rest;
        this.http = http;
        this.canBeClosed = true;
        this.primaryButtonText = 'Upload';
        this.showCancelButton = true;
        this.uploading = false;
        this.uploadSuccessful = false;
        this.files = [];
        this.id = navParams.get("id");
        this.typ = navParams.get("typ");
        this.usergroupid = { "id": navParams.get("usergroupid") };
    }
    DialogPage.prototype.addFiles = function () {
        this.file.nativeElement.click();
    };
    DialogPage.prototype.onFilesAdded = function () {
        var files = this.file.nativeElement.files;
        for (var key in files) {
            if (!isNaN(parseInt(key))) {
                this.files.push(files[key]);
            }
        }
    };
    DialogPage.prototype.takePhoto = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            console.log(base64Image);
            var url = _this.http.url + "FileHandlerServlet?filename=" + _this.id + ".jpg&" + _this.typ + "=" + _this.id;
            var params = new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["d" /* HttpParams */]()
                .set("filename", _this.id + ".jpg")
                .set(_this.typ, _this.id);
            _this.rest.uploadFile(url, base64Image, params).subscribe(function (data) {
                _this.http.presentToast("Bild erfolgreich hochgeldaden");
            });
        }, function (err) {
            // Handle error
        });
    };
    DialogPage.prototype.closeDialog = function () {
        // if everything was uploaded already, just close the dialog
        // set the component state to "uploading"
        this.uploading = true;
        // start the upload and save the progress map
        this.rest.upload(this.files, this.id, this.typ, this.usergroupid);
    };
    DialogPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
        //this.navCtrl.setRoot(HomePage, this.usergroupid);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_9" /* ViewChild */])('file'),
        __metadata("design:type", Object)
    ], DialogPage.prototype, "file", void 0);
    DialogPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-dialog',template:/*ion-inline-start:"D:\Diplomarbeit\footnote_31_01\Footnote\footnote_client\src\pages\dialog\dialog.html"*/'<!--\n\n  Upload-Dialog Images and Files can be uploaded\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Dateien hochladen</ion-title>\n\n    <ion-buttons start>\n\n      <button ion-button ion-button (click)="dismiss()">\n\n        <span ion-text color="primary" showWhen="ios">Cancel</span>\n\n        <ion-icon name="md-close" showWhen="android, windows"></ion-icon>\n\n      </button>\n\n    </ion-buttons>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <input type="file" #file style="display: none" (change)="onFilesAdded()" multiple />\n\n  <div class="container" fxLayout="column" fxLayoutAlign="space-evenly stretch">\n\n    <div>\n\n      <button ion-button [disabled]="uploading || uploadSuccessful" class="add-files-btn" (click)="addFiles()">\n\n        Dateien hinzufügen\n\n      </button>\n\n    </div>\n\n\n\n    <!-- This is the content of the dialog, containing a list of the files to upload -->\n\n    <div>\n\n      <div>\n\n        <div *ngFor="let file of files">\n\n          {{file.name}}\n\n          <!--  <progress-bar *ngIf="progress" mode="determinate" [progress]="progress[file.name].progress | async"></progress-bar> -->\n\n        </div>\n\n      </div>\n\n    </div>\n\n\n\n    <!-- This are the actions of the dialog, containing the primary and the cancel button-->\n\n    <div class="actions">\n\n      <button ion-button *ngIf="showCancelButton" (click)="dismiss()">Cancel</button>\n\n      <button ion-button [disabled]="!canBeClosed" (click)="closeDialog()">{{primaryButtonText}}</button>\n\n    </div>\n\n    <!--<button ion-button round icon-only (click)="takePhoto()">Foto</button>-->\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"D:\Diplomarbeit\footnote_31_01\Footnote\footnote_client\src\pages\dialog\dialog.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_2__providers_rest_rest__["a" /* RestProvider */], __WEBPACK_IMPORTED_MODULE_5__providers_http_http__["a" /* HttpProvider */]])
    ], DialogPage);
    return DialogPage;
}());

//# sourceMappingURL=dialog.js.map

/***/ })

},[276]);
//# sourceMappingURL=main.js.map