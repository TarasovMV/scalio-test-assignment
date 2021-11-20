import {TableSortDirection, TableSortField} from '@core/models/table-sort.interface';
import {Observable, of} from 'rxjs';
import {IGithubDto} from '@core/models/github.interface';

export interface IGithubApi {
  loadData: (
    username: string,
    page: number,
    sort?: TableSortField,
    order?: TableSortDirection,
    perPage?: number,
  ) => Observable<IGithubDto>;
}
