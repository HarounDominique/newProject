import { Injectable, inject } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  private readonly eventManager = inject(EventManager);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(request: HttpRequest<never>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        error: (err: HttpErrorResponse) => {
          if (!(err.status === 401 && (err.message === '' || err.url?.includes('api/account')))) {
            this.eventManager.broadcast(new EventWithContent('newProjectApp.httpError', err));
          }
        },
      }),
    );
  }
}
