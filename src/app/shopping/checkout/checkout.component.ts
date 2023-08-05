import { Component } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  orderId: string;

  constructor() {
    this.orderId = Math.random().toString(36).substring(2, 10).toUpperCase();
  }
}
