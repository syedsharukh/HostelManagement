/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { getFullYear, getMonth } from 'ngx-bootstrap/chronos';
import { BsDatepickerActions } from './bs-datepicker.actions';
import { BsLocaleService } from '../bs-locale.service';
export class BsDatepickerEffects {
    /**
     * @param {?} _actions
     * @param {?} _localeService
     */
    constructor(_actions, _localeService) {
        this._actions = _actions;
        this._localeService = _localeService;
        this._subs = [];
    }
    /**
     * @param {?} _bsDatepickerStore
     * @return {?}
     */
    init(_bsDatepickerStore) {
        this._store = _bsDatepickerStore;
        return this;
    }
    /**
     * setters
     * @param {?} value
     * @return {?}
     */
    setValue(value) {
        this._store.dispatch(this._actions.select(value));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setRangeValue(value) {
        this._store.dispatch(this._actions.selectRange(value));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setMinDate(value) {
        this._store.dispatch(this._actions.minDate(value));
        return this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setMaxDate(value) {
        this._store.dispatch(this._actions.maxDate(value));
        return this;
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} value
     * @return {THIS}
     */
    setDaysDisabled(value) {
        (/** @type {?} */ (this))._store.dispatch((/** @type {?} */ (this))._actions.daysDisabled(value));
        return (/** @type {?} */ (this));
    }
    /**
     * @template THIS
     * @this {THIS}
     * @param {?} value
     * @return {THIS}
     */
    setDatesDisabled(value) {
        (/** @type {?} */ (this))._store.dispatch((/** @type {?} */ (this))._actions.datesDisabled(value));
        return (/** @type {?} */ (this));
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setDisabled(value) {
        this._store.dispatch(this._actions.isDisabled(value));
        return this;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    setDateCustomClasses(value) {
        this._store.dispatch(this._actions.setDateCustomClasses(value));
        return this;
    }
    /* Set rendering options */
    /**
     * @param {?} _config
     * @return {?}
     */
    setOptions(_config) {
        /** @type {?} */
        const _options = Object.assign({ locale: this._localeService.currentLocale }, _config);
        this._store.dispatch(this._actions.setOptions(_options));
        return this;
    }
    /**
     * view to mode bindings
     * @param {?} container
     * @return {?}
     */
    setBindings(container) {
        container.daysCalendar = this._store
            .select(state => state.flaggedMonths)
            .pipe(filter(months => !!months));
        // month calendar
        container.monthsCalendar = this._store
            .select(state => state.flaggedMonthsCalendar)
            .pipe(filter(months => !!months));
        // year calendar
        container.yearsCalendar = this._store
            .select(state => state.yearsCalendarFlagged)
            .pipe(filter(years => !!years));
        container.viewMode = this._store.select(state => state.view.mode);
        container.options = this._store
            .select(state => state.showWeekNumbers)
            .pipe(map(showWeekNumbers => ({ showWeekNumbers })));
        return this;
    }
    /**
     * event handlers
     * @param {?} container
     * @return {?}
     */
    setEventHandlers(container) {
        container.setViewMode = (event) => {
            this._store.dispatch(this._actions.changeViewMode(event));
        };
        container.navigateTo = (event) => {
            this._store.dispatch(this._actions.navigateStep(event.step));
        };
        container.dayHoverHandler = (event) => {
            /** @type {?} */
            const _cell = (/** @type {?} */ (event.cell));
            if (_cell.isOtherMonth || _cell.isDisabled) {
                return;
            }
            this._store.dispatch(this._actions.hoverDay(event));
            _cell.isHovered = event.isHovered;
        };
        container.monthHoverHandler = (event) => {
            event.cell.isHovered = event.isHovered;
        };
        container.yearHoverHandler = (event) => {
            event.cell.isHovered = event.isHovered;
        };
        container.monthSelectHandler = (event) => {
            if (event.isDisabled) {
                return;
            }
            this._store.dispatch(this._actions.navigateTo({
                unit: {
                    month: getMonth(event.date),
                    year: getFullYear(event.date)
                },
                viewMode: 'day'
            }));
        };
        container.yearSelectHandler = (event) => {
            if (event.isDisabled) {
                return;
            }
            this._store.dispatch(this._actions.navigateTo({
                unit: {
                    year: getFullYear(event.date)
                },
                viewMode: 'month'
            }));
        };
        return this;
    }
    /**
     * @return {?}
     */
    registerDatepickerSideEffects() {
        this._subs.push(this._store.select(state => state.view).subscribe(view => {
            this._store.dispatch(this._actions.calculate());
        }));
        // format calendar values on month model change
        this._subs.push(this._store
            .select(state => state.monthsModel)
            .pipe(filter(monthModel => !!monthModel))
            .subscribe(month => this._store.dispatch(this._actions.format())));
        // flag day values
        this._subs.push(this._store
            .select(state => state.formattedMonths)
            .pipe(filter(month => !!month))
            .subscribe(month => this._store.dispatch(this._actions.flag())));
        // flag day values
        this._subs.push(this._store
            .select(state => state.selectedDate)
            .pipe(filter(selectedDate => !!selectedDate))
            .subscribe(selectedDate => this._store.dispatch(this._actions.flag())));
        // flag for date range picker
        this._subs.push(this._store
            .select(state => state.selectedRange)
            .pipe(filter(selectedRange => !!selectedRange))
            .subscribe(selectedRange => this._store.dispatch(this._actions.flag())));
        // monthsCalendar
        this._subs.push(this._store
            .select(state => state.monthsCalendar)
            .subscribe(() => this._store.dispatch(this._actions.flag())));
        // years calendar
        this._subs.push(this._store
            .select(state => state.yearsCalendarModel)
            .pipe(filter(state => !!state))
            .subscribe(() => this._store.dispatch(this._actions.flag())));
        // on hover
        this._subs.push(this._store
            .select(state => state.hoveredDate)
            .pipe(filter(hoveredDate => !!hoveredDate))
            .subscribe(hoveredDate => this._store.dispatch(this._actions.flag())));
        // date custom classes
        this._subs.push(this._store
            .select(state => state.dateCustomClasses)
            .pipe(filter(dateCustomClasses => !!dateCustomClasses))
            .subscribe(dateCustomClasses => this._store.dispatch(this._actions.flag())));
        // on locale change
        this._subs.push(this._localeService.localeChange
            .subscribe(locale => this._store.dispatch(this._actions.setLocale(locale))));
        return this;
    }
    /**
     * @return {?}
     */
    destroy() {
        for (const sub of this._subs) {
            sub.unsubscribe();
        }
    }
}
BsDatepickerEffects.decorators = [
    { type: Injectable }
];
/** @nocollapse */
BsDatepickerEffects.ctorParameters = () => [
    { type: BsDatepickerActions },
    { type: BsLocaleService }
];
if (false) {
    /** @type {?} */
    BsDatepickerEffects.prototype.viewMode;
    /** @type {?} */
    BsDatepickerEffects.prototype.daysCalendar;
    /** @type {?} */
    BsDatepickerEffects.prototype.monthsCalendar;
    /** @type {?} */
    BsDatepickerEffects.prototype.yearsCalendar;
    /** @type {?} */
    BsDatepickerEffects.prototype.options;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerEffects.prototype._store;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerEffects.prototype._subs;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerEffects.prototype._actions;
    /**
     * @type {?}
     * @private
     */
    BsDatepickerEffects.prototype._localeService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZGF0ZXBpY2tlci5lZmZlY3RzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LWJvb3RzdHJhcC9kYXRlcGlja2VyLyIsInNvdXJjZXMiOlsicmVkdWNlci9icy1kYXRlcGlja2VyLmVmZmVjdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3QyxPQUFPLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRSxNQUFNLHVCQUF1QixDQUFDO0FBRzlELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRzlELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQWlCdkQsTUFBTSxPQUFPLG1CQUFtQjs7Ozs7SUFVOUIsWUFBb0IsUUFBNkIsRUFDN0IsY0FBK0I7UUFEL0IsYUFBUSxHQUFSLFFBQVEsQ0FBcUI7UUFDN0IsbUJBQWMsR0FBZCxjQUFjLENBQWlCO1FBSDNDLFVBQUssR0FBbUIsRUFBRSxDQUFDO0lBR21CLENBQUM7Ozs7O0lBRXZELElBQUksQ0FBQyxrQkFBcUM7UUFDeEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQztRQUVqQyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7OztJQUlELFFBQVEsQ0FBQyxLQUFXO1FBQ2xCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQzs7Ozs7SUFFRCxhQUFhLENBQUMsS0FBYTtRQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3pELENBQUM7Ozs7O0lBRUQs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LENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQzlFLENBQUM7UUFFRixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Ozs7SUFFRCxPQUFPO1FBQ0wsS0FBSyxNQUFNLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQzVCLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNuQjtJQUNILENBQUM7OztZQXhRRixVQUFVOzs7O1lBbkJGLG1CQUFtQjtZQUduQixlQUFlOzs7O0lBa0J0Qix1Q0FBMkM7O0lBQzNDLDJDQUFrRDs7SUFDbEQsNkNBQXNEOztJQUN0RCw0Q0FBb0Q7O0lBQ3BELHNDQUE2Qzs7Ozs7SUFFN0MscUNBQWtDOzs7OztJQUNsQyxvQ0FBbUM7Ozs7O0lBRXZCLHVDQUFxQzs7Ozs7SUFDckMsNkNBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBnZXRGdWxsWWVhciwgZ2V0TW9udGggfSBmcm9tICduZ3gtYm9vdHN0cmFwL2Nocm9ub3MnO1xuXG5pbXBvcnQgeyBCc0RhdGVwaWNrZXJBYnN0cmFjdENvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvYnMtZGF0ZXBpY2tlci1jb250YWluZXInO1xuaW1wb3J0IHsgQnNEYXRlcGlja2VyQWN0aW9ucyB9IGZyb20gJy4vYnMtZGF0ZXBpY2tlci5hY3Rpb25zJztcbmltcG9ydCB7IEJzRGF0ZXBpY2tlckNvbmZpZyB9IGZyb20gJy4uL2JzLWRhdGVwaWNrZXIuY29uZmlnJztcbmltcG9ydCB7IEJzRGF0ZXBpY2tlclN0b3JlIH0gZnJvbSAnLi9icy1kYXRlcGlja2VyLnN0b3JlJztcbmltcG9ydCB7IEJzTG9jYWxlU2VydmljZSB9IGZyb20gJy4uL2JzLWxvY2FsZS5zZXJ2aWNlJztcblxuaW1wb3J0IHtcbiAgQnNEYXRlcGlja2VyVmlld01vZGUsXG4gIEJzTmF2aWdhdGlvbkV2ZW50LFxuICBDYWxlbmRhckNlbGxWaWV3TW9kZWwsXG4gIENlbGxIb3ZlckV2ZW50LFxuICBEYXRlcGlja2VyUmVuZGVyT3B0aW9ucyxcbiAgRGF0ZXBpY2tlckRhdGVDdXN0b21DbGFzc2VzLFxuICBEYXlzQ2FsZW5kYXJWaWV3TW9kZWwsXG4gIERheVZpZXdNb2RlbCxcbiAgTW9udGhzQ2FsZW5kYXJWaWV3TW9kZWwsXG4gIFllYXJzQ2FsZW5kYXJWaWV3TW9kZWxcbn0gZnJvbSAnLi4vbW9kZWxzJztcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQnNEYXRlcGlja2VyRWZmZWN0cyB7XG4gIHZpZXdNb2RlOiBPYnNlcnZhYmxlPEJzRGF0ZXBpY2tlclZpZXdNb2RlPjtcbiAgZGF5c0NhbGVuZGFyOiBPYnNlcnZhYmxlPERheXNDYWxlbmRhclZpZXdNb2RlbFtdPjtcbiAgbW9udGhzQ2FsZW5kYXI6IE9ic2VydmFibGU8TW9udGhzQ2FsZW5kYXJWaWV3TW9kZWxbXT47XG4gIHllYXJzQ2FsZW5kYXI6IE9ic2VydmFibGU8WWVhcnNDYWxlbmRhclZpZXdNb2RlbFtdPjtcbiAgb3B0aW9uczogT2JzZXJ2YWJsZTxEYXRlcGlja2VyUmVuZGVyT3B0aW9ucz47XG5cbiAgcHJpdmF0ZSBfc3RvcmU6IEJzRGF0ZXBpY2tlclN0b3JlO1xuICBwcml2YXRlIF9zdWJzOiBTdWJzY3JpcHRpb25bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2FjdGlvbnM6IEJzRGF0ZXBpY2tlckFjdGlvbnMsXG4gICAgICAgICAgICAgIHByaXZhdGUgX2xvY2FsZVNlcnZpY2U6IEJzTG9jYWxlU2VydmljZSkge31cblxuICBpbml0KF9ic0RhdGVwaWNrZXJTdG9yZTogQnNEYXRlcGlja2VyU3RvcmUpOiBCc0RhdGVwaWNrZXJFZmZlY3RzIHtcbiAgICB0aGlzLl9zdG9yZSA9IF9ic0RhdGVwaWNrZXJTdG9yZTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqIHNldHRlcnMgKi9cblxuICBzZXRWYWx1ZSh2YWx1ZTogRGF0ZSk6IHZvaWQge1xuICAgIHRoaXMuX3N0b3JlLmRpc3BhdGNoKHRoaXMuX2FjdGlvbnMuc2VsZWN0KHZhbHVlKSk7XG4gIH1cblxuICBzZXRSYW5nZVZhbHVlKHZhbHVlOiBEYXRlW10pOiB2b2lkIHtcbiAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaCh0aGlzLl9hY3Rpb25zLnNlbGVjdFJhbmdlKHZhbHVlKSk7XG4gIH1cblxuICBzZXRNaW5EYXRlKHZhbHVlOiBEYXRlKTogQnNEYXRlcGlja2VyRWZmZWN0cyB7XG4gICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2godGhpcy5fYWN0aW9ucy5taW5EYXRlKHZhbHVlKSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldE1heERhdGUodmFsdWU6IERhdGUpOiBCc0RhdGVwaWNrZXJFZmZlY3RzIHtcbiAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaCh0aGlzLl9hY3Rpb25zLm1heERhdGUodmFsdWUpKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0RGF5c0Rpc2FibGVkKHZhbHVlOiBudW1iZXJbXSkge1xuICAgIHRoaXMuX3N0b3JlLmRpc3BhdGNoKHRoaXMuX2FjdGlvbnMuZGF5c0Rpc2FibGVkKHZhbHVlKSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHNldERhdGVzRGlzYWJsZWQodmFsdWU6IERhdGVbXSkge1xuICAgIHRoaXMuX3N0b3JlLmRpc3BhdGNoKHRoaXMuX2FjdGlvbnMuZGF0ZXNEaXNhYmxlZCh2YWx1ZSkpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXREaXNhYmxlZCh2YWx1ZTogYm9vbGVhbik6IEJzRGF0ZXBpY2tlckVmZmVjdHMge1xuICAgIHRoaXMuX3N0b3JlLmRpc3BhdGNoKHRoaXMuX2FjdGlvbnMuaXNEaXNhYmxlZCh2YWx1ZSkpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBzZXREYXRlQ3VzdG9tQ2xhc3Nlcyh2YWx1ZTogRGF0ZXBpY2tlckRhdGVDdXN0b21DbGFzc2VzW10pOiBCc0RhdGVwaWNrZXJFZmZlY3RzIHtcbiAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaCh0aGlzLl9hY3Rpb25zLnNldERhdGVDdXN0b21DbGFzc2VzKHZhbHVlKSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8qIFNldCByZW5kZXJpbmcgb3B0aW9ucyAqL1xuICBzZXRPcHRpb25zKF9jb25maWc6IEJzRGF0ZXBpY2tlckNvbmZpZyk6IEJzRGF0ZXBpY2tlckVmZmVjdHMge1xuICAgIGNvbnN0IF9vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7bG9jYWxlOiB0aGlzLl9sb2NhbGVTZXJ2aWNlLmN1cnJlbnRMb2NhbGV9LCBfY29uZmlnKTtcbiAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaCh0aGlzLl9hY3Rpb25zLnNldE9wdGlvbnMoX29wdGlvbnMpKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqIHZpZXcgdG8gbW9kZSBiaW5kaW5ncyAqL1xuICBzZXRCaW5kaW5ncyhjb250YWluZXI6IEJzRGF0ZXBpY2tlckFic3RyYWN0Q29tcG9uZW50KTogQnNEYXRlcGlja2VyRWZmZWN0cyB7XG4gICAgY29udGFpbmVyLmRheXNDYWxlbmRhciA9IHRoaXMuX3N0b3JlXG4gICAgICAuc2VsZWN0KHN0YXRlID0+IHN0YXRlLmZsYWdnZWRNb250aHMpXG4gICAgICAucGlwZShcbiAgICAgICAgZmlsdGVyKG1vbnRocyA9PiAhIW1vbnRocylcbiAgICAgICk7XG5cbiAgICAvLyBtb250aCBjYWxlbmRhclxuICAgIGNvbnRhaW5lci5tb250aHNDYWxlbmRhciA9IHRoaXMuX3N0b3JlXG4gICAgICAuc2VsZWN0KHN0YXRlID0+IHN0YXRlLmZsYWdnZWRNb250aHNDYWxlbmRhcilcbiAgICAgIC5waXBlKFxuICAgICAgICBmaWx0ZXIobW9udGhzID0+ICEhbW9udGhzKVxuICAgICAgKTtcblxuICAgIC8vIHllYXIgY2FsZW5kYXJcbiAgICBjb250YWluZXIueWVhcnNDYWxlbmRhciA9IHRoaXMuX3N0b3JlXG4gICAgICAuc2VsZWN0KHN0YXRlID0+IHN0YXRlLnllYXJzQ2FsZW5kYXJGbGFnZ2VkKVxuICAgICAgLnBpcGUoXG4gICAgICAgIGZpbHRlcih5ZWFycyA9PiAhIXllYXJzKVxuICAgICAgKTtcblxuICAgIGNvbnRhaW5lci52aWV3TW9kZSA9IHRoaXMuX3N0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS52aWV3Lm1vZGUpO1xuXG4gICAgY29udGFpbmVyLm9wdGlvbnMgPSB0aGlzLl9zdG9yZVxuICAgICAgLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5zaG93V2Vla051bWJlcnMpXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKHNob3dXZWVrTnVtYmVycyA9PiAoe3Nob3dXZWVrTnVtYmVyc30pKVxuICAgICAgKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqIGV2ZW50IGhhbmRsZXJzICovXG4gIHNldEV2ZW50SGFuZGxlcnMoY29udGFpbmVyOiBCc0RhdGVwaWNrZXJBYnN0cmFjdENvbXBvbmVudCk6IEJzRGF0ZXBpY2tlckVmZmVjdHMge1xuICAgIGNvbnRhaW5lci5zZXRWaWV3TW9kZSA9IChldmVudDogQnNEYXRlcGlja2VyVmlld01vZGUpOiB2b2lkID0+IHtcbiAgICAgIHRoaXMuX3N0b3JlLmRpc3BhdGNoKHRoaXMuX2FjdGlvbnMuY2hhbmdlVmlld01vZGUoZXZlbnQpKTtcbiAgICB9O1xuXG4gICAgY29udGFpbmVyLm5hdmlnYXRlVG8gPSAoZXZlbnQ6IEJzTmF2aWdhdGlvbkV2ZW50KTogdm9pZCA9PiB7XG4gICAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaCh0aGlzLl9hY3Rpb25zLm5hdmlnYXRlU3RlcChldmVudC5zdGVwKSk7XG4gICAgfTtcblxuICAgIGNvbnRhaW5lci5kYXlIb3ZlckhhbmRsZXIgPSAoZXZlbnQ6IENlbGxIb3ZlckV2ZW50KTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBfY2VsbCA9IGV2ZW50LmNlbGwgYXMgRGF5Vmlld01vZGVsO1xuICAgICAgaWYgKF9jZWxsLmlzT3RoZXJNb250aCB8fCBfY2VsbC5pc0Rpc2FibGVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2godGhpcy5fYWN0aW9ucy5ob3ZlckRheShldmVudCkpO1xuICAgICAgX2NlbGwuaXNIb3ZlcmVkID0gZXZlbnQuaXNIb3ZlcmVkO1xuICAgIH07XG5cbiAgICBjb250YWluZXIubW9udGhIb3ZlckhhbmRsZXIgPSAoZXZlbnQ6IENlbGxIb3ZlckV2ZW50KTogdm9pZCA9PiB7XG4gICAgICBldmVudC5jZWxsLmlzSG92ZXJlZCA9IGV2ZW50LmlzSG92ZXJlZDtcbiAgICB9O1xuXG4gICAgY29udGFpbmVyLnllYXJIb3ZlckhhbmRsZXIgPSAoZXZlbnQ6IENlbGxIb3ZlckV2ZW50KTogdm9pZCA9PiB7XG4gICAgICBldmVudC5jZWxsLmlzSG92ZXJlZCA9IGV2ZW50LmlzSG92ZXJlZDtcbiAgICB9O1xuXG4gICAgY29udGFpbmVyLm1vbnRoU2VsZWN0SGFuZGxlciA9IChldmVudDogQ2FsZW5kYXJDZWxsVmlld01vZGVsKTogdm9pZCA9PiB7XG4gICAgICBpZiAoZXZlbnQuaXNEaXNhYmxlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLl9zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgdGhpcy5fYWN0aW9ucy5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1bml0OiB7XG4gICAgICAgICAgICBtb250aDogZ2V0TW9udGgoZXZlbnQuZGF0ZSksXG4gICAgICAgICAgICB5ZWFyOiBnZXRGdWxsWWVhcihldmVudC5kYXRlKVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdmlld01vZGU6ICdkYXknXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH07XG5cbiAgICBjb250YWluZXIueWVhclNlbGVjdEhhbmRsZXIgPSAoZXZlbnQ6IENhbGVuZGFyQ2VsbFZpZXdNb2RlbCk6IHZvaWQgPT4ge1xuICAgICAgaWYgKGV2ZW50LmlzRGlzYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5fc3RvcmUuZGlzcGF0Y2goXG4gICAgICAgIHRoaXMuX2FjdGlvbnMubmF2aWdhdGVUbyh7XG4gICAgICAgICAgdW5pdDoge1xuICAgICAgICAgICAgeWVhcjogZ2V0RnVsbFllYXIoZXZlbnQuZGF0ZSlcbiAgICAgICAgICB9LFxuICAgICAgICAgIHZpZXdNb2RlOiAnbW9udGgnXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH07XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHJlZ2lzdGVyRGF0ZXBpY2tlclNpZGVFZmZlY3RzKCk6IEJzRGF0ZXBpY2tlckVmZmVjdHMge1xuICAgIHRoaXMuX3N1YnMucHVzaChcbiAgICAgIHRoaXMuX3N0b3JlLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS52aWV3KS5zdWJzY3JpYmUodmlldyA9PiB7XG4gICAgICAgIHRoaXMuX3N0b3JlLmRpc3BhdGNoKHRoaXMuX2FjdGlvbnMuY2FsY3VsYXRlKCkpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgLy8gZm9ybWF0IGNhbGVuZGFyIHZhbHVlcyBvbiBtb250aCBtb2RlbCBjaGFuZ2VcbiAgICB0aGlzLl9zdWJzLnB1c2goXG4gICAgICB0aGlzLl9zdG9yZVxuICAgICAgICAuc2VsZWN0KHN0YXRlID0+IHN0YXRlLm1vbnRoc01vZGVsKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIobW9udGhNb2RlbCA9PiAhIW1vbnRoTW9kZWwpXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZShtb250aCA9PiB0aGlzLl9zdG9yZS5kaXNwYXRjaCh0aGlzLl9hY3Rpb25zLmZvcm1hdCgpKSlcbiAgICApO1xuXG4gICAgLy8gZmxhZyBkYXkgdmFsdWVzXG4gICAgdGhpcy5fc3Vicy5wdXNoKFxuICAgICAgdGhpcy5fc3RvcmVcbiAgICAgICAgLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5mb3JtYXR0ZWRNb250aHMpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGZpbHRlcihtb250aCA9PiAhIW1vbnRoKVxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUobW9udGggPT4gdGhpcy5fc3RvcmUuZGlzcGF0Y2godGhpcy5fYWN0aW9ucy5mbGFnKCkpKVxuICAgICk7XG5cbiAgICAvLyBmbGFnIGRheSB2YWx1ZXNcbiAgICB0aGlzLl9zdWJzLnB1c2goXG4gICAgICB0aGlzLl9zdG9yZVxuICAgICAgICAuc2VsZWN0KHN0YXRlID0+IHN0YXRlLnNlbGVjdGVkRGF0ZSlcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKHNlbGVjdGVkRGF0ZSA9PiAhIXNlbGVjdGVkRGF0ZSlcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKHNlbGVjdGVkRGF0ZSA9PiB0aGlzLl9zdG9yZS5kaXNwYXRjaCh0aGlzLl9hY3Rpb25zLmZsYWcoKSkpXG4gICAgKTtcblxuICAgIC8vIGZsYWcgZm9yIGRhdGUgcmFuZ2UgcGlja2VyXG4gICAgdGhpcy5fc3Vicy5wdXNoKFxuICAgICAgdGhpcy5fc3RvcmVcbiAgICAgICAgLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5zZWxlY3RlZFJhbmdlKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoc2VsZWN0ZWRSYW5nZSA9PiAhIXNlbGVjdGVkUmFuZ2UpXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZShzZWxlY3RlZFJhbmdlID0+IHRoaXMuX3N0b3JlLmRpc3BhdGNoKHRoaXMuX2FjdGlvbnMuZmxhZygpKSlcbiAgICApO1xuXG4gICAgLy8gbW9udGhzQ2FsZW5kYXJcbiAgICB0aGlzLl9zdWJzLnB1c2goXG4gICAgICB0aGlzLl9zdG9yZVxuICAgICAgICAuc2VsZWN0KHN0YXRlID0+IHN0YXRlLm1vbnRoc0NhbGVuZGFyKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuX3N0b3JlLmRpc3BhdGNoKHRoaXMuX2FjdGlvbnMuZmxhZygpKSlcbiAgICApO1xuXG4gICAgLy8geWVhcnMgY2FsZW5kYXJcbiAgICB0aGlzLl9zdWJzLnB1c2goXG4gICAgICB0aGlzLl9zdG9yZVxuICAgICAgICAuc2VsZWN0KHN0YXRlID0+IHN0YXRlLnllYXJzQ2FsZW5kYXJNb2RlbClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKHN0YXRlID0+ICEhc3RhdGUpXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9zdG9yZS5kaXNwYXRjaCh0aGlzLl9hY3Rpb25zLmZsYWcoKSkpXG4gICAgKTtcblxuICAgIC8vIG9uIGhvdmVyXG4gICAgdGhpcy5fc3Vicy5wdXNoKFxuICAgICAgdGhpcy5fc3RvcmVcbiAgICAgICAgLnNlbGVjdChzdGF0ZSA9PiBzdGF0ZS5ob3ZlcmVkRGF0ZSlcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKGhvdmVyZWREYXRlID0+ICEhaG92ZXJlZERhdGUpXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZShob3ZlcmVkRGF0ZSA9PiB0aGlzLl9zdG9yZS5kaXNwYXRjaCh0aGlzLl9hY3Rpb25zLmZsYWcoKSkpXG4gICAgKTtcblxuICAgIC8vIGRhdGUgY3VzdG9tIGNsYXNzZXNcbiAgICB0aGlzLl9zdWJzLnB1c2goXG4gICAgICB0aGlzLl9zdG9yZVxuICAgICAgICAuc2VsZWN0KHN0YXRlID0+IHN0YXRlLmRhdGVDdXN0b21DbGFzc2VzKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoZGF0ZUN1c3RvbUNsYXNzZXMgPT4gISFkYXRlQ3VzdG9tQ2xhc3NlcylcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKGRhdGVDdXN0b21DbGFzc2VzID0+IHRoaXMuX3N0b3JlLmRpc3BhdGNoKHRoaXMuX2FjdGlvbnMuZmxhZygpKSlcbiAgICApO1xuXG4gICAgLy8gb24gbG9jYWxlIGNoYW5nZVxuICAgIHRoaXMuX3N1YnMucHVzaChcbiAgICAgIHRoaXMuX2xvY2FsZVNlcnZpY2UubG9jYWxlQ2hhbmdlXG4gICAgICAgIC5zdWJzY3JpYmUobG9jYWxlID0+IHRoaXMuX3N0b3JlLmRpc3BhdGNoKHRoaXMuX2FjdGlvbnMuc2V0TG9jYWxlKGxvY2FsZSkpKVxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGRlc3Ryb3koKTogdm9pZCB7XG4gICAgZm9yIChjb25zdCBzdWIgb2YgdGhpcy5fc3Vicykge1xuICAgICAgc3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=