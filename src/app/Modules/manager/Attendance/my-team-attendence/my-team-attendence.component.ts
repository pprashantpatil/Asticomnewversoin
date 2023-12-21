import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import { formatDate } from '@angular/common';
import * as XLSX from 'xlsx';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-my-team-attendence',
  templateUrl: './my-team-attendence.component.html',
  styleUrls: ['./my-team-attendence.component.css']
})
export class MyTeamAttendenceComponent implements OnInit {

  constructor(public DigiofficeService: DigiofficecorehrService) { }
  roleid: any
  staffID: any;
  p: any = 1;
  count1: any = 10;
  count: any;
  attendancelistcopy: any;
  RoleType: any;
  Department: any;
  Departmentlist: any;
  RoleTypeList: any;
  loader: any;
  filtereddate: any;
  todaydate: any;
  firstDayofcurrentmonth: any;
  currentUrl: any;
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  dropdownRoleList: any = [];
  roleselectedItems: any = [];
  roledropdownSettings: any = {};
  employeeid: any;
  attendancelistCopy: any;
  startdate: any;
  enddate: any;
  attendancelist: any;
  startingTime1: any;
  endTime1: any;
  selecallbtn: any;
  roleID: any;
  term: any;
  companyName: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.roleid = sessionStorage.getItem('roledid');
    this.staffID = localStorage.getItem('staffid');
    this.companyName = sessionStorage.getItem('companycode');
    const format = 'yyyy-MM-dd';
    const myDate = new Date();
    const locale = 'en-US';
    this.filtereddate = formatDate(myDate, format, locale);
    this.todaydate = this.filtereddate;
    debugger
    this.firstDayofcurrentmonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    this.firstDayofcurrentmonth = formatDate(this.firstDayofcurrentmonth, format, locale);
    this.RoleType = "";
    this.Department = "";

    this.GetRoleType();
    this.GetAttendance();
    this.GetStaffByManagerIDForDropdown();
    this.dropdownSettings = {
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
      textField: 'short',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
    };
  }
  showPopup: number = 0;
  messageId: number = 0;

  public GetRoleType() {
    this.DigiofficeService.GetRoleType()
      .subscribe({
        next: data => {
          debugger
          this.dropdownRoleList = data;
          // this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Role Type');
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

  roleonItemSelect(item: any) {
    debugger
    console.log(item);
    this.roleID = item.id;
    this.FilterRoleType();
  }

  // public GetStaffByManagerID() {
  //   this.DigiofficeService.GetStaffByManagerID(this.staffID)
  //     .subscribe({
  //       next: data => {
  //         debugger
  //         if (this.roleid == 2) {
  //           this.dropdownList = data;
  //         }
  //         else {
  //           this.dropdownList = data;
  //         }
  //       }, error: (err) => {
  //         Swal.fire('Issue in Getting Staff By Manager ID');
  //         // Insert error in Db Here//
  //         var obj = {
  //           'PageName': this.currentUrl,
  //           'ErrorMessage': err.error.message
  //         }
  //         this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
  //           data => {
  //             debugger
  //           },
  //         )
  //       }
  //     })
  // }

  public GetStaffByManagerIDForDropdown() {
    this.DigiofficeService.GetAllStaffNew()
      .subscribe({
        next: data => {
          debugger
          if (this.roleid == 2) {
            this.dropdownList = data.filter(x => x.supervisor == this.staffID);
          }
          else {
            this.dropdownList = data;
          }

          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Staff By Manager ID');
          //  Insert error in Db Here
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



  public filterTeamAttendance() {
    debugger

    let searchCopy = this.term.toLowerCase();
    this.attendancelist = this.attendancelistCopy.filter((x: { employeID: string, name1: string }) => (x.employeID.toLowerCase().includes(searchCopy))
      || (x.name1.toLowerCase().includes(searchCopy)));
    this.count = this.attendancelist.length;
    this.loader = false;
  }


  public getenddate(event:any) {
    this.showPopup = 0;
    debugger
    this.loader = true;
    if (this.enddate == "") {
      this.ngOnInit();
    }
    else if (this.startdate == undefined || this.startdate == "") {
      /* Swal.fire('Please Select Start Date First'); */
      this.loader = false;
      this.enddate == "";
      this.showPopup = 1;
      this.messageId = 32;
    }
    else {
      if (this.roleid == 6) {
        this.DigiofficeService.GetAttendanceByEmployeeID(this.staffID, this.startdate, this.enddate)
          .subscribe({
            next: data => {
              debugger
              this.attendancelist = data;
              // this.attendancelistCopy= this.attendancelist;

              this.loader = false;
            }, error: (err) => {
              this.loader = false;
              // Swal.fire('Issue in Getting Attendance By EmployeeID');
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
      else if (this.roleid == 2) {
        this.loader = true;
        this.DigiofficeService.GetAttendanceByManagerID(this.staffID, this.startdate, this.enddate)
          .subscribe({
            next: data => {
              debugger
              this.attendancelist = data;
              // this.attendancelistCopy= this.attendancelist;

              this.loader = false;
            }, error: (err) => {
              this.loader = false;
              // Swal.fire('Issue in Getting Attendance By EmployeeID');
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
        this.loader = true;
        this.DigiofficeService.GetAttendanceBydate(this.startdate, this.enddate)
          .subscribe({
            next: data => {
              debugger
              this.attendancelist = data;
              //this.attendancelistCopy = this.attendancelist;
              this.loader = false;
            }, error: (err) => {
              this.loader = false;
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



  onItemSelect(item: any) {
    this.showPopup = 0;
    debugger
    console.log(item);
    this.employeeid = item.id;
    this.DigiofficeService.GetAttendanceByEmployeeID(this.employeeid, this.startdate, this.enddate)
      .subscribe({
        next: data => {
          debugger
          this.attendancelist = data;
          // this.attendancelistCopy= this.attendancelist;

          console.log(" this.attendancelist", this.attendancelist)
        }, error: (err) => {
          /*  Swal.fire('Please Select Start Date and End Date'); */
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 32;
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

  public FilterRoleType() {
    debugger
    if (this.roleID == "") {
      if (this.roleid == '2') {
        if (this.startdate == undefined && this.enddate == undefined) {
          this.DigiofficeService.GetAttendanceByManagerID(this.staffID, this.firstDayofcurrentmonth, this.todaydate)
            .subscribe({
              next: data => {
                debugger
                this.attendancelist = data;
                // this.attendancelistCopy= this.attendancelist;

                this.loader = false;
              }, error: (err) => {
                // Swal.fire('Issue in Getting Attendance By Manager ID');
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
          this.DigiofficeService.GetAttendanceByManagerID(this.staffID, this.startdate, this.enddate)
            .subscribe({
              next: data => {
                debugger
                this.attendancelist = data;
                // this.attendancelistCopy= this.attendancelist;

                this.loader = false;
              }, error: (err) => {
                // Swal.fire('Issue in Getting Attendance By Manager ID');
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
      else {
        if (this.startdate == undefined && this.enddate == undefined) {
          this.DigiofficeService.GetAttendanceBydate(this.firstDayofcurrentmonth, this.todaydate)
            .subscribe({
              next: data => {
                debugger
                this.attendancelist = data;
                // this.attendancelistCopy= this.attendancelist;

                this.loader = false;
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
          this.DigiofficeService.GetAttendanceBydate(this.startdate, this.enddate)
            .subscribe({
              next: data => {
                debugger
                this.attendancelist = data;
                // this.attendancelistCopy= this.attendancelist;


                this.loader = false;
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
    } else {
      if (this.roleid == '2') {
        if (this.startdate == undefined && this.enddate == undefined) {
          this.DigiofficeService.GetAttendanceByManagerID(this.staffID, this.firstDayofcurrentmonth, this.todaydate)
            .subscribe({
              next: data => {
                debugger
                this.attendancelist = data.filter(x => x.roleType == this.roleID);
                // this.attendancelistCopy= this.attendancelist;
                // this.count = this.attendancelist.length;
                this.loader = false;
              }, error: (err) => {
                // Swal.fire('Issue in Getting Attendance By Manager ID');
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
          this.DigiofficeService.GetAttendanceByManagerID(this.staffID, this.startdate, this.enddate)
            .subscribe({
              next: data => {
                debugger
                this.attendancelist = data.filter(x => x.roleType == this.roleID);
                // this.attendancelistCopy= this.attendancelist;
                // this.count = this.attendancelist.length;
                this.loader = false;
              }, error: (err) => {
                // Swal.fire('Issue in Getting Attendance By Manager ID');
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
      else {
        if (this.startdate == undefined && this.enddate == undefined) {
          this.DigiofficeService.GetAttendanceBydate(this.firstDayofcurrentmonth, this.todaydate)
            .subscribe({
              next: data => {
                debugger
                this.attendancelist = data.filter(x => x.roleType == this.roleID);
                // this.attendancelistCopy= this.attendancelist;
                // this.count = this.attendancelist.length;

                this.loader = false;
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
          this.DigiofficeService.GetAttendanceBydate(this.startdate, this.enddate)
            .subscribe({
              next: data => {
                debugger
                this.attendancelist = data.filter(x => x.roleType == this.roleID);
                // this.attendancelistCopy= this.attendancelist;
                // this.count = this.attendancelist.length;

                this.loader = false;
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
  }

  public GetAttendance() {
    debugger
    this.loader = true;
    if (this.roleid == '2') {
      this.DigiofficeService.GetAttendanceByManagerID(this.staffID, this.firstDayofcurrentmonth, this.todaydate)
        .subscribe({
          next: data => {
            debugger
            this.attendancelist = data;
            // this.attendancelistCopy= this.attendancelist;
            // this.count = this.attendancelist.length;
            this.loader = false;
          }, error: (err) => {
            // Swal.fire('Issue in Getting Attendance By Manager ID');
            // Insert error in Db Here//
            this.loader = false;
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
      this.DigiofficeService.GetAttendanceBydate(this.firstDayofcurrentmonth, this.todaydate)
        .subscribe({
          next: data => {
            debugger
            this.attendancelist = data
            // this.count = this.attendancelist.length;
            // this.attendancelistCopy= this.attendancelist;

            this.loader = false;
          }, error: (err) => {
            this.loader = false;
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


  startdate1:any;
  attendancelist23: any;
  sequenceNumber1: any;
  fileName: any;
  public exportexcel1() {
    debugger

    if (this.term != null) {
      this.attendancelist23 = this.attendancelist.filter((x: { search: string | any[]; }) => (x.search).includes(this.term.toUpperCase()))
    }
    else {
      this.attendancelist23 = this.attendancelist

    }

    var ExportData = [];
    this.sequenceNumber1 = 0;
    for (let
      i = 0; i < this.attendancelist23.length; i++) {
      //debugger;
      this.sequenceNumber1 = i + 1;
      let singleData: any = {
        SequenceNumber: String,
        Date: String,
        EmployeeName: String,
        EmployeeID: String,
        Position: String,
        CompanyName: String,
        ShiftDailyIN: String,
        ShiftDailyOut: String,
        ActualPunchIN: String,
        ActualPunchOut: String,
      }
      singleData.SequenceNumber = this.sequenceNumber1;
      singleData.EmployeeID = this.attendancelist23[i].employeID;
      singleData.EmployeeName = this.attendancelist23[i].name1;
      singleData.Date = this.attendancelist23[i].dobforattedance;
      singleData.Position = this.attendancelist23[i].role;
      singleData.ActualPunchIN = this.attendancelist23[i].stime;
      singleData.ActualPunchOut = this.attendancelist23[i].etime;
      singleData.ShiftDailyIN = this.attendancelist23[i].expectedIn;
      singleData.ShiftDailyOut = this.attendancelist23[i].expectedOut;
      singleData.CompanyName = this.companyName;
      ExportData.push(singleData);
      //debugger
    }
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'Employee_Attendance_Report',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'Employee_Attendance_Report'
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    //debugger
    csvExporter.generateCsv(ExportData);

  }
  exporttoexcelsearch() {
    this.fileName = 'Attendance Report.xlsx'
    let element = document.getElementById('lvs');

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);



    /* generate workbook and add the worksheet */

    const wb: XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');



    /* save to file */

    XLSX.writeFile(wb, this.fileName);
  }

}
