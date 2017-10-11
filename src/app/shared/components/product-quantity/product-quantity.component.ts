import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {

  @Input('product') p :Product;
  @Input('shopping-cart') cart: ShoppingCart;

  constructor( private cartService: ShoppingCartService) { }

  addToCart( ) {
   this.cartService.addToCart( this.p );
  }

  removeFromCart() {
    this.cartService.removeFromCart( this.p );
  }



}
