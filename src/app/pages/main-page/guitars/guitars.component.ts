import { Component, OnInit } from '@angular/core';
import { GuitarsService } from "../../../shared/services/guitars.service";
import { Guitar } from "../../../shared/interfaces/guitar.interface";

@Component({
  selector: 'app-guitars',
  templateUrl: './guitars.component.html',
  styleUrls: ['./guitars.component.scss']
})
export class GuitarsComponent implements OnInit {
  public guitars: Guitar[];

  constructor(private _guitarsService: GuitarsService) { }

  ngOnInit(): void {
    this._guitarsService.getGuitars()
      .subscribe(res => {
        this.guitars = res;
      })
  }

}
