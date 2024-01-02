import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { DatePipe, formatDate } from '@angular/common';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';

@Component({
  selector: 'app-leave-report',
  templateUrl: './leave-report.component.html',
  styleUrls: ['./leave-report.component.css']
})
export class LeaveReportComponent implements OnInit {
  staffApprovedLeaves: any;
  staffRejectedLeaves: any;
  viewMode = 'tab1';
  roledid: any;
  p: any = 1;
  count1: any = 10;
  count: any;
  term: any;
  startdate1: any;
  startdate: any;
  enddate: any
  currentUrl: any;
  staffPendingLeaves: any;
  loader: any;
  fileName = 'Leave Report.xlsx';
  showPopup: number = 0;
  messageId: number = 0;

  constructor(public DigiofficeService: DigiofficecorehrService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.roledid = localStorage.getItem('roledid');
    this.getstaffleaves();
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
      this.messageId = 28
    }
    else if (this.enddate == "") {
      this.ngOnInit();
      this.enddate = "";
      this.startdate = "";
    }
    else if (this.enddate < this.startdate) {
      this.enddate = ""
      this.startdate = ""
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 29
    }
    else {
      this.DigiofficeService.GetStaffLeaves(10331, 1, "01-01-2020", "01-01-2025")
        .subscribe({
          next: data => {
            debugger
            this.staffPendingLeaves = data.filter(x => (x.filterdate >= this.startdate && x.filterdate <= this.enddate) && x.staffID == localStorage.getItem('staffid') && x.status == 'Manager Pending');
            this.staffApprovedLeaves = data.filter(x => (x.filterdate >= this.startdate && x.filterdate <= this.enddate) && x.staffID == localStorage.getItem('staffid') && x.status == 'Manager Approved');
            this.staffRejectedLeaves = data.filter(x => (x.filterdate >= this.startdate && x.filterdate <= this.enddate) && x.staffID == localStorage.getItem('staffid') && x.status == 'Rejected');
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

  public getstaffleaves() {
    debugger
    this.DigiofficeService.GetStaffLeaves(10331, 1, "01-01-2020", "01-01-2025")
      .subscribe({
        next: data => {
          debugger
          this.staffPendingLeaves = data.filter(x => x.staffID == localStorage.getItem('staffid') && x.status == 'Manager Pending');
          this.staffApprovedLeaves = data.filter(x => x.staffID == localStorage.getItem('staffid') && x.status == 'Manager Approved');
          this.staffRejectedLeaves = data.filter(x => x.staffID == localStorage.getItem('staffid') && x.status == 'Rejected');
          this.loader = false;
        }
      })
  }

  public reset() {
    debugger
    this.startdate1 = '';
    this.ngOnInit();
  }
}