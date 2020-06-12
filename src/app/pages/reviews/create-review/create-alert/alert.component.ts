import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor(private _matDialog: MatDialogRef<AlertComponent>) { }

  ngOnInit(): void {
    setTimeout(() => {
      this._matDialog.close();
    }, 3000)
  }

}
