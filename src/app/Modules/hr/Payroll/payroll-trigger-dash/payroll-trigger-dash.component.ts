import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payroll-trigger-dash',
  templateUrl: './payroll-trigger-dash.component.html',
  styleUrls: ['./payroll-trigger-dash.component.css']
})
export class PayrollTriggerDashComponent implements OnInit {
  year: any;
  month: any;
  payPeriod: any;

  constructor() { }

  ngOnInit(): void {
    this.year = "";
    this.month = "";
    this.payPeriod = "";
  }

  public payrollTrigger() {
    Swal.fire('Trigger Completed Successfully');
  }
}