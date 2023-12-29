import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FullCalendarOptions, EventObject } from 'ngx-fullcalendar';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';

@Component({
  selector: 'app-hrleave-request-dash',
  templateUrl: './hrleave-request-dash.component.html',
  styleUrls: ['./hrleave-request-dash.component.css']
})
export class HRLeaveRequestDashComponent implements OnInit {
date: any;
search: any;

  constructor(public DigiofficeService: DigiofficecorehrService, public router: Router, public datePipe: DatePipe) { }
  public selecallbtn: any;
  roleID: any;
  p: any = 1;
  RoleType: any;
  count1: any = 10;
  Departmentlist: any;
  RoleTypeList: any;
  currentUrl: any;
  public filtereddate: any;
  public todaydate: any;
  public firstdayofcurrentyear: any;
  public firstdayofcurrentweek: any;
  public lastdayofcurrentweek: any;
  public firstdayofpreviousmonth: any;
  public lastdayofpreviousmonth: any;
  public firstdayofpreviousyear: any;
  public lastdayofpreviousyear: any;
  firstDayofcurrentmonth: any;
  public showorhidecontent: any;
  options: FullCalendarOptions | undefined;
  events: EventObject[] | undefined;
  roleid: any;
  public selectedlanguage: any;
  public selectedlanguage1: any;
  public callenderyear: any;
  public callenderMonth: any;
  public callenderstartday: any;
  public callenderendday: any;
  public callenderdaysdount: any = [];
  public callenderBindData = new Date();
  public options1: any;
  public todayDay = this.datePipe.transform(new Date().getDay(), 'EEEE');
  viewMode = 'tab1';
  term: any;
  staffleaves: any;
  staffListCopy: any;
  stafflist: any;
  count: any;
  Department: any;
  sdate: any;
  edate: any;
  staffleaves3: any;
  staffleaves2: any;
  id: any;
  public alldates: any = [];
  staffleaves1: any;
  sdte: any;
  IntID: boolean = false;
  public ID: any = [];
  temp: any
  Notes: any;
  medicalUrl: any;
  loader: any;
  showPopup: number = 0;
  messageId: number = 0;
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    debugger
    this.loader = true;
    this.RoleType = "";
    this.Department = "";
    this.selecallbtn = false;
    this.roleID = sessionStorage.getItem('roledid');
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.filtereddate = formatDate(myDate, format, locale);
    this.todaydate = this.filtereddate;
    this.firstDayofcurrentmonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    this.firstDayofcurrentmonth = formatDate(this.firstDayofcurrentmonth, format, locale);
    this.firstdayofcurrentyear = new Date(new Date().getFullYear(), 0, 1);
    this.firstdayofcurrentyear = formatDate(this.firstdayofcurrentyear, format, locale);
    this.GetDepartment();
    this.GetRoleType();
    this.GetApprovedStaffLeavesByHR();
    this.GetRejectedStaffLeavesByHR();
    this.GetPendingStaffLeavesByHR();
  }

  public GetApprovedStaffLeavesByHR() {
    debugger
    this.DigiofficeService.GetApprovedStaffLeavesByHR(10331, 1, "01-01-2020", "01-01-2025").subscribe(data => {
      debugger
      this.loader = false;
      this.staffleaves1 = data;
      console.log("this.staffleaves1", this.staffleaves1)
      this.buildcallender(this.staffleaves1);
    })
  }
  public GetPendingStaffLeavesByHR() {
    debugger
    this.DigiofficeService.GetPendingStaffLeavesByHR(10331, 1, "01-01-2020", "01-01-2025").subscribe(data => {
      debugger
      this.loader = false;
      this.staffleaves2 = data;
      console.log("this.staffleaves2", this.staffleaves2)
      this.buildcallender(this.staffleaves2);
    })
  }

  public GetRejectedStaffLeavesByHR() {
    debugger
    this.DigiofficeService.GetRejectedStaffLeavesByHR(10331, 1, "01-01-2020", "01-01-2025").subscribe(data => {
      debugger
      this.loader = false;
      this.staffleaves3 = data;
      console.log("this.staffleaves3", this.staffleaves3)
      this.buildcallender(this.staffleaves3);
    })
  }



  public GetDepartment() {
    this.DigiofficeService.GetDepartment()
      .subscribe({
        next: data => {
          debugger
          this.Departmentlist = data;
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Department');
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

  public GetRoleType() {
    this.DigiofficeService.GetRoleType()
      .subscribe({
        next: data => {
          debugger
          this.RoleTypeList = data;
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Position');
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

  public getEndDate() {
    debugger
    this.showPopup = 0;
    if (this.sdate > this.edate) {
      /*   Swal.fire('Start date must be less than End Date'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 60;
    }
    else if (this.sdate == undefined || this.sdate == "") {
      /*   Swal.fire('Please Select Start Date First'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 32;
    }
    else {
      this.DigiofficeService.GetStaffLeaves(10331, 1, this.sdate, this.edate).subscribe((data: any) => {
        debugger
        this.loader = false;
        this.staffleaves = data;
        console.log("this.staffleaves", this.staffleaves)
        this.staffleaves2 = data.filter((x: { status: string; }) => (x.status == 'Manager Pending'))
        this.staffleaves1 = data.filter((x: { status: string; }) => (x.status == 'Manager Approved'))
        this.staffleaves3 = data.filter((x: { status: string; }) => (x.status == 'Rejected'))
        this.buildcallender(this.staffleaves);
        console.log("this.buildcallender", this.buildcallender)
      })
    }
  }

  changeStatus1() {
    debugger;
    this.showorhidecontent = true;
  }

  changeStatus(evn: any) {
    if (evn.target.value == 1) {
      this.showorhidecontent = true;
    }
    else {
      this.showorhidecontent = false;
    }
  }

  public buildcallender(MaintainanceList: string | any[]) {
    debugger
    this.callenderdaysdount.length = 0;
    this.callenderyear = this.callenderBindData.getFullYear();
    this.callenderMonth = this.datePipe.transform(this.callenderBindData, 'MMMM');
    this.callenderstartday = new Date(this.callenderBindData.getFullYear(), this.callenderBindData.getMonth(), 1);
    this.callenderendday = new Date(this.callenderBindData.getFullYear(), this.callenderBindData.getMonth() + 1, 0);
    this.callenderdaysdount.length = this.callenderendday.getDate();
    let o = 0;
    for (let i = 0; i < this.callenderdaysdount.length; i++) {
      let sdate = this.callenderstartday;
      let _date;
      if (sdate.getDate() == 1 && o == 0) {
        _date = sdate.setDate(sdate.getDate() + 0);
        o++
      }
      else {
        _date = sdate.setDate(sdate.getDate() + 1);
      }
      _date = this.datePipe.transform(sdate, 'dd');
      let _day = this.datePipe.transform(sdate, 'EEE');
      let dateformat = this.datePipe.transform(sdate, 'yyyy-MM-ddTHH:mm:ss');

      this.callenderdaysdount[i] = { date: _date, day: _day, dateformat: dateformat };
    }
    //Events Binding
    const getDatesBetweenDates = (startDate: string | number | Date, endDate: string | number | Date) => {
      let dates: any = []
      //to avoid modifying the original date
      const theDate = new Date(startDate)
      while (theDate < new Date(endDate)) {
        dates = [...dates, new Date(theDate)]
        theDate.setDate(theDate.getDate() + 1)
      }
      dates = [...dates, new Date(endDate)]
      this.alldates = dates;
      return dates
    }
    for (let j = 0; j < MaintainanceList.length; j++) {
      debugger;
      getDatesBetweenDates(MaintainanceList[j].filterdate, MaintainanceList[j].filterdate1)
      for (let k = 0; k < this.alldates.length; k++) {
        let currenteventlist = this.callenderdaysdount.filter((x: { dateformat: number; }) => (this.datePipe.transform(x.dateformat, 'yyyy-MM-dd') == this.datePipe.transform(this.alldates[k], 'yyyy-MM-dd')))

        if (currenteventlist.length > 0) {
          this.callenderdaysdount[currenteventlist[0].date - 1]['RequestFor'] = MaintainanceList[j].requestFor;
          this.callenderdaysdount[currenteventlist[0].date - 1]['StartTime'] = MaintainanceList[j].startTime;
          this.callenderdaysdount[currenteventlist[0].date - 1]['EndTime'] = MaintainanceList[j].endTime;
          this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] =
            "<br>  Staff Name  :" + MaintainanceList[j].staffName + " <br>  "
          "</span>";
        }
      }
    }
  }

  public ShowMaintenanceRequest(evn: any) {
    debugger;
    var html = evn.srcElement.innerText.split(': ');
    var s1 = html[1].substring(0, html[1].indexOf('\n'));
    let MaintenanceRequest = this.staffleaves.filter((x: { id: string; }) => x.id == s1);
    Swal.fire(({
      title: '<strong><u>Leave Details</u></strong>',
      type: 'info',
      html:
        '<p style="font-size: 24px;text-align: start;margin-left: 135px;"> Staff Name : ' + MaintenanceRequest[0].staffName +
        '       <br>' +
        'Leave Reason: ' + MaintenanceRequest[0].leaveReason +
        '       <br>' +
        'Start Date: ' + MaintenanceRequest[0].sDateOfLeave +
        '       <br>' +
        'End Date: ' + MaintenanceRequest[0].eDateOfLeave +
        '       <br>' +
        '</p>'
      ,
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: true,
    }));
  }

  public previousmonth() {
    debugger;
    this.callenderBindData.setMonth(this.callenderBindData.getMonth() - 1);
    this.buildcallender(this.staffleaves);
  }

  public nextmonth() {
    debugger;
    this.callenderBindData.setMonth(this.callenderBindData.getMonth() + 1);
    this.buildcallender(this.staffleaves);
  }



  public newlevae() {
    debugger
    this.router.navigate(['/NewLeaveRequest']);
    this.loader = false;
  }

  public makeunderline(event: { currentTarget: any; }) {
    debugger
    var element = event.currentTarget;
    element.c("color");
    element.addClass("bottom__active");
  };

  public Filterlist() {
    debugger
    let searchCopy = this.term.toLowerCase();
    this.staffleaves = this.staffListCopy.filter((x: { staffName: string }) => x.staffName.toLowerCase().includes(searchCopy));
    console.log("this.staffleaves", this.staffleaves)
    this.staffleaves = this.staffleaves.filter((x: { staffName: string }) => x.staffName.toLowerCase().includes(searchCopy));
    console.log("this.staffleaves", this.staffleaves)
    this.staffleaves1 = this.staffleaves1.filter((x: { staffName: string }) => x.staffName.toLowerCase().includes(searchCopy));
    this.staffleaves2 = this.staffleaves2.filter((x: { staffName: string }) => x.staffName.toLowerCase().includes(searchCopy));
    this.staffleaves3 = this.staffleaves3.filter((x: { staffName: string }) => x.staffName.toLowerCase().includes(searchCopy));
  }

  public getRoleType(event: any) {
    debugger
    this.RoleType = event.target.value;
  }

  public FilterRoleType() {
    debugger
    this.DigiofficeService.GetStaffLeaves(10331, 1, "01-01-2020", "01-01-2025").subscribe((data: any) => {
      debugger
      this.loader = false;
      this.staffleaves = data;
      console.log("this.staffleaves", this.staffleaves)
      this.staffleaves2 = data.filter((x: { status: string, roleType: any }) => (x.status == 'Manager Pending') && x.roleType == this.RoleType)
      this.staffleaves1 = data.filter((x: { status: string, roleType: any }) => (x.status == 'Manager Approved') && x.roleType == this.RoleType)
      this.staffleaves3 = data.filter((x: { status: string, roleType: any }) => (x.status == 'Rejected') && x.roleType == this.RoleType)
      this.count = this.staffleaves.length;
    })
  }

  public filterByDepartment() {
    debugger
    this.DigiofficeService.GetStaffLeaves(10331, 1, "01-01-2020", "01-01-2025").subscribe((data: any) => {
      debugger
      this.loader = false;
      this.staffleaves = data;
      console.log("this.staffleaves", this.staffleaves)
      this.staffleaves2 = data.filter((x: { status: string, department: any }) => (x.status == 'Manager Pending') && x.department == this.Department)
      this.staffleaves1 = data.filter((x: { status: string, department: any }) => (x.status == 'Manager Approved') && x.department == this.Department)
      this.staffleaves3 = data.filter((x: { status: string, department: any }) => (x.status == 'Rejected' || x.status == 'Manager Pending HR Rejected') && x.department == this.Department)
      this.count = this.staffleaves.length;
    })
  }

  public ManagerLeaveApprove(id: any) {
    debugger
    this.showPopup = 0;
    if (id.status == 'HR Pending') {
      var entity = {
        'ID': id.id,
        'Status1': 'HR Approved',
        'StaffName': id.staffID,
        'LeaveTypeID': id.leaveTypeID,
        'NoOfDays': id.noOfDays,
      }
      this.DigiofficeService.ApproveStaffLeavesNewForHR(entity)
        .subscribe({
          next: data => {
            debugger
            if (data != 0) {
              /*     Swal.fire("Approved Successfully"); */
              this.ngOnInit();
              this.loader = false;
              this.showPopup = 1;
              this.messageId = 73;
            }
          }, error: (err) => {
            // Swal.fire('Issue in Approve Staff Leaves New For HR');
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
      var entity = {
        'ID': id.id,
        'Status1': 'Manager Approved HR Approved',
        'StaffName': id.staffID,
        'LeaveTypeID': id.leaveTypeID,
        'NoOfDays': id.noOfDays,
      }
      this.DigiofficeService.ApproveStaffLeavesNewForHR(entity)
        .subscribe({
          next: data => {
            debugger
            if (data != 0) {
              /*  Swal.fire("Approved Successfully"); */
              this.ngOnInit();
              this.loader = false;
              this.showPopup = 1;
              this.messageId = 73;
            }
          }, error: (err) => {
            // Swal.fire('Issue in Approve Staff Leaves New For HR');
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

  public ManagerLeaveDecline() {
    debugger
    this.showPopup = 0;
    var entity = {
      'ID': this.id,
      'LeaveReason': 'Rejected',
      'Status1': 'Manager Approved HR Rejected',
      'StartDate': this.sdte,
      'EndDate': this.edate,
    }
    this.DigiofficeService.UpdateStaffLeaves(entity)
      .subscribe({
        next: data => {
          debugger
          if (data != 0) {
            /*  Swal.fire("Rejected Successfully"); */
            location.reload();
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 74;
          }
        }, error: (err) => {
          // Swal.fire('Issue in Updat eStaff Leaves');
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

  public GetRejectID(list: any) {
    this.id = list.id;
    this.sdte = list.sdte;
    this.edate = list.edate;
  }

  public getmedicalUrl(medicalUrl: any) {
    debugger
    this.medicalUrl = medicalUrl
  }

  public getCheckbocdetails(evn: any) {
    let temp: any = evn;
    this.temp = Object.entries(temp);
    debugger
    if (this.temp.every((val: { checked: boolean; }) => val.checked == true)) {
      this.IntID = false;
      this.ID = [];
      this.temp.forEach((val: { checked: boolean; }) => { val.checked = false });
      this.IntID = false;
    }
    else {
      debugger;
      this.selecallbtn = true;
      debugger
      this.temp.forEach((val: { checked: boolean; }) => { val.checked = true });
      this.IntID = true;
      var obj: any = {};
      obj["id"] = evn.id;
      obj["staffID"] = evn.staffID;
      obj["leaveTypeID"] = evn.leaveTypeID;
      obj["noOfDays"] = evn.noOfDays;
      this.ID.push(obj);
    }
  }

  selectALL(checked: boolean) { // pass true or false to check or uncheck all
    debugger
    if (this.selecallbtn == true) {
      this.selecallbtn = false;
      var inputs = document.getElementsByTagName("input");
      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "checkbox") {
          inputs[i].checked = false;
          // This way it won't flip flop them and will set them all to the same value which is passed into the function
        }
      }
    }
    else {
      this.selecallbtn = true;
      var inputs = document.getElementsByTagName("input");
      for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "checkbox") {
          inputs[i].checked = checked;
          // This way it won't flip flop them and will set them all to the same value which is passed into the function
        }
      }
      for (var i = 0; i < this.staffleaves1.length; i++) {
        debugger
        var obj: any = {};
        obj["id"] = this.staffleaves1[i].id;
        obj["staffID"] = this.staffleaves1[i].staffID;
        obj["leaveTypeID"] = this.staffleaves1[i].leaveTypeID;
        obj["noOfDays"] = this.staffleaves1[i].noOfDays;
        this.ID.push(obj);
      }
    }
  }

  public Approveall() {
    debugger
    this.showPopup = 0
    for (var i = 0; i < this.ID.length; i++) {
      var entity = {
        'ID': this.ID[i].id,
        'Status1': 'Manager Approved HR Approved',
        'UserID': this.ID[i].staffID,
        'LeaveTypeID': this.ID[i].leaveTypeID,
        'NoOfDays': this.ID[i].noOfDays
      }
      this.DigiofficeService.ApproveStaffLeavesNewForHR(entity)
        .subscribe({
          next: data => {
            debugger
            if (data != 0) {
              /*  Swal.fire("Approved Successfully"); */
              this.loader = false;
              this.showPopup = 1;
              this.messageId = 73;
            }
          }, error: (err) => {
            // Swal.fire('Issue in Approve Staff Leaves New For HR');
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
    location.reload();
  }

  multipleattachmentlist: any;
  image(id: any) {
    debugger
    this.DigiofficeService.GetStaffLeavesAttachment().subscribe(
      data => {
        debugger
        this.multipleattachmentlist = data.filter(x => x.leaveID == id);
        this.loader = false;
      }
    )

  }

  openAttchments(photo: any) {
    window.open(photo, '_blank');
  }
}