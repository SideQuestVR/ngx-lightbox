import { Lightbox } from './lightbox.service';
import { LightboxComponent, SafePipe } from './lightbox.component';
import { LightboxConfig } from './lightbox-config.service';
import { LightboxEvent, LightboxWindowRef } from './lightbox-event.service';
import { LightboxOverlayComponent } from './lightbox-overlay.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
export class LightboxModule {
}
LightboxModule.ɵfac = function LightboxModule_Factory(t) { return new (t || LightboxModule)(); };
LightboxModule.ɵmod = /*@__PURE__*/ i0.ɵɵdefineNgModule({ type: LightboxModule });
LightboxModule.ɵinj = /*@__PURE__*/ i0.ɵɵdefineInjector({ providers: [
        Lightbox,
        LightboxConfig,
        LightboxEvent,
        LightboxWindowRef
    ], imports: [[CommonModule]] });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LightboxModule, [{
        type: NgModule,
        args: [{
                imports: [CommonModule],
                declarations: [LightboxOverlayComponent, LightboxComponent, SafePipe],
                providers: [
                    Lightbox,
                    LightboxConfig,
                    LightboxEvent,
                    LightboxWindowRef
                ],
                entryComponents: [LightboxOverlayComponent, LightboxComponent]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(LightboxModule, { declarations: [LightboxOverlayComponent, LightboxComponent, SafePipe], imports: [CommonModule] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3gubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWxpZ2h0Ym94L3NyYy9saWIvbGlnaHRib3gubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsUUFBUSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDakUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBRSxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7QUFhN0MsTUFBTSxPQUFPLGNBQWM7OzRFQUFkLGNBQWM7Z0VBQWQsY0FBYztxRUFSZDtRQUNULFFBQVE7UUFDUixjQUFjO1FBQ2QsYUFBYTtRQUNiLGlCQUFpQjtLQUNsQixZQVBRLENBQUUsWUFBWSxDQUFFO3VGQVVkLGNBQWM7Y0FYMUIsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFFLFlBQVksQ0FBRTtnQkFDekIsWUFBWSxFQUFFLENBQUUsd0JBQXdCLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxDQUFFO2dCQUN2RSxTQUFTLEVBQUU7b0JBQ1QsUUFBUTtvQkFDUixjQUFjO29CQUNkLGFBQWE7b0JBQ2IsaUJBQWlCO2lCQUNsQjtnQkFDRCxlQUFlLEVBQUUsQ0FBRSx3QkFBd0IsRUFBRSxpQkFBaUIsQ0FBRTthQUNqRTs7d0ZBQ1ksY0FBYyxtQkFUVCx3QkFBd0IsRUFBRSxpQkFBaUIsRUFBRSxRQUFRLGFBRDFELFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaWdodGJveCB9IGZyb20gJy4vbGlnaHRib3guc2VydmljZSc7XHJcbmltcG9ydCB7TGlnaHRib3hDb21wb25lbnQsIFNhZmVQaXBlfSBmcm9tICcuL2xpZ2h0Ym94LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExpZ2h0Ym94Q29uZmlnIH0gZnJvbSAnLi9saWdodGJveC1jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IExpZ2h0Ym94RXZlbnQsIExpZ2h0Ym94V2luZG93UmVmIH0gZnJvbSAnLi9saWdodGJveC1ldmVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGlnaHRib3hPdmVybGF5Q29tcG9uZW50IH0gZnJvbSAnLi9saWdodGJveC1vdmVybGF5LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbIENvbW1vbk1vZHVsZSBdLFxyXG4gIGRlY2xhcmF0aW9uczogWyBMaWdodGJveE92ZXJsYXlDb21wb25lbnQsIExpZ2h0Ym94Q29tcG9uZW50LCBTYWZlUGlwZSBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgTGlnaHRib3gsXHJcbiAgICBMaWdodGJveENvbmZpZyxcclxuICAgIExpZ2h0Ym94RXZlbnQsXHJcbiAgICBMaWdodGJveFdpbmRvd1JlZlxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbIExpZ2h0Ym94T3ZlcmxheUNvbXBvbmVudCwgTGlnaHRib3hDb21wb25lbnQgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlnaHRib3hNb2R1bGUgeyB9XHJcbiJdfQ==