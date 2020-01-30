import { WelcomeComponent } from './page/welcome/welcome.component';

import { MyAppMoComponent } from './my-app-mo/my-app-mo.component';
import { AuthGuardGuard } from './service/auth-guard.guard';
import { AdminGuardGuard } from './service/admin-guard.guard';
import { LoggingServiceService } from './service/loggingService.service';
import { SettingService } from './service/setting.service';
import { SettingComponent } from './page/setting/setting.component';
import { SystemService } from './service/system.service';
import { UserServiceService } from './service/user-service.service';
import { DeviceServiceService } from './service/device-service.service';
import { ColorService } from './service/color.service';
import { LineChartLiveComponent } from './page/dashboard/line-chart-live/line-chart-live.component';
import { HorizonChartDeviceLocationComponent } from './page/dashboard/horizon-chart-device-location/horizon-chart-device-location.component';
import { DonutChartAllDeviceComponent } from './page/dashboard/donut-chart-all-device/donut-chart-all-device.component';
import { Report05Component } from './page/report05/report05.component';
import { Report04Component } from './page/report04/report04.component';
import { Report03Component } from './page/report03/report03.component';
import { Report02Component } from './page/report02/report02.component';
import { MatModuleModule } from './mat-module/mat-module.module';
import { DataService } from './service/data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SingInComponent } from './sing-in/sing-in.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { DatabaseComponent } from './page/database/database.component';
import { ReportComponent } from './page/report/report.component';
import { AlertComponent } from './page/alert/alert.component';
import { ManagementComponent } from './page/management/management.component';
import { LiveDownDeviceComponent } from './page/dashboard/live-down-device/live-down-device.component';
import { DataTablesModule } from 'angular-datatables';
import { NotifyLogComponent } from './page/dashboard/notify-log/notify-log.component';
import { DashboardService } from './service/dashboard.service';
import { AddUserComponent } from './page/management/add-user/add-user.component';
import { AddDeviceComponent } from './page/management/add-device/add-device.component';
import { AllDeviceComponent } from './page/management/all-device/all-device.component';
import { AllUserComponent } from './page/management/all-user/all-user.component';
import { DeviceDetailComponent } from './page/device-detail/device-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';


const routes: Routes = [
   {
      path: '',
      component: SingInComponent
   },
   {
      path: 'singIn',
      component: SingInComponent
   },
   {
      path: 'main',
      component: MyAppMoComponent,
      children: [
         {
            path: 'devicedetail/:ip', 
            component: DeviceDetailComponent,
            canActivate: [AuthGuardGuard]
         },
         {
            path: '',
            component: DashboardComponent,
            canActivate: [AuthGuardGuard]
         },
         {
            path: 'dashboard',
            component: DashboardComponent,
            canActivate: [AuthGuardGuard]
         },
         {
            path: 'database', 
            component: DatabaseComponent,
            canActivate: [AuthGuardGuard]
         },
         {
            path: 'report', 
            component: ReportComponent,
            canActivate: [AuthGuardGuard]
         },
         {
            path: 'report02', 
            component: Report02Component,
            canActivate: [AuthGuardGuard]
         },
         {
            path: 'report03', 
            component: Report03Component,
            canActivate: [AuthGuardGuard]
         },
         {
            path: 'report04', 
            component: Report04Component,
            canActivate: [AuthGuardGuard]
         },
         {
            path: 'report05', 
            component: Report05Component,
            canActivate: [AuthGuardGuard]
         },
         {
            path: 'alert', 
            component: AlertComponent,
            canActivate: [AuthGuardGuard]
         },
         {
            path: 'management', 
            component: ManagementComponent,
            canActivate: [AuthGuardGuard,AdminGuardGuard]
         },
        
         {
            path: 'setting', 
            component: SettingComponent,
            canActivate: [AuthGuardGuard]
         },
      ],
      canActivate: [AuthGuardGuard]
   },
];

// ! debug propose ------------------------------------------------------------------------------------------


// const routes: Routes = [
//    {
//       path: '',
//       component: SingInComponent
//    },
//    {
//       path: 'singIn',
//       component: SingInComponent
//    },
//    {
//       path: 'main',
//       component: MyAppMoComponent,
//       children: [
//          {
//             path: 'devicedetail/:ip', 
//             component: DeviceDetailComponent,
//          },
//          {
//             path: '',
//             component: DashboardComponent,
//             canActivate: []
//          },
//          {
//             path: 'dashboard',
//             component: DashboardComponent,
//             canActivate: []
//          },
//          {
//             path: 'database', 
//             component: DatabaseComponent,
//             canActivate: []
//          },
//          {
//             path: 'report', 
//             component: ReportComponent,
//             canActivate: []
//          },
//          {
//             path: 'report02', 
//             component: Report02Component,
//             canActivate: []
//          },
//          {
//             path: 'report03', 
//             component: Report03Component,
//             canActivate: []
//          },
//          {
//             path: 'report04', 
//             component: Report04Component,
//             canActivate: []
//          },
//          {
//             path: 'report05', 
//             component: Report05Component,
//             canActivate: []
//          },
//          {
//             path: 'alert', 
//             component: AlertComponent,
//             canActivate: []
//          },
//          {
//             path: 'management', 
//             component: ManagementComponent,
//             canActivate: []
//          },
        
//          {
//             path: 'setting', 
//             component: SettingComponent,
//             canActivate: []
//          }
//       ],
//       canActivate: []
//    },
// ];


@NgModule({
   declarations: [
      AppComponent,
      SingInComponent,
      MyAppMoComponent,
      DashboardComponent,
      DatabaseComponent,
      ReportComponent,
      Report02Component,
      Report03Component,
      Report04Component,
      Report05Component,
      AlertComponent,
      ManagementComponent,
      DeviceDetailComponent,
      SettingComponent,
      LineChartLiveComponent,
      DonutChartAllDeviceComponent,
      HorizonChartDeviceLocationComponent,
      AddUserComponent,
      AddDeviceComponent,
      AllDeviceComponent,
      AllUserComponent,
      LiveDownDeviceComponent,
      NotifyLogComponent,
      WelcomeComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      RouterModule.forRoot(routes),
      DataTablesModule,
      BrowserAnimationsModule,
      MatModuleModule,
      MatNativeDateModule,
      ReactiveFormsModule,
      NgbModule,
   ],
   providers: [
      DataService,
      DashboardService,
      ColorService,
      DeviceServiceService,
      UserServiceService,
      SystemService,
      DatePipe,
      SettingService,
      LoggingServiceService,
      AdminGuardGuard,
      AuthGuardGuard
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: []
})
export class AppModule { }
