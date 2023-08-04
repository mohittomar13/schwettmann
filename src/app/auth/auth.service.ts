import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStatusEmitter = new BehaviorSubject<boolean>(false);
  url: string = 'http://localhost:3000/user';

  constructor(private http: HttpClient) {}

  public getAuthStatusEmitter(): Observable<boolean> {
    return this.authStatusEmitter.asObservable();
  }

  public onSignin(userObj: any) {
    type User = { id: number; email: string; password: string }[];
    const { email: e, password: p } = userObj;
    this.http
      .get<User>(`${this.url}?email=${e}&password=${p}`)
      .subscribe((response) => {
        if (response[0]?.id) {
          this.authStatusEmitter.next(true);
          localStorage.setItem('user', JSON.stringify(response[0]));
        } else {
          /** TODO: login failed */
        }
      });
  }

  public onSignup(userObj: any): Observable<any> {
    return this.http.post(this.url, { ...userObj });
  }
}
