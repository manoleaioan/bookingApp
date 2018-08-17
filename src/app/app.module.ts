import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiConnectionService } from './services/api-connection/api-connection.service';

import { AppComponent } from './app.component';
import { PageHeaderComponent } from './components/shared/page-header/page-header.component';
import { LoginComponent } from './components/shared/login/login.component';
import { PageFooterComponent } from './components/shared/page-footer/page-footer.component';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './components/shared/profile/profile.component';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { BooknowComponent } from './components/shared/booknow/booknow.component';
import { BookingsComponent } from './components/admin/bookings/bookings.component';
import { CalendarComponent } from './components/admin/calendar/calendar.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent,canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
  { path: 'bookings', component: BookingsComponent,canActivate: [AuthGuard] },
  { path: 'calendar', component: CalendarComponent,canActivate: [AuthGuard] },
  { path: 'book', component: BooknowComponent },

  { path: '**', redirectTo: 'book' }
];
@NgModule({
  declarations: [
    AppComponent,
    PageHeaderComponent,
    LoginComponent,
    PageFooterComponent,
    ProfileComponent,
    DashboardComponent,
    BooknowComponent,
    BookingsComponent,
    CalendarComponent,

  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { useHash: true }),
  ],
  providers: [ApiConnectionService, AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
