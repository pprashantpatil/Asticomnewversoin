import { Component, Inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoanConfigurationDashComponent } from '../loan-configuration-dash/loan-configuration-dash.component';

@Component({
  selector: 'app-loan-configuration-master',
  templateUrl: './loan-configuration-master.component.html',
  styleUrls: ['./loan-configuration-master.component.css']
})
export class LoanConfigurationMasterComponent implements OnInit {
loader: any;

constructor(public DigipayrollServiceService: DigiofficecorehrService, public dialogRef: MatDialogRef<LoanConfigurationDashComponent>,
  @Inject(MAT_DIALOG_DATA) public ID: any) { }
  OtherRolesApply: any;
  roleid: any
  staffID: any;
  ManualApply: any;
  result: any;
  Manager: any;
  HR: any;
  Payroll: any;
  Finance: any;
  ManagerApply: any;
  EmployeeApply: any;
  currentUrl: any;
  LoanCategory: any;
  term: any;
  leavelist: any;
  showPopup: number = 0;
  messageId: number = 0;
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.LoanCategory = "";
    this.roleid = sessionStorage.getItem('roledid');
    this.staffID = sessionStorage.getItem('staffid');
    this.GetLoanMaster();
    this.ActivatedRouterCall()
  }

  public ActivatedRouterCall() {
    this.DigipayrollServiceService.GetLoanConfiguration()
    .subscribe({
      next: data => {
        debugger
        this.result = data.filter(x => x.id == this.ID);
        this.LoanCategory = this.result[0].loanCategory;
        this.OtherRolesApply = this.result[0].otherRolesApply;
        this.EmployeeApply = this.result[0].employeeApply;
        this.ManagerApply = this.result[0].managerApply;
      }, error: (err) => {
        // Swal.fire('Issue in  Getting LoanConfiguration');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }

  public GetLoanMaster() {
    debugger
    this.DigipayrollServiceService.GetLoanMaster()
      .subscribe({
        next: data => {
          this.leavelist = data
        }, error: (err) => {
          // Swal.fire('Issue in Getting Loan Master');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }

  public UpdateLoanConfiguration() {
    debugger;
    this.showPopup = 0;
    if (this.OtherRolesApply == undefined) {
      /*   Swal.fire('Please fill all the fields') */

      this.showPopup = 1;
      this.messageId = 13;
    }
    else {
      var entity = {
        ID: this.ID,
        LoanCategory: this.LoanCategory,
        OtherRolesApply: this.OtherRolesApply,
        EmployeeApply: this.EmployeeApply,
        ManagerApply: this.ManagerApply
      }
      this.DigipayrollServiceService.UpdateLoanConfiguration(entity)
        .subscribe({
          next: data => {
            /*   Swal.fire("Updated Successfully"); */
            this.showPopup = 1;
            this.messageId = 10;
            location.href = "#/HR/LoanConfigurationDash"
            location.reload();
          }, error: (err) => {
            // Swal.fire('Issue in Updating Loan Configuration');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })
    }
  }

  public InsertLoanConfiguration() {
    debugger;
    this.showPopup = 0;
    if (this.OtherRolesApply == undefined) {
      /*   Swal.fire('Please fill all the fields') */
      this.showPopup = 1;
      this.messageId = 13;
    }
    else {
      var entity = {
        LoanCategory: this.LoanCategory,
        OtherRolesApply: this.OtherRolesApply,
        EmployeeApply: this.EmployeeApply,
        ManagerApply: this.ManagerApply
      }
      this.DigipayrollServiceService.InsertLoanConfiguration(entity)
        .subscribe({
          next: data => {
            /*    Swal.fire("Saved Successfully"); */
            location.href = "#/HR/LoanConfigurationDash"
            location.reload();
            this.showPopup = 1;
            this.messageId = 8;
          }, error: (err) => {
            // Swal.fire('Issue in Inserting Loan Configuration');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })
    }
  }

  public cancel() {
    location.href = "#/Employee/LoanConfigurationDash";
    this.loader = false;
    this.dialogRef.close(false);
  }
}