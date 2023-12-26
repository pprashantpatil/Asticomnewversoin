import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manager-graph-dash',
  templateUrl: './manager-graph-dash.component.html',
  styleUrls: ['./manager-graph-dash.component.css']
})
export class ManagerGraphDashComponent implements OnInit {

  constructor(public router: Router, private datePipe: DatePipe, public DigiofficeService: DigiofficecorehrService, private http: HttpClient) { }
  username: any;
  email: any;
  month: any;
  day: any;
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
  Pendingcountforsupervisor: any;
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
  pendingotcount1: any;
  approvedotcount1: any;
  Rejectedotcount1: any;
  teamot: any;
  medicalurl: any;
  public attachments21: any = [];
  public attachments: any = [];
  public attachmentsurl: any = [];
  showPopup: number = 0;
  messageId: number = 0;
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.roledid = localStorage.getItem('roledid');
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.province = localStorage.getItem('Province')
    var dateObj = new Date();
    this.month = dateObj.getUTCMonth() + 1; //months from 1-12
    this.day = dateObj.getUTCDate();
    this.myDate = new Date();
    this.filtereddate = formatDate(myDate, format, locale);
    this.todaydate = this.filtereddate;
    debugger
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
    //this.GetAttendanceByEmployeeIDforpunchin();
    this.GetStaffCountOverTimeDetails();
    this.CheckpunchInReset();
    this.GetAnnouncementsByBuildingID();
    this.getDetails();
   


    //  this.GetAttendanceByEmployeeIDforpunchin1();
    this.GetHolidays();
    this.GetAnnouncements();
   // this.changeAnniversary();

    this.GetEmployeeLoansCountforDashboard();


    this.GetStaffLeaveCountForDashboard1();

    //this.GetMyDetailsByStaffID();
  }

  currenttime: any;
  resettime: any;
  public CheckpunchInReset() {
    debugger
    this.DigiofficeService.GetCurrentPhTime(this.staffID, this.todaydate, this.todaydate)
      .subscribe({
        next: data => {
          debugger
          let temp: any = data;
          this.currenttime = temp[0].currenttime;
          this.resettime = temp[0].resettime;
          console.log('this.currenttime', this.currenttime);
          console.log('this.resettime', this.resettime);
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


  public GetAttendanceByEmployeeID1() {
    this.DigiofficeService.GetAttendanceByEmployeeIDforpunchin(this.staffID, this.todaydate, this.todaydate)
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
  public GetAttendanceByEmployeeID() {
    this.DigiofficeService.GetAttendanceByEmployeeIDforpunchin(this.staffID, this.todaydate, this.todaydate)
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

  public GetAnnouncementsByBuildingID() {
    this.DigiofficeService.GetAnnouncementsByBuildingID(56)
      .subscribe({
        next: data => {
          debugger
          this.somelist = data.filter(x => x.filterdate >= this.todaydate);
          this.announcementname = this.somelist[0].name;
          this.description = this.somelist[0].description;
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Announcements');
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

  public GetMyDetailsByStaffID() {
    this.DigiofficeService.GetMyDetailsByStaffID(this.staffID)
      .subscribe({
        next: data => {
          debugger
          let temp: any = data;
          this.profilepercentage = temp[0].profilepercentage * 9;
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting My Details By Staff ID');
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

  public GetAttendanceByEmployeeIDforpunchin() {
    this.DigiofficeService.GetAttendanceByEmployeeIDforpunchin(this.staffID, this.todaydate, this.todaydate)
      .subscribe({
        next: data => {
          debugger
          let temp: any = data;
          this.punchintime = temp[0].signinDate;
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

  public GetAttendanceByEmployeeIDforpunchin1() {
    this.DigiofficeService.GetAttendanceByEmployeeIDforpunchin(this.staffID, this.todaydate, this.todaydate)
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



  public GetEmployeeLoansCountforDashboard() {
    this.DigiofficeService.GetEmployeeLoansCountforDashboard(localStorage.getItem('staffid'))
      .subscribe({
        next: data => {
          debugger
          this.stafflist = data;
          let temp = this.stafflist

          this.newrquestloancount = temp[0].pendingcountforhr;
          this.approvedloancount = temp[0].approvedcountforhr;
          this.rejectedloancount = temp[0].rejectedcountforhr;
          this.loader = false;

        }, error: (err) => {
          // Swal.fire('Issue in Getting Employee Loans Count For Dashboard');
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


  public GetEmployeeLoansCountforDashboard1() {
    this.DigiofficeService.GetEmployeeLoansCountforDashboard(localStorage.getItem('staffid')).subscribe(data => {
      debugger
      this.stafflist = data;
      let temp = this.stafflist

      this.newrquestloancount = temp[0].pendingcountforhr;
      this.approvedloancount = temp[0].approvedcountforhr;
      this.rejectedloancount = temp[0].rejectedcountforhr;
      this.loader = false;
    });
  }


  CancelledCount1: any;
  CancelledCountforsupervisor: any;
  public GetStaffLeaveCountForDashboard1() {
    this.DigiofficeService.GetStaffLeaveCountForDashboard(localStorage.getItem('staffid'), 1, "01-01-2020", "01-01-2025")
      .subscribe({
        next: data => {
          debugger
          this.myleaves = data;
          this.loader = false;
          let temp1 = this.myleaves
          this.pendingcount1 = temp1[0].pendingcount
          this.approvedcount1 = temp1[0].approvedcount
          this.Rejectedcount1 = temp1[0].rejectedcount
          this.CancelledCount1 = temp1[0].cancelcount
          this.Pendingcountforsupervisor = temp1[0].pendingcountforsupervisor
          this.approvedcountforsupervisor = temp1[0].approvedcountforsupervisor
          this.rejectedcountforsupervisor = temp1[0].rejectedcountforsupervisor
          this.CancelledCountforsupervisor = temp1[0].cancelcountsupervisor
          this.pendingcountforhr = temp1[0].pendingcountforhr
          this.approvedcountforhr = temp1[0].approvedcountforhr
          this.rejectedcountforhr = temp1[0].rejectedcountforhr
          this.CancelledCount = temp1[0].cancelcountsupervisor
        }, error: (err) => {
          // Swal.fire('Issue in Getting Staff Leave Count For Dashboard');
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
  cancelledotcount: any;
  public GetStaffCountOverTimeDetails() {
    this.DigiofficeService.GetStaffOTCountForDashboard(localStorage.getItem('staffid'), 1, "01-01-2020", "01-01-2025")
      .subscribe({
        next: data => {
          debugger
          this.teamot = data;
          this.loader = false;
          let temp1 = this.teamot;
          this.pendingotcount1 = temp1[0].pendingotcount;
          this.approvedotcount1 = temp1[0].approvedotcount;
          this.Rejectedotcount1 = temp1[0].rejectedotcount;
          this.cancelledotcount = temp1[0].cancelledcount;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Staff OT Count For Dashboard');
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




  public getipaddress() {
    debugger
    this.DigiofficeService.getIPAddress()
      .subscribe({
        next: data => {
          debugger
          let temap: any = data;
          this.ipaddress = temap.ip;
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting IP Address');
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

  public holidays() {
    this.router.navigate(['/Admin/HolidayDashboard']);
    this.loader = false;
  }

  public changebirthday() {
    debugger;
    localStorage.setItem('birthday', String(this.day).concat('-', String(this.month)))
    this.Anniversery = false;
    this.Birthday = true;
    this.BirthdayView = false;
    this.NewJoinee = false;
    this.DigiofficeService.GetAllStaffNew()
      .subscribe({
        next: data => {
          debugger
          this.Anniverserylist1 = data.filter(x => x.dobdate == String(this.day).concat('-', String(this.month)));
          this.loader = false;
          this.name = this.Anniverserylist1[0].name
          this.middle_Name = this.Anniverserylist1[0].middle_Name
          this.mobile = this.Anniverserylist1[0].mobile
          this.emailID = this.Anniverserylist1[0].emailID
        }, error: (err) => {
          // Swal.fire('Issue in Getting My Details');
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

  public changebirthdayView() {
    debugger;
    this.loader = true;
    localStorage.setItem('birthdayview', String(this.day).concat('-', String(this.month)));
    this.Anniversery = false;
    this.BirthdayView = true;
    this.NewJoinee = false;
    this.DigiofficeService.GetAllStaffNew()
      .subscribe({
        next: data => {
          debugger
          this.AnniverserylistView = data.filter(x => x.dobdate == String(this.day).concat('-', String(this.month)));
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting My Details');
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

  public changenewjoinee() {
    debugger;
    this.loader = true;
    this.Anniversery = false;
    this.Birthday = false;
    this.BirthdayView = false;
    this.NewJoinee = true;
    this.DigiofficeService.GetAllStaffNew()
      .subscribe({
        next: data => {
          debugger
          this.Anniverserylist2 = data.filter(x => x.joiningDate == this.myDate + "T00:00:00");
          this.loader = false;
          this.name = this.Anniverserylist2[0].name
          this.middle_Name = this.Anniverserylist2[0].middle_Name
          this.mobile = this.Anniverserylist2[0].mobile
          this.emailID = this.Anniverserylist2[0].emailID
        }, error: (err) => {
          // Swal.fire('Issue in Getting My Details');
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

  public Profilecompletion() {
    this.router.navigate(['/HR/AddressDetailsWizard', localStorage.getItem('EmployeeID')]);
    this.loader = false;
  }

  newannnounecemnetlist: any
  nonewannnounecemnet: any;
  public GetAnnouncements() {
    debugger
    this.DigiofficeService.GetAnnouncementsByBuildingID(56)
      .subscribe({
        next: data => {
          debugger
          this.newannnounecemnetlist = data.filter(x => x.filterdate >= this.todaydate);
        }, error: (err) => {
          // Swal.fire('Issue in Getting Announcements');
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
  Certificate_url_second: any;
  BoosterDoseCertificate: any;
  public getDetails() {
    debugger
    this.DigiofficeService.GetEmployeeVaccinationDetails()
      .subscribe({
        next: data => {
          debugger
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
          } else {
            this.loader = false;
            this.FirstDoseDate = null,
              this.certificate_url = 'https://asticom.digiofficeapp.com/Amazepayrollapi/Images/EmptyProfile/noimage.png',
              this.Certificate_url_second = 'https://asticom.digiofficeapp.com/Amazepayrollapi/Images/EmptyProfile/noimage.png',
              this.BoosterDoseCertificate = 'https://asticom.digiofficeapp.com/Amazepayrollapi/Images/EmptyProfile/noimage.png',
              this.SecondDoseDate = null,
              this.BoosterName = null,
              this.BoosterDoseDate = null
          }

        }, error: (err) => {
          // Swal.fire('Issue in Getting Employee Vaccination Details');
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

  public dispyList: any = [];
  public GetHolidays() {
    debugger
    this.DigiofficeService.GetHolidays()
      .subscribe({
        next: data => {
          debugger
          this.holidaylist = data
          this.loader = false;
          // this.holidaylist1 = data.filter(x => x.region == this.province || x.region == null);
          this.holidaylist1 = data
          this.topholidayname = this.holidaylist[0].holiday;
          this.topholidaydate = this.holidaylist[0].holidayDate;
          this.tpholidayattachment = this.holidaylist[0].attachment;
          for (let i = 0; i <= this.holidaylist1.length; i++) {
            if (this.dispyList.length < 3) {
              this.dispyList.push(this.holidaylist1[i]);
            }
            else {

            }

          }

        }, error: (err) => {
          // Swal.fire('Issue in Getting Hoilday');
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
            this.showPopup = 0;
            if (this.punchintime != undefined) {
              /*       Swal.fire('Already Punched In for the day'); */
              this.loader = false;
              this.showPopup = 1;
              this.messageId = 35;
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
                      /*   Swal.fire('Already Punched In for the day'); */
                      this.loader = false;
                      this.showPopup = 1;
                      this.messageId = 35;
                    }
                    else {
                      this.punchinId = data;
                      localStorage.setItem('PunchINid', this.punchinId);
                      /*  Swal.fire('Punched In Successfully'); */
                      this.loader = false;
                      this.showPopup = 1;
                      this.messageId = 36;
                      this.DigiofficeService.GetAttendanceByEmployeeIDforpunchin(this.staffID, this.todaydate, this.todaydate).subscribe(data => {
                        debugger
                        let temp: any = data;
                        this.punchintime = temp[0].signinDate;
                        this.loader = false;
                      })
                    }
                  }, error: (err) => {
                    // Swal.fire('Issue in Inserting Attendance Web');
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
          }

          this.loader = false;
        }, error: (err) => {

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

  public punchout() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    if (this.punchouttime != undefined) {
      /*   Swal.fire('Already Punched Out for the day'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 37;
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
                  SignoutDate: new Date(),
                  SignoutLocation: 'Office',
                  StatusID: 2,
                  punchoutip: this.ipaddress == undefined ? '101.120.111.222' : this.ipaddress,
                }
                this.DigiofficeService.UpdateAttendanceWeb(entity)
                  .subscribe({
                    next: data => {
                      debugger
                      if (data != 0) {
                        /*   Swal.fire('Punched Out Successfully'); */
                        localStorage.removeItem('PunchINid');
                        this.loader = false;
                        this.showPopup = 1;
                        this.messageId = 38;
                      
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
                  SignoutDate: new Date(),
                  SignoutLocation: 'Office',
                  StatusID: 2,
                  punchoutip: this.ipaddress == undefined ? '101.120.111.222' : this.ipaddress,
                }
                this.DigiofficeService.UpdateAttendanceWeb(entity)
                  .subscribe({
                    next: data => {
                      debugger
                      if (data != 0) {
                        /*   Swal.fire('Punched Out Successfully'); */
                        localStorage.removeItem('PunchINid');
                        this.loader = false;
                        this.showPopup = 1;
                        this.messageId = 38;
                      
                        this.DigiofficeService.GetAttendanceByEmployeeIDforpunchin(this.staffID, this.todaydate, this.todaydate)
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
                  SignoutDate: new Date(),
                  SignoutLocation: 'Office',
                  StatusID: 2,
                  punchoutip: this.ipaddress == undefined ? '101.120.111.222' : this.ipaddress,
                }
                this.DigiofficeService.UpdateAttendanceWeb(entity)
                  .subscribe({
                    next: data => {
                      debugger
                      if (data != 0) {
                        /*   Swal.fire('Punched Out Successfully'); */
                        localStorage.removeItem('PunchINid');
                        this.loader = false;
                        this.showPopup = 1;
                        this.messageId = 38;
                      
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
                  SignoutDate: new Date(),
                  SignoutLocation: 'Office',
                  StatusID: 2,
                  punchoutip: this.ipaddress == undefined ? '101.120.111.222' : this.ipaddress,
                }
                this.DigiofficeService.UpdateAttendanceWeb(entity)
                  .subscribe({
                    next: data => {
                      debugger
                      if (data != 0) {
                        /*   Swal.fire('Punched Out Successfully'); */
                        localStorage.removeItem('PunchINid');
                        this.loader = false;
                        this.showPopup = 1;
                        this.messageId = 38;
                        this.DigiofficeService.GetAttendanceByEmployeeIDforpunchin(this.staffID, this.todaydate, this.todaydate)
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
                  SignoutDate: new Date(),
                  SignoutLocation: 'Office',
                  StatusID: 2,
                  punchoutip: this.ipaddress == undefined ? '101.120.111.222' : this.ipaddress,
                }
                this.DigiofficeService.UpdateAttendanceWeb(entity)
                  .subscribe({
                    next: data => {
                      debugger
                      if (data != 0) {
                        /*   Swal.fire('Punched Out Successfully'); */
                        localStorage.removeItem('PunchINid');
                        this.loader = false;
                        this.showPopup = 1;
                        this.messageId = 38;
                       
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
                  SignoutDate: new Date(),
                  SignoutLocation: 'Office',
                  StatusID: 2,
                  punchoutip: this.ipaddress == undefined ? '101.120.111.222' : this.ipaddress,
                }
                this.DigiofficeService.UpdateAttendanceWeb(entity)
                  .subscribe({
                    next: data => {
                      debugger
                      if (data != 0) {
                        /*   Swal.fire('Punched Out Successfully'); */
                        localStorage.removeItem('PunchINid');
                        this.loader = false;
                        this.showPopup = 1;
                        this.messageId = 38;
                       
                        this.DigiofficeService.GetAttendanceByEmployeeIDforpunchin(this.staffID, this.todaydate, this.todaydate)
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

  public changeAnniversary() {
    debugger;
    this.loader = true;
    this.Anniversery = true;
    this.Birthday = false;
    this.BirthdayView = false;
    this.NewJoinee = false;
    this.DigiofficeService.GetAllStaffNew()
      .subscribe({
        next: data => {
          debugger
          this.loader = false;
          this.Anniverserylist = data.filter(x => x.anniversarydate == String(this.day).concat('-', String(this.month)));
          this.name = this.Anniverserylist[0].name
          this.middle_Name = this.Anniverserylist[0].middle_Name
          this.mobile = this.Anniverserylist[0].mobile
          this.emailID = this.Anniverserylist[0].emailID
        }, error: (err) => {
          // Swal.fire('Issue in Getting My Details');
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

  public getwishdate() {
    this.DigiofficeService.GetAllStaffNew()
      .subscribe({
        next: data => {
          debugger
          this.Anniverserylist = data.filter(x => x.date_Of_Marriage == this.myDate + "T00:00:00");
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting My Details');
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

  public getannouncementurl(medicalurl: any) {
    debugger
    this.medicalurl = medicalurl;
  }

  onSelect21(event: any) {
    debugger
    this.showPopup = 0;
    console.log(event);
    if (event.addedFiles[0].size / 1048576 > 2) {
      /*  Swal.fire('Please Upload File Less than 2 MB.') */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 14;
    } else {
      this.attachments21 = [];
      this.attachments21.push(...event.addedFiles);
      for (let i = 0; i < this.attachments21.length; i++) {
        this.DigiofficeService.UploadmultipleProjectAttachments(this.attachments21[i])
          .subscribe({
            next: data => {
              debugger
              if (data != undefined) {
                this.attachmentsurl.push(data);
                this.loader = false;
              }
            }, error: (err) => {
              // Swal.fire('Issue in Inserting Project Attachments');
              this.loader = false;
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
    }
  }

  onRemove21(event: any) {
    debugger
    console.log(event);
    this.attachments21.splice(this.attachments.indexOf(event), 1);
  }

  public UpdateVaccinationDetails() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    var entity = {
      ID: this.staffID,
      Certificate_url: this.attachmentsurl[0],
      vtype: 1
    }
    this.DigiofficeService.UpdateVaccinationDetails(entity)
      .subscribe({
        next: data => {
          debugger
          /*  Swal.fire("Updated Successfully"); */
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 10;
          location.reload();
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Updating Vaccination Details');
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

  public UpdateVaccinationDetails1() {
    debugger
    this.showPopup = 0;
    this.loader = true;
    var entity = {
      ID: this.staffID,
      Certificate_url: this.attachmentsurl[0],
      vtype: 2
    }
    this.DigiofficeService.UpdateVaccinationDetails(entity)
      .subscribe({
        next: data => {
          debugger
          /*  Swal.fire("Updated Successfully"); */
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 10;
          location.reload();
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Updating Vaccination Details');
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

  public UpdateVaccinationDetails2() {
    debugger
    this.loader = true;
    var entity = {
      ID: this.staffID,
      Certificate_url: this.attachmentsurl[0],
      vtype: 3
    }
    this.DigiofficeService.UpdateVaccinationDetails(entity)
      .subscribe({
        next: data => {
          debugger
          /*  Swal.fire("Updated Successfully"); */
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 10;
          location.reload();
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Updating Vaccination Details');
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

}