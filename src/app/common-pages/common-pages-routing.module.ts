import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {NotFoundComponent} from './not-found/not-found.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  // {path: 'not-found', component: NotFoundComponent}
  // {path: 'unauthorized', component: NotFoundComponent}
  // {path: 'forbidden', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonPagesRoutingModule {
}
