import {NgModule} from '@angular/core';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule {
}
