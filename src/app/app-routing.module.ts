import { MetricsComponent } from './metrics/metrics.component';
import { OrgComponent } from './org/org.component';
import { ErrorComponent } from './error/error.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: PortfolioComponent },
  { path: 'org', component: OrgComponent },
  { path: 'metrics', component: MetricsComponent },
  { path: '', component: PortfolioComponent, pathMatch: 'full' },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
