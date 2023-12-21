import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { DatePipe, formatDate } from '@angular/common';
import { AnnouncementsFormComponent } from '../announcements-form/announcements-form.component';

@Component({
  selector: 'app-announcements-dash',
  templateUrl: './announcements-dash.component.html',
  styleUrls: ['./announcements-dash.component.css']
})
export class AnnouncementsDashComponent implements OnInit {
  viewMode = 'tab1';
  currentUrl: any;
  upcomingList: any;
  search: any;
  loader: any;
  staffID: any;
  date: any;
  startDate: any;
  endDate: any;
  roleID: any;
  file: any;
  upcomingFilter: any;
  showPopup: number = 0;
  messageId: number = 0;
  todayDate: any;
  completedList: any;
  completedFilter: any;

  constructor(public DigiofficecorehrService: DigiofficecorehrService, private matDialog: MatDialog, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.staffID = localStorage.getItem('staffid');
    this.roleID = localStorage.getItem('roledid');
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.todayDate = formatDate(myDate, format, locale);
    this.getData();
  }

  public getData() {
    this.DigiofficecorehrService.GetAnnouncementsByBuildingID(56).subscribe(
      res => {
        debugger;
        this.upcomingList = res.filter(x => x.filterdate >= this.todayDate);
        this.upcomingFilter = res.filter(x => x.filterdate >= this.todayDate);

        this.completedList = res.filter(x => x.filterdate < this.todayDate);
        this.completedFilter = res.filter(x => x.filterdate < this.todayDate);
        this.loader = false;
      })
  }

  showDialog() {
    debugger
    let ID = undefined
    this.matDialog.open(AnnouncementsFormComponent, {
      data: ID,
      width: '100%',
      maxHeight: '80vh'
    }).afterClosed()
      .subscribe(result => {
        console.log('Result' + result);
        this.ngOnInit();
      });
  }

  edit(ID: any) {
    debugger
    this.matDialog.open(AnnouncementsFormComponent, {
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
    this.showPopup = 0;
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
        this.DigiofficecorehrService.DeleteHolidays(id)
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

  public getAttachmentURL(file: any) {
    debugger
    this.file = file;
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
    else {
      this.upcomingList = this.upcomingFilter.filter((x: { dateTime: any; time: any; }) => (x.dateTime >= this.startDate && x.dateTime <= this.endDate) || (x.time >= this.startDate && x.time <= this.endDate));
      this.completedList = this.completedFilter.filter((x: { dateTime: any; }) => (x.dateTime >= this.startDate && x.dateTime <= this.endDate ));
    }
  }
}