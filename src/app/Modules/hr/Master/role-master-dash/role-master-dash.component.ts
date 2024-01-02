import { Component, OnInit } from '@angular/core';
import { DigiofficecorehrService } from '../../../../Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { LoanMasterComponent } from '../loan-master/loan-master.component';
import { ShiftMasterFormComponent } from '../shift-master-form/shift-master-form.component';
import { RoleMasterFormComponent } from '../role-master-form/role-master-form.component';


@Component({
  selector: 'app-role-master-dash',
  templateUrl: './role-master-dash.component.html',
  styleUrls: ['./role-master-dash.component.css']
})
export class RoleMasterDashComponent implements OnInit {

  constructor(public DigiofficeService: DigiofficecorehrService,private matDialog: MatDialog) { }
  currentUrl: any;
  roletypeList: any;
  search: any;
  shiftmasterlist: any
  p: any = 1;
  count1: any = 10;
  loader:any;
  login:any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.login = sessionStorage.getItem('roledid');
    this.loader=true;
    this.GetRoleType();
  }

  AddPosition(){
    let ID= undefined
       this.matDialog.open(RoleMasterFormComponent, {
      data: ID,
      height:'auto',
      width:'75%'
    }).afterClosed()
      .subscribe(result => {
        console.log('Result' + result);
        this.ngOnInit();
      })

  }

  Edit(ID:any) {
    debugger;
    // let ID = ID
    this.matDialog.open(RoleMasterFormComponent, {
      data: ID,
      height:'auto',
      width: '75%'
    }).afterClosed()
      .subscribe(result => {
        console.log('Result' + result);
        this.ngOnInit();
      });
  }

  public GetRoleType() {
    debugger
    this.loader=true;
    this.DigiofficeService.GetRoleType()
      .subscribe({
        next: data => {
          debugger
          this.roletypeList = data;
          this.loader=false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Role Type');
          // this.loader=false;
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }

  public delete(ID: any) {
    debugger
    Swal.fire({
      title: 'Delete Record',
      text: 'Are you sure you want to delete it?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        this.DigiofficeService.DeleteRoleType(ID)
          .subscribe({
            next: data => {
              debugger
              Swal.fire('Deleted Successfully')
              location.reload();
            }, error: (err) => {
              // Swal.fire('Issue in Deleting Role Type');
              // this.loader=false;
              // Insert error in Db Here//
              var obj = {
                'PageName': this.currentUrl,
                'ErrorMessage': err.error.message
              }
              this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                data => {
                  debugger
                },
              )
            }
          })
      }
    })
  }


}
