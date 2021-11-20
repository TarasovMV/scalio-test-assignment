import {IGithubDto, TableSortDirection, TableSortField} from '@core/models';
import {Observable, of} from 'rxjs';
import {IGithubApi} from '@core/models/github-api.interface';

export class GithubApiServiceStub implements IGithubApi {

  public loadData(
    username: string,
    page: number = 1,
    sort?: TableSortField,
    order?: TableSortDirection,
    perPage: number = 9,
  ): Observable<IGithubDto> {
    return of({
      pages: 3,
      items: [],
    })
  }
}
