import { Component, OnInit } from '@angular/core';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME, TOOLBAR_POSITION, TOOLBAR_BUTTON_POSITION } from 'ng-wizard';
import { DigiofficecorehrService } from '../../../Services/digiofficecorehr.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-address-details-wizard',
  templateUrl: './address-details-wizard.component.html',
  styleUrls: ['./address-details-wizard.component.css']
})
export class AddressDetailsWizardComponent implements OnInit {
  allowanceID: any;
  allowanceList: any;
  Position: any;
  Restdays: any
  Is_Solo_Parent: any;
  managerList: any;
  HMOInsurance: any;
  MeritInsurance: any;
  DailerLicense: any;
  Incrementals: any;
  phoneNo:any;
  IncentiveLeave: any;
  TaxStatus: any;
  GCashNumber: any;
  TalentSegment: any;
  CostCentre: any;
  TranspoAllowance: any;
  CommAllowance: any;
  MealAllowance: any;
  RiceAllowance: any;
  MedicineAllowance: any;
  MaintenanceDepreciationAllowance: any;
  EffectivityofAllowance: any;
  StateID: any = [];
  CityID: any = [];
  Barangay: any = [];
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  dropdownSettingsresdays: any = {};
  Title: any
  PlaceO_f_Birth: any
  Status: any;
  Name: any
  employmentlist: any;
  Country_Of_Birth: any
  Middle_Name: any
  Age: any;
  CostCenter: any;
  GLCode: any;
  EmailAddress: any;
  Region: any;
  BillingAddress: any;
  Personal_Email: any
  Last_Name: any
  Gender: any
  Mobile: any;
  RoleType: any;
  Supervisor: any;
  RoleTypeList: any;
  supervisorlist: any;
  Religion: any;
  Ethnicity: any;
  Citizen_Ship: any;
  Nationality: any;
  Is_Disabled: any;
  MajorIllness: any;
  Is_Color_Blind: any;
  IS_Night_Blind: any;
  Weight: any;
  Height: any;
  Blood_Group: any;
  DependentName: any;
  Relationship: any;
  DateOfBirth: any;
  Address: any;
  levellist: any;
  Is_Dependent: any;
  Id_Number: any;
  Is_Child_Adopted: any;
  Race: any;
  CitizenShip: any;
  Gender1: any;
  Working_Status: any;
  Request_Type: any;
  Dependent: any;
  Percentage: any;
  NomineeType: any;
  GuardianName: any;
  GuardianRelationship: any;
  ParentCompany: any;
  AssignedCompany: any;
  ComapanyName: any;
  StartDate: any;
  EndDate: any;
  OTEligibility: any;
  Salary: any;
  CurrentEmployer: any;
  Shiflist: any;
  EducationType: any;
  Qualification: any;
  NameOfQualification: any;
  Branch: any;
  InstitutionName: any;
  Country: any;
  ScoreType: any;
  Grade: any;
  StartDateMonth: any;
  StartDateYear: any;
  EndDateMonth: any;
  EndDateYear: any;
  Supervisor1: any;
  NameOfBank: any;
  AccountHolderName: any;
  BankAccountNumber: any;
  IDType: any;
  Number: any;
  NameOnDocument: any;
  IssueDate: any;
  ExpiryDate: any;
  IssuingAuthority: any;
  PlaceOfIssue: any;
  VisaType: any;
  VisaNumber: any;
  VisaIssueDate: any;
  VisaExpiryDate: any;
  EmployeeName: any;
  Grade1: any;
  Designation: any;
  PayRateType: any;
  PayStructure: any;
  EffectiveFromDate: any;
  Reason: any;
  EmployeeCode: any;
  OfficialEmail: any;
  Band: any;
  Grade2: any;
  JobRole: any;
  Manager: any;
  EmployeeType: any;
  EmployeeStatus: any;
  NoticePeriod: any;
  ProbationPeriod: any;
  ConfirmationDueDate: any;
  ConfirmationStatus: any;
  AddressType: any;
  Relationship1: any;
  Frequency: any;
  ProjectID: any;
  FindPlace: any;
  AddressLine1: any;
  AddressLine2: any;
  AddressLine3: any;
  AddressLine4: any;
  District: any;
  Province: any;
  Country1: any;
  SubDistrictPostcode: any;
  Mobile1: any;
  LandLineFax: any;
  IsCorrespondance: any;
  RequestType: any;
  EmergencyContactName: any;
  EmergencyContactRelationship: any;
  EmergencyContactMobileNumber: any;
  EmergencyContactOfficeNumber: any;
  EmergencyContactLandLineNumber: any;
  EmergencyContact_EmailID: any;
  EmergencyContact_Address: any;
  StaffID: any;
  DOB: any;
  ID: any;
  BuildingID: any;
  PhoneNo: any;
  EmailID: any;
  TypeID: any;
  Attachment: any;
  JoiningDate: any;
  ShiftType: any;
  LeavesPerMonth: any;
  WorkTimings: any;
  ContactNumber: any;
  EmployeeID: any;
  ChaildTotal: any;
  MedicalLeaveEntitlement: any;
  MaternitityLeaveEntitlement: any;
  PaternitityLeaveEntitlement: any;
  CompassionateLeaveEntitlement: any;
  Leavesfrompreviousyear: any;
  ExtendedChildcareLeaveEntitlement: any;
  MarriageLeaveEntitlement: any;
  Countrylist: any;
  Department: any;
  loader: any;
  EducationGrade: any;
  level: any;
  NickName: any;
  SubsidaryList: any;
  Supervisorname: any;
  dropdownRoleList: any = [];
  roleselectedItems: any = [];
  roledropdownSettings: any = {};
  dropdownDeptList: any = [];
  deptselectedItems: any = [];
  deptdropdownSettings: any = {};
  provincedropdownSettings: any = {};
  citydropdownSettings: any = {};
  barangaydropdownSettings: any = {};
  leavelist: any;
  myDate: any;
  Departmentlist: any;
  Bankslist: any;
  Religion1: any;
  supervisorlist12: any;
  restdaylist: any;
  PreviousBMS: any
  CurrentBMS: any;
  COLA: any
  PreviousEffectivityBMSDate: any;
  CurrentEffectivityBMSDate: any;
  OrginalBms: any
  PagiBigMP2: any;
  PagiBig_ID: any;
  Paygroup: any;
  SSSNO: any;
  PHILHEALTH_NO: any;
  EMPLOYEE_TIN: any;
  currentUrl: any
  cb: any;
  unitdetailsarray: any = [];
  arrayid: any;
  public showtable: any;
  Provincelist: any = [];
  Citylist: any = [];
  barangaylist: any = [];
  Barangaylist: any;
  CountryID: any;
  roledid: any;
  Signature: any;
  RoleType12: any;
  RoleType1: any;
  Department12: any;
  managerList1: any;
  Supervisor12: any;
  department1: any;
  staffID: any;
  RateCode: any;
  CompRate: any;
  EligibilityGroup: any;
  CivilStatus: any;
  LoginType: any;
  WorkDays: any;
  DailyRate: any;
  LeadAllowance: any;
  InterimAllowance: any;
  InterimAllowanceNote: any;
  Month13th: any;
  Month14th: any;
  SSS_EC_EmpContribution: any;
  PhilHealthEmpContribution: any;
  PagibigEmpContribution: any;
  LifeInsurance: any;
  ToolsOfWork: any;
  Workspace: any;
  AdditionalTempAllowance: any;
  TotalDirectCost: any;
  AdminFee1: any;
  VAT2: any;
  companyid: any;
  VAT1: any;
  WorkOrderRate: any;
  AdminFee2: any;
  OtherBillablesRate: any;
  RateCardTotal: any;
  TemporaryAllowance1Note: any;
  TemporaryAllowance1: any;
  AyalaMembershipContribution: any;
  RainyDayLoan: any;
  ACCreditCardLoan: any;
  ACHospLoan: any;
  ACEducLoan: any;
  ACEducLoan2: any;
  PettyCashLoan: any;
  NYLoan: any;
  ChristmasTreatLoan: any;
  ACTravelLoan: any;
  ACHospLoan2: any;
  WeddingLoan: any;
  ResignationDate: any;
  showPopup: number = 0;
  messageId: number = 0;
  Allowance: any;
  Amount: any;
  startdate: any;
  endate: any;
  allowancelist: any;
  SavedAllowancelist: any;
  fetchallowancelist: any;
  public attachments2: any = [];
  public attachments2url: any = [];
  ExtensionEndDate: any;
  ProbationEndDate: any;
  ProbationStartDate: any;
  show: any;
  public restdaysarray: any = [];
  public restdaysarray1: any = [];
  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden
  };

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.default,
    toolbarSettings: {
    }
  };

  constructor(public DigiofficeService: DigiofficecorehrService, private ngWizardService: NgWizardService, public router: Router, private activatedroute: ActivatedRoute, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.loader = true;
    this.companyid = sessionStorage.getItem('companyid');
    this.GetNewstaff();
    this.staffID = localStorage.getItem('staffid');
    this.currentUrl = window.location.href;
    this.Status = 'selected';
    this.Allowance = 'Select One';
    this.LoginType = '0';
    this.ParentCompany = '';
    this.AssignedCompany = '';
    this.CountryID = 0;
    this.Country = 0;
    this.StateID = 0;
    this.CityID = 0;
    this.Barangay = 0;
    this.showtable = 0;
    this.Relationship1 = 'Select One';
    this.Gender1 = '';
    this.ShiftType = '';
    this.Gender = 0;
    this.Department = '';
    this.Supervisor = '';
    this.Race = 'Race';
    this.Citizen_Ship = '';
    this.CitizenShip = '';
    this.cb = '';
    this.Religion = '';
    this.Religion1 = '';
    this.roledid = localStorage.getItem('roledid');
    this.Ethnicity = '';
    this.Working_Status = 'Select One';
    this.Title = 0;
    this.AddressType = 0;
    this.GuardianRelationship = 'Select One';
    this.EducationType = 'Select';
    this.ScoreType = 'Select';
    this.NameOfBank = 'Select One';
    this.IDType = 'Select';
    this.VisaType = 'Select';
    this.Nationality = '';
    this.CostCentre = '';
    this.TalentSegment = '';
    this.CivilStatus = 'selected';
    this.Blood_Group = '';
    this.Band = '';
    this.EmployeeStatus = '';
    this.Country_Of_Birth = '';
    (this.Status = ''), (this.RoleType = '');
    this.Department = '';
    this.Paygroup = '';
    this.NoticePeriod = '';
    this.level = '0';
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name1',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.dropdownSettingsresdays = {
      singleSelection: false,
      idField: 'name',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.restdaylist = [
      {
        name: 'Monday',
      },
      {
        name: 'Tuesday',
      },
      {
        name: 'Wednesday',
      },
      {
        name: 'Thursday',
      },
      {
        name: 'Friday',
      },
      {
        name: 'Saturday',
      },
      {
        name: 'Sunday',
      },
    ];
    this.Is_Disabled = false;
    this.showtable = 0;
    this.myDate = new Date().toISOString().split('T')[0];
    (this.Status = 'selected'), (this.Blood_Group = '');
    this.ActivatedRouteCallPrefil();

    this.roledropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'short',
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
      closeDropDownOnSelection:true
    };
    this.provincedropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'short',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      closeDropDownOnSelection:true
    };

    this.citydropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'short',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
    };

    this.barangaydropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
    };

    this.GetSubsidaryMaster();
    this.GetShiftMaster();
    this.GetBanks();
    this.GetLevelType();
    this.GetCountryType();
    this.GetDepartment();
    this.GetRoleType();
    this.GetNewstaff();
    this.GetDe_minimis_Master();
    this.GetStaffAllowanceDetails();
  }

  public GetDe_minimis_Master() {
    debugger;
    this.loader = true;
    this.DigiofficeService.GetDe_minimis_Master().subscribe({
      next: (data) => {
        debugger;
        this.allowancelist = data;
        this.loader = false;
      },
      error: (err) => {
        // Swal.fire('Issue in Getting De Minimis Master');
        // this.loader=false;
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

  public GetStaffAllowanceDetails() {
    debugger;
    this.loader = true;
    this.DigiofficeService.GetStaffAllowanceDetailsByStaffID(
      this.StaffID
    ).subscribe({
      next: (data) => {
        debugger;
        this.fetchallowancelist = data;
        this.loader = false;
      },
      error: (err) => {
        // Swal.fire('Issue in Getting De Minimis Master');
        // this.loader=false;
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

  public ActivatedRouteCallPrefil() {
    this.loader = true;
    this.activatedroute.params.subscribe((params) => {
      debugger;
      this.ID = params['id'];
      this.StaffID = params['id'];
      if (this.ID == undefined) {
        (this.Title = 0),
          (this.Age = ' '),
          // this.Date_Of_Marriage = ' ',
          (this.Is_Disabled = ' '),
          (this.Height = 0),
          (this.Weight = 0),
          (this.IS_Night_Blind = 0),
          (this.Is_Color_Blind = 0),
          (this.Grade = ' '),
          (this.Manager = ' '),
          (this.EmployeeType = ' '),
          (this.ConfirmationDueDate = ' '),
          (this.ConfirmationStatus = ' '),
          (this.EmployeeName = ' '),
          (this.Relationship = ' '),
          (this.FindPlace = ' '),
          (this.District = ' '),
          (this.Province = ' '),
          (this.LandLineFax = ' '),
          (this.IsCorrespondance = ' '),
          (this.RequestType = ' '),
          (this.Relationship = ' '),
          (this.Gender = 0),
          (this.DateOfBirth = ' '),
          (this.Is_Dependent = ' '),
          (this.Is_Child_Adopted = ' '),
          (this.Request_Type = ' '),
          (this.ComapanyName = ' '),
          (this.StartDate = ' '),
          (this.EndDate = ' '),
          (this.Salary = ' '),
          (this.CurrentEmployer = ' '),
          (this.StartDateMonth = ' '),
          (this.StartDateYear = ' '),
          (this.EndDateMonth = ' '),
          (this.EndDateYear = ' '),
          (this.IssueDate = ' '),
          (this.ExpiryDate = ' '),
          (this.VisaIssueDate = ' '),
          (this.VisaExpiryDate = ' '),
          (this.EmployeeName = ' '),
          (this.Designation = ' '),
          (this.PayRateType = ' '),
          (this.PayStructure = ' '),
          (this.EffectiveFromDate = ' '),
          (this.Reason = ' ');
      } else {
        this.DigiofficeService.GetAllStaffNew().subscribe({
          next: (data) => {
            debugger;
            this.supervisorlist = data.filter((x) => x.type == 2);
            this.loader = false;
          },
          error: (err) => {
            // Swal.fire('Issue in Getting All Staff New');
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
        this.DigiofficeService.GetAllStaffNewByEmployeID(
          this.StaffID
        ).subscribe({
          next: (data) => {
            debugger;
            this.loader = false;
            this.leavelist = data;
            (this.Title = this.leavelist[0].title1),
              (this.ID = this.leavelist[0].id),
              (this.Name = this.leavelist[0].name),
              (this.Middle_Name = this.leavelist[0].middle_Name),
              (this.Last_Name = this.leavelist[0].last_Name),
              (this.OTEligibility = this.leavelist[0].oteligibility);
            (this.PlaceO_f_Birth = this.leavelist[0].placeO_f_Birth),
              (this.Country_Of_Birth = this.leavelist[0].country_Of_Birth);
            this.Age = this.leavelist[0].age;
            this.Gender = this.leavelist[0].gender;
            this.Status = this.leavelist[0].status;
            this.ShiftType = this.leavelist[0].shiftID;
            this.Restdays = this.leavelist[0].restdays;
            this.EligibilityGroup = this.leavelist[0].eligibilityGroup;
            this.CivilStatus = this.leavelist[0].civilStatus;
            this.Frequency = this.leavelist[0].frequency;
            this.CompRate = this.leavelist[0].compRate;
            this.RateCode = this.leavelist[0].rateCode;
            this.PagiBigMP2 = this.leavelist[0].pagiBigMP2;
            // if ((this.datepipe.transform(this.leavelist[0].date_Of_Marriage, 'yyyy-MM-dd')) == "1990-01-01") {
            //   this.Date_Of_Marriage = " "
            // }
            // else {
            //   this.Date_Of_Marriage = this.datepipe.transform(this.leavelist[0].date_Of_Marriage, 'yyyy-MM-dd')
            // }
            this.Personal_Email = this.leavelist[0].personal_Email;
            this.phoneNo = this.leavelist[0].phoneNo;
            (this.Religion = this.leavelist[0].religion),
              (this.Citizen_Ship = this.leavelist[0].citizen_Ship);
            (this.Ethnicity = this.leavelist[0].ethnicity),
              (this.Is_Solo_Parent = this.leavelist[0].is_Solo_Parent),
              (this.Nationality = this.leavelist[0].nationality),
              (this.Is_Disabled = this.leavelist[0].is_Disabled),
              (this.Blood_Group = this.leavelist[0].blood_Group),
              (this.Height = this.leavelist[0].height),
              (this.Weight = this.leavelist[0].weight),
              (this.ParentCompany = this.leavelist[0].parentCompany),
              (this.AssignedCompany = this.leavelist[0].assignedCompany),
              (this.MajorIllness = this.leavelist[0].majorIllness),
              (this.IS_Night_Blind = this.leavelist[0].iS_Night_Blind),
              (this.Is_Color_Blind = this.leavelist[0].is_Color_Blind),
              (this.DOB = this.datepipe.transform(
                this.leavelist[0].dob,
                'yyyy-MM-dd'
              )),
              (this.JoiningDate = this.datepipe.transform(
                this.leavelist[0].joiningDate,
                'yyyy-MM-dd'
              )),
              this.DigiofficeService.GetRoleType().subscribe({
                next: (data) => {
                  debugger;
                  this.RoleType12 = data.filter((x) => x.id == this.RoleType);
                  this.loader = false;
                  this.RoleType = this.RoleType12;
                  this.RoleType1 = this.RoleType[0].id;
                },
                error: (err) => {
                  // Swal.fire('Issue in Getting Role Type');
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
            (this.RoleType = this.leavelist[0].type),
              // this.Supervisor = this.leavelist[0].supervisor;
              // this.DigiofficeService.GetMyDetails().subscribe(data => {
              //   debugger
              //   this.supervisorlist12 = data.filter(x => x.id == this.Supervisor1);
              //   this.loader = false;
              //   this.Supervisor = this.supervisorlist12
              // });
              // this.Supervisorname = this.leavelist[0].manager;
              (this.Signature = this.leavelist[0].signature),
              (this.Paygroup = this.leavelist[0].paygroup),
              (this.PagiBig_ID = this.leavelist[0].pagiBig_ID),
              // this.PagiBigAccountNo = this.leavelist[0].pagiBigAccountNo,
              // this.PagibigRemarks = this.leavelist[0].pagibigRemarks,
              (this.EMPLOYEE_TIN = this.leavelist[0].employee_TIN),
              (this.PHILHEALTH_NO = this.leavelist[0].philhealtH_NO),
              (this.SSSNO = this.leavelist[0].sssno),
              // this.PagibigMembership = this.leavelist[0].pagibigMembership,
              (this.level = this.leavelist[0].loginType),
              (this.LoginType = this.leavelist[0].logintype),
              (this.EmployeeID = this.leavelist[0].employeID),
              (this.OrginalBms = this.leavelist[0].orginalBms),
              (this.PreviousEffectivityBMSDate = this.datepipe.transform(
                this.leavelist[0].previousEffectivityBMSDate,
                'yyyy-MM-dd'
              ));
            (this.PreviousBMS = this.leavelist[0].previousBMS),
              (this.CurrentEffectivityBMSDate = this.datepipe.transform(
                this.leavelist[0].currentEffectivityBMSDate,
                'yyyy-MM-dd'
              ));
            (this.CurrentBMS = this.leavelist[0].currentBMS),
              (this.COLA = this.leavelist[0].cola),
              (this.IncentiveLeave = this.leavelist[0].incentiveLeave),
              (this.HMOInsurance = this.leavelist[0].hmOInsurance),
              (this.MeritInsurance = this.leavelist[0].meritInsurance),
              (this.DailerLicense = this.leavelist[0].dailerLicense),
              (this.Incrementals = this.leavelist[0].incrementals),
              (this.TaxStatus = this.leavelist[0].taxStatus),
              (this.GCashNumber = this.leavelist[0].gCashNumber),
              (this.TalentSegment = this.leavelist[0].talentSegment),
              (this.CostCentre = this.leavelist[0].costCentre),
              (this.TranspoAllowance = this.leavelist[0].transpoAllowance),
              (this.CommAllowance = this.leavelist[0].commAllowance),
              (this.MealAllowance = this.leavelist[0].mealAllowance),
              (this.RiceAllowance = this.leavelist[0].riceAllowance),
              (this.MedicineAllowance = this.leavelist[0].medicineAllowance),
              (this.MaintenanceDepreciationAllowance =
                this.leavelist[0].maintenanceDepreciationAllowance),
              (this.EffectivityofAllowance =
                this.leavelist[0].effectivityofAllowance),
              this.DigiofficeService.GetDepartment().subscribe({
                next: (data) => {
                  debugger;
                  this.loader = false;
                  this.Department12 = data.filter(
                    (x) => x.id == this.Department
                  );
                  this.Department = this.Department12;
                  this.department1 = this.Department[0].id;
                },
                error: (err) => {
                  // Swal.fire('Issue in Getting Department');
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
            (this.Department = this.leavelist[0].department),
              this.DigiofficeService.GetAllStaffNew().subscribe({
                next: (data) => {
                  debugger;
                  this.loader = false;
                  this.managerList1 = data.filter(
                    (x) => x.id == this.Supervisor
                  );
                  this.Supervisor = this.managerList1;
                  this.Supervisor1 = this.Supervisor[0].id;
                },
                error: (err) => {
                  // Swal.fire('Issue in Getting All Staff New');
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
            (this.Supervisor = this.leavelist[0].supervisor),
              this.DigiofficeService.GetPositionDetails().subscribe({
                next: (data) => {
                  debugger;
                  this.leavelist = data.filter((x) => x.staffId == this.ID);
                  (this.EmployeeCode = this.leavelist[0].employeeCode),
                    (this.OfficialEmail = this.leavelist[0].officialEmail),
                    (this.Band = this.leavelist[0].band),
                    (this.Grade = this.leavelist[0].grade),
                    (this.JobRole = this.leavelist[0].jobRole),
                    (this.Manager = this.leavelist[0].manager),
                    (this.EmployeeType = this.leavelist[0].employeeType),
                    (this.EmployeeStatus = this.leavelist[0].employeeStatus),
                    (this.NoticePeriod = this.leavelist[0].noticePeriod),
                    (this.ProbationPeriod = this.leavelist[0].probationPeriod),
                    (this.ConfirmationDueDate = this.datepipe.transform(
                      this.leavelist[0].confirmationDueDate,
                      'yyyy-MM-dd'
                    )),
                    (this.ConfirmationStatus =
                      this.leavelist[0].confirmationStatus),
                    (this.EmployeeName = this.leavelist[0].employeeName),
                    (this.ProbationEndDate = this.datepipe.transform(
                      this.leavelist[0].probationEndDate,
                      'yyyy-MM-dd'
                    )),
                    (this.ProbationStartDate = this.datepipe.transform(
                      this.leavelist[0].probationStartDate,
                      'yyyy-MM-dd'
                    )),
                    (this.ExtensionEndDate = this.datepipe.transform(
                      this.leavelist[0].extensionEndDate,
                      'yyyy-MM-dd'
                    ));
                  (this.StartDate = this.datepipe.transform(
                    this.leavelist[0].startDate,
                    'yyyy-MM-dd'
                  )),
                    (this.EndDate = this.datepipe.transform(
                      this.leavelist[0].endDate,
                      'yyyy-MM-dd'
                    )),
                    (this.ResignationDate = this.datepipe.transform(
                      this.leavelist[0].resignationDate,
                      'yyyy-MM-dd'
                    )),
                    (this.EmailAddress = this.leavelist[0].emailAddress),
                    (this.GLCode = this.leavelist[0].glCode),
                    (this.BillingAddress = this.leavelist[0].billingAddress),
                    (this.CostCenter = this.leavelist[0].costCenter),
                    (this.loader = false);
                },
                error: (err) => {
                  // Swal.fire('Issue in Getting Position Details');
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
            this.DigiofficeService.GetEmploymentDetails().subscribe({
              next: (data) => {
                debugger;
                this.employmentlist = data
                  .filter((x) => x.staffID == this.ID)
                  .splice(0, 1);
                this.ComapanyName = this.employmentlist[0].comapanyName;
                this.Title = this.employmentlist[0].title;
                this.StartDate = this.employmentlist[0].startDate;
                this.EndDate = this.employmentlist[0].endDate;
                this.Salary = this.employmentlist[0].salary;
                this.loader = false;
              },
              error: (err) => {
                // Swal.fire('Issue in Getting Employment Details');
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
            this.DigiofficeService.GetMyAddressDetails().subscribe({
              next: (data) => {
                debugger;
                this.loader = false;
                this.leavelist = data.filter((x) => x.staffId == this.ID);
                (this.AddressType = this.leavelist[0].addressType),
                  (this.Relationship = this.leavelist[0].relationship),
                  (this.FindPlace = this.leavelist[0].findPlace),
                  (this.AddressLine1 = this.leavelist[0].addressLine1),
                  (this.AddressLine2 = this.leavelist[0].addressLine2),
                  (this.AddressLine3 = this.leavelist[0].addressLine3),
                  (this.AddressLine4 = this.leavelist[0].addressLine4),
                  (this.SubDistrictPostcode =
                    this.leavelist[0].subDistrictPostcode),
                  (this.Mobile = this.leavelist[0].mobile),
                  (this.LandLineFax = this.leavelist[0].landLineFax),
                  (this.IsCorrespondance = this.leavelist[0].isCorrespondance),
                  (this.RequestType = this.leavelist[0].requestType),
                  (this.EmergencyContactName =
                    this.leavelist[0].emergencyContactName),
                  (this.EmergencyContactRelationship =
                    this.leavelist[0].emergencyContactRelationship),
                  (this.EmergencyContactMobileNumber =
                    this.leavelist[0].emergencyContactMobileNumber),
                  (this.EmergencyContactOfficeNumber =
                    this.leavelist[0].emergencyContactOfficeNumber),
                  (this.EmergencyContactLandLineNumber =
                    this.leavelist[0].emergencyContactLandLineNumber),
                  (this.EmergencyContact_EmailID =
                    this.leavelist[0].emergencyContact_EmailID),
                  (this.EmergencyContact_Address =
                    this.leavelist[0].emergencyContact_Address),
                  (this.CountryID = this.leavelist[0].country),
                  (this.StateID = this.leavelist[0].province),
                  (this.CityID = this.leavelist[0].district),
                  (this.Barangay = this.leavelist[0].barangay),
                  (this.BillingAddress = this.leavelist[0].billingAddress),
                  (this.EmailAddress = this.leavelist[0].emailAddress),
                  (this.GLCode = this.leavelist[0].glCode),
                  (this.Region = this.leavelist[0].region),
                  (this.CostCenter = this.leavelist[0].costCenter),
                  this.getstate();
                this.getcity();
              },
              error: (err) => {
                // Swal.fire('Issue in Getting My Address Details');
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
            this.loader = false;
          },
          error: (err) => {
            // Swal.fire('Issue in Getting All Staff New');
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
        this.DigiofficeService.GetDependentDetails().subscribe({
          next: (data) => {
            debugger;
            this.leavelist = data.filter((x) => x.staffId == this.ID);
            (this.cb = this.leavelist[0].cb),
              (this.Religion = this.leavelist[0].religion),
              (this.DependentName = this.leavelist[0].dependentName),
              (this.Relationship1 = this.leavelist[0].relationship),
              (this.Gender1 = this.leavelist[0].gender),
              (this.DateOfBirth = this.datepipe.transform(
                this.leavelist[0].dateOfBirth,
                'yyyy-MM-dd'
              )),
              (this.Address = this.leavelist[0].address),
              (this.Mobile = this.leavelist[0].mobile),
              (this.Is_Dependent = this.leavelist[0].is_Dependent),
              (this.Id_Number = this.leavelist[0].id_Number),
              (this.Is_Child_Adopted = this.leavelist[0].is_Child_Adopted),
              (this.Race = this.leavelist[0].race),
              (this.CitizenShip = this.leavelist[0].citizenShip),
              (this.Working_Status = this.leavelist[0].working_Status),
              (this.Request_Type = this.leavelist[0].request_Type);
            this.loader = false;
          },
          error: (err) => {
            // Swal.fire('Issue in Getting Dependent Details');
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
        this.DigiofficeService.GetNomination().subscribe({
          next: (data) => {
            debugger;
            this.leavelist = data.filter((x) => x.staffId == this.ID);
            (this.Dependent = this.leavelist[0].dependent),
              (this.Percentage = this.leavelist[0].percentage),
              (this.NomineeType = this.leavelist[0].nomineeType),
              (this.GuardianName = this.leavelist[0].guardianName),
              (this.GuardianRelationship =
                this.leavelist[0].guardianRelationship);
            this.loader = false;
          },
          error: (err) => {
            // Swal.fire('Issue in Getting Nomination');
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
        this.DigiofficeService.GetEducationDetails().subscribe({
          next: (data) => {
            debugger;
            this.leavelist = data.filter((x) => String(x.staffId) == this.ID);
            (this.EducationType = this.leavelist[0].educationType),
              (this.Qualification = this.leavelist[0].qualification),
              (this.NameOfQualification =
                this.leavelist[0].nameOfQualification),
              (this.Branch = this.leavelist[0].branch),
              (this.InstitutionName = this.leavelist[0].institutionName),
              (this.Country = this.leavelist[0].country),
              (this.ScoreType = this.leavelist[0].scoreType),
              (this.EducationGrade = this.leavelist[0].grade),
              (this.StartDateMonth = this.datepipe.transform(
                this.leavelist[0].startDateMonth,
                'yyyy-MM-dd'
              )),
              (this.StartDateYear = this.datepipe.transform(
                this.leavelist[0].startDateYear,
                'yyyy-MM-dd'
              )),
              (this.EndDateMonth = this.datepipe.transform(
                this.leavelist[0].endDateMonth,
                'yyyy-MM-dd'
              )),
              (this.EndDateYear = this.datepipe.transform(
                this.leavelist[0].endDateYear,
                'yyyy-MM-dd'
              ));
            this.loader = false;
          },
          error: (err) => {
            // Swal.fire('Issue in Getting Education Details');
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
        this.DigiofficeService.GetBankDetails().subscribe({
          next: (data) => {
            debugger;
            this.leavelist = data.filter((x) => x.staffId == this.ID);
            (this.NameOfBank = this.leavelist[0].nameOfBank),
              (this.AccountHolderName = this.leavelist[0].accountHolderName),
              (this.BankAccountNumber = this.leavelist[0].bankAccountNumber);
            this.loader = false;
          },
          error: (err) => {
            // Swal.fire('Issue in Getting Bank Details');
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
        this.DigiofficeService.GetID_Details().subscribe({
          next: (data) => {
            debugger;
            let temp: any = data.filter((x) => x.staffId == this.ID);
            (this.IDType = temp[0].idType),
              (this.Number = temp[0].number),
              (this.NameOnDocument = temp[0].nameOnDocument),
              (this.IssueDate = this.datepipe.transform(
                temp[0].issueDate,
                'yyyy-MM-dd'
              )),
              (this.ExpiryDate = this.datepipe.transform(
                temp[0].expiryDate,
                'yyyy-MM-dd'
              )),
              (this.IssuingAuthority = temp[0].issuingAuthority),
              (this.PlaceOfIssue = temp[0].placeOfIssue);
            this.loader = false;
          },
          error: (err) => {
            // Swal.fire('Issue in Getting ID Details');
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
        this.DigiofficeService.GetVisaDetails().subscribe({
          next: (data) => {
            debugger;
            this.leavelist = data.filter((x) => x.staffId == this.ID);
            (this.VisaType = this.leavelist[0].visaType),
              (this.VisaNumber = this.leavelist[0].visaNumber),
              (this.VisaIssueDate = this.datepipe.transform(
                this.leavelist[0].visaIssueDate,
                'yyyy-MM-dd'
              )),
              (this.VisaExpiryDate = this.datepipe.transform(
                this.leavelist[0].visaExpiryDate,
                'yyyy-MM-dd'
              ));
            this.loader = false;
          },
          error: (err) => {
            // Swal.fire('Issue in Getting Visa Details');
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
        this.DigiofficeService.GetSalaryDetails().subscribe({
          next: (data) => {
            debugger;
            this.leavelist = data.filter((x) => x.staffId == this.ID);
            (this.EmployeeName = this.leavelist[0].employeeName),
              (this.Grade = this.leavelist[0].grade),
              (this.Designation = this.leavelist[0].designation),
              (this.PayRateType = this.leavelist[0].payRateType),
              (this.PayStructure = this.leavelist[0].payStructure),
              (this.EffectiveFromDate = this.datepipe.transform(
                this.leavelist[0].effectiveFromDate,
                'yyyy-MM-dd'
              )),
              (this.Reason = this.leavelist[0].reason);
            this.loader = false;
          },
          error: (err) => {
            // Swal.fire('Issue in Getting Salary Details');
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
    });
  }

  public GetRoleType() {
    this.DigiofficeService.GetRoleType().subscribe({
      next: (data) => {
        debugger;
        this.dropdownRoleList = data;
      },
      error: (err) => {
        // Swal.fire('Issue in Getting Role Type');
        this.loader = false;
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

  roleonItemSelect(item: any) {
    debugger;
    console.log(item);
    this.RoleType = item.id;
    if (this.ID == undefined) {
      this.RoleType = item.id;
    } else {
      this.RoleType1 = item.id;
    }
  }

  public GetNewstaff() {
    this.DigiofficeService.GetAllStaffNew().subscribe({
      next: (data) => {
        debugger;
        this.managerList = data.filter((x) => x.loginType == '2');
        // this.managerList = data.filter(x => x.type == 2);
      },
      error: (err) => {
        // Swal.fire('Issue in Getting All Staff New');
        this.loader = false;
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

  onItemSelect(item: any) {
    debugger;
    console.log(item);

    if (this.ID == undefined) {
      this.Supervisor = item.id;
    } else {
      this.Supervisor1 = item.id;
    }
  }

  deptonItemSelect(item: any) {
    debugger;
    console.log(item);
    if (this.ID == undefined) {
      this.Department = item.id;
    } else {
      this.department1 = item.id;
    }

    this.DigiofficeService.GetMyDetails().subscribe({
      next: (data) => {
        debugger;
        this.supervisorlist = data.filter(
          (x) => x.logintype == 2 && x.department == this.Department
        );
        this.loader = false;
      },
      error: (err) => {
        // Swal.fire('Issue in Getting My Details');
        this.loader = false;
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

  public GetDepartment() {
    this.DigiofficeService.GetDepartment().subscribe({
      next: (data) => {
        debugger;
        this.dropdownDeptList = data;
      },
      error: (err) => {
        // Swal.fire('Issue in Getting Department');
        this.loader = false;
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

  public GetLevelType() {
    this.DigiofficeService.GetLevelType().subscribe({
      next: (data) => {
        debugger;
        this.levellist = data;
      },
      error: (err) => {
        // Swal.fire('Issue in Getting Level Type');
        this.loader = false;
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

  public GetSubsidaryMaster() {
    this.DigiofficeService.GetSubsidaryMaster().subscribe({
      next: (data) => {
        debugger;
        this.SubsidaryList = data;
      },
      error: (err) => {
        // Swal.fire('Issue in Getting Subsidary Master');
        this.loader = false;
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

  public GetBanks() {
    this.DigiofficeService.GetBanks().subscribe({
      next: (data) => {
        debugger;
        this.Bankslist = data;
        this.loader = false;
      },
      error: (err) => {
        // Swal.fire('Issue in Getting Banks');
        this.loader = false;
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

  public GetShiftMaster() {
    this.DigiofficeService.GetShiftMaster().subscribe({
      next: (data) => {
        debugger;
        this.Shiflist = data;
      },
      error: (err) => {
        // Swal.fire('Issue in Getting Shift Master');
        this.loader = false;
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

  public GetCountryType() {
    this.DigiofficeService.GetCountryType().subscribe({
      next: (data) => {
        debugger;
        this.Countrylist = data;
        this.loader = false;
      },
      error: (err) => {
        // Swal.fire('Issue in Getting CountryType ');
        this.loader = false;
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

    this.DigiofficeService.GetStateType().subscribe({
      next: (data) => {
        debugger;
        this.Provincelist1 = data.filter((x) => x.countryID == 5);
      },
      error: (err) => {
        // Swal.fire('Issue in Getting State Type');
        this.loader = false;
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

  getstate() {
    this.DigiofficeService.GetStateType().subscribe({
      next: (data) => {
        debugger;
        this.Provincelist = data.filter((x) => x.countryID == this.CountryID);
      },
      error: (err) => {
        // Swal.fire('Issue in Getting State Type');
        this.loader = false;
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

  public getcity() {
    this.loader = true;
    this.DigiofficeService.GetCityType().subscribe({
      next: (data) => {
        debugger;
        this.Citylist = data.filter((x) => x.stateID == this.StateID);
        this.loader = false;
      },
      error: (err) => {
        // Swal.fire('Issue in Getting City Type');
        this.loader = false;
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

  public getbarangay(event: any) {
    debugger;
    this.loader = true;
    this.CityID = event.id;
    this.DigiofficeService.GetBarangayMaster().subscribe({
      next: (data) => {
        debugger;
        this.barangaylist = data.filter((x) => x.cityID == this.CityID);
        this.loader = false;
      },
      error: (err) => {
        // Swal.fire('Issue in Getting Barangay Master');
        this.loader = false;
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

  public onSelectBarangay(event: any) {
    debugger;
    this.Barangay = event.id;
  }

  stepChanged(args: StepChangedArgs) {
    debugger;
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
    //   behavior: 'smooth'
    // });

    // if ((args instanceof NavigationEnd)) {

    //   window.scrollTo(0, 0)
    // }
  }
 
  onSelect2(event: any) {
    debugger;
    console.log(event);
    this.attachments2.push(...event.addedFiles);

    this.DigiofficeService.ProjectAttachments(this.attachments2).subscribe({
      next: (res) => {
        debugger;
        this.attachments2url.push(res);
      },
      error: (err) => {
        // Swal.fire('Issue in Getting Project Attachments');
        this.loader = false;
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
  onRemove2(event: any) {
    debugger;
    console.log(event);
    this.attachments2.splice(this.attachments2.indexOf(event), 1);
  }

  public getemploymentdetails() {
    this.DigiofficeService.GetEmploymentDetails().subscribe({
      next: (data) => {
        debugger;
        this.leavelist = data.filter((x) => x.staffID == this.ID);
        (this.ComapanyName = this.leavelist[0].comapanyName),
          (this.Title = this.leavelist[0].title),
          (this.StartDate = this.datepipe.transform(
            this.leavelist[0].startDate,
            'yyyy-MM-dd'
          )),
          (this.EndDate = this.datepipe.transform(
            this.leavelist[0].endDate,
            'yyyy-MM-dd'
          )),
          (this.Salary = this.leavelist[0].salary),
          (this.CurrentEmployer = this.leavelist[0].currentEmployer);
        this.loader = false;
      },
      error: (err) => {
        // Swal.fire('Issue in Getting Employment Details');
        this.loader = false;
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
    this.loader = true;
    if (
      this.Name == ' ' ||
      this.Mobile == ' ' ||
      this.Personal_Email == ' ' ||
      this.RoleType == ' ' ||
      this.JoiningDate == ' ' ||
      this.Supervisor == ' ' ||
      this.Title == ' ' ||
      this.Last_Name == '' ||
      this.Paygroup == ' ' ||
      this.PagiBig_ID == ' ' ||
      this.EMPLOYEE_TIN == ' ' ||
      this.PHILHEALTH_NO == ' ' ||
      this.SSSNO == ' ' ||
      this.Department == ' ' ||
      this.PlaceO_f_Birth == ' ' ||
      this.Country_Of_Birth == ' ' ||
      this.Gender == ' ' ||
      this.DOB == ' ' ||
      this.PreviousEffectivityBMSDate == ' ' ||
      this.CurrentEffectivityBMSDate == ' ' ||
      this.COLA == undefined ||
      this.OrginalBms == undefined ||
      this.CurrentBMS == undefined
    ) {
      /* Swal.fire('Please Fill All The Mandatory Fields') */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    } else {
      this.Restdays = '';
      for (let i = 0; i < this.restdaysarray1.length; i++) {
        this.Restdays = this.Restdays + this.restdaysarray1[i].name + ',';
      }
      var eb = {
        BuildingID: 56,
        Name: this.Name,
        PhoneNo: this.Mobile,

        EmailID: this.Personal_Email.replaceAll(' ', ''),
        TypeID: this.RoleType,
        // 'Type': Number(this.RoleType),
        Address: this.Address,
        Attachment: this.Attachment == ' ' ? null : this.Attachment,
        JoiningDate: this.JoiningDate,
        Salary: this.CurrentBMS,
        LeavesPerMonth: this.LeavesPerMonth,
        WorkTimings: this.WorkTimings,
        ContactNumber: this.ContactNumber,
        Supervisor: this.Supervisor,

        EmployeeID: this.EmployeeID,
        ResignationDate: this.JoiningDate,
        ChaildTotal: 10,
        MedicalLeaveEntitlement: 10,
        MaternitityLeaveEntitlement: 105,
        PaternitityLeaveEntitlement: 7,
        CompassionateLeaveEntitlement: 10,
        Leavesfrompreviousyear: 10,
        ExtendedChildcareLeaveEntitlement: 10,
        MarriageLeaveEntitlement: 10,
        Title: this.Title,
        Middle_Name: this.Middle_Name,
        Last_Name: this.Last_Name,
        PlaceO_f_Birth: this.PlaceO_f_Birth,
        Country_Of_Birth: this.Country_Of_Birth,
        Age: this.Age,
        Gender: this.Gender,
        Status: this.Status,
        // 'Date_Of_Marriage' : (String(this.Date_Of_Marriage ) == "" ? "Null" + "," : "'" + String(this.Date_Of_Marriage) + "',"),

        // 'Date_Of_Marriage': this.Date_Of_Marriage == " " ? "1990-01-01 00:00:00.000" : this.Date_Of_Marriage,
        // 'Date_Of_Marriage': this.Date_Of_Marriage,
        Religion: this.Religion == undefined ? null : this.Religion,
        Citizen_Ship: this.Citizen_Ship == undefined ? null : this.Citizen_Ship,
        Ethnicity: this.Ethnicity == undefined ? null : this.Ethnicity,
        Nationality: this.Nationality,
        Is_Disabled: this.Is_Disabled == ' ' ? 0 : this.Is_Disabled,
        Blood_Group: this.Blood_Group,
        Height: this.Height == ' ' ? 0 : this.Height,
        Weight: this.Weight == ' ' ? 0 : this.Weight,
        MajorIllness: this.MajorIllness,
        IS_Night_Blind: this.IS_Night_Blind == ' ' ? 0 : this.IS_Night_Blind,
        Is_Color_Blind: this.Is_Color_Blind == ' ' ? 0 : this.Is_Color_Blind,
        DOB: this.DOB,
        Signature: this.attachments2url[0],
        Paygroup: this.Paygroup,
        PagiBig_ID: this.PagiBig_ID,
        EligibilityGroup: this.EligibilityGroup,
        CivilStatus: this.CivilStatus,
        PagiBigMP2: this.PagiBigMP2,
        // 'PagiBigAccountNo': this.PagiBigAccountNo,
        // 'PagibigMembership': this.PagibigMembership,
        // 'PagibigRemarks': this.PagibigRemarks,
        EMPLOYEE_TIN: this.EMPLOYEE_TIN,
        PHILHEALTH_NO: this.PHILHEALTH_NO,
        SSSNO: this.SSSNO,
        department: this.Department,
        Level: this.level,
        logintype: this.LoginType,
        ParentCompany: this.ParentCompany,
        AssignedCompany: this.AssignedCompany,
        ShiftID: 0,
        Restdays: this.Restdays,
        Is_Solo_Parent:
          this.Is_Solo_Parent == undefined ? 0 : this.Is_Solo_Parent,
        OrginalBms: this.OrginalBms,
        PreviousEffectivityBMSDate: this.PreviousEffectivityBMSDate,
        PreviousBMS: this.PreviousBMS,
        CurrentEffectivityBMSDate: this.CurrentEffectivityBMSDate,
        CurrentBMS: this.CurrentBMS,
        COLA: this.COLA,
        IncentiveLeave: this.IncentiveLeave,
        HMOInsurance: this.HMOInsurance,
        MeritInsurance: this.MeritInsurance,
        DailerLicense: this.DailerLicense,
        Incrementals: this.Incrementals,
        TaxStatus: this.TaxStatus,
        GCashNumber: this.GCashNumber,
        TalentSegment: this.TalentSegment,
        CostCentre: this.CostCentre,
        TranspoAllowance: this.TranspoAllowance,
        CommAllowance: this.CommAllowance,
        MealAllowance: this.MealAllowance,
        RiceAllowance: this.RiceAllowance,
        MedicineAllowance: this.MedicineAllowance,
        MaintenanceDepreciationAllowance: this.MaintenanceDepreciationAllowance,
        EffectivityofAllowance: this.EffectivityofAllowance,
        OTEligibility: this.OTEligibility,
        Frequency: this.Frequency,
        RateCode: this.RateCode,
        CompRate: this.CompRate,
      };
      this.DigiofficeService.InsertMyDetails(eb).subscribe({
        next: (data) => {
          debugger;

          if (data == 0) {
            Swal.fire(
              'EmailID or Mobile Number Already Exists. or your  License Count is over. '
            );
            var obj = {
              PageName: 'Staff Upload',
              ErrorMessage:
                'EmailID or Mobile Number Already Exists or License Count is Over.',
              Name: this.Name,
              EmployeeID: this.EmployeeID,
              EmployeeCount: 1,
              UserID: this.EmployeeID,
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
            this.StaffID = data;
            /*             Swal.fire('Saved Successfully') */
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 8;
          }
        },
        error: (err) => {
          // Swal.fire('Issue in Inserting My Details');
          this.loader = false;
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

  public Update() {
    debugger;
    this.showPopup = 0;
    // this.loader = true
    if (
      this.Name == ' ' ||
      this.Mobile == ' ' ||
      this.Personal_Email == ' ' ||
      this.RoleType == ' ' ||
      this.JoiningDate == ' ' ||
      this.Supervisor == ' ' ||
      this.Title == ' ' ||
      this.Last_Name == '' ||
      this.Paygroup == ' ' ||
      this.PagiBig_ID == ' ' ||
      this.EMPLOYEE_TIN == ' ' ||
      this.PHILHEALTH_NO == ' ' ||
      this.SSSNO == ' ' ||
      this.Department == ' ' ||
      this.PlaceO_f_Birth == ' ' ||
      this.Country_Of_Birth == ' ' ||
      this.Gender == ' ' ||
      this.DOB == ' ' ||
      this.PreviousEffectivityBMSDate == ' ' ||
      this.CurrentEffectivityBMSDate == ' '
    ) {
      /*  Swal.fire('Please Fill All The Mandatory Fields') */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    } else {
      this.Restdays = '';
      for (let i = 0; i < this.restdaysarray1.length; i++) {
        this.Restdays = this.Restdays + this.restdaysarray1[i].name + ',';
      }

      var eb = {
        ID: this.ID,
        BuildingID: 56,
        Name: this.Name,
        PhoneNo: this.Mobile,
        EmailID: this.Personal_Email,
        TypeID: this.RoleType1,
        Address: this.Address,
        Attachment: this.Attachment,
        JoiningDate: this.JoiningDate,
        Salary: this.CurrentBMS,
        LeavesPerMonth: this.LeavesPerMonth,
        WorkTimings: this.WorkTimings,
        ContactNumber: this.ContactNumber,
        Supervisor: this.Supervisor1,
        EmployeeID: this.EmployeeID,
        ResignationDate: this.JoiningDate,
        ChaildTotal: 10,
        MedicalLeaveEntitlement: 10,
        MaternitityLeaveEntitlement: 10,
        PaternitityLeaveEntitlement: 10,
        CompassionateLeaveEntitlement: 10,
        Leavesfrompreviousyear: 10,
        ExtendedChildcareLeaveEntitlement: 10,
        MarriageLeaveEntitlement: 10,
        Title: this.Title,
        Middle_Name: this.Middle_Name,
        Last_Name: this.Last_Name,
        PlaceO_f_Birth: this.PlaceO_f_Birth,
        Country_Of_Birth: this.Country_Of_Birth,
        Age: this.Age,
        Gender: this.Gender,
        Status: this.Status,
        // 'Date_Of_Marriage': (this.Date_Of_Marriage == " " || this.Date_Of_Marriage == "") ? "1990-01-01 00:00:00.000" : this.Date_Of_Marriage,
        // 'Date_Of_Marriage': this.Date_Of_Marriage == " " ? this.JoiningDate : this.Date_Of_Marriage,
        // 'Date_Of_Marriage': this.Date_Of_Marriage,
        Religion: this.Religion,
        Citizen_Ship: this.Citizen_Ship,
        Ethnicity: this.Ethnicity,
        Nationality: this.Nationality,
        Is_Disabled: this.Is_Disabled,
        Blood_Group: this.Blood_Group,
        Height: this.Height,
        Weight: this.Weight,
        MajorIllness: this.MajorIllness,
        IS_Night_Blind: this.IS_Night_Blind,
        Is_Color_Blind: this.Is_Color_Blind,
        DOB: this.DOB,
        Signature: this.attachments2url[0],
        Paygroup: this.Paygroup,
        PagiBig_ID: this.PagiBig_ID,
        EligibilityGroup: this.EligibilityGroup,
        CivilStatus: this.CivilStatus,
        PagiBigMP2: this.PagiBigMP2,
        // 'PagiBigAccountNo': this.PagiBigAccountNo,
        // 'PagibigMembership': this.PagibigMembership,
        // 'PagibigRemarks': this.PagibigRemarks,
        EMPLOYEE_TIN: this.EMPLOYEE_TIN,
        PHILHEALTH_NO: this.PHILHEALTH_NO,
        SSSNO: this.SSSNO,
        department: this.department1,
        Level: this.level,
        logintype: this.LoginType,
        ParentCompany: this.ParentCompany,
        AssignedCompany: this.AssignedCompany,
        ShiftID: 0,
        Restdays: this.Restdays,
        Is_Solo_Parent:
          this.Is_Solo_Parent == undefined ? 0 : this.Is_Solo_Parent,
        OrginalBms: this.OrginalBms,
        PreviousEffectivityBMSDate: this.PreviousEffectivityBMSDate,
        PreviousBMS: this.PreviousBMS,
        CurrentEffectivityBMSDate: this.CurrentEffectivityBMSDate,
        CurrentBMS: this.CurrentBMS,
        COLA: this.COLA,
        IncentiveLeave: this.IncentiveLeave,
        HMOInsurance: this.HMOInsurance,
        MeritInsurance: this.MeritInsurance,
        DailerLicense: this.DailerLicense,
        Incrementals: this.Incrementals,
        TaxStatus: this.TaxStatus,
        GCashNumber: this.GCashNumber,
        TalentSegment: this.TalentSegment,
        CostCentre: this.CostCentre,
        TranspoAllowance: this.TranspoAllowance,
        CommAllowance: this.CommAllowance,
        MealAllowance: this.MealAllowance,
        RiceAllowance: this.RiceAllowance,
        MedicineAllowance: this.MedicineAllowance,
        MaintenanceDepreciationAllowance: this.MaintenanceDepreciationAllowance,
        EffectivityofAllowance: this.EffectivityofAllowance,
        kDoHkolB4nFb1Zmt: 'txm781yfPCbp27xi',
        OTEligibility: this.OTEligibility,
        Frequency: this.Frequency,
        RateCode: this.RateCode,
        CompRate: this.CompRate,
      };
      this.DigiofficeService.UpdateStaff(eb).subscribe({
        next: (data) => {
          debugger;
          console.log(data);
          /*  Swal.fire('Updated Successfully') */
          // location.reload();
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 10;
        },
        error: (err) => {
          // Swal.fire('Issue in Updating Staff');
          this.loader = false;
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

  public SaveDependantDetails() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    var eb = {
      DependentName:
        this.DependentName == undefined ? null : this.DependentName,
      Relationship: this.Relationship == undefined ? null : this.Relationship,
      Gender: this.Gender1 == undefined ? null : this.Gender1,
      DateOfBirth: this.DateOfBirth == ' ' ? this.DOB : this.DateOfBirth,
      Address: this.Address == undefined ? null : this.Address,
      Mobile: this.Mobile == undefined ? null : this.Mobile,
      Is_Dependent: this.Is_Dependent == undefined ? 0 : 1,
      Id_Number: this.Id_Number == undefined ? null : this.Id_Number,
      Is_Child_Adopted:
        this.Is_Child_Adopted == undefined ? 0 : this.Is_Child_Adopted,
      Race: this.Race == undefined ? null : this.Race,
      CitizenShip: this.CitizenShip == undefined ? null : this.CitizenShip,
      Country_Of_Birth: this.cb == undefined ? null : this.cb,
      Religion: this.Religion == undefined ? null : this.Religion,
      Working_Status:
        this.Working_Status == undefined ? null : this.Working_Status,
      Request_Type: this.Request_Type == undefined ? null : this.Request_Type,
      StaffID: this.StaffID,
    };
    this.DigiofficeService.InsertDependentDetails(eb).subscribe({
      next: (data) => {
        debugger;
        /*   Swal.fire('Saved Successfully') */
        this.loader = false;
        this.showPopup = 1;
        this.messageId = 8;
      },
      error: (err) => {
        // Swal.fire('Issue in Inserting Dependent Details');
        this.loader = false;
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

  public SaveNomination() {
    debugger;
    this.showPopup = 0;
    if (
      this.Dependent == undefined ||
      this.Dependent == null ||
      this.Dependent == '' ||
      this.Percentage == undefined ||
      this.Percentage == null ||
      this.Percentage == '' ||
      this.NomineeType == undefined ||
      this.NomineeType == null ||
      this.NomineeType == ''
    ) {
      /*     Swal.fire("Please fill Mandatory Fields"); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    } else {
      var eb = {
        Dependent: this.Dependent,
        Percentage: this.Percentage,
        NomineeType: this.NomineeType,
        GuardianName: this.GuardianName,
        GuardianRelationship: this.GuardianRelationship,
        StaffID: this.StaffID,
      };
      this.DigiofficeService.InsertNomination(eb).subscribe({
        next: (data) => {
          debugger;
          /* Swal.fire('Saved Successfully') */
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 8;
        },
        error: (err) => {
          // Swal.fire('Issue in Inserting Nomination');
          this.loader = false;
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

  public SaveEmployment() {
    debugger;
    this.showPopup = 0;
    for (let i = 0; i <= this.unitdetailsarray.length; i++) {
      var eb = {
        ComapanyName: this.unitdetailsarray[0].ComapanyName,
        Title: this.unitdetailsarray[0].Title,
        StartDate: this.unitdetailsarray[0].StartDate,
        EndDate: this.unitdetailsarray[0].EndDate,
        Salary: this.unitdetailsarray[0].Salary,
        CurrentEmployer: this.CurrentEmployer,
        StaffID: this.StaffID,
      };
      this.DigiofficeService.InsertEmploymentDetails(eb).subscribe({
        next: (data) => {
          debugger;
          /* Swal.fire('Saved Successfully') */
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 8;
        },
        error: (err) => {
          // Swal.fire('Issue in Inserting Employment Details');
          this.loader = false;
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

  public SaveEducation() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    if (
      this.StartDateMonth == undefined ||
      this.StartDateMonth == 0 ||
      this.EndDateMonth == undefined ||
      this.EndDateMonth == ''
    ) {
      /*   Swal.fire('Please Fill All Fields'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    } else {
      var eb = {
        EducationType:
          this.EducationType == undefined ? null : this.EducationType,
        Qualification:
          this.Qualification == undefined ? null : this.Qualification,
        NameOfQualification:
          this.NameOfQualification == undefined
            ? null
            : this.NameOfQualification,
        Branch: this.Branch == undefined ? null : this.Branch,
        InstitutionName:
          this.InstitutionName == undefined ? null : this.InstitutionName,
        Country: this.Country == undefined ? null : this.Country,
        ScoreType: this.ScoreType == undefined ? null : this.ScoreType,
        grade: this.EducationGrade == undefined ? null : this.EducationGrade,
        StartDateMonth:
          this.StartDateMonth == ' ' ? this.DOB : this.StartDateMonth,
        StartDateYear:
          this.StartDateMonth == ' ' ? this.DOB : this.StartDateMonth,
        EndDateMonth: this.EndDateMonth == ' ' ? this.DOB : this.EndDateMonth,
        EndDateYear: this.EndDateMonth == ' ' ? this.DOB : this.EndDateMonth,
        StaffID: this.StaffID,
      };
      this.DigiofficeService.InsertEducationDetails(eb).subscribe({
        next: (data) => {
          debugger;
          this.loader = false;
          /* Swal.fire('Saved Successfully') */
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 8;
        },
        error: (err) => {
          // Swal.fire('Issue in Inserting Education Details');
          this.loader = false;
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

  public SaveIdDetails() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    if (
      this.IssueDate == undefined ||
      this.IssueDate == 0 ||
      this.ExpiryDate == undefined ||
      this.ExpiryDate == ''
    ) {
      /*   Swal.fire('Please Fill All Fields'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
      this.loader = false;
    } else {
      var eb = {
        IDType: this.IDType,
        Number: this.Number,
        NameOnDocument: this.NameOnDocument,
        IssueDate: this.IssueDate,
        ExpiryDate: this.ExpiryDate,
        IssuingAuthority: this.IssuingAuthority,
        PlaceOfIssue: this.PlaceOfIssue,
        StaffID: this.StaffID,
      };
      this.DigiofficeService.InsertID_Details(eb).subscribe({
        next: (data) => {
          debugger;
          /* Swal.fire('Saved Successfully') */
          this.loader = false;
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 8;
        },
        error: (err) => {
          // Swal.fire('Issue in Inserting ID Details');
          this.loader = false;
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

  public SaveBankDetails() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    if (
      this.NameOfBank == undefined ||
      this.AccountHolderName == undefined ||
      this.BankAccountNumber == undefined
    ) {
      /*   Swal.fire('Please Fill All The Mandatory Fields') */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    } else {
      var eb = {
        NameOfBank: this.NameOfBank,
        AccountHolderName: this.AccountHolderName,
        BankAccountNumber: this.BankAccountNumber,
        StaffID: this.StaffID,
      };
      this.DigiofficeService.InsertBankDetails(eb).subscribe({
        next: (data) => {
          debugger;
          /*  Swal.fire('Saved Successfully') */
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 8;
          this.loader = false;
        },
        error: (err) => {
          // Swal.fire('Issue in Inserting Bank Details');
          this.loader = false;
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

  public UpdateAllowanceDetails() {}

  public SaveAllowanceDetails() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    if (
      this.Allowance == undefined ||
      this.Amount == undefined ||
      this.startdate == undefined ||
      this.endate == undefined
    ) {
      Swal.fire('Please Fill All The Mandatory Fields');
      this.loader = false;
      // this.showPopup = 1;
      // this.messageId = 13;
    } else {
      this.DigiofficeService.GetAllStaffNewByEmployeID(this.StaffID).subscribe(
        (data) => {
          debugger;
          let temp: any = data;
          let staffid = temp[0]?.id;
          var eb = {
            StaffID: staffid,
            AllowanceID: this.Allowance,
            Amount: this.Amount,
            startdate: this.startdate,
            enddate: this.endate,
          };
          // this.SavedAllowancelist=eb;
          this.DigiofficeService.InsertStaffAllowanceDetails(eb).subscribe({
            next: (data) => {
              debugger;
              if (data != 0) {
                Swal.fire('Saved Successfully');
                this.ngOnInit();
              } else {
                Swal.fire('issue in InsertStaffAllowanceDetails ');
              }
              this.loader = false;
              // this.showPopup = 1;
              // this.messageId = 8;
            },
            error: (err) => {
              // Swal.fire('Issue in Inserting Bank Details');
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
      );
    }
  }

  public SaveVisaDetails() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    var eb = {
      VisaType: this.VisaType == undefined ? null : this.VisaType,
      VisaNumber: this.VisaNumber == undefined ? null : this.VisaNumber,
      VisaIssueDate: this.VisaIssueDate == ' ' ? this.DOB : this.VisaIssueDate,
      VisaExpiryDate:
        this.VisaExpiryDate == ' ' ? this.DOB : this.VisaExpiryDate,
      StaffID: this.StaffID,
    };
    this.DigiofficeService.InsertVisaDetails(eb).subscribe({
      next: (data) => {
        debugger;
        /*      Swal.fire('Saved Successfully') */
        this.loader = false;
        this.showPopup = 1;
        this.messageId = 8;
        this.router.navigate(['/EmployeeDashboard']);
      },
      error: (err) => {
        // Swal.fire('Issue in Inserting Visa Details');
        this.loader = false;
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

  public SaveSalaryDetails() {
    debugger;
    this.showPopup = 8;
    this.loader = true;
    var eb1 = {
      EmployeeName: this.EmployeeName,
      Grade: this.Grade,
      Designation: this.Designation,
      PayRateType: this.PayRateType,
      PayStructure: this.PayStructure,
      EffectiveFromDate: this.EffectiveFromDate,
      Reason: this.Reason,
      StaffID: this.StaffID,
    };
    this.DigiofficeService.InsertSalaryDetails(eb1).subscribe({
      next: (data) => {
        debugger;
        /*   Swal.fire('Saved Successfully') */
        this.loader = false;
        this.showPopup = 1;
        this.messageId = 8;
      },
      error: (err) => {
        // Swal.fire('Issue in Inserting Salary Details');
        this.loader = false;
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

  public SaveAddressDetails() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    if (
      this.AddressType == ' ' ||
      this.AddressType == undefined ||
      this.AddressLine1 == ' ' ||
      this.AddressLine1 == undefined ||
      this.CityID == ' ' ||
      this.CityID == undefined ||
      this.StateID == ' ' ||
      this.StateID == undefined ||
      this.CountryID == ' ' ||
      this.CountryID == undefined ||
      this.Barangay == ' ' ||
      this.Barangay == undefined ||
      this.SubDistrictPostcode == ' ' ||
      this.SubDistrictPostcode == undefined ||
      this.EmergencyContactName == '' ||
      this.EmergencyContactName == undefined ||
      this.EmergencyContactRelationship == '' ||
      this.EmergencyContactRelationship == undefined ||
      this.EmergencyContactMobileNumber == 0 ||
      this.EmergencyContactMobileNumber == undefined
    ) {
      /*    Swal.fire('Please Fill All The Mandatory Fields') */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    } else {
      var eb = {
        AddressType: this.AddressType,

        FindPlace: this.FindPlace == undefined ? null : this.FindPlace,
        AddressLine1: this.AddressLine1,
        AddressLine2: this.AddressLine2,
        AddressLine3: this.AddressLine3,
        AddressLine4: this.AddressLine4,
        District: this.CityID,
        Province: this.StateID,
        Country: this.CountryID,
        barangay: this.Barangay,
        subDistrictPostcode: this.SubDistrictPostcode,
        Mobile: this.Mobile1,
        LandLineFax: this.LandLineFax,
        IsCorrespondance: 0,
        RequestType: this.RequestType,
        EmergencyContactName: this.EmergencyContactName,
        EmergencyContactRelationship: this.EmergencyContactRelationship,
        EmergencyContactMobileNumber: this.EmergencyContactMobileNumber,
        EmergencyContactOfficeNumber: this.EmergencyContactOfficeNumber,
        EmergencyContactLandLineNumber: this.EmergencyContactLandLineNumber,
        EmergencyContact_EmailID: this.EmergencyContact_EmailID,
        EmergencyContact_Address: this.EmergencyContact_Address,
        StaffID: this.StaffID,
        BillingAddress: this.BillingAddress,
        EmailAddress: this.EmailAddress,
        GLCode: this.GLCode,
        Region: this.Region,
        CostCenter: this.CostCenter,
      };
      this.DigiofficeService.InsertMyAddressDetails(eb).subscribe({
        next: (data) => {
          debugger;
          /*  Swal.fire('Saved successfully.'); */
          // this.router.navigate(['/EmployeeDashboard']);
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 8;
        },
        error: (err) => {
          // Swal.fire('Issue in Inserting My Address Details');
          this.loader = false;
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

  public getRoleType(event: any) {
    debugger;
    this.RoleType = event.target.value;
  }




  public SavePositionDetails() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    if (
      this.EmployeeCode == 0 ||
      this.OfficialEmail == undefined ||
      this.Band == ' ' ||
      this.JobRole == undefined ||
      this.EmployeeStatus == ' ' ||
      this.NoticePeriod == ' ' ||
      this.ProbationPeriod == ' ' ||
      this.ConfirmationDueDate == ' ' ||
      this.CostCenter == undefined ||
      this.CostCenter == null
    ) {
      /* Swal.fire('Please Fill All The Mandatory Fields') */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    } else {
      var eb = {
        EmployeeCode: this.EmployeeCode,
        OfficialEmail: this.OfficialEmail,
        Band: 1,
        Grade: 1,
        JobRole: this.JobRole,
        Manager: this.Manager,
        EmployeeType: this.EmployeeType == undefined ? null : this.EmployeeType,
        EmployeeStatus: this.EmployeeStatus,
        NoticePeriod: this.NoticePeriod,
        ProbationPeriod: this.ProbationPeriod,
        ConfirmationDueDate:
          this.ConfirmationDueDate == undefined
            ? ' '
            : this.ConfirmationDueDate,
        ConfirmationStatus: this.ConfirmationStatus,
        EmployeeName: this.EmployeeName,
        StaffID: this.StaffID,
        ExtensionEndDate: this.ExtensionEndDate,
        ProbationEndDate: this.ProbationEndDate,
        ProbationStartDate: this.ProbationStartDate,
        StartDate: this.StartDate,
        EndDate: this.EndDate,
        ResignationDate: this.ResignationDate,
        EmailAddress: this.EmailAddress,
        GLCode: this.GLCode,
        BillingAddress: this.BillingAddress,
        CostCenter: this.CostCenter,
      };
      this.loader = false;
      this.DigiofficeService.InsertPositionDetails(eb).subscribe({
        next: (data) => {
          debugger;
          /*  Swal.fire('Saved Successfully') */
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 8;
        },
        error: (err) => {
          // Swal.fire('Issue in Inserting Position Details');
          this.loader = false;
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

  public UpdateDependentDetails() {
    debugger;
    this.loader = true;
    this.showPopup = 0;
    var eb = {
      ID: this.StaffID,
      DependentName:
        this.DependentName == undefined ? null : this.DependentName,
      Relationship: this.Relationship1 == undefined ? null : this.Relationship1,
      Gender: this.Gender1 == undefined ? null : this.Gender1,
      DateOfBirth: this.DateOfBirth == ' ' ? this.DOB : this.DateOfBirth,
      Address: this.Address == undefined ? null : this.Address,
      Mobile: this.Mobile == undefined ? null : this.Mobile,
      Is_Dependent: this.Is_Dependent == undefined ? 0 : 1,
      Id_Number: this.Id_Number == undefined ? null : this.Id_Number,
      Is_Child_Adopted: this.Is_Child_Adopted == undefined ? 0 : 1,
      Race: this.Race == undefined ? null : this.Race,
      CitizenShip: this.CitizenShip == undefined ? null : this.CitizenShip,
      Country_Of_Birth: this.cb == undefined ? null : this.cb,
      Religion: this.Religion == undefined ? null : this.Religion,
      Working_Status:
        this.Working_Status == undefined ? null : this.Working_Status,
      Request_Type: this.Request_Type == undefined ? null : this.Request_Type,
    };
    this.DigiofficeService.UpdateDependentDetails(eb).subscribe({
      next: (data) => {
        debugger;
        /* Swal.fire("Updated Successfully!!!") */
        // location.reload();
        this.loader = false;
        this.showPopup = 1;
        this.messageId = 10;
      },
      error: (err) => {
        // Swal.fire('Issue in Updating Dependent Details');
        this.loader = false;
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

  public UpdateNomination() {
    debugger;
    this.showPopup = 0;
    if (
      this.Dependent == undefined ||
      this.Percentage == undefined ||
      this.NomineeType == undefined
    ) {
       Swal.fire('Please Fill All Mandatory Fields') ;
    } else {
      var eb = {
        ID: this.StaffID,
        Dependent: this.Dependent,
        Percentage: this.Percentage,
        NomineeType: this.NomineeType,
        GuardianName: this.GuardianName,
        GuardianRelationship: this.GuardianRelationship,
      };
      this.DigiofficeService.UpdateNomination(eb).subscribe({
        next: (data) => {
          debugger;
          /*  Swal.fire("Updated Successfully!!!") */
          // location.reload();
          // this.loader = false
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 10;
        },
        error: (err) => {
          // Swal.fire('Issue in Updating Nomination');
          this.loader = false;
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
    // this.loader = true
  }

  public UpdateEmploymentDetails() {
    debugger;
    this.loader = true;
    this.showPopup = 0;
    var eb = {
      StaffID: this.StaffID,
      ComapanyName: this.ComapanyName,
      Title: this.Title,
      StartDate: this.StartDate,
      EndDate: this.EndDate,
      Salary: this.Salary,
      CurrentEmployer: this.CurrentEmployer,
    };
    this.DigiofficeService.UpdateEmploymentDetails(eb).subscribe({
      next: (data) => {
        debugger;
        /*  Swal.fire("Updated Successfully!!!") */
        this.loader = false;
        this.showPopup = 1;
        this.messageId = 10;
        // location.reload();
        this.loader = false;
      },
      error: (err) => {
        // Swal.fire('Issue in Updating Employment Details');
        this.loader = false;
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

  public UpdateEducationDetails() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    if (
      this.StartDateMonth == undefined ||
      this.StartDateMonth == 0 ||
      this.EndDateMonth == undefined ||
      this.EndDateMonth == ''
    ) {
      /*  Swal.fire('Please Fill All Fields'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    } else {
      var eb = {
        ID: this.StaffID,
        EducationType:
          this.EducationType == undefined ? null : this.EducationType,
        Qualification:
          this.Qualification == undefined ? null : this.Qualification,
        NameOfQualification:
          this.NameOfQualification == undefined
            ? null
            : this.NameOfQualification,
        Branch: this.Branch == undefined ? null : this.Branch,
        InstitutionName:
          this.InstitutionName == undefined ? null : this.InstitutionName,
        Country: this.Country == undefined ? null : this.Country,
        ScoreType: this.ScoreType == undefined ? null : this.ScoreType,
        Grade: this.EducationGrade == undefined ? null : this.EducationGrade,
        StartDateMonth:
          this.StartDateMonth == ' ' ? this.DOB : this.StartDateMonth,
        StartDateYear:
          this.StartDateMonth == ' ' ? this.DOB : this.StartDateMonth,
        EndDateMonth: this.EndDateMonth == ' ' ? this.DOB : this.EndDateMonth,
        EndDateYear: this.EndDateMonth == ' ' ? this.DOB : this.EndDateMonth,
      };
      this.DigiofficeService.UpdateEducationDetails(eb).subscribe({
        next: (data) => {
          debugger;
          /*  Swal.fire("Updated Successfully!!!") */
          // location.reload();
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 10;
        },
        error: (err) => {
          // Swal.fire('Issue in Updating Education Details');
          this.loader = false;
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

  public UpdateID_Details() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    if (
      this.IssueDate == undefined ||
      this.IssueDate == 0 ||
      this.ExpiryDate == undefined ||
      this.ExpiryDate == ''
    ) {
      /* Swal.fire('Please Fill All Fields'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
      this.loader = false;
    } else {
      var eb = {
        ID: this.StaffID,

        IDType: this.IDType,
        Number: this.Number,
        NameOnDocument: this.NameOnDocument,
        IssueDate: this.IssueDate,
        ExpiryDate: this.ExpiryDate,
        IssuingAuthority: this.IssuingAuthority,
        PlaceOfIssue: this.PlaceOfIssue,
      };
      this.DigiofficeService.UpdateID_Details(eb).subscribe({
        next: (data) => {
          debugger;
          /*     Swal.fire("Updated Successfully!!!"); */
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 10;
          // location.reload();
        },
        error: (err) => {
          // Swal.fire('Issue in Updating ID Details');
          this.loader = false;
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
      this.loader = false;
    }
  }

  public UpdateBankDetails() {
    debugger;
    this.loader = true;
    this.showPopup = 0;
    if (
      this.NameOfBank == undefined ||
      this.AccountHolderName == undefined ||
      this.BankAccountNumber == undefined ||
      this.NameOfBank == '' ||
      this.AccountHolderName == '' ||
      this.BankAccountNumber == '' ||
      this.NameOfBank == null ||
      this.AccountHolderName == null ||
      this.BankAccountNumber == null ||
      this.NameOfBank == 'Select One'
    ) {
      /*  Swal.fire('Please Fill All The Mandatory Fields'); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    } else {
      var eb = {
        ID: this.StaffID,
        NameOfBank: this.NameOfBank,
        AccountHolderName: this.AccountHolderName,
        BankAccountNumber: this.BankAccountNumber,
      };
      this.DigiofficeService.UpdateBankDetails(eb).subscribe({
        next: (data) => {
          debugger;
          /*  Swal.fire("Updated Successfully!!!") */
          // location.reload();
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 10;
        },
        error: (err) => {
          // Swal.fire('Issue in Updating Bank Details');
          this.loader = false;
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

  public UpdateVisaDetails() {
    debugger;
    this.loader = true;
    this.showPopup = 0;
    var eb = {
      ID: this.StaffID,

      VisaType: this.VisaType == undefined ? null : this.VisaType,
      VisaNumber: this.VisaNumber == undefined ? null : this.VisaNumber,
      VisaIssueDate: this.VisaIssueDate == ' ' ? this.DOB : this.VisaIssueDate,
      VisaExpiryDate:
        this.VisaExpiryDate == ' ' ? this.DOB : this.VisaExpiryDate,
    };
    this.DigiofficeService.UpdateVisaDetails(eb).subscribe({
      next: (data) => {
        debugger;
        /*  Swal.fire("Updated Successfully!!!") */
        // location.reload();
        this.loader = false;
        this.showPopup = 1;
        this.messageId = 10;
      },
      error: (err) => {
        // Swal.fire('Issue in Updating Visa Details');
        this.loader = false;
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

  public UpdateSalaryDetails() {
    debugger;
    this.loader = true;
    this.showPopup = 0;
    var eb1 = {
      ID: this.StaffID,
      EmployeeName: this.EmployeeName,
      Grade: this.Grade,
      Designation: this.Designation,
      PayRateType: this.PayRateType,
      PayStructure: this.PayStructure,
      EffectiveFromDate: this.EffectiveFromDate,
      Reason: this.Reason,
    };
    this.DigiofficeService.UpdateSalaryDetails(eb1).subscribe({
      next: (data) => {
        debugger;
        /*    Swal.fire("Updated Successfully!!!") */
        // location.reload();
        this.loader = false;
        this.showPopup = 1;
        this.messageId = 10;
      },
      error: (err) => {
        // Swal.fire('Issue in Updating Salary Details');
        this.loader = false;
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

  public UpdateMyAddressDetails() {
    debugger;
    this.loader = true;
    this.showPopup = 0;
    if (
      this.AddressType == ' ' ||
      this.AddressType == undefined ||
      this.AddressLine1 == ' ' ||
      this.AddressLine1 == undefined ||
      this.CityID == ' ' ||
      this.CityID == undefined ||
      this.StateID == ' ' ||
      this.StateID == undefined ||
      this.CountryID == ' ' ||
      this.CountryID == undefined ||
      this.Barangay == ' ' ||
      this.Barangay == undefined ||
      this.SubDistrictPostcode == ' ' ||
      this.SubDistrictPostcode == undefined ||
      this.EmergencyContactName == '' ||
      this.EmergencyContactName == undefined ||
      this.EmergencyContactRelationship == '' ||
      this.EmergencyContactRelationship == undefined ||
      this.EmergencyContactMobileNumber == 0 ||
      this.EmergencyContactMobileNumber == undefined
    ) {
      /*   Swal.fire('Please Fill All The Mandatory Fields') */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    } else {
      var eb = {
        ID: this.StaffID,
        AddressType: this.AddressType,

        FindPlace: this.FindPlace,
        AddressLine1: this.AddressLine1,
        AddressLine2: this.AddressLine2,
        AddressLine3: this.AddressLine3,
        AddressLine4: this.AddressLine4,
        // 'District': this.District,
        // 'Province': this.Province,
        // 'Country': this.Country1,
        District: this.CityID,
        Province: this.StateID,
        Country: this.CountryID,
        barangay: this.Barangay,
        SubDistrictPostcode: this.SubDistrictPostcode,
        Mobile: '9975766322',
        LandLineFax: this.LandLineFax,
        IsCorrespondance: this.IsCorrespondance,
        RequestType: this.RequestType,
        EmergencyContactName: this.EmergencyContactName,
        EmergencyContactRelationship: this.EmergencyContactRelationship,
        EmergencyContactMobileNumber: this.EmergencyContactMobileNumber,
        EmergencyContactOfficeNumber: this.EmergencyContactOfficeNumber,
        EmergencyContactLandLineNumber: this.EmergencyContactLandLineNumber,
        EmergencyContact_EmailID: this.EmergencyContact_EmailID,
        EmergencyContact_Address: this.EmergencyContact_Address,
        BillingAddress: this.BillingAddress,
        EmailAddress: this.EmailAddress,
        GLCode: this.GLCode,
        Region: this.Region,
        CostCenter: this.CostCenter,
      };
      this.DigiofficeService.UpdateMyAddressDetails(eb).subscribe({
        next: (data) => {
          debugger;
          /* Swal.fire("Updated Successfully!!!") */
          // location.reload();
          this.loader = false;
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 10;
        },
        error: (err) => {
          // Swal.fire('Issue in Updating My Address Details');
          this.loader = false;
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

  public UpdatePositionDetails() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    if (
      this.EmployeeCode == 0 ||
      this.OfficialEmail == undefined ||
      this.Band == ' ' ||
      this.Band == undefined ||
      this.JobRole == undefined ||
      this.EmployeeStatus == ' ' ||
      this.EmployeeStatus == undefined ||
      this.NoticePeriod == ' ' ||
      this.NoticePeriod == undefined ||
      this.ProbationPeriod == 0 ||
      this.ProbationPeriod == undefined ||
      this.ConfirmationDueDate == ' ' ||
      this.ConfirmationDueDate == undefined ||
      this.CostCenter == undefined ||
      this.CostCenter == null
    ) {
      /* Swal.fire('Please Fill All The Mandatory Fields') */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    } else {
      var eb = {
        ID: this.StaffID,
        EmployeeCode: this.EmployeeCode,
        OfficialEmail: this.OfficialEmail,
        Band: 1,
        Grade: 1,
        JobRole: this.JobRole,
        Manager: this.Manager,
        EmployeeType: this.EmployeeType,
        EmployeeStatus: this.EmployeeStatus,
        NoticePeriod: this.NoticePeriod,
        ProbationPeriod: this.ProbationPeriod,
        ConfirmationDueDate: this.ConfirmationDueDate,
        ConfirmationStatus: this.ConfirmationStatus,
        EmployeeName: this.EmployeeName,
        ExtensionEndDate: this.ExtensionEndDate,
        ProbationEndDate: this.ProbationEndDate,
        ProbationStartDate: this.ProbationStartDate,
        StartDate: this.StartDate,
        EndDate: this.EndDate,
        EmailAddress: this.EmailAddress,
        BillingAddress: this.BillingAddress,
        CostCenter: this.CostCenter,
        GLCode: this.GLCode,
        ResignationDate: this.ResignationDate,
      };

      this.DigiofficeService.UpdatePositionDetails(eb).subscribe({
        next: (data) => {
          debugger;
          /*   Swal.fire('Updated Successfully') */
          // this.router.navigate(['/EmployeeForm']);
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 10;
        },
        error: (err) => {
          // Swal.fire('Issue in Updating Position Details');
          this.loader = false;
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

  public insertdetails() {
    this.showtable = 1;
    debugger;
    var stt = {
      ComapanyName: this.ComapanyName,
      Title: this.Title,
      StartDate: this.StartDate,
      EndDate: this.EndDate,
      Salary: this.Salary,
    };
    this.unitdetailsarray.push(stt);
    this.arrayid = this.arrayid + 1;
  }

  public cancel() {
    debugger;
    location.reload();
  }

  Provincelist1: any;
  public GetCountryID(event: any) {
    this.CountryID = event.target.value;
    this.DigiofficeService.GetStateType().subscribe({
      next: (data) => {
        debugger;
        this.Provincelist = data.filter((x) => x.countryID == this.CountryID);
        this.Provincelist1 = data.filter((x) => x.countryID == 6);
      },
      error: (err) => {
        // Swal.fire('Issue in Getting State Type');
        this.loader = false;
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

  public GetProvinceID(event: any) {
    debugger;
    this.loader = true;
    this.StateID = event.id;
    this.DigiofficeService.GetCityType().subscribe({
      next: (data) => {
        debugger;
        this.Citylist = data.filter((x) => x.stateID == this.StateID);
        this.loader = false;
      },
      error: (err) => {
        // Swal.fire('Issue in Getting City Type');
        this.loader = false;
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

  public GetBarangay(event: any) {
    this.CityID = event.target.value;
    this.DigiofficeService.GetBarangayMaster().subscribe({
      next: (data) => {
        debugger;
        this.Barangaylist = data.filter((x) => x.cityID == this.CityID);
      },
      error: (err) => {
        // Swal.fire('Issue in Getting Barangay Master');
        this.loader = false;
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



  // public GetCItyID(event: any) {
  //   debugger
  //   this.CityID = event.target.value;
  //   if (this.CityID == 103) {
  //     this.show = 1;
  //   } else {
  //     this.show = 2;
  //   }

  // }



  onItemSelect2(item: any) {
    debugger;
    console.log(item);
    this.restdaysarray1.push(item);
  }

  public getAssignedCompany() {
    debugger;
    this.DigiofficeService.GetMyDetails().subscribe({
      next: (data) => {
        debugger;
        this.supervisorlist = data.filter(
          (x) => x.type == 2 && x.assignedCompany == this.AssignedCompany
        );
        this.loader = false;
      },
      error: (err) => {
        // Swal.fire('Issue in Getting My Details');
        this.loader = false;
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

  public getDepartmentid() {
    this.DigiofficeService.GetMyDetails().subscribe({
      next: (data) => {
        debugger;
        this.supervisorlist = data.filter(
          (x) => x.type == 2 && x.department == this.Department
        );
        this.loader = false;
      },
      error: (err) => {
        // Swal.fire('Issue in Getting My Details');
        this.loader = false;
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

  public getLevelid() {
    this.DigiofficeService.GetMyDetails().subscribe({
      next: (data) => {
        debugger;
        this.supervisorlist = data.filter((x) => x.level == this.level);
        this.loader = false;
      },
      error: (err) => {
        // Swal.fire('Issue in Getting My Details');
        this.loader = false;
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

  public getroleid(event: any) {
    this.level = event.target.value;
  }

  public getdate() {
    var birthdate: any = new Date(this.DOB);

    var cur: any = new Date();
    var diff: any = cur - birthdate; // This is the difference in milliseconds
    this.Age = Math.floor(diff / 31557600000); // Divide by 1000*60*60*24*365.25
  }

  public DeleteStaffAllowanceDetails(ID: any) {
    debugger;
    this.showPopup = 0;
    Swal.fire({
      title: 'Delete Record',
      text: "Are you sure you want to delete? You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.value == true) {
        this.DigiofficeService.DeleteStaffAllowanceDetails(ID).subscribe({
          next: (data) => {
            debugger;
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 11;
            this.ngOnInit();
          },
          error: (err) => {
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
    });
  }

  public UpdateStaffAllowanceDetails() {
    debugger;
    this.loader = true;
    var entity = {
      ID: this.allowanceID,
      StaffID: this.StaffID,
      AllowanceID: this.Allowance,
      Amount: this.Amount,
      Startdate: this.startdate,
      Enddate: this.endate,
    };
    this.DigiofficeService.UpdateStaffAllowanceDetails(entity).subscribe({
      next: (data) => {
        debugger;
        Swal.fire('Updated Successfully');
        this.ngOnInit();
        this.loader = false;
      },
      error: (err) => {
        // this.loader = false;
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

  public getAllowanceID(id: any) {
    debugger;
    this.allowanceID = id;
    console.log('this.allowanceID', this.allowanceID);
    this.DigiofficeService.GetStaffAllowanceDetailsByStaffID(
      this.StaffID
    ).subscribe((data) => {
      this.allowanceList = data.filter((x) => x.id == this.allowanceID);
      (this.StaffID = this.allowanceList[0].staffID),
        (this.Allowance = this.allowanceList[0].allowanceID),
        (this.Amount = this.allowanceList[0].amount);
      if (
        this.datepipe.transform(
          this.allowanceList[0].startdate,
          'yyyy-MM-dd'
        ) == '1990-01-01'
      ) {
        this.startdate = ' ';
      } else {
        this.startdate = this.datepipe.transform(
          this.allowanceList[0].startdate,
          'yyyy-MM-dd'
        );
      }
      if (
        this.datepipe.transform(this.allowanceList[0].enddate, 'yyyy-MM-dd') ==
        '1990-01-01'
      ) {
        this.endate = ' ';
      } else {
        this.endate = this.datepipe.transform(
          this.allowanceList[0].enddate,
          'yyyy-MM-dd'
        );
      }
      this.loader = false;
    });
  }
  Citylist1: any;
  GetProvinceforwroklocation(event: any) {
    debugger;
    this.Citizen_Ship = event.short + '-';
    this.DigiofficeService.GetCityType().subscribe({
      next: (data) => {
        debugger;
        this.Citylist1 = data.filter((x) => x.stateID == event.id);
        this.loader = false;
      },
      error: (err) => {
        // Swal.fire('Issue in Getting City Type');
        this.loader = false;
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
  getCityforworklocation(event: any) {
    debugger;
  
    this.Citizen_Ship = this.Citizen_Ship + event.short;
    
  }
  removeCityforworklocation(event: any) {
    debugger
    var parts = this.Citizen_Ship.split('-');
    this.Citizen_Ship=parts[0];
  }
  removeProvinceforworklocation(event: any) {
    debugger
    var parts = this.Citizen_Ship.split('-');
    this.Citizen_Ship=parts[1];
    // Extract the desired part (in this case, the second part)
    
  }

  geteducatinenddate(){
    if(this.StartDateMonth>this.EndDateMonth){
      Swal.fire('Start date must be less than End date');
      this.EndDateMonth=null;
    }
  }

  getpercentege(){
    if(this.Percentage>100){
      Swal.fire('Percentage can not be more than 100');
      this.Percentage=0;
    }
  }
}
