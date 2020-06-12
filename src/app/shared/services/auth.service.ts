import { Injectable } from "@angular/core";
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';
import { currentUser } from "../interfaces/user.interface";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  public user: User;

  public authType = new BehaviorSubject<'login' | 'registration'>('login');

  constructor(
    private _afAuth: AngularFireAuth
  ) {
    this._afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        window.localStorage.setItem('user', JSON.stringify(user))
      } else {
        window.localStorage.setItem('user', null)
      }
    })
  }

  login(email: string, password: string) {
    return this._afAuth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this._afAuth.signOut()
      .then(res => {
        window.localStorage.removeItem('user');
    })
  }

  registerUser(user: currentUser) {
    return this._afAuth.createUserWithEmailAndPassword(user.email, user.password)
      .then(
        res => {
          this.user = res.user;
          this.user.updateProfile({
            displayName: user.name
          }).then(() => window.localStorage.setItem('user', JSON.stringify(this.user)))
        },
        error => console.log(error)
      )
  }

  get isLoggedIn() {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null;
  }
}
