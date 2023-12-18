import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( public router: Router) { }
  accessToken: string | undefined;
  companycode: any;
  username: any;
  roledid: any;
  password: any;
  showpassword: any;
  showotp: any;
  Otp: any;
  newpassword: any;
  confirmpassword: any;
  email: any
  currentUrl: any
  companyid: any;
  loader: any
  otp: any;
  password1: any;
  api: any;
  passvaild: any;
  ipAddress: any;
  ipaddress: any;
  public Attactments = [];
  showPopup: number = 0;
  messageId: number = 0;
  id: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.showpassword = 0;
    if (sessionStorage.getItem('temp') == '1') {
      localStorage.clear();
      location.reload();

    }
  }





  public getroleid(event: any) {
    this.roledid = event.target.value;
  }

  Showhidepassword() {
    debugger
    if (this.showpassword == 0) {
      this.showpassword = 1;
    }
    else {
      this.showpassword = 0;
    }
  }
  Empid: any;
  sssno: any;
  public getCompanyDetails(event: any) {
    debugger
    this.showPopup = 0;
    this.companyid = event.target.value;

  }

  public Adminhelp() {
    localStorage.setItem('clickname', 'PROFILE')
    this.router.navigate(['/Help']);


    // location.href='https://digipayrolllite.amazeone.co/DigiPayrollliteapi/Images/ProjectAttachments/USER MANUAL-digiPayroll-Lite-Admin_V1.0_200322.docx'
  }


  public login() {
    this.showPopup = 0;
    debugger
    this.loader = true;
    this.router.navigate(['/Employee/EmployeeDash']).then(() => {
      this.loader = false;
      location.reload();
    });
  }
}