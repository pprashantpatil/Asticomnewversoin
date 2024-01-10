import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-new-leave-request',
  templateUrl: './new-leave-request.component.html',
  styleUrls: ['./new-leave-request.component.css'],
})
export class NewLeaveRequestComponent implements OnInit {
  constructor(
    public DigiofficeService: DigiofficecorehrService,
    public router: Router,
    public dialogRef: MatDialogRef<NewLeaveRequestComponent>,
    @Inject(MAT_DIALOG_DATA) public ID: any
  ) {}
  LeaveType: any;
  CoveringStaff: any;
  Staffleaveenitilment: any;
  staffid: any;
  Touser: any;
  halfDayType: any;
  roleid: any;
  HalfDayBit: any;
  maxdate: any;
  managerlist: any = [];

  hidesavebtn: any;
  currentUrl: any;
  LeaveTypeList: any;
  public newLeaveTypeList: any = [];
  SDateOfLeave: any;
  EDateOfLeave: any;
  LeaveReason: any;
  leaveconfig: any;
  lopdays: any;
  autoApproval: any;
  loader: any;
  public attachments21: any = [];
  public attachments: any = [];
  public attachmentsurl: any = [];
  screenShot: any = [];
  files: File[] = [];
  showPopup: number = 0;
  messageId: number = 0;
  jdate: any;
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.LeaveType = '';
    this.HalfDayBit = false;
    this.hidesavebtn = 0;
    this.jdate = localStorage.getItem('jdate');
    this.roleid = sessionStorage.getItem('roledid');
    this.staffid = localStorage.getItem('staffid');
    this.UserName = localStorage.getItem('UserName');
    this.maxdate = new Date().toISOString().split('T')[0];
    this.GetLeaveType();
    //this.GetManagerlist();
    this.GetMyDetailsByStaffID();
  }
  manageremailid: any;
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

  public Save() {
    this.showPopup = 0;
    debugger;
    if (this.EDateOfLeave < this.SDateOfLeave) {
      /*  Swal.fire('End Date should be greater than Start Date'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 29;
    } else if (
      this.LeaveReason == undefined ||
      this.SDateOfLeave == undefined ||
      this.EDateOfLeave == undefined ||
      this.CoveringStaff == undefined ||
      this.CoveringStaff == '' ||
      this.LeaveReason == '' ||
      this.SDateOfLeave == null ||
      this.EDateOfLeave == null ||
      this.SDateOfLeave == '' ||
      this.EDateOfLeave == '' ||
      this.LeaveType == '' ||
      this.LeaveType == undefined ||
      this.LeaveReason == null ||
      this.CoveringStaff == null ||
      this.LeaveType == null
    ) {
      /*  Swal.fire('Please Fill All The Mandatory Fields'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 7;
    } else {
      this.InserStaffLeave();
    }
  }

  public GetLeaveType() {
    debugger;
    this.DigiofficeService.GetLeaveType().subscribe({
      next: (data) => {
        debugger;
        this.LeaveTypeList = data;
        this.loader = false;
        for (let i = 0; i < this.LeaveTypeList.length; i++) {
          debugger;
          if (this.LeaveTypeList[i].id == 10041) {
            this.DigiofficeService.GetMyDetailsByStaffID(
              localStorage.getItem('staffid')
            ).subscribe({
              next: (data) => {
                debugger;
                let temp: any = data;
                if (
                  temp[0].vacation_LeaveEntitlement -
                    temp[0].vacation_LeaveBalance <=
                  0
                ) {
                } else {
                  var obj: any = {};
                  obj['id'] = this.LeaveTypeList[i].id;
                  obj['short'] = this.LeaveTypeList[i].short;
                  this.newLeaveTypeList.push(obj);
                  this.loader = false;
                }
              },
              error: (err) => {
                // Swal.fire('Issue in Getting Staff Details');
                // Insert error in Db Here//
                var obj = {
                  PageName: this.currentUrl,
                  ErrorMessage: err.error.message,
                };
                this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                  (data) => {
                    debugger;
                  }
                );
              },
            });
          } else if (this.LeaveTypeList[i].id == 10042) {
            this.DigiofficeService.GetMyDetailsByStaffID(
              localStorage.getItem('staffid')
            ).subscribe({
              next: (data) => {
                debugger;
                let temp: any = data;
                if (
                  temp[0].sick_LeaveEntitlement - temp[0].sick_LeaveBalance <=
                  0
                ) {
                  this.loader = false;
                } else {
                  var obj: any = {};
                  obj['id'] = this.LeaveTypeList[i].id;
                  obj['short'] = this.LeaveTypeList[i].short;
                  this.newLeaveTypeList.push(obj);
                  this.loader = false;
                }
              },
              error: (err) => {
                // Swal.fire('Issue in Getting Staff Details');
                // Insert error in Db Here//
                var obj = {
                  PageName: this.currentUrl,
                  ErrorMessage: err.error.message,
                };
                this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                  (data) => {
                    debugger;
                  }
                );
              },
            });
          } else if (this.LeaveTypeList[i].id == 10043) {
            debugger;
            this.DigiofficeService.GetMyDetailsByStaffID(
              localStorage.getItem('staffid')
            ).subscribe({
              next: (data) => {
                debugger;
                let temp: any = data;
                if (
                  temp[0].service_Incentive_LeaveEntitlement -
                    temp[0].service_Incentive_LeaveBalance <=
                  0
                ) {
                  this.loader = false;
                } else if (temp[0].awardname == 'No Award') {
                  this.loader = false;
                } else {
                  var obj: any = {};
                  obj['id'] = this.LeaveTypeList[i].id;
                  obj['short'] = this.LeaveTypeList[i].short;
                  this.newLeaveTypeList.push(obj);
                  this.loader = false;
                }
              },
              error: (err) => {
                // Swal.fire('Issue in Getting Staff Details');
                // Insert error in Db Here//
                var obj = {
                  PageName: this.currentUrl,
                  ErrorMessage: err.error.message,
                };
                this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                  (data) => {
                    debugger;
                  }
                );
              },
            });
          } else if (this.LeaveTypeList[i].id == 10044) {
            debugger;
            this.DigiofficeService.GetMyDetailsByStaffID(
              localStorage.getItem('staffid')
            ).subscribe({
              next: (data) => {
                debugger;
                let temp: any = data;
                if (
                  temp[0].leave_with_PayEntitlement -
                    temp[0].leave_with_PayBalance <=
                    0 ||
                  temp[0].awardname == 'No Award'
                ) {
                  this.loader = false;
                } else {
                  var obj: any = {};
                  obj['id'] = this.LeaveTypeList[i].id;
                  obj['short'] = this.LeaveTypeList[i].short;
                  this.newLeaveTypeList.push(obj);
                  this.loader = false;
                }
              },
              error: (err) => {
                // Swal.fire('Issue in Getting Staff Details');
                // Insert error in Db Here//
                var obj = {
                  PageName: this.currentUrl,
                  ErrorMessage: err.error.message,
                };
                this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                  (data) => {
                    debugger;
                  }
                );
              },
            });
          } else if (this.LeaveTypeList[i].id == 10047) {
            debugger;
            this.DigiofficeService.GetMyDetailsByStaffID(
              localStorage.getItem('staffid')
            ).subscribe({
              next: (data) => {
                debugger;
                let temp: any = data;
                if (
                  temp[0].gender == 'Female' &&
                  temp[0].maternitityLeaveEntitlement -
                    temp[0].maternitityLeaveBalance >
                    0
                ) {
                  var obj: any = {};
                  obj['id'] = this.LeaveTypeList[i].id;
                  obj['short'] = this.LeaveTypeList[i].short;
                  this.newLeaveTypeList.push(obj);
                  this.loader = false;
                } else {
                }
              },
              error: (err) => {
                // Swal.fire('Issue in Getting Staff Details');
                // Insert error in Db Here//
                var obj = {
                  PageName: this.currentUrl,
                  ErrorMessage: err.error.message,
                };
                this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                  (data) => {
                    debugger;
                  }
                );
              },
            });
          } else if (this.LeaveTypeList[i].id == 10048) {
            debugger;
            this.DigiofficeService.GetMyDetailsByStaffID(
              localStorage.getItem('staffid')
            ).subscribe({
              next: (data) => {
                debugger;
                let temp: any = data;
                if (
                  temp[0].gender == 'Male' &&
                  temp[0].paternitityLeaveEntitlement -
                    temp[0].paternitityLeaveBalance >
                    0
                ) {
                  var obj: any = {};
                  obj['id'] = this.LeaveTypeList[i].id;
                  obj['short'] = this.LeaveTypeList[i].short;
                  this.newLeaveTypeList.push(obj);
                  this.loader = false;
                } else {
                }
              },
              error: (err) => {
                // Swal.fire('Issue in Getting My Details By Staff ID');
                // Insert error in Db Here//
                var obj = {
                  PageName: this.currentUrl,
                  ErrorMessage: err.error.message,
                };
                this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                  (data) => {
                    debugger;
                  }
                );
              },
            });
          } else if (this.LeaveTypeList[i].id == 10049) {
            debugger;
            this.DigiofficeService.GetMyDetailsByStaffID(
              localStorage.getItem('staffid')
            ).subscribe({
              next: (data) => {
                debugger;
                let temp: any = data;
                if (temp[0].is_Solo_Parent == 1) {
                  var obj: any = {};
                  obj['id'] = this.LeaveTypeList[i].id;
                  obj['short'] = this.LeaveTypeList[i].short;
                  this.newLeaveTypeList.push(obj);
                  this.loader = false;
                } else {
                }
              },
              error: (err) => {
                // Swal.fire('Issue in Getting My Details By Staff ID');
                // Insert error in Db Here//
                var obj = {
                  PageName: this.currentUrl,
                  ErrorMessage: err.error.message,
                };
                this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                  (data) => {
                    debugger;
                  }
                );
              },
            });
          } else {
            var obj: any = {};
            obj['id'] = this.LeaveTypeList[i].id;
            obj['short'] = this.LeaveTypeList[i].short;
            this.newLeaveTypeList.push(obj);
            this.loader = false;
          }
        }
      },
      error: (err) => {
        // Swal.fire('Issue in Getting Leave Type');
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

  public CheckLeave() {
    this.showPopup = 0;
    debugger;
    this.hidesavebtn = false;
    if (this.LeaveType == 10041) {
      this.DigiofficeService.GetMyDetails().subscribe({
        next: (data) => {
          debugger;
          let temp: any = data.filter(
            (x) => x.id == localStorage.getItem('staffid')
          );
          if (
            temp[0].vacation_LeaveEntitlement - temp[0].vacation_LeaveBalance <=
            0
          ) {
            /*  Swal.fire('You Dont have Vacation Leave'); */
            this.hidesavebtn = true;
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 94;
          }
        },
        error: (err) => {
          // Swal.fire('Issue in Getting My Details');
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
    } else if (this.LeaveType == 10042) {
      this.DigiofficeService.GetMyDetails().subscribe({
        next: (data) => {
          debugger;
          let temp: any = data.filter(
            (x) => x.id == localStorage.getItem('staffid')
          );
          if (temp[0].sick_LeaveEntitlement - temp[0].sick_LeaveBalance <= 0) {
            /*     Swal.fire('You Dont have Sick Leave'); */
            this.hidesavebtn = true;
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 95;
          }
        },
        error: (err) => {
          // Swal.fire('Issue in Getting My Details');
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
    } else if (this.LeaveType == 10043) {
      debugger;
      this.DigiofficeService.GetMyDetails().subscribe({
        next: (data) => {
          debugger;
          let temp: any = data.filter(
            (x) => x.id == localStorage.getItem('staffid')
          );
          if (
            temp[0].service_Incentive_LeaveEntitlement -
              temp[0].service_Incentive_LeaveBalance <=
            0
          ) {
            /*  Swal.fire('You Dont have Service Incentive Leave'); */
            this.hidesavebtn = true;
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 96;
          }
          if (temp[0].awardname == 'No Award') {
            /*   Swal.fire('You Can not Apply Service Incentive Leave as You have not Serviced 1 Year'); */
            this.hidesavebtn = true;
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 48;
          }
        },
        error: (err) => {
          // Swal.fire('Issue in Getting My Details');
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
    } else if (this.LeaveType == 10044) {
      debugger;
      this.DigiofficeService.GetMyDetails().subscribe({
        next: (data) => {
          debugger;
          let temp: any = data.filter(
            (x) => x.id == localStorage.getItem('staffid')
          );
          if (
            temp[0].leave_with_PayEntitlement - temp[0].leave_with_PayBalance <=
              0 &&
            temp[0].awardname != 'No Award'
          ) {
            /*   Swal.fire('You Dont have Leave with Pay'); */
            this.hidesavebtn = true;
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 97;
          }
        },
        error: (err) => {
          // Swal.fire('Issue in Getting My Details');
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
    } else if (this.LeaveType == 10047) {
      debugger;
      this.DigiofficeService.GetMyDetails().subscribe({
        next: (data) => {
          debugger;
          let temp: any = data.filter(
            (x) => x.id == localStorage.getItem('staffid')
          );
          if (temp[0].gender == 'Male' || temp[0].status == 'Single') {
            /*   Swal.fire('You Can not Apply Maternity Leave'); */
            this.hidesavebtn = true;
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 49;
          }
          if (
            temp[0].maternitityLeaveEntitlement -
              temp[0].maternitityLeaveBalance <=
            0
          ) {
            /*  Swal.fire('You Dont have Maternity Leave'); */
            this.hidesavebtn = true;
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 98;
          }
        },
        error: (err) => {
          // Swal.fire('Issue in Getting My Details');
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
    } else if (this.LeaveType == 10048) {
      debugger;
      this.DigiofficeService.GetMyDetails().subscribe({
        next: (data) => {
          debugger;
          let temp: any = data.filter(
            (x) => x.id == localStorage.getItem('staffid')
          );
          if (temp[0].gender == 'Female' || temp[0].status == 'Single') {
            /*     Swal.fire('You Can not Apply Paternity Leave'); */
            this.hidesavebtn = true;
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 50;
          }
          if (
            temp[0].paternitityLeaveEntitlement -
              temp[0].paternitityLeaveBalance <=
            0
          ) {
            /*   Swal.fire('You Dont have Paternity Leave'); */
            this.hidesavebtn = true;
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 99;
          }
        },
        error: (err) => {
          // Swal.fire('Issue in Getting My Details');
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
  }

  public formatDate(date: any) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  public calcBusinessDays(dDate1: any, dDate2: any) {
    debugger;
    if (new Date(dDate1) == new Date(dDate2)) {
      return 1;
    } else {
      let elapsed;
      let daysBeforeFirstSaturday;
      let daysBeforeFirstSunday;
      let daysAfterLastSunday;
      var ifThen = function (a: number, b: number, c: number) {
        return a == b ? c : a;
      };

      elapsed = dDate2 - dDate1;
      elapsed /= 86400000;

      daysBeforeFirstSunday = (7 - dDate1.getDay()) % 7;
      daysAfterLastSunday = dDate2.getDay();

      elapsed -= daysBeforeFirstSunday + daysAfterLastSunday;
      elapsed = (elapsed / 7) * 5;
      elapsed +=
        ifThen(daysBeforeFirstSunday - 1, -1, 0) +
        ifThen(daysAfterLastSunday, 6, 5);

      return Math.ceil(elapsed);
    }
  }
  totalleavesilldate: any;
  leaveaready: any;

  public InserStaffLeave() {
    debugger;
    this.showPopup = 0;
    const date1: any = new Date(this.SDateOfLeave);
    const date2: any = new Date(this.EDateOfLeave);
    const diffTime = Math.abs(date2 - date1);
    //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    if (date1.getTime() == date2.getTime()) {
      var diffDays = 1;
    } else {
      var diffDays = this.calcBusinessDays(date1, date2);
    }
    this.DigiofficeService.GetLeaveConfiguration().subscribe({
      next: (data) => {
        debugger;
        this.leaveconfig = data.filter(
          (x: { leaveCategory: any }) => x.leaveCategory == this.LeaveType
        );
        if (this.leaveconfig.length == 0) {
          /*    Swal.fire('Please Set Configuration for this Leave Type'); */
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 51;
        } else {
          let monthlyLimit = this.leaveconfig[0].monthlyLimit;
          var date = new Date();
          var currentmonthno = date.getMonth() + 1;
          let yearlyLimit = this.leaveconfig[0].yearlyLimit;
          var totaleaveentiletment: number = yearlyLimit;
          this.DigiofficeService.GetMyDetailsByStaffID(
            localStorage.getItem('staffid')
          ).subscribe({
            next: (data) => {
              debugger;
              let temp: any = data;
              if (this.LeaveType == 10041) {
                this.totalleavesilldate = temp[0].vacation_LeaveBalance;
              } else if (this.LeaveType == 10042) {
                this.totalleavesilldate = temp[0].sick_LeaveBalance;
              } else if (this.LeaveType == 10043) {
                this.totalleavesilldate =
                  temp[0].service_Incentive_LeaveBalance;
              } else if (this.LeaveType == 10044) {
                this.totalleavesilldate = temp[0].leave_with_PayBalance;
              } else if (this.LeaveType == 10045) {
                this.totalleavesilldate = temp[0].leave_without_PaySLBalance;
              } else if (this.LeaveType == 10046) {
                this.totalleavesilldate = temp[0].leave_without_PayVLBalance;
              } else if (this.LeaveType == 10047) {
                this.totalleavesilldate = temp[0].maternitityLeaveBalance;
              } else if (this.LeaveType == 10048) {
                this.totalleavesilldate = temp[0].paternitityLeaveBalance;
              } else if (this.LeaveType == 10049) {
                this.totalleavesilldate = temp[0].solo_Parent_LeaveBalance;
              }
              // let total: any = 0;
              // temp.forEach((element: { noOfDays: any; }) => {
              //   total += Number(element.noOfDays);
              // });

              if (this.totalleavesilldate >= yearlyLimit) {
                Swal.fire(
                  'Yearly Quota Completd for this Leave Type. Please Apply LWOP'
                );
                this.loader = false;
                this.hidesavebtn = true;
                // this.showPopup = 1;
                // this.messageId = 100;
              }
              var totalvailbeltilltoday =
                totaleaveentiletment - this.totalleavesilldate;
              var totalvailbeltilltoday =
                totalvailbeltilltoday < 0 ? 0 : totalvailbeltilltoday;

              if (totalvailbeltilltoday < diffDays) {
                Swal.fire(
                  'Applied Days are more than Available Leave Days. Please Apply LWOP'
                );
                this.loader = false;
                this.hidesavebtn = true;
              } else {
                if (this.LeaveType == 10045 || this.LeaveType == 10046) {
                  this.lopdays = diffDays;
                  this.loader = false;
                } else {
                  if (diffDays > totalvailbeltilltoday) {
                    this.lopdays = diffDays - totalvailbeltilltoday;
                  } else {
                    this.lopdays = 0;
                  }
                }
                if (this.HalfDayBit == true) {
                  diffDays = diffDays > 0 ? diffDays - 0.5 : 0;
                  this.lopdays = this.lopdays > 0 ? this.lopdays - 0.5 : 0;
                } else {
                  if (this.lopdays > 0) {
                    this.lopdays = this.lopdays;
                  } else {
                    this.lopdays = 0;
                  }
                }
                Swal.fire({
                  title: '<strong><u>Details</u></strong>',
                  type: 'info',
                  html:
                    '<p style="font-size: 24px;text-align: start;margin-left: 135px;"> Yearly Limit   : ' +
                    yearlyLimit +
                    '       <br>' +
                    'Used Till Date: ' +
                    this.totalleavesilldate +
                    '       <br>' +
                    'Available Till Date: ' +
                    totalvailbeltilltoday +
                    '       <br>' +
                    'Applied Days: ' +
                    diffDays +
                    '       <br>' +
                    'LWOP Day: ' +
                    this.lopdays +
                    '       <br>' +
                    '</p>',
                  showCloseButton: true,
                  showCancelButton: true,
                  focusConfirm: true,
                }).then((result) => {
                  debugger;
                  if (result.value == true) {
                    this.DigiofficeService.GetStaffLeaves(
                      localStorage.getItem('staffid'),
                      1,
                      '01-02-2022',
                      '01-02-2099'
                    ).subscribe({
                      next: (data) => {
                        debugger;
                        let temp: any = data.filter(
                          (x) =>
                            x.staffID == localStorage.getItem('staffid') &&
                            (x.status == 'Manager Approved' ||
                              x.status == 'Manager Pending')
                        );
                        for (let i = 0; i < temp.length; i++) {
                          if (
                            temp[i].filterdate <= this.SDateOfLeave &&
                            temp[i].filterdate1 >= this.SDateOfLeave
                          ) {
                            this.leaveaready = 1;
                          } else {
                            this.leaveaready = 0;
                          }
                        }

                        if (this.leaveaready == 1) {
                          /*   Swal.fire('Already Leave is applied on this day.'); */
                          this.loader = false;
                          this.showPopup = 1;
                          this.messageId = 52;
                        } else {
                          var eb = {
                            Building: 56,
                            StaffName: localStorage.getItem('staffid'),
                            SDateOfLeave: this.SDateOfLeave,
                            EDateOfLeave: this.EDateOfLeave,
                            NoOfDays: this.lopdays,
                            LeaveReason: this.LeaveReason,
                            LeaveType: this.LeaveType,
                            HalfDayBit: this.HalfDayBit,
                            PaidBit: 1,
                            Supervisor: 10331,
                            CoveringStaff: this.CoveringStaff,
                            AMPMText: this.halfDayType,
                            MedicalUrl1: this.attachmentsurl[0],
                            Status: 'Manager Pending',
                          };
                          this.DigiofficeService.InsertStaffLeavesWeb(
                            eb
                          ).subscribe({
                            next: (data) => {
                              debugger;
                              /*  Swal.fire('Saved successfully.'); */

                              this.leaveID = data;
                              this.InsertNotification();
                              this.InsertPushNotification();
                              this.uploadmultipleimages();
                              this.sendemail();

                              this.loader = false;
                              this.showPopup = 1;
                              this.messageId = 8;
                            },
                            error: (err) => {
                              // Swal.fire('Issue in Inserting Staff Leaves Web');
                              // Insert error in Db Here//
                              var obj = {
                                PageName: this.currentUrl,
                                ErrorMessage: err.error.message,
                              };
                              this.DigiofficeService.InsertExceptionLogs(
                                obj
                              ).subscribe((data) => {
                                debugger;
                              });
                            },
                          });
                        }
                        this.loader = false;
                      },
                      error: (err) => {
                        // Swal.fire('Issue in Getting Staff Details');
                        // Insert error in Db Here//
                        var obj = {
                          PageName: this.currentUrl,
                          ErrorMessage: err.error.message,
                        };
                        this.DigiofficeService.InsertExceptionLogs(
                          obj
                        ).subscribe((data) => {
                          debugger;
                        });
                      },
                    });
                  }
                });
              }
              //   var lopdays = diffDays - totalvailbeltilltoday;
            },
            error: (err) => {
              // Swal.fire('Issue in Getting Staff Leaves');
              // Insert error in Db Here//
              var obj = {
                PageName: this.currentUrl,
                ErrorMessage: err.error.message,
              };
              this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                (data) => {
                  debugger;
                }
              );
            },
          });
        }
      },
      error: (err) => {
        // Swal.fire('Issue in Getting Leave Configuration');
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
  leaveID: any;
  public uploadmultipleimages() {
    debugger;
    for (let i = 0; i < this.attachmentsurl.length; i++) {
      var entity = {
        Attachment: this.attachmentsurl[i],
        LeaveID: this.leaveID,
      };
      this.DigiofficeService.InsertStaffLeavesAttachment(entity).subscribe(
        (data) => {
          this.loader = false;
        }
      );
    }
  }

  public InsertNotification() {
    this.showPopup = 0;
    debugger;
    var entity = {
      Date: new Date(),
      Event: 'Leave Request',
      FromUser: 'Admin',
      ToUser: localStorage.getItem('staffid'),
      Message: 'You have got new Leave Request to Approve !!',
      Photo: 'Null',
      Building: 'Dynamics 1',
      UserID: this.Touser,
      NotificationTypeID: 3,
      VendorID: 1,
    };
    this.DigiofficeService.InsertNotification(entity).subscribe({
      next: (data) => {
        debugger;
        if (data != 0) {
          /*  Swal.fire("Saved Successfully"); */
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 8;
          this.loader = false;
          this.Cancel();
        }
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
  deviceid: any;
  public InsertPushNotification() {
    this.DigiofficeService.pushnotificationtomobile(
      localStorage.getItem('StaffID'),
      'Leave',
      'Leave'
    );
  }
  email: any;
  Attactments: any = [];
  UserName: any;
  public sendemail() {
    var entity1 = {
      FromUser: 'Admin',
      emailto: this.manageremailid,
      emailsubject: 'Leave Request',
      Message: 'Your Leave Request Sent Successfully !!',
      emailbody:
        'Hi  <br> Your Employee ' +
        this.UserName +
        ' has Applied leave in Digi-Office., <br> Please Login in DigiOffice to Approve. <br><br>' +
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
  public Cancel() {
    debugger;
    this.dialogRef.close(false);
    this.router.navigate(['/Employee/LeaveRequestDash']);
    this.loader = false;
  }

  onRemove21(event: any) {
    debugger;
    console.log(event);
    this.attachments21.splice(this.attachments.indexOf(event), 1);
    this.attachments21 = [];
  }

  onSelect21(event: any) {
    this.showPopup = 0;
    debugger;
    console.log(event);
    if (event.addedFiles[0].size / 1048576 > 2) {
      /*   Swal.fire('Please Upload File Less than 2 MB.') */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 14;
    } else {
      this.attachments21 = [];
      this.attachments21.push(...event.addedFiles);

      for (let i = 0; i < this.attachments21.length; i++) {
        this.DigiofficeService.UploadmultipleProjectAttachments(
          this.attachments21[i]
        ).subscribe({
          next: (data) => {
            debugger;
            if (data != undefined) {
              this.attachmentsurl.push(data);
              this.loader = false;
            }
          },
          error: (err) => {
            // Swal.fire('Issue in Inserting Project Attachments');
            this.loader = false;
            // Insert error in Db Here//
            var obj = {
              PageName: this.currentUrl,
              ErrorMessage: err.error.message,
            };
            this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
              (data) => {
                debugger;
              }
            );
          },
        });
      }
    }
  }
  totaldays: any;
  public Getenddate() {
    this.showPopup = 0;
    debugger;
    this.hidesavebtn = false;
    const date1: any = new Date(this.SDateOfLeave);
    const date2: any = new Date(this.EDateOfLeave);
    const diffTime = Math.abs(date2 - date1);
    //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    if (new Date(this.jdate) > new Date(this.SDateOfLeave)) {
      this.loader = false;
      this.hidesavebtn = true;
      Swal.fire('Sorry, Leave Date is prior the New Hire Date');
    }
    if (date1.getTime() == date2.getTime()) {
      this.totaldays = 1;
    } else {
      this.totaldays = this.calcBusinessDays(date1, date2);
    }

    this.DigiofficeService.GetHolidaybit(
      this.SDateOfLeave,
      this.staffid
    ).subscribe((data1) => {
      let temp1: any = data1.filter((x) => (x.filterdate = this.SDateOfLeave));
      if (
        temp1[0].legalHoliday > 0 ||
        temp1[0].restday > 0 ||
        temp1[0].specialHoliday > 0
      ) {
        /*  Swal.fire('Sorry, You Can not Apply Leave on Holiday or Off Days'); */
        this.loader = false;
        this.showPopup = 1;
        this.messageId = 101;
      }
    });
  }

  public GetManagerlist() {
    debugger;
    this.DigiofficeService.GetStaffByManagerID(
      localStorage.getItem('staffid')
    ).subscribe({
      next: (data) => {
        debugger;
        let temp: any = data.filter((x) => x.logintype == 2);
        Array.prototype.push.apply(this.managerlist, temp);
        console.log(temp);
        if (temp.length != 0) {
          for (let i = 0; i <= temp.length; i++) {
            this.DigiofficeService.GetStaffByManagerID(temp[i].id).subscribe({
              next: (data) => {
                debugger;
                let temp1: any = data.filter((x) => x.logintype == 2);
                Array.prototype.push.apply(this.managerlist, temp1);
                temp1 = [];
                console.log(this.managerlist);
              },
            });
          }
        }
      },
    });
  }
}
