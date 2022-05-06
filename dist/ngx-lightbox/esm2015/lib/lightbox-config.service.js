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
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(LightboxConfig, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3gtY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiRDovU2lkZVF1ZXN0L1JlcG9zL25neC1saWdodGJveC9wcm9qZWN0cy9uZ3gtbGlnaHRib3gvc3JjLyIsInNvdXJjZXMiOlsibGliL2xpZ2h0Ym94LWNvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBSTNDLE1BQU0sT0FBTyxjQUFjO0lBaUJ6QjtRQUNFLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxjQUFjLEdBQUcsR0FBRyxDQUFDO1FBQzFCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7UUFDL0IsSUFBSSxDQUFDLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDMUIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQztRQUNsQyxJQUFJLENBQUMsMkJBQTJCLEdBQUcsS0FBSyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQztRQUM5QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7UUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQztRQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsd0JBQXdCLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckYsQ0FBQzs7NEVBakNVLGNBQWM7c0RBQWQsY0FBYyxXQUFkLGNBQWMsbUJBRmIsTUFBTTtrREFFUCxjQUFjO2NBSDFCLFVBQVU7ZUFBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlnaHRib3hDb25maWcge1xyXG4gIHB1YmxpYyBmYWRlRHVyYXRpb246IG51bWJlcjtcclxuICBwdWJsaWMgcmVzaXplRHVyYXRpb246IG51bWJlcjtcclxuICBwdWJsaWMgZml0SW1hZ2VJblZpZXdQb3J0OiBib29sZWFuO1xyXG4gIHB1YmxpYyBwb3NpdGlvbkZyb21Ub3A6IG51bWJlcjtcclxuICBwdWJsaWMgc2hvd0ltYWdlTnVtYmVyTGFiZWw6IGJvb2xlYW47XHJcbiAgcHVibGljIGFsd2F5c1Nob3dOYXZPblRvdWNoRGV2aWNlczogYm9vbGVhbjtcclxuICBwdWJsaWMgd3JhcEFyb3VuZDogYm9vbGVhbjtcclxuICBwdWJsaWMgZGlzYWJsZUtleWJvYXJkTmF2OiBib29sZWFuO1xyXG4gIHB1YmxpYyBkaXNhYmxlU2Nyb2xsaW5nOiBib29sZWFuO1xyXG4gIHB1YmxpYyBjZW50ZXJWZXJ0aWNhbGx5OiBib29sZWFuO1xyXG4gIHB1YmxpYyBlbmFibGVUcmFuc2l0aW9uOiBib29sZWFuO1xyXG4gIHB1YmxpYyBhbGJ1bUxhYmVsOiBzdHJpbmc7XHJcbiAgcHVibGljIHNob3dab29tOiBib29sZWFuO1xyXG4gIHB1YmxpYyBzaG93Um90YXRlOiBib29sZWFuO1xyXG4gIHB1YmxpYyBjb250YWluZXJFbGVtZW50UmVzb2x2ZXI6IChkb2N1bWVudDogYW55KSA9PiBIVE1MRWxlbWVudDtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmZhZGVEdXJhdGlvbiA9IDAuNztcclxuICAgIHRoaXMucmVzaXplRHVyYXRpb24gPSAwLjU7XHJcbiAgICB0aGlzLmZpdEltYWdlSW5WaWV3UG9ydCA9IHRydWU7XHJcbiAgICB0aGlzLnBvc2l0aW9uRnJvbVRvcCA9IDIwO1xyXG4gICAgdGhpcy5zaG93SW1hZ2VOdW1iZXJMYWJlbCA9IGZhbHNlO1xyXG4gICAgdGhpcy5hbHdheXNTaG93TmF2T25Ub3VjaERldmljZXMgPSBmYWxzZTtcclxuICAgIHRoaXMud3JhcEFyb3VuZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5kaXNhYmxlS2V5Ym9hcmROYXYgPSBmYWxzZTtcclxuICAgIHRoaXMuZGlzYWJsZVNjcm9sbGluZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5jZW50ZXJWZXJ0aWNhbGx5ID0gZmFsc2U7XHJcbiAgICB0aGlzLmVuYWJsZVRyYW5zaXRpb24gPSB0cnVlO1xyXG4gICAgdGhpcy5hbGJ1bUxhYmVsID0gJ0ltYWdlICUxIG9mICUyJztcclxuICAgIHRoaXMuc2hvd1pvb20gPSBmYWxzZTtcclxuICAgIHRoaXMuc2hvd1JvdGF0ZSA9IGZhbHNlO1xyXG4gICAgdGhpcy5jb250YWluZXJFbGVtZW50UmVzb2x2ZXIgPSAoZG9jdW1lbnRSZWYpID0+IGRvY3VtZW50UmVmLnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKTtcclxuICB9XHJcbn1cclxuIl19