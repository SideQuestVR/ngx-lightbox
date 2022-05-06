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
LightboxModule.ɵmod = i0.ɵɵdefineNgModule({ type: LightboxModule });
LightboxModule.ɵinj = i0.ɵɵdefineInjector({ factory: function LightboxModule_Factory(t) { return new (t || LightboxModule)(); }, providers: [
        Lightbox,
        LightboxConfig,
        LightboxEvent,
        LightboxWindowRef
    ], imports: [[CommonModule]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(LightboxModule, { declarations: [LightboxOverlayComponent, LightboxComponent, SafePipe], imports: [CommonModule] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(LightboxModule, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3gubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IkQ6L1NpZGVRdWVzdC9SZXBvcy9uZ3gtbGlnaHRib3gvcHJvamVjdHMvbmd4LWxpZ2h0Ym94L3NyYy8iLCJzb3VyY2VzIjpbImxpYi9saWdodGJveC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzlDLE9BQU8sRUFBQyxpQkFBaUIsRUFBRSxRQUFRLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNqRSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ3hFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDOztBQWE3QyxNQUFNLE9BQU8sY0FBYzs7a0RBQWQsY0FBYzsyR0FBZCxjQUFjLG1CQVJkO1FBQ1QsUUFBUTtRQUNSLGNBQWM7UUFDZCxhQUFhO1FBQ2IsaUJBQWlCO0tBQ2xCLFlBUFEsQ0FBRSxZQUFZLENBQUU7d0ZBVWQsY0FBYyxtQkFUVCx3QkFBd0IsRUFBRSxpQkFBaUIsRUFBRSxRQUFRLGFBRDFELFlBQVk7a0RBVVosY0FBYztjQVgxQixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFLENBQUUsWUFBWSxDQUFFO2dCQUN6QixZQUFZLEVBQUUsQ0FBRSx3QkFBd0IsRUFBRSxpQkFBaUIsRUFBRSxRQUFRLENBQUU7Z0JBQ3ZFLFNBQVMsRUFBRTtvQkFDVCxRQUFRO29CQUNSLGNBQWM7b0JBQ2QsYUFBYTtvQkFDYixpQkFBaUI7aUJBQ2xCO2dCQUNELGVBQWUsRUFBRSxDQUFFLHdCQUF3QixFQUFFLGlCQUFpQixDQUFFO2FBQ2pFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTGlnaHRib3ggfSBmcm9tICcuL2xpZ2h0Ym94LnNlcnZpY2UnO1xyXG5pbXBvcnQge0xpZ2h0Ym94Q29tcG9uZW50LCBTYWZlUGlwZX0gZnJvbSAnLi9saWdodGJveC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBMaWdodGJveENvbmZpZyB9IGZyb20gJy4vbGlnaHRib3gtY29uZmlnLnNlcnZpY2UnO1xyXG5pbXBvcnQgeyBMaWdodGJveEV2ZW50LCBMaWdodGJveFdpbmRvd1JlZiB9IGZyb20gJy4vbGlnaHRib3gtZXZlbnQuc2VydmljZSc7XHJcbmltcG9ydCB7IExpZ2h0Ym94T3ZlcmxheUNvbXBvbmVudCB9IGZyb20gJy4vbGlnaHRib3gtb3ZlcmxheS5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuXHJcbkBOZ01vZHVsZSh7XHJcbiAgaW1wb3J0czogWyBDb21tb25Nb2R1bGUgXSxcclxuICBkZWNsYXJhdGlvbnM6IFsgTGlnaHRib3hPdmVybGF5Q29tcG9uZW50LCBMaWdodGJveENvbXBvbmVudCwgU2FmZVBpcGUgXSxcclxuICBwcm92aWRlcnM6IFtcclxuICAgIExpZ2h0Ym94LFxyXG4gICAgTGlnaHRib3hDb25maWcsXHJcbiAgICBMaWdodGJveEV2ZW50LFxyXG4gICAgTGlnaHRib3hXaW5kb3dSZWZcclxuICBdLFxyXG4gIGVudHJ5Q29tcG9uZW50czogWyBMaWdodGJveE92ZXJsYXlDb21wb25lbnQsIExpZ2h0Ym94Q29tcG9uZW50IF1cclxufSlcclxuZXhwb3J0IGNsYXNzIExpZ2h0Ym94TW9kdWxlIHsgfVxyXG4iXX0=