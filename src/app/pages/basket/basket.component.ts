import { Component, OnInit } from '@angular/core';
import { BasketService } from "../../shared/services/basket.service";
import { Router } from "@angular/router";
import { MatDialogRef } from "@angular/material/dialog";
import { BasketItem } from "../../shared/interfaces/basket.interface";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  public basketItems: BasketItem[];

  constructor(
    private _basketService: BasketService,
    private _router: Router,
    private _dialogRef: MatDialogRef<BasketComponent>
  ) { }

  ngOnInit(): void {
    this.basketItems = this._basketService.getItems()
    this.calcTotal();
  }

  increment(idx) {
  //+
    this.basketItems[idx].count++;
    this.calcItemPrices(idx);
  }

  decrement(idx) {
  //  -
    if (this.basketItems[idx].count !== 1) {
      this.basketItems[idx].count--;
      this.calcItemPrices(idx);
    }
  }

  calcItemPrices(idx) {
    this.basketItems[idx].prices.price = this.basketItems[idx].product.price * this.basketItems[idx].count;
    this.basketItems[idx].prices.salePrice = this.basketItems[idx].product.salePrice * this.basketItems[idx].count;
  }

  calcTotal(): number {
    let total = 0;

    this.basketItems.forEach(item => {
      if (item.prices.salePrice) {
        total += item.prices.salePrice;
      } else {
        total += item.prices.price;
      }
    });

    return total;
  }

  openItem(id): void {
    this._router.navigate(['guitar', id]);
    this._dialogRef.close();
  }

  removeFromBasket(i) {
    this._basketService.removeItem(i);
  }
}
