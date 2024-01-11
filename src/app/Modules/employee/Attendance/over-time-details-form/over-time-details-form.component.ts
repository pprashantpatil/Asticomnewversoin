import { Component, Inject, OnInit } from '@angular/core';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { OverTimeDetailsDashComponent } from '../over-time-details-dash/over-time-details-dash.component';

@Component({
  selector: 'app-over-time-details-form',
  templateUrl: './over-time-details-form.component.html',
  styleUrls: ['./over-time-details-form.component.css'],
})
export class OverTimeDetailsFormComponent implements OnInit {
  loader: any;
  constructor(public DigiofficeService: DigiofficecorehrService, public router: Router, public Datepipe: DatePipe,public dialogRef: MatDialogRef<OverTimeDetailsDashComponent>) { }
  TransportationType: any;
  Date: any;
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any = {};
  StaffID: any;
  OTlist: any;
  result: any;
  AutoApproval: any;
  ManualApply: any;
  starttime: any;
  endtime: any;
  maxdate: any;
  shiftID: any;
  Shift: any;
  showbtn: any;

  currentUrl: any;
  Supervisor: any;
  Name: any;
  Project: any;
  Destination: any;
  Purpose: any;
  ContactPerson: any;
  ContactPhNo: any;
  TimeOfDeparture: any;
  TimeOfReturn: any;
  noofhours: any;
  Comments: any;
  type: any;
  day: any
  duration1: any;
  minutes: any;
  hours: any;
  endtime1: any;
  starttime1: any;
  a: any;
  b: any;
  d: any;
  ot: any;
  nightot: any;
  nightothous: any;
  ExccessNormalOt: any;
  NormalOT: any;
  NightOt: any;
  ExccessNightOt: any;
  NSD_REGULAR: any;
  RestNightOt: any;
  RestNormalOT: any;
  ExccessRestNormalOt: any;
  RestExccessNightOt: any;
  LegalNightOt: any;
  LegalNormalOT: any;
  LegalExccessNormalOt: any;
  LegalExccessNightOt: any;
  SpecialHoliday: any;
  SpecialNightOt: any;
  SpecialNormalOT: any;
  SpecialExccessNormalOt: any;
  SpecialExccessNightOt: any;
  SpecialRestNightOt: any;
  SpecialRestNormalOT: any;
  SpecialRestExccessNormalOt: any;
  SpecialRestExccessNightOt: any;
  LegalRestNightOt: any;
  LegalRestNormalOT: any;
  LegalExccessRestNormalOt: any;
  LegalExccessRestNightOt: any;
  public attachments21: any = [];
  public attachments: any = [];
  public attachmentsurl: any = [];
  showSpinners: any;
  showPopup: number = 0;
  messageId: number = 0;
  showdetails: any;
  ngOnInit(): void {

    this.showSpinners = false;
    this.currentUrl = window.location.href;
    this.showdetails = false;
    // this.loader = true;
    this.day = "";
    this.showbtn = true;
    // this.Shift = localStorage.getItem('shiftID');
    // if (this.Shift == undefined || this.Shift == null) {
    //   this.Shift = 1;
    // }
    this.maxdate = new Date().toISOString().split("T")[0];
    this.type = "";
    this.StaffID = localStorage.getItem('staffid');
    this.GetOTRates();
    this.GetOtConfiguration();
  }

  public GetOTRates() {
    this.loader = true;
    this.DigiofficeService.GetOTRates()
      .subscribe({
        next: data => {
          debugger
          this.OTlist = data;
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting OT Rates');
          // this.loader = false;
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

  public GetOtConfiguration() {
    this.loader = true;
    this.DigiofficeService.GetOtConfiguration()
      .subscribe({
        next: data => {
          debugger
          this.loader = false;
          this.result = data;
          this.AutoApproval = this.result[0].approvalStatus;
          this.ManualApply = this.result[0].manualApply;
        }, error: (err) => {
          // Swal.fire('Issue in Getting OT Configuration');
          // this.loader = false;
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

  public addMinutes(time: any/*"hh:mm"*/, minsToAdd: string | number/*"N"*/) {
    function z(n: number) {
      return (n < 10 ? '0' : '') + n;
    }
    var bits = time.split(':');
    var mins = bits[0] * 60 + (+bits[1]) + (+minsToAdd);
    return z(mins % (24 * 60) / 60 | 0) + ':' + z(mins % 60);
  }

  ChangeTime() {
    var d = new Date(this.starttime);
    var hours = d.getHours();
    var minutes = Math.round(d.getMinutes());
    var ampm = hours >= 12 ? 'PM' : 'AM';
    var Time = hours + ':' + minutes;

  }

  onRemove21(event: any) {
    debugger
    console.log(event);
    this.attachments21.splice(this.attachments.indexOf(event), 1);
  }

  onSelect21(event: any) {
    debugger
    this.showPopup = 0;
    console.log(event);
    if (event.addedFiles[0].size / 1048576 > 2) {
      /* Swal.fire('Please Upload File Less than 2 MB.') */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 14;
    } else {
      this.attachments21 = [];
      this.attachments21.push(...event.addedFiles);
      for (let i = 0; i < this.attachments21.length; i++) {
        this.DigiofficeService.ProjectAttachmentsbyuseridforovertime(this.attachments21[i],localStorage.getItem('EmployeeID'))
          .subscribe({
            next: data => {
              debugger
              if (data != undefined) {
                this.attachmentsurl.push(data);
                this.loader = false;
              }
            }, error: (err) => {
              // Swal.fire('Issue in Inserting Project Attachments');
              // this.loader = false;
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
  }

  public Save() {
    debugger
    this.loader = true;
    this.DigiofficeService.ProjectAttachmentsbyuseridforovertime(this.attachments21,localStorage.getItem('EmployeeID'))
      .subscribe({
        next: data => {
          debugger
          this.attachmentsurl.push(data);
          this.attachments.length = 0;
          this.InsertStaffOverTimeDetails();
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Inserting Project Attachments');
          // this.loader = false;
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


  public checkstartdate() {
    debugger
    this.showPopup = 0;
    this.updatedstarttime = this.add_leading0(this.starttime.getHours()) + ':' + this.add_leading0(this.starttime.getMinutes());
    let date = new Date(this.Date);
    let dayname = date.toLocaleDateString('en-US', { weekday: 'long' });
    if (this.Date == undefined || this.Date == null) {
      /* Swal.fire("Please Select the Date Before adding Start Time"); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 15;
      this.starttime = "";
    }
    this.DigiofficeService.GetHolidaybit(this.Date, this.StaffID).subscribe(data1 => {
      let temp1: any = data1.filter(x => x.filterdate == this.Date);
      if (temp1?.length > 0) {

      } else {
        this.DigiofficeService.GetStaffShiftDetailsByStaffID(localStorage.getItem('staffid'))
          .subscribe({
            next: data => {
              debugger
              let temp = data.filter(x => (x.filterenddate >= this.Date && x.filterdate <= this.Date) && x.approve == 1);
              if (temp.length == 0) {
                /*   Swal.fire('Please Add shift and Get Approved From your Manager Before Applying OT for this date.') */
                this.loader = false;
                this.showPopup = 1;
                this.messageId = 17;
              } else {
                if (temp[0].restDays.includes(dayname) == true) {

                } else {
                  if (this.updatedstarttime < temp[0].shifendtime) {
                    /*   Swal.fire('OT Start time must be greater than Shift End time'); */
                    this.loader = false;
                    this.showPopup = 1;
                    this.messageId = 25;
                    this.showbtn = false;
                    this.loader = false;
                    this.starttime = '';
                  }
                }

                this.Shift = temp[0].shiftType;
                if (this.Shift == undefined || this.Shift == null) {
                  this.Shift = 1;
                  this.loader = false;
                }
              }

              this.loader = false;
            }, error: (err) => {

            }
          })
      }
    })


  }

  ismeridian = true;

  mytime: Date = new Date();
  updatedendtime: any;
  updatedstarttime: any;
  toggleMode(): void {
    this.ismeridian = !this.ismeridian;
  }
  // public duration() {
  //   debugger;
  //   this.showPopup = 0;
  //   this.updatedendtime = this.add_leading0(this.endtime.getHours()) + ':' + this.add_leading0(this.endtime.getMinutes());
  //   this.showbtn = true;

  //   if (this.Date == undefined || this.Date == null) {
  //     /* Swal.fire("Please Select the Date Before adding End Time"); */
  //     this.loader = false;
  //     this.showPopup = 1;
  //     this.messageId = 16;
  //     this.endtime = "";
  //   }
  //   this.DigiofficeService.GetHolidaybit(this.Date, this.StaffID).subscribe(data1 => {
  //     let temp1: any = data1.filter(x => x.filterdate = this.Date);

  //     if (temp1[0].legalHoliday > 0 || temp1[0].restday > 0 || temp1[0].specialHoliday > 0) {
  //       this.DigiofficeService.GetStaffShiftDetails()
  //         .subscribe({
  //           next: data => {
  //             debugger

  //             let temp = data.filter(x => x.staffID == localStorage.getItem('staffid') && (x.filterenddate >= this.Date && x.filterdate <= this.Date) && x.approve == 1);
  //             if (temp.length == 0) {
  //               /* Swal.fire('Please Add shift and Get Approved From your Manager Before Applying OT for this date.') */
  //               this.loader = false;
  //               this.showPopup = 1;
  //               this.messageId = 17;
  //             } else {

  //               this.Shift = temp[0].shiftType;

  //               if (this.Shift == undefined || this.Shift == null) {
  //                 this.Shift = 1;
  //                 this.loader = false;


  //               }

  //               this.DigiofficeService.GetAttendanceByEmployeeID(this.StaffID, this.Date, this.Date)
  //                 .subscribe({
  //                   next: data => {
  //                     debugger
  //                     let temp: any = data.filter(x => x.filterdate == this.Date && x.userID == localStorage.getItem('staffid'));
  //                     var newdate = new Date();
  //                     const theDate = new Date(this.Date);
  //                     var day = 60 * 60 * 24 * 1000;
  //                     var endDate = new Date(theDate.getTime() + day);
  //                     var tomotrwdate = this.Datepipe.transform(endDate, 'yyyy-MM-dd');
  //                     let temp1: any = data.filter(x => x.filterdate == tomotrwdate && x.userID == localStorage.getItem('staffid'));

  //                     if (temp.length == 0) {
  //                       /*  Swal.fire('You have not worked on this day. So Cant Apply Ot'); */
  //                       this.loader = false;
  //                       this.showPopup = 1;
  //                       this.messageId = 18;
  //                       this.showbtn = false;
  //                       this.showdetails = false;
  //                     }


  //                     // if (this.starttime < temp1[0].stime && this.Shift == 2) {
  //                     //   Swal.fire('Start  time must be greater  than Sign IN time');
  //                     //   this.showbtn = false;
  //                     //   this.loader = false;
  //                     // }
  //                     this.updatedstarttime = this.starttime.getHours() + ':' + this.starttime.getMinutes()
  //                     this.updatedendtime = this.add_leading0(this.endtime.getHours()) + ':' + this.add_leading0(this.endtime.getMinutes());

  //                     if (this.updatedendtime > temp[0].etime) {
  //                       /*   Swal.fire('Endtime time must be less than sign out time'); */
  //                       this.loader = false;
  //                       this.showPopup = 1;
  //                       this.messageId = 19;
  //                       this.showbtn = false;
  //                       this.showdetails = false;
  //                       this.loader = false;
  //                     }
  //                     if (temp[0].webSignoutDate == null || temp[0].webSignoutDate == undefined) {
  //                       /*   Swal.fire('You can not Apply Overtime as you are not Punched Out on this day'); */
  //                       this.loader = false;
  //                       this.showPopup = 1;
  //                       this.messageId = 20;
  //                       this.showbtn = false;
  //                       this.showdetails = false;
  //                       this.loader = false;
  //                     }

  //                     // if (temp[0].undertime == "Yes") {
  //                     //   Swal.fire('You can not Apply Overtime as you are undertime on this Day');
  //                     //   this.showbtn = false;
  //                     //   this.loader = false;
  //                     // }

  //                     if( this.showbtn != false){
  //                       this.DigiofficeService.GetOtNightOt(this.updatedstarttime, this.updatedendtime, this.Shift, this.StaffID, this.Date)
  //                       .subscribe({
  //                         next: data => {
  //                           debugger
  //                           this.loader = true;
  //                           let temp: any = data;
  //                           this.ot = temp[0].normalOT == null ? 0 : temp[0].normalOT + ' Hours',
  //                             this.nightot = temp[0].nightOt == null ? 0 : temp[0].nightOt + ' Hours',

  //                             this.noofhours = temp[0].normalOT == null ? 0 : temp[0].normalOT,
  //                             this.nightothous = temp[0].nightOt == null ? 0 : temp[0].nightOt,
  //                             this.ExccessNormalOt = temp[0].exccess8NormalOt == null ? 0 : temp[0].exccess8NormalOt,
  //                             this.ExccessNightOt = temp[0].exccess8NightOt == null ? 0 : temp[0].exccess8NightOt,
  //                             this.NSD_REGULAR = temp[0].nsD_REGULAR == null ? 0 : temp[0].nsD_REGULAR,
  //                             this.RestNightOt = temp[0].restNightOt == null ? 0 : temp[0].restNightOt,
  //                             this.RestNormalOT = temp[0].restNormalOT == null ? 0 : temp[0].restNormalOT,
  //                             this.ExccessRestNormalOt = temp[0].exccessRestNormalOt == null ? 0 : temp[0].exccessRestNormalOt,
  //                             this.RestExccessNightOt = temp[0].restExccessNightOt == null ? 0 : temp[0].restExccessNightOt,
  //                             this.LegalNightOt = temp[0].legalNightOt == null ? 0 : temp[0].legalNightOt,
  //                             this.LegalNormalOT = temp[0].legalNormalOT == null ? 0 : temp[0].legalNormalOT,
  //                             this.LegalExccessNormalOt = temp[0].legalExccessNormalOt == null ? 0 : temp[0].legalExccessNormalOt,
  //                             this.LegalExccessNightOt = temp[0].legalExccessNightOt == null ? 0 : temp[0].legalExccessNightOt,
  //                             this.SpecialHoliday = temp[0].specialHoliday == null ? 0 : temp[0].specialHoliday,
  //                             this.SpecialNightOt = temp[0].specialNightOt == null ? 0 : temp[0].specialNightOt,
  //                             this.SpecialNormalOT = temp[0].specialNormalOT == null ? 0 : temp[0].specialNormalOT,
  //                             this.SpecialExccessNormalOt = temp[0].specialExccessNormalOt == null ? 0 : temp[0].specialExccessNormalOt,
  //                             this.SpecialExccessNightOt = temp[0].specialExccessNightOt == null ? 0 : temp[0].specialExccessNightOt,
  //                             this.SpecialRestNightOt = temp[0].specialRestNightOt == null ? 0 : temp[0].specialRestNightOt,
  //                             this.SpecialRestNormalOT = temp[0].specialRestNormalOT == null ? 0 : temp[0].specialRestNormalOT,
  //                             this.SpecialRestExccessNormalOt = temp[0].specialRestExccessNormalOt == null ? 0 : temp[0].specialRestExccessNormalOt,
  //                             this.SpecialRestExccessNightOt = temp[0].specialRestExccessNightOt == null ? 0 : temp[0].specialRestExccessNightOt,
  //                             this.LegalRestNightOt = temp[0].legalRestNightOt == null ? 0 : temp[0].legalRestNightOt,
  //                             this.LegalRestNormalOT = temp[0].legalRestNormalOT == null ? 0 : temp[0].legalRestNormalOT,
  //                             this.LegalExccessRestNormalOt = temp[0].legalExccessRestNormalOt == null ? 0 : temp[0].legalExccessRestNormalOt,
  //                             this.LegalExccessRestNightOt = temp[0].legalExccessRestNightOt == null ? 0 : temp[0].legalExccessRestNightOt;
  //                           this.loader = false;
  //                           Swal.fire('Please Check All OT Details Before Submitting');
  //                           this.showdetails = true;
  //                         }, error: (err) => {

  //                           this.loader = false;
  //                           //Swal.fire('Issue in Getting OT Night OT');
  //                           // Insert error in Db Here//
  //                           var obj = {
  //                             'PageName': this.currentUrl,
  //                             'ErrorMessage': err.error.message
  //                           }
  //                           this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
  //                             data => {
  //                               debugger
  //                             },
  //                           )
  //                         }
  //                       })
  //                     this.loader = false;
  //                     }



  //                   }, error: (err) => {
  //                     // Swal.fire('Issue in Getting Attendance');
  //                     // this.loader = false;
  //                     // Insert error in Db Here//
  //                     var obj = {
  //                       'PageName': this.currentUrl,
  //                       'ErrorMessage': err.error.message

  //                     }
  //                     this.loader = false;
  //                     this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
  //                       data => {
  //                         debugger
  //                       },
  //                     )
  //                   }
  //                 })
  //             }


  //           }
  //         })

  //     } else {
  //       let date = new Date(this.Date);
  //       let dayname = date.toLocaleDateString('en-US', { weekday: 'long' });
  //       this.DigiofficeService.GetStaffShiftDetails()
  //         .subscribe({
  //           next: data => {
  //             debugger

  //             let temp5 = data.filter(x => x.staffID == localStorage.getItem('staffid') && (x.filterenddate >= this.Date && x.filterdate <= this.Date) && x.approve == 1);
  //             if (temp5.length == 0) {
  //               /*          Swal.fire('Please Add shift and Get Approved From your Manager Before Applying OT for this date.') */
  //               this.loader = false;
  //               this.showPopup = 1;
  //               this.messageId = 21;
  //             } else {
  //               this.Shift = temp5[0].shiftType;
  //               if (this.Shift == undefined || this.Shift == null) {
  //                 this.Shift = 1;
  //                 this.loader = false;


  //               }

  //               this.DigiofficeService.GetAttendanceByEmployeeID(this.StaffID, this.Date, this.Date)
  //                 .subscribe({
  //                   next: data => {
  //                     debugger
  //                     let temp: any = data.filter(x => x.filterdate == this.Date && x.userID == localStorage.getItem('staffid'));
  //                     var newdate = new Date();
  //                     const theDate = new Date(this.Date);
  //                     var day = 60 * 60 * 24 * 1000;
  //                     var endDate = new Date(theDate.getTime() + day);
  //                     var tomotrwdate = this.Datepipe.transform(endDate, 'yyyy-MM-dd');
  //                     let temp1: any = data.filter(x => x.filterdate == tomotrwdate && x.userID == localStorage.getItem('staffid'));

  //                     if (temp.length == 0) {
  //                       /*  Swal.fire('You have not worked on this day. So Cant Apply Ot'); */
  //                       this.loader = false;
  //                       this.showPopup = 1;
  //                       this.messageId = 18;
  //                       this.showbtn = false;
  //                       this.showdetails = false;
  //                       this.loader = false;
  //                     }

  //                     if (this.starttime < temp[0].endtime && this.Shift == 1) {
  //                       /*  Swal.fire('OT Start  time must be greater  than Punch Out time'); */
  //                       this.loader = false;
  //                       this.showPopup = 1;
  //                       this.messageId = 22;
  //                       this.showbtn = false;
  //                       this.showdetails = false;
  //                       this.loader = false;
  //                     }
  //                     if (temp5[0].restdays.includes(dayname) == true) {

  //                     } else {
  //                       if (temp[0].minutesdiff < 480 && temp[0].minutesdiff > 0) {
  //                         /*  Swal.fire('You have not worked 8 hours on this date. So Cant Apply Ot'); */
  //                         this.loader = false;
  //                         this.showPopup = 1;
  //                         this.messageId = 23;
  //                         this.showbtn = false;
  //                         this.showdetails = false;
  //                         this.loader = false;
  //                       }
  //                       if (temp[0].mlate > 240) {
  //                         /*  Swal.fire('You are late more than half day  on this date. So Cant Apply Ot'); */
  //                         this.loader = false;
  //                         this.showPopup = 1;
  //                         this.messageId = 211;
  //                         this.showbtn = false;
  //                         this.showdetails = false;
  //                         this.loader = false;
  //                       }
  //                     }

  //                     // if (this.starttime < temp1[0].stime && this.Shift == 2) {
  //                     //   Swal.fire('Start  time must be greater  than Sign IN time');
  //                     //   this.showbtn = false;
  //                     //   this.loader = false;
  //                     // }
  //                     this.updatedstarttime = this.starttime.getHours() + ':' + this.starttime.getMinutes()
  //                     this.updatedendtime = this.add_leading0(this.endtime.getHours()) + ':' + this.add_leading0(this.endtime.getMinutes());
  //                     if (this.updatedendtime > temp[0].etime) {
  //                       /* Swal.fire('Endtime time must be less than sign out time'); */
  //                       this.loader = false;
  //                       this.showPopup = 1;
  //                       this.messageId = 19;
  //                       this.showbtn = false;
  //                       this.showdetails = false;
  //                       this.loader = false;
  //                     }
  //                     if (temp[0].webSignoutDate == null || temp[0].webSignoutDate == undefined) {
  //                       /*  Swal.fire('You can not Apply Overtime as you are not Punched Out on this day'); */
  //                       this.loader = false;
  //                       this.showPopup = 1;
  //                       this.messageId = 20;
  //                       this.showbtn = false;
  //                       this.showdetails = false;
  //                       this.loader = false;
  //                     }

  //                     // if (temp[0].undertime == "Yes") {
  //                     //   Swal.fire('You can not Apply Overtime as you are undertime on this Day');
  //                     //   this.showbtn = false;
  //                     //   this.loader = false;
  //                     // }


  //                     if (temp.length == 1) {
  //                       if (temp[0].undertime == "Yes" && this.overnight != 1) {
  //                         /* Swal.fire('You can not Apply Overtime as you are undertime on this Day'); */
  //                         this.loader = false;
  //                         this.showPopup = 1;
  //                         this.messageId = 24;
  //                         this.showbtn = false;
  //                         this.showdetails = false;
  //                       }
  //                     }
  //                     if(this.showbtn != false){
  //                       this.DigiofficeService.GetOtNightOt(this.updatedstarttime, this.updatedendtime, this.Shift, this.StaffID, this.Date)
  //                       .subscribe({
  //                         next: data => {
  //                           debugger
  //                           this.loader = true;
  //                           let temp: any = data;
  //                           console.log(temp);
  //                           this.ot = parseFloat(temp[0].normalOT) + parseFloat(temp[0].restNormalOT) + parseFloat(temp[0].legalNormalOT) + parseFloat(temp[0].specialNormalOT) + parseFloat(temp[0].specialRestNormalOT) + parseFloat(temp[0].legalRestNormalOT) + ' Hours',
  //                             this.nightot = parseFloat(temp[0].nightOt) + parseFloat(temp[0].restNightOt) + parseFloat(temp[0].legalNightOt) + parseFloat(temp[0].specialNightOt) + parseFloat(temp[0].specialRestNightOt) + parseFloat(temp[0].legalRestNightOt) + ' Hours',
  //                             this.noofhours = temp[0].normalOT == null ? 0 : temp[0].normalOT,
  //                             this.nightothous = temp[0].nightOt == null ? 0 : temp[0].nightOt,
  //                             this.ExccessNormalOt = temp[0].exccess8NormalOt == null ? 0 : temp[0].exccess8NormalOt,
  //                             this.ExccessNightOt = temp[0].exccess8NightOt == null ? 0 : temp[0].exccess8NightOt,
  //                             this.NSD_REGULAR = temp[0].nsD_REGULAR == null ? 0 : temp[0].nsD_REGULAR,
  //                             this.RestNightOt = temp[0].restNightOt == null ? 0 : temp[0].restNightOt,
  //                             this.RestNormalOT = temp[0].restNormalOT == null ? 0 : temp[0].restNormalOT,
  //                             this.ExccessRestNormalOt = temp[0].exccessRestNormalOt == null ? 0 : temp[0].exccessRestNormalOt,
  //                             this.RestExccessNightOt = temp[0].restExccessNightOt == null ? 0 : temp[0].restExccessNightOt,
  //                             this.LegalNightOt = temp[0].legalNightOt == null ? 0 : temp[0].legalNightOt,
  //                             this.LegalNormalOT = temp[0].legalNormalOT == null ? 0 : temp[0].legalNormalOT,
  //                             this.LegalExccessNormalOt = temp[0].legalExccessNormalOt == null ? 0 : temp[0].legalExccessNormalOt,
  //                             this.LegalExccessNightOt = temp[0].legalExccessNightOt == null ? 0 : temp[0].legalExccessNightOt,
  //                             this.SpecialHoliday = temp[0].specialHoliday == null ? 0 : temp[0].specialHoliday,
  //                             this.SpecialNightOt = temp[0].specialNightOt == null ? 0 : temp[0].specialNightOt,
  //                             this.SpecialNormalOT = temp[0].specialNormalOT == null ? 0 : temp[0].specialNormalOT,
  //                             this.SpecialExccessNormalOt = temp[0].specialExccessNormalOt == null ? 0 : temp[0].specialExccessNormalOt,
  //                             this.SpecialExccessNightOt = temp[0].specialExccessNightOt == null ? 0 : temp[0].specialExccessNightOt,
  //                             this.SpecialRestNightOt = temp[0].specialRestNightOt == null ? 0 : temp[0].specialRestNightOt,
  //                             this.SpecialRestNormalOT = temp[0].specialRestNormalOT == null ? 0 : temp[0].specialRestNormalOT,
  //                             this.SpecialRestExccessNormalOt = temp[0].specialRestExccessNormalOt == null ? 0 : temp[0].specialRestExccessNormalOt,
  //                             this.SpecialRestExccessNightOt = temp[0].specialRestExccessNightOt == null ? 0 : temp[0].specialRestExccessNightOt,
  //                             this.LegalRestNightOt = temp[0].legalRestNightOt == null ? 0 : temp[0].legalRestNightOt,
  //                             this.LegalRestNormalOT = temp[0].legalRestNormalOT == null ? 0 : temp[0].legalRestNormalOT,
  //                             this.LegalExccessRestNormalOt = temp[0].legalExccessRestNormalOt == null ? 0 : temp[0].legalExccessRestNormalOt,
  //                             this.LegalExccessRestNightOt = temp[0].legalExccessRestNightOt == null ? 0 : temp[0].legalExccessRestNightOt;
  //                           this.loader = false;
  //                           Swal.fire('Please Check All OT Details Before Submitting');
  //                           this.showdetails = true;
  //                         }, error: (err) => {
  //                           //Swal.fire('Issue in Getting OT Night OT');
  //                           // Insert error in Db Here//
  //                           var obj = {
  //                             'PageName': this.currentUrl,
  //                             'ErrorMessage': err.error.message
  //                           }
  //                           this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
  //                             data => {
  //                               debugger
  //                             },
  //                           )
  //                         }
  //                       })
  //                     this.loader = false;
  //                     }


  //                   }, error: (err) => {
  //                     // Swal.fire('Issue in Getting Attendance');
  //                     // this.loader = false;
  //                     // Insert error in Db Here//
  //                     var obj = {
  //                       'PageName': this.currentUrl,
  //                       'ErrorMessage': err.error.message
  //                     }
  //                     this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
  //                       data => {
  //                         debugger
  //                       },
  //                     )
  //                   }
  //                 })
  //             }


  //           }
  //         })
  //     }

  //   })



  // }
  public duration() {
    debugger;
    this.updatedstarttime = this.starttime.getHours() + ':' + this.starttime.getMinutes();
    let date = new Date(this.Date);
    let dayname = date.toLocaleDateString('en-US', { weekday: 'long' });
    this.updatedendtime = this.add_leading0(this.endtime.getHours()) + ':' + this.add_leading0(this.endtime.getMinutes());
    if (((this.endtime - this.starttime) / 60000) < 60 && (this.endtime - this.starttime) > 0) {
      Swal.fire('Overtime Should be minimum of 1 Hour');
      // console.log('diff', this.endtime - this.starttime);
      this.loader = false;
      this.showbtn = false;
      this.showdetails = false;

    }
    else {
      //console.log('diff', this.endtime - this.starttime);
      this.showPopup = 0;
      this.updatedendtime = this.add_leading0(this.endtime.getHours()) + ':' + this.add_leading0(this.endtime.getMinutes());
      this.showbtn = true;

      if (this.Date == undefined || this.Date == null) {
        /* Swal.fire("Please Select the Date Before adding End Time"); */
        this.loader = false;
        this.showPopup = 1;
        this.messageId = 16;
        this.endtime = "";
      }
      this.DigiofficeService.GetHolidaybit(this.Date, this.StaffID).subscribe(data1 => {
        let temp1: any = data1.filter(x => x.filterdate == this.Date);

        if (temp1?.length > 0) {
          this.DigiofficeService.GetStaffShiftDetailsByStaffID(localStorage.getItem('staffid'))
            .subscribe({
              next: data => {
                debugger
                let temp = data.filter(x => (x.filterenddate >= this.Date && x.filterdate <= this.Date) && x.approve == 1);
                if (temp.length == 0) {
                  /* Swal.fire('Please Add shift and Get Approved From your Manager Before Applying OT for this date.') */
                  this.loader = false;
                  this.showPopup = 1;
                  this.messageId = 17;
                } else {



                  this.Shift = temp[0].shiftType;

                  if (this.Shift == undefined || this.Shift == null) {
                    this.Shift = 1;
                    this.loader = false;


                  }

                  this.DigiofficeService.GetAttendanceByEmployeeID(this.StaffID, this.Date, this.Date)
                    .subscribe({
                      next: data => {
                        debugger
                        let temp: any = data.filter(x => x.filterdate == this.Date && x.userID == localStorage.getItem('staffid'));
                        var newdate = new Date();
                        const theDate = new Date(this.Date);
                        var day = 60 * 60 * 24 * 1000;
                        var endDate = new Date(theDate.getTime() + day);
                        var tomotrwdate = this.Datepipe.transform(endDate, 'yyyy-MM-dd');
                        let temp1: any = data.filter(x => x.filterdate == tomotrwdate && x.userID == localStorage.getItem('staffid'));

                        if (temp.length == 0) {
                          /*  Swal.fire('You have not worked on this day. So Cant Apply Ot'); */
                          this.loader = false;
                          this.showPopup = 1;
                          this.messageId = 18;
                          this.showbtn = false;
                          this.showdetails = false;
                        }


                        // if (this.starttime < temp1[0].stime && this.Shift == 2) {
                        //   Swal.fire('Start  time must be greater  than Sign IN time');
                        //   this.showbtn = false;
                        //   this.loader = false;
                        // }
                        this.updatedstarttime = this.starttime.getHours() + ':' + this.starttime.getMinutes()
                        this.updatedendtime = this.add_leading0(this.endtime.getHours()) + ':' + this.add_leading0(this.endtime.getMinutes());

                        if (this.updatedendtime > temp[0].etime) {
                          /*   Swal.fire('Endtime time must be less than sign out time'); */
                          this.loader = false;
                          this.showPopup = 1;
                          this.messageId = 19;
                          this.showbtn = false;
                          this.showdetails = false;
                          this.loader = false;
                        }
                        if (temp[0].webSignoutDate == null || temp[0].webSignoutDate == undefined) {
                          /*   Swal.fire('You can not Apply Overtime as you are not Punched Out on this day'); */
                          this.loader = false;
                          this.showPopup = 1;
                          this.messageId = 20;
                          this.showbtn = false;
                          this.showdetails = false;
                          this.loader = false;
                        }

                        // if (temp[0].undertime == "Yes") {
                        //   Swal.fire('You can not Apply Overtime as you are undertime on this Day');
                        //   this.showbtn = false;
                        //   this.loader = false;
                        // }

                        if (this.showbtn != false) {
                          this.DigiofficeService.GetOtNightOt(this.updatedstarttime, this.updatedendtime, this.Shift, this.StaffID, this.Date)
                            .subscribe({
                              next: data => {
                                debugger
                                this.loader = true;
                                let temp: any = data;
                                this.ot = temp[0].normalOT == null ? 0 : temp[0].normalOT + ' Hours',
                                  this.nightot = temp[0].nightOt == null ? 0 : temp[0].nightOt + ' Hours',

                                  this.noofhours = temp[0].normalOT == null ? 0 : temp[0].normalOT,
                                  this.nightothous = temp[0].nightOt == null ? 0 : temp[0].nightOt,
                                  this.ExccessNormalOt = temp[0].exccess8NormalOt == null ? 0 : temp[0].exccess8NormalOt,
                                  this.ExccessNightOt = temp[0].exccess8NightOt == null ? 0 : temp[0].exccess8NightOt,
                                  this.NSD_REGULAR = temp[0].nsD_REGULAR == null ? 0 : temp[0].nsD_REGULAR,
                                  this.RestNightOt = temp[0].restNightOt == null ? 0 : temp[0].restNightOt,
                                  this.RestNormalOT = temp[0].restNormalOT == null ? 0 : temp[0].restNormalOT,
                                  this.ExccessRestNormalOt = temp[0].exccessRestNormalOt == null ? 0 : temp[0].exccessRestNormalOt,
                                  this.RestExccessNightOt = temp[0].restExccessNightOt == null ? 0 : temp[0].restExccessNightOt,
                                  this.LegalNightOt = temp[0].legalNightOt == null ? 0 : temp[0].legalNightOt,
                                  this.LegalNormalOT = temp[0].legalNormalOT == null ? 0 : temp[0].legalNormalOT,
                                  this.LegalExccessNormalOt = temp[0].legalExccessNormalOt == null ? 0 : temp[0].legalExccessNormalOt,
                                  this.LegalExccessNightOt = temp[0].legalExccessNightOt == null ? 0 : temp[0].legalExccessNightOt,
                                  this.SpecialHoliday = temp[0].specialHoliday == null ? 0 : temp[0].specialHoliday,
                                  this.SpecialNightOt = temp[0].specialNightOt == null ? 0 : temp[0].specialNightOt,
                                  this.SpecialNormalOT = temp[0].specialNormalOT == null ? 0 : temp[0].specialNormalOT,
                                  this.SpecialExccessNormalOt = temp[0].specialExccessNormalOt == null ? 0 : temp[0].specialExccessNormalOt,
                                  this.SpecialExccessNightOt = temp[0].specialExccessNightOt == null ? 0 : temp[0].specialExccessNightOt,
                                  this.SpecialRestNightOt = temp[0].specialRestNightOt == null ? 0 : temp[0].specialRestNightOt,
                                  this.SpecialRestNormalOT = temp[0].specialRestNormalOT == null ? 0 : temp[0].specialRestNormalOT,
                                  this.SpecialRestExccessNormalOt = temp[0].specialRestExccessNormalOt == null ? 0 : temp[0].specialRestExccessNormalOt,
                                  this.SpecialRestExccessNightOt = temp[0].specialRestExccessNightOt == null ? 0 : temp[0].specialRestExccessNightOt,
                                  this.LegalRestNightOt = temp[0].legalRestNightOt == null ? 0 : temp[0].legalRestNightOt,
                                  this.LegalRestNormalOT = temp[0].legalRestNormalOT == null ? 0 : temp[0].legalRestNormalOT,
                                  this.LegalExccessRestNormalOt = temp[0].legalExccessRestNormalOt == null ? 0 : temp[0].legalExccessRestNormalOt,
                                  this.LegalExccessRestNightOt = temp[0].legalExccessRestNightOt == null ? 0 : temp[0].legalExccessRestNightOt;
                                this.loader = false;
                                Swal.fire('Please Check All OT Details Before Submitting');
                                this.showdetails = true;
                              }, error: (err) => {

                                this.loader = false;
                                //Swal.fire('Issue in Getting OT Night OT');
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
                          this.loader = false;
                        }



                      }, error: (err) => {
                        // Swal.fire('Issue in Getting Attendance');
                        // this.loader = false;
                        // Insert error in Db Here//
                        var obj = {
                          'PageName': this.currentUrl,
                          'ErrorMessage': err.error.message

                        }
                        this.loader = false;
                        this.DigiofficeService.InsertExceptionLogs(obj).subscribe(
                          data => {
                            debugger
                          },
                        )
                      }
                    })
                }


              }
            })

        } else {
          let date = new Date(this.Date);
          let dayname = date.toLocaleDateString('en-US', { weekday: 'long' });
          this.DigiofficeService.GetStaffShiftDetailsByStaffID(localStorage.getItem('staffid'))
            .subscribe({
              next: data => {
                debugger

                let temp5 = data.filter(x => (x.filterenddate >= this.Date && x.filterdate <= this.Date) && x.approve == 1);
                if (temp5.length == 0) {
                          Swal.fire('Please Add shift and Get Approved From your Manager Before Applying OT for this date.') ;
                  this.loader = false;
                  this.showPopup = 1;
                  this.messageId = 21;
                } else {


                  this.Shift = temp5[0].shiftType;
                  if (this.Shift == undefined || this.Shift == null) {
                    this.Shift = 1;
                    this.loader = false;


                  }


                  this.DigiofficeService.GetAttendanceByEmployeeID(this.StaffID, this.Date, this.Date)
                    .subscribe({
                      next: data => {
                        debugger
                        let temp: any = data.filter(x => x.filterdate == this.Date && x.userID == localStorage.getItem('staffid'));
                        var newdate = new Date();
                        const theDate = new Date(this.Date);
                        var day = 60 * 60 * 24 * 1000;
                        var endDate = new Date(theDate.getTime() + day);
                        var tomotrwdate = this.Datepipe.transform(endDate, 'yyyy-MM-dd');
                        let temp1: any = data.filter(x => x.filterdate == tomotrwdate && x.userID == localStorage.getItem('staffid'));

                        if (temp.length == 0) {
                          /*  Swal.fire('You have not worked on this day. So Cant Apply Ot'); */
                          this.loader = false;
                          this.showPopup = 1;
                          this.messageId = 18;
                          this.showbtn = false;
                          this.showdetails = false;
                          this.loader = false;
                        }

                        if (this.starttime < temp[0].endtime && this.Shift == 1) {
                          /*  Swal.fire('OT Start  time must be greater  than Punch Out time'); */
                          this.loader = false;
                          this.showPopup = 1;
                          this.messageId = 22;
                          this.showbtn = false;
                          this.showdetails = false;
                          this.loader = false;
                        }
                        if (temp5[0].restDays.includes(dayname) == true) {

                        } else {
                          if (temp[0].minutesdiff < 480 && temp[0].minutesdiff > 0) {
                            /*  Swal.fire('You have not worked 8 hours on this date. So Cant Apply Ot'); */
                            this.loader = false;
                            this.showPopup = 1;
                            this.messageId = 23;
                            this.showbtn = false;
                            this.showdetails = false;
                            this.loader = false;
                          }
                          if (temp[0].mlate > 240) {
                            /*  Swal.fire('You are late more than half day  on this date. So Cant Apply Ot'); */
                            this.loader = false;
                            this.showPopup = 1;
                            this.messageId = 211;
                            this.showbtn = false;
                            this.showdetails = false;
                            this.loader = false;
                          }
                          if (this.updatedstarttime < temp5[0].shifendtime) {
                            /*   Swal.fire('OT Start time must be greater than Shift End time'); */
                            this.loader = false;
                            this.showPopup = 1;
                            this.messageId = 25;
                            this.showbtn = false;
                            this.loader = false;
                          }
                        }

                        // if (this.starttime < temp1[0].stime && this.Shift == 2) {
                        //   Swal.fire('Start  time must be greater  than Sign IN time');
                        //   this.showbtn = false;
                        //   this.loader = false;
                        // }
                        this.updatedstarttime = this.starttime.getHours() + ':' + this.starttime.getMinutes()
                        this.updatedendtime = this.add_leading0(this.endtime.getHours()) + ':' + this.add_leading0(this.endtime.getMinutes());
                        if (this.updatedendtime != temp[0].etime) {
                          Swal.fire('Endtime  must be equal to sign out time'); 
                          
                        //   this.loader = false;
                        //   this.showPopup = 1;
                        //  this.messageId = 19;
                           this.showbtn = false;
                        //   this.showdetails = false;
                        //   this.loader = false;
                        }
                        if (temp[0].webSignoutDate == null || temp[0].webSignoutDate == undefined) {
                          /*  Swal.fire('You can not Apply Overtime as you are not Punched Out on this day'); */
                          this.loader = false;
                          this.showPopup = 1;
                          this.messageId = 20;
                          this.showbtn = false;
                          this.showdetails = false;
                          this.loader = false;
                        }


                        // if (temp[0].undertime == "Yes") {
                        //   Swal.fire('You can not Apply Overtime as you are undertime on this Day');
                        //   this.showbtn = false;
                        //   this.loader = false;
                        // }


                        if (temp.length == 1) {
                          if (temp[0].undertime == "Yes" && this.overnight != 1) {
                            /* Swal.fire('You can not Apply Overtime as you are undertime on this Day'); */
                            this.loader = false;
                            this.showPopup = 1;
                            this.messageId = 24;
                            this.showbtn = false;
                            this.showdetails = false;
                          }
                        }
                        if (this.showbtn != false) {
                          this.DigiofficeService.GetOtNightOt(this.updatedstarttime, this.updatedendtime, this.Shift, this.StaffID, this.Date)
                            .subscribe({
                              next: data => {
                                debugger
                                this.loader = true;
                                let temp: any = data;
                                console.log(temp);
                                this.ot = parseFloat(temp[0].normalOT) + parseFloat(temp[0].restNormalOT) + parseFloat(temp[0].legalNormalOT) + parseFloat(temp[0].specialNormalOT) + parseFloat(temp[0].specialRestNormalOT) + parseFloat(temp[0].legalRestNormalOT) + ' Hours',
                                  this.nightot = parseFloat(temp[0].nightOt) + parseFloat(temp[0].restNightOt) + parseFloat(temp[0].legalNightOt) + parseFloat(temp[0].specialNightOt) + parseFloat(temp[0].specialRestNightOt) + parseFloat(temp[0].legalRestNightOt) + ' Hours',
                                  this.noofhours = temp[0].normalOT == null ? 0 : temp[0].normalOT,
                                  this.nightothous = temp[0].nightOt == null ? 0 : temp[0].nightOt,
                                  this.ExccessNormalOt = temp[0].exccess8NormalOt == null ? 0 : temp[0].exccess8NormalOt,
                                  this.ExccessNightOt = temp[0].exccess8NightOt == null ? 0 : temp[0].exccess8NightOt,
                                  this.NSD_REGULAR = temp[0].nsD_REGULAR == null ? 0 : temp[0].nsD_REGULAR,
                                  this.RestNightOt = temp[0].restNightOt == null ? 0 : temp[0].restNightOt,
                                  this.RestNormalOT = temp[0].restNormalOT == null ? 0 : temp[0].restNormalOT,
                                  this.ExccessRestNormalOt = temp[0].exccessRestNormalOt == null ? 0 : temp[0].exccessRestNormalOt,
                                  this.RestExccessNightOt = temp[0].restExccessNightOt == null ? 0 : temp[0].restExccessNightOt,
                                  this.LegalNightOt = temp[0].legalNightOt == null ? 0 : temp[0].legalNightOt,
                                  this.LegalNormalOT = temp[0].legalNormalOT == null ? 0 : temp[0].legalNormalOT,
                                  this.LegalExccessNormalOt = temp[0].legalExccessNormalOt == null ? 0 : temp[0].legalExccessNormalOt,
                                  this.LegalExccessNightOt = temp[0].legalExccessNightOt == null ? 0 : temp[0].legalExccessNightOt,
                                  this.SpecialHoliday = temp[0].specialHoliday == null ? 0 : temp[0].specialHoliday,
                                  this.SpecialNightOt = temp[0].specialNightOt == null ? 0 : temp[0].specialNightOt,
                                  this.SpecialNormalOT = temp[0].specialNormalOT == null ? 0 : temp[0].specialNormalOT,
                                  this.SpecialExccessNormalOt = temp[0].specialExccessNormalOt == null ? 0 : temp[0].specialExccessNormalOt,
                                  this.SpecialExccessNightOt = temp[0].specialExccessNightOt == null ? 0 : temp[0].specialExccessNightOt,
                                  this.SpecialRestNightOt = temp[0].specialRestNightOt == null ? 0 : temp[0].specialRestNightOt,
                                  this.SpecialRestNormalOT = temp[0].specialRestNormalOT == null ? 0 : temp[0].specialRestNormalOT,
                                  this.SpecialRestExccessNormalOt = temp[0].specialRestExccessNormalOt == null ? 0 : temp[0].specialRestExccessNormalOt,
                                  this.SpecialRestExccessNightOt = temp[0].specialRestExccessNightOt == null ? 0 : temp[0].specialRestExccessNightOt,
                                  this.LegalRestNightOt = temp[0].legalRestNightOt == null ? 0 : temp[0].legalRestNightOt,
                                  this.LegalRestNormalOT = temp[0].legalRestNormalOT == null ? 0 : temp[0].legalRestNormalOT,
                                  this.LegalExccessRestNormalOt = temp[0].legalExccessRestNormalOt == null ? 0 : temp[0].legalExccessRestNormalOt,
                                  this.LegalExccessRestNightOt = temp[0].legalExccessRestNightOt == null ? 0 : temp[0].legalExccessRestNightOt;
                                this.loader = false;
                                Swal.fire('Please Check All OT Details Before Submitting');
                                this.showdetails = true;
                              }, error: (err) => {
                                //Swal.fire('Issue in Getting OT Night OT');
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
                          this.loader = false;
                        }


                      }, error: (err) => {
                        // Swal.fire('Issue in Getting Attendance');
                        // this.loader = false;
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
            })
        }

      })
    }





  }

  // public startduration() {
  //   debugger;
  //   this.showPopup = 0;
  //   this.showbtn = true;
  //   this.DigiofficeService.GetHolidaybit(this.Date, this.StaffID).subscribe(data1 => {
  //     let temp1: any = data1.filter(x => x.filterdate = this.Date);
  //     if (temp1.length > 0) {
  //       this.loader = false;
  //     } else {
  //       this.DigiofficeService.GetStaffShiftDetailsByStaffID(localStorage.getItem('staffid'))
  //         .subscribe({
  //           next: data => {
  //             debugger
  //             this.loader = false;
  //             let temp = data.filter(x => (x.filterenddate >= this.Date && x.filterdate <= this.Date));
  //             this.Shift = temp[0].shiftType;

  //             if (this.Shift == undefined || this.Shift == null) {
  //               this.Shift = 1;
  //               this.loader = false;
  //             }

  //             if (this.updatedstarttime <= temp[0].endTime.slice(1, 5)) {
  //               /*   Swal.fire('OT Start  time must be greater  than Shift End time'); */
  //               this.loader = false;
  //               this.showPopup = 1;
  //               this.messageId = 25;
  //               this.showbtn = false;
  //               this.loader = false;
  //             }
  //           }
  //         })
  //     }

  //   })



  // }
  public InsertStaffOverTimeDetails() {
    debugger
    this.showPopup = 0;
    this.loader = true;
    if (this.Date == " " || this.starttime == "" || this.endtime == "" || this.Date == undefined || this.starttime == undefined || this.endtime == undefined) {
      /*   Swal.fire('Please Fill All The Mandatory Fields') */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 7;
      this.loader = false;
    }
    else {
      var eb = {
        'StaffID': localStorage.getItem('staffid'),
        'Date': this.Date,
        'noofhours': this.noofhours,
        'NightOT': this.nightothous,
        'Comments': this.Comments,
        'StartTime': this.updatedstarttime,
        'EndTime': this.updatedendtime,
        'Status': 'Manager Pending',
        'Attachment': this.attachmentsurl[0] == "" ? null : this.attachmentsurl[0],
        'ExccessNormalOt': this.ExccessNormalOt,
        'ExccessNightOt': this.ExccessNightOt,
        'NSD_REGULAR': this.NSD_REGULAR,
        'RestNightOt': this.RestNightOt,
        'RestNormalOT': this.RestNormalOT,
        'ExccessRestNormalOt': this.ExccessRestNormalOt,
        'RestExccessNightOt': this.RestExccessNightOt,
        'LegalNightOt': this.LegalNightOt,
        'LegalNormalOT': this.LegalNormalOT,
        'LegalExccessNormalOt': this.LegalExccessNormalOt,
        'LegalExccessNightOt': this.LegalExccessNightOt,
        'SpecialHoliday': this.SpecialHoliday,
        'SpecialNightOt': this.SpecialNightOt,
        'SpecialNormalOT': this.SpecialNormalOT,
        'SpecialExccessNormalOt': this.SpecialExccessNormalOt,
        'SpecialExccessNightOt': this.SpecialExccessNightOt,
        'SpecialRestNightOt': this.SpecialRestNightOt,
        'SpecialRestNormalOT': this.SpecialRestNormalOT,
        'SpecialRestExccessNormalOt': this.SpecialRestExccessNormalOt,
        'SpecialRestExccessNightOt': this.SpecialRestExccessNightOt,
        'LegalRestNightOt': this.LegalRestNightOt,
        'LegalRestNormalOT': this.LegalRestNormalOT,
        'LegalExccessRestNormalOt': this.LegalExccessRestNormalOt,
        'LegalExccessRestNightOt': this.LegalExccessRestNightOt
      }
      this.DigiofficeService.InsertStaffOverTimeDetails(eb)
        .subscribe({
          next: data => {
            debugger
            if (data == 0) {
              /* Swal.fire('Overtime Already Appiled for this day.'); */
              this.loader = false;
              this.showPopup = 1;
              this.messageId = 26;
            } else {
              /*  Swal.fire('Saved Successfully.'); */
              this.loader = false;
              this.showPopup = 1;
              this.messageId = 8;
              this.uploadmultipleimages(data);
              this.router.navigate(['/Employee/MyOverTimeDetails']);
              this.loader = false;
            }

          }, error: (err) => {
            // Swal.fire('Issue in Inserting Staff Over Time Details');
            // this.loader = false;
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

  public InsertPushNotification() {
    this.DigiofficeService.pushnotificationtomobile(
      localStorage.getItem('staffID'),
      'Your OT Request has been sent for Approval Successfully!!',
      'Overtime'
    );
  }

  public InsertPushNotificationformanager() {
    this.DigiofficeService.pushnotificationtomobile(
      localStorage.getItem('supervisor'),
      'Hi  <br> Your Employee ' +    localStorage.getItem('UserName') + ' has Applied Overtime Request in Digi-Office.',
      'Overtime Request'
    );
  }


  public uploadmultipleimages(id: any) {
    debugger
    for (let i = 0; i < this.attachmentsurl.length; i++) {
      var entity = {
        "Attachment": this.attachmentsurl[i],
        "OverTimeID": id,
      }
      this.DigiofficeService.InsertStaffOverTimeDetailsAttachment(entity).subscribe(
        data => {

          this.loader = false;
        }
      )
    }
  }


  public cancel() {
    debugger
    location.href = "#/Employee/OverTimeDetailsDash";
    this.loader = false;
    this.dialogRef.close(false);
  
  }
  overnight: any;
  //logic to add leading 0
  add_leading0(time: any) {
    debugger
    this.overnight = 1;
    return (time < 10) ? '0' + time : time;
  }

  getOverTimeDate() {
    debugger
    this.showPopup = 0;
    
    this.DigiofficeService.GetApprovedStaffLeavesByStaffID(localStorage.getItem('staffid'), 1, this.Date, this.Date)
      .subscribe({
        next: data => {
          debugger
          let temp: any = data.filter(x => x.halfDayBit == 0);
          if (temp.length > 0) {
            /*  Swal.fire('You Cant Apply OT as You have Approved Leave on this Date'); */
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 27;
            this.showbtn = false;
            this.loader = false;
          }
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Staff Leaves');
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
    this.DigiofficeService.GetAttendanceByEmployeeID(localStorage.getItem('staffid'), this.Date, this.Date)
      .subscribe({
        next: data => {
          debugger
          let temp: any = data;
          if (temp.length > 0) {
            if (temp[0].undertime == 'Yes') {
              this.loader = false;
              Swal.fire('You are Undertime on this date , So you can not Apply OT.')
              this.showbtn = false;
              this.loader = false;
            }
            if (temp[0].latepunchin == 'Yes') {
              this.loader = false;
              Swal.fire('You are Late on this date , So you can not Apply OT.')
              this.showbtn = false;
              this.loader = false;
            }


          }
          this.loader = false;
        }, error: (err) => {
          // Swal.fire('Issue in Getting Staff Leaves');
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