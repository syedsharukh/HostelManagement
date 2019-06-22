/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { isAfter, isBefore, isDisabledDay, isSameDay, isSameMonth, shiftDate } from 'ngx-bootstrap/chronos';
import { isMonthDisabled, isDisabledDate } from '../utils/bs-calendar-utils';
/**
 * @record
 */
export function FlagDaysCalendarOptions() { }
if (false) {
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.isDisabled;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.minDate;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.maxDate;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.daysDisabled;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.datesDisabled;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.hoveredDate;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.selectedDate;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.selectedRange;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.displayMonths;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.monthIndex;
    /** @type {?} */
    FlagDaysCalendarOptions.prototype.dateCustomClasses;
}
/**
 * @param {?} formattedMonth
 * @param {?} options
 * @return {?}
 */
export function flagDaysCalendar(formattedMonth, options) {
    formattedMonth.weeks.forEach(function (week) {
        /* tslint:disable-next-line: cyclomatic-complexity */
        week.days.forEach(function (day, dayIndex) {
            // datepicker
            /** @type {?} */
            var isOtherMonth = !isSameMonth(day.date, formattedMonth.month);
            /** @type {?} */
            var isHovered = !isOtherMonth && isSameDay(day.date, options.hoveredDate);
            // date range picker
            /** @type {?} */
            var isSelectionStart = !isOtherMonth &&
                options.selectedRange &&
                isSameDay(day.date, options.selectedRange[0]);
            /** @type {?} */
            var isSelectionEnd = !isOtherMonth &&
                options.selectedRange &&
                isSameDay(day.date, options.selectedRange[1]);
            /** @type {?} */
            var isSelected = (!isOtherMonth && isSameDay(day.date, options.selectedDate)) ||
                isSelectionStart ||
                isSelectionEnd;
            /** @type {?} */
            var isInRange = !isOtherMonth &&
                options.selectedRange &&
                isDateInRange(day.date, options.selectedRange, options.hoveredDate);
            /** @type {?} */
            var isDisabled = options.isDisabled ||
                isBefore(day.date, options.minDate, 'day') ||
                isAfter(day.date, options.maxDate, 'day') ||
                isDisabledDay(day.date, options.daysDisabled) ||
                isDisabledDate(day.date, options.datesDisabled);
            /** @type {?} */
            var currentDate = new Date();
            /** @type {?} */
            var isToday = !isOtherMonth && isSameDay(day.date, currentDate);
            /** @type {?} */
            var customClasses = options.dateCustomClasses && options.dateCustomClasses
                .map(function (dcc) { return isSameDay(day.date, dcc.date) ? dcc.classes : []; })
                .reduce(function (previousValue, currentValue) { return previousValue.concat(currentValue); }, [])
                .join(' ')
                || '';
            // decide update or not
            /** @type {?} */
            var newDay = Object.assign({}, day, {
                isOtherMonth: isOtherMonth,
                isHovered: isHovered,
                isSelected: isSelected,
                isSelectionStart: isSelectionStart,
                isSelectionEnd: isSelectionEnd,
                isInRange: isInRange,
                isDisabled: isDisabled,
                isToday: isToday,
                customClasses: customClasses
            });
            if (day.isOtherMonth !== newDay.isOtherMonth ||
                day.isHovered !== newDay.isHovered ||
                day.isSelected !== newDay.isSelected ||
                day.isSelectionStart !== newDay.isSelectionStart ||
                day.isSelectionEnd !== newDay.isSelectionEnd ||
                day.isDisabled !== newDay.isDisabled ||
                day.isInRange !== newDay.isInRange ||
                day.customClasses !== newDay.customClasses) {
                week.days[dayIndex] = newDay;
            }
        });
    });
    // todo: add check for linked calendars
    formattedMonth.hideLeftArrow =
        options.isDisabled ||
            (options.monthIndex > 0 && options.monthIndex !== options.displayMonths);
    formattedMonth.hideRightArrow =
        options.isDisabled ||
            (options.monthIndex < options.displayMonths &&
                options.monthIndex + 1 !== options.displayMonths);
    formattedMonth.disableLeftArrow = isMonthDisabled(shiftDate(formattedMonth.month, { month: -1 }), options.minDate, options.maxDate);
    formattedMonth.disableRightArrow = isMonthDisabled(shiftDate(formattedMonth.month, { month: 1 }), options.minDate, options.maxDate);
    return formattedMonth;
}
/**
 * @param {?} date
 * @param {?} selectedRange
 * @param {?} hoveredDate
 * @return {?}
 */
function isDateInRange(date, selectedRange, hoveredDate) {
    if (!date || !selectedRange[0]) {
        return false;
    }
    if (selectedRange[1]) {
        return date > selectedRange[0] && date <= selectedRange[1];
    }
    if (hoveredDate) {
        return date > selectedRange[0] && date <= hoveredDate;
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxhZy1kYXlzLWNhbGVuZGFyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWJvb3RzdHJhcC9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsiZW5naW5lL2ZsYWctZGF5cy1jYWxlbmRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBT0EsT0FBTyxFQUNMLE9BQU8sRUFDUCxRQUFRLEVBQ1IsYUFBYSxFQUNiLFNBQVMsRUFDVCxXQUFXLEVBQ1gsU0FBUyxFQUNWLE1BQU0sdUJBQXVCLENBQUM7QUFFL0IsT0FBTyxFQUFFLGVBQWUsRUFBRSxjQUFjLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQzs7OztBQUU3RSw2Q0FZQzs7O0lBWEMsNkNBQW9COztJQUNwQiwwQ0FBYzs7SUFDZCwwQ0FBYzs7SUFDZCwrQ0FBdUI7O0lBQ3ZCLGdEQUFzQjs7SUFDdEIsOENBQWtCOztJQUNsQiwrQ0FBbUI7O0lBQ25CLGdEQUFzQjs7SUFDdEIsZ0RBQXNCOztJQUN0Qiw2Q0FBbUI7O0lBQ25CLG9EQUFpRDs7Ozs7OztBQUduRCxNQUFNLFVBQVUsZ0JBQWdCLENBQzlCLGNBQXFDLEVBQ3JDLE9BQWdDO0lBRWhDLGNBQWMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBbUI7UUFDL0MscURBQXFEO1FBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQUMsR0FBaUIsRUFBRSxRQUFnQjs7O2dCQUU5QyxZQUFZLEdBQUcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxjQUFjLENBQUMsS0FBSyxDQUFDOztnQkFFM0QsU0FBUyxHQUNiLENBQUMsWUFBWSxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sQ0FBQyxXQUFXLENBQUM7OztnQkFFckQsZ0JBQWdCLEdBQ3BCLENBQUMsWUFBWTtnQkFDYixPQUFPLENBQUMsYUFBYTtnQkFDckIsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLGFB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QUNmLE9BQU8sSUFBSSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksV0FBVyxDQUFDO0tBQ3ZEO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGF5c0NhbGVuZGFyVmlld01vZGVsLFxuICBEYXlWaWV3TW9kZWwsXG4gIFdlZWtWaWV3TW9kZWwsXG4gIERhdGVwaWNrZXJEYXRlQ3VzdG9tQ2xhc3Nlc1xufSBmcm9tICcuLi9tb2RlbHMnO1xuXG5pbXBvcnQge1xuICBpc0FmdGVyLFxuICBpc0JlZm9yZSxcbiAgaXNEaXNhYmxlZERheSxcbiAgaXNTYW1lRGF5LFxuICBpc1NhbWVNb250aCxcbiAgc2hpZnREYXRlXG59IGZyb20gJ25neC1ib290c3RyYXAvY2hyb25vcyc7XG5cbmltcG9ydCB7IGlzTW9udGhEaXNhYmxlZCwgaXNEaXNhYmxlZERhdGUgfSBmcm9tICcuLi91dGlscy9icy1jYWxlbmRhci11dGlscyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRmxhZ0RheXNDYWxlbmRhck9wdGlvbnMge1xuICBpc0Rpc2FibGVkOiBib29sZWFuO1xuICBtaW5EYXRlOiBEYXRlO1xuICBtYXhEYXRlOiBEYXRlO1xuICBkYXlzRGlzYWJsZWQ6IG51bWJlcltdO1xuICBkYXRlc0Rpc2FibGVkOiBEYXRlW107XG4gIGhvdmVyZWREYXRlOiBEYXRlO1xuICBzZWxlY3RlZERhdGU6IERhdGU7XG4gIHNlbGVjdGVkUmFuZ2U6IERhdGVbXTtcbiAgZGlzcGxheU1vbnRoczogbnVtYmVyO1xuICBtb250aEluZGV4OiBudW1iZXI7XG4gIGRhdGVDdXN0b21DbGFzc2VzOiBEYXRlcGlja2VyRGF0ZUN1c3RvbUNsYXNzZXNbXTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZsYWdEYXlzQ2FsZW5kYXIoXG4gIGZvcm1hdHRlZE1vbnRoOiBEYXlzQ2FsZW5kYXJWaWV3TW9kZWwsXG4gIG9wdGlvbnM6IEZsYWdEYXlzQ2FsZW5kYXJPcHRpb25zXG4pOiBEYXlzQ2FsZW5kYXJWaWV3TW9kZWwge1xuICBmb3JtYXR0ZWRNb250aC53ZWVrcy5mb3JFYWNoKCh3ZWVrOiBXZWVrVmlld01vZGVsKSA9PiB7XG4gICAgLyogdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOiBjeWNsb21hdGljLWNvbXBsZXhpdHkgKi9cbiAgICB3ZWVrLmRheXMuZm9yRWFjaCgoZGF5OiBEYXlWaWV3TW9kZWwsIGRheUluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgIC8vIGRhdGVwaWNrZXJcbiAgICAgIGNvbnN0IGlzT3RoZXJNb250aCA9ICFpc1NhbWVNb250aChkYXkuZGF0ZSwgZm9ybWF0dGVkTW9udGgubW9udGgpO1xuXG4gICAgICBjb25zdCBpc0hvdmVyZWQgPVxuICAgICAgICAhaXNPdGhlck1vbnRoICYmIGlzU2FtZURheShkYXkuZGF0ZSwgb3B0aW9ucy5ob3ZlcmVkRGF0ZSk7XG4gICAgICAvLyBkYXRlIHJhbmdlIHBpY2tlclxuICAgICAgY29uc3QgaXNTZWxlY3Rpb25TdGFydCA9XG4gICAgICAgICFpc090aGVyTW9udGggJiZcbiAgICAgICAgb3B0aW9ucy5zZWxlY3RlZFJhbmdlICYmXG4gICAgICAgIGlzU2FtZURheShkYXkuZGF0ZSwgb3B0aW9ucy5zZWxlY3RlZFJhbmdlWzBdKTtcbiAgICAgIGNvbnN0IGlzU2VsZWN0aW9uRW5kID1cbiAgICAgICAgIWlzT3RoZXJNb250aCAmJlxuICAgICAgICBvcHRpb25zLnNlbGVjdGVkUmFuZ2UgJiZcbiAgICAgICAgaXNTYW1lRGF5KGRheS5kYXRlLCBvcHRpb25zLnNlbGVjdGVkUmFuZ2VbMV0pO1xuXG4gICAgICBjb25zdCBpc1NlbGVjdGVkID1cbiAgICAgICAgKCFpc090aGVyTW9udGggJiYgaXNTYW1lRGF5KGRheS5kYXRlLCBvcHRpb25zLnNlbGVjdGVkRGF0ZSkpIHx8XG4gICAgICAgIGlzU2VsZWN0aW9uU3RhcnQgfHxcbiAgICAgICAgaXNTZWxlY3Rpb25FbmQ7XG5cbiAgICAgIGNvbnN0IGlzSW5SYW5nZSA9XG4gICAgICAgICFpc090aGVyTW9udGggJiZcbiAgICAgICAgb3B0aW9ucy5zZWxlY3RlZFJhbmdlICYmXG4gICAgICAgIGlzRGF0ZUluUmFuZ2UoZGF5LmRhdGUsIG9wdGlvbnMuc2VsZWN0ZWRSYW5nZSwgb3B0aW9ucy5ob3ZlcmVkRGF0ZSk7XG5cbiAgICAgIGNvbnN0IGlzRGlzYWJsZWQgPVxuICAgICAgICBvcHRpb25zLmlzRGlzYWJsZWQgfHxcbiAgICAgICAgaXNCZWZvcmUoZGF5LmRhdGUsIG9wdGlvbnMubWluRGF0ZSwgJ2RheScpIHx8XG4gICAgICAgIGlzQWZ0ZXIoZGF5LmRhdGUsIG9wdGlvbnMubWF4RGF0ZSwgJ2RheScpIHx8XG4gICAgICAgIGlzRGlzYWJsZWREYXkoZGF5LmRhdGUsIG9wdGlvbnMuZGF5c0Rpc2FibGVkKSB8fFxuICAgICAgICBpc0Rpc2FibGVkRGF0ZShkYXkuZGF0ZSwgb3B0aW9ucy5kYXRlc0Rpc2FibGVkKTtcblxuICAgICAgY29uc3QgY3VycmVudERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgY29uc3QgaXNUb2RheSA9ICFpc090aGVyTW9udGggJiYgaXNTYW1lRGF5KGRheS5kYXRlLCBjdXJyZW50RGF0ZSk7XG5cbiAgICAgIGNvbnN0IGN1c3RvbUNsYXNzZXMgPSBvcHRpb25zLmRhdGVDdXN0b21DbGFzc2VzICYmIG9wdGlvbnMuZGF0ZUN1c3RvbUNsYXNzZXNcbiAgICAgICAgLm1hcChkY2MgPT4gaXNTYW1lRGF5KGRheS5kYXRlLCBkY2MuZGF0ZSkgPyBkY2MuY2xhc3NlcyA6IFtdKVxuICAgICAgICAucmVkdWNlKChwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpID0+IHByZXZpb3VzVmFsdWUuY29uY2F0KGN1cnJlbnRWYWx1ZSksIFtdKVxuICAgICAgICAuam9pbignICcpXG4gICAgICAgIHx8ICcnO1xuXG5cbiAgICAgIC8vIGRlY2lkZSB1cGRhdGUgb3Igbm90XG4gICAgICBjb25zdCBuZXdEYXkgPSBPYmplY3QuYXNzaWduKHt9LCBkYXksIHtcbiAgICAgICAgaXNPdGhlck1vbnRoLFxuICAgICAgICBpc0hvdmVyZWQsXG4gICAgICAgIGlzU2VsZWN0ZWQsXG4gICAgICAgIGlzU2VsZWN0aW9uU3RhcnQsXG4gICAgICAgIGlzU2VsZWN0aW9uRW5kLFxuICAgICAgICBpc0luUmFuZ2UsXG4gICAgICAgIGlzRGlzYWJsZWQsXG4gICAgICAgIGlzVG9kYXksXG4gICAgICAgIGN1c3RvbUNsYXNzZXNcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoXG4gICAgICAgIGRheS5pc090aGVyTW9udGggIT09IG5ld0RheS5pc090aGVyTW9udGggfHxcbiAgICAgICAgZGF5LmlzSG92ZXJlZCAhPT0gbmV3RGF5LmlzSG92ZXJlZCB8fFxuICAgICAgICBkYXkuaXNTZWxlY3RlZCAhPT0gbmV3RGF5LmlzU2VsZWN0ZWQgfHxcbiAgICAgICAgZGF5LmlzU2VsZWN0aW9uU3RhcnQgIT09IG5ld0RheS5pc1NlbGVjdGlvblN0YXJ0IHx8XG4gICAgICAgIGRheS5pc1NlbGVjdGlvbkVuZCAhPT0gbmV3RGF5LmlzU2VsZWN0aW9uRW5kIHx8XG4gICAgICAgIGRheS5pc0Rpc2FibGVkICE9PSBuZXdEYXkuaXNEaXNhYmxlZCB8fFxuICAgICAgICBkYXkuaXNJblJhbmdlICE9PSBuZXdEYXkuaXNJblJhbmdlIHx8XG4gICAgICAgIGRheS5jdXN0b21DbGFzc2VzICE9PSBuZXdEYXkuY3VzdG9tQ2xhc3Nlc1xuICAgICAgKSB7XG4gICAgICAgIHdlZWsuZGF5c1tkYXlJbmRleF0gPSBuZXdEYXk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIHRvZG86IGFkZCBjaGVjayBmb3IgbGlua2VkIGNhbGVuZGFyc1xuICBmb3JtYXR0ZWRNb250aC5oaWRlTGVmdEFycm93ID1cbiAgICBvcHRpb25zLmlzRGlzYWJsZWQgfHxcbiAgICAob3B0aW9ucy5tb250aEluZGV4ID4gMCAmJiBvcHRpb25zLm1vbnRoSW5kZXggIT09IG9wdGlvbnMuZGlzcGxheU1vbnRocyk7XG4gIGZvcm1hdHRlZE1vbnRoLmhpZGVSaWdodEFycm93ID1cbiAgICBvcHRpb25zLmlzRGlzYWJsZWQgfHxcbiAgICAob3B0aW9ucy5tb250aEluZGV4IDwgb3B0aW9ucy5kaXNwbGF5TW9udGhzICYmXG4gICAgICBvcHRpb25zLm1vbnRoSW5kZXggKyAxICE9PSBvcHRpb25zLmRpc3BsYXlNb250aHMpO1xuXG4gIGZvcm1hdHRlZE1vbnRoLmRpc2FibGVMZWZ0QXJyb3cgPSBpc01vbnRoRGlzYWJsZWQoXG4gICAgc2hpZnREYXRlKGZvcm1hdHRlZE1vbnRoLm1vbnRoLCB7IG1vbnRoOiAtMSB9KSxcbiAgICBvcHRpb25zLm1pbkRhdGUsXG4gICAgb3B0aW9ucy5tYXhEYXRlXG4gICk7XG4gIGZvcm1hdHRlZE1vbnRoLmRpc2FibGVSaWdodEFycm93ID0gaXNNb250aERpc2FibGVkKFxuICAgIHNoaWZ0RGF0ZShmb3JtYXR0ZWRNb250aC5tb250aCwgeyBtb250aDogMSB9KSxcbiAgICBvcHRpb25zLm1pbkRhdGUsXG4gICAgb3B0aW9ucy5tYXhEYXRlXG4gICk7XG5cbiAgcmV0dXJuIGZvcm1hdHRlZE1vbnRoO1xufVxuXG5mdW5jdGlvbiBpc0RhdGVJblJhbmdlKFxuICBkYXRlOiBEYXRlLFxuICBzZWxlY3RlZFJhbmdlOiBEYXRlW10sXG4gIGhvdmVyZWREYXRlOiBEYXRlXG4pOiBib29sZWFuIHtcbiAgaWYgKCFkYXRlIHx8ICFzZWxlY3RlZFJhbmdlWzBdKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHNlbGVjdGVkUmFuZ2VbMV0pIHtcbiAgICByZXR1cm4gZGF0ZSA+IHNlbGVjdGVkUmFuZ2VbMF0gJiYgZGF0ZSA8PSBzZWxlY3RlZFJhbmdlWzFdO1xuICB9XG5cbiAgaWYgKGhvdmVyZWREYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUgPiBzZWxlY3RlZFJhbmdlWzBdICYmIGRhdGUgPD0gaG92ZXJlZERhdGU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG4iXX0=