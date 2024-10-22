import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor {
  @Input() options: { label: string; value: string | number }[] = [];
  @Input() label: string = "";
  public innerValue: string | number | null = null;
  public touched: boolean = false;
  public isValid: boolean = true;

  get value(): string | number | null {
    return this.innerValue;
  }

  set value(value: string | number | null) {
    this.innerValue = value;
    this.isValid = !!value;
    this.onChange(value);
    this.onTouched();
  }

  public writeValue(value: string | number | null): void {
    this.innerValue = value;
    this.isValid = !!value;
  }

  public registerOnChange(fn: (value: string | number | null) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public handleChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.touched = true;
    this.value = selectElement.value;
  }

  private onChange: (value: string | number | null) => void = () => {};
  private onTouched: () => void = () => {};
}
