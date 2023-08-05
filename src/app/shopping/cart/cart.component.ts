import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy {
  public itemsInCart = 0;
  public grossTotal = 0;
  public realCart: Product[] = [];
  private cartItemUpdatedSubscription = Subscription.EMPTY;
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    let localCart = localStorage.getItem('localCart');
    if (localCart) {
      this.realCart = JSON.parse(localCart);
      this.itemsInCart = localCart.length;
    }

    this.cartItemUpdatedSubscription =
      this.productService.productsUpdatedSubject.subscribe((products) => {
        this.realCart = products;
      });

    this.getTotalAmt();
  }

  onCheckout() {
    if (this.realCart.length <= 0) {
      return;
    }
    let userString = localStorage.getItem('user');
    if (userString) {
      setTimeout(() => {
        localStorage.removeItem('localCart');
      }, 1000);
      this.realCart = [];
      this.productService.itemsInCartEmitter.emit(this.realCart);
      this.router.navigate(['/checkout']);
    } else {
      this.router.navigate(['/signin']);
    }
  }

  removeItem(product: Product) {
    this.realCart = this.realCart.filter((item) => item.id != product.id);
    localStorage.setItem('localCart', JSON.stringify(this.realCart));
    this.productService.itemsInCartEmitter.emit(this.realCart);
    this.getTotalAmt();
  }

  getTotalAmt() {
    this.grossTotal = this.realCart.reduce(
      (sum, product) => sum + product.price,
      0
    );
  }

  ngOnDestroy(): void {
    this.cartItemUpdatedSubscription.unsubscribe();
  }
}
