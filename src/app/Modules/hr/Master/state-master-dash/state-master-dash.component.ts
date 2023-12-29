import { Component, OnInit } from '@angular/core';
import { DigiofficecorehrService } from '../../../../Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { LoanMasterComponent } from '../loan-master/loan-master.component';
import { StateMasterFormComponent } from '../state-master-form/state-master-form.component';


@Component({
  selector: 'app-state-master-dash',
  templateUrl: './state-master-dash.component.html',
  styleUrls: ['./state-master-dash.component.css']
})
export class StateMasterDashComponent implements OnInit {


  constructor(public DigiofficeService: DigiofficecorehrService,private matDialog: MatDialog) { }  currentUrl: any;
  CountryID: any;
  term: any;
  leavelist: any
  leavelist1: any
  p: any = 1;
  count1: any = 10;
  loader: any;
  login: any;
  showPopup: number = 0;
  messageId: number = 0;
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.login = sessionStorage.getItem('roledid');
    this.loader = true;
    this.GetStateType();
    this.GetCountryType();
    this.CountryID = "Select"
  }

  public GetStateType() {
    debugger
    this.loader = true;
    this.DigiofficeService.GetStateType()
      .subscribe({
        next: data => {
          debugger
          this.leavelist = data;
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting State Type');
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

  public GetCountryType() {
    debugger
    this.loader = true;
    this.DigiofficeService.GetCountryType()
      .subscribe({
        next: data => {
          debugger
          this.leavelist1 = data;
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Country Type');
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

  public DeleteStateType(ID: any) {
    debugger
    this.showPopup=0;
    Swal.fire({
      title: 'Delete Record',
      text: 'Are you sure you want to delete it?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        this.DigiofficeService.DeleteStateType(ID)
          .subscribe({
            next: data => {
              debugger
            /*   Swal.fire('Deleted Successfully') */
            this.showPopup=1;
            this.messageId=11;
              location.reload();
            }, error: (err) => {
              // Swal.fire('Issue in Deleting State Type');
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

  
  Edit(ID:any) {
    // let ID = ID
    this.matDialog.open(StateMasterFormComponent, {
      data: ID,
      height:'auto',
      width: '75%'
    }).afterClosed()
      .subscribe(result => {
        console.log('Result' + result);
        this.ngOnInit();
      });
  }

  Addleave (){
    let ID= undefined
       this.matDialog.open(StateMasterFormComponent, {
      data: ID,
      height:'auto',
      width:'75%'
    }).afterClosed()
      .subscribe(result => {
        console.log('Result' + result);
        this.ngOnInit();
      })

  }


  public GetFilteredStatesByCountry() {
    this.loader = true;
    this.DigiofficeService.GetStateType()
      .subscribe({
        next: data => {
          debugger
          this.leavelist = data.filter(x => x.countryID == this.CountryID);
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting State Type');
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


}
