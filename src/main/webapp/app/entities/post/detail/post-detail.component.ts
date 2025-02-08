import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { FormatMediumDatetimePipe } from 'app/shared/date';
import { IPost } from '../post.model';
import { Account } from '../../../core/auth/account.model';
import { AccountService } from '../../../core/auth/account.service';

@Component({
  selector: 'jhi-post-detail',
  templateUrl: './post-detail.component.html',
  standalone: true,
  imports: [SharedModule, RouterModule, FormatMediumDatetimePipe],
})
export class PostDetailComponent implements OnInit {
  @Input() post: IPost | null = null;
  account: Account | null = null;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => {
      this.account = account;
    });
  }

  isAuthor(): boolean {
    return this.post?.userPost?.login === this.account?.login;
  }

  previousState(): void {
    window.history.back();
  }
}
