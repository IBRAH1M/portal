import {Injectable, OnInit} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Authority} from '../model/Authority';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit, CanActivate, CanActivateChild {

  private authURL = environment.base_api_url + '/oauth/token';
  private userInfoUrl: string = environment.base_api_url + '/oauth/me';
  private storagePrefix = environment.storage_prefix;
  private appAuthorizationType = environment.app_authorization_type;
  private appAuthorizationToken = environment.app_authorization_token;
  public isAuthenticated = new BehaviorSubject<boolean>(true);

  constructor(private http: HttpClient,
              private router: Router) {
  }

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem(`${this.storagePrefix}isAuthenticated`))) {
      this.isAuthenticated.next(true);

    } else {
      this.isAuthenticated.next(false);

    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;
    let indicator = JSON.parse(localStorage.getItem(`${this.storagePrefix}isAuthenticated`));
    return indicator ? true : this.router.navigate([''], {queryParams: {returnUrl: state.url}});
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // return true;
    let indicator = JSON.parse(localStorage.getItem(`${this.storagePrefix}isAuthenticated`));
    return indicator ? true : this.router.navigate([''], {queryParams: {returnUrl: state.url}});
  }

  login(password: string, username: string): BehaviorSubject<boolean> {
    const body = `username=${username}&password=${password}&grant_type=password`;
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `${this.appAuthorizationType} ${this.appAuthorizationToken}`
      })
    };

    this.http.post(`${this.authURL}`, body, headers).subscribe((result: { scope: string, refresh_token: string, expires_in: number, token_type: string, access_token: string }) => {
      localStorage.setItem(`${this.storagePrefix}token_type`, result.token_type);
      localStorage.setItem(`${this.storagePrefix}access_token`, result.access_token);
      localStorage.setItem(`${this.storagePrefix}expires_in`, String(result.expires_in));
      localStorage.setItem(`${this.storagePrefix}refresh_token`, result.refresh_token);
      localStorage.setItem(`${this.storagePrefix}scope`, result.scope);
      localStorage.setItem(`${this.storagePrefix}isAuthenticated`, 'true');

      this.isAuthenticated.next(true);
      this.initSession();

      setTimeout(() => {
        this.logout();
      }, result.expires_in * 1000);
    });

    return this.isAuthenticated;
  }

  logout() {
    // todo send http logout
    localStorage.removeItem(`${this.storagePrefix}access_token`);
    localStorage.removeItem(`${this.storagePrefix}expires_in`);
    localStorage.removeItem(`${this.storagePrefix}refresh_token`);
    localStorage.removeItem(`${this.storagePrefix}scope`);
    localStorage.removeItem(`${this.storagePrefix}token_type`);

    this.isAuthenticated.next(false);
    this.clearSession();
  }

  initSession() {
    // this.http.get(this.userInfoUrl).subscribe((userInfo: { username: string, authorities: Authority[], role: string }) => {
    //   sessionStorage.setItem(`${this.storagePrefix}username`, userInfo.username);
    //   sessionStorage.setItem(`${this.storagePrefix}authorities`, JSON.stringify(userInfo.authorities));
    //   sessionStorage.setItem(`${this.storagePrefix}role`, userInfo.role);
    // });
    this.http.get(this.userInfoUrl).subscribe((userInfo: { username: string, authorities: Authority[], role: string }) => {
      localStorage.setItem(`${this.storagePrefix}username`, userInfo.username);
      localStorage.setItem(`${this.storagePrefix}role`, userInfo.role);
      localStorage.setItem(`${this.storagePrefix}authorities`, JSON.stringify(userInfo.authorities));
    });
  }

  clearSession() {
    //   sessionStorage.removeItem(`${this.storagePrefix}username`);
    //   sessionStorage.removeItem(`${this.storagePrefix}role`);
    //   sessionStorage.removeItem(`${this.storagePrefix}authorities`);
    localStorage.removeItem(`${this.storagePrefix}username`);
    localStorage.removeItem(`${this.storagePrefix}role`);
    localStorage.removeItem(`${this.storagePrefix}authorities`);
  }
}
