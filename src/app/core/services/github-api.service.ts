import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TableSortDirection, TableSortField, IGithubDto, IGithubResponse} from '@core/models';
import {IGithubApi} from '@core/models/github-api.interface';

const GITHUB_URL: string = 'https://api.github.com';
const GITHUB_HEADER_KEY: string = 'link';

@Injectable()
export class GithubApiService implements IGithubApi {

  constructor(private http: HttpClient) {}

  public loadData(
    username: string,
    page: number = 1,
    sort?: TableSortField,
    order?: TableSortDirection,
    perPage: number = 9,
  ): Observable<IGithubDto> {
    let params: HttpParams = new HttpParams()
      .set('q', username)
      .set('page', page)
      .set('per_page', perPage);

    if (!!sort) {
      params = params.set('sort', sort!);
    }

    if (!!order) {
      params = params.set('order', order!);
    }

    return this.http.get<IGithubResponse>(
      `${GITHUB_URL}/search/users`,
      {observe: 'response', params}
    ).pipe(map(this.mapResponse));
  }

  private mapResponse = (response: HttpResponse<IGithubResponse>): IGithubDto => {
    const links = response.headers.get(GITHUB_HEADER_KEY);
    const pageCount = links
      ?.match(/<(.*)&page=(\w*).*>; rel="last"/)
      ?.splice(-1)?.[0] ?? 0;
    return {
      pages: +pageCount,
      items: response.body?.items ?? [],
    };
  }
}
