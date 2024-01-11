import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';

@Component({
  selector: 'app-loadattedance',
  templateUrl: './loadattedance.component.html',
  styleUrls: ['./loadattedance.component.css']
})
export class LoadattedanceComponent implements OnInit {

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
  dropdownList1: any = [];

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
  roleselectedItems: any = [];
  roledropdownSettings: any = {};

  dropdownDeptList: any = [];
  deptselectedItems: any = [];
  deptdropdownSettings: any = {};
  showPopup: number = 0;
  messageId: number = 0;
  ngOnInit(): void {


    this.currentUrl = window.location.href;
    this.loader = true;
    this.RoleID = "";
    this.Department = "";
    // this.GetRoleType();
    this.GetLeaveType();
    this.GetDepartment();
    this.GetOtConfiguration();
    this.ActivatedRouterCall();
    this.dropdownList1 = [
      { id: 1, name: 'Monday' },
      { id: 2, name: 'Tuesday' },
      { id: 3, name: 'Wednesday' },
      { id: 4, name: 'Thursday' },
      { id: 5, name: 'Friday' },
      { id: 6, name: 'Saturday' },
      { id: 7, name: 'Sunday' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
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

    this.roledropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'role',
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



  public GetOtConfiguration() {
    this.DigipayrollServiceService.GetOtConfiguration()
      .subscribe({
        next: data => {
          debugger
          this.result = data;
          this.loader = false;
          this.AutoApproval = this.result[0].approvalStatus;
          this.ManualApply = this.result[0].manualApply;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Ot Configuration');
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

  public GetDepartment() {
    this.DigipayrollServiceService.GetDepartment()
      .subscribe({
        next: data => {
          this.dropdownDeptList = data;
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Department');
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

  public GetRoleID(event: any) {
    debugger
    this.Department = event.target.value;

    this.DigipayrollServiceService.GetAllStaffNew().subscribe(data => {
      debugger
      this.RoleTypeList = data.filter(x => x.department == this.Department);
      const key = 'role';
      this.dropdownRoleList = [...new Map(this.RoleTypeList.map((item: { [x: string]: any; }) =>
        [(item[key]), item])).values()]
      this.loader = false
    })
    this.loader = false
  }


  roleonItemSelect(item: any) {
    debugger
    console.log(item);
    this.RoleID = item.id;

    this.DigipayrollServiceService.GetAllStaffNew()
      .subscribe({
        next: data => {
          debugger
          let temp: any = data.filter(x => x.type == this.RoleID);
          this.EmployeeName = temp[0].name;
          this.DigipayrollServiceService.GetDeMinimisMapping()
            .subscribe({
              next: data => {
                debugger
                let dropdownList2: any = data.filter(x => x.roleID == this.RoleID);
              }, error: (err) => {
                // Swal.fire('Issue in Getting My Details');
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
        }, error: (err) => {
          // Swal.fire('Issue in Getting My Details');
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
      this.dropdownList2 = data.filter(x => x.department == this.Department);

      const key = 'role';
      this.dropdownRoleList = [...new Map(this.RoleTypeList.map((item: { [x: string]: any; }) =>
        [(item[key]), item])).values()]
      this.loader = false
    })

  }

  // public Getemployee(event: any) {
  //   debugger
  //   this.loader = true
  //   this.RoleID = event.target.value;

  // }






  onItemSelect(item: any) {
    debugger
    console.log(item);
    this.EmployeeId = item.id;
    this.UserID = item.id

    this.DigipayrollServiceService.GetAllStaffNew()
      .subscribe({
        next: data => {
          debugger
          let temp: any = data.filter(x => x.id == this.EmployeeId);
          this.EmployeeName = temp[0].name;
          this.DigipayrollServiceService.GetDeMinimisMapping()
            .subscribe({
              next: data => {
                debugger
                let temp1: any = data.filter(x => x.roleID == temp[0].roleType);
              }, error: (err) => {
                // Swal.fire('Issue in Getting My Details');
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
        }, error: (err) => {
          // Swal.fire('Issue in Getting My Details');
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
    /* Swal.fire('Attachment Added Successfully'); */
    this.loader = false;
    this.showPopup = 1;
    this.messageId = 12;
  }

  public getDatesBetweenDates = (startDate: string | number | Date, endDate: string | number | Date) => {
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

  public addDays(originalDate: string | number, days: number) {
    const cloneDate = new Date(originalDate.valueOf());
    cloneDate.setDate(cloneDate.getDate() + days);
    return cloneDate;
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

  public Save() {
    debugger
    this.showPopup = 0;
    if (this.Department == undefined || this.selectedItems == undefined || this.startdate == undefined
      || this.enddate == undefined || this.selectedItems1 == undefined || this.starttime == undefined ||
      this.endtime == undefined || this.selectedItems1 == "" || this.selectedItems1 == null ||
      this.deptselectedItems == undefined || this.deptselectedItems == 0 || this.roleselectedItems == undefined ||
      this.roleselectedItems == 0 || this.selectedItems == 0) {
      /*   Swal.fire("Please fill the Mandatory Fields") */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    }
    else {
      if (this.startdate > this.enddate) {
        /*  Swal.fire("Start date must be less than end date") */
        this.loader = false;
        this.showPopup = 1;
        this.messageId = 60;
      }
      else {
        this.loader = false;
        debugger
        this.ipaddress = '255.255.255.255';
        this.getDatesBetweenDates(this.startdate, this.enddate);
        console.log(this.alldates);
        for (let i = 0; i <= this.alldates.length; i++) {
          var options = { hour12: false };
          if (this.AutoApproval == 'Auto Approval') {
            var entity = {
              'UserID': this.UserID,
              'SigninDate': this.formatDate(this.alldates[i]) + "," + this.starttime,
              'SignoutDate': this.formatDate(this.alldates[i]) + "," + this.endtime,
              'punchinip': this.ipaddress,
              'punchoutip': this.ipaddress,
              'ApprovalStatus': 'Manager Approved HR Approved'
            }
            this.DigipayrollServiceService.UploadbulkAttendanceWeb(entity)
              .subscribe(data => {
                if (data == 0) {
                  /*  Swal.fire("Staff applied leave on this date"); */
                  this.loader = false;
                  this.showPopup = 1;
                  this.messageId = 61;
                }
              })
          }
          else if (this.AutoApproval == 'Manager Approval') {
            var entity = {
              'UserID': this.UserID,
              'SigninDate': this.formatDate(this.alldates[i]) + "," + this.starttime,
              'SignoutDate': this.formatDate(this.alldates[i]) + "," + this.endtime,
              'punchinip': this.ipaddress,
              'punchoutip': this.ipaddress,
              'ApprovalStatus': 'Manager Pending'
            }
            this.DigipayrollServiceService.UploadbulkAttendanceWeb(entity).subscribe(data => {
            })
          }
        }
        /* Swal.fire('Attendance Added Successfully'); */
        this.selectedItems = [];
        this.selectedItems1 = [];
        this.startdate = '';
        this.enddate = '';
        this.RoleID = 0
        this.ngOnInit();
        this.loader = false;
        this.showPopup = 1;
        this.messageId = 62;
      }
    }
  }





  public cancel() {
    location.reload();
    this.loader = false;
  }

}