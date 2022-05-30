import { SplashscreenComponent } from './splashscreen/splashscreen.component';
import { TabHostComponent } from './tab-host/tab-host.component';
import { SwipeHostComponent } from './swipe-host/swipe-host.component';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    component: TabHostComponent,
    children: [
      {
        path: '',

        component: SwipeHostComponent,
      },
    ],
  },
  {
    path: 'splash',
    component: SplashscreenComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
