import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {GuitarPageComponent} from "./pages/guitar-page/guitar-page.component";
import {GuitarsComponent} from "./pages/main-page/guitars/guitars.component";
import {LoginComponent} from "./pages/auth/login/login.component";
import {RegistrationComponent} from "./pages/auth/registration/registration.component";


const routes: Routes = [
  {
    path: '', component: MainPageComponent, children: [
      {
        path: '', component: GuitarsComponent,
      },
      {
        path: 'guitar/:id', component: GuitarPageComponent
      },
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'registration', component: RegistrationComponent
      }
    ]
  },
  // {
  //   path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  // }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
