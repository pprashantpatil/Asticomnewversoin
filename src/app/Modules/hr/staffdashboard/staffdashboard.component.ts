import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DigiofficecorehrService } from '../../../Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { ExportToCsv } from 'export-to-csv';
import { MatDialog } from '@angular/material/dialog';
import { DatePipe, formatDate } from '@angular/common';
import { AddressDetailsWizardComponent } from '../address-details-wizard/address-details-wizard.component';

@Component({
  selector: 'app-staffdashboard',
  templateUrl: './staffdashboard.component.html',
  styleUrls: ['./staffdashboard.component.css']
})
export class StaffdashboardComponent implements OnInit {
  viewMode = 'tab1';
  staffList: any;
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
  startDate: any;
  endDate: any;
  search: any;
  staffFilter: any;
  nonStaffList: any;
  nonStaffFilter: any;
  payrollBit: any;
  stafflistCopy1: any;
  stafflist123: any;
  public attachments01: any = [];
  public urls: any = [];
  clikedid: any;
  showbtn: any;
  fromlogin: any;
  exceldata: any;
  arrayBuffer: any;
  filetype: any;
  file: any;
  i: any
  StaffID: any;
  roletypeid: any;
  RoleTypeList2: any;
  dept2list: any;
  deptid: any;
  Attachment: any;
  WorkTimings: any;
  stafflist1234: any;
  supervisor: any;
  LoginType: any;
  ExtensionEndDate: any;
  ProbationEndDate: any;
  ProbationStartDate: any;
  StaffID1: any;
  stafflist2: any;
  staflis: any;
  role: any;
  roleid: any;
  ID: any;
  CityID: any;
  Citylist1: any;
  StateID: any;
  public attachmentsurl: any = [];
  AssignedCompany: any;
  failedarray: any = [];
  passedarray: any = [];
  sequenceNumber1: any;

  constructor(public DigiofficeService: DigiofficecorehrService, public router: Router, private datePipe: DatePipe, private matDialog: MatDialog) { }

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
        }
      })

    this.DigiofficeService.GetCityType()
      .subscribe({
        next: data => {
          debugger
          this.leavelist23 = data;
          this.loader = false;
        }
      })
  }

  public GetDepartment() {
    this.DigiofficeService.GetDepartment().
      subscribe({
        next: data => {
          debugger
          this.dropdownDeptList = data;
        }
      })
  }

  public GetRoleType() {
    this.DigiofficeService.GetRoleType().
      subscribe({
        next: data => {
          debugger
          this.dropdownRoleList = data;
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

  public GetStaff() {
    this.DigiofficeService.GetAllStaffNew().
      subscribe({
        next: data => {
          debugger
          this.stafflist123 = data;
          this.staffList = data.filter(x => x.payrollBit == 0 || x.payrollBit == null);
          this.staffFilter = data.filter(x => x.payrollBit == 0 || x.payrollBit == null);
          this.stafflistCopy = this.staffList;
          this.nonStaffList = data.filter(x => x.payrollBit == 1);
          this.nonStaffFilter = data.filter(x => x.payrollBit == 1);
          this.stafflistCopy1 = this.nonStaffList;
          this.loader = false;
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
          this.staffList = data.filter(x => x.filterdate == this.date);
        }
      })
  }

  public Filterstaff() {
    debugger
    let searchCopy = this.term.toLowerCase();
    if (searchCopy.length == 0) {
      this.GetStaff();
    } else {
      this.DigiofficeService.GetAllStaffNewforsearch(searchCopy).
        subscribe({
          next: data => {
            debugger
            this.staffList = data.filter(x => x.payrollBit == 0 || x.payrollBit == null);
            this.stafflistCopy = this.staffList;
            this.nonStaffList = data.filter(x => x.payrollBit == 1);
            this.stafflistCopy1 = this.nonStaffList;
            this.loader = false;
          }
        })
    }
  }

  public openDeletePopUp(id: any) {
    this.showPopup = 0;
    Swal.fire({
      title: 'Delete record',
      text: "Are you sure you want to delete it?",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Proceed'
    }).then((result) => {
      if (result.value == true) {
        this.DigiofficeService.DeleteBuildingStaff(id)
          .subscribe({
            next: data => {
              Swal.fire('Deleted Successfully');
              this.ngOnInit();
            }
          })
      }
    });
  }

  public downloadzip(application: any) {
    debugger
    this.urls = [];
    this.DigiofficeService.GetEmployeeDocuments().
      subscribe({
        next: data => {
          debugger
          let filearray: any = data.filter(x => x.staffId == 10429);
          if (filearray[0].employee_Application_form != null) {
            this.urls.push(filearray[0].employee_Application_form);
          }
          if (filearray[0].offer_letter != null) {
            this.urls.push(filearray[0].offer_letter)
          }
          if (filearray[0].resume != null) {
            this.urls.push(filearray[0].resume)
          }
          if (filearray[0].certificates_From_Previous_Employer != null) {
            this.urls.push(filearray[0].certificates_From_Previous_Employer)
          }
          if (filearray[0].medical_Examination_Report != null) {
            this.urls.push(filearray[0].medical_Examination_Report)
          }
          if (filearray[0].birth_Certificates != null) {
            this.urls.push(filearray[0].birth_Certificates)
          }
          if (filearray[0].marriage_Certificates != null) {
            this.urls.push(filearray[0].marriage_Certificates)
          }
          if (filearray[0].sss_e1Form != null) {
            this.urls.push(filearray[0].sss_e1Form)
          }
          if (filearray[0].sss_loanvoucher != null) {
            this.urls.push(filearray[0].sss_loanvoucher)
          }
          if (filearray[0].hdmf_form != null) {
            this.urls.push(filearray[0].hdmf_form)
          }
          if (filearray[0].hdmf_loanvoucher != null) {
            this.urls.push(filearray[0].hdmf_loanvoucher)
          }
          if (filearray[0].phic_reg != null) {
            this.urls.push(filearray[0].phic_reg)
          }
          if (filearray[0].bir_form_1902 != null) {
            this.urls.push(filearray[0].bir_form_1902)
          }
          if (filearray[0].bir_form_2305 != null) {
            this.urls.push(filearray[0].bir_form_2305)
          }
          if (filearray[0].bir_form_2316 != null) {
            this.urls.push(filearray[0].bir_form_2316)
          }
          if (filearray[0].bir_form_1905 != null) {
            this.urls.push(filearray[0].bir_form_1905)
          }
          if (filearray[0].dependts_birth_certificates != null) {
            this.urls.push(filearray[0].dependts_birth_certificates)
          }
          if (filearray[0].attendance_sheet_dtr != null) {
            this.urls.push(filearray[0].attendance_sheet_dtr)
          }
          if (filearray[0].promotion_doc != null) {
            this.urls.push(filearray[0].promotion_doc)
          }
          if (filearray[0].incident_report != null) {
            this.urls.push(filearray[0].incident_report)
          }
          if (filearray[0].clearnce_form != null) {
            this.urls.push(filearray[0].clearnce_form)
          }
          if (filearray[0].resignation_form != null) {
            this.urls.push(filearray[0].resignation_form)
          }
          if (filearray[0].employee_201report != null) {
            this.urls.push(filearray[0].employee_201report)
          }
        }
      })
  }

  public showbttn(item: any) {
    if (this.showbtn == true) {
      this.showbtn = false;
    } else {
      this.showbtn = true;
    }
    this.clikedid = item.employeID;
  }

  public Edit(id: any) {
    debugger
    this.router.navigate(['/HR/AddressDetailsWizard', id]);
  }

  public Upload() {
    this.router.navigate(['/Uploademployeedocumets', this.clikedid]);
  }

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
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 68;
    }
  }

  public async Upload_file() {
    debugger;
    this.showPopup = 0;
    if (this.exceldata == undefined) {
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
          Religion:
            this.exceldata[this.i].Religion == undefined
              ? null
              : this.exceldata[this.i].Religion,
          DOB:
            this.exceldata[this.i].BIRTHDATE.slice(1, -1) == ' '
              ? '1990-01-01 00:00:00.000'
              : this.exceldata[this.i].BIRTHDATE.slice(1, -1),
          Signature: this.Attachment == ' ' ? null : this.Attachment,
          Paygroup: this.exceldata[this.i].REGULAR,
          PagiBig_ID: this.exceldata[this.i].HDMFNO,
          PagiBigAccountNo: this.exceldata[this.i].HDMFNO,
          EMPLOYEE_TIN: this.exceldata[this.i].TIN,
          PHILHEALTH_NO: this.exceldata[this.i].PHILHEALTHNO,
          SSSNO: this.exceldata[this.i].SSSNO,
          EligibilityGroup: this.exceldata[this.i].EligibilityGroup,
          CivilStatus: 'NA',
          PagiBigMP2: 'NA',
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
                  location.href = '#/HR/StaffBulkUploadExceptions';
                  this.loader = false;
                }
              });
            } else {
              Swal.fire('Saved Successfully');
              this.StaffID = data;
            }
          });
      }
    }
  }

  public Upload_file_leavebalance() {
    debugger
    for (let i = 0; i < this.exceldata.length; i++) {
      var eb = {
        'ID': this.exceldata[i].entitlement,
        'Short': this.exceldata[i].bal,
        'Description': this.exceldata[i].EmployeID
      }
      this.DigiofficeService.UpdateRoleType(eb).subscribe(
        data => {
          debugger
          Swal.fire("Updated Successfully!!!")
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

  public getAssignedCompany() {
    if (this.AssignedCompany == 0) {
      this.DigiofficeService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            debugger
            this.staffList = data;
            this.stafflistCopy = this.staffList
          }
        })
    } else {
      this.DigiofficeService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            this.staffList = data.filter(x => x.assignedCompany == this.AssignedCompany);
            this.stafflistCopy = this.staffList
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
            this.staffList = data;
            this.stafflistCopy = this.staffList
          }
        })
    } else {
      this.DigiofficeService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            debugger
            this.staffList = data.filter(x => x.department == this.Department);
            this.stafflistCopy = this.staffList
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
            this.staffList = data;
            this.stafflistCopy = this.staffList
          }
        })
    } else {
      this.DigiofficeService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            this.staffList = data.filter(x => x.levelid == this.level);
            this.stafflistCopy = this.staffList
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
            this.staffList = data;
            this.stafflistCopy = this.staffList
          }
        })
    } else {
      this.DigiofficeService.GetMyDetails()
        .subscribe({
          next: data => {
            debugger
            this.staffList = data.filter(x => x.type == this.roleID);
            this.stafflistCopy = this.staffList
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
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 76;
            location.reload();
          }
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
        this.loader = false;
        this.showPopup = 1;
        this.messageId = 77
        location.reload();
      },
    )
  }

  public exportexcel() {
    debugger
    this.loader = true;
    var ExportData = [];
    this.sequenceNumber1 = 0;
    for (let i = 0; i < this.staffList.length; i++) {
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
      singleData.EmployeeID = this.staffList[i].employeID;
      singleData.EmployeeName = this.staffList[i].name;
      singleData.LastName = this.staffList[i].last_Name;
      singleData.Department = this.staffList[i].department_name;
      singleData.Gender = this.staffList[i].gender;
      singleData.Position = this.staffList[i].role;
      singleData.PhoneNumber = this.staffList[i].mobile;
      singleData.Email = this.staffList[i].emailID;
      singleData.Date_Of_Joining = this.staffList[i].joiningDate;
      singleData.Manager = this.staffList[i].manager == null ? 'NA' : this.staffList[i].manager;
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
      filename: 'Employee_Details'
    };
    const csvExporter = new ExportToCsv(Export_to_excel_options);
    csvExporter.generateCsv(ExportData);
    this.loader = false;
  }

  public getEndDate(event: any) {
    debugger
    this.startDate = this.datePipe.transform(event[0], 'yyyy-MM-dd');
    this.endDate = this.datePipe.transform(event[1], 'yyyy-MM-dd');
    if (this.endDate < this.startDate) {
      Swal.fire("The end date should be greater than the start date")
      this.endDate = ""
    }
    else if (this.startDate == undefined) {
      Swal.fire("Please select the start date first")
      this.endDate = ""
    }
    else {
      this.staffList = this.staffFilter.filter((x: { dateTime: any; time: any; }) => (x.dateTime >= this.startDate && x.dateTime <= this.endDate) || (x.time >= this.startDate && x.time <= this.endDate));
      this.nonStaffList = this.nonStaffFilter.filter((x: { dateTime: any; }) => (x.dateTime >= this.startDate && x.dateTime <= this.endDate));
    }
  }

  showDialog() {
    debugger
    let ID = undefined
    this.matDialog.open(AddressDetailsWizardComponent, {
      data: ID,
      width: '100%',
      maxHeight: '80vh'
    }).afterClosed()
      .subscribe(result => {
        console.log('Result' + result);
        this.ngOnInit();
      });
  }
}