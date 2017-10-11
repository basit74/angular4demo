import { Observable } from 'rxjs/Observable';
import { ShoppingCart } from '../../../shared/models/shopping-cart';
import { ShoppingCartService } from '../../../shared/services/shopping-cart.service';
import { AppUser } from '../../../shared/models/app-user';
import { AuthService } from '../../../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit  {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
 
  constructor(
              private cartService: ShoppingCartService,
              private auth: AuthService
            ) { 
   
  }

  logout() {
    this.auth.logout()
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe( appUser => this.appUser = appUser );
    this.cart$ = await this.cartService.getCart();
   
  }
}
