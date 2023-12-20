import { Component, Inject, OnInit } from '@angular/core';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { AttendanceCorrectionDashComponent } from '../attendance-correction-dash/attendance-correction-dash.component';

@Component({
  selector: 'app-attendance-correction-form',
  templateUrl: './attendance-correction-form.component.html',
  styleUrls: ['./attendance-correction-form.component.css']
})
export class AttendanceCorrectionFormComponent implements OnInit {
  loader: any;
  date: any;
  staffID: any;
  maxDate: any;
  startTime: any;
  showSpinners: any;
  endTime: any;
  showPopup: number = 0;
  messageId: number = 0;
  comment: any;
  jDate: any;
  managerEmailList: any;
  supervisor: any;
  managerName: any;
  managerEmailID: any;
  userName: any;
  attactments: any = [];
  attendanceCorrectionList: any;

  constructor(public DigiofficecorehrService: DigiofficecorehrService, public router: Router, public Datepipe: DatePipe, private activatedroute: ActivatedRoute, public dialogRef: MatDialogRef<AttendanceCorrectionDashComponent>,
    @Inject(MAT_DIALOG_DATA) public ID: any) { }

  ngOnInit(): void {
    debugger
    this.showSpinners = false;
    this.jDate = localStorage.getItem('jdate');
    this.staffID = localStorage.getItem('staffid');
    this.userName = localStorage.getItem('UserName');
    this.maxDate = new Date().toISOString().split("T")[0];
    this.getData();
  }

  public getData() {
    this.DigiofficecorehrService.GetMyDetailsByStaffID(localStorage.getItem('staffid'))
      .subscribe({
        next: data => {
          debugger
          this.managerEmailList = data;
          this.supervisor = this.managerEmailList[0].supervisor
          this.managerName = this.managerEmailList[0].manager
          this.managerEmailID = this.managerEmailList[0].manageremailid;
          this.loader = false;
        }
      })

      this.activatedroute.params.subscribe(params => {
        debugger;
        if (this.ID == undefined) {
          this.loader = false;
        }
        else {
          this.DigiofficecorehrService.GetPendingAttendanceCorrectionByStaffID(this.staffID, "01-01-2020", "01-01-2025")
            .subscribe({
              next: data => {
                debugger
                this.attendanceCorrectionList = data.filter(x => x.id == this.ID);
                this.date = this.attendanceCorrectionList[0].sDate;
                this.startTime = this.attendanceCorrectionList[0].startTime;
                this.endTime = this.attendanceCorrectionList[0].endTime;
                this.comment = this.attendanceCorrectionList[0].comments;
                this.loader = false;
              }
            })
        }
      }
      )
  }

  public cancel() {
    location.href = "#/Employee/AttendanceCorrectionDash";
    this.loader = false;
    this.dialogRef.close(false);
  }

  public submit() {
    debugger
    this.showPopup = 0;
    if (this.supervisor == null || this.supervisor == undefined) {
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 105;
    }
    else if (new Date(this.jDate) > new Date(this.date)) {
      console.log('jdate', new Date(this.jDate));
      console.log('date', new Date(this.date))
      this.loader = false;
      Swal.fire('Sorry, ACR Date is prior the New Hire Date');
    }
    else {
      this.loader = true;
      if (this.date == undefined || this.date == null || this.date == '' || this.startTime == undefined ||
        this.startTime == null || this.startTime == '' || this.endTime == undefined || this.endTime == null ||
        this.endTime == '' || this.comment == undefined || this.comment == null || this.comment == '') {
        this.loader = false;
        this.showPopup = 1;
        this.messageId = 7;
      }
      else {
        var eb = {
          'StaffID': localStorage.getItem('staffid'),
          'date': this.date,
          'AttendanceDate': this.date,
          'StartTime1': this.add_leading0(this.startTime.getHours()) + ':' + this.add_leading0(this.startTime.getMinutes()),
          'EndTime1': this.add_leading0(this.endTime.getHours()) + ':' + this.add_leading0(this.endTime.getMinutes()),
          'Attachment': "",
          'Comment': this.comment
        }
        this.DigiofficecorehrService.InsertAttendanceCorrection(eb)
          .subscribe({
            next: data => {
              debugger
              if (data == 0) {
                Swal.fire("Submitted Successfully to the manager " + this.managerName + " Please check ACR Report for periodic analysis");
                location.href = "#/Employee/AttendanceCorrectionDash";
                this.sendEmail();
                this.insertNotification();
                this.loader = false;
              }
              else {
                Swal.fire("Submitted Successfully to the manager " + this.managerName + " Please check ACR Report for periodic analysis");
                this.sendEmail();
                this.insertNotification();
                location.href = "#/Employee/AttendanceCorrectionDash";
                this.loader = false;
              }
            }
          })
      }
    }
  }

  public sendEmail() {
    var entity1 = {
      'FromUser': 'Admin',
      'emailto': this.managerEmailID,
      'emailsubject': 'Attendance Request',
      'Message': 'Your Attendance Request Sent Successfully !!',
      'emailbody': 'Hi  <br> Your Employee ' + this.userName + ' has Applied Attendance Correction Request in Digi-Office., <br> Please Login in DigiOffice to Approve. <br><br>' + '<br>  <br> Thanks <br> Team Digi-Office',
      'attachmenturl': this.attactments,
      'cclist': this.managerEmailID,
      'bcclist': this.managerEmailID,
    }
    this.DigiofficecorehrService.sendemailattachementsforemail(entity1)
      .subscribe({
        next: data => {
          debugger
          this.attactments = [];
          this.loader = false;
        }
      })
  }

  public insertNotification() {
    this.showPopup = 0;
    debugger
    this.loader = true;
    var entity = {
      'Date': new Date(),
      'Event': 'Attendance Correction',
      'FromUser': 'Admin',
      'ToUser': 'Admin',
      'Message': 'Your Attendance Has been Submited to Manager for Approval',
      'Photo': 'Null',
      'Building': 'Dynamics 1',
      'UserID': localStorage.getItem('staffid'),
      'NotificationTypeID': 15,
      'VendorID': 2
    }
    this.DigiofficecorehrService.InsertNotification(entity)
      .subscribe({
        next: data => {
          debugger
          if (data != 0) {
          }
          this.dialogRef.close(false);
          location.href = "#/Employee/AttendanceCorrection";
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 8;
        }
      })
  }

  add_leading0(time: any) {
    debugger
    return (time < 10) ? '0' + time : time;
  }

  public update() {
    this.showPopup = 0;
    debugger;
    if (this.date == undefined || this.date == null || this.date == '' || this.startTime == undefined ||
      this.startTime == null || this.startTime == '' || this.endTime == undefined || this.endTime == null ||
      this.endTime == '' || this.comment == undefined || this.comment == null || this.comment == '') {
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    } else {
      var entity = {
        'ID': this.ID,
        'StaffID': localStorage.getItem('staffid'),
        'date': this.date,
        'AttendanceDate': this.date,
        'StartTime1': this.add_leading0(this.startTime.getHours()) + ':' + this.add_leading0(this.startTime.getMinutes()) ,
        'EndTime1': this.add_leading0(this.endTime.getHours()) + ':' +  this.add_leading0(this.endTime.getMinutes()),
        'Attachment': "",
        'Comment': this.comment
      }
      this.DigiofficecorehrService.UpdateAttendanceCorrection(entity).subscribe(data => {
        this.dialogRef.close(false);
        this.loader = false;
        this.showPopup = 1;
        this.messageId = 10;
        location.href = "#/Employee/AttendanceCorrection";
      })
    }
  }
}