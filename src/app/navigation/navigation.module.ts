import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {NavSidebarComponent} from './nav-sidebar/nav-sidebar.component';
import {NavigationRoutingModule} from './navigation-routing.module';
import {ThemePickerComponent} from './theme-picker/theme-picker.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';

@NgModule({
  declarations: [
    NavSidebarComponent,
    ThemePickerComponent,
    FooterComponent,
    HeaderComponent
  ],
  exports: [
    NavSidebarComponent,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    NavigationRoutingModule,
    SharedModule
  ]
})
export class NavigationModule {
}
