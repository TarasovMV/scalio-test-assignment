import { TestBed } from '@angular/core/testing';
import {MatPaginatorIntlCount} from '@core/classes/paginator-intl';

describe('MatPaginatorIntlCount', () => {
  let service: MatPaginatorIntlCount;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatPaginatorIntlCount]
    });
    service = TestBed.inject(MatPaginatorIntlCount);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check getRangeLabel', () => {
    expect(service.getRangeLabel(1, 2, 4)).toEqual('Page 2 of 2');
  });

  it('should check getRangeLabel error', () => {
    expect(service.getRangeLabel(0, 0, 0)).toEqual('');
  });
});
