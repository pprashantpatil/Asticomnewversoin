import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { interval } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DigiofficecorehrService {

  public host = sessionStorage.getItem('digiofficeapiurl');
  public antiforgerytoken = localStorage.getItem('antiforgerytoken');
  // public host = 'https://23.101.22.93/AsticomAPI';

  // public basehost = "https://AsticomCoreHR.amazeone.co/DigiOfficeAsticomDevAPI"
  public basehost = environment.basehost
  // public host1 = "https://support.amazeone.co/SupportAPI/";
  public host1 = environment.host1




  private url: string = '';
  constructor(private http: HttpClient) {
    interval(1000).subscribe(((_x: any) => {
      // this.host = sessionStorage.getItem('digiofficeapiurl');
      this.host = sessionStorage.getItem('digiofficeapiurl');


    }));


  }




  public InsertOTRates(json: any) {
    let APIURL = this.host + "/Master/InsertOTRates";
    return this.http.post<any[]>(APIURL, json);
  }


  public UpdateOTRates(json: any) {
    debugger
    let APIURL = this.host + "/Master/UpdateOTRates";
    return this.http.post<any[]>(APIURL, json);
  }

  public InsertLoanConfiguration(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertLoanConfiguration';
    return this.http.post(this.url, data);
  }
  public UpdateLoanConfiguration(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateLoanConfiguration';
    return this.http.post(this.url, data);
  }


  public GetLoanConfiguration() {
    return this.http.get<any[]>(
      this.host + "/Master/GetLoanConfiguration"

    );
  }

  public getIPAddress() {
    return this.http.get("https://api.ipify.org/?format=json");
  }


  public GetCancelledStaffLeaves(ID: any, TypeID: any, Sdate: any, Edate: any) {
    return this.http.get<any[]>(
      this.host + "/Master/GetCancelledStaffLeaves?ID=" + ID + "&TypeID=" + TypeID + "&Sdate=" + Sdate + "&Edate=" + Edate
    );
  }


  public GetLoanMaster() {
    return this.http.get<any[]>(
      this.host + "/Master/GetLoanMaster"

    );
  }


  public Enable_Disable_Loans(data: any) {
    debugger;
    this.url = this.host + '/Master/Enable_Disable_Loans';
    return this.http.post(this.url, data);
  }

  public InsertLoanMaster(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertLoanMaster';
    return this.http.post(this.url, data);
  }

  public UpdateLoanMaster(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateLoanMaster';
    return this.http.post(this.url, data);
  }


  public DeleteLoanMaster(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteLoanMaster?ID=" + ID);
  }

  public DeleteLoanConfiguration(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteLoanConfiguration?ID=" + ID);
  }

  public InsertExpensesWEB(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/InsertExpensesWEB';
    return this.http.post(this.url, data);
  }


  public InsertWorkplaceRequestWeb(data: any) {
    debugger;
    this.url = this.host + '/Building/InsertWorkplaceRequestWeb';
    return this.http.post(this.url, data);
  }





  public GetExpensesMaster() {
    return this.http.get<any[]>(
      this.host + "/MobileUser/GetExpensesMaster"
    );
  }

  public InsertStaffLeavesWeb(data: any) {
    debugger;
    this.url = this.host + '/Building/InsertStaffLeaves';
    return this.http.post(this.url, data);
  }

  public GetLeaveType() {
    return this.http.get<any[]>(
      this.host + "/MasterDemo/GetLeaveType"

    );
  }
  public GetShiftMaster() {
    return this.http.get<any[]>(
      this.host + "/Master/GetShiftMaster"

    );
  }

  public GetOTRates() {
    return this.http.get<any[]>(
      this.host + "/Master/GetOTRates"

    );
  }
  public GetProjectFolders() {
    return this.http.get<any[]>(
      this.host + "/Master/GetProjectFolders"

    );
  }



  public GetProjectMasterList() {
    return this.http.get<any[]>(
      this.host + "/MobileUser/GetProjectMasterList"
    );
  }






  public GetCurrencyMaster() {
    return this.http.get<any[]>(
      this.host + "/MobileUser/GetCurrencyMaster"
    );
  }


  public GetSupervisor() {
    return this.http.get<any[]>(
      this.host + "/MobileUser/GetSupervisor?ID=0"
    );
  }


  public GetExpensesListweb() {
    return this.http.get<any[]>(
      this.host + "/MobileUser/GetExpensesListweb?UserID=227&TypeID=2&SDate=01-01-2020&EDate=01-01-2025"
    );
  }



  public GetOtNightOt(Sdate: any, Edate: any, Shift: any, StaffID: any, Date: any) {
    return this.http.get<any[]>(
      this.host + "/Master/GetOtNightOt?StartTime=" + Sdate + "&EndTime=" + Edate + "&Shift=" + Shift + "&StaffID=" + StaffID + "&Date=" + Date
    );
  }


  public GetWorkplaceRequestDashboard() {
    return this.http.get<any[]>(
      this.host + "/Building/GetWorkplaceRequestDashboard?RaisedBy=0"
    );
  }


  public Get_Employees_For_Payroll(startdate: any, enddate: any) {
    debugger
    return this.http.get<any[]>(this.host + "/Building/Get_Employees_For_Payroll?startdate=" + startdate + "&enddate=" + enddate);
  }


  public GetTransportRequestType() {
    return this.http.get<any[]>(
      this.host + "/MobileUser/GetTransportRequestType"
    );
  }




  public GetBuildinglist() {
    return this.http.get<any[]>(
      this.host + "/Building/GetBuildinglist"
    );
  }





  public DeleteApplicantBankStatement(data: any) {
    debugger;
    this.url = this.host + '/MasterDemo/DeleteApplicantBankStatement';
    return this.http.post(this.url, data);
  }

  public GetStaffLeaves(ID: any, TypeID: any, Sdate: any, Edate: any) {
    return this.http.get<any[]>(
      this.host + "/Building/GetStaffLeaves?ID=" + ID + "&TypeID=" + TypeID + "&Sdate=" + Sdate + "&Edate=" + Edate
    );
  }



  public GetApprovedStaffLeavesByHR(ID: any, TypeID: any, Sdate: any, Edate: any) {
    return this.http.get<any[]>(
      this.host + "/Building/GetApprovedStaffLeavesByHR?ID=" + ID + "&TypeID=" + TypeID + "&Sdate=" + Sdate + "&Edate=" + Edate
    );
  }

  // public GetPendingStaffLeavesByHR(ID: any, TypeID: any, Sdate: any, Edate: any) {
  //   return this.http.get<any[]>(
  //     'http://localhost:1807/' + "/Building/GetPendingStaffLeavesByHR?ID=" + ID + "&TypeID=" + TypeID + "&Sdate=" + Sdate + "&Edate=" + Edate
  //   );
  // }

  public GetPendingStaffLeavesByHR(ID: any, TypeID: any, Sdate: any, Edate: any) {
    return this.http.get<any[]>(
      this.host + "/Building/GetPendingStaffLeavesByHR?ID=" + ID + "&TypeID=" + TypeID + "&Sdate=" + Sdate + "&Edate=" + Edate
    );
  }

  public GetRejectedStaffLeavesByHR(ID: any, TypeID: any, Sdate: any, Edate: any) {
    return this.http.get<any[]>(
      this.host + "/Building/GetRejectedStaffLeavesByHR?ID=" + ID + "&TypeID=" + TypeID + "&Sdate=" + Sdate + "&Edate=" + Edate
    );
  }

  public GetLocatorRequests(UserID: any, TypeID: any, Sdate: any, Edate: any) {
    return this.http.get<any[]>(
      this.host + "/MobileUser/GetLocatorRequests?UserID=" + UserID + "&TypeID=" + TypeID + "&Sdate=" + Sdate + "&Edate=" + Edate
    );
  }

  public GetStaffByManagerID(UserID: any,) {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetStaffByManagerID?StaffID=" + UserID
    );
  }
  public GetAttendanceByManagerID(UserID: any, Sdate: any, Edate: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetAttendanceByManagerID?userID=" + UserID + "&sdate=" + Sdate + "&edate=" + Edate
    );
  }

  public GetAttendanceReport() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetAttendanceReport"
    );
  }


  public InsertLocatorTable(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/InsertLocatorTable';
    return this.http.post(this.url, data);
  }

  public InsertAnnouncements(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertAnnouncement';
    return this.http.post(this.url, data);
  }
  public UpdateAnnouncements(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateAnnouncement';
    return this.http.post(this.url, data);
  }


  public UpdateAdditionalDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateAdditionalDetails';
    return this.http.post(this.url, data);
  }





  public GetAnnouncementsByBuildingID(BuildingID: any) {
    return this.http.get<any[]>(
      this.host + "/MobileUser/GetAnnouncementsByBuildingID?BuildingID=" + BuildingID
    );
  }

  public ProjectAttachments(files: any) {
    debugger
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    this.url = this.host + '/Announcement/ProjectAttachments';
    return this.http.post<any[]>(this.url, formdata);
  }

  public UploadmultipleProjectAttachments(files: any) {
    debugger
    let formdata: FormData = new FormData();
    formdata.append('file_upload', files, files.name);
    this.url = this.host + '/Announcement/ProjectAttachments';
    return this.http.post<any[]>(this.url, formdata);
  }


  public insertexcel(files: any, payrollid: any, filename: any) {
    return this.http.post(this.host + "/Master/ProjectAttachmentsbyuseridwithname?userid=" + payrollid + "&filename=" + filename, files);
  }
  public GetExcel1(files: any) {
    return this.http.post(this.host + '/Master/GetExcel1/', files);
  }



  public CreateZipfinal(files: any, payrollid: any, filename: any, companyid: any) {
    return this.http.post(this.host + '/Master/GetExcel1?userid=' + payrollid + '&filename=' + filename + '&companyid=' + companyid, files);
  }
  public Genearatezipwithpassword(files: any, payrollid: any) {
    return this.http.post(this.host + '/Master/Genearatezipwithpassword?userid=' + payrollid, files);
  }


  public InsertEmployeeVaccinationDetails(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertEmployeeVaccinationDetails';
    return this.http.post(this.url, data);
  }

  public ClearProbation(data: any) {
    debugger;
    this.url = this.host + '/Announcement/ClearProbation';
    return this.http.post(this.url, data);
  }
  public GetEmployeeVaccinationDetails() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetEmployeeVaccinationDetails"
    );
  }
  public InsertTimeSheets_Table(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/InsertTimeSheets_Table';
    return this.http.post(this.url, data);
  }
  public GetTimeSheetDetailsforweb() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetTimeSheetDetailsforweb"
    );
  }


  public GetCompanyDetails() {
    return this.http.get<any[]>(
      this.host + "/Building/GetCompanyDetails"
    );
  }



  public InsertCompanyDetails(data: any) {
    debugger;
    this.url = this.host + '/Building/InsertCompanyDetails';
    return this.http.post(this.url, data);
  }

  public UpdateCompanyDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateCompanyDetails';
    return this.http.post(this.url, data);
  }


  public InsertHolidays(data: any) {
    debugger;
    this.url = this.host + '/Building/InsertHolidays';
    return this.http.post(this.url, data);
  }

  public InsertPolicies(data: any) {
    debugger;
    this.url = this.host + '/Building/InsertPolicies';
    return this.http.post(this.url, data);
  }
  public InsertMyDetails(data: any) {
    debugger;
    this.url = this.host + '/Building/InsertBuildingStaff';
    return this.http.post<any>(this.url, data);
  }

  public UpdateLeaveBalanceDetails(data: any, url: any) {
    debugger;
    this.url = url + '/Announcement/UpdateLeaveBalanceDetails';
    return this.http.post(this.url, data);
  }

  public InsertMyDetailsBycompany(data: any, url: any) {
    debugger;
    this.url = url + '/Building/InsertBuildingStaff';
    return this.http.post(this.url, data);
  }

  public InsertEmployeeSalary(data: any, url: any) {
    debugger;
    this.url = url + '/Master/InsertEmployeeSalary';
    return this.http.post(this.url, data);
  }

  public InsertEmployeeLoansByStaffID(data: any, url: any) {
    debugger;
    this.url = url + '/Master/InsertEmployeeLoansByStaffID';
    return this.http.post(this.url, data);
  }



  public InsertUserRoleType(data: any) {
    debugger;
    this.url = this.host + '/MasterDemo/InsertUserRoleType';
    return this.http.post(this.url, data);
  }




  public GetHolidays() {
    return this.http.get<any[]>(
      this.host + "/Building/GetHolidays"
    );
  }

  public GetPolicies() {
    return this.http.get<any[]>(
      this.host + "/Building/GetPolicies"
    );
  }


  public GetFloorType(BuildingID: any) {
    return this.http.get<any[]>(
      this.host + "/Building/GetFloorTypebyBID?BID=" + BuildingID
    );
  }
  public GetRoleType() {
    return this.http.get<any[]>(
      this.host + "/MasterDemo/GetRoleType?UserTypeID=" + 1
    );
  }



  public GetMyDetailsForLogin(username: any, Password: any, roletype: any) {
    debugger
    return this.http.get<any[]>(
      this.host + "/Building/GetMyDetailsForLogin?EmailID=" + username + "&Password=" + Password + "&roleType=" + roletype);
  }

  public GetStaffLeaveCountForDashboard(ID: any, TypeID: any, Sdate: any, Edate: any) {
    debugger
    return this.http.get<any[]>(
      this.host + "/Building/GetStaffLeaveCountForDashboard?ID=" + ID + "&TypeID=" + TypeID + "&Sdate=" + Sdate + "&Edate=" + Edate);
  }

  public GetStaffOTCountForDashboard(ID: any, type: any, StartTime: any, EndTime: any) {
    debugger
    return this.http.get<any[]>(
      this.host + "/Master/GetStaffOTCountForDashboard?ID=" + ID + "&type=" + type + "&StartTime=" + StartTime + "&EndTime=" + EndTime);
  }

  public GetEmployeeLoansCountforDashboard(ID: any) {
    debugger
    return this.http.get<any[]>(
      this.host + "/Building/GetEmployeeLoansCountforDashboard?ID=" + ID);
  }



  public GetMyDetails() {
    debugger
    return this.http.get<any[]>(
      this.host + "/Announcement/GetMyDetails?username=" + 'Amaze2022' + "&password=" + 'P@ssw0rd@2022'
    );
  }
  public GetMyDetailsBycompany(url: any) {
    debugger
    return this.http.get<any[]>(
      url + "/Announcement/GetMyDetails"
    );
  }


  public GetMyDetailsByStaffID(StaffID: any) {
    debugger
    return this.http.get<any[]>(
      this.host + "/Master/GetMyDetailsByStaffID?ID=" + StaffID
    );
  }


  // public GetAttendanceCorrectionByStaffID(StaffID: any) {
  //   debugger
  //   return this.http.get<any[]>(
  //     this.host + "/Master/GetAttendanceCorrectionByStaffID?ID=" + StaffID
  //   );
  // }

  public GetEmployeeSalaryByStaffID(StaffID: any) {
    debugger
    return this.http.get<any[]>(
      this.host + "/Master/GetEmployeeSalaryByStaffID?ID=" + StaffID
    );
  }


  public GetDeMinimisMapping() {
    debugger
    return this.http.get<any[]>(
      this.host + "/Announcement/GetDeMinimisMapping"
    );
  }


  public GetBenefitsRoleMapping() {
    debugger
    return this.http.get<any[]>(
      this.host + "/Announcement/GetBenefitsRoleMapping"
    );
  }

  public InsertTransportationRequestsMob(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/InsertTransportationRequestsMob';
    return this.http.post(this.url, data);
  }


  public GetTransportationRequests() {
    return this.http.get<any[]>(
      this.host + "/TransportationRequest/GetTransportationRequest?UserID=227&TypeID=2&SDate=01-01-2020&EDate=01-01-2029"
    );
  }

  public InsertLeaveTypeMaster(data: any) {
    debugger;
    this.url = this.host + '/ProjectRequest/InsertLeaveTypeMaster';
    return this.http.post(this.url, data);
  }
  public InsertShiftMaster(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertShiftMaster';
    return this.http.post(this.url, data);
  }



  public InsertExpenseMaster(data: any) {
    debugger;
    this.url = this.host + '/ProjectRequest/InsertExpenseMaster';
    return this.http.post(this.url, data);
  }

  public Get_WorkStationType_Master() {
    return this.http.get<any[]>(
      this.host + "/Building/Get_WorkStationType_Master"
    );
  }


  public InsertWorkStationType_Master(data: any) {
    debugger;
    this.url = this.host + '/ProjectRequest/InsertWorkStationType_Master';
    return this.http.post(this.url, data);
  }

  public GetStaffExitFormality() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetStaffExitFormality"
    );
  }
  public GetAttrionanylticsdatabymonth() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetAttrionanylticsdatabymonth"
    );
  }

  public InsertStaffExitFormality(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertStaffExitFormality';
    return this.http.post(this.url, data);
  }








  public InsertTransportRequestType(data: any) {
    debugger;
    this.url = this.host + '/ProjectRequest/InsertTransportRequestType';
    return this.http.post(this.url, data);
  }


  public GetCountryType() {
    return this.http.get<any[]>(
      this.host + "/Building/GetCountryType"
    );
  }
  public GetGrivenceMaster() {
    return this.http.get<any[]>(
      this.host + "/Master/GetGrivenceMaster"
    );
  }


  public GetStateType() {
    return this.http.get<any[]>(
      this.host + "/Building/GetStateType?CountryID=" + 1
    );
  }

  public GetStateType1(id: any) {
    return this.http.get<any[]>(
      this.host + "/Building/GetStateType?CountryID=" + id
    );
  }

  // public GetStateType(id: any) {
  //   return this.http.get<any[]>(
  //     this.host + "/Building/GetStateType?CountryID=" + id
  //   );
  // }

  public GetCityType() {
    return this.http.get<any[]>(
      this.host + "/Building/GetCityType?StateID=4"
    );
  }



  public InsertNomination(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertNomination';
    return this.http.post(this.url, data);
  }

  public InsertMyAddressDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertMyAddressDetails';
    return this.http.post(this.url, data);
  }

  public InsertEmploymentDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertEmploymentDetails';
    return this.http.post(this.url, data);
  }

  public InsertEducationDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertEducationDetails';
    return this.http.post(this.url, data);
  }

  public InsertID_Details(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertID_Details';
    return this.http.post(this.url, data);
  }

  public InsertBankDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertBankDetails';
    return this.http.post(this.url, data);
  }


  
  public InsertStaffAllowanceDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertStaffAllowanceDetails';
    return this.http.post(this.url, data);
  }


  public InsertVisaDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertVisaDetails';
    return this.http.post(this.url, data);
  }

  public InsertSalaryDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertSalaryDetails';
    return this.http.post(this.url, data);
  }


  public InsertPositionDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertPositionDetails';
    return this.http.post(this.url, data);
  }


  public InsertDependentDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertDependentDetails';
    return this.http.post(this.url, data);
  }

  public UpdateExpencesApproveBySupervisor(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/UpdateExpencesApproveBySupervisor';
    return this.http.post(this.url, data);
  }


  public UpdateStaffShift(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateStaffShift';
    return this.http.post(this.url, data);
  }

  public UpdateLeaveType(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/UpdateLeaveType';
    return this.http.post(this.url, data);
  }


  public UpdateWorkStationType_Master(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/UpdateWorkStationType_Master';
    return this.http.post(this.url, data);
  }


  public UpdateTransportRequestType(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/UpdateTransportRequestType';
    return this.http.post(this.url, data);
  }


  public UpdateCityType(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/UpdateCityType';
    return this.http.post(this.url, data);
  }


  public UpdateCountryType(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/UpdateCountryType';
    return this.http.post(this.url, data);
  }


  public UpdateStateType(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/UpdateStateType';
    return this.http.post(this.url, data);
  }


  public InsertStateType(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/InsertStateType';
    return this.http.post(this.url, data);
  }



  public InsertCityType(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/InsertCityType';
    return this.http.post(this.url, data);
  }


  public InsertCountryType(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/InsertCountryType';
    return this.http.post(this.url, data);
  }

  public InsertProjectFolders(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertProjectFolders';
    return this.http.post(this.url, data);
  }


  public InsertGrivenceMaster(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/InsertGrivenceMaster';
    return this.http.post(this.url, data);
  }
  public UpdateGrivenceMaster(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateGrivenceMaster';
    return this.http.post(this.url, data);
  }

  public UpdateHolidays(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/UpdateHolidays';
    return this.http.post(this.url, data);
  }

  public UpdateExpencesMaster(data: any) {
    debugger;
    this.url = this.host + '/ProjectRequest/UpdateExpencesMaster';
    return this.http.post(this.url, data);
  }


  public DisableCompany(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/DisableCompany';
    return this.http.post(this.url, data);
  }




  public GetPositionDetails() {
    return this.http.get<any[]>(
      this.host + "/Master/GetPositionDetails"
    );
  }

  public GetMyAddressDetails() {
    return this.http.get<any[]>(
      this.host + "/Master/GetMyAddressDetails"
    );
  }

  public GetDependentDetails() {
    return this.http.get<any[]>(
      this.host + "/Master/GetDependentDetails"
    );
  }



  public GetNomination() {
    return this.http.get<any[]>(
      this.host + "/Master/GetNomination"
    );
  }

  public GetEmploymentDetails() {
    return this.http.get<any[]>(
      this.host + "/Master/GetEmploymentDetails"
    );
  }

  public GetEducationDetails() {
    return this.http.get<any[]>(
      this.host + "/Master/GetEducationDetails"
    );
  }


  public GetBankDetails() {
    return this.http.get<any[]>(
      this.host + "/Master/GetBankDetails"
    );
  }



  public GetID_Details() {
    return this.http.get<any[]>(
      this.host + "/Master/GetID_Details"
    );
  }


  public GetVisaDetails() {
    return this.http.get<any[]>(
      this.host + "/Master/GetVisaDetails"
    );
  }

  public GetSalaryDetails() {
    return this.http.get<any[]>(
      this.host + "/Master/GetSalaryDetails"
    );
  }



  public UpdatePositionDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdatePositionDetails';
    return this.http.post(this.url, data);
  }

  public UpdateEmploymentDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateEmploymentDetails';
    return this.http.post(this.url, data);
  }


  public UpdateEducationDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateEducationDetails';
    return this.http.post(this.url, data);
  }


  public UpdateMyDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateMyDetails';
    return this.http.post(this.url, data);
  }


  public UpdateSalaryDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateSalaryDetails';
    return this.http.post(this.url, data);
  }


  public UpdateBankDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateBankDetails';
    return this.http.post(this.url, data);
  }


  public UpdateVisaDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateVisaDetails';
    return this.http.post(this.url, data);
  }


  public UpdateID_Details(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateID_Details';
    return this.http.post(this.url, data);
  }


  public UpdateNomination(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateNomination';
    return this.http.post(this.url, data);
  }

  public UpdateDependentDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateDependentDetails';
    return this.http.post(this.url, data);
  }

  public UpdateMyAddressDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateMyAddressDetails';
    return this.http.post(this.url, data);
  }


  public DeleteCityType(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteCityType?ID=" + ID);
  }


  public DeleteCountryType(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteCountryType?ID=" + ID);
  }

  public DeleteGrivenceMaster(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteGrivenceMaster?ID=" + ID);
  }

  public DeleteStateType(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteStateType?ID=" + ID);
  }



  public DeleteWorkStationType_Master(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteWorkStationType_Master?ID=" + ID);
  }


  public DeleteTransportRequestType(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteTransportRequestType?ID=" + ID);
  }


  public DeleteExpencesMaster(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteExpencesMaster?ID=" + ID);
  }


  public DeleteHolidays(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteHolidays?ID=" + ID);
  }
  public DeletePolicies(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/DeletePolicies?ID=" + ID);
  }
  public DeleteBuildingStaff(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Building/DeleteBuildingStaff?ID=" + ID);
  }
  public DeleteAnnouncement(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/DeleteAnnouncement?ID=" + ID);
  }
  public sendemailattachements(data: any) {
    debugger
    this.url = this.host + '/Master/sendemailattachements';
    return this.http.post(this.url, data)

  }
  public sendemailattachementsforemail(data: any) {
    debugger
    this.url = this.host + '/Master/sendemailattachements';
    return this.http.post(this.url, data)

  }



  public DeleteLeaveTypeMaster(ID: any) {
    return this.http.get<any[]>(
      this.host + "/ProjectRequest/DeleteLeaveTypeMaster?ID=" + ID);
  }

  public InsertAttendanceWeb(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/InsertAttendanceWeb';
    return this.http.post(this.url, data);
  }

  public UpdateAttendanceWeb(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/UpdateAttendanceWeb';
    return this.http.post(this.url, data);
  }



  public GetAttendance() {
    return this.http.get<any[]>(
      this.host + "/MobileUser/GetAttendance?UserID=1&SDate=2022-10-01&EDate=2029-10-31"
    );
  }

  public GetAttendanceBydate(sdate: any, edate: any,) {
    return this.http.get<any[]>(
      this.host + "/MobileUser/GetAttendance?UserID=1&SDate=" + sdate + "&EDate=" + edate
    );
  }
  public GetEmployeeAttedanceReport(sdate: any, edate: any,) {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetEmployeeAttedanceReport?UserID=1&SDate=" + sdate + "&EDate=" + edate
    );
  }

  public GetAttendanceByEmployeeID(UserID: any, SDate: any, EDate: any) {
    return this.http.get<any[]>(
      this.host + "/MobileUser/GetAttendanceByEmployeeID?UserID=" + UserID + "&SDate=" + SDate + "&EDate=" + EDate
    );
  }
  public GetAttendanceByEmployeeIDforpunchin(UserID: any, SDate: any, EDate: any) {
    return this.http.get<any[]>(
      this.host + "/MobileUser/GetAttendanceByEmployeeIDforpunchin?UserID=" + UserID + "&SDate=" + SDate + "&EDate=" + EDate
    );
  }

  public GetTimeSheetDetailsforwebByEmployeeID(UserID: any, SDate: any, EDate: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetTimeSheetDetailsforwebByEmployeeID?UserID=" + UserID + "&SDate=" + SDate + "&EDate=" + EDate
    );
  }



  public GetHolidaybit(Date: any, StaffID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetHolidaybit?Date=" + Date + "&StaffID=" + StaffID
    );
  }



  public ApproveAttendanceRegularisation(data: any) {
    debugger;
    this.url = this.host + '/Master/ApproveAttendanceRegularisation';
    return this.http.post(this.url, data);
  }
  public ApproveStaffLeavesNew(data: any) {
    debugger;
    this.url = this.host + '/Building/ApproveStaffLeavesNew';
    return this.http.post(this.url, data);
  }

  public ApproveStaffLeavesNewForHR(data: any) {
    debugger;
    this.url = this.host + '/Building/ApproveStaffLeavesNewForHR';
    return this.http.post(this.url, data);
  }








  public ApproveTimeSheet(data: any) {
    debugger;
    this.url = this.host + '/Master/ApproveTimeSheet';
    return this.http.post(this.url, data);
  }

  public RejectAttedanceCoorection(data: any) {
    debugger;
    this.url = this.host + '/Master/RejectAttedanceCoorection';
    return this.http.post(this.url, data);
  }


  public UpdatePassword(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdatePassword';
    return this.http.post(this.url, data);
  }


  // public ApproveTravelRequest(data: any) {
  //   debugger;
  //   this.url = this.host + '/MobileUser/ApproveTravelRequest';
  //   return this.http.post(this.url, data);
  // }

  public ApproveTravelRequest(id: any) {
    return this.http.get<any[]>(
      this.host + "/MobileUser/ApproveTravelRequest?ID=" + id
    );
  }


  public RejectTravelRequest(id: any, Rejected: any) {
    return this.http.get<any[]>(
      this.host + "/MobileUser/RejectTravelRequest?ID=" + id + "&RejectReason=" + Rejected
    );
  }




  public ApproveWorkplaceRequest(id: any) {
    return this.http.get<any[]>(
      this.host + "/Building/ApproveWorkplaceRequest?ID=" + id
    );
  }

  public UpdateStaff(data: any) {
    debugger;
    this.url = this.host + '/Building/UpdateBuildingStaff';
    return this.http.post(this.url, data);
  }

  public UpdateRetirementConfiguration(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateRetirementConfiguration';
    return this.http.post(this.url, data);
  }




  public DeleteOTRates(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteOTRates?ID=" + ID);
  }
  public Delete_ProjectFolders(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/Delete_ProjectFolders?ID=" + ID);
  }

  public DeleteStaffShiftDetails(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteStaffShiftDetails?ID=" + ID);
  }



  public GetNotification(UserID: any) {
    return this.http.get<any[]>(
      this.host + "/User/GetNotification?UserID=" + UserID
    );
  }

  public ClearNotificationByID(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/ClearNotificationByID?ID=" + ID);
  }


  public UpdateShiftMaster(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateShiftMaster';
    return this.http.post(this.url, data);
  }

  public UpdateLocatorStatus(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/UpdateLocatorStatus';
    return this.http.post(this.url, data);
  }

  public CancelLeave(ID: any, NoOfDays: any, UserID: any, LeaveTypeID: any, Status: any) {
    debugger;
    return this.http.get<any[]>(
      this.host + "/MobileUser/CancelLeave?ID=" + ID + "&NoOfDays=" + NoOfDays + "&UserID=" + UserID + "&LeaveTypeID=" + LeaveTypeID + "&Status=" + Status
    );
  }

  public UpdateExpencesReject(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/UpdateExpencesReject';
    return this.http.post(this.url, data);
  }

  public CancelLocatorRequest(ID: any) {
    return this.http.get<any[]>(
      this.host + "/MobileUser/CancelLocatorRequest?ID=" + ID);
  }


  public CancelWorkplaceRequest(ID: any, WorkStationID: any) {
    return this.http.get<any[]>(
      this.host + "/MobileUser/CancelWorkplaceRequest?ID=" + ID + "&WorkStationID=" + WorkStationID);
  }



  public InsertStaffShiftDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertStaffShiftDetails';
    return this.http.post(this.url, data);
  }

  public UpdateStaffShiftDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateStaffShiftDetails';
    return this.http.post(this.url, data);
  }

  public UpdateStaffLeaves(data: any) {
    debugger;
    this.url = this.host + '/Building/UpdateStaffLeaves';
    return this.http.post(this.url, data);
  }



  public GetStaffShiftDetails() {
    return this.http.get<any[]>(
      this.host + "/Master/GetStaffShiftDetails"

    );
  }
  public GetStaffShiftDetailsByStaffID(StaffID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/GetStaffShiftDetailsByStaffID?StaffID=" + StaffID

    );
  }


  public InsertNotification(data: any) {
    debugger;
    this.url = this.host + '/User/InsertNotification';
    return this.http.post(this.url, data);
  }

  public pushnotification(data: any) {
    debugger;
    
    this.url = this.host + '/Master/pushnotification';
    return this.http.post(this.url, data);
  }
  public GetNotificationTokenByStaffID(StaffID: any) {
    return this.http.get<any[]>(
      'https://asticom.digiofficeapp.com/AsticomMainUATTestAll' + "/MobileUser/GetNotificationTokenByStaffID?StaffID=" + StaffID

    );
  }
  deviceid:any;
  public pushnotificationtomobile(StaffID:any, body:any,title:any) {
    debugger;
    this.GetNotificationTokenByStaffID(
      StaffID
    ).subscribe({
      next: (data) => {
        debugger;
        let temp: any = data;
        if(  temp.length!=0){
          this.deviceid=  temp[0]?.androidToken;
          var entity = {
            deviceId:this.deviceid,
            body: body,
            title: title,
          };
          this.pushnotification(entity).subscribe({
            next: (data) => {
              debugger;
              if (data != 0) {
                /*  Swal.fire("Saved Successfully"); */
              }
            },
          });
        }else{
          this.deviceid='na'
        }
     
      },
  
    });

  }



  public InsertGroupChatMaster(data: any) {
    debugger;
    this.url = this.host + "/Announcement/InsertChatWeb";
    return this.http.post(this.url, data);
  }
  public GetChatGroupMaster() {
    debugger;
    this.url = this.host + "/Announcement/GetChatGroupMaster";
    return this.http.get<any[]>(this.url);
  }

  public GetDepartmentMaster() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetDepartmentMaster"
    );
  }

  public DeleteDepartmentMaster(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/DeleteDepartmentMaster?ID=" + ID);
  }

  public InsertDepartmentMaster(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertDepartmentMaster';
    return this.http.post(this.url, data);
  }
  public UpdateDepartmentMaster(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateDepartmentMaster';
    return this.http.post(this.url, data);
  }


  public GetDe_minimis_Master() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetDe_minimis_Master"
    );
  }


  public GetStaffAllowanceDetailsByStaffID(staffID:any) {
    debugger
    return this.http.get<any[]>(
      this.host + "/Master/GetStaffAllowanceDetailsByStaffID?StaffID="+staffID);
  }
  public DeleteDe_minimis_Master(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/DeleteDe_minimis_Master?ID=" + ID);
  }

  public DeleteDeMinimisMapping(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/DeleteDeMinimisMapping?ID=" + ID);
  }


  public InsertDe_minimis_Master(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertDe_minimis_Master';
    return this.http.post(this.url, data);
  }
  public InsertDeMinimisMapping(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertDeMinimisMapping';
    return this.http.post(this.url, data);
  }
  public InsertBenefitsRoleMapping(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertBenefitsRoleMapping';
    return this.http.post(this.url, data);
  }

  public UpdateDe_minimis_Master(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateDe_minimis_Master';
    return this.http.post(this.url, data);
  }

  public UpdateDe_minimis_Detailsforstaff(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateDe_minimis_Detailsforstaff';
    return this.http.post(this.url, data);
  }
  public GetStaffLeavesForPayrollByDate(startdate: any, enddate: any, StaffID: any) {
    debugger
    return this.http.get<any[]>(this.host + "/Announcement/GetStaffLeavesForPayrollByDate?startdate=" + startdate + "&enddate=" + enddate + "&StaffID=" + StaffID);
  }
  public Get_Salary_Splits(EmployeeID: any, LopdaysCount: any, startdate: any, enddate: any) {
    debugger
    return this.http.get<any[]>(this.host + "/Announcement/Get_Salary_Splits?EmployeeID=" + EmployeeID + "&LopdaysCount=" + LopdaysCount + "&startdate=" + startdate + "&enddate=" + enddate);
  }
  public Get_Salary_Splitsfor15days(EmployeeID: any, startdate: any, enddate: any) {
    debugger
    return this.http.get<any[]>(this.host + "/Announcement/Get_Salary_Splitsfor15days?EmployeeID=" + EmployeeID + "&startdate=" + startdate + "&enddate=" + enddate);
  }


  public DeleteEmployeeSalary(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/DeleteEmployeeSalary?ID=" + ID);
  }

  public DeleteStaffExitFormality(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteStaffExitFormality?ID=" + ID);
  }




  public GetEmployeeSalary() {
    debugger
    return this.http.get<any[]>(
      this.host + "/Announcement/GetEmployeeSalary"
    );
  }

  public GetStaffOverTimeDetails() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetStaffOverTimeDetails"
    );
  }
  public GetStaffOverTimeDetailsByID(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetStaffOverTimeDetailsByID?ID=" + ID);
  }


  public DeleteStaffOverTimeDetails(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/DeleteStaffOverTimeDetails?ID=" + ID);
  }
  public CancelExpenseRequest(ID: any) {
    return this.http.get<any[]>(
      this.host + "/MobileUser/CancelExpenseRequest?ID=" + ID);
  }


  public InsertStaffOverTimeDetails(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertStaffOverTimeDetails';
    return this.http.post(this.url, data);
  }
  public UpdateStaffOverTimeDetails(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateStaffOverTimeDetails';
    return this.http.post(this.url, data);
  }



  public GetEmployeeTransition() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetEmployeeTransition"
    );
  }

  public DeleteEmployeeTransition(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/DeleteEmployeeTransition?ID=" + ID);
  }

  public InsertEmployeeTransition(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertEmployeeTransition';
    return this.http.post(this.url, data);
  }
  public UpdateEmployeeTransition(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateEmployeeTransition';
    return this.http.post(this.url, data);
  }

  public GetEmployeeBenfits() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetEmployeeBenfits"
    );
  }

  public DeleteEmployeeBenfits(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/DeleteEmployeeBenfits?ID=" + ID);
  }

  public InsertEmployeeBenfits(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertEmployeeBenfits';
    return this.http.post(this.url, data);
  }
  public UpdateEmployeeBenfits(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateEmployeeBenfits';
    return this.http.post(this.url, data);
  }





  public GetEmployeeBenfitsDetails() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetEmployeeBenfitsDetails"
    );
  }

  public DeleteEmployeeBenfitsDetails(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/DeleteEmployeeBenfitsDetails?ID=" + ID);
  }

  public DeleteLoginbasedModuleMaping(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/DeleteLoginbasedModuleMaping?ID=" + ID);
  }


  public InsertEmployeeBenfitsDetails(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertEmployeeBenfitsDetails';
    return this.http.post(this.url, data);
  }
  public UpdateEmployeeBenfitsDetails(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateEmployeeBenfitsDetails';
    return this.http.post(this.url, data);
  }


  public InsertEmployeeDocuments(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertEmployeeDocuments';
    return this.http.post(this.url, data);
  }
  public InsertLoginbasedModuleMaping(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertLoginbasedModuleMaping';
    return this.http.post(this.url, data);
  }
  public GetLoginbasedModuleMaping() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetLoginbasedModuleMaping"
    );
  }

  public ProjectAttachmentsbyuserid(files: any, empid: any) {
    debugger
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    this.url = this.host + '/Master/ProjectAttachmentsbyuserid?userid=' + empid;
    return this.http.post<any[]>(this.url, formdata);
  }

  
  public ProjectAttachmentsbyuseridforovertime(files: any, empid: any) {
    debugger
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }
    this.url = this.host + '/Master/ProjectAttachmentsbyuseridforovertime?empid=' + empid;
    return this.http.post<any[]>(this.url, formdata);
  }

  



  public GetEmployeeDocuments() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetEmployeeDocuments"
    );
  }
  public GetPayrollFilesDetails() {
    return this.http.get<any[]>(
      this.host + "/Master/GetPayrollFilesDetails"
    );
  }



  public GetUserroleType() {
    return this.http.get<any[]>(
      this.host + "/MasterDemo/GetUserroleType"
    );
  }



  public GetEmployeeLoans() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetEmployeeLoans"
    );
  }

  public DeleteEmployeeLoans(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/DeleteEmployeeLoans?ID=" + ID);
  }

  public InsertEmployeeLoans(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertEmployeeLoans';
    return this.http.post(this.url, data);
  }
  public UpdateEmployeeLoans(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateEmployeeLoans';
    return this.http.post(this.url, data);
  }

  public InsertProjectMaster(data: any) {
    debugger;
    this.url = this.host + '/ProjectRequest/InsertProjectMaster';
    return this.http.post(this.url, data);
  }

  public UpdateProjectMaster(data: any) {
    debugger;
    this.url = this.host + '/ProjectRequest/UpdateProjectMaster';
    return this.http.post(this.url, data);
  }



  public DeleteProjectMaster(ID: any) {
    return this.http.get<any[]>(
      this.host + "/ProjectRequest/DeleteProjectMaster?ID=" + ID);
  }

  public InsertBuilding(data: any) {
    debugger;
    this.url = this.host + '/Building/InsertBuilding';
    return this.http.post(this.url, data);
  }

  public UpdateBuilding(data: any) {
    debugger;
    this.url = this.host + '/Building/UpdateBuilding';
    return this.http.post(this.url, data);
  }

  public DeleteBuilding(ID: any) {
    debugger;
    return this.http.get<any[]>(
      this.host + "/Building/DeleteBuilding?ID=" + ID);

  }
  public DeleteFloorType(ID: any) {
    debugger;
    return this.http.get<any[]>(
      this.host + "/Building/deletefloor?ID=" + ID);

  }


  public UpdateEmployeeLoansByHR(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateEmployeeLoansByHR';
    return this.http.post(this.url, data);
  }

  public GetGrivenceRequests() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetGrivenceRequests"
    );
  }

  public DeleteGrivenceRequests(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/DeleteGrivenceRequests?ID=" + ID);
  }

  public InsertGrivenceRequests(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertGrivenceRequests';
    return this.http.post(this.url, data);
  }
  public UpdateGrivenceRequests(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateGrivenceRequests';
    return this.http.post(this.url, data);
  }

  public GetHelpdeskrequest() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetHelpdeskrequest"
    );
  }

  public DeleteHelpdeskrequest(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/DeleteHelpdeskrequest?ID=" + ID);
  }

  public InsertHelpdeskrequest(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertHelpdeskrequest';
    return this.http.post(this.url, data);
  }
  public UpdateHelpdeskrequest(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateHelpdeskrequest';
    return this.http.post(this.url, data);
  }
  public GrievanceReply(data: any) {
    debugger;
    this.url = this.host + '/Announcement/GrievanceReply';
    return this.http.post(this.url, data);
  }
  public HelpDeskReply(data: any) {
    debugger;
    this.url = this.host + '/Announcement/HelpDeskReply';
    return this.http.post(this.url, data);
  }

  public ClearStaffExitFormality(data: any) {
    debugger;
    this.url = this.host + '/Announcement/ClearStaffExitFormality';
    return this.http.post(this.url, data);
  }
  public RetainEmployeee(data: any) {
    debugger;
    this.url = this.host + '/Master/RetainEmployeee';
    return this.http.post(this.url, data);
  }


  public UpdateWorkingDay(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateWorkingDay';
    return this.http.post(this.url, data);
  }

  public ApproveOtRequest(data: any) {
    debugger;
    this.url = this.host + '/Master/ApproveOtRequest';
    return this.http.post(this.url, data);
  }


  public GetDepartment() {
    debugger
    let APIURL = this.host + "/Announcement/GetDepartmentMaster";
    return this.http.get<any[]>(APIURL);
  }

  public UpdateOtFromManager(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateOtFromManager';
    return this.http.post(this.url, data);
  }



  ///


  // public GetAttendanceConfiguration() {
  //   return this.http.get<any[]>(
  //     this.host + "/Master/GetAttendanceConfiguration"
  //   );
  // }

  public GetAttendanceConfiguration() {
    debugger
    let APIURL = this.host + "/Master/GetAttendanceConfiguration";
    return this.http.get<any[]>(APIURL);
  }

  public InsertAttendanceConfiguration(json: any) {
    debugger
    let APIURL = this.host + "/Master/InsertAttendanceConfiguration";
    return this.http.post<any[]>(APIURL, json);
  }


  // public InsertAttendanceConfiguration(data: any) {
  //   debugger;
  //   this.url = this.host + '/Master/InsertAttendanceConfiguration';
  //   return this.http.post(this.url, data);
  // }
  public UpdateAttendanceConfiguration(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateAttendanceConfiguration';
    return this.http.post(this.url, data);
  }



  public DeleteAttendanceConfiguration(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteAttendanceConfiguration?ID=" + ID);
  }


  public GetCompanyConfiguration() {
    return this.http.get<any[]>(
      this.host + "/Master/GetCompanyConfiguration"
    );
  }



  public DeleteCompanyConfiguration(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteCompanyConfiguration?ID=" + ID);
  }


  public InsertCompanyConfiguration(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertCompanyConfiguration';
    return this.http.post(this.url, data);
  }
  public UpdateCompanyConfiguration(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateCompanyConfiguration';
    return this.http.post(this.url, data);
  }


  public GetLeaveConfiguration() {
    return this.http.get<any[]>(
      this.host + "/Master/GetLeaveConfiguration"
    );
  }



  public DeleteLeaveConfiguration(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteLeaveConfiguration?ID=" + ID);
  }


  public InsertLeaveConfiguration(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertLeaveConfiguration';
    return this.http.post(this.url, data);
  }

  public UpdateLeaveConfiguration(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateLeaveConfiguration';
    return this.http.post(this.url, data);
  }

  public UploadbulkAttendanceWeb(data: any) {
    debugger;
    this.url = this.host + '/Master/UploadbulkAttendanceWeb';
    return this.http.post(this.url, data);
  }
  public DeleteBarangayMaster(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteBarangayMaster?ID=" + ID);
  }





  public InsertBarangayMaster(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertBarangayMaster';
    return this.http.post(this.url, data);
  }
  public UpdateBarangayMaster(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateBarangayMaster';
    return this.http.post(this.url, data);
  }
  public GetBarangayMaster() {
    return this.http.get<any[]>(
      this.host + "/Master/GetBarangayMaster"
    );
  }



  public GetLeaveTypeforconfig() {
    return this.http.get<any[]>(
      this.host + "/Master/GetLeaveTypeforconfig"

    );
  }


  public GetOtConfiguration() {
    return this.http.get<any[]>(
      this.host + "/Master/GetOtConfiguration"

    );
  }
  public UpdateOtConfiguration(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateOtConfiguration';
    return this.http.post(this.url, data);
  }
  public InsertLeaveBalanceDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertLeaveBalanceDetails';
    return this.http.post(this.url, data);
  }
  public GetLeaveBalanceDetails() {
    return this.http.get<any[]>(
      this.host + "/Master/GetLeaveBalanceDetails"
    );
  }

  public InsertEmployeeResignation(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertEmployeeResignation';
    return this.http.post(this.url, data);
  }


  public GetEmployeeResignation() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetEmployeeResignation"
    );
  }




  public InsertCompanyAssets(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertCompanyAssets';
    return this.http.post(this.url, data);
  }

  public GetCompanyAssets() {
    return this.http.get<any[]>(
      this.host + "/Master/GetCompanyAssets"
    );
  }


  public DeleteCompanyAssets(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteCompanyAssets?ID=" + ID);
  }

  public InsertOrientationPlanDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertOrientationPlanDetails';
    return this.http.post(this.url, data);
  }

  public UpdateOrientationPlanDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateOrientationPlanDetails';
    return this.http.post(this.url, data);
  }

  public UpdateEmployeeAssets(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateEmployeeAssets';
    return this.http.post(this.url, data);
  }




  public GetOrientationPlanDetails() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetOrientationPlanDetails"

    );
  }


  public DeleteOrientationPlanDetails(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteOrientationPlanDetails?ID=" + ID);
  }


  public DeleteOrientationSession(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteOrientationSession?ID=" + ID);
  }

  public DeleteOrientationPlanStaffDetails(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteOrientationStaffDetails?ID=" + ID);
  }


  public CompleteOrientationPlanDetails(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/CompleteOrientationPlanDetails?ID=" + ID);
  }




  public GetAllStaffCounts() {
    debugger
    return this.http.get<any[]>(
      this.host + "/Announcement/GetAllStaffCounts"
    );
  }



  public GetServiceAward() {
    debugger
    return this.http.get<any[]>(
      this.host + "/Announcement/GetServiceAward"
    );
  }
  public GetManpowerPlanningandBudgeting() {
    debugger
    return this.http.get<any[]>(
      this.host + "/Announcement/GetManpowerPlanningandBudgeting"
    );
  }

  public InsertServiceAward(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertServiceAward';
    return this.http.post(this.url, data);
  }
  public InsertManpowerPlanningandBudgeting(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertManpowerPlanningandBudgeting';
    return this.http.post(this.url, data);
  }


  public GetOnBoardingChecklist() {
    return this.http.get<any[]>(
      this.host + "/Master/GetOnBoardingChecklist"

    );
  }

  public InsertOnBoardingChecklist(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertOnBoardingChecklist';
    return this.http.post(this.url, data);
  }




  public DeleteOnBoardingChecklist(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteOnBoardingChecklist?ID=" + ID);
  }
  public InsertOrientationSession(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertOrientationSession';
    return this.http.post(this.url, data);
  }

  public GetOrientationSession() {
    debugger
    return this.http.get<any[]>(
      this.host + "/Announcement/GetOrientationSession"
    );
  }




  public AcceptEmployeeResignation(ID: any, TypeID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/AcceptEmployeeResignation?ID=" + ID + "&TypeID=" + TypeID);
  }




  public GetRetirementList() {
    debugger
    return this.http.get<any[]>(
      this.host + "/Announcement/GetRetirementList"
    );
  }

  public GetPromotionHistory() {
    debugger
    return this.http.get<any[]>(
      this.host + "/Announcement/GetPromotionHistory"
    );
  }

  public DeletePromotionHistory(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeletePromotionHistory?ID=" + ID);
  }



  public InsertPromotionHistory(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertPromotionHistory';
    return this.http.post(this.url, data);
  }


  public UpdatePromotionHistory(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdatePromotionHistory';
    return this.http.post(this.url, data);
  }


  public InsertAssignedAssets(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertAssignedAssets';
    return this.http.post(this.url, data);
  }

  public GetAssignedAssets() {
    debugger
    return this.http.get<any[]>(
      this.host + "/Announcement/GetAssignedAssets"
    );
  }


  public UpdateServiceAward(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateServiceAward';
    return this.http.post(this.url, data);
  }


  public DeleteServiceAward(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteServiceAward?ID=" + ID);
  }
  public DeleteManpowerPlanningandBudgeting(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteManpowerPlanningandBudgeting?ID=" + ID);
  }




  public UpdateCompanyAssets(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateCompanyAssets';
    return this.http.post(this.url, data);
  }

  public UpdateOrientationSession(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateOrientationSession';
    return this.http.post(this.url, data);
  }
  public UpdateEmployeeBenfitsApproval(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateEmployeeBenfitsApproval';
    return this.http.post(this.url, data);
  }


  public GetMyDetailsNotResignation() {
    debugger
    return this.http.get<any[]>(
      this.host + "/Announcement/GetMyDetailsNotResignation"
    );
  }



  public UploadAttachment(data: any) {
    debugger;
    this.url = this.host + '/Master/UploadAttachment';
    return this.http.post(this.url, data);
  }


  public InsertDe_minimis_Detailsforstaff(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertDe_minimis_Detailsforstaff';
    return this.http.post(this.url, data);
  }

  public InsertEmployeeTask(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertEmployeeTask';
    return this.http.post(this.url, data);
  }



  public UpdateEmployeeTask(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateEmployeeTask';
    return this.http.post(this.url, data);
  }


  public GetEmployeeTask() {
    debugger
    return this.http.get<any[]>(
      this.host + "/Announcement/GetEmployeeTask"
    );
  }


  public UpdateComments(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateComments';
    return this.http.post(this.url, data);
  }

  public InsertcostAllocation(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertcostAllocation';
    return this.http.post(this.url, data);
  }



  public UpdatecostAllocation(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdatecostAllocation';
    return this.http.post(this.url, data);
  }


  public GetcostAllocation() {
    debugger
    return this.http.get<any[]>(
      this.host + "/Announcement/GetcostAllocation"
    );
  }


  public UpdateBonusForStaff(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateBonusForStaff';
    return this.http.post(this.url, data);
  }


  public InsertSuccessionPlanning(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertSuccessionPlanning';
    return this.http.post(this.url, data);
  }


  public GetSuccessionPlanning() {
    debugger
    return this.http.get<any[]>(
      this.host + "/Master/GetSuccessionPlanning"
    );
  }

  public DeleteSuccessionPlanning(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteSuccessionPlanning?ID=" + ID);
  }




  public InsertAttachment(data: any) {
    debugger;
    this.url = this.host1 + '/Master/InsertAttachment';
    return this.http.post(this.url, data);
  }

  public InsertSupportTickets(data: any) {
    debugger;
    this.url = this.host1 + '/Master/InsertSupportTickets';
    return this.http.post(this.url, data);
  }
  public UpdateAttachment(data: any) {
    debugger;
    this.url = this.host1 + '/Master/UpdateAttachment';
    return this.http.post(this.url, data);
  }


  public AttachmentsUploadsss(files: any) {
    debugger
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }

    debugger
    let APIURL = this.host1 + "/Master/UploadImages/";
    return this.http.post(APIURL, formdata);
  }


  public MultipleAttachmentsUpload(files: any) {
    debugger
    let formdata: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formdata.append('file_upload', files[i], files[i].name);
    }

    debugger
    let APIURL = this.host + "/Master/UploadImages/";
    return this.http.post(APIURL, formdata);
  }



  public GetSupportTickets() {
    return this.http.get<any[]>(
      this.host1 + "/Master/GetSupportTickets"
    );
  }

  public GetSupportAttachment() {

    return this.http.get<any[]>(this.host1 + "/Master/GetSupportAttachment");
  }

  public DeleteSupportTickets(ID: any) {
    return this.http.get<any[]>(
      this.host1 + "/Master/DeleteSupportTickets?ID=" + ID);
  }


  public UpdateSupportTickets(data: any) {
    debugger;
    this.url = this.host1 + '/Master/UpdateSupportTickets';
    return this.http.post(this.url, data);
  }
  public Updatepassword(data: any) {
    debugger;
    this.url = this.host + "/Master/Updatepassword";
    return this.http.post(this.url, data);
  }
  public Updateotp(data: any) {
    debugger;
    this.url = this.host + "/Master/Updateotp";
    return this.http.post(this.url, data);
  }
  public Verifyotp(data: any) {
    debugger;
    this.url = this.host + "/Master/Verifyotp";
    return this.http.post(this.url, data);
  }

  public AuthenicatebyCompany(data: any, url: any) {
    debugger;
    // this.url = this.host + "/Master/Verifyotp";
    this.url = url + '/Announcement/Authenicate';
    return this.http.post(this.url, data);
  }



  public UpdateATDRequests(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateATDRequests';
    return this.http.post(this.url, data);
  }


  public InsertATDRequests(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertATDRequests';
    return this.http.post(this.url, data);
  }
  public InsertPayrollfiles(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertPayrollFilesDetails';
    return this.http.post(this.url, data);
  }
  public InsertPayrollfileswithoutdeatecheck(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertPayrollfileswithoutdeatecheck';
    return this.http.post(this.url, data);
  }

  public InsertPayrollfilesfinal(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertPayrollFilesDetailsfinal';
    return this.http.post(this.url, data);
  }
  public InsertPayrollfileswithoutdeatecheckfinal(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertPayrollfileswithoutdeatecheckfinal';
    return this.http.post(this.url, data);
  }


  public UpdatePayrollFilesDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdatePayrollFilesDetails';
    return this.http.post(this.url, data);
  }
  public UpdatePayrollFilesDetailsonetimeinput(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdatePayrollFilesDetailsonetimeinput';
    return this.http.post(this.url, data);
  }
  public UpdatePayrollFilesDetailpersonaldata(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdatePayrollFilesDetailpersonaldata';
    return this.http.post(this.url, data);
  }
  public UpdatePayrollFilesDetailjobdata(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdatePayrollFilesDetailjobdata';
    return this.http.post(this.url, data);
  }
  public UpdatePayrollFilesDetailRecurring_Input(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdatePayrollFilesDetailRecurring_Input';
    return this.http.post(this.url, data);
  }





  public GetATDRequests() {
    debugger
    return this.http.get<any[]>(
      this.host + "/Master/GetATDRequests"
    );
  }

  public DeleteATDRequests(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/DeleteATDRequests?ID=" + ID);
  }



  public GetContradictionforstaff() {

    return this.http.get<any[]>(this.host + "/Master/GetContradictionforstaff");
  }

  public DeleteContradictionforstaff(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteContradictionforstaff?ID=" + ID);
  }


  public InsertContradictionforstaff(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertContradictionforstaff';
    return this.http.post(this.url, data);
  }


  public GetSubsidaryMaster() {

    return this.http.get<any[]>(this.host + "/Announcement/GetSubsidaryMaster");
  }

  public InsertSubsidaryMaster(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertSubsidaryMaster';
    return this.http.post(this.url, data);
  }
  public UpdateSubsidaryMaster(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateSubsidaryMaster';
    return this.http.post(this.url, data);
  }

  public GetBanks() {

    return this.http.get<any[]>(this.host + "/Master/GetBanks");
  }

  public DeleteSubsidaryMaster(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/DeleteSubsidaryMaster?ID=" + ID);
  }
  public GetCompanyID(CompanyID: any) {
    debugger

    let APIURL = this.basehost + environment.apiurl + CompanyID;
    // let APIURL = this.basehost + "/MobileUser/GetCompanyIDfortest?CompanyID=" + CompanyID;
    return this.http.get<any[]>(APIURL);
  }
  public GetCompanyIDForSuperAdmin(CompanyID: any, url: any) {
    debugger

    let APIURL = url + "/MobileUser/GetCompanyIDForSuperAdmin?CompanyID=" + CompanyID;
    //let APIURL = this.basehost + "/MobileUser/GetCompanyIDfortest?CompanyID=" + CompanyID;
    return this.http.get<any[]>(APIURL);
  }
  public GetAllStaffNewforsearch(Name: any) {
    debugger

    let APIURL = this.host + "/MobileUser/GetAllStaffNewforsearch?Name=" + Name;
    //let APIURL = this.basehost + "/MobileUser/GetCompanyIDfortest?CompanyID=" + CompanyID;
    return this.http.get<any[]>(APIURL);
  }





  public UpdateEmployeeLoansByManager(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateEmployeeLoansByManager';
    return this.http.post(this.url, data);
  }


  public UpdateProcessedOvertime(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateProcessedOvertime';
    return this.http.post(this.url, data);
  }




  public DeleteRoleType(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteRoleType?ID=" + ID);
  }

  public InsertRoleType(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertRoleType';
    return this.http.post(this.url, data);
  }

  public UpdateRoleType(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateRoleType';
    return this.http.post(this.url, data);
  }

  public GetLevelType() {
    return this.http.get<any[]>(
      this.host + "/Master/GetLevelType"
    );
  }

  public DeleteLevelType(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteLevelType?ID=" + ID);
  }

  public InsertLevelType(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertLevelType';
    return this.http.post(this.url, data);
  }

  public UpdateLevelType(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateLevelType';
    return this.http.post(this.url, data);
  }

  public DeleteShiftMaster(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteShiftMaster?ID=" + ID);
  }






  public UpdateNotificationSeen(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateNotificationSeen';
    return this.http.post(this.url, data);
  }

  // public GetExcel1(files: any) {
  //   debugger
  //   let formdata: FormData = new FormData();
  //   for (let i = 0; i < files.length; i++) {
  //     formdata.append('file_upload', files[i], files[i].name);
  //   }
  //   this.url = 'http://192.168.1.200/AsticomAPI' + '/Master/GetExcel1';
  //   return this.http.post<any[]>(this.url, formdata);

  // }

  public InsertExceptionLogs(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertExceptionLogs';
    return this.http.post(this.url, data);
  }
  public InsertEmployeeAttendance_Leavedays(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertEmployeeAttendance_Leavedays';
    return this.http.post(this.url, data);
  }
  public InsertEmployeeAttendance_Holidays(data: any) {
    this.url = this.host + '/Master/InsertEmployeeAttendance_Holidays';
    return this.http.post(this.url, data);
  }

  public InsertEmployeeAttendance_Restdays(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertEmployeeAttendance_Restdays';
    return this.http.post(this.url, data);
  }


  public GetExceptionLogs() {
    return this.http.get<any[]>(
      this.host + "/Master/GetExceptionLogs"

    );
  }


  public GetAttendanceCorrection(UserID: any, SDate: any, EDate: any) {
    return this.http.get<any[]>(
      this.host + "/Master/GetAttendanceCorrection?UserID=" + UserID + "&SDate=" + SDate + "&EDate=" + EDate
    );
  }

  public GetAttendanceCorrection1() {
    return this.http.get<any[]>(
      this.host + "/Master/GetAttendanceCorrection"
    );
  }


  public GetStaffOverTimeDetailsAdjustments(StaffID: any, startdate: any, enddate: any) {
    return this.http.get<any[]>(
      this.host + "/Master/GetStaffOverTimeDetailsAdjustments?staffid=" + StaffID + "&startdate=" + startdate + "&enddate=" + enddate
    );
  }

  public InsertAttendanceCorrection(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertAttendanceCorrection';
    return this.http.post(this.url, data);
  }

  public GetApprovedStaffLeavesByStaffID(ID: any, TypeID: any, Sdate: any, Edate: any) {
    return this.http.get<any[]>(
      this.host + "/Building/GetApprovedStaffLeavesByStaffID?ID=" + ID + "&TypeID=" + TypeID + "&Sdate=" + Sdate + "&Edate=" + Edate
    );
  }

  public GetApprovedAttendanceCorrectionByStaffID(UserID: any, Sdate: any, Edate: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetApprovedAttendanceCorrectionByStaffID?ID=" + "&UserID=" + UserID + "&Sdate=" + Sdate + "&Edate=" + Edate
    );
  }

  public GetPendingStaffLeavesByStaffID(ID: any, TypeID: any, Sdate: any, Edate: any) {
    return this.http.get<any[]>(
      this.host + "/Building/GetPendingStaffLeavesByStaffID?ID=" + ID + "&TypeID=" + TypeID + "&Sdate=" + Sdate + "&Edate=" + Edate
    );
  }

  public GetPendingAttendanceCorrectionByStaffID(UserID: any, Sdate: any, Edate: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetPendingAttendanceCorrectionByStaffID?ID=" + "&UserID=" + UserID + "&Sdate=" + Sdate + "&Edate=" + Edate
    );
  }

  public GetRejectedStaffLeavesByStaffID(ID: any, TypeID: any, Sdate: any, Edate: any) {
    return this.http.get<any[]>(
      this.host + "/Building/GetRejectedStaffLeavesByStaffID?ID=" + ID + "&TypeID=" + TypeID + "&Sdate=" + Sdate + "&Edate=" + Edate
    );
  }

  public GetRejectedAttendanceCorrectionByStaffID(UserID: any, Sdate: any, Edate: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetRejectedAttendanceCorrectionByStaffID?ID=" + "&UserID=" + UserID + "&Sdate=" + Sdate + "&Edate=" + Edate
    );
  }


  public GetApprovedStaffLeavesBySupervisor(ID: any, TypeID: any, Sdate: any, Edate: any) {
    return this.http.get<any[]>(
      this.host + "/Building/GetApprovedStaffLeavesBySupervisor?ID=" + ID + "&TypeID=" + TypeID + "&Sdate=" + Sdate + "&Edate=" + Edate
    );
  }

  public GetApprovedAttendanceCorrectionBySupervisor(UserID: any, Sdate: any, Edate: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetApprovedAttendanceCorrectionBySupervisor?ID=" + "&UserID=" + UserID + "&Sdate=" + Sdate + "&Edate=" + Edate
    );
  }

  public GetPendingStaffLeavesBySupervisor(ID: any, TypeID: any, Sdate: any, Edate: any) {
    return this.http.get<any[]>(
      this.host + "/Building/GetPendingStaffLeavesBySupervisor?ID=" + ID + "&TypeID=" + TypeID + "&Sdate=" + Sdate + "&Edate=" + Edate
    );
  }

  public GetPendingAttendanceCorrectionBySupervisor(UserID: any, Sdate: any, Edate: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetPendingAttendanceCorrectionBySupervisor?ID=" + "&UserID=" + UserID + "&Sdate=" + Sdate + "&Edate=" + Edate
    );
  }

  public GetRejectedStaffLeavesBySupervisor(ID: any, TypeID: any, Sdate: any, Edate: any) {
    return this.http.get<any[]>(
      this.host + "/Building/GetRejectedStaffLeavesBySupervisor?ID=" + ID + "&TypeID=" + TypeID + "&Sdate=" + Sdate + "&Edate=" + Edate
    );
  }

  public GetRejectedAttendanceCorrectionBySupervisor(UserID: any, Sdate: any, Edate: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetRejectedAttendanceCorrectionBySupervisor?ID=" + "&UserID=" + UserID + "&Sdate=" + Sdate + "&Edate=" + Edate
    );
  }


  public GetEmployeeLoansforpayroll() {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetEmployeeLoansforpayroll"
    );
  }

  public DeleteTimesheet() {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteTimesheet?ID=");
  }

  public UpdateDefaultPassword(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateDefaultPassword';
    return this.http.post(this.url, data);
  }
  public GetStaffDetailsByEmpIDandSSS(EmpID: any, SssNO: any) {
    debugger
    return this.http.get<any[]>(
      this.host + "/Announcement/GetStaffDetailsByEmpIDandSSS?EmpID=" + EmpID + "&SssNO=" + SssNO);
  }
  public GetAllStafffordefaultcheck(EmailID: any) {
    debugger
    return this.http.get<any[]>(
      this.host + "/Announcement/GetAllStafffordefaultcheck?EmailID=" + EmailID);
  }

  public InsertLogActivity(data: any) {
    debugger;
    this.url = this.host + '/Announcement/InsertLogActivity';
    return this.http.post<any>(this.url, data);
  }
  public UpdateLogActivity(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateLogActivity';
    return this.http.post(this.url, data);
  }

  public DeleteAttendanceCorrection(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteAttendanceCorrection?ID=" + ID);
  }

  public UpdateAttendanceCorrection(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateAttendanceCorrection';
    return this.http.post(this.url, data);
  }


  public GetLogActivityByDate(StaffID: any, startdate: any, enddate: any) {
    return this.http.get<any[]>(
      this.host + "/Master/GetLogActivityByDate?ID=" + StaffID + "&startdate=" + startdate + "&enddate=" + enddate
    );
  }

  public UpdateLeaveDetails(data: any) {
    debugger;
    this.url = this.host + '/Announcement/UpdateLeaveDetails';
    return this.http.post(this.url, data);
  }

  public StaffShiftDetailsApproveByManager(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/StaffShiftDetailsApproveByManager';
    return this.http.post(this.url, data);
  }

  public StaffShiftDetailsRejectByManager(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/StaffShiftDetailsRejectByManager';
    return this.http.post(this.url, data);
  }

  public Enable_Disable_PayrollBit(data: any) {
    debugger;
    this.url = this.host + '/Announcement/Enable_Disable_PayrollBit';
    return this.http.post(this.url, data);
  }



  public InsertStaffLeavesAttachment(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertStaffLeavesAttachment';
    return this.http.post(this.url, data);
  }

  public InsertEmployeeLoansAttachment(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertEmployeeLoansAttachment';
    return this.http.post(this.url, data);
  }
  public InsertStaffOverTimeDetailsAttachment(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertStaffOverTimeDetailsAttachment';
    return this.http.post(this.url, data);
  }


  public InsertTimeSheetTableAttachment(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertTimeSheetTableAttachment';
    return this.http.post(this.url, data);
  }

  public InsertLocatorTableAttachment(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertLocatorTableAttachment';
    return this.http.post(this.url, data);
  }

  public InsertGrivenceRequestsAttachment(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertGrivenceRequestsAttachment';
    return this.http.post(this.url, data);
  }

  public InsertStaffResignationAttachment(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertStaffResignationAttachment';
    return this.http.post(this.url, data);
  }


  public GetStaffLeavesAttachment() {

    return this.http.get<any[]>(this.host + "/Master/GetStaffLeavesAttachment");
  }

  public GetTimeSheetTableAttachment() {

    return this.http.get<any[]>(this.host + "/Master/GetTimeSheetTableAttachment");
  }

  public GetLocatorTableAttachment() {

    return this.http.get<any[]>(this.host + "/Master/GetLocatorTableAttachment");
  }

  public GetEmployeeLoansAttachment() {

    return this.http.get<any[]>(this.host + "/Master/GetEmployeeLoansAttachment");
  }

  public GetGrivenceRequestsAttachment() {

    return this.http.get<any[]>(this.host + "/Master/GetGrivenceRequestsAttachment");
  }

  public GetStaffResignationAttachment() {

    return this.http.get<any[]>(this.host + "/Master/GetStaffResignationAttachment");
  }

  public GetStaffOverTimeDetailsAttachment() {

    return this.http.get<any[]>(this.host + "/Master/GetStaffOverTimeDetailsAttachment");
  }

  public DeleteRegionType(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Doctor/DeleteRegionType?ID=" + ID);
  }

  public GetRegionMaster() {
    return this.http.get<any[]>(
      this.host + "/Doctor/GetRegionMaster?CountryID=" + 1
    );
  }

  public InsertRegionMaster(data: any) {
    debugger;
    this.url = this.host + '/Doctor/InsertRegionMaster';
    return this.http.post(this.url, data);
  }

  public UpdateRegionType(data: any) {
    debugger;
    this.url = this.host + '/Doctor/UpdateRegionType';
    return this.http.post(this.url, data);
  }

  public Authenicate(data: any) {
    debugger;
    // this.url = this.host + "/Master/Verifyotp";
    this.url = this.host + '/Announcement/Authenicate';
    return this.http.post(this.url, data);
  }

  public GetAllStaffNew() {
    debugger;
    // this.url = this.host + "/Master/Verifyotp";
    let entity: any = {
      'oGnvMaCNw7kaTMOJ': 'KE6RWrKkymIzZhtH',
      'kY08RdKZwGdRMPuy': 'fchrMte83z0TLo7X',
    }
    this.url = this.host + '/Master/GetAllStaffNew';
    return this.http.post<any[]>(this.url, entity);
  }
  public GetAllStaffNewByEmployeID(EmployeID:any) {
    debugger; 
    // this.url = this.host + "/Master/Verifyotp";
    let entity: any = {
      'oGnvMaCNw7kaTMOJ': 'KE6RWrKkymIzZhtH',
      'kY08RdKZwGdRMPuy': EmployeID,
    }
    this.url = this.host + '/Master/GetAllStaffNewByEmployeID';
    return this.http.post<any[]>(this.url, entity);
  }

  

  // public GetAllStaffNew() {
  //   return this.http.get<any[]>(
  //     this.host + "/Master/GetAllStaffNew"

  //   );
  // }

  public Getantiforgerytoken(data: any) {
    debugger;
    // this.url = this.host + "/Master/Verifyotp";
    this.url = this.host + '/Announcement/Getantiforgerytoken';
    return this.http.post(this.url, data);
  }
  public Getantiforgerytokenforsuperadmin(data: any, url: any) {
    debugger;
    // this.url = this.host + "/Master/Verifyotp";
    this.url = url + '/Announcement/Getantiforgerytoken';
    return this.http.post(this.url, data);
  }

  public UpdateVaccinationDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateVaccinationDetails';
    return this.http.post(this.url, data);
  }
  public InsertStaffBulkUploadExceptions(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertStaffBulkUploadExceptions';
    return this.http.post(this.url, data);
  }


  public ApproveAttedanceCoorection(data: any) {
    debugger;
    this.url = this.host + '/MobileUser/ApproveAttedanceCoorection';
    return this.http.post(this.url, data);
  }

  public GetAllStaffNewforpersonaldata(ID: any, StartDate: any, EndDate: any) {
    return this.http.get<any[]>(
      this.host + "/Master/GetAllStaffNewforpersonaldata?ID=" + ID + '&StartDate=' + StartDate + '&EndDate=' + EndDate
    );
  }

  public GetStaffOverTimeDetailsForPayroll(StaffID: any, StartDate: any, EndDate: any) {
    return this.http.get<any[]>(
      this.host + "/Master/GetStaffOverTimeDetailsForPayroll?StaffID=" + StaffID + '&StartDate=' + StartDate + '&EndDate=' + EndDate
    );
  }


  public CreateExcelFiles(data: any) {
    this.url = this.host + "/Master/CreateExcelFiles";
    return this.http.post(this.url, data)
  }
  public CreateExcelFilesForPreliminary(data: any) {
    this.url = this.host + "/Master/CreateExcelFilesForPreliminary";
    return this.http.post(this.url, data)
  }
  public GetPayslipByMonthandStaffID(Year: any, Month: any, Payperiod: any, filename: any) {
    return this.http.get<any>(
      this.host + "/Master/GetPayslipByMonthandStaffID?Year=" + Year + '&Month=' + Month + '&Payperiod=' + Payperiod + '&filename=' + filename
    );
  }
  public GetStaffLicenseDetailsbycompany(companyid: any) {
    return this.http.get<any[]>(
      this.host + "/Master/GetStaffLicenseDetailsbycompany?companyid=" + companyid
    );
  }
  public GetAllStaffNewforinactivestaff(month: any) {
    return this.http.get<any[]>(
      this.host + "/Master/GetAllStaffNewforinactivestaff?month=" + month
    );
  }


  public CheckFileUrl(url: any) {
    debugger
    return this.http.get<any[]>(
      this.host + "/Announcement/CheckFileUrl?url=" + url
    );
  }



  public GetStaffBulkUploadExceptions() {
    return this.http.get<any[]>(
      this.host + "/Master/GetStaffBulkUploadExceptions"
    );
  }

  public DeleteStaffBulkUploadExceptions(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteStaffBulkUploadExceptions?ID=" + ID);
  }

  getMessages() {
    debugger
    return this.http.get<any[]>("../../../../assets/Messages.json")
  }

  public GetStaffOverTimeDetailsByEmployeID(StaffID: any, SDate: any, EDate: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetStaffOverTimeDetailsByEmployeID?StaffID=" + StaffID + "&SDate=" + SDate + "&EDate=" + EDate
    );
  }
  public GetStaffOverTimeDetailsByManagerID(StaffID: any, SDate: any, EDate: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetStaffOverTimeDetailsByManagerID?StaffID=" + StaffID + "&SDate=" + SDate + "&EDate=" + EDate
    );
  }
  public GetStaffOverTimeDetailsByDate(SDate: any, EDate: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetStaffOverTimeDetailsByDate?SDate=" + SDate + "&EDate=" + EDate
    );
  }
  public GetStaffOverTimeDetailsByDateforreport(SDate: any, EDate: any) {
    return this.http.get<any[]>(
      this.host + "/Announcement/GetStaffOverTimeDetailsByDateforreport?SDate=" + SDate + "&EDate=" + EDate
    );
  }



  public InsertStaffExitFormalityAttachment(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertStaffExitFormalityAttachment';
    return this.http.post(this.url, data);
  }


  public GetStaffExitFormalityAttachment() {

    return this.http.get<any[]>(this.host + "/Master/GetStaffExitFormalityAttachment");
  }

  public GetAttendanceByEmployeeIDforpunchin1daybefore(UserID: any, SDate: any, EDate: any) {
    return this.http.get<any[]>(
      this.host + "/MobileUser/GetAttendanceByEmployeeIDforpunchin1daybefore?UserID=" + UserID + "&SDate=" + SDate + "&EDate=" + EDate
    );
  }
  public GetCurrentPhTime(UserID: any, SDate: any, EDate: any) {
    return this.http.get<any[]>(
      this.host + "/MobileUser/GetCurrentPhTime?UserID=" + UserID + "&SDate=" + SDate + "&EDate=" + EDate
    );
  }

  public DeleteStaffAllowanceDetails(ID: any) {
    return this.http.get<any[]>(
      this.host + "/Master/DeleteStaffAllowanceDetails?ID=" + ID);
  }

  public UpdateStaffAllowanceDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/UpdateStaffAllowanceDetails';
    return this.http.post(this.url, data);
  }
  public InsertGeneratedCoeDetails(data: any) {
    debugger;
    this.url = this.host + '/Master/InsertGeneratedCoeDetails';
    return this.http.post(this.url, data);
  }
  
  public GetGeneratedCoeDetailsByDate(SDate: any, EDate: any) {
    return this.http.get<any[]>(
      this.host + "/Master/GetGeneratedCoeDetailsByDate?StartDate=" + SDate + "&EndDate=" + EDate
    );
  }
  public UpdateAcceptStatusSupportTickets(data: any) {
    debugger;
    this.url = 'https://asticom.digiofficeapp.com/SupportAPI' + '/Master/UpdateAcceptStatusSupportTickets';
    return this.http.post(this.url, data);
  }
  public UpdateCloseStatusSupportTickets(data: any) {
    debugger;
    this.url = 'https://asticom.digiofficeapp.com/SupportAPI' + '/Master/UpdateCloseStatusSupportTickets';
    return this.http.post(this.url, data);
  }

  public GetHRDashboard_HeadCountByGenderByEmployee(EmployeeID: any) {
    return this.http.get<any[]>(
      this.host + "/HR/GetHRDashboard_HeadCountByGenderByEmployee?EmployeeID=" + EmployeeID);
  }

  public GetHRDashboard_HeadCountByGenderByEmployeeByMonth(EmployeeID: any, Month: any) {
    return this.http.get<any[]>(
      this.host + "/HR/GetHRDashboard_HeadCountByGenderByEmployeeByMonth?EmployeeID=" + EmployeeID + "&Month=" + Month);
  }

  public GetHRDashboard_HeadCountByGenderByManager(ManagerID: any) {
    return this.http.get<any[]>(
      this.host + "/HR/GetHRDashboard_HeadCountByGenderByManager?ManagerID=" + ManagerID);
  }

  public GetHRDashboard_HeadCountByGenderByManagerByMonth(ManagerID: any, Month: any) {
    return this.http.get<any[]>(
      this.host + "/HR/GetHRDashboard_HeadCountByGenderByManagerByMonth?ManagerID=" + ManagerID + "&Month=" + Month);
  }
  
  public GetOnBoardingInitiation() {
    return this.http.get<any[]>(
      this.host + "/Master/GetOnBoardingInitiation"
    );
  }

  public GetHRDashboard_HeadCountByGender(Gender: any) {
    return this.http.get<any[]>(
      this.host + "/HR/GetHRDashboard_HeadCountByGender?Gender=" + Gender);
  }
  public GetHRDashboard_HeadCount() {
    return this.http.get<any[]>(
      this.host + "/HR/GetHRDashboard_HeadCount");
  }
  public GetHRDashboard_HeadCountByGenderByMonth(Gender: any, Month: any) {
    return this.http.get<any[]>(
      this.host + "/HR/GetHRDashboard_HeadCountByGenderByMonth?Gender=" + Gender + '&Month=' + Month);
  }

}
