import {AfterViewInit, Component, ElementRef, Inject, LOCALE_ID, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {BehaviorSubject, fromEvent, merge, Observable, of} from 'rxjs';
import {Client, Page} from '../admin-tools-models';
import {AdminToolsClientService} from '../admin-tools.client.service';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {catchError, debounceTime, distinctUntilChanged, finalize} from 'rxjs/operators';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationComponent} from '../../shared/component/confirmation.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit, OnDestroy, AfterViewInit, DataSource<Client> {

  private dataSubject = new BehaviorSubject<Client[]>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  displayedColumns = ['id', 'name', 'actions'];
  dataLoading = new BehaviorSubject<boolean>(true);
  data: Page<Client>;

  constructor(@Inject(LOCALE_ID) public localeId: string,
              public dialog: MatDialog,
              private clientManagementClientService: AdminToolsClientService) {
  }

  ngOnInit() {
    this.loadData();
    // console.log(this.localeId);
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
    .pipe(
      debounceTime(250),
      distinctUntilChanged()
    )
    .subscribe(() => {
      this.paginator.pageIndex = 0;
      this.loadData();
    });

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.paginator.page, this.sort.sortChange)
    .subscribe((data: (PageEvent | Sort)) => {
      this.loadData();
    });
  }

  ngOnDestroy(): void {
    this.dataSubject.complete();
    this.paginator ? this.paginator.page.unsubscribe() : null;
    this.sort ? this.sort.sortChange.unsubscribe() : null;
  }

  loadData() {
    this.dataLoading.next(true);
    this.clientManagementClientService.getClientsPage(
      this.paginator?.pageIndex ? this.paginator.pageIndex : 0,
      this.paginator?.pageSize ? this.paginator.pageSize : 25,
      this.sort ? `${this.sort.active},${this.sort.direction}` : 'id,desc',
      this.input?.nativeElement.value ? this.input.nativeElement.value : '')
        .pipe(
          catchError(() => of([])),
          finalize(() => this.dataLoading.next(false))
        )
        .subscribe((data: Page<Client>) => {
          this.data = data;
          this.dataSubject.next(data.content);
        });
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(collectionViewer: CollectionViewer): Observable<Client[]> {
    return this.dataSubject.asObservable();
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(collectionViewer: CollectionViewer): void {
  }

  openDeleteDialog() {
    const dialogRef = this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Are you sure you want to delete the client?',
        content: 'This will delete all elements that are currently on this page and cannot be undone'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
