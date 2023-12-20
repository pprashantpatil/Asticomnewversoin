import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  constructor() { }
  roleid:any;
  companyID:any;

    ngOnInit(): void {
      this.roleid = localStorage.getItem('roledid');
      this.companyID = sessionStorage.getItem('companyid');
    }

}
