import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Asticomnewversion';
loader: any;
pagename: any;
showMobileView: boolean | undefined;
staffID:any;
login:any;
showsidebar:any;
sidenav = true;
temp1: any;
constructor(public router: Router) { }
ngOnInit(): void {
  debugger
  this.getScreenResolution();
 
  this.staffID = localStorage.getItem('staffid');
  this.login = localStorage.getItem('roledid');



  if (sessionStorage.getItem('roledid') == undefined) {
    this.showsidebar = 0;
  } else {
    this.showsidebar = 1;
  }
  // this.GetNotification();
  // this.getbuildings();
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
public onActivate(event: any) {
  window.scroll(0, 0);
}
getHeaderLabel(sasa: any) {

  this.pagename = localStorage.getItem('Pagename');
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
}