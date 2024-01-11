import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-my-team-attendance-correction',
  templateUrl: './my-team-attendance-correction.component.html',
  styleUrls: ['./my-team-attendance-correction.component.css']
})
export class MyTeamAttendanceCorrectionComponent implements OnInit {
  viewMode = 'tab1';
  currentUrl: any;
  attendanceCorrectionPendingList: any;
  search: any;
  loader: any;
  staffID: any;
  date: any;
  startDate: any;
  endDate: any;
  attendanceCorrectionPendingFilter: any;
  roleID: any;
  attendanceCorrectionApprovedList: any;
  attendanceCorrectionApprovedFilter: any;
  attendanceCorrectionRejectedFilter: any;
  attendanceCorrectionRejectedList: any;
  showPopup: number = 0;
  messageId: number = 0;
  id: any;
  notes: any;
  p: any = 1;
  count1: any = 10;

  constructor(public DigiofficecorehrService: DigiofficecorehrService, private matDialog: MatDialog, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.staffID = localStorage.getItem('staffid');
    this.roleID = localStorage.getItem('roledid');
    this.getData();
  }

  public getData() {
    if (this.roleID == 11 || this.roleID == 10 || this.roleID == 1 || this.roleID == 9) {
      this.DigiofficecorehrService.GetAttendanceCorrection1().subscribe(
        res => {
          debugger;
          this.attendanceCorrectionPendingList = res.filter(x => x.status == 'Manager Pending');
          this.attendanceCorrectionPendingFilter = res.filter(x => x.status == 'Manager Pending');

          this.attendanceCorrectionApprovedList = res.filter(x => x.status == 'Manager Approved');;
          this.attendanceCorrectionApprovedFilter = res.filter(x => x.status == 'Manager Approved');;

          this.attendanceCorrectionRejectedList = res.filter(x => x.status == 'Manager Rejected');
          this.attendanceCorrectionRejectedFilter = res.filter(x => x.status == 'Manager Rejected');
          this.loader = false;
        })
    }
    else {
      this.DigiofficecorehrService.GetPendingAttendanceCorrectionBySupervisor(this.staffID, "01-01-2020", "01-01-2025").subscribe(
        res => {
          debugger;
          this.attendanceCorrectionPendingList = res;
          this.attendanceCorrectionPendingFilter = res;
          this.loader = false;
        })

      this.DigiofficecorehrService.GetApprovedAttendanceCorrectionBySupervisor(this.staffID, "01-01-2020", "01-01-2025").subscribe(
        res => {
          debugger;
          this.attendanceCorrectionApprovedList = res;
          this.attendanceCorrectionApprovedFilter = res;
          this.loader = false;
        })

      this.DigiofficecorehrService.GetRejectedAttendanceCorrectionBySupervisor(this.staffID, "01-01-2020", "01-01-2025").subscribe(
        res => {
          debugger;
          this.attendanceCorrectionRejectedList = res;
          this.attendanceCorrectionRejectedFilter = res;
          this.loader = false;
        })
    }
  }

  public openDeletePopUp(id: any) {
    Swal.fire({
      title: 'Delete record',
      text: "Are you sure you want to delete it?",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Proceed'
    }).then((result) => {
      if (result.value == true) {
        this.DigiofficecorehrService.DeleteAttendanceCorrection(id)
          .subscribe({
            next: data => {
              Swal.fire('Deleted Successfully');
              this.ngOnInit();
            }
          })
      }
    });
  }

  
  public InsertPushNotification() {
    this.DigiofficecorehrService.pushnotificationtomobile(
    localStorage.getItem('staffid'),
      'You Have Successfully Approved ACR Request!!',
      'ACR Request'
    );
  }

  
  public InsertPushNotificationforstaff() {
    this.DigiofficecorehrService.pushnotificationtomobile(
      this.employeeID,
      'Your ACR request Has been Approved by your Manager!!',
      'ACR Request'
    );
  }


  
  
  public InsertPushNotificationreject() {
    this.DigiofficecorehrService.pushnotificationtomobile(
    localStorage.getItem('staffid'),
      'You Have Successfully Rejected The ACR Request!!',
      'ACR Request'
    );
  }

  
  public InsertPushNotificationforstaffreject() {
    this.DigiofficecorehrService.pushnotificationtomobile(
      this.employeeID,
      'Your ACR request Has been Rejected by your Manager!!',
      'ACR Request'
    );
  }



  public getEndDate(event: any) {
    debugger
    this.startDate = this.datePipe.transform(event[0], 'yyyy-MM-dd');
    this.endDate = this.datePipe.transform(event[1], 'yyyy-MM-dd');
    if (this.endDate < this.startDate) {
      Swal.fire("The end date should be greater than the start date")
      this.endDate = ""
    }
    else if (this.startDate == undefined) {
      Swal.fire("Please select the start date first")
      this.endDate = ""
    }
    else if (this.roleID == 11 || this.roleID == 10 || this.roleID == 1 || this.roleID == 9) {
      this.attendanceCorrectionPendingList = this.attendanceCorrectionPendingFilter.filter((x: { sDate: any; }) => (x.sDate >= this.startDate && x.sDate <= this.endDate));
      this.attendanceCorrectionApprovedList = this.attendanceCorrectionApprovedFilter.filter((x: { sDate: any; }) => (x.sDate >= this.startDate && x.sDate <= this.endDate));
      this.attendanceCorrectionRejectedList = this.attendanceCorrectionRejectedFilter.filter((x: { sDate: any; }) => (x.sDate >= this.startDate && x.sDate <= this.endDate));
    }
    else {
      this.DigiofficecorehrService.GetPendingAttendanceCorrectionBySupervisor(this.staffID, "01-01-2020", "01-01-2025").subscribe(
        res => {
          debugger;
          this.attendanceCorrectionPendingList = res.filter((x: { sDate: any; }) => (x.sDate >= this.startDate && x.sDate <= this.endDate));
          this.loader = false;
        })

      this.DigiofficecorehrService.GetApprovedAttendanceCorrectionBySupervisor(this.staffID, "01-01-2020", "01-01-2025").subscribe(
        res => {
          debugger;
          this.attendanceCorrectionApprovedList = res.filter((x: { sDate: any; }) => (x.sDate >= this.startDate && x.sDate <= this.endDate));
          this.loader = false;
        })

      this.DigiofficecorehrService.GetRejectedAttendanceCorrectionBySupervisor(this.staffID, "01-01-2020", "01-01-2025").subscribe(
        res => {
          debugger;
          this.attendanceCorrectionRejectedList = res.filter((x: { sDate: any; }) => (x.sDate >= this.startDate && x.sDate <= this.endDate));
          this.loader = false;
        })
    }
  }

  public approveAttendanceCorrection(item: any) {
    debugger;
    this.loader = false;
    this.save(item);
  }
  employeeID:any;
  public save(item: any) {
    debugger
    this.showPopup = 0;
    this.employeeID = item.staffID
    var entity = {
      'ID': item.id,
      'UserID': item.staffID,
      'SigninDate': this.formatDate(item.sDate),
      'SignoutDate': this.formatDate(item.sDate),
    }
    Swal.fire({
      title: 'Approve Record',
      text: "Are you sure? You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Approve it!'
    }).then((result) => {
      if (result.value == true) {
        this.loader = true;
        this.DigiofficecorehrService.ApproveAttedanceCoorection(entity)
          .subscribe({
            next: data => {
              debugger
              this.InsertPushNotification();
              this.InsertPushNotificationforstaff();
              this.ngOnInit();
              this.loader = false;
              this.showPopup = 1;
              this.messageId = 10;
            }
          })
      }
    })
  }

  public formatDate(date: any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;
    return [year, month, day].join('-');
  }

  public getID(id: any) {
    debugger;
    this.employeeID= id.staffID
    this.id = id;
    this.loader = false;
  }

  public rejectAttendanceCorrection() {
    this.showPopup = 0;
    debugger;
    this.loader = true;
    var entity = {
      ID: this.id,
      Comments: this.notes
    }
    this.DigiofficecorehrService.RejectAttedanceCoorection(entity)
      .subscribe({
        next: data => {
          debugger
          this.InsertPushNotificationreject();
          this.InsertPushNotificationforstaffreject();
          location.reload();
          this.loader = false;
          this.showPopup = 1;
          this, this.messageId = 74;
        }
      })
  }

  public reset() {
    debugger
    this.date = '';
    this.ngOnInit();
  }
}