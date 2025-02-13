import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: any[] = [];

  addToCart(item: any) {
    this.cart.push(item);
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
  }

  getCart() {
    return this.cart;
  }
}
