import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export const LIGHTBOX_EVENT = {
    CHANGE_PAGE: 1,
    CLOSE: 2,
    OPEN: 3,
    ZOOM_IN: 4,
    ZOOM_OUT: 5,
    ROTATE_LEFT: 6,
    ROTATE_RIGHT: 7,
    FILE_NOT_FOUND: 8
};
export class LightboxEvent {
    constructor() {
        this._lightboxEventSource = new Subject();
        this.lightboxEvent$ = this._lightboxEventSource.asObservable();
    }
    broadcastLightboxEvent(event) {
        this._lightboxEventSource.next(event);
    }
}
LightboxEvent.ɵfac = function LightboxEvent_Factory(t) { return new (t || LightboxEvent)(); };
LightboxEvent.ɵprov = i0.ɵɵdefineInjectable({ token: LightboxEvent, factory: LightboxEvent.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LightboxEvent, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();
function getWindow() {
    return window;
}
export class LightboxWindowRef {
    get nativeWindow() {
        return getWindow();
    }
}
LightboxWindowRef.ɵfac = function LightboxWindowRef_Factory(t) { return new (t || LightboxWindowRef)(); };
LightboxWindowRef.ɵprov = i0.ɵɵdefineInjectable({ token: LightboxWindowRef, factory: LightboxWindowRef.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LightboxWindowRef, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3gtZXZlbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1saWdodGJveC9zcmMvbGliL2xpZ2h0Ym94LWV2ZW50LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFjLE9BQU8sRUFBRSxNQUFNLE1BQU0sQ0FBQztBQUUzQyxPQUFPLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQWMxQyxNQUFNLENBQUMsTUFBTSxjQUFjLEdBQUc7SUFDNUIsV0FBVyxFQUFFLENBQUM7SUFDZCxLQUFLLEVBQUUsQ0FBQztJQUNSLElBQUksRUFBRSxDQUFDO0lBQ1AsT0FBTyxFQUFFLENBQUM7SUFDVixRQUFRLEVBQUUsQ0FBQztJQUNYLFdBQVcsRUFBRSxDQUFDO0lBQ2QsWUFBWSxFQUFFLENBQUM7SUFDZixjQUFjLEVBQUUsQ0FBQztDQUNsQixDQUFDO0FBS0YsTUFBTSxPQUFPLGFBQWE7SUFHeEI7UUFDRSxJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxPQUFPLEVBQVUsQ0FBQztRQUNsRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNqRSxDQUFDO0lBRUQsc0JBQXNCLENBQUMsS0FBVTtRQUMvQixJQUFJLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hDLENBQUM7OzBFQVZVLGFBQWE7cURBQWIsYUFBYSxXQUFiLGFBQWEsbUJBRlosTUFBTTt1RkFFUCxhQUFhO2NBSHpCLFVBQVU7ZUFBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7QUFjRCxTQUFTLFNBQVM7SUFDaEIsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUtELE1BQU0sT0FBTyxpQkFBaUI7SUFDNUIsSUFBSSxZQUFZO1FBQ1osT0FBTyxTQUFTLEVBQUUsQ0FBQztJQUN2QixDQUFDOztrRkFIVSxpQkFBaUI7eURBQWpCLGlCQUFpQixXQUFqQixpQkFBaUIsbUJBRmhCLE1BQU07dUZBRVAsaUJBQWlCO2NBSDdCLFVBQVU7ZUFBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7IEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJRXZlbnQge1xyXG4gIGlkOiBudW1iZXI7XHJcbiAgZGF0YT86IGFueTtcclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJQWxidW0ge1xyXG4gIHNyYzogc3RyaW5nO1xyXG4gIGNhcHRpb24/OiBzdHJpbmc7XHJcbiAgdGh1bWI6IHN0cmluZztcclxuICBpZnJhbWU/OiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgTElHSFRCT1hfRVZFTlQgPSB7XHJcbiAgQ0hBTkdFX1BBR0U6IDEsXHJcbiAgQ0xPU0U6IDIsXHJcbiAgT1BFTjogMyxcclxuICBaT09NX0lOOiA0LFxyXG4gIFpPT01fT1VUOiA1LFxyXG4gIFJPVEFURV9MRUZUOiA2LFxyXG4gIFJPVEFURV9SSUdIVDogNyxcclxuICBGSUxFX05PVF9GT1VORDogOFxyXG59O1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlnaHRib3hFdmVudCB7XHJcbiAgcHJpdmF0ZSBfbGlnaHRib3hFdmVudFNvdXJjZTogU3ViamVjdDxPYmplY3Q+O1xyXG4gIHB1YmxpYyBsaWdodGJveEV2ZW50JDogT2JzZXJ2YWJsZTxPYmplY3Q+O1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5fbGlnaHRib3hFdmVudFNvdXJjZSA9IG5ldyBTdWJqZWN0PE9iamVjdD4oKTtcclxuICAgIHRoaXMubGlnaHRib3hFdmVudCQgPSB0aGlzLl9saWdodGJveEV2ZW50U291cmNlLmFzT2JzZXJ2YWJsZSgpO1xyXG4gIH1cclxuXHJcbiAgYnJvYWRjYXN0TGlnaHRib3hFdmVudChldmVudDogYW55KTogdm9pZCB7XHJcbiAgICB0aGlzLl9saWdodGJveEV2ZW50U291cmNlLm5leHQoZXZlbnQpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0V2luZG93ICgpOiBhbnkge1xyXG4gIHJldHVybiB3aW5kb3c7XHJcbn1cclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIExpZ2h0Ym94V2luZG93UmVmIHtcclxuICBnZXQgbmF0aXZlV2luZG93ICgpOiBhbnkge1xyXG4gICAgICByZXR1cm4gZ2V0V2luZG93KCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==