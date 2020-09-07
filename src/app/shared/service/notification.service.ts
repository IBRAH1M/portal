import {Injectable} from '@angular/core';
import {MatSnackBar, MatSnackBarRef} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) {
  }

  /*
      message: string; The message to show in the snackbar.
      action: string; The label for the snackbar action.
      config?: MatSnackBarConfig<any>; Additional configuration options for the snackbar.
   */
  show(message: string, action: string, config?: any): MatSnackBarRef<any> {
    let c: any = config ? config : {duration: 2000};

    return this._snackBar.open(message, action, c);
  }
}
