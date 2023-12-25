import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { ShiftDetailsFormComponent } from 'src/app/Modules/employee/Attendance/shift-details-form/shift-details-form.component';

@Component({
  selector: 'app-my-team-weekly-shift',
  templateUrl: './my-team-weekly-shift.component.html',
  styleUrls: ['./my-team-weekly-shift.component.css']
})
export class MyTeamWeeklyShiftComponent implements OnInit {
  currentUrl: any;
  shiftList: any;
  search: any;
  loader: any;
  staffID: any;
  date: any;
  startDate: any;
  endDate: any;
  shiftFilter: any;
  roleID: any;
  showPopup: number = 0;
  messageId: number = 0;
  employeeID: any;
  id: any;
  notes: any;

  constructor(public DigiofficecorehrService: DigiofficecorehrService, private matDialog: MatDialog, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.staffID = localStorage.getItem('staffid');
    this.roleID = localStorage.getItem('roledid');
    this.getData();
  }

  public getData() {
    this.DigiofficecorehrService.GetStaffShiftDetails().subscribe(
      res => {
        debugger;
        if (this.roleID == 2) {
          this.shiftList = res.filter(x => x.supervisor == this.staffID);
          this.shiftFilter = res.filter(x => x.supervisor == this.staffID);
          this.loader = false;
        }
        else {
          this.shiftList = res;
          this.shiftFilter = res;
          this.loader = false;
        }
        this.loader = false;
      })
  }

  showDialog() {
    debugger
    let ID = undefined
    this.matDialog.open(ShiftDetailsFormComponent, {
      data: ID,
      width: '100%',
      maxHeight: '80vh'
    }).afterClosed()
      .subscribe(result => {
        console.log('Result' + result);
        this.ngOnInit();
      });
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
        this.DigiofficecorehrService.DeleteStaffShiftDetails(id)
          .subscribe({
            next: data => {
              Swal.fire('Deleted Successfully');
              this.ngOnInit();
            }, error: (err) => {
              Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');
              this.loader = false;
              var obj = {
                'PageName': this.currentUrl,
                'ErrorMessage': err.error.message
              }
            }
          })
      }
    });
  }

  public getEndDate(event: any) {
    debugger
    this.startDate = this.datePipe.transform(event[0], 'yyyy-MM-dd');
    this.endDate = this.datePipe.transform(event[1], 'yyyy-MM-dd');
    if (this.endDate < this.startDate) {
      Swal.fire("The end date should be greater than the start date")
      this.endDate = ""
      this.loader = false;
    }
    else if (this.startDate == undefined) {
      Swal.fire("Please select the start date first")
      this.endDate = ""
      this.loader = false;
    }
    else {
      this.shiftList = this.shiftFilter.filter((x: { shiftDate: any; endDate: any; modifieddate: any; approveddate: any;}) => (x.shiftDate >= this.startDate && x.shiftDate <= this.endDate) || (x.endDate >= this.startDate && x.endDate <= this.endDate) || (x.modifieddate >= this.startDate && x.modifieddate <= this.endDate) || (x.approveddate >= this.startDate && x.approveddate <= this.endDate));
      this.loader = false;
    }
  }

  public ApproveTimeSheet(item: any) {
    debugger;
    this.loader = false;
    this.save(item);
  }

  public save(item: any) {
    debugger
    this.employeeID = item.staffID;
    var entity = {
      'ID': item.id,
      'Comments': this.notes
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
        this.DigiofficecorehrService.StaffShiftDetailsApproveByManager(entity)
          .subscribe({
            next: data => {
              debugger
              Swal.fire('Approved Successfully');
              this.loader = false;
              this.showPopup = 1;
              this.messageId = 73;
              this.ngOnInit()
            }
          })
      }
    })
  }

  public getid(id: any) {
    this.id = id;
    this.loader = false;
  }

  public rejectShiftDetails() {
    this.showPopup = 0;
    debugger;[]
    var entity = {
      ID: this.id,
      Comments: this.notes
    }
    this.DigiofficecorehrService.StaffShiftDetailsRejectByManager(entity)
      .subscribe({
        next: data => {
          debugger
          location.reload();
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 74;
        }
      })
  }
}