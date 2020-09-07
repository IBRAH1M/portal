import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {AuthenticationService} from '../shared/service/authentication.service';

const routes: Routes = [
  {path: 'dashboard', component: LandingPageComponent, canActivate: [AuthenticationService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {
}
