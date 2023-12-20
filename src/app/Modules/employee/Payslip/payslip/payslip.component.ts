import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-payslip',
  templateUrl: './payslip.component.html',
  styleUrls: ['./payslip.component.css']
})
export class PayslipComponent implements OnInit {

  constructor(public DigiofficeService: DigiofficecorehrService, public sanitizer: DomSanitizer, public HttpClient: HttpClient) {
    this.payslip = this.sanitizer.bypassSecurityTrustResourceUrl(this.payslip);
    this.searchUrl(this.payslip);
  }
  Payperiod: any;
  Month: any;
  Year: any;
  loader: boolean = false;
  showpdf: boolean = false;
  filename: any;
  EmployeeID: any;
  companycode1: any;
  Companycode: any;
  ngOnInit(): void {
    this.payslip = '';
    this.Year = 0;
    this.Month = 0;
    this.Payperiod = 0;
    this.EmployeeID = localStorage.getItem('EmployeeID');
    this.companycode1 = sessionStorage.getItem('companyid');
    if (this.companycode1 == 1001) {
      this.Companycode = 'ASTI';
    } else if (this.companycode1 == 1002) {
      this.Companycode = 'ABSI';
    }
    else if (this.companycode1 == 1003) {
      this.Companycode = 'BRAD';
    }
    else if (this.companycode1 == 1005) {
      this.Companycode = 'FINS';
    }
    else if (this.companycode1 == 1006) {
      this.Companycode = 'ASHQ';
    }
    else {
      this.Companycode = 'ASTI';
    }

  }

  dd: any;
  public getpayperiod() {
    debugger
    if (this.Payperiod == 1) {
      this.dd = 15
    }
    else if (this.Payperiod == 2) {
      this.dd = this.daysInMonth(this.Month, this.Year) == undefined ? 30 : this.daysInMonth(this.Month, this.Year);
    }
    this.filename = this.EmployeeID + '_' + this.Companycode + '_' + this.Year.substring(2, 4) + this.Month + this.dd;
    //console.log(this.filename);
    this.searchUrl(this.Year + '/' + this.monthName(this.Month) + '/' + this.Payperiod + '/' + this.filename);
    this.getpayslip();
  }
  public daysInMonth(month: number, year: number) { // Use 1 for January, 2 for February, etc.
    return new Date(year, month, 0).getDate();
  }
  monthName(mon: number) {
    return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][mon - 1];
  }
  fileurl: any


  payslip: any;
  public getpayslip() {
    debugger
    this.DigiofficeService.GetPayslipByMonthandStaffID(this.Year, this.Month, this.Payperiod, this.filename).
      subscribe({
        next: data => {
          //debugger
          this.loader = true;
          this.payslip=this.sanitizer.bypassSecurityTrustResourceUrl(data);

          this.loader = false;
        }, error: (err) => {

        }
      })
    this.loader = false;


  }


  public oniFrameLoad(event: Event) {
    debugger

    var iframe = document.getElementById('id_description_iframe');

  }

  public searchUrl(url: any) {
    debugger


    this.DigiofficeService.CheckFileUrl(url + '.pdf').
      subscribe({
        next: data => {
          //debugger
          let a: any = data;
          //console.log('File Exist', data)
          if (a == 1) {
            this.showpdf = true
          } else {
            this.showpdf = false;
          }
          this.loader = false;
        }, error: (err) => {
          this.loader = false;
        }
      })
  }

  public onError() {
    debugger
    Swal.fire('error')
  }


}
