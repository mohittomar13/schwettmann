import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public onLogin(userObj: any){
    console.log(userObj, 'userObj', 'clog');
  }
}
