import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, Input, Pipe, Renderer2, SecurityContext, ViewChild, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { LIGHTBOX_EVENT, LightboxEvent, LightboxWindowRef } from './lightbox-event.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "./lightbox-event.service";
import * as i3 from "@angular/common";
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
    i0.ɵɵelement(0, "img", 31, 32);
} if (rf & 2) {
    var ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("src", ctx_r2.album[ctx_r2.currentImageIndex].src, i0.ɵɵsanitizeUrl)("hidden", ctx_r2.ui.showReloader);
} }
function LightboxComponent_iframe_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "iframe", 33, 34);
    i0.ɵɵpipe(2, "safe");
} if (rf & 2) {
    var ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("src", i0.ɵɵpipeBind1(2, 2, ctx_r3.album[ctx_r3.currentImageIndex].src), i0.ɵɵsanitizeResourceUrl)("hidden", ctx_r3.ui.showReloader);
} }
var SafePipe = /** @class */ (function () {
    function SafePipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    SafePipe.prototype.transform = function (url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    };
    SafePipe.ɵfac = function SafePipe_Factory(t) { return new (t || SafePipe)(i0.ɵɵdirectiveInject(i1.DomSanitizer)); };
    SafePipe.ɵpipe = i0.ɵɵdefinePipe({ name: "safe", type: SafePipe, pure: true });
    return SafePipe;
}());
export { SafePipe };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(SafePipe, [{
        type: Pipe,
        args: [{ name: 'safe' }]
    }], function () { return [{ type: i1.DomSanitizer }]; }, null); })();
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
    LightboxComponent.ɵfac = function LightboxComponent_Factory(t) { return new (t || LightboxComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i2.LightboxEvent), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i2.LightboxWindowRef), i0.ɵɵdirectiveInject(i1.DomSanitizer), i0.ɵɵdirectiveInject(DOCUMENT)); };
    LightboxComponent.ɵcmp = i0.ɵɵdefineComponent({ type: LightboxComponent, selectors: [["", "lb-content", ""]], viewQuery: function LightboxComponent_Query(rf, ctx) { if (rf & 1) {
            i0.ɵɵviewQuery(_c0, true);
            i0.ɵɵviewQuery(_c1, true);
            i0.ɵɵviewQuery(_c2, true);
            i0.ɵɵviewQuery(_c3, true);
            i0.ɵɵviewQuery(_c4, true);
            i0.ɵɵviewQuery(_c5, true);
            i0.ɵɵviewQuery(_c6, true);
            i0.ɵɵviewQuery(_c7, true);
            i0.ɵɵviewQuery(_c8, true);
            i0.ɵɵviewQuery(_c9, true);
        } if (rf & 2) {
            var _t;
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._outerContainerElem = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._containerElem = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._leftArrowElem = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._rightArrowElem = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._navArrowElem = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._dataContainerElem = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._imageElem = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._iframeElem = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._captionElem = _t.first);
            i0.ɵɵqueryRefresh(_t = i0.ɵɵloadQuery()) && (ctx._numberElem = _t.first);
        } }, hostVars: 2, hostBindings: function LightboxComponent_HostBindings(rf, ctx) { if (rf & 1) {
            i0.ɵɵlistener("close", function LightboxComponent_close_HostBindingHandler($event) { return ctx.close($event); });
        } if (rf & 2) {
            i0.ɵɵclassMap(ctx.ui.classList);
        } }, inputs: { album: "album", currentImageIndex: "currentImageIndex", options: "options", cmpRef: "cmpRef" }, attrs: _c10, decls: 32, vars: 13, consts: [["id", "outerContainer", 1, "lb-outerContainer", "transition"], ["outerContainer", ""], ["id", "container", 1, "lb-container"], ["container", ""], ["class", "lb-image", "id", "image", "class", "lb-image animation fadeIn", 3, "src", "hidden", 4, "ngIf"], ["class", "lb-image", "id", "iframe", "class", "lb-image lb-iframe animation fadeIn", 3, "src", "hidden", 4, "ngIf"], [1, "lb-nav", 3, "hidden"], ["navArrow", ""], [1, "lb-prev", 3, "hidden", "click"], ["leftArrow", ""], [1, "lb-next", 3, "hidden", "click"], ["rightArrow", ""], [1, "lb-loader", 3, "hidden", "click"], [1, "lb-cancel"], [1, "lb-dataContainer", 3, "hidden"], ["dataContainer", ""], [1, "lb-data"], [1, "lb-details"], [1, "lb-caption", "animation", "fadeIn", 3, "hidden", "innerHtml"], ["caption", ""], [1, "lb-number", "animation", "fadeIn", 3, "hidden"], ["number", ""], [1, "lb-controlContainer"], [1, "lb-closeContainer"], [1, "lb-close", 3, "click"], [1, "lb-turnContainer", 3, "hidden"], [1, "lb-turnLeft", 3, "click"], [1, "lb-turnRight", 3, "click"], [1, "lb-zoomContainer", 3, "hidden"], [1, "lb-zoomOut", 3, "click"], [1, "lb-zoomIn", 3, "click"], ["id", "image", 1, "lb-image", "animation", "fadeIn", 3, "src", "hidden"], ["image", ""], ["id", "iframe", 1, "lb-image", "lb-iframe", "animation", "fadeIn", 3, "src", "hidden"], ["iframe", ""]], template: function LightboxComponent_Template(rf, ctx) { if (rf & 1) {
            i0.ɵɵelementStart(0, "div", 0, 1);
            i0.ɵɵelementStart(2, "div", 2, 3);
            i0.ɵɵtemplate(4, LightboxComponent_img_4_Template, 2, 2, "img", 4);
            i0.ɵɵtemplate(5, LightboxComponent_iframe_5_Template, 3, 4, "iframe", 5);
            i0.ɵɵelementStart(6, "div", 6, 7);
            i0.ɵɵelementStart(8, "a", 8, 9);
            i0.ɵɵlistener("click", function LightboxComponent_Template_a_click_8_listener() { return ctx.prevImage(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(10, "a", 10, 11);
            i0.ɵɵlistener("click", function LightboxComponent_Template_a_click_10_listener() { return ctx.nextImage(); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(12, "div", 12);
            i0.ɵɵlistener("click", function LightboxComponent_Template_div_click_12_listener($event) { return ctx.close($event); });
            i0.ɵɵelement(13, "a", 13);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(14, "div", 14, 15);
            i0.ɵɵelementStart(16, "div", 16);
            i0.ɵɵelementStart(17, "div", 17);
            i0.ɵɵelement(18, "span", 18, 19);
            i0.ɵɵelementStart(20, "span", 20, 21);
            i0.ɵɵtext(22);
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(23, "div", 22);
            i0.ɵɵelementStart(24, "div", 23);
            i0.ɵɵelementStart(25, "a", 24);
            i0.ɵɵlistener("click", function LightboxComponent_Template_a_click_25_listener($event) { return ctx.close($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(26, "div", 25);
            i0.ɵɵelementStart(27, "a", 26);
            i0.ɵɵlistener("click", function LightboxComponent_Template_a_click_27_listener($event) { return ctx.control($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(28, "a", 27);
            i0.ɵɵlistener("click", function LightboxComponent_Template_a_click_28_listener($event) { return ctx.control($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(29, "div", 28);
            i0.ɵɵelementStart(30, "a", 29);
            i0.ɵɵlistener("click", function LightboxComponent_Template_a_click_30_listener($event) { return ctx.control($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementStart(31, "a", 30);
            i0.ɵɵlistener("click", function LightboxComponent_Template_a_click_31_listener($event) { return ctx.control($event); });
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
            i0.ɵɵelementEnd();
        } if (rf & 2) {
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("ngIf", !ctx.album[ctx.currentImageIndex].iframe && !ctx.needsIframe(ctx.album[ctx.currentImageIndex].src));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("ngIf", ctx.album[ctx.currentImageIndex].iframe || ctx.needsIframe(ctx.album[ctx.currentImageIndex].src));
            i0.ɵɵadvance(1);
            i0.ɵɵproperty("hidden", !ctx.ui.showArrowNav);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("hidden", !ctx.ui.showLeftArrow);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("hidden", !ctx.ui.showRightArrow);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("hidden", !ctx.ui.showReloader);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("hidden", ctx.ui.showReloader);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("hidden", !ctx.ui.showCaption)("innerHtml", ctx.album[ctx.currentImageIndex].caption, i0.ɵɵsanitizeHtml);
            i0.ɵɵadvance(2);
            i0.ɵɵproperty("hidden", !ctx.ui.showPageNumber);
            i0.ɵɵadvance(2);
            i0.ɵɵtextInterpolate(ctx.content.pageNumber);
            i0.ɵɵadvance(4);
            i0.ɵɵproperty("hidden", !ctx.ui.showRotateButton);
            i0.ɵɵadvance(3);
            i0.ɵɵproperty("hidden", !ctx.ui.showZoomButton);
        } }, directives: [i3.NgIf], pipes: [SafePipe], encapsulation: 2 });
    return LightboxComponent;
}());
export { LightboxComponent };
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(LightboxComponent, [{
        type: Component,
        args: [{
                selector: '[lb-content]',
                host: {
                    '[class]': 'ui.classList'
                },
                templateUrl: "./lightbox.component.html",
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i2.LightboxEvent }, { type: i0.ElementRef }, { type: i2.LightboxWindowRef }, { type: i1.DomSanitizer }, { type: undefined, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWxpZ2h0Ym94LyIsInNvdXJjZXMiOlsibGliL2xpZ2h0Ym94LmNvbXBvbmVudC50cyIsImxpYi9saWdodGJveC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBRUcsSUFBSSxFQUNaLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwyQkFBMkIsQ0FBQztBQUV2RCxPQUFPLEVBQWlCLGNBQWMsRUFBRSxhQUFhLEVBQUUsaUJBQWlCLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUNkbEcsOEJBR0E7OztJQUhpQyxrRkFBb0Msa0NBQUE7OztJQUdyRSxpQ0FHUzs7OztJQUg0QixnSEFBMkMsa0NBQUE7O0FEYXhGO0lBRUUsa0JBQW9CLFNBQXVCO1FBQXZCLGNBQVMsR0FBVCxTQUFTLENBQWM7SUFBRyxDQUFDO0lBQy9DLDRCQUFTLEdBQVQsVUFBVSxHQUFHO1FBQ1gsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLDhCQUE4QixDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzVELENBQUM7b0VBSlUsUUFBUTsyREFBUixRQUFRO21CQW5CckI7Q0F3QkMsQUFORCxJQU1DO1NBTFksUUFBUTtrREFBUixRQUFRO2NBRHBCLElBQUk7ZUFBQyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7O0FBUXRCO0lBNEJFLDJCQUNVLFFBQW9CLEVBQ3BCLFlBQXVCLEVBQ3ZCLGNBQTZCLEVBQzlCLGFBQXlCLEVBQ3hCLGtCQUFxQyxFQUNyQyxVQUF3QixFQUNOLFlBQVk7UUFQeEMsaUJBaURD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bkJDO1NBam5CWSxpQkFBaUI7a0RBQWpCLGlCQUFpQjtjQVA3QixTQUFTO2VBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLElBQUksRUFBRTtvQkFDSixTQUFTLEVBQUUsY0FBYztpQkFDMUI7Z0JBQ0QsV0FBVyxFQUFFLDJCQUEyQjthQUN6Qzs7c0JBNkJJLE1BQU07dUJBQUMsUUFBUTs7a0JBM0JqQixLQUFLOztrQkFDTCxLQUFLOztrQkFDTCxLQUFLOztrQkFDTCxLQUFLOztrQkFDTCxTQUFTO21CQUFDLGdCQUFnQjs7a0JBQzFCLFNBQVM7bUJBQUMsV0FBVzs7a0JBQ3JCLFNBQVM7bUJBQUMsV0FBVzs7a0JBQ3JCLFNBQVM7bUJBQUMsWUFBWTs7a0JBQ3RCLFNBQVM7bUJBQUMsVUFBVTs7a0JBQ3BCLFNBQVM7bUJBQUMsZUFBZTs7a0JBQ3pCLFNBQVM7bUJBQUMsT0FBTzs7a0JBQ2pCLFNBQVM7bUJBQUMsUUFBUTs7a0JBQ2xCLFNBQVM7bUJBQUMsU0FBUzs7a0JBQ25CLFNBQVM7bUJBQUMsUUFBUTs7a0JBK0ZsQixZQUFZO21CQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7XHJcbiAgQWZ0ZXJWaWV3SW5pdCxcclxuICBDb21wb25lbnQsXHJcbiAgRWxlbWVudFJlZixcclxuICBIb3N0TGlzdGVuZXIsXHJcbiAgSW5qZWN0LFxyXG4gIElucHV0LFxyXG4gIE9uRGVzdHJveSxcclxuICBPbkluaXQsIFBpcGUsIFBpcGVUcmFuc2Zvcm0sXHJcbiAgUmVuZGVyZXIyLFxyXG4gIFNlY3VyaXR5Q29udGV4dCxcclxuICBWaWV3Q2hpbGQsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7RG9tU2FuaXRpemVyfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuXHJcbmltcG9ydCB7SUFsYnVtLCBJRXZlbnQsIExJR0hUQk9YX0VWRU5ULCBMaWdodGJveEV2ZW50LCBMaWdodGJveFdpbmRvd1JlZn0gZnJvbSAnLi9saWdodGJveC1ldmVudC5zZXJ2aWNlJztcclxuXHJcbkBQaXBlKHsgbmFtZTogJ3NhZmUnIH0pXHJcbmV4cG9ydCBjbGFzcyBTYWZlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xyXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHt9XHJcbiAgdHJhbnNmb3JtKHVybCkge1xyXG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCh1cmwpO1xyXG4gIH1cclxufVxyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgc2VsZWN0b3I6ICdbbGItY29udGVudF0nLFxyXG4gIGhvc3Q6IHtcclxuICAgICdbY2xhc3NdJzogJ3VpLmNsYXNzTGlzdCdcclxuICB9LFxyXG4gIHRlbXBsYXRlVXJsOiBcIi4vbGlnaHRib3guY29tcG9uZW50Lmh0bWxcIixcclxufSlcclxuZXhwb3J0IGNsYXNzIExpZ2h0Ym94Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3ksIE9uSW5pdCB7XHJcbiAgQElucHV0KCkgYWxidW06IEFycmF5PElBbGJ1bT47XHJcbiAgQElucHV0KCkgY3VycmVudEltYWdlSW5kZXg6IG51bWJlcjtcclxuICBASW5wdXQoKSBvcHRpb25zOiBhbnk7XHJcbiAgQElucHV0KCkgY21wUmVmOiBhbnk7XHJcbiAgQFZpZXdDaGlsZCgnb3V0ZXJDb250YWluZXInKSBfb3V0ZXJDb250YWluZXJFbGVtOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ2NvbnRhaW5lcicpIF9jb250YWluZXJFbGVtOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ2xlZnRBcnJvdycpIF9sZWZ0QXJyb3dFbGVtOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ3JpZ2h0QXJyb3cnKSBfcmlnaHRBcnJvd0VsZW06IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnbmF2QXJyb3cnKSBfbmF2QXJyb3dFbGVtOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ2RhdGFDb250YWluZXInKSBfZGF0YUNvbnRhaW5lckVsZW06IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnaW1hZ2UnKSBfaW1hZ2VFbGVtOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ2lmcmFtZScpIF9pZnJhbWVFbGVtOiBFbGVtZW50UmVmO1xyXG4gIEBWaWV3Q2hpbGQoJ2NhcHRpb24nKSBfY2FwdGlvbkVsZW06IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnbnVtYmVyJykgX251bWJlckVsZW06IEVsZW1lbnRSZWY7XHJcbiAgcHVibGljIGNvbnRlbnQ6IGFueTtcclxuICBwdWJsaWMgdWk6IGFueTtcclxuICBwcml2YXRlIF9jc3NWYWx1ZTogYW55O1xyXG4gIHByaXZhdGUgX2V2ZW50OiBhbnk7XHJcbiAgcHJpdmF0ZSBfd2luZG93UmVmOiBhbnk7XHJcbiAgcHJpdmF0ZSByb3RhdGU6IG51bWJlcjtcclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHByaXZhdGUgX2VsZW1SZWY6IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIF9yZW5kZXJlclJlZjogUmVuZGVyZXIyLFxyXG4gICAgcHJpdmF0ZSBfbGlnaHRib3hFdmVudDogTGlnaHRib3hFdmVudCxcclxuICAgIHB1YmxpYyBfbGlnaHRib3hFbGVtOiBFbGVtZW50UmVmLFxyXG4gICAgcHJpdmF0ZSBfbGlnaHRib3hXaW5kb3dSZWY6IExpZ2h0Ym94V2luZG93UmVmLFxyXG4gICAgcHJpdmF0ZSBfc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXHJcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudFJlZlxyXG4gICkge1xyXG4gICAgLy8gaW5pdGlhbGl6ZSBkYXRhXHJcbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLm9wdGlvbnMgfHwge307XHJcbiAgICB0aGlzLmFsYnVtID0gdGhpcy5hbGJ1bSB8fCBbXTtcclxuICAgIHRoaXMuY3VycmVudEltYWdlSW5kZXggPSB0aGlzLmN1cnJlbnRJbWFnZUluZGV4IHx8IDA7XHJcbiAgICB0aGlzLl93aW5kb3dSZWYgPSB0aGlzLl9saWdodGJveFdpbmRvd1JlZi5uYXRpdmVXaW5kb3c7XHJcblxyXG4gICAgLy8gY29udHJvbCB0aGUgaW50ZXJhY3RpdmUgb2YgdGhlIGRpcmVjdGl2ZVxyXG4gICAgdGhpcy51aSA9IHtcclxuICAgICAgLy8gY29udHJvbCB0aGUgYXBwZWFyIG9mIHRoZSByZWxvYWRlclxyXG4gICAgICAvLyBmYWxzZTogaW1hZ2UgaGFzIGxvYWRlZCBjb21wbGV0ZWx5IGFuZCByZWFkeSB0byBiZSBzaG93blxyXG4gICAgICAvLyB0cnVlOiBpbWFnZSBpcyBzdGlsbCBsb2FkaW5nXHJcbiAgICAgIHNob3dSZWxvYWRlcjogdHJ1ZSxcclxuXHJcbiAgICAgIC8vIGNvbnRyb2wgdGhlIGFwcGVhciBvZiB0aGUgbmF2IGFycm93XHJcbiAgICAgIC8vIHRoZSBhcnJvd05hdiBpcyB0aGUgcGFyZW50IG9mIGJvdGggbGVmdCBhbmQgcmlnaHQgYXJyb3dcclxuICAgICAgLy8gaW4gc29tZSBjYXNlcywgdGhlIHBhcmVudCBzaG93cyBidXQgdGhlIGNoaWxkIGRvZXMgbm90IHNob3dcclxuICAgICAgc2hvd0xlZnRBcnJvdzogZmFsc2UsXHJcbiAgICAgIHNob3dSaWdodEFycm93OiBmYWxzZSxcclxuICAgICAgc2hvd0Fycm93TmF2OiBmYWxzZSxcclxuXHJcbiAgICAgIC8vIGNvbnRyb2wgdGhlIGFwcGVhciBvZiB0aGUgem9vbSBhbmQgcm90YXRlIGJ1dHRvbnNcclxuICAgICAgc2hvd1pvb21CdXR0b246IGZhbHNlLFxyXG4gICAgICBzaG93Um90YXRlQnV0dG9uOiBmYWxzZSxcclxuXHJcbiAgICAgIC8vIGNvbnRyb2wgd2hldGhlciB0byBzaG93IHRoZVxyXG4gICAgICAvLyBwYWdlIG51bWJlciBvciBub3RcclxuICAgICAgc2hvd1BhZ2VOdW1iZXI6IGZhbHNlLFxyXG4gICAgICBzaG93Q2FwdGlvbjogZmFsc2UsXHJcbiAgICAgIGNsYXNzTGlzdDogJ2xpZ2h0Ym94IGFuaW1hdGlvbiBmYWRlSW4nXHJcbiAgICB9O1xyXG5cclxuICAgIHRoaXMuY29udGVudCA9IHtcclxuICAgICAgcGFnZU51bWJlcjogJydcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5fZXZlbnQgPSB7fTtcclxuICAgIHRoaXMuX2xpZ2h0Ym94RWxlbSA9IHRoaXMuX2VsZW1SZWY7XHJcbiAgICB0aGlzLl9ldmVudC5zdWJzY3JpcHRpb24gPSB0aGlzLl9saWdodGJveEV2ZW50LmxpZ2h0Ym94RXZlbnQkXHJcbiAgICAgIC5zdWJzY3JpYmUoKGV2ZW50OiBJRXZlbnQpID0+IHRoaXMuX29uUmVjZWl2ZWRFdmVudChldmVudCkpO1xyXG4gICAgdGhpcy5yb3RhdGUgPSAwO1xyXG4gIH1cclxuXHJcbiAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmFsYnVtLmZvckVhY2goYWxidW0gPT4ge1xyXG4gICAgICBpZiAoYWxidW0uY2FwdGlvbikge1xyXG4gICAgICAgIGFsYnVtLmNhcHRpb24gPSB0aGlzLl9zYW5pdGl6ZXIuc2FuaXRpemUoU2VjdXJpdHlDb250ZXh0LkhUTUwsIGFsYnVtLmNhcHRpb24pO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XHJcbiAgICAvLyBuZWVkIHRvIGluaXQgY3NzIHZhbHVlIGhlcmUsIGFmdGVyIHRoZSB2aWV3IHJlYWR5XHJcbiAgICAvLyBhY3R1YWxseSB0aGVzZSB2YWx1ZXMgYXJlIGFsd2F5cyAwXHJcbiAgICB0aGlzLl9jc3NWYWx1ZSA9IHtcclxuICAgICAgY29udGFpbmVyVG9wUGFkZGluZzogTWF0aC5yb3VuZCh0aGlzLl9nZXRDc3NTdHlsZVZhbHVlKHRoaXMuX2NvbnRhaW5lckVsZW0sICdwYWRkaW5nLXRvcCcpKSxcclxuICAgICAgY29udGFpbmVyUmlnaHRQYWRkaW5nOiBNYXRoLnJvdW5kKHRoaXMuX2dldENzc1N0eWxlVmFsdWUodGhpcy5fY29udGFpbmVyRWxlbSwgJ3BhZGRpbmctcmlnaHQnKSksXHJcbiAgICAgIGNvbnRhaW5lckJvdHRvbVBhZGRpbmc6IE1hdGgucm91bmQodGhpcy5fZ2V0Q3NzU3R5bGVWYWx1ZSh0aGlzLl9jb250YWluZXJFbGVtLCAncGFkZGluZy1ib3R0b20nKSksXHJcbiAgICAgIGNvbnRhaW5lckxlZnRQYWRkaW5nOiBNYXRoLnJvdW5kKHRoaXMuX2dldENzc1N0eWxlVmFsdWUodGhpcy5fY29udGFpbmVyRWxlbSwgJ3BhZGRpbmctbGVmdCcpKSxcclxuICAgICAgaW1hZ2VCb3JkZXJXaWR0aFRvcDogTWF0aC5yb3VuZCh0aGlzLl9nZXRDc3NTdHlsZVZhbHVlKHRoaXMuX2ltYWdlRWxlbSB8fCB0aGlzLl9pZnJhbWVFbGVtLCAnYm9yZGVyLXRvcC13aWR0aCcpKSxcclxuICAgICAgaW1hZ2VCb3JkZXJXaWR0aEJvdHRvbTogTWF0aC5yb3VuZCh0aGlzLl9nZXRDc3NTdHlsZVZhbHVlKHRoaXMuX2ltYWdlRWxlbSB8fCB0aGlzLl9pZnJhbWVFbGVtLCAnYm9yZGVyLWJvdHRvbS13aWR0aCcpKSxcclxuICAgICAgaW1hZ2VCb3JkZXJXaWR0aExlZnQ6IE1hdGgucm91bmQodGhpcy5fZ2V0Q3NzU3R5bGVWYWx1ZSh0aGlzLl9pbWFnZUVsZW0gfHwgdGhpcy5faWZyYW1lRWxlbSwgJ2JvcmRlci1sZWZ0LXdpZHRoJykpLFxyXG4gICAgICBpbWFnZUJvcmRlcldpZHRoUmlnaHQ6IE1hdGgucm91bmQodGhpcy5fZ2V0Q3NzU3R5bGVWYWx1ZSh0aGlzLl9pbWFnZUVsZW0gfHwgdGhpcy5faWZyYW1lRWxlbSwgJ2JvcmRlci1yaWdodC13aWR0aCcpKVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAodGhpcy5fdmFsaWRhdGVJbnB1dERhdGEoKSkge1xyXG4gICAgICB0aGlzLl9wcmVwYXJlQ29tcG9uZW50KCk7XHJcbiAgICAgIHRoaXMuX3JlZ2lzdGVySW1hZ2VMb2FkaW5nRXZlbnQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5vcHRpb25zLmRpc2FibGVLZXlib2FyZE5hdikge1xyXG4gICAgICAvLyB1bmJpbmQga2V5Ym9hcmQgZXZlbnRcclxuICAgICAgdGhpcy5fZGlzYWJsZUtleWJvYXJkTmF2KCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fZXZlbnQuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgfVxyXG5cclxuICBASG9zdExpc3RlbmVyKCdjbG9zZScsIFsnJGV2ZW50J10pXHJcbiAgcHVibGljIGNsb3NlKCRldmVudDogYW55KTogdm9pZCB7XHJcbiAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBpZiAoJGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2xpZ2h0Ym94JykgfHxcclxuICAgICAgJGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2xiLWxvYWRlcicpIHx8XHJcbiAgICAgICRldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsYi1jbG9zZScpKSB7XHJcbiAgICAgIHRoaXMuX2xpZ2h0Ym94RXZlbnQuYnJvYWRjYXN0TGlnaHRib3hFdmVudCh7IGlkOiBMSUdIVEJPWF9FVkVOVC5DTE9TRSwgZGF0YTogbnVsbCB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBjb250cm9sKCRldmVudDogYW55KTogdm9pZCB7XHJcbiAgICAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBsZXQgaGVpZ2h0OiBudW1iZXI7XHJcbiAgICBsZXQgd2lkdGg6IG51bWJlcjtcclxuICAgIGlmICgkZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbGItdHVybkxlZnQnKSkge1xyXG4gICAgICB0aGlzLnJvdGF0ZSA9IHRoaXMucm90YXRlIC0gOTA7XHJcbiAgICAgIHRoaXMuX3JvdGF0ZUNvbnRhaW5lcigpO1xyXG4gICAgICB0aGlzLl9jYWxjVHJhbnNmb3JtUG9pbnQoKTtcclxuICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlJykuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke3RoaXMucm90YXRlfWRlZylgO1xyXG4gICAgICB0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBgcm90YXRlKCR7dGhpcy5yb3RhdGV9ZGVnKWA7XHJcbiAgICAgIHRoaXMuX2xpZ2h0Ym94RXZlbnQuYnJvYWRjYXN0TGlnaHRib3hFdmVudCh7IGlkOiBMSUdIVEJPWF9FVkVOVC5ST1RBVEVfTEVGVCwgZGF0YTogbnVsbCB9KTtcclxuICAgIH0gZWxzZSBpZiAoJGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2xiLXR1cm5SaWdodCcpKSB7XHJcbiAgICAgIHRoaXMucm90YXRlID0gdGhpcy5yb3RhdGUgKyA5MDtcclxuICAgICAgdGhpcy5fcm90YXRlQ29udGFpbmVyKCk7XHJcbiAgICAgIHRoaXMuX2NhbGNUcmFuc2Zvcm1Qb2ludCgpO1xyXG4gICAgICB0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKS5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7dGhpcy5yb3RhdGV9ZGVnKWA7XHJcbiAgICAgIHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdpbWFnZScpLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGByb3RhdGUoJHt0aGlzLnJvdGF0ZX1kZWcpYDtcclxuICAgICAgdGhpcy5fbGlnaHRib3hFdmVudC5icm9hZGNhc3RMaWdodGJveEV2ZW50KHsgaWQ6IExJR0hUQk9YX0VWRU5ULlJPVEFURV9SSUdIVCwgZGF0YTogbnVsbCB9KTtcclxuICAgIH0gZWxzZSBpZiAoJGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2xiLXpvb21PdXQnKSkge1xyXG4gICAgICBoZWlnaHQgPSBwYXJzZUludCh0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnb3V0ZXJDb250YWluZXInKS5zdHlsZS5oZWlnaHQsIDEwKSAvIDEuNTtcclxuICAgICAgd2lkdGggPSBwYXJzZUludCh0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnb3V0ZXJDb250YWluZXInKS5zdHlsZS53aWR0aCwgMTApIC8gMS41O1xyXG4gICAgICB0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnb3V0ZXJDb250YWluZXInKS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xyXG4gICAgICB0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnb3V0ZXJDb250YWluZXInKS5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcclxuICAgICAgaGVpZ2h0ID0gcGFyc2VJbnQodGhpcy5fZG9jdW1lbnRSZWYuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlJykuc3R5bGUuaGVpZ2h0LCAxMCkgLyAxLjU7XHJcbiAgICAgIHdpZHRoID0gcGFyc2VJbnQodGhpcy5fZG9jdW1lbnRSZWYuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlJykuc3R5bGUud2lkdGgsIDEwKSAvIDEuNTtcclxuICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlJykuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcclxuICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlJykuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XHJcbiAgICAgIHRoaXMuX2xpZ2h0Ym94RXZlbnQuYnJvYWRjYXN0TGlnaHRib3hFdmVudCh7IGlkOiBMSUdIVEJPWF9FVkVOVC5aT09NX09VVCwgZGF0YTogbnVsbCB9KTtcclxuICAgIH0gZWxzZSBpZiAoJGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2xiLXpvb21JbicpKSB7XHJcbiAgICAgIGhlaWdodCA9IHBhcnNlSW50KHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdvdXRlckNvbnRhaW5lcicpLnN0eWxlLmhlaWdodCwgMTApICogMS41O1xyXG4gICAgICB3aWR0aCA9IHBhcnNlSW50KHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdvdXRlckNvbnRhaW5lcicpLnN0eWxlLndpZHRoLCAxMCkgKiAxLjU7XHJcbiAgICAgIHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdvdXRlckNvbnRhaW5lcicpLnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XHJcbiAgICAgIHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdvdXRlckNvbnRhaW5lcicpLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xyXG4gICAgICBoZWlnaHQgPSBwYXJzZUludCh0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKS5zdHlsZS5oZWlnaHQsIDEwKSAqIDEuNTtcclxuICAgICAgd2lkdGggPSBwYXJzZUludCh0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKS5zdHlsZS53aWR0aCwgMTApICogMS41O1xyXG4gICAgICB0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xyXG4gICAgICB0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKS5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcclxuICAgICAgdGhpcy5fbGlnaHRib3hFdmVudC5icm9hZGNhc3RMaWdodGJveEV2ZW50KHsgaWQ6IExJR0hUQk9YX0VWRU5ULlpPT01fSU4sIGRhdGE6IG51bGwgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9yb3RhdGVDb250YWluZXIoKTogdm9pZCB7XHJcbiAgICBsZXQgdGVtcCA9IHRoaXMucm90YXRlO1xyXG4gICAgaWYgKHRlbXAgPCAwKSB7XHJcbiAgICAgIHRlbXAgKj0gLTE7XHJcbiAgICB9XHJcbiAgICBpZiAodGVtcCAvIDkwICUgNCA9PT0gMSB8fCB0ZW1wIC8gOTAgJSA0ID09PSAzKSB7XHJcbiAgICAgIHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdvdXRlckNvbnRhaW5lcicpLnN0eWxlLmhlaWdodCA9IHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdpbWFnZScpLnN0eWxlLndpZHRoO1xyXG4gICAgICB0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnb3V0ZXJDb250YWluZXInKS5zdHlsZS53aWR0aCA9IHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdpbWFnZScpLnN0eWxlLmhlaWdodDtcclxuICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpLnN0eWxlLmhlaWdodCA9IHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdpbWFnZScpLnN0eWxlLndpZHRoO1xyXG4gICAgICB0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJykuc3R5bGUud2lkdGggPSB0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKS5zdHlsZS5oZWlnaHQ7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnb3V0ZXJDb250YWluZXInKS5zdHlsZS5oZWlnaHQgPSB0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKS5zdHlsZS5oZWlnaHQ7XHJcbiAgICAgIHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdvdXRlckNvbnRhaW5lcicpLnN0eWxlLndpZHRoID0gdGhpcy5fZG9jdW1lbnRSZWYuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlJykuc3R5bGUud2lkdGg7XHJcbiAgICAgIHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5zdHlsZS5oZWlnaHQgPSB0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKS5zdHlsZS53aWR0aDtcclxuICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpLnN0eWxlLndpZHRoID0gdGhpcy5fZG9jdW1lbnRSZWYuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlJykuc3R5bGUuaGVpZ2h0O1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfcmVzZXRJbWFnZSgpOiB2b2lkIHtcclxuICAgIHRoaXMucm90YXRlID0gMDtcclxuICAgIGNvbnN0IGltYWdlID0gdGhpcy5fZG9jdW1lbnRSZWYuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlJyk7XHJcbiAgICBpZiAoaW1hZ2UpIHtcclxuICAgICAgaW1hZ2Uuc3R5bGUudHJhbnNmb3JtID0gYHJvdGF0ZSgke3RoaXMucm90YXRlfWRlZylgO1xyXG4gICAgICBpbWFnZS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBgcm90YXRlKCR7dGhpcy5yb3RhdGV9ZGVnKWA7XHJcbiAgICB9XHJcblxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfY2FsY1RyYW5zZm9ybVBvaW50KCk6IHZvaWQge1xyXG4gICAgbGV0IGhlaWdodCA9IHBhcnNlSW50KHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdpbWFnZScpLnN0eWxlLmhlaWdodCwgMTApO1xyXG4gICAgbGV0IHdpZHRoID0gcGFyc2VJbnQodGhpcy5fZG9jdW1lbnRSZWYuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlJykuc3R5bGUud2lkdGgsIDEwKTtcclxuICAgIGxldCB0ZW1wID0gdGhpcy5yb3RhdGUgJSAzNjA7XHJcbiAgICBpZiAodGVtcCA8IDApIHtcclxuICAgICAgdGVtcCA9IDM2MCArIHRlbXA7XHJcbiAgICB9XHJcbiAgICBpZiAodGVtcCA9PT0gOTApIHtcclxuICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlJykuc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gKGhlaWdodCAvIDIpICsgJ3B4ICcgKyAoaGVpZ2h0IC8gMikgKyAncHgnO1xyXG4gICAgfSBlbHNlIGlmICh0ZW1wID09PSAxODApIHtcclxuICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlJykuc3R5bGUudHJhbnNmb3JtT3JpZ2luID0gKHdpZHRoIC8gMikgKyAncHggJyArIChoZWlnaHQgLyAyKSArICdweCc7XHJcbiB9IGVsc2UgaWYgKHRlbXAgPT09IDI3MCkge1xyXG4gICAgICB0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKS5zdHlsZS50cmFuc2Zvcm1PcmlnaW4gPSAod2lkdGggLyAyKSArICdweCAnICsgKHdpZHRoIC8gMikgKyAncHgnO1xyXG4gfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG5leHRJbWFnZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmFsYnVtLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudEltYWdlSW5kZXggPT09IHRoaXMuYWxidW0ubGVuZ3RoIC0gMSkge1xyXG4gICAgICB0aGlzLl9jaGFuZ2VJbWFnZSgwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2NoYW5nZUltYWdlKHRoaXMuY3VycmVudEltYWdlSW5kZXggKyAxKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBwcmV2SW1hZ2UoKTogdm9pZCB7XHJcbiAgICBpZiAodGhpcy5hbGJ1bS5sZW5ndGggPT09IDEpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRJbWFnZUluZGV4ID09PSAwICYmIHRoaXMuYWxidW0ubGVuZ3RoID4gMSkge1xyXG4gICAgICB0aGlzLl9jaGFuZ2VJbWFnZSh0aGlzLmFsYnVtLmxlbmd0aCAtIDEpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fY2hhbmdlSW1hZ2UodGhpcy5jdXJyZW50SW1hZ2VJbmRleCAtIDEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdmFsaWRhdGVJbnB1dERhdGEoKTogYm9vbGVhbiB7XHJcbiAgICBpZiAodGhpcy5hbGJ1bSAmJlxyXG4gICAgICB0aGlzLmFsYnVtIGluc3RhbmNlb2YgQXJyYXkgJiZcclxuICAgICAgdGhpcy5hbGJ1bS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5hbGJ1bS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vIGNoZWNrIHdoZXRoZXIgZWFjaCBfbnNpZGVcclxuICAgICAgICAvLyBhbGJ1bSBoYXMgc3JjIGRhdGEgb3Igbm90XHJcbiAgICAgICAgaWYgKHRoaXMuYWxidW1baV0uc3JjKSB7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignT25lIG9mIHRoZSBhbGJ1bSBkYXRhIGRvZXMgbm90IGhhdmUgc291cmNlIGRhdGEnKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBhbGJ1bSBkYXRhIG9yIGFsYnVtIGRhdGEgaXMgbm90IGNvcnJlY3QgaW4gdHlwZScpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHRvIHByZXZlbnQgZGF0YSB1bmRlcnN0YW5kIGFzIHN0cmluZ1xyXG4gICAgLy8gY29udmVydCBpdCB0byBudW1iZXJcclxuICAgIGlmIChpc05hTih0aGlzLmN1cnJlbnRJbWFnZUluZGV4KSkge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0N1cnJlbnQgaW1hZ2UgaW5kZXggaXMgbm90IGEgbnVtYmVyJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmN1cnJlbnRJbWFnZUluZGV4ID0gTnVtYmVyKHRoaXMuY3VycmVudEltYWdlSW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfcmVnaXN0ZXJJbWFnZUxvYWRpbmdFdmVudCgpOiB2b2lkIHtcclxuICAgIGNvbnN0IHNyYzogYW55ID0gdGhpcy5hbGJ1bVt0aGlzLmN1cnJlbnRJbWFnZUluZGV4XS5zcmM7XHJcblxyXG4gICAgaWYgKHRoaXMuYWxidW1bdGhpcy5jdXJyZW50SW1hZ2VJbmRleF0uaWZyYW1lIHx8IHRoaXMubmVlZHNJZnJhbWUoc3JjKSkge1xyXG4gICAgICBzZXRUaW1lb3V0KCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5fb25Mb2FkSW1hZ2VTdWNjZXNzKCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcHJlbG9hZGVyID0gbmV3IEltYWdlKCk7XHJcblxyXG4gICAgcHJlbG9hZGVyLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgdGhpcy5fb25Mb2FkSW1hZ2VTdWNjZXNzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJlbG9hZGVyLm9uZXJyb3IgPSAoZSkgPT4ge1xyXG4gICAgICB0aGlzLl9saWdodGJveEV2ZW50LmJyb2FkY2FzdExpZ2h0Ym94RXZlbnQoeyBpZDogTElHSFRCT1hfRVZFTlQuRklMRV9OT1RfRk9VTkQsIGRhdGE6IGUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJlbG9hZGVyLnNyYyA9IHRoaXMuX3Nhbml0aXplci5zYW5pdGl6ZShTZWN1cml0eUNvbnRleHQuVVJMLCBzcmMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmlyZSB3aGVuIHRoZSBpbWFnZSBpcyBsb2FkZWRcclxuICAgKi9cclxuICBwcml2YXRlIF9vbkxvYWRJbWFnZVN1Y2Nlc3MoKTogdm9pZCB7XHJcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5kaXNhYmxlS2V5Ym9hcmROYXYpIHtcclxuICAgICAgLy8gdW5iaW5kIGtleWJvYXJkIGV2ZW50IGR1cmluZyB0cmFuc2l0aW9uXHJcbiAgICAgIHRoaXMuX2Rpc2FibGVLZXlib2FyZE5hdigpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBpbWFnZUhlaWdodDtcclxuICAgIGxldCBpbWFnZVdpZHRoO1xyXG4gICAgbGV0IG1heEltYWdlSGVpZ2h0O1xyXG4gICAgbGV0IG1heEltYWdlV2lkdGg7XHJcbiAgICBsZXQgd2luZG93SGVpZ2h0O1xyXG4gICAgbGV0IHdpbmRvd1dpZHRoO1xyXG4gICAgbGV0IG5hdHVyYWxJbWFnZVdpZHRoO1xyXG4gICAgbGV0IG5hdHVyYWxJbWFnZUhlaWdodDtcclxuXHJcbiAgICAvLyBzZXQgZGVmYXVsdCB3aWR0aCBhbmQgaGVpZ2h0IG9mIGltYWdlIHRvIGJlIGl0cyBuYXR1cmFsXHJcbiAgICBpbWFnZVdpZHRoID0gbmF0dXJhbEltYWdlV2lkdGggPSB0aGlzLl9pbWFnZUVsZW0gPyB0aGlzLl9pbWFnZUVsZW0ubmF0aXZlRWxlbWVudC5uYXR1cmFsV2lkdGggOiB0aGlzLl93aW5kb3dSZWYuaW5uZXJXaWR0aCAqIC44O1xyXG4gICAgaW1hZ2VIZWlnaHQgPSBuYXR1cmFsSW1hZ2VIZWlnaHQgPSB0aGlzLl9pbWFnZUVsZW0gPyB0aGlzLl9pbWFnZUVsZW0ubmF0aXZlRWxlbWVudC5uYXR1cmFsSGVpZ2h0IDogdGhpcy5fd2luZG93UmVmLmlubmVySGVpZ2h0ICogLjg7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmZpdEltYWdlSW5WaWV3UG9ydCkge1xyXG4gICAgICB3aW5kb3dXaWR0aCA9IHRoaXMuX3dpbmRvd1JlZi5pbm5lcldpZHRoO1xyXG4gICAgICB3aW5kb3dIZWlnaHQgPSB0aGlzLl93aW5kb3dSZWYuaW5uZXJIZWlnaHQ7XHJcbiAgICAgIG1heEltYWdlV2lkdGggPSB3aW5kb3dXaWR0aCAtIHRoaXMuX2Nzc1ZhbHVlLmNvbnRhaW5lckxlZnRQYWRkaW5nIC1cclxuICAgICAgICB0aGlzLl9jc3NWYWx1ZS5jb250YWluZXJSaWdodFBhZGRpbmcgLSB0aGlzLl9jc3NWYWx1ZS5pbWFnZUJvcmRlcldpZHRoTGVmdCAtXHJcbiAgICAgICAgdGhpcy5fY3NzVmFsdWUuaW1hZ2VCb3JkZXJXaWR0aFJpZ2h0IC0gMjA7XHJcbiAgICAgIG1heEltYWdlSGVpZ2h0ID0gd2luZG93SGVpZ2h0IC0gdGhpcy5fY3NzVmFsdWUuY29udGFpbmVyVG9wUGFkZGluZyAtXHJcbiAgICAgICAgdGhpcy5fY3NzVmFsdWUuY29udGFpbmVyVG9wUGFkZGluZyAtIHRoaXMuX2Nzc1ZhbHVlLmltYWdlQm9yZGVyV2lkdGhUb3AgLVxyXG4gICAgICAgIHRoaXMuX2Nzc1ZhbHVlLmltYWdlQm9yZGVyV2lkdGhCb3R0b20gLSAxMjA7XHJcbiAgICAgIGlmIChuYXR1cmFsSW1hZ2VXaWR0aCA+IG1heEltYWdlV2lkdGggfHwgbmF0dXJhbEltYWdlSGVpZ2h0ID4gbWF4SW1hZ2VIZWlnaHQpIHtcclxuICAgICAgICBpZiAoKG5hdHVyYWxJbWFnZVdpZHRoIC8gbWF4SW1hZ2VXaWR0aCkgPiAobmF0dXJhbEltYWdlSGVpZ2h0IC8gbWF4SW1hZ2VIZWlnaHQpKSB7XHJcbiAgICAgICAgICBpbWFnZVdpZHRoID0gbWF4SW1hZ2VXaWR0aDtcclxuICAgICAgICAgIGltYWdlSGVpZ2h0ID0gTWF0aC5yb3VuZChuYXR1cmFsSW1hZ2VIZWlnaHQgLyAobmF0dXJhbEltYWdlV2lkdGggLyBpbWFnZVdpZHRoKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGltYWdlSGVpZ2h0ID0gbWF4SW1hZ2VIZWlnaHQ7XHJcbiAgICAgICAgICBpbWFnZVdpZHRoID0gTWF0aC5yb3VuZChuYXR1cmFsSW1hZ2VXaWR0aCAvIChuYXR1cmFsSW1hZ2VIZWlnaHQgLyBpbWFnZUhlaWdodCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5fcmVuZGVyZXJSZWYuc2V0U3R5bGUoKHRoaXMuX2ltYWdlRWxlbSB8fCB0aGlzLl9pZnJhbWVFbGVtKS5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCBgJHtpbWFnZVdpZHRofXB4YCk7XHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyUmVmLnNldFN0eWxlKCh0aGlzLl9pbWFnZUVsZW0gfHwgdGhpcy5faWZyYW1lRWxlbSkubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsIGAke2ltYWdlSGVpZ2h0fXB4YCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fc2l6ZUNvbnRhaW5lcihpbWFnZVdpZHRoLCBpbWFnZUhlaWdodCk7XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jZW50ZXJWZXJ0aWNhbGx5KSB7XHJcbiAgICAgIHRoaXMuX2NlbnRlclZlcnRpY2FsbHkoaW1hZ2VXaWR0aCwgaW1hZ2VIZWlnaHQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfY2VudGVyVmVydGljYWxseShpbWFnZVdpZHRoOiBudW1iZXIsIGltYWdlSGVpZ2h0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGNvbnN0IHNjcm9sbE9mZnNldCA9IHRoaXMuX2RvY3VtZW50UmVmLmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XHJcbiAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB0aGlzLl93aW5kb3dSZWYuaW5uZXJIZWlnaHQ7XHJcblxyXG4gICAgY29uc3Qgdmlld09mZnNldCA9IHdpbmRvd0hlaWdodCAvIDIgLSBpbWFnZUhlaWdodCAvIDI7XHJcbiAgICBjb25zdCB0b3BEaXN0YW5jZSA9IHNjcm9sbE9mZnNldCArIHZpZXdPZmZzZXQ7XHJcblxyXG4gICAgdGhpcy5fcmVuZGVyZXJSZWYuc2V0U3R5bGUodGhpcy5fbGlnaHRib3hFbGVtLm5hdGl2ZUVsZW1lbnQsICd0b3AnLCBgJHt0b3BEaXN0YW5jZX1weGApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2l6ZUNvbnRhaW5lcihpbWFnZVdpZHRoOiBudW1iZXIsIGltYWdlSGVpZ2h0OiBudW1iZXIpOiB2b2lkIHtcclxuICAgIGNvbnN0IG9sZFdpZHRoID0gdGhpcy5fb3V0ZXJDb250YWluZXJFbGVtLm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGg7XHJcbiAgICBjb25zdCBvbGRIZWlnaHQgPSB0aGlzLl9vdXRlckNvbnRhaW5lckVsZW0ubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XHJcbiAgICBjb25zdCBuZXdXaWR0aCA9IGltYWdlV2lkdGggKyB0aGlzLl9jc3NWYWx1ZS5jb250YWluZXJSaWdodFBhZGRpbmcgKyB0aGlzLl9jc3NWYWx1ZS5jb250YWluZXJMZWZ0UGFkZGluZyArXHJcbiAgICAgIHRoaXMuX2Nzc1ZhbHVlLmltYWdlQm9yZGVyV2lkdGhMZWZ0ICsgdGhpcy5fY3NzVmFsdWUuaW1hZ2VCb3JkZXJXaWR0aFJpZ2h0O1xyXG4gICAgY29uc3QgbmV3SGVpZ2h0ID0gaW1hZ2VIZWlnaHQgKyB0aGlzLl9jc3NWYWx1ZS5jb250YWluZXJUb3BQYWRkaW5nICsgdGhpcy5fY3NzVmFsdWUuY29udGFpbmVyQm90dG9tUGFkZGluZyArXHJcbiAgICAgIHRoaXMuX2Nzc1ZhbHVlLmltYWdlQm9yZGVyV2lkdGhUb3AgKyB0aGlzLl9jc3NWYWx1ZS5pbWFnZUJvcmRlcldpZHRoQm90dG9tO1xyXG5cclxuICAgIC8vIG1ha2Ugc3VyZSB0aGF0IGRpc3RhbmNlcyBhcmUgbGFyZ2UgZW5vdWdoIGZvciB0cmFuc2l0aW9uZW5kIGV2ZW50IHRvIGJlIGZpcmVkLCBhdCBsZWFzdCA1cHguXHJcbiAgICBpZiAoTWF0aC5hYnMob2xkV2lkdGggLSBuZXdXaWR0aCkgKyBNYXRoLmFicyhvbGRIZWlnaHQgLSBuZXdIZWlnaHQpID4gNSkge1xyXG4gICAgICB0aGlzLl9yZW5kZXJlclJlZi5zZXRTdHlsZSh0aGlzLl9vdXRlckNvbnRhaW5lckVsZW0ubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgYCR7bmV3V2lkdGh9cHhgKTtcclxuICAgICAgdGhpcy5fcmVuZGVyZXJSZWYuc2V0U3R5bGUodGhpcy5fb3V0ZXJDb250YWluZXJFbGVtLm5hdGl2ZUVsZW1lbnQsICdoZWlnaHQnLCBgJHtuZXdIZWlnaHR9cHhgKTtcclxuXHJcbiAgICAgIC8vIGJpbmQgcmVzaXplIGV2ZW50IHRvIG91dGVyIGNvbnRhaW5lclxyXG4gICAgICAvLyB1c2UgZW5hYmxlVHJhbnNpdGlvbiB0byBwcmV2ZW50IGluZmluaXRlIGxvYWRlclxyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmVuYWJsZVRyYW5zaXRpb24pIHtcclxuICAgICAgICB0aGlzLl9ldmVudC50cmFuc2l0aW9ucyA9IFtdO1xyXG4gICAgICAgIFsndHJhbnNpdGlvbmVuZCcsICd3ZWJraXRUcmFuc2l0aW9uRW5kJywgJ29UcmFuc2l0aW9uRW5kJywgJ01TVHJhbnNpdGlvbkVuZCddLmZvckVhY2goZXZlbnROYW1lID0+IHtcclxuICAgICAgICAgIHRoaXMuX2V2ZW50LnRyYW5zaXRpb25zLnB1c2goXHJcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyUmVmLmxpc3Rlbih0aGlzLl9vdXRlckNvbnRhaW5lckVsZW0ubmF0aXZlRWxlbWVudCwgZXZlbnROYW1lLCAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChldmVudC50YXJnZXQgPT09IGV2ZW50LmN1cnJlbnRUYXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Bvc3RSZXNpemUobmV3V2lkdGgsIG5ld0hlaWdodCk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLl9wb3N0UmVzaXplKG5ld1dpZHRoLCBuZXdIZWlnaHQpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9wb3N0UmVzaXplKG5ld1dpZHRoLCBuZXdIZWlnaHQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfcG9zdFJlc2l6ZShuZXdXaWR0aDogbnVtYmVyLCBuZXdIZWlnaHQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgLy8gdW5iaW5kIHJlc2l6ZSBldmVudFxyXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5fZXZlbnQudHJhbnNpdGlvbnMpKSB7XHJcbiAgICAgIHRoaXMuX2V2ZW50LnRyYW5zaXRpb25zLmZvckVhY2goKGV2ZW50SGFuZGxlcjogYW55KSA9PiB7XHJcbiAgICAgICAgZXZlbnRIYW5kbGVyKCk7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgdGhpcy5fZXZlbnQudHJhbnNpdGlvbnMgPSBbXTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9yZW5kZXJlclJlZi5zZXRTdHlsZSh0aGlzLl9kYXRhQ29udGFpbmVyRWxlbS5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCBgJHtuZXdXaWR0aH1weGApO1xyXG4gICAgdGhpcy5fc2hvd0ltYWdlKCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zaG93SW1hZ2UoKTogdm9pZCB7XHJcbiAgICB0aGlzLnVpLnNob3dSZWxvYWRlciA9IGZhbHNlO1xyXG4gICAgdGhpcy5fdXBkYXRlTmF2KCk7XHJcbiAgICB0aGlzLl91cGRhdGVEZXRhaWxzKCk7XHJcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5kaXNhYmxlS2V5Ym9hcmROYXYpIHtcclxuICAgICAgdGhpcy5fZW5hYmxlS2V5Ym9hcmROYXYoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3ByZXBhcmVDb21wb25lbnQoKTogdm9pZCB7XHJcbiAgICAvLyBhZGQgY3NzMyBhbmltYXRpb25cclxuICAgIHRoaXMuX2FkZENzc0FuaW1hdGlvbigpO1xyXG5cclxuICAgIC8vIHBvc2l0aW9uIHRoZSBpbWFnZSBhY2NvcmRpbmcgdG8gdXNlcidzIG9wdGlvblxyXG4gICAgdGhpcy5fcG9zaXRpb25MaWdodEJveCgpO1xyXG5cclxuICAgIC8vIHVwZGF0ZSBjb250cm9scyB2aXNpYmlsaXR5IG9uIG5leHQgdmlldyBnZW5lcmF0aW9uXHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy51aS5zaG93Wm9vbUJ1dHRvbiA9IHRoaXMub3B0aW9ucy5zaG93Wm9vbTtcclxuICAgICAgdGhpcy51aS5zaG93Um90YXRlQnV0dG9uID0gdGhpcy5vcHRpb25zLnNob3dSb3RhdGU7XHJcbiAgICB9LCAwKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3Bvc2l0aW9uTGlnaHRCb3goKTogdm9pZCB7XHJcbiAgICAvLyBAc2VlIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM0NjQ4NzYvamF2YXNjcmlwdC1nZXQtd2luZG93LXgteS1wb3NpdGlvbi1mb3Itc2Nyb2xsXHJcbiAgICBjb25zdCB0b3AgPSAodGhpcy5fd2luZG93UmVmLnBhZ2VZT2Zmc2V0IHx8IHRoaXMuX2RvY3VtZW50UmVmLmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3ApICtcclxuICAgICAgdGhpcy5vcHRpb25zLnBvc2l0aW9uRnJvbVRvcDtcclxuICAgIGNvbnN0IGxlZnQgPSB0aGlzLl93aW5kb3dSZWYucGFnZVhPZmZzZXQgfHwgdGhpcy5fZG9jdW1lbnRSZWYuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQ7XHJcblxyXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuY2VudGVyVmVydGljYWxseSkge1xyXG4gICAgICB0aGlzLl9yZW5kZXJlclJlZi5zZXRTdHlsZSh0aGlzLl9saWdodGJveEVsZW0ubmF0aXZlRWxlbWVudCwgJ3RvcCcsIGAke3RvcH1weGApO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3JlbmRlcmVyUmVmLnNldFN0eWxlKHRoaXMuX2xpZ2h0Ym94RWxlbS5uYXRpdmVFbGVtZW50LCAnbGVmdCcsIGAke2xlZnR9cHhgKTtcclxuICAgIHRoaXMuX3JlbmRlcmVyUmVmLnNldFN0eWxlKHRoaXMuX2xpZ2h0Ym94RWxlbS5uYXRpdmVFbGVtZW50LCAnZGlzcGxheScsICdibG9jaycpO1xyXG5cclxuICAgIC8vIGRpc2FibGUgc2Nyb2xsaW5nIG9mIHRoZSBwYWdlIHdoaWxlIG9wZW5cclxuICAgIGlmICh0aGlzLm9wdGlvbnMuZGlzYWJsZVNjcm9sbGluZykge1xyXG4gICAgICB0aGlzLl9yZW5kZXJlclJlZi5hZGRDbGFzcyh0aGlzLl9kb2N1bWVudFJlZi5kb2N1bWVudEVsZW1lbnQsICdsYi1kaXNhYmxlLXNjcm9sbGluZycpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogYWRkQ3NzQW5pbWF0aW9uIGFkZCBjc3MzIGNsYXNzZXMgZm9yIGFuaW1hdGUgbGlnaHRib3hcclxuICAgKi9cclxuICBwcml2YXRlIF9hZGRDc3NBbmltYXRpb24oKTogdm9pZCB7XHJcbiAgICBjb25zdCByZXNpemVEdXJhdGlvbiA9IHRoaXMub3B0aW9ucy5yZXNpemVEdXJhdGlvbjtcclxuICAgIGNvbnN0IGZhZGVEdXJhdGlvbiA9IHRoaXMub3B0aW9ucy5mYWRlRHVyYXRpb247XHJcblxyXG4gICAgdGhpcy5fcmVuZGVyZXJSZWYuc2V0U3R5bGUodGhpcy5fbGlnaHRib3hFbGVtLm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICctd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbicsIGAke2ZhZGVEdXJhdGlvbn1zYCk7XHJcbiAgICB0aGlzLl9yZW5kZXJlclJlZi5zZXRTdHlsZSh0aGlzLl9saWdodGJveEVsZW0ubmF0aXZlRWxlbWVudCxcclxuICAgICAgJ2FuaW1hdGlvbi1kdXJhdGlvbicsIGAke2ZhZGVEdXJhdGlvbn1zYCk7XHJcbiAgICB0aGlzLl9yZW5kZXJlclJlZi5zZXRTdHlsZSh0aGlzLl9vdXRlckNvbnRhaW5lckVsZW0ubmF0aXZlRWxlbWVudCxcclxuICAgICAgJy13ZWJraXQtdHJhbnNpdGlvbi1kdXJhdGlvbicsIGAke3Jlc2l6ZUR1cmF0aW9ufXNgKTtcclxuICAgIHRoaXMuX3JlbmRlcmVyUmVmLnNldFN0eWxlKHRoaXMuX291dGVyQ29udGFpbmVyRWxlbS5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAndHJhbnNpdGlvbi1kdXJhdGlvbicsIGAke3Jlc2l6ZUR1cmF0aW9ufXNgKTtcclxuICAgIHRoaXMuX3JlbmRlcmVyUmVmLnNldFN0eWxlKHRoaXMuX2RhdGFDb250YWluZXJFbGVtLm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICctd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbicsIGAke2ZhZGVEdXJhdGlvbn1zYCk7XHJcbiAgICB0aGlzLl9yZW5kZXJlclJlZi5zZXRTdHlsZSh0aGlzLl9kYXRhQ29udGFpbmVyRWxlbS5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAnYW5pbWF0aW9uLWR1cmF0aW9uJywgYCR7ZmFkZUR1cmF0aW9ufXNgKTtcclxuICAgIHRoaXMuX3JlbmRlcmVyUmVmLnNldFN0eWxlKCh0aGlzLl9pbWFnZUVsZW0gfHwgdGhpcy5faWZyYW1lRWxlbSkubmF0aXZlRWxlbWVudCxcclxuICAgICAgJy13ZWJraXQtYW5pbWF0aW9uLWR1cmF0aW9uJywgYCR7ZmFkZUR1cmF0aW9ufXNgKTtcclxuICAgIHRoaXMuX3JlbmRlcmVyUmVmLnNldFN0eWxlKCh0aGlzLl9pbWFnZUVsZW0gfHwgdGhpcy5faWZyYW1lRWxlbSkubmF0aXZlRWxlbWVudCxcclxuICAgICAgJ2FuaW1hdGlvbi1kdXJhdGlvbicsIGAke2ZhZGVEdXJhdGlvbn1zYCk7XHJcbiAgICB0aGlzLl9yZW5kZXJlclJlZi5zZXRTdHlsZSh0aGlzLl9jYXB0aW9uRWxlbS5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAnLXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb24nLCBgJHtmYWRlRHVyYXRpb259c2ApO1xyXG4gICAgdGhpcy5fcmVuZGVyZXJSZWYuc2V0U3R5bGUodGhpcy5fY2FwdGlvbkVsZW0ubmF0aXZlRWxlbWVudCxcclxuICAgICAgJ2FuaW1hdGlvbi1kdXJhdGlvbicsIGAke2ZhZGVEdXJhdGlvbn1zYCk7XHJcbiAgICB0aGlzLl9yZW5kZXJlclJlZi5zZXRTdHlsZSh0aGlzLl9udW1iZXJFbGVtLm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICctd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbicsIGAke2ZhZGVEdXJhdGlvbn1zYCk7XHJcbiAgICB0aGlzLl9yZW5kZXJlclJlZi5zZXRTdHlsZSh0aGlzLl9udW1iZXJFbGVtLm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICdhbmltYXRpb24tZHVyYXRpb24nLCBgJHtmYWRlRHVyYXRpb259c2ApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZW5kKCk6IHZvaWQge1xyXG4gICAgdGhpcy51aS5jbGFzc0xpc3QgPSAnbGlnaHRib3ggYW5pbWF0aW9uIGZhZGVPdXQnO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5kaXNhYmxlU2Nyb2xsaW5nKSB7XHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyUmVmLnJlbW92ZUNsYXNzKHRoaXMuX2RvY3VtZW50UmVmLmRvY3VtZW50RWxlbWVudCwgJ2xiLWRpc2FibGUtc2Nyb2xsaW5nJyk7XHJcbiAgICB9XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgdGhpcy5jbXBSZWYuZGVzdHJveSgpO1xyXG4gICAgfSwgdGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbiAqIDEwMDApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdXBkYXRlRGV0YWlscygpOiB2b2lkIHtcclxuICAgIC8vIHVwZGF0ZSB0aGUgY2FwdGlvblxyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmFsYnVtW3RoaXMuY3VycmVudEltYWdlSW5kZXhdLmNhcHRpb24gIT09ICd1bmRlZmluZWQnICYmXHJcbiAgICAgIHRoaXMuYWxidW1bdGhpcy5jdXJyZW50SW1hZ2VJbmRleF0uY2FwdGlvbiAhPT0gJycpIHtcclxuICAgICAgdGhpcy51aS5zaG93Q2FwdGlvbiA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXBkYXRlIHRoZSBwYWdlIG51bWJlciBpZiB1c2VyIGNob29zZSB0byBkbyBzb1xyXG4gICAgLy8gZG9lcyBub3QgcGVyZm9ybSBudW1iZXJpbmcgdGhlIHBhZ2UgaWYgdGhlXHJcbiAgICAvLyBhcnJheSBsZW5ndGggaW4gYWxidW0gPD0gMVxyXG4gICAgaWYgKHRoaXMuYWxidW0ubGVuZ3RoID4gMSAmJiB0aGlzLm9wdGlvbnMuc2hvd0ltYWdlTnVtYmVyTGFiZWwpIHtcclxuICAgICAgdGhpcy51aS5zaG93UGFnZU51bWJlciA9IHRydWU7XHJcbiAgICAgIHRoaXMuY29udGVudC5wYWdlTnVtYmVyID0gdGhpcy5fYWxidW1MYWJlbCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfYWxidW1MYWJlbCgpOiBzdHJpbmcge1xyXG4gICAgLy8gZHVlIHRvIHt0aGlzLmN1cnJlbnRJbWFnZUluZGV4fSBpcyBzZXQgZnJvbSAwIHRvIHt0aGlzLmFsYnVtLmxlbmd0aH0gLSAxXHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmFsYnVtTGFiZWwucmVwbGFjZSgvJTEvZywgTnVtYmVyKHRoaXMuY3VycmVudEltYWdlSW5kZXggKyAxKSkucmVwbGFjZSgvJTIvZywgdGhpcy5hbGJ1bS5sZW5ndGgpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfY2hhbmdlSW1hZ2UobmV3SW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG4gICAgdGhpcy5fcmVzZXRJbWFnZSgpO1xyXG4gICAgdGhpcy5jdXJyZW50SW1hZ2VJbmRleCA9IG5ld0luZGV4O1xyXG4gICAgdGhpcy5faGlkZUltYWdlKCk7XHJcbiAgICB0aGlzLl9yZWdpc3RlckltYWdlTG9hZGluZ0V2ZW50KCk7XHJcbiAgICB0aGlzLl9saWdodGJveEV2ZW50LmJyb2FkY2FzdExpZ2h0Ym94RXZlbnQoeyBpZDogTElHSFRCT1hfRVZFTlQuQ0hBTkdFX1BBR0UsIGRhdGE6IG5ld0luZGV4IH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfaGlkZUltYWdlKCk6IHZvaWQge1xyXG4gICAgdGhpcy51aS5zaG93UmVsb2FkZXIgPSB0cnVlO1xyXG4gICAgdGhpcy51aS5zaG93QXJyb3dOYXYgPSBmYWxzZTtcclxuICAgIHRoaXMudWkuc2hvd0xlZnRBcnJvdyA9IGZhbHNlO1xyXG4gICAgdGhpcy51aS5zaG93UmlnaHRBcnJvdyA9IGZhbHNlO1xyXG4gICAgdGhpcy51aS5zaG93UGFnZU51bWJlciA9IGZhbHNlO1xyXG4gICAgdGhpcy51aS5zaG93Q2FwdGlvbiA9IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfdXBkYXRlTmF2KCk6IHZvaWQge1xyXG4gICAgbGV0IGFsd2F5c1Nob3dOYXYgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBjaGVjayB0byBzZWUgdGhlIGJyb3dzZXIgc3VwcG9ydCB0b3VjaCBldmVudFxyXG4gICAgdHJ5IHtcclxuICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuY3JlYXRlRXZlbnQoJ1RvdWNoRXZlbnQnKTtcclxuICAgICAgYWx3YXlzU2hvd05hdiA9ICh0aGlzLm9wdGlvbnMuYWx3YXlzU2hvd05hdk9uVG91Y2hEZXZpY2VzKSA/IHRydWUgOiBmYWxzZTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgLy8gbm9vcFxyXG4gICAgfVxyXG5cclxuICAgIC8vIGluaXRpYWxseSBzaG93IHRoZSBhcnJvdyBuYXZcclxuICAgIC8vIHdoaWNoIGlzIHRoZSBwYXJlbnQgb2YgYm90aCBsZWZ0IGFuZCByaWdodCBuYXZcclxuICAgIHRoaXMuX3Nob3dBcnJvd05hdigpO1xyXG4gICAgaWYgKHRoaXMuYWxidW0ubGVuZ3RoID4gMSkge1xyXG4gICAgICBpZiAodGhpcy5vcHRpb25zLndyYXBBcm91bmQpIHtcclxuICAgICAgICBpZiAoYWx3YXlzU2hvd05hdikge1xyXG4gICAgICAgICAgLy8gYWx0ZXJuYXRpdmVzIHRoaXMuJGxpZ2h0Ym94LmZpbmQoJy5sYi1wcmV2LCAubGItbmV4dCcpLmNzcygnb3BhY2l0eScsICcxJyk7XHJcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlclJlZi5zZXRTdHlsZSh0aGlzLl9sZWZ0QXJyb3dFbGVtLm5hdGl2ZUVsZW1lbnQsICdvcGFjaXR5JywgJzEnKTtcclxuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyUmVmLnNldFN0eWxlKHRoaXMuX3JpZ2h0QXJyb3dFbGVtLm5hdGl2ZUVsZW1lbnQsICdvcGFjaXR5JywgJzEnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGFsdGVybmF0aXZlcyB0aGlzLiRsaWdodGJveC5maW5kKCcubGItcHJldiwgLmxiLW5leHQnKS5zaG93KCk7XHJcbiAgICAgICAgdGhpcy5fc2hvd0xlZnRBcnJvd05hdigpO1xyXG4gICAgICAgIHRoaXMuX3Nob3dSaWdodEFycm93TmF2KCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEltYWdlSW5kZXggPiAwKSB7XHJcbiAgICAgICAgICAvLyBhbHRlcm5hdGl2ZXMgdGhpcy4kbGlnaHRib3guZmluZCgnLmxiLXByZXYnKS5zaG93KCk7XHJcbiAgICAgICAgICB0aGlzLl9zaG93TGVmdEFycm93TmF2KCk7XHJcbiAgICAgICAgICBpZiAoYWx3YXlzU2hvd05hdikge1xyXG4gICAgICAgICAgICAvLyBhbHRlcm5hdGl2ZXMgdGhpcy4kbGlnaHRib3guZmluZCgnLmxiLXByZXYnKS5jc3MoJ29wYWNpdHknLCAnMScpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlclJlZi5zZXRTdHlsZSh0aGlzLl9sZWZ0QXJyb3dFbGVtLm5hdGl2ZUVsZW1lbnQsICdvcGFjaXR5JywgJzEnKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRJbWFnZUluZGV4IDwgdGhpcy5hbGJ1bS5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICAvLyBhbHRlcm5hdGl2ZXMgdGhpcy4kbGlnaHRib3guZmluZCgnLmxiLW5leHQnKS5zaG93KCk7XHJcbiAgICAgICAgICB0aGlzLl9zaG93UmlnaHRBcnJvd05hdigpO1xyXG4gICAgICAgICAgaWYgKGFsd2F5c1Nob3dOYXYpIHtcclxuICAgICAgICAgICAgLy8gYWx0ZXJuYXRpdmVzIHRoaXMuJGxpZ2h0Ym94LmZpbmQoJy5sYi1uZXh0JykuY3NzKCdvcGFjaXR5JywgJzEnKTtcclxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXJSZWYuc2V0U3R5bGUodGhpcy5fcmlnaHRBcnJvd0VsZW0ubmF0aXZlRWxlbWVudCwgJ29wYWNpdHknLCAnMScpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2hvd0xlZnRBcnJvd05hdigpOiB2b2lkIHtcclxuICAgIHRoaXMudWkuc2hvd0xlZnRBcnJvdyA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zaG93UmlnaHRBcnJvd05hdigpOiB2b2lkIHtcclxuICAgIHRoaXMudWkuc2hvd1JpZ2h0QXJyb3cgPSB0cnVlO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfc2hvd0Fycm93TmF2KCk6IHZvaWQge1xyXG4gICAgdGhpcy51aS5zaG93QXJyb3dOYXYgPSAodGhpcy5hbGJ1bS5sZW5ndGggIT09IDEpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZW5hYmxlS2V5Ym9hcmROYXYoKTogdm9pZCB7XHJcbiAgICB0aGlzLl9ldmVudC5rZXl1cCA9IHRoaXMuX3JlbmRlcmVyUmVmLmxpc3RlbignZG9jdW1lbnQnLCAna2V5dXAnLCAoZXZlbnQ6IGFueSkgPT4ge1xyXG4gICAgICB0aGlzLl9rZXlib2FyZEFjdGlvbihldmVudCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2Rpc2FibGVLZXlib2FyZE5hdigpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLl9ldmVudC5rZXl1cCkge1xyXG4gICAgICB0aGlzLl9ldmVudC5rZXl1cCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfa2V5Ym9hcmRBY3Rpb24oJGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgIGNvbnN0IEtFWUNPREVfRVNDID0gMjc7XHJcbiAgICBjb25zdCBLRVlDT0RFX0xFRlRBUlJPVyA9IDM3O1xyXG4gICAgY29uc3QgS0VZQ09ERV9SSUdIVEFSUk9XID0gMzk7XHJcbiAgICBjb25zdCBrZXljb2RlID0gJGV2ZW50LmtleUNvZGU7XHJcbiAgICBjb25zdCBrZXkgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGtleWNvZGUpLnRvTG93ZXJDYXNlKCk7XHJcblxyXG4gICAgaWYgKGtleWNvZGUgPT09IEtFWUNPREVfRVNDIHx8IGtleS5tYXRjaCgveHxvfGMvKSkge1xyXG4gICAgICB0aGlzLl9saWdodGJveEV2ZW50LmJyb2FkY2FzdExpZ2h0Ym94RXZlbnQoeyBpZDogTElHSFRCT1hfRVZFTlQuQ0xPU0UsIGRhdGE6IG51bGwgfSk7XHJcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ3AnIHx8IGtleWNvZGUgPT09IEtFWUNPREVfTEVGVEFSUk9XKSB7XHJcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRJbWFnZUluZGV4ICE9PSAwKSB7XHJcbiAgICAgICAgdGhpcy5fY2hhbmdlSW1hZ2UodGhpcy5jdXJyZW50SW1hZ2VJbmRleCAtIDEpO1xyXG4gICAgICB9IGVsc2UgaWYgKHRoaXMub3B0aW9ucy53cmFwQXJvdW5kICYmIHRoaXMuYWxidW0ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIHRoaXMuX2NoYW5nZUltYWdlKHRoaXMuYWxidW0ubGVuZ3RoIC0gMSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoa2V5ID09PSAnbicgfHwga2V5Y29kZSA9PT0gS0VZQ09ERV9SSUdIVEFSUk9XKSB7XHJcbiAgICAgIGlmICh0aGlzLmN1cnJlbnRJbWFnZUluZGV4ICE9PSB0aGlzLmFsYnVtLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICB0aGlzLl9jaGFuZ2VJbWFnZSh0aGlzLmN1cnJlbnRJbWFnZUluZGV4ICsgMSk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLndyYXBBcm91bmQgJiYgdGhpcy5hbGJ1bS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgdGhpcy5fY2hhbmdlSW1hZ2UoMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX2dldENzc1N0eWxlVmFsdWUoZWxlbTogYW55LCBwcm9wZXJ0eU5hbWU6IHN0cmluZyk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gcGFyc2VGbG9hdCh0aGlzLl93aW5kb3dSZWZcclxuICAgICAgLmdldENvbXB1dGVkU3R5bGUoZWxlbS5uYXRpdmVFbGVtZW50LCBudWxsKVxyXG4gICAgICAuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eU5hbWUpKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX29uUmVjZWl2ZWRFdmVudChldmVudDogSUV2ZW50KTogdm9pZCB7XHJcbiAgICBzd2l0Y2ggKGV2ZW50LmlkKSB7XHJcbiAgICAgIGNhc2UgTElHSFRCT1hfRVZFTlQuQ0xPU0U6XHJcbiAgICAgICAgdGhpcy5fZW5kKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmVlZHNJZnJhbWUoc3JjOiBzdHJpbmcpIHtcclxuICAgIC8vIGNvbnN0IHNhbml0aXplZFVybCA9IHRoaXMuX3Nhbml0aXplci5zYW5pdGl6ZShTZWN1cml0eUNvbnRleHQuVVJMLCBzcmMpO1xyXG4gICAgaWYgKHNyYy5tYXRjaCgvXFwucGRmJC8pKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxufVxyXG4iLCI8ZGl2IGNsYXNzPVwibGItb3V0ZXJDb250YWluZXIgdHJhbnNpdGlvblwiICNvdXRlckNvbnRhaW5lciBpZD1cIm91dGVyQ29udGFpbmVyXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwibGItY29udGFpbmVyXCIgI2NvbnRhaW5lciBpZD1cImNvbnRhaW5lclwiPlxyXG4gICAgICAgIDxpbWcgY2xhc3M9XCJsYi1pbWFnZVwiIGlkPVwiaW1hZ2VcIiBbc3JjXT1cImFsYnVtW2N1cnJlbnRJbWFnZUluZGV4XS5zcmNcIiBjbGFzcz1cImxiLWltYWdlIGFuaW1hdGlvbiBmYWRlSW5cIlxyXG4gICAgICAgICAgICBbaGlkZGVuXT1cInVpLnNob3dSZWxvYWRlclwiICNpbWFnZVxyXG4gICAgICAgICAgICAqbmdJZj1cIiFhbGJ1bVtjdXJyZW50SW1hZ2VJbmRleF0uaWZyYW1lICYmICFuZWVkc0lmcmFtZShhbGJ1bVtjdXJyZW50SW1hZ2VJbmRleF0uc3JjKVwiPlxyXG4gICAgICAgIDxpZnJhbWUgY2xhc3M9XCJsYi1pbWFnZVwiIGlkPVwiaWZyYW1lXCIgW3NyY109XCJhbGJ1bVtjdXJyZW50SW1hZ2VJbmRleF0uc3JjIHwgc2FmZVwiXHJcbiAgICAgICAgICAgIGNsYXNzPVwibGItaW1hZ2UgbGItaWZyYW1lIGFuaW1hdGlvbiBmYWRlSW5cIiBbaGlkZGVuXT1cInVpLnNob3dSZWxvYWRlclwiICNpZnJhbWVcclxuICAgICAgICAgICAgKm5nSWY9XCJhbGJ1bVtjdXJyZW50SW1hZ2VJbmRleF0uaWZyYW1lIHx8IG5lZWRzSWZyYW1lKGFsYnVtW2N1cnJlbnRJbWFnZUluZGV4XS5zcmMpXCI+XHJcbiAgICAgICAgPC9pZnJhbWU+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImxiLW5hdlwiIFtoaWRkZW5dPVwiIXVpLnNob3dBcnJvd05hdlwiICNuYXZBcnJvdz5cclxuICAgICAgICAgICAgPGEgY2xhc3M9XCJsYi1wcmV2XCIgW2hpZGRlbl09XCIhdWkuc2hvd0xlZnRBcnJvd1wiIChjbGljayk9XCJwcmV2SW1hZ2UoKVwiICNsZWZ0QXJyb3c+PC9hPlxyXG4gICAgICAgICAgICA8YSBjbGFzcz1cImxiLW5leHRcIiBbaGlkZGVuXT1cIiF1aS5zaG93UmlnaHRBcnJvd1wiIChjbGljayk9XCJuZXh0SW1hZ2UoKVwiICNyaWdodEFycm93PjwvYT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibGItbG9hZGVyXCIgW2hpZGRlbl09XCIhdWkuc2hvd1JlbG9hZGVyXCIgKGNsaWNrKT1cImNsb3NlKCRldmVudClcIj5cclxuICAgICAgICAgICAgPGEgY2xhc3M9XCJsYi1jYW5jZWxcIj48L2E+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+XHJcbjxkaXYgY2xhc3M9XCJsYi1kYXRhQ29udGFpbmVyXCIgW2hpZGRlbl09XCJ1aS5zaG93UmVsb2FkZXJcIiAjZGF0YUNvbnRhaW5lcj5cclxuICAgIDxkaXYgY2xhc3M9XCJsYi1kYXRhXCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImxiLWRldGFpbHNcIj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsYi1jYXB0aW9uIGFuaW1hdGlvbiBmYWRlSW5cIiBbaGlkZGVuXT1cIiF1aS5zaG93Q2FwdGlvblwiXHJcbiAgICAgICAgICAgICAgICBbaW5uZXJIdG1sXT1cImFsYnVtW2N1cnJlbnRJbWFnZUluZGV4XS5jYXB0aW9uXCIgI2NhcHRpb24+XHJcbiAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJsYi1udW1iZXIgYW5pbWF0aW9uIGZhZGVJblwiIFtoaWRkZW5dPVwiIXVpLnNob3dQYWdlTnVtYmVyXCIgI251bWJlcj57eyBjb250ZW50LnBhZ2VOdW1iZXJcclxuICAgICAgICAgICAgICAgIH19PC9zcGFuPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJsYi1jb250cm9sQ29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYi1jbG9zZUNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJsYi1jbG9zZVwiIChjbGljayk9XCJjbG9zZSgkZXZlbnQpXCI+PC9hPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxiLXR1cm5Db250YWluZXJcIiBbaGlkZGVuXT1cIiF1aS5zaG93Um90YXRlQnV0dG9uXCI+XHJcbiAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImxiLXR1cm5MZWZ0XCIgKGNsaWNrKT1cImNvbnRyb2woJGV2ZW50KVwiPjwvYT5cclxuICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibGItdHVyblJpZ2h0XCIgKGNsaWNrKT1cImNvbnRyb2woJGV2ZW50KVwiPjwvYT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYi16b29tQ29udGFpbmVyXCIgW2hpZGRlbl09XCIhdWkuc2hvd1pvb21CdXR0b25cIj5cclxuICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibGItem9vbU91dFwiIChjbGljayk9XCJjb250cm9sKCRldmVudClcIj48L2E+XHJcbiAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImxiLXpvb21JblwiIChjbGljayk9XCJjb250cm9sKCRldmVudClcIj48L2E+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbjwvZGl2PiJdfQ==