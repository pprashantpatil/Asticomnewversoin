import { Component, Inject, OnInit } from '@angular/core';
import { DigiofficecorehrService } from '../../../../Services/digiofficecorehr.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-timesheetform',
  templateUrl: './timesheetform.component.html',
  styleUrls: ['./timesheetform.component.css'],
})
export class TimesheetformComponent implements OnInit {
  constructor(
    public DigiofficeService: DigiofficecorehrService,
    public router: Router,
    public dialogRef: MatDialogRef<TimesheetformComponent>,
    @Inject(MAT_DIALOG_DATA) public ID: any
  ) {}

  projectlist: any;
  NoOfHrs: any;
  Supervisor: any;
  Task: any;
  Date: any;
  Comments: any;
  Project: any;
  StartTime: any;
  EndTime: any;
  maxdate: any;
  currentUrl: any;
  loader: any;
  public attachmentsurl: any = [];
  public newarray: any = [];
  showtable: any;
  public attachments21: any = [];
  public attachments: any = [];
  todaydate: any;
  showPopup: number = 0;
  messageId: number = 0;
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.UserName = localStorage.getItem('UserName');
    this.Project = '';
    this.showtable = 0;
    this.showaddbtn = 1;
    this.maxdate = new Date().toISOString().split('T')[0];
    this.GetProjectMasterList();
    this.GetMyDetailsByStaffID();
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todaydate = formatDate(myDate, format, locale);
  }

  manageremailid: any;
  Staffleaveenitilment: any;
  Touser: any;
  public GetMyDetailsByStaffID() {
    this.DigiofficeService.GetMyDetailsByStaffID(
      localStorage.getItem('staffid')
    ).subscribe({
      next: (data) => {
        debugger;
        this.Staffleaveenitilment = data;
        this.Touser = this.Staffleaveenitilment[0].supervisor;
        this.manageremailid = this.Staffleaveenitilment[0].manageremailid;
        this.loader = false;
      },
      error: (err) => {
        // Swal.fire('Issue in Getting Staff Details');
        // Insert error in Db Here//
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: err.error.message,
        };
        this.DigiofficeService.InsertExceptionLogs(obj).subscribe((data) => {
          debugger;
        });
      },
    });
  }

  public GetProjectMasterList() {
    this.DigiofficeService.GetProjectMasterList().subscribe({
      next: (data) => {
        debugger;
        this.projectlist = data;
        this.loader = false;
      },
      error: (err) => {
        // Swal.fire('Issue in Getting Project Master List');
        // Insert error in Db Here//
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: err.error.message,
        };
        this.DigiofficeService.InsertExceptionLogs(obj).subscribe((data) => {
          debugger;
        });
      },
    });
  }

  public endingdatealert(even: any) {
    this.showPopup = 0;
    debugger;
    this.Date = even.target.value;
    if (this.Date > this.todaydate) {
      /*       Swal.fire("Future Dates are not allowed") */
      location.reload();
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 54;
    }
  }
  showaddbtn: any;
  public duration() {
    this.showPopup = 0;
    debugger;
    this.loader = true;
    this.showaddbtn = 1;
    this.addd();
    // this.DigiofficeService.GetAttendance()
    //   .subscribe({
    //     next: data => {
    //       debugger
    //       let temp: any = data.filter(x => x.filterdate == this.Date && x.userID == localStorage.getItem('staffid'));
    //       if (temp.length == 0) {
    //         /*  Swal.fire("You have not worked on this day. So Can't Fill Timesheet"); */
    //         this.loader = false;
    //         this.showPopup = 1;
    //         this.messageId = 55;
    //         this.Date = '';
    //         this.Task = '';
    //         this.StartTime = '';
    //         this.EndTime = '';
    //         this.showaddbtn = 0;
    //       }
    //       // if (this.EndTime < this.StartTime) {
    //       //   Swal.fire('End Time should be greater than Start Time');
    //       //   this.loader=false;
    //       //   this.StartTime = '';
    //       //   this.EndTime = '';
    //       // }
    //       if (temp[0].shiftType == 2) {
    //         this.loader = false;
    //       } else {
    //         if (this.StartTime < temp[0].stime) {
    //           /*  Swal.fire('Start Time should be Greater Than Punch In time'); */
    //           this.loader = false;
    //           this.showPopup = 1;
    //           this.messageId = 56;
    //           this.StartTime = '';
    //           this.showaddbtn = 0;
    //         }
    //         if (this.EndTime > temp[0].etime && this.StartTime != undefined) {
    //           /*       Swal.fire('End Time must be Less Than Punch Out time and Greater Than Punch In time'); */
    //           this.loader = false;
    //           this.showPopup = 1;
    //           this.messageId = 57;
    //           this.EndTime = '';
    //           this.showaddbtn = 0;
    //         }
    //       }

    //       // if (this.StartTime > temp[0].etime) {
    //       //   Swal.fire('Start time should be Less Than Punch Out Time');
    //       //   this.loader = false;
    //       //   this.StartTime = '';
    //       // }
    //       // if (this.EndTime < temp[0].stime) {
    //       //   Swal.fire('End Time must be Less Than Punch Out time and Greater Than Punch In time');
    //       //   this.loader = false;
    //       //   this.EndTime = '';
    //       // }
    //       if (temp[0].webSignoutDate == null || temp[0].webSignoutDate == undefined) {
    //         /*    Swal.fire('You can not Add Timesheet as you are not Punched Out on this day'); */
    //         this.Date = '';
    //         this.StartTime = '';
    //         this.EndTime = '';
    //         this.loader = false;
    //         this.showPopup = 1;
    //         this.messageId = 58;
    //         this.showaddbtn = 0;
    //       }

    //       if (this.showaddbtn != 0) {
    //         this.addd();
    //       }
    //     }, error: (err) => {
    //       // Swal.fire('Issue in Getting Attendance');
    //       // Insert error in Db Here//
    //       var obj = {
    //         'PageName': this.currentUrl,
    //         'ErrorMessage': err.error.message
    //       }
    //       this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
    //         data => {
    //           debugger
    //         },
    //       )
    //     }
    //   })
  }

  public save() {
    this.showPopup = 0;
    debugger;
    for (let i = 0; i <= this.newarray.length; i++) {
      debugger;
      var eb = {
        UserID: localStorage.getItem('staffid'),
        Floor: 'Floor 1',
        Date: this.newarray[i].Date,
        StartTime: this.newarray[i].StartTime,
        EndTime: this.newarray[i].EndTime,
        Project: this.Project,
        Task: this.newarray[i].Task,
        NoOfHrs: 1,
        Supervisor: this.Supervisor,
        Comments: this.newarray[i].Comments,
        Attachment: this.newarray[i].Attachment,
      };
      this.DigiofficeService.InsertTimeSheets_Table(eb).subscribe({
        next: (data) => {
          debugger;
          if (data == 0) {
            /* Swal.fire('TimeSheet Exist for this Time.'); */
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 102;
          } else {
            /*     Swal.fire("Saved Successfully"); */
            this.Cancel();
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 8;
          }
        },
        error: (err) => {
          // Swal.fire('Issue in Inserting Time Sheets');
          // Insert error in Db Here//
          var obj = {
            PageName: this.currentUrl,
            ErrorMessage: err.error.message,
          };
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe((data) => {
            debugger;
          });
        },
      });
    }

    this.InsertNotification();
  }

  email: any;
  Attactments: any = [];
  UserName: any;
  public sendemail() {
    var entity1 = {
      FromUser: 'Admin',
      emailto: this.manageremailid,
      emailsubject: 'Timesheet Request',
      Message: 'Your Timesheet Request Sent Successfully !!',
      emailbody:
        'Hi  <br> Your Employee ' +
        this.UserName +
        ' has Applied TimeSheet in Digi-Office., <br> Please Login in DigiOffice to Approve. <br><br>' +
        '<br>  <br> Thanks <br> Team Digi-Office',
      attachmenturl: this.Attactments,
      cclist: this.manageremailid,
      bcclist: this.manageremailid,
    };
    this.DigiofficeService.sendemailattachementsforemail(entity1).subscribe({
      next: (data) => {
        debugger;
        this.Attactments = [];
        //Swal.fire('Password sent to your email.');
        this.loader = false;
      },
      error: (err) => {
        // Swal.fire('Issue in Sending Attachments For Email');

        // Insert error in Db Here//
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: err.error.message,
        };
        this.DigiofficeService.InsertExceptionLogs(obj).subscribe((data) => {
          debugger;
        });
      },
    });
  }

  public InsertNotification() {
    this.showPopup = 0;
    debugger;
    var entity = {
      Date: new Date(),
      Event: 'Time Sheet',
      FromUser: 'Admin',
      ToUser: 'Admin',
      Message: 'Your Timesheet Has been Submited to Manager for Approval',
      Photo: 'Null',
      Building: 'Dynamics 1',
      UserID: localStorage.getItem('staffid'),
      NotificationTypeID: 15,
      VendorID: 0,
    };
    this.DigiofficeService.InsertNotification(entity).subscribe({
      next: (data) => {
        debugger;
        if (data != 0) {
        }
        /* Swal.fire("Saved Successfully"); */
        location.href = '#/Employee/TimeSheet';
        this.loader = false;
        this.showPopup = 1;
        this.messageId = 8;
      },
      error: (err) => {
        // Swal.fire('Issue in Inserting Notification');
        // Insert error in Db Here//
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: err.error.message,
        };
        this.DigiofficeService.InsertExceptionLogs(obj).subscribe((data) => {
          debugger;
        });
      },
    });
  }

  onRemove21(event: any) {
    debugger;
    console.log(event);
    this.attachments21.splice(this.attachments.indexOf(event), 1);
    this.attachmentsurl = [];
  }

  onSelect21(event: any) {
    debugger;
    console.log(event);
    this.attachments21.push(...event.addedFiles);
    this.DigiofficeService.ProjectAttachments(this.attachments21).subscribe({
      next: (data) => {
        debugger;
        if (data != undefined) {
          this.attachmentsurl.push(data);
          this.loader = false;
        }
      },
      error: (err) => {
        // Swal.fire('Issue in Inserting Project Attachments');
        // Insert error in Db Here//
        var obj = {
          PageName: this.currentUrl,
          ErrorMessage: err.error.message,
        };
        this.DigiofficeService.InsertExceptionLogs(obj).subscribe((data) => {
          debugger;
        });
      },
    });
  }

  public addd() {
    this.showPopup = 0;
    if (
      this.Date == undefined ||
      this.Date == '' ||
      this.Task == undefined ||
      this.Task == '' ||
      this.StartTime == undefined ||
      this.StartTime == '' ||
      this.EndTime == undefined
    ) {
      /* Swal.fire('Please Fill Mandatory Fields'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    } else {
      this.showtable = 1;
      var entity = {
        Date: this.Date,
        StartTime: this.StartTime,
        EndTime: this.EndTime,
        Task: this.Task,
        Comments: this.Comments,
        Attachment: this.attachmentsurl[0],
      };
      this.newarray.push(entity);
      this.loader = false;
    }
  }

  public Add() {
    this, (this.showPopup = 0);
    debugger;
    if (this.EndTime < this.StartTime) {
      /* Swal.fire('End Time should be greater than Start Time'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 46;
    } else if (this.Date == undefined || this.Date == '') {
      /*  Swal.fire("Please fill Mandatory Fields"); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    } else {
      this.duration();
    }
  }

  public DeleteTimesheet(Comments: any) {
    this.showPopup = 0;
    debugger;
    Swal.fire({
      title: 'Delete Record',
      text: "Are you sure you want to delete? You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      debugger;
      if (result.value == true) {
        var index = this.newarray
          .map((x: { Comments: any }) => {
            return x.Comments;
          })
          .indexOf(Comments);

        this.newarray.splice(index, 1);
        /* Swal.fire('Removed Successfully'); */
        this.loader = false;
        this.showPopup = 1;
        this.messageId = 103;
      }
    });
  }

  public Cancel() {
    debugger;
    this.dialogRef.close(false);
    this.router.navigate(['/Employee/TimesheetRequestDash']);
    this.loader = false;
  }
}
