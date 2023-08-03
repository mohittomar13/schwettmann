import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';

import { MatUiModule } from '../mat-ui.module';

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule, 
    MatUiModule,
  ],
})
export class ShoppingModule {}
