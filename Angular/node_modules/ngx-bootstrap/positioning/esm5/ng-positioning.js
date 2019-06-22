/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { getOffsets, getReferenceOffsets, updateContainerClass, setStyles } from './utils';
import { arrow, flip, preventOverflow, shift, initData } from './modifiers';
var Positioning = /** @class */ (function () {
    function Positioning() {
    }
    /**
     * @param {?} hostElement
     * @param {?} targetElement
     * @param {?=} round
     * @return {?}
     */
    Positioning.prototype.position = /**
     * @param {?} hostElement
     * @param {?} targetElement
     * @param {?=} round
     * @return {?}
     */
    function (hostElement, targetElement, round) {
        if (round === void 0) { round = true; }
        return this.offset(hostElement, targetElement, false);
    };
    /**
     * @param {?} hostElement
     * @param {?} targetElement
     * @param {?=} round
     * @return {?}
     */
    Positioning.prototype.offset = /**
     * @param {?} hostElement
     * @param {?} targetElement
     * @param {?=} round
     * @return {?}
     */
    function (hostElement, targetElement, round) {
        if (round === void 0) { round = true; }
        return getReferenceOffsets(targetElement, hostElement);
    };
    /**
     * @param {?} hostElement
     * @param {?} targetElement
     * @param {?} position
     * @param {?=} appendToBody
     * @param {?=} options
     * @return {?}
     */
    Positioning.prototype.positionElements = /**
     * @param {?} hostElement
     * @param {?} targetElement
     * @param {?} position
     * @param {?=} appendToBody
     * @param {?=} options
     * @return {?}
     */
    function (hostElement, targetElement, position, appendToBody, options) {
        /** @type {?} */
        var chainOfModifiers = [flip, shift, preventOverflow, arrow];
        return chainOfModifiers.reduce(function (modifiedData, modifier) { return modifier(modifiedData); }, initData(targetElement, hostElement, position, options));
    };
    return Positioning;
}());
export { Positioning };
/** @type {?} */
var positionService = new Positioning();
/**
 * @param {?} hostElement
 * @param {?} targetElement
 * @param {?} placement
 * @param {?=} appendToBody
 * @param {?=} options
 * @param {?=} renderer
 * @return {?}
 */
export function positionElements(hostElement, targetElement, placement, appendToBody, options, renderer) {
    /** @type {?} */
    var data = positionService.positionElements(hostElement, targetElement, placement, appendToBody, options);
    /** @type {?} */
    var offsets = getOffsets(data);
    setStyles(targetElement, {
        'will-change': 'transform',
        top: '0px',
        left: '0px',
        transform: "translate3d(" + offsets.left + "px, " + offsets.top + "px, 0px)"
    }, renderer);
    if (data.instance.arrow) {
        setStyles(data.instance.arrow, data.offsets.arrow, renderer);
    }
    updateContainerClass(data, renderer);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcG9zaXRpb25pbmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYm9vdHN0cmFwL3Bvc2l0aW9uaW5nLyIsInNvdXJjZXMiOlsibmctcG9zaXRpb25pbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQU1BLE9BQU8sRUFBRSxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRTNGLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBSTVFO0lBQUE7SUF1QkEsQ0FBQzs7Ozs7OztJQXRCQyw4QkFBUTs7Ozs7O0lBQVIsVUFBUyxXQUF3QixFQUFFLGFBQTBCLEVBQUUsS0FBWTtRQUFaLHNCQUFBLEVBQUEsWUFBWTtRQUN6RSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLGFBQWEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN4RCxDQUFDOzs7Ozs7O0lBRUQsNEJBQU07Ozs7OztJQUFOLFVBQU8sV0FBd0IsRUFBRSxhQUEwQixFQUFFLEtBQVk7UUFBWixzQkFBQSxFQUFBLFlBQVk7UUFDdkUsT0FBTyxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDekQsQ0FBQzs7Ozs7Ozs7O0lBRUQsc0NBQWdCOzs7Ozs7OztJQUFoQixVQUNFLFdBQXdCLEVBQ3hCLGFBQTBCLEVBQzFCLFFBQWdCLEVBQ2hCLFlBQXNCLEVBQ3RCLE9BQWlCOztZQUVYLGdCQUFnQixHQUFHLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxlQUFlLEVBQUUsS0FBSyxDQUFDO1FBRTlELE9BQU8sZ0JBQWdCLENBQUMsTUFBTSxDQUM1QixVQUFDLFlBQVksRUFBRSxRQUFRLElBQUssT0FBQSxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQXRCLENBQXNCLEVBQ2xELFFBQVEsQ0FBQyxhQUFhLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FDeEQsQ0FBQztJQUNKLENBQUM7SUFDSCxrQkFBQztBQUFELENBQUMsQUF2QkQsSUF1QkM7OztJQUVLLGVBQWUsR0FBRyxJQUFJLFdBQVcsRUFBRTs7Ozs7Ozs7OztBQUV6QyxNQUFNLFVBQVUsZ0JBQWdCLENBQzlCLFdBQXdCLEVBQ3hCLGFBQTBCLEVBQzFCLFNBQWlCLEVBQ2pCLFlBQXNCLEVBQ3RCLE9BQWlCLEVBQ2pCLFFBQW9COztRQUdkLElBQUksR0FBRyxlQUFlLENBQUMsZ0JBQWdCLENBQzNDLFdBQVcsRUFDWCxhQUFhLEVBQ2IsU0FBUyxFQUNULFlBQVksRUFDWixPQUFPLENBQ1I7O1FBRUssT0FBTyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUM7SUFFaEMsU0FBUyxDQUFDLGFBQWEsRUFBRTtRQUN2QixhQUFhLEVBQUUsV0FBVztRQUMxQixHQUFHLEVBQUUsS0FBSztRQUNWLElBQUksRUFBRSxLQUFLO1FBQ1gsU0FBUyxFQUFFLGlCQUFlLE9BQU8sQ0FBQyxJQUFJLFlBQU8sT0FBTyxDQUFDLEdBQUcsYUFBVTtLQUNuRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRWIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRTtRQUN2QixTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDOUQ7SUFFRCxvQkFBb0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFDdkMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGNvcHlyaWdodCBWYWxvciBTb2Z0d2FyZVxuICogQGNvcHlyaWdodCBGZWRlcmljbyBaaXZvbG8gYW5kIGNvbnRyaWJ1dG9yc1xuICovXG5pbXBvcnQgeyBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgZ2V0T2Zmc2V0cywgZ2V0UmVmZXJlbmNlT2Zmc2V0cywgdXBkYXRlQ29udGFpbmVyQ2xhc3MsIHNldFN0eWxlcyB9IGZyb20gJy4vdXRpbHMnO1xuXG5pbXBvcnQgeyBhcnJvdywgZmxpcCwgcHJldmVudE92ZXJmbG93LCBzaGlmdCwgaW5pdERhdGEgfSBmcm9tICcuL21vZGlmaWVycyc7XG5pbXBvcnQgeyBEYXRhLCBPZmZzZXRzLCBPcHRpb25zIH0gZnJvbSAnLi9tb2RlbHMnO1xuXG5cbmV4cG9ydCBjbGFzcyBQb3NpdGlvbmluZyB7XG4gIHBvc2l0aW9uKGhvc3RFbGVtZW50OiBIVE1MRWxlbWVudCwgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQsIHJvdW5kID0gdHJ1ZSk6IE9mZnNldHMge1xuICAgIHJldHVybiB0aGlzLm9mZnNldChob3N0RWxlbWVudCwgdGFyZ2V0RWxlbWVudCwgZmFsc2UpO1xuICB9XG5cbiAgb2Zmc2V0KGhvc3RFbGVtZW50OiBIVE1MRWxlbWVudCwgdGFyZ2V0RWxlbWVudDogSFRNTEVsZW1lbnQsIHJvdW5kID0gdHJ1ZSk6IE9mZnNldHMge1xuICAgIHJldHVybiBnZXRSZWZlcmVuY2VPZmZzZXRzKHRhcmdldEVsZW1lbnQsIGhvc3RFbGVtZW50KTtcbiAgfVxuXG4gIHBvc2l0aW9uRWxlbWVudHMoXG4gICAgaG9zdEVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgIHRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICAgIHBvc2l0aW9uOiBzdHJpbmcsXG4gICAgYXBwZW5kVG9Cb2R5PzogYm9vbGVhbixcbiAgICBvcHRpb25zPzogT3B0aW9uc1xuICApOiBEYXRhIHtcbiAgICBjb25zdCBjaGFpbk9mTW9kaWZpZXJzID0gW2ZsaXAsIHNoaWZ0LCBwcmV2ZW50T3ZlcmZsb3csIGFycm93XTtcblxuICAgIHJldHVybiBjaGFpbk9mTW9kaWZpZXJzLnJlZHVjZShcbiAgICAgIChtb2RpZmllZERhdGEsIG1vZGlmaWVyKSA9PiBtb2RpZmllcihtb2RpZmllZERhdGEpLFxuICAgICAgaW5pdERhdGEodGFyZ2V0RWxlbWVudCwgaG9zdEVsZW1lbnQsIHBvc2l0aW9uLCBvcHRpb25zKVxuICAgICk7XG4gIH1cbn1cblxuY29uc3QgcG9zaXRpb25TZXJ2aWNlID0gbmV3IFBvc2l0aW9uaW5nKCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBwb3NpdGlvbkVsZW1lbnRzKFxuICBob3N0RWxlbWVudDogSFRNTEVsZW1lbnQsXG4gIHRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICBwbGFjZW1lbnQ6IHN0cmluZyxcbiAgYXBwZW5kVG9Cb2R5PzogYm9vbGVhbixcbiAgb3B0aW9ucz86IE9wdGlvbnMsXG4gIHJlbmRlcmVyPzogUmVuZGVyZXIyXG4pOiB2b2lkIHtcblxuICBjb25zdCBkYXRhID0gcG9zaXRpb25TZXJ2aWNlLnBvc2l0aW9uRWxlbWVudHMoXG4gICAgaG9zdEVsZW1lbnQsXG4gICAgdGFyZ2V0RWxlbWVudCxcbiAgICBwbGFjZW1lbnQsXG4gICAgYXBwZW5kVG9Cb2R5LFxuICAgIG9wdGlvbnNcbiAgKTtcblxuICBjb25zdCBvZmZzZXRzID0gZ2V0T2Zmc2V0cyhkYXRhKTtcblxuICBzZXRTdHlsZXModGFyZ2V0RWxlbWVudCwge1xuICAgICd3aWxsLWNoYW5nZSc6ICd0cmFuc2Zvcm0nLFxuICAgIHRvcDogJzBweCcsXG4gICAgbGVmdDogJzBweCcsXG4gICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoJHtvZmZzZXRzLmxlZnR9cHgsICR7b2Zmc2V0cy50b3B9cHgsIDBweClgXG4gIH0sIHJlbmRlcmVyKTtcblxuICBpZiAoZGF0YS5pbnN0YW5jZS5hcnJvdykge1xuICAgIHNldFN0eWxlcyhkYXRhLmluc3RhbmNlLmFycm93LCBkYXRhLm9mZnNldHMuYXJyb3csIHJlbmRlcmVyKTtcbiAgfVxuXG4gIHVwZGF0ZUNvbnRhaW5lckNsYXNzKGRhdGEsIHJlbmRlcmVyKTtcbn1cbiJdfQ==