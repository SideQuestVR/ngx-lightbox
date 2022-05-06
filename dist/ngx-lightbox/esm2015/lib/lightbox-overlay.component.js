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
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LightboxOverlayComponent, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3gtb3ZlcmxheS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZ3gtbGlnaHRib3gvc3JjL2xpYi9saWdodGJveC1vdmVybGF5LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFFTCxTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFVLGNBQWMsRUFBRSxhQUFhLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUNqRixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFTM0MsTUFBTSxPQUFPLHdCQUF3QjtJQUtuQyxZQUNVLFFBQW9CLEVBQ3BCLFlBQXVCLEVBQ3ZCLGNBQTZCLEVBQ1gsWUFBWTtRQUg5QixhQUFRLEdBQVIsUUFBUSxDQUFZO1FBQ3BCLGlCQUFZLEdBQVosWUFBWSxDQUFXO1FBQ3ZCLG1CQUFjLEdBQWQsY0FBYyxDQUFlO1FBQ1gsaUJBQVksR0FBWixZQUFZLENBQUE7UUFFdEMsSUFBSSxDQUFDLFNBQVMsR0FBRyx5Q0FBeUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQWEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDckgsQ0FBQztJQUdNLEtBQUs7UUFDVix5RUFBeUU7UUFDekUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxjQUFjLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFTSxlQUFlO1FBQ3BCLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDO1FBRS9DLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUNwRCw0QkFBNEIsRUFBRSxHQUFHLFlBQVksR0FBRyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQ3BELG9CQUFvQixFQUFFLEdBQUcsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUdNLFFBQVE7UUFDYixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVNLFdBQVc7UUFDaEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRU8sWUFBWTtRQUNsQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN0QyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUV4QyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQy9FLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLENBQUM7SUFDbkYsQ0FBQztJQUVPLGdCQUFnQixDQUFDLEtBQWE7UUFDcEMsUUFBUSxLQUFLLENBQUMsRUFBRSxFQUFFO1lBQ2hCLEtBQUssY0FBYyxDQUFDLEtBQUs7Z0JBQ3ZCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDZCxNQUFNO1lBQ047Z0JBQ0EsTUFBTTtTQUNQO0lBQ0gsQ0FBQztJQUVPLElBQUk7UUFDVixJQUFJLENBQUMsU0FBUyxHQUFHLDBDQUEwQyxDQUFDO1FBRTVELDBEQUEwRDtRQUMxRCx1REFBdUQ7UUFDdkQsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDeEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFTyxnQkFBZ0I7UUFDdEIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUNiLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUNsQyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEVBQzdDLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLFdBQVcsRUFDN0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUM5QyxDQUFDO0lBQ0osQ0FBQztJQUVPLGlCQUFpQjtRQUN2QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUNuQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLFlBQVksRUFDOUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsWUFBWSxFQUM5QyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQy9DLENBQUM7SUFDSixDQUFDOztnR0F0RlUsd0JBQXdCLHdJQVN6QixRQUFROzZEQVRQLHdCQUF3QjtxR0FBeEIsV0FBTyxzRkFBUCxjQUFVOzs7O3VGQUFWLHdCQUF3QjtjQVBwQyxTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFFBQVEsRUFBRSxFQUFFO2dCQUNaLElBQUksRUFBRTtvQkFDSixTQUFTLEVBQUUsV0FBVztpQkFDdkI7YUFDRjs7c0JBVUksTUFBTTt1QkFBQyxRQUFRO3dCQVJULE9BQU87a0JBQWYsS0FBSztZQUNHLE1BQU07a0JBQWQsS0FBSztZQWNDLEtBQUs7a0JBRFgsWUFBWTttQkFBQyxPQUFPO1lBaUJkLFFBQVE7a0JBRGQsWUFBWTttQkFBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XHJcblxyXG5pbXBvcnQge1xyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgQ29tcG9uZW50LFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgSG9zdExpc3RlbmVyLFxyXG4gIEluamVjdCxcclxuICBJbnB1dCxcclxuICBPbkRlc3Ryb3ksXHJcbiAgUmVuZGVyZXIyXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5pbXBvcnQgeyBJRXZlbnQsIExJR0hUQk9YX0VWRU5ULCBMaWdodGJveEV2ZW50IH0gZnJvbSAnLi9saWdodGJveC1ldmVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdbbGItb3ZlcmxheV0nLFxyXG4gIHRlbXBsYXRlOiAnJyxcclxuICBob3N0OiB7XHJcbiAgICAnW2NsYXNzXSc6ICdjbGFzc0xpc3QnXHJcbiAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlnaHRib3hPdmVybGF5Q29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuICBASW5wdXQoKSBvcHRpb25zOiBhbnk7XHJcbiAgQElucHV0KCkgY21wUmVmOiBhbnk7XHJcbiAgcHVibGljIGNsYXNzTGlzdDtcclxuICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX2VsZW1SZWY6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIF9yZW5kZXJlclJlZjogUmVuZGVyZXIyLFxyXG4gICAgcHJpdmF0ZSBfbGlnaHRib3hFdmVudDogTGlnaHRib3hFdmVudCxcclxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50UmVmLFxyXG4gICkge1xyXG4gICAgdGhpcy5jbGFzc0xpc3QgPSAnbGlnaHRib3hPdmVybGF5IGFuaW1hdGlvbiBmYWRlSW5PdmVybGF5JztcclxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IHRoaXMuX2xpZ2h0Ym94RXZlbnQubGlnaHRib3hFdmVudCQuc3Vic2NyaWJlKChldmVudDogSUV2ZW50KSA9PiB0aGlzLl9vblJlY2VpdmVkRXZlbnQoZXZlbnQpKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJylcclxuICBwdWJsaWMgY2xvc2UoKTogdm9pZCB7XHJcbiAgICAvLyBicm9hZGNhc3QgdG8gaXRzZWxmIGFuZCBhbGwgb3RoZXJzIHN1YnNjcmliZXIgaW5jbHVkaW5nIHRoZSBjb21wb25lbnRzXHJcbiAgICB0aGlzLl9saWdodGJveEV2ZW50LmJyb2FkY2FzdExpZ2h0Ym94RXZlbnQoeyBpZDogTElHSFRCT1hfRVZFTlQuQ0xPU0UsIGRhdGE6IG51bGwgfSk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xyXG4gICAgY29uc3QgZmFkZUR1cmF0aW9uID0gdGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbjtcclxuXHJcbiAgICB0aGlzLl9yZW5kZXJlclJlZi5zZXRTdHlsZSh0aGlzLl9lbGVtUmVmLm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICctd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbicsIGAke2ZhZGVEdXJhdGlvbn1zYCk7XHJcbiAgICB0aGlzLl9yZW5kZXJlclJlZi5zZXRTdHlsZSh0aGlzLl9lbGVtUmVmLm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICdhbmltYXRpb24tZHVyYXRpb24nLCBgJHtmYWRlRHVyYXRpb259c2ApO1xyXG4gICAgdGhpcy5fc2l6ZU92ZXJsYXkoKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ3dpbmRvdzpyZXNpemUnKVxyXG4gIHB1YmxpYyBvblJlc2l6ZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuX3NpemVPdmVybGF5KCk7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3NpemVPdmVybGF5KCk6IHZvaWQge1xyXG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLl9nZXRPdmVybGF5V2lkdGgoKTtcclxuICAgIGNvbnN0IGhlaWdodCA9IHRoaXMuX2dldE92ZXJsYXlIZWlnaHQoKTtcclxuXHJcbiAgICB0aGlzLl9yZW5kZXJlclJlZi5zZXRTdHlsZSh0aGlzLl9lbGVtUmVmLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIGAke3dpZHRofXB4YCk7XHJcbiAgICB0aGlzLl9yZW5kZXJlclJlZi5zZXRTdHlsZSh0aGlzLl9lbGVtUmVmLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCBgJHtoZWlnaHR9cHhgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX29uUmVjZWl2ZWRFdmVudChldmVudDogSUV2ZW50KTogdm9pZCB7XHJcbiAgICBzd2l0Y2ggKGV2ZW50LmlkKSB7XHJcbiAgICAgIGNhc2UgTElHSFRCT1hfRVZFTlQuQ0xPU0U6XHJcbiAgICAgICAgdGhpcy5fZW5kKCk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgICBkZWZhdWx0OlxyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2VuZCgpOiB2b2lkIHtcclxuICAgIHRoaXMuY2xhc3NMaXN0ID0gJ2xpZ2h0Ym94T3ZlcmxheSBhbmltYXRpb24gZmFkZU91dE92ZXJsYXknO1xyXG5cclxuICAgIC8vIHF1ZXVlIHNlbGYgZGVzdHJ1Y3Rpb24gYWZ0ZXIgdGhlIGFuaW1hdGlvbiBoYXMgZmluaXNoZWRcclxuICAgIC8vIEZJWE1FOiBub3Qgc3VyZSBpZiB0aGVyZSBpcyBhbnkgd2F5IGJldHRlciB0aGFuIHRoaXNcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmNtcFJlZi5kZXN0cm95KCk7XHJcbiAgICB9LCB0aGlzLm9wdGlvbnMuZmFkZUR1cmF0aW9uICogMTAwMCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9nZXRPdmVybGF5V2lkdGgoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLm1heChcclxuICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuYm9keS5zY3JvbGxXaWR0aCxcclxuICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuYm9keS5vZmZzZXRXaWR0aCxcclxuICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLFxyXG4gICAgICB0aGlzLl9kb2N1bWVudFJlZi5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsV2lkdGgsXHJcbiAgICAgIHRoaXMuX2RvY3VtZW50UmVmLmRvY3VtZW50RWxlbWVudC5vZmZzZXRXaWR0aFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldE92ZXJsYXlIZWlnaHQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBNYXRoLm1heChcclxuICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuYm9keS5zY3JvbGxIZWlnaHQsXHJcbiAgICAgIHRoaXMuX2RvY3VtZW50UmVmLmJvZHkub2Zmc2V0SGVpZ2h0LFxyXG4gICAgICB0aGlzLl9kb2N1bWVudFJlZi5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LFxyXG4gICAgICB0aGlzLl9kb2N1bWVudFJlZi5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LFxyXG4gICAgICB0aGlzLl9kb2N1bWVudFJlZi5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0XHJcbiAgICApO1xyXG4gIH1cclxufVxyXG4iXX0=