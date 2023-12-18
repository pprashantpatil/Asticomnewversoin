import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SidebarComponent } from './Shared/sidebar/sidebar.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Asticomnewversion';
  hasNetworkConnection: boolean = false;
  hasInternetAccess: boolean = false;
  status: string | undefined;
  antiforgerytoken: any;
  showPopup: number = 0;
  messageId: number = 0;
  @ViewChild(SidebarComponent, { static: false }) SidebarWithIconComponent: SidebarComponent | undefined;
  constructor(public router: Router) {
    // this.connectionService.updateOptions({
    //   heartbeatExecutor: options => new Observable<any>(subscriber => {
    //     if (Math.random() > .5) {
    //       subscriber.next();
    //       subscriber.complete();
    //     } else {
    //       throw new Error('Connection error');
    //     }
    //   })
    // });

    // this.connectionService.monitor().subscribe(currentState => {
    //   this.hasNetworkConnection = currentState.hasNetworkConnection;
    //   this.hasInternetAccess = currentState.hasInternetAccess;
    //   if (this.hasNetworkConnection && this.hasInternetAccess) {
    //     this.status = 'ONLINE';
    //   } else {
    //     this.status = 'OFFLINE';
    //   }
    // });
  }


  login: any;
  chatcount: any;
  myname: any;
  staffID: any;
  pagename: any;
  showsidebar: any;
  time: any;
  hh: any;
  mm: any;
  ampm: any;
  username: any;
  officelogo: any;
  CompanyConfiguration: any;
  temp1: any;
  Comapnayname: any;
  unseen: any;
  ngOnInit(): void {

    this.antiforgerytoken = localStorage.getItem('antiforgerytoken')


    // interval(1000).subscribe(((_x: any) => {
    //   let cokie: any = this.CookieService.get('xsrf-token');
    //   if (cokie == null || cokie == undefined) {
    //     this.logout();
    //   }

    // }));

    this.staffID = localStorage.getItem('staffid');
    this.temp1 = sessionStorage.getItem('temp');
    this.login = localStorage.getItem('roledid');
    this.username = localStorage.getItem('UserName');
    this.Comapnayname = sessionStorage.getItem('companycode');
    this.companyid = sessionStorage.getItem('companyid') == undefined ? 1001 : sessionStorage.getItem('companyid');

    setInterval(() => {
      var time = new Date();
      this.time = time.toLocaleString('en-US', { hour: '2-digit', minute: 'numeric', hour12: false });
      let temp: any = this.time.split(':');
      this.hh = temp[0];
      let temp1: any = this.time.split(':')[1].split(" ");
      this.mm = temp1[0];
      this.ampm = temp1[1];
      // if (localStorage.getItem('antiforgerytoken') != null || localStorage.getItem('antiforgerytoken') != undefined) {
      //   let cokie: any = this.CookieService.get('xsrf-token');
      //   if (cokie == null || cokie == undefined || cokie == "") {
      //     this.sessionexpired();
      //   }
      // }
    }, 1000);
    setInterval(() => {
      this.sessionexpired();

    }, 3.3e+6);

    setInterval(() => {
      Swal.fire('Your session will expire in the next five (5) minutes. You may CONTINUE by logging in again.')
    }, 1.5e+6);





    if (sessionStorage.length == 0) {
      this.showsidebar = 0
    }
    else {
      this.showsidebar = 1
    }
    this.GetNotification();

    // this.DigiofficeService.GetMyDetailsByStaffID(this.staffID).subscribe((res: any) => {
    //   debugger
    //   let temp: any = res;
    //   this.myname = temp[0].name;
    //   this.initail = this.myname.charAt(0);
    // });


  }

  public sessionexpired() {
    debugger
    /*   Swal.fire('Session is Expired. Please Login Again'); */
    this.showPopup = 1;
    this.messageId = 5;
    localStorage.setItem('roledid', "0");
    this.router.navigate(['/Login']).then(() => {
      location.reload();
      localStorage.clear();
      sessionStorage.clear();

    })


  }

  getHeaderLabel(sasa: any) {
    debugger
    this.pagename = localStorage.getItem('Pagename');
  }
  public seen() {
    this.unseen = 1;
  }

  seennotification(id: any) {
    debugger
    var entity = {
      'ID': id,
      "Seen": 1
    }
    // this.DigiofficeService.UpdateNotificationSeen(entity).subscribe(data => {
    //   debugger
    //   this.GetNotification();
    // })
  }
  changeicon: any
  highlight(value: any) {
    this.changeicon = value
  }

  Helpcentre() {
    debugger;
    localStorage.setItem('Pagename', 'Help');
    this.router.navigate(['/Admin/Help']);
    // this.DigiofficeService.saveData('value');
    this.loader = false;
    document.getElementById("dropdownConfig")?.click();
  }
  public swal() {
    this.showPopup = 0;
    Swal.fire({
      title: 'Access Salary',
      html: `<input type="text" id="login" class="swal2-input"  placeholder="Enter 4 Digit Pin">
    `,
      confirmButtonText: 'Submit',
      focusConfirm: false,
      preConfirm: () => {
        debugger
        const login: any = document.getElementById('login') as HTMLElement

        if (login.value == 1111) {
          location.href = '#/Staffsalarydash'

        }
        else {
          /*  Swal.showValidationMessage(`Please enter correct pin`) */
          this.loader = 1;
          this.showPopup = 1;
          this.messageId = 106
        }
      }
    })
  }



  initail: any
  notificationslist: any
  notificationCount: any;
  notificationslist1: any;

  public GetNotification() {
    debugger

    // this.DigiofficeService.GetNotification(this.staffID).subscribe((data: any) => {
    //   debugger
    //   this.notificationslist = data;
    //   for (let i = 0; i <= this.notificationslist.length; i++) {
    //     if (this.dispyList.length < 3) {
    //       this.dispyList.push(this.notificationslist[i]);
    //       console.log("dispyList" + this.dispyList)
    //     }
    //     else {

    //     }

    //   }

    //   this.notificationslist1 = data.filter((x: { seen: number; }) => x.seen == null);
    //   this.notificationCount = this.notificationslist1.length;
    // })
  }

  public ClearNotification() {
    debugger
    this.showPopup = 1;
    // this.DigiofficeService.ClearNotificationByID(Number(this.staffID)).subscribe((_data: any) => {
    //   debugger

    // })

    /*  Swal.fire('Cleared Successfully'); */
    this.loader = false;
    this.messageId = 9
    this.GetNotification();

  }


  public onActivate(event: any) {
    window.scroll(0, 0);
  }
  show: any;
  public changecolor(ID: any) {
    debugger

    if (ID.vendorID == 1) {
      this.router.navigate(['/Manager/MyTeamLeaveDetails']);
    }
    else if (ID.vendorID == 2) {
      this.router.navigate(['/Employee/AttendanceCorrection']);
    }
    else {
      var entity = {
        ID: ID.id
      }
      // this.DigiofficeService.UpdateNotificationSeen(entity).subscribe((_data: any) => {
      //   location.reload();
      // })
    }

  }








  loader: any;
  public logout() {
    debugger
    this.loader = true;
    this.UpdatelogActivity();
    localStorage.setItem('roledid', "0");
    this.router.navigate(['/Login']).then(() => {
      location.reload();
      localStorage.clear();
      sessionStorage.clear();
      document.getElementById("dropdownConfig")?.click();
    })


  }
  public getipaddress() {
    debugger
    this.loader = true;
    // this.DigiofficeService.getIPAddress()
    //   .subscribe({
    //     next: data => {
    //       debugger
    //       let temap: any = data
    //       this.ipaddress = temap.ip
    //       this.loader = false;
    //     }, error: (err) => {
    //       var obj = {
    //         'PageName': 'APP page',
    //         'ErrorMessage': err.error.message
    //       }
    //       this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
    //         data => {
    //           debugger
    //         },
    //       )
    //     }
    //   })
  }
  ipaddress: any;

  public UpdatelogActivity() {
    this.getipaddress();
    var options = { hour12: false };
    var date = new Date();
    let id: any = sessionStorage.getItem('logid');
    var entity = {
      ID: parseInt(id),
      SignoutDate: date.toLocaleString('en-US', options),
      punchoutip: this.ipaddress == undefined ? '101.120.111.222' : this.ipaddress,
    }
    // this.DigiofficeService.UpdateLogActivity(entity)
    //   .subscribe({

    //     next: data => {
    //       debugger
    //       if (data != 0) {
    //         debugger
    //       }
    //     }, error: (err) => {
    //       this.loader = false;
    //       var obj = {
    //         'PageName': 'App Page',
    //         'ErrorMessage': err.error.message
    //       }
    //       this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
    //         data => {
    //           debugger
    //         },
    //       )
    //     }
    //   })
  }








  public Viewall() {
    debugger
    this.router.navigate(['/Admin/notification']);
  }


  public accountsetting() {
    debugger
    this.router.navigate(['/Employee/MyAccountSetting']);
  }
  ProfilePhoto: any;

  Profile() {
    debugger;
    localStorage.setItem('Pagename', 'My Profile');
    this.router.navigate(['/Employee/MyProfiletabs', this.staffID]);
    document.getElementById("dropdownConfig")?.click();
    // this.DigiofficeService.saveData('value');
    this.loader = false;
  
  }



  public Clearstorge() {
    sessionStorage.setItem('temp', '0');
    location.reload();
  }
  companyid: any;
  apiurl: any;
  dispyList: any = [];
  notificationCount1: any;
  showNotification: any;
  notification() {
    this.router.navigate(['/Admin/notification']);
  }
  navigate(URL: any) {

  }
  sidenav = true;
  getless(sidenav: any) {
    if (sidenav == true) {
      (document.getElementById("mySidebar") as HTMLInputElement).style.width = '75px';
      this.sidenav = false
    }
    else {
      (document.getElementById("mySidebar") as HTMLInputElement).style.width ='92%';
      this.sidenav = true;
    }
    // this.SidebarWithIconComponent?.getvalues(sidenav)
  }
  public getCompanyDetails(event: any) {
    debugger
    this.showPopup = 0;
    this.companyid = event.target.value;
    if (this.companyid == null || this.companyid == undefined) {
      this.apiurl = 'https://asticom.digiofficeapp.com/AsticomMainAPI'
    }
    else if (this.companyid == 1001) {
      this.apiurl = 'https://asticom.digiofficeapp.com/AsticomMainAPI'
    }
    else if (this.companyid == 1002) {
      this.apiurl = 'https://asticom.digiofficeapp.com/AsticomABSIAPI'
    }
    else if (this.companyid == 1003) {
      this.apiurl = 'https://asticom.digiofficeapp.com/AsticomBRADAPI'
    }
    else if (this.companyid == 1004) {
      this.apiurl = 'https://asticom.digiofficeapp.com/AsticomHCXAPI'
    }
    else if (this.companyid == 1005) {
      this.apiurl = 'https://asticom.digiofficeapp.com/AsticomFINSIAPI'
    }
    else if (this.companyid == 1006) {
      this.apiurl = 'https://asticom.digiofficeapp.com/AsticomHQAPI'
    }

    var entity = {
      'm0ucEgBZCmnxjEpj': 'XOxKhzxPTuKbEeYS',
      'jPsUmyVPIbCpPuf3': 'P@sn3JrYm5OyfhiDUxksw0rd',
    }
    this.loader = true;
    // this.DigiofficeService.Getantiforgerytokenforsuperadmin(entity, this.apiurl).subscribe((data: any) => {
    //   debugger
    //   localStorage.setItem('antiforgerytoken', btoa(data.antiForgeryToken));
    // })




  }



}