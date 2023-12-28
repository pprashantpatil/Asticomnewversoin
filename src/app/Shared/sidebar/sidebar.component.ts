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
  login: any;
  UserName: any;
  company_name: any;
  role: any;
  temp: any;
  show: any;
  temp1: any
  home: any;
  roleid: any;
  StaffID: any;
  constructor(public router: Router) { }

  ngOnInit(): void {
    this.login = sessionStorage.getItem('roledid');
    this.temp1 = sessionStorage.getItem('temp');

    this.active = 0;
    this.companyid = sessionStorage.getItem('companyid');
    this.UserName = sessionStorage.getItem('UserName');
    this.role = sessionStorage.getItem('role');
    this.roleid = sessionStorage.getItem('roledid');
    this.StaffID = localStorage.getItem('staffid');
  }
  public getvalues(val: any) {
    this.mini = val;
  }
  public dashboard() {
    this.active = 1;
    if (this.roleid == 6) {
      this.router.navigate(['/Employee/EmployeeDashboard']);
      localStorage.setItem('Pagename', 'Dashboard');
      this.data11.emit('Dashboard');
    }
    else if (this.roleid == 2) {
      this.router.navigate(['/Manager/ManagerDashboard']);
      localStorage.setItem('Pagename', 'Dashboard');
      this.data11.emit('Dashboard');
    }
  }

  public StaffDash() {
    this.active = 15;
    this.router.navigate(['/HR/Staffdashboard']);
    localStorage.setItem('Pagename', 'Staff');
    this.data11.emit('Staff');
  }
  
  public licenceDetails() {
    this.active = 16;
    this.router.navigate(['/HR/LicenceDetails']);
    localStorage.setItem('Pagename', 'LICENCE DETAILS');
    this.data11.emit('LICENCE DETAILS');
  }
  public inactiveStaffDetails() {
    this.active = 17;
    this.router.navigate(['/HR/InactiveStaffDetails']);
    localStorage.setItem('Pagename', 'Inactive Staff Details');
    this.data11.emit('Inactive Staff Details');
  }
  public PayrollTrigger() {
    this.active = 18;
    this.router.navigate(['/HR/PayrollTriggerDash']);
    localStorage.setItem('Pagename', 'Payroll Trigger');
    this.data11.emit('Payroll Trigger');
  }

  public PRELIMINARYREPORT() {
    this.active = 19.1;
    this.router.navigate(['/HR/GeneratePreliminaryReport']);
    localStorage.setItem('Pagename', 'Preliminary Report');
    this.data11.emit('Preliminary Report');
  }
  
  public PAYROLLREPORT() {
    this.active = 19.2;
    this.router.navigate(['/HR/GenerateCsvfiles']);
    localStorage.setItem('Pagename', 'Payroll Report');
    this.data11.emit('Payroll Report');
  }

  public leaveConfiguration() {
    this.active = 20.1;
    this.router.navigate(['/HR/LeaveConfigurationDash']);
    localStorage.setItem('Pagename', 'Leave Configuration');
    this.data11.emit('Leave Configuration');
  }

  public loanConfiguration() {
    this.active = 20.2;
    this.router.navigate(['/HR/LoanConfigurationDash']);
    localStorage.setItem('Pagename', 'Loan Configuration');
    this.data11.emit('Loan Configuration');
  }

  public bulkUploadMissingStaff() {
    this.active = 20.3;
    this.router.navigate(['/HR/StaffBulkUploadExceptions']);
    localStorage.setItem('Pagename', 'Bulk Upload Missing Staff');
    this.data11.emit('Bulk Upload Missing Staff');
  }

  public UPLOADATTENDANCE() {
    this.active = 20.4;
    this.router.navigate(['/HR/Staffdashboard']);
    localStorage.setItem('Pagename', 'Upload Attendance');
    this.data11.emit('Upload Attendance');
  }
  public LEAVEUPLOAD() {
    this.active = 20.5;
    this.router.navigate(['/HR/Staffdashboard']);
    localStorage.setItem('Pagename', 'Leave Upload');
    this.data11.emit('Leave Upload');
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
    this.router.navigate(['/Employee/TimesheetRequestDash']);
    localStorage.setItem('Pagename', 'Building');
    this.data11.emit('Timesheet');
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
  public LeaveType() {
    this.active = 10.1;
    this.router.navigate(['/HR/LeaveTypeDashboard']);
    localStorage.setItem('Pagename', 'Leave Type');
    this.data11.emit('Leave Type');
  }

  public LoanType() {
    this.active = 10.2;
    this.router.navigate(['/HR/LoanMasterDash']);
    localStorage.setItem('Pagename', 'Loan Type');
    this.data11.emit('Loan Type');
  }
  public ShiftMaster() {
    this.active = 10.3;
    this.router.navigate(['/HR/ShiftMasterDash']);
    localStorage.setItem('Pagename', 'Shift Master');
    this.data11.emit('Shift Master');
  }
  public CountryMaster() {
    this.active = 10.4;
    this.router.navigate(['/HR/CountryMasterDash']);
    localStorage.setItem('Pagename', 'Country Master');
    this.data11.emit('Country Master');
  }
  public ProvinceMaster() {
    this.active = 10.5;
    this.router.navigate(['/HR/StateMasterDash']);
    localStorage.setItem('Pagename', 'Province Master');
    this.data11.emit('Province Master');
  }

  public CityMaster() {
    this.active = 10.6;
    this.router.navigate(['/HR/CityMasterDash']);
    localStorage.setItem('Pagename', 'City Master');
    this.data11.emit('City Master');
  }
  public BarangayMaster() {
    this.active = 10.7;
    this.router.navigate(['/HR/Barangaymaster']);
    localStorage.setItem('Pagename', 'Barangay Master');
    this.data11.emit('Barangay Master');
  }

  public DepartmentMaster() {
    this.active = 10.8;
    this.router.navigate(['/HR/Departmentmasterdash']);
    localStorage.setItem('Pagename', 'Department Master');
    this.data11.emit('Department Master');
  }

  public OTMaster() {
    this.active = 10.9;
    this.router.navigate(['/HR/Departmentmasterdash']);
    localStorage.setItem('Pagename', 'OT Master');
    this.data11.emit('Ot Master');
  }
  public PositionMaster() {
    this.active = 10.10;
    this.router.navigate(['/HR/RoleMasterDash']);
    localStorage.setItem('Pagename', 'Position Master');
    this.data11.emit('Ot Master');
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
    this.active = 21;
    this.router.navigate(['/Employee/Payslip']);
    localStorage.setItem('Pagename', 'Payslip');
    this.data11.emit('Payslip');
  }



}
