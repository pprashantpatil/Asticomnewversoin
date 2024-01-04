import { DatePipe,formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { OverTimeDetailsDashComponent } from '../../employee/Attendance/over-time-details-dash/over-time-details-dash.component';
import { OverTimeDetailsFormComponent } from '../../employee/Attendance/over-time-details-form/over-time-details-form.component';
import { NewLeaveRequestComponent } from '../../employee/Requests/new-leave-request/new-leave-request.component';
@Component({
  selector: 'app-hrdashboard',
  templateUrl: './hrdashboard.component.html',
  styleUrls: ['./hrdashboard.component.css']
})
export class HrdashboardComponent implements OnInit {

  constructor(public DigiofficeService: DigiofficecorehrService,private matDialog: MatDialog, public router: Router, private datePipe: DatePipe,  private http: HttpClient) { }
  username: any;
  email: any;
  month: any;
  day: any;
  public dispyList: any = [];
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
  profiletab:any;
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
  companyid: any;
  workType: any;
  public attachments21: any = [];
  public attachments: any = [];
  public attachmentsurl: any = [];
  Certificate_url_second: any;
  BoosterDoseCertificate: any;
  AttendanceEnable: any;
  show: any;
  Band: any;
  loader: any;
  firstAttachment: any;
  Name: any;
  dateTime: any;
  filetype: any;
  punchoutworkType: any;
  OnBoardingInisiationList: any
  OnBoardingInisiationListpostjoining: any;
  onboardingcount: any;
  requestcount: any;
  changependinglist: any;
  changeapprovelist: any;
  time: any;
  hh: any;
  mm: any;
  ampm: any;
  LastDayOfMonth: any
  workType1: any;
  punchoutworkType1: any;
  loanenable:any;
  firstDayofcurrentmonth1: any
  LastDayOfMonth1: any
  attendancelistforcount: any;
  presentcount: any;
  loanconfiglist:any;
  TodayFilterdate:any;
  hrapprovalConfiglist: any;
  HRManager: any;
  HREmailID: any;
  HRName: any;
  profilepercentage1:any;
 
  contact:any;
  dependent:any;
  emplhist:any;
  edu:any;
  nomi:any;
  bankID:any;
  iddet:any;

  ngOnInit(): void {
    const format = 'MM-dd-yyyy';
    const formatfilter = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.workType = '0';
    this.firstDayofcurrentmonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    this.LastDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 30);
    this.firstDayofcurrentmonth1 = formatDate(this.firstDayofcurrentmonth, format, locale);
    this.LastDayOfMonth1 = formatDate(this.LastDayOfMonth, format, locale);
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
    this.loader = true;
    this.show = false;
    this.username = localStorage.getItem('UserName');
    this.email = localStorage.getItem('email');
    this.Band = localStorage.getItem('Band');
    this.currentUrl = window.location.href;
    this.AttendanceEnable = sessionStorage.getItem('AttendanceEnable');
    this.roledid = localStorage.getItem('roledid');
    this.companyid = sessionStorage.getItem('companyid');
    this.province = localStorage.getItem('Province')
    var dateObj = new Date();
    this.month = dateObj.getUTCMonth() + 1; //months from 1-12
    this.day = dateObj.getUTCDate();
    this.todaydate = formatDate(myDate, format, locale);
    this.TodayFilterdate = formatDate(myDate, formatfilter, locale);

    this.firstDayofcurrentmonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    this.firstDayofcurrentmonth = formatDate(this.firstDayofcurrentmonth, format, locale);
    this.showfront = true;
    this.Anniversery = true;
    this.Birthday = false;
    this.BirthdayView = false;
    this.NewJoinee = false;
    this.staffID = localStorage.getItem('staffid');
    this.DigiofficeService.GetLoanConfiguration()
    .subscribe({
      next: data => {
        this.loanconfiglist = data.filter(x=>x.approver1 == this.staffID || x.approver2 == this.staffID || x.loanprocessor == this.staffID || x.approver3 == this.staffID || x.approver4 == this.staffID || x.approver5 == this.staffID)
        if(this.loanconfiglist.length!=0){
          this.loanenable=1;
        }
        else{
          this.loanenable=0;        }
      }
    })
   // this.GetHRApprove() 
    this.GetAttendanceself();
   // this.GetEmployeeDataChangeDetails();
    this.GetOnBoardingInisiation();
    this.GetEmployeeLoansCountforDashboard1();
    this.GetStaffLeaveCountForDashboard1();
    this.GetAttendanceInit();
    //this.getipaddress();;
    this.GetHolidays();
    this.GetAnnouncements();
  //  this.GetMyDetailsByStaffID();
    //this.GetAttendance1();
  }@ViewChild('carousel', { 'static': true })
  carousel!: NgbCarousel;

  public GetMyDetailsByStaffID() {
    this.loader = true;
    this.DigiofficeService.GetMyDetailsByStaffID(this.staffID)
      .subscribe({
        next: data => {
           
          let temp: any = data;
          this.profilepercentage = temp[0].profilepercentage * 9;
          this.loader = false;
        }, error: (err) => {
         // 
         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              
            },
          )
        }
      })
  }


  // public GetHRApprove() {
  //   this.loader = true;
  //   this.DigiofficeService.GetHRApprovalConfigration()
  //     .subscribe({
  //       next: data => {
  //         this.hrapprovalConfiglist = data.filter(x => x.subsidaryid == this.companyid)
  //         this.HRManager = this.hrapprovalConfiglist[0].hrid
  //         this.HREmailID = this.hrapprovalConfiglist[0].emailID
  //         this.HRName = this.hrapprovalConfiglist[0].fullname
  //         this.loader = false;
  //       }, error: (err) => {
  //         
  //         this.loader = false;

  //        var obj = {
  //           'PageName': this.currentUrl,
  //           'ErrorMessage': err.error.message,
  //           'StaffID':localStorage.getItem('staffid')
  //         }
  //         this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
  //           data => {
                
  //           },
  //         )
  //       }
  //     })

  // }

  public GetAttendanceself() {
    this.loader = true;
    this.DigiofficeService.GetAttendanceByEmployeeID(this.staffID, this.firstDayofcurrentmonth1, this.LastDayOfMonth1)
      .subscribe({
        next: data => {
       
          this.attendancelistforcount = data;
          this.presentcount = this.attendancelistforcount.length
          this.loader = false;
        }, error: (err) => {
         // 
         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
            
            },
          )
        }
      })
  }

  public GetStaffLeaveCountForDashboard() {
    this.DigiofficeService.GetStaffLeaveCountForDashboard(localStorage.getItem('staffid'), 1, "01-01-2023", "01-12-2023").subscribe(data => {
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


  public GetAttendanceInit() {
  
    this.loader = true;
    var date = new Date();
    this.DigiofficeService.GetAttendance()
      .subscribe({
        next: data => {
          
          let temp: any = data.filter(x => x.userID == localStorage.getItem('staffid') && x.filterdate == this.formatDate(date));
          if (temp.length == 0) {
            this.punchintime = null;
            this.punchouttime = null;
            this.loader = false;
          } else {
            this.punchintime = temp[0].startTime;
            this.punchouttime = temp[0].endTime;
            this.workType1 = temp[0].workType;
            this.punchoutworkType1 = temp[0].punchoutWorkType
            // window.alert("punchouttime " + this.punchouttime + "punchintime " + this.punchintime);
            this.loader = false;
          }
        }, error: (err) => {
          
         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              
            },
          )
        }
      })
  }


  // public GetAttendanceByEmployeeID() {
  //    
  //   this.DigiofficeService.GetAttendanceByEmployeeID(this.staffID, this.todaydate, this.todaydate)
  //     .subscribe({
  //       next: data => {
  //          
  //         let temp: any = data;
  //         this.loader=false;
  //         /* this.punchintime = temp[0].signinDate; */
  //       }, error: (err) => {
  //         
  //        
  //         var obj = {
  //           'PageName': this.currentUrl,
  //           'ErrorMessage': err.error.message
  //         }
  //         this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
  //           data => {
  //              
  //           },
  //         )
  //       }
  //     })
  // }

  public GetAttendanceByEmployeeID1() {
    this.loader = true;
    this.DigiofficeService.GetAttendanceByEmployeeID(this.staffID, this.todaydate, this.todaydate)
      .subscribe({
        next: data => {
          let temp: any = data;
          this.punchouttime = temp[0].signoutDate;
          this.loader = false;
        }, error: (err) => {
          
         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              
            },
          )
        }
      })
  }

  public GetAttendance() {
    this.loader = true;
    this.DigiofficeService.GetAttendance()
      .subscribe({
        next: data => {
          
          let teamregularization: any = data.filter(x => x.supervisor == this.staffID);
          this.pendingreg = teamregularization.filter((x: { approve: number; }) => x.approve != 1).length;
          this.approevedreg = teamregularization.filter((x: { approve: number; }) => x.approve == 1).length;
          this.loader = false;
        }, error: (err) => {
          
         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              
            },
          )
        }
      })
  }

  public GetEmployeeLoansCountforDashboard() {
    this.loader = true;
    this.DigiofficeService.GetEmployeeLoansCountforDashboard(localStorage.getItem('staffid'))
      .subscribe({
        next: data => {
          this.stafflist = data;
          let temp = this.stafflist
          this.newrquestloancount = temp[0].pendingcountforhr;
          this.approvedloancount = temp[0].approvedcountforhr;
          this.rejectedloancount = temp[0].rejectedcountforhr;
          this.loader = false;
        }, error: (err) => {
          
         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
            
            },
          )
        }
      })
  }

  public GetAttendance1() {
    this.loader = true;
    this.DigiofficeService.GetAttendance().subscribe(data => {
      let teamregularization: any = data.filter(x => x.supervisor == this.staffID);
      this.pendingreg = teamregularization.filter((x: { approve: number; }) => x.approve != 1).length;
      this.approevedreg = teamregularization.filter((x: { approve: number; }) => x.approve == 1).length;
      this.loader = false;
    })
  }

  public GetEmployeeLoansCountforDashboard1() {
    this.loader = true;
    this.DigiofficeService.GetEmployeeLoansCountforDashboard(localStorage.getItem('staffid')).subscribe(data => {
      this.stafflist = data;
      let temp = this.stafflist
      this.newrquestloancount = temp[0].pendingcountforhr;
      this.approvedloancount = temp[0].approvedcountforhr;
      this.rejectedloancount = temp[0].rejectedcountforhr;
      this.loader = false;
    });
  }

  // public GetStaffLeaveCountForDashboard() {
  //   this.DigiofficeService.GetStaffLeaveCountForDashboard(localStorage.getItem('staffid'), 1, "01-01-2020", "01-01-2025").subscribe(data => {
  //      
  //     this.myleaves = data;
  //     let temp1 = this.myleaves
  //     this.pendingcount1 = temp1[0].pendingcount;
  //     this.approvedcount1 = temp1[0].approvedcount;
  //     this.Rejectedcount1 = temp1[0].rejectedcount;
  //     this.CancelledCount = temp1[0].cancelcount;
  //     this.pendingcountforsupervisor = temp1[0].pendingcountforsupervisor
  //     this.approvedcountforsupervisor = temp1[0].approvedcountforsupervisor
  //     this.rejectedcountforsupervisor = temp1[0].rejectedcountforsupervisor
  //     this.CancelledCount = temp1[0].cancelcountsupervisor
  //     this.pendingcountforhr = temp1[0].pendingcountforhr
  //     this.approvedcountforhr = temp1[0].approvedcountforhr
  //     this.rejectedcountforhr = temp1[0].rejectedcountforhr
  //     this.CancelledCount = temp1[0].cancelcountsupervisor
  //     this.loader=false;
  //   });
  // }

  public GetStaffLeaveCountForDashboard1() {
    this.loader = true;
    this.DigiofficeService.GetStaffLeaveCountForDashboard(localStorage.getItem('staffid'), 1, "01-01-2020", "01-01-2025")
      .subscribe({
        next: data => {
          this.myleaves = data;
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
          this.loader = false;
        }, error: (err) => {
          
         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              
            },
          )
        }
      })
  }

  public getipaddress() {
   
    this.loader = true;
    this.DigiofficeService.getIPAddress()
      .subscribe({
        next: data => {
        
          let temap: any = data
          this.ipaddress = temap.ip
          this.loader = false;
        }, error: (err) => {
          //        
         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              
            },
          )
        }
      })
  }

  public holidays() {
    this.router.navigate(['/Admin/HolidayDashboard'])
    this.loader = false;
  }

  // public changebirthday() {
  //    ;
  //   this.loader = true;
  //   localStorage.setItem('birthday', String(this.day).concat('-', String(this.month)))
  //   this.Anniversery = false;
  //   this.Birthday = true;
  //   this.BirthdayView = false;
  //   this.NewJoinee = false;
  //   this.DigiofficeService.GetMyDetails()
  //     .subscribe({
  //       next: data => {
  //          
  //         this.Anniverserylist1 = data.filter(x => x.dobdate == String(this.day).concat('-', String(this.month)))
  //         this.name = this.Anniverserylist1[0].name
  //         this.middle_Name = this.Anniverserylist1[0].middle_Name
  //         this.mobile = this.Anniverserylist1[0].mobile
  //         this.emailID = this.Anniverserylist1[0].emailID
  //         this.loader = false;
  //       }, error: (err) => {
  //                 
  //         var obj = {
  //           'PageName': this.currentUrl,
  //           'ErrorMessage': err.error.message
  //         }
  //         this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
  //           data => {
  //              
  //           },
  //         )
  //       }
  //     })
  // }

  // public changebirthdayView() {
  //    ;
  //   this.loader = true;
  //   localStorage.setItem('birthdayview', String(this.day).concat('-', String(this.month)))
  //   this.Anniversery = false;
  //   this.BirthdayView = true;
  //   this.NewJoinee = false;
  //   this.DigiofficeService.GetMyDetails()
  //     .subscribe({
  //       next: data => {
  //          
  //         this.AnniverserylistView = data.filter(x => x.dobdate == String(this.day).concat('-', String(this.month)));
  //         this.loader = false;
  //       }, error: (err) => {
  //         

  //         var obj = {
  //           'PageName': this.currentUrl,
  //           'ErrorMessage': err.error.message
  //         }
  //         this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
  //           data => {
  //              
  //           },
  //         )
  //       }
  //     })
  // }

  // public changenewjoinee() {
  //    ;
  //   this.Anniversery = false;
  //   this.Birthday = false;
  //   this.BirthdayView = false;
  //   this.NewJoinee = true;
  //   this.DigiofficeService.GetMyDetails()
  //     .subscribe({
  //       next: data => {
  //          
  //         this.Anniverserylist2 = data.filter(x => x.joiningDate == this.myDate + "T00:00:00");
  //         this.name = this.Anniverserylist2[0].name
  //         this.middle_Name = this.Anniverserylist2[0].middle_Name
  //         this.mobile = this.Anniverserylist2[0].mobile
  //         this.emailID = this.Anniverserylist2[0].emailID
  //         this.loader = false;
  //       }, error: (err) => {
  //         

  //         var obj = {
  //           'PageName': this.currentUrl,
  //           'ErrorMessage': err.error.message
  //         }
  //         this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
  //           data => {
  //              
  //           },
  //         )
  //       }
  //     })
  // }

  public Profilecompletion() {
    localStorage.setItem('Pagename', 'My Profile');
    // this.router.navigate(['/HR/AddressDetailsWizard', this.staffID])
    this.router.navigate(['/Employee/MyProfiletabs', this.staffID]);
   // this.DigiofficeService.saveData('value');
  }

  public GetAnnouncements() {
   
    this.loader = true;
    this.DigiofficeService.GetAnnouncementsByBuildingID(56)
      .subscribe({
        next: data => {
         
          this.annnounecemnetlist = data.filter(x => x.filterdate == this.TodayFilterdate);
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
        }, error: (err) => {
          
          this.loader = false;
         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
               
            },
          )
        }
      })
  }

  public GetHolidays() {
    this.loader = true;
    this.DigiofficeService.GetHolidays()
      .subscribe({
        next: data => {           
          this.holidaylist = data.filter(x => x.filterholidaydate >= this.TodayFilterdate);
          // this.holidaylist1 = data.filter(x => x.region == this.province || x.region == null);
          this.holidaylist1 = data.filter(x => x.filterholidaydate >= this.TodayFilterdate);
          this.topholidayname = this.holidaylist[0].holiday;
          this.topholidaydate = this.holidaylist[0].holidayDate;
          this.tpholidayattachment = this.holidaylist[0].attachment;
          for (let i = 1; i <= this.holidaylist1.length; i++) {
            if (this.dispyList.length < 3) {
              this.dispyList.push(this.holidaylist1[i]);
              this.loader = false;
            }
            else {
              this.loader = false;
            }
          }
        }, error: (err) => {
          
          this.loader = false;
         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
               
            },
          )
        }
      })
  }

  public punchin() {
    this.loader = true;
    if (this.punchintime != undefined) {
      Swal.fire('Already Punched In for the day');
      this.loader = false;
    }
    else if (this.workType == undefined || this.workType == null || this.workType == "0") {
      // Swal.fire('Please Fill Work Type');
      this.loader = false
    }
    else {
      var options = { hour12: false };
      var date = new Date();
      var entity = {
        UserID: localStorage.getItem('staffid'),
        SigninDate: date.toLocaleString('en-US', options),
        SigninLocation: 'Office',
        StatusID: 1,
        punchinip: this.ipaddress == undefined ? '101.120.111.222' : this.ipaddress,
        ApprovalStatus: 'Manager Pending HR Pending',
        WorkType: this.workType
      }
      this.DigiofficeService.InsertAttendanceWeb(entity)
        .subscribe({
          next: data => {
             
            if (data != 0) {
              this.punchinId = data
              localStorage.setItem('PunchINid', this.punchinId)
              // Swal.fire('Punched In Successfully');
              // this.workType =0
              // this.punchoutworkType=0
              this.DigiofficeService.GetAttendanceByEmployeeID(this.staffID, this.todaydate, this.todaydate)
                .subscribe({
                  next: data => {
                     
                    let temp: any = data;
                    this.punchintime = temp[0].startTime;
                    this.workType1 = temp[0].workType;
                    this.punchoutworkType1 = temp[0].punchoutWorkType
                    this.loader = false;

                    this.InsertNotificationPunchIn();
                  }, error: (err) => {
                  //  
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
          }, error: (err) => {
             
          //  
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

  public InsertNotificationPunchIn() {
     
    this.loader = true;
    var entity = {
      'Date': new Date(),
      'Event': 'Attendance Request',
      'FromUser': 'Admin',
      'ToUser': localStorage.getItem('staffid'),
      'Message': 'Punch-In was Successfully recorded',
      'Photo': 'Null',
      'Building': 'Dynamics 1',
      'UserID': localStorage.getItem('staffid'),
      'NotificationTypeID': 15,
      'VendorID': 0
    }
    this.DigiofficeService.InsertNotification(entity)
      .subscribe({
        next: data => {
           
          if (data != 0) {
          }
          // Swal.fire("Saved Successfully");
          this.ngOnInit();
          this.loader = false;
        }, error: (err) => {
          // 
          this.loader = false;
         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
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

  /*   public punchout() {
       
      //this.getipaddress();;
      if (this.punchouttime != undefined) {
        Swal.fire('Already Punched Out for the day');
      }
      else {
        var options = { hour12: false };
        var date = new Date();
        this.DigiofficeService.GetAttendanceByEmployeeID(this.staffID, this.todaydate, this.todaydate)
          .subscribe({
            next: data => {
               
              var todayDate = new Date().toISOString().slice(0, 10);
              let temp: any = data;
              this.punchoutid = temp[0].id;
              var entity = {
                ID: this.punchoutid,
                SignoutDate: date.toLocaleString('en-US', options),
                SignoutLocation: 'Office',
                StatusID: 2,
                punchoutip: this.ipaddress == undefined ? '101.120.111.222' : this.ipaddress,
              }
              this.DigiofficeService.UpdateAttendanceWeb(entity)
                .subscribe({
                  next: data => {
                     
                    if (data != 0) {
                      Swal.fire('Punched Out Successfully');
                      localStorage.removeItem('PunchINid');
                      this.DigiofficeService.GetAttendanceByEmployeeID(this.staffID, this.todaydate, this.todaydate)
                        .subscribe({
                          next: data => {
                             
                            let temp: any = data;
                            this.punchouttime = temp[0].signoutDate;
                          }, error: (err) => {
                          //  
                           
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
                  }, error: (err) => {
                  //  
                   
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
            }, error: (err) => {
            //  
             
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
    } */

  // public changeAnniversary() {
  //    ;
  //   this.Anniversery = true;
  //   this.Birthday = false;
  //   this.BirthdayView = false;
  //   this.NewJoinee = false;
  //   this.DigiofficeService.GetMyDetails()
  //     .subscribe({
  //       next: data => {
  //          
  //         this.Anniverserylist = data.filter(x => x.anniversarydate == String(this.day).concat('-', String(this.month)));
  //         this.name = this.Anniverserylist[0].name
  //         this.middle_Name = this.Anniverserylist[0].middle_Name
  //         this.mobile = this.Anniverserylist[0].mobile
  //         this.emailID = this.Anniverserylist[0].emailID
  //         this.loader = false;
  //       }, error: (err) => {
  //         

  //         var obj = {
  //           'PageName': this.currentUrl,
  //           'ErrorMessage': err.error.message
  //         }
  //         this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
  //           data => {
  //              
  //           },
  //         )
  //       }
  //     })
  // }

  // public getwishdate() {
  //   this.DigiofficeService.GetMyDetails()
  //     .subscribe({
  //       next: data => {
  //          
  //         this.Anniverserylist = data.filter(x => x.date_Of_Marriage == this.myDate + "T00:00:00");
  //         this.loader = false;
  //       }, error: (err) => {
  //         

  //         var obj = {
  //           'PageName': this.currentUrl,
  //           'ErrorMessage': err.error.message
  //         }
  //         this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
  //           data => {
  //              
  //           },
  //         )
  //       }
  //     })
  // }

  onSelect21(event: any) {
     
     
    this.loader = true;
    if (event.addedFiles[0].size / 1048576 > 2) {
      Swal.fire('Please Upload File Less than 2 MB.');
      this.loader = false;
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
            //  
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
            this.ngOnInit();
            this.loader = false;
          }
        }, error: (err) => {
          
         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
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
            this.ngOnInit();
            this.loader = false;
          }
        }, error: (err) => {
          
         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
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
            this.ngOnInit();
            this.loader = false;
          }
        }, error: (err) => {
          
         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
               
            },
          )
        }
      })
  }

  getpunchoutworktype(event: any) {
    this.punchoutworkType = event?.target.value
  }

  public punchout1() {
     
    this.loader = true
    //this.getipaddress();;
    if (this.punchouttime != undefined) {
      Swal.fire('Already Punched Out for the day');
      this.loader = false
    }
    else if (this.punchintime == undefined) {
      // Swal.fire("You can't punch out as you've not punched in for the day");
      this.loader = false
    }
    else if (this.punchoutworkType == undefined || this.punchoutworkType == null || this.punchoutworkType == "0") {
      // Swal.fire('Please Fill Work Type');
      this.loader = false
    }
    else {
      var options = { hour12: false };
      var date = new Date();
      this.DigiofficeService.GetAttendance()
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
              punchoutworkType: this.punchoutworkType,

            }
            this.DigiofficeService.UpdateAttendanceWeb(entity)
              .subscribe({
                next: data => {
                   
                  if (data != 0) {
                    // Swal.fire('Punched Out Successfully');
                    localStorage.removeItem('PunchINid');
                    this.DigiofficeService.GetAttendanceByEmployeeID(this.staffID, this.todaydate, this.todaydate)
                      .subscribe({
                        next: data => {
                           
                          let temp: any = data;
                          this.punchouttime = temp[0].signoutDate;
                          this.workType1 = temp[0].workType,
                          this.punchoutworkType1 = temp[0].punchoutWorkType
                          this.loader = false;
                          this.InsertNotificationPunchOut();
                        }, error: (err) => {
                          Swal.fire('Not able to punchout now check with Tech Support Team for Issue');
                          this.loader = false
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
                }, error: (err) => {
                //  
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
          }, error: (err) => {
          //  
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
      this.loader = false
    }
  }
  // imageurl:any;
  // public getimageurl(list: any) {
  //    
  //   this.imageurl = list.attachment;
  // }

  public InsertNotificationPunchOut() {
     
    this.loader = true;
    var entity = {
      'Date': new Date(),
      'Event': 'Attendance Correction',
      'FromUser': 'Admin',
      'ToUser': localStorage.getItem('staffid'),
      'Message': 'Punch out was Successfully recorded',
      'Photo': 'Null',
      'Building': 'Dynamics 1',
      'UserID': localStorage.getItem('staffid'),
      'NotificationTypeID': 15,
      'VendorID': 0
    }
    this.DigiofficeService.InsertNotification(entity)
      .subscribe({
        next: data => {
           
          if (data != 0) {
          }
          // Swal.fire("Saved Successfully");
          this.ngOnInit();
          this.loader = false;
        }, error: (err) => {
          // 
          this.loader = false;
         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
               
            },
          )
        }
      })
  }

  public GetOnBoardingInisiation() {
     
    this.loader = true
    this.DigiofficeService.GetOnBoardingInitiation()
      .subscribe({
        next: data => {
           
          this.OnBoardingInisiationList = data.filter(x => x.status != 'Dropped' && x.status != 'Prejoined' && x.status != 'Joined')
          // this.onboardingcount=this.OnBoardingInisiationList.length
          this.OnBoardingInisiationListpostjoining = data.filter(x => x.status == 'Joined' && (x.joiningDone == 1))
          this.onboardingcount = this.OnBoardingInisiationListpostjoining.length
          this.loader = false
        }, error: (err) => {
          
          this.loader = false;
         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
               
            },
          )
        }
      })
  }


  attendance() {
     ;
     localStorage.setItem('Pagename', '');
    this.router.navigate(['/HR/AttendanceDetails']);
    //this.DigiofficeService.saveData('value');
  }

  attendanceCorrection() {
     ;
     localStorage.setItem('Pagename', '');
    this.router.navigate(['/Employee/AttendanceCorrection']);
   // this.DigiofficeService.saveData('value');
  }


  public ApplyOT() {
    localStorage.setItem('Pagename', 'OT Details');
    this.router.navigate(['Manager/MyTeamOverTimeDetails'])
    //this.DigiofficeService.saveData('value');
  }


  teamleave() {
     ;
     localStorage.setItem('Pagename', '');
    this.router.navigate(['HR/HRLeaveRequest']);
   // this.DigiofficeService.saveData('value');
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

  applyleave() {
     ;
     localStorage.setItem('Pagename', '');
    this.router.navigate(['/Employee/LeaveListDashboard']);
    //this.DigiofficeService.saveData('value');
  }
  AddOvertime() {
    let ID = undefined
     
    this.matDialog.open(OverTimeDetailsFormComponent, {
      data: ID = undefined,
      height: '85%',
      width: '100%'
    }).afterClosed()
      .subscribe(result => {
     
      });
  }
  viewovertime() {
     ;
     localStorage.setItem('Pagename', '');
    this.router.navigate(['/HR/MyOverTimeDetails']);
  //  this.DigiofficeService.saveData('value');
  }

  announcement() {
     ;
    localStorage.setItem('Pagename', 'Announcement Dashboard');
    this.router.navigate(['/Admin/AnnouncementsDashboard']);
    //this.DigiofficeService.saveData('value');
  }

  holiday() {
     ;
    localStorage.setItem('Pagename', 'Holiday Dashboard');
    this.router.navigate(['/Admin/Holidaysdashboard']);
    //this.DigiofficeService.saveData('value');
  }
  public ApplyLoan() {
     
     localStorage.setItem('Pagename', '');
    this.router.navigate(['/HR/TeamLoans']);
    //this.DigiofficeService.saveData('value');
  }

  public onboarding() {
     
    localStorage.setItem('Pagename', 'Onboarding Initiation');
    this.router.navigate(['HR/OnboardingInitiationDash']);
   // this.DigiofficeService.saveData('value');
  }


  public personalInfo() {
     
    localStorage.setItem('Pagename', '');
    this.router.navigate(['HR/TeamEmployeChangeRequestDetails']);
   // this.DigiofficeService.saveData('value');
  }

  previousStep() {
      
    //this.isPrevious = true;
    //this.isNext = false;
    this.carousel.prev();
    if (this.carousel.activeId == `ngb-slide-0`) {
      this.isNext = false;
      this.isPrevious = true;
    }
    else {
      this.isNext = true
      this.isPrevious = false;
    }
  }
  isNext:any;
  isPrevious:any;
  nextStep() {
      
    // this.isNext = true;
    //this.isPrevious = false;

    this.carousel.next();
    if (this.carousel.activeId == `ngb-slide-${this.carousel.slides.length - 1}`) {
      this.isNext = true;
      this.isPrevious = false;
    }
    else {
      this.isNext = false
      this.isPrevious = false;
    }

  }

  modalimage:any;
  modaldesc:any;
  modaltitle:any;
  announcementdate:any;
  getannouncement(item:any){
    this.modalimage=item.attachment;
    this.modaldesc = item.description;
    this.modaltitle=item.name;
    this.announcementdate=item.dateTime

  }
  public GetAllStaffNew() {
    debugger
    this.DigiofficeService.GetMyDetailsByStaffID(this.staffID)
      .subscribe({
        next: data => {
            
          let temp: any = data;
           this.profilepercentage = temp[0].profilepercentage ;

           if(temp[0].steps==1){
            this.profiletab=1
            this.contact=2
            this.dependent=0
            this.emplhist=0
            this.edu=0
            this.nomi=0
            this.bankID=0
            this.iddet=0
           }

           else if(temp[0].steps==2){
            this.profiletab=1
            this.contact=2
            this.dependent=3
            this.emplhist=0
            this.edu=0
            this.nomi=0
            this.bankID=0
            this.iddet=0
          }
          else if(temp[0].steps==3){
            this.profiletab=1
            this.contact=2
            this.dependent=3
            this.emplhist=4
            this.edu=0
            this.nomi=0
            this.bankID=0
            this.iddet=0
          }
          else if(temp[0].steps==4){
            this.profiletab=1
            this.contact=2
            this.dependent=3
            this.emplhist=4
            this.edu=5
            this.nomi=0
            this.bankID=0
          }
          else if(temp[0].steps==5){
            this.profiletab=1
            this.contact=2
            this.dependent=3
            this.emplhist=4
            this.edu=5
            this.nomi=6
            this.bankID=0
            this.iddet=0
          }
          else if(temp[0].steps==6){
            this.profiletab=1
            this.contact=2
            this.dependent=3
            this.emplhist=4
            this.edu=5
            this.nomi=6
            this.bankID=7
            this.iddet=0
          }
          else if(temp[0].steps>7){
            this.profiletab=1
            this.contact=2
            this.dependent=3
            this.emplhist=4
            this.edu=5
            this.nomi=6
            this.bankID=7
            this.iddet=8
          }
         

          this.profilepercentage1 = 8-temp[0].steps;

          this.loader = false;
        }, error: (err) => {
          

         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            _data => {
              //  
            },
          )
        }
      })
  }
}
