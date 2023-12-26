import { Component, OnInit } from '@angular/core';
// @ts-ignore
import ApexCharts from 'apexcharts';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';

@Component({
  selector: 'app-manager-graph-dash',
  templateUrl: './manager-graph-dash.component.html',
  styleUrls: ['./manager-graph-dash.component.css']
})
export class ManagerGraphDashComponent implements OnInit {
loader: any;
showPopup: number = 0;
messageId: number = 0;

  constructor(private DigiofficeService:DigiofficecorehrService) { }
public data:any=[];
public genderlist:any;
  ngOnInit(): void {
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
          data: [3,1, 1,  0, 1],
        }
  
      ],
      xaxis: {
        categories: ['Sick', 'Vacation', 'Birthday', 'Paternity', 'Emergency'],
      },
      // Customize colors for each category
      colors: ['#1125a9'],
    };

    var chart2 = new ApexCharts(document.querySelector('#chart2'), options2)
    chart2.render();

    // this.DigiofficeService.GetHRDashboard_HeadCountByGenderByManager(localStorage.getItem('staffid')).subscribe(data => {
    //   debugger
    //   this.genderlist = data;
   
    //   const donutChartOptions01 = {
    //     chart: {
    //       type: 'donut',
    //       height: 200, // Set the height of the chart in pixels
    //     },
    //     series: [this.genderlist[0].workfromoffice, this.genderlist[0].workfromhome],
    //     labels: ['Work From Office', 'Work From Home'],
    //     // labels: ['Category 1', 'Category 2'],
    //     // Customize colors in the colors array
    //     colors: ['#3247d5','#7a96ea'],
    //     // Customize width of the donut chart's segments
    //     plotOptions: {
    //       pie: {
    //         dataLabels: {
    //           offset: 14.5
    //         }
    //       }
    //     },

    //     dataLabels: {
    //       style: {
    //         colors: ['black']
    //       }
    //     },
    //     legend: {
    //       show: true,
    //       position: 'bottom',
    //       verticalAlign: 'bottom',
    //       align: 'center'
    //     },
    //   };
  
    //   var chart01 = new ApexCharts(document.querySelector('#chart01'), donutChartOptions01)
    //   chart01.render();

    //   if(this.genderlist[0]?.gender=='Male'){
    //     var stackedBarChartOptions = {
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
    //           data: [this.genderlist[0].sickleave, this.genderlist[0].vacationleave, this.genderlist[0].birthdayleave,this.genderlist[0].paternityleave, this.genderlist[0].emergencyleave],
    //         }
    
    //       ],
    //       xaxis: {
    //         categories: ['Sick', 'Vacation', 'Birthday',  'Paternity', 'Emergency'],
    //       },
    //       colors: ['#3247d5'],
  
  
    //     };
    
    //     var chart2 = new ApexCharts(document.querySelector('#chart2'), stackedBarChartOptions)
    //     chart2.render();
    //   }else{
    //     var stackedBarChartOptions = {
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
    //         categories: ['Sick', 'Vacation', 'Birthday', 'Maternity','Emergency'],
    //       },
    //       colors: ['#3247d5'],
    //     };
    //     var chart2 = new ApexCharts(document.querySelector('#chart2'), stackedBarChartOptions)
    //     chart2.render();
    //   }
    //   const chart3Options = {
    //     chart: {
    //       type: 'donut',
    //       height: 200, 
    //     },
    //     series: [this.genderlist[0].regular, this.genderlist[0].projectBased],
    //     labels: ['Regular', 'Project based',],
    //     colors: ['#3247d5','#7a96ea'],
    //     plotOptions: {
    //       pie: {
    //         dataLabels: {
    //           offset: 40
    //         }
    //       }
    //     },
    //     dataLabels: {
    //       style: {
    //         colors: ['black'],
           
    //       }
    //     },
    //     legend: {
    //       show: true,
    //       position: 'bottom',
    //       verticalAlign: 'bottom',
    //       align: 'center'
    //     },
    //   };
    //   var chart3 = new ApexCharts(document.querySelector('#chart3'),chart3Options)
    //   chart3.render();
    // });
  }

  public GetmonthID(event:any){
    debugger
    if(event.target.value==0){
      this.ngOnInit();
    }else{
      this.DigiofficeService.GetHRDashboard_HeadCountByGenderByManagerByMonth(localStorage.getItem('staffid'),event.target.value).subscribe(data => {
        debugger
        this.genderlist = data;
        
      
  
  
  

      
  
  
        //Leave type
  
    
  
        //Termination
  
    
    
  
      });
    }
  }

}
