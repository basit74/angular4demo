import { ShoppingCart } from '../models/shopping-cart';
import { async } from '@angular/core/testing';
import { Product } from '../models/product';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ShoppingCartService {

  constructor( private db: AngularFireDatabase) { }

  addToCart( product: Product ) {
    this.updateItem( product, 1 );
  }

  removeFromCart( product: Product ) {
    this.updateItem( product, -1 );
  }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .map(x => new ShoppingCart(x.items));
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object("/shopping-carts/"+  cartId).remove();
  }

  private create() {
   return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    })
  }

  private getItem( cartId: string, itemId: string ) {
    return this.db.object("/shopping-carts/" + cartId + "/items/" + itemId );
  }
  
  private async getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    
    if( cartId ) return cartId;

    let result = await this.create();
    localStorage.setItem('cartId', result.key);

    return result.key;
   
  }

  private async updateItem( product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem( cartId, product.$key );

    item$.take(1).subscribe(item => {
        let quantity = ( item.quantity || 0 ) + change;
        if( quantity === 0 ) item$.remove();
        else item$.update({  
                title: product.title, 
                category: product.category, 
                price: product.price, 
                imageUrl: product.imageUrl, 
                quantity:  quantity});
            });
  }

}
