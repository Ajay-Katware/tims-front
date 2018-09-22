import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { Observable } from 'rxjs/Observable';
import { of }         from 'rxjs/observable/of';
import 'rxjs/add/operator/delay';

@Injectable()
export class ToasterService {

  constructor(private snackBar: MatSnackBar) { }

  showToaster(message: string, action: string, duration:number):void{
    console.log("------------------------------"+message)
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  openSuccessSnackBar(message: string,action: string, duration:number) {
    this.snackBar.open(message, action, {
      panelClass: ['mat--success'],
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      duration: duration
    });
  }

  openErrorSnackBar(message: string,action: string, duration:number) {
    this.snackBar.open(message, action, {
      panelClass: ['mat--errors'],
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      duration: duration
    });
  }


}


