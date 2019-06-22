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
var PositioningService = /** @class */ (function () {
    function PositioningService(rendererFactory, platformId) {
        var _this = this;
        this.update$$ = new Subject();
        this.positionElements = new Map();
        if (isPlatformBrowser(platformId)) {
            merge(fromEvent(window, 'scroll'), fromEvent(window, 'resize'), of(0, animationFrameScheduler), this.update$$)
                .subscribe(function () {
                _this.positionElements
                    .forEach(function (positionElement) {
                    positionElements(_getHtmlElement(positionElement.target), _getHtmlElement(positionElement.element), positionElement.attachment, positionElement.appendToBody, _this.options, rendererFactory.createRenderer(null, null));
                });
            });
        }
    }
    /**
     * @param {?} options
     * @return {?}
     */
    PositioningService.prototype.position = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        this.addPositionElement(options);
    };
    /**
     * @param {?} options
     * @return {?}
     */
    PositioningService.prototype.addPositionElement = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        this.positionElements.set(_getHtmlElement(options.element), options);
    };
    /**
     * @return {?}
     */
    PositioningService.prototype.calcPosition = /**
     * @return {?}
     */
    function () {
        this.update$$.next();
    };
    /**
     * @param {?} elRef
     * @return {?}
     */
    PositioningService.prototype.deletePositionElement = /**
     * @param {?} elRef
     * @return {?}
     */
    function (elRef) {
        this.positionElements.delete(_getHtmlElement(elRef));
    };
    /**
     * @param {?} options
     * @return {?}
     */
    PositioningService.prototype.setOptions = /**
     * @param {?} options
     * @return {?}
     */
    function (options) {
        this.options = options;
    };
    PositioningService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    PositioningService.ctorParameters = function () { return [
        { type: RendererFactory2 },
        { type: Number, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
    ]; };
    return PositioningService;
}());
export { PositioningService };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zaXRpb25pbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1ib290c3RyYXAvcG9zaXRpb25pbmcvIiwic291cmNlcyI6WyJwb3NpdGlvbmluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRXBELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBRXBELE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSx1QkFBdUIsRUFBRSxPQUFPLEVBQUUsTUFBTSxNQUFNLENBQUM7Ozs7QUFJOUUsd0NBK0JDOzs7Ozs7SUE3QkMscUNBQTRDOzs7OztJQUc1QyxvQ0FBMkM7Ozs7Ozs7OztJQVMzQyx3Q0FBb0I7Ozs7OztJQUtwQiw4Q0FBMEI7Ozs7OztJQUsxQixvQ0FBZ0I7Ozs7O0lBR2hCLDBDQUFzQjs7Ozs7SUFHdEIsMENBQXVCOztBQUl6QjtJQU1FLDRCQUNFLGVBQWlDLEVBQ1osVUFBa0I7UUFGekMsaUJBeUJDO1FBNUJPLGFBQVEsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBQy9CLHFCQUFnQixHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7UUFNbkMsSUFBSSxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNqQyxLQUFLLENBQ0gsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsRUFDM0IsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsRUFDM0IsRUFBRSxDQUFDLENBQUMsRUFBRSx1QkFBdUIsQ0FBQyxFQUM5QixJQUFJLENBQUMsUUFBUSxDQUNkO2lCQUNFLFNBQVMsQ0FBQztnQkFDVCxLQUFJLENBQUMsZ0JBQWdCO3FCQUNsQixPQUFPLENBQUMsVUFBQyxlQUFtQztvQkFDM0MsZ0JBQWdCLENBQ2QsZUFBZSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsRUFDdkMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsRUFDeEMsZUFBZSxDQUFDLFVBQVUsRUFDMUIsZUFBZSxDQUFDLFlBQVksRUFDNUIsS0FBSSxDQUFDLE9BQU8sRUFDWixlQUFlLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FDM0MsQ0FBQztnQkFDSixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDSCxDQUFDOzs7OztJQUVELHFDQUFROzs7O0lBQVIsVUFBUyxPQUEyQjtRQUNsQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7Ozs7SUFFRCwrQ0FBa0I7Ozs7SUFBbEIsVUFBbUIsT0FBMkI7UUFDNUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7Ozs7SUFFRCx5Q0FBWTs7O0lBQVo7UUFDRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZCLENBQUM7Ozs7O0lBRUQsa0RBQXFCOzs7O0lBQXJCLFVBQXNCLEtBQWlCO1FBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdkQsQ0FBQzs7Ozs7SUFFRCx1Q0FBVTs7OztJQUFWLFVBQVcsT0FBZ0I7UUFDekIsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQzs7Z0JBbkRGLFVBQVU7Ozs7Z0JBM0NzQixnQkFBZ0I7NkNBbUQ1QyxNQUFNLFNBQUMsV0FBVzs7SUE0Q3ZCLHlCQUFDO0NBQUEsQUFwREQsSUFvREM7U0FuRFksa0JBQWtCOzs7SUFDN0IscUNBQWlCOzs7OztJQUNqQixzQ0FBdUM7Ozs7O0lBQ3ZDLDhDQUFxQzs7Ozs7O0FBa0R2QyxTQUFTLGVBQWUsQ0FBQyxPQUEwQztJQUNqRSxrQ0FBa0M7SUFDbEMsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7UUFDL0IsT0FBTyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3hDO0lBRUQsSUFBSSxPQUFPLFlBQVksVUFBVSxFQUFFO1FBQ2pDLE9BQU8sT0FBTyxDQUFDLGFBQWEsQ0FBQztLQUM5QjtJQUVELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBFbGVtZW50UmVmLCBSZW5kZXJlckZhY3RvcnkyLCBJbmplY3QsIFBMQVRGT1JNX0lEIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBpc1BsYXRmb3JtQnJvd3NlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmltcG9ydCB7IHBvc2l0aW9uRWxlbWVudHMgfSBmcm9tICcuL25nLXBvc2l0aW9uaW5nJztcblxuaW1wb3J0IHsgZnJvbUV2ZW50LCBtZXJnZSwgb2YsIGFuaW1hdGlvbkZyYW1lU2NoZWR1bGVyLCBTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBPcHRpb25zIH0gZnJvbSAnLi9tb2RlbHMnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgUG9zaXRpb25pbmdPcHRpb25zIHtcbiAgLyoqIFRoZSBET00gZWxlbWVudCwgRWxlbWVudFJlZiwgb3IgYSBzZWxlY3RvciBzdHJpbmcgb2YgYW4gZWxlbWVudCB3aGljaCB3aWxsIGJlIG1vdmVkICovXG4gIGVsZW1lbnQ/OiBIVE1MRWxlbWVudCB8IEVsZW1lbnRSZWYgfCBzdHJpbmc7XG5cbiAgLyoqIFRoZSBET00gZWxlbWVudCwgRWxlbWVudFJlZiwgb3IgYSBzZWxlY3RvciBzdHJpbmcgb2YgYW4gZWxlbWVudCB3aGljaCB0aGUgZWxlbWVudCB3aWxsIGJlIGF0dGFjaGVkIHRvICAqL1xuICB0YXJnZXQ/OiBIVE1MRWxlbWVudCB8IEVsZW1lbnRSZWYgfCBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEEgc3RyaW5nIG9mIHRoZSBmb3JtICd2ZXJ0LWF0dGFjaG1lbnQgaG9yaXotYXR0YWNobWVudCcgb3IgJ3BsYWNlbWVudCdcbiAgICogLSBwbGFjZW1lbnQgY2FuIGJlIFwidG9wXCIsIFwiYm90dG9tXCIsIFwibGVmdFwiLCBcInJpZ2h0XCJcbiAgICogbm90IHlldCBzdXBwb3J0ZWQ6XG4gICAqIC0gdmVydC1hdHRhY2htZW50IGNhbiBiZSBhbnkgb2YgJ3RvcCcsICdtaWRkbGUnLCAnYm90dG9tJ1xuICAgKiAtIGhvcml6LWF0dGFjaG1lbnQgY2FuIGJlIGFueSBvZiAnbGVmdCcsICdjZW50ZXInLCAncmlnaHQnXG4gICAqL1xuICBhdHRhY2htZW50Pzogc3RyaW5nO1xuXG4gIC8qKiBBIHN0cmluZyBzaW1pbGFyIHRvIGBhdHRhY2htZW50YC4gVGhlIG9uZSBkaWZmZXJlbmNlIGlzIHRoYXQsIGlmIGl0J3Mgbm90IHByb3ZpZGVkLFxuICAgKiBgdGFyZ2V0QXR0YWNobWVudGAgd2lsbCBhc3N1bWUgdGhlIG1pcnJvciBpbWFnZSBvZiBgYXR0YWNobWVudGAuXG4gICAqL1xuICB0YXJnZXRBdHRhY2htZW50Pzogc3RyaW5nO1xuXG4gIC8qKiBBIHN0cmluZyBvZiB0aGUgZm9ybSAndmVydC1vZmZzZXQgaG9yaXotb2Zmc2V0J1xuICAgKiAtIHZlcnQtb2Zmc2V0IGFuZCBob3Jpei1vZmZzZXQgY2FuIGJlIG9mIHRoZSBmb3JtIFwiMjBweFwiIG9yIFwiNTUlXCJcbiAgICovXG4gIG9mZnNldD86IHN0cmluZztcblxuICAvKiogQSBzdHJpbmcgc2ltaWxhciB0byBgb2Zmc2V0YCwgYnV0IHJlZmVycmluZyB0byB0aGUgb2Zmc2V0IG9mIHRoZSB0YXJnZXQgKi9cbiAgdGFyZ2V0T2Zmc2V0Pzogc3RyaW5nO1xuXG4gIC8qKiBJZiB0cnVlIGNvbXBvbmVudCB3aWxsIGJlIGF0dGFjaGVkIHRvIGJvZHkgKi9cbiAgYXBwZW5kVG9Cb2R5PzogYm9vbGVhbjtcbn1cblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUG9zaXRpb25pbmdTZXJ2aWNlIHtcbiAgb3B0aW9uczogT3B0aW9ucztcbiAgcHJpdmF0ZSB1cGRhdGUkJCA9IG5ldyBTdWJqZWN0PG51bGw+KCk7XG4gIHByaXZhdGUgcG9zaXRpb25FbGVtZW50cyA9IG5ldyBNYXAoKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICByZW5kZXJlckZhY3Rvcnk6IFJlbmRlcmVyRmFjdG9yeTIsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcGxhdGZvcm1JZDogbnVtYmVyXG4gICkge1xuICAgIGlmIChpc1BsYXRmb3JtQnJvd3NlcihwbGF0Zm9ybUlkKSkge1xuICAgICAgbWVyZ2UoXG4gICAgICAgIGZyb21FdmVudCh3aW5kb3csICdzY3JvbGwnKSxcbiAgICAgICAgZnJvbUV2ZW50KHdpbmRvdywgJ3Jlc2l6ZScpLFxuICAgICAgICBvZigwLCBhbmltYXRpb25GcmFtZVNjaGVkdWxlciksXG4gICAgICAgIHRoaXMudXBkYXRlJCRcbiAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5wb3NpdGlvbkVsZW1lbnRzXG4gICAgICAgICAgICAuZm9yRWFjaCgocG9zaXRpb25FbGVtZW50OiBQb3NpdGlvbmluZ09wdGlvbnMpID0+IHtcbiAgICAgICAgICAgICAgcG9zaXRpb25FbGVtZW50cyhcbiAgICAgICAgICAgICAgICBfZ2V0SHRtbEVsZW1lbnQocG9zaXRpb25FbGVtZW50LnRhcmdldCksXG4gICAgICAgICAgICAgICAgX2dldEh0bWxFbGVtZW50KHBvc2l0aW9uRWxlbWVudC5lbGVtZW50KSxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbkVsZW1lbnQuYXR0YWNobWVudCxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbkVsZW1lbnQuYXBwZW5kVG9Cb2R5LFxuICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucyxcbiAgICAgICAgICAgICAgICByZW5kZXJlckZhY3RvcnkuY3JlYXRlUmVuZGVyZXIobnVsbCwgbnVsbClcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwb3NpdGlvbihvcHRpb25zOiBQb3NpdGlvbmluZ09wdGlvbnMpOiB2b2lkIHtcbiAgICB0aGlzLmFkZFBvc2l0aW9uRWxlbWVudChvcHRpb25zKTtcbiAgfVxuXG4gIGFkZFBvc2l0aW9uRWxlbWVudChvcHRpb25zOiBQb3NpdGlvbmluZ09wdGlvbnMpOiB2b2lkIHtcbiAgICB0aGlzLnBvc2l0aW9uRWxlbWVudHMuc2V0KF9nZXRIdG1sRWxlbWVudChvcHRpb25zLmVsZW1lbnQpLCBvcHRpb25zKTtcbiAgfVxuXG4gIGNhbGNQb3NpdGlvbigpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSQkLm5leHQoKTtcbiAgfVxuXG4gIGRlbGV0ZVBvc2l0aW9uRWxlbWVudChlbFJlZjogRWxlbWVudFJlZik6IHZvaWQge1xuICAgIHRoaXMucG9zaXRpb25FbGVtZW50cy5kZWxldGUoX2dldEh0bWxFbGVtZW50KGVsUmVmKSk7XG4gIH1cblxuICBzZXRPcHRpb25zKG9wdGlvbnM6IE9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9nZXRIdG1sRWxlbWVudChlbGVtZW50OiBIVE1MRWxlbWVudCB8IEVsZW1lbnRSZWYgfCBzdHJpbmcpOiBIVE1MRWxlbWVudCB7XG4gIC8vIGl0IG1lYW5zIHRoYXQgd2UgZ290IGEgc2VsZWN0b3JcbiAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsZW1lbnQpO1xuICB9XG5cbiAgaWYgKGVsZW1lbnQgaW5zdGFuY2VvZiBFbGVtZW50UmVmKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufVxuIl19