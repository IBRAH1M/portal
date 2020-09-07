import {NgModule} from '@angular/core';
import {LoginComponent} from './login/login.component';
import {SharedModule} from '../shared/shared.module';
import {CommonPagesRoutingModule} from './common-pages-routing.module';
import {NotFoundComponent} from './not-found/not-found.component';


@NgModule({
  declarations: [
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    CommonPagesRoutingModule,
    SharedModule
  ],
  exports: [
    LoginComponent
  ]
})
export class CommonPagesModule {
}
