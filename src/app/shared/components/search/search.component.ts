import {ChangeDetectionStrategy, Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SearchComponent),
    multi: true,
  }],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, ControlValueAccessor {
  public readonly control: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)]);
  private onChange: (_: any) => void = () => null;
  private onTouched: () => void = () => null;

  constructor() { }

  public ngOnInit(): void {}

  public writeValue(value: string): void {
    this.control.setValue(value);
  }

  public registerOnChange(onChange: (value: string) => void) {
    this.onChange = onChange;
  }

  public registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  public submit(event: MouseEvent): void {
    event.preventDefault();
    this.control.markAsTouched();
    if (!this.control.valid) {
      return;
    }
    this.onChange(this.control.value);
  }
}
