import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public products: Product[] = [];
  isLoading: boolean = false;
  isImageLoaded: boolean = true; /**TODO: Work on image skeleton */

  constructor(
    private productService: ProductService,
    private renderer2: Renderer2
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.productService.loadProducts().subscribe((response) => {
      if (response) {
        this.products = response;
        this.isLoading = false;
        this.attachImageLoadListener();
      }
    });
  }

  onImageLoad() {
    this.isImageLoaded = true;
  }

  private attachImageLoadListener() {
    const images = document.querySelectorAll('img[mat-card-image]');

    images.forEach((image) => {
      this.renderer2.listen(image, 'load', () => {
        this.onImageLoad();
      });
    });
  }

  onAddToCart(product: Product) {
    console.log(product, 'product', 'clog');
    if(localStorage.getItem('user')){
      /** TODO if user is logged in */
    } else {
      this.productService.addToCart_Local(product);
    }
  }

  ngOnDestroy(): void {}
}
