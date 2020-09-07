import {Component, Input, OnInit} from '@angular/core';
import {environment} from "../../../environments/environment";
import {TranslateService} from "@ngx-translate/core";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {Observable} from "rxjs";
import {map, shareReplay} from "rxjs/operators";
import {MatSidenav} from "@angular/material/sidenav";
import {AuthenticationService} from "../../shared/service/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  applicationName: string = environment.app_name;
  isAuthenticated: boolean;
  @Input() drawer?: MatSidenav;

  constructor(private translateService: TranslateService,
              private breakpointObserver: BreakpointObserver,
              private authenticationService: AuthenticationService) {
  }

  changeLanguage() {
    this.translateService.currentLang == "en" ? this.translateService.use("ar") : this.translateService.use("en");
  }

  async ngOnInit() {
    this.authenticationService.isAuthenticated.subscribe(
      (isAuthenticated: boolean) => this.isAuthenticated = isAuthenticated
    );
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

}
