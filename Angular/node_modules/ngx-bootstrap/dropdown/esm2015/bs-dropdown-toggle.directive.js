/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { ChangeDetectorRef, Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';
import { BsDropdownState } from './bs-dropdown.state';
import { BsDropdownDirective } from './bs-dropdown.directive';
export class BsDropdownToggleDirective {
    /**
     * @param {?} _changeDetectorRef
     * @param {?} _dropdown
     * @param {?} _element
     * @param {?} _renderer
     * @param {?} _state
     */
    constructor(_changeDetectorRef, _dropdown, _element, _renderer, _state) {
        this._changeDetectorRef = _changeDetectorRef;
        this._dropdown = _dropdown;
        this._element = _element;
        this._renderer = _renderer;
        this._state = _state;
        this.isDisabled = null;
        this._subscriptions = [];
        // sync is open value with state
        this._subscriptions.push(this._state.isOpenChange.subscribe((value) => {
            this.isOpen = value;
            if (value) {
                this._documentClickListener = this._renderer.listen('document', 'click', (event) => {
                    if (this._state.autoClose && event.button !== 2 &&
                        !this._element.nativeElement.contains(event.target) &&
                        !(this._state.insideClick && this._dropdown._contains(event))) {
                        this._state.toggleClick.emit(false);
                        this._changeDetectorRef.detectChanges();
                    }
                });
                this._escKeyUpListener = this._renderer.listen(this._element.nativeElement, 'keyup.esc', () => {
                    if (this._state.autoClose) {
                        this._state.toggleClick.emit(false);
                        this._changeDetectorRef.detectChanges();
                    }
                });
            }
            else {
                this._documentClickListener();
                this._escKeyUpListener();
            }
        }));
        // populate disabled state
        this._subscriptions.push(this._state.isDisabledChange.subscribe((value) => (this.isDisabled = value || null)));
    }
    /**
     * @return {?}
     */
    onClick() {
        if (this.isDisabled) {
            return;
        }
        this._state.toggleClick.emit(true);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._documentClickListener) {
            this._documentClickListener();
        }
        if (this._escKeyUpListener) {
            this._escKeyUpListener();
        }
        for (const sub of this._subscriptions) {
            sub.unsubscribe();
        }
    }
}
BsDropdownToggleDirective.decorators = [
    { type: Directive, args: [{
                selector: '[bsDropdownToggle],[dropdownToggle]',
                exportAs: 'bs-dropdown-toggle',
                host: {
                    '[attr.aria-haspopup]': 'true'
                }
            },] }
];
/** @nocollapse */
BsDropdownToggleDirective.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: BsDropdownDirective },
    { type: ElementRef },
    { type: Renderer2 },
    { type: BsDropdownState }
];
BsDropdownToggleDirective.propDecorators = {
    isDisabled: [{ type: HostBinding, args: ['attr.disabled',] }],
    isOpen: [{ type: HostBinding, args: ['attr.aria-expanded',] }],
    onClick: [{ type: HostListener, args: ['click', [],] }]
};
if (false) {
    /** @type {?} */
    BsDropdownToggleDirective.prototype.isDisabled;
    /** @type {?} */
    BsDropdownToggleDirective.prototype.isOpen;
    /**
     * @type {?}
     * @private
     */
    BsDropdownToggleDirective.prototype._subscriptions;
    /**
     * @type {?}
     * @private
     */
    BsDropdownToggleDirective.prototype._documentClickListener;
    /**
     * @type {?}
     * @private
     */
    BsDropdownToggleDirective.prototype._escKeyUpListener;
    /**
     * @type {?}
     * @private
     */
    BsDropdownToggleDirective.prototype._changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    BsDropdownToggleDirective.prototype._dropdown;
    /**
     * @type {?}
     * @private
     */
    BsDropdownToggleDirective.prototype._element;
    /**
     * @type {?}
     * @private
     */
    BsDropdownToggleDirective.prototype._renderer;
    /**
     * @type {?}
     * @private
     */
    BsDropdownToggleDirective.prototype._state;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtZHJvcGRvd24tdG9nZ2xlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC1ib290c3RyYXAvZHJvcGRvd24vIiwic291cmNlcyI6WyJicy1kcm9wZG93bi10b2dnbGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxVQUFVLEVBQ1YsV0FBVyxFQUNYLFlBQVksRUFFWixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFHdkIsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3RELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBUzlELE1BQU0sT0FBTyx5QkFBeUI7Ozs7Ozs7O0lBUXBDLFlBQ1Usa0JBQXFDLEVBQ3JDLFNBQThCLEVBQzlCLFFBQW9CLEVBQ3BCLFNBQW9CLEVBQ3BCLE1BQXVCO1FBSnZCLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFDckMsY0FBUyxHQUFULFNBQVMsQ0FBcUI7UUFDOUIsYUFBUSxHQUFSLFFBQVEsQ0FBWTtRQUNwQixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLFdBQU0sR0FBTixNQUFNLENBQWlCO1FBWkgsZUFBVSxHQUFZLElBQUksQ0FBQztRQUdqRCxtQkFBYyxHQUFtQixFQUFFLENBQUM7UUFXMUMsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQ2hDLENBQUMsS0FBYyxFQUFFLEVBQUU7WUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFFcEIsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxLQUFVLEVBQUUs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dG9yUmVmLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEhvc3RCaW5kaW5nLFxuICBIb3N0TGlzdGVuZXIsXG4gIE9uRGVzdHJveSxcbiAgUmVuZGVyZXIyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IEJzRHJvcGRvd25TdGF0ZSB9IGZyb20gJy4vYnMtZHJvcGRvd24uc3RhdGUnO1xuaW1wb3J0IHsgQnNEcm9wZG93bkRpcmVjdGl2ZSB9IGZyb20gJy4vYnMtZHJvcGRvd24uZGlyZWN0aXZlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2JzRHJvcGRvd25Ub2dnbGVdLFtkcm9wZG93blRvZ2dsZV0nLFxuICBleHBvcnRBczogJ2JzLWRyb3Bkb3duLXRvZ2dsZScsXG4gIGhvc3Q6IHtcbiAgICAnW2F0dHIuYXJpYS1oYXNwb3B1cF0nOiAndHJ1ZSdcbiAgfVxufSlcbmV4cG9ydCBjbGFzcyBCc0Ryb3Bkb3duVG9nZ2xlRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQEhvc3RCaW5kaW5nKCdhdHRyLmRpc2FibGVkJykgaXNEaXNhYmxlZDogYm9vbGVhbiA9IG51bGw7XG4gIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLWV4cGFuZGVkJykgaXNPcGVuOiBib29sZWFuO1xuXG4gIHByaXZhdGUgX3N1YnNjcmlwdGlvbnM6IFN1YnNjcmlwdGlvbltdID0gW107XG4gIHByaXZhdGUgX2RvY3VtZW50Q2xpY2tMaXN0ZW5lcjogRnVuY3Rpb247XG4gIHByaXZhdGUgX2VzY0tleVVwTGlzdGVuZXI6IEZ1bmN0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIF9kcm9wZG93bjogQnNEcm9wZG93bkRpcmVjdGl2ZSxcbiAgICBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBfc3RhdGU6IEJzRHJvcGRvd25TdGF0ZVxuICApIHtcbiAgICAvLyBzeW5jIGlzIG9wZW4gdmFsdWUgd2l0aCBzdGF0ZVxuICAgIHRoaXMuX3N1YnNjcmlwdGlvbnMucHVzaChcbiAgICAgIHRoaXMuX3N0YXRlLmlzT3BlbkNoYW5nZS5zdWJzY3JpYmUoXG4gICAgICAgICh2YWx1ZTogYm9vbGVhbikgPT4ge1xuICAgICAgICAgIHRoaXMuaXNPcGVuID0gdmFsdWU7XG5cbiAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2RvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IHRoaXMuX3JlbmRlcmVyLmxpc3RlbignZG9jdW1lbnQnLCAnY2xpY2snLCAoZXZlbnQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICBpZiAodGhpcy5fc3RhdGUuYXV0b0Nsb3NlICYmIGV2ZW50LmJ1dHRvbiAhPT0gMiAmJlxuICAgICAgICAgICAgICAgICF0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY29udGFpbnMoZXZlbnQudGFyZ2V0KSAmJlxuICAgICAgICAgICAgICAgICEodGhpcy5fc3RhdGUuaW5zaWRlQ2xpY2sgJiYgdGhpcy5fZHJvcGRvd24uX2NvbnRhaW5zKGV2ZW50KSlcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3RhdGUudG9nZ2xlQ2xpY2suZW1pdChmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5fZXNjS2V5VXBMaXN0ZW5lciA9IHRoaXMuX3JlbmRlcmVyLmxpc3Rlbih0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdrZXl1cC5lc2MnLCAoKSA9PiB7XG4gICAgICAgICAgICAgIGlmICh0aGlzLl9zdGF0ZS5hdXRvQ2xvc2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zdGF0ZS50b2dnbGVDbGljay5lbWl0KGZhbHNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuX2VzY0tleVVwTGlzdGVuZXIoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIClcbiAgICApO1xuXG4gICAgLy8gcG9wdWxhdGUgZGlzYWJsZWQgc3RhdGVcbiAgICB0aGlzLl9zdWJzY3JpcHRpb25zLnB1c2goXG4gICAgICB0aGlzLl9zdGF0ZS5pc0Rpc2FibGVkQ2hhbmdlLnN1YnNjcmliZShcbiAgICAgICAgKHZhbHVlOiBib29sZWFuKSA9PiAodGhpcy5pc0Rpc2FibGVkID0gdmFsdWUgfHwgbnVsbClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbXSlcbiAgb25DbGljaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0Rpc2FibGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3N0YXRlLnRvZ2dsZUNsaWNrLmVtaXQodHJ1ZSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XG4gICAgICB0aGlzLl9kb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXNjS2V5VXBMaXN0ZW5lcikge1xuICAgICAgdGhpcy5fZXNjS2V5VXBMaXN0ZW5lcigpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3Qgc3ViIG9mIHRoaXMuX3N1YnNjcmlwdGlvbnMpIHtcbiAgICAgIHN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxufVxuIl19