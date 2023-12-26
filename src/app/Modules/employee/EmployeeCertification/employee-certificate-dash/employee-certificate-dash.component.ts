import { Component, OnInit } from '@angular/core';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { formatDate } from '@angular/common';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';

@Component({
  selector: 'app-employee-certificate-dash',
  templateUrl: './employee-certificate-dash.component.html',
  styleUrls: ['./employee-certificate-dash.component.css']
})
export class EmployeeCertificateDashComponent implements OnInit {

  showsalary:any
  showcalamity:any
  showhdmfsalary:any
  showhdmfcalamity:any
  myDate:any;
  constructor(public DigiofficeService: DigiofficecorehrService, private datePipe: DatePipe){}
  stafflist:any;
  uniquelist:any;
  companylist:any;
  companyname:any;
  Address:any;
  staffid:any;
  roleid:any;
  loader:any;
  p: any = 1;
  count1: any = 10;
  ssssalary:any;
  month:any;
  year:any;
  sign:any;
  username:any;
  todaydate:any;
  currentUrl:any;
  roleList:any;
  short:any;
  ID:any;
  role:any;
  coeType:any;
  reason:any;
  companyid:any;
  companyName:any;
  countryName:any;

  ngOnInit(): void {
  this.currentUrl = window.location.href;
  this.companyid = sessionStorage.getItem('companyid');

  if(this.companyid=='1001'){
    this.companyName='Acquiro Solutions and Technology Inc.'
  }
  else if(this.companyid=='1002'){
    this.companyName='Asti Business Services Inc.'
  }
  else if(this.companyid=='1005'){
    this.companyName='Fiber Infrastructure and Network Services Inc.'
  }
  else if(this.companyid=='1006'){
    this.companyName='Asticom Technology Inc.'
  }
  //this.companyName = sessionStorage.getItem('companyName');
  this.coeType = "0";
  this.reason = "0";
  this.month="0"
  this.year="0"
  this.sign="0"
    // this.myDate = new Date();
    const format = 'dd-MM-yyyy';
    const myDate = new Date();
    const locale = 'en-US';
    var curr = new Date;
    this.todaydate =  new Date;;
    this.username = localStorage.getItem('UserName');
    this.staffid=localStorage.getItem('staffid')
    this.roleid = sessionStorage.getItem('roledid');
    debugger
   this.GetAllStaffNew();
  }

  getempcert(){
    var entity = {
    StaffID: localStorage.getItem('staffid'),
    Date: new Date(),
  }
  // this.DigiofficeService.InsertGeneratedCoeDetails(entity).subscribe(data => {
   
    
  // })

  }

  getsign(){

  }
  

  public convetToPDF1() {
    debugger
   
    var data: any = document.getElementById('downloadaplication');
    html2canvas(data).then(canvas => {
   
      var margin = 5;
      var imgWidth = 208
      // var pageHeight = 295 - 10 * margin;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm');
      var position = 0;
      while (heightLeft > 0) {

        const contentDataURL = canvas.toDataURL('image/png')
        position = heightLeft - imgHeight;

        doc.addPage();


        doc.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      
        heightLeft -= pageHeight;

      }
      doc.deletePage(1)
      doc.save('EmployeeCertificate.pdf');
      
      var pdf1 = doc.output('blob');
      var file = new File([pdf1], "EmployeeCertificate.pdf");
      let body = new FormData();
      debugger
      body.append('Dan', file);
      console.log('pdf', pdf1)
    


    }).then(() => {
     
    });;
  }

  public convertToPDFCOEActiveEmployeeNoSalaryDetails() {
    debugger
   
    var data: any = document.getElementById('downloadCOEActiveEmployeeNoSalaryDetails');
    html2canvas(data).then(canvas => {
   
      var margin = 5;
      var imgWidth = 170
      // var pageHeight = 295 - 10 * margin;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm');
      var position = 0;
      while (heightLeft > 0) {

        const contentDataURL = canvas.toDataURL('image/png')
        position = heightLeft - imgHeight;

        doc.addPage();


        doc.addImage(contentDataURL, 'PNG', 20, position, imgWidth, imgHeight);
      
        heightLeft -= pageHeight;

      }
      doc.deletePage(1)
      doc.save('EmployeeCertificate.pdf');
      
      var pdf1 = doc.output('blob');
      var file = new File([pdf1], "EmployeeCertificate.pdf");
      let body = new FormData();
      debugger
      body.append('Dan', file);
      console.log('pdf', pdf1)
    


    }).then(() => {
     
    });;
  }

  public convertToCOEActiveEmployeeWithCompensation() {
    debugger
   
    var data: any = document.getElementById('downloadCOEActiveEmployeeWithCompensation');
    html2canvas(data).then(canvas => {
   
      var margin = 5;
      var imgWidth = 170
      // var pageHeight = 295 - 10 * margin;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm');
      var position = 0;
      while (heightLeft > 0) {

        const contentDataURL = canvas.toDataURL('image/png')
        position = heightLeft - imgHeight;

        doc.addPage();


        doc.addImage(contentDataURL, 'PNG', 20, position, imgWidth, imgHeight);
      
        heightLeft -= pageHeight;

      }
      doc.deletePage(1)
      doc.save('EmployeeCertificate.pdf');
      
      var pdf1 = doc.output('blob');
      var file = new File([pdf1], "EmployeeCertificate.pdf");
      let body = new FormData();
      debugger
      body.append('Dan', file);
      console.log('pdf', pdf1)
    


    }).then(() => {
     
    });;
  }

  public convertToCertificateOfDeploymentNoSalaryDetails() {
    debugger
   
    var data: any = document.getElementById('downloadCertificateOfDeploymentNoSalaryDetails');
    html2canvas(data).then(canvas => {
   
      var margin = 5;
      var imgWidth = 170;
      // var pageHeight = 295 - 10 * margin;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm');
      var position = 0;
      while (heightLeft > 0) {

        const contentDataURL = canvas.toDataURL('image/png')
        position = heightLeft - imgHeight;

        doc.addPage();


        doc.addImage(contentDataURL, 'PNG', 20, position, imgWidth, imgHeight);
      
        heightLeft -= pageHeight;

      }
      doc.deletePage(1)
      doc.save('EmployeeCertificate.pdf');
      
      var pdf1 = doc.output('blob');
      var file = new File([pdf1], "EmployeeCertificate.pdf");
      let body = new FormData();
      debugger
      body.append('Dan', file);
      console.log('pdf', pdf1)
    


    }).then(() => {
     
    });;
  }

  public convertToRAAWASecurityPassNoSalaryDetails() {
    debugger
   
    var data: any = document.getElementById('downloadRAAWASecurityPassNoSalaryDetails');
    html2canvas(data).then(canvas => {
   
      var margin = 5;
      var imgWidth = 170;
      // var pageHeight = 295 - 10 * margin;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;
      var doc = new jsPDF('p', 'mm');
      var position = 0;
      while (heightLeft > 0) {

        const contentDataURL = canvas.toDataURL('image/png')
        position = heightLeft - imgHeight;

        doc.addPage();


        doc.addImage(contentDataURL, 'PNG', 20, position, imgWidth, imgHeight);
      
        heightLeft -= pageHeight;

      }
      doc.deletePage(1)
      doc.save('EmployeeCertificate.pdf');
      
      var pdf1 = doc.output('blob');
      var file = new File([pdf1], "EmployeeCertificate.pdf");
      let body = new FormData();
      debugger
      body.append('Dan', file);
      console.log('pdf', pdf1)
    


    }).then(() => {
     
    });;
  }

  public GetAllStaffNew() {
    debugger
    this.DigiofficeService.GetAllStaffNewByEmployeID(localStorage.getItem('EmployeeID'))
      .subscribe({
        next: data => {
          debugger
        
          this.stafflist = data;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Role Type');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })
  }

}

