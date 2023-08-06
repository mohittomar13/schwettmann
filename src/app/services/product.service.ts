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
    let cartData: Product[] = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([product]));
    } else {
      cartData = JSON.parse(localCart);

      let matchingProd = cartData.find(prod => prod.id === product.id)
      if(matchingProd){
        matchingProd.qty = matchingProd.qty! + 1;
        const index = cartData.findIndex(prod => prod.id === product.id);
        cartData[index] = matchingProd;
      } else {
        cartData.push(product);
      }

      localStorage.setItem('localCart', JSON.stringify(cartData));
    }
    this.itemsInCartEmitter.emit(cartData);
  }

  searchItem(searchQuery: string) {
    if (searchQuery && searchQuery.length) {
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
        this.http
          .get<Product[]>(`${this.url}?category=Men`)
          .subscribe((response) => {
            this.products = response;
            this.productsUpdatedSubject.next(this.products);
          });
        break;

      case 'women':
        this.http
          .get<Product[]>(`${this.url}?category=Women`)
          .subscribe((response) => {
            this.products = response;
            this.productsUpdatedSubject.next(this.products);
          });
        break;

      case 'kids':
        this.http
          .get<Product[]>(`${this.url}?category=Children`)
          .subscribe((response) => {
            this.products = response;
            this.productsUpdatedSubject.next(this.products);
          });
        break;

      case 'sports':
        this.http
          .get<Product[]>(`${this.url}?category=Sports`)
          .subscribe((response) => {
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
