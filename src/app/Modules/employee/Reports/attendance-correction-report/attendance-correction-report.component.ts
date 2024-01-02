import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import { DatePipe, formatDate } from '@angular/common';
import { ExportToCsv } from 'export-to-csv';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance-correction-report',
  templateUrl: './attendance-correction-report.component.html',
  styleUrls: ['./attendance-correction-report.component.css']
})
export class AttendanceCorrectionReportComponent implements OnInit {
  viewMode = 'tab1';
  term: any;
  roleid: any;
  p: any = 1;
  count1: any = 10;
  count: any;
  startdate1: any;
  correctionlist1: any = [];
  currentUrl: any;
  date: any;
  startdate: any;
  enddate: any;
  fileName = 'Attendance Correction Report.xlsx';
  loader: any;
  staffID: any;
  StaffAttendanceCorrection: any;
  showPopup: number = 0;
  messageId: number = 0;

  constructor(public DigiofficeService: DigiofficecorehrService, public router: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {
    debugger
    this.currentUrl = window.location.href;
    this.staffID = localStorage.getItem('staffid');
    this.GetAttendanceCorrection();
    this.loader = true;
    this.roleid = localStorage.getItem('roledid');
    var date = new Date();
    var month = date.getMonth() + 1;
  }

  public GetAttendanceCorrection() {
    debugger
    this.DigiofficeService.GetAttendanceCorrection(this.staffID, "01-01-2020", "01-01-2025")
      .subscribe({
        next: data => {
          debugger
          this.correctionlist1 = data.filter(x => x.staffID == this.staffID);
          this.loader = false;
        }
      })
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
      this.ngOnInit();
    }
    else if (this.enddate < this.startdate) {
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 29;
    }
    else {
      this.DigiofficeService.GetAttendanceCorrection(this.staffID, this.startdate, this.enddate)
        .subscribe({
          next: data => {
            debugger
            this.correctionlist1 = data.filter(x => (x.filterdate >= this.startdate && x.filterdate <= this.enddate) && x.staffID == localStorage.getItem('staffid'));
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