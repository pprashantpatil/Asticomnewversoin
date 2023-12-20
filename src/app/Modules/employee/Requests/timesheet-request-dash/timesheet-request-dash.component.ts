import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DigiofficecorehrService } from '../../../../Services/digiofficecorehr.service';
import { FullCalendarOptions, EventObject } from 'ngx-fullcalendar';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TimesheetformComponent } from '../timesheetform/timesheetform.component';

@Component({
  selector: 'app-timesheet-request-dash',
  templateUrl: './timesheet-request-dash.component.html',
  styleUrls: ['./timesheet-request-dash.component.css']
})
export class TimesheetRequestDashComponent implements OnInit {

  constructor(public DigiofficeService: DigiofficecorehrService, private matDialog: MatDialog, public router: Router,public datePipe:DatePipe,
    ) { }
  viewMode = 'tab1';
  term: any;
  roleid: any;
  timesheets: any = [];
  timesheets1: any = [];
  timesheets2: any = [];
  timesheets3: any = [];
  currentUrl: any;
  date: any;
  startdate: any;
  enddate: any;
  p: any = 1;
  count1: any = 10;
  loader: any;
  showPopup: number = 0;
  messageId: number = 0;
  search:any;
  ngOnInit(): void {
    debugger
    this.GetTimeSheetDetailsforweb();
    this.currentUrl = window.location.href;
    this.loader = true;
    this.roleid = localStorage.getItem('roledid');
    var date = new Date();
    var month = date.getMonth() + 1;
  }



  public GetTimeSheetDetailsforweb() {
    var date = new Date();
    var month = date.getMonth() + 1;
    this.DigiofficeService.GetTimeSheetDetailsforweb()
      .subscribe({
        next: data => {
          debugger
          this.timesheets = data.filter(x => x.userID == localStorage.getItem('staffid') && x.month1 == month);
          this.timesheets1 = data.filter(x => x.userID == localStorage.getItem('staffid') && x.month1 == month && x.status == null);
          this.timesheets2 = data.filter(x => x.userID == localStorage.getItem('staffid') && x.month1 == month && x.status == 'Approved By L1 Manager');
          this.timesheets3 = data.filter(x => x.userID == localStorage.getItem('staffid') && x.month1 == month && x.status == 'Rejected Manager L1');
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Time Sheet Details For Web');
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

  public newlevae() {
    debugger
    this.router.navigate(['/Employee/Timesheetform']);
    this.loader = false;
  }

  public getenddate(event: any) {
    this.showPopup = 0;
    this.startdate = this.datePipe.transform(event[0], 'yyyy-MM-dd');;
    this.enddate = this.datePipe.transform(event[1], 'yyyy-MM-dd');;
    this.showPopup = 0;
    var date = new Date();
    var month = date.getMonth() + 1;
    if (this.enddate == "") {
      this.ngOnInit();
    }
    else if (this.startdate == undefined || this.startdate == "") {
      /* Swal.fire('Please Select Start Date First'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 32;
    }
    else {
      this.DigiofficeService.GetTimeSheetDetailsforweb()
        .subscribe({
          next: data => {
            debugger
            this.timesheets1 = data.filter(x => x.userID == localStorage.getItem('staffid') && x.status == null && (x.filterdate >= this.startdate && x.filterdate <= this.enddate));
            this.timesheets2 = data.filter(x => x.userID == localStorage.getItem('staffid') && x.status == 'Approved By L1 Manager' && (x.filterdate >= this.startdate && x.filterdate <= this.enddate));
            this.timesheets3 = data.filter(x => x.userID == localStorage.getItem('staffid') && x.status == 'Rejected Manager L1' && (x.filterdate >= this.startdate && x.filterdate <= this.enddate));
            this.timesheets = data.filter(x => x.userID == localStorage.getItem('staffid') && (x.filterdate >= this.startdate && x.filterdate <= this.enddate));
            this.loader = false;
          }, error: (err) => {
            // Swal.fire('Issue in Getting Time Sheet Details For Web');
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

  showDialog() {
    let ID = undefined
      
    this.matDialog.open(TimesheetformComponent, {
      data: ID = undefined,
      height: '85%',
      width: '100%'
    }).afterClosed()
      .subscribe(result => {
 
        this.ngOnInit();
      });
  }
}