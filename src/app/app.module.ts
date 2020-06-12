import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";

import { SlickCarouselModule } from "ngx-slick-carousel";

import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { GuitarPageComponent } from './pages/guitar-page/guitar-page.component';
import { GuitarCardComponent } from './pages/main-page/guitar-card/guitar-card.component';
import { GuitarsComponent } from './pages/main-page/guitars/guitars.component';
import { AvailabilityComponent } from './shared/components/availability/availability.component';
import { PriceComponent } from './shared/components/price/price.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { CreateReviewComponent } from './pages/reviews/create-review/create-review.component';
import { AlertComponent } from './pages/reviews/create-review/create-alert/alert.component';
import { CountValPipe } from './shared/pipes/count-val.pipe';
import { GuitarDetailsComponent } from './pages/guitar-page/guitar-details/guitar-details.component';
import { BasketComponent } from './pages/basket/basket.component'
import { LoginComponent } from './pages/auth/login/login.component';
import { RegistrationComponent } from './pages/auth/registration/registration.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AlertMessageComponent } from './shared/components/alert-message/alert-message.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';

import { registerLocaleData } from "@angular/common";
import localeRu from "@angular/common/locales/ru";

registerLocaleData(localeRu);

const firebaseConfig = {
  apiKey: "AIzaSyD0laEcGkuhYHuzlF0nxshxUx3eBxcJYdY",
  authDomain: "guitar-center-ee2f7.firebaseapp.com",
  databaseURL: "https://guitar-center-ee2f7.firebaseio.com",
  projectId: "guitar-center-ee2f7",
  storageBucket: "guitar-center-ee2f7.appspot.com",
  messagingSenderId: "1063822113892",
  appId: "1:1063822113892:web:e78fb79c6d9536846df371"
};


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    GuitarPageComponent,
    GuitarCardComponent,
    GuitarsComponent,
    AvailabilityComponent,
    PriceComponent,
    ReviewsComponent,
    CreateReviewComponent,
    AlertComponent,
    CountValPipe,
    GuitarDetailsComponent,
    BasketComponent,
    LoginComponent,
    RegistrationComponent,
    AuthComponent,
    AlertMessageComponent,
    SpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    SlickCarouselModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    MatSnackBarModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
