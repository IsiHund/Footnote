webpackJsonp([2],{

/***/ 446:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailPageModule", function() { return DetailPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__detail__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angular_progress_bar__ = __webpack_require__(455);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var DetailPageModule = /** @class */ (function () {
    function DetailPageModule() {
    }
    DetailPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__detail__["a" /* DetailPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__detail__["a" /* DetailPage */]),
                __WEBPACK_IMPORTED_MODULE_3_angular_progress_bar__["a" /* ProgressBarModule */]
            ],
        })
    ], DetailPageModule);
    return DetailPageModule;
}());

//# sourceMappingURL=detail.module.js.map

/***/ }),

/***/ 455:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export ProgressBarComponent */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProgressBarModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);



/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ProgressBarComponent = /** @class */ (function () {
    function ProgressBarComponent() {
        // Default color
        this.color = "#488aff";
    }
    /**
     * Returns a color for a certains percent
     * @param percent The current progress
     */
    /**
     * Returns a color for a certains percent
     * @param {?} percent The current progress
     * @return {?}
     */
    ProgressBarComponent.prototype.whichColor = /**
     * Returns a color for a certains percent
     * @param {?} percent The current progress
     * @return {?}
     */
    function (percent) {
        /** @type {?} */
        var k = Object.keys(this.degraded);
        // Convert string to number
        k.forEach(function (e, i) { return k[i] = +e; });
        // Sort them by value
        k = k.sort(function (a, b) { return a - b; });
        /** @type {?} */
        var p = +percent;
        /** @type {?} */
        var last = k[0];
        try {
            // Foreach keys 
            for (var k_1 = Object(__WEBPACK_IMPORTED_MODULE_0_tslib__["c" /* __values */])(k), k_1_1 = k_1.next(); !k_1_1.done; k_1_1 = k_1.next()) {
                var val = k_1_1.value;
                // if current val is < than percent
                if (val < p) {
                    last = val;
                }
                else if (val >= p - 1) {
                    return this.degraded[last];
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (k_1_1 && !k_1_1.done && (_a = k_1.return)) _a.call(k_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // if its the last one retrun the last
        return this.degraded[last];
        var e_1, _a;
    };
    /**
     * @param {?} progress
     * @return {?}
     */
    ProgressBarComponent.prototype.whichProgress = /**
     * @param {?} progress
     * @return {?}
     */
    function (progress) {
        try {
            return Math.round(+progress * 100) / 100;
        }
        catch (_a) {
            return progress;
        }
    };
    ProgressBarComponent.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */], args: [{
                    selector: 'progress-bar',
                    styles: ["\n        .progress-outer {\n          width: 96%;\n          margin: 10px 2%;\n          padding: 3px;\n          text-align: center;\n          background-color: #f4f4f4;\n          border: 1px solid #dcdcdc;\n          color: #fff;\n          border-radius: 20px;\n        }\n        .progress-inner {\n          min-width: 15%;\n          white-space: nowrap;\n          overflow: hidden;\n          padding: 5px;\n          border-radius: 20px;\n        }\n  "],
                    template: "<div class=\"progress-outer\">\n" +
                        "    <div class=\"progress-inner\" [style.width]=\"whichProgress(progress) + '%'\" [style.background-color]=\"degraded == null ? color : whichColor(progress)\">\n" +
                        "        {{whichProgress(progress)}}%\n" +
                        "</div>\n" +
                        "</div>"
                },] },
    ];
    /** @nocollapse */
    ProgressBarComponent.ctorParameters = function () { return []; };
    ProgressBarComponent.propDecorators = {
        progress: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["D" /* Input */], args: ['progress',] }],
        color: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["D" /* Input */], args: ['color',] }],
        degraded: [{ type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["D" /* Input */], args: ['color-degraded',] }]
    };
    return ProgressBarComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ProgressBarModule = /** @class */ (function () {
    function ProgressBarModule() {
    }
    ProgressBarModule.decorators = [
        { type: __WEBPACK_IMPORTED_MODULE_1__angular_core__["J" /* NgModule */], args: [{
                    imports: [],
                    declarations: [ProgressBarComponent],
                    exports: [ProgressBarComponent],
                    schemas: [__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NO_ERRORS_SCHEMA */]]
                },] },
    ];
    return ProgressBarModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5ndWxhci1wcm9ncmVzcy1iYXIuanMubWFwIiwic291cmNlcyI6WyJuZzovL2FuZ3VsYXItcHJvZ3Jlc3MtYmFyL2xpYi9hbmd1bGFyLXByb2dyZXNzLWJhci5jb21wb25lbnQudHMiLCJuZzovL2FuZ3VsYXItcHJvZ3Jlc3MtYmFyL2xpYi9hbmd1bGFyLXByb2dyZXNzLWJhci5tb2R1bGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6XG4gICAgICAncHJvZ3Jlc3MtYmFyJyxcbiAgc3R5bGVzOiBbYFxuICAgICAgICAucHJvZ3Jlc3Mtb3V0ZXIge1xuICAgICAgICAgIHdpZHRoOiA5NiU7XG4gICAgICAgICAgbWFyZ2luOiAxMHB4IDIlO1xuICAgICAgICAgIHBhZGRpbmc6IDNweDtcbiAgICAgICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2Y0ZjRmNDtcbiAgICAgICAgICBib3JkZXI6IDFweCBzb2xpZCAjZGNkY2RjO1xuICAgICAgICAgIGNvbG9yOiAjZmZmO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gICAgICAgIH1cbiAgICAgICAgLnByb2dyZXNzLWlubmVyIHtcbiAgICAgICAgICBtaW4td2lkdGg6IDE1JTtcbiAgICAgICAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgICAgICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgICAgICAgcGFkZGluZzogNXB4O1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDIwcHg7XG4gICAgICAgIH1cbiAgYF0sXG4gIHRlbXBsYXRlOlxuICAgICAgXCI8ZGl2IGNsYXNzPVxcXCJwcm9ncmVzcy1vdXRlclxcXCI+XFxuXCIgK1xuICAgICAgXCIgICAgPGRpdiBjbGFzcz1cXFwicHJvZ3Jlc3MtaW5uZXJcXFwiIFtzdHlsZS53aWR0aF09XFxcIndoaWNoUHJvZ3Jlc3MocHJvZ3Jlc3MpICsgJyUnXFxcIiBbc3R5bGUuYmFja2dyb3VuZC1jb2xvcl09XFxcImRlZ3JhZGVkID09IG51bGwgPyBjb2xvciA6IHdoaWNoQ29sb3IocHJvZ3Jlc3MpXFxcIj5cXG5cIiArXG4gICAgICBcIiAgICAgICAge3t3aGljaFByb2dyZXNzKHByb2dyZXNzKX19JVxcblwiICtcbiAgICAgIFwiPC9kaXY+XFxuXCIgK1xuICAgICAgXCI8L2Rpdj5cIlxuXG5cbn0pXG5leHBvcnQgY2xhc3MgUHJvZ3Jlc3NCYXJDb21wb25lbnQge1xuXG4vKiogSW5wdXRzICoqL1xuICBASW5wdXQoJ3Byb2dyZXNzJykgcHJvZ3Jlc3M6IHN0cmluZztcbiAgQElucHV0KCdjb2xvcicpIGNvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgnY29sb3ItZGVncmFkZWQnKSBkZWdyYWRlZDogYW55O1xuXG5cbmNvbnN0cnVjdG9yKCkge1xuICAvLyBEZWZhdWx0IGNvbG9yXG4gIHRoaXMuY29sb3IgPSBcIiM0ODhhZmZcIjtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGEgY29sb3IgZm9yIGEgY2VydGFpbnMgcGVyY2VudFxuICogQHBhcmFtIHBlcmNlbnQgVGhlIGN1cnJlbnQgcHJvZ3Jlc3NcbiAqL1xud2hpY2hDb2xvcihwZXJjZW50OiBzdHJpbmcpe1xuICAvLyBHZXQgYWxsIGVudHJpZXMgaW5kZXggYXMgYW4gYXJyYXlcbiAgbGV0IGs6IEFycmF5PGFueT4gPSBPYmplY3Qua2V5cyh0aGlzLmRlZ3JhZGVkKTtcbiAgLy8gQ29udmVydCBzdHJpbmcgdG8gbnVtYmVyXG4gIGsuZm9yRWFjaCgoZSwgaSkgPT4ga1tpXSA9ICtlKTtcbiAgLy8gU29ydCB0aGVtIGJ5IHZhbHVlXG4gIGsgPSBrLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgLy8gUGVyY2VudCBhcyBudW1iZXJcbiAgbGV0IHAgPSArcGVyY2VudFxuICAvLyBTZXQgbGFzdCBieSBkZWZhdWx0IGFzIHRoZSBmaXJzdCBvY2N1cmVuY2VcbiAgbGV0IGxhc3QgPSBrWzBdO1xuICAvLyBGb3JlYWNoIGtleXMgXG4gIGZvcihsZXQgdmFsIG9mIGspe1xuICAgIC8vIGlmIGN1cnJlbnQgdmFsIGlzIDwgdGhhbiBwZXJjZW50XG4gICAgaWYodmFsIDwgcCl7XG4gICAgICBsYXN0ID0gdmFsO1xuICAgIH1cbiAgICAvLyBpZiB2YWwgPj0gcGVyY2VudCB0aGVuIHRoZSB2YWwgdGhhdCB3ZSBjb3VsZCBzaG93IGhhcyBiZWVuIHJlYWNoZWRcbiAgICBlbHNlIGlmKHZhbCA+PSBwIC0xKXtcbiAgICAgIHJldHVybiB0aGlzLmRlZ3JhZGVkW2xhc3RdO1xuICAgIH1cbiAgfVxuICAvLyBpZiBpdHMgdGhlIGxhc3Qgb25lIHJldHJ1biB0aGUgbGFzdFxuICByZXR1cm4gdGhpcy5kZWdyYWRlZFtsYXN0XTtcbn1cblxud2hpY2hQcm9ncmVzcyhwcm9ncmVzczogc3RyaW5nKXtcbiAgdHJ5e1xuICAgIHJldHVybiBNYXRoLnJvdW5kKCtwcm9ncmVzcyAqIDEwMCkgLyAxMDA7XG4gIH1cbiAgY2F0Y2h7XG4gICAgcmV0dXJuIHByb2dyZXNzO1xuICB9XG59XG59IiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByb2dyZXNzQmFyQ29tcG9uZW50IH0gZnJvbSAnLi9hbmd1bGFyLXByb2dyZXNzLWJhci5jb21wb25lbnQnO1xuaW1wb3J0IHsgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1Byb2dyZXNzQmFyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW1Byb2dyZXNzQmFyQ29tcG9uZW50XSxcbiAgc2NoZW1hczogW05PX0VSUk9SU19TQ0hFTUFdXG59KVxuZXhwb3J0IGNsYXNzIFByb2dyZXNzQmFyTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbInRzbGliXzEuX192YWx1ZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0lBeUNBOztRQUVFLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO0tBQ3hCOzs7Ozs7Ozs7O0lBTUQseUNBQVU7Ozs7O0lBQVYsVUFBVyxPQUFlOztRQUV4QixJQUFJLENBQUMsR0FBZSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzs7UUFFL0MsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUEsQ0FBQyxDQUFDOztRQUUvQixDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLEdBQUcsQ0FBQyxHQUFBLENBQUMsQ0FBQzs7UUFFNUIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUE7O1FBRWhCLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O1lBRWhCLEtBQWUsSUFBQSxNQUFBQSxTQUFBLENBQUMsQ0FBQSxvQkFBQTtnQkFBWixJQUFJLEdBQUcsY0FBQTs7Z0JBRVQsSUFBRyxHQUFHLEdBQUcsQ0FBQyxFQUFDO29CQUNULElBQUksR0FBRyxHQUFHLENBQUM7aUJBQ1o7cUJBRUksSUFBRyxHQUFHLElBQUksQ0FBQyxHQUFFLENBQUMsRUFBQztvQkFDbEIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM1QjthQUNGOzs7Ozs7Ozs7O1FBRUQsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDOztLQUM1Qjs7Ozs7SUFFRCw0Q0FBYTs7OztJQUFiLFVBQWMsUUFBZ0I7UUFDNUIsSUFBRztZQUNELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUM7U0FDMUM7UUFDRCxPQUFNLElBQUQ7WUFDSCxPQUFPLFFBQVEsQ0FBQztTQUNqQjtLQUNGOztnQkFqRkEsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFDSixjQUFjO29CQUNsQixNQUFNLEVBQUUsQ0FBQyxrZEFrQlIsQ0FBQztvQkFDRixRQUFRLEVBQ0osa0NBQWtDO3dCQUNsQyxtS0FBbUs7d0JBQ25LLHdDQUF3Qzt3QkFDeEMsVUFBVTt3QkFDVixRQUFRO2lCQUdiOzs7OzsyQkFJRSxLQUFLLFNBQUMsVUFBVTt3QkFDaEIsS0FBSyxTQUFDLE9BQU87MkJBQ2IsS0FBSyxTQUFDLGdCQUFnQjs7K0JBdEN6Qjs7Ozs7OztBQ0FBOzs7O2dCQUlDLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUUsRUFDUjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztvQkFDcEMsT0FBTyxFQUFFLENBQUMsb0JBQW9CLENBQUM7b0JBQy9CLE9BQU8sRUFBRSxDQUFDLGdCQUFnQixDQUFDO2lCQUM1Qjs7NEJBVkQ7Ozs7Ozs7Ozs7Ozs7OzsifQ==

/***/ })

});
//# sourceMappingURL=2.js.map