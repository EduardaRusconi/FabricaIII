import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { PopUpComponent } from 'src/app/popup';
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'app-subscribe',
  templateUrl: 'subscribe.componenet.html',
  styleUrls: ['subscribe.componenet.css'],
})
export class SelectCustomTriggerExample implements OnInit {
  durationInSeconds = 10;


  constructor(private _snackBar: MatSnackBar) {}

  openSnackBar() {
    this._snackBar.openFromComponent(PopUpComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
}

