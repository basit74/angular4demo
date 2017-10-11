import { ShoppingCart } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Product } from '../../models/product';
import { Component, Input} from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') p :Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') cart: ShoppingCart;

  constructor( private cartService: ShoppingCartService) { }

  addToCart( ) {
   this.cartService.addToCart( this.p );
  }

  

}