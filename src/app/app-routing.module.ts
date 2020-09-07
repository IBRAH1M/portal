import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  // {path: 'app', loadChildren: () => import(`./navigation/navigation.module`).then(m => m.NavigationModule)},
  {path: 'dashboard', loadChildren: () => import(`./navigation/navigation.module`).then(m => m.NavigationModule)},
  {path: 'admin-tools', loadChildren: () => import(`./admin-tools/admin-tools.module`).then(m => m.AdminToolsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
