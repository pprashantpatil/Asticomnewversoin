import { Component, OnInit } from '@angular/core';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import { timeStamp } from 'console';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-inactivestaff-details',
  templateUrl: './inactivestaff-details.component.html',
  styleUrls: ['./inactivestaff-details.component.css']
})
export class InactivestaffDetailsComponent implements OnInit {
  companyid: any
  activeStaff: any
  inactiveStaff: any
  remaining: any
  item: any
  month: any;
  showPopup: number = 0;
  messageId: number = 0;
  loader: any;
  fileName = 'Inactive Staff Details.xlsx';
  search: any;
  apiURL: any
  staffList: any
  staffListCopy: any
  currentUrl: any
  p: any = 1;
  count1: any = 10;

  constructor(public DigiofficeService: DigiofficecorehrService, public router: Router) { }

  ngOnInit(): void {
    this.companyid = 1;
    this.month = 0;
    this.GetStaff();
  }

  exportexcel(): void {
    this.loader = false;
    /* table id is passed over here */
    let element = document.getElementById('lvs');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
    this.loader = false;
  }

  public getCompanyDetails() {
    this.DigiofficeService.GetStaffLicenseDetailsbycompany(this.companyid).
      subscribe({
        next: data => {
          let countdetails: any = data;
          this.activeStaff = countdetails[0].activestaff;
          this.inactiveStaff = countdetails[0].inactivestaff;
          this.remaining = 5400 - (this.activeStaff + this.inactiveStaff);
        }
      })
  }

  getmonth() {
    this.DigiofficeService.GetAllStaffNewforinactivestaff(this.month).
      subscribe({
        next: data => {
          debugger
          this.staffList = data;
          this.staffListCopy = this.staffList;
          this.loader = false;
        }
      })
  }

  public GetStaff() {
    this.DigiofficeService.GetAllStaffNewforinactivestaff(0).
      subscribe({
        next: data => {
          debugger
          this.staffList = data;
          this.staffListCopy = this.staffList;
          this.loader = false;
        }
      })
  }
}