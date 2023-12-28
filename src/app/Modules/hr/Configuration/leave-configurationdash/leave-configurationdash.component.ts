import { Component, OnInit } from '@angular/core';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { LeaveConfigurationComponent } from '../leave-configuration/leave-configuration.component';

@Component({
  selector: 'app-leave-configurationdash',
  templateUrl: './leave-configurationdash.component.html',
  styleUrls: ['./leave-configurationdash.component.css']
})
export class LeaveConfigurationdashComponent implements OnInit {
  leaveList: any;
  currentUrl: any;
  term: any;
  file: any;
  loader: any;
  login: any;
  showPopup: number = 0;
  messageId: number = 0;

  constructor(public DigiofficeService: DigiofficecorehrService, private matDialog: MatDialog) { }
  ngOnInit(): void {
    this.loader = true;
    this.login = sessionStorage.getItem('roledid');
    this.GetLeaveConfiguration();
  }

  public GetLeaveConfiguration() {
    debugger
    this.DigiofficeService.GetLeaveConfiguration()
      .subscribe({
        next: data => {
          debugger
          this.leaveList = data;
          this.loader = false;
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
        this.DigiofficeService.DeleteLeaveConfiguration(id)
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
    this.matDialog.open(LeaveConfigurationComponent, {
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
    this.matDialog.open(LeaveConfigurationComponent, {
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