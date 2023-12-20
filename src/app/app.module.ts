import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpInterceptor } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Login/login/login.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { SidebarComponent } from './Shared/sidebar/sidebar.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { CommonalertpageComponent } from './Shared/commonalertpage/commonalertpage.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModuleModule } from './Shared/shared-module/shared-module.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    DatePipe,
    NgbModule,
    MatDialogModule,
    BrowserAnimationsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxPaginationModule,
    SharedModuleModule,
    NgxPaginationModule,
    SharedModuleModule,
    TimepickerModule,
    TimepickerModule.forRoot(),
  ],
  exports:[
    NgMultiSelectDropDownModule,
    TimepickerModule
  ],


  providers: [DatePipe,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
