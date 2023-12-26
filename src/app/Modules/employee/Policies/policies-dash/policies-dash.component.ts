import { Component, OnInit } from '@angular/core';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-policies-dash',
  templateUrl: './policies-dash.component.html',
  styleUrls: ['./policies-dash.component.css']
})
export class PoliciesDashComponent implements OnInit {
  currentUrl: any;
  policyList: any;
  search: any;
  loader: any;
  staffID: any;
  startDate: any;
  endDate: any;
  roleID: any;
  noProjectFolders:any;
  showPopup: number = 0;
  messageId: number = 0;

  constructor(public DigiofficecorehrService: DigiofficecorehrService, public router: Router) { }

  ngOnInit(): void {
    this.loader = true;
    this.currentUrl = window.location.href;
    this.staffID = localStorage.getItem('staffid');
    this.roleID = localStorage.getItem('roledid');
    this.getData();
  }

  public getData() {
    this.DigiofficecorehrService.GetProjectFolders().subscribe(
      res => {
        debugger;
        this.policyList = res;
        if (this.policyList.length == 0) {
          this.noProjectFolders = true;
        } else {
          this.noProjectFolders = false;
        }
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
        this.DigiofficecorehrService.DeleteStaffShiftDetails(id)
          .subscribe({
            next: data => {
              Swal.fire('Deleted Successfully');
              this.ngOnInit();
            }
          })
      }
    });
  }

  public views(id:any) {
    debugger;
    this.router.navigate(['Employee/ViewPolicyDash', id]);
    this.loader = false;
  }
}