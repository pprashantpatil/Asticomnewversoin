import { Component, Inject, OnInit } from '@angular/core';
import { DigiofficecorehrService } from '../../../../Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-shift-master-form',
  templateUrl: './shift-master-form.component.html',
  styleUrls: ['./shift-master-form.component.css']
})
export class ShiftMasterFormComponent implements OnInit {
  constructor(public DigiofficeService: DigiofficecorehrService, private activatedroute: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public ID: any,public dialogRef: MatDialogRef<ShiftMasterFormComponent>) { }

  shiftmasterlist: any;
  Short: any;
  Description: any;
  ShiftTimeings: any
  Grace: any
  currentUrl: any;
  loader: any;
  ShiftType: any;
  StartTime: any;
  EndTime: any;
  showSpinners: any;
  showPopup: number = 0;
  messageId: number = 0;
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.showSpinners = false;
    this.ShiftType = "0"
    this.loader = true;
    this.GetShiftMaster();
    this.GetShiftMasterActiveParam();
  }

  public GetShiftMasterActiveParam() {
    this.loader = true;
    this.activatedroute.params.subscribe(params => {
      debugger;
  
      this.loader = false;
      if (this.ID == undefined) {
      }
      else {
        this.DigiofficeService.GetShiftMaster()
          .subscribe({
            next: data => {
              debugger
              this.shiftmasterlist = data.filter(x => x.id == this.ID);
              this.loader = false;
              this.Short = this.shiftmasterlist[0].short;
              this.Description = this.shiftmasterlist[0].description;
              this.ShiftTimeings = this.shiftmasterlist[0].shiftTimeings;
              this.Grace = this.shiftmasterlist[0].grace;
              this.ShiftType=this.shiftmasterlist[0].shiftType;
              this.StartTime = this.shiftmasterlist[0].starttime;
              this.EndTime=this.shiftmasterlist[0].endtime;
            }, error: (err) => {
              // Swal.fire('Issue in Getting Shift Master');
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

  public GetShiftMaster() {
    this.loader = true;
    this.DigiofficeService.GetShiftMaster()
      .subscribe({
        next: data => {
          debugger
          this.shiftmasterlist = data;
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Shift Master');
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

  public InsertShiftMaster() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    if (this.Description == undefined || this.Description == "" || this.Short == undefined || this.Short == "" || this.ShiftTimeings == "" || this.ShiftTimeings == undefined ||
      this.ShiftType == 0 || this.ShiftType == " " || this.StartTime == undefined || this.StartTime == "" || this.EndTime == undefined || this.EndTime == "") {
      /*      Swal.fire('Please Fill All Fields'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    }
    else {
      var entity = {
        Short: this.Short,
        Description: this.Description,
        ShiftTimeings: this.ShiftTimeings,
        Grace: this.Grace,
        ShiftType: this.ShiftType,
        StartTime: this.StartTime,
        EndTime: this.EndTime
      }
      this.loader = false;
      this.DigiofficeService.InsertShiftMaster(entity)
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
            // Swal.fire('Issue in Inserting Shift Master');
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
    location.href = "#/Admin/ShiftMasterDash";
    this.loader = false;
  }

  public UpdateShiftMaster() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    if (this.Description == undefined || this.Description == "" || this.Short == undefined || this.Short == "" || this.ShiftTimeings == "" || this.ShiftTimeings == undefined ||
      this.ShiftType == 0 || this.ShiftType == " " || this.StartTime == undefined || this.StartTime == "" || this.EndTime == undefined || this.EndTime == "") {
      /*  Swal.fire('Please Fill All Fields'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    }
    else {
      var entity = {
        ID: this.ID,
        Short: this.Short,
        Description: this.Description,
        ShiftTimeings: this.ShiftTimeings,
        Grace: this.Grace,
        ShiftType: parseFloat(this.ShiftType),
        StartTime: this.StartTime,
        EndTime: this.EndTime
      }
      this.DigiofficeService.UpdateShiftMaster(entity)
        .subscribe({
          next: data => {
            debugger
            /*  Swal.fire("Updated Successfully"); */

            this.loader = false;
            this.showPopup = 1;
            this.messageId = 10;
            this.dialogRef.close(false);
          }, error: (err) => {
            this.loader = false;
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
