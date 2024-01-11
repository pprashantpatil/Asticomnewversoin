import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { NewLeaveRequestComponent } from 'src/app/Modules/employee/Requests/new-leave-request/new-leave-request.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-manager-dash',
  templateUrl: './manager-dash.component.html',
  styleUrls: ['./manager-dash.component.css']
})
export class ManagerDashComponent implements OnInit {

  constructor(public router: Router, private datePipe: DatePipe,
    public AliprojectService: DigiofficecorehrService,
    public DigiofficeService: DigiofficecorehrService,
    private http: HttpClient,
    private matDialog: MatDialog) { }
  username: any;
  email: any;
  month: any;
  workType: any;
  day: any;
  hh: any;
  mm: any;
  ampm: any;
  punchoutworkType1: any;
  workType1: any;
  public arrayList: any = [];
  stafflistapproved: any;
  stafflist: any;
  stafflistnewrequest: any;
  approvedloancount: any;
  newrquestloancount: any;
  stafflistrejected: any;
  rejectedloancount: any;
  newexpensecount: any;
  approvedexpensecount: any;
  timedetails: any;
  cancelledexpensecount: any;
  pendingotcount: any;
  approvedotcount: any;
  rejectedotcount: any;
  roledid: any;
  province: any;
  todaydate: any;
  AnniverserylistView: any;
  pendingcountstaff: any
  approvedcountstaff: any
  Rejectedcountstaff: any
  term: any;
  staffleaves1: any;
  pendingcount: any;
  Rejectedcount: any;
  approvedcount: any;
  pendingcount1: any;
  Rejectedcount1: any;
  approvedcount1: any;
  ipAddress: any;
  pendingteamexpensecount: any;
  Rejectedteamexpnesecount: any;
  approvedteamexpnescount: any;
  pendingreg: any;
  approevedreg: any;
  pendingcount2: any;
  pendingcountforsupervisor: any;
  approvedcountforsupervisor: any;
  rejectedcountforsupervisor: any;
  cancelcountsupervisor: any;
  pendingcountforhr: any;
  approvedcountforhr: any;
  rejectedcountforhr: any;
  firstDayofcurrentmonth: any;
  filtereddate: any;
  showback: any;
  showfront: any;
  myDate: any;
  CancelledCount: any;
  staffID: any;
  Rejectedotcount: any;
  profilepercentage: any
  myleaves: any;
  public number: number = 1000;
  currentUrl: any;
  Anniversery: any
  Birthday: any;
  BirthdayView: any;
  NewJoinee: any;
  Anniverserylist1: any;
  Anniverserylist2: any;
  BirthdayList: any;
  name: any;
  middle_Name: any;
  mobile: any;
  emailID: any;
  annnounecemnetlist: any;
  search: any;
  FirstDoseDate: any;
  EmployeeVaccinationDetail: any;
  certificate_url: any;
  SecondDoseDate: any;
  BoosterName: any;
  BoosterDoseDate: any;
  topholidayname: any;
  topholidaydate: any
  holidaylist: any;
  holidaylist1: any;
  tpholidayattachment: any;
  UserID: any;
  SigninDate: any;
  SigninLocation: any;
  StatusID: any;
  punchintime: any;
  punchouttime: any;
  punchinId: any;
  ipaddress: any;
  punchoutid: any;
  Anniverserylist: any;
  announcementname: any;
  description: any;
  somelist: any;
  loader: any;
  companyid: any;
  newannnounecemnetlist: any;
  public attachments21: any = [];
  public attachments: any = [];
  public attachmentsurl: any = [];
  Certificate_url_second: any;
  BoosterDoseCertificate: any;
  firstAttachment: any;
  Name: any;
  dateTime: any;
  Level: any;
  show: any;
  Band: any;
  myovertime: any;
  filetype: any;
  time: any;
  AttendanceEnable: any;
  todayfilterdate: any;

  ngOnInit(): void {
    setInterval(() => {
      var time = new Date();
      time.setMinutes(time.getMinutes() + 150);
      this.time = time.toLocaleString('en-US', { hour: '2-digit', minute: 'numeric', hour12: true });
      let temp: any = this.time.split(':');
      this.hh = temp[0];
      let temp1: any = this.time.split(':')[1].split(" ");
      this.mm = temp1[0];
      this.ampm = temp1[1];
    }, 1000);
    this.GetStaffOverTimeDetails();
    this.workType = 0
    this.show = false;
    this.companyid = sessionStorage.getItem('companyid');
    this.currentUrl = window.location.href;
    this.AttendanceEnable = sessionStorage.getItem('AttendanceEnable');
    this.loader = true;
    this.roledid = localStorage.getItem('roledid');
    this.GetAnnouncements();
    //this.getDetails();
    this.GetHolidays();
    // //this.getipaddress();;
    const format = 'MM-dd-yyyy';
    const formatfilter = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.province = localStorage.getItem('Province');
    this.Band = localStorage.getItem('Band');
    this.Level = localStorage.getItem('level');
    var dateObj = new Date();
    this.month = dateObj.getUTCMonth() + 1; //months from 1-12
    this.day = dateObj.getUTCDate();
    this.myDate = new Date();
    this.todaydate = formatDate(myDate, format, locale);
    this.todayfilterdate = formatDate(myDate, formatfilter, locale);

    this.firstDayofcurrentmonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    this.firstDayofcurrentmonth = formatDate(this.firstDayofcurrentmonth, format, locale);
    this.showfront = true;
    this.Anniversery = true;
    this.Birthday = false;
    this.BirthdayView = false;
    this.NewJoinee = false;
    var date = new Date();
    this.staffID = localStorage.getItem('staffid');
    this.username = localStorage.getItem('UserName');
    this.email = localStorage.getItem('email');
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    this.GetMyDetailsByStaffID();
    this.CheckpunchInReset();
    // this.GetAttendanceByEmployeeID();
    // this.GetAttendanceByEmployeeID1();
    // this.GetAnnouncements();
    //this.changeAnniversary();
    //this.GetAttendance();
    // this.GetAttendanceInit();
    // this.GetAttendance1();
    this.GetStaffLeaveCountForDashboard();
    //this.GetStaffLeaveCountForDashboard1();
    this.GetAllStaffNew();
    // this.getannouncementurl('for');

  }


  public CheckpunchInReset() {
    debugger
    this.DigiofficeService.GetCurrentPhTime(this.staffID, this.todaydate, this.todaydate)
      .subscribe({
        next: data => {
          debugger
          let temp: any = data;
          this.currenttime = temp[0].currenttime;
          this.resettime = temp[0].resettime;
          if (this.resettime == '05:00:00') {
            if (this.currenttime >= '00:00:00' && this.currenttime <= '05:00:00') {
              this.GetAttendanceByEmployeeIDforpunchin1daybefore();
              this.GetAttendanceByEmployeeIDforpunchin1daybefore1();
            } else {
              this.GetAttendanceByEmployeeID();
              this.GetAttendanceByEmployeeID1();
            }
          }
          else if (this.resettime == '17:00:00') {
            if (this.currenttime >= '00:00:00' && this.currenttime <= '17:00:00') {
              this.GetAttendanceByEmployeeIDforpunchin1daybefore();
              this.GetAttendanceByEmployeeIDforpunchin1daybefore1();

            } else {
              this.GetAttendanceByEmployeeID();
              this.GetAttendanceByEmployeeID1();
            }
          }
          else if (this.resettime == '11:30:00') {
            if (this.currenttime >= '00:00:00' && this.currenttime <= '11:30:00') {
              this.GetAttendanceByEmployeeIDforpunchin1daybefore();
              this.GetAttendanceByEmployeeIDforpunchin1daybefore1();
            } else {
              this.GetAttendanceByEmployeeID();
              this.GetAttendanceByEmployeeID1();
            }
          }




        }, error: (err) => {
          // Swal.fire('Issue in Getting Attendance By Employee ID');
        }
      })
  }

  public GetAttendanceByEmployeeIDforpunchin1daybefore1() {
    this.DigiofficeService.GetAttendanceByEmployeeIDforpunchin1daybefore(this.staffID, this.todaydate, this.todaydate)
      .subscribe({
        next: data => {
          debugger
          let temp: any = data;
          this.punchouttime = temp[0].signoutDate;
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Attendance By Employee ID');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }

  public GetAttendanceByEmployeeIDforpunchin1daybefore() {
    this.DigiofficeService.GetAttendanceByEmployeeIDforpunchin1daybefore(this.staffID, this.todaydate, this.todaydate)
      .subscribe({
        next: data => {
          debugger
          let temp: any = data;
          this.punchintime = temp[0].signinDate;
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Attendance By Employee ID');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }
  getannouncementurl(_obj: string) {
    throw new Error('Method not implemented.');
  }

  profilepercentage1: any;
  profiletab: any;
  contact: any;
  dependent: any;
  emplhist: any;
  edu: any;
  nomi: any;
  bankID: any;
  public GetAllStaffNew() {

    this.AliprojectService.GetMyDetailsByStaffID(this.staffID)
      .subscribe({
        next: data => {

          let temp: any = data;
          this.profilepercentage = temp[0]?.profilepercentage;

          if (temp[0]?.steps == 1) {
            this.profiletab = 1
            this.contact = 2
            this.dependent = 0
            this.emplhist = 0
            this.edu = 0
            this.nomi = 0
            this.bankID = 0
          }

          else if (temp[0]?.steps == 2) {
            this.profiletab = 1
            this.contact = 2
            this.dependent = 3
            this.emplhist = 0
            this.edu = 0
            this.nomi = 0
            this.bankID = 0
          }
          else if (temp[0]?.steps == 3) {
            this.profiletab = 1
            this.contact = 2
            this.dependent = 3
            this.emplhist = 4
            this.edu = 0
            this.nomi = 0
            this.bankID = 0
          }
          else if (temp[0]?.steps == 4) {
            this.profiletab = 1
            this.contact = 2
            this.dependent = 3
            this.emplhist = 4
            this.edu = 5
            this.nomi = 0
            this.bankID = 0
          }
          else if (temp[0]?.steps == 5) {
            this.profiletab = 1
            this.contact = 2
            this.dependent = 3
            this.emplhist = 4
            this.edu = 5
            this.nomi = 6
            this.bankID = 0
          }
          else if (temp[0]?.steps >= 6) {
            this.profiletab = 1
            this.contact = 2
            this.dependent = 3
            this.emplhist = 4
            this.edu = 5
            this.nomi = 6
            this.bankID = 7
          }


          this.profilepercentage1 = 8 - temp[0]?.steps;

          this.loader = false;
        }
      })
  }


  public GetStaffOverTimeDetails() {
    this.DigiofficeService.GetStaffOTCountForDashboard(localStorage.getItem('staffid'), 1, "01-01-2020", "01-01-2025")
      .subscribe({
        next: data => {

          this.myovertime = data;
          let tempot = this.myovertime
          this.pendingotcount = tempot[0].pendingotcount
          this.approvedotcount = tempot[0].approvedotcount
          this.rejectedotcount = tempot[0].rejectedotcount
          this.loader = false;
        }
      })
  }


  public GetAnnouncements() {

    this.loader = true;
    this.DigiofficeService.GetAnnouncementsByBuildingID(56)
      .subscribe({
        next: data => {

          this.annnounecemnetlist = data.filter(x => x.filterdate >= this.todayfilterdate);
          if (this.annnounecemnetlist.length == 0) {
            this.show = true
            this.firstAttachment = null
            this.loader = false;
          }
          else {
            this.firstAttachment = this.annnounecemnetlist[0].attachment
            this.filetype = this.annnounecemnetlist[0].filetype
            this.Name = this.annnounecemnetlist[0].name
            this.dateTime = this.annnounecemnetlist[0].dateTime

            this.loader = false;
          }
          for (let i = 0; i <= this.annnounecemnetlist.length; i++) {
            if (this.arrayList.length < 1) {
              this.arrayList.push(this.annnounecemnetlist[i]);
              this.loader = false;
            }
            else {
              this.loader = false;
            }
          }
        }
      })
  }


  public GetMyDetailsByStaffID() {
    this.DigiofficeService.GetMyDetailsByStaffID(this.staffID)
      .subscribe({
        next: data => {

          let temp: any = data;
          this.profilepercentage = temp[0]?.profilepercentage * 9;
          this.loader = false;
        }
      })
  }

  getpunchoutworktype(event: any) {
    this.punchoutworkType = event?.target.value
  }
  punchoutworkType: any
  public GetAttendanceByEmployeeID() {

    this.DigiofficeService.GetAttendanceByEmployeeID(this.staffID, this.todaydate, this.todaydate)
      .subscribe({
        next: data => {

          let temp: any = data;
          this.punchintime = temp[0]?.startTime;
          this.workType1 = temp[0].workType;
          this.punchoutworkType1 = temp[0].punchoutWorkType
          this.loader = false;
        }
      })
  }

  public GetAttendanceByEmployeeID1() {
    this.DigiofficeService.GetAttendanceByEmployeeID(this.staffID, this.todaydate, this.todaydate)
      .subscribe({
        next: data => {

          let temp: any = data;
          this.punchouttime = temp[0]?.endDate;
          this.workType1 = temp[0].workType;
          this.punchoutworkType1 = temp[0].punchoutWorkType
          this.loader = false;
        }
      })
  }

  public GetAttendanceInit() {
    var date = new Date();
    this.AliprojectService.GetAttendance()
      .subscribe({
        next: data => {

          let temp: any = data.filter(x => x.userID == localStorage.getItem('staffid') && x.filterdate == this.formatDate(date));
          console.log("STAFFID" + temp)
          if (temp.length == 0) {
            this.punchintime = null;
            this.punchouttime = null;
          } else {
            this.punchintime = temp[0].startTime;
            this.punchouttime = temp[0].endTime;
            this.workType1 = temp[0].workType;
            this.punchoutworkType1 = temp[0].punchoutWorkType
            console.log("STAFFID" + this.punchintime)
          }

        }
      })
  }
  public GetAttendance() {
    this.DigiofficeService.GetAttendance()
      .subscribe({
        next: data => {

          let teamregularization: any = data.filter(x => x.supervisor == this.staffID);
          this.pendingreg = teamregularization.filter((x: { approve: number; }) => x.approve != 1).length;
          this.approevedreg = teamregularization.filter((x: { approve: number; }) => x.approve == 1).length;
          this.loader = false;

        }
      })
  }

  public GetAttendance1() {
    this.DigiofficeService.GetAttendance().subscribe(data => {

      let teamregularization: any = data.filter(x => x.supervisor == this.staffID);
      this.pendingreg = teamregularization.filter((x: { approve: number; }) => x.approve != 1).length;
      this.approevedreg = teamregularization.filter((x: { approve: number; }) => x.approve == 1).length;
      this.loader = false;
    })
  }
  cancelloancount: any;
  public GetEmployeeLoansCountforDashboard1() {
    this.DigiofficeService.GetEmployeeLoansCountforDashboard(localStorage.getItem('staffid')).subscribe(data => {

      this.stafflist = data;
      let temp = this.stafflist

      this.newrquestloancount = temp[0].pendingcountforhr;
      this.approvedloancount = temp[0].approvedcountforhr;
      this.rejectedloancount = temp[0].rejectedcountforhr;
      this.cancelloancount = temp[0].cancelcountforhr;
      this.loader = false;
    });
  }

  public GetStaffLeaveCountForDashboard() {
    this.DigiofficeService.GetStaffLeaveCountForDashboard(localStorage.getItem('staffid'), 1, "01-02-2023", "01-12-2029").subscribe(data => {

      this.myleaves = data;
      this.loader = false;
      let temp1 = this.myleaves
      this.pendingcount1 = temp1[0].pendingcount;
      this.approvedcount1 = temp1[0].approvedcount;
      this.Rejectedcount1 = temp1[0].rejectedcount;
      this.CancelledCount = temp1[0].cancelcount;
      this.pendingcountforsupervisor = temp1[0].pendingcountforsupervisor
      this.approvedcountforsupervisor = temp1[0].approvedcountforsupervisor
      this.rejectedcountforsupervisor = temp1[0].rejectedcountforsupervisor
      this.CancelledCount = temp1[0].cancelcountsupervisor
      this.pendingcountforhr = temp1[0].pendingcountforhr
      this.approvedcountforhr = temp1[0].approvedcountforhr
      this.rejectedcountforhr = temp1[0].rejectedcountforhr
      this.CancelledCount = temp1[0].cancelcountsupervisor
    });
  }

  public GetStaffLeaveCountForDashboard1() {
    this.DigiofficeService.GetStaffLeaveCountForDashboard(localStorage.getItem('staffid'), 1, "01-02-2023", "01-02-2023")
      .subscribe({
        next: data => {

          this.myleaves = data;
          this.loader = false;
          let temp1 = this.myleaves
          this.pendingcount1 = temp1[0].pendingcount
          this.approvedcount1 = temp1[0].approvedcount
          this.Rejectedcount1 = temp1[0].rejectedcount
          this.CancelledCount = temp1[0].cancelcount
          this.pendingcountforsupervisor = temp1[0].pendingcountforsupervisor
          this.approvedcountforsupervisor = temp1[0].approvedcountforsupervisor
          this.rejectedcountforsupervisor = temp1[0].rejectedcountforsupervisor
          this.CancelledCount = temp1[0].cancelcountsupervisor
          this.pendingcountforhr = temp1[0].pendingcountforhr
          this.approvedcountforhr = temp1[0].approvedcountforhr
          this.rejectedcountforhr = temp1[0].rejectedcountforhr
          this.CancelledCount = temp1[0].cancelcountsupervisor
        }
      })
  }

  public getipaddress() {

    this.DigiofficeService.getIPAddress()
      .subscribe({
        next: data => {

          let temap: any = data;
          this.ipaddress = temap.ip;
          this.loader = false;
        }
      })
  }

  public holidays() {
    this.router.navigate(['/Admin/HolidayDashboard']);
    this.loader = false;
  }

  public changebirthday() {

    localStorage.setItem('birthday', String(this.day).concat('-', String(this.month)))
    this.Anniversery = false;
    this.Birthday = true;
    this.BirthdayView = false;
    this.NewJoinee = false;
    this.DigiofficeService.GetMyDetails()
      .subscribe({
        next: data => {

          this.Anniverserylist1 = data.filter(x => x.dobdate == String(this.day).concat('-', String(this.month)));
          this.loader = false;
          this.name = this.Anniverserylist1[0].name
          this.middle_Name = this.Anniverserylist1[0].middle_Name
          this.mobile = this.Anniverserylist1[0].mobile
          this.emailID = this.Anniverserylist1[0].emailID
        }
      })
  }

  public changebirthdayView() {

    this.loader = true;
    localStorage.setItem('birthdayview', String(this.day).concat('-', String(this.month)));
    this.Anniversery = false;
    this.BirthdayView = true;
    this.NewJoinee = false;
    this.DigiofficeService.GetMyDetails()
      .subscribe({
        next: data => {

          this.AnniverserylistView = data.filter(x => x.dobdate == String(this.day).concat('-', String(this.month)));
          this.loader = false;
        }, error: (err) => {
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID': localStorage.getItem('staffid')
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            _data => {

            },
          )
        }
      })
  }

  public changenewjoinee() {

    this.loader = true;
    this.Anniversery = false;
    this.Birthday = false;
    this.BirthdayView = false;
    this.NewJoinee = true;
    this.DigiofficeService.GetMyDetails()
      .subscribe({
        next: data => {

          this.Anniverserylist2 = data.filter(x => x.joiningDate == this.myDate + "T00:00:00");
          this.loader = false;
          this.name = this.Anniverserylist2[0].name
          this.middle_Name = this.Anniverserylist2[0].middle_Name
          this.mobile = this.Anniverserylist2[0].mobile
          this.emailID = this.Anniverserylist2[0].emailID
        }, error: (err) => {
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID': localStorage.getItem('staffid')
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            _data => {

            },
          )
        }
      })
  }

  public Profilecompletion() {
    this.router.navigate(['/HR/AddressDetailsWizard', localStorage.getItem('EmployeeID')]);
  }

  public getDetails() {

    this.DigiofficeService.GetEmployeeVaccinationDetails()
      .subscribe({
        next: data => {

          this.EmployeeVaccinationDetail = data.filter(x => x.employeeId == this.staffID);
          if (this.EmployeeVaccinationDetail.length != 0) {
            this.loader = false;
            this.FirstDoseDate = this.EmployeeVaccinationDetail[0].firstDoseDate,
              this.certificate_url = this.EmployeeVaccinationDetail[0].certificate_url,
              this.Certificate_url_second = this.EmployeeVaccinationDetail[0].certificate_url_second,
              this.BoosterDoseCertificate = this.EmployeeVaccinationDetail[0].boosterDoseCertificate,
              this.SecondDoseDate = this.EmployeeVaccinationDetail[0].secondDoseDate,
              this.BoosterName = this.EmployeeVaccinationDetail[0].boosterName,
              this.BoosterDoseDate = this.EmployeeVaccinationDetail[0].boosterDoseDate
          }
          else {
            this.loader = false;
            this.FirstDoseDate = null,
              this.certificate_url = 'https://103.12.1.76/ALIAPI/Images/EmptyProfile/noimage.png',
              this.Certificate_url_second = 'https://103.12.1.76/ALIAPI/Images/EmptyProfile/noimage.png',
              this.BoosterDoseCertificate = 'https://103.12.1.76/ALIAPI/Images/EmptyProfile/noimage.png',
              this.SecondDoseDate = null,
              this.BoosterName = null,
              this.BoosterDoseDate = null
          }
        }, error: (err) => {
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID': localStorage.getItem('staffid')
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            _data => {

            },
          )
        }
      })
  }
  public dispyList: any = [];

  public GetHolidays() {

    this.DigiofficeService.GetHolidays()
      .subscribe({
        next: data => {

          this.holidaylist = data.filter(x => x.filterholidaydate >= this.todayfilterdate);
          this.loader = false;
          console.log('Holiday', this.holidaylist1, this.dispyList)
          // this.holidaylist1 = data.filter(x => x.region == this.province || x.region == null);
          this.holidaylist1 = data.filter(x => x.filterholidaydate >= this.todayfilterdate);
          this.topholidayname = this.holidaylist[0].holiday;
          this.topholidaydate = this.holidaylist[0].holidayDate;
          this.tpholidayattachment = this.holidaylist[0].attachment;
          for (let i = 1; i <= this.holidaylist1.length; i++) {
            if (this.dispyList.length < 3) {
              this.dispyList.push(this.holidaylist1[i]);

            }
            else {

            }

          }
        }, error: (err) => {
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID': localStorage.getItem('staffid')
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            _data => {

            },
          )
        }
      })
  }
  getworktype(even: any) {
    this.workType = even.target.value;
  }

   staffid: any;
  Date: any;
  public punchin() {
    debugger;
    this.DigiofficeService.GetStaffShiftDetailsByStaffID(localStorage.getItem('staffid'))
      .subscribe({
        next: data => {
          debugger
          let temp = data.filter(x => (x.filterenddate >= x.currentdate && x.filterdate <= x.currentdate) && x.approve == 1);
          if (temp.length == 0) {
            Swal.fire('Please add your shift details and get approval from your manager before punching in.')
            this.loader = false;
            // this.showPopup = 1;
            // this.messageId = 17;
          } else {
           
            if (this.punchintime != undefined) {
                 Swal.fire('Already Punched In for the day'); 
              this.loader = false;
             
            }
            else {
              this.loader = false;
              var options = { hour12: false };
              var date = new Date();
              var entity = {
                UserID: localStorage.getItem('staffid'),
                SigninDate: date.toLocaleString('en-US', options),
                SigninLocation: 'Office',
                StatusID: 1,
                punchinip: this.ipaddress == undefined ? '101.120.111.222' : this.ipaddress,
                ApprovalStatus: 'Manager Pending HR Pending'
              }
              this.DigiofficeService.InsertAttendanceWeb(entity)
                .subscribe({
                  next: data => {
                    debugger
                    if (data == 0) {
                        Swal.fire('Already Punched In for the day'); 
                      this.loader = false;
                    
                    }
                    else {
                      this.punchinId = data;
                      localStorage.setItem('PunchINid', this.punchinId);
                       Swal.fire('Punched In Successfully'); 
                      this.loader = false;
                    
                      this.DigiofficeService.GetAttendanceByEmployeeIDforpunchin(this.staffID, this.todaydate, this.todaydate).subscribe(data => {
                        debugger
                        let temp: any = data;
                        this.punchintime = temp[0].signinDate;
                        this.loader = false;
                      })
                    }
                  }
                })
            }
          }

          this.loader = false;
        }, error: (err) => {

        }
      })


  }


  currenttime: any;
  resettime: any;
  public punchout() {
    debugger;
 
    this.loader = true;
    if (this.punchouttime != undefined) {
       Swal.fire('Already Punched Out for the day'); 
      this.loader = false;
     
    }
    else {
      var options = { hour12: false };
      var date = new Date();
      if (this.resettime == '05:00:00') {
        if (this.currenttime >= '00:00:00' && this.currenttime <= '05:00:00') {
          this.DigiofficeService.GetAttendanceByEmployeeIDforpunchin1daybefore(this.staffID, this.todaydate, this.todaydate)
            .subscribe({
              next: data => {
                debugger
                this.loader = false;
                var todayDate = new Date().toISOString().slice(0, 10);
                let temp: any = data;

                this.punchoutid = temp[0].id;
                var entity = {
                  ID: this.punchoutid,
                  SignoutDate:new Date(),
                  SignoutLocation: 'Office',
                  StatusID: 2,
                  punchoutip: this.ipaddress == undefined ? '101.120.111.222' : this.ipaddress,
                }
                this.DigiofficeService.UpdateAttendanceWeb(entity)
                  .subscribe({
                    next: data => {
                      debugger
                      if (data != 0) {
                          Swal.fire('Punched Out Successfully'); 
                        localStorage.removeItem('PunchINid');
                        this.loader = false;
                      
                        location.reload();
                        this.DigiofficeService.GetAttendanceByEmployeeIDforpunchin1daybefore(this.staffID, this.todaydate, this.todaydate)
                          .subscribe({
                            next: data => {
                              debugger
                              let temp: any = data;
                              this.punchouttime = temp[0].signoutDate;
                              this.loader = false;
                              location.reload();
                            }, error: (err) => {
                              // Swal.fire('Issue in Getting Attendance By Employee ID');
                              // Insert error in Db Here//
                              var obj = {
                                'PageName': this.currentUrl,
                                'ErrorMessage': err.error.message
                              }
                              this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                                data => {
                                  debugger
                                },
                              )
                            }
                          })
                      }
                    }, error: (err) => {
                      // Swal.fire('Issue in Updating Attendance Web');
                      // Insert error in Db Here//
                      var obj = {
                        'PageName': this.currentUrl,
                        'ErrorMessage': err.error.message
                      }
                      this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                        data => {
                          debugger
                        },
                      )
                    }
                  })
              }, error: (err) => {
                // Swal.fire('Issue in Getting Attendance');
                // Insert error in Db Here//
                var obj = {
                  'PageName': this.currentUrl,
                  'ErrorMessage': err.error.message
                }
                this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                  data => {
                    debugger
                  },
                )
              }
            })
          this.loader = false

        } else {
          this.DigiofficeService.GetAttendanceByEmployeeIDforpunchin(this.staffID, this.todaydate, this.todaydate)
            .subscribe({
              next: data => {
                debugger
                this.loader = false;
                var todayDate = new Date().toISOString().slice(0, 10);
                let temp: any = data;

                this.punchoutid = temp[0].id;
                var entity = {
                  ID: this.punchoutid,
                  SignoutDate:new Date(),
                  SignoutLocation: 'Office',
                  StatusID: 2,
                  punchoutip: this.ipaddress == undefined ? '101.120.111.222' : this.ipaddress,
                }
                this.DigiofficeService.UpdateAttendanceWeb(entity)
                  .subscribe({
                    next: data => {
                      debugger
                      if (data != 0) {
                          Swal.fire('Punched Out Successfully'); 
                        localStorage.removeItem('PunchINid');
                        this.loader = false;
                       
                        location.reload();
                        this.DigiofficeService.GetAttendanceByEmployeeIDforpunchin(this.staffID, this.todaydate, this.todaydate)
                          .subscribe({
                            next: data => {
                              debugger
                              let temp: any = data;
                              this.punchouttime = temp[0].signoutDate;
                              this.loader = false;
                              location.reload();
                            }, error: (err) => {
                              // Swal.fire('Issue in Getting Attendance By Employee ID');
                              // Insert error in Db Here//
                              var obj = {
                                'PageName': this.currentUrl,
                                'ErrorMessage': err.error.message
                              }
                              this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                                data => {
                                  debugger
                                },
                              )
                            }
                          })
                      }
                    }, error: (err) => {
                      // Swal.fire('Issue in Updating Attendance Web');
                      // Insert error in Db Here//
                      var obj = {
                        'PageName': this.currentUrl,
                        'ErrorMessage': err.error.message
                      }
                      this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                        data => {
                          debugger
                        },
                      )
                    }
                  })
              }, error: (err) => {
                // Swal.fire('Issue in Getting Attendance');
                // Insert error in Db Here//
                var obj = {
                  'PageName': this.currentUrl,
                  'ErrorMessage': err.error.message
                }
                this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                  data => {
                    debugger
                  },
                )
              }
            })
          this.loader = false
        }
      }
      else if (this.resettime == '17:00:00') {
        if (this.currenttime >= '00:00:00' && this.currenttime <= '17:00:00') {
          this.DigiofficeService.GetAttendanceByEmployeeIDforpunchin1daybefore(this.staffID, this.todaydate, this.todaydate)
            .subscribe({
              next: data => {
                debugger
                this.loader = false;
                var todayDate = new Date().toISOString().slice(0, 10);
                let temp: any = data;

                this.punchoutid = temp[0].id;
                var entity = {
                  ID: this.punchoutid,
                  SignoutDate:new Date(),
                  SignoutLocation: 'Office',
                  StatusID: 2,
                  punchoutip: this.ipaddress == undefined ? '101.120.111.222' : this.ipaddress,
                }
                this.DigiofficeService.UpdateAttendanceWeb(entity)
                  .subscribe({
                    next: data => {
                      debugger
                      if (data != 0) {
                         Swal.fire('Punched Out Successfully'); 
                        localStorage.removeItem('PunchINid');
                        this.loader = false;
                       
                        location.reload();
                        this.DigiofficeService.GetAttendanceByEmployeeIDforpunchin1daybefore(this.staffID, this.todaydate, this.todaydate)
                          .subscribe({
                            next: data => {
                              debugger
                              let temp: any = data;
                              this.punchouttime = temp[0].signoutDate;
                              this.loader = false;
                              location.reload();
                            }, error: (err) => {
                              // Swal.fire('Issue in Getting Attendance By Employee ID');
                              // Insert error in Db Here//
                              var obj = {
                                'PageName': this.currentUrl,
                                'ErrorMessage': err.error.message
                              }
                              this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                                data => {
                                  debugger
                                },
                              )
                            }
                          })
                      }
                    }, error: (err) => {
                      // Swal.fire('Issue in Updating Attendance Web');
                      // Insert error in Db Here//
                      var obj = {
                        'PageName': this.currentUrl,
                        'ErrorMessage': err.error.message
                      }
                      this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                        data => {
                          debugger
                        },
                      )
                    }
                  })
              }, error: (err) => {
                // Swal.fire('Issue in Getting Attendance');
                // Insert error in Db Here//
                var obj = {
                  'PageName': this.currentUrl,
                  'ErrorMessage': err.error.message
                }
                this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                  data => {
                    debugger
                  },
                )
              }
            })
          this.loader = false

        } else {
          this.DigiofficeService.GetAttendanceByEmployeeIDforpunchin(this.staffID, this.todaydate, this.todaydate)
            .subscribe({
              next: data => {
                debugger
                this.loader = false;
                var todayDate = new Date().toISOString().slice(0, 10);
                let temp: any = data;

                this.punchoutid = temp[0].id;
                var entity = {
                  ID: this.punchoutid,
                  SignoutDate:new Date(),
                  SignoutLocation: 'Office',
                  StatusID: 2,
                  punchoutip: this.ipaddress == undefined ? '101.120.111.222' : this.ipaddress,
                }
                this.DigiofficeService.UpdateAttendanceWeb(entity)
                  .subscribe({
                    next: data => {
                      debugger
                      if (data != 0) {
                         Swal.fire('Punched Out Successfully'); 
                        localStorage.removeItem('PunchINid');
                        this.loader = false;
                      
                        location.reload();
                        this.DigiofficeService.GetAttendanceByEmployeeIDforpunchin(this.staffID, this.todaydate, this.todaydate)
                          .subscribe({
                            next: data => {
                              debugger
                              let temp: any = data;
                              this.punchouttime = temp[0].signoutDate;
                              this.loader = false;
                              location.reload();
                            }, error: (err) => {
                              // Swal.fire('Issue in Getting Attendance By Employee ID');
                              // Insert error in Db Here//
                              var obj = {
                                'PageName': this.currentUrl,
                                'ErrorMessage': err.error.message
                              }
                              this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                                data => {
                                  debugger
                                },
                              )
                            }
                          })
                      }
                    }, error: (err) => {
                      // Swal.fire('Issue in Updating Attendance Web');
                      // Insert error in Db Here//
                      var obj = {
                        'PageName': this.currentUrl,
                        'ErrorMessage': err.error.message
                      }
                      this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                        data => {
                          debugger
                        },
                      )
                    }
                  })
              }, error: (err) => {
                // Swal.fire('Issue in Getting Attendance');
                // Insert error in Db Here//
                var obj = {
                  'PageName': this.currentUrl,
                  'ErrorMessage': err.error.message
                }
                this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                  data => {
                    debugger
                  },
                )
              }
            })
          this.loader = false
        }
      }
      else if (this.resettime == '11:30:00') {
        if (this.currenttime >= '00:00:00' && this.currenttime <= '11:30:00') {
          this.DigiofficeService.GetAttendanceByEmployeeIDforpunchin1daybefore(this.staffID, this.todaydate, this.todaydate)
            .subscribe({
              next: data => {
                debugger
                this.loader = false;
                var todayDate = new Date().toISOString().slice(0, 10);
                let temp: any = data;

                this.punchoutid = temp[0].id;
                var entity = {
                  ID: this.punchoutid,
                  SignoutDate:new Date(),
                  SignoutLocation: 'Office',
                  StatusID: 2,
                  punchoutip: this.ipaddress == undefined ? '101.120.111.222' : this.ipaddress,
                }
                this.DigiofficeService.UpdateAttendanceWeb(entity)
                  .subscribe({
                    next: data => {
                      debugger
                      if (data != 0) {
                           Swal.fire('Punched Out Successfully'); 
                        localStorage.removeItem('PunchINid');
                        this.loader = false;
                       
                        location.reload();
                        this.DigiofficeService.GetAttendanceByEmployeeIDforpunchin1daybefore(this.staffID, this.todaydate, this.todaydate)
                          .subscribe({
                            next: data => {
                              debugger
                              let temp: any = data;
                              this.punchouttime = temp[0].signoutDate;
                              this.loader = false;
                              location.reload();
                            }, error: (err) => {
                              // Swal.fire('Issue in Getting Attendance By Employee ID');
                              // Insert error in Db Here//
                              var obj = {
                                'PageName': this.currentUrl,
                                'ErrorMessage': err.error.message
                              }
                              this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                                data => {
                                  debugger
                                },
                              )
                            }
                          })
                      }
                    }, error: (err) => {
                      // Swal.fire('Issue in Updating Attendance Web');
                      // Insert error in Db Here//
                      var obj = {
                        'PageName': this.currentUrl,
                        'ErrorMessage': err.error.message
                      }
                      this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                        data => {
                          debugger
                        },
                      )
                    }
                  })
              }, error: (err) => {
                // Swal.fire('Issue in Getting Attendance');
                // Insert error in Db Here//
                var obj = {
                  'PageName': this.currentUrl,
                  'ErrorMessage': err.error.message
                }
                this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                  data => {
                    debugger
                  },
                )
              }
            })
          this.loader = false
        } else {
          this.DigiofficeService.GetAttendanceByEmployeeIDforpunchin(this.staffID, this.todaydate, this.todaydate)
            .subscribe({
              next: data => {
                debugger
                this.loader = false;
                var todayDate = new Date().toISOString().slice(0, 10);
                let temp: any = data;

                this.punchoutid = temp[0].id;
                var entity = {
                  ID: this.punchoutid,
                  SignoutDate:new Date(),
                  SignoutLocation: 'Office',
                  StatusID: 2,
                  punchoutip: this.ipaddress == undefined ? '101.120.111.222' : this.ipaddress,
                }
                this.DigiofficeService.UpdateAttendanceWeb(entity)
                  .subscribe({
                    next: data => {
                      debugger
                      if (data != 0) {
                          Swal.fire('Punched Out Successfully'); 
                        localStorage.removeItem('PunchINid');
                        this.loader = false;
                       
                        location.reload();
                        this.DigiofficeService.GetAttendanceByEmployeeIDforpunchin(this.staffID, this.todaydate, this.todaydate)
                          .subscribe({
                            next: data => {
                              debugger
                              let temp: any = data;
                              this.punchouttime = temp[0].signoutDate;
                              this.loader = false;
                              location.reload();
                            }, error: (err) => {
                              // Swal.fire('Issue in Getting Attendance By Employee ID');
                              // Insert error in Db Here//
                              var obj = {
                                'PageName': this.currentUrl,
                                'ErrorMessage': err.error.message
                              }
                              this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                                data => {
                                  debugger
                                },
                              )
                            }
                          })
                      }
                    }, error: (err) => {
                      // Swal.fire('Issue in Updating Attendance Web');
                      // Insert error in Db Here//
                      var obj = {
                        'PageName': this.currentUrl,
                        'ErrorMessage': err.error.message
                      }
                      this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                        data => {
                          debugger
                        },
                      )
                    }
                  })
              }, error: (err) => {
                // Swal.fire('Issue in Getting Attendance');
                // Insert error in Db Here//
                var obj = {
                  'PageName': this.currentUrl,
                  'ErrorMessage': err.error.message
                }
                this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                  data => {
                    debugger
                  },
                )
              }
            })
          this.loader = false
        }
      }

    }
  }

  public InsertNotificationPunchIn() {

    var entity = {
      'Date': new Date(),
      'Event': 'Attendance Request',
      'FromUser': 'Admin',
      'ToUser': 9090,
      'Message': 'Punch-In Successfully recorded.',
      'Photo': 'Null',
      'Building': 'Dynamics 1',
      'UserID': localStorage.getItem('staffid'),
      'NotificationTypeID': 4,
      'VendorID': 0
    }
    this.AliprojectService.InsertNotification(entity)
      .subscribe({
        next: data => {

          if (data != 0) {
            location.reload();
          }
        }, error: (err) => {
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

          var obj = {
            'PageName': 'Loan Page',
            'ErrorMessage': err.error.message
          }
          this.AliprojectService.InsertExceptionLogs(obj).subscribe(
            data => {

            },
          )
        }
      })
  }

  public formatDate(date: any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-');
  }

  
  public changeAnniversary() {

    this.loader = true;
    this.Anniversery = true;
    this.Birthday = false;
    this.BirthdayView = false;
    this.NewJoinee = false;
    this.DigiofficeService.GetMyDetails()
      .subscribe({
        next: data => {

          this.Anniverserylist = data.filter(x => x.anniversarydate == String(this.day).concat('-', String(this.month)));
          this.loader = false;
          this.name = this.Anniverserylist[0].name
          this.middle_Name = this.Anniverserylist[0].middle_Name
          this.mobile = this.Anniverserylist[0].mobile
          this.emailID = this.Anniverserylist[0].emailID
        }, error: (err) => {
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID': localStorage.getItem('staffid')
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            _data => {

            },
          )
        }
      })
  }

  public getwishdate() {
    this.DigiofficeService.GetMyDetails()
      .subscribe({
        next: data => {

          this.Anniverserylist = data.filter(x => x.date_Of_Marriage == this.myDate + "T00:00:00");
          this.loader = false;
        }, error: (err) => {
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID': localStorage.getItem('staffid')
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            _data => {

            },
          )
        }
      })
  }

  onSelect21(event: any) {


    if (event.addedFiles[0].size / 1048576 > 2) {
      Swal.fire('Please Upload File Less than 2 MB.')
    } else {
      this.attachments21 = [];
      this.attachments21.push(...event.addedFiles);
      for (let i = 0; i < this.attachments21.length; i++) {
        this.DigiofficeService.UploadmultipleProjectAttachments(this.attachments21[i])
          .subscribe({
            next: data => {

              if (data != undefined) {
                this.attachmentsurl.push(data);
                this.loader = false;
              }
            }, error: (err) => {
              Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');
              this.loader = false;

              var obj = {
                'PageName': this.currentUrl,
                'ErrorMessage': err.error.message
              }
              this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                data => {

                },
              )
            }
          })
      }
    }
  }

  onRemove21(event: any) {


    this.attachments21.splice(this.attachments.indexOf(event), 1);
  }

  public UpdateVaccinationDetails() {

    this.loader = true;
    var entity = {
      ID: this.staffID,
      Certificate_url: this.attachmentsurl[0],
      vtype: 1
    }
    this.DigiofficeService.UpdateVaccinationDetails(entity)
      .subscribe({
        next: data => {

          if (data != 0) {
            Swal.fire("Updated Successfully");
            location.reload();
            this.loader = false;
          }
        }, error: (err) => {
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID': localStorage.getItem('staffid')
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {

            },
          )
        }
      })
  }

  public UpdateVaccinationDetails1() {

    this.loader = true;
    var entity = {
      ID: this.staffID,
      Certificate_url: this.attachmentsurl[0],
      vtype: 2
    }
    this.DigiofficeService.UpdateVaccinationDetails(entity)
      .subscribe({
        next: data => {

          if (data != 0) {
            Swal.fire("Updated Successfully");
            location.reload();
            this.loader = false;
          }
        }, error: (err) => {
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID': localStorage.getItem('staffid')
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {

            },
          )
        }
      })
  }

  public UpdateVaccinationDetails2() {

    this.loader = true;
    var entity = {
      ID: this.staffID,
      Certificate_url: this.attachmentsurl[0],
      vtype: 3
    }
    this.DigiofficeService.UpdateVaccinationDetails(entity)
      .subscribe({
        next: data => {

          if (data != 0) {
            Swal.fire("Updated Successfully");
            location.reload();
            this.loader = false;
          }
        }, error: (err) => {
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID': localStorage.getItem('staffid')
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {

            },
          )
        }
      })
  }
  public punchout1() {

    this.loader = true
    //this.getipaddress();;

    if (this.punchouttime != undefined) {
      Swal.fire('Already Punched Out for the day');
      this.loader = false
    }
    else if (this.punchintime == undefined) {
      Swal.fire("You can't punch out as you've not punched in for the day");
      this.loader = false
    }
    else if (this.punchoutworkType == undefined || this.punchoutworkType == null || this.punchoutworkType == "0") {
      Swal.fire('Please Fill Work Type');
      this.loader = false
    }
    else {
      var options = { hour12: false };
      var date = new Date();
      this.AliprojectService.GetAttendance()
        .subscribe({
          next: data => {

            var todayDate = new Date().toISOString().slice(0, 10);
            let temp: any = data.filter(x => x.filterdate == todayDate && x.userID == this.staffID);
            this.punchoutid = temp[0].id;
            var entity = {
              ID: this.punchoutid,
              SignoutDate: date.toLocaleString('en-US', options),
              SignoutLocation: 'Office',
              StatusID: 2,
              punchoutip: this.ipaddress == undefined ? '101.120.111.222' : this.ipaddress,
              punchoutworkType: this.punchoutworkType
            }
            this.AliprojectService.UpdateAttendanceWeb(entity)
              .subscribe({
                next: data => {

                  if (data != 0) {
                    Swal.fire('Punched Out Successfully');
                    localStorage.removeItem('PunchINid');
                    this.AliprojectService.GetAttendanceByEmployeeID(this.staffID, this.todaydate, this.todaydate)
                      .subscribe({
                        next: data => {

                          let temp: any = data;
                          this.punchouttime = temp[0].endTime;
                          this.workType1 = temp[0].workType;
                          this.punchoutworkType1 = temp[0].punchoutWorkType
                          this.InsertNotificationPunchOut()
                        }, error: (err) => {
                          Swal.fire('Not able to punchout now check with Tech Support Team for Issue');
                          this.loader = false

                          var obj = {
                            'PageName': this.currentUrl,
                            'ErrorMessage': err.error.message
                          }
                          this.AliprojectService.InsertExceptionLogs(obj).subscribe(
                            data => {

                            },
                          )
                        }
                      })
                  }
                }, error: (err) => {
                  Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

                  var obj = {
                    'PageName': this.currentUrl,
                    'ErrorMessage': err.error.message
                  }
                  this.AliprojectService.InsertExceptionLogs(obj).subscribe(
                    data => {

                    },
                  )
                }
              })
          }, error: (err) => {
            Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.AliprojectService.InsertExceptionLogs(obj).subscribe(
              data => {

              },
            )
          }
        })
      this.loader = false
    }
  }

  public InsertNotificationPunchOut() {

    this.loader = true;
    var entity = {
      'Date': new Date(),
      'Event': 'Attendance Correction',
      'FromUser': 'Admin',
      'ToUser': localStorage.getItem('staffid'),
      'Message': 'Punch-Out was Successfully recorded',
      'Photo': 'Null',
      'Building': 'Dynamics 1',
      'UserID': localStorage.getItem('staffid'),
      'NotificationTypeID': 15,
      'VendorID': 0
    }
    this.AliprojectService.InsertNotification(entity)
      .subscribe({
        next: data => {

          if (data != 0) {
          }
          // Swal.fire("Saved Successfully");
          location.reload();
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');
          this.loader = false;
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID': localStorage.getItem('staffid')
          }
          this.AliprojectService.InsertExceptionLogs(obj).subscribe(
            data => {

            },
          )
        }
      })
  }



  attendance() {

    localStorage.setItem('Pagename', '');
    this.router.navigate(['/HR/AttendanceDetails']);
    // this.AliprojectService.saveData('value');
  }

  attendanceCorrection() {

    localStorage.setItem('Pagename', '');
    this.router.navigate(['/Employee/AttendanceCorrection']);
    // this.AliprojectService.saveData('value');
  }


  public ApplyOT() {
    localStorage.setItem('Pagename', '');
    this.router.navigate(['Manager/MyTeamOverTimeDetails'])
    // this.AliprojectService.saveData('value');
  }


  teamleave() {
    this.router.navigate(['Manager/MyTeamLeaveDetails']);
  }

  applyleave() {
    this.router.navigate(['/Employee/LeaveRequestDash']);
  }

  overtimeDash() {
    this.router.navigate(['/Employee/OverTimeDetailsDash']);
  }

  AddLeave() {
    let ID = undefined

    this.matDialog.open(NewLeaveRequestComponent, {
      data: ID = undefined,
      height: '85%',
      width: '100%'
    }).afterClosed()
      .subscribe(result => {
      });
  }

  announcement() {
    this.router.navigate(['/Employee/AnnouncementsDash']);
  }

  holiday() {
    this.router.navigate(['/Employee/HolidaysDash']);
  }

  public ApplyLoan() {

    localStorage.setItem('Pagename', '');
    this.router.navigate(['/HR/TeamLoans']);
    // this.AliprojectService.saveData('value');
  }


  public EmployeeChangeRequest() {


    localStorage.setItem('Pagename', 'Personal Information Update')

    // if (this.login == '6' || this.login == '2') {
    //   localStorage.setItem('Pagename', 'Employee Change Request')
    //   this.router.navigate(['/HR/EmployeeChangeRequestDashboard']);
    // }
    if (this.roledid != '9') {
      localStorage.setItem('Pagename', 'Personal Information Update')
      this.router.navigate(['/HR/EmployeeChangeRequestDashboard']);

    }
    else if (this.roledid == '9') {
      localStorage.setItem('Pagename', '')
      this.router.navigate(['/HR/TeamEmployeChangeRequestDetails']);

    }
  }

  modalimage: any;
  modaldesc: any;
  modaltitle: any;
  announcementdate: any;
  getannouncement(item: any) {
    this.modalimage = item.attachment;
    this.modaldesc = item.description;
    this.modaltitle = item.name;
    this.announcementdate = item.dateTime

  }

  changependinglist: any
  changeapprovelist: any
  changerequestlist: any

}