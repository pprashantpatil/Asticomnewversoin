import { Component, OnInit } from '@angular/core';
// @ts-ignore
import ApexCharts from 'apexcharts';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';

@Component({
  selector: 'app-employee-graph-dash',
  templateUrl: './employee-graph-dash.component.html',
  styleUrls: ['./employee-graph-dash.component.css']
})
export class EmployeeGraphDashComponent implements OnInit {

  constructor(private DigiofficecorehrService: DigiofficecorehrService) { }
  genderlist: any = [];
  ngOnInit(): void {
    // this.DigiofficecorehrService.GetHRDashboard_HeadCountByGenderByEmployee(localStorage.getItem('staffid')).subscribe(data => {
    //   debugger
    //   this.genderlist = data;
    //   if (this.genderlist[0].gender == 'Male') {
    //     var options2 = {
    //       chart: {
    //         type: 'bar',
    //         stacked: true,
    //         height: 200,
    //       },
    //       plotOptions: {
    //         bar: {
    //           horizontal: true,
    //         },
    //       },
    //       dataLabels: {
    //         enabled: false,
    //       },
    //       series: [
    //         {
    //           name: 'Leave',
    //           data: [this.genderlist[0].sickleave, this.genderlist[0].vacationleave, this.genderlist[0].birthdayleave, this.genderlist[0].paternityleave, this.genderlist[0].emergencyleave],
    //         }
    //       ],
    //       xaxis: {
    //         categories: ['Sick', 'Vacation', 'Birthday', 'Paternity', 'Emergency'],
    //       },
    //       colors: ['#1125a9'],
    //     };
    //     var chart2 = new ApexCharts(document.querySelector('#chart2'), options2)
    //     chart2.render();
    //   }
    //   else {
    //     var options2 = {
    //       chart: {
    //         type: 'bar',
    //         stacked: true, 
    //         height: 200,
    //       },
    //       plotOptions: {
    //         bar: {
    //           horizontal: true,
    //         },
    //       },
    //       dataLabels: {
    //         enabled: false,
    //       },
    //       series: [
    //         {
    //           name: 'Leave',
    //           data: [this.genderlist[0].sickleave, this.genderlist[0].vacationleave, this.genderlist[0].birthdayleave, this.genderlist[0].maternityleave, this.genderlist[0].emergencyleave],
    //         }
    //       ],
    //       xaxis: {
    //         categories: ['Sick', 'Vacation', 'Birthday', 'Maternity', 'Emergency'],
    //       },
    //       colors: ['#3247d5'],
    //     };
    //     var chart2 = new ApexCharts(document.querySelector('#chart2'), options2)
    //     chart2.render();
    //   }
    // })
  }

  public GetmonthID(event: any) {
    debugger
    if (event.target.value == 0) {
      this.ngOnInit();
    } else {
      this.DigiofficecorehrService.GetHRDashboard_HeadCountByGenderByEmployeeByMonth(localStorage.getItem('staffid'), event.target.value).subscribe(data => {
        debugger
        this.genderlist = data;
      });
    }
  }
}