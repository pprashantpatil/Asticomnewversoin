import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DigiofficecorehrService } from './Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import {
  NgbDropdownConfig,
  NgbDropdownModule,
} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbDropdownConfig],
})
export class AppComponent {
  title = 'Asticomnewversion';
  loader: any;
  pagename: any;
  showMobileView: boolean | undefined;
  staffID: any;
  login: any;
  showsidebar: any;
  sidenav = true;
  temp1: any;
  showPopup: number = 0;
  messageId: number = 0;
  notificationslist: any = [];
  antiforgerytoken: any;
  EmployeeID: any;
  username: any;
  Comapnayname: any;
  notificationslist1: any;
  constructor(
    public router: Router,
    public DigiofficeService: DigiofficecorehrService
  ) {}

  ngOnInit(): void {
    debugger;
    this.getScreenResolution();
    this.showTime();
    this.showMenu=false
    this.staffID = localStorage.getItem('staffid');
    this.login = localStorage.getItem('roledid');
    this.EmployeeID = localStorage.getItem('EmployeeID');

    if (sessionStorage.getItem('roledid') == undefined) {
      this.showsidebar = 0;
    } else {
      this.showsidebar = 1;
    }
    this.antiforgerytoken = localStorage.getItem('antiforgerytoken');
    setInterval(() => {
      Swal.fire(
        'Your session will expire in the next five (5) minutes. You may CONTINUE by logging in again.'
      );
    }, 1.5e6);
    this.GetNotification();

    // interval(1000).subscribe(((_x: any) => {
    //   let cokie: any = this.CookieService.get('xsrf-token');
    //   if (cokie == null || cokie == undefined) {
    //     this.logout();
    //   }

    // }));

    this.staffID = localStorage.getItem('staffid');
    this.EmployeeID = localStorage.getItem('EmployeeID');
    this.temp1 = sessionStorage.getItem('temp');
    this.login = localStorage.getItem('roledid');
    this.username = localStorage.getItem('UserName');
    this.Comapnayname = sessionStorage.getItem('companycode');
    this.companyid =
      sessionStorage.getItem('companyid') == undefined
        ? 1001
        : sessionStorage.getItem('companyid');
  }

  showMenu: boolean = false;

closeMenu() {
  let displayMenu = this.showMenu ? true : false;
  return displayMenu;
}
  getScreenResolution() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    if (w >= 340 && w < 500) {
      this.showMobileView = true;
    } else {
      this.showMobileView = false;
    }
  }

  public GetNotification() {
    debugger;

    this.DigiofficeService.GetNotification(this.staffID).subscribe(
      (data: any) => {
        debugger;
        this.notificationslist = data;
        this.notificationslist1 = data.filter(
          (x: { seen: number }) => x.seen == null
        );
      }
    );
  }

  public ClearNotification() {
    debugger;
    this.showPopup = 1;
    this.DigiofficeService.ClearNotificationByID(
      Number(this.staffID)
    ).subscribe((_data: any) => {
      debugger;
    });

    /*  Swal.fire('Cleared Successfully'); */
    this.loader = false;
    this.messageId = 9;
    this.GetNotification();
  }
  public onActivate(event: any) {
    window.scroll(0, 0);
  }
  getHeaderLabel(sasa: any) {
    this.pagename = localStorage.getItem('Pagename');
  }

  public notification() {
    localStorage.setItem('Pagename', 'Notifications');
    // this.router.navigate(['/Notification']);
    document.getElementById('dropdownConfig1')?.click();
  }

  public profile() {
    this.router.navigate(['/HR/AddressDetailsWizard', this.EmployeeID]);
  }

  public accountsetting() {
    debugger;
    this.router.navigate(['/Employee/MyAccountSetting']);
  }

  public logout() {
    this.loader = true;
    localStorage.setItem('roledid', '0');
    sessionStorage.setItem('roledid', '0');
    this.router.navigate(['/Login']).then(() => {
      document.getElementById('dropdownConfig')?.click();
      location.reload();
      localStorage.clear();
      sessionStorage.clear();
    });
  }

  companyid: any;
  apiurl: any;
  public getCompanyDetails(event: any) {
    debugger;

    this.companyid = event.target.value;
    if (this.companyid == null || this.companyid == undefined) {
      this.apiurl = 'https://asticom.digiofficeapp.com/AsticomMainUATAPI';
    } else if (this.companyid == 1001) {
      this.apiurl = 'https://asticom.digiofficeapp.com/AsticomMainUATAPI';
    } else if (this.companyid == 1002) {
      this.apiurl = 'https://asticom.digiofficeapp.com/AsticomABSIUATAPI';
    } else if (this.companyid == 1003) {
      this.apiurl = 'https://asticom.digiofficeapp.com/AsticomBRADUATAPI';
    } else if (this.companyid == 1004) {
      this.apiurl = 'https://asticom.digiofficeapp.com/AsticomHCXUATAPI';
    } else if (this.companyid == 1005) {
      this.apiurl = 'https://asticom.digiofficeapp.com/AsticomFINSIUATAPI';
    } else if (this.companyid == 1006) {
      this.apiurl = 'https://asticom.digiofficeapp.com/AsticomHQUATAPI';
    }

    var entity = {
      m0ucEgBZCmnxjEpj: 'XOxKhzxPTuKbEeYS',
      jPsUmyVPIbCpPuf3: 'P@sn3JrYm5OyfhiDUxksw0rd',
    };
    this.loader = true;
    this.DigiofficeService.Getantiforgerytokenforsuperadmin(
      entity,
      this.apiurl
    ).subscribe((data: any) => {
      debugger;
      localStorage.setItem('antiforgerytoken', btoa(data.antiForgeryToken));
      this.DigiofficeService.GetCompanyIDForSuperAdmin(
        this.companyid,
        this.apiurl
      ).subscribe({
        next: (data) => {
          debugger;
          let temp: any = data;
          if (temp.length == 0) {
            /*   Swal.fire('Invalid Compnay'); */

            this.loader = false;
          } else {
            sessionStorage.setItem('digiofficeapiurl', temp.officeapiurl);
            sessionStorage.setItem('payrollapiurl', temp.payrollapiurl);
            sessionStorage.setItem('Companylogo', temp.companylogo);
            sessionStorage.setItem('companyid', this.companyid);
            sessionStorage.setItem('companycode', temp.companycode);
            this.loader = false;
            location.reload();
          }
        },
        error: (err) => {
          // Swal.fire('Issue in Getting Company ID');

          this.loader = false;
          // Insert error in Db Here//
          var obj = {
            PageName: 'App',
            ErrorMessage: err.error.message,
          };
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe((data) => {
            debugger;
          });
        },
      });
    });
  }
  public showTime(){
    var date = new Date();
    var h:any = date.getHours(); // 0 - 23
    var m:any = date.getMinutes(); // 0 - 59
    var s:any = date.getSeconds(); // 0 - 59
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + " " + session;
    const ele=document.getElementById("MyClockDisplay");
    if(ele!=null){
      ele.innerText = time;
    }
    const ele1=document.getElementById("MyClockDisplay");
    if(ele1!=null){
      ele1.textContent = time;
    }

    setInterval(() => {
      this.showTime()
      
    }, 1000);

   
    
}


}


