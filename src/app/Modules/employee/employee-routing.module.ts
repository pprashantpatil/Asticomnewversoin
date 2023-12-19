import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashComponent } from './Dashboard/employee-dash/employee-dash.component';
import { AttendanceCorrectionDashComponent } from './Attendance/attendance-correction-dash/attendance-correction-dash.component';
import { AttendanceDetailsDashComponent } from './Attendance/attendance-details-dash/attendance-details-dash.component';
import { OverTimeDetailsDashComponent } from './Attendance/over-time-details-dash/over-time-details-dash.component';
import { ShiftDetailsDashComponent } from './Attendance/shift-details-dash/shift-details-dash.component';
import { EmployeeResignationDashComponent } from './Requests/employee-resignation-dash/employee-resignation-dash.component';
import { LeaveRequestDashComponent } from './Requests/leave-request-dash/leave-request-dash.component';
import { LoanRequestDashComponent } from './Requests/loan-request-dash/loan-request-dash.component';
import { LocatorRequestDashComponent } from './Requests/locator-request-dash/locator-request-dash.component';
import { TimesheetRequestDashComponent } from './Requests/timesheet-request-dash/timesheet-request-dash.component';
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

const routes: Routes = [
  { path: 'Employeedashboard', component: EmployeeDashComponent },

  { path: 'AttendanceCorrectionDash', component: AttendanceCorrectionDashComponent },
  { path: 'AttendanceDetailsDash', component: AttendanceDetailsDashComponent },
  { path: 'OverTimeDetailsDash', component: OverTimeDetailsDashComponent },
  { path: 'ShiftDetailsDash', component: ShiftDetailsDashComponent },

  { path: 'EmployeeResignationDash', component: EmployeeResignationDashComponent },
  { path: 'LeaveRequestDash', component: LeaveRequestDashComponent },
  { path: 'LoanRequestDash', component: LoanRequestDashComponent },
  { path: 'LocatorRequestDash', component: LocatorRequestDashComponent },
  { path: 'TimesheetRequestDash', component: TimesheetRequestDashComponent },

  { path: 'PoliciesDash', component: PoliciesDashComponent },
  { path: 'HolidaysDash', component: HolidaysDashComponent },
  { path: 'AnnouncementsDash', component: AnnouncementsDashComponent },

  { path: 'AttendanceCorrectionReport', component: AttendanceCorrectionReportComponent },
  { path: 'AttendanceReport', component: AttendanceReportComponent },
  { path: 'LeaveReport', component: LeaveReportComponent },
  { path: 'TimesheetReport', component: TimesheetReportComponent },

  { path: 'EmployeeCertificateDash', component: EmployeeCertificateDashComponent },
  { path: 'Help', component: HelpComponent },
  { path: 'Payslip', component: PayslipComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
