import { TabHostComponent } from './tab-host/tab-host.component';
import { SwipeHostComponent } from './swipe-host/swipe-host.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { OrgComponent } from './org/org.component';
import { ErrorComponent } from './error/error.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
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
      // {
      //   path: 'home',
      //   redirectTo: '',
      // },
      // {
      //   path: 'org',
      //   component: OrgComponent,
      // },
      // {
      //   path: 'profile',
      //   component: SettingsComponent,
      // },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'home',
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
