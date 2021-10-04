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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3gtZXZlbnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B2aXNjb2NpL25neC1saWdodGJveC8iLCJzb3VyY2VzIjpbImxpYi9saWdodGJveC1ldmVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBYyxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7QUFFM0MsT0FBTyxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFjMUMsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHO0lBQzVCLFdBQVcsRUFBRSxDQUFDO0lBQ2QsS0FBSyxFQUFFLENBQUM7SUFDUixJQUFJLEVBQUUsQ0FBQztJQUNQLE9BQU8sRUFBRSxDQUFDO0lBQ1YsUUFBUSxFQUFFLENBQUM7SUFDWCxXQUFXLEVBQUUsQ0FBQztJQUNkLFlBQVksRUFBRSxDQUFDO0lBQ2YsY0FBYyxFQUFFLENBQUM7Q0FDbEIsQ0FBQztBQUtGLE1BQU0sT0FBTyxhQUFhO0lBR3hCO1FBQ0UsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksT0FBTyxFQUFVLENBQUM7UUFDbEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsb0JBQW9CLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDakUsQ0FBQztJQUVELHNCQUFzQixDQUFDLEtBQVU7UUFDL0IsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QyxDQUFDOzswRUFWVSxhQUFhO3FEQUFiLGFBQWEsV0FBYixhQUFhLG1CQUZaLE1BQU07a0RBRVAsYUFBYTtjQUh6QixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7O0FBY0QsU0FBUyxTQUFTO0lBQ2hCLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFLRCxNQUFNLE9BQU8saUJBQWlCO0lBQzVCLElBQUksWUFBWTtRQUNaLE9BQU8sU0FBUyxFQUFFLENBQUM7SUFDdkIsQ0FBQzs7a0ZBSFUsaUJBQWlCO3lEQUFqQixpQkFBaUIsV0FBakIsaUJBQWlCLG1CQUZoQixNQUFNO2tEQUVQLGlCQUFpQjtjQUg3QixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQgeyBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUV2ZW50IHtcclxuICBpZDogbnVtYmVyO1xyXG4gIGRhdGE/OiBhbnk7XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSUFsYnVtIHtcclxuICBzcmM6IHN0cmluZztcclxuICBjYXB0aW9uPzogc3RyaW5nO1xyXG4gIHRodW1iOiBzdHJpbmc7XHJcbiAgaWZyYW1lPzogYm9vbGVhbjtcclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IExJR0hUQk9YX0VWRU5UID0ge1xyXG4gIENIQU5HRV9QQUdFOiAxLFxyXG4gIENMT1NFOiAyLFxyXG4gIE9QRU46IDMsXHJcbiAgWk9PTV9JTjogNCxcclxuICBaT09NX09VVDogNSxcclxuICBST1RBVEVfTEVGVDogNixcclxuICBST1RBVEVfUklHSFQ6IDcsXHJcbiAgRklMRV9OT1RfRk9VTkQ6IDhcclxufTtcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIExpZ2h0Ym94RXZlbnQge1xyXG4gIHByaXZhdGUgX2xpZ2h0Ym94RXZlbnRTb3VyY2U6IFN1YmplY3Q8T2JqZWN0PjtcclxuICBwdWJsaWMgbGlnaHRib3hFdmVudCQ6IE9ic2VydmFibGU8T2JqZWN0PjtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuX2xpZ2h0Ym94RXZlbnRTb3VyY2UgPSBuZXcgU3ViamVjdDxPYmplY3Q+KCk7XHJcbiAgICB0aGlzLmxpZ2h0Ym94RXZlbnQkID0gdGhpcy5fbGlnaHRib3hFdmVudFNvdXJjZS5hc09ic2VydmFibGUoKTtcclxuICB9XHJcblxyXG4gIGJyb2FkY2FzdExpZ2h0Ym94RXZlbnQoZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgdGhpcy5fbGlnaHRib3hFdmVudFNvdXJjZS5uZXh0KGV2ZW50KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldFdpbmRvdyAoKTogYW55IHtcclxuICByZXR1cm4gd2luZG93O1xyXG59XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaWdodGJveFdpbmRvd1JlZiB7XHJcbiAgZ2V0IG5hdGl2ZVdpbmRvdyAoKTogYW55IHtcclxuICAgICAgcmV0dXJuIGdldFdpbmRvdygpO1xyXG4gIH1cclxufVxyXG4iXX0=