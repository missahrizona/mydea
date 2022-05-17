import { HttpInterceptorService } from './services/http-interceptor.service';
import { ToggleLink } from './portfolio/child-classes/togglelink';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { SpeedDialModule } from 'primeng/speeddial';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

import { SwiperModule } from 'swiper/angular';

import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

import { NgParticlesModule } from 'ng-particles';

import { PortfolioComponent } from './portfolio/portfolio.component';
import { ErrorComponent } from './error/error.component';
import { OrgComponent } from './org/org.component';
import { MetricsComponent } from './metrics/metrics.component';
import { SettingsComponent } from './settings/settings.component';
import { IonicModule } from '@ionic/angular';
import { AppAssistant } from './portfolio/child-classes/AppAssistant';
import { AppDetailModalComponent } from './portfolio/child-classes/app-detail-modal/app-detail-modal.component';
import { DeleteModalComponent } from './portfolio/child-classes/delete-modal/delete-modal.component';
import { FeaturelistComponent } from './portfolio/child-classes/featurelist/featurelist.component';
import { TimelineComponent } from './portfolio/child-classes/timeline/timeline.component';
import { FabContentsComponent } from './portfolio/child-classes/fab-contents/fab-contents.component';
import { CreateappModalComponent } from './portfolio/child-classes/createapp-modal/createapp-modal.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    ErrorComponent,
    OrgComponent,
    MetricsComponent,
    SettingsComponent,
    AppDetailModalComponent,
    DeleteModalComponent,
    ToggleLink,
    FeaturelistComponent,
    TimelineComponent,
    FabContentsComponent,
    CreateappModalComponent,
    LoginComponent,
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
    SpeedDialModule,
    InputTextModule,
    ProgressSpinnerModule,
    ConfirmDialogModule,
    SwiperModule,
    IonicModule.forRoot(),
  ],
  providers: [
    MessageService,
    ConfirmationService,
    AppAssistant,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
