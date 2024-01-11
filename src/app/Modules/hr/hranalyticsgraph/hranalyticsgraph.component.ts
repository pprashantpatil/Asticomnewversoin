import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as ApexCharts from 'apexcharts';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';

@Component({
  selector: 'app-hranalyticsgraph',
  templateUrl: './hranalyticsgraph.component.html',
  styleUrls: ['./hranalyticsgraph.component.css'],
})
export class HranalyticsgraphComponent implements OnInit {
  constructor(
    private DigiofficeService: DigiofficecorehrService,
    public router: Router
  ) {}
  public data: any = [];
  public genderlist: any;
  MonthID: any;

  ngOnInit(): void {
    // this.DigiofficeService.GetAllStaffNew().subscribe(data => {
    //   debugger
    //   this.genderlist = data;

    // });

    const donutChartOptions2 = {
      chart: {
        type: 'donut',
        height: 204, // Set the height of the chart in pixels
      },
      series: [600, 600],
      labels: ['Regular', 'Project Based'],
      // labels: ['Category 1', 'Category 2'],
      // Customize colors in the colors array
      colors: ['#3247d5', '#7a96ea'],
      // Customize width of the donut chart's segments
      plotOptions: {
        pie: {
          dataLabels: {
            offset: 40,
          },
        },
      },

      dataLabels: {
        style: {
          colors: ['black'],
        },
      },

      legend: {
        show: true,
        position: 'bottom',
        verticalAlign: 'bottom',
        align: 'center',
      },
    };

    var chart2 = new ApexCharts(
      document.querySelector('#chart2'),
      donutChartOptions2
    );
    chart2.render();
    var options = {
      chart: {
        type: 'bar',
        height: 120, // Set the height of the chart in pixels
      },
      plotOptions: {
        bar: {
          position: 'top',
          horizontal: true, // Set to true for a horizontal stacked bar chart
        },
        dataLabels: {
          enabled: true,
          style: {
            colors: ['#333'],
          },
          offsetX: 30,
        },
      },
      dataLabels: {
        enabled: false,
      },
      // Customize colors for each series
      colors: ['#3247d5'],

      series: [
        {
          name: 'Headcount',
          data: [50, 30, 20, 57, 20],
        },
      ],
      xaxis: {
        categories: ['A1', 'A2', 'A3', 'MTA', 'MTB'],
      },
    };

    var chart = new ApexCharts(document.querySelector('#chart'), options);
    chart.render();

    var options1 = {
      chart: {
        type: 'bar',
        height: 120, // Set the height of the chart in pixels
      },
      plotOptions: {
        bar: {
          horizontal: true, // Set to true for a horizontal stacked bar chart
        },
      },
      // Customize colors for each series
      colors: ['#3247d5'],
      series: [
        {
          name: 'Attendance',
          data: [40, 60, 100, 70],
        },
      ],
      xaxis: {
        categories: [
          'Cost Allocation',
          'Finance Department',
          'Marketing',
          'Sales',
        ],
      },
    };

    var chart4 = new ApexCharts(document.querySelector('#chart4'), options1);
    chart4.render();

    var options2 = {
      chart: {
        type: 'bar',
        stacked: true, // Set to true for a stacked bar chart
        height: 150, // Set the height of the chart in pixels
      },
      plotOptions: {
        bar: {
          horizontal: true, // Set to true for a horizontal stacked bar chart
        },
      },
      dataLabels: {
        enabled: false,
      },

      series: [
        {
          name: 'Leave',
          data: [20, 12, 2, 17, 9],
        },
      ],
      xaxis: {
        categories: ['Sick', 'Vacation', 'Birthday', 'Maternity', 'Emergency'],
      },
      // Customize colors for each category
      colors: ['#3247d5'],
    };

    var chart5 = new ApexCharts(document.querySelector('#chart5'), options2);
    chart5.render();

    const donutChartOptions3 = {
      chart: {
        type: 'donut',
        height: 200, // Set the height of the chart in pixels
      },
      series: [40, 60],
      // series: [this.genderlist[0].workfromhome, this.genderlist[0].workfromoffice],
      labels: ['Work From Home', 'Work From Office'],
      // labels: ['Category 1', 'Category 2'],
      // Customize colors in the colors array
      colors: ['#3247d5', '#7a96ea'],
      // Customize width of the donut chart's segments
      // plotOptions: {
      //   donut: {
      //     size: '65%'
      //   },
      //   dataLabels: {
      //     offset: 60
      //   } // Set the width of the segments as a percentage
      // },

      legend: {
        show: true,
        position: 'bottom',
        verticalAlign: 'bottom',
        align: 'center',
      },

      dataLabels: {
        style: {
          colors: ['black'],
        },
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: 40,
          },
        },
      },
    };
    var chart6 = new ApexCharts(
      document.querySelector('#chart6'),
      donutChartOptions3
    );
    chart6.render();

    this.GetEmployeeLoansCountforDashboard1();
  }

  approvedleave: any;
  newhires: any;
  public GetEmployeeLoansCountforDashboard1() {
    this.DigiofficeService.GetEmployeeLoansCountforDashboard(
    localStorage.getItem('staffid')
    ).subscribe((data) => {
      let temp = data;
     this.genderlist = data;
     if(this.genderlist.length!=0){
      
    const donutChartOptions1 = {
      chart: {
        type: 'donut',
        height: 212, // Set the height of the chart in pixels
      },
      series: [this.genderlist[0].staffmale, this.genderlist[0].stafffemale],
      labels: ['Male', 'Female'],
      // labels: ['Category 1', 'Category 2'],
      // Customize colors in the colors array
      colors: ['#3247d5', '#7a96ea'],

      // Customize width of the donut chart's segments
      plotOptions: {
        donut: {
          size: '20%',
        },
        pie: {
          dataLabels: {
            offset: 40,
          },
        }, // Set the width of the segments as a percentage
      },
      legend: {
        show: true,
        position: 'bottom',
        verticalAlign: 'bottom',
        align: 'center',
      },
      dataLabels: {
        style: {
          colors: ['black'],
        },
      },
    };

    var chart1 = new ApexCharts(
      document.querySelector('#chart1'),
      donutChartOptions1
    );
    chart1.render();

     }else{
      
    const donutChartOptions1 = {
      chart: {
        type: 'donut',
        height: 212, // Set the height of the chart in pixels
      },
      series: [600, 600],
      labels: ['Male', 'Female'],
      // labels: ['Category 1', 'Category 2'],
      // Customize colors in the colors array
      colors: ['#3247d5', '#7a96ea'],

      // Customize width of the donut chart's segments
      plotOptions: {
        donut: {
          size: '20%',
        },
        pie: {
          dataLabels: {
            offset: 40,
          },
        }, // Set the width of the segments as a percentage
      },
      legend: {
        show: true,
        position: 'bottom',
        verticalAlign: 'bottom',
        align: 'center',
      },
      dataLabels: {
        style: {
          colors: ['black'],
        },
      },
    };

    var chart1 = new ApexCharts(
      document.querySelector('#chart1'),
      donutChartOptions1
    );
    chart1.render();

     }
      this.approvedleave = temp[0].approvedleave;
      this.newhires = temp[0].newhires;
    });
  }

  public GetmonthID(event: any) {
    debugger;
    if (event.target.value == 0) {
      this.ngOnInit();
    } else {
      this.DigiofficeService.GetAllStaffNew().subscribe((data) => {
        debugger;
        this.genderlist = data;
        const donutChartOptions1 = {
          chart: {
            type: 'donut',
            height: 212, // Set the height of the chart in pixels
          },
          series: [
            this.genderlist[0].staffMaleHeadCount,
            this.genderlist[0].staffFemaleHeadCount,
          ],
          labels: ['Male', 'Female'],
          // labels: ['Category 1', 'Category 2'],
          // Customize colors in the colors array
          colors: ['#3247d5', '#7a96ea'],

          // Customize width of the donut chart's segments
          plotOptions: {
            donut: {
              size: '20%',
            },
            pie: {
              dataLabels: {
                offset: 40,
              },
            }, // Set the width of the segments as a percentage
          },
          legend: {
            show: true,
            position: 'bottom',
            verticalAlign: 'bottom',
            align: 'center',
          },
          dataLabels: {
            style: {
              colors: ['black'],
            },
          },
        };

        var chart1 = new ApexCharts(
          document.querySelector('#chart1'),
          donutChartOptions1
        );
        chart1.render();

        const donutChartOptions2 = {
          chart: {
            type: 'donut',
            height: 204, // Set the height of the chart in pixels
          },
          series: [600, 600],
          labels: ['Regular', 'Project Based'],
          // labels: ['Category 1', 'Category 2'],
          // Customize colors in the colors array
          colors: ['#3247d5', '#7a96ea'],
          // Customize width of the donut chart's segments
          plotOptions: {
            pie: {
              dataLabels: {
                offset: 40,
              },
            },
          },

          dataLabels: {
            style: {
              colors: ['black'],
            },
          },

          legend: {
            show: true,
            position: 'bottom',
            verticalAlign: 'bottom',
            align: 'center',
          },
        };

        var chart2 = new ApexCharts(
          document.querySelector('#chart2'),
          donutChartOptions2
        );
        chart2.render();
        var options = {
          chart: {
            type: 'bar',
            height: 120, // Set the height of the chart in pixels
          },
          plotOptions: {
            bar: {
              position: 'top',
              horizontal: true, // Set to true for a horizontal stacked bar chart
            },
            dataLabels: {
              enabled: true,
              style: {
                colors: ['#333'],
              },
              offsetX: 30,
            },
          },
          dataLabels: {
            enabled: false,
          },
          // Customize colors for each series
          colors: ['#3247d5'],

          series: [
            {
              name: 'Headcount',
              data: [50, 30, 20, 57, 20],
            },
          ],
          xaxis: {
            categories: ['A1', 'A2', 'A3', 'MTA', 'MTB'],
          },
        };

        var chart = new ApexCharts(document.querySelector('#chart'), options);
        chart.render();

        var options1 = {
          chart: {
            type: 'bar',
            height: 120, // Set the height of the chart in pixels
          },
          plotOptions: {
            bar: {
              horizontal: true, // Set to true for a horizontal stacked bar chart
            },
          },
          dataLabels: {
            enabled: false,
          },
          // Customize colors for each series
          colors: ['#3247d5'],
          series: [
            {
              name: 'Attendance',
              data: [40, 60, 100, 70],
            },
          ],
          xaxis: {
            categories: [
              'Cost Allocation',
              'Finance Department',
              'Marketing',
              'Sales',
            ],
          },
        };

        var chart4 = new ApexCharts(
          document.querySelector('#chart4'),
          options1
        );
        chart4.render();

        if (this.genderlist[0]?.gender == 'Male') {
          var options2 = {
            chart: {
              type: 'bar',
              stacked: true, // Set to true for a stacked bar chart
              height: 200, // Set the height of the chart in pixels
            },
            plotOptions: {
              bar: {
                horizontal: true, // Set to true for a horizontal stacked bar chart
              },
            },
            dataLabels: {
              enabled: false,
            },

            series: [
              {
                name: 'Leave',
                data: [20, 12, 2, 17, 9],
              },
            ],
            xaxis: {
              categories: [
                'Sick',
                'Vacation',
                'Birthday',
                'Paternity',
                'Emergency',
              ],
            },
            // Customize colors for each category
            colors: ['#3247d5'],
          };

          var chart5 = new ApexCharts(
            document.querySelector('#chart5'),
            options2
          );
          chart5.render();
        } else {
          var options2 = {
            chart: {
              type: 'bar',
              stacked: true, // Set to true for a stacked bar chart
              height: 200, // Set the height of the chart in pixels
            },
            plotOptions: {
              bar: {
                horizontal: true, // Set to true for a horizontal stacked bar chart
              },
            },
            dataLabels: {
              enabled: false,
            },

            series: [
              {
                name: 'Leave',
                data: [20, 12, 2, 17, 9],
              },
            ],
            xaxis: {
              categories: [
                'Sick',
                'Vacation',
                'Birthday',
                'Maternity',
                'Emergency',
              ],
            },
            // Customize colors for each category
            colors: ['#3247d5'],
          };

          var chart5 = new ApexCharts(
            document.querySelector('#chart5'),
            options2
          );
          chart5.render();
        }

        const donutChartOptions3 = {
          chart: {
            type: 'donut',
            height: 120, // Set the height of the chart in pixels
          },

          // series: [this.genderlist[0].workfromhome, this.genderlist[0].workfromoffice],
          series: [40, 60],
          labels: ['Work From Home', 'Work From Office'],
          // labels: ['Category 1', 'Category 2'],
          // Customize colors in the colors array
          colors: ['#3247d5', '#7a96ea'],
          // Customize width of the donut chart's segments
          // plotOptions: {
          //   donut: {
          //     size: '65%'
          //   },
          //   dataLabels: {
          //     offset: 60
          //   } // Set the width of the segments as a percentage
          // },

          legend: {
            show: true,
            position: 'bottom',
            verticalAlign: 'bottom',
            align: 'center',
          },

          dataLabels: {
            style: {
              colors: ['black'],
            },
          },
          plotOptions: {
            pie: {
              dataLabels: {
                offset: 10,
              },
            },
          },
        };
        var chart6 = new ApexCharts(
          document.querySelector('#chart6'),
          donutChartOptions3
        );
        chart6.render();
      });
    }
  }
  public GetHRDashboard_HeadCount() {
    debugger;
    this.DigiofficeService.GetAllStaffNew().subscribe((data) => {
      debugger;
      this.data = data;
    });
  }
}
