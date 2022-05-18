import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { MetricsComponent } from './metrics/metrics.component';
import { OrgComponent } from './org/org.component';
import { ErrorComponent } from './error/error.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    component: PortfolioComponent,
  },
  {
    path: 'org',
    component: OrgComponent,
  },
  {
    path: 'metrics',
    component: MetricsComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
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
