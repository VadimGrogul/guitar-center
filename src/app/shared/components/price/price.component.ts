import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

type Size = 'small' | 'normal';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit, OnChanges{
  @Input() price: number = null;
  @Input() salePrice: number = null;
  @Input() size: Size = 'normal';

  public total: number;
  public diff: number;

  constructor() { }

  ngOnInit(): void {
    this.calcPrice();
    // if (this.salePrice) {
    //   this.diff = this.price - this.salePrice;
    //   this.total = this.salePrice;
    // } else {
    //   this.total = this.price;
    // }
  }

  ngOnChanges(): void {
    this.calcPrice()
  }

  calcPrice() {
    if (this.salePrice) {
      this.diff = this.price - this.salePrice;
      this.total = this.salePrice;
    } else {
      this.total = this.price;
    }
  }

}

