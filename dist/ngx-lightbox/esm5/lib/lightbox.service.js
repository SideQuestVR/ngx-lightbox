import { ApplicationRef, ComponentFactoryResolver, Inject, Injectable, Injector } from '@angular/core';
import { LightboxComponent } from './lightbox.component';
import { LightboxConfig } from './lightbox-config.service';
import { LightboxEvent, LIGHTBOX_EVENT } from './lightbox-event.service';
import { LightboxOverlayComponent } from './lightbox-overlay.component';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "./lightbox-config.service";
import * as i2 from "./lightbox-event.service";
var Lightbox = /** @class */ (function () {
    function Lightbox(_componentFactoryResolver, _injector, _applicationRef, _lightboxConfig, _lightboxEvent, _documentRef) {
        this._componentFactoryResolver = _componentFactoryResolver;
        this._injector = _injector;
        this._applicationRef = _applicationRef;
        this._lightboxConfig = _lightboxConfig;
        this._lightboxEvent = _lightboxEvent;
        this._documentRef = _documentRef;
    }
    Lightbox.prototype.open = function (album, curIndex, options) {
        var _this = this;
        if (curIndex === void 0) { curIndex = 0; }
        if (options === void 0) { options = {}; }
        var overlayComponentRef = this._createComponent(LightboxOverlayComponent);
        var componentRef = this._createComponent(LightboxComponent);
        var newOptions = {};
        // broadcast open event
        this._lightboxEvent.broadcastLightboxEvent({ id: LIGHTBOX_EVENT.OPEN });
        Object.assign(newOptions, this._lightboxConfig, options);
        // attach input to lightbox
        componentRef.instance.album = album;
        componentRef.instance.currentImageIndex = curIndex;
        componentRef.instance.options = newOptions;
        componentRef.instance.cmpRef = componentRef;
        // attach input to overlay
        overlayComponentRef.instance.options = newOptions;
        overlayComponentRef.instance.cmpRef = overlayComponentRef;
        // FIXME: not sure why last event is broadcasted (which is CLOSED) and make
        // lightbox can not be opened the second time.
        // Need to timeout so that the OPEN event is set before component is initialized
        setTimeout(function () {
            _this._applicationRef.attachView(overlayComponentRef.hostView);
            _this._applicationRef.attachView(componentRef.hostView);
            overlayComponentRef.onDestroy(function () {
                _this._applicationRef.detachView(overlayComponentRef.hostView);
            });
            componentRef.onDestroy(function () {
                _this._applicationRef.detachView(componentRef.hostView);
            });
            var containerElement = newOptions.containerElementResolver(_this._documentRef);
            containerElement.appendChild(overlayComponentRef.location.nativeElement);
            containerElement.appendChild(componentRef.location.nativeElement);
        });
    };
    Lightbox.prototype.close = function () {
        if (this._lightboxEvent) {
            this._lightboxEvent.broadcastLightboxEvent({ id: LIGHTBOX_EVENT.CLOSE });
        }
    };
    Lightbox.prototype._createComponent = function (ComponentClass) {
        var factory = this._componentFactoryResolver.resolveComponentFactory(ComponentClass);
        var component = factory.create(this._injector);
        return component;
    };
    Lightbox.ɵfac = function Lightbox_Factory(t) { return new (t || Lightbox)(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.Injector), i0.ɵɵinject(i0.ApplicationRef), i0.ɵɵinject(i1.LightboxConfig), i0.ɵɵinject(i2.LightboxEvent), i0.ɵɵinject(DOCUMENT)); };
    Lightbox.ɵprov = i0.ɵɵdefineInjectable({ token: Lightbox, factory: Lightbox.ɵfac, providedIn: 'root' });
    return Lightbox;
}());
export { Lightbox };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(Lightbox, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.Injector }, { type: i0.ApplicationRef }, { type: i1.LightboxConfig }, { type: i2.LightboxEvent }, { type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1saWdodGJveC8iLCJzb3VyY2VzIjpbImxpYi9saWdodGJveC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxjQUFjLEVBQ2Qsd0JBQXdCLEVBRXhCLE1BQU0sRUFDTixVQUFVLEVBQ1YsUUFBUSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBVSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQUUzQztJQUlFLGtCQUNVLHlCQUFtRCxFQUNuRCxTQUFtQixFQUNuQixlQUErQixFQUMvQixlQUErQixFQUMvQixjQUE2QixFQUNYLFlBQVk7UUFMOUIsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEwQjtRQUNuRCxjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ25CLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFDL0IsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDWCxpQkFBWSxHQUFaLFlBQVksQ0FBQTtJQUNwQyxDQUFDO0lBRUwsdUJBQUksR0FBSixVQUFLLEtBQW9CLEVBQUUsUUFBWSxFQUFFLE9BQVk7UUFBckQsaUJBb0NDO1FBcEMwQix5QkFBQSxFQUFBLFlBQVk7UUFBRSx3QkFBQSxFQUFBLFlBQVk7UUFDbkQsSUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUM1RSxJQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUM5RCxJQUFNLFVBQVUsR0FBNEIsRUFBRSxDQUFDO1FBRS9DLHVCQUF1QjtRQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLHNCQUFzQixDQUFDLEVBQUUsRUFBRSxFQUFFLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFFekQsMkJBQTJCO1FBQzNCLFlBQVksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztRQUNwQyxZQUFZLENBQUMsUUFBUSxDQUFDLGlCQUFpQixHQUFHLFFBQVEsQ0FBQztRQUNuRCxZQUFZLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7UUFDM0MsWUFBWSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDO1FBRTVDLDBCQUEwQjtRQUMxQixtQkFBbUIsQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztRQUNsRCxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLG1CQUFtQixDQUFDO1FBRTFELDJFQUEyRTtRQUMzRSw4Q0FBOEM7UUFDOUMsZ0ZBQWdGO1FBQ2hGLFVBQVUsQ0FBQztZQUNULEtBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlELEtBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN2RCxtQkFBbUIsQ0FBQyxTQUFTLENBQUM7Z0JBQzVCLEtBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hFLENBQUMsQ0FBQyxDQUFDO1lBQ0gsWUFBWSxDQUFDLFNBQVMsQ0FBQztnQkFDckIsS0FBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pELENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBTSxnQkFBZ0IsR0FBRyxVQUFVLENBQUMsd0JBQXdCLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ2hGLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDekUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsd0JBQUssR0FBTDtRQUNFLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN2QixJQUFJLENBQUMsY0FBYyxDQUFDLHNCQUFzQixDQUFDLEVBQUUsRUFBRSxFQUFFLGNBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO1NBQzFFO0lBQ0gsQ0FBQztJQUVELG1DQUFnQixHQUFoQixVQUFpQixjQUFtQjtRQUNsQyxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsdUJBQXVCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDdkYsSUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFakQsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztvRUEzRFUsUUFBUSxpTEFPVCxRQUFRO29EQVBQLFFBQVEsV0FBUixRQUFRLG1CQUZQLE1BQU07bUJBZnBCO0NBNkVDLEFBL0RELElBK0RDO1NBNURZLFFBQVE7a0RBQVIsUUFBUTtjQUhwQixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7O3NCQVFJLE1BQU07dUJBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XHJcbiAgQXBwbGljYXRpb25SZWYsXHJcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gIENvbXBvbmVudFJlZixcclxuICBJbmplY3QsXHJcbiAgSW5qZWN0YWJsZSxcclxuICBJbmplY3RvclxyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBMaWdodGJveENvbXBvbmVudCB9IGZyb20gJy4vbGlnaHRib3guY29tcG9uZW50JztcclxuaW1wb3J0IHsgTGlnaHRib3hDb25maWcgfSBmcm9tICcuL2xpZ2h0Ym94LWNvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGlnaHRib3hFdmVudCwgTElHSFRCT1hfRVZFTlQsIElBbGJ1bSB9IGZyb20gJy4vbGlnaHRib3gtZXZlbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IExpZ2h0Ym94T3ZlcmxheUNvbXBvbmVudCB9IGZyb20gJy4vbGlnaHRib3gtb3ZlcmxheS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5ASW5qZWN0YWJsZSh7XHJcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaWdodGJveCB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwcml2YXRlIF9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICAgIHByaXZhdGUgX2luamVjdG9yOiBJbmplY3RvcixcclxuICAgIHByaXZhdGUgX2FwcGxpY2F0aW9uUmVmOiBBcHBsaWNhdGlvblJlZixcclxuICAgIHByaXZhdGUgX2xpZ2h0Ym94Q29uZmlnOiBMaWdodGJveENvbmZpZyxcclxuICAgIHByaXZhdGUgX2xpZ2h0Ym94RXZlbnQ6IExpZ2h0Ym94RXZlbnQsXHJcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudFJlZlxyXG4gICkgeyB9XHJcblxyXG4gIG9wZW4oYWxidW06IEFycmF5PElBbGJ1bT4sIGN1ckluZGV4ID0gMCwgb3B0aW9ucyA9IHt9KTogdm9pZCB7XHJcbiAgICBjb25zdCBvdmVybGF5Q29tcG9uZW50UmVmID0gdGhpcy5fY3JlYXRlQ29tcG9uZW50KExpZ2h0Ym94T3ZlcmxheUNvbXBvbmVudCk7XHJcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLl9jcmVhdGVDb21wb25lbnQoTGlnaHRib3hDb21wb25lbnQpO1xyXG4gICAgY29uc3QgbmV3T3B0aW9uczogUGFydGlhbDxMaWdodGJveENvbmZpZz4gPSB7fTtcclxuXHJcbiAgICAvLyBicm9hZGNhc3Qgb3BlbiBldmVudFxyXG4gICAgdGhpcy5fbGlnaHRib3hFdmVudC5icm9hZGNhc3RMaWdodGJveEV2ZW50KHsgaWQ6IExJR0hUQk9YX0VWRU5ULk9QRU4gfSk7XHJcbiAgICBPYmplY3QuYXNzaWduKG5ld09wdGlvbnMsIHRoaXMuX2xpZ2h0Ym94Q29uZmlnLCBvcHRpb25zKTtcclxuXHJcbiAgICAvLyBhdHRhY2ggaW5wdXQgdG8gbGlnaHRib3hcclxuICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZS5hbGJ1bSA9IGFsYnVtO1xyXG4gICAgY29tcG9uZW50UmVmLmluc3RhbmNlLmN1cnJlbnRJbWFnZUluZGV4ID0gY3VySW5kZXg7XHJcbiAgICBjb21wb25lbnRSZWYuaW5zdGFuY2Uub3B0aW9ucyA9IG5ld09wdGlvbnM7XHJcbiAgICBjb21wb25lbnRSZWYuaW5zdGFuY2UuY21wUmVmID0gY29tcG9uZW50UmVmO1xyXG5cclxuICAgIC8vIGF0dGFjaCBpbnB1dCB0byBvdmVybGF5XHJcbiAgICBvdmVybGF5Q29tcG9uZW50UmVmLmluc3RhbmNlLm9wdGlvbnMgPSBuZXdPcHRpb25zO1xyXG4gICAgb3ZlcmxheUNvbXBvbmVudFJlZi5pbnN0YW5jZS5jbXBSZWYgPSBvdmVybGF5Q29tcG9uZW50UmVmO1xyXG5cclxuICAgIC8vIEZJWE1FOiBub3Qgc3VyZSB3aHkgbGFzdCBldmVudCBpcyBicm9hZGNhc3RlZCAod2hpY2ggaXMgQ0xPU0VEKSBhbmQgbWFrZVxyXG4gICAgLy8gbGlnaHRib3ggY2FuIG5vdCBiZSBvcGVuZWQgdGhlIHNlY29uZCB0aW1lLlxyXG4gICAgLy8gTmVlZCB0byB0aW1lb3V0IHNvIHRoYXQgdGhlIE9QRU4gZXZlbnQgaXMgc2V0IGJlZm9yZSBjb21wb25lbnQgaXMgaW5pdGlhbGl6ZWRcclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLl9hcHBsaWNhdGlvblJlZi5hdHRhY2hWaWV3KG92ZXJsYXlDb21wb25lbnRSZWYuaG9zdFZpZXcpO1xyXG4gICAgICB0aGlzLl9hcHBsaWNhdGlvblJlZi5hdHRhY2hWaWV3KGNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XHJcbiAgICAgIG92ZXJsYXlDb21wb25lbnRSZWYub25EZXN0cm95KCgpID0+IHtcclxuICAgICAgICB0aGlzLl9hcHBsaWNhdGlvblJlZi5kZXRhY2hWaWV3KG92ZXJsYXlDb21wb25lbnRSZWYuaG9zdFZpZXcpO1xyXG4gICAgICB9KTtcclxuICAgICAgY29tcG9uZW50UmVmLm9uRGVzdHJveSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fYXBwbGljYXRpb25SZWYuZGV0YWNoVmlldyhjb21wb25lbnRSZWYuaG9zdFZpZXcpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGNvbnN0IGNvbnRhaW5lckVsZW1lbnQgPSBuZXdPcHRpb25zLmNvbnRhaW5lckVsZW1lbnRSZXNvbHZlcih0aGlzLl9kb2N1bWVudFJlZik7XHJcbiAgICAgIGNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQob3ZlcmxheUNvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcclxuICAgICAgY29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChjb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIGNsb3NlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX2xpZ2h0Ym94RXZlbnQpIHtcclxuICAgICAgdGhpcy5fbGlnaHRib3hFdmVudC5icm9hZGNhc3RMaWdodGJveEV2ZW50KHsgaWQ6IExJR0hUQk9YX0VWRU5ULkNMT1NFIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgX2NyZWF0ZUNvbXBvbmVudChDb21wb25lbnRDbGFzczogYW55KTogQ29tcG9uZW50UmVmPGFueT4ge1xyXG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMuX2NvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShDb21wb25lbnRDbGFzcyk7XHJcbiAgICBjb25zdCBjb21wb25lbnQgPSBmYWN0b3J5LmNyZWF0ZSh0aGlzLl9pbmplY3Rvcik7XHJcblxyXG4gICAgcmV0dXJuIGNvbXBvbmVudDtcclxuICB9XHJcbn1cclxuIl19