import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from '@shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ErrorInterceptor} from '@core/interceptors';
import {MatToolbarModule} from '@angular/material/toolbar';
import {GithubApiService} from '@core/services';
import {GITHUB_API} from '@core/tokens';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    SharedModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatToolbarModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: GITHUB_API,
      useClass: GithubApiService,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
