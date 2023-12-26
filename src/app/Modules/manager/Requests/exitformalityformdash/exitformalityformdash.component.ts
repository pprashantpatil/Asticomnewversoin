import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DigiofficecorehrService } from '../../../../Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-exitformalityformdash',
  templateUrl: './exitformalityformdash.component.html',
  styleUrls: ['./exitformalityformdash.component.css']
})
export class ExitformalityformdashComponent implements OnInit {

  constructor(public DigiofficeService: DigiofficecorehrService, public router: Router) { }
  annnounecemnetlist: any;
  roledid: any;
  loader: any;
  annnounecemnetlist1: any
  viewMode = 'tab1';
  supervisorlist: any;
  currentUrl: any;
  Notes: any;
  roletype: any;
  id2: any;
  lastworkingdate: any;
  ActingManager: any;
  id: any;
  files: File[] = [];
  attachmentsurl: any;
  attachmentsurl1: any;
  files1: File[] = [];
  hrupdateid: any;
  showPopup: number = 0;
  messageId: number = 0;
  roledropdownSettings : any
  roleonItemSelect : any
  ngOnInit(): void {
    debugger
    this.currentUrl = window.location.href;
    this.loader = true;
    this.roledid = localStorage.getItem('roledid');
    this.GetStaffExitFormality();
    this.GetMyDetails();
    this.GetMyDetailsByStaffID();

    this.roledropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 10,
      allowSearchFilter: true,
    };


  }
  search:any;
  EmployeeEmailID: any;
  manageremailid: any
  Staffleaveenitilment: any;
  ManagerName: any;
  public GetMyDetailsByStaffID() {
    this.DigiofficeService.GetMyDetailsByStaffID(localStorage.getItem('staffid'))
      .subscribe({
        next: data => {
          debugger
          this.Staffleaveenitilment = data;
          console.log(" this.Staffleaveenitilment ", this.Staffleaveenitilment)
          this.ManagerName = this.Staffleaveenitilment[0].name;
          this.manageremailid = this.Staffleaveenitilment[0].manageremailid;
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Staff Details');
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

  public GetStaffExitFormality() {
    this.DigiofficeService.GetStaffExitFormality()
      .subscribe({
        next: data => {
          debugger
          if (this.roledid == 6) {
            this.loader = false;
            this.annnounecemnetlist = data.filter(x => x.staffID == localStorage.getItem('staffid') || x.adminclearance != 1 || x.hRclearance != 1 && x.financeclearance != 1 || x.financeclearance != 1 || x.ownclearance != 1);
            this.annnounecemnetlist1 = data.filter(x => x.staffID == localStorage.getItem('staffid') || x.adminclearance == 1 && x.hRclearance == 1 && x.financeclearance == 1 && x.financeclearance == 1 && x.ownclearance == 1)
          }
          else if (this.roledid == 2) {
            this.loader = false;
            this.annnounecemnetlist = data.filter(x => x.supervisor == localStorage.getItem('staffid') && (x.adminclearance != 1 || x.hRclearance != 1 && x.financeclearance != 1 || x.financeclearance != 1 || x.ownclearance != 1) && x.hRclearance == 0
              || ((x.adminclearance == 1 || x.financeclearance == 1 && x.financeclearance == 1 || x.ownclearance != 1) && x.hRclearance == 1));
            this.EmployeeEmailID = this.annnounecemnetlist[0].empEmailID;
            console.log("this.annnounecemnetlist", this.annnounecemnetlist)
            this.annnounecemnetlist1 = data.filter(x => x.supervisor == localStorage.getItem('staffid') && (x.adminclearance == 1 || x.financeclearance == 1 && x.financeclearance == 1 || x.ownclearance == 1) && x.hRclearance == 1);
          }
          else {
            this.loader = false;
            // this.annnounecemnetlist = data.filter(x => x.adminclearance != 1 || x.hRclearance != 1 || x.financeclearance != 1 && x.financeclearance != 1 || x.ownclearance != 1 );
            this.annnounecemnetlist = data.filter(x => (x.adminclearance != 1 || x.financeclearance != 1 && x.financeclearance != 1 || x.ownclearance != 1) && x.hRclearance == 0
              || ((x.adminclearance == 1 || x.financeclearance == 1 && x.financeclearance == 1 || x.ownclearance != 1) && x.hRclearance == 1));
            // this.annnounecemnetlist1 = data.filter(x => x.adminclearance == 1 && x.hRclearance == 1 && x.financeclearance == 1 && x.financeclearance == 1 && x.ownclearance == 1);
            this.annnounecemnetlist1 = data.filter(x => (x.adminclearance == 1 || x.financeclearance == 1 && x.financeclearance == 1 || x.ownclearance == 1) && x.hRclearance == 1);
          }
        }, error: (err) => {
          // Swal.fire('Issue in Getting Staff Exit Formality');
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

  public GetMyDetails() {
    this.DigiofficeService.GetAllStaffNew()
      .subscribe({
        next: data => {
          debugger
          this.supervisorlist = data.filter(x => x.loginType == 2);
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting My Details');
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

  public delete(ID: any) {
    debugger;
    this.showPopup = 0;
    Swal.fire({
      title: 'Delete Record',
      text: 'Are you sure you want to delete it?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        this.DigiofficeService.DeleteStaffExitFormality(ID.id)
          .subscribe({
            next: data => {
              debugger
              /*     Swal.fire('Deleted Successfully') */
              this.loader = false;
              this.showPopup = 1;
              this.loader = 11;
              this.ngOnInit();
              this.loader = false;
            }, error: (err) => {
              // Swal.fire('Issue in Deleting Staff Exit Formality');
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
    })
  }

  public HRClear(list: any) {
    debugger
    this.showPopup = 0;
    var entity = {
      'ID': list.id,
      'type': 'HRclearance'
    }
    this.DigiofficeService.ClearStaffExitFormality(entity)
      .subscribe({
        next: data => {
          debugger
          /*   Swal.fire('Updated Successfully'); */
          this.loader = false;
          this.showPopup = 1;
          this.loader = 10
          this.ngOnInit();
        }, error: (err) => {
          // Swal.fire('Issue in Clearing Staff Exit Formality');
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

  public getmanagerid(list: any) {
    debugger
    this.id2 = list.id,
      this.roletype = list.type
  }

  public OwnClear() {
    debugger
    var entity = {
      'ID': this.id2,
      'type': 'OwnClear'
    }
    this.DigiofficeService.ClearStaffExitFormality(entity)
      .subscribe({
        next: data => {
          debugger
          this.ngOnInit();
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Clearing Staff Exit Formality');
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

  public RetainEmployeee() {
    debugger;
    this.showPopup = 0;
    var entity = {
      'ID': this.id,
      'type': 2
    }
    this.DigiofficeService.RetainEmployeee(entity)
      .subscribe({
        next: data => {
          debugger;
          this.sendemail1();
          /*  Swal.fire('Retained Successfully'); */
          this.loader = false;
          this.showPopup = 1;
          this.loader = 10
          this.ngOnInit();
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Retaining Employee');
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

  public sendemail1() {

    var entity1 = {
      'FromUser': 'Admin',
      'emailto': this.EmployeeEmailID,
      'emailsubject': 'Resignation Rejection Mail',
      'Message': 'Your Resignation Request Reject Successfully !!',
      'emailbody': 'Hi  <br> Your Manager ' + this.ManagerName + ' has Rejected your Resignation in Digi-Office.  <br><br>' + '<br>  <br> Thanks <br> Team Digi-Office',
      'attachmenturl': this.Attactments,
      'cclist': this.EmployeeEmailID,
      'bcclist': this.EmployeeEmailID,
    }
    this.DigiofficeService.sendemailattachementsforemail(entity1)
      .subscribe({
        next: data => {
          debugger
          this.Attactments = [];
          //Swal.fire('Password sent to your email.');
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Sending Attachments For Email');

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

  public lastworkingdate1() {
    debugger
    this.showPopup = 0;
    var entity = {
      'ID': this.id2,
      'lastworkingdate': this.lastworkingdate,
      'ActingManager': this.ActingManager
    }
    this.DigiofficeService.UpdateWorkingDay(entity)
      .subscribe({
        next: data => {
          debugger
          this.OwnClear();
          /*   Swal.fire('Updated Successfully'); */
          this.loader = false;
          this.showPopup = 1;
          this.loader = 10
          this.sendemail();
          this.ngOnInit();
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Updating Working Day');
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

  email: any;
  Attactments: any = [];
  UserName: any;
  public sendemail() {

    var entity1 = {
      'FromUser': 'Admin',
      'emailto': this.EmployeeEmailID,
      'emailsubject': 'Resignation Approval Mail',
      'Message': 'Your Resignation Request Approve Successfully !!',
      'emailbody': 'Hi  <br> Your Manager ' + this.ManagerName + ' has Approved Resignation in Digi-Office.  <br><br>' + '<br>  <br> Thanks <br> Team Digi-Office',
      'attachmenturl': this.Attactments,
      'cclist': this.EmployeeEmailID,
      'bcclist': this.EmployeeEmailID,
    }
    this.DigiofficeService.sendemailattachementsforemail(entity1)
      .subscribe({
        next: data => {
          debugger
          this.Attactments = [];
          //Swal.fire('Password sent to your email.');
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Sending Attachments For Email');

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

  public RetainEmployeee1(list: any) {
    this.id = list.id;
  }

  public AdminClear(list: any) {
    debugger
    this.showPopup = 0;
    var entity = {
      'ID': list.id,
      'type': 'Adminclearance'
    }
    this.DigiofficeService.ClearStaffExitFormality(entity)
      .subscribe({
        next: data => {
          debugger
          /*    Swal.fire('Updated Successfully'); */
          this.loader = false;
          this.showPopup = 1;
          this.loader = 10
          this.ngOnInit();
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Clearing Staff Exit Formality');
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

  public FinanceClear(list: any) {
    debugger
    this.showPopup = 0;
    var entity = {
      'ID': list.id,
      'type': 'Financeclearance'
    }
    this.DigiofficeService.ClearStaffExitFormality(entity)
      .subscribe({
        next: data => {
          debugger
          /*    Swal.fire('Updated Successfully'); */
          this.loader = false;
          this.showPopup = 1;
          this.loader = 10
          this.ngOnInit();
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Clearing Staff Exit Formality');
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

  public LibraryCLear(list: any) {
    debugger
    this.showPopup = 0;
    var entity = {
      'ID': list.id,
      'type': 'LibraryClear'
    }
    this.DigiofficeService.ClearStaffExitFormality(entity)
      .subscribe({
        next: data => {
          debugger
          /* Swal.fire('Updated Successfully'); */
          this.loader = false;
          this.showPopup = 1;
          this.loader = 10
          this.ngOnInit();
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Clearing Staff Exit Formality');
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

  onSelect(event: any) {
    console.log(event);
    debugger
    this.files.push(...event.addedFiles);
    debugger
    this.DigiofficeService.ProjectAttachments(this.files)
      .subscribe({
        next: data => {
          debugger
          this.attachmentsurl = data
        }, error: (err) => {
          // Swal.fire('Issue in Inserting Project Attachments');
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

  onSelect2(event: any) {
    console.log(event);
    debugger
    this.files1.push(...event.addedFiles);
    debugger
    this.DigiofficeService.ProjectAttachments(this.files1)
      .subscribe({
        next: data => {
          debugger
          this.attachmentsurl1 = data
        }, error: (err) => {
          // Swal.fire('Issue in Inserting Project Attachments');
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

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  hrupdate(id: any) {
    this.hrupdateid = id;
  }

  managerupdate(id: any) {
    this.hrupdateid = id;
  }

  public UploadAttachment() {
    debugger
    this.showPopup = 0;
    var entity = {
      "ID": this.hrupdateid,
      "ExperienceLetter": this.attachmentsurl,
      "ReleavingLetter": this.attachmentsurl1
    }
    this.DigiofficeService.UploadAttachment(entity)
      .subscribe({
        next: data => {
          debugger
          var entity = {
            'ID': this.hrupdateid,
            'type': 'HRclearance'
          }
          this.DigiofficeService.ClearStaffExitFormality(entity).subscribe(data => {
            debugger
            this.sendemail;
            /*   Swal.fire('Updated Successfully'); */
            this.loader = false;
            this.showPopup = 1;
            this.loader = 10
            this.ngOnInit();
            this.loader = false;
          })
        }, error: (err) => {
          // Swal.fire('Issue in Uploading Attachment');
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

  L1Manager(item: any) {
    debugger
    console.log(item.id);
    this.ActingManager = item.id;
    this.L1Manager=item.id;
  }


}