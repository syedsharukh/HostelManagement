/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
// tslint:disable:max-file-line-count
/***
 * pause (not yet supported) (?string='hover') - event group name which pauses
 * the cycling of the carousel, if hover pauses on mouseenter and resumes on
 * mouseleave keyboard (not yet supported) (?boolean=true) - if false
 * carousel will not react to keyboard events
 * note: swiping not yet supported
 */
/****
 * Problems:
 * 1) if we set an active slide via model changes, .active class remains on a
 * current slide.
 * 2) if we have only one slide, we shouldn't show prev/next nav buttons
 * 3) if first or last slide is active and noWrap is true, there should be
 * "disabled" class on the nav buttons.
 * 4) default interval should be equal 5000
 */
import { Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { isBs3, LinkedList } from 'ngx-bootstrap/utils';
import { CarouselConfig } from './carousel.config';
import { findLastIndex, chunkByNumber } from './utils';
/** @enum {number} */
var Direction = {
    UNKNOWN: 0,
    NEXT: 1,
    PREV: 2,
};
export { Direction };
Direction[Direction.UNKNOWN] = 'UNKNOWN';
Direction[Direction.NEXT] = 'NEXT';
Direction[Direction.PREV] = 'PREV';
/**
 * Base element to create carousel
 */
var CarouselComponent = /** @class */ (function () {
    function CarouselComponent(config, ngZone) {
        this.ngZone = ngZone;
        /* If value more then 1 — carousel works in multilist mode */
        this.itemsPerSlide = 1;
        /* If `true` — carousel shifts by one element. By default carousel shifts by number
             of visible elements (itemsPerSlide field) */
        this.singleSlideOffset = false;
        /**
         * Will be emitted when active slide has been changed. Part of two-way-bindable [(activeSlide)] property
         */
        this.activeSlideChange = new EventEmitter(false);
        /**
         * Will be emitted when active slides has been changed in multilist mode
         */
        this.slideRangeChange = new EventEmitter();
        /* Index to start display slides from it */
        this.startFromIndex = 0;
        this._slides = new LinkedList();
        this._currentVisibleSlidesIndex = 0;
        this.destroyed = false;
        this.getActive = function (slide) { return slide.active; };
        this.makeSlidesConsistent = function (slides) {
            slides.forEach(function (slide, index) { return slide.item.order = index; });
        };
        Object.assign(this, config);
    }
    Object.defineProperty(CarouselComponent.prototype, "activeSlide", {
        get: /**
         * @return {?}
         */
        function () {
            return this._currentActiveSlide;
        },
        /** Index of currently displayed slide(started for 0) */
        set: /**
         * Index of currently displayed slide(started for 0)
         * @param {?} index
         * @return {?}
         */
        function (index) {
            if (this.multilist) {
                return;
            }
            if (this._slides.length && index !== this._currentActiveSlide) {
                this._select(index);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarouselComponent.prototype, "interval", {
        /**
         * Delay of item cycling in milliseconds. If false, carousel won't cycle
         * automatically.
         */
        get: /**
         * Delay of item cycling in milliseconds. If false, carousel won't cycle
         * automatically.
         * @return {?}
         */
        function () {
            return this._interval;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._interval = value;
            this.restartTimer();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarouselComponent.prototype, "slides", {
        get: /**
         * @return {?}
         */
        function () {
            return this._slides.toArray();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CarouselComponent.prototype, "isBs4", {
        get: /**
         * @return {?}
         */
        function () {
            return !isBs3();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CarouselComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            if (_this.multilist) {
                _this._chunkedSlides = chunkByNumber(_this.mapSlidesAndIndexes(), _this.itemsPerSlide);
                _this.selectInitialSlides();
            }
        }, 0);
    };
    /**
     * @return {?}
     */
    CarouselComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroyed = true;
    };
    /**
     * Adds new slide. If this slide is first in collection - set it as active
     * and starts auto changing
     * @param slide
     */
    /**
     * Adds new slide. If this slide is first in collection - set it as active
     * and starts auto changing
     * @param {?} slide
     * @return {?}
     */
    CarouselComponent.prototype.addSlide = /**
     * Adds new slide. If this slide is first in collection - set it as active
     * and starts auto changing
     * @param {?} slide
     * @return {?}
     */
    function (slide) {
        this._slides.add(slide);
        if (this.multilist && this._slides.length <= this.itemsPerSlide) {
            slide.active = true;
        }
        if (!this.multilist && this._slides.length === 1) {
            this._currentActiveSlide = undefined;
            this.activeSlide = 0;
            this.play();
        }
    };
    /**
     * Removes specified slide. If this slide is active - will roll to another
     * slide
     * @param slide
     */
    /**
     * Removes specified slide. If this slide is active - will roll to another
     * slide
     * @param {?} slide
     * @return {?}
     */
    CarouselComponent.prototype.removeSlide = /**
     * Removes specified slide. If this slide is active - will roll to another
     * slide
     * @param {?} slide
     * @return {?}
     */
    function (slide) {
        var _this = this;
        /** @type {?} */
        var remIndex = this._slides.indexOf(slide);
        if (this._currentActiveSlide === remIndex) {
            // removing of active slide
            /** @type {?} */
            var nextSlideIndex_1 = void 0;
            if (this._slides.length > 1) {
                // if this slide last - will roll to first slide, if noWrap flag is
                // FALSE or to previous, if noWrap is TRUE in case, if this slide in
                // middle of collection, index of next slide is same to removed
                nextSlideIndex_1 = !this.isLast(remIndex)
                    ? remIndex
                    : this.noWrap ? remIndex - 1 : 0;
            }
            this._slides.remove(remIndex);
            // prevents exception with changing some value after checking
            setTimeout(function () {
                _this._select(nextSlideIndex_1);
            }, 0);
        }
        else {
            this._slides.remove(remIndex);
            /** @type {?} */
            var currentSlideIndex_1 = this.getCurrentSlideIndex();
            setTimeout(function () {
                // after removing, need to actualize index of current active slide
                _this._currentActiveSlide = currentSlideIndex_1;
                _this.activeSlideChange.emit(_this._currentActiveSlide);
            }, 0);
        }
    };
    /**
     * Rolling to next slide
     * @param force: {boolean} if true - will ignore noWrap flag
     */
    /**
     * Rolling to next slide
     * @param {?=} force
     * @return {?}
     */
    CarouselComponent.prototype.nextSlide = /**
     * Rolling to next slide
     * @param {?=} force
     * @return {?}
     */
    function (force) {
        if (force === void 0) { force = false; }
        this.move(Direction.NEXT, force);
    };
    /**
     * Rolling to previous slide
     * @param force: {boolean} if true - will ignore noWrap flag
     */
    /**
     * Rolling to previous slide
     * @param {?=} force
     * @return {?}
     */
    CarouselComponent.prototype.previousSlide = /**
     * Rolling to previous slide
     * @param {?=} force
     * @return {?}
     */
    function (force) {
        if (force === void 0) { force = false; }
        this.move(Direction.PREV, force);
    };
    /**
     * @return {?}
     */
    CarouselComponent.prototype.getFirstVisibleIndex = /**
     * @return {?}
     */
    function () {
        return this.slides.findIndex(this.getActive);
    };
    /**
     * @return {?}
     */
    CarouselComponent.prototype.getLastVisibleIndex = /**
     * @return {?}
     */
    function () {
        return findLastIndex(this.slides, this.getActive);
    };
    /**
     * @param {?} direction
     * @param {?=} force
     * @return {?}
     */
    CarouselComponent.prototype.move = /**
     * @param {?} direction
     * @param {?=} force
     * @return {?}
     */
    function (direction, force) {
        if (force === void 0) { force = false; }
        /** @type {?} */
        var firstVisibleIndex = this.getFirstVisibleIndex();
        /** @type {?} */
        var lastVisibleIndex = this.getLastVisibleIndex();
        if (this.noWrap) {
            if (direction === Direction.NEXT &&
                this.isLast(lastVisibleIndex) ||
                direction === Direction.PREV &&
                    firstVisibleIndex === 0) {
                return;
            }
        }
        if (!this.multilist) {
            this.activeSlide = this.findNextSlideIndex(direction, force);
        }
        else {
            this.moveMultilist(direction);
        }
    };
    /**
     * Rolling to specified slide
     * @param index: {number} index of slide, which must be shown
     */
    /**
     * Rolling to specified slide
     * @param {?} index
     * @return {?}
     */
    CarouselComponent.prototype.selectSlide = /**
     * Rolling to specified slide
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (!this.multilist) {
            this.activeSlide = index;
        }
        else {
            this.selectSlideRange(index);
        }
    };
    /**
     * Starts a auto changing of slides
     */
    /**
     * Starts a auto changing of slides
     * @return {?}
     */
    CarouselComponent.prototype.play = /**
     * Starts a auto changing of slides
     * @return {?}
     */
    function () {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.restartTimer();
        }
    };
    /**
     * Stops a auto changing of slides
     */
    /**
     * Stops a auto changing of slides
     * @return {?}
     */
    CarouselComponent.prototype.pause = /**
     * Stops a auto changing of slides
     * @return {?}
     */
    function () {
        if (!this.noPause) {
            this.isPlaying = false;
            this.resetTimer();
        }
    };
    /**
     * Finds and returns index of currently displayed slide
     */
    /**
     * Finds and returns index of currently displayed slide
     * @return {?}
     */
    CarouselComponent.prototype.getCurrentSlideIndex = /**
     * Finds and returns index of currently displayed slide
     * @return {?}
     */
    function () {
        return this._slides.findIndex(this.getActive);
    };
    /**
     * Defines, whether the specified index is last in collection
     * @param index
     */
    /**
     * Defines, whether the specified index is last in collection
     * @param {?} index
     * @return {?}
     */
    CarouselComponent.prototype.isLast = /**
     * Defines, whether the specified index is last in collection
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return index + 1 >= this._slides.length;
    };
    /**
     * Defines, whether the specified index is first in collection
     * @param index
     */
    /**
     * Defines, whether the specified index is first in collection
     * @param {?} index
     * @return {?}
     */
    CarouselComponent.prototype.isFirst = /**
     * Defines, whether the specified index is first in collection
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return index === 0;
    };
    /**
     * @private
     * @return {?}
     */
    CarouselComponent.prototype.selectInitialSlides = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var startIndex = this.startFromIndex <= this._slides.length
            ? this.startFromIndex
            : 0;
        this.hideSlides();
        if (this.singleSlideOffset) {
            this._slidesWithIndexes = this.mapSlidesAndIndexes();
            if (this._slides.length - startIndex < this.itemsPerSlide) {
                /** @type {?} */
                var slidesToAppend = this._slidesWithIndexes.slice(0, startIndex);
                this._slidesWithIndexes = tslib_1.__spread(this._slidesWithIndexes, slidesToAppend).slice(slidesToAppend.length)
                    .slice(0, this.itemsPerSlide);
            }
            else {
                this._slidesWithIndexes = this._slidesWithIndexes.slice(startIndex, startIndex + this.itemsPerSlide);
            }
            this._slidesWithIndexes.forEach(function (slide) { return slide.item.active = true; });
            this.makeSlidesConsistent(this._slidesWithIndexes);
        }
        else {
            this.selectRangeByNestedIndex(startIndex);
        }
        this.slideRangeChange.emit(this.getVisibleIndexes());
    };
    /**
     * Defines next slide index, depending of direction
     * @param direction: Direction(UNKNOWN|PREV|NEXT)
     * @param force: {boolean} if TRUE - will ignore noWrap flag, else will
     *   return undefined if next slide require wrapping
     */
    /**
     * Defines next slide index, depending of direction
     * @private
     * @param {?} direction
     * @param {?} force
     * @return {?}
     */
    CarouselComponent.prototype.findNextSlideIndex = /**
     * Defines next slide index, depending of direction
     * @private
     * @param {?} direction
     * @param {?} force
     * @return {?}
     */
    function (direction, force) {
        /** @type {?} */
        var nextSlideIndex = 0;
        if (!force &&
            (this.isLast(this.activeSlide) &&
                direction !== Direction.PREV &&
                this.noWrap)) {
            return undefined;
        }
        switch (direction) {
            case Direction.NEXT:
                // if this is last slide, not force, looping is disabled
                // and need to going forward - select current slide, as a next
                nextSlideIndex = !this.isLast(this._currentActiveSlide)
                    ? this._currentActiveSlide + 1
                    : !force && this.noWrap ? this._currentActiveSlide : 0;
                break;
            case Direction.PREV:
                // if this is first slide, not force, looping is disabled
                // and need to going backward - select current slide, as a next
                nextSlideIndex =
                    this._currentActiveSlide > 0
                        ? this._currentActiveSlide - 1
                        : !force && this.noWrap
                            ? this._currentActiveSlide
                            : this._slides.length - 1;
                break;
            default:
                throw new Error('Unknown direction');
        }
        return nextSlideIndex;
    };
    /**
     * @private
     * @return {?}
     */
    CarouselComponent.prototype.mapSlidesAndIndexes = /**
     * @private
     * @return {?}
     */
    function () {
        return this.slides
            .slice()
            .map(function (slide, index) {
            return {
                index: index,
                item: slide
            };
        });
    };
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    CarouselComponent.prototype.selectSlideRange = /**
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (this.isIndexInRange(index)) {
            return;
        }
        this.hideSlides();
        if (!this.singleSlideOffset) {
            this.selectRangeByNestedIndex(index);
        }
        else {
            /** @type {?} */
            var startIndex = this.isIndexOnTheEdges(index)
                ? index
                : index - this.itemsPerSlide + 1;
            /** @type {?} */
            var endIndex = this.isIndexOnTheEdges(index)
                ? index + this.itemsPerSlide
                : index + 1;
            this._slidesWithIndexes = this.mapSlidesAndIndexes().slice(startIndex, endIndex);
            this.makeSlidesConsistent(this._slidesWithIndexes);
            this._slidesWithIndexes.forEach(function (slide) { return slide.item.active = true; });
        }
        this.slideRangeChange.emit(this.getVisibleIndexes());
    };
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    CarouselComponent.prototype.selectRangeByNestedIndex = /**
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var selectedRange = this._chunkedSlides
            .map(function (slidesList, i) {
            return {
                index: i,
                list: slidesList
            };
        })
            .find(function (slidesList) {
            return slidesList.list.find(function (slide) { return slide.index === index; }) !== undefined;
        });
        this._currentVisibleSlidesIndex = selectedRange.index;
        this._chunkedSlides[selectedRange.index].forEach(function (slide) {
            slide.item.active = true;
        });
    };
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    CarouselComponent.prototype.isIndexOnTheEdges = /**
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return (index + 1 - this.itemsPerSlide <= 0 ||
            index + this.itemsPerSlide <= this._slides.length);
    };
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    CarouselComponent.prototype.isIndexInRange = /**
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (this.singleSlideOffset) {
            /** @type {?} */
            var visibleIndexes = this._slidesWithIndexes.map(function (slide) { return slide.index; });
            return visibleIndexes.indexOf(index) >= 0;
        }
        return (index <= this.getLastVisibleIndex() &&
            index >= this.getFirstVisibleIndex());
    };
    /**
     * @private
     * @return {?}
     */
    CarouselComponent.prototype.hideSlides = /**
     * @private
     * @return {?}
     */
    function () {
        this.slides.forEach(function (slide) { return slide.active = false; });
    };
    /**
     * @private
     * @return {?}
     */
    CarouselComponent.prototype.isVisibleSlideListLast = /**
     * @private
     * @return {?}
     */
    function () {
        return this._currentVisibleSlidesIndex === this._chunkedSlides.length - 1;
    };
    /**
     * @private
     * @return {?}
     */
    CarouselComponent.prototype.isVisibleSlideListFirst = /**
     * @private
     * @return {?}
     */
    function () {
        return this._currentVisibleSlidesIndex === 0;
    };
    /**
     * @private
     * @param {?} direction
     * @return {?}
     */
    CarouselComponent.prototype.moveSliderByOneItem = /**
     * @private
     * @param {?} direction
     * @return {?}
     */
    function (direction) {
        /** @type {?} */
        var firstVisibleIndex;
        /** @type {?} */
        var lastVisibleIndex;
        /** @type {?} */
        var indexToHide;
        /** @type {?} */
        var indexToShow;
        if (this.noWrap) {
            firstVisibleIndex = this.getFirstVisibleIndex();
            lastVisibleIndex = this.getLastVisibleIndex();
            indexToHide = direction === Direction.NEXT
                ? firstVisibleIndex
                : lastVisibleIndex;
            indexToShow = direction !== Direction.NEXT
                ? firstVisibleIndex - 1
                : !this.isLast(lastVisibleIndex)
                    ? lastVisibleIndex + 1 : 0;
            this._slides.get(indexToHide).active = false;
            this._slides.get(indexToShow).active = true;
            /** @type {?} */
            var slidesToReorder = this.mapSlidesAndIndexes().filter(function (slide) { return slide.item.active; });
            this.makeSlidesConsistent(slidesToReorder);
            this.slideRangeChange.emit(this.getVisibleIndexes());
        }
        else {
            /** @type {?} */
            var displayedIndex = void 0;
            firstVisibleIndex = this._slidesWithIndexes[0].index;
            lastVisibleIndex = this._slidesWithIndexes[this._slidesWithIndexes.length - 1].index;
            if (direction === Direction.NEXT) {
                this._slidesWithIndexes.shift();
                displayedIndex = this.isLast(lastVisibleIndex)
                    ? 0
                    : lastVisibleIndex + 1;
                this._slidesWithIndexes.push({
                    index: displayedIndex,
                    item: this._slides.get(displayedIndex)
                });
            }
            else {
                this._slidesWithIndexes.pop();
                displayedIndex = this.isFirst(firstVisibleIndex)
                    ? this._slides.length - 1
                    : firstVisibleIndex - 1;
                this._slidesWithIndexes = tslib_1.__spread([{
                        index: displayedIndex,
                        item: this._slides.get(displayedIndex)
                    }], this._slidesWithIndexes);
            }
            this.hideSlides();
            this._slidesWithIndexes.forEach(function (slide) { return slide.item.active = true; });
            this.makeSlidesConsistent(this._slidesWithIndexes);
            this.slideRangeChange.emit(this._slidesWithIndexes.map(function (slide) { return slide.index; }));
        }
    };
    /**
     * @private
     * @param {?} direction
     * @return {?}
     */
    CarouselComponent.prototype.moveMultilist = /**
     * @private
     * @param {?} direction
     * @return {?}
     */
    function (direction) {
        if (this.singleSlideOffset) {
            this.moveSliderByOneItem(direction);
        }
        else {
            this.hideSlides();
            if (this.noWrap) {
                this._currentVisibleSlidesIndex = direction === Direction.NEXT
                    ? this._currentVisibleSlidesIndex + 1
                    : this._currentVisibleSlidesIndex - 1;
            }
            else {
                if (direction === Direction.NEXT) {
                    this._currentVisibleSlidesIndex = this.isVisibleSlideListLast()
                        ? 0
                        : this._currentVisibleSlidesIndex + 1;
                }
                else {
                    this._currentVisibleSlidesIndex = this.isVisibleSlideListFirst()
                        ? this._chunkedSlides.length - 1
                        : this._currentVisibleSlidesIndex - 1;
                }
            }
            this._chunkedSlides[this._currentVisibleSlidesIndex].forEach(function (slide) { return slide.item.active = true; });
            this.slideRangeChange.emit(this.getVisibleIndexes());
        }
    };
    /**
     * @private
     * @return {?}
     */
    CarouselComponent.prototype.getVisibleIndexes = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.singleSlideOffset) {
            return this._chunkedSlides[this._currentVisibleSlidesIndex]
                .map(function (slide) { return slide.index; });
        }
        else {
            return this._slidesWithIndexes.map(function (slide) { return slide.index; });
        }
    };
    /**
     * Sets a slide, which specified through index, as active
     * @param index
     */
    /**
     * Sets a slide, which specified through index, as active
     * @private
     * @param {?} index
     * @return {?}
     */
    CarouselComponent.prototype._select = /**
     * Sets a slide, which specified through index, as active
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (isNaN(index)) {
            this.pause();
            return;
        }
        if (!this.multilist) {
            /** @type {?} */
            var currentSlide = this._slides.get(this._currentActiveSlide);
            if (currentSlide) {
                currentSlide.active = false;
            }
        }
        /** @type {?} */
        var nextSlide = this._slides.get(index);
        if (nextSlide) {
            this._currentActiveSlide = index;
            nextSlide.active = true;
            this.activeSlide = index;
            this.activeSlideChange.emit(index);
        }
    };
    /**
     * Starts loop of auto changing of slides
     */
    /**
     * Starts loop of auto changing of slides
     * @private
     * @return {?}
     */
    CarouselComponent.prototype.restartTimer = /**
     * Starts loop of auto changing of slides
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.resetTimer();
        /** @type {?} */
        var interval = +this.interval;
        if (!isNaN(interval) && interval > 0) {
            this.currentInterval = this.ngZone.runOutsideAngular(function () {
                return setInterval(function () {
                    /** @type {?} */
                    var nInterval = +_this.interval;
                    _this.ngZone.run(function () {
                        if (_this.isPlaying &&
                            !isNaN(_this.interval) &&
                            nInterval > 0 &&
                            _this.slides.length) {
                            _this.nextSlide();
                        }
                        else {
                            _this.pause();
                        }
                    });
                }, interval);
            });
        }
    };
    Object.defineProperty(CarouselComponent.prototype, "multilist", {
        get: /**
         * @return {?}
         */
        function () {
            return this.itemsPerSlide > 1;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Stops loop of auto changing of slides
     */
    /**
     * Stops loop of auto changing of slides
     * @private
     * @return {?}
     */
    CarouselComponent.prototype.resetTimer = /**
     * Stops loop of auto changing of slides
     * @private
     * @return {?}
     */
    function () {
        if (this.currentInterval) {
            clearInterval(this.currentInterval);
            this.currentInterval = void 0;
        }
    };
    CarouselComponent.decorators = [
        { type: Component, args: [{
                    selector: 'carousel',
                    template: "<div (mouseenter)=\"pause()\" (mouseleave)=\"play()\" (mouseup)=\"play()\" class=\"carousel slide\">\n  <ol class=\"carousel-indicators\" *ngIf=\"showIndicators && slides.length > 1\">\n    <li *ngFor=\"let slidez of slides; let i = index;\" [class.active]=\"slidez.active === true\" (click)=\"selectSlide(i)\"></li>\n  </ol>\n  <div class=\"carousel-inner\" [ngStyle]=\"{'display': multilist ? 'flex' : 'block'}\"><ng-content></ng-content></div>\n  <a class=\"left carousel-control carousel-control-prev\" [class.disabled]=\"activeSlide === 0 && noWrap\" (click)=\"previousSlide()\" *ngIf=\"slides.length > 1\">\n    <span class=\"icon-prev carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n    <span *ngIf=\"isBs4\" class=\"sr-only\">Previous</span>\n  </a>\n  <a class=\"right carousel-control carousel-control-next\" (click)=\"nextSlide()\"  [class.disabled]=\"isLast(activeSlide) && noWrap\" *ngIf=\"slides.length > 1\">\n    <span class=\"icon-next carousel-control-next-icon\" aria-hidden=\"true\"></span>\n    <span class=\"sr-only\">Next</span>\n  </a>\n</div>\n\n\n"
                }] }
    ];
    /** @nocollapse */
    CarouselComponent.ctorParameters = function () { return [
        { type: CarouselConfig },
        { type: NgZone }
    ]; };
    CarouselComponent.propDecorators = {
        noWrap: [{ type: Input }],
        noPause: [{ type: Input }],
        showIndicators: [{ type: Input }],
        itemsPerSlide: [{ type: Input }],
        singleSlideOffset: [{ type: Input }],
        activeSlideChange: [{ type: Output }],
        slideRangeChange: [{ type: Output }],
        activeSlide: [{ type: Input }],
        startFromIndex: [{ type: Input }],
        interval: [{ type: Input }]
    };
    return CarouselComponent;
}());
export { CarouselComponent };
if (false) {
    /** @type {?} */
    CarouselComponent.prototype.noWrap;
    /** @type {?} */
    CarouselComponent.prototype.noPause;
    /** @type {?} */
    CarouselComponent.prototype.showIndicators;
    /** @type {?} */
    CarouselComponent.prototype.itemsPerSlide;
    /** @type {?} */
    CarouselComponent.prototype.singleSlideOffset;
    /**
     * Will be emitted when active slide has been changed. Part of two-way-bindable [(activeSlide)] property
     * @type {?}
     */
    CarouselComponent.prototype.activeSlideChange;
    /**
     * Will be emitted when active slides has been changed in multilist mode
     * @type {?}
     */
    CarouselComponent.prototype.slideRangeChange;
    /** @type {?} */
    CarouselComponent.prototype.startFromIndex;
    /**
     * @type {?}
     * @protected
     */
    CarouselComponent.prototype.currentInterval;
    /**
     * @type {?}
     * @protected
     */
    CarouselComponent.prototype._currentActiveSlide;
    /**
     * @type {?}
     * @protected
     */
    CarouselComponent.prototype._interval;
    /**
     * @type {?}
     * @protected
     */
    CarouselComponent.prototype._slides;
    /**
     * @type {?}
     * @protected
     */
    CarouselComponent.prototype._chunkedSlides;
    /**
     * @type {?}
     * @protected
     */
    CarouselComponent.prototype._slidesWithIndexes;
    /**
     * @type {?}
     * @protected
     */
    CarouselComponent.prototype._currentVisibleSlidesIndex;
    /**
     * @type {?}
     * @protected
     */
    CarouselComponent.prototype.isPlaying;
    /**
     * @type {?}
     * @protected
     */
    CarouselComponent.prototype.destroyed;
    /** @type {?} */
    CarouselComponent.prototype.getActive;
    /**
     * @type {?}
     * @private
     */
    CarouselComponent.prototype.makeSlidesConsistent;
    /**
     * @type {?}
     * @private
     */
    CarouselComponent.prototype.ngZone;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWJvb3RzdHJhcC9jYXJvdXNlbC8iLCJzb3VyY2VzIjpbImNhcm91c2VsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBLE9BQU8sRUFDTCxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQWEsTUFBTSxFQUMxRCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBRXhELE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsYUFBYSxFQUFFLGFBQWEsRUFBRSxNQUFNLFNBQVMsQ0FBQzs7O0lBSXJELFVBQU87SUFDUCxPQUFJO0lBQ0osT0FBSTs7Ozs7Ozs7O0FBTU47SUE2RUUsMkJBQVksTUFBc0IsRUFBVSxNQUFjO1FBQWQsV0FBTSxHQUFOLE1BQU0sQ0FBUTs7UUFqRWpELGtCQUFhLEdBQUcsQ0FBQyxDQUFDOzs7UUFHbEIsc0JBQWlCLEdBQUcsS0FBSyxDQUFDOzs7O1FBSW5DLHNCQUFpQixHQUF5QixJQUFJLFlBQVksQ0FBUyxLQUFLLENBQUMsQ0FBQzs7OztRQUkxRSxxQkFBZ0IsR0FBMkIsSUFBSSxZQUFZLEVBQVksQ0FBQzs7UUFtQnhFLG1CQUFjLEdBQUcsQ0FBQyxDQUFDO1FBd0JULFlBQU8sR0FBK0IsSUFBSSxVQUFVLEVBQWtCLENBQUM7UUFHdkUsK0JBQTBCLEdBQUcsQ0FBQyxDQUFDO1FBRS9CLGNBQVMsR0FBRyxLQUFLLENBQUM7UUF5RzVCLGNBQVMsR0FBRyxVQUFDLEtBQXFCLElBQUssT0FBQSxLQUFLLENBQUMsTUFBTSxFQUFaLENBQVksQ0FBQztRQStUNUMseUJBQW9CLEdBQUcsVUFBQyxNQUF3QjtZQUN0RCxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMs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QWlCOzs7SUFFNUIsbUNBQXlCOztJQUV6QixvQ0FBMEI7O0lBRTFCLDJDQUFpQzs7SUFFakMsMENBQTJCOztJQUczQiw4Q0FBbUM7Ozs7O0lBR25DLDhDQUMwRTs7Ozs7SUFHMUUsNkNBQ3dFOztJQWtCeEUsMkNBQ21COzs7OztJQXFCbkIsNENBQStCOzs7OztJQUMvQixnREFBc0M7Ozs7O0lBQ3RDLHNDQUE0Qjs7Ozs7SUFDNUIsb0NBQWlGOzs7OztJQUNqRiwyQ0FBNkM7Ozs7O0lBQzdDLCtDQUErQzs7Ozs7SUFDL0MsdURBQXlDOzs7OztJQUN6QyxzQ0FBNkI7Ozs7O0lBQzdCLHNDQUE0Qjs7SUF5RzVCLHNDQUFvRDs7Ozs7SUErVHBELGlEQUVDOzs7OztJQXBhbUMsbUNBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLy8gdHNsaW50OmRpc2FibGU6bWF4LWZpbGUtbGluZS1jb3VudFxuLyoqKlxuICogcGF1c2UgKG5vdCB5ZXQgc3VwcG9ydGVkKSAoP3N0cmluZz0naG92ZXInKSAtIGV2ZW50IGdyb3VwIG5hbWUgd2hpY2ggcGF1c2VzXG4gKiB0aGUgY3ljbGluZyBvZiB0aGUgY2Fyb3VzZWwsIGlmIGhvdmVyIHBhdXNlcyBvbiBtb3VzZWVudGVyIGFuZCByZXN1bWVzIG9uXG4gKiBtb3VzZWxlYXZlIGtleWJvYXJkIChub3QgeWV0IHN1cHBvcnRlZCkgKD9ib29sZWFuPXRydWUpIC0gaWYgZmFsc2VcbiAqIGNhcm91c2VsIHdpbGwgbm90IHJlYWN0IHRvIGtleWJvYXJkIGV2ZW50c1xuICogbm90ZTogc3dpcGluZyBub3QgeWV0IHN1cHBvcnRlZFxuICovXG4vKioqKlxuICogUHJvYmxlbXM6XG4gKiAxKSBpZiB3ZSBzZXQgYW4gYWN0aXZlIHNsaWRlIHZpYSBtb2RlbCBjaGFuZ2VzLCAuYWN0aXZlIGNsYXNzIHJlbWFpbnMgb24gYVxuICogY3VycmVudCBzbGlkZS5cbiAqIDIpIGlmIHdlIGhhdmUgb25seSBvbmUgc2xpZGUsIHdlIHNob3VsZG4ndCBzaG93IHByZXYvbmV4dCBuYXYgYnV0dG9uc1xuICogMykgaWYgZmlyc3Qgb3IgbGFzdCBzbGlkZSBpcyBhY3RpdmUgYW5kIG5vV3JhcCBpcyB0cnVlLCB0aGVyZSBzaG91bGQgYmVcbiAqIFwiZGlzYWJsZWRcIiBjbGFzcyBvbiB0aGUgbmF2IGJ1dHRvbnMuXG4gKiA0KSBkZWZhdWx0IGludGVydmFsIHNob3VsZCBiZSBlcXVhbCA1MDAwXG4gKi9cblxuaW1wb3J0IHtcbiAgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBOZ1pvbmUsIE9uRGVzdHJveSwgT3V0cHV0LCBBZnRlclZpZXdJbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBpc0JzMywgTGlua2VkTGlzdCB9IGZyb20gJ25neC1ib290c3RyYXAvdXRpbHMnO1xuaW1wb3J0IHsgU2xpZGVDb21wb25lbnQgfSBmcm9tICcuL3NsaWRlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYXJvdXNlbENvbmZpZyB9IGZyb20gJy4vY2Fyb3VzZWwuY29uZmlnJztcbmltcG9ydCB7IGZpbmRMYXN0SW5kZXgsIGNodW5rQnlOdW1iZXIgfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IFNsaWRlV2l0aEluZGV4LCBJbmRleGVkU2xpZGVMaXN0IH0gZnJvbSAnLi9tb2RlbHMnO1xuXG5leHBvcnQgZW51bSBEaXJlY3Rpb24ge1xuICBVTktOT1dOLFxuICBORVhULFxuICBQUkVWXG59XG5cbi8qKlxuICogQmFzZSBlbGVtZW50IHRvIGNyZWF0ZSBjYXJvdXNlbFxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdjYXJvdXNlbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXJvdXNlbC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgQ2Fyb3VzZWxDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAvKiBJZiBgdHJ1ZWAg4oCUIGNhcm91c2VsIHdpbGwgbm90IGN5Y2xlIGNvbnRpbnVvdXNseSBhbmQgd2lsbCBoYXZlIGhhcmQgc3RvcHMgKHByZXZlbnQgbG9vcGluZykgKi9cbiAgQElucHV0KCkgbm9XcmFwOiBib29sZWFuO1xuICAvKiAgSWYgYHRydWVgIOKAlCB3aWxsIGRpc2FibGUgcGF1c2luZyBvbiBjYXJvdXNlbCBtb3VzZSBob3ZlciAqL1xuICBASW5wdXQoKSBub1BhdXNlOiBib29sZWFuO1xuICAvKiAgSWYgYHRydWVgIOKAlCBjYXJvdXNlbC1pbmRpY2F0b3JzIGFyZSB2aXNpYmxlICAqL1xuICBASW5wdXQoKSBzaG93SW5kaWNhdG9yczogYm9vbGVhbjtcbiAgLyogSWYgdmFsdWUgbW9yZSB0aGVuIDEg4oCUIGNhcm91c2VsIHdvcmtzIGluIG11bHRpbGlzdCBtb2RlICovXG4gIEBJbnB1dCgpIGl0ZW1zUGVyU2xpZGUgPSAxO1xuICAvKiBJZiBgdHJ1ZWAg4oCUIGNhcm91c2VsIHNoaWZ0cyBieSBvbmUgZWxlbWVudC4gQnkgZGVmYXVsdCBjYXJvdXNlbCBzaGlmdHMgYnkgbnVtYmVyXG4gICAgIG9mIHZpc2libGUgZWxlbWVudHMgKGl0ZW1zUGVyU2xpZGUgZmllbGQpICovXG4gIEBJbnB1dCgpIHNpbmdsZVNsaWRlT2Zmc2V0ID0gZmFsc2U7XG5cbiAgLyoqIFdpbGwgYmUgZW1pdHRlZCB3aGVuIGFjdGl2ZSBzbGlkZSBoYXMgYmVlbiBjaGFuZ2VkLiBQYXJ0IG9mIHR3by13YXktYmluZGFibGUgWyhhY3RpdmVTbGlkZSldIHByb3BlcnR5ICovXG4gIEBPdXRwdXQoKVxuICBhY3RpdmVTbGlkZUNoYW5nZTogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oZmFsc2UpO1xuXG4gIC8qKiBXaWxsIGJlIGVtaXR0ZWQgd2hlbiBhY3RpdmUgc2xpZGVzIGhhcyBiZWVuIGNoYW5nZWQgaW4gbXVsdGlsaXN0IG1vZGUgKi9cbiAgQE91dHB1dCgpXG4gIHNsaWRlUmFuZ2VDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXJbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcltdPigpO1xuXG4gIC8qKiBJbmRleCBvZiBjdXJyZW50bHkgZGlzcGxheWVkIHNsaWRlKHN0YXJ0ZWQgZm9yIDApICovXG4gIEBJbnB1dCgpXG4gIHNldCBhY3RpdmVTbGlkZShpbmRleDogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMubXVsdGlsaXN0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLl9zbGlkZXMubGVuZ3RoICYmIGluZGV4ICE9PSB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUpIHtcbiAgICAgIHRoaXMuX3NlbGVjdChpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IGFjdGl2ZVNsaWRlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZTtcbiAgfVxuXG4gIC8qIEluZGV4IHRvIHN0YXJ0IGRpc3BsYXkgc2xpZGVzIGZyb20gaXQgKi9cbiAgQElucHV0KClcbiAgc3RhcnRGcm9tSW5kZXggPSAwO1xuXG4gIC8qKlxuICAgKiBEZWxheSBvZiBpdGVtIGN5Y2xpbmcgaW4gbWlsbGlzZWNvbmRzLiBJZiBmYWxzZSwgY2Fyb3VzZWwgd29uJ3QgY3ljbGVcbiAgICogYXV0b21hdGljYWxseS5cbiAgICovXG4gIEBJbnB1dCgpXG4gIGdldCBpbnRlcnZhbCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9pbnRlcnZhbDtcbiAgfVxuXG4gIHNldCBpbnRlcnZhbCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5faW50ZXJ2YWwgPSB2YWx1ZTtcbiAgICB0aGlzLnJlc3RhcnRUaW1lcigpO1xuICB9XG5cbiAgZ2V0IHNsaWRlcygpOiBTbGlkZUNvbXBvbmVudFtdIHtcbiAgICByZXR1cm4gdGhpcy5fc2xpZGVzLnRvQXJyYXkoKTtcbiAgfVxuXG4gIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnlcbiAgcHJvdGVjdGVkIGN1cnJlbnRJbnRlcnZhbDogYW55O1xuICBwcm90ZWN0ZWQgX2N1cnJlbnRBY3RpdmVTbGlkZTogbnVtYmVyO1xuICBwcm90ZWN0ZWQgX2ludGVydmFsOiBudW1iZXI7XG4gIHByb3RlY3RlZCBfc2xpZGVzOiBMaW5rZWRMaXN0PFNsaWRlQ29tcG9uZW50PiA9IG5ldyBMaW5rZWRMaXN0PFNsaWRlQ29tcG9uZW50PigpO1xuICBwcm90ZWN0ZWQgX2NodW5rZWRTbGlkZXM6IFNsaWRlV2l0aEluZGV4W11bXTtcbiAgcHJvdGVjdGVkIF9zbGlkZXNXaXRoSW5kZXhlczogU2xpZGVXaXRoSW5kZXhbXTtcbiAgcHJvdGVjdGVkIF9jdXJyZW50VmlzaWJsZVNsaWRlc0luZGV4ID0gMDtcbiAgcHJvdGVjdGVkIGlzUGxheWluZzogYm9vbGVhbjtcbiAgcHJvdGVjdGVkIGRlc3Ryb3llZCA9IGZhbHNlO1xuXG4gIGdldCBpc0JzNCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gIWlzQnMzKCk7XG4gIH1cblxuICBjb25zdHJ1Y3Rvcihjb25maWc6IENhcm91c2VsQ29uZmlnLCBwcml2YXRlIG5nWm9uZTogTmdab25lKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLCBjb25maWcpO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHRoaXMubXVsdGlsaXN0KSB7XG4gICAgICAgIHRoaXMuX2NodW5rZWRTbGlkZXMgPSBjaHVua0J5TnVtYmVyKFxuICAgICAgICAgIHRoaXMubWFwU2xpZGVzQW5kSW5kZXhlcygpLFxuICAgICAgICAgIHRoaXMuaXRlbXNQZXJTbGlkZVxuICAgICAgICApO1xuICAgICAgICB0aGlzLnNlbGVjdEluaXRpYWxTbGlkZXMoKTtcbiAgICAgIH1cbiAgICB9LCAwKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveWVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIG5ldyBzbGlkZS4gSWYgdGhpcyBzbGlkZSBpcyBmaXJzdCBpbiBjb2xsZWN0aW9uIC0gc2V0IGl0IGFzIGFjdGl2ZVxuICAgKiBhbmQgc3RhcnRzIGF1dG8gY2hhbmdpbmdcbiAgICogQHBhcmFtIHNsaWRlXG4gICAqL1xuICBhZGRTbGlkZShzbGlkZTogU2xpZGVDb21wb25lbnQpOiB2b2lkIHtcbiAgICB0aGlzLl9zbGlkZXMuYWRkKHNsaWRlKTtcblxuICAgIGlmICh0aGlzLm11bHRpbGlzdCAmJiB0aGlzLl9zbGlkZXMubGVuZ3RoIDw9IHRoaXMuaXRlbXNQZXJTbGlkZSkge1xuICAgICAgc2xpZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMubXVsdGlsaXN0ICYmIHRoaXMuX3NsaWRlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuYWN0aXZlU2xpZGUgPSAwO1xuICAgICAgdGhpcy5wbGF5KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgc3BlY2lmaWVkIHNsaWRlLiBJZiB0aGlzIHNsaWRlIGlzIGFjdGl2ZSAtIHdpbGwgcm9sbCB0byBhbm90aGVyXG4gICAqIHNsaWRlXG4gICAqIEBwYXJhbSBzbGlkZVxuICAgKi9cbiAgcmVtb3ZlU2xpZGUoc2xpZGU6IFNsaWRlQ29tcG9uZW50KTogdm9pZCB7XG4gICAgY29uc3QgcmVtSW5kZXggPSB0aGlzLl9zbGlkZXMuaW5kZXhPZihzbGlkZSk7XG5cbiAgICBpZiAodGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlID09PSByZW1JbmRleCkge1xuICAgICAgLy8gcmVtb3Zpbmcgb2YgYWN0aXZlIHNsaWRlXG4gICAgICBsZXQgbmV4dFNsaWRlSW5kZXg6IG51bWJlciA9IHZvaWQgMDtcbiAgICAgIGlmICh0aGlzLl9zbGlkZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAvLyBpZiB0aGlzIHNsaWRlIGxhc3QgLSB3aWxsIHJvbGwgdG8gZmlyc3Qgc2xpZGUsIGlmIG5vV3JhcCBmbGFnIGlzXG4gICAgICAgIC8vIEZBTFNFIG9yIHRvIHByZXZpb3VzLCBpZiBub1dyYXAgaXMgVFJVRSBpbiBjYXNlLCBpZiB0aGlzIHNsaWRlIGluXG4gICAgICAgIC8vIG1pZGRsZSBvZiBjb2xsZWN0aW9uLCBpbmRleCBvZiBuZXh0IHNsaWRlIGlzIHNhbWUgdG8gcmVtb3ZlZFxuICAgICAgICBuZXh0U2xpZGVJbmRleCA9ICF0aGlzLmlzTGFzdChyZW1JbmRleClcbiAgICAgICAgICA/IHJlbUluZGV4XG4gICAgICAgICAgOiB0aGlzLm5vV3JhcCA/IHJlbUluZGV4IC0gMSA6IDA7XG4gICAgICB9XG4gICAgICB0aGlzLl9zbGlkZXMucmVtb3ZlKHJlbUluZGV4KTtcblxuICAgICAgLy8gcHJldmVudHMgZXhjZXB0aW9uIHdpdGggY2hhbmdpbmcgc29tZSB2YWx1ZSBhZnRlciBjaGVja2luZ1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuX3NlbGVjdChuZXh0U2xpZGVJbmRleCk7XG4gICAgICB9LCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fc2xpZGVzLnJlbW92ZShyZW1JbmRleCk7XG4gICAgICBjb25zdCBjdXJyZW50U2xpZGVJbmRleCA9IHRoaXMuZ2V0Q3VycmVudFNsaWRlSW5kZXgoKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAvLyBhZnRlciByZW1vdmluZywgbmVlZCB0byBhY3R1YWxpemUgaW5kZXggb2YgY3VycmVudCBhY3RpdmUgc2xpZGVcbiAgICAgICAgdGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlID0gY3VycmVudFNsaWRlSW5kZXg7XG4gICAgICAgIHRoaXMuYWN0aXZlU2xpZGVDaGFuZ2UuZW1pdCh0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUpO1xuICAgICAgfSwgMCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJvbGxpbmcgdG8gbmV4dCBzbGlkZVxuICAgKiBAcGFyYW0gZm9yY2U6IHtib29sZWFufSBpZiB0cnVlIC0gd2lsbCBpZ25vcmUgbm9XcmFwIGZsYWdcbiAgICovXG4gIG5leHRTbGlkZShmb3JjZSA9IGZhbHNlKTogdm9pZCB7XG4gICAgdGhpcy5tb3ZlKERpcmVjdGlvbi5ORVhULCBmb3JjZSk7XG4gIH1cblxuICAvKipcbiAgICogUm9sbGluZyB0byBwcmV2aW91cyBzbGlkZVxuICAgKiBAcGFyYW0gZm9yY2U6IHtib29sZWFufSBpZiB0cnVlIC0gd2lsbCBpZ25vcmUgbm9XcmFwIGZsYWdcbiAgICovXG4gIHByZXZpb3VzU2xpZGUoZm9yY2UgPSBmYWxzZSk6IHZvaWQge1xuICAgIHRoaXMubW92ZShEaXJlY3Rpb24uUFJFViwgZm9yY2UpO1xuICB9XG5cbiAgZ2V0Rmlyc3RWaXNpYmxlSW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5zbGlkZXMuZmluZEluZGV4KHRoaXMuZ2V0QWN0aXZlKTtcbiAgfVxuXG4gIGdldExhc3RWaXNpYmxlSW5kZXgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gZmluZExhc3RJbmRleCh0aGlzLnNsaWRlcywgdGhpcy5nZXRBY3RpdmUpO1xuICB9XG5cbiAgZ2V0QWN0aXZlID0gKHNsaWRlOiBTbGlkZUNvbXBvbmVudCkgPT4gc2xpZGUuYWN0aXZlO1xuXG4gIG1vdmUoZGlyZWN0aW9uOiBEaXJlY3Rpb24sIGZvcmNlID0gZmFsc2UpOiB2b2lkIHtcbiAgICBjb25zdCBmaXJzdFZpc2libGVJbmRleCA9IHRoaXMuZ2V0Rmlyc3RWaXNpYmxlSW5kZXgoKTtcbiAgICBjb25zdCBsYXN0VmlzaWJsZUluZGV4ID0gdGhpcy5nZXRMYXN0VmlzaWJsZUluZGV4KCk7XG5cbiAgICBpZiAodGhpcy5ub1dyYXApIHtcbiAgICAgIGlmIChcbiAgICAgICAgZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uTkVYVCAmJlxuICAgICAgICB0aGlzLmlzTGFzdChsYXN0VmlzaWJsZUluZGV4KSB8fFxuICAgICAgICBkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5QUkVWICYmXG4gICAgICAgIGZpcnN0VmlzaWJsZUluZGV4ID09PSAwXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghdGhpcy5tdWx0aWxpc3QpIHtcbiAgICAgIHRoaXMuYWN0aXZlU2xpZGUgPSB0aGlzLmZpbmROZXh0U2xpZGVJbmRleChkaXJlY3Rpb24sIGZvcmNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb3ZlTXVsdGlsaXN0KGRpcmVjdGlvbik7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJvbGxpbmcgdG8gc3BlY2lmaWVkIHNsaWRlXG4gICAqIEBwYXJhbSBpbmRleDoge251bWJlcn0gaW5kZXggb2Ygc2xpZGUsIHdoaWNoIG11c3QgYmUgc2hvd25cbiAgICovXG4gIHNlbGVjdFNsaWRlKGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubXVsdGlsaXN0KSB7XG4gICAgICB0aGlzLmFjdGl2ZVNsaWRlID0gaW5kZXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0U2xpZGVSYW5nZShpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBhIGF1dG8gY2hhbmdpbmcgb2Ygc2xpZGVzXG4gICAqL1xuICBwbGF5KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc1BsYXlpbmcpIHtcbiAgICAgIHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMucmVzdGFydFRpbWVyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0b3BzIGEgYXV0byBjaGFuZ2luZyBvZiBzbGlkZXNcbiAgICovXG4gIHBhdXNlKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5ub1BhdXNlKSB7XG4gICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5yZXNldFRpbWVyKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZpbmRzIGFuZCByZXR1cm5zIGluZGV4IG9mIGN1cnJlbnRseSBkaXNwbGF5ZWQgc2xpZGVcbiAgICovXG4gIGdldEN1cnJlbnRTbGlkZUluZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX3NsaWRlcy5maW5kSW5kZXgodGhpcy5nZXRBY3RpdmUpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMsIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBpbmRleCBpcyBsYXN0IGluIGNvbGxlY3Rpb25cbiAgICogQHBhcmFtIGluZGV4XG4gICAqL1xuICBpc0xhc3QoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpbmRleCArIDEgPj0gdGhpcy5fc2xpZGVzLmxlbmd0aDtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzLCB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgaW5kZXggaXMgZmlyc3QgaW4gY29sbGVjdGlvblxuICAgKiBAcGFyYW0gaW5kZXhcbiAgICovXG4gIGlzRmlyc3QoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpbmRleCA9PT0gMDtcbiAgfVxuXG4gIHByaXZhdGUgc2VsZWN0SW5pdGlhbFNsaWRlcygpOiB2b2lkIHtcbiAgICBjb25zdCBzdGFydEluZGV4ID0gdGhpcy5zdGFydEZyb21JbmRleCA8PSB0aGlzLl9zbGlkZXMubGVuZ3RoXG4gICAgICA/IHRoaXMuc3RhcnRGcm9tSW5kZXhcbiAgICAgIDogMDtcblxuICAgIHRoaXMuaGlkZVNsaWRlcygpO1xuXG4gICAgaWYgKHRoaXMuc2luZ2xlU2xpZGVPZmZzZXQpIHtcbiAgICAgIHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzID0gdGhpcy5tYXBTbGlkZXNBbmRJbmRleGVzKCk7XG5cbiAgICAgIGlmICh0aGlzLl9zbGlkZXMubGVuZ3RoIC0gc3RhcnRJbmRleCA8IHRoaXMuaXRlbXNQZXJTbGlkZSkge1xuICAgICAgICBjb25zdCBzbGlkZXNUb0FwcGVuZCA9IHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzLnNsaWNlKDAsIHN0YXJ0SW5kZXgpO1xuXG4gICAgICAgIHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzICA9IFtcbiAgICAgICAgICAuLi50aGlzLl9zbGlkZXNXaXRoSW5kZXhlcyxcbiAgICAgICAgICAuLi5zbGlkZXNUb0FwcGVuZFxuICAgICAgICBdXG4gICAgICAgIC5zbGljZShzbGlkZXNUb0FwcGVuZC5sZW5ndGgpXG4gICAgICAgIC5zbGljZSgwLCB0aGlzLml0ZW1zUGVyU2xpZGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc2xpZGVzV2l0aEluZGV4ZXMgPSB0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcy5zbGljZShcbiAgICAgICAgICBzdGFydEluZGV4LFxuICAgICAgICAgIHN0YXJ0SW5kZXggKyB0aGlzLml0ZW1zUGVyU2xpZGVcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fc2xpZGVzV2l0aEluZGV4ZXMuZm9yRWFjaCgoc2xpZGU6IFNsaWRlV2l0aEluZGV4KSA9PiBzbGlkZS5pdGVtLmFjdGl2ZSA9IHRydWUpO1xuICAgICAgdGhpcy5tYWtlU2xpZGVzQ29uc2lzdGVudCh0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VsZWN0UmFuZ2VCeU5lc3RlZEluZGV4KHN0YXJ0SW5kZXgpO1xuICAgIH1cblxuICAgIHRoaXMuc2xpZGVSYW5nZUNoYW5nZS5lbWl0KHRoaXMuZ2V0VmlzaWJsZUluZGV4ZXMoKSk7XG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcyBuZXh0IHNsaWRlIGluZGV4LCBkZXBlbmRpbmcgb2YgZGlyZWN0aW9uXG4gICAqIEBwYXJhbSBkaXJlY3Rpb246IERpcmVjdGlvbihVTktOT1dOfFBSRVZ8TkVYVClcbiAgICogQHBhcmFtIGZvcmNlOiB7Ym9vbGVhbn0gaWYgVFJVRSAtIHdpbGwgaWdub3JlIG5vV3JhcCBmbGFnLCBlbHNlIHdpbGxcbiAgICogICByZXR1cm4gdW5kZWZpbmVkIGlmIG5leHQgc2xpZGUgcmVxdWlyZSB3cmFwcGluZ1xuICAgKi9cbiAgcHJpdmF0ZSBmaW5kTmV4dFNsaWRlSW5kZXgoZGlyZWN0aW9uOiBEaXJlY3Rpb24sIGZvcmNlOiBib29sZWFuKTogbnVtYmVyIHtcbiAgICBsZXQgbmV4dFNsaWRlSW5kZXggPSAwO1xuXG4gICAgaWYgKFxuICAgICAgIWZvcmNlICYmXG4gICAgICAodGhpcy5pc0xhc3QodGhpcy5hY3RpdmVTbGlkZSkgJiZcbiAgICAgICAgZGlyZWN0aW9uICE9PSBEaXJlY3Rpb24uUFJFViAmJlxuICAgICAgICB0aGlzLm5vV3JhcClcbiAgICApIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgIGNhc2UgRGlyZWN0aW9uLk5FWFQ6XG4gICAgICAgIC8vIGlmIHRoaXMgaXMgbGFzdCBzbGlkZSwgbm90IGZvcmNlLCBsb29waW5nIGlzIGRpc2FibGVkXG4gICAgICAgIC8vIGFuZCBuZWVkIHRvIGdvaW5nIGZvcndhcmQgLSBzZWxlY3QgY3VycmVudCBzbGlkZSwgYXMgYSBuZXh0XG4gICAgICAgIG5leHRTbGlkZUluZGV4ID0gIXRoaXMuaXNMYXN0KHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSlcbiAgICAgICAgICA/IHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSArIDFcbiAgICAgICAgICA6ICFmb3JjZSAmJiB0aGlzLm5vV3JhcCA/IHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSA6IDA7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBEaXJlY3Rpb24uUFJFVjpcbiAgICAgICAgLy8gaWYgdGhpcyBpcyBmaXJzdCBzbGlkZSwgbm90IGZvcmNlLCBsb29waW5nIGlzIGRpc2FibGVkXG4gICAgICAgIC8vIGFuZCBuZWVkIHRvIGdvaW5nIGJhY2t3YXJkIC0gc2VsZWN0IGN1cnJlbnQgc2xpZGUsIGFzIGEgbmV4dFxuICAgICAgICBuZXh0U2xpZGVJbmRleCA9XG4gICAgICAgICAgdGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlID4gMFxuICAgICAgICAgICAgPyB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUgLSAxXG4gICAgICAgICAgICA6ICFmb3JjZSAmJiB0aGlzLm5vV3JhcFxuICAgICAgICAgICAgPyB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGVcbiAgICAgICAgICAgIDogdGhpcy5fc2xpZGVzLmxlbmd0aCAtIDE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGRpcmVjdGlvbicpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXh0U2xpZGVJbmRleDtcbiAgfVxuXG4gIHByaXZhdGUgbWFwU2xpZGVzQW5kSW5kZXhlcygpOiBTbGlkZVdpdGhJbmRleFtdIHtcbiAgICByZXR1cm4gdGhpcy5zbGlkZXNcbiAgICAgIC5zbGljZSgpXG4gICAgICAubWFwKChzbGlkZTogU2xpZGVDb21wb25lbnQsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpbmRleCxcbiAgICAgICAgICBpdGVtOiBzbGlkZVxuICAgICAgICB9O1xuICAgICAgfSk7XG4gIH1cblxuXG4gIHByaXZhdGUgc2VsZWN0U2xpZGVSYW5nZShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaXNJbmRleEluUmFuZ2UoaW5kZXgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5oaWRlU2xpZGVzKCk7XG5cbiAgICBpZiAoIXRoaXMuc2luZ2xlU2xpZGVPZmZzZXQpIHtcbiAgICAgIHRoaXMuc2VsZWN0UmFuZ2VCeU5lc3RlZEluZGV4KGluZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc3RhcnRJbmRleCA9IHRoaXMuaXNJbmRleE9uVGhlRWRnZXMoaW5kZXgpXG4gICAgICAgID8gaW5kZXhcbiAgICAgICAgOiBpbmRleCAtIHRoaXMuaXRlbXNQZXJTbGlkZSArIDE7XG5cbiAgICAgIGNvbnN0IGVuZEluZGV4ID0gdGhpcy5pc0luZGV4T25UaGVFZGdlcyhpbmRleClcbiAgICAgICAgPyBpbmRleCArIHRoaXMuaXRlbXNQZXJTbGlkZVxuICAgICAgICA6IGluZGV4ICsgMTtcblxuICAgICAgdGhpcy5fc2xpZGVzV2l0aEluZGV4ZXMgPSB0aGlzLm1hcFNsaWRlc0FuZEluZGV4ZXMoKS5zbGljZShzdGFydEluZGV4LCBlbmRJbmRleCk7XG4gICAgICB0aGlzLm1ha2VTbGlkZXNDb25zaXN0ZW50KHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzKTtcblxuICAgICAgdGhpcy5fc2xpZGVzV2l0aEluZGV4ZXMuZm9yRWFjaCgoc2xpZGU6IFNsaWRlV2l0aEluZGV4KSA9PiBzbGlkZS5pdGVtLmFjdGl2ZSA9IHRydWUpO1xuICAgIH1cblxuICAgIHRoaXMuc2xpZGVSYW5nZUNoYW5nZS5lbWl0KHRoaXMuZ2V0VmlzaWJsZUluZGV4ZXMoKSk7XG4gIH1cblxuICBwcml2YXRlIHNlbGVjdFJhbmdlQnlOZXN0ZWRJbmRleChpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgY29uc3Qgc2VsZWN0ZWRSYW5nZSA9IHRoaXMuX2NodW5rZWRTbGlkZXNcbiAgICAgIC5tYXAoKHNsaWRlc0xpc3QsIGk6IG51bWJlcikgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGluZGV4OiBpLFxuICAgICAgICAgIGxpc3Q6IHNsaWRlc0xpc3RcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgICAuZmluZChcbiAgICAgICAgKHNsaWRlc0xpc3Q6IEluZGV4ZWRTbGlkZUxpc3QpID0+IHtcbiAgICAgICAgICByZXR1cm4gc2xpZGVzTGlzdC5saXN0LmZpbmQoc2xpZGUgPT4gc2xpZGUuaW5kZXggPT09IGluZGV4KSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgdGhpcy5fY3VycmVudFZpc2libGVTbGlkZXNJbmRleCA9IHNlbGVjdGVkUmFuZ2UuaW5kZXg7XG5cbiAgICB0aGlzLl9jaHVua2VkU2xpZGVzW3NlbGVjdGVkUmFuZ2UuaW5kZXhdLmZvckVhY2goKHNsaWRlOiBTbGlkZVdpdGhJbmRleCkgPT4ge1xuICAgICAgc2xpZGUuaXRlbS5hY3RpdmUgPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0luZGV4T25UaGVFZGdlcyhpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIGluZGV4ICsgMSAtIHRoaXMuaXRlbXNQZXJTbGlkZSA8PSAwIHx8XG4gICAgICBpbmRleCArIHRoaXMuaXRlbXNQZXJTbGlkZSA8PSB0aGlzLl9zbGlkZXMubGVuZ3RoXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNJbmRleEluUmFuZ2UoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnNpbmdsZVNsaWRlT2Zmc2V0KSB7XG4gICAgICBjb25zdCB2aXNpYmxlSW5kZXhlcyA9IHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzLm1hcCgoc2xpZGU6IFNsaWRlV2l0aEluZGV4KSA9PiBzbGlkZS5pbmRleCk7XG5cbiAgICAgIHJldHVybiB2aXNpYmxlSW5kZXhlcy5pbmRleE9mKGluZGV4KSA+PSAwO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICBpbmRleCA8PSB0aGlzLmdldExhc3RWaXNpYmxlSW5kZXgoKSAmJlxuICAgICAgaW5kZXggPj0gdGhpcy5nZXRGaXJzdFZpc2libGVJbmRleCgpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgaGlkZVNsaWRlcygpOiB2b2lkIHtcbiAgICB0aGlzLnNsaWRlcy5mb3JFYWNoKChzbGlkZTogU2xpZGVDb21wb25lbnQpID0+IHNsaWRlLmFjdGl2ZSA9IGZhbHNlKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNWaXNpYmxlU2xpZGVMaXN0TGFzdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFZpc2libGVTbGlkZXNJbmRleCA9PT0gdGhpcy5fY2h1bmtlZFNsaWRlcy5sZW5ndGggLSAxO1xuICB9XG5cbiAgcHJpdmF0ZSBpc1Zpc2libGVTbGlkZUxpc3RGaXJzdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFZpc2libGVTbGlkZXNJbmRleCA9PT0gMDtcbiAgfVxuXG4gIHByaXZhdGUgbW92ZVNsaWRlckJ5T25lSXRlbShkaXJlY3Rpb246IERpcmVjdGlvbik6IHZvaWQge1xuICAgIGxldCBmaXJzdFZpc2libGVJbmRleDogbnVtYmVyO1xuICAgIGxldCBsYXN0VmlzaWJsZUluZGV4OiBudW1iZXI7XG4gICAgbGV0IGluZGV4VG9IaWRlOiBudW1iZXI7XG4gICAgbGV0IGluZGV4VG9TaG93OiBudW1iZXI7XG5cbiAgICBpZiAodGhpcy5ub1dyYXApIHtcbiAgICAgIGZpcnN0VmlzaWJsZUluZGV4ID0gdGhpcy5nZXRGaXJzdFZpc2libGVJbmRleCgpO1xuICAgICAgbGFzdFZpc2libGVJbmRleCA9IHRoaXMuZ2V0TGFzdFZpc2libGVJbmRleCgpO1xuXG4gICAgICBpbmRleFRvSGlkZSA9IGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLk5FWFRcbiAgICAgICAgPyBmaXJzdFZpc2libGVJbmRleFxuICAgICAgICA6IGxhc3RWaXNpYmxlSW5kZXg7XG5cbiAgICAgIGluZGV4VG9TaG93ID0gZGlyZWN0aW9uICE9PSBEaXJlY3Rpb24uTkVYVFxuICAgICAgICA/IGZpcnN0VmlzaWJsZUluZGV4IC0gMVxuICAgICAgICA6ICF0aGlzLmlzTGFzdChsYXN0VmlzaWJsZUluZGV4KVxuICAgICAgICA/IGxhc3RWaXNpYmxlSW5kZXggKyAxIDogMDtcblxuICAgICAgdGhpcy5fc2xpZGVzLmdldChpbmRleFRvSGlkZSkuYWN0aXZlID0gZmFsc2U7XG4gICAgICB0aGlzLl9zbGlkZXMuZ2V0KGluZGV4VG9TaG93KS5hY3RpdmUgPSB0cnVlO1xuXG4gICAgICBjb25zdCBzbGlkZXNUb1Jlb3JkZXIgPSB0aGlzLm1hcFNsaWRlc0FuZEluZGV4ZXMoKS5maWx0ZXIoXG4gICAgICAgIChzbGlkZTogU2xpZGVXaXRoSW5kZXgpID0+IHNsaWRlLml0ZW0uYWN0aXZlXG4gICAgICApO1xuXG4gICAgICB0aGlzLm1ha2VTbGlkZXNDb25zaXN0ZW50KHNsaWRlc1RvUmVvcmRlcik7XG5cbiAgICAgIHRoaXMuc2xpZGVSYW5nZUNoYW5nZS5lbWl0KHRoaXMuZ2V0VmlzaWJsZUluZGV4ZXMoKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBkaXNwbGF5ZWRJbmRleDogbnVtYmVyO1xuXG4gICAgICBmaXJzdFZpc2libGVJbmRleCA9IHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzWzBdLmluZGV4O1xuICAgICAgbGFzdFZpc2libGVJbmRleCA9IHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzW3RoaXMuX3NsaWRlc1dpdGhJbmRleGVzLmxlbmd0aCAtIDFdLmluZGV4O1xuXG4gICAgICBpZiAoZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uTkVYVCkge1xuICAgICAgICB0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcy5zaGlmdCgpO1xuXG4gICAgICAgIGRpc3BsYXllZEluZGV4ID0gdGhpcy5pc0xhc3QobGFzdFZpc2libGVJbmRleClcbiAgICAgICAgICA/IDBcbiAgICAgICAgICA6IGxhc3RWaXNpYmxlSW5kZXggKyAxO1xuXG4gICAgICAgIHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzLnB1c2goe1xuICAgICAgICAgIGluZGV4OiBkaXNwbGF5ZWRJbmRleCxcbiAgICAgICAgICBpdGVtOiB0aGlzLl9zbGlkZXMuZ2V0KGRpc3BsYXllZEluZGV4KVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzLnBvcCgpO1xuICAgICAgICBkaXNwbGF5ZWRJbmRleCA9IHRoaXMuaXNGaXJzdChmaXJzdFZpc2libGVJbmRleClcbiAgICAgICAgICA/IHRoaXMuX3NsaWRlcy5sZW5ndGggLSAxXG4gICAgICAgICAgOiBmaXJzdFZpc2libGVJbmRleCAtIDE7XG5cbiAgICAgICAgdGhpcy5fc2xpZGVzV2l0aEluZGV4ZXMgPSBbe1xuICAgICAgICAgIGluZGV4OiBkaXNwbGF5ZWRJbmRleCxcbiAgICAgICAgICBpdGVtOiB0aGlzLl9zbGlkZXMuZ2V0KGRpc3BsYXllZEluZGV4KVxuICAgICAgICB9LCAuLi50aGlzLl9zbGlkZXNXaXRoSW5kZXhlc107XG4gICAgICB9XG5cbiAgICAgIHRoaXMuaGlkZVNsaWRlcygpO1xuXG4gICAgICB0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcy5mb3JFYWNoKHNsaWRlID0+IHNsaWRlLml0ZW0uYWN0aXZlID0gdHJ1ZSk7XG5cbiAgICAgIHRoaXMubWFrZVNsaWRlc0NvbnNpc3RlbnQodGhpcy5fc2xpZGVzV2l0aEluZGV4ZXMpO1xuXG4gICAgICB0aGlzLnNsaWRlUmFuZ2VDaGFuZ2UuZW1pdChcbiAgICAgICAgdGhpcy5fc2xpZGVzV2l0aEluZGV4ZXMubWFwKChzbGlkZTogU2xpZGVXaXRoSW5kZXgpID0+IHNsaWRlLmluZGV4KVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1ha2VTbGlkZXNDb25zaXN0ZW50ID0gKHNsaWRlczogU2xpZGVXaXRoSW5kZXhbXSk6IHZvaWQgPT4ge1xuICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZTogU2xpZGVXaXRoSW5kZXgsIGluZGV4OiBudW1iZXIpID0+IHNsaWRlLml0ZW0ub3JkZXIgPSBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIG1vdmVNdWx0aWxpc3QoZGlyZWN0aW9uOiBEaXJlY3Rpb24pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zaW5nbGVTbGlkZU9mZnNldCkge1xuICAgICAgdGhpcy5tb3ZlU2xpZGVyQnlPbmVJdGVtKGRpcmVjdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGlkZVNsaWRlcygpO1xuXG4gICAgICBpZiAodGhpcy5ub1dyYXApIHtcbiAgICAgICAgdGhpcy5fY3VycmVudFZpc2libGVTbGlkZXNJbmRleCA9IGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLk5FWFRcbiAgICAgICAgICA/IHRoaXMuX2N1cnJlbnRWaXNpYmxlU2xpZGVzSW5kZXggKyAxXG4gICAgICAgICAgOiB0aGlzLl9jdXJyZW50VmlzaWJsZVNsaWRlc0luZGV4IC0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5ORVhUKSB7XG4gICAgICAgICAgdGhpcy5fY3VycmVudFZpc2libGVTbGlkZXNJbmRleCA9IHRoaXMuaXNWaXNpYmxlU2xpZGVMaXN0TGFzdCgpXG4gICAgICAgICAgICA/IDBcbiAgICAgICAgICAgIDogdGhpcy5fY3VycmVudFZpc2libGVTbGlkZXNJbmRleCArIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fY3VycmVudFZpc2libGVTbGlkZXNJbmRleCA9IHRoaXMuaXNWaXNpYmxlU2xpZGVMaXN0Rmlyc3QoKVxuICAgICAgICAgICAgPyB0aGlzLl9jaHVua2VkU2xpZGVzLmxlbmd0aCAtIDFcbiAgICAgICAgICAgIDogdGhpcy5fY3VycmVudFZpc2libGVTbGlkZXNJbmRleCAtIDE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5fY2h1bmtlZFNsaWRlc1t0aGlzLl9jdXJyZW50VmlzaWJsZVNsaWRlc0luZGV4XS5mb3JFYWNoKFxuICAgICAgICAoc2xpZGU6IFNsaWRlV2l0aEluZGV4KSA9PiBzbGlkZS5pdGVtLmFjdGl2ZSA9IHRydWVcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuc2xpZGVSYW5nZUNoYW5nZS5lbWl0KHRoaXMuZ2V0VmlzaWJsZUluZGV4ZXMoKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRWaXNpYmxlSW5kZXhlcygpOiBudW1iZXJbXSB7XG4gICAgaWYgKCF0aGlzLnNpbmdsZVNsaWRlT2Zmc2V0KSB7XG4gICAgICByZXR1cm4gdGhpcy5fY2h1bmtlZFNsaWRlc1t0aGlzLl9jdXJyZW50VmlzaWJsZVNsaWRlc0luZGV4XVxuICAgICAgICAubWFwKChzbGlkZTogU2xpZGVXaXRoSW5kZXgpID0+IHNsaWRlLmluZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzLm1hcCgoc2xpZGU6IFNsaWRlV2l0aEluZGV4KSA9PiBzbGlkZS5pbmRleCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFNldHMgYSBzbGlkZSwgd2hpY2ggc3BlY2lmaWVkIHRocm91Z2ggaW5kZXgsIGFzIGFjdGl2ZVxuICAgKiBAcGFyYW0gaW5kZXhcbiAgICovXG4gIHByaXZhdGUgX3NlbGVjdChpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKGlzTmFOKGluZGV4KSkge1xuICAgICAgdGhpcy5wYXVzZSgpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm11bHRpbGlzdCkge1xuICAgICAgY29uc3QgY3VycmVudFNsaWRlID0gdGhpcy5fc2xpZGVzLmdldCh0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUpO1xuICAgICAgaWYgKGN1cnJlbnRTbGlkZSkge1xuICAgICAgICBjdXJyZW50U2xpZGUuYWN0aXZlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgbmV4dFNsaWRlID0gdGhpcy5fc2xpZGVzLmdldChpbmRleCk7XG4gICAgaWYgKG5leHRTbGlkZSkge1xuICAgICAgdGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlID0gaW5kZXg7XG4gICAgICBuZXh0U2xpZGUuYWN0aXZlID0gdHJ1ZTtcbiAgICAgIHRoaXMuYWN0aXZlU2xpZGUgPSBpbmRleDtcbiAgICAgIHRoaXMuYWN0aXZlU2xpZGVDaGFuZ2UuZW1pdChpbmRleCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBsb29wIG9mIGF1dG8gY2hhbmdpbmcgb2Ygc2xpZGVzXG4gICAqL1xuICBwcml2YXRlIHJlc3RhcnRUaW1lcigpIHtcbiAgICB0aGlzLnJlc2V0VGltZXIoKTtcbiAgICBjb25zdCBpbnRlcnZhbCA9ICt0aGlzLmludGVydmFsO1xuICAgIGlmICghaXNOYU4oaW50ZXJ2YWwpICYmIGludGVydmFsID4gMCkge1xuICAgICAgdGhpcy5jdXJyZW50SW50ZXJ2YWwgPSB0aGlzLm5nWm9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgIHJldHVybiBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgY29uc3QgbkludGVydmFsID0gK3RoaXMuaW50ZXJ2YWw7XG4gICAgICAgICAgdGhpcy5uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgdGhpcy5pc1BsYXlpbmcgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKHRoaXMuaW50ZXJ2YWwpICYmXG4gICAgICAgICAgICAgIG5JbnRlcnZhbCA+IDAgJiZcbiAgICAgICAgICAgICAgdGhpcy5zbGlkZXMubGVuZ3RoXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgdGhpcy5uZXh0U2xpZGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSwgaW50ZXJ2YWwpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0IG11bHRpbGlzdCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtc1BlclNsaWRlID4gMTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wcyBsb29wIG9mIGF1dG8gY2hhbmdpbmcgb2Ygc2xpZGVzXG4gICAqL1xuICBwcml2YXRlIHJlc2V0VGltZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuY3VycmVudEludGVydmFsKSB7XG4gICAgICBjbGVhckludGVydmFsKHRoaXMuY3VycmVudEludGVydmFsKTtcbiAgICAgIHRoaXMuY3VycmVudEludGVydmFsID0gdm9pZCAwO1xuICAgIH1cbiAgfVxufVxuIl19