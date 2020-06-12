import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AlertService} from "../../services/alert.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit, OnDestroy {
  @Input() delay = 6000;
  type = 'success';
  message: string;

  private aSub: Subscription;

  constructor(
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.aSub = this.alert.aSubj.subscribe(alert => {
      this.message = alert.message;
      this.type = alert.type;

      const timer = setTimeout(() => {
        this.message = '';
        clearInterval(timer)
      }, this.delay);
    })
  }

  ngOnDestroy(): void {
    if (this.aSub)  {
      this.aSub.unsubscribe();
    }
  }

}
