import { Component, OnInit } from '@angular/core';
import { CartService } from "../../services/cart.service";
import { CartModelServer } from "../../models/cart.model";
import { UserModelClient } from "../../models/user.model";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'mg-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: Number;
  changeMore: boolean;
  User: UserModelClient = null;

  constructor(public cartService: CartService,
    private router: Router,
    private _authService: AuthService) {
    this.changeMore = false;
    this._authService.currentUser.subscribe(currentUser => {
      this.User = currentUser
    })
  }

  ngOnInit() {
    this.cartService.cartTotal$.subscribe(total => {
      this.cartTotal = total;
    });
    let getUser = JSON.parse(localStorage.getItem('user'));
    this._authService.currentUser.next(getUser);

    this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    this._authService.currentUser.next(null)
    this.cartService.removeCartData();
    this.router.navigate(['/']);
  }

}
