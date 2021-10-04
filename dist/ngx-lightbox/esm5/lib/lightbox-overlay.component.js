import { Component, ElementRef, HostListener, Inject, Input, Renderer2 } from '@angular/core';
import { LIGHTBOX_EVENT, LightboxEvent } from './lightbox-event.service';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "./lightbox-event.service";
var _c0 = ["lb-overlay", ""];
var LightboxOverlayComponent = /** @class */ (function () {
    function LightboxOverlayComponent(_elemRef, _rendererRef, _lightboxEvent, _documentRef) {
        var _this = this;
        this._elemRef = _elemRef;
        this._rendererRef = _rendererRef;
        this._lightboxEvent = _lightboxEvent;
        this._documentRef = _documentRef;
        this.classList = 'lightboxOverlay animation fadeInOverlay';
        this._subscription = this._lightboxEvent.lightboxEvent$.subscribe(function (event) { return _this._onReceivedEvent(event); });
    }
    LightboxOverlayComponent.prototype.close = function () {
        // broadcast to itself and all others subscriber including the components
        this._lightboxEvent.broadcastLightboxEvent({ id: LIGHTBOX_EVENT.CLOSE, data: null });
    };
    LightboxOverlayComponent.prototype.ngAfterViewInit = function () {
        var fadeDuration = this.options.fadeDuration;
        this._rendererRef.setStyle(this._elemRef.nativeElement, '-webkit-animation-duration', fadeDuration + "s");
        this._rendererRef.setStyle(this._elemRef.nativeElement, 'animation-duration', fadeDuration + "s");
        this._sizeOverlay();
    };
    LightboxOverlayComponent.prototype.onResize = function () {
        this._sizeOverlay();
    };
    LightboxOverlayComponent.prototype.ngOnDestroy = function () {
        this._subscription.unsubscribe();
    };
    LightboxOverlayComponent.prototype._sizeOverlay = function () {
        var width = this._getOverlayWidth();
        var height = this._getOverlayHeight();
        this._rendererRef.setStyle(this._elemRef.nativeElement, 'width', width + "px");
        this._rendererRef.setStyle(this._elemRef.nativeElement, 'height', height + "px");
    };
    LightboxOverlayComponent.prototype._onReceivedEvent = function (event) {
        switch (event.id) {
            case LIGHTBOX_EVENT.CLOSE:
                this._end();
                break;
            default:
                break;
        }
    };
    LightboxOverlayComponent.prototype._end = function () {
        var _this = this;
        this.classList = 'lightboxOverlay animation fadeOutOverlay';
        // queue self destruction after the animation has finished
        // FIXME: not sure if there is any way better than this
        setTimeout(function () {
            _this.cmpRef.destroy();
        }, this.options.fadeDuration * 1000);
    };
    LightboxOverlayComponent.prototype._getOverlayWidth = function () {
        return Math.max(this._documentRef.body.scrollWidth, this._documentRef.body.offsetWidth, this._documentRef.documentElement.clientWidth, this._documentRef.documentElement.scrollWidth, this._documentRef.documentElement.offsetWidth);
    };
    LightboxOverlayComponent.prototype._getOverlayHeight = function () {
        return Math.max(this._documentRef.body.scrollHeight, this._documentRef.body.offsetHeight, this._documentRef.documentElement.clientHeight, this._documentRef.documentElement.scrollHeight, this._documentRef.documentElement.offsetHeight);
    };
    LightboxOverlayComponent.ɵfac = function LightboxOverlayComponent_Factory(t) { return new (t || LightboxOverlayComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i1.LightboxEvent), i0.ɵɵdirectiveInject(DOCUMENT)); };
    LightboxOverlayComponent.ɵcmp = i0.ɵɵdefineComponent({ type: LightboxOverlayComponent, selectors: [["", "lb-overlay", ""]], hostVars: 2, hostBindings: function LightboxOverlayComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("click", function LightboxOverlayComponent_click_HostBindingHandler() { return ctx.close(); })("resize", function LightboxOverlayComponent_resize_HostBindingHandler() { return ctx.onResize(); }, false, i0.ɵɵresolveWindow);
        } if (rf & 2) {
            i0.ɵɵclassMap(ctx.classList);
        } }, inputs: { options: "options", cmpRef: "cmpRef" }, attrs: _c0, decls: 0, vars: 0, template: function LightboxOverlayComponent_Template(rf, ctx) { }, encapsulation: 2 });
    return LightboxOverlayComponent;
}());
export { LightboxOverlayComponent };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(LightboxOverlayComponent, [{
        type: Component,
        args: [{
                selector: '[lb-overlay]',
                template: '',
                host: {
                    '[class]': 'classList'
                }
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.LightboxEvent }, { type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, { options: [{
            type: Input
        }], cmpRef: [{
            type: Input
        }], close: [{
            type: HostListener,
            args: ['click']
        }], onResize: [{
            type: HostListener,
            args: ['window:resize']
        }] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3gtb3ZlcmxheS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtbGlnaHRib3gvIiwic291cmNlcyI6WyJsaWIvbGlnaHRib3gtb3ZlcmxheS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBRUwsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBVSxjQUFjLEVBQUUsYUFBYSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDakYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7O0FBRTNDO0lBWUUsa0NBQ1UsUUFBb0IsRUFDcEIsWUFBdUIsRUFDdkIsY0FBNkIsRUFDWCxZQUFZO1FBSnhDLGlCQVFDO1FBUFMsYUFBUSxHQUFSLFFBQVEsQ0FBWTtRQUNwQixpQkFBWSxHQUFaLFlBQVksQ0FBVztRQUN2QixtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUNYLGlCQUFZLEdBQVosWUFBWSxDQUFBO1FBRXRDLElBQUksQ0FBQyxTQUFTLEdBQUcseUNBQXlDLENBQUM7UUFDM0QsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFhLElBQUssT0FBQSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEVBQTVCLENBQTRCLENBQUMsQ0FBQztJQUNySCxDQUFDO0lBR00sd0NBQUssR0FEWjtRQUVFLHlFQUF5RTtRQUN6RSxJQUFJLENBQUMsY0FBYyxDQUFDLHNCQUFzQixDQUFDLEVBQUUsRUFBRSxFQUFFLGNBQWMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUVNLGtEQUFlLEdBQXRCO1FBQ0UsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLE9B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RUFBRTtvQkFDSixTQUFTLEVBQUUsV0FBVztpQkFDdkI7YUFDRjs7c0JBVUksTUFBTTt1QkFBQyxRQUFROztrQkFSakIsS0FBSzs7a0JBQ0wsS0FBSzs7a0JBYUwsWUFBWTttQkFBQyxPQUFPOztrQkFnQnBCLFlBQVk7bUJBQUMsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5cclxuaW1wb3J0IHtcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENvbXBvbmVudCxcclxuICBFbGVtZW50UmVmLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBJbmplY3QsXHJcbiAgSW5wdXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIFJlbmRlcmVyMlxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxuaW1wb3J0IHsgSUV2ZW50LCBMSUdIVEJPWF9FVkVOVCwgTGlnaHRib3hFdmVudCB9IGZyb20gJy4vbGlnaHRib3gtZXZlbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gIHNlbGVjdG9yOiAnW2xiLW92ZXJsYXldJyxcclxuICB0ZW1wbGF0ZTogJycsXHJcbiAgaG9zdDoge1xyXG4gICAgJ1tjbGFzc10nOiAnY2xhc3NMaXN0J1xyXG4gIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIExpZ2h0Ym94T3ZlcmxheUNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XHJcbiAgQElucHV0KCkgb3B0aW9uczogYW55O1xyXG4gIEBJbnB1dCgpIGNtcFJlZjogYW55O1xyXG4gIHB1YmxpYyBjbGFzc0xpc3Q7XHJcbiAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIF9lbGVtUmVmOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXJSZWY6IFJlbmRlcmVyMixcclxuICAgIHByaXZhdGUgX2xpZ2h0Ym94RXZlbnQ6IExpZ2h0Ym94RXZlbnQsXHJcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudFJlZixcclxuICApIHtcclxuICAgIHRoaXMuY2xhc3NMaXN0ID0gJ2xpZ2h0Ym94T3ZlcmxheSBhbmltYXRpb24gZmFkZUluT3ZlcmxheSc7XHJcbiAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSB0aGlzLl9saWdodGJveEV2ZW50LmxpZ2h0Ym94RXZlbnQkLnN1YnNjcmliZSgoZXZlbnQ6IElFdmVudCkgPT4gdGhpcy5fb25SZWNlaXZlZEV2ZW50KGV2ZW50KSk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXHJcbiAgcHVibGljIGNsb3NlKCk6IHZvaWQge1xyXG4gICAgLy8gYnJvYWRjYXN0IHRvIGl0c2VsZiBhbmQgYWxsIG90aGVycyBzdWJzY3JpYmVyIGluY2x1ZGluZyB0aGUgY29tcG9uZW50c1xyXG4gICAgdGhpcy5fbGlnaHRib3hFdmVudC5icm9hZGNhc3RMaWdodGJveEV2ZW50KHsgaWQ6IExJR0hUQk9YX0VWRU5ULkNMT1NFLCBkYXRhOiBudWxsIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IGZhZGVEdXJhdGlvbiA9IHRoaXMub3B0aW9ucy5mYWRlRHVyYXRpb247XHJcblxyXG4gICAgdGhpcy5fcmVuZGVyZXJSZWYuc2V0U3R5bGUodGhpcy5fZWxlbVJlZi5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAnLXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb24nLCBgJHtmYWRlRHVyYXRpb259c2ApO1xyXG4gICAgdGhpcy5fcmVuZGVyZXJSZWYuc2V0U3R5bGUodGhpcy5fZWxlbVJlZi5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAnYW5pbWF0aW9uLWR1cmF0aW9uJywgYCR7ZmFkZUR1cmF0aW9ufXNgKTtcclxuICAgIHRoaXMuX3NpemVPdmVybGF5KCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCd3aW5kb3c6cmVzaXplJylcclxuICBwdWJsaWMgb25SZXNpemUoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9zaXplT3ZlcmxheSgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zaXplT3ZlcmxheSgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHdpZHRoID0gdGhpcy5fZ2V0T3ZlcmxheVdpZHRoKCk7XHJcbiAgICBjb25zdCBoZWlnaHQgPSB0aGlzLl9nZXRPdmVybGF5SGVpZ2h0KCk7XHJcblxyXG4gICAgdGhpcy5fcmVuZGVyZXJSZWYuc2V0U3R5bGUodGhpcy5fZWxlbVJlZi5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCBgJHt3aWR0aH1weGApO1xyXG4gICAgdGhpcy5fcmVuZGVyZXJSZWYuc2V0U3R5bGUodGhpcy5fZWxlbVJlZi5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgYCR7aGVpZ2h0fXB4YCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9vblJlY2VpdmVkRXZlbnQoZXZlbnQ6IElFdmVudCk6IHZvaWQge1xyXG4gICAgc3dpdGNoIChldmVudC5pZCkge1xyXG4gICAgICBjYXNlIExJR0hUQk9YX0VWRU5ULkNMT1NFOlxyXG4gICAgICAgIHRoaXMuX2VuZCgpO1xyXG4gICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9lbmQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmNsYXNzTGlzdCA9ICdsaWdodGJveE92ZXJsYXkgYW5pbWF0aW9uIGZhZGVPdXRPdmVybGF5JztcclxuXHJcbiAgICAvLyBxdWV1ZSBzZWxmIGRlc3RydWN0aW9uIGFmdGVyIHRoZSBhbmltYXRpb24gaGFzIGZpbmlzaGVkXHJcbiAgICAvLyBGSVhNRTogbm90IHN1cmUgaWYgdGhlcmUgaXMgYW55IHdheSBiZXR0ZXIgdGhhbiB0aGlzXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5jbXBSZWYuZGVzdHJveSgpO1xyXG4gICAgfSwgdGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbiAqIDEwMDApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZ2V0T3ZlcmxheVdpZHRoKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5tYXgoXHJcbiAgICAgIHRoaXMuX2RvY3VtZW50UmVmLmJvZHkuc2Nyb2xsV2lkdGgsXHJcbiAgICAgIHRoaXMuX2RvY3VtZW50UmVmLmJvZHkub2Zmc2V0V2lkdGgsXHJcbiAgICAgIHRoaXMuX2RvY3VtZW50UmVmLmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCxcclxuICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFdpZHRoLFxyXG4gICAgICB0aGlzLl9kb2N1bWVudFJlZi5kb2N1bWVudEVsZW1lbnQub2Zmc2V0V2lkdGhcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9nZXRPdmVybGF5SGVpZ2h0KCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5tYXgoXHJcbiAgICAgIHRoaXMuX2RvY3VtZW50UmVmLmJvZHkuc2Nyb2xsSGVpZ2h0LFxyXG4gICAgICB0aGlzLl9kb2N1bWVudFJlZi5ib2R5Lm9mZnNldEhlaWdodCxcclxuICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCxcclxuICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCxcclxuICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuZG9jdW1lbnRFbGVtZW50Lm9mZnNldEhlaWdodFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuIl19