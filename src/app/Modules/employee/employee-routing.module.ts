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
import { NewLeaveRequestComponent } from './Requests/new-leave-request/new-leave-request.component';
import { MyAccountsettingModifyComponent } from './my-accountsetting-modify/my-accountsetting-modify.component';
import { ViewPolicyDashComponent } from './Policies/view-policy-dash/view-policy-dash.component';
import { TimesheetformComponent } from './Requests/timesheetform/timesheetform.component';
import { AuthguardGuard } from '../../Services/authguard.guard';

import { EmployeeGraphDashComponent } from './Dashboard/employee-graph-dash/employee-graph-dash.component';

const routes: Routes = [
  { path: 'EmployeeDashboard', component: EmployeeDashComponent ,canActivate: [AuthguardGuard]},
  { path: 'EmployeeGraphDash', component: EmployeeGraphDashComponent ,canActivate: [AuthguardGuard]},
  
  { path: 'AttendanceCorrectionDash', component: AttendanceCorrectionDashComponent ,canActivate: [AuthguardGuard]},
  { path: 'AttendanceDetailsDash', component: AttendanceDetailsDashComponent ,canActivate: [AuthguardGuard]},
  { path: 'OverTimeDetailsDash', component: OverTimeDetailsDashComponent ,canActivate: [AuthguardGuard]},
  { path: 'ShiftDetailsDash', component: ShiftDetailsDashComponent ,canActivate: [AuthguardGuard]},

  { path: 'PoliciesDash', component: PoliciesDashComponent ,canActivate: [AuthguardGuard]},
  { path: 'ViewPolicyDash', component: ViewPolicyDashComponent ,canActivate: [AuthguardGuard]},
  { path: 'ViewPolicyDash/:id', component: ViewPolicyDashComponent ,canActivate: [AuthguardGuard]},
  { path: 'HolidaysDash', component: HolidaysDashComponent ,canActivate: [AuthguardGuard]},
  { path: 'AnnouncementsDash', component: AnnouncementsDashComponent ,canActivate: [AuthguardGuard]},
  { path: 'EmployeeResignationDash', component: EmployeeResignationDashComponent ,canActivate: [AuthguardGuard]},
  { path: 'LeaveRequestDash', component: LeaveRequestDashComponent ,canActivate: [AuthguardGuard]},
  { path: 'NewLeaveRequest', component: NewLeaveRequestComponent ,canActivate: [AuthguardGuard]},
  
  { path: 'LoanRequestDash', component: LoanRequestDashComponent ,canActivate: [AuthguardGuard]},
  { path: 'LocatorRequestDash', component: LocatorRequestDashComponent ,canActivate: [AuthguardGuard]},
  { path: 'TimesheetRequestDash', component: TimesheetRequestDashComponent ,canActivate: [AuthguardGuard]},
  { path: 'Timesheetform', component: TimesheetformComponent ,canActivate: [AuthguardGuard]},
  { path: 'PoliciesDash', component: PoliciesDashComponent ,canActivate: [AuthguardGuard]},
  { path: 'HolidaysDash', component: HolidaysDashComponent ,canActivate: [AuthguardGuard]},
  { path: 'AnnouncementsDash', component: AnnouncementsDashComponent ,canActivate: [AuthguardGuard]},
  { path: 'PoliciesDash', component: PoliciesDashComponent },
  { path: 'ViewPolicyDash', component: ViewPolicyDashComponent },
  { path: 'ViewPolicyDash/:id', component: ViewPolicyDashComponent },
  { path: 'HolidaysDash', component: HolidaysDashComponent },
  { path: 'AnnouncementsDash', component: AnnouncementsDashComponent },

  { path: 'AttendanceCorrectionReport', component: AttendanceCorrectionReportComponent ,canActivate: [AuthguardGuard]},
  { path: 'AttendanceReport', component: AttendanceReportComponent ,canActivate: [AuthguardGuard]},
  { path: 'LeaveReport', component: LeaveReportComponent ,canActivate: [AuthguardGuard]},
  { path: 'TimesheetReport', component: TimesheetReportComponent ,canActivate: [AuthguardGuard]},

  { path: 'EmployeeCertificateDash', component: EmployeeCertificateDashComponent ,canActivate: [AuthguardGuard]},
  { path: 'Help', component: HelpComponent ,canActivate: [AuthguardGuard]},
  { path: 'MyAccountSetting', component: MyAccountsettingModifyComponent ,canActivate: [AuthguardGuard]},
  { path: 'Payslip', component: PayslipComponent ,canActivate: [AuthguardGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
