import { Injectable } from "@angular/core";
import { Guitar } from "../interfaces/guitar.interface";
import {BasketItem} from "../interfaces/basket.interface";

@Injectable({
  providedIn: 'root'
})

export class BasketService {
  private basket: BasketItem[] = [];

  constructor() {
    let cartStorage = JSON.parse(localStorage.getItem('cart'));
    if (cartStorage !== null) {
      this.basket = cartStorage;
    }
  }


  getItems(): BasketItem[] {
    return this.basket;
  }

  setBasketItem(guitar: Guitar) {
    const item = {
      product: guitar,
      count: 1,
      prices: {
        price: guitar.price,
        salePrice: guitar.salePrice
      }
    };

    this.basket.push(item)

    localStorage.setItem('cart', JSON.stringify(this.basket));
  }

  removeItem(i) {
    this.basket.splice(i, 1);
    localStorage.setItem('cart', JSON.stringify(this.basket));
  }

}
