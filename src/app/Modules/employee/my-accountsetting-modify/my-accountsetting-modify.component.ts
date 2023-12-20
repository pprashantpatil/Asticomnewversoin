import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';

@Component({
  selector: 'app-my-accountsetting-modify',
  templateUrl: './my-accountsetting-modify.component.html',
  styleUrls: ['./my-accountsetting-modify.component.css']
})
export class MyAccountsettingModifyComponent implements OnInit {

  constructor(public DigiofficeService: DigiofficecorehrService, public router: Router) { }
  confirmpassword: any;
  newpassword: any;
  Currentpassword: any;
  loader: any;
  passvaild: any;
  showpassword: any;
  showPopup: number = 0;
  messageId: number = 0;
  ngOnInit(): void {
    this.passvaild = true;
    this.showpassword = 0;
    this.loader = true;
    this.GetMyDetailsByStaffID();
  }

  public GetMyDetailsByStaffID() {
    this.DigiofficeService.GetAllStaffNewByEmployeID(localStorage.getItem('EmployeeID')).subscribe(data => {
      debugger
      let temp: any = data;
      this.Currentpassword = temp[0]?.password;
      this.loader = false;
    });
  }

  public checkpassword(event: any) {
    debugger;
    this.showPopup = 0;
    this.confirmpassword = event.target.value;
    if (this.confirmpassword.includes('#') == true || this.confirmpassword.includes('&') == true || this.confirmpassword.includes('+') == true || this.confirmpassword.includes('*') == true || this.confirmpassword.includes('%') == true) {
      /* Swal.fire("Special Character  not allowed in Passowrd"); */
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

  public Updatepassword() {
    debugger;
    this.showPopup = 0;
    if (this.newpassword == undefined || this.newpassword == null || this.newpassword == '' || this.confirmpassword == undefined || this.confirmpassword == null || this.confirmpassword == '') {
      /*   Swal.fire("Please fill Mandatory Fields"); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 7;
    } else {
      var entity = {
        ID: localStorage.getItem('staffid'),
        Password: btoa(this.confirmpassword),
        'jS1vSGsaIRdhVtOp': 'sIAnElKvYV6XUm6V',
      }
      this.DigiofficeService.UpdateDefaultPassword(entity).subscribe(data => {
        /* Swal.fire("Updated Successfully"); */
        this.newpassword = '';
        this.confirmpassword = ''
        this.ngOnInit();
        this.loader = false;
        this.showPopup = 1;
        this.messageId = 10;
      })
    }



  }

  public Cancel() {
    debugger
    location.href = "#/Employee/MyAccountSetting";
    this.loader = false;
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

}