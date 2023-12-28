import { Component, OnInit } from '@angular/core';
import { DigiofficecorehrService } from '../../../../Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { LeaveTypeFormComponent } from '../leave-type-form/leave-type-form.component';

@Component({
  selector: 'app-leave-type-dashboard',
  templateUrl: './leave-type-dashboard.component.html',
  styleUrls: ['./leave-type-dashboard.component.css']
})
export class LeaveTypeDashboardComponent implements OnInit {

  currentUrl: any;
  loader:any;
  p: any = 1;
  count1: any = 10;
  leavelistCopy:any;
  staffID:any
  Pagename:any;
  term: any;
  leavelist: any
  constructor(public DigiofficeService: DigiofficecorehrService,private matDialog: MatDialog) { }
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.staffID = localStorage.getItem('staffid')
		this.Pagename = localStorage.getItem('Pagename')
    this.GetLeaveType();
  }

  public GetLeaveType() {
    this.loader=true;
    this.DigiofficeService.GetLeaveType()
      .subscribe({
        next: data => {
            
          this.leavelist = data;
          this.leavelistCopy = this.leavelist;
          this.loader = false;
        }, error: (err) => {
          Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');
          Swal.fire({
            title: 'Are you sure?',
            text: "Issue in Getting Leave Type",
            showCancelButton: true,
            confirmButtonText: 'Okay',
            cancelButtonText: 'Cancel',
            reverseButtons:false,
            width:'auto',
            showCloseButton:true
          })
          this.loader = false;
          // Insert error in Db Here//
         var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message,
            'StaffID':localStorage.getItem('staffid')
          }
          this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
            data => {
                
            },
          )
        }
      })
  }


  public delete(id: any) {
  
    Swal.fire({
      title: 'Delete record',
      text: "Are you sure you want to delete it?",
      showCancelButton: true,
      confirmButtonColor:'#716add',
      cancelButtonColor:'#ff',
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'Cancel',
      reverseButtons:false,
      width:'auto',
      showCloseButton:true
    }).then((result) => {
      if (result.value == true) {
        this.DigiofficeService.DeleteLeaveTypeMaster(id)
          .subscribe({
            next: data => {
                
              Swal.fire('Deleted Successfully')
             
              this.ngOnInit();
            }, error: (err) => {
              Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');
              // Insert error in Db Here//
              var obj = {
                'PageName': this.currentUrl,
                'ErrorMessage': err.error.message
              }
              this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                data => {
                    
                },
              )
            }
          })
      }
    })
  }
  // showDialog() {
  //    
  //   this.matDialog.open(LeaveTypeFormComponent, {
  //     width: '250px',
  //     height: '300px' 
  //   }).afterClosed()
  //     .subscribe(result => {

  //       console.log('Result' + result);
  //     });
  // }

  // Addleave(){
  //     
    
  //   const modalRef= this.modalService.open( LeaveTypeFormComponent, {
  //     centered: true,
  //     size: "lg"
  //   } );
  //   modalRef.componentInstance.name = 'World';
    
  // }
  Addleave(){
    let ID= undefined
       this.matDialog.open(LeaveTypeFormComponent, {
      data: ID,
      height:'auto',
      width:'75%'
    }).afterClosed()
      .subscribe(result => {
        console.log('Result' + result);
        this.ngOnInit();
      })

  }

  edit(ID : any){
    this.matDialog.open(LeaveTypeFormComponent, {
      data: ID,
      height:'auto',
      width:'75%'
    }).afterClosed()
      .subscribe(result => {
        console.log('Result' + result);
        this.ngOnInit();
      })

  }

  public FilterLeave() {
     
    let searchCopy = this.term.toLowerCase();
    this.leavelist = this.leavelistCopy.filter((x: { short: string; description: string; }) =>
      x.short.toLowerCase().includes(searchCopy) || x.description.toLowerCase().includes(searchCopy));
    this.p = 1;
    this.count1 = 10;

    this.loader = false;
  }


  Edit(ID:any) {
    // let ID = ID
    this.matDialog.open(LeaveTypeFormComponent, {
      data: ID,
      height:'auto',
      width: '75%'
    }).afterClosed()
      .subscribe(result => {
        console.log('Result' + result);
        this.ngOnInit();
      });
  }




}
