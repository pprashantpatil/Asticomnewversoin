import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
// import { Session } from 'inspector';
import { MatDialog } from '@angular/material/dialog';
import { AttendanceCorrectionFormComponent } from 'src/app/Modules/employee/Attendance/attendance-correction-form/attendance-correction-form.component';
import { NewLeaveRequestComponent } from 'src/app/Modules/employee/Requests/new-leave-request/new-leave-request.component';
// import { ApplyPreApprovalOTComponent } from '../../hr/Attendance/apply-pre-approval-ot/apply-pre-approval-ot.component';
// import { ApplyloansComponent } from '../Requests/applyloans/applyloans.component';

@Component({
  selector: 'app-employee-dash',
  templateUrl: './employee-dash.component.html',
  styleUrls: ['./employee-dash.component.css']
})
export class EmployeeDashComponent implements OnInit {

  constructor(public router: Router, private datePipe: DatePipe, public DigiofficecorehrService: DigiofficecorehrService, private http: HttpClient, private matDialog: MatDialog) { }
  username: any;
  AttendanceEnable: any;
  email: any;
  month: any;
  workType1:any;
  punchoutworkType1:any;
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
  roleid: any;
  province: any;
  todaydate: any;
  showback: any;
  loader: any;
  showfront: any;
  myDate: any;
  CancelledCount: any;
  staffID: any;
  Rejectedotcount: any;
  profilepercentage: any
  myleaves: any;
  currentUrl: any;
  ipAddress: any;
  pendingteamexpensecount: any;
  Rejectedteamexpnesecount: any;
  approvedteamexpnescount: any;
  pendingreg: any;
  approevedreg: any;
  term: any;
  staffleaves1: any;
  pendingcount: any;
  Rejectedcount: any;
  approvedcount: any;
  pendingcount1: any;
  Rejectedcount1: any;
  approvedcount1: any;
  projectlist: any
  Anniversery: any
  Birthday: any;
  NewJoinee: any;
  name: any;
  middle_Name: any;
  mobile: any;
  emailID: any;
  Anniverserylist1: any;
  Anniverserylist2: any;
  count: any;
  attendancelist: any;
  staffleaves: any;
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
  public number: number = 1000;
  companyid: any;
  workType: any;
  public attachments21: any = [];
  public attachments: any = [];
  public attachmentsurl: any = [];
  Certificate_url_second: any;
  BoosterDoseCertificate: any;
  Fullname: any;
  namelist: any;
  Band: any;
  Level: any;
  show: any;
  cancelledloancount: any;
  myovertime: any;
  rejectedotcount: any;
  filetype: any;
  time: any;
  hh: any;
  mm: any;
  ampm: any;
  LastDayOfMonth: any
  firstDayofcurrentmonth: any
  firstDayofcurrentmonth1: any
  LastDayOfMonth1: any
  presentcount=0;
  attendancelistforcount: any
  pendingloancount1: any;
  approvedloancount1: any;
  Rejectedloancount1: any;
  loanpendingcount: any;
  loanapprovecount: any;
  workTypecheck:any;
  punchoutworkTypecheck:any;
  todayfilterdate:any;
  TodayFilterdate:any;
  
  profilepercentage1:any;
  profiletab:any;
  contact:any;
  dependent:any;
  emplhist:any;
  edu:any;
  nomi:any;
  bankID:any;
  iddet:any;

  @Output()pagename = new EventEmitter();
  ngOnInit(): void {
    this.workType = '0';
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
    this.companyid = sessionStorage.getItem('companyid');
    this.Band = localStorage.getItem('Band');
    this.Level = localStorage.getItem('level');
 
    this.show = false;
    this.AttendanceEnable = sessionStorage.getItem('AttendanceEnable');
    this.workType = 0;
    this.currentUrl = window.location.href;
    const format = 'MM-dd-yyyy';
    const formatfilter = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
    this.todayfilterdate = formatDate(myDate, formatfilter, locale);
    this.firstDayofcurrentmonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    this.LastDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 30);
    this.firstDayofcurrentmonth1 = formatDate(this.firstDayofcurrentmonth, format, locale);
    this.LastDayOfMonth1 = formatDate(this.LastDayOfMonth, format, locale);
    this.province = localStorage.getItem('Province')
    var dateObj = new Date();
    this.month = dateObj.getUTCMonth() + 1; //months from 1-12
    this.day = dateObj.getUTCDate();
    this.myDate = new Date();
    this.showfront = true;
    this.roleid = localStorage.getItem('roledid');
    var date = new Date();
    this.staffID = localStorage.getItem('staffid');
    this.username = localStorage.getItem('UserName');
    this.email = localStorage.getItem('email');
    this.TodayFilterdate = formatDate(myDate, formatfilter, locale);
    this.GetAttendanceInit();
    //this.GetAttendanceself();
    this.GetStaffOverTimeDetails();
    this.GetEmployeeLoansCountforDashboard();
    this.GetAllStaffNew();
    this.GetmyDetails();
    // this.GetAllStaffNew();
    //this.getipaddress();;

    this.GetAnnouncements();
    //this.changeAnniversary();
    // this.getstaffleaves1();
    //this.GetAttendance();
    //this.GetExpensesListweb();
    this.GetCancelledStaffLeaves();
    // this.GetExpensesListweb1();
    //this.GetAttendance1();
   // this.getDetails();
    this.GetHolidays();
    //this.getannouncementurl();
    //this.GetExpensesListwebInit();
    // this.GetEmployeeLoans();
    // this.GetEmployeeLoans1();
    // this.GetEmployeeLoanCount();
    this.staffID = localStorage.getItem('staffid');
  }

  public GetEmployeeLoansCountforDashboard() {
      
    this.DigiofficecorehrService.GetEmployeeLoansCountforDashboard(localStorage.getItem('staffid'))
      .subscribe({
        next: data => {
          //  
          let temp1 = data
          this.pendingloancount1 = temp1[0].pendingcount;
          this.approvedloancount1 = temp1[0].approvedcount;
          this.Rejectedloancount1 = temp1[0].rejectedcount;
        }, error: (err) => {
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
            data => {
              //  
            },
          )
        }
      })
  }

  public GetAttendanceself() {
      
    this.loader = true;
    this.DigiofficecorehrService.GetAttendanceByEmployeeID(this.staffID, this.firstDayofcurrentmonth1, this.LastDayOfMonth1)
      .subscribe({
        next: data => {
            
          this.attendancelistforcount = data;
          this.presentcount = this.attendancelistforcount.length
          // this.workTypecheck=this.attendancelistforcount[0].workType;
          // this.punchoutworkTypecheck=this.attendancelistforcount[0].punchoutWorkType

          this.loader = false;
        }, error: (err) => {
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
            data => {
                
            },
          )
        }
      })
  }

  public GetmyDetails() {
    this.DigiofficecorehrService.GetAllStaffNew().subscribe((data) => {
      // 
      this.namelist = data.filter(x => x.staffID == this.staffID);
      this.Fullname = this.namelist[0]?.fullname;
    });
  }

  getannouncementurl() {
    throw new Error('Method not implemented.');
  }

  public GetEmployeeLoans() {
    this.DigiofficecorehrService.GetEmployeeLoansCountforDashboard(localStorage.getItem('staffid'))
      .subscribe({
        next: data => {
            
          this.stafflist = data;
          let temp = this.stafflist
          this.newrquestloancount = temp[0].pendingcount;
          this.approvedloancount = temp[0].approvedcount;
          this.rejectedloancount = temp[0].rejectedcount;
          this.cancelledloancount = temp[0].cancelcount;
          this.loader = false;
        }, error: (err) => {
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');
         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
            data => {
                
            },
          )
        }
      })
  }

  public GetEmployeeLoans1() {
    this.DigiofficecorehrService.GetEmployeeLoansCountforDashboard(localStorage.getItem('staffid')).subscribe(data => {
        
      this.stafflist = data;
      let temp = this.stafflist
      this.newrquestloancount = temp[0].pendingcount;
      this.approvedloancount = temp[0].approvedcount;
      this.rejectedloancount = temp[0].rejectedcount;
      this.cancelledloancount = temp[0].cancelcount;
      this.loader = false;
    });
  }

  public GetExpensesListwebInit() {
    this.DigiofficecorehrService.GetExpensesListweb()
      .subscribe({
        next: data => {
          //  
          this.projectlist = data.filter(x => x.supervisor == this.staffID)
          this.newexpensecount = this.projectlist.filter((x: { approvalStatus: string; }) => x.approvalStatus = 'Manager Pending Finance Pending').length
          this.approvedexpensecount = this.projectlist.filter((x: { approvalStatus: string; }) => x.approvalStatus == 'Manager Approved Finance Approved' || x.approvalStatus == 'Manager Approved Finance Pending').length
          this.cancelledexpensecount = this.projectlist.filter((x: { approvalStatus: string; }) => x.approvalStatus == 'Manager Rejected Finance Pending' || x.approvalStatus == 'Manager Approved Finance Rejected').length
        }, error: (err) => {
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
            data => {
              //  
            },
          )
        }
      })
  }

  public GetStaffOverTimeDetails() {
      
    // this.DigiofficecorehrService.GetStaffOTCountForDashboard(localStorage.getItem('staffid'), "01-01-2020", "01-01-2025")
    //   .subscribe({
    //     next: data => {
            
    //       this.myovertime = data;
    //       let tempot = this.myovertime
    //       this.pendingotcount = tempot[0].pendingotcount
    //       this.approvedotcount = tempot[0].approvedotcount
    //       this.rejectedotcount = tempot[0].rejectedotcount
    //       this.loader = false;
    //     }, error: (err) => {
    //       Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

    //      var obj = {
    //         'PageName': this.currentUrl,
    //         'ErrorMessage': err.error.message,
    //         'StaffID':localStorage.getItem('staffid')
    //       }
    //       this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
    //         data => {
                
    //         },
    //       )
    //     }
    //   })

    // this.DigiofficecorehrService.GetStaffOverTimeDetails()
    //   .subscribe({
    //     next: data => {
    //       this.timedetails = data.filter(x => x.supervisor == this.staffID);
    //       this.pendingotcount = this.timedetails.filter((x: { status: string; }) => x.status == 'Manager Pending').length
    //       this.approvedotcount = this.timedetails.filter((x: { status: string; }) => x.status == 'Manager Approved').length
    //       this.Rejectedotcount = this.timedetails.filter((x: { status: string; }) => x.status == 'Manager Rejected').length
    //     }, error: (err) => {
    //       Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');
    //       var obj = {
    //         'PageName': this.currentUrl,
    //         'ErrorMessage': err.error.message
    //       }
    //       this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
    //         data => {
    //         },
    //       )
    //     }
    //   })
  }

  public GetAllStaffNew() {
    debugger
    this.DigiofficecorehrService.GetMyDetailsByStaffID(this.staffID)
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
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
            _data => {
              //  
            },
          )
        }
      })
  }

  public GetAttendanceInit() {
      
    var date = new Date();
    this.DigiofficecorehrService.GetAttendanceByEmployeeID(localStorage.getItem('staffid'),this.formatDate(date),this.formatDate(date))
      .subscribe({
        next: data => {
          //  
          let temp: any = data;
          if (temp.length == 0) {
            this.punchintime = null;
            this.punchouttime = null;
          } else {
            this.punchintime = temp[0].startTime;
            this.punchouttime = temp[0].endTime;


            this.workType1=data[0].workType;
            this.punchoutworkType1=data[0].punchoutWorkType

          }

        }, error: (err) => {
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
            data => {
              //  
            },
          )
        }
      })
  }



  public GetCancelledStaffLeaves() {
    this.DigiofficecorehrService.GetStaffLeaveCountForDashboard(localStorage.getItem('staffid'), 1, "01-01-2020", "01-01-2025")
      .subscribe({
        next: data => {
          //  
          let temp1 = data
          this.pendingcount1 = temp1[0].pendingcount;
          this.approvedcount1 = temp1[0].approvedcount;
          this.Rejectedcount1 = temp1[0].rejectedcount;
          this.CancelledCount = temp1[0].cancelcount;
        }, error: (err) => {
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
            data => {
              //  
            },
          )
        }
      })
  }

  public GetExpensesListweb1() {
    this.DigiofficecorehrService.GetExpensesListweb()
      .subscribe({
        next: data => {
          //  
          let teamexpnes: any = data.filter(x => x.supervisor == localStorage.getItem('staffid'));
          this.pendingteamexpensecount = teamexpnes.filter((x: { status: string; }) => x.status == 'Manager Pending Finance Pending' || x.status == null).length;
          this.Rejectedteamexpnesecount = teamexpnes.filter((x: { status: string; }) => x.status == 'Rejected' || x.status == 'Manager Rejected' || x.status == 'Manager Approved Finance Rejected').length;
          this.approvedteamexpnescount = teamexpnes.filter((x: { status: string; }) => x.status == 'Manager Approved Finance Approved' || x.status == 'Manager Approved Finance Pending' || x.status == 'Manager Rejected' || x.status == 'Manager Approved Finance Rejected').length;
        }, error: (err) => {
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
            data => {
              //  
            },
          )
        }
      })
  }

  public GetAttendance1() {
    this.DigiofficecorehrService.GetAttendance()
      .subscribe({
        next: data => {
          //  
          let teamregularization: any = data.filter(x => x.supervisor == this.staffID);
          this.pendingreg = teamregularization.filter((x: { approve: number; }) => x.approve != 1).length;
          this.approevedreg = teamregularization.filter((x: { approve: number; }) => x.approve == 1).length;
        }, error: (err) => {
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
            data => {
              //  
            },
          )
        }
      })
  }


  public getipaddress() {
    //  
    this.loader = true;
    this.DigiofficecorehrService.getIPAddress()
      .subscribe({
        next: data => {
          //  
          let temap: any = data
          this.ipaddress = temap.ip
          this.loader = false;
        }, error: (err) => {
          //Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
            data => {
              //  
            },
          )
        }
      })
  }

  // public getstaffleaves1() {
  //   if (this.roleid == 2) {
  //     this.DigiofficecorehrService.GetCancelledStaffLeaves(10331, 1, "01-01-2020", "01-01-2025")
  //       .subscribe({
  //         next: data => {
  //           this.staffleaves1 = data.filter((x: { supervisor: string | null; status: string | null; }) => x.supervisor == localStorage.getItem('staffid') && x.status == 'Manager Pending HR Pending');
  //           let temp: any = data.filter((x: { supervisor: string }) => x.supervisor == localStorage.getItem('staffid'));
  //           this.pendingcount = temp.filter((x: { status: string; }) => x.status == 'Manager Pending HR Pending' || x.status == 'Manager Pending').length;
  //           this.Rejectedcount = temp.filter((x: { status: string; }) => x.status == 'Rejected' || x.status == 'Manager Rejected HR Pending').length;
  //           this.approvedcount = (data.filter((x: { supervisor: string, status: string; }) => x.supervisor == localStorage.getItem('staffid') && x.status == 'Manager Approved HR Approved' || x.status == 'Manager Approved' || x.status == 'Manager Approved HR Pending').length) - 2;;
  //           this.CancelledCount = temp.filter((x: { status: string; }) => x.status == 'Cancelled').length;
  //         }, error: (err) => {
  //          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');
  //           var obj = {
  //             'PageName': this.currentUrl,
  //             'ErrorMessage': err.error.message
  //           }
  //           this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
  //             data => {
  //             },
  //           )
  //         }
  //       })
  //   }
  //   else {
  //     this.DigiofficecorehrService.GetCancelledStaffLeaves(10331, 1, "01-01-2020", "01-01-2025")
  //       .subscribe({
  //         next: data => {
  //           this.staffleaves1 = data.filter((x: { supervisor: string | null; status: string | null; }) => x.status == 'Manager Approved HR Pending');
  //           let temp: any = data;
  //           this.pendingcount = temp.filter((x: { status: string; }) => x.status == 'Manager Approved HR Pending' || x.status == 'HR Pending').length;
  //           this.Rejectedcount = temp.filter((x: { status: string; }) => x.status == 'Rejected' || x.status == 'Manager Approved HR Rejected').length;
  //           this.approvedcount = temp.filter((x: { status: string; }) => x.status == 'Manager Approved HR Approved' || x.status == 'Manager Approved HR Rejected').length;
  //           this.CancelledCount = temp.filter((x: { status: string; }) => x.status == 'Cancelled').length;
  //         }, error: (err) => {
  //          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');
  //           var obj = {
  //             'PageName': this.currentUrl,
  //             'ErrorMessage': err.error.message
  //           }
  //           this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
  //             data => {
  //             },
  //           )
  //         }
  //       })
  //   }
  // }

  public GetExpensesListweb() {
    //  
    this.DigiofficecorehrService.GetExpensesListweb()
      .subscribe({
        next: data => {
          //  
          this.projectlist = data.filter(x => x.supervisor == this.staffID && (x.status == 'Manager Pending Finance Pending' || x.status == null));
        }, error: (err) => {
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
            data => {
              //  
            },
          )
        }
      })
  }


  
  public changebirthday() {
    // 
    localStorage.setItem('birthday', String(this.day).concat('-', String(this.month)))
    this.Anniversery = false;
    this.Birthday = true;
    this.NewJoinee = false;
    this.DigiofficecorehrService.GetAllStaffNew()
      .subscribe({
        next: data => {
          //  
          this.Anniverserylist1 = data.filter(x => x.dobdate == String(this.day).concat('-', String(this.month)));
          this.name = this.Anniverserylist1[0].name
          this.middle_Name = this.Anniverserylist1[0].middle_Name
          this.mobile = this.Anniverserylist1[0].mobile
          this.emailID = this.Anniverserylist1[0].emailID
        }, error: (err) => {
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
            data => {
              //  
            },
          )
        }
      })
  }

  public changenewjoinee() {
    // 
    this.Anniversery = false;
    this.Birthday = false;
    this.NewJoinee = true;
    this.DigiofficecorehrService.GetAllStaffNew()
      .subscribe({
        next: data => {
          //  
          this.Anniverserylist2 = data.filter(x => x.joiningDate == this.myDate + "T00:00:00");
          this.name = this.Anniverserylist2[0].name
          this.middle_Name = this.Anniverserylist2[0].middle_Name
          this.mobile = this.Anniverserylist2[0].mobile
          this.emailID = this.Anniverserylist2[0].emailID
        }, error: (err) => {
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
            data => {
              //  
            },
          )
        }
      })
  }



  public flip(event: { currentTarget: any; }) {
    //  
    var element = event.currentTarget;
    if (element.className === "card") {
      if (element.style.transform == "rotateY(180deg)") {
        element.style.transform = "rotateY(0deg)";
      }
      else {
        element.style.transform = "rotateY(180deg)";
      }
    }
  };

  public flip1(event: { currentTarget: any; }) {
    //  
    var element = event.currentTarget;
    if (element.className === "card1") {
      if (element.style.transform == "rotateY(180deg)") {
        element.style.transform = "rotateY(0deg)";
      }
      else {
        element.style.transform = "rotateY(180deg)";
      }
    }
  };

  public leavedashbaord1() {
    //  
    this.router.navigate(['/MyTeamLeaveDetails']);
  }

  public leavedashbaord() {
    //  
    this.router.navigate(['/LeaveListDashboard']);
  }

  public Regularization() {
    //  
    this.router.navigate(['/MyTeamAttendenceRegularisation']);
  }

  public Regularization1() {
    //  
    this.router.navigate(['/AttendanceView']);
  }

  public goprofile() {
    //  
    this.router.navigate(['/EmployeeProfileView']);
  }

  // attendancelist1:any;ves2


  public GetAttendance() {
    //  
    this.DigiofficecorehrService.GetAttendance()
      .subscribe({
        next: data => {
          //  
          this.attendancelist = data.filter(x => x.supervisor == this.staffID)
          // this.attendancelist1 = data;
          // this.Band = this.attendancelist1[0].bandID
          this.count = this.attendancelist.length
        }, error: (err) => {
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
            data => {
              //  
            },
          )
        }
      })
  }

  // public getstaffleaves() {
  //   this.DigiofficecorehrService.GetStaffLeaves(10331, 1, "01-01-2020", "01-01-2025")
  //     .subscribe({
  //       next: data => {
  //         this.staffleaves = data.filter(x => x.id == this.staffID);
  //       }, error: (err) => {
  //         Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');
  //         var obj = {
  //           'PageName': this.currentUrl,
  //           'ErrorMessage': err.error.message
  //         }
  //         this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
  //           data => {
  //           },
  //         )
  //       }
  //     })
  // }

  firstAttachment: any;
  Name: any;
  dateTime: any;
  public arrayList:any=[];
  public GetAnnouncements() {
    //  
    this.loader = true;
    this.DigiofficecorehrService.GetAnnouncementsByBuildingID(56)
      .subscribe({
        next: data => {
          //  
          this.annnounecemnetlist = data.filter(x => x.filterdate >= this.todayfilterdate);
          if (this.annnounecemnetlist.length == 0) {
            this.show = true
            this.firstAttachment = null
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
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');
         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
            data => {
              //  
            },
          )
        }
      })
  }

  public getDetails() {
    //  
    this.loader = true
    this.DigiofficecorehrService.GetEmployeeVaccinationDetails()
      .subscribe({
        next: data => {
          //  
          this.EmployeeVaccinationDetail = data.filter(x => x.employeeId == this.staffID);
          if (this.EmployeeVaccinationDetail.length != 0) {
            this.FirstDoseDate = this.EmployeeVaccinationDetail[0].firstDoseDate,
              this.certificate_url = this.EmployeeVaccinationDetail[0].certificate_url,
              this.Certificate_url_second = this.EmployeeVaccinationDetail[0].certificate_url_second,
              this.BoosterDoseCertificate = this.EmployeeVaccinationDetail[0].boosterDoseCertificate,
              this.SecondDoseDate = this.EmployeeVaccinationDetail[0].secondDoseDate,
              this.BoosterName = this.EmployeeVaccinationDetail[0].boosterName,
              this.BoosterDoseDate = this.EmployeeVaccinationDetail[0].boosterDoseDate
            this.loader = false
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
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
            data => {
              //  
            },
          )
        }
      })
  }
  public dispyList: any = [];
  
  public GetHolidays() {
      
    this.loader = true;
    this.DigiofficecorehrService.GetHolidays()
      .subscribe({
        next: data => {
            
          this.holidaylist = data.filter(x => x.filterholidaydate >= this.TodayFilterdate);
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
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');
                    this.loader = false;
         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
            data => {
                
            },
          )
        }
      })
  }
  staffid: any;
  public punchin() {
      
    this.staffid = localStorage.getItem('staffid')
    if (this.punchintime != undefined) {
      Swal.fire('Already Punched In for the day');
      this.loader = false
    }
    else if (this.workType == undefined || this.workType == null || this.workType == "0") {
      // Swal.fire('Please Fill Work Type');
      // this.loader = false
    }
    else {
      var options = { hour12: false };
      var date = new Date();
      var entity = {

        UserID: parseInt(this.staffid),
        SigninDate: date.toLocaleString('en-US', options),
        SigninLocation: 'Office',
        StatusID: 1,
        punchinip: this.ipaddress == undefined ? '101.120.111.222' : this.ipaddress,
        ApprovalStatus: 'Manager Pending HR Pending',
        WorkType: this.workType,
      }
      this.DigiofficecorehrService.InsertAttendanceWeb(entity)
        .subscribe({
          next: data => {
            //  
            if (data != 0) {
              this.punchinId = data
              localStorage.setItem('PunchINid', this.punchinId)
              // Swal.fire('Punched In Successfully')
              // this.workType =0
              // this.punchoutworkType=0
              this.DigiofficecorehrService.GetAttendanceByEmployeeID(this.staffID, this.todaydate, this.todaydate).subscribe(data => {
                //  
                let temp: any = data;
                this.punchintime = temp[0].signinDate;
                this.workType1=temp[0].workType;
                // this.punchoutworkType1=temp[0].punchoutWorkType
                this.InsertNotificationPunchIn();
                this.loader = false
              })
            }
          }, error: (err) => {
            Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');
            this.loader = false
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
              data => {
                //  
              },
            )
          }
        })
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
    this.DigiofficecorehrService.InsertNotification(entity)
      .subscribe({
        next: data => {
            
          if (data != 0) {
            this.ngOnInit();
          }
        }, error: (err) => {
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');
          var obj = {
            'PageName': 'Loan Page',
            'ErrorMessage': err.error.message
          }
          this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
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
    // 
    this.loader = true;
    this.Anniversery = true;
    this.Birthday = false;
    this.NewJoinee = false;
    this.DigiofficecorehrService.GetAllStaffNew()
      .subscribe({
        next: data => {
          //  
          this.loader = false
          this.Anniverserylist = data.filter(x => x.anniversarydate == String(this.day).concat('-', String(this.month)));
          this.name = this.Anniverserylist[0].name
          this.middle_Name = this.Anniverserylist[0].middle_Name
          this.mobile = this.Anniverserylist[0].mobile
          this.emailID = this.Anniverserylist[0].emailID

        }, error: (err) => {
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');
          this.loader = false

         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
            data => {
              //  
            },
          )
        }
      })
  }

  public getwishdate() {
    this.DigiofficecorehrService.GetAllStaffNew()
      .subscribe({
        next: data => {
          //  
          this.Anniverserylist = data.filter(x => x.date_Of_Marriage == this.myDate + "T00:00:00");
          this.loader = false
        }, error: (err) => {
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
            data => {
              //  
            },
          )
        }
      })
  }


  onSelect21(event: any) {
    if (event.addedFiles[0].size / 1048576 > 2) {
      Swal.fire('Please Upload File Less than 2 MB.')
      this.loader = false
    } else {
      this.attachments21 = [];
      this.attachments21.push(...event.addedFiles);
      for (let i = 0; i < this.attachments21.length; i++) {
        this.DigiofficecorehrService.UploadmultipleProjectAttachments(this.attachments21[i])
          .subscribe({
            next: data => {
              //  
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
              this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
                data => {
                  //  
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

  punchoutworkType: any

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
      // this.loader = false
    }
    else {
      var options = { hour12: false };
      var date = new Date();
      this.DigiofficecorehrService.GetAttendance()
        .subscribe({
          next: data => {
            //  
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
            this.DigiofficecorehrService.UpdateAttendanceWeb(entity)
              .subscribe({
                next: data => {
                  //  
                  if (data != 0) {
                    // Swal.fire('Punched Out Successfully');
                    localStorage.removeItem('PunchINid');
                    this.DigiofficecorehrService.GetAttendanceByEmployeeID(this.staffID, this.todaydate, this.todaydate)
                      .subscribe({
                        next: data => {
                          //  
                          let temp: any = data;
                          this.punchouttime = temp[0].signoutDate;
                          this.workType1=temp[0].workType;
                           this.punchoutworkType1=temp[0].punchoutWorkType
                          this.InsertNotificationPunchOut()
                        }, error: (err) => {
                          Swal.fire('Not able to punchout now check with Tech Support Team for Issue');
                          this.loader = false

                          var obj = {
                            'PageName': this.currentUrl,
                            'ErrorMessage': err.error.message
                          }
                          this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
                            data => {
                              //  
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
                  this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
                    data => {
                      //  
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
            this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
              data => {
                //  
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
    this.DigiofficecorehrService.InsertNotification(entity)
      .subscribe({
        next: data => {
            
          if (data != 0) {
          }
          // Swal.fire("Saved Successfully");
          this.ngOnInit();
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');
          this.loader = false;
         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficecorehrService.InsertExceptionLogs(obj).subscribe(
            data => {
                
            },
          )
        }
      })
  }





  // public Profilecompletion() {
  //   localStorage.setItem('Pagename', 'My Profile');
  //   // this.router.navigate(['/HR/AddressDetailsWizard', this.staffID])
  //   this.router.navigate(['/Employee/MyProfiletabs', this.staffID]);
  //   this.DigiofficecorehrService.saveData('value');
  // }
  // public ApplyLoan() {
      
  //   localStorage.setItem('Pagename', 'Loans');
  //   this.router.navigate(['/Employee/Appliedloans']);
  //   this.DigiofficecorehrService.saveData('value');
  // }

  // attendance() {
     
  //   localStorage.setItem('Pagename', 'Attendance');
  //   this.router.navigate(['/HR/AttendanceDetails']);
  //   this.DigiofficecorehrService.saveData('value');
  // }

  // attendanceCorrection() {
     
  //   localStorage.setItem('Pagename', 'Attendance Correction');
  //   this.router.navigate(['/Employee/AttendanceCorrection']);
  //   this.DigiofficecorehrService.saveData('value');
  // }

  // applyleave() {
     
  //   localStorage.setItem('Pagename', 'Leaves');
  //   this.router.navigate(['/Employee/LeaveListDashboard']);
  //   this.DigiofficecorehrService.saveData('value');
  // }

  // public ApplyOT() {
  //   localStorage.setItem('Pagename', 'OT Details');
  //   this.router.navigate(['/HR/MyOverTimeDetails'])
  //   this.DigiofficecorehrService.saveData('value');
  // }

  // public holidays() {
  //   localStorage.setItem('Pagename', 'Holidays');
  //   this.router.navigate(['/Admin/Holidaysdashboard'])
  //   this.DigiofficecorehrService.saveData('value');
  // }

  // announcement() {
     
  //   localStorage.setItem('Pagename', 'Announcement Dashboard');
  //   this.router.navigate(['/Admin/AnnouncementsDashboard']);
  //   this.DigiofficecorehrService.saveData('value');
  // }

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


  public AddCorrection() {
    let ID = undefined
    this.matDialog.open(AttendanceCorrectionFormComponent, {
      data: ID = undefined,
      height:'auto',
      width:'100%'
    }).afterClosed()
      .subscribe(result => {
      });
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

  // AddPreApprovalOT(){
  //   let ID = undefined
      
  //   this.matDialog.open(ApplyPreApprovalOTComponent, {
  //     data: { name: "dailog" },
  //     height:'auto',
  //     width:'75%'
  //   }).afterClosed()
  //     .subscribe((result: any) => {
  //     });
  // }


  // AddLoans(){
  //   this.matDialog.open(ApplyloansComponent, {
  //     data: { name: "dailog" },
  //     height:'auto',
  //     width:'75%'
  //   }).afterClosed()
  //     .subscribe(result => {
  //     });
  // }

}