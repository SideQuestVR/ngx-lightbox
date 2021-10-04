import { ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, ɵɵelement, ɵɵnextContext, ɵɵproperty, ɵɵsanitizeUrl, ɵɵpipe, ɵɵpipeBind1, ɵɵsanitizeResourceUrl, ɵɵdirectiveInject, ɵɵdefinePipe, Pipe, SecurityContext, ElementRef, Renderer2, ɵɵdefineComponent, ɵɵviewQuery, ɵɵqueryRefresh, ɵɵloadQuery, ɵɵlistener, ɵɵclassMap, ɵɵelementStart, ɵɵtemplate, ɵɵelementEnd, ɵɵtext, ɵɵadvance, ɵɵsanitizeHtml, ɵɵtextInterpolate, Component, Inject, Input, ViewChild, HostListener, ɵɵresolveWindow, ɵɵinject, ComponentFactoryResolver, Injector, ApplicationRef, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { DOCUMENT, NgIf, CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject } from 'rxjs';

var LIGHTBOX_EVENT = {
    CHANGE_PAGE: 1,
    CLOSE: 2,
    OPEN: 3,
    ZOOM_IN: 4,
    ZOOM_OUT: 5,
    ROTATE_LEFT: 6,
    ROTATE_RIGHT: 7,
    FILE_NOT_FOUND: 8
};
var LightboxEvent = /** @class */ (function () {
    function LightboxEvent() {
        this._lightboxEventSource = new Subject();
        this.lightboxEvent$ = this._lightboxEventSource.asObservable();
    }
    LightboxEvent.prototype.broadcastLightboxEvent = function (event) {
        this._lightboxEventSource.next(event);
    };
    LightboxEvent.ɵfac = function LightboxEvent_Factory(t) { return new (t || LightboxEvent)(); };
    LightboxEvent.ɵprov = ɵɵdefineInjectable({ token: LightboxEvent, factory: LightboxEvent.ɵfac, providedIn: 'root' });
    return LightboxEvent;
}());
/*@__PURE__*/ (function () { ɵsetClassMetadata(LightboxEvent, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();
function getWindow() {
    return window;
}
var LightboxWindowRef = /** @class */ (function () {
    function LightboxWindowRef() {
    }
    Object.defineProperty(LightboxWindowRef.prototype, "nativeWindow", {
        get: function () {
            return getWindow();
        },
        enumerable: true,
        configurable: true
    });
    LightboxWindowRef.ɵfac = function LightboxWindowRef_Factory(t) { return new (t || LightboxWindowRef)(); };
    LightboxWindowRef.ɵprov = ɵɵdefineInjectable({ token: LightboxWindowRef, factory: LightboxWindowRef.ɵfac, providedIn: 'root' });
    return LightboxWindowRef;
}());
/*@__PURE__*/ (function () { ɵsetClassMetadata(LightboxWindowRef, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();

var _c0 = ["outerContainer"];
var _c1 = ["container"];
var _c2 = ["leftArrow"];
var _c3 = ["rightArrow"];
var _c4 = ["navArrow"];
var _c5 = ["dataContainer"];
var _c6 = ["image"];
var _c7 = ["iframe"];
var _c8 = ["caption"];
var _c9 = ["number"];
var _c10 = ["lb-content", ""];
function LightboxComponent_img_4_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "img", 31, 32);
} if (rf & 2) {
    var ctx_r2 = ɵɵnextContext();
    ɵɵproperty("src", ctx_r2.album[ctx_r2.currentImageIndex].src, ɵɵsanitizeUrl)("hidden", ctx_r2.ui.showReloader);
} }
function LightboxComponent_iframe_5_Template(rf, ctx) { if (rf & 1) {
    ɵɵelement(0, "iframe", 33, 34);
    ɵɵpipe(2, "safe");
} if (rf & 2) {
    var ctx_r3 = ɵɵnextContext();
    ɵɵproperty("src", ɵɵpipeBind1(2, 2, ctx_r3.album[ctx_r3.currentImageIndex].src), ɵɵsanitizeResourceUrl)("hidden", ctx_r3.ui.showReloader);
} }
var SafePipe = /** @class */ (function () {
    function SafePipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafePipe.prototype.transform = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    SafePipe.ɵfac = function SafePipe_Factory(t) { return new (t || SafePipe)(ɵɵdirectiveInject(DomSanitizer)); };
    SafePipe.ɵpipe = ɵɵdefinePipe({ name: "safe", type: SafePipe, pure: true });
    return SafePipe;
}());
/*@__PURE__*/ (function () { ɵsetClassMetadata(SafePipe, [{
        type: Pipe,
        args: [{ name: 'safe' }]
    }], function () { return [{ type: DomSanitizer }]; }, null); })();
var LightboxComponent = /** @class */ (function () {
    function LightboxComponent(_elemRef, _rendererRef, _lightboxEvent, _lightboxElem, _lightboxWindowRef, _sanitizer, _documentRef) {
        var _this = this;
        this._elemRef = _elemRef;
        this._rendererRef = _rendererRef;
        this._lightboxEvent = _lightboxEvent;
        this._lightboxElem = _lightboxElem;
        this._lightboxWindowRef = _lightboxWindowRef;
        this._sanitizer = _sanitizer;
        this._documentRef = _documentRef;
        // initialize data
        this.options = this.options || {};
        this.album = this.album || [];
        this.currentImageIndex = this.currentImageIndex || 0;
        this._windowRef = this._lightboxWindowRef.nativeWindow;
        // control the interactive of the directive
        this.ui = {
            // control the appear of the reloader
            // false: image has loaded completely and ready to be shown
            // true: image is still loading
            showReloader: true,
            // control the appear of the nav arrow
            // the arrowNav is the parent of both left and right arrow
            // in some cases, the parent shows but the child does not show
            showLeftArrow: false,
            showRightArrow: false,
            showArrowNav: false,
            // control the appear of the zoom and rotate buttons
            showZoomButton: false,
            showRotateButton: false,
            // control whether to show the
            // page number or not
            showPageNumber: false,
            showCaption: false,
            classList: 'lightbox animation fadeIn'
        };
        this.content = {
            pageNumber: ''
        };
        this._event = {};
        this._lightboxElem = this._elemRef;
        this._event.subscription = this._lightboxEvent.lightboxEvent$
            .subscribe(function (event) { return _this._onReceivedEvent(event); });
        this.rotate = 0;
    }
    LightboxComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.album.forEach(function (album) {
            if (album.caption) {
                album.caption = _this._sanitizer.sanitize(SecurityContext.HTML, album.caption);
            }
        });
    };
    LightboxComponent.prototype.ngAfterViewInit = function () {
        // need to init css value here, after the view ready
        // actually these values are always 0
        this._cssValue = {
            containerTopPadding: Math.round(this._getCssStyleValue(this._containerElem, 'padding-top')),
            containerRightPadding: Math.round(this._getCssStyleValue(this._containerElem, 'padding-right')),
            containerBottomPadding: Math.round(this._getCssStyleValue(this._containerElem, 'padding-bottom')),
            containerLeftPadding: Math.round(this._getCssStyleValue(this._containerElem, 'padding-left')),
            imageBorderWidthTop: Math.round(this._getCssStyleValue(this._imageElem || this._iframeElem, 'border-top-width')),
            imageBorderWidthBottom: Math.round(this._getCssStyleValue(this._imageElem || this._iframeElem, 'border-bottom-width')),
            imageBorderWidthLeft: Math.round(this._getCssStyleValue(this._imageElem || this._iframeElem, 'border-left-width')),
            imageBorderWidthRight: Math.round(this._getCssStyleValue(this._imageElem || this._iframeElem, 'border-right-width'))
        };
        if (this._validateInputData()) {
            this._prepareComponent();
            this._registerImageLoadingEvent();
        }
    };
    LightboxComponent.prototype.ngOnDestroy = function () {
        if (!this.options.disableKeyboardNav) {
            // unbind keyboard event
            this._disableKeyboardNav();
        }
        this._event.subscription.unsubscribe();
    };
    LightboxComponent.prototype.close = function ($event) {
        $event.stopPropagation();
        if ($event.target.classList.contains('lightbox') ||
            $event.target.classList.contains('lb-loader') ||
            $event.target.classList.contains('lb-close')) {
            this._lightboxEvent.broadcastLightboxEvent({ id: LIGHTBOX_EVENT.CLOSE, data: null });
        }
    };
    LightboxComponent.prototype.control = function ($event) {
        $event.stopPropagation();
        var height;
        var width;
        if ($event.target.classList.contains('lb-turnLeft')) {
            this.rotate = this.rotate - 90;
            this._rotateContainer();
            this._calcTransformPoint();
            this._documentRef.getElementById('image').style.transform = "rotate(" + this.rotate + "deg)";
            this._documentRef.getElementById('image').style.webkitTransform = "rotate(" + this.rotate + "deg)";
            this._lightboxEvent.broadcastLightboxEvent({ id: LIGHTBOX_EVENT.ROTATE_LEFT, data: null });
        }
        else if ($event.target.classList.contains('lb-turnRight')) {
            this.rotate = this.rotate + 90;
            this._rotateContainer();
            this._calcTransformPoint();
            this._documentRef.getElementById('image').style.transform = "rotate(" + this.rotate + "deg)";
            this._documentRef.getElementById('image').style.webkitTransform = "rotate(" + this.rotate + "deg)";
            this._lightboxEvent.broadcastLightboxEvent({ id: LIGHTBOX_EVENT.ROTATE_RIGHT, data: null });
        }
        else if ($event.target.classList.contains('lb-zoomOut')) {
            height = parseInt(this._documentRef.getElementById('outerContainer').style.height, 10) / 1.5;
            width = parseInt(this._documentRef.getElementById('outerContainer').style.width, 10) / 1.5;
            this._documentRef.getElementById('outerContainer').style.height = height + 'px';
            this._documentRef.getElementById('outerContainer').style.width = width + 'px';
            height = parseInt(this._documentRef.getElementById('image').style.height, 10) / 1.5;
            width = parseInt(this._documentRef.getElementById('image').style.width, 10) / 1.5;
            this._documentRef.getElementById('image').style.height = height + 'px';
            this._documentRef.getElementById('image').style.width = width + 'px';
            this._lightboxEvent.broadcastLightboxEvent({ id: LIGHTBOX_EVENT.ZOOM_OUT, data: null });
        }
        else if ($event.target.classList.contains('lb-zoomIn')) {
            height = parseInt(this._documentRef.getElementById('outerContainer').style.height, 10) * 1.5;
            width = parseInt(this._documentRef.getElementById('outerContainer').style.width, 10) * 1.5;
            this._documentRef.getElementById('outerContainer').style.height = height + 'px';
            this._documentRef.getElementById('outerContainer').style.width = width + 'px';
            height = parseInt(this._documentRef.getElementById('image').style.height, 10) * 1.5;
            width = parseInt(this._documentRef.getElementById('image').style.width, 10) * 1.5;
            this._documentRef.getElementById('image').style.height = height + 'px';
            this._documentRef.getElementById('image').style.width = width + 'px';
            this._lightboxEvent.broadcastLightboxEvent({ id: LIGHTBOX_EVENT.ZOOM_IN, data: null });
        }
    };
    LightboxComponent.prototype._rotateContainer = function () {
        var temp = this.rotate;
        if (temp < 0) {
            temp *= -1;
        }
        if (temp / 90 % 4 === 1 || temp / 90 % 4 === 3) {
            this._documentRef.getElementById('outerContainer').style.height = this._documentRef.getElementById('image').style.width;
            this._documentRef.getElementById('outerContainer').style.width = this._documentRef.getElementById('image').style.height;
            this._documentRef.getElementById('container').style.height = this._documentRef.getElementById('image').style.width;
            this._documentRef.getElementById('container').style.width = this._documentRef.getElementById('image').style.height;
        }
        else {
            this._documentRef.getElementById('outerContainer').style.height = this._documentRef.getElementById('image').style.height;
            this._documentRef.getElementById('outerContainer').style.width = this._documentRef.getElementById('image').style.width;
            this._documentRef.getElementById('container').style.height = this._documentRef.getElementById('image').style.width;
            this._documentRef.getElementById('container').style.width = this._documentRef.getElementById('image').style.height;
        }
    };
    LightboxComponent.prototype._resetImage = function () {
        this.rotate = 0;
        var image = this._documentRef.getElementById('image');
        if (image) {
            image.style.transform = "rotate(" + this.rotate + "deg)";
            image.style.webkitTransform = "rotate(" + this.rotate + "deg)";
        }
    };
    LightboxComponent.prototype._calcTransformPoint = function () {
        var height = parseInt(this._documentRef.getElementById('image').style.height, 10);
        var width = parseInt(this._documentRef.getElementById('image').style.width, 10);
        var temp = this.rotate % 360;
        if (temp < 0) {
            temp = 360 + temp;
        }
        if (temp === 90) {
            this._documentRef.getElementById('image').style.transformOrigin = (height / 2) + 'px ' + (height / 2) + 'px';
        }
        else if (temp === 180) {
            this._documentRef.getElementById('image').style.transformOrigin = (width / 2) + 'px ' + (height / 2) + 'px';
        }
        else if (temp === 270) {
            this._documentRef.getElementById('image').style.transformOrigin = (width / 2) + 'px ' + (width / 2) + 'px';
        }
    };
    LightboxComponent.prototype.nextImage = function () {
        if (this.album.length === 1) {
            return;
        }
        else if (this.currentImageIndex === this.album.length - 1) {
            this._changeImage(0);
        }
        else {
            this._changeImage(this.currentImageIndex + 1);
        }
    };
    LightboxComponent.prototype.prevImage = function () {
        if (this.album.length === 1) {
            return;
        }
        else if (this.currentImageIndex === 0 && this.album.length > 1) {
            this._changeImage(this.album.length - 1);
        }
        else {
            this._changeImage(this.currentImageIndex - 1);
        }
    };
    LightboxComponent.prototype._validateInputData = function () {
        if (this.album &&
            this.album instanceof Array &&
            this.album.length > 0) {
            for (var i = 0; i < this.album.length; i++) {
                // check whether each _nside
                // album has src data or not
                if (this.album[i].src) {
                    continue;
                }
                throw new Error('One of the album data does not have source data');
            }
        }
        else {
            throw new Error('No album data or album data is not correct in type');
        }
        // to prevent data understand as string
        // convert it to number
        if (isNaN(this.currentImageIndex)) {
            throw new Error('Current image index is not a number');
        }
        else {
            this.currentImageIndex = Number(this.currentImageIndex);
        }
        return true;
    };
    LightboxComponent.prototype._registerImageLoadingEvent = function () {
        var _this = this;
        var src = this.album[this.currentImageIndex].src;
        if (this.album[this.currentImageIndex].iframe || this.needsIframe(src)) {
            setTimeout(function () {
                _this._onLoadImageSuccess();
            });
            return;
        }
        var preloader = new Image();
        preloader.onload = function () {
            _this._onLoadImageSuccess();
        };
        preloader.onerror = function (e) {
            _this._lightboxEvent.broadcastLightboxEvent({ id: LIGHTBOX_EVENT.FILE_NOT_FOUND, data: e });
        };
        preloader.src = this._sanitizer.sanitize(SecurityContext.URL, src);
    };
    /**
     * Fire when the image is loaded
     */
    LightboxComponent.prototype._onLoadImageSuccess = function () {
        if (!this.options.disableKeyboardNav) {
            // unbind keyboard event during transition
            this._disableKeyboardNav();
        }
        var imageHeight;
        var imageWidth;
        var maxImageHeight;
        var maxImageWidth;
        var windowHeight;
        var windowWidth;
        var naturalImageWidth;
        var naturalImageHeight;
        // set default width and height of image to be its natural
        imageWidth = naturalImageWidth = this._imageElem ? this._imageElem.nativeElement.naturalWidth : this._windowRef.innerWidth * .8;
        imageHeight = naturalImageHeight = this._imageElem ? this._imageElem.nativeElement.naturalHeight : this._windowRef.innerHeight * .8;
        if (this.options.fitImageInViewPort) {
            windowWidth = this._windowRef.innerWidth;
            windowHeight = this._windowRef.innerHeight;
            maxImageWidth = windowWidth - this._cssValue.containerLeftPadding -
                this._cssValue.containerRightPadding - this._cssValue.imageBorderWidthLeft -
                this._cssValue.imageBorderWidthRight - 20;
            maxImageHeight = windowHeight - this._cssValue.containerTopPadding -
                this._cssValue.containerTopPadding - this._cssValue.imageBorderWidthTop -
                this._cssValue.imageBorderWidthBottom - 120;
            if (naturalImageWidth > maxImageWidth || naturalImageHeight > maxImageHeight) {
                if ((naturalImageWidth / maxImageWidth) > (naturalImageHeight / maxImageHeight)) {
                    imageWidth = maxImageWidth;
                    imageHeight = Math.round(naturalImageHeight / (naturalImageWidth / imageWidth));
                }
                else {
                    imageHeight = maxImageHeight;
                    imageWidth = Math.round(naturalImageWidth / (naturalImageHeight / imageHeight));
                }
            }
            this._rendererRef.setStyle((this._imageElem || this._iframeElem).nativeElement, 'width', imageWidth + "px");
            this._rendererRef.setStyle((this._imageElem || this._iframeElem).nativeElement, 'height', imageHeight + "px");
        }
        this._sizeContainer(imageWidth, imageHeight);
        if (this.options.centerVertically) {
            this._centerVertically(imageWidth, imageHeight);
        }
    };
    LightboxComponent.prototype._centerVertically = function (imageWidth, imageHeight) {
        var scrollOffset = this._documentRef.documentElement.scrollTop;
        var windowHeight = this._windowRef.innerHeight;
        var viewOffset = windowHeight / 2 - imageHeight / 2;
        var topDistance = scrollOffset + viewOffset;
        this._rendererRef.setStyle(this._lightboxElem.nativeElement, 'top', topDistance + "px");
    };
    LightboxComponent.prototype._sizeContainer = function (imageWidth, imageHeight) {
        var _this = this;
        var oldWidth = this._outerContainerElem.nativeElement.offsetWidth;
        var oldHeight = this._outerContainerElem.nativeElement.offsetHeight;
        var newWidth = imageWidth + this._cssValue.containerRightPadding + this._cssValue.containerLeftPadding +
            this._cssValue.imageBorderWidthLeft + this._cssValue.imageBorderWidthRight;
        var newHeight = imageHeight + this._cssValue.containerTopPadding + this._cssValue.containerBottomPadding +
            this._cssValue.imageBorderWidthTop + this._cssValue.imageBorderWidthBottom;
        // make sure that distances are large enough for transitionend event to be fired, at least 5px.
        if (Math.abs(oldWidth - newWidth) + Math.abs(oldHeight - newHeight) > 5) {
            this._rendererRef.setStyle(this._outerContainerElem.nativeElement, 'width', newWidth + "px");
            this._rendererRef.setStyle(this._outerContainerElem.nativeElement, 'height', newHeight + "px");
            // bind resize event to outer container
            // use enableTransition to prevent infinite loader
            if (this.options.enableTransition) {
                this._event.transitions = [];
                ['transitionend', 'webkitTransitionEnd', 'oTransitionEnd', 'MSTransitionEnd'].forEach(function (eventName) {
                    _this._event.transitions.push(_this._rendererRef.listen(_this._outerContainerElem.nativeElement, eventName, function (event) {
                        if (event.target === event.currentTarget) {
                            _this._postResize(newWidth, newHeight);
                        }
                    }));
                });
            }
            else {
                this._postResize(newWidth, newHeight);
            }
        }
        else {
            this._postResize(newWidth, newHeight);
        }
    };
    LightboxComponent.prototype._postResize = function (newWidth, newHeight) {
        // unbind resize event
        if (Array.isArray(this._event.transitions)) {
            this._event.transitions.forEach(function (eventHandler) {
                eventHandler();
            });
            this._event.transitions = [];
        }
        this._rendererRef.setStyle(this._dataContainerElem.nativeElement, 'width', newWidth + "px");
        this._showImage();
    };
    LightboxComponent.prototype._showImage = function () {
        this.ui.showReloader = false;
        this._updateNav();
        this._updateDetails();
        if (!this.options.disableKeyboardNav) {
            this._enableKeyboardNav();
        }
    };
    LightboxComponent.prototype._prepareComponent = function () {
        var _this = this;
        // add css3 animation
        this._addCssAnimation();
        // position the image according to user's option
        this._positionLightBox();
        // update controls visibility on next view generation
        setTimeout(function () {
            _this.ui.showZoomButton = _this.options.showZoom;
            _this.ui.showRotateButton = _this.options.showRotate;
        }, 0);
    };
    LightboxComponent.prototype._positionLightBox = function () {
        // @see https://stackoverflow.com/questions/3464876/javascript-get-window-x-y-position-for-scroll
        var top = (this._windowRef.pageYOffset || this._documentRef.documentElement.scrollTop) +
            this.options.positionFromTop;
        var left = this._windowRef.pageXOffset || this._documentRef.documentElement.scrollLeft;
        if (!this.options.centerVertically) {
            this._rendererRef.setStyle(this._lightboxElem.nativeElement, 'top', top + "px");
        }
        this._rendererRef.setStyle(this._lightboxElem.nativeElement, 'left', left + "px");
        this._rendererRef.setStyle(this._lightboxElem.nativeElement, 'display', 'block');
        // disable scrolling of the page while open
        if (this.options.disableScrolling) {
            this._rendererRef.addClass(this._documentRef.documentElement, 'lb-disable-scrolling');
        }
    };
    /**
     * addCssAnimation add css3 classes for animate lightbox
     */
    LightboxComponent.prototype._addCssAnimation = function () {
        var resizeDuration = this.options.resizeDuration;
        var fadeDuration = this.options.fadeDuration;
        this._rendererRef.setStyle(this._lightboxElem.nativeElement, '-webkit-animation-duration', fadeDuration + "s");
        this._rendererRef.setStyle(this._lightboxElem.nativeElement, 'animation-duration', fadeDuration + "s");
        this._rendererRef.setStyle(this._outerContainerElem.nativeElement, '-webkit-transition-duration', resizeDuration + "s");
        this._rendererRef.setStyle(this._outerContainerElem.nativeElement, 'transition-duration', resizeDuration + "s");
        this._rendererRef.setStyle(this._dataContainerElem.nativeElement, '-webkit-animation-duration', fadeDuration + "s");
        this._rendererRef.setStyle(this._dataContainerElem.nativeElement, 'animation-duration', fadeDuration + "s");
        this._rendererRef.setStyle((this._imageElem || this._iframeElem).nativeElement, '-webkit-animation-duration', fadeDuration + "s");
        this._rendererRef.setStyle((this._imageElem || this._iframeElem).nativeElement, 'animation-duration', fadeDuration + "s");
        this._rendererRef.setStyle(this._captionElem.nativeElement, '-webkit-animation-duration', fadeDuration + "s");
        this._rendererRef.setStyle(this._captionElem.nativeElement, 'animation-duration', fadeDuration + "s");
        this._rendererRef.setStyle(this._numberElem.nativeElement, '-webkit-animation-duration', fadeDuration + "s");
        this._rendererRef.setStyle(this._numberElem.nativeElement, 'animation-duration', fadeDuration + "s");
    };
    LightboxComponent.prototype._end = function () {
        var _this = this;
        this.ui.classList = 'lightbox animation fadeOut';
        if (this.options.disableScrolling) {
            this._rendererRef.removeClass(this._documentRef.documentElement, 'lb-disable-scrolling');
        }
        setTimeout(function () {
            _this.cmpRef.destroy();
        }, this.options.fadeDuration * 1000);
    };
    LightboxComponent.prototype._updateDetails = function () {
        // update the caption
        if (typeof this.album[this.currentImageIndex].caption !== 'undefined' &&
            this.album[this.currentImageIndex].caption !== '') {
            this.ui.showCaption = true;
        }
        // update the page number if user choose to do so
        // does not perform numbering the page if the
        // array length in album <= 1
        if (this.album.length > 1 && this.options.showImageNumberLabel) {
            this.ui.showPageNumber = true;
            this.content.pageNumber = this._albumLabel();
        }
    };
    LightboxComponent.prototype._albumLabel = function () {
        // due to {this.currentImageIndex} is set from 0 to {this.album.length} - 1
        return this.options.albumLabel.replace(/%1/g, Number(this.currentImageIndex + 1)).replace(/%2/g, this.album.length);
    };
    LightboxComponent.prototype._changeImage = function (newIndex) {
        this._resetImage();
        this.currentImageIndex = newIndex;
        this._hideImage();
        this._registerImageLoadingEvent();
        this._lightboxEvent.broadcastLightboxEvent({ id: LIGHTBOX_EVENT.CHANGE_PAGE, data: newIndex });
    };
    LightboxComponent.prototype._hideImage = function () {
        this.ui.showReloader = true;
        this.ui.showArrowNav = false;
        this.ui.showLeftArrow = false;
        this.ui.showRightArrow = false;
        this.ui.showPageNumber = false;
        this.ui.showCaption = false;
    };
    LightboxComponent.prototype._updateNav = function () {
        var alwaysShowNav = false;
        // check to see the browser support touch event
        try {
            this._documentRef.createEvent('TouchEvent');
            alwaysShowNav = (this.options.alwaysShowNavOnTouchDevices) ? true : false;
        }
        catch (e) {
            // noop
        }
        // initially show the arrow nav
        // which is the parent of both left and right nav
        this._showArrowNav();
        if (this.album.length > 1) {
            if (this.options.wrapAround) {
                if (alwaysShowNav) {
                    // alternatives this.$lightbox.find('.lb-prev, .lb-next').css('opacity', '1');
                    this._rendererRef.setStyle(this._leftArrowElem.nativeElement, 'opacity', '1');
                    this._rendererRef.setStyle(this._rightArrowElem.nativeElement, 'opacity', '1');
                }
                // alternatives this.$lightbox.find('.lb-prev, .lb-next').show();
                this._showLeftArrowNav();
                this._showRightArrowNav();
            }
            else {
                if (this.currentImageIndex > 0) {
                    // alternatives this.$lightbox.find('.lb-prev').show();
                    this._showLeftArrowNav();
                    if (alwaysShowNav) {
                        // alternatives this.$lightbox.find('.lb-prev').css('opacity', '1');
                        this._rendererRef.setStyle(this._leftArrowElem.nativeElement, 'opacity', '1');
                    }
                }
                if (this.currentImageIndex < this.album.length - 1) {
                    // alternatives this.$lightbox.find('.lb-next').show();
                    this._showRightArrowNav();
                    if (alwaysShowNav) {
                        // alternatives this.$lightbox.find('.lb-next').css('opacity', '1');
                        this._rendererRef.setStyle(this._rightArrowElem.nativeElement, 'opacity', '1');
                    }
                }
            }
        }
    };
    LightboxComponent.prototype._showLeftArrowNav = function () {
        this.ui.showLeftArrow = true;
    };
    LightboxComponent.prototype._showRightArrowNav = function () {
        this.ui.showRightArrow = true;
    };
    LightboxComponent.prototype._showArrowNav = function () {
        this.ui.showArrowNav = (this.album.length !== 1);
    };
    LightboxComponent.prototype._enableKeyboardNav = function () {
        var _this = this;
        this._event.keyup = this._rendererRef.listen('document', 'keyup', function (event) {
            _this._keyboardAction(event);
        });
    };
    LightboxComponent.prototype._disableKeyboardNav = function () {
        if (this._event.keyup) {
            this._event.keyup();
        }
    };
    LightboxComponent.prototype._keyboardAction = function ($event) {
        var KEYCODE_ESC = 27;
        var KEYCODE_LEFTARROW = 37;
        var KEYCODE_RIGHTARROW = 39;
        var keycode = $event.keyCode;
        var key = String.fromCharCode(keycode).toLowerCase();
        if (keycode === KEYCODE_ESC || key.match(/x|o|c/)) {
            this._lightboxEvent.broadcastLightboxEvent({ id: LIGHTBOX_EVENT.CLOSE, data: null });
        }
        else if (key === 'p' || keycode === KEYCODE_LEFTARROW) {
            if (this.currentImageIndex !== 0) {
                this._changeImage(this.currentImageIndex - 1);
            }
            else if (this.options.wrapAround && this.album.length > 1) {
                this._changeImage(this.album.length - 1);
            }
        }
        else if (key === 'n' || keycode === KEYCODE_RIGHTARROW) {
            if (this.currentImageIndex !== this.album.length - 1) {
                this._changeImage(this.currentImageIndex + 1);
            }
            else if (this.options.wrapAround && this.album.length > 1) {
                this._changeImage(0);
            }
        }
    };
    LightboxComponent.prototype._getCssStyleValue = function (elem, propertyName) {
        return parseFloat(this._windowRef
            .getComputedStyle(elem.nativeElement, null)
            .getPropertyValue(propertyName));
    };
    LightboxComponent.prototype._onReceivedEvent = function (event) {
        switch (event.id) {
            case LIGHTBOX_EVENT.CLOSE:
                this._end();
                break;
            default:
                break;
        }
    };
    LightboxComponent.prototype.needsIframe = function (src) {
        // const sanitizedUrl = this._sanitizer.sanitize(SecurityContext.URL, src);
        if (src.match(/\.pdf$/)) {
            return true;
        }
        return false;
    };
    LightboxComponent.ɵfac = function LightboxComponent_Factory(t) { return new (t || LightboxComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(LightboxEvent), ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(LightboxWindowRef), ɵɵdirectiveInject(DomSanitizer), ɵɵdirectiveInject(DOCUMENT)); };
    LightboxComponent.ɵcmp = ɵɵdefineComponent({ type: LightboxComponent, selectors: [["", "lb-content", ""]], viewQuery: function LightboxComponent_Query(rf, ctx) { if (rf & 1) {
            ɵɵviewQuery(_c0, true);
            ɵɵviewQuery(_c1, true);
            ɵɵviewQuery(_c2, true);
            ɵɵviewQuery(_c3, true);
            ɵɵviewQuery(_c4, true);
            ɵɵviewQuery(_c5, true);
            ɵɵviewQuery(_c6, true);
            ɵɵviewQuery(_c7, true);
            ɵɵviewQuery(_c8, true);
            ɵɵviewQuery(_c9, true);
        } if (rf & 2) {
            var _t;
            ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._outerContainerElem = _t.first);
            ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._containerElem = _t.first);
            ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._leftArrowElem = _t.first);
            ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._rightArrowElem = _t.first);
            ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._navArrowElem = _t.first);
            ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._dataContainerElem = _t.first);
            ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._imageElem = _t.first);
            ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._iframeElem = _t.first);
            ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._captionElem = _t.first);
            ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._numberElem = _t.first);
        } }, hostVars: 2, hostBindings: function LightboxComponent_HostBindings(rf, ctx) { if (rf & 1) {
            ɵɵlistener("close", function LightboxComponent_close_HostBindingHandler($event) { return ctx.close($event); });
        } if (rf & 2) {
            ɵɵclassMap(ctx.ui.classList);
        } }, inputs: { album: "album", currentImageIndex: "currentImageIndex", options: "options", cmpRef: "cmpRef" }, attrs: _c10, decls: 32, vars: 13, consts: [["id", "outerContainer", 1, "lb-outerContainer", "transition"], ["outerContainer", ""], ["id", "container", 1, "lb-container"], ["container", ""], ["class", "lb-image", "id", "image", "class", "lb-image animation fadeIn", 3, "src", "hidden", 4, "ngIf"], ["class", "lb-image", "id", "iframe", "class", "lb-image lb-iframe animation fadeIn", 3, "src", "hidden", 4, "ngIf"], [1, "lb-nav", 3, "hidden"], ["navArrow", ""], [1, "lb-prev", 3, "hidden", "click"], ["leftArrow", ""], [1, "lb-next", 3, "hidden", "click"], ["rightArrow", ""], [1, "lb-loader", 3, "hidden", "click"], [1, "lb-cancel"], [1, "lb-dataContainer", 3, "hidden"], ["dataContainer", ""], [1, "lb-data"], [1, "lb-details"], [1, "lb-caption", "animation", "fadeIn", 3, "hidden", "innerHtml"], ["caption", ""], [1, "lb-number", "animation", "fadeIn", 3, "hidden"], ["number", ""], [1, "lb-controlContainer"], [1, "lb-closeContainer"], [1, "lb-close", 3, "click"], [1, "lb-turnContainer", 3, "hidden"], [1, "lb-turnLeft", 3, "click"], [1, "lb-turnRight", 3, "click"], [1, "lb-zoomContainer", 3, "hidden"], [1, "lb-zoomOut", 3, "click"], [1, "lb-zoomIn", 3, "click"], ["id", "image", 1, "lb-image", "animation", "fadeIn", 3, "src", "hidden"], ["image", ""], ["id", "iframe", 1, "lb-image", "lb-iframe", "animation", "fadeIn", 3, "src", "hidden"], ["iframe", ""]], template: function LightboxComponent_Template(rf, ctx) { if (rf & 1) {
            ɵɵelementStart(0, "div", 0, 1);
            ɵɵelementStart(2, "div", 2, 3);
            ɵɵtemplate(4, LightboxComponent_img_4_Template, 2, 2, "img", 4);
            ɵɵtemplate(5, LightboxComponent_iframe_5_Template, 3, 4, "iframe", 5);
            ɵɵelementStart(6, "div", 6, 7);
            ɵɵelementStart(8, "a", 8, 9);
            ɵɵlistener("click", function LightboxComponent_Template_a_click_8_listener() { return ctx.prevImage(); });
            ɵɵelementEnd();
            ɵɵelementStart(10, "a", 10, 11);
            ɵɵlistener("click", function LightboxComponent_Template_a_click_10_listener() { return ctx.nextImage(); });
            ɵɵelementEnd();
            ɵɵelementEnd();
            ɵɵelementStart(12, "div", 12);
            ɵɵlistener("click", function LightboxComponent_Template_div_click_12_listener($event) { return ctx.close($event); });
            ɵɵelement(13, "a", 13);
            ɵɵelementEnd();
            ɵɵelementEnd();
            ɵɵelementEnd();
            ɵɵelementStart(14, "div", 14, 15);
            ɵɵelementStart(16, "div", 16);
            ɵɵelementStart(17, "div", 17);
            ɵɵelement(18, "span", 18, 19);
            ɵɵelementStart(20, "span", 20, 21);
            ɵɵtext(22);
            ɵɵelementEnd();
            ɵɵelementEnd();
            ɵɵelementStart(23, "div", 22);
            ɵɵelementStart(24, "div", 23);
            ɵɵelementStart(25, "a", 24);
            ɵɵlistener("click", function LightboxComponent_Template_a_click_25_listener($event) { return ctx.close($event); });
            ɵɵelementEnd();
            ɵɵelementEnd();
            ɵɵelementStart(26, "div", 25);
            ɵɵelementStart(27, "a", 26);
            ɵɵlistener("click", function LightboxComponent_Template_a_click_27_listener($event) { return ctx.control($event); });
            ɵɵelementEnd();
            ɵɵelementStart(28, "a", 27);
            ɵɵlistener("click", function LightboxComponent_Template_a_click_28_listener($event) { return ctx.control($event); });
            ɵɵelementEnd();
            ɵɵelementEnd();
            ɵɵelementStart(29, "div", 28);
            ɵɵelementStart(30, "a", 29);
            ɵɵlistener("click", function LightboxComponent_Template_a_click_30_listener($event) { return ctx.control($event); });
            ɵɵelementEnd();
            ɵɵelementStart(31, "a", 30);
            ɵɵlistener("click", function LightboxComponent_Template_a_click_31_listener($event) { return ctx.control($event); });
            ɵɵelementEnd();
            ɵɵelementEnd();
            ɵɵelementEnd();
            ɵɵelementEnd();
            ɵɵelementEnd();
        } if (rf & 2) {
            ɵɵadvance(4);
            ɵɵproperty("ngIf", !ctx.album[ctx.currentImageIndex].iframe && !ctx.needsIframe(ctx.album[ctx.currentImageIndex].src));
            ɵɵadvance(1);
            ɵɵproperty("ngIf", ctx.album[ctx.currentImageIndex].iframe || ctx.needsIframe(ctx.album[ctx.currentImageIndex].src));
            ɵɵadvance(1);
            ɵɵproperty("hidden", !ctx.ui.showArrowNav);
            ɵɵadvance(2);
            ɵɵproperty("hidden", !ctx.ui.showLeftArrow);
            ɵɵadvance(2);
            ɵɵproperty("hidden", !ctx.ui.showRightArrow);
            ɵɵadvance(2);
            ɵɵproperty("hidden", !ctx.ui.showReloader);
            ɵɵadvance(2);
            ɵɵproperty("hidden", ctx.ui.showReloader);
            ɵɵadvance(4);
            ɵɵproperty("hidden", !ctx.ui.showCaption)("innerHtml", ctx.album[ctx.currentImageIndex].caption, ɵɵsanitizeHtml);
            ɵɵadvance(2);
            ɵɵproperty("hidden", !ctx.ui.showPageNumber);
            ɵɵadvance(2);
            ɵɵtextInterpolate(ctx.content.pageNumber);
            ɵɵadvance(4);
            ɵɵproperty("hidden", !ctx.ui.showRotateButton);
            ɵɵadvance(3);
            ɵɵproperty("hidden", !ctx.ui.showZoomButton);
        } }, directives: [NgIf], pipes: [SafePipe], encapsulation: 2 });
    return LightboxComponent;
}());
/*@__PURE__*/ (function () { ɵsetClassMetadata(LightboxComponent, [{
        type: Component,
        args: [{
                selector: '[lb-content]',
                host: {
                    '[class]': 'ui.classList'
                },
                templateUrl: "./lightbox.component.html",
            }]
    }], function () { return [{ type: ElementRef }, { type: Renderer2 }, { type: LightboxEvent }, { type: ElementRef }, { type: LightboxWindowRef }, { type: DomSanitizer }, { type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, { album: [{
            type: Input
        }], currentImageIndex: [{
            type: Input
        }], options: [{
            type: Input
        }], cmpRef: [{
            type: Input
        }], _outerContainerElem: [{
            type: ViewChild,
            args: ['outerContainer']
        }], _containerElem: [{
            type: ViewChild,
            args: ['container']
        }], _leftArrowElem: [{
            type: ViewChild,
            args: ['leftArrow']
        }], _rightArrowElem: [{
            type: ViewChild,
            args: ['rightArrow']
        }], _navArrowElem: [{
            type: ViewChild,
            args: ['navArrow']
        }], _dataContainerElem: [{
            type: ViewChild,
            args: ['dataContainer']
        }], _imageElem: [{
            type: ViewChild,
            args: ['image']
        }], _iframeElem: [{
            type: ViewChild,
            args: ['iframe']
        }], _captionElem: [{
            type: ViewChild,
            args: ['caption']
        }], _numberElem: [{
            type: ViewChild,
            args: ['number']
        }], close: [{
            type: HostListener,
            args: ['close', ['$event']]
        }] }); })();

var LightboxConfig = /** @class */ (function () {
    function LightboxConfig() {
        this.fadeDuration = 0.7;
        this.resizeDuration = 0.5;
        this.fitImageInViewPort = true;
        this.positionFromTop = 20;
        this.showImageNumberLabel = false;
        this.alwaysShowNavOnTouchDevices = false;
        this.wrapAround = false;
        this.disableKeyboardNav = false;
        this.disableScrolling = false;
        this.centerVertically = false;
        this.enableTransition = true;
        this.albumLabel = 'Image %1 of %2';
        this.showZoom = false;
        this.showRotate = false;
        this.containerElementResolver = function (documentRef) { return documentRef.querySelector('body'); };
    }
    LightboxConfig.ɵfac = function LightboxConfig_Factory(t) { return new (t || LightboxConfig)(); };
    LightboxConfig.ɵprov = ɵɵdefineInjectable({ token: LightboxConfig, factory: LightboxConfig.ɵfac, providedIn: 'root' });
    return LightboxConfig;
}());
/*@__PURE__*/ (function () { ɵsetClassMetadata(LightboxConfig, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

var _c0$1 = ["lb-overlay", ""];
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
    LightboxOverlayComponent.ɵfac = function LightboxOverlayComponent_Factory(t) { return new (t || LightboxOverlayComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(LightboxEvent), ɵɵdirectiveInject(DOCUMENT)); };
    LightboxOverlayComponent.ɵcmp = ɵɵdefineComponent({ type: LightboxOverlayComponent, selectors: [["", "lb-overlay", ""]], hostVars: 2, hostBindings: function LightboxOverlayComponent_HostBindings(rf, ctx) { if (rf & 1) {
            ɵɵlistener("click", function LightboxOverlayComponent_click_HostBindingHandler() { return ctx.close(); })("resize", function LightboxOverlayComponent_resize_HostBindingHandler() { return ctx.onResize(); }, false, ɵɵresolveWindow);
        } if (rf & 2) {
            ɵɵclassMap(ctx.classList);
        } }, inputs: { options: "options", cmpRef: "cmpRef" }, attrs: _c0$1, decls: 0, vars: 0, template: function LightboxOverlayComponent_Template(rf, ctx) { }, encapsulation: 2 });
    return LightboxOverlayComponent;
}());
/*@__PURE__*/ (function () { ɵsetClassMetadata(LightboxOverlayComponent, [{
        type: Component,
        args: [{
                selector: '[lb-overlay]',
                template: '',
                host: {
                    '[class]': 'classList'
                }
            }]
    }], function () { return [{ type: ElementRef }, { type: Renderer2 }, { type: LightboxEvent }, { type: undefined, decorators: [{
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
    Lightbox.ɵfac = function Lightbox_Factory(t) { return new (t || Lightbox)(ɵɵinject(ComponentFactoryResolver), ɵɵinject(Injector), ɵɵinject(ApplicationRef), ɵɵinject(LightboxConfig), ɵɵinject(LightboxEvent), ɵɵinject(DOCUMENT)); };
    Lightbox.ɵprov = ɵɵdefineInjectable({ token: Lightbox, factory: Lightbox.ɵfac, providedIn: 'root' });
    return Lightbox;
}());
/*@__PURE__*/ (function () { ɵsetClassMetadata(Lightbox, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: ComponentFactoryResolver }, { type: Injector }, { type: ApplicationRef }, { type: LightboxConfig }, { type: LightboxEvent }, { type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();

var LightboxModule = /** @class */ (function () {
    function LightboxModule() {
    }
    LightboxModule.ɵmod = ɵɵdefineNgModule({ type: LightboxModule });
    LightboxModule.ɵinj = ɵɵdefineInjector({ factory: function LightboxModule_Factory(t) { return new (t || LightboxModule)(); }, providers: [
            Lightbox,
            LightboxConfig,
            LightboxEvent,
            LightboxWindowRef
        ], imports: [[CommonModule]] });
    return LightboxModule;
}());
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(LightboxModule, { declarations: [LightboxOverlayComponent, LightboxComponent, SafePipe], imports: [CommonModule] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(LightboxModule, [{
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

/**
 * Generated bundle index. Do not edit.
 */

export { LIGHTBOX_EVENT, Lightbox, LightboxConfig, LightboxEvent, LightboxModule, LightboxWindowRef };
//# sourceMappingURL=ngx-lightbox.js.map
