import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ClientListComponent} from './client-list/client-list.component';
import {AdminToolsRoutingModule} from './admin-tools-routing.module';
import {AdminToolsClientService} from './admin-tools.client.service';
import {NavigationComponent} from './navigation/navigation.component';
import {AdminToolsComponent} from './admin-tools.component';
import {BundleComponent} from './bundle/bundle.component';
import {ActivityComponent} from './activity/activity.component';
import {RoleComponent} from './role/role.component';
import {UserComponent} from './user/user.component';
import {StructureComponent} from './structure/structure.component';
import {ClientDetailsComponent} from './client-details/client-details.component';

@NgModule({
  declarations: [
    AdminToolsComponent,
    NavigationComponent,
    ClientListComponent,
    ClientDetailsComponent,
    BundleComponent,
    ActivityComponent,
    RoleComponent,
    UserComponent,
    StructureComponent
  ],
  imports: [
    AdminToolsRoutingModule,
    SharedModule
  ],
  exports: [],
  providers: [
    AdminToolsClientService
  ]
})
export class AdminToolsModule {
}
