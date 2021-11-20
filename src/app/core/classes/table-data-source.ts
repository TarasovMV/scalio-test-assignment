import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of, Subscription} from 'rxjs';
import {IGithubUser} from '@core/models';
import {catchError, distinctUntilChanged, finalize, map, tap} from 'rxjs/operators';
import {IGithubDto} from '@core/models';
import {PAGE_SIZE} from '@core/constants';
import {TableSortDirection, TableSortField} from '../models/table-sort.interface';
import {IGithubApi} from '@core/models/github-api.interface';

const DEFAULT_DATA: IGithubDto = {
  items: [],
  pages: 0,
};

export class TableDataSource extends DataSource<IGithubUser> {
  public readonly loading$: Observable<boolean>;
  public readonly pages$: Observable<number>;

  private data$: BehaviorSubject<IGithubDto> = new BehaviorSubject<IGithubDto>(DEFAULT_DATA);
  private loading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private loadSubscription: Subscription | undefined;
  private cache: {[key: string]: IGithubDto} = {};

  constructor(private api: IGithubApi) {
    super();
    this.loading$ = this.loading$$.asObservable();
    this.pages$ = this.data$.pipe(map(x => x.pages * PAGE_SIZE), distinctUntilChanged());
  }

  public connect(collectionViewer: CollectionViewer): Observable<IGithubUser[]> {
    return this.data$.pipe(map(x => x.items));
  }

  public disconnect(collectionViewer: CollectionViewer) {
    this.data$.complete();
    this.loading$$.complete();
  }

  public load(
    search: string,
    page: number = 1,
    sort?: TableSortField,
    direction?: TableSortDirection,
  ): void {
    const cacheString = `${search}_${page}_${sort}_${direction}`;
    this.loadSubscription?.unsubscribe();

    if (!!this.cache[cacheString]) {
      this.loading$$.next(false);
      this.data$.next(this.cache[cacheString]);
      return;
    }

    this.loading$$.next(true);
    this.loadSubscription = this.api.loadData(search, page, sort, direction).pipe(
      tap((res) => this.cache[cacheString] = res),
      catchError(() => of(DEFAULT_DATA)),
      finalize(() => this.loading$$.next(false)),
    ).subscribe((data) => this.data$.next(data));
  }

  public releaseCache(): void {
    this.cache = {};
  }
}
