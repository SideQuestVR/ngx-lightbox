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
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Lightbox, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.Injector }, { type: i0.ApplicationRef }, { type: i1.LightboxConfig }, { type: i2.LightboxEvent }, { type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3guc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL25neC1saWdodGJveC9zcmMvbGliL2xpZ2h0Ym94LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLGNBQWMsRUFDZCx3QkFBd0IsRUFFeEIsTUFBTSxFQUNOLFVBQVUsRUFDVixRQUFRLEVBQ1QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFVLE1BQU0sMEJBQTBCLENBQUM7QUFDakYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7O0FBSzNDLE1BQU0sT0FBTyxRQUFRO0lBQ25CLFlBQ1UseUJBQW1ELEVBQ25ELFNBQW1CLEVBQ25CLGVBQStCLEVBQy9CLGVBQStCLEVBQy9CLGNBQTZCLEVBQ1gsWUFBWTtRQUw5Qiw4QkFBeUIsR0FBekIseUJBQXlCLENBQTBCO1FBQ25ELGNBQVMsR0FBVCxTQUFTLENBQVU7UUFDbkIsb0JBQWUsR0FBZixlQUFlLENBQWdCO1FBQy9CLG9CQUFlLEdBQWYsZUFBZSxDQUFnQjtRQUMvQixtQkFBYyxHQUFkLGNBQWMsQ0FBZTtRQUNYLGlCQUFZLEdBQVosWUFBWSxDQUFBO0lBQ3BDLENBQUM7SUFFTCxJQUFJLENBQUMsS0FBb0IsRUFBRSxRQUFRLEdBQUcsQ0FBQyxFQUFFLE9BQU8sR0FBRyxFQUFFO1FBQ25ELE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDNUUsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDOUQsTUFBTSxVQUFVLEdBQTRCLEVBQUUsQ0FBQztRQUUvQyx1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxjQUFjLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN4RSxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXpELDJCQUEyQjtRQUMzQixZQUFZLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDcEMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsR0FBRyxRQUFRLENBQUM7UUFDbkQsWUFBWSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO1FBQzNDLFlBQVksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLFlBQVksQ0FBQztRQUU1QywwQkFBMEI7UUFDMUIsbUJBQW1CLENBQUMsUUFBUSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7UUFDbEQsbUJBQW1CLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxtQkFBbUIsQ0FBQztRQUUxRCwyRUFBMkU7UUFDM0UsOENBQThDO1FBQzlDLGdGQUFnRjtRQUNoRixVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDOUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3ZELG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQ2pDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2hFLENBQUMsQ0FBQyxDQUFDO1lBQ0gsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6RCxDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sZ0JBQWdCLEdBQUcsVUFBVSxDQUFDLHdCQUF3QixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNoRixnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsbUJBQW1CLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ3pFLGdCQUFnQixDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3BFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLElBQUksQ0FBQyxjQUFjLEVBQUU7WUFDdkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxzQkFBc0IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxjQUFjLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUMxRTtJQUNILENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxjQUFtQjtRQUNsQyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMseUJBQXlCLENBQUMsdUJBQXVCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDdkYsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFakQsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQzs7Z0VBM0RVLFFBQVEsaUxBT1QsUUFBUTtnREFQUCxRQUFRLFdBQVIsUUFBUSxtQkFGUCxNQUFNO3VGQUVQLFFBQVE7Y0FIcEIsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COztzQkFRSSxNQUFNO3VCQUFDLFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFwcGxpY2F0aW9uUmVmLFxyXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcclxuICBDb21wb25lbnRSZWYsXHJcbiAgSW5qZWN0LFxyXG4gIEluamVjdGFibGUsXHJcbiAgSW5qZWN0b3JcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgTGlnaHRib3hDb21wb25lbnQgfSBmcm9tICcuL2xpZ2h0Ym94LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExpZ2h0Ym94Q29uZmlnIH0gZnJvbSAnLi9saWdodGJveC1jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IExpZ2h0Ym94RXZlbnQsIExJR0hUQk9YX0VWRU5ULCBJQWxidW0gfSBmcm9tICcuL2xpZ2h0Ym94LWV2ZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMaWdodGJveE92ZXJsYXlDb21wb25lbnQgfSBmcm9tICcuL2xpZ2h0Ym94LW92ZXJsYXkuY29tcG9uZW50JztcclxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuQEluamVjdGFibGUoe1xyXG4gIHByb3ZpZGVkSW46ICdyb290J1xyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlnaHRib3gge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBfY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXHJcbiAgICBwcml2YXRlIF9pbmplY3RvcjogSW5qZWN0b3IsXHJcbiAgICBwcml2YXRlIF9hcHBsaWNhdGlvblJlZjogQXBwbGljYXRpb25SZWYsXHJcbiAgICBwcml2YXRlIF9saWdodGJveENvbmZpZzogTGlnaHRib3hDb25maWcsXHJcbiAgICBwcml2YXRlIF9saWdodGJveEV2ZW50OiBMaWdodGJveEV2ZW50LFxyXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnRSZWZcclxuICApIHsgfVxyXG5cclxuICBvcGVuKGFsYnVtOiBBcnJheTxJQWxidW0+LCBjdXJJbmRleCA9IDAsIG9wdGlvbnMgPSB7fSk6IHZvaWQge1xyXG4gICAgY29uc3Qgb3ZlcmxheUNvbXBvbmVudFJlZiA9IHRoaXMuX2NyZWF0ZUNvbXBvbmVudChMaWdodGJveE92ZXJsYXlDb21wb25lbnQpO1xyXG4gICAgY29uc3QgY29tcG9uZW50UmVmID0gdGhpcy5fY3JlYXRlQ29tcG9uZW50KExpZ2h0Ym94Q29tcG9uZW50KTtcclxuICAgIGNvbnN0IG5ld09wdGlvbnM6IFBhcnRpYWw8TGlnaHRib3hDb25maWc+ID0ge307XHJcblxyXG4gICAgLy8gYnJvYWRjYXN0IG9wZW4gZXZlbnRcclxuICAgIHRoaXMuX2xpZ2h0Ym94RXZlbnQuYnJvYWRjYXN0TGlnaHRib3hFdmVudCh7IGlkOiBMSUdIVEJPWF9FVkVOVC5PUEVOIH0pO1xyXG4gICAgT2JqZWN0LmFzc2lnbihuZXdPcHRpb25zLCB0aGlzLl9saWdodGJveENvbmZpZywgb3B0aW9ucyk7XHJcblxyXG4gICAgLy8gYXR0YWNoIGlucHV0IHRvIGxpZ2h0Ym94XHJcbiAgICBjb21wb25lbnRSZWYuaW5zdGFuY2UuYWxidW0gPSBhbGJ1bTtcclxuICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZS5jdXJyZW50SW1hZ2VJbmRleCA9IGN1ckluZGV4O1xyXG4gICAgY29tcG9uZW50UmVmLmluc3RhbmNlLm9wdGlvbnMgPSBuZXdPcHRpb25zO1xyXG4gICAgY29tcG9uZW50UmVmLmluc3RhbmNlLmNtcFJlZiA9IGNvbXBvbmVudFJlZjtcclxuXHJcbiAgICAvLyBhdHRhY2ggaW5wdXQgdG8gb3ZlcmxheVxyXG4gICAgb3ZlcmxheUNvbXBvbmVudFJlZi5pbnN0YW5jZS5vcHRpb25zID0gbmV3T3B0aW9ucztcclxuICAgIG92ZXJsYXlDb21wb25lbnRSZWYuaW5zdGFuY2UuY21wUmVmID0gb3ZlcmxheUNvbXBvbmVudFJlZjtcclxuXHJcbiAgICAvLyBGSVhNRTogbm90IHN1cmUgd2h5IGxhc3QgZXZlbnQgaXMgYnJvYWRjYXN0ZWQgKHdoaWNoIGlzIENMT1NFRCkgYW5kIG1ha2VcclxuICAgIC8vIGxpZ2h0Ym94IGNhbiBub3QgYmUgb3BlbmVkIHRoZSBzZWNvbmQgdGltZS5cclxuICAgIC8vIE5lZWQgdG8gdGltZW91dCBzbyB0aGF0IHRoZSBPUEVOIGV2ZW50IGlzIHNldCBiZWZvcmUgY29tcG9uZW50IGlzIGluaXRpYWxpemVkXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyhvdmVybGF5Q29tcG9uZW50UmVmLmhvc3RWaWV3KTtcclxuICAgICAgdGhpcy5fYXBwbGljYXRpb25SZWYuYXR0YWNoVmlldyhjb21wb25lbnRSZWYuaG9zdFZpZXcpO1xyXG4gICAgICBvdmVybGF5Q29tcG9uZW50UmVmLm9uRGVzdHJveSgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fYXBwbGljYXRpb25SZWYuZGV0YWNoVmlldyhvdmVybGF5Q29tcG9uZW50UmVmLmhvc3RWaWV3KTtcclxuICAgICAgfSk7XHJcbiAgICAgIGNvbXBvbmVudFJlZi5vbkRlc3Ryb3koKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuX2FwcGxpY2F0aW9uUmVmLmRldGFjaFZpZXcoY29tcG9uZW50UmVmLmhvc3RWaWV3KTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBjb25zdCBjb250YWluZXJFbGVtZW50ID0gbmV3T3B0aW9ucy5jb250YWluZXJFbGVtZW50UmVzb2x2ZXIodGhpcy5fZG9jdW1lbnRSZWYpO1xyXG4gICAgICBjb250YWluZXJFbGVtZW50LmFwcGVuZENoaWxkKG92ZXJsYXlDb21wb25lbnRSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudCk7XHJcbiAgICAgIGNvbnRhaW5lckVsZW1lbnQuYXBwZW5kQ2hpbGQoY29tcG9uZW50UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnQpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBjbG9zZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl9saWdodGJveEV2ZW50KSB7XHJcbiAgICAgIHRoaXMuX2xpZ2h0Ym94RXZlbnQuYnJvYWRjYXN0TGlnaHRib3hFdmVudCh7IGlkOiBMSUdIVEJPWF9FVkVOVC5DTE9TRSB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF9jcmVhdGVDb21wb25lbnQoQ29tcG9uZW50Q2xhc3M6IGFueSk6IENvbXBvbmVudFJlZjxhbnk+IHtcclxuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLl9jb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoQ29tcG9uZW50Q2xhc3MpO1xyXG4gICAgY29uc3QgY29tcG9uZW50ID0gZmFjdG9yeS5jcmVhdGUodGhpcy5faW5qZWN0b3IpO1xyXG5cclxuICAgIHJldHVybiBjb21wb25lbnQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==