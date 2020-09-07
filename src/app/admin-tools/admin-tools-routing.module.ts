import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientListComponent} from './client-list/client-list.component';
import {NavigationComponent} from './navigation/navigation.component';
import {AdminToolsComponent} from './admin-tools.component';
import {BundleComponent} from './bundle/bundle.component';
import {ActivityComponent} from './activity/activity.component';
import {RoleComponent} from './role/role.component';
import {UserComponent} from './user/user.component';
import {StructureComponent} from './structure/structure.component';
import {ClientDetailsComponent} from './client-details/client-details.component';
import {AuthenticationService} from '../shared/service/authentication.service';

const routes: Routes = [
  {
    path: 'admin-tools', component: AdminToolsComponent, canActivate: [AuthenticationService], children: [
      {path: '', component: NavigationComponent},
      {path: 'activities', component: ActivityComponent},
      {path: 'bundles', component: BundleComponent},
      {path: 'clients', component: ClientListComponent},
      {path: 'clients/details', component: ClientDetailsComponent},
      {path: 'roles', component: RoleComponent},
      {path: 'structure-levels', component: StructureComponent},
      {path: 'users', component: UserComponent},
      {path: '**', redirectTo: ''}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminToolsRoutingModule {
}
