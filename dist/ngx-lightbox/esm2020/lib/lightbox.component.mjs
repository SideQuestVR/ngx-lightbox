import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Inject, Input, Pipe, SecurityContext, ViewChild, } from '@angular/core';
import { LIGHTBOX_EVENT } from './lightbox-event.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "./lightbox-event.service";
import * as i3 from "@angular/common";
const _c0 = ["outerContainer"];
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
export class SafePipe {
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
export class LightboxComponent {
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
LightboxComponent.ɵfac = function LightboxComponent_Factory(t) { return new (t || LightboxComponent)(i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i0.Renderer2), i0.ɵɵdirectiveInject(i2.LightboxEvent), i0.ɵɵdirectiveInject(i0.ElementRef), i0.ɵɵdirectiveInject(i2.LightboxWindowRef), i0.ɵɵdirectiveInject(i1.DomSanitizer), i0.ɵɵdirectiveInject(DOCUMENT)); };
LightboxComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: LightboxComponent, selectors: [["", "lb-content", ""]], viewQuery: function LightboxComponent_Query(rf, ctx) { if (rf & 1) {
        i0.ɵɵviewQuery(_c0, 5);
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
        i0.ɵɵelementStart(0, "div", 0, 1)(2, "div", 2, 3);
        i0.ɵɵtemplate(4, LightboxComponent_img_4_Template, 2, 2, "img", 4);
        i0.ɵɵtemplate(5, LightboxComponent_iframe_5_Template, 3, 4, "iframe", 5);
        i0.ɵɵelementStart(6, "div", 6, 7)(8, "a", 8, 9);
        i0.ɵɵlistener("click", function LightboxComponent_Template_a_click_8_listener() { return ctx.prevImage(); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(10, "a", 10, 11);
        i0.ɵɵlistener("click", function LightboxComponent_Template_a_click_10_listener() { return ctx.nextImage(); });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(12, "div", 12);
        i0.ɵɵlistener("click", function LightboxComponent_Template_div_click_12_listener($event) { return ctx.close($event); });
        i0.ɵɵelement(13, "a", 13);
        i0.ɵɵelementEnd()()();
        i0.ɵɵelementStart(14, "div", 14, 15)(16, "div", 16)(17, "div", 17);
        i0.ɵɵelement(18, "span", 18, 19);
        i0.ɵɵelementStart(20, "span", 20, 21);
        i0.ɵɵtext(22);
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(23, "div", 22)(24, "div", 23)(25, "a", 24);
        i0.ɵɵlistener("click", function LightboxComponent_Template_a_click_25_listener($event) { return ctx.close($event); });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(26, "div", 25)(27, "a", 26);
        i0.ɵɵlistener("click", function LightboxComponent_Template_a_click_27_listener($event) { return ctx.control($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(28, "a", 27);
        i0.ɵɵlistener("click", function LightboxComponent_Template_a_click_28_listener($event) { return ctx.control($event); });
        i0.ɵɵelementEnd()();
        i0.ɵɵelementStart(29, "div", 28)(30, "a", 29);
        i0.ɵɵlistener("click", function LightboxComponent_Template_a_click_30_listener($event) { return ctx.control($event); });
        i0.ɵɵelementEnd();
        i0.ɵɵelementStart(31, "a", 30);
        i0.ɵɵlistener("click", function LightboxComponent_Template_a_click_31_listener($event) { return ctx.control($event); });
        i0.ɵɵelementEnd()()()()();
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
        args: [{ selector: '[lb-content]', host: {
                    '[class]': 'ui.classList'
                }, template: "<div class=\"lb-outerContainer transition\" #outerContainer id=\"outerContainer\">\r\n    <div class=\"lb-container\" #container id=\"container\">\r\n        <img class=\"lb-image\" id=\"image\" [src]=\"album[currentImageIndex].src\" class=\"lb-image animation fadeIn\"\r\n            [hidden]=\"ui.showReloader\" #image\r\n            *ngIf=\"!album[currentImageIndex].iframe && !needsIframe(album[currentImageIndex].src)\">\r\n        <iframe class=\"lb-image\" id=\"iframe\" [src]=\"album[currentImageIndex].src | safe\"\r\n            class=\"lb-image lb-iframe animation fadeIn\" [hidden]=\"ui.showReloader\" #iframe\r\n            *ngIf=\"album[currentImageIndex].iframe || needsIframe(album[currentImageIndex].src)\">\r\n        </iframe>\r\n        <div class=\"lb-nav\" [hidden]=\"!ui.showArrowNav\" #navArrow>\r\n            <a class=\"lb-prev\" [hidden]=\"!ui.showLeftArrow\" (click)=\"prevImage()\" #leftArrow></a>\r\n            <a class=\"lb-next\" [hidden]=\"!ui.showRightArrow\" (click)=\"nextImage()\" #rightArrow></a>\r\n        </div>\r\n        <div class=\"lb-loader\" [hidden]=\"!ui.showReloader\" (click)=\"close($event)\">\r\n            <a class=\"lb-cancel\"></a>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"lb-dataContainer\" [hidden]=\"ui.showReloader\" #dataContainer>\r\n    <div class=\"lb-data\">\r\n        <div class=\"lb-details\">\r\n            <span class=\"lb-caption animation fadeIn\" [hidden]=\"!ui.showCaption\"\r\n                [innerHtml]=\"album[currentImageIndex].caption\" #caption>\r\n            </span>\r\n            <span class=\"lb-number animation fadeIn\" [hidden]=\"!ui.showPageNumber\" #number>{{ content.pageNumber\r\n                }}</span>\r\n        </div>\r\n        <div class=\"lb-controlContainer\">\r\n            <div class=\"lb-closeContainer\">\r\n                <a class=\"lb-close\" (click)=\"close($event)\"></a>\r\n            </div>\r\n            <div class=\"lb-turnContainer\" [hidden]=\"!ui.showRotateButton\">\r\n                <a class=\"lb-turnLeft\" (click)=\"control($event)\"></a>\r\n                <a class=\"lb-turnRight\" (click)=\"control($event)\"></a>\r\n            </div>\r\n            <div class=\"lb-zoomContainer\" [hidden]=\"!ui.showZoomButton\">\r\n                <a class=\"lb-zoomOut\" (click)=\"control($event)\"></a>\r\n                <a class=\"lb-zoomIn\" (click)=\"control($event)\"></a>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>" }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlnaHRib3guY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWxpZ2h0Ym94L3NyYy9saWIvbGlnaHRib3guY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vcHJvamVjdHMvbmd4LWxpZ2h0Ym94L3NyYy9saWIvbGlnaHRib3guY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFFTCxTQUFTLEVBRVQsWUFBWSxFQUNaLE1BQU0sRUFDTixLQUFLLEVBRUcsSUFBSSxFQUVaLGVBQWUsRUFDZixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFpQixjQUFjLEVBQW1DLE1BQU0sMEJBQTBCLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0lDZGxHLDhCQUUyRjs7O0lBRjFELGtGQUFvQyxrQ0FBQTs7O0lBR3JFLGlDQUdTOzs7O0lBSDRCLGdIQUEyQyxrQ0FBQTs7QURjeEYsTUFBTSxPQUFPLFFBQVE7SUFDbkIsWUFBb0IsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztJQUFHLENBQUM7SUFDL0MsU0FBUyxDQUFDLEdBQUc7UUFDWCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsOEJBQThCLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUQsQ0FBQzs7Z0VBSlUsUUFBUTtxRUFBUixRQUFRO3VGQUFSLFFBQVE7Y0FEcEIsSUFBSTtlQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRTs7QUFldEIsTUFBTSxPQUFPLGlCQUFpQjtJQXFCNUIsWUFDVSxRQUFvQixFQUNwQixZQUF1QixFQUN2QixjQUE2QixFQUM5QixhQUF5QixFQUN4QixrQkFBcUMsRUFDckMsVUFBd0IsRUFDTixZQUFZO1FBTjlCLGFBQVEsR0FBUixRQUFRLENBQVk7UUFDcEIsaUJBQVksR0FBWixZ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QUFTO21CQUFDLFdBQVc7WUFDRyxlQUFlO2tCQUF2QyxTQUFTO21CQUFDLFlBQVk7WUFDQSxhQUFhO2tCQUFuQyxTQUFTO21CQUFDLFVBQVU7WUFDTyxrQkFBa0I7a0JBQTdDLFNBQVM7bUJBQUMsZUFBZTtZQUNOLFVBQVU7a0JBQTdCLFNBQVM7bUJBQUMsT0FBTztZQUNHLFdBQVc7a0JBQS9CLFNBQVM7bUJBQUMsUUFBUTtZQUNHLFlBQVk7a0JBQWpDLFNBQVM7bUJBQUMsU0FBUztZQUNDLFdBQVc7a0JBQS9CLFNBQVM7bUJBQUMsUUFBUTtZQWdHWixLQUFLO2tCQURYLFlBQVk7bUJBQUMsT0FBTyxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtET0NVTUVOVH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHtcclxuICBBZnRlclZpZXdJbml0LFxyXG4gIENvbXBvbmVudCxcclxuICBFbGVtZW50UmVmLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBJbmplY3QsXHJcbiAgSW5wdXQsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCwgUGlwZSwgUGlwZVRyYW5zZm9ybSxcclxuICBSZW5kZXJlcjIsXHJcbiAgU2VjdXJpdHlDb250ZXh0LFxyXG4gIFZpZXdDaGlsZCxcclxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHtEb21TYW5pdGl6ZXJ9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5cclxuaW1wb3J0IHtJQWxidW0sIElFdmVudCwgTElHSFRCT1hfRVZFTlQsIExpZ2h0Ym94RXZlbnQsIExpZ2h0Ym94V2luZG93UmVmfSBmcm9tICcuL2xpZ2h0Ym94LWV2ZW50LnNlcnZpY2UnO1xyXG5cclxuQFBpcGUoeyBuYW1lOiAnc2FmZScgfSlcclxuZXhwb3J0IGNsYXNzIFNhZmVQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cclxuICB0cmFuc2Zvcm0odXJsKSB7XHJcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHVybCk7XHJcbiAgfVxyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ1tsYi1jb250ZW50XScsXHJcbiAgaG9zdDoge1xyXG4gICAgJ1tjbGFzc10nOiAndWkuY2xhc3NMaXN0J1xyXG4gIH0sXHJcbiAgdGVtcGxhdGVVcmw6IFwiLi9saWdodGJveC5jb21wb25lbnQuaHRtbFwiLFxyXG59KVxyXG5leHBvcnQgY2xhc3MgTGlnaHRib3hDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgT25Jbml0IHtcclxuICBASW5wdXQoKSBhbGJ1bTogQXJyYXk8SUFsYnVtPjtcclxuICBASW5wdXQoKSBjdXJyZW50SW1hZ2VJbmRleDogbnVtYmVyO1xyXG4gIEBJbnB1dCgpIG9wdGlvbnM6IGFueTtcclxuICBASW5wdXQoKSBjbXBSZWY6IGFueTtcclxuICBAVmlld0NoaWxkKCdvdXRlckNvbnRhaW5lcicpIF9vdXRlckNvbnRhaW5lckVsZW06IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgX2NvbnRhaW5lckVsZW06IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnbGVmdEFycm93JykgX2xlZnRBcnJvd0VsZW06IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgncmlnaHRBcnJvdycpIF9yaWdodEFycm93RWxlbTogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCduYXZBcnJvdycpIF9uYXZBcnJvd0VsZW06IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnZGF0YUNvbnRhaW5lcicpIF9kYXRhQ29udGFpbmVyRWxlbTogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCdpbWFnZScpIF9pbWFnZUVsZW06IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnaWZyYW1lJykgX2lmcmFtZUVsZW06IEVsZW1lbnRSZWY7XHJcbiAgQFZpZXdDaGlsZCgnY2FwdGlvbicpIF9jYXB0aW9uRWxlbTogRWxlbWVudFJlZjtcclxuICBAVmlld0NoaWxkKCdudW1iZXInKSBfbnVtYmVyRWxlbTogRWxlbWVudFJlZjtcclxuICBwdWJsaWMgY29udGVudDogYW55O1xyXG4gIHB1YmxpYyB1aTogYW55O1xyXG4gIHByaXZhdGUgX2Nzc1ZhbHVlOiBhbnk7XHJcbiAgcHJpdmF0ZSBfZXZlbnQ6IGFueTtcclxuICBwcml2YXRlIF93aW5kb3dSZWY6IGFueTtcclxuICBwcml2YXRlIHJvdGF0ZTogbnVtYmVyO1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJpdmF0ZSBfZWxlbVJlZjogRWxlbWVudFJlZixcclxuICAgIHByaXZhdGUgX3JlbmRlcmVyUmVmOiBSZW5kZXJlcjIsXHJcbiAgICBwcml2YXRlIF9saWdodGJveEV2ZW50OiBMaWdodGJveEV2ZW50LFxyXG4gICAgcHVibGljIF9saWdodGJveEVsZW06IEVsZW1lbnRSZWYsXHJcbiAgICBwcml2YXRlIF9saWdodGJveFdpbmRvd1JlZjogTGlnaHRib3hXaW5kb3dSZWYsXHJcbiAgICBwcml2YXRlIF9zYW5pdGl6ZXI6IERvbVNhbml0aXplcixcclxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50UmVmXHJcbiAgKSB7XHJcbiAgICAvLyBpbml0aWFsaXplIGRhdGFcclxuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMub3B0aW9ucyB8fCB7fTtcclxuICAgIHRoaXMuYWxidW0gPSB0aGlzLmFsYnVtIHx8IFtdO1xyXG4gICAgdGhpcy5jdXJyZW50SW1hZ2VJbmRleCA9IHRoaXMuY3VycmVudEltYWdlSW5kZXggfHwgMDtcclxuICAgIHRoaXMuX3dpbmRvd1JlZiA9IHRoaXMuX2xpZ2h0Ym94V2luZG93UmVmLm5hdGl2ZVdpbmRvdztcclxuXHJcbiAgICAvLyBjb250cm9sIHRoZSBpbnRlcmFjdGl2ZSBvZiB0aGUgZGlyZWN0aXZlXHJcbiAgICB0aGlzLnVpID0ge1xyXG4gICAgICAvLyBjb250cm9sIHRoZSBhcHBlYXIgb2YgdGhlIHJlbG9hZGVyXHJcbiAgICAgIC8vIGZhbHNlOiBpbWFnZSBoYXMgbG9hZGVkIGNvbXBsZXRlbHkgYW5kIHJlYWR5IHRvIGJlIHNob3duXHJcbiAgICAgIC8vIHRydWU6IGltYWdlIGlzIHN0aWxsIGxvYWRpbmdcclxuICAgICAgc2hvd1JlbG9hZGVyOiB0cnVlLFxyXG5cclxuICAgICAgLy8gY29udHJvbCB0aGUgYXBwZWFyIG9mIHRoZSBuYXYgYXJyb3dcclxuICAgICAgLy8gdGhlIGFycm93TmF2IGlzIHRoZSBwYXJlbnQgb2YgYm90aCBsZWZ0IGFuZCByaWdodCBhcnJvd1xyXG4gICAgICAvLyBpbiBzb21lIGNhc2VzLCB0aGUgcGFyZW50IHNob3dzIGJ1dCB0aGUgY2hpbGQgZG9lcyBub3Qgc2hvd1xyXG4gICAgICBzaG93TGVmdEFycm93OiBmYWxzZSxcclxuICAgICAgc2hvd1JpZ2h0QXJyb3c6IGZhbHNlLFxyXG4gICAgICBzaG93QXJyb3dOYXY6IGZhbHNlLFxyXG5cclxuICAgICAgLy8gY29udHJvbCB0aGUgYXBwZWFyIG9mIHRoZSB6b29tIGFuZCByb3RhdGUgYnV0dG9uc1xyXG4gICAgICBzaG93Wm9vbUJ1dHRvbjogZmFsc2UsXHJcbiAgICAgIHNob3dSb3RhdGVCdXR0b246IGZhbHNlLFxyXG5cclxuICAgICAgLy8gY29udHJvbCB3aGV0aGVyIHRvIHNob3cgdGhlXHJcbiAgICAgIC8vIHBhZ2UgbnVtYmVyIG9yIG5vdFxyXG4gICAgICBzaG93UGFnZU51bWJlcjogZmFsc2UsXHJcbiAgICAgIHNob3dDYXB0aW9uOiBmYWxzZSxcclxuICAgICAgY2xhc3NMaXN0OiAnbGlnaHRib3ggYW5pbWF0aW9uIGZhZGVJbidcclxuICAgIH07XHJcblxyXG4gICAgdGhpcy5jb250ZW50ID0ge1xyXG4gICAgICBwYWdlTnVtYmVyOiAnJ1xyXG4gICAgfTtcclxuXHJcbiAgICB0aGlzLl9ldmVudCA9IHt9O1xyXG4gICAgdGhpcy5fbGlnaHRib3hFbGVtID0gdGhpcy5fZWxlbVJlZjtcclxuICAgIHRoaXMuX2V2ZW50LnN1YnNjcmlwdGlvbiA9IHRoaXMuX2xpZ2h0Ym94RXZlbnQubGlnaHRib3hFdmVudCRcclxuICAgICAgLnN1YnNjcmliZSgoZXZlbnQ6IElFdmVudCkgPT4gdGhpcy5fb25SZWNlaXZlZEV2ZW50KGV2ZW50KSk7XHJcbiAgICB0aGlzLnJvdGF0ZSA9IDA7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpOiB2b2lkIHtcclxuICAgIHRoaXMuYWxidW0uZm9yRWFjaChhbGJ1bSA9PiB7XHJcbiAgICAgIGlmIChhbGJ1bS5jYXB0aW9uKSB7XHJcbiAgICAgICAgYWxidW0uY2FwdGlvbiA9IHRoaXMuX3Nhbml0aXplci5zYW5pdGl6ZShTZWN1cml0eUNvbnRleHQuSFRNTCwgYWxidW0uY2FwdGlvbik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcclxuICAgIC8vIG5lZWQgdG8gaW5pdCBjc3MgdmFsdWUgaGVyZSwgYWZ0ZXIgdGhlIHZpZXcgcmVhZHlcclxuICAgIC8vIGFjdHVhbGx5IHRoZXNlIHZhbHVlcyBhcmUgYWx3YXlzIDBcclxuICAgIHRoaXMuX2Nzc1ZhbHVlID0ge1xyXG4gICAgICBjb250YWluZXJUb3BQYWRkaW5nOiBNYXRoLnJvdW5kKHRoaXMuX2dldENzc1N0eWxlVmFsdWUodGhpcy5fY29udGFpbmVyRWxlbSwgJ3BhZGRpbmctdG9wJykpLFxyXG4gICAgICBjb250YWluZXJSaWdodFBhZGRpbmc6IE1hdGgucm91bmQodGhpcy5fZ2V0Q3NzU3R5bGVWYWx1ZSh0aGlzLl9jb250YWluZXJFbGVtLCAncGFkZGluZy1yaWdodCcpKSxcclxuICAgICAgY29udGFpbmVyQm90dG9tUGFkZGluZzogTWF0aC5yb3VuZCh0aGlzLl9nZXRDc3NTdHlsZVZhbHVlKHRoaXMuX2NvbnRhaW5lckVsZW0sICdwYWRkaW5nLWJvdHRvbScpKSxcclxuICAgICAgY29udGFpbmVyTGVmdFBhZGRpbmc6IE1hdGgucm91bmQodGhpcy5fZ2V0Q3NzU3R5bGVWYWx1ZSh0aGlzLl9jb250YWluZXJFbGVtLCAncGFkZGluZy1sZWZ0JykpLFxyXG4gICAgICBpbWFnZUJvcmRlcldpZHRoVG9wOiBNYXRoLnJvdW5kKHRoaXMuX2dldENzc1N0eWxlVmFsdWUodGhpcy5faW1hZ2VFbGVtIHx8IHRoaXMuX2lmcmFtZUVsZW0sICdib3JkZXItdG9wLXdpZHRoJykpLFxyXG4gICAgICBpbWFnZUJvcmRlcldpZHRoQm90dG9tOiBNYXRoLnJvdW5kKHRoaXMuX2dldENzc1N0eWxlVmFsdWUodGhpcy5faW1hZ2VFbGVtIHx8IHRoaXMuX2lmcmFtZUVsZW0sICdib3JkZXItYm90dG9tLXdpZHRoJykpLFxyXG4gICAgICBpbWFnZUJvcmRlcldpZHRoTGVmdDogTWF0aC5yb3VuZCh0aGlzLl9nZXRDc3NTdHlsZVZhbHVlKHRoaXMuX2ltYWdlRWxlbSB8fCB0aGlzLl9pZnJhbWVFbGVtLCAnYm9yZGVyLWxlZnQtd2lkdGgnKSksXHJcbiAgICAgIGltYWdlQm9yZGVyV2lkdGhSaWdodDogTWF0aC5yb3VuZCh0aGlzLl9nZXRDc3NTdHlsZVZhbHVlKHRoaXMuX2ltYWdlRWxlbSB8fCB0aGlzLl9pZnJhbWVFbGVtLCAnYm9yZGVyLXJpZ2h0LXdpZHRoJykpXHJcbiAgICB9O1xyXG5cclxuICAgIGlmICh0aGlzLl92YWxpZGF0ZUlucHV0RGF0YSgpKSB7XHJcbiAgICAgIHRoaXMuX3ByZXBhcmVDb21wb25lbnQoKTtcclxuICAgICAgdGhpcy5fcmVnaXN0ZXJJbWFnZUxvYWRpbmdFdmVudCgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMuZGlzYWJsZUtleWJvYXJkTmF2KSB7XHJcbiAgICAgIC8vIHVuYmluZCBrZXlib2FyZCBldmVudFxyXG4gICAgICB0aGlzLl9kaXNhYmxlS2V5Ym9hcmROYXYoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9ldmVudC5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICB9XHJcblxyXG4gIEBIb3N0TGlzdGVuZXIoJ2Nsb3NlJywgWyckZXZlbnQnXSlcclxuICBwdWJsaWMgY2xvc2UoJGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGlmICgkZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbGlnaHRib3gnKSB8fFxyXG4gICAgICAkZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbGItbG9hZGVyJykgfHxcclxuICAgICAgJGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2xiLWNsb3NlJykpIHtcclxuICAgICAgdGhpcy5fbGlnaHRib3hFdmVudC5icm9hZGNhc3RMaWdodGJveEV2ZW50KHsgaWQ6IExJR0hUQk9YX0VWRU5ULkNMT1NFLCBkYXRhOiBudWxsIH0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIGNvbnRyb2woJGV2ZW50OiBhbnkpOiB2b2lkIHtcclxuICAgICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGxldCBoZWlnaHQ6IG51bWJlcjtcclxuICAgIGxldCB3aWR0aDogbnVtYmVyO1xyXG4gICAgaWYgKCRldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdsYi10dXJuTGVmdCcpKSB7XHJcbiAgICAgIHRoaXMucm90YXRlID0gdGhpcy5yb3RhdGUgLSA5MDtcclxuICAgICAgdGhpcy5fcm90YXRlQ29udGFpbmVyKCk7XHJcbiAgICAgIHRoaXMuX2NhbGNUcmFuc2Zvcm1Qb2ludCgpO1xyXG4gICAgICB0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKS5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7dGhpcy5yb3RhdGV9ZGVnKWA7XHJcbiAgICAgIHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdpbWFnZScpLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGByb3RhdGUoJHt0aGlzLnJvdGF0ZX1kZWcpYDtcclxuICAgICAgdGhpcy5fbGlnaHRib3hFdmVudC5icm9hZGNhc3RMaWdodGJveEV2ZW50KHsgaWQ6IExJR0hUQk9YX0VWRU5ULlJPVEFURV9MRUZULCBkYXRhOiBudWxsIH0pO1xyXG4gICAgfSBlbHNlIGlmICgkZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbGItdHVyblJpZ2h0JykpIHtcclxuICAgICAgdGhpcy5yb3RhdGUgPSB0aGlzLnJvdGF0ZSArIDkwO1xyXG4gICAgICB0aGlzLl9yb3RhdGVDb250YWluZXIoKTtcclxuICAgICAgdGhpcy5fY2FsY1RyYW5zZm9ybVBvaW50KCk7XHJcbiAgICAgIHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdpbWFnZScpLnN0eWxlLnRyYW5zZm9ybSA9IGByb3RhdGUoJHt0aGlzLnJvdGF0ZX1kZWcpYDtcclxuICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlJykuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gYHJvdGF0ZSgke3RoaXMucm90YXRlfWRlZylgO1xyXG4gICAgICB0aGlzLl9saWdodGJveEV2ZW50LmJyb2FkY2FzdExpZ2h0Ym94RXZlbnQoeyBpZDogTElHSFRCT1hfRVZFTlQuUk9UQVRFX1JJR0hULCBkYXRhOiBudWxsIH0pO1xyXG4gICAgfSBlbHNlIGlmICgkZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbGItem9vbU91dCcpKSB7XHJcbiAgICAgIGhlaWdodCA9IHBhcnNlSW50KHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdvdXRlckNvbnRhaW5lcicpLnN0eWxlLmhlaWdodCwgMTApIC8gMS41O1xyXG4gICAgICB3aWR0aCA9IHBhcnNlSW50KHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdvdXRlckNvbnRhaW5lcicpLnN0eWxlLndpZHRoLCAxMCkgLyAxLjU7XHJcbiAgICAgIHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdvdXRlckNvbnRhaW5lcicpLnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XHJcbiAgICAgIHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdvdXRlckNvbnRhaW5lcicpLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xyXG4gICAgICBoZWlnaHQgPSBwYXJzZUludCh0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKS5zdHlsZS5oZWlnaHQsIDEwKSAvIDEuNTtcclxuICAgICAgd2lkdGggPSBwYXJzZUludCh0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKS5zdHlsZS53aWR0aCwgMTApIC8gMS41O1xyXG4gICAgICB0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKS5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnO1xyXG4gICAgICB0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKS5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcclxuICAgICAgdGhpcy5fbGlnaHRib3hFdmVudC5icm9hZGNhc3RMaWdodGJveEV2ZW50KHsgaWQ6IExJR0hUQk9YX0VWRU5ULlpPT01fT1VULCBkYXRhOiBudWxsIH0pO1xyXG4gICAgfSBlbHNlIGlmICgkZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbGItem9vbUluJykpIHtcclxuICAgICAgaGVpZ2h0ID0gcGFyc2VJbnQodGhpcy5fZG9jdW1lbnRSZWYuZ2V0RWxlbWVudEJ5SWQoJ291dGVyQ29udGFpbmVyJykuc3R5bGUuaGVpZ2h0LCAxMCkgKiAxLjU7XHJcbiAgICAgIHdpZHRoID0gcGFyc2VJbnQodGhpcy5fZG9jdW1lbnRSZWYuZ2V0RWxlbWVudEJ5SWQoJ291dGVyQ29udGFpbmVyJykuc3R5bGUud2lkdGgsIDEwKSAqIDEuNTtcclxuICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuZ2V0RWxlbWVudEJ5SWQoJ291dGVyQ29udGFpbmVyJykuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcclxuICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuZ2V0RWxlbWVudEJ5SWQoJ291dGVyQ29udGFpbmVyJykuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XHJcbiAgICAgIGhlaWdodCA9IHBhcnNlSW50KHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdpbWFnZScpLnN0eWxlLmhlaWdodCwgMTApICogMS41O1xyXG4gICAgICB3aWR0aCA9IHBhcnNlSW50KHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdpbWFnZScpLnN0eWxlLndpZHRoLCAxMCkgKiAxLjU7XHJcbiAgICAgIHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdpbWFnZScpLnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XHJcbiAgICAgIHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdpbWFnZScpLnN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xyXG4gICAgICB0aGlzLl9saWdodGJveEV2ZW50LmJyb2FkY2FzdExpZ2h0Ym94RXZlbnQoeyBpZDogTElHSFRCT1hfRVZFTlQuWk9PTV9JTiwgZGF0YTogbnVsbCB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3JvdGF0ZUNvbnRhaW5lcigpOiB2b2lkIHtcclxuICAgIGxldCB0ZW1wID0gdGhpcy5yb3RhdGU7XHJcbiAgICBpZiAodGVtcCA8IDApIHtcclxuICAgICAgdGVtcCAqPSAtMTtcclxuICAgIH1cclxuICAgIGlmICh0ZW1wIC8gOTAgJSA0ID09PSAxIHx8IHRlbXAgLyA5MCAlIDQgPT09IDMpIHtcclxuICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuZ2V0RWxlbWVudEJ5SWQoJ291dGVyQ29udGFpbmVyJykuc3R5bGUuaGVpZ2h0ID0gdGhpcy5fZG9jdW1lbnRSZWYuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlJykuc3R5bGUud2lkdGg7XHJcbiAgICAgIHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdvdXRlckNvbnRhaW5lcicpLnN0eWxlLndpZHRoID0gdGhpcy5fZG9jdW1lbnRSZWYuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlJykuc3R5bGUuaGVpZ2h0O1xyXG4gICAgICB0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJykuc3R5bGUuaGVpZ2h0ID0gdGhpcy5fZG9jdW1lbnRSZWYuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlJykuc3R5bGUud2lkdGg7XHJcbiAgICAgIHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdjb250YWluZXInKS5zdHlsZS53aWR0aCA9IHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdpbWFnZScpLnN0eWxlLmhlaWdodDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdvdXRlckNvbnRhaW5lcicpLnN0eWxlLmhlaWdodCA9IHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdpbWFnZScpLnN0eWxlLmhlaWdodDtcclxuICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuZ2V0RWxlbWVudEJ5SWQoJ291dGVyQ29udGFpbmVyJykuc3R5bGUud2lkdGggPSB0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKS5zdHlsZS53aWR0aDtcclxuICAgICAgdGhpcy5fZG9jdW1lbnRSZWYuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpLnN0eWxlLmhlaWdodCA9IHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdpbWFnZScpLnN0eWxlLndpZHRoO1xyXG4gICAgICB0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnY29udGFpbmVyJykuc3R5bGUud2lkdGggPSB0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKS5zdHlsZS5oZWlnaHQ7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9yZXNldEltYWdlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5yb3RhdGUgPSAwO1xyXG4gICAgY29uc3QgaW1hZ2UgPSB0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKTtcclxuICAgIGlmIChpbWFnZSkge1xyXG4gICAgICBpbWFnZS5zdHlsZS50cmFuc2Zvcm0gPSBgcm90YXRlKCR7dGhpcy5yb3RhdGV9ZGVnKWA7XHJcbiAgICAgIGltYWdlLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGByb3RhdGUoJHt0aGlzLnJvdGF0ZX1kZWcpYDtcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9jYWxjVHJhbnNmb3JtUG9pbnQoKTogdm9pZCB7XHJcbiAgICBsZXQgaGVpZ2h0ID0gcGFyc2VJbnQodGhpcy5fZG9jdW1lbnRSZWYuZ2V0RWxlbWVudEJ5SWQoJ2ltYWdlJykuc3R5bGUuaGVpZ2h0LCAxMCk7XHJcbiAgICBsZXQgd2lkdGggPSBwYXJzZUludCh0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKS5zdHlsZS53aWR0aCwgMTApO1xyXG4gICAgbGV0IHRlbXAgPSB0aGlzLnJvdGF0ZSAlIDM2MDtcclxuICAgIGlmICh0ZW1wIDwgMCkge1xyXG4gICAgICB0ZW1wID0gMzYwICsgdGVtcDtcclxuICAgIH1cclxuICAgIGlmICh0ZW1wID09PSA5MCkge1xyXG4gICAgICB0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKS5zdHlsZS50cmFuc2Zvcm1PcmlnaW4gPSAoaGVpZ2h0IC8gMikgKyAncHggJyArIChoZWlnaHQgLyAyKSArICdweCc7XHJcbiAgICB9IGVsc2UgaWYgKHRlbXAgPT09IDE4MCkge1xyXG4gICAgICB0aGlzLl9kb2N1bWVudFJlZi5nZXRFbGVtZW50QnlJZCgnaW1hZ2UnKS5zdHlsZS50cmFuc2Zvcm1PcmlnaW4gPSAod2lkdGggLyAyKSArICdweCAnICsgKGhlaWdodCAvIDIpICsgJ3B4JztcclxuIH0gZWxzZSBpZiAodGVtcCA9PT0gMjcwKSB7XHJcbiAgICAgIHRoaXMuX2RvY3VtZW50UmVmLmdldEVsZW1lbnRCeUlkKCdpbWFnZScpLnN0eWxlLnRyYW5zZm9ybU9yaWdpbiA9ICh3aWR0aCAvIDIpICsgJ3B4ICcgKyAod2lkdGggLyAyKSArICdweCc7XHJcbiB9XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgbmV4dEltYWdlKCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuYWxidW0ubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50SW1hZ2VJbmRleCA9PT0gdGhpcy5hbGJ1bS5sZW5ndGggLSAxKSB7XHJcbiAgICAgIHRoaXMuX2NoYW5nZUltYWdlKDApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fY2hhbmdlSW1hZ2UodGhpcy5jdXJyZW50SW1hZ2VJbmRleCArIDEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHVibGljIHByZXZJbWFnZSgpOiB2b2lkIHtcclxuICAgIGlmICh0aGlzLmFsYnVtLmxlbmd0aCA9PT0gMSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudEltYWdlSW5kZXggPT09IDAgJiYgdGhpcy5hbGJ1bS5sZW5ndGggPiAxKSB7XHJcbiAgICAgIHRoaXMuX2NoYW5nZUltYWdlKHRoaXMuYWxidW0ubGVuZ3RoIC0gMSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9jaGFuZ2VJbWFnZSh0aGlzLmN1cnJlbnRJbWFnZUluZGV4IC0gMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF92YWxpZGF0ZUlucHV0RGF0YSgpOiBib29sZWFuIHtcclxuICAgIGlmICh0aGlzLmFsYnVtICYmXHJcbiAgICAgIHRoaXMuYWxidW0gaW5zdGFuY2VvZiBBcnJheSAmJlxyXG4gICAgICB0aGlzLmFsYnVtLmxlbmd0aCA+IDApIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmFsYnVtLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgLy8gY2hlY2sgd2hldGhlciBlYWNoIF9uc2lkZVxyXG4gICAgICAgIC8vIGFsYnVtIGhhcyBzcmMgZGF0YSBvciBub3RcclxuICAgICAgICBpZiAodGhpcy5hbGJ1bVtpXS5zcmMpIHtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdPbmUgb2YgdGhlIGFsYnVtIGRhdGEgZG9lcyBub3QgaGF2ZSBzb3VyY2UgZGF0YScpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGFsYnVtIGRhdGEgb3IgYWxidW0gZGF0YSBpcyBub3QgY29ycmVjdCBpbiB0eXBlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdG8gcHJldmVudCBkYXRhIHVuZGVyc3RhbmQgYXMgc3RyaW5nXHJcbiAgICAvLyBjb252ZXJ0IGl0IHRvIG51bWJlclxyXG4gICAgaWYgKGlzTmFOKHRoaXMuY3VycmVudEltYWdlSW5kZXgpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ3VycmVudCBpbWFnZSBpbmRleCBpcyBub3QgYSBudW1iZXInKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuY3VycmVudEltYWdlSW5kZXggPSBOdW1iZXIodGhpcy5jdXJyZW50SW1hZ2VJbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9yZWdpc3RlckltYWdlTG9hZGluZ0V2ZW50KCk6IHZvaWQge1xyXG4gICAgY29uc3Qgc3JjOiBhbnkgPSB0aGlzLmFsYnVtW3RoaXMuY3VycmVudEltYWdlSW5kZXhdLnNyYztcclxuXHJcbiAgICBpZiAodGhpcy5hbGJ1bVt0aGlzLmN1cnJlbnRJbWFnZUluZGV4XS5pZnJhbWUgfHwgdGhpcy5uZWVkc0lmcmFtZShzcmMpKSB7XHJcbiAgICAgIHNldFRpbWVvdXQoICgpID0+IHtcclxuICAgICAgICB0aGlzLl9vbkxvYWRJbWFnZVN1Y2Nlc3MoKTtcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwcmVsb2FkZXIgPSBuZXcgSW1hZ2UoKTtcclxuXHJcbiAgICBwcmVsb2FkZXIub25sb2FkID0gKCkgPT4ge1xyXG4gICAgICB0aGlzLl9vbkxvYWRJbWFnZVN1Y2Nlc3MoKTtcclxuICAgIH1cclxuXHJcbiAgICBwcmVsb2FkZXIub25lcnJvciA9IChlKSA9PiB7XHJcbiAgICAgIHRoaXMuX2xpZ2h0Ym94RXZlbnQuYnJvYWRjYXN0TGlnaHRib3hFdmVudCh7IGlkOiBMSUdIVEJPWF9FVkVOVC5GSUxFX05PVF9GT1VORCwgZGF0YTogZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcmVsb2FkZXIuc3JjID0gdGhpcy5fc2FuaXRpemVyLnNhbml0aXplKFNlY3VyaXR5Q29udGV4dC5VUkwsIHNyYyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaXJlIHdoZW4gdGhlIGltYWdlIGlzIGxvYWRlZFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29uTG9hZEltYWdlU3VjY2VzcygpOiB2b2lkIHtcclxuICAgIGlmICghdGhpcy5vcHRpb25zLmRpc2FibGVLZXlib2FyZE5hdikge1xyXG4gICAgICAvLyB1bmJpbmQga2V5Ym9hcmQgZXZlbnQgZHVyaW5nIHRyYW5zaXRpb25cclxuICAgICAgdGhpcy5fZGlzYWJsZUtleWJvYXJkTmF2KCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGltYWdlSGVpZ2h0O1xyXG4gICAgbGV0IGltYWdlV2lkdGg7XHJcbiAgICBsZXQgbWF4SW1hZ2VIZWlnaHQ7XHJcbiAgICBsZXQgbWF4SW1hZ2VXaWR0aDtcclxuICAgIGxldCB3aW5kb3dIZWlnaHQ7XHJcbiAgICBsZXQgd2luZG93V2lkdGg7XHJcbiAgICBsZXQgbmF0dXJhbEltYWdlV2lkdGg7XHJcbiAgICBsZXQgbmF0dXJhbEltYWdlSGVpZ2h0O1xyXG5cclxuICAgIC8vIHNldCBkZWZhdWx0IHdpZHRoIGFuZCBoZWlnaHQgb2YgaW1hZ2UgdG8gYmUgaXRzIG5hdHVyYWxcclxuICAgIGltYWdlV2lkdGggPSBuYXR1cmFsSW1hZ2VXaWR0aCA9IHRoaXMuX2ltYWdlRWxlbSA/IHRoaXMuX2ltYWdlRWxlbS5uYXRpdmVFbGVtZW50Lm5hdHVyYWxXaWR0aCA6IHRoaXMuX3dpbmRvd1JlZi5pbm5lcldpZHRoICogLjg7XHJcbiAgICBpbWFnZUhlaWdodCA9IG5hdHVyYWxJbWFnZUhlaWdodCA9IHRoaXMuX2ltYWdlRWxlbSA/IHRoaXMuX2ltYWdlRWxlbS5uYXRpdmVFbGVtZW50Lm5hdHVyYWxIZWlnaHQgOiB0aGlzLl93aW5kb3dSZWYuaW5uZXJIZWlnaHQgKiAuODtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuZml0SW1hZ2VJblZpZXdQb3J0KSB7XHJcbiAgICAgIHdpbmRvd1dpZHRoID0gdGhpcy5fd2luZG93UmVmLmlubmVyV2lkdGg7XHJcbiAgICAgIHdpbmRvd0hlaWdodCA9IHRoaXMuX3dpbmRvd1JlZi5pbm5lckhlaWdodDtcclxuICAgICAgbWF4SW1hZ2VXaWR0aCA9IHdpbmRvd1dpZHRoIC0gdGhpcy5fY3NzVmFsdWUuY29udGFpbmVyTGVmdFBhZGRpbmcgLVxyXG4gICAgICAgIHRoaXMuX2Nzc1ZhbHVlLmNvbnRhaW5lclJpZ2h0UGFkZGluZyAtIHRoaXMuX2Nzc1ZhbHVlLmltYWdlQm9yZGVyV2lkdGhMZWZ0IC1cclxuICAgICAgICB0aGlzLl9jc3NWYWx1ZS5pbWFnZUJvcmRlcldpZHRoUmlnaHQgLSAyMDtcclxuICAgICAgbWF4SW1hZ2VIZWlnaHQgPSB3aW5kb3dIZWlnaHQgLSB0aGlzLl9jc3NWYWx1ZS5jb250YWluZXJUb3BQYWRkaW5nIC1cclxuICAgICAgICB0aGlzLl9jc3NWYWx1ZS5jb250YWluZXJUb3BQYWRkaW5nIC0gdGhpcy5fY3NzVmFsdWUuaW1hZ2VCb3JkZXJXaWR0aFRvcCAtXHJcbiAgICAgICAgdGhpcy5fY3NzVmFsdWUuaW1hZ2VCb3JkZXJXaWR0aEJvdHRvbSAtIDEyMDtcclxuICAgICAgaWYgKG5hdHVyYWxJbWFnZVdpZHRoID4gbWF4SW1hZ2VXaWR0aCB8fCBuYXR1cmFsSW1hZ2VIZWlnaHQgPiBtYXhJbWFnZUhlaWdodCkge1xyXG4gICAgICAgIGlmICgobmF0dXJhbEltYWdlV2lkdGggLyBtYXhJbWFnZVdpZHRoKSA+IChuYXR1cmFsSW1hZ2VIZWlnaHQgLyBtYXhJbWFnZUhlaWdodCkpIHtcclxuICAgICAgICAgIGltYWdlV2lkdGggPSBtYXhJbWFnZVdpZHRoO1xyXG4gICAgICAgICAgaW1hZ2VIZWlnaHQgPSBNYXRoLnJvdW5kKG5hdHVyYWxJbWFnZUhlaWdodCAvIChuYXR1cmFsSW1hZ2VXaWR0aCAvIGltYWdlV2lkdGgpKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgaW1hZ2VIZWlnaHQgPSBtYXhJbWFnZUhlaWdodDtcclxuICAgICAgICAgIGltYWdlV2lkdGggPSBNYXRoLnJvdW5kKG5hdHVyYWxJbWFnZVdpZHRoIC8gKG5hdHVyYWxJbWFnZUhlaWdodCAvIGltYWdlSGVpZ2h0KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLl9yZW5kZXJlclJlZi5zZXRTdHlsZSgodGhpcy5faW1hZ2VFbGVtIHx8IHRoaXMuX2lmcmFtZUVsZW0pLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIGAke2ltYWdlV2lkdGh9cHhgKTtcclxuICAgICAgdGhpcy5fcmVuZGVyZXJSZWYuc2V0U3R5bGUoKHRoaXMuX2ltYWdlRWxlbSB8fCB0aGlzLl9pZnJhbWVFbGVtKS5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgYCR7aW1hZ2VIZWlnaHR9cHhgKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9zaXplQ29udGFpbmVyKGltYWdlV2lkdGgsIGltYWdlSGVpZ2h0KTtcclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmNlbnRlclZlcnRpY2FsbHkpIHtcclxuICAgICAgdGhpcy5fY2VudGVyVmVydGljYWxseShpbWFnZVdpZHRoLCBpbWFnZUhlaWdodCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9jZW50ZXJWZXJ0aWNhbGx5KGltYWdlV2lkdGg6IG51bWJlciwgaW1hZ2VIZWlnaHQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgY29uc3Qgc2Nyb2xsT2Zmc2V0ID0gdGhpcy5fZG9jdW1lbnRSZWYuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHRoaXMuX3dpbmRvd1JlZi5pbm5lckhlaWdodDtcclxuXHJcbiAgICBjb25zdCB2aWV3T2Zmc2V0ID0gd2luZG93SGVpZ2h0IC8gMiAtIGltYWdlSGVpZ2h0IC8gMjtcclxuICAgIGNvbnN0IHRvcERpc3RhbmNlID0gc2Nyb2xsT2Zmc2V0ICsgdmlld09mZnNldDtcclxuXHJcbiAgICB0aGlzLl9yZW5kZXJlclJlZi5zZXRTdHlsZSh0aGlzLl9saWdodGJveEVsZW0ubmF0aXZlRWxlbWVudCwgJ3RvcCcsIGAke3RvcERpc3RhbmNlfXB4YCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zaXplQ29udGFpbmVyKGltYWdlV2lkdGg6IG51bWJlciwgaW1hZ2VIZWlnaHQ6IG51bWJlcik6IHZvaWQge1xyXG4gICAgY29uc3Qgb2xkV2lkdGggPSB0aGlzLl9vdXRlckNvbnRhaW5lckVsZW0ubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aDtcclxuICAgIGNvbnN0IG9sZEhlaWdodCA9IHRoaXMuX291dGVyQ29udGFpbmVyRWxlbS5uYXRpdmVFbGVtZW50Lm9mZnNldEhlaWdodDtcclxuICAgIGNvbnN0IG5ld1dpZHRoID0gaW1hZ2VXaWR0aCArIHRoaXMuX2Nzc1ZhbHVlLmNvbnRhaW5lclJpZ2h0UGFkZGluZyArIHRoaXMuX2Nzc1ZhbHVlLmNvbnRhaW5lckxlZnRQYWRkaW5nICtcclxuICAgICAgdGhpcy5fY3NzVmFsdWUuaW1hZ2VCb3JkZXJXaWR0aExlZnQgKyB0aGlzLl9jc3NWYWx1ZS5pbWFnZUJvcmRlcldpZHRoUmlnaHQ7XHJcbiAgICBjb25zdCBuZXdIZWlnaHQgPSBpbWFnZUhlaWdodCArIHRoaXMuX2Nzc1ZhbHVlLmNvbnRhaW5lclRvcFBhZGRpbmcgKyB0aGlzLl9jc3NWYWx1ZS5jb250YWluZXJCb3R0b21QYWRkaW5nICtcclxuICAgICAgdGhpcy5fY3NzVmFsdWUuaW1hZ2VCb3JkZXJXaWR0aFRvcCArIHRoaXMuX2Nzc1ZhbHVlLmltYWdlQm9yZGVyV2lkdGhCb3R0b207XHJcblxyXG4gICAgLy8gbWFrZSBzdXJlIHRoYXQgZGlzdGFuY2VzIGFyZSBsYXJnZSBlbm91Z2ggZm9yIHRyYW5zaXRpb25lbmQgZXZlbnQgdG8gYmUgZmlyZWQsIGF0IGxlYXN0IDVweC5cclxuICAgIGlmIChNYXRoLmFicyhvbGRXaWR0aCAtIG5ld1dpZHRoKSArIE1hdGguYWJzKG9sZEhlaWdodCAtIG5ld0hlaWdodCkgPiA1KSB7XHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyUmVmLnNldFN0eWxlKHRoaXMuX291dGVyQ29udGFpbmVyRWxlbS5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCBgJHtuZXdXaWR0aH1weGApO1xyXG4gICAgICB0aGlzLl9yZW5kZXJlclJlZi5zZXRTdHlsZSh0aGlzLl9vdXRlckNvbnRhaW5lckVsZW0ubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsIGAke25ld0hlaWdodH1weGApO1xyXG5cclxuICAgICAgLy8gYmluZCByZXNpemUgZXZlbnQgdG8gb3V0ZXIgY29udGFpbmVyXHJcbiAgICAgIC8vIHVzZSBlbmFibGVUcmFuc2l0aW9uIHRvIHByZXZlbnQgaW5maW5pdGUgbG9hZGVyXHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZW5hYmxlVHJhbnNpdGlvbikge1xyXG4gICAgICAgIHRoaXMuX2V2ZW50LnRyYW5zaXRpb25zID0gW107XHJcbiAgICAgICAgWyd0cmFuc2l0aW9uZW5kJywgJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCAnb1RyYW5zaXRpb25FbmQnLCAnTVNUcmFuc2l0aW9uRW5kJ10uZm9yRWFjaChldmVudE5hbWUgPT4ge1xyXG4gICAgICAgICAgdGhpcy5fZXZlbnQudHJhbnNpdGlvbnMucHVzaChcclxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXJSZWYubGlzdGVuKHRoaXMuX291dGVyQ29udGFpbmVyRWxlbS5uYXRpdmVFbGVtZW50LCBldmVudE5hbWUsIChldmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgICAgICAgaWYgKGV2ZW50LnRhcmdldCA9PT0gZXZlbnQuY3VycmVudFRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fcG9zdFJlc2l6ZShuZXdXaWR0aCwgbmV3SGVpZ2h0KTtcclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuX3Bvc3RSZXNpemUobmV3V2lkdGgsIG5ld0hlaWdodCk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuX3Bvc3RSZXNpemUobmV3V2lkdGgsIG5ld0hlaWdodCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9wb3N0UmVzaXplKG5ld1dpZHRoOiBudW1iZXIsIG5ld0hlaWdodDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAvLyB1bmJpbmQgcmVzaXplIGV2ZW50XHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLl9ldmVudC50cmFuc2l0aW9ucykpIHtcclxuICAgICAgdGhpcy5fZXZlbnQudHJhbnNpdGlvbnMuZm9yRWFjaCgoZXZlbnRIYW5kbGVyOiBhbnkpID0+IHtcclxuICAgICAgICBldmVudEhhbmRsZXIoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICB0aGlzLl9ldmVudC50cmFuc2l0aW9ucyA9IFtdO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3JlbmRlcmVyUmVmLnNldFN0eWxlKHRoaXMuX2RhdGFDb250YWluZXJFbGVtLm5hdGl2ZUVsZW1lbnQsICd3aWR0aCcsIGAke25ld1dpZHRofXB4YCk7XHJcbiAgICB0aGlzLl9zaG93SW1hZ2UoKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3Nob3dJbWFnZSgpOiB2b2lkIHtcclxuICAgIHRoaXMudWkuc2hvd1JlbG9hZGVyID0gZmFsc2U7XHJcbiAgICB0aGlzLl91cGRhdGVOYXYoKTtcclxuICAgIHRoaXMuX3VwZGF0ZURldGFpbHMoKTtcclxuICAgIGlmICghdGhpcy5vcHRpb25zLmRpc2FibGVLZXlib2FyZE5hdikge1xyXG4gICAgICB0aGlzLl9lbmFibGVLZXlib2FyZE5hdigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfcHJlcGFyZUNvbXBvbmVudCgpOiB2b2lkIHtcclxuICAgIC8vIGFkZCBjc3MzIGFuaW1hdGlvblxyXG4gICAgdGhpcy5fYWRkQ3NzQW5pbWF0aW9uKCk7XHJcblxyXG4gICAgLy8gcG9zaXRpb24gdGhlIGltYWdlIGFjY29yZGluZyB0byB1c2VyJ3Mgb3B0aW9uXHJcbiAgICB0aGlzLl9wb3NpdGlvbkxpZ2h0Qm94KCk7XHJcblxyXG4gICAgLy8gdXBkYXRlIGNvbnRyb2xzIHZpc2liaWxpdHkgb24gbmV4dCB2aWV3IGdlbmVyYXRpb25cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLnVpLnNob3dab29tQnV0dG9uID0gdGhpcy5vcHRpb25zLnNob3dab29tO1xyXG4gICAgICB0aGlzLnVpLnNob3dSb3RhdGVCdXR0b24gPSB0aGlzLm9wdGlvbnMuc2hvd1JvdGF0ZTtcclxuICAgIH0sIDApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfcG9zaXRpb25MaWdodEJveCgpOiB2b2lkIHtcclxuICAgIC8vIEBzZWUgaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzQ2NDg3Ni9qYXZhc2NyaXB0LWdldC13aW5kb3cteC15LXBvc2l0aW9uLWZvci1zY3JvbGxcclxuICAgIGNvbnN0IHRvcCA9ICh0aGlzLl93aW5kb3dSZWYucGFnZVlPZmZzZXQgfHwgdGhpcy5fZG9jdW1lbnRSZWYuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCkgK1xyXG4gICAgICB0aGlzLm9wdGlvbnMucG9zaXRpb25Gcm9tVG9wO1xyXG4gICAgY29uc3QgbGVmdCA9IHRoaXMuX3dpbmRvd1JlZi5wYWdlWE9mZnNldCB8fCB0aGlzLl9kb2N1bWVudFJlZi5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdDtcclxuXHJcbiAgICBpZiAoIXRoaXMub3B0aW9ucy5jZW50ZXJWZXJ0aWNhbGx5KSB7XHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyUmVmLnNldFN0eWxlKHRoaXMuX2xpZ2h0Ym94RWxlbS5uYXRpdmVFbGVtZW50LCAndG9wJywgYCR7dG9wfXB4YCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fcmVuZGVyZXJSZWYuc2V0U3R5bGUodGhpcy5fbGlnaHRib3hFbGVtLm5hdGl2ZUVsZW1lbnQsICdsZWZ0JywgYCR7bGVmdH1weGApO1xyXG4gICAgdGhpcy5fcmVuZGVyZXJSZWYuc2V0U3R5bGUodGhpcy5fbGlnaHRib3hFbGVtLm5hdGl2ZUVsZW1lbnQsICdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcblxyXG4gICAgLy8gZGlzYWJsZSBzY3JvbGxpbmcgb2YgdGhlIHBhZ2Ugd2hpbGUgb3BlblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5kaXNhYmxlU2Nyb2xsaW5nKSB7XHJcbiAgICAgIHRoaXMuX3JlbmRlcmVyUmVmLmFkZENsYXNzKHRoaXMuX2RvY3VtZW50UmVmLmRvY3VtZW50RWxlbWVudCwgJ2xiLWRpc2FibGUtc2Nyb2xsaW5nJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBhZGRDc3NBbmltYXRpb24gYWRkIGNzczMgY2xhc3NlcyBmb3IgYW5pbWF0ZSBsaWdodGJveFxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2FkZENzc0FuaW1hdGlvbigpOiB2b2lkIHtcclxuICAgIGNvbnN0IHJlc2l6ZUR1cmF0aW9uID0gdGhpcy5vcHRpb25zLnJlc2l6ZUR1cmF0aW9uO1xyXG4gICAgY29uc3QgZmFkZUR1cmF0aW9uID0gdGhpcy5vcHRpb25zLmZhZGVEdXJhdGlvbjtcclxuXHJcbiAgICB0aGlzLl9yZW5kZXJlclJlZi5zZXRTdHlsZSh0aGlzLl9saWdodGJveEVsZW0ubmF0aXZlRWxlbWVudCxcclxuICAgICAgJy13ZWJraXQtYW5pbWF0aW9uLWR1cmF0aW9uJywgYCR7ZmFkZUR1cmF0aW9ufXNgKTtcclxuICAgIHRoaXMuX3JlbmRlcmVyUmVmLnNldFN0eWxlKHRoaXMuX2xpZ2h0Ym94RWxlbS5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAnYW5pbWF0aW9uLWR1cmF0aW9uJywgYCR7ZmFkZUR1cmF0aW9ufXNgKTtcclxuICAgIHRoaXMuX3JlbmRlcmVyUmVmLnNldFN0eWxlKHRoaXMuX291dGVyQ29udGFpbmVyRWxlbS5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAnLXdlYmtpdC10cmFuc2l0aW9uLWR1cmF0aW9uJywgYCR7cmVzaXplRHVyYXRpb259c2ApO1xyXG4gICAgdGhpcy5fcmVuZGVyZXJSZWYuc2V0U3R5bGUodGhpcy5fb3V0ZXJDb250YWluZXJFbGVtLm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICd0cmFuc2l0aW9uLWR1cmF0aW9uJywgYCR7cmVzaXplRHVyYXRpb259c2ApO1xyXG4gICAgdGhpcy5fcmVuZGVyZXJSZWYuc2V0U3R5bGUodGhpcy5fZGF0YUNvbnRhaW5lckVsZW0ubmF0aXZlRWxlbWVudCxcclxuICAgICAgJy13ZWJraXQtYW5pbWF0aW9uLWR1cmF0aW9uJywgYCR7ZmFkZUR1cmF0aW9ufXNgKTtcclxuICAgIHRoaXMuX3JlbmRlcmVyUmVmLnNldFN0eWxlKHRoaXMuX2RhdGFDb250YWluZXJFbGVtLm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICdhbmltYXRpb24tZHVyYXRpb24nLCBgJHtmYWRlRHVyYXRpb259c2ApO1xyXG4gICAgdGhpcy5fcmVuZGVyZXJSZWYuc2V0U3R5bGUoKHRoaXMuX2ltYWdlRWxlbSB8fCB0aGlzLl9pZnJhbWVFbGVtKS5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAnLXdlYmtpdC1hbmltYXRpb24tZHVyYXRpb24nLCBgJHtmYWRlRHVyYXRpb259c2ApO1xyXG4gICAgdGhpcy5fcmVuZGVyZXJSZWYuc2V0U3R5bGUoKHRoaXMuX2ltYWdlRWxlbSB8fCB0aGlzLl9pZnJhbWVFbGVtKS5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAnYW5pbWF0aW9uLWR1cmF0aW9uJywgYCR7ZmFkZUR1cmF0aW9ufXNgKTtcclxuICAgIHRoaXMuX3JlbmRlcmVyUmVmLnNldFN0eWxlKHRoaXMuX2NhcHRpb25FbGVtLm5hdGl2ZUVsZW1lbnQsXHJcbiAgICAgICctd2Via2l0LWFuaW1hdGlvbi1kdXJhdGlvbicsIGAke2ZhZGVEdXJhdGlvbn1zYCk7XHJcbiAgICB0aGlzLl9yZW5kZXJlclJlZi5zZXRTdHlsZSh0aGlzLl9jYXB0aW9uRWxlbS5uYXRpdmVFbGVtZW50LFxyXG4gICAgICAnYW5pbWF0aW9uLWR1cmF0aW9uJywgYCR7ZmFkZUR1cmF0aW9ufXNgKTtcclxuICAgIHRoaXMuX3JlbmRlcmVyUmVmLnNldFN0eWxlKHRoaXMuX251bWJlckVsZW0ubmF0aXZlRWxlbWVudCxcclxuICAgICAgJy13ZWJraXQtYW5pbWF0aW9uLWR1cmF0aW9uJywgYCR7ZmFkZUR1cmF0aW9ufXNgKTtcclxuICAgIHRoaXMuX3JlbmRlcmVyUmVmLnNldFN0eWxlKHRoaXMuX251bWJlckVsZW0ubmF0aXZlRWxlbWVudCxcclxuICAgICAgJ2FuaW1hdGlvbi1kdXJhdGlvbicsIGAke2ZhZGVEdXJhdGlvbn1zYCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9lbmQoKTogdm9pZCB7XHJcbiAgICB0aGlzLnVpLmNsYXNzTGlzdCA9ICdsaWdodGJveCBhbmltYXRpb24gZmFkZU91dCc7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmRpc2FibGVTY3JvbGxpbmcpIHtcclxuICAgICAgdGhpcy5fcmVuZGVyZXJSZWYucmVtb3ZlQ2xhc3ModGhpcy5fZG9jdW1lbnRSZWYuZG9jdW1lbnRFbGVtZW50LCAnbGItZGlzYWJsZS1zY3JvbGxpbmcnKTtcclxuICAgIH1cclxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICB0aGlzLmNtcFJlZi5kZXN0cm95KCk7XHJcbiAgICB9LCB0aGlzLm9wdGlvbnMuZmFkZUR1cmF0aW9uICogMTAwMCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF91cGRhdGVEZXRhaWxzKCk6IHZvaWQge1xyXG4gICAgLy8gdXBkYXRlIHRoZSBjYXB0aW9uXHJcbiAgICBpZiAodHlwZW9mIHRoaXMuYWxidW1bdGhpcy5jdXJyZW50SW1hZ2VJbmRleF0uY2FwdGlvbiAhPT0gJ3VuZGVmaW5lZCcgJiZcclxuICAgICAgdGhpcy5hbGJ1bVt0aGlzLmN1cnJlbnRJbWFnZUluZGV4XS5jYXB0aW9uICE9PSAnJykge1xyXG4gICAgICB0aGlzLnVpLnNob3dDYXB0aW9uID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgdGhlIHBhZ2UgbnVtYmVyIGlmIHVzZXIgY2hvb3NlIHRvIGRvIHNvXHJcbiAgICAvLyBkb2VzIG5vdCBwZXJmb3JtIG51bWJlcmluZyB0aGUgcGFnZSBpZiB0aGVcclxuICAgIC8vIGFycmF5IGxlbmd0aCBpbiBhbGJ1bSA8PSAxXHJcbiAgICBpZiAodGhpcy5hbGJ1bS5sZW5ndGggPiAxICYmIHRoaXMub3B0aW9ucy5zaG93SW1hZ2VOdW1iZXJMYWJlbCkge1xyXG4gICAgICB0aGlzLnVpLnNob3dQYWdlTnVtYmVyID0gdHJ1ZTtcclxuICAgICAgdGhpcy5jb250ZW50LnBhZ2VOdW1iZXIgPSB0aGlzLl9hbGJ1bUxhYmVsKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9hbGJ1bUxhYmVsKCk6IHN0cmluZyB7XHJcbiAgICAvLyBkdWUgdG8ge3RoaXMuY3VycmVudEltYWdlSW5kZXh9IGlzIHNldCBmcm9tIDAgdG8ge3RoaXMuYWxidW0ubGVuZ3RofSAtIDFcclxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuYWxidW1MYWJlbC5yZXBsYWNlKC8lMS9nLCBOdW1iZXIodGhpcy5jdXJyZW50SW1hZ2VJbmRleCArIDEpKS5yZXBsYWNlKC8lMi9nLCB0aGlzLmFsYnVtLmxlbmd0aCk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9jaGFuZ2VJbWFnZShuZXdJbmRleDogbnVtYmVyKTogdm9pZCB7XHJcbiAgICB0aGlzLl9yZXNldEltYWdlKCk7XHJcbiAgICB0aGlzLmN1cnJlbnRJbWFnZUluZGV4ID0gbmV3SW5kZXg7XHJcbiAgICB0aGlzLl9oaWRlSW1hZ2UoKTtcclxuICAgIHRoaXMuX3JlZ2lzdGVySW1hZ2VMb2FkaW5nRXZlbnQoKTtcclxuICAgIHRoaXMuX2xpZ2h0Ym94RXZlbnQuYnJvYWRjYXN0TGlnaHRib3hFdmVudCh7IGlkOiBMSUdIVEJPWF9FVkVOVC5DSEFOR0VfUEFHRSwgZGF0YTogbmV3SW5kZXggfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9oaWRlSW1hZ2UoKTogdm9pZCB7XHJcbiAgICB0aGlzLnVpLnNob3dSZWxvYWRlciA9IHRydWU7XHJcbiAgICB0aGlzLnVpLnNob3dBcnJvd05hdiA9IGZhbHNlO1xyXG4gICAgdGhpcy51aS5zaG93TGVmdEFycm93ID0gZmFsc2U7XHJcbiAgICB0aGlzLnVpLnNob3dSaWdodEFycm93ID0gZmFsc2U7XHJcbiAgICB0aGlzLnVpLnNob3dQYWdlTnVtYmVyID0gZmFsc2U7XHJcbiAgICB0aGlzLnVpLnNob3dDYXB0aW9uID0gZmFsc2U7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF91cGRhdGVOYXYoKTogdm9pZCB7XHJcbiAgICBsZXQgYWx3YXlzU2hvd05hdiA9IGZhbHNlO1xyXG5cclxuICAgIC8vIGNoZWNrIHRvIHNlZSB0aGUgYnJvd3NlciBzdXBwb3J0IHRvdWNoIGV2ZW50XHJcbiAgICB0cnkge1xyXG4gICAgICB0aGlzLl9kb2N1bWVudFJlZi5jcmVhdGVFdmVudCgnVG91Y2hFdmVudCcpO1xyXG4gICAgICBhbHdheXNTaG93TmF2ID0gKHRoaXMub3B0aW9ucy5hbHdheXNTaG93TmF2T25Ub3VjaERldmljZXMpID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAvLyBub29wXHJcbiAgICB9XHJcblxyXG4gICAgLy8gaW5pdGlhbGx5IHNob3cgdGhlIGFycm93IG5hdlxyXG4gICAgLy8gd2hpY2ggaXMgdGhlIHBhcmVudCBvZiBib3RoIGxlZnQgYW5kIHJpZ2h0IG5hdlxyXG4gICAgdGhpcy5fc2hvd0Fycm93TmF2KCk7XHJcbiAgICBpZiAodGhpcy5hbGJ1bS5sZW5ndGggPiAxKSB7XHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCkge1xyXG4gICAgICAgIGlmIChhbHdheXNTaG93TmF2KSB7XHJcbiAgICAgICAgICAvLyBhbHRlcm5hdGl2ZXMgdGhpcy4kbGlnaHRib3guZmluZCgnLmxiLXByZXYsIC5sYi1uZXh0JykuY3NzKCdvcGFjaXR5JywgJzEnKTtcclxuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyUmVmLnNldFN0eWxlKHRoaXMuX2xlZnRBcnJvd0VsZW0ubmF0aXZlRWxlbWVudCwgJ29wYWNpdHknLCAnMScpO1xyXG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXJSZWYuc2V0U3R5bGUodGhpcy5fcmlnaHRBcnJvd0VsZW0ubmF0aXZlRWxlbWVudCwgJ29wYWNpdHknLCAnMScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gYWx0ZXJuYXRpdmVzIHRoaXMuJGxpZ2h0Ym94LmZpbmQoJy5sYi1wcmV2LCAubGItbmV4dCcpLnNob3coKTtcclxuICAgICAgICB0aGlzLl9zaG93TGVmdEFycm93TmF2KCk7XHJcbiAgICAgICAgdGhpcy5fc2hvd1JpZ2h0QXJyb3dOYXYoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50SW1hZ2VJbmRleCA+IDApIHtcclxuICAgICAgICAgIC8vIGFsdGVybmF0aXZlcyB0aGlzLiRsaWdodGJveC5maW5kKCcubGItcHJldicpLnNob3coKTtcclxuICAgICAgICAgIHRoaXMuX3Nob3dMZWZ0QXJyb3dOYXYoKTtcclxuICAgICAgICAgIGlmIChhbHdheXNTaG93TmF2KSB7XHJcbiAgICAgICAgICAgIC8vIGFsdGVybmF0aXZlcyB0aGlzLiRsaWdodGJveC5maW5kKCcubGItcHJldicpLmNzcygnb3BhY2l0eScsICcxJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyUmVmLnNldFN0eWxlKHRoaXMuX2xlZnRBcnJvd0VsZW0ubmF0aXZlRWxlbWVudCwgJ29wYWNpdHknLCAnMScpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEltYWdlSW5kZXggPCB0aGlzLmFsYnVtLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgIC8vIGFsdGVybmF0aXZlcyB0aGlzLiRsaWdodGJveC5maW5kKCcubGItbmV4dCcpLnNob3coKTtcclxuICAgICAgICAgIHRoaXMuX3Nob3dSaWdodEFycm93TmF2KCk7XHJcbiAgICAgICAgICBpZiAoYWx3YXlzU2hvd05hdikge1xyXG4gICAgICAgICAgICAvLyBhbHRlcm5hdGl2ZXMgdGhpcy4kbGlnaHRib3guZmluZCgnLmxiLW5leHQnKS5jc3MoJ29wYWNpdHknLCAnMScpO1xyXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlclJlZi5zZXRTdHlsZSh0aGlzLl9yaWdodEFycm93RWxlbS5uYXRpdmVFbGVtZW50LCAnb3BhY2l0eScsICcxJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zaG93TGVmdEFycm93TmF2KCk6IHZvaWQge1xyXG4gICAgdGhpcy51aS5zaG93TGVmdEFycm93ID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgX3Nob3dSaWdodEFycm93TmF2KCk6IHZvaWQge1xyXG4gICAgdGhpcy51aS5zaG93UmlnaHRBcnJvdyA9IHRydWU7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9zaG93QXJyb3dOYXYoKTogdm9pZCB7XHJcbiAgICB0aGlzLnVpLnNob3dBcnJvd05hdiA9ICh0aGlzLmFsYnVtLmxlbmd0aCAhPT0gMSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9lbmFibGVLZXlib2FyZE5hdigpOiB2b2lkIHtcclxuICAgIHRoaXMuX2V2ZW50LmtleXVwID0gdGhpcy5fcmVuZGVyZXJSZWYubGlzdGVuKCdkb2N1bWVudCcsICdrZXl1cCcsIChldmVudDogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMuX2tleWJvYXJkQWN0aW9uKGV2ZW50KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZGlzYWJsZUtleWJvYXJkTmF2KCk6IHZvaWQge1xyXG4gICAgaWYgKHRoaXMuX2V2ZW50LmtleXVwKSB7XHJcbiAgICAgIHRoaXMuX2V2ZW50LmtleXVwKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIF9rZXlib2FyZEFjdGlvbigkZXZlbnQ6IGFueSk6IHZvaWQge1xyXG4gICAgY29uc3QgS0VZQ09ERV9FU0MgPSAyNztcclxuICAgIGNvbnN0IEtFWUNPREVfTEVGVEFSUk9XID0gMzc7XHJcbiAgICBjb25zdCBLRVlDT0RFX1JJR0hUQVJST1cgPSAzOTtcclxuICAgIGNvbnN0IGtleWNvZGUgPSAkZXZlbnQua2V5Q29kZTtcclxuICAgIGNvbnN0IGtleSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoa2V5Y29kZSkudG9Mb3dlckNhc2UoKTtcclxuXHJcbiAgICBpZiAoa2V5Y29kZSA9PT0gS0VZQ09ERV9FU0MgfHwga2V5Lm1hdGNoKC94fG98Yy8pKSB7XHJcbiAgICAgIHRoaXMuX2xpZ2h0Ym94RXZlbnQuYnJvYWRjYXN0TGlnaHRib3hFdmVudCh7IGlkOiBMSUdIVEJPWF9FVkVOVC5DTE9TRSwgZGF0YTogbnVsbCB9KTtcclxuICAgIH0gZWxzZSBpZiAoa2V5ID09PSAncCcgfHwga2V5Y29kZSA9PT0gS0VZQ09ERV9MRUZUQVJST1cpIHtcclxuICAgICAgaWYgKHRoaXMuY3VycmVudEltYWdlSW5kZXggIT09IDApIHtcclxuICAgICAgICB0aGlzLl9jaGFuZ2VJbWFnZSh0aGlzLmN1cnJlbnRJbWFnZUluZGV4IC0gMSk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5vcHRpb25zLndyYXBBcm91bmQgJiYgdGhpcy5hbGJ1bS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgdGhpcy5fY2hhbmdlSW1hZ2UodGhpcy5hbGJ1bS5sZW5ndGggLSAxKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChrZXkgPT09ICduJyB8fCBrZXljb2RlID09PSBLRVlDT0RFX1JJR0hUQVJST1cpIHtcclxuICAgICAgaWYgKHRoaXMuY3VycmVudEltYWdlSW5kZXggIT09IHRoaXMuYWxidW0ubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgIHRoaXMuX2NoYW5nZUltYWdlKHRoaXMuY3VycmVudEltYWdlSW5kZXggKyAxKTtcclxuICAgICAgfSBlbHNlIGlmICh0aGlzLm9wdGlvbnMud3JhcEFyb3VuZCAmJiB0aGlzLmFsYnVtLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICB0aGlzLl9jaGFuZ2VJbWFnZSgwKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfZ2V0Q3NzU3R5bGVWYWx1ZShlbGVtOiBhbnksIHByb3BlcnR5TmFtZTogc3RyaW5nKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBwYXJzZUZsb2F0KHRoaXMuX3dpbmRvd1JlZlxyXG4gICAgICAuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtLm5hdGl2ZUVsZW1lbnQsIG51bGwpXHJcbiAgICAgIC5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5TmFtZSkpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBfb25SZWNlaXZlZEV2ZW50KGV2ZW50OiBJRXZlbnQpOiB2b2lkIHtcclxuICAgIHN3aXRjaCAoZXZlbnQuaWQpIHtcclxuICAgICAgY2FzZSBMSUdIVEJPWF9FVkVOVC5DTE9TRTpcclxuICAgICAgICB0aGlzLl9lbmQoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBuZWVkc0lmcmFtZShzcmM6IHN0cmluZykge1xyXG4gICAgLy8gY29uc3Qgc2FuaXRpemVkVXJsID0gdGhpcy5fc2FuaXRpemVyLnNhbml0aXplKFNlY3VyaXR5Q29udGV4dC5VUkwsIHNyYyk7XHJcbiAgICBpZiAoc3JjLm1hdGNoKC9cXC5wZGYkLykpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59XHJcbiIsIjxkaXYgY2xhc3M9XCJsYi1vdXRlckNvbnRhaW5lciB0cmFuc2l0aW9uXCIgI291dGVyQ29udGFpbmVyIGlkPVwib3V0ZXJDb250YWluZXJcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJsYi1jb250YWluZXJcIiAjY29udGFpbmVyIGlkPVwiY29udGFpbmVyXCI+XHJcbiAgICAgICAgPGltZyBjbGFzcz1cImxiLWltYWdlXCIgaWQ9XCJpbWFnZVwiIFtzcmNdPVwiYWxidW1bY3VycmVudEltYWdlSW5kZXhdLnNyY1wiIGNsYXNzPVwibGItaW1hZ2UgYW5pbWF0aW9uIGZhZGVJblwiXHJcbiAgICAgICAgICAgIFtoaWRkZW5dPVwidWkuc2hvd1JlbG9hZGVyXCIgI2ltYWdlXHJcbiAgICAgICAgICAgICpuZ0lmPVwiIWFsYnVtW2N1cnJlbnRJbWFnZUluZGV4XS5pZnJhbWUgJiYgIW5lZWRzSWZyYW1lKGFsYnVtW2N1cnJlbnRJbWFnZUluZGV4XS5zcmMpXCI+XHJcbiAgICAgICAgPGlmcmFtZSBjbGFzcz1cImxiLWltYWdlXCIgaWQ9XCJpZnJhbWVcIiBbc3JjXT1cImFsYnVtW2N1cnJlbnRJbWFnZUluZGV4XS5zcmMgfCBzYWZlXCJcclxuICAgICAgICAgICAgY2xhc3M9XCJsYi1pbWFnZSBsYi1pZnJhbWUgYW5pbWF0aW9uIGZhZGVJblwiIFtoaWRkZW5dPVwidWkuc2hvd1JlbG9hZGVyXCIgI2lmcmFtZVxyXG4gICAgICAgICAgICAqbmdJZj1cImFsYnVtW2N1cnJlbnRJbWFnZUluZGV4XS5pZnJhbWUgfHwgbmVlZHNJZnJhbWUoYWxidW1bY3VycmVudEltYWdlSW5kZXhdLnNyYylcIj5cclxuICAgICAgICA8L2lmcmFtZT5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibGItbmF2XCIgW2hpZGRlbl09XCIhdWkuc2hvd0Fycm93TmF2XCIgI25hdkFycm93PlxyXG4gICAgICAgICAgICA8YSBjbGFzcz1cImxiLXByZXZcIiBbaGlkZGVuXT1cIiF1aS5zaG93TGVmdEFycm93XCIgKGNsaWNrKT1cInByZXZJbWFnZSgpXCIgI2xlZnRBcnJvdz48L2E+XHJcbiAgICAgICAgICAgIDxhIGNsYXNzPVwibGItbmV4dFwiIFtoaWRkZW5dPVwiIXVpLnNob3dSaWdodEFycm93XCIgKGNsaWNrKT1cIm5leHRJbWFnZSgpXCIgI3JpZ2h0QXJyb3c+PC9hPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJsYi1sb2FkZXJcIiBbaGlkZGVuXT1cIiF1aS5zaG93UmVsb2FkZXJcIiAoY2xpY2spPVwiY2xvc2UoJGV2ZW50KVwiPlxyXG4gICAgICAgICAgICA8YSBjbGFzcz1cImxiLWNhbmNlbFwiPjwvYT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG48L2Rpdj5cclxuPGRpdiBjbGFzcz1cImxiLWRhdGFDb250YWluZXJcIiBbaGlkZGVuXT1cInVpLnNob3dSZWxvYWRlclwiICNkYXRhQ29udGFpbmVyPlxyXG4gICAgPGRpdiBjbGFzcz1cImxiLWRhdGFcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwibGItZGV0YWlsc1wiPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImxiLWNhcHRpb24gYW5pbWF0aW9uIGZhZGVJblwiIFtoaWRkZW5dPVwiIXVpLnNob3dDYXB0aW9uXCJcclxuICAgICAgICAgICAgICAgIFtpbm5lckh0bWxdPVwiYWxidW1bY3VycmVudEltYWdlSW5kZXhdLmNhcHRpb25cIiAjY2FwdGlvbj5cclxuICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImxiLW51bWJlciBhbmltYXRpb24gZmFkZUluXCIgW2hpZGRlbl09XCIhdWkuc2hvd1BhZ2VOdW1iZXJcIiAjbnVtYmVyPnt7IGNvbnRlbnQucGFnZU51bWJlclxyXG4gICAgICAgICAgICAgICAgfX08L3NwYW4+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImxiLWNvbnRyb2xDb250YWluZXJcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxiLWNsb3NlQ29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICA8YSBjbGFzcz1cImxiLWNsb3NlXCIgKGNsaWNrKT1cImNsb3NlKCRldmVudClcIj48L2E+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGItdHVybkNvbnRhaW5lclwiIFtoaWRkZW5dPVwiIXVpLnNob3dSb3RhdGVCdXR0b25cIj5cclxuICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibGItdHVybkxlZnRcIiAoY2xpY2spPVwiY29udHJvbCgkZXZlbnQpXCI+PC9hPlxyXG4gICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJsYi10dXJuUmlnaHRcIiAoY2xpY2spPVwiY29udHJvbCgkZXZlbnQpXCI+PC9hPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImxiLXpvb21Db250YWluZXJcIiBbaGlkZGVuXT1cIiF1aS5zaG93Wm9vbUJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJsYi16b29tT3V0XCIgKGNsaWNrKT1cImNvbnRyb2woJGV2ZW50KVwiPjwvYT5cclxuICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwibGItem9vbUluXCIgKGNsaWNrKT1cImNvbnRyb2woJGV2ZW50KVwiPjwvYT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuPC9kaXY+Il19