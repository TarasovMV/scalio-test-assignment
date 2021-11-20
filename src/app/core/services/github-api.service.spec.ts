import { TestBed } from '@angular/core/testing';
import { GithubApiService } from './github-api.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {of} from 'rxjs';
import {IGithubResponse} from '@core/models';

const RESPONSE = new HttpResponse<IGithubResponse>({
  body: {
    incomplete_results: false,
    total_count: 100,
    items: [],
  },
  headers: new HttpHeaders({
    link: `<https://api.github.com/search/users?q=foo&page=2&per_page=9&sort=login&order=desc>; rel="next", <https://api.github.com/search/users?q=foo&page=112&per_page=9&sort=login&order=desc>; rel="last"`
  }),
});

describe('GithubApiService', () => {
  let service: GithubApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubApiService]
    });
    service = TestBed.inject(GithubApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check mapResponse', () => {
    const mapResponseSpy = spyOn<any>(service, 'mapResponse').and.callThrough();
    expect(mapResponseSpy(RESPONSE)).toEqual({
      pages: 112,
      items: [],
    });
  });

  it('should check loadData method', () => {
    const http = TestBed.inject(HttpClient);
    spyOn(http, 'get').and.returnValue(of(RESPONSE));
    service.loadData('foo', 10).subscribe(res => expect(res).toEqual({
      pages: 112,
      items: [],
    }));
  });
});
