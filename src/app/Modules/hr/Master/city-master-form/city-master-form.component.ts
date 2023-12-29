import { Component, Inject, OnInit } from '@angular/core';
import { DigiofficecorehrService } from '../../../../Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-city-master-form',
  templateUrl: './city-master-form.component.html',
  styleUrls: ['./city-master-form.component.css']
})
export class CityMasterFormComponent implements OnInit {

  constructor(public DigiofficeService: DigiofficecorehrService, private activatedroute: ActivatedRoute,private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public ID: any, public dialogRef: MatDialogRef<CityMasterFormComponent>) { }

  leavelist: any;
  Short: any;
  Description: any;
  currentUrl: any;
  leavelist1: any
  term: any;
  StateID: any;
  CountryID: any;
  loader: any;
  stateList: any;
  showPopup: number = 0;
  messageId: number = 0;
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.GetCountryType();
    // this.GetStateType1();
    this.ActivatedRouteCall();
  }

  public ActivatedRouteCall() {
    this.loader = true;
    this.activatedroute.params.subscribe(params => {
      debugger;

      this.loader = false;
      if (this.ID == undefined) {
        this.Short = "",
          this.Description = ""
        this.StateID = ""
        this.CountryID = ""
        this.loader = false;
      }
      else {
        this.DigiofficeService.GetCityType()
          .subscribe({
            next: data => {
              debugger
              this.leavelist = data.filter(x => x.id == this.ID);
              this.CountryID = this.leavelist[0].countryID;
              this.StateID = this.leavelist[0].stateID
              this.Short = this.leavelist[0].short
              this.Description = this.leavelist[0].description
              this.DigiofficeService.GetStateType()
                .subscribe({
                  next: data => {
                    debugger
                    this.stateList = data.filter(x => x.id == this.StateID);
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
    )
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

  public GetCountryType1(id: any) {
    debugger
    this.loader = true;
    this.DigiofficeService.GetCountryType()
      .subscribe({
        next: data => {
          debugger
          this.leavelist1 = data.filter(x => x.id == id);
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

  public GetStateType1(evene: any) {
    debugger
    this.loader = true;
    this.DigiofficeService.GetStateType()
      .subscribe({
        next: data => {
          debugger
          this.stateList = data.filter(x => x.countryID == evene.target.value);
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

  
  public Cancel() {
    debugger
    location.href = "#/Admin/CityMasterDash";
    this.loader = false;
  }


  public InsertCityType() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    if (this.CountryID == undefined || this.CountryID == ""
      || this.StateID == undefined || this.StateID == 0
      || this.Description == undefined || this.Description == ""
      || this.Short == undefined || this.Short == "") {
      /*  Swal.fire('Please Fill All Fields'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    }
    else {
      var entity = {
        'CountryID': this.CountryID,
        'StateID': this.StateID,
        'Short': this.Short,
        'Description': this.Description
      }
      this.DigiofficeService.InsertCityType(entity)
        .subscribe({
          next: data => {
            debugger
            if (data != 0) {
              /*    Swal.fire("Saved Successfully"); */
              this.dialogRef.close(false);
              this.loader = false;
              this.showPopup = 1;
              this.messageId = 8;
            }
          }, error: (err) => {
            // Swal.fire('Issue in Inserting City Type');
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

  public UpdateCityType() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    if (this.CountryID == undefined || this.CountryID == ""
      || this.StateID == undefined || this.StateID == 0
      || this.Description == undefined || this.Description == ""
      || this.Short == undefined || this.Short == "") {
      /* Swal.fire('Please Fill All Fields'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    }
    else {
      var entity = {
        ID: this.ID,
        Short: this.Short,
        Description: this.Description

      }
      this.DigiofficeService.UpdateCityType(entity)
        .subscribe({
          next: data => {
            debugger
            /*       Swal.fire("Updated Successfully"); */
            this.dialogRef.close(false);
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 10;
          }, error: (err) => {
            // Swal.fire('Issue in Updating City Type');
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
}
