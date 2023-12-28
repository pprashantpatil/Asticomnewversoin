import { Component, OnInit } from '@angular/core';
import * as excelJS from "exceljs";
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import { Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { ExportToCsv } from 'export-to-csv';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
declare var require: any
@Component({
  selector: 'app-generate-csvfiles',
  templateUrl: './generate-csvfiles.component.html',
  styleUrls: ['./generate-csvfiles.component.css']
})
export class GenerateCsvfilesComponent implements OnInit {

  constructor(public DigiofficeService: DigiofficecorehrService, public router: Router, private datePipe: DatePipe) {
    this.minDate.setDate(this.minDate.getDate() - 1);
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsRangeValue = [this.bsValue, this.maxDate];
  }
  public attachments01: any = [];
  currentUrl: any;
  viewMode = 'tab1';
  legalOTRegularHrs: any;
  cutoffdate: any;
  restRegularNightOTExc8Hrs: any;
  restOTRegularExc8Hrs: any;
  restRegularNightOTHrs: any;
  restOTRegularHrs: any;
  legalRegularNightOTExc8Hrs: any;
  legalRestOTRegularExc8Hrs: any;
  legalRestRegularNightOTHrs: any;
  legalRestOTRegularHrs: any;
  specialRegularNightOTHrs: any;
  specialRegularNightOTExc8Hrs: any;
  specialOTRegularExc8Hrs: any;
  specialOTRegularHrs: any;
  legalRegularNightOTHrs: any;
  legalOTRegularExc8Hrs: any;
  loader: any;
  Role: any;
  startdate: any;
  stafflist: any;
  term: any;
  RoleTypeList: any;
  value: any;
  result: any;
  employeelist: any;
  Payrollvis: any;
  Showpayroll: any;
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  minDate = new Date();
  p: any = 1;
  count1: any = 10;
  latestdate: any;
  cutofflist: any;
  enddate: any;
  show: any;
  ID1: any = [];
  sssrate: any;
  ss_ec: any;
  ss_er: any;
  startmonth: any;
  endmonth: any;
  startyear: any;
  endyear: any;
  myDate: any;
  companylist: any;
  companyname: any;
  Address: any;
  paginigec: any;
  dob: any;
  PhilHealthEC: any;
  joiningDate1: any;
  department_name: any;
  thirteenthmonthpayroll: any;
  uniquelist: any;
  Search: any;
  selecallbtn: any;
  sequenceNumber: any;
  element: any;
  otRegularHrs: any;
  regularNightOTHrs: any;
  regularNightOTExc8Hrs: any;
  otRegularExc8Hrs: any;
  EmployeeID: any
  temp: any;
  IntID: any
  PrevLOPDays: any;
  StaffSalaryReports: any;
  public ID: any = [];
  seleconebtn: any;
  LOPDays: any;
  NoOfDays: any
  employeelistCopy: any;
  totalamount: any;
  payrolldatalist: any;

  dropdownRoleList: any = [];
  roleselectedItems: any = [];
  roledropdownSettings: any = {};

  dropdownDeptList: any = [];
  deptselectedItems: any = [];
  deptdropdownSettings: any = {};
  dateformat: any;
  showPopup: number = 0;
  messageId: number = 0
  ngOnInit(): void {
    this.currentUrl = window.location.href;

    this.myDate = new Date();
    this.dateformat = this.myDate.toString('dd, MM ,yyyy')
    this.latestdate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    //debugger
    this.Role = "Select"
    this.department_name = "Select"


    this.roledropdownSettings = {
      singleSelection: true,
      idField: 'short',
      textField: 'short',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
    };

    this.deptdropdownSettings = {
      singleSelection: true,
      idField: 'department_name',
      textField: 'department_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
    };

    this.uniquelist = [];

    this.GetEmployeeSalary();
    this.GetDepartment();
    this.GetRoleType();
    this.GetPayrollFilesDetails();

  }

  public GetEmployeeSalary() {
    this.DigiofficeService.GetEmployeeSalary()
      .subscribe({
        next: data => {
          //debugger
          this.employeelist = data;
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Employee Salary');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              //debugger
            },
          )
        }
      })
  }

  public GetRoleType() {
    this.DigiofficeService.GetRoleType()
      .subscribe({
        next: data => {
          //debugger
          this.dropdownRoleList = data;
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
              //debugger
            },
          )
        }
      })
  }
  FilesDetails: any = [];
  public GetPayrollFilesDetails() {
    this.DigiofficeService.GetPayrollFilesDetails()
      .subscribe({
        next: data => {
          //debugger
          this.FilesDetails = data.filter(x => x.finalrun == 1);
          this.uniquelist = [];
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
              //debugger
            },
          )
        }
      })
  }

  public getdate(event: any) {
    //debugger
    this.enddate = event.target.value;
  }

  public GetDepartment() {
    //debugger
    this.DigiofficeService.GetDepartment()
      .subscribe({
        next: data => {
          //debugger
          this.dropdownDeptList = data;
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
              //debugger
            },
          )
        }
      })
  }

  roleonItemSelect(item: any) {
    //debugger
    console.log(item);
    this.Role = item.short;
    this.Rolefilter();
  }


  deptonItemSelect(item: any) {
    //debugger
    console.log(item);
    this.department_name = item.department_name;
    this.Departmentfilter();
  }

  public Departmentfilter() {
    this.showPopup = 0;
    if (this.startdate == undefined || this.enddate == undefined) {
      /* Swal.fire('Please Select Start Date and End Date'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 70
    }
    else {
      this.DigiofficeService.Get_Employees_For_Payroll(this.startdate, this.enddate)
        .subscribe({
          next: data => {
            //debugger
            //debugger
            this.loader = false;
            this.stafflist = data.filter(x => x.department_name == this.department_name && x.daysworked > 0);
            const key = 'id';
            const key1 = 'month'
            this.uniquelist = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
              [(item[key]), item])).values()]
          }, error: (err) => {
            // Swal.fire('Issue in Getting Employees For Payroll');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
              data => {
                //debugger
              },
            )
          }
        })
    }
  }

  public Rolefilter() {
    this.showPopup = 0
    if (this.startdate == undefined || this.enddate == undefined) {
      /* Swal.fire('Please Select Start Date and End Date'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 70
    }
    else {
      this.DigiofficeService.Get_Employees_For_Payroll(this.startdate, this.enddate)

        .subscribe({
          next: data => {
            //debugger
            //debugger
            this.loader = false;
            this.stafflist = data.filter(x => x.role == this.Role && x.daysworked > 0);
            const key = 'id';
            const key1 = 'month'
            this.uniquelist = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
              [(item[key]), item])).values()]
            this.totalamount = 0;
            for (let i = 0; i < this.uniquelist.length; i++) {
              this.totalamount += this.uniquelist[i].netMonthSalary;
            }
          }, error: (err) => {
            // Swal.fire('Issue in Filter by Role');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
              data => {
                //debugger
              },
            )
          }
        })
    }
  }


  public selectALL1(event: any) { // pass true or false to check or uncheck all
    debugger;

    this.selecallbtn = true;
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < this.uniquelist.length; i++) {
      if (this.uniquelist[i].type == "checkbox") {
        this.uniquelist[i].checked = event.currentTarget.checked;
        // This way it won't flip flop them and will set them all to the same value which is passed into the function
      }

    }

  }

  public FilterPayroll() {
    this.showPopup = 0;
    this.DigiofficeService.Get_Employees_For_Payroll(this.startdate, this.enddate)
      .subscribe({
        next: data => {
          //debugger
          this.loader = false;
          this.stafflist = data;

          const key = 'id';
          const key1 = 'month'
          this.uniquelist = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
            [(item[key]), item])).values()]
          this.employeelistCopy = this.uniquelist;
          let searchCopy = this.Search.toLowerCase();
          this.uniquelist = this.employeelistCopy.filter((x: { name: string, mobile: Number, emailID: string }) =>
            x.name.toLowerCase().includes(searchCopy) ||
            x.mobile.toString().includes(searchCopy) ||
            x.emailID.toString().includes(searchCopy));
        }, error: (err) => {
          /*  Swal.fire('Please Select the Start Date and End date'); */
          // Insert error in Db Here//
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 70
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              //debugger
            },
          )
        }
      })


  }

  public getemployeedetails() {
    this.loader = true;
    this.showPopup = 0;
    this.FilesDetails = [];
    if (this.startdate == undefined || this.enddate == undefined || this.cutoffdate == undefined) {
      this.loader = false;
      /* Swal.fire('Please Select Start Date and End Date'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 70
    }
    else if (this.startdate > this.enddate) {
      /*   Swal.fire('Start Date should be less than End Date'); */
      this.loader = false;
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 60
    }
    else {
      this.DigiofficeService.Get_Employees_For_Payroll(this.startdate, this.enddate).
        subscribe({
          next: data => {
            //debugger
            this.loader = true;
            this.stafflist = data;
            const key = 'id';
            const key1 = 'month'
            this.uniquelist = [...new Map(this.stafflist.map((item: { [x: string]: any; }) =>
              [(item[key]), item])).values()];
            this.loader = false;

          }, error: (err) => {
            // Swal.fire('Issue in Getting Get_Employees_For_Payroll');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
              data => {
                //debugger
              },
            )
          }
        })
      this.loader = false;
    }
  }

  public IDList: any = [];

  public selectALL(event: any) {
    debugger
    if (event.target.checked == true) {

      this.seleconebtn = true;

      var inputs = document.getElementsByTagName("input");

      for (var i = 0; i < this.uniquelist.length; i++) {

        this.uniquelist[i].checked = event.currentTarget.checked;

      }

      for (var i = 0; i < this.uniquelist.length; i++) {


        // var obj = {
        //   "ID": this.uniquelist[i].id
        // }


        this.ID.push(this.uniquelist[i].id);

        // this.IDList.push(obj);

      }
      //   console.log(this.ID);
      //


    }

    else {

      this.seleconebtn = false;
      this.ID = [];

      var inputs = document.getElementsByTagName("input");

      for (var i = 0; i < this.uniquelist.length; i++) {

        if (this.uniquelist[i].type == "checkbox") {

          this.uniquelist[i].checked = false;

          // This way it won't flip flop them and will set them all to the same value which is passed into the function

        }

      }

    }

  }

  public InsertNotification() {
    //debugger
    this.showPopup = 0;
    var entity = {
      'Date': new Date(),
      'Event': 'Payroll Run',
      'FromUser': 'Admin',
      'ToUser': 'Admin',
      'Message': 'Payroll Ran Successfully from ' + this.startdate + 'to' + this.enddate,
      'Photo': 'Null',
      'Building': 'Dynamics 1',
      'UserID': sessionStorage.getItem('staffid'),
      'NotificationTypeID': 16,
      'VendorID': 0
    }
    this.DigiofficeService.InsertNotification(entity)
      .subscribe({
        next: data => {
          //debugger
          /* Swal.fire('Saved Successfully') */
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 8
          this.ngOnInit();
          /*  this.loader = false; */
        }, error: (err) => {
          // Swal.fire('Issue in Insert Notification');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              //debugger
            },
          )
        }
      })
  }

  public getCheckbocdetails(evn: any, event: any) {
    //debugger
    if (event.target.checked == true) {
      this.seleconebtn = true;
      let temp: any = evn;
      this.temp = Object.entries(temp);
      //debugger
      if (this.temp.every((val: { checked: boolean; }) => val.checked == true)) {
        this.IntID = false;
        this.ID = [];
        this.temp.forEach((val: { checked: boolean; }) => { val.checked = false });
        this.IntID = false;
      }
      else {
        //debugger;

        //debugger
        this.temp.forEach((val: { checked: boolean; }) => { val.checked = true });
        this.IntID = true;
        this.ID.push(evn.id);
        this.seleconebtn = false;
      }
    }

    // else {
    //   this.seleconebtn = false;
    // }
    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
      if (inputs[i].type == "checkbox") {
        if (inputs[i].checked == true) {
          this.seleconebtn = true;
        }
        // This way it won't flip flop them and will set them all to the same value which is passed into the function
      }
      else {
        this.seleconebtn = false;
      }
    }
  }


  async getpayrolldata() {
    //debugger
    this.loader = true;
    this.FilesDetails = [];
    //this.exportloandata();
    // this.exporttoexcel4();
    //this.CalculateLWOPDays();
    this.createPayrollFileentry();

    //  this.exporttoexcel2();
  }
  isConfirmed: any;
  public createPayrollFileentry() {
    this.showPopup = 0;
    debugger
    var obj: any = {
      'StartDate': this.startdate,
      'EndDate': this.enddate,
      'PersonalData': null,
      'JobData': null,
      'BankData': null,
      'RecurringInput': null,
      'OnetimeInput': null,

    }


    this.DigiofficeService.InsertPayrollfilesfinal(obj)
      .subscribe({
        next: data => {
          debugger
          if (data != 0) {
            this.payrollid = data
          }
          this.seleconebtn = false;
          if (data == 0) {
            this.loader = false;
            const swalWithBootstrapButtons = Swal.mixin({
              customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
              },
              buttonsStyling: false
            })
            swalWithBootstrapButtons.fire({
              title: 'Payroll Already Completed for this pay period?',
              text: "Do you want to overwrite it!",
              showCancelButton: true,
              confirmButtonText: 'Yes, overwrite it!',
              cancelButtonText: 'No, cancel!',
              reverseButtons: true
            }).then((result) => {
              if (result.value == true) {
                this.loader = true;

                this.createNewPayrollEntry();



              } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
              ) {
                swalWithBootstrapButtons.fire(
                  'Cancelled',
                  'You have Cancelled the Payroll run :)',
                  'error'
                )
              }
            })
          } else {
            this.exporttoexcel2();
          }


        }, error: (err) => {
          this.loader = false;
          /*   Swal.fire('Issue In Generating Payroll Files . Please try again'); */
          // Insert error in Db Here//
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 71;
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              //debugger
            },
          )
        }
      })

  }

  public createNewPayrollEntry() {
    debugger;
    this.showPopup = 0;
    var obj: any = {
      'StartDate': this.startdate,
      'EndDate': this.enddate,
      'PersonalData': null,
      'JobData': null,
      'BankData': null,
      'RecurringInput': null,
      'OnetimeInput': null,

    }
    this.DigiofficeService.InsertPayrollfileswithoutdeatecheckfinal(obj)
      .subscribe({
        next: data => {
          debugger
          this.payrollid = data;
          this.exporttoexcel2();

        }, error: (err) => {
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 71;
          /*  Swal.fire('Issue In Generating Payroll Files . Please try again'); */
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              //debugger
            },
          )
        }
      })

  }

  public payrillfilesarray: any = [];

  async exportOnetimeInput() {
    debugger
    this.loader = true;
    this.DigiofficeService.GetEmployeeLoansforpayroll()
      .subscribe({
        next: data => {
          //debugger
          //debugger
          const Excel = require('exceljs');
          const workbook = new Excel.Workbook();
          const worksheet = workbook.addWorksheet("RECURRING_INPUT");

          worksheet.columns = [
            { header: 'SequenceNumber', key: 'SequenceNumber', width: 10 },
            { header: 'EmployeeID', key: 'EmployeeID', width: 32 },
            { header: 'Element', key: 'Element', width: 15, },
            { header: 'Unit', key: 'Unit', width: 15, },
            { header: 'Amount', key: 'Amount', width: 15, },
            { header: 'BeginDate', key: 'BeginDate', width: 15, },
            { header: 'EndDate', key: 'EndDate', width: 15, },
            { header: 'Flag', key: 'Flag', width: 15, }
          ];
          debugger
          this.loandata = data;
          debugger


          // for (let i = 0; i < this.loandata.length; i++) {

          //   worksheet.addRow({
          //     SequenceNumber: i + 1,
          //     EmployeeID: this.loandata[i].employeID,
          //     Element: this.loandata[i].loanType,
          //     Amount: this.loandata[i].loanAmount,
          //     BeginDate: this.datePipe.transform(this.loandata[i].loanstartdate, 'MM-dd-yyyy'),
          //     EndDate: '12/31/2022'
          //   });

          // }
          worksheet.addRow({
            SequenceNumber: '',
            EmployeeID: '',
            Element: '',
            Unit: '',
            Amount: '',
            BeginDate: '',
            EndDate: '',

          });
          workbook.xlsx.writeBuffer().then((worksheet: BlobPart) => {
            let blob = new Blob([worksheet], {
              type:
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            });
            let qwddwde = 'RECURRING_INPUT'
            // fs.saveAs(blob, qwddwde);
            var file = new File([blob], qwddwde + '.csv');
            let body = new FormData();
            body.append('Dan', file);
            let companycode: any = sessionStorage.getItem('companycode') == undefined ? 'AST' : sessionStorage.getItem('companycode');
            var alphanemuricnumber = Math.floor(1000 + Math.random() * 90);
            var dateforpayroll = new Date();
            dateforpayroll.setDate(dateforpayroll.getDate() - 1);
            let date = this.datePipe.transform(dateforpayroll, 'MMddyyyy');
            console.log(date);
            let filename = companycode + '_RECURRING_INPUT_' + 'ADHOC_PRD_' + alphanemuricnumber + '_' + date;


            this.DigiofficeService.insertexcel(body, this.payrollid, filename).subscribe(res => {
              //debugger
              let excelurl = res;

              this.UpdateOnetimeinputfiles(res);
              // if (this.excelurl != undefined) {
              //   //alert("Saved")
              //   //return this.excelurl;
              //   //Swal.fire('Excel Uploaded Successfully')
              // }

              //debugger

            })
          });




        }, error: (err) => {
          this.loader = false;
          // Swal.fire('Issue in GetEmployeeLoans');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              //debugger
            },
          )
        }
      })





  }



  payrollid: any
  public UpdateOnetimeinputfiles(loandata: any) {

    var obj: any = {
      'ID': this.payrollid,
      'OnetimeInput': loandata,

    }
    this.DigiofficeService.UpdatePayrollFilesDetailsonetimeinput(obj)
      .subscribe({
        next: data => {
          //debugger

          this.createpersonaldata();
          // this.createzip();



        }, error: (err) => {
          this.loader = false;
          // Swal.fire('Issue in  InsertPayrollfiles');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              //debugger
            },
          )
        }
      })

  }

  public createpersonaldata() {
    //debugger
    this.DigiofficeService.GetAllStaffNewforpersonaldata(1, this.startdate, this.enddate)
      .subscribe({
        next: data => {

          this.stafflist = data;
          Array.prototype.push.apply(this.newstafflist, this.stafflist);

          const Excel = require('exceljs');
          const workbook = new Excel.Workbook();
          const worksheet = workbook.addWorksheet("PersonalData");

          worksheet.columns = [
            { header: 'PERSONID', key: 'PERSONID', width: 10 },
            { header: 'PERIODFROM', key: 'PERIODFROM', width: 32 },
            { header: 'NAMEPREFIX', key: 'NAMEPREFIX', width: 15, },
            { header: 'FIRSTNAME', key: 'FIRSTNAME', width: 15, },
            { header: 'MIDDLENAME', key: 'MIDDLENAME', width: 15, },
            { header: 'LASTNAME', key: 'LASTNAME', width: 15, },
            { header: 'NAMESUFFIX', key: 'NAMESUFFIX', width: 10 },
            { header: 'BIRTHDATE', key: 'BIRTHDATE', width: 32 },
            { header: 'EFFECTIVEDATE', key: 'EFFECTIVEDATE', width: 15, },
            { header: 'GENDER', key: 'GENDER', width: 15, },
            { header: 'MARITALSTATUS', key: 'MARITALSTATUS', width: 15, },
            { header: 'PHILHEALTHNO', key: 'PHILHEALTHNO', width: 15, },

            { header: 'SSSNO', key: 'SSSNO', width: 10 },
            { header: 'TIN', key: 'TIN', width: 32 },
            { header: 'HDMFNO', key: 'HDMFNO', width: 15, },
            { header: 'ADDRESS1', key: 'ADDRESS1', width: 15, },
            { header: 'ADDRESS2', key: 'ADDRESS2', width: 15, },
            { header: 'ADDRESS3', key: 'ADDRESS3', width: 15, },

            { header: 'ADDRESS4', key: 'ADDRESS4', width: 10 },
            { header: 'CITY', key: 'CITY', width: 32 },
            { header: 'POSTAL', key: 'POSTAL', width: 15, },
            { header: 'CELLULARPHONE', key: 'CELLULARPHONE', width: 15, },
            { header: 'EMAILADDRESS', key: 'EMAILADDRESS', width: 15, },
          ];
          for (let i = 0; i < this.newstafflist.length; i++) {
            //debugger;
            worksheet.addRow({
              PERSONID: this.newstafflist[i].employeID,
              PERIODFROM: this.datePipe.transform(this.newstafflist[i].joiningDate1, 'MM-dd-yyyy'),
              NAMEPREFIX: this.newstafflist[i].prefix,
              FIRSTNAME: this.newstafflist[i].name,
              MIDDLENAME: this.newstafflist[i].middle_Name,
              LASTNAME: this.newstafflist[i].last_Name,
              NAMESUFFIX: 'Sr.',
              BIRTHDATE: this.newstafflist[i].dobforpayroll,
              EFFECTIVEDATE: this.newstafflist[i].effectivedate,
              GENDER: this.newstafflist[i].gender1,
              MARITALSTATUS: this.newstafflist[i].mstatus,
              PHILHEALTHNO: this.newstafflist[i].philhealtH_NO,
              SSSNO: this.newstafflist[i].sssno,
              TIN: this.newstafflist[i].tinNo,
              HDMFNO: this.newstafflist[i].pagiBig_ID,
              ADDRESS1: this.newstafflist[i].address,
              ADDRESS2: this.newstafflist[i].address,
              ADDRESS3: this.newstafflist[i].address,
              ADDRESS4: this.newstafflist[i].address,
              CITY: this.newstafflist[i].cityname,
              POSTAL: "000000",
              CELLULARPHONE: this.newstafflist[i].mobile,
              EMAILADDRESS: this.newstafflist[i].emailID,
            });
            if (i == this.newstafflist.length - 1) {

              workbook.xlsx.writeBuffer().then((worksheet: BlobPart) => {
                let blob = new Blob([worksheet], {
                  type:
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                });
                let qwddwde = 'Personal_data'
                // fs.saveAs(blob, qwddwde);
                var file = new File([blob], qwddwde + '.csv');
                let body = new FormData();
                body.append('Dan', file);
                let companycode: any = sessionStorage.getItem('companycode') == undefined ? 'AST' : sessionStorage.getItem('companycode');
                var alphanemuricnumber = Math.floor(1000 + Math.random() * 90);
                var dateforpayroll = new Date();
                dateforpayroll.setDate(dateforpayroll.getDate() - 1);
                let date = this.datePipe.transform(dateforpayroll, 'MMddyyyy');
                console.log(date);
                let filename = companycode + '_PERSONAL_DATA' + '_ADHOC_PRD_' + alphanemuricnumber + '_' + date;
                this.DigiofficeService.insertexcel(body, this.payrollid, filename).subscribe(res => {
                  //debugger
                  let excelurl = res;

                  this.UpdatePerosnladata(res);




                  //debugger

                })
              });


            }

            //debugger
          }


          this.loader = false;
          // this.newstafflist.push(this.stafflist);



        }, error: (err) => {
          this.loader = false;
          /*   Swal.fire('Issue in GetAllStaffNewforpersonaldata'); */
          console.log('Issue in GetAllStaffNewforpersonaldata');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              //debugger
            },
          )
        }
      })

    // this.ID.forEach((ID: any) =>

    // )










  }
  public UpdatePerosnladata(personaldata: any) {

    var obj: any = {
      'ID': this.payrollid,
      'PersonalData': personaldata,

    }
    this.DigiofficeService.UpdatePayrollFilesDetailpersonaldata(obj)
      .subscribe({
        next: data => {
          this.CreateJobData();

          // this.createzip();

        }, error: (err) => {
          this.loader = false;
          // Swal.fire('Issue in  InsertPayrollfiles');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              //debugger
            },
          )
        }
      })

  }
  public jobdatalist: any = [];
  jobdatalistobj: any;
  public CreateJobData() {
    //debugger
    Array.prototype.push.apply(this.jobdatalist, this.newstafflist);
    const Excel = require('exceljs');
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("JobData");

    worksheet.columns = [
      { header: 'EMPLOYEEID', key: 'EMPLOYEEID', width: 10 },
      { header: 'EMPLOYEERECORD', key: 'EMPLOYEERECORD', width: 32 },
      { header: 'EFFECTIVEDATE', key: 'EFFECTIVEDATE', width: 15, },
      { header: 'EFFECTIVESEQUENCE', key: 'EFFECTIVESEQUENCE', width: 15, },
      { header: 'ACTION', key: 'ACTION', width: 15, },
      { header: 'ACTIONREASON', key: 'ACTIONREASON', width: 15, },
      { header: 'POSITIONNUMBER', key: 'POSITIONNUMBER', width: 10 },
      { header: 'REGULATORYREGION', key: 'REGULATORYREGION', width: 32 },
      { header: 'COMPANY', key: 'COMPANY', width: 15, },
      { header: 'BUSINESSUNIT', key: 'BUSINESSUNIT', width: 15, },
      { header: 'DEPARTMENT', key: 'DEPARTMENT', width: 15, },
      { header: 'LOCATION ', key: 'LOCATION', width: 15, },
      { header: 'JOBCODE', key: 'JOBCODE', width: 10 },
      { header: 'REGULARTEMPORARY', key: 'REGULARTEMPORARY', width: 32 },
      { header: 'EMPLOYEECLASS', key: 'EMPLOYEECLASS', width: 15, },
      { header: 'FULLPARTTIME', key: 'FULLPARTTIME', width: 15, },
      { header: 'REGULARSHIFT', key: 'REGULARSHIFT', width: 15, },
      { header: 'STANDARDHOURS', key: 'STANDARDHOURS', width: 15, },
      { header: 'FTE', key: 'FTE', width: 10 },
      { header: 'WORKPERIOD', key: 'WORKPERIOD', width: 32 },
      { header: 'UNIONCODE', key: 'UNIONCODE', width: 15, },
      { header: 'PAYROLLSYSTEM', key: 'PAYROLLSYSTEM', width: 15, },
      { header: 'PAYGROUP', key: 'PAYGROUP', width: 15, },
      { header: 'ELIGIBILITYGROUP', key: 'ELIGIBILITYGROUP', width: 10 },
      { header: 'HOLIDAYSCHEDULE', key: 'HOLIDAYSCHEDULE', width: 32 },
      { header: 'COSTCENTER', key: 'COSTCENTER', width: 15, },
      { header: 'PROBATIONDATE', key: 'PROBATIONDATE', width: 15, },
      { header: 'FREQUENCY', key: 'FREQUENCY', width: 15, },
      { header: 'RATECODE', key: 'RATECODE', width: 15, },
      { header: 'COMPRATE', key: 'COMPRATE', width: 15, },
      { header: 'COMPLETIONDATE', key: 'COMPLETIONDATE', width: 15, },
      { header: 'COMPLETIONTIME', key: 'COMPLETIONTIME', width: 15, },
      { header: 'FLAG', key: 'FLAG', width: 15, },
    ];
    for (let i = 0; i < this.jobdatalist.length; i++) {
      //debugger;
      worksheet.addRow({
        EMPLOYEEID: this.jobdatalist[i].employeID,
        EMPLOYEERECORD: " ",
        EFFECTIVEDATE: this.jobdatalist[i].effectivedate,
        EFFECTIVESEQUENCE: " ",
        ACTION: this.jobdatalist[i].pay_Action,
        ACTIONREASON: " ",
        POSITIONNUMBER: " ",
        REGULATORYREGION: this.jobdatalist[i].regulatory_region,
        COMPANY: this.jobdatalist[i].company,
        BUSINESSUNIT: this.jobdatalist[i].regulatory_region,
        DEPARTMENT: 'HR',
        // this.jobdatalist[i].department_name
        LOCATION: "INTDGPS",
        JOBCODE: "HISTRY",
        REGULARTEMPORARY: "R",
        EMPLOYEECLASS: " ",
        FULLPARTTIME: "F",
        REGULARSHIFT: "N",
        STANDARDHOURS: 40,
        FTE: 1,
        WORKPERIOD: "W",
        UNIONCODE: " ",
        PAYROLLSYSTEM: "GP",
        PAYGROUP: this.jobdatalist[i].regulatory_region,
        ELIGIBILITYGROUP: this.jobdatalist[i].eligibilityGroup,
        HOLIDAYSCHEDULE: "HOL",
        COSTCENTER: " ",
        PROBATIONDATE: this.jobdatalist[i].probdate,
        FREQUENCY: this.jobdatalist[i].frequency,
        RATECODE: this.jobdatalist[i].rateCode,
        COMPRATE: this.jobdatalist[i].compRate,
        COMPLETIONDATE: " ",
        COMPLETIONTIME: " ",
        FLAG: " "
      });
      if (i == this.jobdatalist.length - 1) {
        workbook.xlsx.writeBuffer().then((worksheet: BlobPart) => {
          let blob = new Blob([worksheet], {
            type:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          });
          let qwddwde = 'Job_data'
          // fs.saveAs(blob, qwddwde);
          var file = new File([blob], qwddwde + '.csv');
          let body = new FormData();
          body.append('Dan', file);
          let companycode: any = sessionStorage.getItem('companycode') == undefined ? 'AST' : sessionStorage.getItem('companycode');
          var alphanemuricnumber = Math.floor(1000 + Math.random() * 90);
          var dateforpayroll = new Date();
          dateforpayroll.setDate(dateforpayroll.getDate() - 1);
          let date = this.datePipe.transform(dateforpayroll, 'MMddyyyy');
          console.log(date);
          let filename = companycode + '_JOB_DATA' + '_ADHOC_PRD_' + alphanemuricnumber + '_' + date;
          this.DigiofficeService.insertexcel(body, this.payrollid, filename).subscribe(res => {
            //debugger
            let excelurl = res;
            this.UpdateJobData(res);
            // if (this.excelurl != undefined) {
            //   //alert("Saved")
            //   //return this.excelurl;
            //   //Swal.fire('Excel Uploaded Successfully')
            // }

            //debugger

          })
        });
      }

      //debugger
    }


  }
  public UpdateJobData(jobdata: any) {
    var obj: any = {
      'ID': this.payrollid,
      'JobData': jobdata,
    }
    this.DigiofficeService.UpdatePayrollFilesDetailjobdata(obj)
      .subscribe({
        next: data => {
          this.CreateRecurringInput();
          // this.loader = false;
          // this.createzip();

        }, error: (err) => {
          this.loader = false;
          // Swal.fire('Issue in  InsertPayrollfiles');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              //debugger
            },
          )
        }
      })

  }
  public overtimelistarray: any = [];
  public CreateRecurringInput() {
    //debugger
    this.exporttoexcel2();


  }




  public urls: any = [];
  public createzip() {
    //debugger

    this.urls = [];
    this.DigiofficeService.GetPayrollFilesDetails().
      subscribe({
        next: data => {
          //debugger
          this.loader = false;
          let filearray: any = data.filter(x => x.id == this.payrollid);
          //this.urls.push(filearray[0].lease_control_sheet);
          if (filearray[0].onetimeInput != null) {
            this.urls.push(filearray[0].onetimeInput);
          }
          else {
            this.loader = false;
          }
          if (filearray[0].personalData != null) {
            this.urls.push(filearray[0].personalData)
          } else {
            this.loader = false;
          }
          if (filearray[0].jobData != null) {
            this.urls.push(filearray[0].jobData)
          } else {
            this.loader = false;
          }
          if (filearray[0].recurringInput != null) {
            this.urls.push(filearray[0].recurringInput)
          } else {
            this.loader = false;
          }
          // if (filearray[0].certificates_From_Previous_Employer != null) {
          //   this.urls.push(filearray[0].certificates_From_Previous_Employer)
          // }
          // if (filearray[0].medical_Examination_Report != null) {
          //   this.urls.push(filearray[0].medical_Examination_Report)
          // }




        }, error: (err) => {
          // Swal.fire('Issue in Getting GetPayrollFilesDetails');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              //debugger
            },
          )
        }
      })
  }
  Attactments: any = [];
  public Generatezip() {
    //debugger
    this.showPopup = 0;
    let body = new FormData();

    let companycode: any = 'AST';
    var alphanemuricnumber = Math.floor(1000 + Math.random() * 9000);
    var dateforpayroll = new Date();
    dateforpayroll.setDate(dateforpayroll.getDate() - 1);
    let date = this.datePipe.transform(dateforpayroll, 'MM_dd_yyyy');
    console.log(date);
    let filename = companycode + '_' + alphanemuricnumber + '_' + date + '_' + 'ADHOC'

    this.DigiofficeService.CreateZipfinal(body, this.payrollid, filename, sessionStorage.getItem('companyid')).subscribe(res => {
      //debugger
      let excelurl = res;

      var entity1 = {
        'emailto': 'cbartolome@asticom.com.ph',
        'emailsubject': 'Payroll Integration',
        'emailbody': 'Hi  Team , Digi-Office has Successfully Uploded Payroll Processing File to SFTP Folder.  Please Check' + '<br>  <br> Thanks <br> Team Digi-Office',
        'attachmenturl': this.Attactments,
        'cclist': 'aupasno@asticom.com.ph',
        'bcclist': 'kapingkian@asticom.com.ph',
      }
      this.DigiofficeService.sendemailattachementsforemail(entity1)
        .subscribe({
          next: data => {
            debugger

            //this.updateovertime(this.newovertimelist);

          }, error: (err) => {
            this.loader = false;
            //Swal.fire('Issue in Sending Attachments For Email');
            // this.loader = false;
            // this.loader = false;
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message == null ? err.message : err.error.message,
              'EmailId': localStorage.getItem('EmployeeID'),
              'LoginType': localStorage.getItem('roledid'),
              'API': 'Login APi for Staff'
            }
            this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })
      var entity1 = {
        'emailto': 'sdsalonga@asticom.com.ph',
        'emailsubject': 'Payroll Integration',
        'emailbody': 'Hi  Team , Digi-Office has Successfully Uploded Payroll Processing File to SFTP Folder.  Please Check' + '<br>  <br> Thanks <br> Team Digi-Office',
        'attachmenturl': this.Attactments,
        'cclist': 'aupasno@asticom.com.ph',
        'bcclist': 'kapingkian@asticom.com.ph',
      }
      this.DigiofficeService.sendemailattachementsforemail(entity1)
        .subscribe({
          next: data => {
            debugger

            //this.updateovertime(this.newovertimelist);

          }, error: (err) => {
            this.loader = false;
            //Swal.fire('Issue in Sending Attachments For Email');
            // this.loader = false;
            // this.loader = false;
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message == null ? err.message : err.error.message,
              'EmailId': localStorage.getItem('EmployeeID'),
              'LoginType': localStorage.getItem('roledid'),
              'API': 'Login APi for Staff'
            }
            this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })

      var entity1 = {
        'emailto': 'kapingkian@asticom.com.ph',
        'emailsubject': 'Payroll Integration',
        'emailbody': 'Hi  Team , Digi-Office has Successfully Uploded Payroll Processing File to SFTP Folder.  Please Check' + '<br>  <br> Thanks <br> Team Digi-Office',
        'attachmenturl': this.Attactments,
        'cclist': 'aupasno@asticom.com.ph',
        'bcclist': 'kapingkian@asticom.com.ph',
      }
      this.DigiofficeService.sendemailattachementsforemail(entity1)
        .subscribe({
          next: data => {
            debugger

            //this.updateovertime(this.newovertimelist);

          }, error: (err) => {
            this.loader = false;
            //Swal.fire('Issue in Sending Attachments For Email');
            // this.loader = false;
            // this.loader = false;
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message == null ? err.message : err.error.message,
              'EmailId': localStorage.getItem('EmployeeID'),
              'LoginType': localStorage.getItem('roledid'),
              'API': 'Login APi for Staff'
            }
            this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })

      var entity1 = {
        'emailto': 'aupasno@asticom.com.ph',
        'emailsubject': 'Payroll Integration',
        'emailbody': 'Hi  Team , Digi-Office has Successfully Uploded Payroll Processing File to SFTP Folder.  Please Check' + '<br>  <br> Thanks <br> Team Digi-Office',
        'attachmenturl': this.Attactments,
        'cclist': 'aupasno@asticom.com.ph',
        'bcclist': 'kapingkian@asticom.com.ph',
      }
      this.DigiofficeService.sendemailattachementsforemail(entity1)
        .subscribe({
          next: data => {
            debugger

            //this.updateovertime(this.newovertimelist);

          }, error: (err) => {
            this.loader = false;
            //Swal.fire('Issue in Sending Attachments For Email');
            // this.loader = false;
            // this.loader = false;
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message == null ? err.message : err.error.message,
              'EmailId': localStorage.getItem('EmployeeID'),
              'LoginType': localStorage.getItem('roledid'),
              'API': 'Login APi for Staff'
            }
            this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })




      var entity1 = {
        'emailto': 'cccruz@asticom.com.ph',
        'emailsubject': 'Payroll Integration',
        'emailbody': 'Hi  Team , Digi-Office has Successfully Uploded Payroll Processing File to SFTP Folder.  Please Check' + '<br>  <br> Thanks <br> Team Digi-Office',
        'attachmenturl': this.Attactments,
        'cclist': 'aupasno@asticom.com.ph',
        'bcclist': 'kapingkian@asticom.com.ph',
      }
      this.DigiofficeService.sendemailattachementsforemail(entity1)
        .subscribe({
          next: data => {
            debugger
            this.Attactments = [];
            this.loader = false;
            this.seleconebtn = false;
            /*  Swal.fire('File Uploaded to server Successfully'); */
            this.showPopup = 1;
            this.messageId = 72;
            /*   Swal.fire(
                'Completed',
                'File Uploaded to SFTP server Successfully!',
                'success'
              ) */
            //this.updateovertime(this.newovertimelist);
            this.ngOnInit();
          }, error: (err) => {
            this.loader = false;
            //Swal.fire('Issue in Sending Attachments For Email');
            // this.loader = false;
            // this.loader = false;
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message == null ? err.message : err.error.message,
              'EmailId': localStorage.getItem('EmployeeID'),
              'LoginType': localStorage.getItem('roledid'),
              'API': 'Login APi for Staff'
            }
            this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        })


      this.loader = false;
    })

  }



  newarry: any = [];
  overtimeadjustments: any = [];
  overtimelist: any;
  newovertimelist: any;
  pastdate: any;
  pastdate1: any;
  i: any;
  exporttoexcel2() {
    //debugger;
    //debugger;
    this.loader = true;
    this.newovertimelist = [];

    let companycode: any = sessionStorage.getItem('companycode') == undefined ? 'AST' : sessionStorage.getItem('companycode');
    var alphanemuricnumber = Math.floor(1000 + Math.random() * 900);
    var dateforpayroll = new Date();
    dateforpayroll.setDate(dateforpayroll.getDate() - 1);
    let date = this.datePipe.transform(dateforpayroll, 'MMddyyyy');
    console.log(date);
    let filename = companycode + '_ONE_TIME_INPUT_' + 'ADHOC_PRD_' + alphanemuricnumber + '_' + date;


    var alphanemuricnumber1 = Math.floor(1000 + Math.random() * 90);
    var alphanemuricnumber2 = Math.floor(1000 + Math.random() * 90);
    var alphanemuricnumber3 = Math.floor(1000 + Math.random() * 90);
    let recurinputfilename = companycode + '_RECURRING_INPUT_' + 'ADHOC_PRD_' + alphanemuricnumber1 + '_' + date;
    let jobdatafilename = companycode + '_JOB_DATA' + '_ADHOC_PRD_' + alphanemuricnumber2 + '_' + date;
    let personaldatafilename = companycode + '_PERSONAL_DATA' + '_ADHOC_PRD_' + alphanemuricnumber + '_' + date;

    var obj1: any = {
      'payrollid': this.payrollid,
      'StartDate': this.startdate,
      'EndDate': this.enddate,
      'cutoffdate': this.cutoffdate,
      'attachmenturl': this.ID,
      'filename': filename,
      'recurinputfilename': recurinputfilename,
      'jobdatafilename': jobdatafilename,
      'personaldatafilename': personaldatafilename
    }
    this.DigiofficeService.CreateExcelFilesForPreliminary(obj1)
      .subscribe({
        next: data => {
          //debugger 
          debugger
          console.log(data);

          Swal.fire('Final Payroll Completed');
          //this.Generatezip();
          this.loader = false;

        }, error: (err) => {
          this.loader = false;
          //this.Generatezip();
          //Swal.fire('Error in Generating Payroll.');
          // setInterval(() => {
          //   this.Generatezip();

          // }, 10000);


          // Swal.fire('Issue in Getting Hoilday');
          // Insert error in Db Here//
          // var obj = {
          //   'PageName': this.currentUrl,
          //   'ErrorMessage': err.error.message
          // }
          // this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
          //   data => {
          //     //debugger
          //   },
          // )
        }
      })
  }


  public updateovertime(overtimelist: any) {
    for (let i = 0; i <= overtimelist.length; i++) {
      var obj: any = {
        'ID': overtimelist[i].id,
        'Processed': 1,


      }
      this.DigiofficeService.UpdateProcessedOvertime(obj)
        .subscribe({
          next: data => {
            this.loader = false;
          }, error: (err) => {
            this.loader = false;
            // Swal.fire('Issue in  InsertPayrollfiles');
            // Insert error in Db Here//
            var obj = {
              'PageName': this.currentUrl,
              'ErrorMessage': err.error.message
            }
            this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
              data => {
                //debugger
              },
            )
          }
        })
    }
  }

  public CalculateLWOPDays() {
    debugger
    for (let i = 0; i <= this.ID.length; i++) {

      if (i == this.ID.length - 1) {
        this.Genearerecurringinputfiles();
      } else {
        this.DigiofficeService.Get_Salary_Splitsfor15days(this.ID[i], this.startdate, this.enddate)
          .subscribe({
            next: data => {
              debugger
              console.log(data)
              let temp: any = data;
              var obj: any = {
                'Elemnt': 'LWOP',
                'EmployeID': temp[0].employeid,
                'Unit': temp[0].lwop,
                'Percentage': 0,
                'Amount': 0,
                'Batch': 0,
                'Date': this.myDate
              }
              this.newarry.push(obj);


            }
          })
      }



    }

  }


  /**
   * Genearerecurringinputfiles
   */
  public Genearerecurringinputfiles() {
    //debugger
    const Excel = require('exceljs');
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet("Recurring_Data");

    worksheet.columns = [
      { header: 'SequenceNumber', key: 'SequenceNumber', width: 32 },
      { header: 'EmployeeID', key: 'EmployeeID', width: 100 },
      { header: 'Element', key: 'Element', width: 32, },
      { header: 'Unit', key: 'Unit', width: 32, },
      { header: 'Amount', key: 'Amount', width: 32, },
      { header: 'BeginDate', key: 'BeginDate', width: 32, },
      { header: 'EndDate	', key: 'EndDate	', width: 32 },
      // { header: 'Flag', key: 'Flag', width: 32 },
      // { header: 'Remarks', key: 'Remarks', width: 15, }
    ];


    for (let i = 0; i < this.newarry.length; i++) {
      debugger;
      worksheet.addRow({
        SequenceNumber: i + 1,
        EmployeeID: this.newarry[i].EmployeID,
        Element: this.newarry[i].Elemnt,
        Unit: this.newarry[i].Unit,
        Amount: this.newarry[i].Amount,
        BeginDate: this.datePipe.transform(this.startdate, 'MM-dd-yyyy'),
        EndDate: this.datePipe.transform(this.startdate, 'MM-dd-yyyy'),
        // Flag: 'A',
        // Remarks: '',

      });



    }
    workbook.xlsx.writeBuffer().then((worksheet: BlobPart) => {
      let blob = new Blob([worksheet], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });
      let qwddwde = 'Recurring_Data'
      // fs.saveAs(blob, qwddwde);
      var file = new File([blob], qwddwde + '.csv');
      let body = new FormData();
      body.append('Dan', file);
      let companycode: any = sessionStorage.getItem('companycode') == undefined ? 'AST' : sessionStorage.getItem('companycode');
      var alphanemuricnumber = Math.floor(1000 + Math.random() * 900);
      var dateforpayroll = new Date();
      dateforpayroll.setDate(dateforpayroll.getDate() - 1);
      let date = this.datePipe.transform(dateforpayroll, 'MMddyyyy');
      console.log(date);
      let filename = companycode + '_ONE_TIME_INPUT_' + 'ADHOC_PRD_' + alphanemuricnumber + '_' + date;
      this.DigiofficeService.insertexcel(body, this.payrollid, filename).subscribe(res => {
        //debugger
        let excelurl = res;
        this.UpdateRecurring_Input(res);
        // if (this.excelurl != undefined) {
        //   //alert("Saved")
        //   //return this.excelurl;
        //   //Swal.fire('Excel Uploaded Successfully')
        // }

        //debugger

      })
    });


  }

  public UpdateRecurring_Input(Recurring_Input: any) {
    //debugger
    var obj: any = {
      'ID': this.payrollid,
      'Recurring_Input': Recurring_Input,


    }
    this.DigiofficeService.UpdatePayrollFilesDetailRecurring_Input(obj)
      .subscribe({
        next: data => {

          //this.Generatezip();

        }, error: (err) => {
          this.loader = false;
          // Swal.fire('Issue in  InsertPayrollfiles');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              //debugger
            },
          )
        }
      })
  }










  sequenceNumber1: any;
  exporttoexcel3() {
    //debugger;
    var ExportData = [];
    this.sequenceNumber1 = 0;
    for (let i = 0; i < this.payrolldatalist.length; i++) {
      //debugger;
      this.sequenceNumber1 = i + 1;
      let singleData = {
        SequenceNumber: String,
        EmployeeID: String,
        EndDate: String,
        BeginDate: String,
        Amount: String,
        Batch: String,
        Element: String,
        Flag: String,
        Remarks: String,
      }
      singleData.SequenceNumber = this.sequenceNumber1;
      singleData.EmployeeID = this.newstafflist[i].id;
      singleData.Element = this.newstafflist[i].element;
      singleData.Amount = this.newstafflist[i].abc;
      singleData.BeginDate = this.newstafflist[i].enddate;
      singleData.EndDate = this.newstafflist[i].enddate;
      singleData.Flag = this.newstafflist[i].flag;
      singleData.Remarks = this.newstafflist[i].semiadjustment;
      ExportData.push(singleData);
      //debugger
    }
    const Export_to_excel_options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'ASTICOM RECURRING INPUT',
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      filename: 'ASTICOM RECURRING INPUT'
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    //debugger
    csvExporter.generateCsv(ExportData);
  }
  uplodfielstopeoplesoft: any
  public newstafflist: any = [];
  exporttoexcel4() {
    //debugger;
    this.newstafflist = [];





  }
  loandata: any;
  public exportloandata() {
    //debugger
    this.DigiofficeService.GetEmployeeLoansforpayroll()
      .subscribe({
        next: data => {
          //debugger
          //debugger
          this.loandata = data;
          this.loader = false;
          var loandataarray: any = [];
          for (let i = 0; i < this.loandata.length; i++) {
            //debugger;
            let singleData: any = {
              SequenceNumber: String,
              EmployeeID: String,
              Element: String,
              Amount: String,
              BeginDate: String,
              EndDate: String,

            }
            singleData.SequenceNumber = i + 1;
            singleData.EmployeeID = this.loandata[i].employeID;
            singleData.Element = this.loandata[i].loanType;
            singleData.Amount = this.loandata[i].emiamount;
            singleData.BeginDate = this.datePipe.transform(this.loandata[i].startdate, 'MM-dd-yyyy');
            singleData.EndDate = this.loandata[i].enddate;
            loandataarray.push(singleData);
            //debugger
          }
          const Export_to_excel_options = {
            fieldSeparator: ',',
            quoteStrings: '"',
            decimalSeparator: '.',
            showLabels: true,
            showTitle: true,
            title: 'AST_RECURRING_INPUT_ADHOC_Updat',
            useTextFile: false,
            useBom: true,
            useKeysAsHeaders: true,
            filename: 'AST_RECURRING_INPUT_ADHOC_Updat'
          };
          const csvExporter = new ExportToCsv(Export_to_excel_options);
          //debugger
          csvExporter.generateCsv(loandataarray);



        }, error: (err) => {
          // Swal.fire('Issue in GetEmployeeLoans');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              //debugger
            },
          )
        }
      })
  }


  public getglmasterexcel() {
    let hhh = this.tableToJson(document.getElementById('downloadaplication'));
    this.exportAsExcelFile(hhh, "AST_PERSONAL_DATA_SCHED_TST");
  }

  public tableToJson(table: any) {
    //debugger
    var data: any = []; // first row needs to be headers
    var headers = [];
    for (var i = 0; i < table.rows[0].cells.length; i++) {
      headers[i] = table.rows[0].cells[i].innerHTML.toUpperCase().replace(/ /gi, '');
    }
    // go through cells 
    for (var i = 1; i < table.rows.length; i++) {
      var tableRow = table.rows[i];
      var rowData: any = {};
      for (var j = 0; j < tableRow.cells.length - 1; j++) {
        rowData[headers[j]] = tableRow.cells[j].innerHTML;
      } data.push(rowData);
    }
    return data;
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    //debugger;
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    //debugger
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    var file = new File([data], 'Report' + '.csv');
    let body = new FormData();
    body.append('Report', file);
    this.DigiofficeService.GetExcel1(body)
      .subscribe({
        next: res => {
          //debugger
          if (res != undefined) {
            //Swal.fire('File Uploaded to Server')
          }
          //debugger
        }, error: (err) => {
          // Swal.fire('Issue in Getting GetExcel1');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              //debugger
            },
          )
        }
      })
  }

}