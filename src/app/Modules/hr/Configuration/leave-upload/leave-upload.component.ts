import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';

@Component({
  selector: 'app-leave-upload',
  templateUrl: './leave-upload.component.html',
  styleUrls: ['./leave-upload.component.css']
})
export class LeaveUploadComponent implements OnInit {

  constructor(private DigipayrollServiceService: DigiofficecorehrService, private ActivatedRoute: ActivatedRoute, private datepipe: DatePipe) { }
  ID: any;
  leavelist: any;
  Short: any;
  Description: any;
  RoleTypeList: any;
  EmployeeId: any;
  EmployeeName: any;
  FirstDoseDate: any;
  VaccinationName: any;
  SecondDoseDate: any;
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  Department: any;
  Departmentlist: any;

  public LeaveType: any
  selectedItems1: any = [];
  dropdownSettings1: any = {};
  dropdownSettings2: any = {};
  result: any;
  AutoApproval: any;
  ManualApply: any;
  startdate: any;
  enddate: any;
  SigninDate: any;
  SignoutDate: any;
  UserID: any
  currentUrl: any;
  public attachments21: any = [];
  public attachments: any = [];
  alldates: any;
  ipaddress: any
  public attachmentsurl: any = [];
  loader: any;
  starttime: any;
  endtime: any;
  holidaylist: any;
  Holiday: any
  HolidayDescription: any;
  HolidayDate: any;
  Attachment: any;
  LeaveTypeList: any;
  RoleID: any
  uniquelist: any
  dropdownList2: any;
  dropdownList3: any;

  dropdownRoleList: any = [];

  dropdownDeptList: any = [];
  deptselectedItems: any = [];
  deptdropdownSettings: any = {};
  LeaveTaken: any;
  LeaveEntitlement: any;
  Stafflist: any;
  roledid: any;
  StaffID: any;
  public newLeaveTypeList: any = [];
  public selectedstaff: any = [];
  showPopup: number = 0;
  messageId: number = 0;
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.LeaveType = "";
    this.RoleID = "";
    this.Department = "";
    this.StaffID = localStorage.getItem('staffid');
    this.roledid = localStorage.getItem('roledid');
    this.GetLeaveType();
    this.GetStaff();
    this.ActivatedRouterCall();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name1',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      enableCheckAll:false
    };
    this.dropdownSettings1 = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
    };

    this.dropdownSettings2 = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
    };

    this.deptdropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'department_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
    };

  }

  public GetStaff() {
    debugger
    this.DigipayrollServiceService.GetAllStaffNew()
      .subscribe({
        next: data => {
          debugger

          this.Stafflist = data;
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting My Details');
          this.loader = false;
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }

  // public GetLeaveType() {
  //   debugger
  //   this.DigipayrollServiceService.GetLeaveType()
  //     .subscribe({
  //       next: data => {
  //         debugger
  //         this.LeaveTypeList = data;
  //         this.loader = false;
  //         for (let i = 0; i < this.LeaveTypeList.length; i++) {
  //           debugger
  //           if (this.LeaveTypeList[i].id == 10041) {
  //             this.DigipayrollServiceService.GetMyDetailsByStaffID(localStorage.getItem('staffid'))
  //               .subscribe({
  //                 next: data => {
  //                   debugger
  //                   let temp: any = data;
  //                   if ((temp[0].vacation_LeaveEntitlement - temp[0].vacation_LeaveBalance) <= 0) {
  //                   } else {
  //                     var obj: any = {};
  //                     obj["id"] = this.LeaveTypeList[i].id;
  //                     obj["short"] = this.LeaveTypeList[i].short;
  //                     this.newLeaveTypeList.push(obj);
  //                     this.loader = false;
  //                   }
  //                 }, error: (err) => {
  //                   Swal.fire('Issue in Getting Staff Details');
  //                   // Insert error in Db Here//
  //                   var obj = {
  //                     'PageName': this.currentUrl,
  //                     'ErrorMessage': err.error.message
  //                   }
  //                   this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
  //                     data => {
  //                       debugger
  //                     },
  //                   )
  //                 }
  //               })
  //           }
  //           else if (this.LeaveTypeList[i].id == 10042) {
  //             this.DigipayrollServiceService.GetMyDetailsByStaffID(localStorage.getItem('staffid'))
  //               .subscribe({
  //                 next: data => {
  //                   debugger
  //                   let temp: any = data;
  //                   if (temp[0].sick_LeaveEntitlement - temp[0].sick_LeaveBalance <= 0) {
  //                     this.loader = false;
  //                   } else {
  //                     var obj: any = {};
  //                     obj["id"] = this.LeaveTypeList[i].id;
  //                     obj["short"] = this.LeaveTypeList[i].short;
  //                     this.newLeaveTypeList.push(obj);
  //                     this.loader = false;
  //                   }
  //                 }, error: (err) => {
  //                   Swal.fire('Issue in Getting Staff Details');
  //                   // Insert error in Db Here//
  //                   var obj = {
  //                     'PageName': this.currentUrl,
  //                     'ErrorMessage': err.error.message
  //                   }
  //                   this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
  //                     data => {
  //                       debugger
  //                     },
  //                   )
  //                 }
  //               })
  //           }
  //           else if (this.LeaveTypeList[i].id == 10043) {
  //             debugger
  //             this.DigipayrollServiceService.GetMyDetailsByStaffID(localStorage.getItem('staffid'))
  //               .subscribe({
  //                 next: data => {
  //                   debugger
  //                   let temp: any = data;
  //                   if (temp[0].service_Incentive_LeaveEntitlement - temp[0].service_Incentive_LeaveBalance <= 0) {
  //                     this.loader = false;
  //                   }
  //                   else if (temp[0].awardname == 'No Award') {
  //                     this.loader = false;
  //                   }
  //                   else {
  //                     var obj: any = {};
  //                     obj["id"] = this.LeaveTypeList[i].id;
  //                     obj["short"] = this.LeaveTypeList[i].short;
  //                     this.newLeaveTypeList.push(obj);
  //                     this.loader = false;
  //                   }
  //                 }, error: (err) => {
  //                   Swal.fire('Issue in Getting Staff Details');
  //                   // Insert error in Db Here//
  //                   var obj = {
  //                     'PageName': this.currentUrl,
  //                     'ErrorMessage': err.error.message
  //                   }
  //                   this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
  //                     data => {
  //                       debugger
  //                     },
  //                   )
  //                 }
  //               })
  //           }

  //           else if (this.LeaveTypeList[i].id == 10044) {
  //             debugger
  //             this.DigipayrollServiceService.GetMyDetailsByStaffID(localStorage.getItem('staffid'))
  //               .subscribe({
  //                 next: data => {
  //                   debugger
  //                   let temp: any = data;
  //                   if ((temp[0].leave_with_PayEntitlement - temp[0].leave_with_PayBalance <= 0) || temp[0].awardname == 'No Award') {
  //                     this.loader = false;
  //                   } else {
  //                     var obj: any = {};
  //                     obj["id"] = this.LeaveTypeList[i].id;
  //                     obj["short"] = this.LeaveTypeList[i].short;
  //                     this.newLeaveTypeList.push(obj);
  //                     this.loader = false;
  //                   }
  //                 }, error: (err) => {
  //                   Swal.fire('Issue in Getting Staff Details');
  //                   // Insert error in Db Here//
  //                   var obj = {
  //                     'PageName': this.currentUrl,
  //                     'ErrorMessage': err.error.message
  //                   }
  //                   this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
  //                     data => {
  //                       debugger
  //                     },
  //                   )
  //                 }
  //               })
  //           }
  //           else if (this.LeaveTypeList[i].id == 10047) {
  //             debugger
  //             this.DigipayrollServiceService.GetMyDetailsByStaffID(localStorage.getItem('staffid'))
  //               .subscribe({
  //                 next: data => {
  //                   debugger
  //                   let temp: any = data;
  //                   if (temp[0].gender == 'Female' && temp[0].status == 'Married' && temp[0].maternitityLeaveEntitlement - temp[0].maternitityLeaveBalance > 0) {
  //                     var obj: any = {};
  //                     obj["id"] = this.LeaveTypeList[i].id;
  //                     obj["short"] = this.LeaveTypeList[i].short;
  //                     this.newLeaveTypeList.push(obj);
  //                     this.loader = false;
  //                   }
  //                   else {
  //                   }
  //                 }, error: (err) => {
  //                   Swal.fire('Issue in Getting Staff Details');
  //                   // Insert error in Db Here//
  //                   var obj = {
  //                     'PageName': this.currentUrl,
  //                     'ErrorMessage': err.error.message
  //                   }
  //                   this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
  //                     data => {
  //                       debugger
  //                     },
  //                   )
  //                 }
  //               })
  //           }
  //           else if (this.LeaveTypeList[i].id == 10048) {
  //             debugger
  //             this.DigipayrollServiceService.GetMyDetailsByStaffID(localStorage.getItem('staffid'))
  //               .subscribe({
  //                 next: data => {
  //                   debugger
  //                   let temp: any = data;
  //                   if (temp[0].gender == 'Male' && temp[0].status == 'Married' && temp[0].paternitityLeaveEntitlement - temp[0].paternitityLeaveBalance > 0) {
  //                     var obj: any = {};
  //                     obj["id"] = this.LeaveTypeList[i].id;
  //                     obj["short"] = this.LeaveTypeList[i].short;
  //                     this.newLeaveTypeList.push(obj);
  //                     this.loader = false;
  //                   }
  //                   else {
  //                   }
  //                 }, error: (err) => {
  //                   Swal.fire('Issue in Getting My Details By Staff ID');
  //                   // Insert error in Db Here//
  //                   var obj = {
  //                     'PageName': this.currentUrl,
  //                     'ErrorMessage': err.error.message
  //                   }
  //                   this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
  //                     data => {
  //                       debugger
  //                     },
  //                   )
  //                 }
  //               })
  //           }
  //           else if (this.LeaveTypeList[i].id == 10049) {
  //             debugger
  //             this.DigipayrollServiceService.GetMyDetailsByStaffID(localStorage.getItem('staffid'))
  //               .subscribe({
  //                 next: data => {
  //                   debugger
  //                   let temp: any = data;
  //                   if (temp[0].is_Solo_Parent == 1) {
  //                     var obj: any = {};
  //                     obj["id"] = this.LeaveTypeList[i].id;
  //                     obj["short"] = this.LeaveTypeList[i].short;
  //                     this.newLeaveTypeList.push(obj);
  //                     this.loader = false;
  //                   }
  //                   else {
  //                   }
  //                 }, error: (err) => {
  //                   Swal.fire('Issue in Getting My Details By Staff ID');
  //                   // Insert error in Db Here//
  //                   var obj = {
  //                     'PageName': this.currentUrl,
  //                     'ErrorMessage': err.error.message
  //                   }
  //                   this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
  //                     data => {
  //                       debugger
  //                     },
  //                   )
  //                 }
  //               })
  //           }
  //           else {
  //             var obj: any = {};
  //             obj["id"] = this.LeaveTypeList[i].id;
  //             obj["short"] = this.LeaveTypeList[i].short;
  //             this.newLeaveTypeList.push(obj);
  //             this.loader = false;
  //           }
  //         }
  //       }, error: (err) => {
  //         Swal.fire('Issue in Getting Leave Type');
  //         // Insert error in Db Here//
  //         var obj = {
  //           'PageName': this.currentUrl,
  //           'ErrorMessage': err.error.message
  //         }
  //         this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
  //           data => {
  //             debugger
  //           },
  //         )
  //       }
  //     })
  // }

  public ActivatedRouterCall() {
    this.ActivatedRoute.params.subscribe(params => {
      debugger;
      this.ID = params['id'];
      if (this.ID == undefined) {
        this.loader = false;
        this.Holiday = '',
          this.HolidayDescription = ''
      }
      else {
        this.DigipayrollServiceService.GetHolidays()
          .subscribe({
            next: data => {
              this.loader = false;
              this.leavelist = data.filter(x => x.id == this.ID);
              this.Holiday = this.leavelist[0].holiday
              this.HolidayDescription = this.leavelist[0].holidayDescription
              this.HolidayDate = this.datepipe.transform(this.leavelist[0].holidayDate, 'yyyy-MM-dd');
            }, error: (err) => {
              // Swal.fire('Issue in Getting Hoilday');
              // Insert error in Db Here//
              var obj = {
                'PageName': this.currentUrl,
                'ErrorMessage': err.error.message
              }
              this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
                data => {
                  debugger
                },
              )
            }
          })
      }
    })
  }



  public GetLeaveType() {
    debugger
    this.DigipayrollServiceService.GetLeaveType()
      .subscribe({
        next: data => {
          this.LeaveTypeList = data;
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Leave Type');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }


  deptonItemSelect(item: any) {
    debugger
    console.log(item);
    this.Department = item.id;
    this.loader = true;
    this.DigipayrollServiceService.GetAllStaffNew().subscribe(data => {
      debugger
      this.RoleTypeList = data.filter(x => x.department == this.Department);
      this.dropdownList2 = data;

      const key = 'role';
      this.dropdownRoleList = [...new Map(this.RoleTypeList.map((item: { [x: string]: any; }) =>
        [(item[key]), item])).values()]
      this.loader = false
    })

  }


  onItemSelect(item: any) {
    debugger
    console.log(item);
    this.selectedstaff.push(item.id);
    this.loader = false;
  }

  onItemDeSelect(item: any): void {
    debugger
    var index = this.selectedstaff.findIndex(function (o: any) {
      return o === item.id;
    })
    if (index !== -1) this.selectedstaff.splice(index, 1);

  }

  onItemSelect1(item: any) {
    debugger
    console.log(item);
    this.EmployeeId = item.id;
  }

  onRemove21(event: any) {
    debugger
    console.log(event);
    this.attachments21.splice(this.attachments.indexOf(event), 1);
  }

  onSelect21(event: any) {
    debugger
    console.log(event);
    this.attachments21.push(...event.addedFiles);
    /*  Swal.fire('Attachment Added Successfully'); */
    this.loader = false;
    this.showPopup = 1;
    this.messageId = 12
  }

  public Save() {
    debugger;
    this.showPopup = 0;
    if (this.selectedItems == undefined || this.selectedItems == 0 || this.LeaveType == undefined ||
      this.LeaveType == "" || this.LeaveEntitlement == undefined || this.LeaveEntitlement == "" ||
      this.LeaveTaken == undefined) {
      /* Swal.fire("Please fill the Mandatory Fields") */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 7
    }
    else {


      this.showPopup = 0;
      Swal.fire({
        title: 'Update Leave Balance',
        text: "Are you sure you want to Update Leave Balance as it will update balance for selected employees?",
        type: 'warning',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Update it!'
      }).then((result) => {
        if (result.value == true) {
          this.loader = false;
      for (let i = 0; i <= this.selectedstaff.length; i++) {
        var entity = {
          'StaffID': this.selectedstaff[i],
          'LeaveCategory': this.LeaveType,
          'LeaveEntitlement': this.LeaveEntitlement,
          'TakenLeaves': this.LeaveTaken,
        }
        this.DigipayrollServiceService.UpdateLeaveDetails(entity)
          .subscribe(data => {


          })
      }
      this.selectedItems = [];
      this.selectedItems1 = [];
      this.startdate = '';
      this.enddate = '';
      this.RoleID = 0
      this.ngOnInit();
      /*    Swal.fire('Updated Successfully'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 10
        }
      });

    }
  }

  public InsertHolidays() {
    debugger;
    this.showPopup = 0;
    var entity = {
      Holiday: this.Holiday,
      HolidayDescription: this.HolidayDescription,
      HolidayDate: this.HolidayDate,
      Attachment: this.attachmentsurl[0],
    }
    this.DigipayrollServiceService.InsertHolidays(entity)
      .subscribe({
        next: data => {
          if (data != 0) {
            /*   Swal.fire("Saved Successfully"); */
            location.href = "#/Admin/HolidayDashboard";
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 8
          }
        }, error: (err) => {
          // Swal.fire('Issue in Inserting Hoilday');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }

  public UpdateHolidays() {
    debugger;
    this.showPopup = 0
    var entity = {
      ID: this.ID,
      Holiday: this.Holiday,
      HolidayDescription: this.HolidayDescription,
      HolidayDate: this.HolidayDate,
      Attachment: this.attachmentsurl[0],
    }
    this.DigipayrollServiceService.UpdateHolidays(entity)
      .subscribe({
        next: data => {
          /*          Swal.fire("Updated Successfully"); */
          location.href = "#/HolidayDashboard";
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 10
        }, error: (err) => {
          // Swal.fire('Issue in Updating Hoilday');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigipayrollServiceService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }

  public cancel() {
    location.reload();
    this.loader = false;
  }

}