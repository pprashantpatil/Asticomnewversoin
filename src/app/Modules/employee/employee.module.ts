import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {  BsDatepickerModule  } from 'ngx-bootstrap/datepicker';


import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeDashComponent } from './Dashboard/employee-dash/employee-dash.component';
import { AttendanceDetailsDashComponent } from './Attendance/attendance-details-dash/attendance-details-dash.component';
import { ShiftDetailsDashComponent } from './Attendance/shift-details-dash/shift-details-dash.component';
import { OverTimeDetailsDashComponent } from './Attendance/over-time-details-dash/over-time-details-dash.component';
import { AttendanceCorrectionDashComponent } from './Attendance/attendance-correction-dash/attendance-correction-dash.component';

import { LeaveRequestDashComponent } from './Requests/leave-request-dash/leave-request-dash.component';
import { TimesheetRequestDashComponent } from './Requests/timesheet-request-dash/timesheet-request-dash.component';
import { LocatorRequestDashComponent } from './Requests/locator-request-dash/locator-request-dash.component';
import { LoanRequestDashComponent } from './Requests/loan-request-dash/loan-request-dash.component';
import { EmployeeResignationDashComponent } from './Requests/employee-resignation-dash/employee-resignation-dash.component';

import { PoliciesDashComponent } from './Policies/policies-dash/policies-dash.component';

import { HolidaysDashComponent } from './Holidays/holidays-dash/holidays-dash.component';
import { AnnouncementsDashComponent } from './Announcements/announcements-dash/announcements-dash.component';

import { AttendanceReportComponent } from './Reports/attendance-report/attendance-report.component';
import { AttendanceCorrectionReportComponent } from './Reports/attendance-correction-report/attendance-correction-report.component';
import { LeaveReportComponent } from './Reports/leave-report/leave-report.component';
import { TimesheetReportComponent } from './Reports/timesheet-report/timesheet-report.component';

import { EmployeeCertificateDashComponent } from './EmployeeCertification/employee-certificate-dash/employee-certificate-dash.component';
import { HelpComponent } from './Help/help/help.component';
import { PayslipComponent } from './Payslip/payslip/payslip.component';
import { ShiftDetailsFormComponent } from './Attendance/shift-details-form/shift-details-form.component';
import { OverTimeDetailsFormComponent } from './Attendance/over-time-details-form/over-time-details-form.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModuleModule } from 'src/app/Shared/shared-module/shared-module.module';
import { NewLeaveRequestComponent } from './Requests/new-leave-request/new-leave-request.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { TimesheetformComponent } from './Requests/timesheetform/timesheetform.component';
import { MyAccountsettingModifyComponent } from './my-accountsetting-modify/my-accountsetting-modify.component';

@NgModule({
  declarations: [
    EmployeeDashComponent,
    AttendanceDetailsDashComponent,
    ShiftDetailsDashComponent,
    OverTimeDetailsDashComponent,
    AttendanceCorrectionDashComponent,

    LeaveRequestDashComponent,
    TimesheetRequestDashComponent,
    LocatorRequestDashComponent,
    LoanRequestDashComponent,
    EmployeeResignationDashComponent,

    PoliciesDashComponent,

    HolidaysDashComponent,
    AnnouncementsDashComponent,

    AttendanceReportComponent,
    AttendanceCorrectionReportComponent,
    LeaveReportComponent,
    TimesheetReportComponent,
    EmployeeCertificateDashComponent,
    HelpComponent,
    PayslipComponent,
    ShiftDetailsFormComponent,
    NewLeaveRequestComponent,
  
    OverTimeDetailsFormComponent,
    OverTimeDetailsFormComponent,
    NewLeaveRequestComponent,
    TimesheetformComponent,
    MyAccountsettingModifyComponent,
  
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    NgxDropzoneModule,
    Ng2SearchPipeModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule,
    NgbModule,
    NgxPaginationModule,
    SharedModuleModule,
    NgMultiSelectDropDownModule,
    

    
  ]
})
export class EmployeeModule { }
