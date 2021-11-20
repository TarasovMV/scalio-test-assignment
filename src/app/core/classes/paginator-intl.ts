import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class MatPaginatorIntlCount extends MatPaginatorIntl {

  override getRangeLabel = (pageIdx: number, pageSize: number, length: number) => {
    if(!length) {
      return '';
    }
    return `Page ${pageIdx + 1} of ${Math.floor(length / pageSize)}`;
  };
}
