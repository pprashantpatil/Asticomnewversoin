import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import { ShiftDetailsFormComponent } from '../shift-details-form/shift-details-form.component';
import Swal from 'sweetalert2';

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

  constructor(public DigiofficecorehrService: DigiofficecorehrService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.staffID = sessionStorage.getItem('staffid');
    this.getData();
  }

  public getData() {
    this.DigiofficecorehrService.GetStaffShiftDetails().subscribe(
      res => {
        debugger;
        this.shiftList = res
        // .filter(x => x.staffID == this.staffID);
        this.loader = false;
      })
  }

  showDialog() {
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
}