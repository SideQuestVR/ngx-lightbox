import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class LightboxConfig {
    constructor() {
        this.fadeDuration = 0.7;
        this.resizeDuration = 0.5;
        this.fitImageInViewPort = true;
        this.positionFromTop = 20;
        this.showImageNumberLabel = false;
        this.alwaysShowNavOnTouchDevices = false;
        this.wrapAround = false;
        this.disableKeyboardNav = false;
        this.disableScrolling = false;
        this.centerVertically = false;
        this.enableTransition = true;
        this.albumLabel = 'Image %1 of %2';
        this.showZoom = false;
        this.showRotate = false;
        this.containerElementResolver = (documentRef) => documentRef.querySelector('body');
    }
}
LightboxConfig.ɵfac = function LightboxConfig_Factory(t) { return new (t || LightboxConfig)(); };
LightboxConfig.ɵprov = i0.ɵɵdefineInjectable({ token: LightboxConfig, factory: LightboxConfig.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LightboxConfig, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3gtY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtbGlnaHRib3gvc3JjL2xpYi9saWdodGJveC1jb25maWcuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQUkzQyxNQUFNLE9BQU8sY0FBYztJQWlCekI7UUFDRSxJQUFJLENBQUMsWUFBWSxHQUFHLEdBQUcsQ0FBQztRQUN4QixJQUFJLENBQUMsY0FBYyxHQUFHLEdBQUcsQ0FBQztRQUMxQixJQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO1FBQy9CLElBQUksQ0FBQyxlQUFlLEdBQUcsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUM7UUFDbEMsSUFBSSxDQUFDLDJCQUEyQixHQUFHLEtBQUssQ0FBQztRQUN6QyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1FBQzdCLElBQUksQ0FBQyxVQUFVLEdBQUcsZ0JBQWdCLENBQUM7UUFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLHdCQUF3QixHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3JGLENBQUM7OzRFQWpDVSxjQUFjO3NEQUFkLGNBQWMsV0FBZCxjQUFjLG1CQUZiLE1BQU07dUZBRVAsY0FBYztjQUgxQixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIExpZ2h0Ym94Q29uZmlnIHtcclxuICBwdWJsaWMgZmFkZUR1cmF0aW9uOiBudW1iZXI7XHJcbiAgcHVibGljIHJlc2l6ZUR1cmF0aW9uOiBudW1iZXI7XHJcbiAgcHVibGljIGZpdEltYWdlSW5WaWV3UG9ydDogYm9vbGVhbjtcclxuICBwdWJsaWMgcG9zaXRpb25Gcm9tVG9wOiBudW1iZXI7XHJcbiAgcHVibGljIHNob3dJbWFnZU51bWJlckxhYmVsOiBib29sZWFuO1xyXG4gIHB1YmxpYyBhbHdheXNTaG93TmF2T25Ub3VjaERldmljZXM6IGJvb2xlYW47XHJcbiAgcHVibGljIHdyYXBBcm91bmQ6IGJvb2xlYW47XHJcbiAgcHVibGljIGRpc2FibGVLZXlib2FyZE5hdjogYm9vbGVhbjtcclxuICBwdWJsaWMgZGlzYWJsZVNjcm9sbGluZzogYm9vbGVhbjtcclxuICBwdWJsaWMgY2VudGVyVmVydGljYWxseTogYm9vbGVhbjtcclxuICBwdWJsaWMgZW5hYmxlVHJhbnNpdGlvbjogYm9vbGVhbjtcclxuICBwdWJsaWMgYWxidW1MYWJlbDogc3RyaW5nO1xyXG4gIHB1YmxpYyBzaG93Wm9vbTogYm9vbGVhbjtcclxuICBwdWJsaWMgc2hvd1JvdGF0ZTogYm9vbGVhbjtcclxuICBwdWJsaWMgY29udGFpbmVyRWxlbWVudFJlc29sdmVyOiAoZG9jdW1lbnQ6IGFueSkgPT4gSFRNTEVsZW1lbnQ7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5mYWRlRHVyYXRpb24gPSAwLjc7XHJcbiAgICB0aGlzLnJlc2l6ZUR1cmF0aW9uID0gMC41O1xyXG4gICAgdGhpcy5maXRJbWFnZUluVmlld1BvcnQgPSB0cnVlO1xyXG4gICAgdGhpcy5wb3NpdGlvbkZyb21Ub3AgPSAyMDtcclxuICAgIHRoaXMuc2hvd0ltYWdlTnVtYmVyTGFiZWwgPSBmYWxzZTtcclxuICAgIHRoaXMuYWx3YXlzU2hvd05hdk9uVG91Y2hEZXZpY2VzID0gZmFsc2U7XHJcbiAgICB0aGlzLndyYXBBcm91bmQgPSBmYWxzZTtcclxuICAgIHRoaXMuZGlzYWJsZUtleWJvYXJkTmF2ID0gZmFsc2U7XHJcbiAgICB0aGlzLmRpc2FibGVTY3JvbGxpbmcgPSBmYWxzZTtcclxuICAgIHRoaXMuY2VudGVyVmVydGljYWxseSA9IGZhbHNlO1xyXG4gICAgdGhpcy5lbmFibGVUcmFuc2l0aW9uID0gdHJ1ZTtcclxuICAgIHRoaXMuYWxidW1MYWJlbCA9ICdJbWFnZSAlMSBvZiAlMic7XHJcbiAgICB0aGlzLnNob3dab29tID0gZmFsc2U7XHJcbiAgICB0aGlzLnNob3dSb3RhdGUgPSBmYWxzZTtcclxuICAgIHRoaXMuY29udGFpbmVyRWxlbWVudFJlc29sdmVyID0gKGRvY3VtZW50UmVmKSA9PiBkb2N1bWVudFJlZi5xdWVyeVNlbGVjdG9yKCdib2R5Jyk7XHJcbiAgfVxyXG59XHJcbiJdfQ==