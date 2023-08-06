import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

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

  modifyQty(prodId: number, inc_dec: string) {
    const prod = this.realCart.filter((prod) => prod.id === prodId)[0];
    const indexToReplace = this.realCart.findIndex(
      (prod) => prod.id === prodId
    );
    if (prod) {
      if (inc_dec === 'inc') {
        if (prod.qty) {
          prod.qty = prod.qty + 1;
        } else {
          prod.qty = 1;
        }
        console.log(prodId, 'added', 'clog');
      } else if (inc_dec === 'dec') {
        if (prod.qty) {
          prod.qty = prod.qty - 1;
        } else {
          prod.qty = 1;
        }
        console.log(prodId, 'sub', 'clog');
      }
      this.realCart[indexToReplace] = prod;
      localStorage.setItem('localCart', JSON.stringify(this.realCart));
    }
    this.getTotalAmt();
  }

  getTotalAmt() {
    this.grossTotal = this.realCart.reduce(
      (sum, product) => sum + product.price * product.qty!,
      0
    );
  }

  emptyTheCart() {
    this.productService.emptyTheCart();
    this.realCart = [];
    this.getTotalAmt();
  }

  ngOnDestroy(): void {
    this.cartItemUpdatedSubscription.unsubscribe();
  }
}
