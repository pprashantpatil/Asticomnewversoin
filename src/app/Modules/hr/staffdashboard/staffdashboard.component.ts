import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DigiofficecorehrService } from '../../../Services/digiofficecorehr.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import * as JSZip from 'jszip';
import Swal from 'sweetalert2';
import { ExportToCsv } from 'export-to-csv';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-staffdashboard',
  templateUrl: './staffdashboard.component.html',
  styleUrls: ['./staffdashboard.component.css']
})
export class StaffdashboardComponent implements OnInit {

  constructor(public DigiofficeService: DigiofficecorehrService, public router: Router) { }
  viewMode = 'tab1';
  stafflist: any;
  term: any;
  p: any = 1;
  count1: any = 10;
  employeeid: any;
  ename: any;
  dob: any;
  TINNo: any;
  Gender: any;
  EmailID: any;
  mobile: any;
  Address: any;
  AddressLine1: any;
  department_name: any;
  Role: any;
  doh: any;
  BaseSal: any;
  dependentdetails: any;
  stafflistCopy: any;
  count: any;
  Departmentlist: any;
  level: any;
  Department: any;
  RoleType: any;
  RoleTypeList: any;
  loader: any;
  currentUrl: any;
  date: any;
  roleID: any;
  deptID: any;
  DeptList: any;
  levellist: any;
  Citylist: any;
  loanlist: any;
  showPopup: number = 0;
  messageId: number = 0;
  dropdownRoleList: any = [];
  roleselectedItems: any = [];
  roledropdownSettings: any = {};
  dropdownDeptList: any = [];
  deptselectedItems: any = [];
  deptdropdownSettings: any = {};
  login: any;
  fileName = 'Employee Report.xlsx';
  leavelist: any;
  leavelist23: any;
  ngOnInit(): void {
    debugger


    this.currentUrl = window.location.href;
    this.login = sessionStorage.getItem('roledid');
    this.loader = true;
    this.showbtn = false;
    this.AssignedCompany = 0;
    this.Department = 0;
    this.level = 0;
    this.RoleType = 0;
    this.GetStaff();
    this.GetDepartment();
    this.GetRoleType();

    this.roledropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'short',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };

    this.deptdropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'department_name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      closeDropDownOnSelection: true
    };


    this.DigiofficeService.GetStateType()
      .subscribe({
        next: data => {
          debugger
          this.leavelist = data;
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting State Type');
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

    this.DigiofficeService.GetCityType()
      .subscribe({
        next: data => {
          debugger
          this.leavelist23 = data;
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting City Type');
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



  public GetDepartment() {
    this.DigiofficeService.GetDepartment().
      subscribe({
        next: data => {
          debugger
          this.dropdownDeptList = data;
        }, error: (err) => {
          //Swal.fire('Issue in Getting Department');
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
    this.DigiofficeService.GetRoleType().
      subscribe({
        next: data => {
          debugger
          this.dropdownRoleList = data;
        }, error: (err) => {
          //Swal.fire('Issue in Getting Department');
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
    this.getRoleType();
  }


  deptonItemSelect(item: any) {
    debugger
    console.log(item);
    this.Department = item.id;
    this.getDepartment();
  }
  payrollBit: any;
  stafflist1: any;
  stafflistCopy1: any;
  stafflist123:any;
  public GetStaff() {
    this.DigiofficeService.GetAllStaffNew().
      subscribe({
        next: data => {
          debugger
          // this.stafflist = data;
          this.stafflist123=data;
          this.stafflist = data.filter(x => x.payrollBit == 0 || x.payrollBit == null);
          this.stafflistCopy = this.stafflist;
          this.stafflist1 = data.filter(x => x.payrollBit == 1);
          this.stafflistCopy1 = this.stafflist1;
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting All Staff');
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


  public getdate(event: any) {
    debugger
    this.date = event.target.value;
    this.DigiofficeService.GetMyDetails().
      subscribe({
        next: data => {
          debugger
          this.stafflist = data.filter(x => x.filterdate == this.date);
        }, error: (err) => {
          // Swal.fire('Issue in Filtering Data');
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



  public Filterstaff() {
    debugger
    let searchCopy = this.term.toLowerCase();
    // this.stafflist = this.stafflistCopy.filter((x: { employeID: string; role: string }) =>
    //   x.employeID.toLowerCase().includes(searchCopy));
    // this.count = this.stafflist.length;
    if (searchCopy.length == 0) {
      this.GetStaff();
    } else {
      this.DigiofficeService.GetAllStaffNewforsearch(searchCopy).
        subscribe({
          next: data => {
            debugger
            // this.stafflist = data;
            this.stafflist = data.filter(x => x.payrollBit == 0 || x.payrollBit == null);
            this.stafflistCopy = this.stafflist;
            this.stafflist1 = data.filter(x => x.payrollBit == 1);
            this.stafflistCopy1 = this.stafflist1;
            this.loader = false;
          }, error: (err) => {
            // Swal.fire('Issue in Getting All Staff');
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










  public attachments01: any = [];

  // public convetToPDF20() {
  //   debugger
  //   var data: any = document.getElementById('contentToConvert456');
  //   html2canvas(data, { useCORS: true }).then(canvas => {
  //     // Few necessary setting options
  //     var imgWidth = 208;
  //     var pageHeight = 295;
  //     var imgHeight = canvas.height * imgWidth / canvas.width;
  //     var heightLeft = imgHeight;

  //     const contentDataURL = canvas.toDataURL('image/png')
  //     let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
  //     var position = 0;

  //     while (heightLeft >= 0) {
  //       const contentDataURL = canvas.toDataURL('image/png')
  //       position = heightLeft - imgHeight;
  //       pdf.addPage();
  //       pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
  //       heightLeft -= pageHeight;

  //     }
  //     pdf.deletePage(1)
  //     var pdf1 = pdf.output('blob');
  //     var file = new File([pdf1], "Employee201FileReport.pdf");
  //     pdf.save("Employee201FileReport.pdf");
  //     this.attachments01.push(file);

  //     let body = new FormData();
  //     debugger
  //     body.append('Employee201FileReport', file);
  //     console.log('pdf', pdf1)




  //   }).then(() => {

  //   });;
  // }


  public DeleteStaff(list: any) {
    debugger;
    this.showPopup = 0;
    Swal.fire({
      title: 'Delete Record',
      text: 'Are you sure you want to delete it?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        this.DigiofficeService.DeleteBuildingStaff(list.id)
          .subscribe({
            next: data => {
              debugger
              /*    Swal.fire('Deleted Successfully') */
              this.loader = false;
              this.showPopup = 1;
              this.messageId = 11;
              this.ngOnInit();
            }, error: (err) => {
              // Swal.fire('Issue in Deleting Staff');
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





  public urls: any = [];








  clikedid: any;
  public showbttn(item: any) {
    if (this.showbtn == true) {
      this.showbtn = false;
    } else {
      this.showbtn = true;
    }

    this.clikedid = item.employeID;
  }
  public Edit() {
    this.router.navigate(['/HR/AddressDetailsWizard', this.clikedid]);

  }

  public Upload() {
    this.router.navigate(['/Uploademployeedocumets', this.clikedid]);

  }

  showbtn: any;


  // public cretezip(){
  //   var Minizip = require('minizip-asm.js')
  //   var text = new Buffer("Abc~~~");
  //   var mz = new Minizip();

  //   mz.append("haha/abc.txt", text, {password: "~~~"});
  //   fs.writeFileSync("abc.zip", new Buffer(mz.zip()));
  // }



  fromlogin: any;
  exceldata: any;
  arrayBuffer: any;
  filetype: any;
  file: any;

  incomingfile(event: any) {
    debugger;
    this.showPopup = 0;
    this.file = event.target.files[0];
    let a = this.file.name;
    var characters = a.substr(a.length - 5);
    debugger;
    if (characters == ".xlsx" || characters == ".XLSX") {
      let fileReader = new FileReader();
      fileReader.onload = e => {
        debugger
        this.arrayBuffer = fileReader.result;
        var data = new Uint8Array(this.arrayBuffer);
        var arr = new Array();
        for (var i = 0; i != data.length; ++i)
          arr[i] = String.fromCharCode(data[i]);
        var bstr = arr.join("");
        var workbook = XLSX.read(bstr, { type: "binary" });
        var first_sheet_name = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[first_sheet_name];
        console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
        this.exceldata = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      };
      fileReader.readAsArrayBuffer(this.file);



    } else {
      /* Swal.fire("Imported file format not supported."); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 68;
    }
  }

  i: any
  StaffID: any;
  roletypeid: any;
  RoleTypeList2: any;
  dept2list: any;
  deptid: any;
  Attachment: any;
  WorkTimings: any;
  stafflist1234:any;
  supervisor:any;
  LoginType:any;
  // public async Upload_file() {
  //   debugger;
  //   this.showPopup = 0
  //   if (this.exceldata == undefined) {
  //     /*  Swal.fire('Choose a File'); */
  //     this.loader = false;
  //     this.showPopup = 1;
  //     this.messageId = 209;
  //   } else {
  //     let apiarray = [];
  //     for (this.i = 0; this.i < this.exceldata.length; this.i++) {

  //       this.RoleTypeList2 = this.dropdownRoleList.filter((x: { short: any; }) => x.short === this.exceldata[this.i].Positiontitle,


  //       )

  //       if (this.RoleTypeList2.length != 0) {
  //         this.roletypeid = this.RoleTypeList2[0].id
  //       }
  //       else {
  //         this.roletypeid = 0
  //       }


  //       this.dept2list = this.dropdownDeptList.filter((x: { department_name: any; }) => x.department_name === this.exceldata[this.i].Department

  //       )
  //       if (this.dept2list.length != 0) {
  //         this.deptid = this.dept2list[0].id
  //       }
  //       else {
  //         this.deptid = 0
  //       }


  //       this.stafflist1234=this.stafflist123.filter((x: { employeID: any; }) => x.employeID === String(this.exceldata[this.i].ManagerEmployeeID))
  //       if (this.stafflist1234.length != 0) {
  //         this.supervisor = this.stafflist1234[0].id
  //       }
  //       else {
  //         this.supervisor = 0
  //       }

  //       if (this.exceldata[this.i].LoginType == 'Employee') {
  //         this.LoginType = 6
  //       }
  //       else {
  //         this.LoginType = 2
  //       }


  //       var Enitity = {
  //         'BuildingID': 56,
  //         'Name': this.exceldata[this.i].FIRSTNAME,
  //         'EmployeeID': this.exceldata[this.i].EMPLID,
  //         'Middle_Name': this.exceldata[this.i].MIDDLENAME,
  //         'Last_Name': this.exceldata[this.i].LASTNAME,

  //         'EmailID': this.exceldata[this.i].EMAILADDRESS,
  //         'TypeID': this.roletypeid,
  //         // 'Type': Number(this.RoleType),
  //         'Address': this.exceldata[this.i].ADDRESS1 + ' ' + this.exceldata[this.i].ADDRESS2,
  //         'Attachment': this.Attachment == " " ? null : this.Attachment,
  //         'JoiningDate': this.exceldata[this.i].JoiningDate.slice(1, -1) == " " ? "1990-01-01 00:00:00.000" : this.exceldata[this.i].JoiningDate.slice(1, -1),
  //         'CurrentBMS': this.exceldata[this.i].CurrentSalary,
  //         'LeavesPerMonth': 0.0,
  //         'WorkTimings': this.WorkTimings,
  //         'PhoneNo':this.exceldata[this.i].CELLULARPHONE,
  //         'ContactNumber': this.exceldata[this.i].CELLULARPHONE,
  //         'Supervisor':  this.supervisor,

  //         'ResignationDate': this.exceldata[this.i].JoiningDate.slice(1, -1) == " " ? "1990-01-01 00:00:00.000" : this.exceldata[this.i].JoiningDate.slice(1, -1),

  //         'ChaildTotal': 0,
  //         'MedicalLeaveEntitlement': 0,
  //         'MaternitityLeaveEntitlement': 0,
  //         'PaternitityLeaveEntitlement': 0,
  //         'CompassionateLeaveEntitlement': 0,
  //         'Leavesfrompreviousyear': 0,
  //         'ExtendedChildcareLeaveEntitlement': 0,
  //         'MarriageLeaveEntitlement': 0,
  //         'Title': this.exceldata[this.i].NAMEPREFIX,

  //         'PlaceO_f_Birth': this.exceldata[this.i].CITY,
  //         'Country_Of_Birth': 'Philipines',
  //         'Age': this.exceldata[this.i].Age,
  //         'Gender': this.exceldata[this.i].GENDER,
  //         'Status': this.exceldata[this.i].MARITALSTATUS,
  //         // 'Date_Of_Marriage' : (String(this.Date_Of_Marriage ) == "" ? "Null" + "," : "'" + String(this.Date_Of_Marriage) + "',"),

  //         // 'Date_Of_Marriage': this.Date_Of_Marriage == " " ? "1990-01-01 00:00:00.000" : this.Date_Of_Marriage,
  //         // 'Date_Of_Marriage': this.Date_Of_Marriage,
  //         'Religion': this.exceldata[this.i].Religion == undefined ? null : this.exceldata[this.i].Religion,
  //         // 'Citizen_Ship': this.Citizen_Ship == undefined ? null : this.Citizen_Ship,
  //         // 'Ethnicity': this.Ethnicity == undefined ? null : this.Ethnicity,
  //         // 'Nationality': this.Nationality,
  //         // 'Is_Disabled': this.Is_Disabled == " " ? 0 : this.Is_Disabled,
  //         // 'Blood_Group': this.Blood_Group,
  //         // 'Height': this.Height == " " ? 0 : this.Height,
  //         // 'Weight': this.Weight == " " ? 0 : this.Weight,
  //         // 'MajorIllness': this.MajorIllness,
  //         // 'IS_Night_Blind': this.IS_Night_Blind == " " ? 0 : this.IS_Night_Blind,
  //         // 'Is_Color_Blind': this.Is_Color_Blind == " " ? 0 : this.Is_Color_Blind,
  //         'DOB': this.exceldata[this.i].BIRTHDATE.slice(1, -1) == " " ? "1990-01-01 00:00:00.000" : this.exceldata[this.i].BIRTHDATE.slice(1, -1),
  //         'Signature': this.Attachment == " " ? null : this.Attachment,
  //         'Paygroup': this.exceldata[this.i].REGULAR,
  //         'PagiBig_ID': this.exceldata[this.i].HDMFNO,
  //         'PagiBigAccountNo': this.exceldata[this.i].HDMFNO,
  //         // 'PagibigMembership': this.PagibigMembership,
  //         // 'PagibigRemarks': this.PagibigRemarks,
  //         'EMPLOYEE_TIN': this.exceldata[this.i].TIN,
  //         'PHILHEALTH_NO': this.exceldata[this.i].PHILHEALTHNO,
  //         'SSSNO': this.exceldata[this.i].SSSNO,
  //         'EligibilityGroup': this.exceldata[this.i].EligibilityGroup,
  //         'CivilStatus': 'NA',
  //         'PagiBigMP2': 'NA',
  //         // 'PagiBigAccountNo': this.PagiBigAccountNo,
  //         // 'PagibigMembership': this.PagibigMembership,
  //         // 'PagibigRemarks': this.PagibigRemarks,


  //         'department': this.deptid,
  //         'Level': this.LoginType,
  //         'logintype': this.LoginType,
  //         'ParentCompany': 'NA',
  //         'AssignedCompany': this.AssignedCompany,
  //         'ShiftID': 0,
  //         'Restdays': 'Saturday',
  //         'OrginalBms': this.exceldata[this.i].CurrentSalary,
  //         'PreviousEffectivityBMSDate': this.exceldata[this.i].JoiningDate.slice(1, -1) == " " ? "1990-01-01 00:00:00.000" : this.exceldata[this.i].JoiningDate.slice(1, -1),
  //         'PreviousBMS': this.exceldata[this.i].CurrentSalary,
  //         'CurrentEffectivityBMSDate': this.exceldata[this.i].JoiningDate.slice(1, -1) == " " ? "1990-01-01 00:00:00.000" : this.exceldata[this.i].JoiningDate.slice(1, -1),

  //         'COLA': 0,
  //         'IncentiveLeave': 0,
  //         'HMOInsurance': 0,
  //         'MeritInsurance': 0,
  //         'DailerLicense': 0,
  //         'Incrementals': 0,
  //         'TaxStatus': 0,
  //         'GCashNumber': 0,
  //         'TalentSegment': 0,
  //         'CostCentre': 0,
  //         'TranspoAllowance': 0,
  //         'CommAllowance': 0,
  //         'MealAllowance': 0,
  //         'RiceAllowance': 0,
  //         'MedicineAllowance': 0,
  //         'MaintenanceDepreciationAllowance': 0,
  //         'EffectivityofAllowance': 0,
  //         'Frequency':this.exceldata[this.i].Frequency,
  //         'RateCode':this.exceldata[this.i].RateCode,

  //       }
        
  //       debugger
  //       this.DigiofficeService.InsertMyDetails(Enitity).subscribe(
  //         async data => {
  //           debugger

  //           if (data == 0) {
  //             Swal.fire("Error in Uploading Data. Incorrect Data or your  License Count is over. ");
  //             var obj = {
  //               'PageName': "Staff Upload",
  //               'ErrorMessage': "EmailID or Mobile Number Already Exists or License Count is Over.",
  //               'Name': this.exceldata[this.i-1].FIRSTNAME,
  //               'EmployeeID': this.exceldata[this.i-1].EMPLID,
  //               'EmployeeCount': 1,
  //               'UserID': this.exceldata[this.i-1].EMPLID,
  //               'LoginType': "HR",
  //               'API': "BULK Upload",
  //             }

  //             this.DigiofficeService.InsertStaffBulkUploadExceptions(obj)
  //               .subscribe({
  //                 next: data => {
  //                   debugger
  //                   //Swal.fire("Error in Uploading Data. Please see details under Bulk Upload Missing Staff Menu in Configuration");
  //                   location.href = "#/HR/StaffBulkUploadExceptions";
  //                   this.loader = false;
  //                 }, error: (err) => {
  //                   // Swal.fire('Issue in Inserting Exception');
  //                   // this.loader = false;
  //                   // Insert error in Db Here//
  //                   var obj = {
  //                     'PageName': this.currentUrl,
  //                     'ErrorMessage': err.error.message
  //                   }
  //                   this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
  //                     data => {
  //                       debugger
  //                     },
  //                   )
  //                 }
  //               })
  //           }
        
  //           else {
  //             Swal.fire('Saved Successfully');
  //             this.StaffID = data;
  //           }



  //         }, error => {

  //         }
  //       )
  //     }
  //   }


  // }


  public async Upload_file() {
    debugger;
    this.showPopup = 0;
    if (this.exceldata == undefined) {
      /*  Swal.fire('Choose a File'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 209;
    } else {
      let apiarray = [];
      for (this.i = 0; this.i < this.exceldata.length; this.i++) {
        this.RoleTypeList2 = this.dropdownRoleList.filter(
          (x: { short: any }) =>
            x.short === this.exceldata[this.i].Positiontitle
        );

        if (this.RoleTypeList2.length != 0) {
          this.roletypeid = this.RoleTypeList2[0].id;
        } else {
          this.roletypeid = 0;
        }

        this.dept2list = this.dropdownDeptList.filter(
          (x: { department_name: any }) =>
            x.department_name === this.exceldata[this.i].Department
        );
        if (this.dept2list.length != 0) {
          this.deptid = this.dept2list[0].id;
        } else {
          this.deptid = 0;
        }

        this.stafflist1234 = this.stafflist123.filter(
          (x: { employeID: any }) =>
            x.employeID === String(this.exceldata[this.i].ManagerEmployeeID)
        );
        if (this.stafflist1234.length != 0) {
          this.supervisor = this.stafflist1234[0].id;
        } else {
          this.supervisor = 0;
        }

        if (this.exceldata[this.i].LoginType == 'Employee') {
          this.LoginType = 6;
        } else {
          this.LoginType = 2;
        }

        var Enitity = {
          BuildingID: 56,
          Name: this.exceldata[this.i].FIRSTNAME,
          EmployeeID: this.exceldata[this.i].EMPLID,
          Middle_Name: this.exceldata[this.i].MIDDLENAME,
          Last_Name: this.exceldata[this.i].LASTNAME,

          EmailID: this.exceldata[this.i].EMAILADDRESS,
          TypeID: this.roletypeid,
          // 'Type': Number(this.RoleType),
          Address:
            this.exceldata[this.i].ADDRESS1 +
            ' ' +
            this.exceldata[this.i].ADDRESS2,
          Attachment: this.Attachment == ' ' ? null : this.Attachment,
          JoiningDate:
            this.exceldata[this.i].JoiningDate.slice(1, -1) == ' '
              ? '1990-01-01 00:00:00.000'
              : this.exceldata[this.i].JoiningDate.slice(1, -1),
          CurrentBMS: this.exceldata[this.i].CurrentSalary,
          LeavesPerMonth: 0.0,
          WorkTimings: this.WorkTimings,
          PhoneNo: this.exceldata[this.i].CELLULARPHONE,
          ContactNumber: this.exceldata[this.i].CELLULARPHONE,
          Supervisor: this.supervisor,

          ResignationDate:
            this.exceldata[this.i].JoiningDate.slice(1, -1) == ' '
              ? '1990-01-01 00:00:00.000'
              : this.exceldata[this.i].JoiningDate.slice(1, -1),

          ChaildTotal: 0,
          MedicalLeaveEntitlement:
            this.exceldata[this.i].VacationLeaveEntitlement,
          MaternitityLeaveEntitlement:
            this.exceldata[this.i].LeavewithoutPayVLEntitlement,
          PaternitityLeaveEntitlement: 0,
          CompassionateLeaveEntitlement:
            this.exceldata[this.i].SickLeaveEntitlement,
          Leavesfrompreviousyear:
            this.exceldata[this.i].ServiceIncentiveLeaveEntitlement,
          ExtendedChildcareLeaveEntitlement:
            this.exceldata[this.i].LeavewithPayEntitlement,
          MarriageLeaveEntitlement:
            this.exceldata[this.i].LeavewithoutPaySLEntitlement,
          Title: this.exceldata[this.i].NAMEPREFIX,

          PlaceO_f_Birth: this.exceldata[this.i].CITY,
          Country_Of_Birth: 'Philipines',
          Age: this.exceldata[this.i].Age,
          Gender: this.exceldata[this.i].GENDER,
          Status: this.exceldata[this.i].MARITALSTATUS,
          // 'Date_Of_Marriage' : (String(this.Date_Of_Marriage ) == "" ? "Null" + "," : "'" + String(this.Date_Of_Marriage) + "',"),

          // 'Date_Of_Marriage': this.Date_Of_Marriage == " " ? "1990-01-01 00:00:00.000" : this.Date_Of_Marriage,
          // 'Date_Of_Marriage': this.Date_Of_Marriage,
          Religion:
            this.exceldata[this.i].Religion == undefined
              ? null
              : this.exceldata[this.i].Religion,
          // 'Citizen_Ship': this.Citizen_Ship == undefined ? null : this.Citizen_Ship,
          // 'Ethnicity': this.Ethnicity == undefined ? null : this.Ethnicity,
          // 'Nationality': this.Nationality,
          // 'Is_Disabled': this.Is_Disabled == " " ? 0 : this.Is_Disabled,
          // 'Blood_Group': this.Blood_Group,
          // 'Height': this.Height == " " ? 0 : this.Height,
          // 'Weight': this.Weight == " " ? 0 : this.Weight,
          // 'MajorIllness': this.MajorIllness,
          // 'IS_Night_Blind': this.IS_Night_Blind == " " ? 0 : this.IS_Night_Blind,
          // 'Is_Color_Blind': this.Is_Color_Blind == " " ? 0 : this.Is_Color_Blind,
          DOB:
            this.exceldata[this.i].BIRTHDATE.slice(1, -1) == ' '
              ? '1990-01-01 00:00:00.000'
              : this.exceldata[this.i].BIRTHDATE.slice(1, -1),
          Signature: this.Attachment == ' ' ? null : this.Attachment,
          Paygroup: this.exceldata[this.i].REGULAR,
          PagiBig_ID: this.exceldata[this.i].HDMFNO,
          PagiBigAccountNo: this.exceldata[this.i].HDMFNO,
          // 'PagibigMembership': this.PagibigMembership,
          // 'PagibigRemarks': this.PagibigRemarks,
          EMPLOYEE_TIN: this.exceldata[this.i].TIN,
          PHILHEALTH_NO: this.exceldata[this.i].PHILHEALTHNO,
          SSSNO: this.exceldata[this.i].SSSNO,
          EligibilityGroup: this.exceldata[this.i].EligibilityGroup,
          CivilStatus: 'NA',
          PagiBigMP2: 'NA',
          // 'PagiBigAccountNo': this.PagiBigAccountNo,
          // 'PagibigMembership': this.PagibigMembership,
          // 'PagibigRemarks': this.PagibigRemarks,

          department: this.deptid,
          Level: this.LoginType,
          logintype: this.LoginType,
          ParentCompany: 'NA',
          AssignedCompany: this.AssignedCompany,
          ShiftID: 0,
          Restdays: 'Saturday',
          OrginalBms: this.exceldata[this.i].CurrentSalary,
          PreviousEffectivityBMSDate:
            this.exceldata[this.i].JoiningDate.slice(1, -1) == ' '
              ? '1990-01-01 00:00:00.000'
              : this.exceldata[this.i].JoiningDate.slice(1, -1),
          PreviousBMS: this.exceldata[this.i].CurrentSalary,
          CurrentEffectivityBMSDate:
            this.exceldata[this.i].JoiningDate.slice(1, -1) == ' '
              ? '1990-01-01 00:00:00.000'
              : this.exceldata[this.i].JoiningDate.slice(1, -1),

          COLA: 0,
          IncentiveLeave: 0,
          HMOInsurance: 0,
          MeritInsurance: 0,
          DailerLicense: 0,
          Incrementals: 0,
          TaxStatus: 0,
          GCashNumber: 0,
          TalentSegment: 0,
          CostCentre: 0,
          TranspoAllowance: 0,
          CommAllowance: 0,
          MealAllowance: 0,
          RiceAllowance: 0,
          MedicineAllowance: 0,
          MaintenanceDepreciationAllowance: 0,
          EffectivityofAllowance: 0,
          Frequency: this.exceldata[this.i].Frequency,
          RateCode: this.exceldata[this.i].RateCode,
        };

        debugger;
        this.DigiofficeService.InsertMyDetails(Enitity).subscribe(
          async (data) => {
            debugger;

            if (data == 0) {
              Swal.fire(
                'Error in Uploading Data. Incorrect Data or your  License Count is over. '
              );
              var obj = {
                PageName: 'Staff Upload',
                ErrorMessage:
                  'EmailID or Mobile Number Already Exists or License Count is Over.',
                Name: this.exceldata[this.i - 1].FIRSTNAME,
                EmployeeID: this.exceldata[this.i - 1].EMPLID,
                EmployeeCount: 1,
                UserID: this.exceldata[this.i - 1].EMPLID,
                LoginType: 'HR',
                API: 'BULK Upload',
              };

              this.DigiofficeService.InsertStaffBulkUploadExceptions(
                obj
              ).subscribe({
                next: (data) => {
                  debugger;
                  //Swal.fire("Error in Uploading Data. Please see details under Bulk Upload Missing Staff Menu in Configuration");
                  location.href = '#/HR/StaffBulkUploadExceptions';
                  this.loader = false;
                },
                error: (err) => {
                  // Swal.fire('Issue in Inserting Exception');
                  // this.loader = false;
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
              Swal.fire('Saved Successfully');
              this.StaffID = data;
            }
          },
          (error) => {}
        );
      }
    }
  }





  ExtensionEndDate: any;
  ProbationEndDate: any;
  ProbationStartDate: any;
  StaffID1: any;
  stafflist2: any;
  staflis:any;
  role:any;
  roleid:any;
  ID:any;
  //   public Upload_file() {
  //     debugger
  //     if (this.exceldata == undefined) {
  //       Swal.fire('Choose a File');
  //     } else {
  //       let apiarray = [];

  //        for (let i = 0; i < this.exceldata.length; i++) {
  //        this.staflis= this.stafflist.filter((x: {  employeID : any; })=>x.employeID==this.exceldata[i].Manage

  //                )
  //                if(this.staflis.length!=0){
  //                 this.ID = this.staflis[0].id
  //                }
  //                else{
  //                 this.ID = 'NA'
  //               }

  //               // this.RoleTypeList2=this.dropdownRoleList.filter((x: {  short : any; })=>x.short==this.exceldata[i].Positiontitle             )
  //               // if(this.RoleTypeList2.length!=0){
  //               //   this.roleid=this.RoleTypeList2[0].id
  //               //  }
  //               //  else{
  //               //   this.roleid = 0
  //               // }





  //               var eb1 = {


  //           'ID': this.exceldata[i].LeavewithPay,
  //           'Short': this.exceldata[i].EMPLID,
  //           'Description': this.exceldata[i].TIN,


  //         }


  //   // var entity = {
  //   //   'ID':1,
  //   //   'Notes': this.exceldata[i].EMPLID,
  //   //   'Status': this.exceldata[i].COMPRATE,
  //   //   ApproveBit: 1
  //   // }
  //  // this.DigiofficeService.ApproveTimeSheet(entity)

  //        this.DigiofficeService.UpdateRoleType(eb1)
  //           .subscribe({
  //             next: data => {
  //               debugger
  //               Swal.fire('Updated Successfully')
  //               this.ngOnInit();
  //             }, error: (err) => {
  //               // Swal.fire('Issue in Updating Department');
  //               // Insert error in Db Here//
  //               var obj = {
  //                 'PageName': this.currentUrl,
  //                 'ErrorMessage': err.error.message
  //               }
  //               this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
  //                 data => {
  //                   debugger
  //                 },
  //               )
  //             }
  //           })
  //       }
  //     }
  //   }

  // staflis: any;
  // supervisor:any;
  // role:any;
  // loanlist1:any;
  // LoanType:any;
  // public Upload_file() {
  //   debugger
  //   if (this.exceldata == undefined) {
  //     Swal.fire('Choose a File');
  //   } else {
  //     let apiarray = [];

  //     for (let i = 0; i < this.exceldata.length; i++) {

  //       this.staflis= this.stafflist.filter((x: {  employeID : any; })=>x.employeID==this.exceldata[i].Emplid
  //              )
  //              if(this.staflis.length!=0){
  //               this.StaffID = this.staflis[0].id
  //              }
  //              else{
  //               this.StaffID = 0
  //             }


  //             this.loanlist1= this.loanlist.filter((x: {  type : any; })=>x.type===this.exceldata[i].LOANTYPE
  //             )
  //             if(this.loanlist1.length!=0){
  //              this.LoanType = this.loanlist1[0].id
  //             }
  //             else{
  //              this.LoanType = 'NA'
  //            }




  // var entity = {

  //   'StaffID': this.StaffID,
  //   'LoanType': this.LoanType,
  //   'LoanAmount': 0,
  //   'Period': this.exceldata[i].NoofRemainingPayrolls,
  //   'EmiAmount' : this.exceldata[i].deductionamount,
  //   'StartDate' : this.exceldata[i].StartDeduction.slice(1, -1),
  //   'status': 'HR Approved'



  // }
  //       this.DigiofficeService.InsertEmployeeLoans(entity)
  //         .subscribe({
  //           next: data => {
  //             debugger
  //             Swal.fire('Updated Successfully')
  //             this.ngOnInit();
  //           }, error: (err) => {
  //             Swal.fire('Issue in Updating Department');
  //             // Insert error in Db Here//
  //             var obj = {
  //               'PageName': this.currentUrl,
  //               'ErrorMessage': err.error.message
  //             }
  //             this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
  //               data => {
  //                 debugger
  //               },
  //             )
  //           }
  //         })
  //     }
  //   }
  // }

  // ExtensionEndDate: any;
  // ProbationEndDate: any;
  // ProbationStartDate: any;
  // StaffID1: any;
  // stafflist2: any;
  CityID: any;
  Citylist1: any;
  StateID: any;
  public attachmentsurl: any = [];
  // public Upload_file() {
  //   debugger
  //   if (this.exceldata == undefined) {
  //     Swal.fire('Choose a File');
  //   } else {
  //     let apiarray = [];

  //   for (let i = 0; i < this.exceldata.length; i++) {
  //     this.stafflist2 =  this.leavelist23.filter((x: { short: any; })=>x.short==this.exceldata[i].City);

  //     if(this.stafflist2.length!=0){
  //       this.CityID=this.stafflist2[0].id
  //     }
  //     else{
  //       this.CityID=0
  //     }

  //       this.Citylist1= this.leavelist.filter((x: { short: any; })=>x.short===this.exceldata[i].Province );
  //       if(this.Citylist1.length!=0){
  //         this.StateID=this.Citylist1[0].id
  //       }
  //       else{
  //         this.StateID=0
  //       }


  //      var eb1 = {

  //             'id': this.StaffID1,
  //             'CountryID' : 5 ,
  //             'ProvinceID' : this.StateID,
  //             'CityID' : this.CityID,
  //             'Name':this.exceldata[i].Barangay ,
  //             'Description' : this.exceldata[i].Barangay 
  //           }

  //           this.DigiofficeService.InsertBarangayMaster(eb1).subscribe(

  //             data => {
  //               debugger

  //              Swal.fire('Saved Successfully')

  //             },
  //           )
  //           }
  //         }
  //       }
  //     //this.stafflist2 =  this.stafflist.filter((x: { employeID: any; })=>x.employeID==this.exceldata[i].EmployeeNo);

  //     if(this.stafflist2.length!=0){
  //       this.StaffID1=this.stafflist2[0].id
  //     }
  //     else{
  //       this.StaffID1=0
  //     }

  //           var eb = {
  //             // 'StaffID': localStorage.getItem('staffid'),
  //             // 'LoanType': this.exceldata[i].POSITIONNAME,
  //             // 'LoanAmount': this.exceldata[i].POSITIONNAME,
  //             // 'Comments': this.exceldata[i].POSITIONNAME,
  //             // 'Status': 'HR Approved',
  //             // 'period': this.exceldata[i].POSITIONNAME,
  //             // 'Attachment': this.attachmentsurl[0],


  //             'StaffID' : this.StaffID1,
  //             'LoanType' : this.exceldata[i].LOANTYPE,
  //             'LoanAmount' : this.exceldata[i].PrincipalAmount,
  //             'LoanAmountWithInterest'  : this.exceldata[i].PrincipalAmount,
  //             'Period' : this.exceldata[i].Period,
  //             'Attachment' : this.attachmentsurl[0],
  //             'Comments' : this.exceldata[i].Comments,
  //             'Status' : 'HR Approved',
  //             'Interest' : this.exceldata[i].InterestAmount,
  //             'Reason' : 'NA',
  //             'EmiAmount' : this.exceldata[i].MonthlyAmort,
  //             'startdate' : this.exceldata[i].StartDeduction.slice(1, -1) == " " ? "1990-01-01 00:00:00.000" : this.exceldata[i].StartDeduction.slice(1, -1) ,
  //             'enddate' : this.exceldata[i].StartDeduction.slice(1, -1) == " " ? "1990-01-01 00:00:00.000" : this.exceldata[i].StartDeduction.slice(1, -1) ,
  //             'paidamount' : this.exceldata[i].TotalDeductions,
  //             'EndingBalance' : this.exceldata[i].EndingBalance,
  //             'ApprovedDate' : this.exceldata[i].DateGranted.slice(1, -1) == " " ? "1990-01-01 00:00:00.000" : this.exceldata[i].DateGranted.slice(1, -1) ,  


  //           }
  //           this.DigiofficeService.InsertEmployeeLoans(eb)
  //             .subscribe({
  //               next: data => {
  //                 debugger
  //                 Swal.fire('Saved Successfully.');
  //                 location.href = "#/Employee/Employeeloandash";
  //                 this.loader = false;
  //               }, error: (err) => {
  //                 Swal.fire('Issue in Inserting Employee Loans');
  //                 // Insert error in Db Here//
  //                 var obj = {
  //                   'PageName': this.currentUrl,
  //                   'ErrorMessage': err.error.message
  //                 }
  //                 this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
  //                   data => {
  //                     debugger
  //                   },
  //                 )
  //               }
  //             })
  //         }

  //     }
  //   }



  public Upload_file_leavebalance() {
    debugger
    for (let i = 0; i < this.exceldata.length; i++) {

    //  this.stafflist2 = this.stafflist.filter((x: { employeID: any; }) => x.employeID == this.exceldata[i].Manage);

      // if (this.stafflist2.length != 0) {
      //   this.StaffID1 = this.stafflist2[0].id
      // }
      // else {
      //   this.StaffID1 = 0
      // }
      var eb = {
        'ID':this.exceldata[i].entitlement,
        'Short': this.exceldata[i].bal,
        'Description': this.exceldata[i].EmployeID

      }
      this.DigiofficeService.UpdateRoleType(eb).subscribe(

        data => { 
          debugger
          Swal.fire("Updated Successfully!!!")
          // location.reload();
          this.loader = false
        },
      )
    }
  }




  public SaveAddressDetails(staffid: any) {
    debugger

    let i = 0;

    i = i + 1;


  }

  AssignedCompany: any;
  public getAssignedCompany() {
    if (this.AssignedCompany == 0) {
      this.DigiofficeService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            debugger
            this.stafflist = data;
            this.stafflistCopy = this.stafflist
          }, error: (err) => {
            // Swal.fire('Issue in Getting Data');
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

    } else {
      this.DigiofficeService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            this.stafflist = data.filter(x => x.assignedCompany == this.AssignedCompany);
            this.stafflistCopy = this.stafflist
          }, error: (err) => {
            // Swal.fire('Issue in Getting Data');
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
  public getDepartment() {
    debugger
    if (this.Department == 0) {
      this.DigiofficeService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            this.stafflist = data;
            this.stafflistCopy = this.stafflist
          }, error: (err) => {
            // Swal.fire('Issue in Getting Data');
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
    } else {
      this.DigiofficeService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            debugger
            this.stafflist = data.filter(x => x.department == this.Department);
            this.stafflistCopy = this.stafflist
          }, error: (err) => {
            // Swal.fire('Issue in Getting Data');
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

  geLevel() {

    if (this.level == 0) {
      this.DigiofficeService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            this.stafflist = data;
            this.stafflistCopy = this.stafflist
          }, error: (err) => {
            // Swal.fire('Issue in Filtering Hoilday');
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

    } else {
      this.DigiofficeService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            this.stafflist = data.filter(x => x.levelid == this.level);
            this.stafflistCopy = this.stafflist
          }, error: (err) => {
            // Swal.fire('Issue in Getting Hoilday');
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

  getRoleType() {

    if (this.roleID == 0) {
      this.DigiofficeService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            debugger
            this.stafflist = data;
            this.stafflistCopy = this.stafflist
          }, error: (err) => {
            // Swal.fire('Issue in Filtering Role Type');
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

    } else {
      this.DigiofficeService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            this.stafflist = data.filter(x => x.type == this.roleID);
            this.stafflistCopy = this.stafflist
          }, error: (err) => {
            // Swal.fire('Issue in Filtering Data');
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

  public Disable_PayrollBit(id: any) {
    this.showPopup = 0;
    var eb = {
      'ID': id,
      'PayrollBit': 0
    }
    this.DigiofficeService.Enable_Disable_PayrollBit(eb)
      .subscribe({
        next: data => {
          debugger
          {
            debugger
            /* Swal.fire('Disabled Successfully.'); */
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 76;
            location.reload();
          }
        }, error: (err) => {
          // Swal.fire('Issue in Disable Loans');
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


  public Enable_PayrollBit(id: any) {
    this.showPopup = 0;
    var eb = {
      'ID': id,
      'PayrollBit': 1
    }
    this.DigiofficeService.Enable_Disable_PayrollBit(eb).subscribe(

      data => {
        debugger
        /*  Swal.fire('Enabled Successfully.'); */
        this.loader = false;
        this.showPopup = 1;
        this.messageId = 77
        location.reload();
      },
    )

  }

  // exportexcel(): void {
  //   let element = document.getElementById('lvs');
  //   const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

  //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');


  //   XLSX.writeFile(wb, this.fileName);
  // }


  failedarray: any = [];
  passedarray: any = [];
  sequenceNumber1: any;
  public exportexcel1() {
    debugger
    this.loader = true;
    var ExportData = [];
    this.sequenceNumber1 = 0;
    for (let i = 0; i < this.stafflist.length; i++) {
      //debugger;
      this.sequenceNumber1 = i + 1;
      let singleData = {
        SequenceNumber: String,
        EmployeeID: String,
        EmployeeName: String,
        LastName: String,
        Department: String,
        Gender: String,
        Position: String,
        PhoneNumber: String,
        Email: String,
        Date_Of_Joining: String,
        Manager: String

      }
      singleData.SequenceNumber = this.sequenceNumber1;
      singleData.EmployeeID = this.stafflist[i].employeID;
      singleData.EmployeeName = this.stafflist[i].name;
      singleData.LastName = this.stafflist[i].last_Name;
      singleData.Department = this.stafflist[i].department_name;
      singleData.Gender = this.stafflist[i].gender;
      singleData.Position = this.stafflist[i].role;
      singleData.PhoneNumber = this.stafflist[i].mobile;
      singleData.Email = this.stafflist[i].emailID;
      singleData.Date_Of_Joining = this.stafflist[i].joiningDate;
      singleData.Manager = this.stafflist[i].manager == null ? 'NA' : this.stafflist[i].manager;
      ExportData.push(singleData);
      //debugger
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
      filename: 'Employee_Details'
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    //debugger
    csvExporter.generateCsv(ExportData);
    this.loader = false;



  }


}












