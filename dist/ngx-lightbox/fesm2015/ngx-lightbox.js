import * as i0 from '@angular/core';
import { Injectable, Pipe, SecurityContext, Component, Inject, Input, ViewChild, HostListener, NgModule } from '@angular/core';
import * as i3 from '@angular/common';
import { DOCUMENT, CommonModule } from '@angular/common';
import { Subject } from 'rxjs';
import * as i1 from '@angular/platform-browser';

const LIGHTBOX_EVENT = {
    CHANGE_PAGE: 1,
    CLOSE: 2,
    OPEN: 3,
    ZOOM_IN: 4,
    ZOOM_OUT: 5,
    ROTATE_LEFT: 6,
    ROTATE_RIGHT: 7,
    FILE_NOT_FOUND: 8
};
class LightboxEvent {
    constructor() {
        this._lightboxEventSource = new Subject();
        this.lightboxEvent$ = this._lightboxEventSource.asObservable();
    }
    broadcastLightboxEvent(event) {
        this._lightboxEventSource.next(event);
    }
}
LightboxEvent.ɵfac = function LightboxEvent_Factory(t) { return new (t || LightboxEvent)(); };
LightboxEvent.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: LightboxEvent, factory: LightboxEvent.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LightboxEvent, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();
function getWindow() {
    return window;
}
class LightboxWindowRef {
    get nativeWindow() {
        return getWindow();
    }
}
LightboxWindowRef.ɵfac = function LightboxWindowRef_Factory(t) { return new (t || LightboxWindowRef)(); };
LightboxWindowRef.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: LightboxWindowRef, factory: LightboxWindowRef.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LightboxWindowRef, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], null, null); })();

const _c0$1 = ["outerContainer"];
const _c1 = ["container"];
const _c2 = ["leftArrow"];
const _c3 = ["rightArrow"];
const _c4 = ["navArrow"];
const _c5 = ["dataContainer"];
const _c6 = ["image"];
const _c7 = ["iframe"];
const _c8 = ["caption"];
const _c9 = ["number"];
const _c10 = ["lb-content", ""];
function LightboxComponent_img_4_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "img", 31, 32);
} if (rf & 2) {
    const ctx_r2 = i0.ɵɵnextContext();
    i0.ɵɵproperty("src", ctx_r2.album[ctx_r2.currentImageIndex].src, i0.ɵɵsanitizeUrl)("hidden", ctx_r2.ui.showReloader);
} }
function LightboxComponent_iframe_5_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelement(0, "iframe", 33, 34);
    i0.ɵɵpipe(2, "safe");
} if (rf & 2) {
    const ctx_r3 = i0.ɵɵnextContext();
    i0.ɵɵproperty("src", i0.ɵɵpipeBind1(2, 2, ctx_r3.album[ctx_r3.currentImageIndex].src), i0.ɵɵsanitizeResourceUrl)("hidden", ctx_r3.ui.showReloader);
} }
class SafePipe {
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    transform(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
SafePipe.ɵfac = function SafePipe_Factory(t) { return new (t || SafePipe)(i0.ɵɵdirectiveInject(i1.DomSanitizer, 16)); };
SafePipe.ɵpipe = /*@__PURE__*/ i0.ɵɵdefinePipe({ name: "safe", type: SafePipe, pure: true });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(SafePipe, [{
        type: Pipe,
        args: [{ name: 'safe' }]
    }], function () { return [{ type: i1.DomSanitizer }]; }, null); })();
class LightboxComponent {
    constructor(_elemRef, _rendererRef, _lightboxEvent, _lightboxElem, _lightboxWindowRef, _sanitizer, _documentRef) {
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
            .subscribe((event) => this._onReceivedEvent(event));
        this.rotate = 0;
    }
    ngOnInit() {
        this.album.forEach(album => {
            if (album.caption) {
                album.caption = this._sanitizer.sanitize(SecurityContext.HTML, album.caption);
            }
        });
    }
    ngAfterViewInit() {
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
    }
    ngOnDestroy() {
        if (!this.options.disableKeyboardNav) {
            // unbind keyboard event
            this._disableKeyboardNav();
        }
        this._event.subscription.unsubscribe();
    }
    close($event) {
        $event.stopPropagation();
        if ($event.target.classList.contains('lightbox') ||
            $event.target.classList.contains('lb-loader') ||
            $event.target.classList.contains('lb-close')) {
            this._lightboxEvent.broadcastLightboxEvent({ id: LIGHTBOX_EVENT.CLOSE, data: null });
        }
    }
    control($event) {
        $event.stopPropagation();
        let height;
        let width;
        if ($event.target.classList.contains('lb-turnLeft')) {
            this.rotate = this.rotate - 90;
            this._rotateContainer();
            this._calcTransformPoint();
            this._documentRef.getElementById('image').style.transform = `rotate(${this.rotate}deg)`;
            this._documentRef.getElementById('image').style.webkitTransform = `rotate(${this.rotate}deg)`;
            this._lightboxEvent.broadcastLightboxEvent({ id: LIGHTBOX_EVENT.ROTATE_LEFT, data: null });
        }
        else if ($event.target.classList.contains('lb-turnRight')) {
            this.rotate = this.rotate + 90;
            this._rotateContainer();
            this._calcTransformPoint();
            this._documentRef.getElementById('image').style.transform = `rotate(${this.rotate}deg)`;
            this._documentRef.getElementById('image').style.webkitTransform = `rotate(${this.rotate}deg)`;
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
    }
    _rotateContainer() {
        let temp = this.rotate;
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
    }
    _resetImage() {
        this.rotate = 0;
        const image = this._documentRef.getElementById('image');
        if (image) {
            image.style.transform = `rotate(${this.rotate}deg)`;
            image.style.webkitTransform = `rotate(${this.rotate}deg)`;
        }
    }
    _calcTransformPoint() {
        let height = parseInt(this._documentRef.getElementById('image').style.height, 10);
        let width = parseInt(this._documentRef.getElementById('image').style.width, 10);
        let temp = this.rotate % 360;
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
    }
    nextImage() {
        if (this.album.length === 1) {
            return;
        }
        else if (this.currentImageIndex === this.album.length - 1) {
            this._changeImage(0);
        }
        else {
            this._changeImage(this.currentImageIndex + 1);
        }
    }
    prevImage() {
        if (this.album.length === 1) {
            return;
        }
        else if (this.currentImageIndex === 0 && this.album.length > 1) {
            this._changeImage(this.album.length - 1);
        }
        else {
            this._changeImage(this.currentImageIndex - 1);
        }
    }
    _validateInputData() {
        if (this.album &&
            this.album instanceof Array &&
            this.album.length > 0) {
            for (let i = 0; i < this.album.length; i++) {
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
    }
    _registerImageLoadingEvent() {
        const src = this.album[this.currentImageIndex].src;
        if (this.album[this.currentImageIndex].iframe || this.needsIframe(src)) {
            setTimeout(() => {
                this._onLoadImageSuccess();
            });
            return;
        }
        const preloader = new Image();
        preloader.onload = () => {
            this._onLoadImageSuccess();
        };
        preloader.onerror = (e) => {
            this._lightboxEvent.broadcastLightboxEvent({ id: LIGHTBOX_EVENT.FILE_NOT_FOUND, data: e });
        };
        preloader.src = this._sanitizer.sanitize(SecurityContext.URL, src);
    }
    /**
     * Fire when the image is loaded
     */
    _onLoadImageSuccess() {
        if (!this.options.disableKeyboardNav) {
            // unbind keyboard event during transition
            this._disableKeyboardNav();
        }
        let imageHeight;
        let imageWidth;
        let maxImageHeight;
        let maxImageWidth;
        let windowHeight;
        let windowWidth;
        let naturalImageWidth;
        let naturalImageHeight;
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
            this._rendererRef.setStyle((this._imageElem || this._iframeElem).nativeElement, 'width', `${imageWidth}px`);
            this._rendererRef.setStyle((this._imageElem || this._iframeElem).nativeElement, 'height', `${imageHeight}px`);
        }
        this._sizeContainer(imageWidth, imageHeight);
        if (this.options.centerVertically) {
            this._centerVertically(imageWidth, imageHeight);
        }
    }
    _centerVertically(imageWidth, imageHeight) {
        const scrollOffset = this._documentRef.documentElement.scrollTop;
        const windowHeight = this._windowRef.innerHeight;
        const viewOffset = windowHeight / 2 - imageHeight / 2;
        const topDistance = scrollOffset + viewOffset;
        this._rendererRef.setStyle(this._lightboxElem.nativeElement, 'top', `${topDistance}px`);
    }
    _sizeContainer(imageWidth, imageHeight) {
        const oldWidth = this._outerContainerElem.nativeElement.offsetWidth;
        const oldHeight = this._outerContainerElem.nativeElement.offsetHeight;
        const newWidth = imageWidth + this._cssValue.containerRightPadding + this._cssValue.containerLeftPadding +
            this._cssValue.imageBorderWidthLeft + this._cssValue.imageBorderWidthRight;
        const newHeight = imageHeight + this._cssValue.containerTopPadding + this._cssValue.containerBottomPadding +
            this._cssValue.imageBorderWidthTop + this._cssValue.imageBorderWidthBottom;
        // make sure that distances are large enough for transitionend event to be fired, at least 5px.
        if (Math.abs(oldWidth - newWidth) + Math.abs(oldHeight - newHeight) > 5) {
            this._rendererRef.setStyle(this._outerContainerElem.nativeElement, 'width', `${newWidth}px`);
            this._rendererRef.setStyle(this._outerContainerElem.nativeElement, 'height', `${newHeight}px`);
            // bind resize event to outer container
            // use enableTransition to prevent infinite loader
            if (this.options.enableTransition) {
                this._event.transitions = [];
                ['transitionend', 'webkitTransitionEnd', 'oTransitionEnd', 'MSTransitionEnd'].forEach(eventName => {
                    this._event.transitions.push(this._rendererRef.listen(this._outerContainerElem.nativeElement, eventName, (event) => {
                        if (event.target === event.currentTarget) {
                            this._postResize(newWidth, newHeight);
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
    }
    _postResize(newWidth, newHeight) {
        // unbind resize event
        if (Array.isArray(this._event.transitions)) {
            this._event.transitions.forEach((eventHandler) => {
                eventHandler();
            });
            this._event.transitions = [];
        }
        this._rendererRef.setStyle(this._dataContainerElem.nativeElement, 'width', `${newWidth}px`);
        this._showImage();
    }
    _showImage() {
        this.ui.showReloader = false;
        this._updateNav();
        this._updateDetails();
        if (!this.options.disableKeyboardNav) {
            this._enableKeyboardNav();
        }
    }
    _prepareComponent() {
        // add css3 animation
        this._addCssAnimation();
        // position the image according to user's option
        this._positionLightBox();
        // update controls visibility on next view generation
        setTimeout(() => {
            this.ui.showZoomButton = this.options.showZoom;
            this.ui.showRotateButton = this.options.showRotate;
        }, 0);
    }
    _positionLightBox() {
        // @see https://stackoverflow.com/questions/3464876/javascript-get-window-x-y-position-for-scroll
        const top = (this._windowRef.pageYOffset || this._documentRef.documentElement.scrollTop) +
            this.options.positionFromTop;
        const left = this._windowRef.pageXOffset || this._documentRef.documentElement.scrollLeft;
        if (!this.options.centerVertically) {
            this._rendererRef.setStyle(this._lightboxElem.nativeElement, 'top', `${top}px`);
        }
        this._rendererRef.setStyle(this._lightboxElem.nativeElement, 'left', `${left}px`);
        this._rendererRef.setStyle(this._lightboxElem.nativeElement, 'display', 'block');
        // disable scrolling of the page while open
        if (this.options.disableScrolling) {
            this._rendererRef.addClass(this._documentRef.documentElement, 'lb-disable-scrolling');
        }
    }
    /**
     * addCssAnimation add css3 classes for animate lightbox
     */
    _addCssAnimation() {
        const resizeDuration = this.options.resizeDuration;
        const fadeDuration = this.options.fadeDuration;
        this._rendererRef.setStyle(this._lightboxElem.nativeElement, '-webkit-animation-duration', `${fadeDuration}s`);
        this._rendererRef.setStyle(this._lightboxElem.nativeElement, 'animation-duration', `${fadeDuration}s`);
        this._rendererRef.setStyle(this._outerContainerElem.nativeElement, '-webkit-transition-duration', `${resizeDuration}s`);
        this._rendererRef.setStyle(this._outerContainerElem.nativeElement, 'transition-duration', `${resizeDuration}s`);
        this._rendererRef.setStyle(this._dataContainerElem.nativeElement, '-webkit-animation-duration', `${fadeDuration}s`);
        this._rendererRef.setStyle(this._dataContainerElem.nativeElement, 'animation-duration', `${fadeDuration}s`);
        this._rendererRef.setStyle((this._imageElem || this._iframeElem).nativeElement, '-webkit-animation-duration', `${fadeDuration}s`);
        this._rendererRef.setStyle((this._imageElem || this._iframeElem).nativeElement, 'animation-duration', `${fadeDuration}s`);
        this._rendererRef.setStyle(this._captionElem.nativeElement, '-webkit-animation-duration', `${fadeDuration}s`);
        this._rendererRef.setStyle(this._captionElem.nativeElement, 'animation-duration', `${fadeDuration}s`);
        this._rendererRef.setStyle(this._numberElem.nativeElement, '-webkit-animation-duration', `${fadeDuration}s`);
        this._rendererRef.setStyle(this._numberElem.nativeElement, 'animation-duration', `${fadeDuration}s`);
    }
    _end() {
        this.ui.classList = 'lightbox animation fadeOut';
        if (this.options.disableScrolling) {
            this._rendererRef.removeClass(this._documentRef.documentElement, 'lb-disable-scrolling');
        }
        setTimeout(() => {
            this.cmpRef.destroy();
        }, this.options.fadeDuration * 1000);
    }
    _updateDetails() {
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
    }
    _albumLabel() {
        // due to {this.currentImageIndex} is set from 0 to {this.album.length} - 1
        return this.options.albumLabel.replace(/%1/g, Number(this.currentImageIndex + 1)).replace(/%2/g, this.album.length);
    }
    _changeImage(newIndex) {
        this._resetImage();
        this.currentImageIndex = newIndex;
        this._hideImage();
        this._registerImageLoadingEvent();
        this._lightboxEvent.broadcastLightboxEvent({ id: LIGHTBOX_EVENT.CHANGE_PAGE, data: newIndex });
    }
    _hideImage() {
        this.ui.showReloader = true;
        this.ui.showArrowNav = false;
        this.ui.showLeftArrow = false;
        this.ui.showRightArrow = false;
        this.ui.showPageNumber = false;
        this.ui.showCaption = false;
    }
    _updateNav() {
        let alwaysShowNav = false;
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
    }
    _showLeftArrowNav() {
        this.ui.showLeftArrow = true;
    }
    _showRightArrowNav() {
        this.ui.showRightArrow = true;
    }
    _showArrowNav() {
        this.ui.showArrowNav = (this.album.length !== 1);
    }
    _enableKeyboardNav() {
        this._event.keyup = this._rendererRef.listen('document', 'keyup', (event) => {
            this._keyboardAction(event);
        });
    }
    _disableKeyboardNav() {
        if (this._event.keyup) {
            this._event.keyup();
        }
    }
    _keyboardAction($event) {
        const KEYCODE_ESC = 27;
        const KEYCODE_LEFTARROW = 37;
        const KEYCODE_RIGHTARROW = 39;
        const keycode = $event.keyCode;
        const key = String.fromCharCode(keycode).toLowerCase();
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
    }
    _getCssStyleValue(elem, propertyName) {
        return parseFloat(this._windowRef
            .getComputedStyle(elem.nativeElement, null)
            .getPropertyValue(propertyName));
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
    needsIframe(src) {
        // const sanitizedUrl = this._sanitizer.sanitize(SecurityContext.URL, src);
        if (src.match(/\.pdf$/)) {
            return true;
        }
        return false;
    }
}
LightboxComponent.ɵfac = function LightboxComponent_Factory(t) { return new (t || LightboxComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(LightboxEvent), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(LightboxWindowRef), i0.ɵɵdirectiveInject(i1.DomSanitizer), i0.ɵɵdirectiveInject(DOCUMENT)); };
LightboxComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LightboxComponent, selectors: [["", "lb-content", ""]], viewQuery: function LightboxComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0$1, 5);
        i0.ɵɵviewQuery(_c1, 5);
        i0.ɵɵviewQuery(_c2, 5);
        i0.ɵɵviewQuery(_c3, 5);
        i0.ɵɵviewQuery(_c4, 5);
        i0.ɵɵviewQuery(_c5, 5);
        i0.ɵɵviewQuery(_c6, 5);
        i0.ɵɵviewQuery(_c7, 5);
        i0.ɵɵviewQuery(_c8, 5);
        i0.ɵɵviewQuery(_c9, 5);
    } if (rf & 2) {
        let _t;
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
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LightboxComponent, [{
        type: Component,
        args: [{
                selector: '[lb-content]',
                host: {
                    '[class]': 'ui.classList'
                },
                templateUrl: "./lightbox.component.html",
            }]
    }], function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: LightboxEvent }, { type: i0.ElementRef }, { type: LightboxWindowRef }, { type: i1.DomSanitizer }, { type: undefined, decorators: [{
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

const _c0 = ["lb-overlay", ""];
class LightboxOverlayComponent {
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
LightboxOverlayComponent.ɵfac = function LightboxOverlayComponent_Factory(t) { return new (t || LightboxOverlayComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(LightboxEvent), i0.ɵɵdirectiveInject(DOCUMENT)); };
LightboxOverlayComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LightboxOverlayComponent, selectors: [["", "lb-overlay", ""]], hostVars: 2, hostBindings: function LightboxOverlayComponent_HostBindings(rf, ctx) { if (rf & 1) {
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
    }], function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: LightboxEvent }, { type: undefined, decorators: [{
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

class LightboxConfig {
    constructor() {
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
        this.containerElementResolver = (documentRef) => documentRef.querySelector('body');
    }
}
LightboxConfig.ɵfac = function LightboxConfig_Factory(t) { return new (t || LightboxConfig)(); };
LightboxConfig.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: LightboxConfig, factory: LightboxConfig.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(LightboxConfig, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();

class Lightbox {
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
Lightbox.ɵfac = function Lightbox_Factory(t) { return new (t || Lightbox)(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.Injector), i0.ɵɵinject(i0.ApplicationRef), i0.ɵɵinject(LightboxConfig), i0.ɵɵinject(LightboxEvent), i0.ɵɵinject(DOCUMENT)); };
Lightbox.ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: Lightbox, factory: Lightbox.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(Lightbox, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i0.ComponentFactoryResolver }, { type: i0.Injector }, { type: i0.ApplicationRef }, { type: LightboxConfig }, { type: LightboxEvent }, { type: undefined, decorators: [{
                type: Inject,
                args: [DOCUMENT]
            }] }]; }, null); })();

class LightboxModule {
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

/**
 * Generated bundle index. Do not edit.
 */

export { LIGHTBOX_EVENT, Lightbox, LightboxConfig, LightboxEvent, LightboxModule, LightboxWindowRef };
//# sourceMappingURL=ngx-lightbox.js.map
