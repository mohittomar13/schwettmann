import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { RouterModule } from '@angular/router';
import { MatUiModule } from '../mat-ui.module';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [CartComponent, CheckoutComponent],
  imports: [
    CommonModule, 
    MatUiModule,
    RouterModule,
  ],
})
export class ShoppingModule {}
