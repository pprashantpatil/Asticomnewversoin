import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-my-team-over-time-details',
  templateUrl: './my-team-over-time-details.component.html',
  styleUrls: ['./my-team-over-time-details.component.css']
})
export class MyTeamOverTimeDetailsComponent implements OnInit {
  viewMode = 'tab1';
  currentUrl: any;
  overTimePendingList: any;
  search: any;
  loader: any;
  staffID: any;
  date: any;
  startDate: any;
  endDate: any;
  overTimePendingFilter: any;
  roleID: any;
  noOfHours: any;
  nightOT: any;
  restNormalOT: any;
  specialNormalOT: any;
  exccessNightOT: any;
  exccessNormalOT: any;
  restNightOT: any;
  exccessRestNormalOT: any;
  restExccessNightOT: any;
  legalNightOT: any;
  legalNormalOT: any;
  legalExccessNormalOT: any;
  legalExccessNightOT: any;
  specialNightOT: any;
  specialExccessNormalOT: any;
  specialExccessNightOT: any;
  specialRestNightOT: any;
  specialRestNormalOT: any;
  specialRestExccessNormalOT: any;
  specialRestExccessNightOT: any;
  legalRestNightOT: any;
  legalRestNormalOT: any;
  legalExccessRestNormalOT: any;
  legalExccessRestNightOT: any;
  nSDRegular: any;
  multipleAttachmentList: any;
  overTimeApprovedList: any;
  overTimeRejectedList: any;
  overTimeRejectedFilter: any;
  overTimeApprovedFilter: any;
  otEligibility: any;
  filename: any;
  showPopup: number = 0;
  messageId: number = 0;
  month: any;
  day: any;
  payrollType: any;

  constructor(public DigiofficecorehrService: DigiofficecorehrService, private matDialog: MatDialog, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.staffID = localStorage.getItem('staffid');
    this.roleID = localStorage.getItem('roledid');
    this.otEligibility = localStorage.getItem('OTEligibility');
    let date = new Date()
    this.day = date.getDate();
    this.month = new Date().getMonth() + 1;
    if ((this.day <= 15 && this.day >= 1)) {
      this.payrollType = 1
    }
    else {
      this.payrollType = 2
    }
    this.getData();
  }

  public getData() {
    this.DigiofficecorehrService.GetStaffOverTimeDetailsByDate('2023-01-01', '2023-01-10').subscribe(
      res => {
        debugger;
        this.overTimePendingList = res.filter(x => x.status == 'Manager Pending' || x.status == 'Manager Pending HR Pending');
        this.overTimePendingFilter = res.filter(x => x.status == 'Manager Pending' || x.status == 'Manager Pending HR Pending');

        this.overTimeApprovedList = res.filter(x => (x.status == 'Manager Approved' || x.status == 'Manager Approved HR Pending'));
        this.overTimeApprovedFilter = res.filter(x => (x.status == 'Manager Approved' || x.status == 'Manager Approved HR Pending'));

        this.overTimeRejectedList = res.filter(x => x.status == 'Manager Rejected');
        this.overTimeRejectedFilter = res.filter(x => x.status == 'Manager Rejected');
        this.loader = false;
      })
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
        this.DigiofficecorehrService.DeleteStaffOverTimeDetails(id)
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
    }
    else if (this.startDate == undefined) {
      Swal.fire("Please select the start date first")
      this.endDate = ""
    }
    else {
      this.overTimePendingList = this.overTimePendingFilter.filter((x: { submitdate: any; date: any; }) => (x.submitdate >= this.startDate && x.submitdate <= this.endDate) || (x.date >= this.startDate && x.date <= this.endDate));
      this.overTimeApprovedList = this.overTimeApprovedFilter.filter((x: { submitdate: any; date: any; }) => (x.submitdate >= this.startDate && x.submitdate <= this.endDate) || (x.date >= this.startDate && x.date <= this.endDate));
      this.overTimeRejectedList = this.overTimeRejectedFilter.filter((x: { submitdate: any; date: any; }) => (x.submitdate >= this.startDate && x.submitdate <= this.endDate) || (x.date >= this.startDate && x.date <= this.endDate));
    }
  }

  public getOTDetails(time: any) {
    this.loader = true;
    this.DigiofficecorehrService.GetStaffOverTimeDetailsByID(time.id)
      .subscribe({
        next: data => {
          debugger
          let temp: any = data;
          this.noOfHours = temp[0].noofhours;
          this.nightOT = temp[0].nightOT;
          this.restNormalOT = temp[0].restNormalOT;
          this.specialNormalOT = temp[0].specialNormalOT;
          this.exccessNightOT = temp[0].exccessNightOt;
          this.exccessNormalOT = temp[0].exccessNormalOt;
          this.restNightOT = temp[0].restNightOt;
          this.exccessRestNormalOT = temp[0].exccessRestNormalOt;
          this.restExccessNightOT = temp[0].restExccessNightOt;
          this.legalNightOT = temp[0].legalNightOt;
          this.legalNormalOT = temp[0].legalNormalOT;
          this.legalExccessNormalOT = temp[0].legalExccessNormalOt;
          this.legalExccessNightOT = temp[0].legalExccessNightOt;
          this.specialNightOT = temp[0].specialNightOt;
          this.specialExccessNormalOT = temp[0].specialExccessNormalOt;
          this.specialExccessNightOT = temp[0].specialExccessNightOt;
          this.specialRestNightOT = temp[0].specialRestNightOt;
          this.specialRestNormalOT = temp[0].specialRestNormalOT;
          this.specialRestExccessNormalOT = temp[0].specialRestExccessNormalOt;
          this.specialRestExccessNightOT = temp[0].specialRestExccessNightOt;
          this.legalRestNightOT = temp[0].legalRestNightOt;
          this.legalRestNormalOT = temp[0].legalRestNormalOT;
          this.legalExccessRestNormalOT = temp[0].legalExccessRestNormalOt;
          this.legalExccessRestNightOT = temp[0].legalExccessRestNightOt;
          this.nSDRegular = temp[0].nSD_REGULAR;
          this.loader = false;
        }
      })
  }

  image(id: any) {
    debugger
    this.DigiofficecorehrService.GetStaffOverTimeDetailsAttachment().subscribe(
      data => {
        debugger
        this.multipleAttachmentList = data.filter(x => x.overTimeID == id);
        this.loader = false;
      })
  }

  openAttchments(photo: any) {
    window.open(photo, '_blank');
  }

  exportexcel(): void {
    this.filename = "Tenant Inventory Report.xlsx"
    /* table id is passed over here */
    let element = document.getElementById('document');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.filename);
  }

  public managerOTApprove(time: any) {
    this.showPopup = 0;
    debugger
    if (this.payrollType != time.payrolltype && this.month == time.month || this.month == time.month - 1) {
      var entity = {
        'ID': time.id,
        'Status': 'Manager Approved',
        'previouspaybit': 1
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
          this.DigiofficecorehrService.UpdateOtFromManager(entity)
            .subscribe({
              next: data => {
                debugger
                this.ngOnInit();
                this.loader = false;
                this.showPopup = 1;
                this.messageId = 73;
              }
            })
        }
      })
    }
    else {
      var entity = {
        'ID': time.id,
        'Status': 'Manager Approved',
        'previouspaybit': 0
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
          this.DigiofficecorehrService.UpdateOtFromManager(entity)
            .subscribe({
              next: data => {
                debugger
                this.ngOnInit();
                this.loader = false;
                this.showPopup = 1;
                this.messageId = 73;
              }
            })
        }
      })
    }
  }

  public managerOTReject(id: any) {
    this.showPopup = 0;
    debugger
    var entity = {
      'ID': id.id,
      'Status': 'Manager Rejected',
      'previouspaybit': 0
    }
    this.DigiofficecorehrService.UpdateOtFromManager(entity)
      .subscribe({
        next: data => {
          debugger
          this.ngOnInit();
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 75;
        }
      })
  }
}