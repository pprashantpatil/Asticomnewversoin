import { Component, Inject, OnInit } from '@angular/core';
import { DigiofficecorehrService } from '../../../../Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-country-master-form',
  templateUrl: './country-master-form.component.html',
  styleUrls: ['./country-master-form.component.css']
})
export class CountryMasterFormComponent implements OnInit {

  constructor(public DigiofficeService: DigiofficecorehrService, private activatedroute: ActivatedRoute,private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public ID: any, public dialogRef: MatDialogRef<CountryMasterFormComponent>) { }
  // ID: any;
  leavelist: any;
  Short: any;
  Description: any;
  loader: any;
  currentUrl: any;
  showPopup: number = 0;
  messageId: number = 0;
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.GetCountryType();
  }

  public GetCountryType() {
    this.loader = true;
    this.activatedroute.params.subscribe(params => {
      debugger;
      // this.ID = params['id'];
      this.loader = false;
      if (this.ID == undefined) {
      }
      else {
        this.DigiofficeService.GetCountryType()
          .subscribe({
            next: data => {
              debugger
              this.leavelist = data.filter(x => x.id == this.ID);
              this.loader = false;
              this.Short = this.leavelist[0].short;
              this.Description = this.leavelist[0].description;
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
    })
  }

  public Cancel() {
    debugger
    location.href = "#/Admin/CountryMasterDash";
    this.loader = false;
  }

  public InsertCountryType() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    if (this.Short == undefined || this.Short == "" || this.Description == undefined || this.Description == "") {
      /*    Swal.fire('Please Fill All Fields'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13
    }
    else {
      var entity = {
        Short: this.Short,
        Description: this.Description
      }
      this.DigiofficeService.InsertCountryType(entity)
        .subscribe({
          next: data => {
            debugger
            if (data != 0) {
              /*  Swal.fire("Saved Successfully"); */
              this.loader = false;
              this.showPopup = 1;
              this.messageId = 8
              this.dialogRef.close(false);
            }
          }, error: (err) => {
            // Swal.fire('Issue in Inserting Country Type');
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

  public UpdateCountryType() {
    debugger;
    this.showPopup = 0;
    this.loader = true;

    var entity = {
      ID: this.ID,
      Short: this.Short,
      Description: this.Description
    }
    this.DigiofficeService.UpdateCountryType(entity)
      .subscribe({
        next: data => {
          debugger
          /*        Swal.fire("Updated Successfully"); */

          this.loader = false;
          this.showPopup = 1;
          this.messageId = 10;
          this.dialogRef.close(false);

        }, error: (err) => {
          // Swal.fire('Issue in Updating Country Type');
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
