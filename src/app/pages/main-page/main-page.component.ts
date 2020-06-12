import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { BasketComponent } from "../basket/basket.component";
import { BasketService } from "../../shared/services/basket.service";
import { AuthService } from "../../shared/services/auth.service";
import { AuthComponent } from "../auth/auth.component";
import { MatSnackBar } from "@angular/material/snack-bar";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public basket: BasketService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {}


  openBasket(): void {
    this._dialog.open(BasketComponent, {
      panelClass: 'basket-modal'
    })
  }

  openAuthDialog(): void {
    this._dialog.open(AuthComponent, {
      width: '40%',
      autoFocus: false
    })
  }

  logout() {
    this.auth.logout()
      .then(
        (success) => this._snackBar.open('Вы успешно вышли с системы.', null,
          {duration: 4000, verticalPosition: 'top'}),
        (error) => console.error(error)
      )
  }

}
