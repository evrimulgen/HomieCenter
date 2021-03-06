import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {MaterialModule} from "./material.module";

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {appRoutes} from "./app.routes";
import {RouterModule} from "@angular/router";
import {ViewAboutComponent} from "./view-about/view-about.component";
import {ViewHomeComponent} from "./view-home/view-home.component";
import {AppInformationService} from "./service/app-information.service";
import {ApiUserService} from "./service/api-user.service";
import {ViewAuthenticationComponent} from "./view-authentication/view-authentication.component";
import {ViewSwitchDevicesComponent} from "./view-switch-devices/view-switch-devices-component";
import {ApiDeviceService} from "./service/api-device.service";
import {ViewCameraComponent} from "./view-camera/view-camera.component";
import {SafePipe} from "./safe-pipe";
import {ViewCameraDetailsComponent} from "./view-camera-details/view-camera-details.component";
import {ViewCameraEditComponent} from "./view-camera-edit/view-camera-edit.component";
import {ViewUserComponent} from "./view-user/view-user.component";
import {ViewUserEditComponent} from "./view-user-edit/view-user-edit.component";
import {AppHttpInterceptorService} from "./service/app-http-interceptor.service";
import {ViewErrorPageComponent} from "./view-error-page/view-error-page.component";
import {ViewDevicesComponent} from "./view-devices/view-devices.component";
import {
  TemperaturePipe,
  ViewHeatControllerDevicesComponent
} from "./view-heat-controller-devices/view-heat-controller-devices.component";
import {DialogTwoButtonsComponent} from "./dialog-two-buttons/dialog-two-buttons.component";
import {DialogOneButtonComponent} from "./dialog-one-button/dialog-one-button.component";
import {DialogDeviceStatsComponent} from "./dialog-device-stats/dialog-device-stats.component";
import {BarChartComponentComponent} from "./charts/bar-chart-component/bar-chart-component.component";
import {ChartsModule} from "ng2-charts";


@NgModule({
  declarations: [
    AppComponent,
    ViewAuthenticationComponent,
    ViewDevicesComponent,
    ViewSwitchDevicesComponent,
    ViewHeatControllerDevicesComponent,
    ViewCameraComponent,
    ViewCameraDetailsComponent,
    ViewCameraEditComponent,
    ViewUserComponent,
    ViewUserEditComponent,
    ViewAboutComponent,
    ViewHomeComponent,
    ViewErrorPageComponent,
    BarChartComponentComponent,
    DialogOneButtonComponent,
    DialogTwoButtonsComponent,
    DialogDeviceStatsComponent,
    SafePipe,
    TemperaturePipe
  ],
  entryComponents: [
    DialogOneButtonComponent,
    DialogTwoButtonsComponent,
    DialogDeviceStatsComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {onSameUrlNavigation:"reload"}),
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    ChartsModule,
    FormsModule
  ],
  providers: [
    ApiUserService,
    ApiDeviceService,
    AppInformationService,
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptorService, multi: true }
    ],
  bootstrap: [AppComponent]
})

export class AppModule {}
