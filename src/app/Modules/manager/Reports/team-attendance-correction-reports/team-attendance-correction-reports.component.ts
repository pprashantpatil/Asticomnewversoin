import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-team-attendance-correction-reports',
  templateUrl: './team-attendance-correction-reports.component.html',
  styleUrls: ['./team-attendance-correction-reports.component.css']
})
export class TeamAttendanceCorrectionReportsComponent implements OnInit {

  constructor(public DigiofficeService: DigiofficecorehrService) { }
  viewMode = 'tab1';
  roleid: any;
  timesheets: any = [];
  staffID: any;
  IntID: boolean = false;
  public ID: any = [];
  ClassList: any;
  date: any;
  Notes: any;
  term: any;
  edate: any;
  GenderList: any;
  ScheduleDate: any;
  ScheduleTime: any;
  NoImagesAvail: any;
  correctionlist1: any;
  temp: any
  currentUrl: any;
  selecallbtn: any;
  expencesName: any;
  Decription: any;
  id: any;
  p: any = 1;
  count1: any = 10;
  StartDate: any;
  EndDate: any;
  StartTime: any;
  EndTime: any;
  alldates: any;
  ipaddress: any;
  UserID: any;
  correctionlist: any;
  loader: any;
  dropdownSettings: any = {};
  dropdownList: any = [];
  selectedItems: any = [];
  showPopup: number = 0;
  messageId: number = 0;

  ngOnInit(): void {
    debugger
    this.loader = true;
    this.currentUrl = window.location.href;
    this.IntID = false;
    this.roleid = localStorage.getItem('roledid');
    this.staffID = localStorage.getItem('staffid');
    this.GetTeamAttendanceCorrection();
    this.GetMyDetails();
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
    };
  }

  public GetTeamAttendanceCorrection() {
    debugger

    this.DigiofficeService.GetAttendanceCorrection(10000, "01-01-2020", "01-01-2025")
      .subscribe({
        next: data => {
          debugger
          if (this.roleid==10) {
            this.correctionlist1 = data
          }
          else {
            this.correctionlist1 = data.filter(x => String(x.supervisor) == this.staffID);
          }


          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Attendance Correction');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })


  }


  id1: any;

  public getid(id: any) {
    this.id = id;
    this.loader = false;
  }


  public getdate() {
    debugger
    if (this.edate == "") {
      this.ngOnInit();
    } else {

      if(this.roleid==10){
        this.DigiofficeService.GetAttendanceCorrection1()
        .subscribe({
          next: data => {
            debugger
            this.correctionlist1 = data.filter(x=>x.status=='Manager Pending' && x.date>= this.date &&x.date<=this.edate);
              this.loader = false;
          }, error: (err) => {
            // Swal.fire('Issue in Getting Approved Attendance Correction By StaffID');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })
      }
      else{
        this.DigiofficeService.GetAttendanceCorrection(this.staffID, this.date, this.edate)
        .subscribe({
          next: data => {
            debugger
            this.correctionlist1 = data.filter(x => x.supervisor == localStorage.getItem('staffid') && (x.filterdate >= this.date && x.filterdate <= this.edate));
            // this.correctionlist1 = data.filter(x => (x.filterdate >= this.date && x.filterdate <= this.edate));
            this.loader = false;
          }, error: (err) => {
            // Swal.fire('Issue in Getting Attendance Correction');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })
      }
    
    }
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
  fileName = 'Team Attendance Correction Report.xlsx';
  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('lvs');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  public GetMyDetails() {
    this.DigiofficeService.GetAllStaffNew()
      .subscribe({
        next: data => {
          debugger
          this.dropdownList = data.filter(x => x.supervisor == this.staffID);
        }, error: (err) => {
          // Swal.fire('Issue in Getting Attendance');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }
  employeeid: any;
  onItemSelect(item: any) {
    debugger
    console.log(item);
    this.employeeid = item.id;
    if (this.date == undefined || this.edate == undefined) {
      this.DigiofficeService.GetAttendanceCorrection(this.staffID, this.date, this.edate)
        .subscribe({
          next: data => {
            debugger
            this.correctionlist1 = data.filter(x => x.staffID == this.employeeid)
          }, error: (err) => {
            // Swal.fire('Issue in Getting Attendance');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })
    }
    else {
      this.DigiofficeService.GetAttendanceCorrection(this.staffID, this.date, this.edate)
        .subscribe({
          next: data => {
            debugger
            this.correctionlist1 = data.filter(x => x.staffID == this.employeeid && (x.filterdate >= this.date && x.filterdate <= this.edate))
          }, error: (err) => {
            // Swal.fire('Issue in Getting Attendance');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })
    }
  }

}