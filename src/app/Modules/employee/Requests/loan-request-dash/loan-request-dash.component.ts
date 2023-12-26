import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { LoanRequestFormComponent } from '../loan-request-form/loan-request-form.component';

@Component({
  selector: 'app-loan-request-dash',
  templateUrl: './loan-request-dash.component.html',
  styleUrls: ['./loan-request-dash.component.css']
})
export class LoanRequestDashComponent implements OnInit {
  viewMode = 'tab1';
  currentUrl: any;
  loanPendingList: any;
  search: any;
  loader: any;
  staffID: any;
  date: any;
  startDate: any;
  endDate: any;
  roleID: any;
  file: any;
  loanPendingFilter: any;
  showPopup: number = 0;
  messageId: number = 0;
  todayDate: any;
  loanApprovedList: any;
  loanApprovedFilter: any;
  loanRejectedList: any;
  loanRejectedFilter: any;
  multipleAttachmentList: any;
  loanList: any;

  constructor(public DigiofficecorehrService: DigiofficecorehrService, private matDialog: MatDialog, private datePipe: DatePipe) { }

  ngOnInit(): void {
  
    this.currentUrl = window.location.href;
    this.staffID = localStorage.getItem('staffid');
    this.roleID = localStorage.getItem('roledid');
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todayDate = formatDate(myDate, format, locale);
    this.getData();
  }

  public getData() {
    this.DigiofficecorehrService.GetEmployeeLoans().subscribe(
      res => {
        debugger;
        this.loanList = res.filter(x => x.staffID == localStorage.getItem('staffid'));

        this.loanPendingList = this.loanList.filter((x: { status: string }) => x.status != 'HR Approved' && x.status != 'HR Rejected');
        this.loanPendingFilter = this.loanList.filter((x: { status: string }) => x.status != 'HR Approved' && x.status != 'HR Rejected');

        this.loanApprovedList = this.loanList.filter((x: { status: string }) => x.status == 'HR Approved');
        this.loanApprovedFilter = this.loanList.filter((x: { status: string }) => x.status == 'HR Approved');

        this.loanRejectedList = this.loanList.filter((x: { status: string }) => x.status == 'HR Rejected');
        this.loanRejectedFilter = this.loanList.filter((x: { status: string }) => x.status == 'HR Rejected');
        this.loader = false;
      })
  }

  showDialog() {
    debugger
    let ID = undefined
    this.matDialog.open(LoanRequestFormComponent, {
      data: ID,
      width: '100%',
      maxHeight: '80vh'
    }).afterClosed()
      .subscribe(result => {
        console.log('Result' + result);
        this.ngOnInit();
        this.loader = false;
      });
  }

  edit(ID: any) {
    debugger
    this.matDialog.open(LoanRequestFormComponent, {
      data: ID,
      width: '100%',
      maxHeight: '80vh'
    }).afterClosed()
      .subscribe(result => {
        console.log('Result' + result);
        this.ngOnInit();
        this.loader = false;
      });
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
        this.DigiofficecorehrService.DeleteEmployeeLoans(id)
          .subscribe({
            next: data => {
              Swal.fire('Deleted Successfully');
              this.ngOnInit();
              this.loader = false;
            }
          })
      }
    });
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
      this.loanPendingList = this.loanPendingFilter.filter((x: { modifiedDate: any; }) => (x.modifiedDate >= this.startDate && x.modifiedDate <= this.endDate));
      this.loanApprovedList = this.loanApprovedFilter.filter((x: { modifiedDate: any; }) => (x.modifiedDate >= this.startDate && x.modifiedDate <= this.endDate));
      this.loanRejectedList = this.loanRejectedFilter.filter((x: { modifiedDate: any; }) => (x.modifiedDate >= this.startDate && x.modifiedDate <= this.endDate));
      this.loader = false;
    }
  }

  image(id: any) {
    debugger
    this.DigiofficecorehrService.GetEmployeeLoansAttachment().subscribe(
      data => {
        debugger
        this.multipleAttachmentList = data.filter(x => x.loanID == id);
        this.loader = false;
      })
  }

  openAttachments(photo: any) {
    window.open(photo, '_blank');
  }

  public stop(item: any) {
    var entity = {
      ID: item,
      status: 1
    }
    this.DigiofficecorehrService.UpdateEmployeeLoansByManager(entity)
      .subscribe({
        next: data => {
          debugger
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 10;
        }
      })
  }
}