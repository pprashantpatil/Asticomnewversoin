import { Component, OnInit } from '@angular/core';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { PoliciesFormComponent } from '../policies-form/policies-form.component';

@Component({
  selector: 'app-view-policy-dash',
  templateUrl: './view-policy-dash.component.html',
  styleUrls: ['./view-policy-dash.component.css']
})
export class ViewPolicyDashComponent implements OnInit {
  currentUrl: any;
  policyList: any;
  search: any;
  loader: any;
  staffID: any;
  startDate: any;
  endDate: any;
  roleID: any;
  noProjectFolders: any;
  pageName: any;
  date: any;
  folderID:any
  policyFilter: any;

  constructor(public DigiofficecorehrService: DigiofficecorehrService, private activatedroute: ActivatedRoute, public router: Router, private datePipe: DatePipe, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.staffID = localStorage.getItem('staffid');
    this.roleID = localStorage.getItem('roledid');
    this.pageName = localStorage.getItem('Pagename')
    this.getData();
  }

  public getData() {
    debugger
    this.activatedroute.params.subscribe(params => {
      debugger;
      this.folderID = params['id'];
      this.loader = false;
    })

    this.DigiofficecorehrService.GetPolicies().subscribe(
      res => {
        debugger;
        this.policyList = res.filter(x => x.folderID == this.folderID);
        this.policyFilter = res.filter(x => x.folderID == this.folderID);
        this.loader = false;
      })
  }

  public openDeletePopUp(id: any) {
    Swal.fire({
      title: 'Delete record',
      text: "Are you sure you want to delete it?",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Proceed'
    }).then((result) => {
      if (result.value == true) {
        this.DigiofficecorehrService.DeletePolicies(id)
          .subscribe({
            next: data => {
              Swal.fire('Deleted Successfully');
              this.ngOnInit();
            }
          })
      }
    });
  }

  public getEndDate(event: any) {
    debugger
    this.startDate = this.datePipe.transform(event[0], 'yyyy-MM-dd');
    this.endDate = this.datePipe.transform(event[1], 'yyyy-MM-dd');
    if (this.endDate < this.startDate) {
      Swal.fire("The end date should be greater than the start date")
      this.endDate = ""
    }
    else if (this.startDate == undefined) {
      Swal.fire("Please select the start date first")
      this.endDate = ""
    }
    else {
      this.policyList = this.policyFilter.filter((x: { filterdate: any; }) => (x.filterdate >= this.startDate && x.filterdate <= this.endDate));
    }
  }

  showDialog() {
    debugger
    // let ID = undefined
    this.matDialog.open(PoliciesFormComponent, {
      data: this.folderID,
      width: '100%',
      maxHeight: '80vh'
    }).afterClosed()
      .subscribe(result => {
        console.log('Result' + result);
        this.ngOnInit();
      });
  }

  public goBack() {
    debugger
    location.href = "#/Employee/PoliciesDash";
    this.loader = false;
  }
}