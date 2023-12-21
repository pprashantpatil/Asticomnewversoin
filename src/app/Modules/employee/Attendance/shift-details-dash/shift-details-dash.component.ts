import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import { ShiftDetailsFormComponent } from '../shift-details-form/shift-details-form.component';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-shift-details-dash',
  templateUrl: './shift-details-dash.component.html',
  styleUrls: ['./shift-details-dash.component.css']
})
export class ShiftDetailsDashComponent implements OnInit {
  currentUrl: any;
  shiftList: any;
  search: any;
  loader: any;
  staffID: any;
  date: any;
  startDate: any;
  endDate: any;
  shiftFilter: any;
  roleID: any;
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
    this.DigiofficecorehrService.GetStaffShiftDetails().subscribe(
      res => {
        debugger;
        this.shiftList = res.filter(x => x.staffID == this.staffID);
        this.shiftFilter = res.filter(x => x.staffID == this.staffID);
        this.loader = false;
      })
  }

  showDialog() {
    debugger
    let ID = undefined
    this.matDialog.open(ShiftDetailsFormComponent, {
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
    this.matDialog.open(ShiftDetailsFormComponent, {
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
        this.DigiofficecorehrService.DeleteStaffShiftDetails(id)
          .subscribe({
            next: data => {
              Swal.fire('Deleted Successfully');
              this.ngOnInit();
            }, error: (err) => {
              Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');
              this.loader = false;
              var obj = {
                'PageName': this.currentUrl,
                'ErrorMessage': err.error.message
              }
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
      this.shiftList = this.shiftFilter.filter((x: { staffID: any; filterdate: any; filterenddate: any; }) => x.staffID == this.staffID && (x.filterdate >= this.startDate && x.filterenddate <= this.endDate));
      this.loader = false;
    }
  }
}