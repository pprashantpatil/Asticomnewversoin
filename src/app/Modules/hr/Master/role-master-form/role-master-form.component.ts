import { Component, Inject, OnInit } from '@angular/core';
import { DigiofficecorehrService } from '../../../../Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-role-master-form',
  templateUrl: './role-master-form.component.html',
  styleUrls: ['./role-master-form.component.css']
})
export class RoleMasterFormComponent implements OnInit {

  constructor(public DigiofficeService: DigiofficecorehrService, private activatedroute: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public ID: any, public dialogRef: MatDialogRef<RoleMasterFormComponent>) { }

  shiftmasterlist: any;
  Short: any;
  Description: any;
  roleList: any
  Grace: any
  loader: any;
  currentUrl: any;
  showPopup: number = 0;
  messageId: number = 0;
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.GetRoleType();
    this.GetRoleTypeActiveParams();
  }

  public GetRoleTypeActiveParams() {
    this.loader = true;
    this.activatedroute.params.subscribe(params => {
      debugger;
    
      this.loader = false;
      if (this.ID == undefined) {
      }
      else {
        this.DigiofficeService.GetRoleType()
          .subscribe({
            next: data => {
              debugger
              this.roleList = data.filter(x => x.id == this.ID);
              this.loader = false;
              this.Short = this.roleList[0].short;
              this.Description = this.roleList[0].description;
            }, error: (err) => {
              // Swal.fire('Issue in Getting Role Type');
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

  public GetRoleType() {
    this.loader = true;
    this.DigiofficeService.GetRoleType()
      .subscribe({
        next: data => {
          debugger
          this.roleList = data;
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Role Type');
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

  public InsertRoleType() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    if (this.Description == undefined || this.Description == null || this.Description == "" ||
      this.Short == undefined || this.Short == null || this.Short == "") {
      /* Swal.fire('Please Fill All Fields'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13
    }
    else {
      var entity = {
        Short: this.Short,
        Description: this.Description,
      }
      this.DigiofficeService.InsertRoleType(entity)
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
            // Swal.fire('Issue in Inserting Role Type');
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
    location.href = "#/Admin/RoleMasterDash";
    this.loader = false;
  }

  public UpdateRoleType() {
    debugger;
    this.loader = true;
    if (this.Description == undefined || this.Description == null || this.Description == "" ||
      this.Short == undefined || this.Short == null || this.Short == "") {
      /*  Swal.fire('Please Fill All Fields'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13
    }
    else {
      var entity = {
        ID: this.ID,
        Short: this.Short,
        Description: this.Description

      }
      this.DigiofficeService.UpdateRoleType(entity)
        .subscribe({
          next: data => {
            debugger
            /*   Swal.fire("Updated Successfully"); */
           
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 10
            this.dialogRef.close(false);
          }, error: (err) => {
            // Swal.fire('Issue in Updating Role Type');
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
