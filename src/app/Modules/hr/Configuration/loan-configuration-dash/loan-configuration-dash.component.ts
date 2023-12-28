import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import { LoanConfigurationMasterComponent } from '../loan-configuration-master/loan-configuration-master.component';

@Component({
  selector: 'app-loan-configuration-dash',
  templateUrl: './loan-configuration-dash.component.html',
  styleUrls: ['./loan-configuration-dash.component.css']
})
export class LoanConfigurationDashComponent implements OnInit {

  constructor(public DigipayrollServiceService: DigiofficecorehrService, private matDialog: MatDialog) { }
  file: any;
  term: any;
  loanList: any
  currentUrl: any;
  loader: any;
  login: any;
  p: any = 1;
  count1: any = 10;
  showPopup: number = 0;
  messageId: number = 0;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.login = sessionStorage.getItem('roledid');
    this.loader = true;
    this.GetHolidays();
  }

  public GetHolidays() {
    debugger
    this.DigipayrollServiceService.GetLoanConfiguration()
      .subscribe({
        next: data => {
          debugger
          this.loanList = data;
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Loan Configuration');
          this.loader = false;
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }

  public openDeletePopUp(id: any) {
    this.showPopup = 0;
    Swal.fire({
      title: 'Delete record',
      text: "Are you sure you want to delete it?",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Proceed'
    }).then((result) => {
      if (result.value == true) {
        this.DigipayrollServiceService.DeleteLoanConfiguration(id)
          .subscribe({
            next: data => {
              Swal.fire('Deleted Successfully');
              this.ngOnInit();
            }
          })
      }
    });
  }

  public getmedicalUrl(file: any) {
    debugger
    this.file = file;
  }

  showDialog() {
    debugger
    let ID = undefined
    this.matDialog.open(LoanConfigurationMasterComponent, {
      data: ID,
      width: '100%',
      maxHeight: '80vh'
    }).afterClosed()
      .subscribe(result => {
        console.log('Result' + result);
        this.ngOnInit();
      });
  }

  edit(ID: any) {
    debugger
    this.matDialog.open(LoanConfigurationMasterComponent, {
      data: ID,
      width: '100%',
      maxHeight: '80vh'
    }).afterClosed()
      .subscribe(result => {
        console.log('Result' + result);
        this.ngOnInit();
      });
  }
}