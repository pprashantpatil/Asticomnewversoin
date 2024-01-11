import { Component, Inject, OnInit } from '@angular/core';
import { DigiofficecorehrService } from '../../../../Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-leave-type-form',
  templateUrl: './leave-type-form.component.html',
  styleUrls: ['./leave-type-form.component.css']
})
export class LeaveTypeFormComponent implements OnInit {

  
  constructor(public DigiofficeService: DigiofficecorehrService, private activatedroute: ActivatedRoute, public dialogRef: MatDialogRef<LeaveTypeFormComponent>,
    @Inject(MAT_DIALOG_DATA) public ID: any) { }
	  staffID:any
  Pagename:any;
  
  leavelist: any;
  Short: any;
  Description: any;
  currentUrl: any;
  ShortID: any;
  check:any;
  Entitlement_Per_Year: any;
  carry_forward: any;
  DescriptionID: any;

  ngOnInit(): void {
    this.check=0
    this.staffID = localStorage.getItem('staffid')
		this.Pagename = localStorage.getItem('Pagename')
    this.currentUrl = window.location.href;
    this.activatedroute.params.subscribe(params => {
       
      //this.ID = params['id'];
      if (this.ID == undefined) {
        this.Short = "",
          this.Description = ""
      }
      else {

        this.DigiofficeService.GetLeaveType().
          subscribe({
            next: data => {
                
              this.leavelist = data.filter(x => x.id == this.ID);
              this.Short = this.leavelist[0].short
              this.Description = this.leavelist[0].description
              this.Entitlement_Per_Year = this.leavelist[0].entitlement_Per_Year
              this.carry_forward = this.leavelist[0].carry_forward
            }, error: (err) => {
              Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

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
    }
    )
  }

  public InsertLeaveTypeMaster() {
     
    var strgShort = this.Short;
    var FirstCharShort = strgShort.charAt(0);
    if (FirstCharShort == " " || FirstCharShort == '&nbsp;' || FirstCharShort == "" || this.Short == undefined ||
      this.Short == "" || this.Description == undefined || this.Description == "") {
      Swal.fire("Please fill out all mandatory fields");
    }
    else {
      var entity = {
        Short: this.Short,
        Description: this.Description,
        Entitlement_Per_Year: this.Entitlement_Per_Year,
        carry_forward: this.carry_forward

      }
      this.DigiofficeService.InsertLeaveTypeMaster(entity)
        .subscribe({
          next: async data => {
            if (data == 0) {
              Swal.fire("Leave Type Already Exists");
              this.dialogRef.close(false);
            }
            else {
              Swal.fire("Saved Successfully");
          
              this.dialogRef.close(false);
              location.href = "#/HR/LeaveTypeDashboard";
            }
          }, error: (err) => {
            debugger;
            Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');

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
  }


  public UpdateLeaveType() {
     
    if (this.Short == undefined || this.Short == "" || this.Description == undefined || this.Description == "") {
      Swal.fire("Please fill out all mandatory fields");
    }
    else {
      var entity = {
        ID: this.ID,
        Short: this.Short,
        Description: this.Description,
        Entitlement_Per_Year: this.Entitlement_Per_Year,
        carry_forward: this.carry_forward,
        // typeupdate:this.check
      }
      this.DigiofficeService.UpdateLeaveType(entity).
        subscribe({
          next: async data => {
              
            Swal.fire("Updated Successfully");
            this.dialogRef.close(false);
            location.href = "#/HR/LeaveTypeDashboard";
          }, error: (err) => {
           
            Swal.fire('There is an issue executing your action. Please raise a Support Ticket.');
            debugger;
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
  }
  cancel() {
    location.href = "#/HR/LeaveTypeDashboard";
    this.dialogRef.close(false);
  }


  public ShortValidation(event: any) {
    this.ShortID = event.target.value;
    var strgShort = this.Short;
    var FirstCharShort = strgShort.charAt(0);

    if (FirstCharShort == " " || FirstCharShort == '&nbsp;' || FirstCharShort == "") {
      Swal.fire('Space is not allowed');
      this.Short == ""
    }
   this.check=1;
  }

  public DescriptionValidation(event: any) {
    this.DescriptionID = event.target.value;

    var strgDesc = this.Description;
    var FirstCharDesc = strgDesc.charAt(0);

    if (FirstCharDesc == " " || FirstCharDesc == '&nbsp;' || FirstCharDesc == "") {
      Swal.fire('Space is not allowed');
      this.Description = "";
    }
  }



  




}
