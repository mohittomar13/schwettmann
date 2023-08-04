import { CanActivateFn } from '@angular/router';

export const checkoutGuard: CanActivateFn = (route, state) => {
  /** TODO: Check the auth using AuthService and not localstorage*/
  /** TODO: Remove localstorage based route-guard */
  const userString = localStorage.getItem('user');
  const cartString = localStorage.getItem('localCart');
  let user;
  let cart;
  if(userString && cartString){
    user = JSON.parse(userString);
    cart = JSON.parse(cartString);
  }

  if(user && cart.length > 0){
    return true;
  } else {
    return false;
  }

  // return true;
};
