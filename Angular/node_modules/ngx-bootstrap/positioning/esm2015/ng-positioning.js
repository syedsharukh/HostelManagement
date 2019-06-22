/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { getOffsets, getReferenceOffsets, updateContainerClass, setStyles } from './utils';
import { arrow, flip, preventOverflow, shift, initData } from './modifiers';
export class Positioning {
    /**
     * @param {?} hostElement
     * @param {?} targetElement
     * @param {?=} round
     * @return {?}
     */
    position(hostElement, targetElement, round = true) {
        return this.offset(hostElement, targetElement, false);
    }
    /**
     * @param {?} hostElement
     * @param {?} targetElement
     * @param {?=} round
     * @return {?}
     */
    offset(hostElement, targetElement, round = true) {
        return getReferenceOffsets(targetElement, hostElement);
    }
    /**
     * @param {?} hostElement
     * @param {?} targetElement
     * @param {?} position
     * @param {?=} appendToBody
     * @param {?=} options
     * @return {?}
     */
    positionElements(hostElement, targetElement, position, appendToBody, options) {
        /** @type {?} */
        const chainOfModifiers = [flip, shift, preventOverflow, arrow];
        return chainOfModifiers.reduce((modifiedData, modifier) => modifier(modifiedData), initData(targetElement, hostElement, position, options));
    }
}
/** @type {?} */
const positionService = new Positioning();
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
    const data = positionService.positionElements(hostElement, targetElement, placement, appendToBody, options);
    /** @type {?} */
    const offsets = getOffsets(data);
    setStyles(targetElement, {
        'will-change': 'transform',
        top: '0px',
        left: '0px',
        transform: `translate3d(${offsets.left}px, ${offsets.top}px, 0px)`
    }, renderer);
    if (data.instance.arrow) {
        setStyles(data.instance.arrow, data.offsets.arrow, renderer);
    }
    updateContainerClass(data, renderer);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctcG9zaXRpb25pbmcuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYm9vdHN0cmFwL3Bvc2l0aW9uaW5nLyIsInNvdXJjZXMiOlsibmctcG9zaXRpb25pbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQU1BLE9BQU8sRUFBRSxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRTNGLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBSTVFLE1BQU0sT0FBTyxXQUFXOzs7Ozs7O0lBQ3RCLFFBQVEsQ0FBQyxXQUF3QixFQUFFLGFBQTBCLEVBQUUsS0FBSyxHQUFHLElBQUk7UUFDekUsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBRSxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDeEQsQ0FBQzs7Ozs7OztJQUVELE1BQU0sQ0FBQyxXQUF3QixFQUFFLGFBQTBCLEVBQUUsS0FBSyxHQUFHLElBQUk7UUFDdkUsT0FBTyxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDekQsQ0FBQzs7Ozs7Ozs7O0lBRUQsZ0JBQWdCLENBQ2QsV0FBd0IsRUFDeEIsYUFBMEIsRUFDMUIsUUFBZ0IsRUFDaEIsWUFBc0IsRUFDdEIsT0FBaUI7O2NBRVgsZ0JBQWdCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxLQUFLLENBQUM7UUFFOUQsT0FBTyxnQkFBZ0IsQ0FBQyxNQUFNLENBQzVCLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxFQUNsRCxRQUFRLENBQUMsYUFBYSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQ3hELENBQUM7SUFDSixDQUFDO0NBQ0Y7O01BRUssZUFBZSxHQUFHLElBQUksV0FBVyxFQUFFOzs7Ozs7Ozs7O0FBRXpDLE1BQU0sVUFBVSxnQkFBZ0IsQ0FDOUIsV0FBd0IsRUFDeEIsYUFBMEIsRUFDMUIsU0FBaUIsRUFDakIsWUFBc0IsRUFDdEIsT0FBaUIsRUFDakIsUUFBb0I7O1VBR2QsSUFBSSxHQUFHLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FDM0MsV0FBVyxFQUNYLGFBQWEsRUFDYixTQUFTLEVBQ1QsWUFBWSxFQUNaLE9BQU8sQ0FDUjs7VUFFSyxPQUFPLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztJQUVoQyxTQUFTLENBQUMsYUFBYSxFQUFFO1FBQ3ZCLGFBQWEsRUFBRSxXQUFXO1FBQzFCLEdBQUcsRUFBRSxLQUFLO1FBQ1YsSUFBSSxFQUFFLEtBQUs7UUFDWCxTQUFTLEVBQUUsZUFBZSxPQUFPLENBQUMsSUFBSSxPQUFPLE9BQU8sQ0FBQyxHQUFHLFVBQVU7S0FDbkUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUViLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUU7UUFDdkIsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0tBQzlEO0lBRUQsb0JBQW9CLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3ZDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBjb3B5cmlnaHQgVmFsb3IgU29mdHdhcmVcbiAqIEBjb3B5cmlnaHQgRmVkZXJpY28gWml2b2xvIGFuZCBjb250cmlidXRvcnNcbiAqL1xuaW1wb3J0IHsgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IGdldE9mZnNldHMsIGdldFJlZmVyZW5jZU9mZnNldHMsIHVwZGF0ZUNvbnRhaW5lckNsYXNzLCBzZXRTdHlsZXMgfSBmcm9tICcuL3V0aWxzJztcblxuaW1wb3J0IHsgYXJyb3csIGZsaXAsIHByZXZlbnRPdmVyZmxvdywgc2hpZnQsIGluaXREYXRhIH0gZnJvbSAnLi9tb2RpZmllcnMnO1xuaW1wb3J0IHsgRGF0YSwgT2Zmc2V0cywgT3B0aW9ucyB9IGZyb20gJy4vbW9kZWxzJztcblxuXG5leHBvcnQgY2xhc3MgUG9zaXRpb25pbmcge1xuICBwb3NpdGlvbihob3N0RWxlbWVudDogSFRNTEVsZW1lbnQsIHRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50LCByb3VuZCA9IHRydWUpOiBPZmZzZXRzIHtcbiAgICByZXR1cm4gdGhpcy5vZmZzZXQoaG9zdEVsZW1lbnQsIHRhcmdldEVsZW1lbnQsIGZhbHNlKTtcbiAgfVxuXG4gIG9mZnNldChob3N0RWxlbWVudDogSFRNTEVsZW1lbnQsIHRhcmdldEVsZW1lbnQ6IEhUTUxFbGVtZW50LCByb3VuZCA9IHRydWUpOiBPZmZzZXRzIHtcbiAgICByZXR1cm4gZ2V0UmVmZXJlbmNlT2Zmc2V0cyh0YXJnZXRFbGVtZW50LCBob3N0RWxlbWVudCk7XG4gIH1cblxuICBwb3NpdGlvbkVsZW1lbnRzKFxuICAgIGhvc3RFbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICB0YXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgICBwb3NpdGlvbjogc3RyaW5nLFxuICAgIGFwcGVuZFRvQm9keT86IGJvb2xlYW4sXG4gICAgb3B0aW9ucz86IE9wdGlvbnNcbiAgKTogRGF0YSB7XG4gICAgY29uc3QgY2hhaW5PZk1vZGlmaWVycyA9IFtmbGlwLCBzaGlmdCwgcHJldmVudE92ZXJmbG93LCBhcnJvd107XG5cbiAgICByZXR1cm4gY2hhaW5PZk1vZGlmaWVycy5yZWR1Y2UoXG4gICAgICAobW9kaWZpZWREYXRhLCBtb2RpZmllcikgPT4gbW9kaWZpZXIobW9kaWZpZWREYXRhKSxcbiAgICAgIGluaXREYXRhKHRhcmdldEVsZW1lbnQsIGhvc3RFbGVtZW50LCBwb3NpdGlvbiwgb3B0aW9ucylcbiAgICApO1xuICB9XG59XG5cbmNvbnN0IHBvc2l0aW9uU2VydmljZSA9IG5ldyBQb3NpdGlvbmluZygpO1xuXG5leHBvcnQgZnVuY3Rpb24gcG9zaXRpb25FbGVtZW50cyhcbiAgaG9zdEVsZW1lbnQ6IEhUTUxFbGVtZW50LFxuICB0YXJnZXRFbGVtZW50OiBIVE1MRWxlbWVudCxcbiAgcGxhY2VtZW50OiBzdHJpbmcsXG4gIGFwcGVuZFRvQm9keT86IGJvb2xlYW4sXG4gIG9wdGlvbnM/OiBPcHRpb25zLFxuICByZW5kZXJlcj86IFJlbmRlcmVyMlxuKTogdm9pZCB7XG5cbiAgY29uc3QgZGF0YSA9IHBvc2l0aW9uU2VydmljZS5wb3NpdGlvbkVsZW1lbnRzKFxuICAgIGhvc3RFbGVtZW50LFxuICAgIHRhcmdldEVsZW1lbnQsXG4gICAgcGxhY2VtZW50LFxuICAgIGFwcGVuZFRvQm9keSxcbiAgICBvcHRpb25zXG4gICk7XG5cbiAgY29uc3Qgb2Zmc2V0cyA9IGdldE9mZnNldHMoZGF0YSk7XG5cbiAgc2V0U3R5bGVzKHRhcmdldEVsZW1lbnQsIHtcbiAgICAnd2lsbC1jaGFuZ2UnOiAndHJhbnNmb3JtJyxcbiAgICB0b3A6ICcwcHgnLFxuICAgIGxlZnQ6ICcwcHgnLFxuICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCR7b2Zmc2V0cy5sZWZ0fXB4LCAke29mZnNldHMudG9wfXB4LCAwcHgpYFxuICB9LCByZW5kZXJlcik7XG5cbiAgaWYgKGRhdGEuaW5zdGFuY2UuYXJyb3cpIHtcbiAgICBzZXRTdHlsZXMoZGF0YS5pbnN0YW5jZS5hcnJvdywgZGF0YS5vZmZzZXRzLmFycm93LCByZW5kZXJlcik7XG4gIH1cblxuICB1cGRhdGVDb250YWluZXJDbGFzcyhkYXRhLCByZW5kZXJlcik7XG59XG4iXX0=