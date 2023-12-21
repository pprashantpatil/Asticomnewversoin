import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-attendance-details-dash',
  templateUrl: './attendance-details-dash.component.html',
  styleUrls: ['./attendance-details-dash.component.css']
})
export class AttendanceDetailsDashComponent implements OnInit {
  currentUrl: any;
  attendanceList: any;
  search: any;
  loader: any;
  staffID: any;
  date: any;
  startDate: any;
  endDate: any;
  roleID: any;
  fileName: any;
  firstDayOfCurrentMonth: any;
  lastDayOfCurrentMonth: any;
  attendanceFilter: any;
  firstDayOfCurrentMonthFilter: any;
  lastDayOfCurrentMonthFilter: any;
  showPopup: number = 0;
  messageId: number = 0;

  constructor(public DigiofficecorehrService: DigiofficecorehrService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.staffID = localStorage.getItem('staffid');
    this.roleID = localStorage.getItem('roledid');
    const format = 'yyyy-MM-dd';
    const locale = 'en-US';
    this.firstDayOfCurrentMonthFilter = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    this.lastDayOfCurrentMonthFilter = new Date(new Date().getFullYear(), new Date().getMonth(), 30);
    this.firstDayOfCurrentMonth = formatDate(this.firstDayOfCurrentMonthFilter, format, locale);
    this.lastDayOfCurrentMonth = formatDate(this.lastDayOfCurrentMonthFilter, format, locale);
    this.getData();
  }

  public getData() {
    this.DigiofficecorehrService.GetAttendanceByEmployeeID(this.staffID, this.firstDayOfCurrentMonth, this.lastDayOfCurrentMonth).subscribe(
      res => {
        debugger;
        this.attendanceList = res;
        this.attendanceFilter = res;
        this.loader = false;
      })
  }

  public getEndDate(event: any) {
    debugger
    this.startDate = this.datePipe.transform(event[0], 'yyyy-MM-dd');
    this.endDate = this.datePipe.transform(event[1], 'yyyy-MM-dd');
    if (this.endDate < this.startDate) {
      Swal.fire("The end date should be greater than the start date")
      this.endDate = ""
      this.loader = false;
    }
    else if (this.startDate == undefined) {
      Swal.fire("Please select the start date first")
      this.endDate = ""
      this.loader = false;
    }
    else {
      this.attendanceList = this.attendanceFilter.filter((x: { signinDate: any; }) => (x.signinDate >= this.startDate && x.signinDate <= this.endDate));
      this.loader = false;
    }
  }

  exportexcel(): void {
    this.fileName = "Attendance Details Report.xlsx"
    /* table id is passed over here */
    let element = document.getElementById('document');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }
}