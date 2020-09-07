import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeChangeService {
  private theme = new Subject<string>();

  constructor() {
  }

  getTheme(): Observable<string> {
    return this.theme.asObservable();
  }

  setTheme(theme: string): void {
    this.theme.next(theme);
  }
}
