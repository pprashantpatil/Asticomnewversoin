import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-team-attendance-reports',
  templateUrl: './team-attendance-reports.component.html',
  styleUrls: ['./team-attendance-reports.component.css']
})
export class TeamAttendanceReportsComponent implements OnInit {
  term: any;
  roleID: any
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  currentUrl: any;
  staffid: any;
  employeeid: any;
  fileName = 'Team Attendance Report.xlsx';
  startdate: any;
  enddate: any;
  attendancelist: any;
  filtereddate: any;
  todaydate: any;
  firstDayOfCurrentMonth: any;
  lastDayOfCurrentMonthFilter: any;
  firstDayOfCurrentMonthFilter: any;
  lastDayOfCurrentMonth: any;
  loader: any;
  showPopup: number = 0;
  messageId: number = 0;
  p: any = 1;
  count1: any = 10;
startdate1: any;

  constructor(public DigiofficeService: DigiofficecorehrService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.roleID = localStorage.getItem('roledid');
    this.staffid = localStorage.getItem('staffid');
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.filtereddate = formatDate(myDate, format, locale);
    this.todaydate = this.filtereddate;
    debugger
    this.firstDayOfCurrentMonthFilter = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    this.lastDayOfCurrentMonthFilter = new Date(new Date().getFullYear(), new Date().getMonth(), 30);
    this.firstDayOfCurrentMonth = formatDate(this.firstDayOfCurrentMonthFilter, format, locale);
    this.lastDayOfCurrentMonth = formatDate(this.lastDayOfCurrentMonthFilter, format, locale);
    this.GetAttendance();
    this.GetMyDetails();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
    };
  }

  public GetMyDetails() {
    this.DigiofficeService.GetAllStaffNew()
      .subscribe({
        next: data => {
          debugger
          this.dropdownList = data.filter(x => x.supervisor == this.staffid);
          this.loader = false;
        }
      })
  }

  onItemSelect(item: any) {
    debugger
    console.log(item);
    this.employeeid = item.id;
    if (this.startdate == undefined || this.enddate == undefined) {
      this.DigiofficeService.GetAttendanceByManagerID(this.employeeid, this.firstDayOfCurrentMonth, this.todaydate)
        .subscribe({
          next: data => {
            debugger
            this.attendancelist = data.filter(x => x.userID == this.employeeid)
            this.loader = false;
          }
        })
    }
    else {
      this.DigiofficeService.GetAttendanceByManagerID(this.employeeid, this.startdate, this.enddate)
        .subscribe({
          next: data => {
            debugger
            this.attendancelist = data;
            this.loader = false;
          }
        })
    }
  }

  public getenddate(event: any) {
    debugger
    this.showPopup = 0;
    this.startdate = this.datePipe.transform(event[0], 'yyyy-MM-dd');
    this.enddate = this.datePipe.transform(event[1], 'yyyy-MM-dd');
    if (this.startdate == undefined) {
      this.enddate = ""
      this.showPopup = 1;
      this.messageId = 82;
    }
    else if (this.enddate == "") {
      this.enddate = "";
      this.startdate = "";
      this.ngOnInit();
    }
    else if (this.enddate < this.startdate) {
      Swal.fire('Enddate Must Be Greater Than Startdate')
      this.enddate = ""
      this.startdate = ""
      this.showPopup = 1;
      this.messageId = 29;
    }
    else {
      if (this.roleID == 10) {
        this.DigiofficeService.GetAttendance()
          .subscribe({
            next: data => {
              debugger
              this.attendancelist = data.filter(x => x.signinDate >= this.startdate && x.signinDate <= this.enddate);
              this.loader = false;
            }
          })
      }
      else {
        this.DigiofficeService.GetAttendanceByManagerID(this.staffid, this.firstDayOfCurrentMonth, this.todaydate)
          .subscribe({
            next: data => {
              debugger
              this.attendancelist = data.filter(x => x.signinDate >= this.startdate && x.signinDate <= this.enddate);
              this.loader = false;
            }
          })
      }
    }
  }

  public GetAttendance() {
    debugger
    this.loader = true;
    if (this.roleID == 10 || this.roleID == 11 || this.roleID == 9) {
      this.DigiofficeService.GetAttendanceBydate(this.firstDayOfCurrentMonth, this.lastDayOfCurrentMonth)
        .subscribe({
          next: data => {
            debugger
            this.attendancelist = data;
            this.loader = false;
          }
        })
    }
    else {
      this.DigiofficeService.GetAttendanceByManagerID(this.staffid, this.firstDayOfCurrentMonth, this.todaydate)
        .subscribe({
          next: data => {
            debugger
            this.attendancelist = data;
            this.loader = false;
          }
        })
    }
  }

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('lvs');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  public reset() {
    debugger
    this.startdate1 = '';
    this.ngOnInit();
  }
}