import { Component, OnInit } from '@angular/core';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';

@Component({
  selector: 'app-licence-details',
  templateUrl: './licence-details.component.html',
  styleUrls: ['./licence-details.component.css']
})
export class LicenceDetailsComponent implements OnInit {
  showPopup: number = 0;
  messageId: number = 0;
  loader: any;
  companyID: any;
  activeStaff: any;
  inactiveStaff: any;
  remaining: any;

  constructor(public DigiofficeService: DigiofficecorehrService,) { }

  ngOnInit(): void {
    this.companyID = 1;
    this.getCount(this.companyID);
  }

  public getCount(id: any) {
    this.DigiofficeService.GetStaffLicenseDetailsbycompany(id).
      subscribe({
        next: data => {
          let countdetails: any = data;
          this.activeStaff = countdetails[0].activestaff;
          this.inactiveStaff = countdetails[0].inactivestaff;
          this.remaining = (5600 - (this.activeStaff + this.inactiveStaff)) <= 0 ? 0 : 5600 - (this.activeStaff + this.inactiveStaff);
        }
      })
  }

  public getCompanyDetails() {
    this.DigiofficeService.GetStaffLicenseDetailsbycompany(this.companyID).
      subscribe({
        next: data => {
          let countdetails: any = data;
          this.activeStaff = countdetails[0].activestaff;
          this.inactiveStaff = countdetails[0].inactivestaff;
          if (this.companyID == 1) {
            this.remaining = (5600 - (this.activeStaff + this.inactiveStaff)) <= 0 ? 0 : 5600 - (this.activeStaff + this.inactiveStaff);
          } else {
            this.remaining = ((this.activeStaff - this.inactiveStaff)) <= 0 ? 0 : (this.activeStaff - this.inactiveStaff);
          }
        }
      })
  }
}