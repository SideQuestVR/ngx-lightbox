import { ApplicationRef, ComponentFactoryResolver, Inject, Injectable, Injector } from '@angular/core';
import { LightboxComponent } from './lightbox.component';
import { LightboxConfig } from './lightbox-config.service';
import { LightboxEvent, LIGHTBOX_EVENT } from './lightbox-event.service';
import { LightboxOverlayComponent } from './lightbox-overlay.component';
import { DOCUMENT } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "./lightbox-config.service";
import * as i2 from "./lightbox-event.service";
export class Lightbox {
    constructor(_componentFactoryResolver, _injector, _applicationRef, _lightboxConfig, _lightboxEvent, _documentRef) {
        this._componentFactoryResolver = _componentFactoryResolver;
        this._injector = _injector;
        this._applicationRef = _applicationRef;
        this._lightboxConfig = _lightboxConfig;
        this._lightboxEvent = _lightboxEvent;
        this._documentRef = _documentRef;
    }
    open(album, curIndex = 0, options = {}) {
        const overlayComponentRef = this._createComponent(LightboxOverlayComponent);
        const componentRef = this._createComponent(LightboxComponent);
        const newOptions = {};
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
        setTimeout(() => {
            this._applicationRef.attachView(overlayComponentRef.hostView);
            this._applicationRef.attachView(componentRef.hostView);
            overlayComponentRef.onDestroy(() => {
                this._applicationRef.detachView(overlayComponentRef.hostView);
            });
            componentRef.onDestroy(() => {
                this._applicationRef.detachView(componentRef.hostView);
            });
            const containerElement = newOptions.containerElementResolver(this._documentRef);
            containerElement.appendChild(overlayComponentRef.location.nativeElement);
            containerElement.appendChild(componentRef.location.nativeElement);
        });
    }
    close() {
        if (this._lightboxEvent) {
            this._lightboxEvent.broadcastLightboxEvent({ id: LIGHTBOX_EVENT.CLOSE });
        }
    }
    _createComponent(ComponentClass) {
        const factory = this._componentFactoryResolver.resolveComponentFactory(ComponentClass);
        const component = factory.create(this._injector);
        return component;
    }
}
Lightbox.ɵfac = function Lightbox_Factory(t) { return new (t || Lightbox)(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.Injector), i0.ɵɵinject(i0.ApplicationRef), i0.ɵɵinject(i1.LightboxConfig), i0.ɵɵinject(i2.LightboxEvent), i0.ɵɵinject(DOCUMENT)); };
Lightbox.ɵprov = i0.ɵɵdefineInjectable({ token: Lightbox, factory: Lightbox.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(Lightbox, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.Injector }, { type: i0.ApplicationRef }, { type: i1.LightboxConfig }, { type: i2.LightboxEvent }, { type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1saWdodGJveC8iLCJzb3VyY2VzIjpbImxpYi9saWdodGJveC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxjQUFjLEVBQ2Qsd0JBQXdCLEVBRXhCLE1BQU0sRUFDTixVQUFVLEVBQ1YsUUFBUSxFQUNULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLGNBQWMsRUFBVSxNQUFNLDBCQUEwQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQUszQyxNQUFNLE9BQU8sUUFBUTtJQUNuQixZQUNVLHlCQUFtRCxFQUNuRCxTQUFtQixFQUNuQixlQUErQixFQUMvQixlQUErQixFQUMvQixjQUE2QixFQUNYLFlBQVk7UUFMOUIsOEJBQXlCLEdBQXpCLHlCQUF5QixDQUEwQjtRQUNuRCxjQUFTLEdBQVQsU0FBUyxDQUFVO1FBQ25CLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixvQkFBZSxHQUFmLGVBQWUsQ0FBZ0I7UUFDL0IsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFDWCxpQkFBWSxHQUFaLFlBQVksQ0FBQTtJQUNwQyxDQUFDO0lBRUwsSUFBSSxDQUFDLEtBQW9CLEVBQUUsUUFBUSxHQUFHLENBQUMsRUFBRSxPQUFPLEdBQUcsRUFBRTtRQUNuRCxNQUFNLG1CQUFtQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQzVFLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzlELE1BQU0sVUFBVSxHQUE0QixFQUFFLENBQUM7UUFFL0MsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsc0JBQXNCLENBQUMsRUFBRSxFQUFFLEVBQUUsY0FBYyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDeEUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUV6RCwyQkFBMkI7UUFDM0IsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ3BDLFlBQVksQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDO1FBQ25ELFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxHQUFHLFVBQVUsQ0FBQztRQUMzQyxZQUFZLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUM7UUFFNUMsMEJBQTBCO1FBQzFCLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO1FBQ2xELG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsbUJBQW1CLENBQUM7UUFFMUQsMkVBQTJFO1FBQzNFLDhDQUE4QztRQUM5QyxnRkFBZ0Y7UUFDaEYsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN2RCxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUNqQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNoRSxDQUFDLENBQUMsQ0FBQztZQUNILFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO2dCQUMxQixJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekQsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLGdCQUFnQixHQUFHLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDaEYsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUN6RSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwRSxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxjQUFjLENBQUMsc0JBQXNCLENBQUMsRUFBRSxFQUFFLEVBQUUsY0FBYyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7U0FDMUU7SUFDSCxDQUFDO0lBRUQsZ0JBQWdCLENBQUMsY0FBbUI7UUFDbEMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixDQUFDLHVCQUF1QixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3ZGLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRWpELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7O2dFQTNEVSxRQUFRLGlMQU9ULFFBQVE7Z0RBUFAsUUFBUSxXQUFSLFFBQVEsbUJBRlAsTUFBTTtrREFFUCxRQUFRO2NBSHBCLFVBQVU7ZUFBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7c0JBUUksTUFBTTt1QkFBQyxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcclxuICBBcHBsaWNhdGlvblJlZixcclxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgQ29tcG9uZW50UmVmLFxyXG4gIEluamVjdCxcclxuICBJbmplY3RhYmxlLFxyXG4gIEluamVjdG9yXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IExpZ2h0Ym94Q29tcG9uZW50IH0gZnJvbSAnLi9saWdodGJveC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBMaWdodGJveENvbmZpZyB9IGZyb20gJy4vbGlnaHRib3gtY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMaWdodGJveEV2ZW50LCBMSUdIVEJPWF9FVkVOVCwgSUFsYnVtIH0gZnJvbSAnLi9saWdodGJveC1ldmVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGlnaHRib3hPdmVybGF5Q29tcG9uZW50IH0gZnJvbSAnLi9saWdodGJveC1vdmVybGF5LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBJbmplY3RhYmxlKHtcclxuICBwcm92aWRlZEluOiAncm9vdCdcclxufSlcclxuZXhwb3J0IGNsYXNzIExpZ2h0Ym94IHtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX2NvbXBvbmVudEZhY3RvcnlSZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxyXG4gICAgcHJpdmF0ZSBfaW5qZWN0b3I6IEluamVjdG9yLFxyXG4gICAgcHJpdmF0ZSBfYXBwbGljYXRpb25SZWY6IEFwcGxpY2F0aW9uUmVmLFxyXG4gICAgcHJpdmF0ZSBfbGlnaHRib3hDb25maWc6IExpZ2h0Ym94Q29uZmlnLFxyXG4gICAgcHJpdmF0ZSBfbGlnaHRib3hFdmVudDogTGlnaHRib3hFdmVudCxcclxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50UmVmXHJcbiAgKSB7IH1cclxuXHJcbiAgb3BlbihhbGJ1bTogQXJyYXk8SUFsYnVtPiwgY3VySW5kZXggPSAwLCBvcHRpb25zID0ge30pOiB2b2lkIHtcclxuICAgIGNvbnN0IG92ZXJsYXlDb21wb25lbnRSZWYgPSB0aGlzLl9jcmVhdGVDb21wb25lbnQoTGlnaHRib3hPdmVybGF5Q29tcG9uZW50KTtcclxuICAgIGNvbnN0IGNvbXBvbmVudFJlZiA9IHRoaXMuX2NyZWF0ZUNvbXBvbmVudChMaWdodGJveENvbXBvbmVudCk7XHJcbiAgICBjb25zdCBuZXdPcHRpb25zOiBQYXJ0aWFsPExpZ2h0Ym94Q29uZmlnPiA9IHt9O1xyXG5cclxuICAgIC8vIGJyb2FkY2FzdCBvcGVuIGV2ZW50XHJcbiAgICB0aGlzLl9saWdodGJveEV2ZW50LmJyb2FkY2FzdExpZ2h0Ym94RXZlbnQoeyBpZDogTElHSFRCT1hfRVZFTlQuT1BFTiB9KTtcclxuICAgIE9iamVjdC5hc3NpZ24obmV3T3B0aW9ucywgdGhpcy5fbGlnaHRib3hDb25maWcsIG9wdGlvbnMpO1xyXG5cclxuICAgIC8vIGF0dGFjaCBpbnB1dCB0byBsaWdodGJveFxyXG4gICAgY29tcG9uZW50UmVmLmluc3RhbmNlLmFsYnVtID0gYWxidW07XHJcbiAgICBjb21wb25lbnRSZWYuaW5zdGFuY2UuY3VycmVudEltYWdlSW5kZXggPSBjdXJJbmRleDtcclxuICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZS5vcHRpb25zID0gbmV3T3B0aW9ucztcclxuICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZS5jbXBSZWYgPSBjb21wb25lbnRSZWY7XHJcblxyXG4gICAgLy8gYXR0YWNoIGlucHV0IHRvIG92ZXJsYXlcclxuICAgIG92ZXJsYXlDb21wb25lbnRSZWYuaW5zdGFuY2Uub3B0aW9ucyA9IG5ld09wdGlvbnM7XHJcbiAgICBvdmVybGF5Q29tcG9uZW50UmVmLmluc3RhbmNlLmNtcFJlZiA9IG92ZXJsYXlDb21wb25lbnRSZWY7XHJcblxyXG4gICAgLy8gRklYTUU6IG5vdCBzdXJlIHdoeSBsYXN0IGV2ZW50IGlzIGJyb2FkY2FzdGVkICh3aGljaCBpcyBDTE9TRUQpIGFuZCBtYWtlXHJcbiAgICAvLyBsaWdodGJveCBjYW4gbm90IGJlIG9wZW5lZCB0aGUgc2Vjb25kIHRpbWUuXHJcbiAgICAvLyBOZWVkIHRvIHRpbWVvdXQgc28gdGhhdCB0aGUgT1BFTiBldmVudCBpcyBzZXQgYmVmb3JlIGNvbXBvbmVudCBpcyBpbml0aWFsaXplZFxyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2FwcGxpY2F0aW9uUmVmLmF0dGFjaFZpZXcob3ZlcmxheUNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XHJcbiAgICAgIHRoaXMuX2FwcGxpY2F0aW9uUmVmLmF0dGFjaFZpZXcoY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcclxuICAgICAgb3ZlcmxheUNvbXBvbmVudFJlZi5vbkRlc3Ryb3koKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX2FwcGxpY2F0aW9uUmVmLmRldGFjaFZpZXcob3ZlcmxheUNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XHJcbiAgICAgIH0pO1xyXG4gICAgICBjb21wb25lbnRSZWYub25EZXN0cm95KCgpID0+IHtcclxuICAgICAgICB0aGlzLl9hcHBsaWNhdGlvblJlZi5kZXRhY2hWaWV3KGNvbXBvbmVudFJlZi5ob3N0Vmlldyk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgY29uc3QgY29udGFpbmVyRWxlbWVudCA9IG5ld09wdGlvbnMuY29udGFpbmVyRWxlbWVudFJlc29sdmVyKHRoaXMuX2RvY3VtZW50UmVmKTtcclxuICAgICAgY29udGFpbmVyRWxlbWVudC5hcHBlbmRDaGlsZChvdmVybGF5Q29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgICBjb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKGNvbXBvbmVudFJlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgY2xvc2UoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5fbGlnaHRib3hFdmVudCkge1xyXG4gICAgICB0aGlzLl9saWdodGJveEV2ZW50LmJyb2FkY2FzdExpZ2h0Ym94RXZlbnQoeyBpZDogTElHSFRCT1hfRVZFTlQuQ0xPU0UgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBfY3JlYXRlQ29tcG9uZW50KENvbXBvbmVudENsYXNzOiBhbnkpOiBDb21wb25lbnRSZWY8YW55PiB7XHJcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5fY29tcG9uZW50RmFjdG9yeVJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KENvbXBvbmVudENsYXNzKTtcclxuICAgIGNvbnN0IGNvbXBvbmVudCA9IGZhY3RvcnkuY3JlYXRlKHRoaXMuX2luamVjdG9yKTtcclxuXHJcbiAgICByZXR1cm4gY29tcG9uZW50O1xyXG4gIH1cclxufVxyXG4iXX0=