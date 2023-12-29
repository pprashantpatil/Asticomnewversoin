import { Component, Inject, OnInit } from '@angular/core';
import { DigiofficecorehrService } from '../../../../Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-loan-master',
  templateUrl: './loan-master.component.html',
  styleUrls: ['./loan-master.component.css']
})
export class LoanMasterComponent implements OnInit {
  currentUrl: any;
  loader: any;
  constructor(public DigiofficeService: DigiofficecorehrService, private activatedroute: ActivatedRoute, public dialogRef: MatDialogRef<LoanMasterComponent>,@Inject(MAT_DIALOG_DATA) public ID: any) { }

  leavelist: any;
  Short: any;
  Description: any;
  showPopup: number = 0;
  messageId: number = 0;
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.activatedroute.params.subscribe(params => {
      debugger;
    
      if (this.ID == undefined) {
        this.Short = "",
          this.Description = ""
      }
      else {

        this.DigiofficeService.GetLoanMaster().
          subscribe({
            next: data => {
              debugger
              this.leavelist = data.filter(x => x.id == this.ID);
              this.LoanType = this.leavelist[0].type
              this.Description = this.leavelist[0].description
            }, error: (err) => {
              // Swal.fire('Issue in Getting Loan Master');
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

  LoanType: any;
  Entitlement_Per_Year: any;
  carry_forward: any;
  public InsertLoanMaster() {
    debugger;
    this.showPopup = 0;
    var entity = {
      'LoanType23': this.LoanType,
      'Description': this.Description
    }
    this.DigiofficeService.InsertLoanMaster(entity)
      .subscribe({
        next: data => {
          if (data != 0) {
            this.dialogRef.close(false);
            /*   Swal.fire("Saved Successfully"); */
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 8
            location.href = "#/HR/LoanMasterDash";


          }
        }, error: (err) => {
          // Swal.fire('Issue in Insert Loan Master');
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


  cancel() {
    location.href = "#/HR/LoanMasterDash";
    this.dialogRef.close(false);
    
  }



  public UpdateLoanType() {
    debugger;
    this.showPopup = 0;
    var entity = {
      ID: this.ID,
      Type: this.LoanType,
      Description: this.Description

    }
    this.DigiofficeService.UpdateLoanMaster(entity)
      .subscribe({
        next: data => {
          debugger
          /* 
                    Swal.fire("Updated Successfully"); */
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 10;
          location.href = "#/HR/LoanMasterDash";
          this.dialogRef.close(false);
        }, error: (err) => {
          // Swal.fire('Issue in Updating Loan Master');
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
