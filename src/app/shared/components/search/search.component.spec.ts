import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {ChangeDetectionStrategy} from '@angular/core';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [
        NoopAnimationsModule,
        MatInputModule,
        MatButtonModule,
        ReactiveFormsModule,
      ]
    }).overrideComponent(SearchComponent, {
      set: {  changeDetection: ChangeDetectionStrategy.Default  }
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check show error validation message', async () => {
    const compiled = fixture.nativeElement as HTMLElement;
    component.submit({preventDefault: () => {return}} as MouseEvent);
    fixture.detectChanges();
    expect(compiled.querySelector('mat-error')?.textContent).toContain('Min length is 3 characters');
  });
});
