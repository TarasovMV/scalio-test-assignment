import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private snackBar: MatSnackBar
  ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((e) => {
              switch (e.status) {
                case 403:
                  this.showError('API rate limit exceeded. Please wait one minute.');
                  break;
                default:
                  this.showError('Error!')
              }
              return throwError(e);
            })
        );
    }

    private showError(msg: string): void {
      const config = new MatSnackBarConfig();
      config.panelClass = `snackbar_error`;
      config.duration = 5000;
      this.snackBar.open(msg, '', config);
    }
}
