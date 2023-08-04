import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  public itemsInCartEmitter = new EventEmitter<Product[] | []>();
  private url: string = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  public loadProducts(): Observable<any> {
    return this.http.get<Product[]>(`${this.url}`);
  }

  public addToCart_Local(product: Product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart', JSON.stringify([product]));
    } else{
      cartData = JSON.parse(localCart);
      cartData.push(product);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.itemsInCartEmitter.emit(cartData);
  }
}
