import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import {GITHUB_API} from '@core/tokens';
import {GithubApiServiceStub} from '../../../testing/github-api-service.stub';
import {DestroyService} from '@core/services';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {throwError} from 'rxjs';

const DEBOUNCE: number = 200;

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
      ],
      declarations: [ TableComponent ],
      providers: [
        {
          provide: GITHUB_API,
          useClass: GithubApiServiceStub,
        },
        DestroyService,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check init', async () => {
    component.search ='foo';
    const loadDataSpy = spyOn<any>(component, 'loadData');
    await wait(DEBOUNCE);
    expect(loadDataSpy).toHaveBeenCalledTimes(1);
  });

  it('should check get data', async () => {
    component.search ='foo';
    await wait(DEBOUNCE);
    component.dataSource?.pages$.subscribe(x => expect(x).toEqual(3 * 9))
  });

  it('should check get error', async () => {
    spyOn<any>((component as any).githubApi, 'loadData').and.returnValue(throwError(''));
    component.ngOnInit();
    component.search ='foo';
    await wait(DEBOUNCE);
    component.dataSource?.pages$.subscribe(x => expect(x).toEqual(0))
  });
});

function wait(ms: number): Promise<void> {
  return new Promise(function(resolve) {
    setTimeout(() => resolve(), ms);
  });
}
