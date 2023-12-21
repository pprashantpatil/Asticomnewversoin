import { Component, Inject, OnInit } from '@angular/core';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LoanRequestDashComponent } from '../loan-request-dash/loan-request-dash.component';

@Component({
  selector: 'app-loan-request-form',
  templateUrl: './loan-request-form.component.html',
  styleUrls: ['./loan-request-form.component.css']
})
export class LoanRequestFormComponent implements OnInit {
  loader: any;
  showPopup: number = 0;
  messageId: number = 0;
  public attachments21: any = [];
  public attachments: any = [];
  public attachmentsurl: any = [];
  loanType: any;
  loanList: any;
  loanData: any;
  roleID: any;
  loanAmount: any;
  tenure: any;
  comment: any;
  loanID: any;
  userName: any;

  constructor(public DigiofficecorehrService: DigiofficecorehrService, public router: Router, public dialogRef: MatDialogRef<LoanRequestDashComponent>,
    @Inject(MAT_DIALOG_DATA) public ID: any) { }

  ngOnInit(): void {
    debugger
    this.loanType = "";
    this.getData();
  }

  public getData() {
    this.DigiofficecorehrService.GetLoanConfiguration()
      .subscribe({
        next: data => {
          debugger
          this.loanList = data.filter(x => x.enable_Disable == 0);
          this.loader = false;
        }
      })
  }

  public cancel() {
    location.href = "#/Employee/LoanRequestDash";
    this.loader = false;
    this.dialogRef.close(false);
  }

  public submit() {
    this.showPopup = 0;
    this.loader = true;
    if (this.loanType == 'Ayala Coop Contribution') {
      if (this.loanType == " " || this.loanAmount == " " || this.loanType == undefined || this.loanAmount == undefined) {
        this.loader = false;
        this.showPopup = 1;
        this.messageId = 7;
      }
      else {
        var eb = {
          'StaffID': localStorage.getItem('staffid'),
          'LoanType': this.loanType,
          'LoanAmount': this.loanAmount,
          'Comments': this.comment,
          'Status': 'HR Pending',
          'Period': this.tenure,
          'Attachment': this.attachmentsurl[0],
        }
        this.DigiofficecorehrService.InsertEmployeeLoans(eb)
          .subscribe({
            next: data => {
              debugger
              this.loanID = data;
              this.uploadmultipleimages();
              this.sendEmail();
              location.href = "#/Employee/Employeeloandash";
              this.loader = false;
              this.showPopup = 1;
              this.messageId = 8;
            }
          })
      }
    }
    else {
      if (this.loanType == " " || this.loanAmount == " " || this.loanType == undefined || this.loanAmount == undefined
        || this.tenure == " " || this.tenure == undefined) {
        this.loader = false;
        this.showPopup = 1;
        this.messageId = 7;
      }
      else {
        var eb = {
          'StaffID': localStorage.getItem('staffid'),
          'LoanType': this.loanType,
          'LoanAmount': this.loanAmount,
          'Comments': this.comment,
          'Status': 'HR Pending',
          'Period': this.tenure,
          'Attachment': this.attachmentsurl[0],
        }
        this.DigiofficecorehrService.InsertEmployeeLoans(eb)
          .subscribe({
            next: data => {
              debugger
              this.loanID = data;
              this.uploadmultipleimages();
              this.sendEmail();
              location.href = "#/Employee/Employeeloandash";
              this.loader = false;
              this.showPopup = 1;
              this.messageId = 8;
            }
          })
      }
    }
  }

  public uploadmultipleimages() {
    debugger
    for (let i = 0; i < this.attachmentsurl.length; i++) {
      var entity = {
        "Attachment": this.attachmentsurl[i],
        "LoanID": this.loanID,
      }
      this.DigiofficecorehrService.InsertEmployeeLoansAttachment(entity).subscribe(
        data => {
          this.loader = false;
        })
    }
  }

  public sendEmail() {
    var entity1 = {
      'FromUser': 'Admin',
      'emailto': 'dccasanova@asticom.com.ph',
      'emailsubject': 'Loan Request',
      'Message': 'Your Loan Request Sent Successfully !!',
      'emailbody': 'Hi  <br> Your Employee ' + this.userName + ' has Applied loan in Digi-Office., <br> Please Login in DigiOffice to Approve. <br><br>' + '<br>  <br> Thanks <br> Team Digi-Office',
      'attachmenturl': this.attachments,
      'cclist': 'dccasanova@asticom.com.ph',
      'bcclist': 'dccasanova@asticom.com.ph',
    }
    this.DigiofficecorehrService.sendemailattachementsforemail(entity1)
      .subscribe({
        next: data => {
          debugger
          this.attachments = [];
          this.loader = false;
        }
      })
  }

  onRemove21(event: any) {
    this.attachments21.splice(this.attachments.indexOf(event), 1);
  }

  onSelect21(event: any) {
    debugger
    this.showPopup = 0;
    this.attachments21.length = 0;
    if (event.addedFiles[0].size / 1048576 > 2) {
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 14;
    }
    else {
      const uploadedFiles: File[] = event.addedFiles;
      for (const file of uploadedFiles) {
        try {
          const img = new Image();
          img.src = window.URL.createObjectURL(file);
          img.onload = async () => {
            if ((event.addedFiles[0].size) > 5242880) {
              Swal.fire('Please upload a file that is less than or equal to 5 MB.')
              this.attachments21.length = 0;
            }
            else {
              this.attachments21.push(...event.addedFiles);
              Swal.fire('Attachment uploaded');
            }
          }
        } catch (e) {
          throw 'This is being thrown after setting img.src';
        }
      };
    }
  }

  public getLoanType() {
    debugger;
    this.DigiofficecorehrService.GetLoanConfiguration()
      .subscribe({
        next: data => {
          debugger
          this.loanData = data.filter((x: { type: String, enable_Disable: boolean }) => x.type == this.loanType && x.enable_Disable == false)
          if (this.loanType == "Ayala Coop" && this.roleID == 6) {
            this.loanAmount = this.loanData[0].employeeApply;
            this.loader = false;
          }
          else if (this.loanType == "Ayala Coop" && this.roleID == 2) {
            this.loanAmount = this.loanData[0].managerApply;
            this.loader = false;
          }
          else if (this.loanType == "Ayala Coop" && (this.roleID != 6 || this.roleID != 2)) {
            this.loanAmount = this.loanData[0].otherRolesApply;
            this.loader = false;
          }
          else if (this.loanType != "Ayala Coop") {
            this.loanAmount = ""
            this.loader = false;
          }
        }
      })
  }
}