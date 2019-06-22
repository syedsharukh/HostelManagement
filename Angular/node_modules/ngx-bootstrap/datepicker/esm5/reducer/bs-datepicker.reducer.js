/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
// tslint:disable:max-file-line-count
import { initialDatepickerState } from './bs-datepicker.state';
import { BsDatepickerActions } from './bs-datepicker.actions';
import { calcDaysCalendar } from '../engine/calc-days-calendar';
import { formatDaysCalendar } from '../engine/format-days-calendar';
import { flagDaysCalendar } from '../engine/flag-days-calendar';
import { setFullDate, shiftDate, isArray, isDateValid, startOf, getLocale, isAfter, isBefore } from 'ngx-bootstrap/chronos';
import { canSwitchMode } from '../engine/view-mode';
import { formatMonthsCalendar } from '../engine/format-months-calendar';
import { flagMonthsCalendar } from '../engine/flag-months-calendar';
import { formatYearsCalendar, yearsPerCalendar } from '../engine/format-years-calendar';
import { flagYearsCalendar } from '../engine/flag-years-calendar';
/* tslint:disable-next-line: cyclomatic-complexity */
/**
 * @param {?=} state
 * @param {?=} action
 * @return {?}
 */
export function bsDatepickerReducer(state, action) {
    if (state === void 0) { state = initialDatepickerState; }
    switch (action.type) {
        case BsDatepickerActions.CALCULATE: {
            return calculateReducer(state);
        }
        case BsDatepickerActions.FORMAT: {
            return formatReducer(state, action);
        }
        case BsDatepickerActions.FLAG: {
            return flagReducer(state, action);
        }
        case BsDatepickerActions.NAVIGATE_OFFSET: {
            /** @type {?} */
            var date = shiftDate(startOf(state.view.date, 'month'), action.payload);
            /** @type {?} */
            var newState = {
                view: {
                    mode: state.view.mode,
                    date: date
                }
            };
            return Object.assign({}, state, newState);
        }
        case BsDatepickerActions.NAVIGATE_TO: {
            /** @type {?} */
            var payload = action.payload;
            /** @type {?} */
            var date = setFullDate(state.view.date, payload.unit);
            /** @type {?} */
            var newState = void 0;
            /** @type {?} */
            var mode = void 0;
            if (canSwitchMode(payload.viewMode, state.minMode)) {
                mode = payload.viewMode;
                newState = { view: { date: date, mode: mode } };
            }
            else {
                mode = state.view.mode;
                newState = { selectedDate: date, view: { date: date, mode: mode } };
            }
            return Object.assign({}, state, newState);
        }
        case BsDatepickerActions.CHANGE_VIEWMODE: {
            if (!canSwitchMode(action.payload, state.minMode)) {
                return state;
            }
            /** @type {?} */
            var date = state.view.date;
            /** @type {?} */
            var mode = action.payload;
            /** @type {?} */
            var newState = { view: { date: date, mode: mode } };
            return Object.assign({}, state, newState);
        }
        case BsDatepickerActions.HOVER: {
            return Object.assign({}, state, { hoveredDate: action.payload });
        }
        case BsDatepickerActions.SELECT: {
            /** @type {?} */
            var newState = {
                selectedDate: action.payload,
                view: state.view
            };
            /** @type {?} */
            var mode = state.view.mode;
            /** @type {?} */
            var _date = action.payload || state.view.date;
            /** @type {?} */
            var date = getViewDate(_date, state.minDate, state.maxDate);
            newState.view = { mode: mode, date: date };
            return Object.assign({}, state, newState);
        }
        case BsDatepickerActions.SET_OPTIONS: {
            /** @type {?} */
            var newState = action.payload;
            // preserve view mode
            /** @type {?} */
            var mode = newState.minMode ? newState.minMode : state.view.mode;
            /** @type {?} */
            var _viewDate = isDateValid(newState.value) && newState.value
                || isArray(newState.value) && isDateValid(newState.value[0]) && newState.value[0]
                || state.view.date;
            /** @type {?} */
            var date = getViewDate(_viewDate, newState.minDate, newState.maxDate);
            newState.view = { mode: mode, date: date };
            // update selected value
            if (newState.value) {
                // if new value is array we work with date range
                if (isArray(newState.value)) {
                    newState.selectedRange = newState.value;
                }
                // if new value is a date -> datepicker
                if (newState.value instanceof Date) {
                    newState.selectedDate = newState.value;
                }
                // provided value is not supported :)
                // need to report it somehow
            }
            return Object.assign({}, state, newState);
        }
        // date range picker
        case BsDatepickerActions.SELECT_RANGE: {
            /** @type {?} */
            var newState = {
                selectedRange: action.payload,
                view: state.view
            };
            /** @type {?} */
            var mode = state.view.mode;
            /** @type {?} */
            var _date = action.payload && action.payload[0] || state.view.date;
            /** @type {?} */
            var date = getViewDate(_date, state.minDate, state.maxDate);
            newState.view = { mode: mode, date: date };
            return Object.assign({}, state, newState);
        }
        case BsDatepickerActions.SET_MIN_DATE: {
            return Object.assign({}, state, {
                minDate: action.payload
            });
        }
        case BsDatepickerActions.SET_MAX_DATE: {
            return Object.assign({}, state, {
                maxDate: action.payload
            });
        }
        case BsDatepickerActions.SET_IS_DISABLED: {
            return Object.assign({}, state, {
                isDisabled: action.payload
            });
        }
        case BsDatepickerActions.SET_DATE_CUSTOM_CLASSES: {
            return Object.assign({}, state, {
                dateCustomClasses: action.payload
            });
        }
        default:
            return state;
    }
}
/**
 * @param {?} state
 * @return {?}
 */
function calculateReducer(state) {
    // how many calendars
    /** @type {?} */
    var displayMonths = state.displayMonths;
    // use selected date on initial rendering if set
    /** @type {?} */
    var viewDate = state.view.date;
    if (state.view.mode === 'day') {
        state.monthViewOptions.firstDayOfWeek = getLocale(state.locale).firstDayOfWeek();
        /** @type {?} */
        var monthsModel = new Array(displayMonths);
        for (var monthIndex = 0; monthIndex < displayMonths; monthIndex++) {
            // todo: for unlinked calendars it will be harder
            monthsModel[monthIndex] = calcDaysCalendar(viewDate, state.monthViewOptions);
            viewDate = shiftDate(viewDate, { month: 1 });
        }
        return Object.assign({}, state, { monthsModel: monthsModel });
    }
    if (state.view.mode === 'month') {
        /** @type {?} */
        var monthsCalendar = new Array(displayMonths);
        for (var calendarIndex = 0; calendarIndex < displayMonths; calendarIndex++) {
            // todo: for unlinked calendars it will be harder
            monthsCalendar[calendarIndex] = formatMonthsCalendar(viewDate, getFormatOptions(state));
            viewDate = shiftDate(viewDate, { year: 1 });
        }
        return Object.assign({}, state, { monthsCalendar: monthsCalendar });
    }
    if (state.view.mode === 'year') {
        /** @type {?} */
        var yearsCalendarModel = new Array(displayMonths);
        for (var calendarIndex = 0; calendarIndex < displayMonths; calendarIndex++) {
            // todo: for unlinked calendars it will be harder
            yearsCalendarModel[calendarIndex] = formatYearsCalendar(viewDate, getFormatOptions(state));
            viewDate = shiftDate(viewDate, { year: yearsPerCalendar });
        }
        return Object.assign({}, state, { yearsCalendarModel: yearsCalendarModel });
    }
    return state;
}
/**
 * @param {?} state
 * @param {?} action
 * @return {?}
 */
function formatReducer(state, action) {
    if (state.view.mode === 'day') {
        /** @type {?} */
        var formattedMonths = state.monthsModel.map(function (month, monthIndex) {
            return formatDaysCalendar(month, getFormatOptions(state), monthIndex);
        });
        return Object.assign({}, state, { formattedMonths: formattedMonths });
    }
    // how many calendars
    /** @type {?} */
    var displayMonths = state.displayMonths;
    // check initial rendering
    // use selected date on initial rendering if set
    /** @type {?} */
    var viewDate = state.view.date;
    if (state.view.mode === 'month') {
        /** @type {?} */
        var monthsCalendar = new Array(displayMonths);
        for (var calendarIndex = 0; calendarIndex < displayMonths; calendarIndex++) {
            // todo: for unlinked calendars it will be harder
            monthsCalendar[calendarIndex] = formatMonthsCalendar(viewDate, getFormatOptions(state));
            viewDate = shiftDate(viewDate, { year: 1 });
        }
        return Object.assign({}, state, { monthsCalendar: monthsCalendar });
    }
    if (state.view.mode === 'year') {
        /** @type {?} */
        var yearsCalendarModel = new Array(displayMonths);
        for (var calendarIndex = 0; calendarIndex < displayMonths; calendarIndex++) {
            // todo: for unlinked calendars it will be harder
            yearsCalendarModel[calendarIndex] = formatYearsCalendar(viewDate, getFormatOptions(state));
            viewDate = shiftDate(viewDate, { year: 16 });
        }
        return Object.assign({}, state, { yearsCalendarModel: yearsCalendarModel });
    }
    return state;
}
/**
 * @param {?} state
 * @param {?} action
 * @return {?}
 */
function flagReducer(state, action) {
    if (state.view.mode === 'day') {
        /** @type {?} */
        var flaggedMonths = state.formattedMonths.map(function (formattedMonth, monthIndex) {
            return flagDaysCalendar(formattedMonth, {
                isDisabled: state.isDisabled,
                minDate: state.minDate,
                maxDate: state.maxDate,
                daysDisabled: state.daysDisabled,
                datesDisabled: state.datesDisabled,
                hoveredDate: state.hoveredDate,
                selectedDate: state.selectedDate,
                selectedRange: state.selectedRange,
                displayMonths: state.displayMonths,
                dateCustomClasses: state.dateCustomClasses,
                monthIndex: monthIndex
            });
        });
        return Object.assign({}, state, { flaggedMonths: flaggedMonths });
    }
    if (state.view.mode === 'month') {
        /** @type {?} */
        var flaggedMonthsCalendar = state.monthsCalendar.map(function (formattedMonth, monthIndex) {
            return flagMonthsCalendar(formattedMonth, {
                isDisabled: state.isDisabled,
                minDate: state.minDate,
                maxDate: state.maxDate,
                hoveredMonth: state.hoveredMonth,
                displayMonths: state.displayMonths,
                monthIndex: monthIndex
            });
        });
        return Object.assign({}, state, { flaggedMonthsCalendar: flaggedMonthsCalendar });
    }
    if (state.view.mode === 'year') {
        /** @type {?} */
        var yearsCalendarFlagged = state.yearsCalendarModel.map(function (formattedMonth, yearIndex) {
            return flagYearsCalendar(formattedMonth, {
                isDisabled: state.isDisabled,
                minDate: state.minDate,
                maxDate: state.maxDate,
                hoveredYear: state.hoveredYear,
                displayMonths: state.displayMonths,
                yearIndex: yearIndex
            });
        });
        return Object.assign({}, state, { yearsCalendarFlagged: yearsCalendarFlagged });
    }
    return state;
}
/**
 * @param {?} state
 * @return {?}
 */
function getFormatOptions(state) {
    return {
        locale: state.locale,
        monthTitle: state.monthTitle,
        yearTitle: state.yearTitle,
        dayLabel: state.dayLabel,
        monthLabel: state.monthLabel,
        yearLabel: state.yearLabel,
        weekNumbers: state.weekNumbers
    };
}
/**
 * if view date is provided (bsValue|ngModel) it should be shown
 * if view date is not provider:
 * if minDate>currentDate (default view value), show minDate
 * if maxDate<currentDate(default view value) show maxDate
 * @param {?} viewDate
 * @param {?} minDate
 * @param {?} maxDate
 * @return {?}
 */
function getViewDate(viewDate, minDate, maxDate) {
    /** @type {?} */
    var _date = Array.isArray(viewDate) ? viewDate[0] : viewDate;
    if (minDate && isAfter(minDate, _date, 'day')) {
        return minDate;
    }
    if (maxDate && isBefore(maxDate, _date, 'day')) {
        return maxDate;
    }
    return _date;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZGF0ZXBpY2tlci5yZWR1Y2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWJvb3RzdHJhcC9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsicmVkdWNlci9icy1kYXRlcGlja2VyLnJlZHVjZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQXFCLHNCQUFzQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFbEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDaEUsT0FBTyxFQUNMLFdBQVcsRUFDWCxTQUFTLEVBQ1QsT0FBTyxFQUNQLFdBQVcsRUFDWCxPQUFPLEVBQ1AsU0FBUyxFQUNULE9BQU8sRUFDUCxRQUFRLEVBQ1QsTUFBTSx1QkFBdUIsQ0FBQztBQUMvQixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDcEQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDeEUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLGdCQUFnQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDeEYsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sK0JBQStCLENBQUM7Ozs7Ozs7QUFLbEUsTUFBTSxVQUFVLG1CQUFtQixDQUFDLEtBQThCLEVBQzlCLE1BQWM7SUFEZCxzQkFBQSxFQUFBLDhCQUE4QjtJQUVoRSxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFDbkIsS0FBSyxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNsQyxPQUFPLGdCQUFn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USxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEVBQUU7UUFDOUMsT0FBTyxPQUFPLENBQUM7S0FDaEI7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZTptYXgtZmlsZS1saW5lLWNvdW50XG5pbXBvcnQgeyBCc0RhdGVwaWNrZXJTdGF0ZSwgaW5pdGlhbERhdGVwaWNrZXJTdGF0ZSB9IGZyb20gJy4vYnMtZGF0ZXBpY2tlci5zdGF0ZSc7XG5pbXBvcnQgeyBBY3Rpb24gfSBmcm9tICduZ3gtYm9vdHN0cmFwL21pbmktbmdyeCc7XG5pbXBvcnQgeyBCc0RhdGVwaWNrZXJBY3Rpb25zIH0gZnJvbSAnLi9icy1kYXRlcGlja2VyLmFjdGlvbnMnO1xuaW1wb3J0IHsgY2FsY0RheXNDYWxlbmRhciB9IGZyb20gJy4uL2VuZ2luZS9jYWxjLWRheXMtY2FsZW5kYXInO1xuaW1wb3J0IHsgZm9ybWF0RGF5c0NhbGVuZGFyIH0gZnJvbSAnLi4vZW5naW5lL2Zvcm1hdC1kYXlzLWNhbGVuZGFyJztcbmltcG9ydCB7IGZsYWdEYXlzQ2FsZW5kYXIgfSBmcm9tICcuLi9lbmdpbmUvZmxhZy1kYXlzLWNhbGVuZGFyJztcbmltcG9ydCB7XG4gIHNldEZ1bGxEYXRlLFxuICBzaGlmdERhdGUsXG4gIGlzQXJyYXksXG4gIGlzRGF0ZVZhbGlkLFxuICBzdGFydE9mLFxuICBnZXRMb2NhbGUsXG4gIGlzQWZ0ZXIsXG4gIGlzQmVmb3JlXG59IGZyb20gJ25neC1ib290c3RyYXAvY2hyb25vcyc7XG5pbXBvcnQgeyBjYW5Td2l0Y2hNb2RlIH0gZnJvbSAnLi4vZW5naW5lL3ZpZXctbW9kZSc7XG5pbXBvcnQgeyBmb3JtYXRNb250aHNDYWxlbmRhciB9IGZyb20gJy4uL2VuZ2luZS9mb3JtYXQtbW9udGhzLWNhbGVuZGFyJztcbmltcG9ydCB7IGZsYWdNb250aHNDYWxlbmRhciB9IGZyb20gJy4uL2VuZ2luZS9mbGFnLW1vbnRocy1jYWxlbmRhcic7XG5pbXBvcnQgeyBmb3JtYXRZZWFyc0NhbGVuZGFyLCB5ZWFyc1BlckNhbGVuZGFyIH0gZnJvbSAnLi4vZW5naW5lL2Zvcm1hdC15ZWFycy1jYWxlbmRhcic7XG5pbXBvcnQgeyBmbGFnWWVhcnNDYWxlbmRhciB9IGZyb20gJy4uL2VuZ2luZS9mbGFnLXllYXJzLWNhbGVuZGFyJztcbmltcG9ydCB7IEJzVmlld05hdmlnYXRpb25FdmVudCwgRGF0ZXBpY2tlckZvcm1hdE9wdGlvbnMsIEJzRGF0ZXBpY2tlclZpZXdNb2RlIH0gZnJvbSAnLi4vbW9kZWxzJztcblxuXG4vKiB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6IGN5Y2xvbWF0aWMtY29tcGxleGl0eSAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJzRGF0ZXBpY2tlclJlZHVjZXIoc3RhdGUgPSBpbml0aWFsRGF0ZXBpY2tlclN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBBY3Rpb24pOiBCc0RhdGVwaWNrZXJTdGF0ZSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIEJzRGF0ZXBpY2tlckFjdGlvbnMuQ0FMQ1VMQVRFOiB7XG4gICAgICByZXR1cm4gY2FsY3VsYXRlUmVkdWNlcihzdGF0ZSk7XG4gICAgfVxuXG4gICAgY2FzZSBCc0RhdGVwaWNrZXJBY3Rpb25zLkZPUk1BVDoge1xuICAgICAgcmV0dXJuIGZvcm1hdFJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG4gICAgfVxuXG4gICAgY2FzZSBCc0RhdGVwaWNrZXJBY3Rpb25zLkZMQUc6IHtcbiAgICAgIHJldHVybiBmbGFnUmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcbiAgICB9XG5cbiAgICBjYXNlIEJzRGF0ZXBpY2tlckFjdGlvbnMuTkFWSUdBVEVfT0ZGU0VUOiB7XG4gICAgICBjb25zdCBkYXRlID0gc2hpZnREYXRlKHN0YXJ0T2Yoc3RhdGUudmlldy5kYXRlLCAnbW9udGgnKSwgYWN0aW9uLnBheWxvYWQpO1xuICAgICAgY29uc3QgbmV3U3RhdGUgPSB7XG4gICAgICAgIHZpZXc6IHtcbiAgICAgICAgICBtb2RlOiBzdGF0ZS52aWV3Lm1vZGUsXG4gICAgICAgICAgZGF0ZVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIG5ld1N0YXRlKTtcbiAgICB9XG5cbiAgICBjYXNlIEJzRGF0ZXBpY2tlckFjdGlvbnMuTkFWSUdBVEVfVE86IHtcbiAgICAgIGNvbnN0IHBheWxvYWQ6IEJzVmlld05hdmlnYXRpb25FdmVudCA9IGFjdGlvbi5wYXlsb2FkO1xuXG4gICAgICBjb25zdCBkYXRlID0gc2V0RnVsbERhdGUoc3RhdGUudmlldy5kYXRlLCBwYXlsb2FkLnVuaXQpO1xuICAgICAgbGV0IG5ld1N0YXRlO1xuICAgICAgbGV0IG1vZGU6IEJzRGF0ZXBpY2tlclZpZXdNb2RlO1xuICAgICAgaWYgKGNhblN3aXRjaE1vZGUocGF5bG9hZC52aWV3TW9kZSwgc3RhdGUubWluTW9kZSkpIHtcbiAgICAgICAgbW9kZSA9IHBheWxvYWQudmlld01vZGU7XG4gICAgICAgIG5ld1N0YXRlID0geyB2aWV3OiB7IGRhdGUsIG1vZGUgfSB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbW9kZSA9IHN0YXRlLnZpZXcubW9kZTtcbiAgICAgICAgbmV3U3RhdGUgPSB7IHNlbGVjdGVkRGF0ZTogZGF0ZSwgdmlldzogeyBkYXRlLCBtb2RlIH0gfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBuZXdTdGF0ZSk7XG4gICAgfVxuXG4gICAgY2FzZSBCc0RhdGVwaWNrZXJBY3Rpb25zLkNIQU5HRV9WSUVXTU9ERToge1xuICAgICAgaWYgKCFjYW5Td2l0Y2hNb2RlKGFjdGlvbi5wYXlsb2FkLCBzdGF0ZS5taW5Nb2RlKSkge1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICB9XG4gICAgICBjb25zdCBkYXRlID0gc3RhdGUudmlldy5kYXRlO1xuICAgICAgY29uc3QgbW9kZSA9IGFjdGlvbi5wYXlsb2FkO1xuICAgICAgY29uc3QgbmV3U3RhdGUgPSB7IHZpZXc6IHsgZGF0ZSwgbW9kZSB9IH07XG5cbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3U3RhdGUpO1xuICAgIH1cblxuICAgIGNhc2UgQnNEYXRlcGlja2VyQWN0aW9ucy5IT1ZFUjoge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7IGhvdmVyZWREYXRlOiBhY3Rpb24ucGF5bG9hZCB9KTtcbiAgICB9XG5cbiAgICBjYXNlIEJzRGF0ZXBpY2tlckFjdGlvbnMuU0VMRUNUOiB7XG4gICAgICBjb25zdCBuZXdTdGF0ZSA9IHtcbiAgICAgICAgc2VsZWN0ZWREYXRlOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgICAgdmlldzogc3RhdGUudmlld1xuICAgICAgfTtcblxuICAgICAgY29uc3QgbW9kZSA9IHN0YXRlLnZpZXcubW9kZTtcbiAgICAgIGNvbnN0IF9kYXRlID0gYWN0aW9uLnBheWxvYWQgfHwgc3RhdGUudmlldy5kYXRlO1xuICAgICAgY29uc3QgZGF0ZSA9IGdldFZpZXdEYXRlKF9kYXRlLCBzdGF0ZS5taW5EYXRlLCBzdGF0ZS5tYXhEYXRlKTtcbiAgICAgIG5ld1N0YXRlLnZpZXcgPSB7IG1vZGUsIGRhdGUgfTtcblxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBuZXdTdGF0ZSk7XG4gICAgfVxuXG4gICAgY2FzZSBCc0RhdGVwaWNrZXJBY3Rpb25zLlNFVF9PUFRJT05TOiB7XG4gICAgICBjb25zdCBuZXdTdGF0ZSA9IGFjdGlvbi5wYXlsb2FkO1xuICAgICAgLy8gcHJlc2VydmUgdmlldyBtb2RlXG4gICAgICBjb25zdCBtb2RlID0gbmV3U3RhdGUubWluTW9kZSA/IG5ld1N0YXRlLm1pbk1vZGUgOiBzdGF0ZS52aWV3Lm1vZGU7XG4gICAgICBjb25zdCBfdmlld0RhdGUgPSBpc0RhdGVWYWxpZChuZXdTdGF0ZS52YWx1ZSkgJiYgbmV3U3RhdGUudmFsdWVcbiAgICAgICAgfHwgaXNBcnJheShuZXdTdGF0ZS52YWx1ZSkgJiYgaXNEYXRlVmFsaWQobmV3U3RhdGUudmFsdWVbMF0pICYmIG5ld1N0YXRlLnZhbHVlWzBdXG4gICAgICAgIHx8IHN0YXRlLnZpZXcuZGF0ZTtcbiAgICAgIGNvbnN0IGRhdGUgPSBnZXRWaWV3RGF0ZShfdmlld0RhdGUsIG5ld1N0YXRlLm1pbkRhdGUsIG5ld1N0YXRlLm1heERhdGUpO1xuICAgICAgbmV3U3RhdGUudmlldyA9IHsgbW9kZSwgZGF0ZSB9O1xuICAgICAgLy8gdXBkYXRlIHNlbGVjdGVkIHZhbHVlXG4gICAgICBpZiAobmV3U3RhdGUudmFsdWUpIHtcbiAgICAgICAgLy8gaWYgbmV3IHZhbHVlIGlzIGFycmF5IHdlIHdvcmsgd2l0aCBkYXRlIHJhbmdlXG4gICAgICAgIGlmIChpc0FycmF5KG5ld1N0YXRlLnZhbHVlKSkge1xuICAgICAgICAgIG5ld1N0YXRlLnNlbGVjdGVkUmFuZ2UgPSBuZXdTdGF0ZS52YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIG5ldyB2YWx1ZSBpcyBhIGRhdGUgLT4gZGF0ZXBpY2tlclxuICAgICAgICBpZiAobmV3U3RhdGUudmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgICAgbmV3U3RhdGUuc2VsZWN0ZWREYXRlID0gbmV3U3RhdGUudmFsdWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwcm92aWRlZCB2YWx1ZSBpcyBub3Qgc3VwcG9ydGVkIDopXG4gICAgICAgIC8vIG5lZWQgdG8gcmVwb3J0IGl0IHNvbWVob3dcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCBuZXdTdGF0ZSk7XG4gICAgfVxuXG4gICAgLy8gZGF0ZSByYW5nZSBwaWNrZXJcbiAgICBjYXNlIEJzRGF0ZXBpY2tlckFjdGlvbnMuU0VMRUNUX1JBTkdFOiB7XG4gICAgICBjb25zdCBuZXdTdGF0ZSA9IHtcbiAgICAgICAgc2VsZWN0ZWRSYW5nZTogYWN0aW9uLnBheWxvYWQsXG4gICAgICAgIHZpZXc6IHN0YXRlLnZpZXdcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IG1vZGUgPSBzdGF0ZS52aWV3Lm1vZGU7XG4gICAgICBjb25zdCBfZGF0ZSA9IGFjdGlvbi5wYXlsb2FkICYmIGFjdGlvbi5wYXlsb2FkWzBdIHx8IHN0YXRlLnZpZXcuZGF0ZTtcbiAgICAgIGNvbnN0IGRhdGUgPSBnZXRWaWV3RGF0ZShfZGF0ZSwgc3RhdGUubWluRGF0ZSwgc3RhdGUubWF4RGF0ZSk7XG4gICAgICBuZXdTdGF0ZS52aWV3ID0geyBtb2RlLCBkYXRlIH07XG5cbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgbmV3U3RhdGUpO1xuICAgIH1cblxuICAgIGNhc2UgQnNEYXRlcGlja2VyQWN0aW9ucy5TRVRfTUlOX0RBVEU6IHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBtaW5EYXRlOiBhY3Rpb24ucGF5bG9hZFxuICAgICAgfSk7XG4gICAgfVxuICAgIGNhc2UgQnNEYXRlcGlja2VyQWN0aW9ucy5TRVRfTUFYX0RBVEU6IHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBtYXhEYXRlOiBhY3Rpb24ucGF5bG9hZFxuICAgICAgfSk7XG4gICAgfVxuICAgIGNhc2UgQnNEYXRlcGlja2VyQWN0aW9ucy5TRVRfSVNfRElTQUJMRUQ6IHtcbiAgICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwge1xuICAgICAgICBpc0Rpc2FibGVkOiBhY3Rpb24ucGF5bG9hZFxuICAgICAgfSk7XG4gICAgfVxuICAgIGNhc2UgQnNEYXRlcGlja2VyQWN0aW9ucy5TRVRfREFURV9DVVNUT01fQ0xBU1NFUzoge1xuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGRhdGVDdXN0b21DbGFzc2VzOiBhY3Rpb24ucGF5bG9hZFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBjYWxjdWxhdGVSZWR1Y2VyKHN0YXRlOiBCc0RhdGVwaWNrZXJTdGF0ZSk6IEJzRGF0ZXBpY2tlclN0YXRlIHtcbiAgLy8gaG93IG1hbnkgY2FsZW5kYXJzXG4gIGNvbnN0IGRpc3BsYXlNb250aHMgPSBzdGF0ZS5kaXNwbGF5TW9udGhzO1xuICAvLyB1c2Ugc2VsZWN0ZWQgZGF0ZSBvbiBpbml0aWFsIHJlbmRlcmluZyBpZiBzZXRcbiAgbGV0IHZpZXdEYXRlID0gc3RhdGUudmlldy5kYXRlO1xuXG4gIGlmIChzdGF0ZS52aWV3Lm1vZGUgPT09ICdkYXknKSB7XG4gICAgc3RhdGUubW9udGhWaWV3T3B0aW9ucy5maXJzdERheU9mV2VlayA9IGdldExvY2FsZShzdGF0ZS5sb2NhbGUpLmZpcnN0RGF5T2ZXZWVrKCk7XG4gICAgY29uc3QgbW9udGhzTW9kZWwgPSBuZXcgQXJyYXkoZGlzcGxheU1vbnRocyk7XG4gICAgZm9yIChsZXQgbW9udGhJbmRleCA9IDA7IG1vbnRoSW5kZXggPCBkaXNwbGF5TW9udGhzOyBtb250aEluZGV4KyspIHtcbiAgICAgIC8vIHRvZG86IGZvciB1bmxpbmtlZCBjYWxlbmRhcnMgaXQgd2lsbCBiZSBoYXJkZXJcbiAgICAgIG1vbnRoc01vZGVsW21vbnRoSW5kZXhdID0gY2FsY0RheXNDYWxlbmRhcihcbiAgICAgICAgdmlld0RhdGUsXG4gICAgICAgIHN0YXRlLm1vbnRoVmlld09wdGlvbnNcbiAgICAgICk7XG4gICAgICB2aWV3RGF0ZSA9IHNoaWZ0RGF0ZSh2aWV3RGF0ZSwgeyBtb250aDogMSB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgbW9udGhzTW9kZWwgfSk7XG4gIH1cblxuICBpZiAoc3RhdGUudmlldy5tb2RlID09PSAnbW9udGgnKSB7XG4gICAgY29uc3QgbW9udGhzQ2FsZW5kYXIgPSBuZXcgQXJyYXkoZGlzcGxheU1vbnRocyk7XG4gICAgZm9yIChcbiAgICAgIGxldCBjYWxlbmRhckluZGV4ID0gMDtcbiAgICAgIGNhbGVuZGFySW5kZXggPCBkaXNwbGF5TW9udGhzO1xuICAgICAgY2FsZW5kYXJJbmRleCsrXG4gICAgKSB7XG4gICAgICAvLyB0b2RvOiBmb3IgdW5saW5rZWQgY2FsZW5kYXJzIGl0IHdpbGwgYmUgaGFyZGVyXG4gICAgICBtb250aHNDYWxlbmRhcltjYWxlbmRhckluZGV4XSA9IGZvcm1hdE1vbnRoc0NhbGVuZGFyKFxuICAgICAgICB2aWV3RGF0ZSxcbiAgICAgICAgZ2V0Rm9ybWF0T3B0aW9ucyhzdGF0ZSlcbiAgICAgICk7XG4gICAgICB2aWV3RGF0ZSA9IHNoaWZ0RGF0ZSh2aWV3RGF0ZSwgeyB5ZWFyOiAxIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBtb250aHNDYWxlbmRhciB9KTtcbiAgfVxuXG4gIGlmIChzdGF0ZS52aWV3Lm1vZGUgPT09ICd5ZWFyJykge1xuICAgIGNvbnN0IHllYXJzQ2FsZW5kYXJNb2RlbCA9IG5ldyBBcnJheShkaXNwbGF5TW9udGhzKTtcblxuICAgIGZvciAoXG4gICAgICBsZXQgY2FsZW5kYXJJbmRleCA9IDA7XG4gICAgICBjYWxlbmRhckluZGV4IDwgZGlzcGxheU1vbnRocztcbiAgICAgIGNhbGVuZGFySW5kZXgrK1xuICAgICkge1xuICAgICAgLy8gdG9kbzogZm9yIHVubGlua2VkIGNhbGVuZGFycyBpdCB3aWxsIGJlIGhhcmRlclxuICAgICAgeWVhcnNDYWxlbmRhck1vZGVsW2NhbGVuZGFySW5kZXhdID0gZm9ybWF0WWVhcnNDYWxlbmRhcihcbiAgICAgICAgdmlld0RhdGUsXG4gICAgICAgIGdldEZvcm1hdE9wdGlvbnMoc3RhdGUpXG4gICAgICApO1xuICAgICAgdmlld0RhdGUgPSBzaGlmdERhdGUodmlld0RhdGUsIHsgeWVhcjogeWVhcnNQZXJDYWxlbmRhciB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgeWVhcnNDYWxlbmRhck1vZGVsIH0pO1xuICB9XG5cbiAgcmV0dXJuIHN0YXRlO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRSZWR1Y2VyKHN0YXRlOiBCc0RhdGVwaWNrZXJTdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uOiBBY3Rpb24pOiBCc0RhdGVwaWNrZXJTdGF0ZSB7XG4gIGlmIChzdGF0ZS52aWV3Lm1vZGUgPT09ICdkYXknKSB7XG4gICAgY29uc3QgZm9ybWF0dGVkTW9udGhzID0gc3RhdGUubW9udGhzTW9kZWwubWFwKChtb250aCwgbW9udGhJbmRleCkgPT5cbiAgICAgIGZvcm1hdERheXNDYWxlbmRhcihtb250aCwgZ2V0Rm9ybWF0T3B0aW9ucyhzdGF0ZSksIG1vbnRoSW5kZXgpXG4gICAgKTtcblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyBmb3JtYXR0ZWRNb250aHMgfSk7XG4gIH1cblxuICAvLyBob3cgbWFueSBjYWxlbmRhcnNcbiAgY29uc3QgZGlzcGxheU1vbnRocyA9IHN0YXRlLmRpc3BsYXlNb250aHM7XG4gIC8vIGNoZWNrIGluaXRpYWwgcmVuZGVyaW5nXG4gIC8vIHVzZSBzZWxlY3RlZCBkYXRlIG9uIGluaXRpYWwgcmVuZGVyaW5nIGlmIHNldFxuICBsZXQgdmlld0RhdGUgPSBzdGF0ZS52aWV3LmRhdGU7XG5cbiAgaWYgKHN0YXRlLnZpZXcubW9kZSA9PT0gJ21vbnRoJykge1xuICAgIGNvbnN0IG1vbnRoc0NhbGVuZGFyID0gbmV3IEFycmF5KGRpc3BsYXlNb250aHMpO1xuICAgIGZvciAoXG4gICAgICBsZXQgY2FsZW5kYXJJbmRleCA9IDA7XG4gICAgICBjYWxlbmRhckluZGV4IDwgZGlzcGxheU1vbnRocztcbiAgICAgIGNhbGVuZGFySW5kZXgrK1xuICAgICkge1xuICAgICAgLy8gdG9kbzogZm9yIHVubGlua2VkIGNhbGVuZGFycyBpdCB3aWxsIGJlIGhhcmRlclxuICAgICAgbW9udGhzQ2FsZW5kYXJbY2FsZW5kYXJJbmRleF0gPSBmb3JtYXRNb250aHNDYWxlbmRhcihcbiAgICAgICAgdmlld0RhdGUsXG4gICAgICAgIGdldEZvcm1hdE9wdGlvbnMoc3RhdGUpXG4gICAgICApO1xuICAgICAgdmlld0RhdGUgPSBzaGlmdERhdGUodmlld0RhdGUsIHsgeWVhcjogMSB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgbW9udGhzQ2FsZW5kYXIgfSk7XG4gIH1cblxuICBpZiAoc3RhdGUudmlldy5tb2RlID09PSAneWVhcicpIHtcbiAgICBjb25zdCB5ZWFyc0NhbGVuZGFyTW9kZWwgPSBuZXcgQXJyYXkoZGlzcGxheU1vbnRocyk7XG4gICAgZm9yIChcbiAgICAgIGxldCBjYWxlbmRhckluZGV4ID0gMDtcbiAgICAgIGNhbGVuZGFySW5kZXggPCBkaXNwbGF5TW9udGhzO1xuICAgICAgY2FsZW5kYXJJbmRleCsrXG4gICAgKSB7XG4gICAgICAvLyB0b2RvOiBmb3IgdW5saW5rZWQgY2FsZW5kYXJzIGl0IHdpbGwgYmUgaGFyZGVyXG4gICAgICB5ZWFyc0NhbGVuZGFyTW9kZWxbY2FsZW5kYXJJbmRleF0gPSBmb3JtYXRZZWFyc0NhbGVuZGFyKFxuICAgICAgICB2aWV3RGF0ZSxcbiAgICAgICAgZ2V0Rm9ybWF0T3B0aW9ucyhzdGF0ZSlcbiAgICAgICk7XG4gICAgICB2aWV3RGF0ZSA9IHNoaWZ0RGF0ZSh2aWV3RGF0ZSwgeyB5ZWFyOiAxNiB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgeWVhcnNDYWxlbmRhck1vZGVsIH0pO1xuICB9XG5cbiAgcmV0dXJuIHN0YXRlO1xufVxuXG5mdW5jdGlvbiBmbGFnUmVkdWNlcihzdGF0ZTogQnNEYXRlcGlja2VyU3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICBhY3Rpb246IEFjdGlvbik6IEJzRGF0ZXBpY2tlclN0YXRlIHtcbiAgaWYgKHN0YXRlLnZpZXcubW9kZSA9PT0gJ2RheScpIHtcbiAgICBjb25zdCBmbGFnZ2VkTW9udGhzID0gc3RhdGUuZm9ybWF0dGVkTW9udGhzLm1hcChcbiAgICAgIChmb3JtYXR0ZWRNb250aCwgbW9udGhJbmRleCkgPT5cbiAgICAgICAgZmxhZ0RheXNDYWxlbmRhcihmb3JtYXR0ZWRNb250aCwge1xuICAgICAgICAgIGlzRGlzYWJsZWQ6IHN0YXRlLmlzRGlzYWJsZWQsXG4gICAgICAgICAgbWluRGF0ZTogc3RhdGUubWluRGF0ZSxcbiAgICAgICAgICBtYXhEYXRlOiBzdGF0ZS5tYXhEYXRlLFxuICAgICAgICAgIGRheXNEaXNhYmxlZDogc3RhdGUuZGF5c0Rpc2FibGVkLFxuICAgICAgICAgIGRhdGVzRGlzYWJsZWQ6IHN0YXRlLmRhdGVzRGlzYWJsZWQsXG4gICAgICAgICAgaG92ZXJlZERhdGU6IHN0YXRlLmhvdmVyZWREYXRlLFxuICAgICAgICAgIHNlbGVjdGVkRGF0ZTogc3RhdGUuc2VsZWN0ZWREYXRlLFxuICAgICAgICAgIHNlbGVjdGVkUmFuZ2U6IHN0YXRlLnNlbGVjdGVkUmFuZ2UsXG4gICAgICAgICAgZGlzcGxheU1vbnRoczogc3RhdGUuZGlzcGxheU1vbnRocyxcbiAgICAgICAgICBkYXRlQ3VzdG9tQ2xhc3Nlczogc3RhdGUuZGF0ZUN1c3RvbUNsYXNzZXMsXG4gICAgICAgICAgbW9udGhJbmRleFxuICAgICAgICB9KVxuICAgICk7XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgZmxhZ2dlZE1vbnRocyB9KTtcbiAgfVxuXG4gIGlmIChzdGF0ZS52aWV3Lm1vZGUgPT09ICdtb250aCcpIHtcbiAgICBjb25zdCBmbGFnZ2VkTW9udGhzQ2FsZW5kYXIgPSBzdGF0ZS5tb250aHNDYWxlbmRhci5tYXAoXG4gICAgICAoZm9ybWF0dGVkTW9udGgsIG1vbnRoSW5kZXgpID0+XG4gICAgICAgIGZsYWdNb250aHNDYWxlbmRhcihmb3JtYXR0ZWRNb250aCwge1xuICAgICAgICAgIGlzRGlzYWJsZWQ6IHN0YXRlLmlzRGlzYWJsZWQsXG4gICAgICAgICAgbWluRGF0ZTogc3RhdGUubWluRGF0ZSxcbiAgICAgICAgICBtYXhEYXRlOiBzdGF0ZS5tYXhEYXRlLFxuICAgICAgICAgIGhvdmVyZWRNb250aDogc3RhdGUuaG92ZXJlZE1vbnRoLFxuICAgICAgICAgIGRpc3BsYXlNb250aHM6IHN0YXRlLmRpc3BsYXlNb250aHMsXG4gICAgICAgICAgbW9udGhJbmRleFxuICAgICAgICB9KVxuICAgICk7XG5cbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgc3RhdGUsIHsgZmxhZ2dlZE1vbnRoc0NhbGVuZGFyIH0pO1xuICB9XG5cbiAgaWYgKHN0YXRlLnZpZXcubW9kZSA9PT0gJ3llYXInKSB7XG4gICAgY29uc3QgeWVhcnNDYWxlbmRhckZsYWdnZWQgPSBzdGF0ZS55ZWFyc0NhbGVuZGFyTW9kZWwubWFwKFxuICAgICAgKGZvcm1hdHRlZE1vbnRoLCB5ZWFySW5kZXgpID0+XG4gICAgICAgIGZsYWdZZWFyc0NhbGVuZGFyKGZvcm1hdHRlZE1vbnRoLCB7XG4gICAgICAgICAgaXNEaXNhYmxlZDogc3RhdGUuaXNEaXNhYmxlZCxcbiAgICAgICAgICBtaW5EYXRlOiBzdGF0ZS5taW5EYXRlLFxuICAgICAgICAgIG1heERhdGU6IHN0YXRlLm1heERhdGUsXG4gICAgICAgICAgaG92ZXJlZFllYXI6IHN0YXRlLmhvdmVyZWRZZWFyLFxuICAgICAgICAgIGRpc3BsYXlNb250aHM6IHN0YXRlLmRpc3BsYXlNb250aHMsXG4gICAgICAgICAgeWVhckluZGV4XG4gICAgICAgIH0pXG4gICAgKTtcblxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCBzdGF0ZSwgeyB5ZWFyc0NhbGVuZGFyRmxhZ2dlZCB9KTtcbiAgfVxuXG4gIHJldHVybiBzdGF0ZTtcbn1cblxuZnVuY3Rpb24gZ2V0Rm9ybWF0T3B0aW9ucyhzdGF0ZTogQnNEYXRlcGlja2VyU3RhdGUpOiBEYXRlcGlja2VyRm9ybWF0T3B0aW9ucyB7XG4gIHJldHVybiB7XG4gICAgbG9jYWxlOiBzdGF0ZS5sb2NhbGUsXG5cbiAgICBtb250aFRpdGxlOiBzdGF0ZS5tb250aFRpdGxlLFxuICAgIHllYXJUaXRsZTogc3RhdGUueWVhclRpdGxlLFxuXG4gICAgZGF5TGFiZWw6IHN0YXRlLmRheUxhYmVsLFxuICAgIG1vbnRoTGFiZWw6IHN0YXRlLm1vbnRoTGFiZWwsXG4gICAgeWVhckxhYmVsOiBzdGF0ZS55ZWFyTGFiZWwsXG5cbiAgICB3ZWVrTnVtYmVyczogc3RhdGUud2Vla051bWJlcnNcbiAgfTtcbn1cblxuLyoqXG4gKiBpZiB2aWV3IGRhdGUgaXMgcHJvdmlkZWQgKGJzVmFsdWV8bmdNb2RlbCkgaXQgc2hvdWxkIGJlIHNob3duXG4gKiBpZiB2aWV3IGRhdGUgaXMgbm90IHByb3ZpZGVyOlxuICogaWYgbWluRGF0ZT5jdXJyZW50RGF0ZSAoZGVmYXVsdCB2aWV3IHZhbHVlKSwgc2hvdyBtaW5EYXRlXG4gKiBpZiBtYXhEYXRlPGN1cnJlbnREYXRlKGRlZmF1bHQgdmlldyB2YWx1ZSkgc2hvdyBtYXhEYXRlXG4gKi9cbmZ1bmN0aW9uIGdldFZpZXdEYXRlKHZpZXdEYXRlOiBEYXRlIHwgRGF0ZVtdLCBtaW5EYXRlOiBEYXRlLCBtYXhEYXRlOiBEYXRlKSB7XG4gIGNvbnN0IF9kYXRlID0gQXJyYXkuaXNBcnJheSh2aWV3RGF0ZSkgPyB2aWV3RGF0ZVswXSA6IHZpZXdEYXRlO1xuXG4gIGlmIChtaW5EYXRlICYmIGlzQWZ0ZXIobWluRGF0ZSwgX2RhdGUsICdkYXknKSkge1xuICAgIHJldHVybiBtaW5EYXRlO1xuICB9XG5cbiAgaWYgKG1heERhdGUgJiYgaXNCZWZvcmUobWF4RGF0ZSwgX2RhdGUsICdkYXknKSkge1xuICAgIHJldHVybiBtYXhEYXRlO1xuICB9XG5cbiAgcmV0dXJuIF9kYXRlO1xufVxuIl19