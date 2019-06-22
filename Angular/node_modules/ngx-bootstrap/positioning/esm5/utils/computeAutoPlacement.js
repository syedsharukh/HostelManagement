/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/**
 * Utility used to transform the `auto` placement to the placement with more
 * available space.
 */
import { getBoundaries } from './getBoundaries';
/**
 * @param {?} __0
 * @return {?}
 */
function getArea(_a) {
    var width = _a.width, height = _a.height;
    return width * height;
}
/**
 * @param {?} placement
 * @param {?} refRect
 * @param {?} target
 * @param {?} host
 * @param {?=} allowedPositions
 * @param {?=} boundariesElement
 * @param {?=} padding
 * @return {?}
 */
export function computeAutoPlacement(placement, refRect, target, host, allowedPositions, boundariesElement, padding) {
    if (allowedPositions === void 0) { allowedPositions = ['top', 'bottom', 'right', 'left']; }
    if (boundariesElement === void 0) { boundariesElement = 'viewport'; }
    if (padding === void 0) { padding = 0; }
    if (placement.indexOf('auto') === -1) {
        return placement;
    }
    /** @type {?} */
    var boundaries = getBoundaries(target, host, padding, boundariesElement);
    /** @type {?} */
    var rects = {
        top: {
            width: boundaries.width,
            height: refRect.top - boundaries.top
        },
        right: {
            width: boundaries.right - refRect.right,
            height: boundaries.height
        },
        bottom: {
            width: boundaries.width,
            height: boundaries.bottom - refRect.bottom
        },
        left: {
            width: refRect.left - boundaries.left,
            height: boundaries.height
        }
    };
    /** @type {?} */
    var sortedAreas = Object.keys(rects)
        .map(function (key) { return (tslib_1.__assign({ key: key }, rects[key], { area: getArea(rects[key]) })); })
        .sort(function (a, b) { return b.area - a.area; });
    /** @type {?} */
    var filteredAreas = sortedAreas.filter(function (_a) {
        var width = _a.width, height = _a.height;
        return width >= target.clientWidth
            && height >= target.clientHeight;
    });
    filteredAreas = filteredAreas.filter(function (position) {
        return allowedPositions
            .some(function (allowedPosition) {
            return allowedPosition === position.key;
        });
    });
    /** @type {?} */
    var computedPlacement = filteredAreas.length > 0
        ? filteredAreas[0].key
        : sortedAreas[0].key;
    /** @type {?} */
    var variation = placement.split(' ')[1];
    // for tooltip on auto position
    target.className = target.className.replace(/bs-tooltip-auto/g, "bs-tooltip-" + computedPlacement);
    return computedPlacement + (variation ? "-" + variation : '');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcHV0ZUF1dG9QbGFjZW1lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtYm9vdHN0cmFwL3Bvc2l0aW9uaW5nLyIsInNvdXJjZXMiOlsidXRpbHMvY29tcHV0ZUF1dG9QbGFjZW1lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBSUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7OztBQUdoRCxTQUFTLE9BQU8sQ0FBQyxFQUE0QztRQUExQyxnQkFBSyxFQUFFLGtCQUFNO0lBQzlCLE9BQU8sS0FBSyxHQUFHLE1BQU0sQ0FBQztBQUN4QixDQUFDOzs7Ozs7Ozs7OztBQUVELE1BQU0sVUFBVSxvQkFBb0IsQ0FDbEMsU0FBaUIsRUFDakIsT0FBZ0IsRUFDaEIsTUFBbUIsRUFDbkIsSUFBaUIsRUFDakIsZ0JBQTRELEVBQzVELGlCQUE4QixFQUM5QixPQUFXO0lBRlgsaUNBQUEsRUFBQSxvQkFBMkIsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDO0lBQzVELGtDQUFBLEVBQUEsOEJBQThCO0lBQzlCLHdCQUFBLEVBQUEsV0FBVztJQUVYLElBQUksU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUNwQyxPQUFPLFNBQVMsQ0FBQztLQUNsQjs7UUFFSyxVQUFVLEdBQUcsYUFBYSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLGlCQUFpQixDQUFDOztRQUVwRSxLQUFLLEdBQVE7UUFDakIsR0FBRyxFQUFFO1lBQ0gsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLO1lBQ3ZCLE1BQU0sRUFBRSxPQUFPLENBQUMsR0FBRyxHQUFHLFVBQVUsQ0FBQyxHQUFHO1NBQ3JDO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUs7WUFDdkMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxNQUFNO1NBQzFCO1FBQ0QsTUFBTSxFQUFFO1lBQ04sS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLO1lBQ3ZCLE1BQU0sRUFBRSxVQUFVLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNO1NBQzNDO1FBQ0QsSUFBSSxFQUFFO1lBQ0osS0FBSyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEdBQUcsVUFBVSxDQUFDLElBQUk7WUFDckMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxNQUFNO1NBQzFCO0tBQ0Y7O1FBRUssV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ25DLEdBQUcsQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLG9CQUNWLEdBQUcsS0FBQSxJQUNBLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFDYixJQUFJLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUN6QixFQUpVLENBSVYsQ0FBQztTQUNGLElBQUksQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQWYsQ0FBZSxDQUFDOztRQUU5QixhQUFhLEdBQVUsV0FBVyxDQUFDLE1BQU0sQ0FDM0MsVUFBQyxFQUFpQjtZQUFmLGdCQUFLLEVBQUUsa0JBQU07UUFDZCxPQUFPLEtBQUssSUFBSSxNQUFNLENBQUMsV0FBVztlQUM3QixNQUFNLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQztJQUNyQyxDQUFDLENBQ0Y7SUFFRCxhQUFhLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxVQUFDLFFBQWE7UUFDakQsT0FBTyxnQkFBZ0I7YUFDcEIsSUFBSSxDQUFDLFVBQUMsZUFBdUI7WUFDNUIsT0FBTyxlQUFlLEtBQUssUUFBUSxDQUFDLEdBQUcsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDOztRQUVHLGlCQUFpQixHQUFXLGFBQWEsQ0FBQyxNQUFNLEdBQUcsQ0FBQztRQUN4RCxDQUFDLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUc7UUFDdEIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHOztRQUVoQixTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFekMsK0JBQStCO0lBQy9CLE1BQU0sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsZ0JBQWMsaUJBQW1CLENBQUMsQ0FBQztJQUVuRyxPQUFPLGlCQUFpQixHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFJLFNBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDaEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogVXRpbGl0eSB1c2VkIHRvIHRyYW5zZm9ybSB0aGUgYGF1dG9gIHBsYWNlbWVudCB0byB0aGUgcGxhY2VtZW50IHdpdGggbW9yZVxuICogYXZhaWxhYmxlIHNwYWNlLlxuICovXG5pbXBvcnQgeyBnZXRCb3VuZGFyaWVzIH0gZnJvbSAnLi9nZXRCb3VuZGFyaWVzJztcbmltcG9ydCB7IE9mZnNldHMgfSBmcm9tICcuLi9tb2RlbHMnO1xuXG5mdW5jdGlvbiBnZXRBcmVhKHsgd2lkdGgsIGhlaWdodCB9OiB7IFtrZXk6IHN0cmluZ106IG51bWJlciB9KSB7XG4gIHJldHVybiB3aWR0aCAqIGhlaWdodDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbXB1dGVBdXRvUGxhY2VtZW50KFxuICBwbGFjZW1lbnQ6IHN0cmluZyxcbiAgcmVmUmVjdDogT2Zmc2V0cyxcbiAgdGFyZ2V0OiBIVE1MRWxlbWVudCxcbiAgaG9zdDogSFRNTEVsZW1lbnQsXG4gIGFsbG93ZWRQb3NpdGlvbnM6IGFueVtdID0gWyd0b3AnLCAnYm90dG9tJywgJ3JpZ2h0JywgJ2xlZnQnXSxcbiAgYm91bmRhcmllc0VsZW1lbnQgPSAndmlld3BvcnQnLFxuICBwYWRkaW5nID0gMFxuKSB7XG4gIGlmIChwbGFjZW1lbnQuaW5kZXhPZignYXV0bycpID09PSAtMSkge1xuICAgIHJldHVybiBwbGFjZW1lbnQ7XG4gIH1cblxuICBjb25zdCBib3VuZGFyaWVzID0gZ2V0Qm91bmRhcmllcyh0YXJnZXQsIGhvc3QsIHBhZGRpbmcsIGJvdW5kYXJpZXNFbGVtZW50KTtcblxuICBjb25zdCByZWN0czogYW55ID0ge1xuICAgIHRvcDoge1xuICAgICAgd2lkdGg6IGJvdW5kYXJpZXMud2lkdGgsXG4gICAgICBoZWlnaHQ6IHJlZlJlY3QudG9wIC0gYm91bmRhcmllcy50b3BcbiAgICB9LFxuICAgIHJpZ2h0OiB7XG4gICAgICB3aWR0aDogYm91bmRhcmllcy5yaWdodCAtIHJlZlJlY3QucmlnaHQsXG4gICAgICBoZWlnaHQ6IGJvdW5kYXJpZXMuaGVpZ2h0XG4gICAgfSxcbiAgICBib3R0b206IHtcbiAgICAgIHdpZHRoOiBib3VuZGFyaWVzLndpZHRoLFxuICAgICAgaGVpZ2h0OiBib3VuZGFyaWVzLmJvdHRvbSAtIHJlZlJlY3QuYm90dG9tXG4gICAgfSxcbiAgICBsZWZ0OiB7XG4gICAgICB3aWR0aDogcmVmUmVjdC5sZWZ0IC0gYm91bmRhcmllcy5sZWZ0LFxuICAgICAgaGVpZ2h0OiBib3VuZGFyaWVzLmhlaWdodFxuICAgIH1cbiAgfTtcblxuICBjb25zdCBzb3J0ZWRBcmVhcyA9IE9iamVjdC5rZXlzKHJlY3RzKVxuICAgIC5tYXAoa2V5ID0+ICh7XG4gICAgICBrZXksXG4gICAgICAuLi5yZWN0c1trZXldLFxuICAgICAgYXJlYTogZ2V0QXJlYShyZWN0c1trZXldKVxuICAgIH0pKVxuICAgIC5zb3J0KChhLCBiKSA9PiBiLmFyZWEgLSBhLmFyZWEpO1xuXG4gIGxldCBmaWx0ZXJlZEFyZWFzOiBhbnlbXSA9IHNvcnRlZEFyZWFzLmZpbHRlcihcbiAgICAoeyB3aWR0aCwgaGVpZ2h0IH0pID0+IHtcbiAgICAgIHJldHVybiB3aWR0aCA+PSB0YXJnZXQuY2xpZW50V2lkdGhcbiAgICAgICAgJiYgaGVpZ2h0ID49IHRhcmdldC5jbGllbnRIZWlnaHQ7XG4gICAgfVxuICApO1xuXG4gIGZpbHRlcmVkQXJlYXMgPSBmaWx0ZXJlZEFyZWFzLmZpbHRlcigocG9zaXRpb246IGFueSkgPT4ge1xuICAgIHJldHVybiBhbGxvd2VkUG9zaXRpb25zXG4gICAgICAuc29tZSgoYWxsb3dlZFBvc2l0aW9uOiBzdHJpbmcpID0+IHtcbiAgICAgICAgcmV0dXJuIGFsbG93ZWRQb3NpdGlvbiA9PT0gcG9zaXRpb24ua2V5O1xuICAgICAgfSk7XG4gIH0pO1xuXG4gIGNvbnN0IGNvbXB1dGVkUGxhY2VtZW50OiBzdHJpbmcgPSBmaWx0ZXJlZEFyZWFzLmxlbmd0aCA+IDBcbiAgICA/IGZpbHRlcmVkQXJlYXNbMF0ua2V5XG4gICAgOiBzb3J0ZWRBcmVhc1swXS5rZXk7XG5cbiAgY29uc3QgdmFyaWF0aW9uID0gcGxhY2VtZW50LnNwbGl0KCcgJylbMV07XG5cbiAgLy8gZm9yIHRvb2x0aXAgb24gYXV0byBwb3NpdGlvblxuICB0YXJnZXQuY2xhc3NOYW1lID0gdGFyZ2V0LmNsYXNzTmFtZS5yZXBsYWNlKC9icy10b29sdGlwLWF1dG8vZywgYGJzLXRvb2x0aXAtJHtjb21wdXRlZFBsYWNlbWVudH1gKTtcblxuICByZXR1cm4gY29tcHV0ZWRQbGFjZW1lbnQgKyAodmFyaWF0aW9uID8gYC0ke3ZhcmlhdGlvbn1gIDogJycpO1xufVxuIl19