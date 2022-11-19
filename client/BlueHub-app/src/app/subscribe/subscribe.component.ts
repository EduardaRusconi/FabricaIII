import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-subscribe',
  templateUrl: 'subscribe.componenet.html',
  styleUrls: ['subscribe.componenet.css'],
})
export class SelectCustomTriggerExample implements OnInit {
  toppings = new FormControl('');

  toppingList: string[] = ['Patrocinador', 'Aluno'];
}