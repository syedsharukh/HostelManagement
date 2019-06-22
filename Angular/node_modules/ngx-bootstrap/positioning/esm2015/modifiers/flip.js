/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { computeAutoPlacement, getBoundaries, getClientRect, getOppositeVariation, getTargetOffsets, isModifierEnabled } from '../utils';
/**
 * @param {?} data
 * @return {?}
 */
export function flip(data) {
    data.offsets.target = getClientRect(data.offsets.target);
    if (!isModifierEnabled(data.options, 'flip')) {
        data.offsets.target = Object.assign({}, data.offsets.target, getTargetOffsets(data.instance.target, data.offsets.host, data.placement));
        return data;
    }
    /** @type {?} */
    const boundaries = getBoundaries(data.instance.target, data.instance.host, 0, // padding
    'viewport', false // positionFixed
    );
    /** @type {?} */
    let placement = data.placement.split(' ')[0];
    /** @type {?} */
    let variation = data.placement.split(' ')[1] || '';
    /** @type {?} */
    const offsetsHost = data.offsets.host;
    /** @type {?} */
    const target = data.instance.target;
    /** @type {?} */
    const host = data.instance.host;
    /** @type {?} */
    const adaptivePosition = computeAutoPlacement('auto', offsetsHost, target, host, data.options.allowedPositions);
    /** @type {?} */
    const flipOrder = [placement, adaptivePosition];
    /* tslint:disable-next-line: cyclomatic-complexity */
    flipOrder.forEach((step, index) => {
        if (placement !== step || flipOrder.length === index + 1) {
            return data;
        }
        placement = data.placement.split(' ')[0];
        // using floor because the host offsets may contain decimals we are not going to consider here
        /** @type {?} */
        const overlapsRef = (placement === 'left' &&
            Math.floor(data.offsets.target.right) > Math.floor(data.offsets.host.left)) ||
            (placement === 'right' &&
                Math.floor(data.offsets.target.left) < Math.floor(data.offsets.host.right)) ||
            (placement === 'top' &&
                Math.floor(data.offsets.target.bottom) > Math.floor(data.offsets.host.top)) ||
            (placement === 'bottom' &&
                Math.floor(data.offsets.target.top) < Math.floor(data.offsets.host.bottom));
        /** @type {?} */
        const overflowsLeft = Math.floor(data.offsets.target.left) < Math.floor(boundaries.left);
        /** @type {?} */
        const overflowsRight = Math.floor(data.offsets.target.right) > Math.floor(boundaries.right);
        /** @type {?} */
        const overflowsTop = Math.floor(data.offsets.target.top) < Math.floor(boundaries.top);
        /** @type {?} */
        const overflowsBottom = Math.floor(data.offsets.target.bottom) > Math.floor(boundaries.bottom);
        /** @type {?} */
        const overflowsBoundaries = (placement === 'left' && overflowsLeft) ||
            (placement === 'right' && overflowsRight) ||
            (placement === 'top' && overflowsTop) ||
            (placement === 'bottom' && overflowsBottom);
        // flip the variation if required
        /** @type {?} */
        const isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
        /** @type {?} */
        const flippedVariation = ((isVertical && variation === 'left' && overflowsLeft) ||
            (isVertical && variation === 'right' && overflowsRight) ||
            (!isVertical && variation === 'left' && overflowsTop) ||
            (!isVertical && variation === 'right' && overflowsBottom));
        if (overlapsRef || overflowsBoundaries || flippedVariation) {
            if (overlapsRef || overflowsBoundaries) {
                placement = flipOrder[index + 1];
            }
            if (flippedVariation) {
                variation = getOppositeVariation(variation);
            }
            data.placement = placement + (variation ? ` ${variation}` : '');
            data.offsets.target = Object.assign({}, data.offsets.target, getTargetOffsets(data.instance.target, data.offsets.host, data.placement));
        }
    });
    return data;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxpcC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1ib290c3RyYXAvcG9zaXRpb25pbmcvIiwic291cmNlcyI6WyJtb2RpZmllcnMvZmxpcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLG9CQUFvQixFQUNwQixhQUFhLEVBQ2IsYUFBYSxFQUNiLG9CQUFvQixFQUNwQixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2xCLE1BQU0sVUFBVSxDQUFDOzs7OztBQUlsQixNQUFNLFVBQVUsSUFBSSxDQUFDLElBQVU7SUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7SUFFekQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLEVBQUU7UUFFNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLHFCQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUNuQixnQkFBZ0IsQ0FDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUNqQixJQUFJLENBQUMsU0FBUyxDQUNmLENBQ0YsQ0FBQztRQUVGLE9BQU8sSUFBSSxDQUFDO0tBQ2I7O1VBRUssVUFBVSxHQUFHLGFBQWEsQ0FDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUNsQixDQUFDLEVBQUUsVUFBVTtJQUNiLFVBQVUsRUFDVixLQUFLLENBQUMsZ0JBQWdCO0tBQ3ZCOztRQUVHLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7O1FBQ3hDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMs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Q0FBQztBQUNkLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBjb21wdXRlQXV0b1BsYWNlbWVudCxcbiAgZ2V0Qm91bmRhcmllcyxcbiAgZ2V0Q2xpZW50UmVjdCxcbiAgZ2V0T3Bwb3NpdGVWYXJpYXRpb24sXG4gIGdldFRhcmdldE9mZnNldHMsXG4gIGlzTW9kaWZpZXJFbmFibGVkXG59IGZyb20gJy4uL3V0aWxzJztcblxuaW1wb3J0IHsgRGF0YSB9IGZyb20gJy4uL21vZGVscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBmbGlwKGRhdGE6IERhdGEpOiBEYXRhIHtcbiAgZGF0YS5vZmZzZXRzLnRhcmdldCA9IGdldENsaWVudFJlY3QoZGF0YS5vZmZzZXRzLnRhcmdldCk7XG5cbiAgaWYgKCFpc01vZGlmaWVyRW5hYmxlZChkYXRhLm9wdGlvbnMsICdmbGlwJykpIHtcblxuICAgIGRhdGEub2Zmc2V0cy50YXJnZXQgPSB7XG4gICAgICAuLi5kYXRhLm9mZnNldHMudGFyZ2V0LFxuICAgICAgLi4uZ2V0VGFyZ2V0T2Zmc2V0cyhcbiAgICAgICAgZGF0YS5pbnN0YW5jZS50YXJnZXQsXG4gICAgICAgIGRhdGEub2Zmc2V0cy5ob3N0LFxuICAgICAgICBkYXRhLnBsYWNlbWVudFxuICAgICAgKVxuICAgIH07XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGNvbnN0IGJvdW5kYXJpZXMgPSBnZXRCb3VuZGFyaWVzKFxuICAgIGRhdGEuaW5zdGFuY2UudGFyZ2V0LFxuICAgIGRhdGEuaW5zdGFuY2UuaG9zdCxcbiAgICAwLCAvLyBwYWRkaW5nXG4gICAgJ3ZpZXdwb3J0JyxcbiAgICBmYWxzZSAvLyBwb3NpdGlvbkZpeGVkXG4gICk7XG5cbiAgbGV0IHBsYWNlbWVudCA9IGRhdGEucGxhY2VtZW50LnNwbGl0KCcgJylbMF07XG4gIGxldCB2YXJpYXRpb24gPSBkYXRhLnBsYWNlbWVudC5zcGxpdCgnICcpWzFdIHx8ICcnO1xuXG4gIGNvbnN0IG9mZnNldHNIb3N0ID0gZGF0YS5vZmZzZXRzLmhvc3Q7XG4gIGNvbnN0IHRhcmdldCA9IGRhdGEuaW5zdGFuY2UudGFyZ2V0O1xuICBjb25zdCBob3N0ID0gZGF0YS5pbnN0YW5jZS5ob3N0O1xuXG4gIGNvbnN0IGFkYXB0aXZlUG9zaXRpb24gPSBjb21wdXRlQXV0b1BsYWNlbWVudCgnYXV0bycsIG9mZnNldHNIb3N0LCB0YXJnZXQsIGhvc3QsIGRhdGEub3B0aW9ucy5hbGxvd2VkUG9zaXRpb25zKTtcbiAgY29uc3QgZmxpcE9yZGVyID0gW3BsYWNlbWVudCwgYWRhcHRpdmVQb3NpdGlvbl07XG5cbiAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjeWNsb21hdGljLWNvbXBsZXhpdHkgKi9cbiAgZmxpcE9yZGVyLmZvckVhY2goKHN0ZXAsIGluZGV4KSA9PiB7XG4gICAgaWYgKHBsYWNlbWVudCAhPT0gc3RlcCB8fCBmbGlwT3JkZXIubGVuZ3RoID09PSBpbmRleCArIDEpIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIHBsYWNlbWVudCA9IGRhdGEucGxhY2VtZW50LnNwbGl0KCcgJylbMF07XG5cbiAgICAvLyB1c2luZyBmbG9vciBiZWNhdXNlIHRoZSBob3N0IG9mZnNldHMgbWF5IGNvbnRhaW4gZGVjaW1hbHMgd2UgYXJlIG5vdCBnb2luZyB0byBjb25zaWRlciBoZXJlXG4gICAgY29uc3Qgb3ZlcmxhcHNSZWYgPVxuICAgICAgKHBsYWNlbWVudCA9PT0gJ2xlZnQnICYmXG4gICAgICAgIE1hdGguZmxvb3IoZGF0YS5vZmZzZXRzLnRhcmdldC5yaWdodCkgPiBNYXRoLmZsb29yKGRhdGEub2Zmc2V0cy5ob3N0LmxlZnQpKSB8fFxuICAgICAgKHBsYWNlbWVudCA9PT0gJ3JpZ2h0JyAmJlxuICAgICAgICBNYXRoLmZsb29yKGRhdGEub2Zmc2V0cy50YXJnZXQubGVmdCkgPCBNYXRoLmZsb29yKGRhdGEub2Zmc2V0cy5ob3N0LnJpZ2h0KSkgfHxcbiAgICAgIChwbGFjZW1lbnQgPT09ICd0b3AnICYmXG4gICAgICAgIE1hdGguZmxvb3IoZGF0YS5vZmZzZXRzLnRhcmdldC5ib3R0b20pID4gTWF0aC5mbG9vcihkYXRhLm9mZnNldHMuaG9zdC50b3ApKSB8fFxuICAgICAgKHBsYWNlbWVudCA9PT0gJ2JvdHRvbScgJiZcbiAgICAgICAgTWF0aC5mbG9vcihkYXRhLm9mZnNldHMudGFyZ2V0LnRvcCkgPCBNYXRoLmZsb29yKGRhdGEub2Zmc2V0cy5ob3N0LmJvdHRvbSkpO1xuXG4gICAgY29uc3Qgb3ZlcmZsb3dzTGVmdCA9IE1hdGguZmxvb3IoZGF0YS5vZmZzZXRzLnRhcmdldC5sZWZ0KSA8IE1hdGguZmxvb3IoYm91bmRhcmllcy5sZWZ0KTtcbiAgICBjb25zdCBvdmVyZmxvd3NSaWdodCA9IE1hdGguZmxvb3IoZGF0YS5vZmZzZXRzLnRhcmdldC5yaWdodCkgPiBNYXRoLmZsb29yKGJvdW5kYXJpZXMucmlnaHQpO1xuICAgIGNvbnN0IG92ZXJmbG93c1RvcCA9IE1hdGguZmxvb3IoZGF0YS5vZmZzZXRzLnRhcmdldC50b3ApIDwgTWF0aC5mbG9vcihib3VuZGFyaWVzLnRvcCk7XG4gICAgY29uc3Qgb3ZlcmZsb3dzQm90dG9tID0gTWF0aC5mbG9vcihkYXRhLm9mZnNldHMudGFyZ2V0LmJvdHRvbSkgPiBNYXRoLmZsb29yKGJvdW5kYXJpZXMuYm90dG9tKTtcblxuICAgIGNvbnN0IG92ZXJmbG93c0JvdW5kYXJpZXMgPVxuICAgICAgKHBsYWNlbWVudCA9PT0gJ2xlZnQnICYmIG92ZXJmbG93c0xlZnQpIHx8XG4gICAgICAocGxhY2VtZW50ID09PSAncmlnaHQnICYmIG92ZXJmbG93c1JpZ2h0KSB8fFxuICAgICAgKHBsYWNlbWVudCA9PT0gJ3RvcCcgJiYgb3ZlcmZsb3dzVG9wKSB8fFxuICAgICAgKHBsYWNlbWVudCA9PT0gJ2JvdHRvbScgJiYgb3ZlcmZsb3dzQm90dG9tKTtcblxuICAgIC8vIGZsaXAgdGhlIHZhcmlhdGlvbiBpZiByZXF1aXJlZFxuICAgIGNvbnN0IGlzVmVydGljYWwgPSBbJ3RvcCcsICdib3R0b20nXS5pbmRleE9mKHBsYWNlbWVudCkgIT09IC0xO1xuICAgIGNvbnN0IGZsaXBwZWRWYXJpYXRpb24gPVxuICAgICAgKChpc1ZlcnRpY2FsICYmIHZhcmlhdGlvbiA9PT0gJ2xlZnQnICYmIG92ZXJmbG93c0xlZnQpIHx8XG4gICAgICAgIChpc1ZlcnRpY2FsICYmIHZhcmlhdGlvbiA9PT0gJ3JpZ2h0JyAmJiBvdmVyZmxvd3NSaWdodCkgfHxcbiAgICAgICAgKCFpc1ZlcnRpY2FsICYmIHZhcmlhdGlvbiA9PT0gJ2xlZnQnICYmIG92ZXJmbG93c1RvcCkgfHxcbiAgICAgICAgKCFpc1ZlcnRpY2FsICYmIHZhcmlhdGlvbiA9PT0gJ3JpZ2h0JyAmJiBvdmVyZmxvd3NCb3R0b20pKTtcblxuICAgIGlmIChvdmVybGFwc1JlZiB8fCBvdmVyZmxvd3NCb3VuZGFyaWVzIHx8IGZsaXBwZWRWYXJpYXRpb24pIHtcbiAgICAgIGlmIChvdmVybGFwc1JlZiB8fCBvdmVyZmxvd3NCb3VuZGFyaWVzKSB7XG4gICAgICAgIHBsYWNlbWVudCA9IGZsaXBPcmRlcltpbmRleCArIDFdO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmxpcHBlZFZhcmlhdGlvbikge1xuICAgICAgICB2YXJpYXRpb24gPSBnZXRPcHBvc2l0ZVZhcmlhdGlvbih2YXJpYXRpb24pO1xuICAgICAgfVxuXG4gICAgICBkYXRhLnBsYWNlbWVudCA9IHBsYWNlbWVudCArICh2YXJpYXRpb24gPyBgICR7dmFyaWF0aW9ufWAgOiAnJyk7XG5cbiAgICAgIGRhdGEub2Zmc2V0cy50YXJnZXQgPSB7XG4gICAgICAgIC4uLmRhdGEub2Zmc2V0cy50YXJnZXQsXG4gICAgICAgIC4uLmdldFRhcmdldE9mZnNldHMoXG4gICAgICAgICAgZGF0YS5pbnN0YW5jZS50YXJnZXQsXG4gICAgICAgICAgZGF0YS5vZmZzZXRzLmhvc3QsXG4gICAgICAgICAgZGF0YS5wbGFjZW1lbnRcbiAgICAgICAgKVxuICAgICAgfTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhO1xufVxuIl19