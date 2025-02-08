import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Data, ParamMap, Router, RouterModule } from '@angular/router';
import { Subscription, Observable, combineLatest, tap, filter } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpHeaders } from '@angular/common/http';

import SharedModule from 'app/shared/shared.module';
import { SortByDirective, SortDirective, SortService, type SortState, sortStateSignal } from 'app/shared/sort';
import { FormatMediumDatetimePipe } from 'app/shared/date';
import { ItemCountComponent } from 'app/shared/pagination';
import { FormsModule } from '@angular/forms';

import { ITEMS_PER_PAGE, PAGE_HEADER, TOTAL_COUNT_RESPONSE_HEADER } from 'app/config/pagination.constants';
import { DEFAULT_SORT_DATA, ITEM_DELETED_EVENT, SORT } from 'app/config/navigation.constants';
import { IPost } from '../post.model';
import { EntityArrayResponseType, PostService } from '../service/post.service';
import { PostDeleteDialogComponent } from '../delete/post-delete-dialog.component';
import { Account } from '../../../core/auth/account.model';
import { AccountService } from '../../../core/auth/account.service';

@Component({
  selector: 'jhi-post',
  templateUrl: './post.component.html',
  imports: [RouterModule, FormsModule, SharedModule, SortDirective, SortByDirective, FormatMediumDatetimePipe, ItemCountComponent],
})
export class PostComponent implements OnInit {
  @Input() post: IPost | null = null;
  account: Account | null = null;
  subscription: Subscription | null = null;
  posts: IPost[] = [];
  isLoading = false;

  sortState = sortStateSignal({});

  itemsPerPage = ITEMS_PER_PAGE;
  totalItems = 0;
  page = 1;

  constructor(
    private accountService: AccountService,
    private postService: PostService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sortService: SortService,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.subscription = combineLatest([this.activatedRoute.queryParamMap, this.activatedRoute.data])
      .pipe(
        tap(([params, data]) => this.fillComponentAttributeFromRoute(params, data)),
        tap(() => this.load()),
      )
      .subscribe();
    this.accountService.identity().subscribe(account => {
      this.account = account;
    });
  }

  trackId(index: number, item: IPost): number | undefined {
    return item.id ? item.id : undefined;
  }

  isAuthor(): boolean {
    return this.post?.userPost?.login === this.account?.login;
  }

  delete(post: IPost): void {
    const modalRef = this.modalService.open(PostDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.post = post;
    modalRef.closed
      .pipe(
        filter(reason => reason === ITEM_DELETED_EVENT),
        tap(() => this.load()),
      )
      .subscribe();
  }

  load(): void {
    this.queryBackend().subscribe({
      next: (res: EntityArrayResponseType) => {
        this.onResponseSuccess(res);
      },
    });
  }

  navigateToWithComponentValues(event: SortState): void {
    this.handleNavigation(this.page, event);
  }

  navigateToPage(page: number): void {
    this.handleNavigation(page, this.sortState());
  }

  protected fillComponentAttributeFromRoute(params: ParamMap, data: Data): void {
    const page = params.get(PAGE_HEADER);
    this.page = +(page ?? 1);
    this.sortState.set(this.sortService.parseSortParam(params.get(SORT) ?? data[DEFAULT_SORT_DATA]));
  }

  protected onResponseSuccess(response: EntityArrayResponseType): void {
    this.fillComponentAttributesFromResponseHeader(response.headers);
    const dataFromBody = this.fillComponentAttributesFromResponseBody(response.body);
    this.posts = dataFromBody;
  }

  protected fillComponentAttributesFromResponseBody(data: IPost[] | null): IPost[] {
    return data ?? [];
  }

  protected fillComponentAttributesFromResponseHeader(headers: HttpHeaders): void {
    this.totalItems = Number(headers.get(TOTAL_COUNT_RESPONSE_HEADER));
  }

  protected queryBackend(): Observable<EntityArrayResponseType> {
    const { page } = this;
    this.isLoading = true;
    const pageToLoad: number = page;
    const queryObject: { page: number; size: number; eagerload: boolean; sort: string[] } = {
      page: pageToLoad - 1,
      size: this.itemsPerPage,
      eagerload: true,
      sort: this.sortService.buildSortParam(this.sortState()),
    };
    return this.postService.query(queryObject).pipe(tap(() => (this.isLoading = false)));
  }

  protected handleNavigation(page: number, sortState: SortState): void {
    const queryParamsObj = {
      page,
      size: this.itemsPerPage,
      sort: this.sortService.buildSortParam(sortState),
    };

    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute,
      queryParams: queryParamsObj,
    });
  }
}
