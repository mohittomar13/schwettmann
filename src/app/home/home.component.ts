import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public products: Product[] = [];
  public productUpdateSubscription = Subscription.EMPTY;
  isLoading: boolean = false;
  isImageLoaded: boolean = true; /**TODO: Work on image skeleton */

  constructor(
    private productService: ProductService,
    private renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.productService.loadProducts();
    this.productUpdateSubscription =
      this.productService.productsUpdatedSubject.subscribe((respone) => {
        this.isLoading = false;
        this.products = respone;
      });
  }

  onImageLoad() {
    this.isImageLoaded = true;
  }

  // private attachImageLoadListener() {
  //   const images = document.querySelectorAll('img[mat-card-image]');
  //   images.forEach((image) => {
  //     this.renderer2.listen(image, 'load', () => {
  //       this.onImageLoad();
  //     });
  //   });
  // }

  onAddToCart(product: Product) {
    console.log(product, 'product', 'clog');
    // let userObjString = localStorage.getItem('user');
    // if (userObjString) {
    //   let user = JSON.parse(userObjString);
    // } else {
    //   this.productService.addToCart_Local(product);
    // }
    this.productService.addToCart_Local(product);
  }

  ngOnDestroy(): void {
    this.productUpdateSubscription.unsubscribe();
  }
}
