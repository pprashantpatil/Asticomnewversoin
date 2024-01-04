import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as ApexCharts from 'apexcharts';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
@Component({
  selector: 'app-hr-graph-dash',
  templateUrl: './hr-graph-dash.component.html',
  styleUrls: ['./hr-graph-dash.component.css']
})
export class HrGraphDashComponent implements OnInit {

  constructor(private DigiofficeService: DigiofficecorehrService, public router: Router) { }
  public data: any = [];
  public genderlist: any;
  ngOnInit(): void {

    this.DigiofficeService.GetAllStaffNew().subscribe(data => {
      debugger
      this.genderlist = data;

      const donutChartOptions1 = {
        chart: {
          type: 'donut',
          height: 204, // Set the height of the chart in pixels
        },
        series: [600, 600],
        labels: ['Male', 'Female'],
        // labels: ['Category 1', 'Category 2'],
        // Customize colors in the colors array
        colors: ['#3247d5', '#7a96ea'],
        // Customize width of the donut chart's segments
        plotOptions: {
          pie: {
            dataLabels: {
              offset: 40
            }
          }
        },
 
        dataLabels: {
          style: {
            colors: ['black'],
           
          }
        },

        legend: {
          show: true,
          position: 'bottom',
          verticalAlign: 'bottom',
          align: 'center'
        },

      };

      var chart1 = new ApexCharts(document.querySelector('#chart1'), donutChartOptions1)
      chart1.render();

      const donutChartOptions2 = {
        chart: {
          type: 'donut',
          height: 204, // Set the height of the chart in pixels
        },
        series: [200, 120],
        labels: ['Regular', 'Project Based'],
        // labels: ['Category 1', 'Category 2'],
        // Customize colors in the colors array
        colors: ['#3247d5', '#7a96ea'],
        // Customize width of the donut chart's segments
        plotOptions: {
          pie: {
            dataLabels: {
              offset: 40
            }
          }
        },
 
        dataLabels: {
          style: {
            colors: ['black'],
           
          }
        },

        legend: {
          show: true,
          position: 'bottom',
          verticalAlign: 'bottom',
          align: 'center'
        },

      };

      var chart2 = new ApexCharts(document.querySelector('#chart2'), donutChartOptions2)
      chart2.render();






    });



   // this.GetHRDashboard_HeadCount();
    const areaChartOptions = {
      chart: {
        type: 'area',
        height: 400, // Set the height of the chart in pixels
      },
      dataLabels: {
        enabled: false,
      },
      series: [
        {
          name: 'Series A',
          data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
        },
        {
          name: 'Series B',
          data: [20, 25, 30, 35, 40, 45, 50, 55, 60],
        },
      ],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      },
      // Customize colors for each series
      colors: ['#3247d5', '#7a96ea'],
    };

    var chart4 = new ApexCharts(document.querySelector('#chart4'), areaChartOptions)
    chart4.render();

  }


  public GetHRDashboard_HeadCount() {
    debugger
    this.DigiofficeService.GetAllStaffNew().subscribe(data => {
      debugger
      this.data = data;


    });


  }
  ViewAttedancegraphdashboard() {
    this.router.navigate(['/HR/hranalyticsgraph']);

  }

}
