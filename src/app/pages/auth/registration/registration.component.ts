import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../../shared/services/auth.service";
import { currentUser } from "../../../shared/interfaces/user.interface";
import { MatDialogRef } from "@angular/material/dialog";
import { AuthComponent } from "../auth.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AlertService } from "../../../shared/services/alert.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public registrationForm: FormGroup;

  public loading = false;

  constructor(
    private _auth: AuthService,
    private _dialogRef: MatDialogRef<AuthComponent>,
    private _snackBar: MatSnackBar,
    private _alert: AlertService
  ) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      name: new FormControl(null, [Validators.required]),
    })
  }

  showMessage() {
    this._snackBar.open('Поздравляем! Вы успешно зарегистрировались!', null,
      {duration: 5000, verticalPosition: 'top'}
      )
  }

  onSubmit() {
    this.loading = true;
    const user: currentUser =  {
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      name: this.registrationForm.value.name
    }
    this._auth.registerUser(user)
      .then(
        (success) => {
          this.showMessage();
          this._dialogRef.close();
          this.loading = false;
        },
        (error) => {
          switch (error.code) {
            case "auth/email-already-in-use":
              this._alert.danger('Пользователь с таким E-Mail уже существует.');
              this.loading = false;
              break;

            default:
              this._alert.danger('Что то пошло не так, побробуйте еще раз.');
              this.loading = false;
          }
        }
      )
  }

  toLoginPage() {
    this._auth.authType.next('login');
  }

}
