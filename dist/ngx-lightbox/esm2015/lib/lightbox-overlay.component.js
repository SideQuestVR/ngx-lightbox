import { Component, ElementRef, HostListener, Inject, Input, Renderer2 } from '@angular/core';
import { LIGHTBOX_EVENT, LightboxEvent } from './lightbox-event.service';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "./lightbox-event.service";
const _c0 = ["lb-overlay", ""];
export class LightboxOverlayComponent {
    constructor(_elemRef, _rendererRef, _lightboxEvent, _documentRef) {
        this._elemRef = _elemRef;
        this._rendererRef = _rendererRef;
        this._lightboxEvent = _lightboxEvent;
        this._documentRef = _documentRef;
        this.classList = 'lightboxOverlay animation fadeInOverlay';
        this._subscription = this._lightboxEvent.lightboxEvent$.subscribe((event) => this._onReceivedEvent(event));
    }
    close() {
        // broadcast to itself and all others subscriber including the components
        this._lightboxEvent.broadcastLightboxEvent({ id: LIGHTBOX_EVENT.CLOSE, data: null });
    }
    ngAfterViewInit() {
        const fadeDuration = this.options.fadeDuration;
        this._rendererRef.setStyle(this._elemRef.nativeElement, '-webkit-animation-duration', `${fadeDuration}s`);
        this._rendererRef.setStyle(this._elemRef.nativeElement, 'animation-duration', `${fadeDuration}s`);
        this._sizeOverlay();
    }
    onResize() {
        this._sizeOverlay();
    }
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    _sizeOverlay() {
        const width = this._getOverlayWidth();
        const height = this._getOverlayHeight();
        this._rendererRef.setStyle(this._elemRef.nativeElement, 'width', `${width}px`);
        this._rendererRef.setStyle(this._elemRef.nativeElement, 'height', `${height}px`);
    }
    _onReceivedEvent(event) {
        switch (event.id) {
            case LIGHTBOX_EVENT.CLOSE:
                this._end();
                break;
            default:
                break;
        }
    }
    _end() {
        this.classList = 'lightboxOverlay animation fadeOutOverlay';
        // queue self destruction after the animation has finished
        // FIXME: not sure if there is any way better than this
        setTimeout(() => {
            this.cmpRef.destroy();
        }, this.options.fadeDuration * 1000);
    }
    _getOverlayWidth() {
        return Math.max(this._documentRef.body.scrollWidth, this._documentRef.body.offsetWidth, this._documentRef.documentElement.clientWidth, this._documentRef.documentElement.scrollWidth, this._documentRef.documentElement.offsetWidth);
    }
    _getOverlayHeight() {
        return Math.max(this._documentRef.body.scrollHeight, this._documentRef.body.offsetHeight, this._documentRef.documentElement.clientHeight, this._documentRef.documentElement.scrollHeight, this._documentRef.documentElement.offsetHeight);
    }
}
LightboxOverlayComponent.ɵfac = function LightboxOverlayComponent_Factory(t) { return new (t || LightboxOverlayComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i1.LightboxEvent), i0.ɵɵdirectiveInject(DOCUMENT)); };
LightboxOverlayComponent.ɵcmp = i0.ɵɵdefineComponent({ type: LightboxOverlayComponent, selectors: [["", "lb-overlay", ""]], hostVars: 2, hostBindings: function LightboxOverlayComponent_HostBindings(rf, ctx) { if (rf & 1) {
        i0.ɵɵlistener("click", function LightboxOverlayComponent_click_HostBindingHandler() { return ctx.close(); })("resize", function LightboxOverlayComponent_resize_HostBindingHandler() { return ctx.onResize(); }, false, i0.ɵɵresolveWindow);
    } if (rf & 2) {
        i0.ɵɵclassMap(ctx.classList);
    } }, inputs: { options: "options", cmpRef: "cmpRef" }, attrs: _c0, decls: 0, vars: 0, template: function LightboxOverlayComponent_Template(rf, ctx) { }, encapsulation: 2 });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3gtb3ZlcmxheS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiRDovU2lkZVF1ZXN0L1JlcG9zL25neC1saWdodGJveC9wcm9qZWN0cy9uZ3gtbGlnaHRib3gvc3JjLyIsInNvdXJjZXMiOlsibGliL2xpZ2h0Ym94LW92ZXJsYXkuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFFTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUVMLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQVUsY0FBYyxFQUFFLGFBQWEsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQVMzQyxNQUFNLE9BQU8sd0JBQXdCO0lBS25DLFlBQ1UsUUFBb0IsRUFDcEIsWUFBdUIsRUFDdkIsY0FBNkIsRUFDWCxZQUFZO1FBSDlCLGFBQVEsR0FBUixRQUFRLENBQVk7UUFDcEIsaUJBQVksR0FBWixZQUFZLENBQVc7UUFDdkIsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDWCxpQkFBWSxHQUFaLFlBQVksQ0FBQTtRQUV0QyxJQUFJLENBQUMsU0FBUyxHQUFHLHlDQUF5QyxDQUFDO1FBQzNELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBYSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNySCxDQUFDO0lBR00sS0FBSztRQUNWLHlFQUF5RTtRQUN6RSxJQUFJLENBQUMsY0FBYyxDQUFDLHNCQUFzQixDQUFDLEVBQUUsRUFBRSxFQUFFLGNBQWMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUVNLGVBQWU7UUFDcEIs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QUNGOztzQkFVSSxNQUFNO3VCQUFDLFFBQVE7d0JBUlQsT0FBTztrQkFBZixLQUFLO1lBQ0csTUFBTTtrQkFBZCxLQUFLO1lBY0MsS0FBSztrQkFEWCxZQUFZO21CQUFDLE9BQU87WUFpQmQsUUFBUTtrQkFEZCxZQUFZO21CQUFDLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcclxuXHJcbmltcG9ydCB7XHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBDb21wb25lbnQsXHJcbiAgRWxlbWVudFJlZixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5qZWN0LFxyXG4gIElucHV0LFxyXG4gIE9uRGVzdHJveSxcclxuICBSZW5kZXJlcjJcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuXHJcbmltcG9ydCB7IElFdmVudCwgTElHSFRCT1hfRVZFTlQsIExpZ2h0Ym94RXZlbnQgfSBmcm9tICcuL2xpZ2h0Ym94LWV2ZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ1tsYi1vdmVybGF5XScsXHJcbiAgdGVtcGxhdGU6ICcnLFxyXG4gIGhvc3Q6IHtcclxuICAgICdbY2xhc3NdJzogJ2NsYXNzTGlzdCdcclxuICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaWdodGJveE92ZXJsYXlDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xyXG4gIEBJbnB1dCgpIG9wdGlvbnM6IGFueTtcclxuICBASW5wdXQoKSBjbXBSZWY6IGFueTtcclxuICBwdWJsaWMgY2xhc3NMaXN0O1xyXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBfZWxlbVJlZjogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgX3JlbmRlcmVyUmVmOiBSZW5kZXJlcjIsXHJcbiAgICBwcml2YXRlIF9saWdodGJveEV2ZW50OiBMaWdodGJveEV2ZW50LFxyXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnRSZWYsXHJcbiAgKSB7XHJcbiAgICB0aGlzLmNsYXNzTGlzdCA9ICdsaWdodGJveE92ZXJsYXkgYW5pbWF0aW9uIGZhZGVJbk92ZXJsYXknO1xyXG4gICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gdGhpcy5fbGlnaHRib3hFdmVudC5saWdodGJveEV2ZW50JC5zdWJzY3JpYmUoKGV2ZW50OiBJRXZlbnQpID0+IHRoaXMuX29uUmVjZWl2ZWRFdmVudChldmVudCkpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snKVxyXG4gIHB1YmxpYyBjbG9zZSgpOiB2b2lkIHtcclxuICAgIC8vIGJyb2FkY2FzdCB0byBpdHNlbGYgYW5kIGFsbCBvdGhlcnMgc3Vic2NyaWJlciBpbmNsdWRpbmcgdGhlIGNvbXBvbmVudHNcclxuICAgIHRoaXMuX2xpZ2h0Ym94RXZlbnQuYnJvYWRjYXN0TGlnaHRib3hFdmVudCh7IGlkOiBMSUdIVEJPWF9FVkVOVC5DTE9TRSwgZGF0YTogbnVsbCB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICBjb25zdCBmYWRlRHVyYXRpb24gPSB0aGlzLm9wdGlvbnMuZmFkZUR1cmF0aW9uO1xyXG5cclxuICAgIHRoaXMuX3JlbmRlcmVyUmVmLnNldFN0eWxlKHRoaXMuX2VsZW1SZWYubmF0aXZlRWxlbWVudCxcclxuICAgICAgJy13ZWJraXQtYW5pbWF0aW9uLWR1cmF0aW9uJywgYCR7ZmFkZUR1cmF0aW9ufXNgKTtcclxuICAgIHRoaXMuX3JlbmRlcmVyUmVmLnNldFN0eWxlKHRoaXMuX2VsZW1SZWYubmF0aXZlRWxlbWVudCxcclxuICAgICAgJ2FuaW1hdGlvbi1kdXJhdGlvbicsIGAke2ZhZGVEdXJhdGlvbn1zYCk7XHJcbiAgICB0aGlzLl9zaXplT3ZlcmxheSgpO1xyXG4gIH1cclxuXHJcbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScpXHJcbiAgcHVibGljIG9uUmVzaXplKCk6IHZvaWQge1xyXG4gICAgdGhpcy5fc2l6ZU92ZXJsYXkoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2l6ZU92ZXJsYXkoKTogdm9pZCB7XHJcbiAgICBjb25zdCB3aWR0aCA9IHRoaXMuX2dldE92ZXJsYXlXaWR0aCgpO1xyXG4gICAgY29uc3QgaGVpZ2h0ID0gdGhpcy5fZ2V0T3ZlcmxheUhlaWdodCgpO1xyXG5cclxuICAgIHRoaXMuX3JlbmRlcmVyUmVmLnNldFN0eWxlKHRoaXMuX2VsZW1SZWYubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgYCR7d2lkdGh9cHhgKTtcclxuICAgIHRoaXMuX3JlbmRlcmVyUmVmLnNldFN0eWxlKHRoaXMuX2VsZW1SZWYubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsIGAke2hlaWdodH1weGApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfb25SZWNlaXZlZEV2ZW50KGV2ZW50OiBJRXZlbnQpOiB2b2lkIHtcclxuICAgIHN3aXRjaCAoZXZlbnQuaWQpIHtcclxuICAgICAgY2FzZSBMSUdIVEJPWF9FVkVOVC5DTE9TRTpcclxuICAgICAgICB0aGlzLl9lbmQoKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZW5kKCk6IHZvaWQge1xyXG4gICAgdGhpcy5jbGFzc0xpc3QgPSAnbGlnaHRib3hPdmVybGF5IGFuaW1hdGlvbiBmYWRlT3V0T3ZlcmxheSc7XHJcblxyXG4gICAgLy8gcXVldWUgc2VsZiBkZXN0cnVjdGlvbiBhZnRlciB0aGUgYW5pbWF0aW9uIGhhcyBmaW5pc2hlZFxyXG4gICAgLy8gRklYTUU6IG5vdCBzdXJlIGlmIHRoZXJlIGlzIGFueSB3YXkgYmV0dGVyIHRoYW4gdGhpc1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuY21wUmVmLmRlc3Ryb3koKTtcclxuICAgIH0sIHRoaXMub3B0aW9ucy5mYWRlRHVyYXRpb24gKiAxMDAwKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldE92ZXJsYXlXaWR0aCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1hdGgubWF4KFxyXG4gICAgICB0aGlzLl9kb2N1bWVudFJlZi5ib2R5LnNjcm9sbFdpZHRoLFxyXG4gICAgICB0aGlzLl9kb2N1bWVudFJlZi5ib2R5Lm9mZnNldFdpZHRoLFxyXG4gICAgICB0aGlzLl9kb2N1bWVudFJlZi5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsXHJcbiAgICAgIHRoaXMuX2RvY3VtZW50UmVmLmRvY3VtZW50RWxlbWVudC5zY3JvbGxXaWR0aCxcclxuICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuZG9jdW1lbnRFbGVtZW50Lm9mZnNldFdpZHRoXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZ2V0T3ZlcmxheUhlaWdodCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1hdGgubWF4KFxyXG4gICAgICB0aGlzLl9kb2N1bWVudFJlZi5ib2R5LnNjcm9sbEhlaWdodCxcclxuICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuYm9keS5vZmZzZXRIZWlnaHQsXHJcbiAgICAgIHRoaXMuX2RvY3VtZW50UmVmLmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsXHJcbiAgICAgIHRoaXMuX2RvY3VtZW50UmVmLmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQsXHJcbiAgICAgIHRoaXMuX2RvY3VtZW50UmVmLmRvY3VtZW50RWxlbWVudC5vZmZzZXRIZWlnaHRcclxuICAgICk7XHJcbiAgfVxyXG59XHJcbiJdfQ==