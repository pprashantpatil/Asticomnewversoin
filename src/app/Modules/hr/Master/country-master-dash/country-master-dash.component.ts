import { Component, OnInit } from '@angular/core';
import { DigiofficecorehrService } from '../../../../Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { CountryMasterFormComponent } from '../country-master-form/country-master-form.component';

@Component({
  selector: 'app-country-master-dash',
  templateUrl: './country-master-dash.component.html',
  styleUrls: ['./country-master-dash.component.css']
})
export class CountryMasterDashComponent implements OnInit {

  constructor(public DigiofficeService: DigiofficecorehrService,private matDialog: MatDialog) { }
  term: any;
  countryList: any;
  loader: any;
  currentUrl: any;
  count1: any = 10;
  p: any = 1;
  login: any;
  showPopup: number = 0;
  messageId: number = 0;
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.login = sessionStorage.getItem('roledid');
    this.loader = true;
    this.GetCountryType();
  }

  Edit(ID : any){
    this.matDialog.open(CountryMasterFormComponent, {
      data: ID,
      height:'auto',
      width:'75%'
    }).afterClosed()
      .subscribe(result => {
        console.log('Result' + result);
        this.ngOnInit();
      })

  }

  public GetCountryType() {
    debugger
    this.loader = true;
    this.DigiofficeService.GetCountryType()
      .subscribe({
        next: data => {
          debugger
          this.countryList = data;
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Country Type');
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

  AddCountry(){
    let ID= undefined
       this.matDialog.open(CountryMasterFormComponent, {
      data: ID,
      height:'auto',
      width:'75%'
    }).afterClosed()
      .subscribe(result => {
        console.log('Result' + result);
        this.ngOnInit();
      })

  }


  public DeleteCountryType(ID: any) {
    debugger
    this.showPopup=0;
    Swal.fire({
      title: 'Delete Record',
      text: "Are you sure you want to delete? You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      debugger
      if (result.value == true) {
        this.DigiofficeService.DeleteCountryType(ID)
          .subscribe({
            next: data => {
              debugger
           /*    Swal.fire('Deleted Successfully'); */
              location.reload();
              this.loader = false;
              this.showPopup=1;
              this.messageId=11
            }, error: (err) => {
              // Swal.fire('Issue in Deleting Country Type');
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

}
