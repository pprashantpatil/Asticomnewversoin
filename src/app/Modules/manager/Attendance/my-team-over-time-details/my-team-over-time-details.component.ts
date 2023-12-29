import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { DatePipe, formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import { ExportToCsv } from 'export-to-csv';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-team-over-time-details',
  templateUrl: './my-team-over-time-details.component.html',
  styleUrls: ['./my-team-over-time-details.component.css']
})
export class MyTeamOverTimeDetailsComponent implements OnInit {
  startDate: any;
  endDate: any;
  viewMode = 'tab1';
  viewMode1 = 'tab11';
  viewMode2 = 'tab111';
  selecallbtn: any;
  projectlist: any;
  attendancelist: any;
  RoleTypeList: any;
  Departmentlist: any;
  roleid: any;
  sdate: any;
  RoleType: any;
  Department: any;
  count: any;
  p: any = 1;
  count1: any = 10;
  TransportationType: any;
  Date: any;
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  StaffID: any;
  OTlist: any;
  Supervisor: any;
  Name: any;
  Project: any;
  Destination: any;
  Purpose: any;
  ContactPerson: any;
  ContactPhNo: any;
  TimeOfDeparture: any;
  TimeOfReturn: any;
  noofhours: any;
  Comments: any;
  type: any;
  day: any
  attendancelistcopy: any;
  timedetails: any;
  timedetails1: any;
  timedetails2: any;
  timedetails3: any;
  currentUrl: any;
  edate: any;
  temp: any;
  term: any;
  id: any;
  sdte: any;
  Notes: any;
  fulldate:any;
  month: any;
  payperiod: any;
  payrolltype: any;
  Otdetails: any;
  nightOT: any;
  restNormalOT: any;
  specialNormalOT: any;
  ExccessNightOt: any;
  ExccessNormalOt: any;
  RestNightOt: any;
  RestNormalOT: any;
  ExccessRestNormalOt: any;
  firstDayOfCurrentMonthFilter:any;
  lastDayOfCurrentMonthFilter:any;
  firstDayOfCurrentMonth:any;
  lastDayOfCurrentMonth:any
  RestExccessNightOt: any;
  LegalNightOt: any;
  LegalNormalOT: any;
  LegalExccessNormalOt: any;
  LegalExccessNightOt: any;
  SpecialNightOt: any;
  SpecialNormalOT: any;
  SpecialExccessNormalOt: any;
  SpecialExccessNightOt: any;
  SpecialRestNightOt: any;
  SpecialRestNormalOT: any;
  SpecialRestExccessNormalOt: any;
  SpecialRestExccessNightOt: any;
  LegalRestNightOt: any;
  LegalRestNormalOT: any;
  LegalExccessRestNormalOt: any;
  LegalExccessRestNightOt: any;
  loader: any;
  companyName: any;
  OTEligibility: any;
  showPopup: number = 0;
  messageId: number = 0;
  NSD_REGULAR: any;
  multipleattachmentlist: any;
  sequenceNumber1: any;
  otFilter1: any;
  otFilter2: any;
  otFilter3: any;

  constructor(public DigiofficeService: DigiofficecorehrService, public router: Router,public datePipe:DatePipe) { }

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.Department = "";
    this.RoleType = "";
    this.roleid = sessionStorage.getItem('roledid');
    this.StaffID = localStorage.getItem('staffid');
    this.companyName = sessionStorage.getItem('companyName');
    this.OTEligibility = localStorage.getItem('OTEligibility');
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.firstDayOfCurrentMonthFilter = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    this.lastDayOfCurrentMonthFilter = new Date(new Date().getFullYear(), new Date().getMonth(), 30);
    this.firstDayOfCurrentMonth = formatDate(this.firstDayOfCurrentMonthFilter, format, locale);
    this.lastDayOfCurrentMonth = formatDate(this.lastDayOfCurrentMonthFilter, format, locale);
    if (this.roleid == 2) {
      this.GetMyOverTimeDetailsByManager();
    } else {
      this.GetMyOverTimeDetails();
    }
    let date = new Date()
    this.day = date.getDate();
    this.month = new Date().getMonth() + 1;

    if ((this.day <= 15 && this.day >= 1)) {
      this.payrolltype = 1
    }
    else {
      this.payrolltype = 2
    }
  }

  public GetMyOverTimeDetails() {
    debugger
    this.DigiofficeService.GetStaffOverTimeDetailsByDate(this.firstDayOfCurrentMonth, this.lastDayOfCurrentMonth)
      .subscribe({
        next: data => {
          debugger
          this.timedetails = data;
          this.loader = false;
          this.timedetails1 = data.filter(x => x.status == 'Manager Pending' || x.status == 'Manager Pending HR Pending');
          this.timedetails2 = data.filter(x => (x.status == 'Manager Approved' || x.status == 'Manager Approved HR Pending'))
          this.timedetails3 = data.filter(x => x.status == 'Manager Rejected');

          this.otFilter1 = data.filter(x => x.status == 'Manager Pending' || x.status == 'Manager Pending HR Pending');
          this.otFilter2 = data.filter(x => (x.status == 'Manager Approved' || x.status == 'Manager Approved HR Pending'))
          this.otFilter3 = data.filter(x => x.status == 'Manager Rejected');

          this.count = this.timedetails.length
        }
      })
  }

  public GetMyOverTimeDetailsByManager() {
    debugger
    this.DigiofficeService.GetStaffOverTimeDetailsByManagerID(localStorage.getItem('staffid'), '2022-01-01', '2025-12-01')
      .subscribe({
        next: data => {
          debugger
          this.timedetails = data;
          this.loader = false;
          this.timedetails1 = data.filter(x => (x.status == 'Manager Pending' || x.status == 'Manager Pending HR Pending'));
          this.timedetails2 = data.filter(x => (x.status == 'Manager Approved' || x.status == 'Manager Approved HR Pending'))
          this.timedetails3 = data.filter(x => x.status == 'Manager Rejected');
          this.count = this.timedetails.length
        }
      })
  }

  public FilterAttendence() {
    debugger
    let searchCopy = this.term.toLowerCase();
    this.attendancelist = this.timedetails.filter((x: { name: string }) =>
      x.name.toLowerCase().includes(searchCopy));
    this.count = this.attendancelist.length;
    this.loader = false;
  }

  public filterdate() {
    debugger
    if (this.edate == "") {
      this.ngOnInit();
    } else {
      this.DigiofficeService.GetStaffOverTimeDetailsByDate(this.sdate, this.edate).subscribe(data => {
        debugger
        this.loader = false;
        if (this.roleid == 2) {
          this.timedetails1 = data.filter(x => x.supervisor == localStorage.getItem('staffid') && (x.status == 'Manager Pending'));
          this.timedetails2 = data.filter(x => x.supervisor == localStorage.getItem('staffid') && (x.status == 'Manager Approved'));
          this.timedetails3 = data.filter(x => x.supervisor == localStorage.getItem('staffid') && x.status == 'Manager Rejected');
        }
        else {
          this.timedetails = data;
          this.timedetails1 = data.filter(x => x.status == 'Manager Pending');
          this.timedetails2 = data.filter(x => (x.status == 'Manager Approved'))
          this.timedetails3 = data.filter(x => x.status == 'Manager Rejected');
        }
        this.count = this.timedetails.length
      })
    }
  }

  selectALL(checked: boolean) { // pass true or false to check or uncheck all
    this.selecallbtn = true;
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type == "checkbox") {
        inputs[i].checked = checked;
        // This way it won't flip flop them and will set them all to the same value which is passed into the function
      }
    }
  }

  public Approveall() {
    this.showPopup = 1;
    debugger
    this.selecallbtn = false;
    this.loader = false;
    this.messageId = 73;
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type == "checkbox") {
        inputs[i].checked = false;
      }
    }
  }

  public ManagerOTApprove(time: any) {
    this.showPopup = 0;
    debugger
    if (this.payrolltype != time.payrolltype && this.month == time.month || this.month == time.month - 1) {
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
          this.DigiofficeService.UpdateOtFromManager(entity)
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
          this.DigiofficeService.UpdateOtFromManager(entity)
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

  public ManagerOTReject(id: any) {
    this.showPopup = 0;
    debugger
    var entity = {
      'ID': id.id,
      'Status': 'Manager Rejected',
      'previouspaybit': 0
    }
    this.DigiofficeService.UpdateOtFromManager(entity)
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

  image(id: any) {
    debugger
    this.DigiofficeService.GetStaffOverTimeDetailsAttachment().subscribe(
      data => {
        debugger
        this.multipleattachmentlist = data.filter(x => x.overTimeID == id);
        this.loader = false;
      })
  }

  public GetOTDetails(time: any) {
    this.DigiofficeService.GetStaffOverTimeDetailsByID(time.id)
      .subscribe({
        next: data => {
          debugger
          this.loader = false;
          let temp: any = data;
          this.noofhours = temp[0].noofhours;
          this.nightOT = temp[0].nightOT;
          this.restNormalOT = temp[0].restNormalOT;
          this.specialNormalOT = temp[0].specialNormalOT;
          this.ExccessNightOt = temp[0].exccessNightOt;
          this.ExccessNormalOt = temp[0].exccessNormalOt;
          this.RestNightOt = temp[0].restNightOt;
          this.RestNormalOT = temp[0].restNormalOT;
          this.ExccessRestNormalOt = temp[0].exccessRestNormalOt;
          this.RestExccessNightOt = temp[0].restExccessNightOt;
          this.LegalNightOt = temp[0].legalNightOt;
          this.LegalNormalOT = temp[0].legalNormalOT;
          this.LegalExccessNormalOt = temp[0].legalExccessNormalOt;
          this.LegalExccessNightOt = temp[0].legalExccessNightOt;
          this.SpecialNightOt = temp[0].specialNightOt;
          this.SpecialNormalOT = temp[0].specialNormalOT;
          this.SpecialExccessNormalOt = temp[0].specialExccessNormalOt;
          this.SpecialExccessNightOt = temp[0].specialExccessNightOt;
          this.SpecialRestNightOt = temp[0].specialRestNightOt;
          this.SpecialRestNormalOT = temp[0].specialRestNormalOT;
          this.SpecialRestExccessNormalOt = temp[0].specialRestExccessNormalOt;
          this.SpecialRestExccessNightOt = temp[0].specialRestExccessNightOt;
          this.LegalRestNightOt = temp[0].legalRestNightOt;
          this.LegalRestNormalOT = temp[0].legalRestNormalOT;
          this.LegalExccessRestNormalOt = temp[0].legalExccessRestNormalOt;
          this.LegalExccessRestNightOt = temp[0].legalExccessRestNightOt;
          this.NSD_REGULAR = temp[0].nSD_REGULAR;
        }
      })
  }

  public exportexcel1() {
    debugger
    var ExportData = [];
    this.sequenceNumber1 = 0;
    for (let i = 0; i < this.timedetails2.length; i++) {
      this.sequenceNumber1 = i + 1;
      let singleData = {
        SequenceNumber: String,
        companyName: String,
        EmployeeName: String,
        date: String,
        ActualStartTime: String,
        ActualEndTime: String,
        normalOT: String,
        exccessNightOt: String,
        exccessNormalOt: String,
        exccessRestNormalOt: String,
        legalExccessNightOt: String,
        legalExccessNormalOt: String,
        legalExccessRestNightOt: String,
        legalExccessRestNormalOt: String,
        legalNightOt: String,
        legalNormalOT: String,
        legalRestNightOt: String,
        legalRestNormalOT: String,
        nightOT: String,
        restExccessNightOt: String,
        restNightOt: String,
        restNormalOT: String,
        specialExccessNightOt: String,
        specialExccessNormalOt: String,
        specialNightOt: String,
        specialNormalOT: String,
        specialRestExccessNightOt: String,
        specialRestExccessNormalOt: String,
        specialRestNightOt: String,
        specialRestNormalOT: String,
      }
      singleData.SequenceNumber = this.sequenceNumber1;
      singleData.EmployeeName = this.timedetails2[i].staffname;
      singleData.date = this.timedetails2[i].date;
      singleData.ActualStartTime = this.timedetails2[i].startTime;
      singleData.ActualEndTime = this.timedetails2[i].endTime;
      singleData.normalOT = this.timedetails2[i].noofhours;
      singleData.exccessNightOt = this.timedetails2[i].exccessNightOt;
      singleData.exccessNormalOt = this.timedetails2[i].exccessNormalOt;
      singleData.exccessRestNormalOt = this.timedetails2[i].exccessRestNormalOt;
      singleData.legalExccessNightOt = this.timedetails2[i].legalExccessNightOt;
      singleData.legalExccessNormalOt = this.timedetails2[i].legalExccessNormalOt;
      singleData.legalExccessRestNightOt = this.timedetails2[i].legalExccessRestNightOt;
      singleData.legalExccessRestNormalOt = this.timedetails2[i].legalExccessRestNormalOt;
      singleData.legalNightOt = this.timedetails2[i].legalNightOt;
      singleData.legalNormalOT = this.timedetails2[i].legalNormalOT;
      singleData.legalRestNightOt = this.timedetails2[i].legalRestNightOt;
      singleData.legalRestNormalOT = this.timedetails2[i].legalRestNormalOT;
      singleData.nightOT = this.timedetails2[i].nightOT;
      singleData.restExccessNightOt = this.timedetails2[i].restExccessNightOt;
      singleData.restNightOt = this.timedetails2[i].restNightOt;
      singleData.restNormalOT = this.timedetails2[i].restNormalOT;
      singleData.specialExccessNightOt = this.timedetails2[i].specialExccessNightOt;
      singleData.specialExccessNormalOt = this.timedetails2[i].specialExccessNormalOt;
      singleData.specialNightOt = this.timedetails2[i].specialNightOt;
      singleData.specialNormalOT = this.timedetails2[i].specialNormalOT;
      singleData.specialRestExccessNightOt = this.timedetails2[i].specialRestExccessNightOt;
      singleData.specialRestExccessNormalOt = this.timedetails2[i].specialRestExccessNormalOt;
      singleData.specialRestNightOt = this.timedetails2[i].specialRestNightOt;
      singleData.specialRestNormalOT = this.timedetails2[i].specialRestNormalOT;
      singleData.companyName = this.companyName;
      ExportData.push(singleData);
    }
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'GENERATE REPORT',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Employee_OverTime_report'
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(ExportData);
  }

  openAttchments(photo: any) {
    window.open(photo, '_blank');
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
      this.timedetails1 = this.otFilter1.filter((x: { shiftDate: any; endDate: any; }) => (x.shiftDate >= this.startDate && x.shiftDate <= this.endDate) || (x.endDate >= this.startDate && x.endDate <= this.endDate));
      this.loader = false;
    }
  }

  public reset() {
    debugger
    this.fulldate = '';
    this.ngOnInit();
  }
}