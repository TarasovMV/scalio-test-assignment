import {AfterViewInit, Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {combineLatest, Subject} from 'rxjs';
import {debounceTime, filter, startWith, takeUntil} from 'rxjs/operators';

import {TableDataSource, MatPaginatorIntlCount} from '@core/classes';
import {PAGE_SIZE} from '@core/constants';
import {TableSortField} from '@core/models';
import {DestroyService} from '@core/services';
import {GITHUB_API} from '@core/tokens';
import {IGithubApi} from '@core/models/github-api.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  providers: [
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorIntlCount,
    },
    DestroyService,
  ],
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() public set search(value: string) {
    if (!value) {
      return;
    }
    this.currentSearch = value;
    this.dataSource?.releaseCache();
    this.paginator.firstPage();
    this.load$.next(true);
  }

  public dataSource: TableDataSource | undefined;
  public readonly columns: string[] = ['avatar_url', 'login', 'type'];
  public readonly pageSize: number = PAGE_SIZE;

  private currentSearch: string = '';
  private readonly load$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(GITHUB_API) private githubApi: IGithubApi,
    private destroy$: DestroyService,
  ) { }

  ngOnInit(): void {
    this.dataSource = new TableDataSource(this.githubApi);
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.pipe(takeUntil(this.destroy$)).subscribe(() => this.paginator.firstPage());

    combineLatest([
      this.paginator.page.pipe(startWith(0)),
      this.sort.sortChange.pipe(startWith({})),
    ]).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => this.load$.next(true));

    this.load$
      .pipe(
        debounceTime(200),
        filter(() => !!this.currentSearch),
        takeUntil(this.destroy$)
      ).subscribe(() => this.loadData());
  }

  private loadData(): void {
    let sortField;
    const sortDirection = this.sort.direction;
    if(!!sortDirection) {
      sortField = this.sort.active as TableSortField;
    }
    const page = this.paginator.pageIndex + 1;
    this.dataSource?.load(this.currentSearch, page, sortField, sortDirection);
  }
}
