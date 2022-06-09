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
                ]
            }]
    }], null, null); })();
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(LightboxModule, { declarations: [LightboxOverlayComponent, LightboxComponent, SafePipe], imports: [CommonModule] }); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3gubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWxpZ2h0Ym94L3NyYy9saWIvbGlnaHRib3gubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUM5QyxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsUUFBUSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDakUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzNELE9BQU8sRUFBRSxhQUFhLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RSxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUN4RSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7QUFZN0MsTUFBTSxPQUFPLGNBQWM7OzRFQUFkLGNBQWM7Z0VBQWQsY0FBYztxRUFQWjtRQUNQLFFBQVE7UUFDUixjQUFjO1FBQ2QsYUFBYTtRQUNiLGlCQUFpQjtLQUNwQixZQVBRLENBQUMsWUFBWSxDQUFDO3VGQVNkLGNBQWM7Y0FWMUIsUUFBUTtlQUFDO2dCQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDdkIsWUFBWSxFQUFFLENBQUMsd0JBQXdCLEVBQUUsaUJBQWlCLEVBQUUsUUFBUSxDQUFDO2dCQUNyRSxTQUFTLEVBQUU7b0JBQ1AsUUFBUTtvQkFDUixjQUFjO29CQUNkLGFBQWE7b0JBQ2IsaUJBQWlCO2lCQUNwQjthQUNKOzt3RkFDWSxjQUFjLG1CQVJSLHdCQUF3QixFQUFFLGlCQUFpQixFQUFFLFFBQVEsYUFEMUQsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IExpZ2h0Ym94IH0gZnJvbSAnLi9saWdodGJveC5zZXJ2aWNlJztcclxuaW1wb3J0IHtMaWdodGJveENvbXBvbmVudCwgU2FmZVBpcGV9IGZyb20gJy4vbGlnaHRib3guY29tcG9uZW50JztcclxuaW1wb3J0IHsgTGlnaHRib3hDb25maWcgfSBmcm9tICcuL2xpZ2h0Ym94LWNvbmZpZy5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGlnaHRib3hFdmVudCwgTGlnaHRib3hXaW5kb3dSZWYgfSBmcm9tICcuL2xpZ2h0Ym94LWV2ZW50LnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMaWdodGJveE92ZXJsYXlDb21wb25lbnQgfSBmcm9tICcuL2xpZ2h0Ym94LW92ZXJsYXkuY29tcG9uZW50JztcclxuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcblxyXG5ATmdNb2R1bGUoe1xyXG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXHJcbiAgICBkZWNsYXJhdGlvbnM6IFtMaWdodGJveE92ZXJsYXlDb21wb25lbnQsIExpZ2h0Ym94Q29tcG9uZW50LCBTYWZlUGlwZV0sXHJcbiAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICBMaWdodGJveCxcclxuICAgICAgICBMaWdodGJveENvbmZpZyxcclxuICAgICAgICBMaWdodGJveEV2ZW50LFxyXG4gICAgICAgIExpZ2h0Ym94V2luZG93UmVmXHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBMaWdodGJveE1vZHVsZSB7IH1cclxuIl19