import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public itemsInCart = 0;
  public grossTotal = 0;
  public realCart: Product[] = [];
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    let localCart = localStorage.getItem('localCart');
    if (localCart) {
      this.realCart = JSON.parse(localCart);
      this.itemsInCart = localCart.length;
    }
    this.grossTotal = this.realCart.reduce(
      (sum, product) => sum + product.price,
      0
    );
  }

  onCheckout() {
    let userString = localStorage.getItem('user');
    if (userString) {
      localStorage.removeItem('localCart');
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
  }
}
