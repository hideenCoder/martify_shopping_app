import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../services/product.service";
import { ProductModelServer, serverResponse } from "../../models/product.model";
import { UserModelClient } from "../../models/user.model";
import { CartService } from "../../services/cart.service";
import { AuthService } from 'src/app/services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'mg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  products: ProductModelServer[] = [];
  User: UserModelClient = null;

  constructor(private productService: ProductService,
    private cartService: CartService,
    private router: Router,
    private _authService: AuthService) {
    this._authService.currentUser.subscribe(currentUser => {
      this.User = currentUser
    })
  }

  ngOnInit() {
    this.productService.getAllProducts(8).subscribe((prods: serverResponse) => {
      this.products = prods.products;
    });
    let getUser = JSON.parse(localStorage.getItem('user'));
    this._authService.currentUser.next(getUser);
  }

  AddProduct(id: Number) {
    this.cartService.AddProductToCart(id);
  }

  selectProduct(id: Number) {
    this.router.navigate(['/product', id]).then();
  }

  getCatProd(catagory){
    this.productService.getProductsFromCategory(catagory).subscribe((products: serverResponse) => {
      this.products = products.products;
    })
  }
}
