import { Component, Inject, OnInit } from '@angular/core';
import { DigiofficecorehrService } from '../../../../Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-state-master-form',
  templateUrl: './state-master-form.component.html',
  styleUrls: ['./state-master-form.component.css']
})
export class StateMasterFormComponent implements OnInit {

  constructor(public DigiofficeService: DigiofficecorehrService, private activatedroute: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public ID: any, public dialogRef: MatDialogRef<StateMasterFormComponent>) { }

  leavelist: any;
  Short: any;
  Description: any;
  CountryID: any;
  currentUrl: any;
  leavelist1: any;
  loader: any;
  showPopup: number = 0;
  messageId: number = 0;
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.CountryID = "Select"
    this.GetCountryType();
    this.GetStateType();
  }

  public GetStateType() {
    this.loader = true;
    this.activatedroute.params.subscribe(params => {
      debugger;
    
      this.loader = false;
      if (this.ID == undefined) {
      }
      else {
        this.DigiofficeService.GetStateType()
          .subscribe({
            next: data => {
              debugger
              this.leavelist = data.filter(x => x.id == this.ID);
              this.loader = false;
              this.CountryID = this.leavelist[0].countryID
              this.Short = this.leavelist[0].short
              this.Description = this.leavelist[0].description
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

  public InsertStateType() {
    this.showPopup = 0;
    debugger;
    this.loader = true;
    if (this.CountryID == undefined || this.CountryID == 0
      || this.Description == undefined || this.Description == "" || this.Description == null
      || this.Short == undefined || this.Short == "" || this.Short == null) {
      /*      Swal.fire('Please Fill All Fields'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    }
    else {
      var entity = {
        'CountryID': this.CountryID,
        'Short': this.Short,
        'Description': this.Description
      }
      this.DigiofficeService.InsertStateType(entity)
        .subscribe({
          next: data => {
            debugger
            if (data != 0) {
              /*     Swal.fire("Saved Successfully"); */
           
              this.loader = false;
              this.showPopup = 1;
              this.messageId = 8;
              this.dialogRef.close(false);
            }
          }, error: (err) => {
            // Swal.fire('Issue in Inserting State Type');
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

  public Cancel() {
    debugger
    location.href = "#/Admin/StateMasterDash";
    this.loader = false;
  }

  public UpdateStateType() {
    debugger;
    this.loader = true;
    if (this.CountryID == undefined || this.CountryID == 0
      || this.Description == undefined || this.Description == ""
      || this.Short == undefined || this.Short == "") {
      /*       Swal.fire('Please Fill All Fields'); */
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
      this.DigiofficeService.UpdateStateType(entity)
        .subscribe({
          next: data => {
            debugger
            /*   Swal.fire("Updated Successfully"); */
          
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 10;
            this.dialogRef.close(false);
          }, error: (err) => {
            // Swal.fire('Issue in Updating State Type');
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
