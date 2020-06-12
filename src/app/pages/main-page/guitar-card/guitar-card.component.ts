import { Component, Input, OnInit } from '@angular/core';
import { Guitar } from "../../../shared/interfaces/guitar.interface";
import { BasketService } from "../../../shared/services/basket.service";
import { MatDialog } from "@angular/material/dialog";
import { BasketComponent } from "../../basket/basket.component";


@Component({
  selector: 'app-guitar-card',
  templateUrl: './guitar-card.component.html',
  styleUrls: ['./guitar-card.component.scss']
})
export class GuitarCardComponent implements OnInit {


  @Input() guitar: Guitar;

  constructor(
    private _basket: BasketService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {}

  addToBasket() {
    this._basket.setBasketItem(this.guitar);
    this._dialog.open(BasketComponent, {
      panelClass: 'basket-modal'
    });
  }

  openBasket() {
    this._dialog.open(BasketComponent, {
      panelClass: 'basket-modal'
    })
  }

  isOnBasket(id): boolean {
    let isBought = this._basket.getItems().find(el => {
      return el.product.id === id;
    })

    return isBought ? true : false;
  }

}
