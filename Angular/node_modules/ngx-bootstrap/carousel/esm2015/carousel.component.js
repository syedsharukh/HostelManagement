/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
const Direction = {
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
export class CarouselComponent {
    /**
     * @param {?} config
     * @param {?} ngZone
     */
    constructor(config, ngZone) {
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
        this.getActive = (slide) => slide.active;
        this.makeSlidesConsistent = (slides) => {
            slides.forEach((slide, index) => slide.item.order = index);
        };
        Object.assign(this, config);
    }
    /**
     * Index of currently displayed slide(started for 0)
     * @param {?} index
     * @return {?}
     */
    set activeSlide(index) {
        if (this.multilist) {
            return;
        }
        if (this._slides.length && index !== this._currentActiveSlide) {
            this._select(index);
        }
    }
    /**
     * @return {?}
     */
    get activeSlide() {
        return this._currentActiveSlide;
    }
    /**
     * Delay of item cycling in milliseconds. If false, carousel won't cycle
     * automatically.
     * @return {?}
     */
    get interval() {
        return this._interval;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set interval(value) {
        this._interval = value;
        this.restartTimer();
    }
    /**
     * @return {?}
     */
    get slides() {
        return this._slides.toArray();
    }
    /**
     * @return {?}
     */
    get isBs4() {
        return !isBs3();
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        setTimeout(() => {
            if (this.multilist) {
                this._chunkedSlides = chunkByNumber(this.mapSlidesAndIndexes(), this.itemsPerSlide);
                this.selectInitialSlides();
            }
        }, 0);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroyed = true;
    }
    /**
     * Adds new slide. If this slide is first in collection - set it as active
     * and starts auto changing
     * @param {?} slide
     * @return {?}
     */
    addSlide(slide) {
        this._slides.add(slide);
        if (this.multilist && this._slides.length <= this.itemsPerSlide) {
            slide.active = true;
        }
        if (!this.multilist && this._slides.length === 1) {
            this._currentActiveSlide = undefined;
            this.activeSlide = 0;
            this.play();
        }
    }
    /**
     * Removes specified slide. If this slide is active - will roll to another
     * slide
     * @param {?} slide
     * @return {?}
     */
    removeSlide(slide) {
        /** @type {?} */
        const remIndex = this._slides.indexOf(slide);
        if (this._currentActiveSlide === remIndex) {
            // removing of active slide
            /** @type {?} */
            let nextSlideIndex = void 0;
            if (this._slides.length > 1) {
                // if this slide last - will roll to first slide, if noWrap flag is
                // FALSE or to previous, if noWrap is TRUE in case, if this slide in
                // middle of collection, index of next slide is same to removed
                nextSlideIndex = !this.isLast(remIndex)
                    ? remIndex
                    : this.noWrap ? remIndex - 1 : 0;
            }
            this._slides.remove(remIndex);
            // prevents exception with changing some value after checking
            setTimeout(() => {
                this._select(nextSlideIndex);
            }, 0);
        }
        else {
            this._slides.remove(remIndex);
            /** @type {?} */
            const currentSlideIndex = this.getCurrentSlideIndex();
            setTimeout(() => {
                // after removing, need to actualize index of current active slide
                this._currentActiveSlide = currentSlideIndex;
                this.activeSlideChange.emit(this._currentActiveSlide);
            }, 0);
        }
    }
    /**
     * Rolling to next slide
     * @param {?=} force
     * @return {?}
     */
    nextSlide(force = false) {
        this.move(Direction.NEXT, force);
    }
    /**
     * Rolling to previous slide
     * @param {?=} force
     * @return {?}
     */
    previousSlide(force = false) {
        this.move(Direction.PREV, force);
    }
    /**
     * @return {?}
     */
    getFirstVisibleIndex() {
        return this.slides.findIndex(this.getActive);
    }
    /**
     * @return {?}
     */
    getLastVisibleIndex() {
        return findLastIndex(this.slides, this.getActive);
    }
    /**
     * @param {?} direction
     * @param {?=} force
     * @return {?}
     */
    move(direction, force = false) {
        /** @type {?} */
        const firstVisibleIndex = this.getFirstVisibleIndex();
        /** @type {?} */
        const lastVisibleIndex = this.getLastVisibleIndex();
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
    }
    /**
     * Rolling to specified slide
     * @param {?} index
     * @return {?}
     */
    selectSlide(index) {
        if (!this.multilist) {
            this.activeSlide = index;
        }
        else {
            this.selectSlideRange(index);
        }
    }
    /**
     * Starts a auto changing of slides
     * @return {?}
     */
    play() {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.restartTimer();
        }
    }
    /**
     * Stops a auto changing of slides
     * @return {?}
     */
    pause() {
        if (!this.noPause) {
            this.isPlaying = false;
            this.resetTimer();
        }
    }
    /**
     * Finds and returns index of currently displayed slide
     * @return {?}
     */
    getCurrentSlideIndex() {
        return this._slides.findIndex(this.getActive);
    }
    /**
     * Defines, whether the specified index is last in collection
     * @param {?} index
     * @return {?}
     */
    isLast(index) {
        return index + 1 >= this._slides.length;
    }
    /**
     * Defines, whether the specified index is first in collection
     * @param {?} index
     * @return {?}
     */
    isFirst(index) {
        return index === 0;
    }
    /**
     * @private
     * @return {?}
     */
    selectInitialSlides() {
        /** @type {?} */
        const startIndex = this.startFromIndex <= this._slides.length
            ? this.startFromIndex
            : 0;
        this.hideSlides();
        if (this.singleSlideOffset) {
            this._slidesWithIndexes = this.mapSlidesAndIndexes();
            if (this._slides.length - startIndex < this.itemsPerSlide) {
                /** @type {?} */
                const slidesToAppend = this._slidesWithIndexes.slice(0, startIndex);
                this._slidesWithIndexes = [
                    ...this._slidesWithIndexes,
                    ...slidesToAppend
                ]
                    .slice(slidesToAppend.length)
                    .slice(0, this.itemsPerSlide);
            }
            else {
                this._slidesWithIndexes = this._slidesWithIndexes.slice(startIndex, startIndex + this.itemsPerSlide);
            }
            this._slidesWithIndexes.forEach((slide) => slide.item.active = true);
            this.makeSlidesConsistent(this._slidesWithIndexes);
        }
        else {
            this.selectRangeByNestedIndex(startIndex);
        }
        this.slideRangeChange.emit(this.getVisibleIndexes());
    }
    /**
     * Defines next slide index, depending of direction
     * @private
     * @param {?} direction
     * @param {?} force
     * @return {?}
     */
    findNextSlideIndex(direction, force) {
        /** @type {?} */
        let nextSlideIndex = 0;
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
    }
    /**
     * @private
     * @return {?}
     */
    mapSlidesAndIndexes() {
        return this.slides
            .slice()
            .map((slide, index) => {
            return {
                index,
                item: slide
            };
        });
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    selectSlideRange(index) {
        if (this.isIndexInRange(index)) {
            return;
        }
        this.hideSlides();
        if (!this.singleSlideOffset) {
            this.selectRangeByNestedIndex(index);
        }
        else {
            /** @type {?} */
            const startIndex = this.isIndexOnTheEdges(index)
                ? index
                : index - this.itemsPerSlide + 1;
            /** @type {?} */
            const endIndex = this.isIndexOnTheEdges(index)
                ? index + this.itemsPerSlide
                : index + 1;
            this._slidesWithIndexes = this.mapSlidesAndIndexes().slice(startIndex, endIndex);
            this.makeSlidesConsistent(this._slidesWithIndexes);
            this._slidesWithIndexes.forEach((slide) => slide.item.active = true);
        }
        this.slideRangeChange.emit(this.getVisibleIndexes());
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    selectRangeByNestedIndex(index) {
        /** @type {?} */
        const selectedRange = this._chunkedSlides
            .map((slidesList, i) => {
            return {
                index: i,
                list: slidesList
            };
        })
            .find((slidesList) => {
            return slidesList.list.find(slide => slide.index === index) !== undefined;
        });
        this._currentVisibleSlidesIndex = selectedRange.index;
        this._chunkedSlides[selectedRange.index].forEach((slide) => {
            slide.item.active = true;
        });
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    isIndexOnTheEdges(index) {
        return (index + 1 - this.itemsPerSlide <= 0 ||
            index + this.itemsPerSlide <= this._slides.length);
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    isIndexInRange(index) {
        if (this.singleSlideOffset) {
            /** @type {?} */
            const visibleIndexes = this._slidesWithIndexes.map((slide) => slide.index);
            return visibleIndexes.indexOf(index) >= 0;
        }
        return (index <= this.getLastVisibleIndex() &&
            index >= this.getFirstVisibleIndex());
    }
    /**
     * @private
     * @return {?}
     */
    hideSlides() {
        this.slides.forEach((slide) => slide.active = false);
    }
    /**
     * @private
     * @return {?}
     */
    isVisibleSlideListLast() {
        return this._currentVisibleSlidesIndex === this._chunkedSlides.length - 1;
    }
    /**
     * @private
     * @return {?}
     */
    isVisibleSlideListFirst() {
        return this._currentVisibleSlidesIndex === 0;
    }
    /**
     * @private
     * @param {?} direction
     * @return {?}
     */
    moveSliderByOneItem(direction) {
        /** @type {?} */
        let firstVisibleIndex;
        /** @type {?} */
        let lastVisibleIndex;
        /** @type {?} */
        let indexToHide;
        /** @type {?} */
        let indexToShow;
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
            const slidesToReorder = this.mapSlidesAndIndexes().filter((slide) => slide.item.active);
            this.makeSlidesConsistent(slidesToReorder);
            this.slideRangeChange.emit(this.getVisibleIndexes());
        }
        else {
            /** @type {?} */
            let displayedIndex;
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
                this._slidesWithIndexes = [{
                        index: displayedIndex,
                        item: this._slides.get(displayedIndex)
                    }, ...this._slidesWithIndexes];
            }
            this.hideSlides();
            this._slidesWithIndexes.forEach(slide => slide.item.active = true);
            this.makeSlidesConsistent(this._slidesWithIndexes);
            this.slideRangeChange.emit(this._slidesWithIndexes.map((slide) => slide.index));
        }
    }
    /**
     * @private
     * @param {?} direction
     * @return {?}
     */
    moveMultilist(direction) {
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
            this._chunkedSlides[this._currentVisibleSlidesIndex].forEach((slide) => slide.item.active = true);
            this.slideRangeChange.emit(this.getVisibleIndexes());
        }
    }
    /**
     * @private
     * @return {?}
     */
    getVisibleIndexes() {
        if (!this.singleSlideOffset) {
            return this._chunkedSlides[this._currentVisibleSlidesIndex]
                .map((slide) => slide.index);
        }
        else {
            return this._slidesWithIndexes.map((slide) => slide.index);
        }
    }
    /**
     * Sets a slide, which specified through index, as active
     * @private
     * @param {?} index
     * @return {?}
     */
    _select(index) {
        if (isNaN(index)) {
            this.pause();
            return;
        }
        if (!this.multilist) {
            /** @type {?} */
            const currentSlide = this._slides.get(this._currentActiveSlide);
            if (currentSlide) {
                currentSlide.active = false;
            }
        }
        /** @type {?} */
        const nextSlide = this._slides.get(index);
        if (nextSlide) {
            this._currentActiveSlide = index;
            nextSlide.active = true;
            this.activeSlide = index;
            this.activeSlideChange.emit(index);
        }
    }
    /**
     * Starts loop of auto changing of slides
     * @private
     * @return {?}
     */
    restartTimer() {
        this.resetTimer();
        /** @type {?} */
        const interval = +this.interval;
        if (!isNaN(interval) && interval > 0) {
            this.currentInterval = this.ngZone.runOutsideAngular(() => {
                return setInterval(() => {
                    /** @type {?} */
                    const nInterval = +this.interval;
                    this.ngZone.run(() => {
                        if (this.isPlaying &&
                            !isNaN(this.interval) &&
                            nInterval > 0 &&
                            this.slides.length) {
                            this.nextSlide();
                        }
                        else {
                            this.pause();
                        }
                    });
                }, interval);
            });
        }
    }
    /**
     * @return {?}
     */
    get multilist() {
        return this.itemsPerSlide > 1;
    }
    /**
     * Stops loop of auto changing of slides
     * @private
     * @return {?}
     */
    resetTimer() {
        if (this.currentInterval) {
            clearInterval(this.currentInterval);
            this.currentInterval = void 0;
        }
    }
}
CarouselComponent.decorators = [
    { type: Component, args: [{
                selector: 'carousel',
                template: "<div (mouseenter)=\"pause()\" (mouseleave)=\"play()\" (mouseup)=\"play()\" class=\"carousel slide\">\n  <ol class=\"carousel-indicators\" *ngIf=\"showIndicators && slides.length > 1\">\n    <li *ngFor=\"let slidez of slides; let i = index;\" [class.active]=\"slidez.active === true\" (click)=\"selectSlide(i)\"></li>\n  </ol>\n  <div class=\"carousel-inner\" [ngStyle]=\"{'display': multilist ? 'flex' : 'block'}\"><ng-content></ng-content></div>\n  <a class=\"left carousel-control carousel-control-prev\" [class.disabled]=\"activeSlide === 0 && noWrap\" (click)=\"previousSlide()\" *ngIf=\"slides.length > 1\">\n    <span class=\"icon-prev carousel-control-prev-icon\" aria-hidden=\"true\"></span>\n    <span *ngIf=\"isBs4\" class=\"sr-only\">Previous</span>\n  </a>\n  <a class=\"right carousel-control carousel-control-next\" (click)=\"nextSlide()\"  [class.disabled]=\"isLast(activeSlide) && noWrap\" *ngIf=\"slides.length > 1\">\n    <span class=\"icon-next carousel-control-next-icon\" aria-hidden=\"true\"></span>\n    <span class=\"sr-only\">Next</span>\n  </a>\n</div>\n\n\n"
            }] }
];
/** @nocollapse */
CarouselComponent.ctorParameters = () => [
    { type: CarouselConfig },
    { type: NgZone }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWJvb3RzdHJhcC9jYXJvdXNlbC8iLCJzb3VyY2VzIjpbImNhcm91c2VsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkEsT0FBTyxFQUNMLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBYSxNQUFNLEVBQzFELE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFFeEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLE1BQU0sU0FBUyxDQUFDOzs7SUFJckQsVUFBTztJQUNQLE9BQUk7SUFDSixPQUFJOzs7Ozs7Ozs7QUFVTixNQUFNLE9BQU8saUJBQWlCOzs7OztJQXlFNUIsWUFBWSxNQUFzQixFQUFVLE1BQWM7UUFBZCxXQUFNLEdBQU4sTUFBTSxDQUFROztRQWpFakQsa0JBQWEsR0FBRyxDQUFDLENBQUM7OztRQUdsQixzQkFBaUIsR0FBRyxLQUFLLENBQUM7Ozs7UUFJbkMsc0JBQWlCLEdBQXlCLElBQUksWUFBWSxDQUFTLEtBQUssQ0FBQyxDQUFDOzs7O1FBSTFFLHFCQUFnQixHQUEyQixJQUFJLFlBQVksRUFBWSxDQUFDOztRQW1CeEUsbUJBQWMsR0FBRyxDQUFDLENBQUM7UUF3QlQsWUFBTyxHQUErQixJQUFJLFVBQVUsRUFBa0IsQ0FBQztRQUd2RSwrQkFBMEIsR0FBRyxDQUFDLENBQUM7UUFFL0IsY0FBUyxHQUFHLEtBQUssQ0FBQztRQXlHNUIsY0FBUyxHQUFHLENBQUMsS0FBcUIsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQStUNUMseUJBQW9CLEdBQUcsQ0FBQyxNQUF3QixFQUFRLEVBQUU7WUFDaEUs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Q3hCLGFBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLGVBQWUsR0FBRyxLQUFLLENBQUMsQ0FBQztTQUMvQjtJQUNILENBQUM7OztZQTVsQkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxVQUFVO2dCQUNwQix3a0NBQXdDO2FBQ3pDOzs7O1lBaEJRLGNBQWM7WUFMVyxNQUFNOzs7cUJBd0JyQyxLQUFLO3NCQUVMLEtBQUs7NkJBRUwsS0FBSzs0QkFFTCxLQUFLO2dDQUdMLEtBQUs7Z0NBR0wsTUFBTTsrQkFJTixNQUFNOzBCQUlOLEtBQUs7NkJBZUwsS0FBSzt1QkFPTCxLQUFLOzs7O0lBMUNOLG1DQUF5Qjs7SUFFekIsb0NBQTBCOztJQUUxQiwyQ0FBaUM7O0lBRWpDLDBDQUEyQjs7SUFHM0IsOENBQW1DOzs7OztJQUduQyw4Q0FDMEU7Ozs7O0lBRzFFLDZDQUN3RTs7SUFrQnhFLDJDQUNtQjs7Ozs7SUFxQm5CLDRDQUErQjs7Ozs7SUFDL0IsZ0RBQXNDOzs7OztJQUN0QyxzQ0FBNEI7Ozs7O0lBQzVCLG9DQUFpRjs7Ozs7SUFDakYsMkNBQTZDOzs7OztJQUM3QywrQ0FBK0M7Ozs7O0lBQy9DLHVEQUF5Qzs7Ozs7SUFDekMsc0NBQTZCOzs7OztJQUM3QixzQ0FBNEI7O0lBeUc1QixzQ0FBb0Q7Ozs7O0lBK1RwRCxpREFFQzs7Ozs7SUFwYW1DLG1DQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHRzbGludDpkaXNhYmxlOm1heC1maWxlLWxpbmUtY291bnRcbi8qKipcbiAqIHBhdXNlIChub3QgeWV0IHN1cHBvcnRlZCkgKD9zdHJpbmc9J2hvdmVyJykgLSBldmVudCBncm91cCBuYW1lIHdoaWNoIHBhdXNlc1xuICogdGhlIGN5Y2xpbmcgb2YgdGhlIGNhcm91c2VsLCBpZiBob3ZlciBwYXVzZXMgb24gbW91c2VlbnRlciBhbmQgcmVzdW1lcyBvblxuICogbW91c2VsZWF2ZSBrZXlib2FyZCAobm90IHlldCBzdXBwb3J0ZWQpICg/Ym9vbGVhbj10cnVlKSAtIGlmIGZhbHNlXG4gKiBjYXJvdXNlbCB3aWxsIG5vdCByZWFjdCB0byBrZXlib2FyZCBldmVudHNcbiAqIG5vdGU6IHN3aXBpbmcgbm90IHlldCBzdXBwb3J0ZWRcbiAqL1xuLyoqKipcbiAqIFByb2JsZW1zOlxuICogMSkgaWYgd2Ugc2V0IGFuIGFjdGl2ZSBzbGlkZSB2aWEgbW9kZWwgY2hhbmdlcywgLmFjdGl2ZSBjbGFzcyByZW1haW5zIG9uIGFcbiAqIGN1cnJlbnQgc2xpZGUuXG4gKiAyKSBpZiB3ZSBoYXZlIG9ubHkgb25lIHNsaWRlLCB3ZSBzaG91bGRuJ3Qgc2hvdyBwcmV2L25leHQgbmF2IGJ1dHRvbnNcbiAqIDMpIGlmIGZpcnN0IG9yIGxhc3Qgc2xpZGUgaXMgYWN0aXZlIGFuZCBub1dyYXAgaXMgdHJ1ZSwgdGhlcmUgc2hvdWxkIGJlXG4gKiBcImRpc2FibGVkXCIgY2xhc3Mgb24gdGhlIG5hdiBidXR0b25zLlxuICogNCkgZGVmYXVsdCBpbnRlcnZhbCBzaG91bGQgYmUgZXF1YWwgNTAwMFxuICovXG5cbmltcG9ydCB7XG4gIENvbXBvbmVudCwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgTmdab25lLCBPbkRlc3Ryb3ksIE91dHB1dCwgQWZ0ZXJWaWV3SW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgaXNCczMsIExpbmtlZExpc3QgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3V0aWxzJztcbmltcG9ydCB7IFNsaWRlQ29tcG9uZW50IH0gZnJvbSAnLi9zbGlkZS5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2Fyb3VzZWxDb25maWcgfSBmcm9tICcuL2Nhcm91c2VsLmNvbmZpZyc7XG5pbXBvcnQgeyBmaW5kTGFzdEluZGV4LCBjaHVua0J5TnVtYmVyIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBTbGlkZVdpdGhJbmRleCwgSW5kZXhlZFNsaWRlTGlzdCB9IGZyb20gJy4vbW9kZWxzJztcblxuZXhwb3J0IGVudW0gRGlyZWN0aW9uIHtcbiAgVU5LTk9XTixcbiAgTkVYVCxcbiAgUFJFVlxufVxuXG4vKipcbiAqIEJhc2UgZWxlbWVudCB0byBjcmVhdGUgY2Fyb3VzZWxcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnY2Fyb3VzZWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vY2Fyb3VzZWwuY29tcG9uZW50Lmh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIENhcm91c2VsQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgLyogSWYgYHRydWVgIOKAlCBjYXJvdXNlbCB3aWxsIG5vdCBjeWNsZSBjb250aW51b3VzbHkgYW5kIHdpbGwgaGF2ZSBoYXJkIHN0b3BzIChwcmV2ZW50IGxvb3BpbmcpICovXG4gIEBJbnB1dCgpIG5vV3JhcDogYm9vbGVhbjtcbiAgLyogIElmIGB0cnVlYCDigJQgd2lsbCBkaXNhYmxlIHBhdXNpbmcgb24gY2Fyb3VzZWwgbW91c2UgaG92ZXIgKi9cbiAgQElucHV0KCkgbm9QYXVzZTogYm9vbGVhbjtcbiAgLyogIElmIGB0cnVlYCDigJQgY2Fyb3VzZWwtaW5kaWNhdG9ycyBhcmUgdmlzaWJsZSAgKi9cbiAgQElucHV0KCkgc2hvd0luZGljYXRvcnM6IGJvb2xlYW47XG4gIC8qIElmIHZhbHVlIG1vcmUgdGhlbiAxIOKAlCBjYXJvdXNlbCB3b3JrcyBpbiBtdWx0aWxpc3QgbW9kZSAqL1xuICBASW5wdXQoKSBpdGVtc1BlclNsaWRlID0gMTtcbiAgLyogSWYgYHRydWVgIOKAlCBjYXJvdXNlbCBzaGlmdHMgYnkgb25lIGVsZW1lbnQuIEJ5IGRlZmF1bHQgY2Fyb3VzZWwgc2hpZnRzIGJ5IG51bWJlclxuICAgICBvZiB2aXNpYmxlIGVsZW1lbnRzIChpdGVtc1BlclNsaWRlIGZpZWxkKSAqL1xuICBASW5wdXQoKSBzaW5nbGVTbGlkZU9mZnNldCA9IGZhbHNlO1xuXG4gIC8qKiBXaWxsIGJlIGVtaXR0ZWQgd2hlbiBhY3RpdmUgc2xpZGUgaGFzIGJlZW4gY2hhbmdlZC4gUGFydCBvZiB0d28td2F5LWJpbmRhYmxlIFsoYWN0aXZlU2xpZGUpXSBwcm9wZXJ0eSAqL1xuICBAT3V0cHV0KClcbiAgYWN0aXZlU2xpZGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KGZhbHNlKTtcblxuICAvKiogV2lsbCBiZSBlbWl0dGVkIHdoZW4gYWN0aXZlIHNsaWRlcyBoYXMgYmVlbiBjaGFuZ2VkIGluIG11bHRpbGlzdCBtb2RlICovXG4gIEBPdXRwdXQoKVxuICBzbGlkZVJhbmdlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyW10+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXJbXT4oKTtcblxuICAvKiogSW5kZXggb2YgY3VycmVudGx5IGRpc3BsYXllZCBzbGlkZShzdGFydGVkIGZvciAwKSAqL1xuICBASW5wdXQoKVxuICBzZXQgYWN0aXZlU2xpZGUoaW5kZXg6IG51bWJlcikge1xuICAgIGlmICh0aGlzLm11bHRpbGlzdCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5fc2xpZGVzLmxlbmd0aCAmJiBpbmRleCAhPT0gdGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlKSB7XG4gICAgICB0aGlzLl9zZWxlY3QoaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBhY3RpdmVTbGlkZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGU7XG4gIH1cblxuICAvKiBJbmRleCB0byBzdGFydCBkaXNwbGF5IHNsaWRlcyBmcm9tIGl0ICovXG4gIEBJbnB1dCgpXG4gIHN0YXJ0RnJvbUluZGV4ID0gMDtcblxuICAvKipcbiAgICogRGVsYXkgb2YgaXRlbSBjeWNsaW5nIGluIG1pbGxpc2Vjb25kcy4gSWYgZmFsc2UsIGNhcm91c2VsIHdvbid0IGN5Y2xlXG4gICAqIGF1dG9tYXRpY2FsbHkuXG4gICAqL1xuICBASW5wdXQoKVxuICBnZXQgaW50ZXJ2YWwoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5faW50ZXJ2YWw7XG4gIH1cblxuICBzZXQgaW50ZXJ2YWwodmFsdWU6IG51bWJlcikge1xuICAgIHRoaXMuX2ludGVydmFsID0gdmFsdWU7XG4gICAgdGhpcy5yZXN0YXJ0VGltZXIoKTtcbiAgfVxuXG4gIGdldCBzbGlkZXMoKTogU2xpZGVDb21wb25lbnRbXSB7XG4gICAgcmV0dXJuIHRoaXMuX3NsaWRlcy50b0FycmF5KCk7XG4gIH1cblxuICAvLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tYW55XG4gIHByb3RlY3RlZCBjdXJyZW50SW50ZXJ2YWw6IGFueTtcbiAgcHJvdGVjdGVkIF9jdXJyZW50QWN0aXZlU2xpZGU6IG51bWJlcjtcbiAgcHJvdGVjdGVkIF9pbnRlcnZhbDogbnVtYmVyO1xuICBwcm90ZWN0ZWQgX3NsaWRlczogTGlua2VkTGlzdDxTbGlkZUNvbXBvbmVudD4gPSBuZXcgTGlua2VkTGlzdDxTbGlkZUNvbXBvbmVudD4oKTtcbiAgcHJvdGVjdGVkIF9jaHVua2VkU2xpZGVzOiBTbGlkZVdpdGhJbmRleFtdW107XG4gIHByb3RlY3RlZCBfc2xpZGVzV2l0aEluZGV4ZXM6IFNsaWRlV2l0aEluZGV4W107XG4gIHByb3RlY3RlZCBfY3VycmVudFZpc2libGVTbGlkZXNJbmRleCA9IDA7XG4gIHByb3RlY3RlZCBpc1BsYXlpbmc6IGJvb2xlYW47XG4gIHByb3RlY3RlZCBkZXN0cm95ZWQgPSBmYWxzZTtcblxuICBnZXQgaXNCczQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuICFpc0JzMygpO1xuICB9XG5cbiAgY29uc3RydWN0b3IoY29uZmlnOiBDYXJvdXNlbENvbmZpZywgcHJpdmF0ZSBuZ1pvbmU6IE5nWm9uZSkge1xuICAgIE9iamVjdC5hc3NpZ24odGhpcywgY29uZmlnKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLm11bHRpbGlzdCkge1xuICAgICAgICB0aGlzLl9jaHVua2VkU2xpZGVzID0gY2h1bmtCeU51bWJlcihcbiAgICAgICAgICB0aGlzLm1hcFNsaWRlc0FuZEluZGV4ZXMoKSxcbiAgICAgICAgICB0aGlzLml0ZW1zUGVyU2xpZGVcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5zZWxlY3RJbml0aWFsU2xpZGVzKCk7XG4gICAgICB9XG4gICAgfSwgMCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmRlc3Ryb3llZCA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBuZXcgc2xpZGUuIElmIHRoaXMgc2xpZGUgaXMgZmlyc3QgaW4gY29sbGVjdGlvbiAtIHNldCBpdCBhcyBhY3RpdmVcbiAgICogYW5kIHN0YXJ0cyBhdXRvIGNoYW5naW5nXG4gICAqIEBwYXJhbSBzbGlkZVxuICAgKi9cbiAgYWRkU2xpZGUoc2xpZGU6IFNsaWRlQ29tcG9uZW50KTogdm9pZCB7XG4gICAgdGhpcy5fc2xpZGVzLmFkZChzbGlkZSk7XG5cbiAgICBpZiAodGhpcy5tdWx0aWxpc3QgJiYgdGhpcy5fc2xpZGVzLmxlbmd0aCA8PSB0aGlzLml0ZW1zUGVyU2xpZGUpIHtcbiAgICAgIHNsaWRlLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLm11bHRpbGlzdCAmJiB0aGlzLl9zbGlkZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmFjdGl2ZVNsaWRlID0gMDtcbiAgICAgIHRoaXMucGxheSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHNwZWNpZmllZCBzbGlkZS4gSWYgdGhpcyBzbGlkZSBpcyBhY3RpdmUgLSB3aWxsIHJvbGwgdG8gYW5vdGhlclxuICAgKiBzbGlkZVxuICAgKiBAcGFyYW0gc2xpZGVcbiAgICovXG4gIHJlbW92ZVNsaWRlKHNsaWRlOiBTbGlkZUNvbXBvbmVudCk6IHZvaWQge1xuICAgIGNvbnN0IHJlbUluZGV4ID0gdGhpcy5fc2xpZGVzLmluZGV4T2Yoc2xpZGUpO1xuXG4gICAgaWYgKHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSA9PT0gcmVtSW5kZXgpIHtcbiAgICAgIC8vIHJlbW92aW5nIG9mIGFjdGl2ZSBzbGlkZVxuICAgICAgbGV0IG5leHRTbGlkZUluZGV4OiBudW1iZXIgPSB2b2lkIDA7XG4gICAgICBpZiAodGhpcy5fc2xpZGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgLy8gaWYgdGhpcyBzbGlkZSBsYXN0IC0gd2lsbCByb2xsIHRvIGZpcnN0IHNsaWRlLCBpZiBub1dyYXAgZmxhZyBpc1xuICAgICAgICAvLyBGQUxTRSBvciB0byBwcmV2aW91cywgaWYgbm9XcmFwIGlzIFRSVUUgaW4gY2FzZSwgaWYgdGhpcyBzbGlkZSBpblxuICAgICAgICAvLyBtaWRkbGUgb2YgY29sbGVjdGlvbiwgaW5kZXggb2YgbmV4dCBzbGlkZSBpcyBzYW1lIHRvIHJlbW92ZWRcbiAgICAgICAgbmV4dFNsaWRlSW5kZXggPSAhdGhpcy5pc0xhc3QocmVtSW5kZXgpXG4gICAgICAgICAgPyByZW1JbmRleFxuICAgICAgICAgIDogdGhpcy5ub1dyYXAgPyByZW1JbmRleCAtIDEgOiAwO1xuICAgICAgfVxuICAgICAgdGhpcy5fc2xpZGVzLnJlbW92ZShyZW1JbmRleCk7XG5cbiAgICAgIC8vIHByZXZlbnRzIGV4Y2VwdGlvbiB3aXRoIGNoYW5naW5nIHNvbWUgdmFsdWUgYWZ0ZXIgY2hlY2tpbmdcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLl9zZWxlY3QobmV4dFNsaWRlSW5kZXgpO1xuICAgICAgfSwgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX3NsaWRlcy5yZW1vdmUocmVtSW5kZXgpO1xuICAgICAgY29uc3QgY3VycmVudFNsaWRlSW5kZXggPSB0aGlzLmdldEN1cnJlbnRTbGlkZUluZGV4KCk7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgLy8gYWZ0ZXIgcmVtb3ZpbmcsIG5lZWQgdG8gYWN0dWFsaXplIGluZGV4IG9mIGN1cnJlbnQgYWN0aXZlIHNsaWRlXG4gICAgICAgIHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSA9IGN1cnJlbnRTbGlkZUluZGV4O1xuICAgICAgICB0aGlzLmFjdGl2ZVNsaWRlQ2hhbmdlLmVtaXQodGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlKTtcbiAgICAgIH0sIDApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSb2xsaW5nIHRvIG5leHQgc2xpZGVcbiAgICogQHBhcmFtIGZvcmNlOiB7Ym9vbGVhbn0gaWYgdHJ1ZSAtIHdpbGwgaWdub3JlIG5vV3JhcCBmbGFnXG4gICAqL1xuICBuZXh0U2xpZGUoZm9yY2UgPSBmYWxzZSk6IHZvaWQge1xuICAgIHRoaXMubW92ZShEaXJlY3Rpb24uTkVYVCwgZm9yY2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJvbGxpbmcgdG8gcHJldmlvdXMgc2xpZGVcbiAgICogQHBhcmFtIGZvcmNlOiB7Ym9vbGVhbn0gaWYgdHJ1ZSAtIHdpbGwgaWdub3JlIG5vV3JhcCBmbGFnXG4gICAqL1xuICBwcmV2aW91c1NsaWRlKGZvcmNlID0gZmFsc2UpOiB2b2lkIHtcbiAgICB0aGlzLm1vdmUoRGlyZWN0aW9uLlBSRVYsIGZvcmNlKTtcbiAgfVxuXG4gIGdldEZpcnN0VmlzaWJsZUluZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuc2xpZGVzLmZpbmRJbmRleCh0aGlzLmdldEFjdGl2ZSk7XG4gIH1cblxuICBnZXRMYXN0VmlzaWJsZUluZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGZpbmRMYXN0SW5kZXgodGhpcy5zbGlkZXMsIHRoaXMuZ2V0QWN0aXZlKTtcbiAgfVxuXG4gIGdldEFjdGl2ZSA9IChzbGlkZTogU2xpZGVDb21wb25lbnQpID0+IHNsaWRlLmFjdGl2ZTtcblxuICBtb3ZlKGRpcmVjdGlvbjogRGlyZWN0aW9uLCBmb3JjZSA9IGZhbHNlKTogdm9pZCB7XG4gICAgY29uc3QgZmlyc3RWaXNpYmxlSW5kZXggPSB0aGlzLmdldEZpcnN0VmlzaWJsZUluZGV4KCk7XG4gICAgY29uc3QgbGFzdFZpc2libGVJbmRleCA9IHRoaXMuZ2V0TGFzdFZpc2libGVJbmRleCgpO1xuXG4gICAgaWYgKHRoaXMubm9XcmFwKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLk5FWFQgJiZcbiAgICAgICAgdGhpcy5pc0xhc3QobGFzdFZpc2libGVJbmRleCkgfHxcbiAgICAgICAgZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uUFJFViAmJlxuICAgICAgICBmaXJzdFZpc2libGVJbmRleCA9PT0gMFxuICAgICAgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXRoaXMubXVsdGlsaXN0KSB7XG4gICAgICB0aGlzLmFjdGl2ZVNsaWRlID0gdGhpcy5maW5kTmV4dFNsaWRlSW5kZXgoZGlyZWN0aW9uLCBmb3JjZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubW92ZU11bHRpbGlzdChkaXJlY3Rpb24pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSb2xsaW5nIHRvIHNwZWNpZmllZCBzbGlkZVxuICAgKiBAcGFyYW0gaW5kZXg6IHtudW1iZXJ9IGluZGV4IG9mIHNsaWRlLCB3aGljaCBtdXN0IGJlIHNob3duXG4gICAqL1xuICBzZWxlY3RTbGlkZShpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLm11bHRpbGlzdCkge1xuICAgICAgdGhpcy5hY3RpdmVTbGlkZSA9IGluZGV4O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdFNsaWRlUmFuZ2UoaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgYSBhdXRvIGNoYW5naW5nIG9mIHNsaWRlc1xuICAgKi9cbiAgcGxheSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNQbGF5aW5nKSB7XG4gICAgICB0aGlzLmlzUGxheWluZyA9IHRydWU7XG4gICAgICB0aGlzLnJlc3RhcnRUaW1lcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wcyBhIGF1dG8gY2hhbmdpbmcgb2Ygc2xpZGVzXG4gICAqL1xuICBwYXVzZSgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubm9QYXVzZSkge1xuICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMucmVzZXRUaW1lcigpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGaW5kcyBhbmQgcmV0dXJucyBpbmRleCBvZiBjdXJyZW50bHkgZGlzcGxheWVkIHNsaWRlXG4gICAqL1xuICBnZXRDdXJyZW50U2xpZGVJbmRleCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9zbGlkZXMuZmluZEluZGV4KHRoaXMuZ2V0QWN0aXZlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEZWZpbmVzLCB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgaW5kZXggaXMgbGFzdCBpbiBjb2xsZWN0aW9uXG4gICAqIEBwYXJhbSBpbmRleFxuICAgKi9cbiAgaXNMYXN0KGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaW5kZXggKyAxID49IHRoaXMuX3NsaWRlcy5sZW5ndGg7XG4gIH1cblxuICAvKipcbiAgICogRGVmaW5lcywgd2hldGhlciB0aGUgc3BlY2lmaWVkIGluZGV4IGlzIGZpcnN0IGluIGNvbGxlY3Rpb25cbiAgICogQHBhcmFtIGluZGV4XG4gICAqL1xuICBpc0ZpcnN0KGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaW5kZXggPT09IDA7XG4gIH1cblxuICBwcml2YXRlIHNlbGVjdEluaXRpYWxTbGlkZXMoKTogdm9pZCB7XG4gICAgY29uc3Qgc3RhcnRJbmRleCA9IHRoaXMuc3RhcnRGcm9tSW5kZXggPD0gdGhpcy5fc2xpZGVzLmxlbmd0aFxuICAgICAgPyB0aGlzLnN0YXJ0RnJvbUluZGV4XG4gICAgICA6IDA7XG5cbiAgICB0aGlzLmhpZGVTbGlkZXMoKTtcblxuICAgIGlmICh0aGlzLnNpbmdsZVNsaWRlT2Zmc2V0KSB7XG4gICAgICB0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcyA9IHRoaXMubWFwU2xpZGVzQW5kSW5kZXhlcygpO1xuXG4gICAgICBpZiAodGhpcy5fc2xpZGVzLmxlbmd0aCAtIHN0YXJ0SW5kZXggPCB0aGlzLml0ZW1zUGVyU2xpZGUpIHtcbiAgICAgICAgY29uc3Qgc2xpZGVzVG9BcHBlbmQgPSB0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcy5zbGljZSgwLCBzdGFydEluZGV4KTtcblxuICAgICAgICB0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcyAgPSBbXG4gICAgICAgICAgLi4udGhpcy5fc2xpZGVzV2l0aEluZGV4ZXMsXG4gICAgICAgICAgLi4uc2xpZGVzVG9BcHBlbmRcbiAgICAgICAgXVxuICAgICAgICAuc2xpY2Uoc2xpZGVzVG9BcHBlbmQubGVuZ3RoKVxuICAgICAgICAuc2xpY2UoMCwgdGhpcy5pdGVtc1BlclNsaWRlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzID0gdGhpcy5fc2xpZGVzV2l0aEluZGV4ZXMuc2xpY2UoXG4gICAgICAgICAgc3RhcnRJbmRleCxcbiAgICAgICAgICBzdGFydEluZGV4ICsgdGhpcy5pdGVtc1BlclNsaWRlXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzLmZvckVhY2goKHNsaWRlOiBTbGlkZVdpdGhJbmRleCkgPT4gc2xpZGUuaXRlbS5hY3RpdmUgPSB0cnVlKTtcbiAgICAgIHRoaXMubWFrZVNsaWRlc0NvbnNpc3RlbnQodGhpcy5fc2xpZGVzV2l0aEluZGV4ZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbGVjdFJhbmdlQnlOZXN0ZWRJbmRleChzdGFydEluZGV4KTtcbiAgICB9XG5cbiAgICB0aGlzLnNsaWRlUmFuZ2VDaGFuZ2UuZW1pdCh0aGlzLmdldFZpc2libGVJbmRleGVzKCkpO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmluZXMgbmV4dCBzbGlkZSBpbmRleCwgZGVwZW5kaW5nIG9mIGRpcmVjdGlvblxuICAgKiBAcGFyYW0gZGlyZWN0aW9uOiBEaXJlY3Rpb24oVU5LTk9XTnxQUkVWfE5FWFQpXG4gICAqIEBwYXJhbSBmb3JjZToge2Jvb2xlYW59IGlmIFRSVUUgLSB3aWxsIGlnbm9yZSBub1dyYXAgZmxhZywgZWxzZSB3aWxsXG4gICAqICAgcmV0dXJuIHVuZGVmaW5lZCBpZiBuZXh0IHNsaWRlIHJlcXVpcmUgd3JhcHBpbmdcbiAgICovXG4gIHByaXZhdGUgZmluZE5leHRTbGlkZUluZGV4KGRpcmVjdGlvbjogRGlyZWN0aW9uLCBmb3JjZTogYm9vbGVhbik6IG51bWJlciB7XG4gICAgbGV0IG5leHRTbGlkZUluZGV4ID0gMDtcblxuICAgIGlmIChcbiAgICAgICFmb3JjZSAmJlxuICAgICAgKHRoaXMuaXNMYXN0KHRoaXMuYWN0aXZlU2xpZGUpICYmXG4gICAgICAgIGRpcmVjdGlvbiAhPT0gRGlyZWN0aW9uLlBSRVYgJiZcbiAgICAgICAgdGhpcy5ub1dyYXApXG4gICAgKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICBjYXNlIERpcmVjdGlvbi5ORVhUOlxuICAgICAgICAvLyBpZiB0aGlzIGlzIGxhc3Qgc2xpZGUsIG5vdCBmb3JjZSwgbG9vcGluZyBpcyBkaXNhYmxlZFxuICAgICAgICAvLyBhbmQgbmVlZCB0byBnb2luZyBmb3J3YXJkIC0gc2VsZWN0IGN1cnJlbnQgc2xpZGUsIGFzIGEgbmV4dFxuICAgICAgICBuZXh0U2xpZGVJbmRleCA9ICF0aGlzLmlzTGFzdCh0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUpXG4gICAgICAgICAgPyB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUgKyAxXG4gICAgICAgICAgOiAhZm9yY2UgJiYgdGhpcy5ub1dyYXAgPyB0aGlzLl9jdXJyZW50QWN0aXZlU2xpZGUgOiAwO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRGlyZWN0aW9uLlBSRVY6XG4gICAgICAgIC8vIGlmIHRoaXMgaXMgZmlyc3Qgc2xpZGUsIG5vdCBmb3JjZSwgbG9vcGluZyBpcyBkaXNhYmxlZFxuICAgICAgICAvLyBhbmQgbmVlZCB0byBnb2luZyBiYWNrd2FyZCAtIHNlbGVjdCBjdXJyZW50IHNsaWRlLCBhcyBhIG5leHRcbiAgICAgICAgbmV4dFNsaWRlSW5kZXggPVxuICAgICAgICAgIHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSA+IDBcbiAgICAgICAgICAgID8gdGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlIC0gMVxuICAgICAgICAgICAgOiAhZm9yY2UgJiYgdGhpcy5ub1dyYXBcbiAgICAgICAgICAgID8gdGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlXG4gICAgICAgICAgICA6IHRoaXMuX3NsaWRlcy5sZW5ndGggLSAxO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBkaXJlY3Rpb24nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV4dFNsaWRlSW5kZXg7XG4gIH1cblxuICBwcml2YXRlIG1hcFNsaWRlc0FuZEluZGV4ZXMoKTogU2xpZGVXaXRoSW5kZXhbXSB7XG4gICAgcmV0dXJuIHRoaXMuc2xpZGVzXG4gICAgICAuc2xpY2UoKVxuICAgICAgLm1hcCgoc2xpZGU6IFNsaWRlQ29tcG9uZW50LCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgaXRlbTogc2xpZGVcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICB9XG5cblxuICBwcml2YXRlIHNlbGVjdFNsaWRlUmFuZ2UoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzSW5kZXhJblJhbmdlKGluZGV4KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaGlkZVNsaWRlcygpO1xuXG4gICAgaWYgKCF0aGlzLnNpbmdsZVNsaWRlT2Zmc2V0KSB7XG4gICAgICB0aGlzLnNlbGVjdFJhbmdlQnlOZXN0ZWRJbmRleChpbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IHN0YXJ0SW5kZXggPSB0aGlzLmlzSW5kZXhPblRoZUVkZ2VzKGluZGV4KVxuICAgICAgICA/IGluZGV4XG4gICAgICAgIDogaW5kZXggLSB0aGlzLml0ZW1zUGVyU2xpZGUgKyAxO1xuXG4gICAgICBjb25zdCBlbmRJbmRleCA9IHRoaXMuaXNJbmRleE9uVGhlRWRnZXMoaW5kZXgpXG4gICAgICAgID8gaW5kZXggKyB0aGlzLml0ZW1zUGVyU2xpZGVcbiAgICAgICAgOiBpbmRleCArIDE7XG5cbiAgICAgIHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzID0gdGhpcy5tYXBTbGlkZXNBbmRJbmRleGVzKCkuc2xpY2Uoc3RhcnRJbmRleCwgZW5kSW5kZXgpO1xuICAgICAgdGhpcy5tYWtlU2xpZGVzQ29uc2lzdGVudCh0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcyk7XG5cbiAgICAgIHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzLmZvckVhY2goKHNsaWRlOiBTbGlkZVdpdGhJbmRleCkgPT4gc2xpZGUuaXRlbS5hY3RpdmUgPSB0cnVlKTtcbiAgICB9XG5cbiAgICB0aGlzLnNsaWRlUmFuZ2VDaGFuZ2UuZW1pdCh0aGlzLmdldFZpc2libGVJbmRleGVzKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZWxlY3RSYW5nZUJ5TmVzdGVkSW5kZXgoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGNvbnN0IHNlbGVjdGVkUmFuZ2UgPSB0aGlzLl9jaHVua2VkU2xpZGVzXG4gICAgICAubWFwKChzbGlkZXNMaXN0LCBpOiBudW1iZXIpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBpbmRleDogaSxcbiAgICAgICAgICBsaXN0OiBzbGlkZXNMaXN0XG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICAgLmZpbmQoXG4gICAgICAgIChzbGlkZXNMaXN0OiBJbmRleGVkU2xpZGVMaXN0KSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHNsaWRlc0xpc3QubGlzdC5maW5kKHNsaWRlID0+IHNsaWRlLmluZGV4ID09PSBpbmRleCkgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgIHRoaXMuX2N1cnJlbnRWaXNpYmxlU2xpZGVzSW5kZXggPSBzZWxlY3RlZFJhbmdlLmluZGV4O1xuXG4gICAgdGhpcy5fY2h1bmtlZFNsaWRlc1tzZWxlY3RlZFJhbmdlLmluZGV4XS5mb3JFYWNoKChzbGlkZTogU2xpZGVXaXRoSW5kZXgpID0+IHtcbiAgICAgIHNsaWRlLml0ZW0uYWN0aXZlID0gdHJ1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgaXNJbmRleE9uVGhlRWRnZXMoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICBpbmRleCArIDEgLSB0aGlzLml0ZW1zUGVyU2xpZGUgPD0gMCB8fFxuICAgICAgaW5kZXggKyB0aGlzLml0ZW1zUGVyU2xpZGUgPD0gdGhpcy5fc2xpZGVzLmxlbmd0aFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGlzSW5kZXhJblJhbmdlKGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5zaW5nbGVTbGlkZU9mZnNldCkge1xuICAgICAgY29uc3QgdmlzaWJsZUluZGV4ZXMgPSB0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcy5tYXAoKHNsaWRlOiBTbGlkZVdpdGhJbmRleCkgPT4gc2xpZGUuaW5kZXgpO1xuXG4gICAgICByZXR1cm4gdmlzaWJsZUluZGV4ZXMuaW5kZXhPZihpbmRleCkgPj0gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgaW5kZXggPD0gdGhpcy5nZXRMYXN0VmlzaWJsZUluZGV4KCkgJiZcbiAgICAgIGluZGV4ID49IHRoaXMuZ2V0Rmlyc3RWaXNpYmxlSW5kZXgoKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGhpZGVTbGlkZXMoKTogdm9pZCB7XG4gICAgdGhpcy5zbGlkZXMuZm9yRWFjaCgoc2xpZGU6IFNsaWRlQ29tcG9uZW50KSA9PiBzbGlkZS5hY3RpdmUgPSBmYWxzZSk7XG4gIH1cblxuICBwcml2YXRlIGlzVmlzaWJsZVNsaWRlTGlzdExhc3QoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRWaXNpYmxlU2xpZGVzSW5kZXggPT09IHRoaXMuX2NodW5rZWRTbGlkZXMubGVuZ3RoIC0gMTtcbiAgfVxuXG4gIHByaXZhdGUgaXNWaXNpYmxlU2xpZGVMaXN0Rmlyc3QoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRWaXNpYmxlU2xpZGVzSW5kZXggPT09IDA7XG4gIH1cblxuICBwcml2YXRlIG1vdmVTbGlkZXJCeU9uZUl0ZW0oZGlyZWN0aW9uOiBEaXJlY3Rpb24pOiB2b2lkIHtcbiAgICBsZXQgZmlyc3RWaXNpYmxlSW5kZXg6IG51bWJlcjtcbiAgICBsZXQgbGFzdFZpc2libGVJbmRleDogbnVtYmVyO1xuICAgIGxldCBpbmRleFRvSGlkZTogbnVtYmVyO1xuICAgIGxldCBpbmRleFRvU2hvdzogbnVtYmVyO1xuXG4gICAgaWYgKHRoaXMubm9XcmFwKSB7XG4gICAgICBmaXJzdFZpc2libGVJbmRleCA9IHRoaXMuZ2V0Rmlyc3RWaXNpYmxlSW5kZXgoKTtcbiAgICAgIGxhc3RWaXNpYmxlSW5kZXggPSB0aGlzLmdldExhc3RWaXNpYmxlSW5kZXgoKTtcblxuICAgICAgaW5kZXhUb0hpZGUgPSBkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5ORVhUXG4gICAgICAgID8gZmlyc3RWaXNpYmxlSW5kZXhcbiAgICAgICAgOiBsYXN0VmlzaWJsZUluZGV4O1xuXG4gICAgICBpbmRleFRvU2hvdyA9IGRpcmVjdGlvbiAhPT0gRGlyZWN0aW9uLk5FWFRcbiAgICAgICAgPyBmaXJzdFZpc2libGVJbmRleCAtIDFcbiAgICAgICAgOiAhdGhpcy5pc0xhc3QobGFzdFZpc2libGVJbmRleClcbiAgICAgICAgPyBsYXN0VmlzaWJsZUluZGV4ICsgMSA6IDA7XG5cbiAgICAgIHRoaXMuX3NsaWRlcy5nZXQoaW5kZXhUb0hpZGUpLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgdGhpcy5fc2xpZGVzLmdldChpbmRleFRvU2hvdykuYWN0aXZlID0gdHJ1ZTtcblxuICAgICAgY29uc3Qgc2xpZGVzVG9SZW9yZGVyID0gdGhpcy5tYXBTbGlkZXNBbmRJbmRleGVzKCkuZmlsdGVyKFxuICAgICAgICAoc2xpZGU6IFNsaWRlV2l0aEluZGV4KSA9PiBzbGlkZS5pdGVtLmFjdGl2ZVxuICAgICAgKTtcblxuICAgICAgdGhpcy5tYWtlU2xpZGVzQ29uc2lzdGVudChzbGlkZXNUb1Jlb3JkZXIpO1xuXG4gICAgICB0aGlzLnNsaWRlUmFuZ2VDaGFuZ2UuZW1pdCh0aGlzLmdldFZpc2libGVJbmRleGVzKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZGlzcGxheWVkSW5kZXg6IG51bWJlcjtcblxuICAgICAgZmlyc3RWaXNpYmxlSW5kZXggPSB0aGlzLl9zbGlkZXNXaXRoSW5kZXhlc1swXS5pbmRleDtcbiAgICAgIGxhc3RWaXNpYmxlSW5kZXggPSB0aGlzLl9zbGlkZXNXaXRoSW5kZXhlc1t0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcy5sZW5ndGggLSAxXS5pbmRleDtcblxuICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLk5FWFQpIHtcbiAgICAgICAgdGhpcy5fc2xpZGVzV2l0aEluZGV4ZXMuc2hpZnQoKTtcblxuICAgICAgICBkaXNwbGF5ZWRJbmRleCA9IHRoaXMuaXNMYXN0KGxhc3RWaXNpYmxlSW5kZXgpXG4gICAgICAgICAgPyAwXG4gICAgICAgICAgOiBsYXN0VmlzaWJsZUluZGV4ICsgMTtcblxuICAgICAgICB0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcy5wdXNoKHtcbiAgICAgICAgICBpbmRleDogZGlzcGxheWVkSW5kZXgsXG4gICAgICAgICAgaXRlbTogdGhpcy5fc2xpZGVzLmdldChkaXNwbGF5ZWRJbmRleClcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcy5wb3AoKTtcbiAgICAgICAgZGlzcGxheWVkSW5kZXggPSB0aGlzLmlzRmlyc3QoZmlyc3RWaXNpYmxlSW5kZXgpXG4gICAgICAgICAgPyB0aGlzLl9zbGlkZXMubGVuZ3RoIC0gMVxuICAgICAgICAgIDogZmlyc3RWaXNpYmxlSW5kZXggLSAxO1xuXG4gICAgICAgIHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzID0gW3tcbiAgICAgICAgICBpbmRleDogZGlzcGxheWVkSW5kZXgsXG4gICAgICAgICAgaXRlbTogdGhpcy5fc2xpZGVzLmdldChkaXNwbGF5ZWRJbmRleClcbiAgICAgICAgfSwgLi4udGhpcy5fc2xpZGVzV2l0aEluZGV4ZXNdO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmhpZGVTbGlkZXMoKTtcblxuICAgICAgdGhpcy5fc2xpZGVzV2l0aEluZGV4ZXMuZm9yRWFjaChzbGlkZSA9PiBzbGlkZS5pdGVtLmFjdGl2ZSA9IHRydWUpO1xuXG4gICAgICB0aGlzLm1ha2VTbGlkZXNDb25zaXN0ZW50KHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzKTtcblxuICAgICAgdGhpcy5zbGlkZVJhbmdlQ2hhbmdlLmVtaXQoXG4gICAgICAgIHRoaXMuX3NsaWRlc1dpdGhJbmRleGVzLm1hcCgoc2xpZGU6IFNsaWRlV2l0aEluZGV4KSA9PiBzbGlkZS5pbmRleClcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBtYWtlU2xpZGVzQ29uc2lzdGVudCA9IChzbGlkZXM6IFNsaWRlV2l0aEluZGV4W10pOiB2b2lkID0+IHtcbiAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGU6IFNsaWRlV2l0aEluZGV4LCBpbmRleDogbnVtYmVyKSA9PiBzbGlkZS5pdGVtLm9yZGVyID0gaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBtb3ZlTXVsdGlsaXN0KGRpcmVjdGlvbjogRGlyZWN0aW9uKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuc2luZ2xlU2xpZGVPZmZzZXQpIHtcbiAgICAgIHRoaXMubW92ZVNsaWRlckJ5T25lSXRlbShkaXJlY3Rpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhpZGVTbGlkZXMoKTtcblxuICAgICAgaWYgKHRoaXMubm9XcmFwKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRWaXNpYmxlU2xpZGVzSW5kZXggPSBkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5ORVhUXG4gICAgICAgICAgPyB0aGlzLl9jdXJyZW50VmlzaWJsZVNsaWRlc0luZGV4ICsgMVxuICAgICAgICAgIDogdGhpcy5fY3VycmVudFZpc2libGVTbGlkZXNJbmRleCAtIDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uTkVYVCkge1xuICAgICAgICAgIHRoaXMuX2N1cnJlbnRWaXNpYmxlU2xpZGVzSW5kZXggPSB0aGlzLmlzVmlzaWJsZVNsaWRlTGlzdExhc3QoKVxuICAgICAgICAgICAgPyAwXG4gICAgICAgICAgICA6IHRoaXMuX2N1cnJlbnRWaXNpYmxlU2xpZGVzSW5kZXggKyAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX2N1cnJlbnRWaXNpYmxlU2xpZGVzSW5kZXggPSB0aGlzLmlzVmlzaWJsZVNsaWRlTGlzdEZpcnN0KClcbiAgICAgICAgICAgID8gdGhpcy5fY2h1bmtlZFNsaWRlcy5sZW5ndGggLSAxXG4gICAgICAgICAgICA6IHRoaXMuX2N1cnJlbnRWaXNpYmxlU2xpZGVzSW5kZXggLSAxO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2NodW5rZWRTbGlkZXNbdGhpcy5fY3VycmVudFZpc2libGVTbGlkZXNJbmRleF0uZm9yRWFjaChcbiAgICAgICAgKHNsaWRlOiBTbGlkZVdpdGhJbmRleCkgPT4gc2xpZGUuaXRlbS5hY3RpdmUgPSB0cnVlXG4gICAgICApO1xuXG4gICAgICB0aGlzLnNsaWRlUmFuZ2VDaGFuZ2UuZW1pdCh0aGlzLmdldFZpc2libGVJbmRleGVzKCkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0VmlzaWJsZUluZGV4ZXMoKTogbnVtYmVyW10ge1xuICAgIGlmICghdGhpcy5zaW5nbGVTbGlkZU9mZnNldCkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NodW5rZWRTbGlkZXNbdGhpcy5fY3VycmVudFZpc2libGVTbGlkZXNJbmRleF1cbiAgICAgICAgLm1hcCgoc2xpZGU6IFNsaWRlV2l0aEluZGV4KSA9PiBzbGlkZS5pbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLl9zbGlkZXNXaXRoSW5kZXhlcy5tYXAoKHNsaWRlOiBTbGlkZVdpdGhJbmRleCkgPT4gc2xpZGUuaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGEgc2xpZGUsIHdoaWNoIHNwZWNpZmllZCB0aHJvdWdoIGluZGV4LCBhcyBhY3RpdmVcbiAgICogQHBhcmFtIGluZGV4XG4gICAqL1xuICBwcml2YXRlIF9zZWxlY3QoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChpc05hTihpbmRleCkpIHtcbiAgICAgIHRoaXMucGF1c2UoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5tdWx0aWxpc3QpIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRTbGlkZSA9IHRoaXMuX3NsaWRlcy5nZXQodGhpcy5fY3VycmVudEFjdGl2ZVNsaWRlKTtcbiAgICAgIGlmIChjdXJyZW50U2xpZGUpIHtcbiAgICAgICAgY3VycmVudFNsaWRlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG5leHRTbGlkZSA9IHRoaXMuX3NsaWRlcy5nZXQoaW5kZXgpO1xuICAgIGlmIChuZXh0U2xpZGUpIHtcbiAgICAgIHRoaXMuX2N1cnJlbnRBY3RpdmVTbGlkZSA9IGluZGV4O1xuICAgICAgbmV4dFNsaWRlLmFjdGl2ZSA9IHRydWU7XG4gICAgICB0aGlzLmFjdGl2ZVNsaWRlID0gaW5kZXg7XG4gICAgICB0aGlzLmFjdGl2ZVNsaWRlQ2hhbmdlLmVtaXQoaW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydHMgbG9vcCBvZiBhdXRvIGNoYW5naW5nIG9mIHNsaWRlc1xuICAgKi9cbiAgcHJpdmF0ZSByZXN0YXJ0VGltZXIoKSB7XG4gICAgdGhpcy5yZXNldFRpbWVyKCk7XG4gICAgY29uc3QgaW50ZXJ2YWwgPSArdGhpcy5pbnRlcnZhbDtcbiAgICBpZiAoIWlzTmFOKGludGVydmFsKSAmJiBpbnRlcnZhbCA+IDApIHtcbiAgICAgIHRoaXMuY3VycmVudEludGVydmFsID0gdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICByZXR1cm4gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5JbnRlcnZhbCA9ICt0aGlzLmludGVydmFsO1xuICAgICAgICAgIHRoaXMubmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIHRoaXMuaXNQbGF5aW5nICYmXG4gICAgICAgICAgICAgICFpc05hTih0aGlzLmludGVydmFsKSAmJlxuICAgICAgICAgICAgICBuSW50ZXJ2YWwgPiAwICYmXG4gICAgICAgICAgICAgIHRoaXMuc2xpZGVzLmxlbmd0aFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHRoaXMubmV4dFNsaWRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sIGludGVydmFsKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldCBtdWx0aWxpc3QoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbXNQZXJTbGlkZSA+IDE7XG4gIH1cblxuICAvKipcbiAgICogU3RvcHMgbG9vcCBvZiBhdXRvIGNoYW5naW5nIG9mIHNsaWRlc1xuICAgKi9cbiAgcHJpdmF0ZSByZXNldFRpbWVyKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmN1cnJlbnRJbnRlcnZhbCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmN1cnJlbnRJbnRlcnZhbCk7XG4gICAgICB0aGlzLmN1cnJlbnRJbnRlcnZhbCA9IHZvaWQgMDtcbiAgICB9XG4gIH1cbn1cbiJdfQ==