import { Component, OnInit } from '@angular/core';
import { DigiofficecorehrService } from '../../../../Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { CityMasterFormComponent } from '../city-master-form/city-master-form.component';import { AddbarangaymasterComponent } from '../addbarangaymaster/addbarangaymaster.component';
;

@Component({
  selector: 'app-barangaymaster',
  templateUrl: './barangaymaster.component.html',
  styleUrls: ['./barangaymaster.component.css']
})
export class BarangaymasterComponent implements OnInit {

  constructor(public DigiofficeService: DigiofficecorehrService,private matDialog: MatDialog) { }
  currentUrl: any;
  term: any;
  leavelist: any
  stateID: any;
  leavelist1: any;
  loader: any;
  p: any = 1;
  count1: any = 10;
  login: any;
  showPopup: number = 0;
  messageId: number = 0;
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.login = sessionStorage.getItem('roledid');
    this.loader = true;
    this.GetCityType();
    this.GetStateType();
    this.stateID = "Select"
  }

  public GetCityType() {
    debugger
    this.loader = true;
    this.DigiofficeService.GetBarangayMaster()
      .subscribe({
        next: data => {
          debugger
          this.leavelist = data;
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Barangay Master');
          // this.loader = false;
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

  public GetStateType() {
    debugger
    this.loader = true;
    this.DigiofficeService.GetStateType()
      .subscribe({
        next: data => {
          debugger
          this.leavelist1 = data;
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting State Type');
          // this.loader = false;
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

  AddBarangay(){
    let ID= undefined
       this.matDialog.open(AddbarangaymasterComponent, {
      data: ID,
      height:'auto',
      width:'75%'
    }).afterClosed()
      .subscribe(result => {
        console.log('Result' + result);
        this.ngOnInit();
      })

  }

  Edit(ID : any){
    this.matDialog.open(AddbarangaymasterComponent, {
      data: ID,
      height:'auto',
      width:'75%'
    }).afterClosed()
      .subscribe(result => {
        console.log('Result' + result);
        this.ngOnInit();
      })

  }


  public DeleteBarangay(ID: any) {
    debugger
    this.showPopup = 0;
    Swal.fire({
      title: 'Delete Record',
      text: 'Are you sure you want to delete it?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        this.DigiofficeService.DeleteBarangayMaster(ID)
          .subscribe({
            next: data => {
              debugger
              /* Swal.fire('Deleted Successfully') */
              location.reload();
              this.loader = false
              this.showPopup = 1;
              this.messageId = 11
            }, error: (err) => {
              // Swal.fire('Issue in Deleting Barangay Master');
              // this.loader = false;
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

  public GetFilteredCitiesBystateID() {
    this.loader = true;
    this.DigiofficeService.GetCityType()
      .subscribe({
        next: data => {
          debugger
          this.leavelist = data.filter(x => x.stateID == this.stateID);
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting City Type');
          // this.loader = false;
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
