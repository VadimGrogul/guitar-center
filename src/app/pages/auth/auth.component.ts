import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public authType: 'login' | 'registration';

  constructor(
    private _auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public dialogData
  ) { }

  ngOnInit(): void {
    this._auth.authType.subscribe(type => {
      this.authType = type;
    })
  }

}
