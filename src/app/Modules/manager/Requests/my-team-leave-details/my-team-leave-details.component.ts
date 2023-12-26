import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DigiofficecorehrService } from '../../../../Services/digiofficecorehr.service';
import { FullCalendarOptions, EventObject } from 'ngx-fullcalendar';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-my-team-leave-details',
  templateUrl: './my-team-leave-details.component.html',
  styleUrls: ['./my-team-leave-details.component.css']
})
export class MyTeamLeaveDetailsComponent implements OnInit {
startdate: any;
  enddate: any;
search: any;
  constructor(public DigiofficeService: DigiofficecorehrService, public router: Router, public datePipe: DatePipe) { }
  public showorhidecontent: any;
  options: FullCalendarOptions | undefined;
  events: EventObject[] | undefined;
  roleid: any;
  viewMode = 'tab1';
  IntID: boolean = false;
  public ID: any = [];
  temp: any
  staffleaves2: any;
  selectedItems: any = [];
  staffleaves3: any;
  public selectedlanguage: any;
  public selectedlanguage1: any;
  public callenderyear: any;
  public callenderMonth: any;
  public callenderstartday: any;
  public callenderendday: any;
  public callenderdaysdount: any = [];
  public callenderBindData = new Date();
  public todaydate = new Date().getDate();
  public options1: any;
  managerlist: any = [];
  dropdownSettings: any = {};
  public todayDay = this.datePipe.transform(new Date().getDay(), 'EEEE');
  public selecallbtn: any;
  staffID: any;
  filtereddate: any;
  firstDayofcurrentmonth: any;
  roleID: any;
  currentUrl: any;
  term: any;
  staffleaves: any;
  staffleaves1: any;
  date: any;
  id: any;
  edate: any;
  sdte: any;
  Notes: any;
  medicalUrl: any;
  loader: any;
  public alldates: any = [];
  showPopup: number = 0;
  messageId: number = 0;
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    // this.loader = true;
    this.selecallbtn = false;
    this.roleID = localStorage.getItem('roledid');
    this.staffID = localStorage.getItem('staffid');
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.ManagerID = 0;
    this.StaffID = 0;
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
    };
    this.GetManagerlist();

    this.filtereddate = formatDate(myDate, format, locale);
    this.todaydate = this.filtereddate;
    debugger
    this.firstDayofcurrentmonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    this.firstDayofcurrentmonth = formatDate(this.firstDayofcurrentmonth, format, locale);
    this.date = this.firstDayofcurrentmonth;
    this.getstaffleaves(this.staffID, '2022-01-01', '2025-12-01');
    this.GetMyDetailsByStaffID();

  }
  EmployeeEmailID: any;
  manageremailid: any
  Staffleaveenitilment: any;
  ManagerName: any;
  public GetMyDetailsByStaffID() {
    this.DigiofficeService.GetMyDetailsByStaffID(localStorage.getItem('staffid'))
      .subscribe({
        next: data => {
          debugger
          this.Staffleaveenitilment = data;
          console.log(" this.Staffleaveenitilment ", this.Staffleaveenitilment)
          this.ManagerName = this.Staffleaveenitilment[0].name;
          this.manageremailid = this.Staffleaveenitilment[0].manageremailid;
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Staff Details');
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

  public getstaffleaves(StaffID: any, SDate: any, EDate: any) {
    this.showPopup = 0;
    debugger
    if (EDate == "") {
      this.ngOnInit();
    }
    else if (this.date == undefined || this.date == "") {
      /* Swal.fire('Please Select Start Date First'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 32;
    } else {
      this.DigiofficeService.GetPendingStaffLeavesBySupervisor(StaffID, 1, SDate, EDate)
        .subscribe({
          next: data => {
            debugger
            this.staffleaves1 = data;
            this.EmployeeEmailID = this.staffleaves1[0].empEmailID;
            console.log("this.staffleaves1", this.staffleaves1)
            this.loader = false;
            this.buildcallender(this.staffleaves1);
          }, error: (err) => {
            // Swal.fire('Issue in Getting Pending Staff Leaves By Supervisor');
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
      this.DigiofficeService.GetApprovedStaffLeavesBySupervisor(StaffID, 1, SDate, EDate)
        .subscribe({
          next: data => {
            debugger
            this.staffleaves2 = data;
            this.loader = false;
            this.buildcallender(this.staffleaves2);
          }, error: (err) => {
            // Swal.fire('Issue in Getting Approved Staff Leaves By Supervisor');
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
      this.DigiofficeService.GetRejectedStaffLeavesBySupervisor(StaffID, 1, SDate, EDate)
        .subscribe({
          next: data => {
            debugger
            this.staffleaves3 = data;
            this.loader = false;
            this.buildcallender(this.staffleaves3);
          }, error: (err) => {
            // Swal.fire('Issue in Getting Rejected Staff Leaves By Supervisor');
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

  public selectALL(event: any) {
    debugger
    if (event.target.checked == true) {

      this.selecallbtn = true;

      var inputs = document.getElementsByTagName("input");

      for (var i = 0; i < inputs.length; i++) {

        if (inputs[i].type == "checkbox") {

          inputs[i].checked = event.currentTarget.checked;

          // This way it won't flip flop them and will set them all to the same value which is passed into the function

        }

      }
      for (let i = 0; i < this.staffleaves1.length; i++) {
        debugger
        var entity = {
          'id': this.staffleaves1[i].id,
          'staffID': this.staffleaves1[i].staffID,
          'leaveTypeID': this.staffleaves1[i].leaveTypeID,
          'noOfDays': this.staffleaves1[i].noOfDays
        }
        this.ID.push(entity);
      }


    }

    else {

      this.selecallbtn = false;

      var inputs = document.getElementsByTagName("input");

      for (var i = 0; i < inputs.length; i++) {

        if (inputs[i].type == "checkbox") {

          inputs[i].checked = false;

          // This way it won't flip flop them and will set them all to the same value which is passed into the function

        }

      }

    }

  }

  public Approveall() {
    debugger
    this.showPopup = 0;
    for (var i = 0; i < this.ID.length; i++) {
      var entity = {
        'ID': this.ID[i].id,
        'Status1': 'Manager Approved',
        'UserID': this.ID[i].staffID,
        'LeaveTypeID': this.ID[i].leaveTypeID,
        'NoOfDays': this.ID[i].noOfDays
      }
      this.DigiofficeService.ApproveStaffLeavesNew(entity)
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
            // Swal.fire('Issue in Approving Staff New Leaves');
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
    this.ngOnInit();
  }
  Employeeid: any;
  leaveTypeID: any;
  noOfDays: any;
  noofdaysarray: any = []
  public ManagerLeaveApprove(id: any) {
    debugger
    this.Employeeid = id.staffID;
    this.leaveTypeID = id.leaveTypeID;
    this.noOfDays = id.noOfDays;
    this.noofdaysarray = this.dateRange(id.filterdate, id.filterdate1);
    Swal.fire({
      title: 'Approve Record',
      text: "Are you sure? You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Approve it!'
    }).then((result) => {
      if (result.value == true) {
        var entity = {
          'ID': id.id,
          'Status1': 'Manager Approved',
          'StaffName': id.staffID,
          'LeaveTypeID': id.leaveTypeID,
          'NoOfDays': id.noOfDays,
        }
        this.DigiofficeService.ApproveStaffLeavesNew(entity)
          .subscribe({
            next: data => {
              debugger
              if (data != 0) {
                Swal.fire("Approved Successfully");
                this.SaveEmployeeAttendance_Leavedays();
                this.sendemail();
                this.ngOnInit();
                this.loader = false;
                this.showPopup = 1;
                this.messageId = 73;
              }
            }, error: (err) => {
              // Swal.fire('Issue in Approving Staff New Leaves');
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
    })


  }

  email: any;
  Attactments: any = [];
  UserName: any;
  public sendemail() {

    var entity1 = {
      'FromUser': 'Admin',
      'emailto': this.EmployeeEmailID,
      'emailsubject': 'Approved Mail',
      'Message': 'Your Leave Request Approve Successfully !!',
      'emailbody': 'Hi  <br> Your Manager ' + this.ManagerName + ' has Approved leave in Digi-Office.  <br><br>' + '<br>  <br> Thanks <br> Team Digi-Office',
      'attachmenturl': this.Attactments,
      'cclist': this.EmployeeEmailID,
      'bcclist': this.EmployeeEmailID,
    }
    this.DigiofficeService.sendemailattachementsforemail(entity1)
      .subscribe({
        next: data => {
          debugger
          this.Attactments = [];


          //Swal.fire('Password sent to your email.');
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Sending Attachments For Email');

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

  public SaveEmployeeAttendance_Leavedays() {
    debugger

    for (let i = 0; i < this.noofdaysarray.length; i++) {
      var obj = {
        'EmployeeID': this.Employeeid,
        'Date': this.noofdaysarray[i],
        'remarks': 'Leave Request',
        'Leavetype': this.leaveTypeID
      }
      this.DigiofficeService.InsertEmployeeAttendance_Leavedays(obj).subscribe(
        data => {
          debugger
        },
      )
    }


  }

  public dateRange(startDate: any, endDate: any, steps = 1) {
    const dateArray = [];
    let currentDate = new Date(startDate);

    while (currentDate <= new Date(endDate)) {
      dateArray.push(new Date(currentDate));
      // Use UTC date to prevent problems with time zones and DST
      currentDate.setUTCDate(currentDate.getUTCDate() + steps);
    }

    return dateArray;
  }



  public getdate() {
    debugger
    this.getstaffleaves(this.staffID, this.date, this.edate)
  }

  public ManagerLeaveDecline() {
    debugger
    this.showPopup = 0;

    var entity = {
      'ID': this.id,
      'LeaveReason': 'Rejected',
      'Status1': 'Rejected',
      'StartDate': this.sdte,
      'EndDate': this.edate,
    }
    this.DigiofficeService.UpdateStaffLeaves(entity)
      .subscribe({
        next: data => {
          debugger
          if (data != 0) {
            this.sendemail1();
            Swal.fire("Rejected Successfully");

            location.reload();

            this.loader = false;
          }
        }, error: (err) => {
          // Swal.fire('Issue in Updating Staff Leaves');
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

  public sendemail1() {

    var entity1 = {
      'FromUser': 'Admin',
      'emailto': this.EmployeeEmailID,
      'emailsubject': 'Leave Rejection Mail',
      'Message': 'Your Leave Request Reject Successfully !!',
      'emailbody': 'Hi  <br> Your Manager ' + this.ManagerName + ' has Rejected your Leave in Digi-Office.  <br><br>' + '<br>  <br> Thanks <br> Team Digi-Office',
      'attachmenturl': this.Attactments,
      'cclist': this.EmployeeEmailID,
      'bcclist': this.EmployeeEmailID,
    }
    this.DigiofficeService.sendemailattachementsforemail(entity1)
      .subscribe({
        next: data => {
          debugger
          this.Attactments = [];
          //Swal.fire('Password sent to your email.');
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Sending Attachments For Email');

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

  public getCheckbocdetails(evn: any, event: any) {
    debugger
    if (event.target.checked == true) {
      this.selecallbtn = true;
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

        debugger
        this.temp.forEach((val: { checked: boolean; }) => { val.checked = true });
        this.IntID = true;
        this.ID.push(evn.id);
        this.selecallbtn = false;
      }
    }

    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type == "checkbox") {
        if (inputs[i].checked == true) {
          this.selecallbtn = true;

        }
        // This way it won't flip flop them and will set them all to the same value which is passed into the function
      }
      else {
        this.selecallbtn = false;
      }
    }
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
            this.callenderdaysdount[currenteventlist[0].date - 1]['mantainenceHtml'] =
            // "<span class='event_PendingBookCommunity'> Leave ID : " + MaintainanceList[j].id +
            "<br>  Staff Name  :" + MaintainanceList[j].staffName + " <br> "
          // "<br>  Reason : " + MaintainanceList[j].leaveReason +
          "</span>";
        }
      }
    }
  }

  changeStatus1() {
    debugger;
    this.showorhidecontent = true;
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
    this.buildcallender(this.staffleaves1);
    this.buildcallender(this.staffleaves2);
    this.buildcallender(this.staffleaves3);
  }

  public nextmonth() {
    debugger;
    this.callenderBindData.setMonth(this.callenderBindData.getMonth() + 1);
    this.buildcallender(this.staffleaves1);
    this.buildcallender(this.staffleaves2);
    this.buildcallender(this.staffleaves3);
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

  public GetManagerlist() {
    debugger
    this.DigiofficeService.GetStaffByManagerID(localStorage.getItem('staffid'))
      .subscribe({
        next: data => {
          debugger
          let temp: any = data.filter(x => x.logintype == 2);
          Array.prototype.push.apply(this.managerlist, temp);
          console.log(temp);
          if (temp.length != 0) {
            for (let i = 0; i <= temp.length; i++) {
              this.DigiofficeService.GetStaffByManagerID(temp[i].id)
                .subscribe({
                  next: data => {
                    debugger
                    let temp1: any = data.filter(x => x.logintype == 2);
                    let temp4: any = [];
                    Array.prototype.push.apply(this.managerlist, temp1);
                    Array.prototype.push.apply(temp4, temp1);
                    temp1 = [];
                    console.log(this.managerlist);
                    if (temp4.length != 0) {
                      for (let i = 0; i <= temp4.length; i++) {
                        this.DigiofficeService.GetStaffByManagerID(temp4[i].id)
                          .subscribe({
                            next: data => {
                              debugger
                              let temp2: any = data.filter(x => x.logintype == 2);
                              Array.prototype.push.apply(this.managerlist, temp2);
                              temp2 = [];
                              console.log(this.managerlist);


                            }
                          })
                      }
                    }

                  }
                })
            }
          }
        }
      })
  }

  onItemSelect(item: any) {
    debugger
    console.log(item);
    this.selectedstaff.push(item.id);
    this.loader = false;
  }
  public selectedstaff: any = [];
  onItemDeSelect(item: any): void {
    debugger
    var index = this.selectedstaff.findIndex(function (o: any) {
      return o === item.id;
    })
    if (index !== -1) this.selectedstaff.splice(index, 1);

  }
  ManagerID: any;
  StaffID: any;
  stafflist: any;
  public getManagerID() {
    debugger
    this.DigiofficeService.GetStaffByManagerID(this.ManagerID)
      .subscribe({
        next: data => {
          debugger
          this.stafflist = data;
        }
      })
  }

  public getStaffID() {
    debugger
    this.getstaffleaves(this.StaffID, '2022-01-01', '2025-12-01');
  }

  public getEndDate(event: any) {
    this.showPopup = 0;
    this.startdate = this.datePipe.transform(event[0], 'yyyy-MM-dd');
    this.enddate = this.datePipe.transform(event[1], 'yyyy-MM-dd');

    this.loader = true;
    if (this.enddate == "") {
      this.ngOnInit();
    } else if (this.enddate < this.startdate) {
      /*   Swal.fire('Endtime Must Be Lesser Than Start Date') */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 29;
    }
    else if (this.startdate == "" || this.startdate == undefined) {
      /*   Swal.fire('Please Select Start Date First') */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 28;

    }
    else {
      this.DigiofficeService.GetApprovedStaffLeavesByStaffID(localStorage.getItem('staffid'), 1, this.startdate, this.enddate)
        .subscribe({
          next: data => {
            debugger
            this.staffleaves1 = data;
            this.buildcallender(this.staffleaves1);
            this.loader = false;
          }, error: (err) => {
            // Swal.fire('Issue in Getting Approved Staff Leaves By StaffID');
            this.loader = false;
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
      this.DigiofficeService.GetPendingStaffLeavesByStaffID(localStorage.getItem('staffid'), 1, this.startdate, this.enddate)
        .subscribe({
          next: data => {
            debugger
            this.staffleaves2 = data;
            this.buildcallender(this.staffleaves2);
            this.loader = false;
          }, error: (err) => {
            // Swal.fire('Issue in Getting Pending Staff Leaves By StaffID');
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
      this.DigiofficeService.GetRejectedStaffLeavesByStaffID(localStorage.getItem('staffid'), 1, this.startdate, this.enddate)
        .subscribe({
          next: data => {
            debugger
            this.staffleaves3 = data;
            this.loader = false;
            this.buildcallender(this.staffleaves3);
          }, error: (err) => {
            // Swal.fire('Issue in Getting Rejected Staff Leaves By StaffID');
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