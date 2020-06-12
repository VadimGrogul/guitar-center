import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {FormControl, FormGroup, Validators } from "@angular/forms";
import { GuitarsService } from "../../../shared/services/guitars.service";
import { AuthService } from "../../../shared/services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import {MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AuthComponent } from "../auth.component";
import { AlertService } from "../../../shared/services/alert.service";
import { CreateReviewComponent } from "../../reviews/create-review/create-review.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @Input() dialogData: {needLogin: string, guitarId: number};

  public loginForm: FormGroup;
  public loading = false;

  constructor(
    private _guitars: GuitarsService,
    private _auth: AuthService,
    private _dialogRef: MatDialogRef<AuthComponent>,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private _alert: AlertService,
    private _cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    })
  }

  ngAfterViewInit(): void {
    if (this.dialogData) {
      this._alert.success(this.dialogData.needLogin);
      this._cdRef.detectChanges();
    }
  }

  showMassage() {
    this._snackBar.open('Вы успешно вошли в систему!', null,
      {duration: 5000, verticalPosition: 'top'}
      );
  }

  onSubmit() {
    this.loading = true;
    const { email, password } = this.loginForm.value;

    this._auth.login(email, password)
      .then(
        (success) => {
          this._dialogRef.close();
          if (this.dialogData) {
            this._dialog.open(CreateReviewComponent, {
              data: {
                id: this.dialogData.guitarId
              },
              autoFocus: false
            })
          }
          this.showMassage();
          this.loading = false;
        },
        (error) => {
          switch (error.code) {
            case 'auth/user-not-found':
              this._alert.danger('Пользователя с таким E-Mail не существует.');
              this.loading = false;
              break;

            case 'auth/wrong-password':
              this._alert.danger('Пароль не верный.');
              this.loading = false;
              break;

            default:
              this._alert.danger('Что то пошло не так, побробуйте еще раз.');
              this.loading = false;

          }
        }
      )
  }

  toRegisterPage() {
    this._auth.authType.next('registration');
  }

}
