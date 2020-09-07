import {NgModule} from '@angular/core';
import {MaterialModule} from './material/material.module';
import {TranslateModule} from '@ngx-translate/core';
import {ThemeChangeService} from './service/theme-change.service';
import {SharedRoutingModule} from './shared-routing.module';
import {AuthenticationService} from './service/authentication.service';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from '@angular/cdk/layout';
import {httpInterceptorProviders} from './interceptor';
import {HasAccessDirective} from './directive/has-access.directive';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ConfirmationComponent} from './component/confirmation.component';

@NgModule({
  declarations: [
    HasAccessDirective,
    ConfirmationComponent
  ],
  exports: [
    HttpClientModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule,
    HasAccessDirective,
    ConfirmationComponent
  ],
  imports: [
    MaterialModule,
    SharedRoutingModule
  ],
  providers: [
    httpInterceptorProviders,
    AuthenticationService,
    ThemeChangeService
  ]
})
export class SharedModule {
}
