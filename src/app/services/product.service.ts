import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [];
  public productsUpdatedSubject = new Subject<Product[]>();

  public itemsInCartEmitter = new EventEmitter<Product[] | []>();
  private url: string = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  public loadProducts() {
    this.http.get<Product[]>(`${this.url}`).subscribe((response) => {
      this.products = response;
      this.productsUpdatedSubject.next(this.products);
    });
  }

  public addToCart_Local(product: Product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([product]));
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(product);
      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.itemsInCartEmitter.emit(cartData);
  }

  searchItem(searchQuery: string) {
    if(searchQuery && searchQuery.length){
      this.http
        .get<Product[]>(`${this.url}?query=${searchQuery.toLowerCase()}`)
        .subscribe((response) => {
          this.products = response;
          this.productsUpdatedSubject.next(this.products);
        });
    } else {
      this.loadProducts();
    }
  }

  loadCategoryItems(category: string) {
    switch (category) {
      case 'men':
        console.log('men clicked', 'clog');
        this.http
          .get<Product[]>(`${this.url}?category=Men`)
          .subscribe((response) => {
            console.log(response, 'response', 'clog');
            this.products = response;
            this.productsUpdatedSubject.next(this.products);
          });
        break;

      case 'women':
        console.log('women clicked', 'clog');
        this.http
          .get<Product[]>(`${this.url}?category=Women`)
          .subscribe((response) => {
            console.log(response, 'response', 'clog');
            this.products = response;
            this.productsUpdatedSubject.next(this.products);
          });
        break;

      case 'kids':
        console.log('kids clicked', 'clog');
        this.http
          .get<Product[]>(`${this.url}?category=Children`)
          .subscribe((response) => {
            console.log(response, 'response', 'clog');
            this.products = response;
            this.productsUpdatedSubject.next(this.products);
          });
        break;

      case 'sports':
        console.log('sports clicked', 'clog');
        this.http
          .get<Product[]>(`${this.url}?category=Sports`)
          .subscribe((response) => {
            console.log(response, 'response', 'clog');
            this.products = response;
            this.productsUpdatedSubject.next(this.products);
          });
        break;

      default:
        this.loadProducts();
        break;
    }
  }
}
