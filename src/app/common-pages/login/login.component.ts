import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../shared/service/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  applicationName: string = environment.app_name;
  redirectUrl: string;
  showSpinner: boolean = false;
  username: string;
  password: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private translateService: TranslateService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.redirectUrl = this.route.snapshot.queryParamMap['returnUrl'];
  }

  async login(username: string, password: string) {
    this.showSpinner = true;

    await this.authenticationService.login(username, password);

    this.authenticationService.isAuthenticated.subscribe((isAuthenticated: boolean) => {
      if(isAuthenticated) {
        if(this.redirectUrl) {
          this.router.navigate([this.redirectUrl]);//.catch((err) => this.router.navigate(['admin-management']));

        } else {
          this.router.navigate(['dashboard']);
        }

      } else {
        this.showSpinner = false;
      }
    });
  }

  changeLanguage() {
    this.translateService.currentLang == 'en' ? this.translateService.use('ar') : this.translateService.use('en');
  }
}
