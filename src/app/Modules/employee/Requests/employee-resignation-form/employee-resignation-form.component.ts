import { Component, Inject, OnInit } from '@angular/core';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { EmployeeResignationDashComponent } from '../employee-resignation-dash/employee-resignation-dash.component';

@Component({
  selector: 'app-employee-resignation-form',
  templateUrl: './employee-resignation-form.component.html',
  styleUrls: ['./employee-resignation-form.component.css']
})
export class EmployeeResignationFormComponent implements OnInit {

  loader: any;
  showPopup: number = 0;
  messageId: number = 0;
  reason: any;
  resignationDate: any;
  public attachments21: any = [];
  public attachments: any = [];
  public attachmentsurl: any = [];
  staffList: any;
  holidayList: any;
  attachment: any;
  attachment1: any;
  comment: any;
  employeeList: any;
  staffID:any;
  staffExitFormalityID: any;
  resignID: any;
  userName: any;
  managerEmailID: any;
  toUser: any;

  constructor(public DigiofficecorehrService: DigiofficecorehrService, private datepipe: DatePipe, public dialogRef: MatDialogRef<EmployeeResignationDashComponent>,
    @Inject(MAT_DIALOG_DATA) public ID: any) { }

  ngOnInit(): void {
    debugger
    this.staffID = localStorage.getItem('staffid');
    this.userName = localStorage.getItem('UserName');
    this.getData();
  }

  public getData() {
    this.DigiofficecorehrService.GetMyDetailsByStaffID(localStorage.getItem('staffid'))
    .subscribe({
      next: data => {
        debugger
        this.staffList = data;
        this.toUser = this.staffList[0].supervisor;
        this.managerEmailID = this.staffList[0].manageremailid;
        this.loader = false;
      }
    })
  }

  public cancel() {
    location.href = "#/Employee/EmployeeResignationDash";
    this.loader = false;
    this.dialogRef.close(false);
  }

  public submit() {
    this.showPopup = 0;
    debugger
    if (this.reason == "" || this.resignationDate == "" || this.reason == undefined || this.resignationDate == undefined || this.comment == "" || this.comment == undefined) {
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 7;
    }
    else {
      var entity = {
        "StaffID": this.staffID,
        "Notes": this.reason,
        "lastworkingdate": this.resignationDate,
        "type": 1,
        "Attachment": this.attachmentsurl[0]
      }
      this.DigiofficecorehrService.InsertStaffExitFormality(entity)
        .subscribe({
          next: data => {
            debugger
            this.staffExitFormalityID = data;
            if (data == 0) {
              this.loader = false;
              this.showPopup = 1;
              this.messageId = 45;
            } else {
              this.sendEmail();
              this.InsertPushNotification();
              this.InsertPushNotificationformanager();
              this.resignID = data;
              this.uploadmultipleimages();
              location.href = "#/Employee/EmployeeResignation";
              this.loader = false;
              this.showPopup = 1;
              this.messageId = 8;
            }
          }
        })
    }
  }

  public InsertPushNotification() {
    this.DigiofficecorehrService.pushnotificationtomobile(
    localStorage.getItem('staffid'),
      'Your Resignation Request Sent Successfully !!',
      'Resignation Request'
    );
  }

  public InsertPushNotificationformanager() {
    this.DigiofficecorehrService.pushnotificationtomobile(
      localStorage.getItem('supervisor'),
      'Hi  <br> Your Employee ' +    localStorage.getItem('UserName') + ' has sent Resignation Request in Digi-Office.',
      'Resignation Request'
    );
  }




  public uploadmultipleimages() {
    debugger
    for (let i = 0; i < this.attachmentsurl.length; i++) {
      var entity = {
        "StaffExitFormalityID": this.staffExitFormalityID,
        "Attchament": this.attachmentsurl[i],
      }
      this.DigiofficecorehrService.InsertStaffExitFormalityAttachment(entity).subscribe(
        data => {
          this.loader = false;
        }, (error => {
          console.log(error)
          alert("erre")
        })
      )
    }
  }

  public sendEmail() {

    var entity1 = {
      'FromUser': 'Admin',
      'emailto': this.managerEmailID,
      'emailsubject': 'Resignation Request',
      'Message': 'Your Resignation Request Sent Successfully !!',
      'emailbody': 'Hi  <br> Your Employee ' + this.userName + ' has Applied Resignation in Digi-Office., <br> Please Login in DigiOffice to Approve. <br><br>' + '<br>  <br> Thanks <br> Team Digi-Office',
      'attachmenturl': this.attachments,
      'cclist': this.managerEmailID,
      'bcclist': this.managerEmailID,
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
}