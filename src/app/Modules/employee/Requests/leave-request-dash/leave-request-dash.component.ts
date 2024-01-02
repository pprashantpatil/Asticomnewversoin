import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DigiofficecorehrService } from '../../../../Services/digiofficecorehr.service';
import { FullCalendarOptions, EventObject } from 'ngx-fullcalendar';
import { DatePipe } from '@angular/common';
import { NgbCarousel, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog } from '@angular/material/dialog';

import { NewLeaveRequestComponent } from '../new-leave-request/new-leave-request.component';
@Component({
  selector: 'app-leave-request-dash',
  templateUrl: './leave-request-dash.component.html',
  styleUrls: ['./leave-request-dash.component.css'],
  providers: [NgbCarouselConfig],
})
export class LeaveRequestDashComponent implements OnInit {

  constructor(public DigiofficeService: DigiofficecorehrService, public router: Router, public datePipe: DatePipe, private matDialog: MatDialog, config: NgbCarouselConfig) {
    config.showNavigationArrows = false;
    config.showNavigationIndicators = false;
  }


  public showorhidecontent: any;
  options: FullCalendarOptions | undefined;
  events: EventObject[] | undefined;
  roleid: any;
  isPrevious: any;
  isNext: any;
  public selectedlanguage: any;
  public selectedlanguage1: any;
  public callenderyear: any;
  public callenderMonth: any;
  public callenderstartday: any;
  public callenderendday: any;
  public callenderdaysdount: any = [];
  public callenderBindData = new Date();
  public todaydate = new Date().getDate();
  public options1: any;
  viewMode = 'tab1';
  Staffleaveenitilment: any
  staffleaves1: any;
  staffleaves2: any;
  staffleaves3: any;
  currentUrl: any;
  startdate: any;
  enddate: any
  public todayDay = this.datePipe.transform(new Date().getDay(), 'EEEE');
  roledid: any
  term: any;
  medicalurl: any;
  staffleaves: any;
  p: any = 1;
  count1: any = 10;
  count2: any = 10;
  count3: any = 10;
  loader: any;
  login: any;
  public alldates: any = []
  showPopup: number = 0;
  messageId: number = 0;
  @ViewChild('carousel', { 'static': true })
  carousel!: NgbCarousel;
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.roledid = localStorage.getItem('roledid');
    this.login = sessionStorage.getItem('roledid');
    this.GetMyDetailsByStaffID();
    this.getstaffleaves();
  }

  public GetMyDetailsByStaffID() {
    this.loader = true;
    this.DigiofficeService.GetMyDetailsByStaffID(localStorage.getItem('staffid'))
      .subscribe({
        next: data => {
          debugger
          this.Staffleaveenitilment = data;
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting My Details By StaffID');
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

  public getEndDate(event: any) {
    this.showPopup = 0;
    this.startdate = this.datePipe.transform(event[0], 'yyyy-MM-dd');;
    this.enddate = this.datePipe.transform(event[1], 'yyyy-MM-dd');;

    this.loader = true;
    if (this.enddate == "") {
      this.ngOnInit();
    } else if (this.enddate < this.startdate) {
      /*   Swal.fire('Endtime Must Be Lesser Than Start Date') */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 29;
    }
    else if (this.startdate == "" || this.startdate == undefined) {
      /*   Swal.fire('Please Select Start Date First') */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 28;

    }
    else {
      this.DigiofficeService.GetApprovedStaffLeavesByStaffID(localStorage.getItem('staffid'), 1, this.startdate, this.enddate)
        .subscribe({
          next: data => {
            debugger
            this.staffleaves1 = data;
            this.buildcallender(this.staffleaves1);
            this.loader = false;
          }, error: (err) => {
            // Swal.fire('Issue in Getting Approved Staff Leaves By StaffID');
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
      this.DigiofficeService.GetPendingStaffLeavesByStaffID(localStorage.getItem('staffid'), 1, this.startdate, this.enddate)
        .subscribe({
          next: data => {
            debugger
            this.staffleaves2 = data;
            this.buildcallender(this.staffleaves2);
            this.loader = false;
          }, error: (err) => {
            // Swal.fire('Issue in Getting Pending Staff Leaves By StaffID');
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
      this.DigiofficeService.GetRejectedStaffLeavesByStaffID(localStorage.getItem('staffid'), 1, this.startdate, this.enddate)
        .subscribe({
          next: data => {
            debugger
            this.staffleaves3 = data;
            this.loader = false;
            this.buildcallender(this.staffleaves3);
          }, error: (err) => {
            // Swal.fire('Issue in Getting Rejected Staff Leaves By StaffID');
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

  public getstaffleaves() {
    debugger
    this.loader = true;
    this.DigiofficeService.GetApprovedStaffLeavesByStaffID(localStorage.getItem('staffid'), 1, "01-01-2020", "01-01-2025")
      .subscribe({
        next: data => {
          debugger
          this.staffleaves1 = data;
          this.buildcallender(this.staffleaves1);
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Staff Leaves');
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
    this.DigiofficeService.GetPendingStaffLeavesByStaffID(localStorage.getItem('staffid'), 1, "01-01-2020", "01-01-2025")
      .subscribe({
        next: data => {
          debugger
          this.staffleaves2 = data;
          this.buildcallender(this.staffleaves2);
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Pending Staff Leaves By Staff ID');
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
    this.DigiofficeService.GetRejectedStaffLeavesByStaffID(localStorage.getItem('staffid'), 1, "01-01-2020", "01-01-2025")
      .subscribe({
        next: data => {
          debugger
          this.staffleaves3 = data;
          this.loader = false;
          this.buildcallender(this.staffleaves3);
        }, error: (err) => {
          // Swal.fire('Issue in Getting Rejected Staff Leaves By StaffID');
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
    //  this.image();

  }

  public newlevae() {
    debugger
    this.router.navigate(['/Employee/NewLeaveRequest']);
    this.loader = false;
  }

  public getmedicalurl(medicalurl: any) {
    debugger
    this.medicalurl = medicalurl;
  }

  public CancelLeave(list: any) {
    debugger
    this.showPopup = 0;
    Swal.fire({
      title: 'Delete Record',
      text: "Are you sure you want to delete? You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Cancel it!'
    }).then((result) => {
      if (result.value == true) {
        this.DigiofficeService.CancelLeave(list.id, list.noOfDays, list.uuid, list.leaveTypeID, 'Cancelled')
          .subscribe({
            next: data => {
              debugger
              /*   Swal.fire('Cancelled Successfully'); */
              this.ngOnInit();
              this.loader = false;
              this.showPopup = 1;
              this.messageId = 30;
            }, error: (err) => {
              // Swal.fire('Issue in Cancelling Leave');
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
    })


  }

  public changepaygroup() {
  }

  changeStatus(evn: any) {
    this.loader = true;
    if (evn.target.value == 1) {
      this.showorhidecontent = true;
      this.loader = false;
    }
    else {
      this.showorhidecontent = false;
      this.loader = false;
    }
  }

  public buildcallender(MaintainanceList: string | any[]) {
    debugger

    this.callenderdaysdount.length = 0;
    this.callenderyear = this.callenderBindData.getFullYear();
    this.callenderMonth = this.datePipe.transform(this.callenderBindData, 'MMMM');
    this.callenderstartday = new Date(this.callenderBindData.getFullYear(), this.callenderBindData.getMonth(), 1);
    this.callenderendday = new Date(this.callenderBindData.getFullYear(), this.callenderBindData.getMonth() + 1, 0);
    this.callenderdaysdount.length = this.callenderendday.getDate();
    let o = 0;
    for (let i = 0; i < this.callenderdaysdount.length; i++) {
      let sdate = this.callenderstartday;
      let _date;
      if (sdate.getDate() == 1 && o == 0) {
        _date = sdate.setDate(sdate.getDate() + 0);
        o++
      }
      else {
        _date = sdate.setDate(sdate.getDate() + 1);
      }
      _date = this.datePipe.transform(sdate, 'dd');
      let _day = this.datePipe.transform(sdate, 'EEE');
      let dateformat = this.datePipe.transform(sdate, 'yyyy-MM-dd');
      this.callenderdaysdount[i] = { date: _date, day: _day, dateformat: dateformat };
    }
    //Events Binding
    const getDatesBetweenDates = (startDate: string | number | Date, endDate: string | number | Date) => {
      let dates: any = []
      //to avoid modifying the original date
      const theDate = new Date(startDate)
      while (theDate < new Date(endDate)) {
        dates = [...dates, new Date(theDate)]
        theDate.setDate(theDate.getDate() + 1);
      }
      dates = [...dates, new Date(endDate)]
      this.alldates = dates;
      return dates
    }
    for (let j = 0; j < MaintainanceList.length; j++) {
      debugger;
      getDatesBetweenDates(MaintainanceList[j].filterdate, MaintainanceList[j].filterdate1);
      for (let k = 0; k < this.alldates.length; k++) {
        let currenteventlist = this.callenderdaysdount.filter((x: { dateformat: number; }) => (this.datePipe.transform(x.dateformat, 'yyyy-MM-dd') == this.datePipe.transform(this.alldates[k], 'yyyy-MM-dd')))
        if (currenteventlist.length > 0) {
          this.callenderdaysdount[currenteventlist[0].date - 1]['RequestFor'] = MaintainanceList[j].requestFor;
          this.callenderdaysdount[currenteventlist[0].date - 1]['StartTime'] = MaintainanceList[j].startTime;
          this.callenderdaysdount[currenteventlist[0].date - 1]['EndTime'] = MaintainanceList[j].endTime;
          this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] =
            "<span class='event_PendingBookCommunity'> Reason : " + MaintainanceList[j].leaveReason +
            "</span>";
          this.loader = false;
        }
        this.loader = false;
      }
      this.loader = false;
    }
  }

  public previousmonth() {
    debugger;
    this.callenderBindData.setMonth(this.callenderBindData.getMonth() - 1);
    this.getstaffleaves();
    this.loader = false;
  }

  public nextmonth() {
    debugger;
    this.callenderBindData.setMonth(this.callenderBindData.getMonth() + 1);
    this.getstaffleaves();
    this.loader = false;
  }

  multipleattachmentlist: any;
  image(id: any) {
    debugger
    this.DigiofficeService.GetStaffLeavesAttachment().subscribe(
      data => {
        debugger
        this.multipleattachmentlist = data.filter(x => x.leaveID == id);
        this.loader = false;
      }
    )

  }

  openAttchments(photo: any) {
    window.open(photo, '_blank');
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

  showDialog() {
    let ID = undefined

    this.matDialog.open(NewLeaveRequestComponent, {
      data: ID = undefined,
      height: '85%',
      width: '100%'
    }).afterClosed()
      .subscribe(result => {

        this.ngOnInit();
      });
  }

  public ShowMaintenanceRequest(evn: any) {

    var html = evn.srcElement.innerText.split(': ');
    var s1 = html[1].substring(0, html[1].indexOf('\n'));
    let MaintenanceRequest = this.staffleaves.filter((x: { id: string; }) => x.id == s1);
    Swal.fire(({
      title: '<strong><u>Leave Details</u></strong>',
      type: 'info',
      html:
        '<p style="font-size: 24px;text-align: start;margin-left: 135px;"> Staff Name : ' + MaintenanceRequest[0].staffName +
        '       <br>' +
        'Leave Reason: ' + MaintenanceRequest[0].leaveReason +
        '       <br>' +
        'Start Date: ' + MaintenanceRequest[0].sDateOfLeave +
        '       <br>' +
        'End Date: ' + MaintenanceRequest[0].eDateOfLeave +
        '       <br>' +
        '</p>'
      ,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: true,
    }));
  }

  changeStatus1() {

    this.showorhidecontent = true;
  }

  public reset() {
    debugger
    this.startdate = '';
    this.ngOnInit();
  }
}