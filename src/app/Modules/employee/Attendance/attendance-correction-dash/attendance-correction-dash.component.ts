import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import { AttendanceCorrectionFormComponent } from '../attendance-correction-form/attendance-correction-form.component';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-attendance-correction-dash',
  templateUrl: './attendance-correction-dash.component.html',
  styleUrls: ['./attendance-correction-dash.component.css']
})
export class AttendanceCorrectionDashComponent implements OnInit {
  viewMode = 'tab1';
  currentUrl: any;
  attendanceCorrectionPendingList: any;
  search: any;
  loader: any;
  staffID: any;
  date: any;
  startDate: any;
  endDate: any;
  attendanceCorrectionPendingFilter: any;
  roleID: any;
  attendanceCorrectionApprovedList: any;
  attendanceCorrectionApprovedFilter: any;
  attendanceCorrectionRejectedFilter: any;
  attendanceCorrectionRejectedList: any;
  showPopup: number = 0;
  messageId: number = 0;

  constructor(public DigiofficecorehrService: DigiofficecorehrService, private matDialog: MatDialog, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.staffID = localStorage.getItem('staffid');
    this.roleID = localStorage.getItem('roledid');
    this.getData();
  }

  public getData() {
    this.DigiofficecorehrService.GetPendingAttendanceCorrectionByStaffID(this.staffID, "01-01-2020", "01-01-2025").subscribe(
      res => {
        debugger;
        this.attendanceCorrectionPendingList = res;
        this.attendanceCorrectionPendingFilter = res;
        this.loader = false;
      })

    this.DigiofficecorehrService.GetApprovedAttendanceCorrectionByStaffID(this.staffID, "01-01-2020", "01-01-2025").subscribe(
      res => {
        debugger;
        this.attendanceCorrectionApprovedList = res;
        this.attendanceCorrectionApprovedFilter = res;
        this.loader = false;
      })

    this.DigiofficecorehrService.GetRejectedAttendanceCorrectionByStaffID(this.staffID, "01-01-2020", "01-01-2025").subscribe(
      res => {
        debugger;
        this.attendanceCorrectionRejectedList = res;
        this.attendanceCorrectionRejectedFilter = res;
        this.loader = false;
      })
  }

  showDialog() {
    debugger
    let ID = undefined
    this.matDialog.open(AttendanceCorrectionFormComponent, {
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
    this.matDialog.open(AttendanceCorrectionFormComponent, {
      data: ID,
      width: '100%',
      maxHeight: '80vh'
    }).afterClosed()
      .subscribe(result => {
        console.log('Result' + result);
        this.ngOnInit();
      });
  }

  public openDeletePopUp(id: any) {
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
        this.DigiofficecorehrService.DeleteAttendanceCorrection(id)
          .subscribe({
            next: data => {
              Swal.fire('Deleted Successfully');
              this.ngOnInit();
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
    }
    else if (this.startDate == undefined) {
      Swal.fire("Please select the start date first")
      this.endDate = ""
    }
    else {
      this.attendanceCorrectionPendingList = this.attendanceCorrectionPendingFilter.filter((x: { modifiedDate: any; sDate: any; }) => (x.modifiedDate >= this.startDate && x.modifiedDate <= this.endDate) || (x.sDate >= this.startDate && x.sDate <= this.endDate));
      this.attendanceCorrectionApprovedList = this.attendanceCorrectionApprovedFilter.filter((x: { modifiedDate: any; sDate: any; approvedDate: any; }) => (x.modifiedDate >= this.startDate && x.modifiedDate <= this.endDate) || (x.sDate >= this.startDate && x.sDate <= this.endDate) || (x.approvedDate >= this.startDate && x.approvedDate <= this.endDate));
      this.attendanceCorrectionPendingList = this.attendanceCorrectionPendingFilter.filter((x: { modifiedDate: any; sDate: any; approvedDate: any; }) => (x.modifiedDate >= this.startDate && x.modifiedDate <= this.endDate) || (x.sDate >= this.startDate && x.sDate <= this.endDate) || (x.approvedDate >= this.startDate && x.approvedDate <= this.endDate));
    }
  }
}