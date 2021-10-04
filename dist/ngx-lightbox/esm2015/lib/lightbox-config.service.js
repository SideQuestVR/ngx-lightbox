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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3gtY29uZmlnLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdmlzY29jaS9uZ3gtbGlnaHRib3gvIiwic291cmNlcyI6WyJsaWIvbGlnaHRib3gtY29uZmlnLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFJM0MsTUFBTSxPQUFPLGNBQWM7SUFpQnpCO1FBQ0UsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7UUFDeEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxHQUFHLENBQUM7UUFDMUIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQztRQUMvQixJQUFJLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO1FBQ2xDLElBQUksQ0FBQywyQkFBMkIsR0FBRyxLQUFLLENBQUM7UUFDekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO1FBQzlCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7UUFDOUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQztRQUM3QixJQUFJLENBQUMsVUFBVSxHQUFHLGdCQUFnQixDQUFDO1FBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyx3QkFBd0IsR0FBRyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyRixDQUFDOzs0RUFqQ1UsY0FBYztzREFBZCxjQUFjLFdBQWQsY0FBYyxtQkFGYixNQUFNO2tEQUVQLGNBQWM7Y0FIMUIsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaWdodGJveENvbmZpZyB7XHJcbiAgcHVibGljIGZhZGVEdXJhdGlvbjogbnVtYmVyO1xyXG4gIHB1YmxpYyByZXNpemVEdXJhdGlvbjogbnVtYmVyO1xyXG4gIHB1YmxpYyBmaXRJbWFnZUluVmlld1BvcnQ6IGJvb2xlYW47XHJcbiAgcHVibGljIHBvc2l0aW9uRnJvbVRvcDogbnVtYmVyO1xyXG4gIHB1YmxpYyBzaG93SW1hZ2VOdW1iZXJMYWJlbDogYm9vbGVhbjtcclxuICBwdWJsaWMgYWx3YXlzU2hvd05hdk9uVG91Y2hEZXZpY2VzOiBib29sZWFuO1xyXG4gIHB1YmxpYyB3cmFwQXJvdW5kOiBib29sZWFuO1xyXG4gIHB1YmxpYyBkaXNhYmxlS2V5Ym9hcmROYXY6IGJvb2xlYW47XHJcbiAgcHVibGljIGRpc2FibGVTY3JvbGxpbmc6IGJvb2xlYW47XHJcbiAgcHVibGljIGNlbnRlclZlcnRpY2FsbHk6IGJvb2xlYW47XHJcbiAgcHVibGljIGVuYWJsZVRyYW5zaXRpb246IGJvb2xlYW47XHJcbiAgcHVibGljIGFsYnVtTGFiZWw6IHN0cmluZztcclxuICBwdWJsaWMgc2hvd1pvb206IGJvb2xlYW47XHJcbiAgcHVibGljIHNob3dSb3RhdGU6IGJvb2xlYW47XHJcbiAgcHVibGljIGNvbnRhaW5lckVsZW1lbnRSZXNvbHZlcjogKGRvY3VtZW50OiBhbnkpID0+IEhUTUxFbGVtZW50O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuZmFkZUR1cmF0aW9uID0gMC43O1xyXG4gICAgdGhpcy5yZXNpemVEdXJhdGlvbiA9IDAuNTtcclxuICAgIHRoaXMuZml0SW1hZ2VJblZpZXdQb3J0ID0gdHJ1ZTtcclxuICAgIHRoaXMucG9zaXRpb25Gcm9tVG9wID0gMjA7XHJcbiAgICB0aGlzLnNob3dJbWFnZU51bWJlckxhYmVsID0gZmFsc2U7XHJcbiAgICB0aGlzLmFsd2F5c1Nob3dOYXZPblRvdWNoRGV2aWNlcyA9IGZhbHNlO1xyXG4gICAgdGhpcy53cmFwQXJvdW5kID0gZmFsc2U7XHJcbiAgICB0aGlzLmRpc2FibGVLZXlib2FyZE5hdiA9IGZhbHNlO1xyXG4gICAgdGhpcy5kaXNhYmxlU2Nyb2xsaW5nID0gZmFsc2U7XHJcbiAgICB0aGlzLmNlbnRlclZlcnRpY2FsbHkgPSBmYWxzZTtcclxuICAgIHRoaXMuZW5hYmxlVHJhbnNpdGlvbiA9IHRydWU7XHJcbiAgICB0aGlzLmFsYnVtTGFiZWwgPSAnSW1hZ2UgJTEgb2YgJTInO1xyXG4gICAgdGhpcy5zaG93Wm9vbSA9IGZhbHNlO1xyXG4gICAgdGhpcy5zaG93Um90YXRlID0gZmFsc2U7XHJcbiAgICB0aGlzLmNvbnRhaW5lckVsZW1lbnRSZXNvbHZlciA9IChkb2N1bWVudFJlZikgPT4gZG9jdW1lbnRSZWYucXVlcnlTZWxlY3RvcignYm9keScpO1xyXG4gIH1cclxufVxyXG4iXX0=