import { Lightbox } from './lightbox.service';
import { LightboxComponent, SafePipe } from './lightbox.component';
import { LightboxConfig } from './lightbox-config.service';
import { LightboxEvent, LightboxWindowRef } from './lightbox-event.service';
import { LightboxOverlayComponent } from './lightbox-overlay.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
var LightboxModule = /** @class */ (function () {
    function LightboxModule() {
    }
    LightboxModule.ɵmod = i0.ɵɵdefineNgModule({ type: LightboxModule });
    LightboxModule.ɵinj = i0.ɵɵdefineInjector({ factory: function LightboxModule_Factory(t) { return new (t || LightboxModule)(); }, providers: [
            Lightbox,
            LightboxConfig,
            LightboxEvent,
            LightboxWindowRef
        ], imports: [[CommonModule]] });
    return LightboxModule;
}());
export { LightboxModule };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3gubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWxpZ2h0Ym94LyIsInNvdXJjZXMiOlsibGliL2xpZ2h0Ym94Lm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFDLGlCQUFpQixFQUFFLFFBQVEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDNUUsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDeEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7O0FBRTdDO0lBQUE7S0FXK0I7c0RBQWxCLGNBQWM7K0dBQWQsY0FBYyxtQkFSZDtZQUNULFFBQVE7WUFDUixjQUFjO1lBQ2QsYUFBYTtZQUNiLGlCQUFpQjtTQUNsQixZQVBRLENBQUUsWUFBWSxDQUFFO3lCQVQzQjtDQW1CK0IsQUFYL0IsSUFXK0I7U0FBbEIsY0FBYzt3RkFBZCxjQUFjLG1CQVRULHdCQUF3QixFQUFFLGlCQUFpQixFQUFFLFFBQVEsYUFEMUQsWUFBWTtrREFVWixjQUFjO2NBWDFCLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUUsQ0FBRSxZQUFZLENBQUU7Z0JBQ3pCLFlBQVksRUFBRSxDQUFFLHdCQUF3QixFQUFFLGlCQUFpQixFQUFFLFFBQVEsQ0FBRTtnQkFDdkUsU0FBUyxFQUFFO29CQUNULFFBQVE7b0JBQ1IsY0FBYztvQkFDZCxhQUFhO29CQUNiLGlCQUFpQjtpQkFDbEI7Z0JBQ0QsZUFBZSxFQUFFLENBQUUsd0JBQXdCLEVBQUUsaUJBQWlCLENBQUU7YUFDakUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaWdodGJveCB9IGZyb20gJy4vbGlnaHRib3guc2VydmljZSc7XHJcbmltcG9ydCB7TGlnaHRib3hDb21wb25lbnQsIFNhZmVQaXBlfSBmcm9tICcuL2xpZ2h0Ym94LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IExpZ2h0Ym94Q29uZmlnIH0gZnJvbSAnLi9saWdodGJveC1jb25maWcuc2VydmljZSc7XHJcbmltcG9ydCB7IExpZ2h0Ym94RXZlbnQsIExpZ2h0Ym94V2luZG93UmVmIH0gZnJvbSAnLi9saWdodGJveC1ldmVudC5zZXJ2aWNlJztcclxuaW1wb3J0IHsgTGlnaHRib3hPdmVybGF5Q29tcG9uZW50IH0gZnJvbSAnLi9saWdodGJveC1vdmVybGF5LmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICBpbXBvcnRzOiBbIENvbW1vbk1vZHVsZSBdLFxyXG4gIGRlY2xhcmF0aW9uczogWyBMaWdodGJveE92ZXJsYXlDb21wb25lbnQsIExpZ2h0Ym94Q29tcG9uZW50LCBTYWZlUGlwZSBdLFxyXG4gIHByb3ZpZGVyczogW1xyXG4gICAgTGlnaHRib3gsXHJcbiAgICBMaWdodGJveENvbmZpZyxcclxuICAgIExpZ2h0Ym94RXZlbnQsXHJcbiAgICBMaWdodGJveFdpbmRvd1JlZlxyXG4gIF0sXHJcbiAgZW50cnlDb21wb25lbnRzOiBbIExpZ2h0Ym94T3ZlcmxheUNvbXBvbmVudCwgTGlnaHRib3hDb21wb25lbnQgXVxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlnaHRib3hNb2R1bGUgeyB9XHJcbiJdfQ==