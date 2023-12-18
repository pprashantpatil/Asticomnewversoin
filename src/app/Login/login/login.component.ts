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

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.showpassword = 0;
    this.sssvalid = false;
    this.sssvalid = false;
    this.getipaddress();
    if (sessionStorage.getItem('temp') == '1') {
      localStorage.clear();
      location.reload();

    }
  }

  public checkpassword(event: any) {
    debugger
    this.showPopup = 0;
    this.confirmpassword = event.target.value;
    if (this.confirmpassword.includes('#') == true || this.confirmpassword.includes('&') == true || this.confirmpassword.includes('+') == true || this.confirmpassword.includes('*') == true || this.confirmpassword.includes('%') == true) {
      /*   Swal.fire("Special Character  not allowed in Passowrd"); */

      this.passvaild = false;
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 39
    } else {
      if (this.newpassword === this.confirmpassword) {
        this.passvaild = true;
      } else {
        this.passvaild = false;
      }
    }
  }
  sssvalid: any;
  public checksssandtin(event: any) {
    debugger
    var entity = {
      'm0ucEgBZCmnxjEpj': 'XOxKhzxPTuKbEeYS',
      'jPsUmyVPIbCpPuf3': 'P@sn3JrYm5OyfhiDUxksw0rd',
    }

    // this.DigiofficeService.Authenicate(entity).subscribe((data: any) => {
    //   debugger
    //   if (data['requestMessage'] != undefined || null) {
    //     localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);



    //   }
    // })

  }
  public checksssandtinforforgot(event: any) {
    debugger
    var entity = {
      'm0ucEgBZCmnxjEpj': 'XOxKhzxPTuKbEeYS',
      'jPsUmyVPIbCpPuf3': 'P@sn3JrYm5OyfhiDUxksw0rd',
    }


    // this.DigiofficeService.Authenicate(entity).subscribe((data: any) => {
    //   debugger
    //   if (data['requestMessage'] != undefined || null) {





    //     // this.DigiofficeService.Getantiforgerytoken().subscribe((data: any) => {
    //     //   debugger
    //     //   localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);

    //     //   localStorage.setItem('antiforgerytoken', data.antiForgeryToken);

    //     // })
    //   }
    // })

  }


  id: any;
  public ChangePassword() {
    debugger
    this.showPopup = 0;
    if (this.newpassword == undefined || this.newpassword == null || this.newpassword == '' || this.confirmpassword == undefined || this.confirmpassword == null || this.confirmpassword == '') {
      /*  Swal.fire("Please fill Mandatory Fields"); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 7
    } else {
      var entity = {
        ID: this.id,
        Password: btoa(this.confirmpassword),
        'jS1vSGsaIRdhVtOp': 'sIAnElKvYV6XUm6V',
      }
  
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
    if (this.companyid == undefined || this.companyid == null) {
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 1;
    }
    else if (this.roledid == undefined || this.roledid == null) {
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 2;
    }
    else {
      this.loader = true;
      var entity = {
        'username': 'Amaze',
        'Password': 'P@ssw0rd',
        'RoleID': 1

      }









    }
  }



  public InsertLogActivity() {

    var options = { hour12: false };
    var date = new Date();
    var entity = {
      StaffID: localStorage.getItem('staffid'),
      EmployeeID: localStorage.getItem('staffid'),
      SigninDate: date.toLocaleString('en-US', options),
      SignoutDate: date.toLocaleString('en-US', options),
      punchinip: this.ipaddress == undefined ? '101.120.111.222' : this.ipaddress,
      punchoutip: this.ipaddress == undefined ? '101.120.111.222' : this.ipaddress,
      LoginType: localStorage.getItem('roledid'),
    }


  }

  public SendOTP() {
    debugger;
    this.showPopup = 0

  }

  public VerifyOTP() {
    debugger
    this.showPopup = 0;
    var entity2 = {
      'EmailID': this.email,
      'OTP': this.Otp
    }

  }

  getpassword() {
    debugger
    this.showPopup = 0
    this.loader = true;

    var entity = {
      'm0ucEgBZCmnxjEpj': 'XOxKhzxPTuKbEeYS',
      'jPsUmyVPIbCpPuf3': 'P@sn3JrYm5OyfhiDUxksw0rd',
    }



  }

  public Save() {
    var entity = {
      'username': 'Amaze',
      'Password': 'P@ssw0rd',
      'RoleID': 1
    }
    this.getpassword();
    // this.DigiofficeService.Authenicate(entity).subscribe((data: any) => {
    //   debugger
    //   if (data['requestMessage'] != undefined || null) {
    //     localStorage.setItem('token', data['requestMessage'].headers[0].value[0]);




    //   }
    // })


  }
  pp: any;
  public checkStrength(password: any) {
    var strength = 0;


    //If password contains both lower and uppercase characters, increase strength value.
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      strength += 1;


    }

    //If it has numbers and characters, increase strength value.
    if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) {
      strength += 1;

    }

    //If it has one special character, increase strength value.
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      strength += 1;


    }
    if (password.length > 7) {
      strength += 1;
    }

    if (strength >= 4) {
      this.pp = 2;
    } else {
      this.pp = 1;
    }
    // Swal.fire('c' + strength);



    // If value is less than 2

    // if (strength < 2) {

    // } else if (strength == 2) {

    //   return 'Week'
    // } else if (strength == 4) {


    //   return 'Strong'
    // }

  }

  public getipaddress() {
    debugger

  }
}