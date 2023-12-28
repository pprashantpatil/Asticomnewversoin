import { Component, Inject, OnInit } from '@angular/core';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { LeaveConfigurationdashComponent } from '../leave-configurationdash/leave-configurationdash.component';

@Component({
  selector: 'app-leave-configuration',
  templateUrl: './leave-configuration.component.html',
  styleUrls: ['./leave-configuration.component.css']
})
export class LeaveConfigurationComponent implements OnInit {
  loader: any;

  constructor(public DigipayrollServiceService: DigiofficecorehrService, private datepipe: DatePipe, public dialogRef: MatDialogRef<LeaveConfigurationdashComponent>,
    @Inject(MAT_DIALOG_DATA) public ID: any) { }
  leavelist: any;
  Short: any;
  Description: any;
  result: any;
  currentUrl: any;
  public attachments21: any = [];
  public attachments: any = [];
  public attachmentsurl: any = [];
  Two_Level_Approval: any;
  HRApproval: any;
  Holiday: any
  ManagerApproval: any;
  HolidayDescription: any;
  HolidayDate: any;
  Attachment: any;
  LeaveCategory: any;
  Gender: any;
  MaritalStatus: any;
  MaxChildren: any;
  MaxRemainingLeaveBal: any;
  AllowedDuringNotice: any;
  MonthlyLimit: any;
  YearlyLimit: any;
  IsCashable: any;
  MonthlyCapping: any;
  AllowForNextYear: any;
  AutoApproval: any;
  IsSickLeaveEligible: any;
  IsTenureLeaveEligible: any;
  IsAnnualLeaveEligible: any;
  LeaveTypeList: any;
  public LeaveType: any
  showPopup: number = 0;
  messageId: number = 0;
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.LeaveCategory = "0";
    this.Gender = "0";
    this.MaritalStatus = "0";
    this.GetLeaveType();
    this.ActivatedRouterCall();
  }

  public ActivatedRouterCall() {
    this.DigipayrollServiceService.GetLeaveConfiguration()
      .subscribe({
        next: data => {
          debugger
          this.result = data.filter(x => x.id == this.ID);
          // this.GetLeaveType();
          this.LeaveCategory = this.result[0].leaveCategory;
          this.Description = this.result[0].description;
          this.Gender = this.result[0].gender;
          this.MaritalStatus = this.result[0].maritalStatus;
          this.MaxChildren = this.result[0].maxChildren;
          this.MaxRemainingLeaveBal = this.result[0].maxRemainingLeaveBal;
          this.AllowedDuringNotice = this.result[0].allowedDuringNotice;
          this.MonthlyLimit = this.result[0].monthlyLimit;
          this.YearlyLimit = this.result[0].yearlyLimit;
          this.IsCashable = this.result[0].isCashable;
          this.MonthlyCapping = this.result[0].monthlyCapping;
          this.AllowForNextYear = this.result[0].allowForNextYear;
          this.AutoApproval = this.result[0].autoApproval;
          this.IsSickLeaveEligible = this.result[0].isSickLeaveEligible;
          this.IsTenureLeaveEligible = this.result[0].isTenureLeaveEligible;
          this.IsAnnualLeaveEligible = this.result[0].isAnnualLeaveEligible;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Leave Configuration');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            })
        }
      })
  }

  onRemove21(event: any) {
    debugger
    console.log(event);
    this.attachments21.splice(this.attachments.indexOf(event), 1);
  }

  onSelect21(event: any) {
    debugger
    console.log(event);
    this.attachments21.push(...event.addedFiles);
    /*  Swal.fire('Attachment Added Successfully'); */
    this.showPopup = 1;
    this.messageId = 12;
  }

  public Save() {
    debugger
    /*   Swal.fire('Please fill All data') */
    this.showPopup = 1;
    this.messageId = 13;
    this.DigipayrollServiceService.ProjectAttachments(this.attachments21)
      .subscribe({
        next: res => {
          debugger
          this.attachmentsurl.push(res);
          this.attachments.length = 0;
        }, error: (err) => {
          // Swal.fire('Issue in Project Attachments');
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

  public InsertLeaveConfiguration() {
    debugger;
    this.showPopup = 0
    if (this.LeaveCategory == undefined || this.YearlyLimit == undefined) {
      /* Swal.fire('Please fill all the fields') */

      this.showPopup = 1;
      this.messageId = 13;
    }
    else {
      var entity = {
        LeaveCategory: this.LeaveCategory,
        Description: this.Description,
        Gender: this.Gender,
        MaritalStatus: this.MaritalStatus,
        MaxChildren: this.MaxChildren,
        MaxRemainingLeaveBal: this.MaxRemainingLeaveBal,
        AllowedDuringNotice: this.AllowedDuringNotice,
        MonthlyLimit: this.MonthlyLimit,
        YearlyLimit: this.YearlyLimit,
        IsCashable: this.IsCashable,
        MonthlyCapping: this.MonthlyCapping,
        AllowForNextYear: this.AllowForNextYear,
        AutoApproval: this.AutoApproval,
        IsSickLeaveEligible: this.IsSickLeaveEligible,
        IsTenureLeaveEligible: this.IsTenureLeaveEligible,
        IsAnnualLeaveEligible: this.IsAnnualLeaveEligible,
      }
      this.DigipayrollServiceService.InsertLeaveConfiguration(entity)
        .subscribe({
          next: data => {
            if (data != 0) {
              /*    Swal.fire("Saved Successfully"); */
              location.href = "#/HR/LeaveConfigurationdash"
              this.showPopup = 1;
              this.messageId = 8;
            }
          }, error: (err) => {
            // Swal.fire('Issue in Inserting Leave Configuration');
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

  public UpdateLeaveConfiguration() {
    debugger;
    this.showPopup = 0;
    var entity = {
      ID: this.ID,
      LeaveCategory: this.LeaveCategory,
      Description: this.Description,
      Gender: this.Gender,
      MaritalStatus: this.MaritalStatus,
      MaxChildren: this.MaxChildren,
      MaxRemainingLeaveBal: 1,
      AllowedDuringNotice: 1,
      MonthlyLimit: this.MonthlyLimit,
      YearlyLimit: this.YearlyLimit,
      IsCashable: this.IsCashable,
      MonthlyCapping: this.MonthlyCapping,
      AllowForNextYear: this.AllowForNextYear,
      IsSickLeaveEligible: this.IsSickLeaveEligible,
      Approval: 'yes',
      IsTenureLeaveEligible: this.IsTenureLeaveEligible,
      IsAnnualLeaveEligible: this.IsAnnualLeaveEligible,
    }
    this.DigipayrollServiceService.UpdateLeaveConfiguration(entity)
      .subscribe({
        next: data => {
          /*   Swal.fire("Updated Successfully"); */
          this.showPopup = 1;
          this.messageId = 10;
          location.href = "#/HR/LeaveConfigurationdash"
        }, error: (err) => {
          // Swal.fire('Issue in Updating Leave Configuration');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            })
        }
      })
  }

  public GetLeaveType() {
    debugger
    this.DigipayrollServiceService.GetLeaveType()
      .subscribe({
        next: data => {
          debugger
          this.LeaveTypeList = data;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Leave Type');
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

  public cancel() {
    location.href = "#/Employee/LeaveConfigurationDash";
    this.loader = false;
    this.dialogRef.close(false);
  }
}