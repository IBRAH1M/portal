import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './shared/service/authentication.service';
import {TranslateService} from '@ngx-translate/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isAuthenticated = new BehaviorSubject<boolean>(true);

  constructor(private translateService: TranslateService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translateService.setDefaultLang('en');
    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translateService.use('en');

    this.authenticationService.isAuthenticated.subscribe((isAuthenticated: boolean) => this.isAuthenticated.next(isAuthenticated));
  }
}
