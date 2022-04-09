import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TimelineModule } from 'primeng/timeline';
import { MenubarModule } from 'primeng/menubar';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { ChartModule } from 'primeng/chart';
import { SidebarModule } from 'primeng/sidebar';
import { ListboxModule } from 'primeng/listbox';
import { TabViewModule } from 'primeng/tabview';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DividerModule } from 'primeng/divider';

import { NgParticlesModule } from 'ng-particles';

import { PortfolioComponent } from './portfolio/portfolio.component';
import { ErrorComponent } from './error/error.component';
import { OrgComponent } from './org/org.component';
import { MetricsComponent } from './metrics/metrics.component';
import { MessageService } from 'primeng/api';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    ErrorComponent,
    OrgComponent,
    MetricsComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    TimelineModule,
    MenubarModule,
    OrganizationChartModule,
    ChartModule,
    SidebarModule,
    ListboxModule,
    TabViewModule,
    ProgressSpinnerModule,
    ButtonModule,
    DialogModule,
    InputTextareaModule,
    ToastModule,
    HttpClientModule,
    CardModule,
    PanelModule,
    InputSwitchModule,
    DividerModule,
    NgParticlesModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
