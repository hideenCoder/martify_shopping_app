import { Component, OnInit } from '@angular/core';
import { CartService } from "../../services/cart.service";
import { CartModelServer } from "../../models/cart.model";
import { UserModelClient } from "../../models/user.model";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'mg-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartData: CartModelServer;
  cartTotal: Number;
  subTotal: Number;
  User: UserModelClient = null;

  constructor(public cartService: CartService, private _authService: AuthService) {
    this._authService.currentUser.subscribe(currentUser => {
      this.User = currentUser
    })
  }

  ngOnInit() {
    this.cartService.cartDataObs$.subscribe(data => this.cartData = data);
    this.cartService.cartTotal$.subscribe(total => this.cartTotal = total);
    let getUser = JSON.parse(localStorage.getItem('user'));
    this._authService.currentUser.next(getUser);
  }

  ChangeQuantity(id: Number, increaseQuantity: Boolean) {
    this.cartService.UpdateCartData(id, increaseQuantity);
  }

}
