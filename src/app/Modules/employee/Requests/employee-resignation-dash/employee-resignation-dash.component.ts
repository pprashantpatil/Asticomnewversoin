import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { EmployeeResignationFormComponent } from '../employee-resignation-form/employee-resignation-form.component';

@Component({
  selector: 'app-employee-resignation-dash',
  templateUrl: './employee-resignation-dash.component.html',
  styleUrls: ['./employee-resignation-dash.component.css']
})
export class EmployeeResignationDashComponent implements OnInit {
  currentUrl: any;
  resignationList: any;
  search: any;
  loader: any;
  staffID: any;
  date: any;
  startDate: any;
  endDate: any;
  roleID: any;
  file: any;
  showPopup: number = 0;
  messageId: number = 0;
  multipleAttachmentList: any;
  type: any;

  constructor(public DigiofficecorehrService: DigiofficecorehrService, private matDialog: MatDialog, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.staffID = localStorage.getItem('staffid');
    this.roleID = localStorage.getItem('roledid');
    this.getData();
  }

  public getData() {
    this.DigiofficecorehrService.GetStaffExitFormality().subscribe(
      res => {
        debugger;
        this.resignationList = res.filter(x => x.employeeID == this.staffID);
        this.loader = false;
      })
  }

  showDialog() {
    debugger
    let ID = undefined
    this.matDialog.open(EmployeeResignationFormComponent, {
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
        this.DigiofficecorehrService.DeleteStaffExitFormality(id)
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

  public getAttachmentURL(file: any) {
    debugger
    this.file = file;
  }

  images(id: any) {
    debugger
    this.DigiofficecorehrService.GetStaffExitFormalityAttachment().subscribe(
      data => {
        debugger
        this.multipleAttachmentList = data.filter((x: { staffExitFormalityID: any; }) => x.staffExitFormalityID == id);
        this.loader = false;
      })
  }

  openAttachments(photo: any) {
    window.open(photo, '_blank');
    this.loader = false;
  }
}