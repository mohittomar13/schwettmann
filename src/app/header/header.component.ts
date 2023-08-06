import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription, filter } from 'rxjs';
import { ProductService } from '../services/product.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public isDebugEnabled = false;
  debugClearLocalCart(key: string) {
    localStorage.removeItem(key);
  }

  public cartCount = 0;
  public currentRoute: string | undefined;
  public isUserAuthenticated: boolean = false;
  private authEmitterSubs: Subscription = Subscription.EMPTY;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.checkIfCartUrlIsActive();

    this.checkUserAuthStatus();

    this.productService.itemsInCartEmitter.subscribe((cartItems) => {
      this.cartCount = cartItems.length;
    });

    let cartItems = localStorage.getItem('localCart');

    if (cartItems) {
      this.cartCount = JSON.parse(cartItems).length;
    }
  }

  checkIfCartUrlIsActive() {
    /**Applying a pipe on observable and subscribing to it only if event is of type NavigationEnd */
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.currentRoute =
          this.activatedRoute.root.firstChild?.snapshot?.url.join('/');
      });
  }

  checkUserAuthStatus(){
    if (localStorage.getItem('user')) {
      this.isUserAuthenticated = true;
    } else {
      this.authEmitterSubs = this.authService
        .getAuthStatusEmitter()
        .subscribe((isAuthOK) => {
          this.isUserAuthenticated = isAuthOK;
        });
    }
  }

  onLogout() {
    localStorage.removeItem('user');
    this.isUserAuthenticated = false;
  }

  loadCategoryItems(category: string) {
    if(this.currentRoute === 'cart') return;
    this.productService.loadCategoryItems(category);
  }

  startSearch(searchQuery: any) {
    this.productService.searchItem(searchQuery);
  }

  ngOnDestroy(): void {
    this.authEmitterSubs.unsubscribe();
  }
}
