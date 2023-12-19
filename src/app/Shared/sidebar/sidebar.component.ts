import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Output() data11 = new EventEmitter();
  @Input() item: any;
  mini: any;
  companyid: any;
  sidenav: any;
  active: any;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }
  public getvalues(val: any) {
    this.mini = val;
  }
  public employeeDash() {
    this.active = 1;
    this.router.navigate(['/Employee/EmployeeDash']);
    localStorage.setItem('Pagename', 'Dashboard');
    this.data11.emit('Dashboard');
  }

  public attendanceDetails() {
    this.active = 2.1;
    this.router.navigate(['/Employee/AttendanceDetailsDash']);
    localStorage.setItem('Pagename', 'Attendance Details');
    this.data11.emit('Attendance Details');
  }

  public shiftDetails() {
    this.active = 2.2;
    this.router.navigate(['/Employee/ShiftDetailsDash']);
    localStorage.setItem('Pagename', 'Shift Details');
    this.data11.emit('Shift Details');
  }

  public overTimeDetails() {
    this.active = 2.3;
    this.router.navigate(['/Employee/OverTimeDetailsDash']);
    localStorage.setItem('Pagename', 'Over Time Details');
    this.data11.emit('Over Time Details');
  }

  public attendanceCorrection() {
    this.active = 2.4;
    this.router.navigate(['/Employee/AttendanceCorrectionDash']);
    localStorage.setItem('Pagename', 'Attendance Correction');
    this.data11.emit('Attendance Correction');
  }

  public leaveRequest() {
    this.active = 3.1;
    this.router.navigate(['/Employee/LeaveRequestDash']);
    localStorage.setItem('Pagename', 'Leave Request');
    this.data11.emit('Leave Request');
  }

  public timeSheetRequest() {
    this.active = 3.2;
    this.router.navigate(['/Employee/BuildingDash']);
    localStorage.setItem('Pagename', 'Building');
    this.data11.emit('Building');
  }

  public locatorRequest() {
    this.active = 3.3;
    this.router.navigate(['/Employee/LocatorRequestDash']);
    localStorage.setItem('Pagename', 'Locator Request');
    this.data11.emit('Locator Request');
  }

  public loanRequest() {
    this.active = 3.4;
    this.router.navigate(['/Employee/LoanRequestDash']);
    localStorage.setItem('Pagename', 'Loan Request');
    this.data11.emit('Loan Request');
  }

  public employeeResignation() {
    this.active = 3.5;
    this.router.navigate(['/Employee/EmployeeResignationDash']);
    localStorage.setItem('Pagename', 'Employee Resignation');
    this.data11.emit('Employee Resignation');
  }

  public policies() {
    this.active = 4;
    this.router.navigate(['/Employee/PoliciesDash']);
    localStorage.setItem('Pagename', 'Policies');
    this.data11.emit('Policies');
  }

  public holidays() {
    this.active = 5;
    this.router.navigate(['/Employee/HolidaysDash']);
    localStorage.setItem('Pagename', 'Holidays');
    this.data11.emit('Holidays');
  }

  public announcements() {
    this.active = 6;
    this.router.navigate(['/Employee/AnnouncementsDash']);
    localStorage.setItem('Pagename', 'Announcements');
    this.data11.emit('Announcements');
  }

  public attendanceReport() {
    this.active = 7.1;
    this.router.navigate(['/Employee/AttendanceReport']);
    localStorage.setItem('Pagename', 'Attendance Report');
    this.data11.emit('Attendance Report');
  }

  public attendanceCorrectionReport() {
    this.active = 7.2;
    this.router.navigate(['/Employee/AttendanceCorrectionReport']);
    localStorage.setItem('Pagename', 'Attendance Correction Report');
    this.data11.emit('Attendance Correction Report');
  }

  public leaveReport() {
    this.active = 7.3;
    this.router.navigate(['/Employee/LeaveReport']);
    localStorage.setItem('Pagename', 'Leave Report');
    this.data11.emit('Leave Report');
  }

  public timesheetReport() {
    this.active = 7.4;
    this.router.navigate(['/Employee/TimesheetReport']);
    localStorage.setItem('Pagename', 'Timesheet Report');
    this.data11.emit('Timesheet Report');
  }

  public employeeCertification() {
    this.active = 8;
    this.router.navigate(['/Employee/EmployeeCertificateDash']);
    localStorage.setItem('Pagename', 'Employee Certificate');
    this.data11.emit('Employee Certificate');
  }

  public help() {
    this.active = 9;
    this.router.navigate(['/Employee/Help']);
    localStorage.setItem('Pagename', 'Help');
    this.data11.emit('Help');
  }

  public payslip() {
    this.active = 10;
    this.router.navigate(['/Employee/Payslip']);
    localStorage.setItem('Pagename', 'Payslip');
    this.data11.emit('Payslip');
  }
}
