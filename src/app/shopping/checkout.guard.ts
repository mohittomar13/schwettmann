import { CanActivateFn } from '@angular/router';

export const checkoutGuard: CanActivateFn = (route, state) => {
  /** TODO: Check the auth using AuthService and not localstorage*/
  /** TODO: Remove localstorage based route-guard */
  if(localStorage.getItem('user')){
    return true;
  } else {
    return false;
  }

  // return true;
};
