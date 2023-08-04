import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public cartCount = 0;
  public isUserAuthenticated: boolean = false;
  private authEmitterSubs: Subscription = Subscription.EMPTY;

  constructor(
    private authService: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    if(localStorage.getItem('user')){
      this.isUserAuthenticated = true;
    } else {
      this.authEmitterSubs = this.authService
        .getAuthStatusEmitter()
        .subscribe((isAuthOK) => {
          this.isUserAuthenticated = isAuthOK;
        });
    }

    let cartItems = localStorage.getItem('localCart');
    if (cartItems) {
      this.cartCount = JSON.parse(cartItems).length;
    }

    this.productService.itemsInCartEmitter.subscribe(cartItems => {
      this.cartCount = cartItems.length;
    })
  }

  onLogout() {
    localStorage.removeItem('user');
    this.isUserAuthenticated = false;
  }

  ngOnDestroy(): void {
    this.authEmitterSubs.unsubscribe();
  }
}
