import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

export class CheckoutGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const userString = localStorage.getItem('user');
    const cartString = localStorage.getItem('localCart');
    let user;
    let cart;
    if (userString && cartString) {
      user = JSON.parse(userString);
      cart = JSON.parse(cartString);
    }

    if (user && cart.length > 0) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
