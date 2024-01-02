import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import { DatePipe, formatDate } from '@angular/common';
import { ExportToCsv } from 'export-to-csv';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.css']
})
export class AttendanceReportComponent implements OnInit {

  constructor(public DigiofficeService: DigiofficecorehrService, private datePipe: DatePipe) { }
  roleid: any;
  p: any = 1;
  count1: any = 10;
  count: any;
  startdate1: any;
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  staffID: any;
  todaydate: any;
  filtereddate: any;
  firstDayofcurrentmonth: any;
  staffid: any;
  attendancelist: any;
  startdate: any;
  enddate: any
  currentUrl: any;
  loader: any;
  fileName = 'Attendance Report.xlsx';
  showPopup: number = 0;
  messageId: number = 0;
  stafflist: any;
  failedarray: any = [];
  passedarray: any = [];
  term: any
  sequenceNumber1: any
  attendancelist23: any
  companyName: any

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.roleid = localStorage.getItem('roledid');
    this.staffid = localStorage.getItem('staffid');
    this.staffID = localStorage.getItem('staffid');
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.filtereddate = formatDate(myDate, format, locale);
    this.todaydate = this.filtereddate;
    debugger
    this.firstDayofcurrentmonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    this.firstDayofcurrentmonth = formatDate(this.firstDayofcurrentmonth, format, locale);
    this.GetAttendance();
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

  public GetAttendance() {
    debugger
    this.DigiofficeService.GetAttendanceByEmployeeID(this.staffID, this.firstDayofcurrentmonth, this.todaydate)
      .subscribe({
        next: data => {
          debugger
          this.attendancelist = data;
          this.loader = false;
        }
      })
  }

  onItemSelect(item: any) {
    debugger
    console.log(item);
    this.staffid = item.id;
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

  public getenddate(event: any) {
    this.showPopup = 0;
    this.startdate = this.datePipe.transform(event[0], 'yyyy-MM-dd');
    this.enddate = this.datePipe.transform(event[1], 'yyyy-MM-dd');
    debugger
    if (this.startdate == undefined) {
      this.enddate = ""
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 28;
    }
    else if (this.enddate == "") {
      this.enddate = "";
      this.startdate = "";
      this.ngOnInit();
    }
    else if (this.enddate < this.startdate) {
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 28;
      this.enddate = ""
      this.startdate = ""
    }
    else {
      this.DigiofficeService.GetAttendanceByEmployeeID(this.staffID, this.startdate, this.enddate)
        .subscribe({
          next: data => {
            debugger
            this.attendancelist = data;
            this.loader = false;
          }
        })
    }
  }

  public exportexcel1() {
    debugger
    if (this.term != null) {
      this.attendancelist23 = this.attendancelist.filter((x: { name: string | any[]; }) => (x.name).includes(this.term.toUpperCase()))
    }
    else {
      this.attendancelist23 = this.attendancelist
    }
    var ExportData = [];
    this.sequenceNumber1 = 0;
    for (let i = 0; i < this.attendancelist23.length; i++) {
      this.sequenceNumber1 = i + 1;
      let singleData = {
        SequenceNumber: String,
        Date: String,
        EmployeeName: String,
        EmployeeNo: String,
        Position: String,
        CompanyName: String,
        ShiftTimings: String,
        ShiftDailyIN: String,
        ShiftDailyOut: String,
        ActualPunchIN: String,
        ActualPunchOut: String,
      }
      singleData.SequenceNumber = this.sequenceNumber1;
      singleData.EmployeeName = this.attendancelist23[i].staffname;
      singleData.Date = this.attendancelist23[i].signinDate;
      singleData.EmployeeNo = this.attendancelist23[i].employeID;
      singleData.Position = this.attendancelist23[i].role;
      singleData.ActualPunchIN = this.attendancelist23[i].stime;
      singleData.ActualPunchOut = this.attendancelist23[i].etime;
      singleData.ShiftDailyIN = this.attendancelist23[i].shiftStartTime;
      singleData.ShiftDailyOut = this.attendancelist23[i].shiftEndTime;
      singleData.CompanyName = this.companyName;
      singleData.ShiftTimings = this.attendancelist23[i].shiftTimeings;
      ExportData.push(singleData);
    }
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'GENERATE REPORT',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Employee_Attendance_Report'
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(ExportData);
  }

  public reset() {
    debugger
    this.startdate1 = '';
    this.ngOnInit();
  }
}