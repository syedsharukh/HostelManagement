/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, ElementRef, RendererFactory2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { positionElements } from './ng-positioning';
import { fromEvent, merge, of, animationFrameScheduler, Subject } from 'rxjs';
/**
 * @record
 */
export function PositioningOptions() { }
if (false) {
    /**
     * The DOM element, ElementRef, or a selector string of an element which will be moved
     * @type {?|undefined}
     */
    PositioningOptions.prototype.element;
    /**
     * The DOM element, ElementRef, or a selector string of an element which the element will be attached to
     * @type {?|undefined}
     */
    PositioningOptions.prototype.target;
    /**
     * A string of the form 'vert-attachment horiz-attachment' or 'placement'
     * - placement can be "top", "bottom", "left", "right"
     * not yet supported:
     * - vert-attachment can be any of 'top', 'middle', 'bottom'
     * - horiz-attachment can be any of 'left', 'center', 'right'
     * @type {?|undefined}
     */
    PositioningOptions.prototype.attachment;
    /**
     * A string similar to `attachment`. The one difference is that, if it's not provided,
     * `targetAttachment` will assume the mirror image of `attachment`.
     * @type {?|undefined}
     */
    PositioningOptions.prototype.targetAttachment;
    /**
     * A string of the form 'vert-offset horiz-offset'
     * - vert-offset and horiz-offset can be of the form "20px" or "55%"
     * @type {?|undefined}
     */
    PositioningOptions.prototype.offset;
    /**
     * A string similar to `offset`, but referring to the offset of the target
     * @type {?|undefined}
     */
    PositioningOptions.prototype.targetOffset;
    /**
     * If true component will be attached to body
     * @type {?|undefined}
     */
    PositioningOptions.prototype.appendToBody;
}
export class PositioningService {
    /**
     * @param {?} rendererFactory
     * @param {?} platformId
     */
    constructor(rendererFactory, platformId) {
        this.update$$ = new Subject();
        this.positionElements = new Map();
        if (isPlatformBrowser(platformId)) {
            merge(fromEvent(window, 'scroll'), fromEvent(window, 'resize'), of(0, animationFrameScheduler), this.update$$)
                .subscribe(() => {
                this.positionElements
                    .forEach((positionElement) => {
                    positionElements(_getHtmlElement(positionElement.target), _getHtmlElement(positionElement.element), positionElement.attachment, positionElement.appendToBody, this.options, rendererFactory.createRenderer(null, null));
                });
            });
        }
    }
    /**
     * @param {?} options
     * @return {?}
     */
    position(options) {
        this.addPositionElement(options);
    }
    /**
     * @param {?} options
     * @return {?}
     */
    addPositionElement(options) {
        this.positionElements.set(_getHtmlElement(options.element), options);
    }
    /**
     * @return {?}
     */
    calcPosition() {
        this.update$$.next();
    }
    /**
     * @param {?} elRef
     * @return {?}
     */
    deletePositionElement(elRef) {
        this.positionElements.delete(_getHtmlElement(elRef));
    }
    /**
     * @param {?} options
     * @return {?}
     */
    setOptions(options) {
        this.options = options;
    }
}
PositioningService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
PositioningService.ctorParameters = () => [
    { type: RendererFactory2 },
    { type: Number, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
if (false) {
    /** @type {?} */
    PositioningService.prototype.options;
    /**
     * @type {?}
     * @private
     */
    PositioningService.prototype.update$$;
    /**
     * @type {?}
     * @private
     */
    PositioningService.prototype.positionElements;
}
/**
 * @param {?} element
 * @return {?}
 */
function _getHtmlElement(element) {
    // it means that we got a selector
    if (typeof element === 'string') {
        return document.querySelector(element);
    }
    if (element instanceof ElementRef) {
        return element.nativeElement;
    }
    return element;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zaXRpb25pbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1ib290c3RyYXAvcG9zaXRpb25pbmcvIiwic291cmNlcyI6WyJwb3NpdGlvbmluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXBELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXBELE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSx1QkFBdUIsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7QUFJOUUsd0NBK0JDOzs7Ozs7SUE3QkMscUNBQTRDOzs7OztJQUc1QyxvQ0FBMkM7Ozs7Ozs7OztJQVMzQyx3Q0FBb0I7Ozs7OztJQUtwQiw4Q0FBMEI7Ozs7OztJQUsxQixvQ0FBZ0I7Ozs7O0lBR2hCLDBDQUFzQjs7Ozs7SUFHdEIsMENBQXVCOztBQUt6QixNQUFNLE9BQU8sa0JBQWtCOzs7OztJQUs3QixZQUNFLGVBQWlDLEVBQ1osVUFBa0I7UUFMakMsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFRLENBQUM7UUFDL0IscUJBQWdCLEdBQUcsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQU1uQyxJQUFJLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ2pDLEtBQUssQ0FDSCxTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxFQUMzQixTQUFTLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxFQUMzQixFQUFFLENBQUMsQ0FBQyxFQUFFLHVCQUF1QixDQUFDLEVBQzlCLElBQUksQ0FBQyxRQUFRLENBQ2Q7aUJBQ0UsU0FBUyxDQUFDLEdBQUcsRUFBRTtnQkFDZCxJQUFJLENBQUMsZ0JBQWdCO3FCQUNsQixPQUFPLENBQUMsQ0FBQyxlQUFtQyxFQUFFLEVBQUU7b0JBQy9DLGdCQUFnQixDQUNkLGVBQWUsQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEVBQ3ZDLGVBQWUsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQ3hDLGVBQWUsQ0FBQyxVQUFVLEVBQzFCLGVBQWUsQ0FBQyxZQUFZLEVBQzVCLElBQUksQ0FBQyxPQUFPLEVBQ1osZUFBZSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQzNDLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0gsQ0FBQzs7Ozs7SUFFRCxRQUFRLENBQUMsT0FBMkI7UUFDbEMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25DLENBQUM7Ozs7O0lBRUQsa0JBQWtCLENBQUMsT0FBMkI7UUFDNUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7Ozs7SUFFRCxZQUFZO1FBQ1YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN2QixDQUFDOzs7OztJQUVELHFCQUFxQixDQUFDLEtBQWlCO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7Ozs7SUFFRCxVQUFVLENBQUMsT0FBZ0I7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQzs7O1lBbkRGLFVBQVU7Ozs7WUEzQ3NCLGdCQUFnQjt5Q0FtRDVDLE1BQU0sU0FBQyxXQUFXOzs7O0lBTnJCLHFDQUFpQjs7Ozs7SUFDakIsc0NBQXVDOzs7OztJQUN2Qyw4Q0FBcUM7Ozs7OztBQWtEdkMsU0FBUyxlQUFlLENBQUMsT0FBMEM7SUFDakUsa0NBQWtDO0lBQ2xDLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO1FBQy9CLE9BQU8sUUFBUSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN4QztJQUVELElBQUksT0FBTyxZQUFZLFVBQVUsRUFBRTtRQUNqQyxPQUFPLE9BQU8sQ0FBQyxhQUFhLENBQUM7S0FDOUI7SUFFRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRWxlbWVudFJlZiwgUmVuZGVyZXJGYWN0b3J5MiwgSW5qZWN0LCBQTEFURk9STV9JRCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5pbXBvcnQgeyBwb3NpdGlvbkVsZW1lbnRzIH0gZnJvbSAnLi9uZy1wb3NpdGlvbmluZyc7XG5cbmltcG9ydCB7IGZyb21FdmVudCwgbWVyZ2UsIG9mLCBhbmltYXRpb25GcmFtZVNjaGVkdWxlciwgU3ViamVjdCB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgT3B0aW9ucyB9IGZyb20gJy4vbW9kZWxzJztcblxuXG5leHBvcnQgaW50ZXJmYWNlIFBvc2l0aW9uaW5nT3B0aW9ucyB7XG4gIC8qKiBUaGUgRE9NIGVsZW1lbnQsIEVsZW1lbnRSZWYsIG9yIGEgc2VsZWN0b3Igc3RyaW5nIG9mIGFuIGVsZW1lbnQgd2hpY2ggd2lsbCBiZSBtb3ZlZCAqL1xuICBlbGVtZW50PzogSFRNTEVsZW1lbnQgfCBFbGVtZW50UmVmIHwgc3RyaW5nO1xuXG4gIC8qKiBUaGUgRE9NIGVsZW1lbnQsIEVsZW1lbnRSZWYsIG9yIGEgc2VsZWN0b3Igc3RyaW5nIG9mIGFuIGVsZW1lbnQgd2hpY2ggdGhlIGVsZW1lbnQgd2lsbCBiZSBhdHRhY2hlZCB0byAgKi9cbiAgdGFyZ2V0PzogSFRNTEVsZW1lbnQgfCBFbGVtZW50UmVmIHwgc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBBIHN0cmluZyBvZiB0aGUgZm9ybSAndmVydC1hdHRhY2htZW50IGhvcml6LWF0dGFjaG1lbnQnIG9yICdwbGFjZW1lbnQnXG4gICAqIC0gcGxhY2VtZW50IGNhbiBiZSBcInRvcFwiLCBcImJvdHRvbVwiLCBcImxlZnRcIiwgXCJyaWdodFwiXG4gICAqIG5vdCB5ZXQgc3VwcG9ydGVkOlxuICAgKiAtIHZlcnQtYXR0YWNobWVudCBjYW4gYmUgYW55IG9mICd0b3AnLCAnbWlkZGxlJywgJ2JvdHRvbSdcbiAgICogLSBob3Jpei1hdHRhY2htZW50IGNhbiBiZSBhbnkgb2YgJ2xlZnQnLCAnY2VudGVyJywgJ3JpZ2h0J1xuICAgKi9cbiAgYXR0YWNobWVudD86IHN0cmluZztcblxuICAvKiogQSBzdHJpbmcgc2ltaWxhciB0byBgYXR0YWNobWVudGAuIFRoZSBvbmUgZGlmZmVyZW5jZSBpcyB0aGF0LCBpZiBpdCdzIG5vdCBwcm92aWRlZCxcbiAgICogYHRhcmdldEF0dGFjaG1lbnRgIHdpbGwgYXNzdW1lIHRoZSBtaXJyb3IgaW1hZ2Ugb2YgYGF0dGFjaG1lbnRgLlxuICAgKi9cbiAgdGFyZ2V0QXR0YWNobWVudD86IHN0cmluZztcblxuICAvKiogQSBzdHJpbmcgb2YgdGhlIGZvcm0gJ3ZlcnQtb2Zmc2V0IGhvcml6LW9mZnNldCdcbiAgICogLSB2ZXJ0LW9mZnNldCBhbmQgaG9yaXotb2Zmc2V0IGNhbiBiZSBvZiB0aGUgZm9ybSBcIjIwcHhcIiBvciBcIjU1JVwiXG4gICAqL1xuICBvZmZzZXQ/OiBzdHJpbmc7XG5cbiAgLyoqIEEgc3RyaW5nIHNpbWlsYXIgdG8gYG9mZnNldGAsIGJ1dCByZWZlcnJpbmcgdG8gdGhlIG9mZnNldCBvZiB0aGUgdGFyZ2V0ICovXG4gIHRhcmdldE9mZnNldD86IHN0cmluZztcblxuICAvKiogSWYgdHJ1ZSBjb21wb25lbnQgd2lsbCBiZSBhdHRhY2hlZCB0byBib2R5ICovXG4gIGFwcGVuZFRvQm9keT86IGJvb2xlYW47XG59XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBvc2l0aW9uaW5nU2VydmljZSB7XG4gIG9wdGlvbnM6IE9wdGlvbnM7XG4gIHByaXZhdGUgdXBkYXRlJCQgPSBuZXcgU3ViamVjdDxudWxsPigpO1xuICBwcml2YXRlIHBvc2l0aW9uRWxlbWVudHMgPSBuZXcgTWFwKCk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcmVuZGVyZXJGYWN0b3J5OiBSZW5kZXJlckZhY3RvcnkyLFxuICAgIEBJbmplY3QoUExBVEZPUk1fSUQpIHBsYXRmb3JtSWQ6IG51bWJlclxuICApIHtcbiAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIocGxhdGZvcm1JZCkpIHtcbiAgICAgIG1lcmdlKFxuICAgICAgICBmcm9tRXZlbnQod2luZG93LCAnc2Nyb2xsJyksXG4gICAgICAgIGZyb21FdmVudCh3aW5kb3csICdyZXNpemUnKSxcbiAgICAgICAgb2YoMCwgYW5pbWF0aW9uRnJhbWVTY2hlZHVsZXIpLFxuICAgICAgICB0aGlzLnVwZGF0ZSQkXG4gICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgIHRoaXMucG9zaXRpb25FbGVtZW50c1xuICAgICAgICAgICAgLmZvckVhY2goKHBvc2l0aW9uRWxlbWVudDogUG9zaXRpb25pbmdPcHRpb25zKSA9PiB7XG4gICAgICAgICAgICAgIHBvc2l0aW9uRWxlbWVudHMoXG4gICAgICAgICAgICAgICAgX2dldEh0bWxFbGVtZW50KHBvc2l0aW9uRWxlbWVudC50YXJnZXQpLFxuICAgICAgICAgICAgICAgIF9nZXRIdG1sRWxlbWVudChwb3NpdGlvbkVsZW1lbnQuZWxlbWVudCksXG4gICAgICAgICAgICAgICAgcG9zaXRpb25FbGVtZW50LmF0dGFjaG1lbnQsXG4gICAgICAgICAgICAgICAgcG9zaXRpb25FbGVtZW50LmFwcGVuZFRvQm9keSxcbiAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMsXG4gICAgICAgICAgICAgICAgcmVuZGVyZXJGYWN0b3J5LmNyZWF0ZVJlbmRlcmVyKG51bGwsIG51bGwpXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcG9zaXRpb24ob3B0aW9uczogUG9zaXRpb25pbmdPcHRpb25zKTogdm9pZCB7XG4gICAgdGhpcy5hZGRQb3NpdGlvbkVsZW1lbnQob3B0aW9ucyk7XG4gIH1cblxuICBhZGRQb3NpdGlvbkVsZW1lbnQob3B0aW9uczogUG9zaXRpb25pbmdPcHRpb25zKTogdm9pZCB7XG4gICAgdGhpcy5wb3NpdGlvbkVsZW1lbnRzLnNldChfZ2V0SHRtbEVsZW1lbnQob3B0aW9ucy5lbGVtZW50KSwgb3B0aW9ucyk7XG4gIH1cblxuICBjYWxjUG9zaXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUkJC5uZXh0KCk7XG4gIH1cblxuICBkZWxldGVQb3NpdGlvbkVsZW1lbnQoZWxSZWY6IEVsZW1lbnRSZWYpOiB2b2lkIHtcbiAgICB0aGlzLnBvc2l0aW9uRWxlbWVudHMuZGVsZXRlKF9nZXRIdG1sRWxlbWVudChlbFJlZikpO1xuICB9XG5cbiAgc2V0T3B0aW9ucyhvcHRpb25zOiBPcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgfVxufVxuXG5mdW5jdGlvbiBfZ2V0SHRtbEVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQgfCBFbGVtZW50UmVmIHwgc3RyaW5nKTogSFRNTEVsZW1lbnQge1xuICAvLyBpdCBtZWFucyB0aGF0IHdlIGdvdCBhIHNlbGVjdG9yXG4gIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbGVtZW50KTtcbiAgfVxuXG4gIGlmIChlbGVtZW50IGluc3RhbmNlb2YgRWxlbWVudFJlZikge1xuICAgIHJldHVybiBlbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn1cbiJdfQ==