import {Component, inject} from '@angular/core';
import { MatSnackBarRef} from '@angular/material/snack-bar';


@Component({
    selector: 'app-popup',
    templateUrl: 'popup.component.html',
    styles:  'popup.component.css',
  })

  export class PopUpComponent {
    snackBarRef = inject(MatSnackBarRef);
  }