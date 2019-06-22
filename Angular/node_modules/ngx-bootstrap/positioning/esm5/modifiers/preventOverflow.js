/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { getBoundaries, isModifierEnabled } from '../utils';
/**
 * @param {?} data
 * @return {?}
 */
export function preventOverflow(data) {
    if (!isModifierEnabled(data.options, 'preventOverflow')) {
        return data;
    }
    // NOTE: DOM access here
    // resets the targetOffsets's position so that the document size can be calculated excluding
    // the size of the targetOffsets element itself
    /** @type {?} */
    var transformProp = 'transform';
    /** @type {?} */
    var targetStyles = data.instance.target.style;
    // assignment to help minification
    var top = targetStyles.top, left = targetStyles.left, _a = transformProp, transform = targetStyles[_a];
    targetStyles.top = '';
    targetStyles.left = '';
    targetStyles[transformProp] = '';
    /** @type {?} */
    var boundaries = getBoundaries(data.instance.target, data.instance.host, 0, // padding
    'scrollParent', false // positionFixed
    );
    // NOTE: DOM access here
    // restores the original style properties after the offsets have been computed
    targetStyles.top = top;
    targetStyles.left = left;
    targetStyles[transformProp] = transform;
    /** @type {?} */
    var order = ['left', 'right', 'top', 'bottom'];
    /** @type {?} */
    var check = {
        primary: /**
         * @param {?} placement
         * @return {?}
         */
        function (placement) {
            var _a;
            /** @type {?} */
            var value = ((/** @type {?} */ (data))).offsets.target[placement];
            if (((/** @type {?} */ (data))).offsets.target[placement] < boundaries[placement] &&
                !false // options.escapeWithReference
            ) {
                value = Math.max(((/** @type {?} */ (data))).offsets.target[placement], boundaries[placement]);
            }
            return _a = {}, _a[placement] = value, _a;
        },
        secondary: /**
         * @param {?} placement
         * @return {?}
         */
        function (placement) {
            var _a;
            /** @type {?} */
            var mainSide = placement === 'right' ? 'left' : 'top';
            /** @type {?} */
            var value = data.offsets.target[mainSide];
            if (((/** @type {?} */ (data))).offsets.target[placement] > boundaries[placement] &&
                !false // escapeWithReference
            ) {
                value = Math.min(data.offsets.target[mainSide], boundaries[placement] -
                    (placement === 'right' ? data.offsets.target.width : data.offsets.target.height));
            }
            return _a = {}, _a[mainSide] = value, _a;
        }
    };
    /** @type {?} */
    var side;
    order.forEach(function (placement) {
        side = ['left', 'top']
            .indexOf(placement) !== -1
            ? 'primary'
            : 'secondary';
        data.offsets.target = tslib_1.__assign({}, data.offsets.target, ((/** @type {?} */ (check)))[side](placement));
    });
    return data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmVudE92ZXJmbG93LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWJvb3RzdHJhcC9wb3NpdGlvbmluZy8iLCJzb3VyY2VzIjpbIm1vZGlmaWVycy9wcmV2ZW50T3ZlcmZsb3cudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sVUFBVSxDQUFDOzs7OztBQUc1RCxNQUFNLFVBQVUsZUFBZSxDQUFDLElBQVU7SUFFeEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUMsRUFBRTtRQUN2RCxPQUFPLElBQUksQ0FBQztLQUNiOzs7OztRQUtLLGFBQWEsR0FBRyxXQUFXOztRQUMzQixZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSzs7SUFDdkMsSUFBQSxzQkFBRyxFQUFFLHdCQUFJLEVBQUUsa0JBQWUsRUFBZiw0QkFBMEI7SUFDN0MsWUFBWSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7SUFDdEIsWUFBWSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7SUFDdkIsWUFBWSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsQ0FBQzs7UUFFM0IsVUFBVSxHQUFHLGFBQWEsQ0FDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUNsQixDQUFDLEVBQUUsVUFBVTtJQUNiLGNBQWMsRUFDZCxLQUFLLENBQUMsZ0JBQWdCO0tBQ3ZCO0lBRUQsd0JBQXdCO0lBQ3hCLDhFQUE4RTtJQUM5RSxZQUFZLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUN2QixZQUFZLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUN6QixZQUFZLENBQUMsYUFBYSxDQUFDLEdBQUcsU0FBUyxDQUFDOztRQUVsQyxLQUFLLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLENBQUM7O1FBRTFDLEtBQUssR0FBRztRQUNaLE9BQU87Ozs7a0JBQUMsU0FBaUI7OztnQkFDbkIsS0FBSyxHQUFHLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUNuRCxJQUNFLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUM7Z0JBQy9ELENBQUMsS0FBSyxDQUFDLDhCQUE4QjtjQUNyQztnQkFDQSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLG1CQUFBLElBQUksRUFBTyxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsRUFBRSxVQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUNsRjtZQUVELGdCQUFTLEdBQUMsU0FBUyxJQUFHLEtBQUssS0FBRztRQUNoQyxDQUFDO1FBQ0QsU0FBUzs7OztrQkFBQyxTQUFpQjs7O2dCQUNuQixRQUFRLEdBQUcsU0FBUyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLOztnQkFDbkQsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUN6QyxJQUNFLENBQUMsbUJBQUEsSUFBSSxFQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxTQUFTLENBQUM7Z0JBQy9ELENBQUMsS0FBSyxDQUFDLHNCQUFzQjtjQUM3QjtnQkFDQSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FDZCxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFDN0IsVUFBVSxDQUFDLFNBQVMsQ0FBQztvQkFDckIsQ0FBQyxTQUFTLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUNqRixDQUFDO2FBQ0g7WUFFRCxnQkFBUyxHQUFDLFFBQVEsSUFBRyxLQUFLLEtBQUc7UUFDL0IsQ0FBQztLQUNGOztRQUVHLElBQVk7SUFFaEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFBLFNBQVM7UUFDckIsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQzthQUNuQixPQUFPLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFCLENBQUMsQ0FBQyxTQUFTO1lBQ1gsQ0FBQyxDQUFDLFdBQVcsQ0FBQztRQUVoQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sd0JBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQ25CLENBQUMsbUJBQUEsS0FBSyxFQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FDbkMsQ0FBQztJQUVKLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0Qm91bmRhcmllcywgaXNNb2RpZmllckVuYWJsZWQgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBEYXRhIH0gZnJvbSAnLi4vbW9kZWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHByZXZlbnRPdmVyZmxvdyhkYXRhOiBEYXRhKSB7XG5cbiAgaWYgKCFpc01vZGlmaWVyRW5hYmxlZChkYXRhLm9wdGlvbnMsICdwcmV2ZW50T3ZlcmZsb3cnKSkge1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgLy8gTk9URTogRE9NIGFjY2VzcyBoZXJlXG4gIC8vIHJlc2V0cyB0aGUgdGFyZ2V0T2Zmc2V0cydzIHBvc2l0aW9uIHNvIHRoYXQgdGhlIGRvY3VtZW50IHNpemUgY2FuIGJlIGNhbGN1bGF0ZWQgZXhjbHVkaW5nXG4gIC8vIHRoZSBzaXplIG9mIHRoZSB0YXJnZXRPZmZzZXRzIGVsZW1lbnQgaXRzZWxmXG4gIGNvbnN0IHRyYW5zZm9ybVByb3AgPSAndHJhbnNmb3JtJztcbiAgY29uc3QgdGFyZ2V0U3R5bGVzID0gZGF0YS5pbnN0YW5jZS50YXJnZXQuc3R5bGU7IC8vIGFzc2lnbm1lbnQgdG8gaGVscCBtaW5pZmljYXRpb25cbiAgY29uc3QgeyB0b3AsIGxlZnQsIFt0cmFuc2Zvcm1Qcm9wXTogdHJhbnNmb3JtIH0gPSB0YXJnZXRTdHlsZXM7XG4gIHRhcmdldFN0eWxlcy50b3AgPSAnJztcbiAgdGFyZ2V0U3R5bGVzLmxlZnQgPSAnJztcbiAgdGFyZ2V0U3R5bGVzW3RyYW5zZm9ybVByb3BdID0gJyc7XG5cbiAgY29uc3QgYm91bmRhcmllcyA9IGdldEJvdW5kYXJpZXMoXG4gICAgZGF0YS5pbnN0YW5jZS50YXJnZXQsXG4gICAgZGF0YS5pbnN0YW5jZS5ob3N0LFxuICAgIDAsIC8vIHBhZGRpbmdcbiAgICAnc2Nyb2xsUGFyZW50JyxcbiAgICBmYWxzZSAvLyBwb3NpdGlvbkZpeGVkXG4gICk7XG5cbiAgLy8gTk9URTogRE9NIGFjY2VzcyBoZXJlXG4gIC8vIHJlc3RvcmVzIHRoZSBvcmlnaW5hbCBzdHlsZSBwcm9wZXJ0aWVzIGFmdGVyIHRoZSBvZmZzZXRzIGhhdmUgYmVlbiBjb21wdXRlZFxuICB0YXJnZXRTdHlsZXMudG9wID0gdG9wO1xuICB0YXJnZXRTdHlsZXMubGVmdCA9IGxlZnQ7XG4gIHRhcmdldFN0eWxlc1t0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zZm9ybTtcblxuICBjb25zdCBvcmRlciA9IFsnbGVmdCcsICdyaWdodCcsICd0b3AnLCAnYm90dG9tJ107XG5cbiAgY29uc3QgY2hlY2sgPSB7XG4gICAgcHJpbWFyeShwbGFjZW1lbnQ6IHN0cmluZykge1xuICAgICAgbGV0IHZhbHVlID0gKGRhdGEgYXMgYW55KS5vZmZzZXRzLnRhcmdldFtwbGFjZW1lbnRdO1xuICAgICAgaWYgKFxuICAgICAgICAoZGF0YSBhcyBhbnkpLm9mZnNldHMudGFyZ2V0W3BsYWNlbWVudF0gPCBib3VuZGFyaWVzW3BsYWNlbWVudF0gJiZcbiAgICAgICAgIWZhbHNlIC8vIG9wdGlvbnMuZXNjYXBlV2l0aFJlZmVyZW5jZVxuICAgICAgKSB7XG4gICAgICAgIHZhbHVlID0gTWF0aC5tYXgoKGRhdGEgYXMgYW55KS5vZmZzZXRzLnRhcmdldFtwbGFjZW1lbnRdLCBib3VuZGFyaWVzW3BsYWNlbWVudF0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4geyBbcGxhY2VtZW50XTogdmFsdWUgfTtcbiAgICB9LFxuICAgIHNlY29uZGFyeShwbGFjZW1lbnQ6IHN0cmluZykge1xuICAgICAgY29uc3QgbWFpblNpZGUgPSBwbGFjZW1lbnQgPT09ICdyaWdodCcgPyAnbGVmdCcgOiAndG9wJztcbiAgICAgIGxldCB2YWx1ZSA9IGRhdGEub2Zmc2V0cy50YXJnZXRbbWFpblNpZGVdO1xuICAgICAgaWYgKFxuICAgICAgICAoZGF0YSBhcyBhbnkpLm9mZnNldHMudGFyZ2V0W3BsYWNlbWVudF0gPiBib3VuZGFyaWVzW3BsYWNlbWVudF0gJiZcbiAgICAgICAgIWZhbHNlIC8vIGVzY2FwZVdpdGhSZWZlcmVuY2VcbiAgICAgICkge1xuICAgICAgICB2YWx1ZSA9IE1hdGgubWluKFxuICAgICAgICAgIGRhdGEub2Zmc2V0cy50YXJnZXRbbWFpblNpZGVdLFxuICAgICAgICAgIGJvdW5kYXJpZXNbcGxhY2VtZW50XSAtXG4gICAgICAgICAgKHBsYWNlbWVudCA9PT0gJ3JpZ2h0JyA/IGRhdGEub2Zmc2V0cy50YXJnZXQud2lkdGggOiBkYXRhLm9mZnNldHMudGFyZ2V0LmhlaWdodClcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHsgW21haW5TaWRlXTogdmFsdWUgfTtcbiAgICB9XG4gIH07XG5cbiAgbGV0IHNpZGU6IHN0cmluZztcblxuICBvcmRlci5mb3JFYWNoKHBsYWNlbWVudCA9PiB7XG4gICAgc2lkZSA9IFsnbGVmdCcsICd0b3AnXVxuICAgICAgLmluZGV4T2YocGxhY2VtZW50KSAhPT0gLTFcbiAgICAgID8gJ3ByaW1hcnknXG4gICAgICA6ICdzZWNvbmRhcnknO1xuXG4gICAgZGF0YS5vZmZzZXRzLnRhcmdldCA9IHtcbiAgICAgIC4uLmRhdGEub2Zmc2V0cy50YXJnZXQsXG4gICAgICAuLi4oY2hlY2sgYXMgYW55KVtzaWRlXShwbGFjZW1lbnQpXG4gICAgfTtcblxuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn1cbiJdfQ==