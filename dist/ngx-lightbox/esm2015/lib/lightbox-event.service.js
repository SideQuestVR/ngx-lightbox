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
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(LightboxEvent, [{
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
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(LightboxWindowRef, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3gtZXZlbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJEOi9TaWRlUXVlc3QvUmVwb3Mvbmd4LWxpZ2h0Ym94L3Byb2plY3RzL25neC1saWdodGJveC9zcmMvIiwic291cmNlcyI6WyJsaWIvbGlnaHRib3gtZXZlbnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBRTNDLE9BQU8sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBYzFDLE1BQU0sQ0FBQyxNQUFNLGNBQWMsR0FBRztJQUM1QixXQUFXLEVBQUUsQ0FBQztJQUNkLEtBQUssRUFBRSxDQUFDO0lBQ1IsSUFBSSxFQUFFLENBQUM7SUFDUCxPQUFPLEVBQUUsQ0FBQztJQUNWLFFBQVEsRUFBRSxDQUFDO0lBQ1gsV0FBVyxFQUFFLENBQUM7SUFDZCxZQUFZLEVBQUUsQ0FBQztJQUNmLGNBQWMsRUFBRSxDQUFDO0NBQ2xCLENBQUM7QUFLRixNQUFNLE9BQU8sYUFBYTtJQUd4QjtRQUNFLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLE9BQU8sRUFBVSxDQUFDO1FBQ2xELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2pFLENBQUM7SUFFRCxzQkFBc0IsQ0FBQyxLQUFVO1FBQy9CLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7MEVBVlUsYUFBYTtxREFBYixhQUFhLFdBQWIsYUFBYSxtQkFGWixNQUFNO2tEQUVQLGFBQWE7Y0FIekIsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COztBQWNELFNBQVMsU0FBUztJQUNoQixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBS0QsTUFBTSxPQUFPLGlCQUFpQjtJQUM1QixJQUFJLFlBQVk7UUFDWixPQUFPLFNBQVMsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7O2tGQUhVLGlCQUFpQjt5REFBakIsaUJBQWlCLFdBQWpCLGlCQUFpQixtQkFGaEIsTUFBTTtrREFFUCxpQkFBaUI7Y0FIN0IsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHsgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElFdmVudCB7XHJcbiAgaWQ6IG51bWJlcjtcclxuICBkYXRhPzogYW55O1xyXG59XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElBbGJ1bSB7XHJcbiAgc3JjOiBzdHJpbmc7XHJcbiAgY2FwdGlvbj86IHN0cmluZztcclxuICB0aHVtYjogc3RyaW5nO1xyXG4gIGlmcmFtZT86IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBMSUdIVEJPWF9FVkVOVCA9IHtcclxuICBDSEFOR0VfUEFHRTogMSxcclxuICBDTE9TRTogMixcclxuICBPUEVOOiAzLFxyXG4gIFpPT01fSU46IDQsXHJcbiAgWk9PTV9PVVQ6IDUsXHJcbiAgUk9UQVRFX0xFRlQ6IDYsXHJcbiAgUk9UQVRFX1JJR0hUOiA3LFxyXG4gIEZJTEVfTk9UX0ZPVU5EOiA4XHJcbn07XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaWdodGJveEV2ZW50IHtcclxuICBwcml2YXRlIF9saWdodGJveEV2ZW50U291cmNlOiBTdWJqZWN0PE9iamVjdD47XHJcbiAgcHVibGljIGxpZ2h0Ym94RXZlbnQkOiBPYnNlcnZhYmxlPE9iamVjdD47XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLl9saWdodGJveEV2ZW50U291cmNlID0gbmV3IFN1YmplY3Q8T2JqZWN0PigpO1xyXG4gICAgdGhpcy5saWdodGJveEV2ZW50JCA9IHRoaXMuX2xpZ2h0Ym94RXZlbnRTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XHJcbiAgfVxyXG5cclxuICBicm9hZGNhc3RMaWdodGJveEV2ZW50KGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMuX2xpZ2h0Ym94RXZlbnRTb3VyY2UubmV4dChldmVudCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXRXaW5kb3cgKCk6IGFueSB7XHJcbiAgcmV0dXJuIHdpbmRvdztcclxufVxyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlnaHRib3hXaW5kb3dSZWYge1xyXG4gIGdldCBuYXRpdmVXaW5kb3cgKCk6IGFueSB7XHJcbiAgICAgIHJldHVybiBnZXRXaW5kb3coKTtcclxuICB9XHJcbn1cclxuIl19