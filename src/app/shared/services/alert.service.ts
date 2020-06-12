import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

type AlertType = 'danger' | 'success';

interface Alert {
  type: AlertType,
  message: string
}

@Injectable({
  providedIn: 'root'
})

export class AlertService {
  public aSubj = new Subject<Alert>();

  success(message) {
    this.aSubj.next({type: 'success', message});
  }

  danger(message) {
    this.aSubj.next({type: 'danger', message})
  }
}
