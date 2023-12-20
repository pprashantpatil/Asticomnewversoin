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
  styleUrls: ['./over-time-details-form.component.css']
})
export class OverTimeDetailsFormComponent implements OnInit {
  loader: any;
  date: any;
  maxDate: any;
  startTime: any;
  updatedStartTime: any;
  shift: any;
  overNight: any;
  staffID: any;
  endTime: any;
  updatedEndTime: any;
  noOfHours: any;
  nightOT: any;
  restNormalOT: any;
  specialNormalOT: any;
  exccessNightOT: any;
  exccessNormalOT: any;
  restNightOT: any;
  exccessRestNormalOT: any;
  restExccessNightOT: any;
  legalNightOT: any;
  legalNormalOT: any;
  legalExccessNormalOT: any;
  legalExccessNightOT: any;
  specialNightOT: any;
  specialExccessNormalOT: any;
  specialExccessNightOT: any;
  specialRestNightOT: any;
  specialRestNormalOT: any;
  specialRestExccessNormalOT: any;
  specialRestExccessNightOT: any;
  legalRestNightOT: any;
  legalRestNormalOT: any;
  legalExccessRestNormalOT: any;
  legalExccessRestNightOT: any;
  nSDRegular: any;
  ot: any;
  nightOTHours: any;
  specialHoliday: any;
  showbtn: any;
  showSpinners: any;
  comment: any;
  public attachments21: any = [];
  public attachments: any = [];
  public attachmentsurl: any = [];
  showPopup: number = 0;
  messageId: number = 0;
  showDetails: any;

  constructor(public DigiofficecorehrService: DigiofficecorehrService, public router: Router, public Datepipe: DatePipe, private activatedroute: ActivatedRoute, public dialogRef: MatDialogRef<OverTimeDetailsDashComponent>,
    @Inject(MAT_DIALOG_DATA) public ID: any) { }

  ngOnInit(): void {
    debugger
    this.showbtn = true;
    this.showSpinners = false;
    this.staffID = localStorage.getItem('staffid');
    this.maxDate = new Date().toISOString().split("T")[0];
  }

  public cancel() {
    location.href = "#/Employee/OverTimeDetailsDash";
    this.loader = false;
    this.dialogRef.close(false);
  }

  public submit() {
    this.DigiofficecorehrService.ProjectAttachments(this.attachments21)
      .subscribe({
        next: data => {
          debugger
          this.attachmentsurl.push(data);
          this.attachments.length = 0;
          this.InsertStaffOverTimeDetails();
          this.loader = false;
        }
      })
  }

  public InsertStaffOverTimeDetails() {
    debugger
    this.showPopup = 0;
    this.loader = true;
    if (this.date == " " || this.startTime == "" || this.endTime == "" || this.date == undefined || this.startTime == undefined || this.endTime == undefined) {
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 7;
      this.loader = false;
    }
    else {
      var eb = {
        'StaffID': localStorage.getItem('staffid'),
        'Date': this.date,
        'noofhours': this.noOfHours,
        'NightOT': this.nightOTHours,
        'Comments': this.comment,
        'StartTime': this.updatedStartTime,
        'EndTime': this.updatedEndTime,
        'Status': 'Manager Pending',
        'Attachment': this.attachmentsurl[0] == "" ? null : this.attachmentsurl[0],
        'ExccessNormalOt': this.exccessNormalOT,
        'ExccessNightOt': this.exccessNightOT,
        'NSD_REGULAR': this.nSDRegular,
        'RestNightOt': this.restNightOT,
        'RestNormalOT': this.restNormalOT,
        'ExccessRestNormalOt': this.exccessRestNormalOT,
        'RestExccessNightOt': this.restExccessNightOT,
        'LegalNightOt': this.legalNightOT,
        'LegalNormalOT': this.legalNormalOT,
        'LegalExccessNormalOt': this.legalExccessNormalOT,
        'LegalExccessNightOt': this.legalExccessNightOT,
        'SpecialHoliday': this.specialHoliday,
        'SpecialNightOt': this.specialNightOT,
        'SpecialNormalOT': this.specialNormalOT,
        'SpecialExccessNormalOt': this.specialExccessNormalOT,
        'SpecialExccessNightOt': this.specialExccessNightOT,
        'SpecialRestNightOt': this.specialRestNightOT,
        'SpecialRestNormalOT': this.specialRestNormalOT,
        'SpecialRestExccessNormalOt': this.specialRestExccessNormalOT,
        'SpecialRestExccessNightOt': this.specialRestExccessNightOT,
        'LegalRestNightOt': this.legalRestNightOT,
        'LegalRestNormalOT': this.legalRestNormalOT,
        'LegalExccessRestNormalOt': this.legalExccessRestNormalOT,
        'LegalExccessRestNightOt': this.legalExccessRestNightOT
      }
      this.DigiofficecorehrService.InsertStaffOverTimeDetails(eb)
        .subscribe({
          next: data => {
            debugger
            if (data == 0) {
              this.loader = false;
              this.showPopup = 1;
              this.messageId = 26;
              this.dialogRef.close(false);
            } else {
              this.loader = false;
              this.showPopup = 1;
              this.messageId = 8;
              this.uploadmultipleimages(data);
              this.dialogRef.close(false);
              this.router.navigate(['/Employee/OverTimeDetailsDash']);
              this.loader = false;
            }
          }
        })
    }
  }

  public uploadmultipleimages(id: any) {
    debugger
    for (let i = 0; i < this.attachmentsurl.length; i++) {
      var entity = {
        "Attachment": this.attachmentsurl[i],
        "OverTimeID": id,
      }
      this.DigiofficecorehrService.InsertStaffOverTimeDetailsAttachment(entity).subscribe(
        data => {

          this.loader = false;
        }
      )
    }
  }

  public update() {
    // for (let i = 0; i < this.restDaysArray1.length; i++) {
    //   this.restDays = this.restDays + this.restDaysArray1[i].name + ','
    // }
    // if (this.restDaysArray1.length == 1) {
    //   this.getDaysBetweenDates(this.startDate, this.endDate, this.restDaysArray1[0].name, '');
    // } else {
    //   this.getDaysBetweenDates(this.startDate, this.endDate, this.restDaysArray1[0].name, this.restDaysArray1[1].name);
    // }
    var entity = {
      // 'ID': this.ID,
      // 'ShiftDate': this.startDate,
      // 'ShiftName': this.shiftName,
      // 'StartTime': this.startTime,
      // 'EndTime': this.endTime,
      // 'EndDate': this.endDate
    }
    this.DigiofficecorehrService.UpdateStaffShiftDetails(entity).subscribe(res => {
      debugger
      Swal.fire("Updated Successfully");
      this.dialogRef.close(false);
      location.href = "#/Employee/OverTimeDetailsDash";
      this.loader = false;
    })
  }

  getOverTimeDate() {
    debugger
    this.showPopup = 0;
    this.DigiofficecorehrService.GetApprovedStaffLeavesByStaffID(localStorage.getItem('staffid'), 1, this.date, this.date)
      .subscribe({
        next: data => {
          debugger
          let temp: any = data.filter(x => x.halfDayBit == 0);
          if (temp.length > 0) {
            this.showPopup = 1;
            this.messageId = 27;
            this.showbtn = false;
            this.loader = false;
          }
          this.loader = false;
        }
      })

    this.DigiofficecorehrService.GetAttendanceByEmployeeID(localStorage.getItem('staffid'), this.date, this.date)
      .subscribe({
        next: data => {
          debugger
          let temp: any = data;
          if (temp.length > 0) {
            if (temp[0].undertime == 'Yes') {
              this.loader = false;
              Swal.fire('You are Undertime on this date , So you can not Apply OT.')
              this.loader = false;
            }
            if (temp[0].latepunchin == 'Yes') {
              this.loader = false;
              Swal.fire('You are Late on this date , So you can not Apply OT.')
              this.loader = false;
            }
          }
          this.loader = false;
        }
      })
  }

  public checkStartDate() {
    debugger
    this.showPopup = 0;
    this.updatedStartTime = this.add_leading0(this.startTime.getHours()) + ':' + this.add_leading0(this.startTime.getMinutes());
    let date = new Date(this.date);
    let dayname = date.toLocaleDateString('en-US', { weekday: 'long' });
    if (this.date == undefined || this.date == null) {
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 15;
      this.startTime = "";
    }
    this.DigiofficecorehrService.GetHolidaybit(this.date, this.staffID).subscribe(data1 => {
      let temp1: any = data1.filter(x => x.filterdate == this.date);
      if (temp1?.length > 0) {

      } else {
        this.DigiofficecorehrService.GetStaffShiftDetailsByStaffID(localStorage.getItem('staffid'))
          .subscribe({
            next: data => {
              debugger
              let temp = data.filter(x => (x.filterenddate >= this.date && x.filterdate <= this.date) && x.approve == 1);
              if (temp.length == 0) {
                this.loader = false;
                this.showPopup = 1;
                this.messageId = 17;
              } else {
                if (temp[0].restdays.includes(dayname) == true) {
                } else {
                  if (this.updatedStartTime < temp[0].shifendtime) {
                    this.loader = false;
                    this.showPopup = 1;
                    this.messageId = 25;
                    this.showbtn = false;
                    this.startTime = '';
                  }
                }
                this.shift = temp[0].shiftType;
                if (this.shift == undefined || this.shift == null) {
                  this.shift = 1;
                  this.loader = false;
                }
              }
              this.loader = false;
            }
          })
      }
    })
  }

  add_leading0(time: any) {
    debugger
    this.overNight = 1;
    return (time < 10) ? '0' + time : time;
  }

  public duration() {
    debugger;
    this.updatedStartTime = this.startTime.getHours() + ':' + this.startTime.getMinutes();
    let date = new Date(this.date);
    let dayname = date.toLocaleDateString('en-US', { weekday: 'long' });
    this.updatedEndTime = this.add_leading0(this.endTime.getHours()) + ':' + this.add_leading0(this.endTime.getMinutes());
    if (((this.endTime - this.startTime) / 60000) < 60 && (this.endTime - this.startTime) > 0) {
      Swal.fire('Overtime Should be minimum of 1 Hour');
      this.loader = false;
      this.showbtn = false;
      this.showDetails = false;
    }
    else {
      this.showPopup = 0;
      this.updatedEndTime = this.add_leading0(this.endTime.getHours()) + ':' + this.add_leading0(this.endTime.getMinutes());
      if (this.date == undefined || this.date == null) {
        Swal.fire("Please Select the Date Before adding End Time");
        this.loader = false;
        this.showPopup = 1;
        this.messageId = 16;
        this.endTime = "";
      }

      this.DigiofficecorehrService.GetHolidaybit(this.date, this.staffID).subscribe(data1 => {
        let temp1: any = data1.filter(x => x.filterdate == this.date);
        if (temp1?.length > 0) {
          this.DigiofficecorehrService.GetStaffShiftDetailsByStaffID(localStorage.getItem('staffid'))
            .subscribe({
              next: data => {
                debugger
                let temp = data.filter(x => (x.filterenddate >= this.date && x.filterdate <= this.date) && x.approve == 1);
                if (temp.length == 0) {
                  Swal.fire('You have not worked on this day. So Cant Apply Ot');
                  this.loader = false;
                } else {
                  this.shift = temp[0].shiftType;
                  if (this.shift == undefined || this.shift == null) {
                    this.shift = 1;
                    this.loader = false;
                  }

                  this.DigiofficecorehrService.GetAttendanceByEmployeeID(this.staffID, this.date, this.date)
                    .subscribe({
                      next: data => {
                        debugger
                        let temp: any = data.filter(x => x.filterdate == this.date && x.userID == localStorage.getItem('staffid'));
                        var newdate = new Date();
                        const theDate = new Date(this.date);
                        var day = 60 * 60 * 24 * 1000;
                        var endDate = new Date(theDate.getTime() + day);
                        var tomotrwdate = this.Datepipe.transform(endDate, 'yyyy-MM-dd');
                        let temp1: any = data.filter(x => x.filterdate == tomotrwdate && x.userID == localStorage.getItem('staffid'));
                        if (temp.length == 0) {
                          this.loader = false;
                          this.showPopup = 1;
                          this.messageId = 18;
                          this.showbtn = false;
                          this.showDetails = false;
                        }
                        this.updatedStartTime = this.startTime.getHours() + ':' + this.startTime.getMinutes()
                        this.updatedEndTime = this.add_leading0(this.endTime.getHours()) + ':' + this.add_leading0(this.endTime.getMinutes());
                        if (this.updatedEndTime > temp[0].etime) {
                          this.loader = false;
                          this.showPopup = 1;
                          this.messageId = 19;
                          this.showbtn = false;
                          this.showDetails = false;
                        }
                        if (temp[0].webSignoutDate == null || temp[0].webSignoutDate == undefined) {
                          Swal.fire('You can not Apply Overtime as you are not Punched Out on this day');
                          this.loader = false;
                          this.showPopup = 1;
                          this.messageId = 20;
                          this.showbtn = false;
                          this.showDetails = false;
                        }
                        if (this.showbtn != false) {
                          this.DigiofficecorehrService.GetOtNightOt(this.updatedStartTime, this.updatedEndTime, this.shift, this.staffID, this.date)
                            .subscribe({
                              next: data => {
                                debugger
                                this.loader = true;
                                let temp: any = data;
                                this.ot = temp[0].normalOT == null ? 0 : temp[0].normalOT + ' Hours',
                                  this.nightOT = temp[0].nightOt == null ? 0 : temp[0].nightOt + ' Hours',
                                  this.noOfHours = temp[0].normalOT == null ? 0 : temp[0].normalOT,
                                  this.nightOTHours = temp[0].nightOt == null ? 0 : temp[0].nightOt,
                                  this.exccessNormalOT = temp[0].exccess8NormalOt == null ? 0 : temp[0].exccess8NormalOt,
                                  this.exccessNightOT = temp[0].exccess8NightOt == null ? 0 : temp[0].exccess8NightOt,
                                  this.nSDRegular = temp[0].nsD_REGULAR == null ? 0 : temp[0].nsD_REGULAR,
                                  this.restNightOT = temp[0].restNightOt == null ? 0 : temp[0].restNightOt,
                                  this.restNormalOT = temp[0].restNormalOT == null ? 0 : temp[0].restNormalOT,
                                  this.exccessRestNormalOT = temp[0].exccessRestNormalOt == null ? 0 : temp[0].exccessRestNormalOt,
                                  this.restExccessNightOT = temp[0].restExccessNightOt == null ? 0 : temp[0].restExccessNightOt,
                                  this.legalNightOT = temp[0].legalNightOt == null ? 0 : temp[0].legalNightOt,
                                  this.legalNormalOT = temp[0].legalNormalOT == null ? 0 : temp[0].legalNormalOT,
                                  this.legalExccessNormalOT = temp[0].legalExccessNormalOt == null ? 0 : temp[0].legalExccessNormalOt,
                                  this.legalExccessNightOT = temp[0].legalExccessNightOt == null ? 0 : temp[0].legalExccessNightOt,
                                  this.specialHoliday = temp[0].specialHoliday == null ? 0 : temp[0].specialHoliday,
                                  this.specialNightOT = temp[0].specialNightOt == null ? 0 : temp[0].specialNightOt,
                                  this.specialNormalOT = temp[0].specialNormalOT == null ? 0 : temp[0].specialNormalOT,
                                  this.specialExccessNormalOT = temp[0].specialExccessNormalOt == null ? 0 : temp[0].specialExccessNormalOt,
                                  this.specialExccessNightOT = temp[0].specialExccessNightOt == null ? 0 : temp[0].specialExccessNightOt,
                                  this.specialRestNightOT = temp[0].specialRestNightOt == null ? 0 : temp[0].specialRestNightOt,
                                  this.specialRestNormalOT = temp[0].specialRestNormalOT == null ? 0 : temp[0].specialRestNormalOT,
                                  this.specialRestExccessNormalOT = temp[0].specialRestExccessNormalOt == null ? 0 : temp[0].specialRestExccessNormalOt,
                                  this.specialRestExccessNightOT = temp[0].specialRestExccessNightOt == null ? 0 : temp[0].specialRestExccessNightOt,
                                  this.legalRestNightOT = temp[0].legalRestNightOt == null ? 0 : temp[0].legalRestNightOt,
                                  this.legalRestNormalOT = temp[0].legalRestNormalOT == null ? 0 : temp[0].legalRestNormalOT,
                                  this.legalExccessRestNormalOT = temp[0].legalExccessRestNormalOt == null ? 0 : temp[0].legalExccessRestNormalOt,
                                  this.legalExccessRestNightOT = temp[0].legalExccessRestNightOt == null ? 0 : temp[0].legalExccessRestNightOt;
                                this.loader = false;
                                Swal.fire('Please Check All OT Details Before Submitting');
                              }
                            })
                          this.loader = false;
                        }
                      }
                    })
                }
              }
            })
        } else {
          let date = new Date(this.date);
          let dayname = date.toLocaleDateString('en-US', { weekday: 'long' });
          this.DigiofficecorehrService.GetStaffShiftDetailsByStaffID(localStorage.getItem('staffid'))
            .subscribe({
              next: data => {
                debugger
                let temp5 = data.filter(x => (x.filterenddate >= this.date && x.filterdate <= this.date) && x.approve == 1);
                if (temp5.length == 0) {
                  this.loader = false;
                  this.showPopup = 1;
                  this.messageId = 21;
                } else {
                  this.shift = temp5[0].shiftType;
                  if (this.shift == undefined || this.shift == null) {
                    this.shift = 1;
                    this.loader = false;
                  }

                  this.DigiofficecorehrService.GetAttendanceByEmployeeID(this.staffID, this.date, this.date)
                    .subscribe({
                      next: data => {
                        debugger
                        let temp: any = data.filter(x => x.filterdate == this.date && x.userID == localStorage.getItem('staffid'));
                        var newdate = new Date();
                        const theDate = new Date(this.date);
                        var day = 60 * 60 * 24 * 1000;
                        var endDate = new Date(theDate.getTime() + day);
                        var tomotrwdate = this.Datepipe.transform(endDate, 'yyyy-MM-dd');
                        let temp1: any = data.filter(x => x.filterdate == tomotrwdate && x.userID == localStorage.getItem('staffid'));
                        if (temp.length == 0) {
                          this.loader = false;
                          this.showPopup = 1;
                          this.messageId = 18;
                          this.showbtn = false;
                          this.showDetails = false;
                        }
                        if (this.startTime < temp[0].endTime && this.shift == 1) {
                          this.showPopup = 1;
                          this.messageId = 22;
                          this.showbtn = false;
                          this.showDetails = false;
                          this.loader = false;
                        }
                        if (temp5[0].restdays.includes(dayname) == true) {
                        } else {
                          if (temp[0].minutesdiff < 480 && temp[0].minutesdiff > 0) {
                            this.showPopup = 1;
                            this.messageId = 23;
                            this.showbtn = false;
                            this.showDetails = false;
                            this.loader = false;
                          }
                          if (temp[0].mlate > 240) {
                            this.showPopup = 1;
                            this.messageId = 211;
                            this.showbtn = false;
                            this.showDetails = false;
                            this.loader = false;
                          }
                          if (this.updatedStartTime < temp5[0].shifendtime) {
                            this.showPopup = 1;
                            this.messageId = 25;
                            this.showbtn = false;
                            this.loader = false;
                          }
                        }
                        this.updatedStartTime = this.startTime.getHours() + ':' + this.startTime.getMinutes()
                        this.updatedEndTime = this.add_leading0(this.endTime.getHours()) + ':' + this.add_leading0(this.endTime.getMinutes());
                        if (this.updatedEndTime != temp[0].etime) {
                          Swal.fire('Endtime  must be equal to sign out time');
                        }
                        if (temp[0].webSignoutDate == null || temp[0].webSignoutDate == undefined) {
                          this.showPopup = 1;
                          this.messageId = 20;
                          this.showbtn = false;
                          this.showDetails = false;
                          this.loader = false;
                        }
                        if (temp.length == 1) {
                          if (temp[0].undertime == "Yes" && this.overNight != 1) {
                            this.loader = false;
                            this.showPopup = 1;
                            this.messageId = 24;
                            this.showbtn = false;
                            this.showDetails = false;
                          }
                        }
                        if (this.showbtn != false) {
                          this.DigiofficecorehrService.GetOtNightOt(this.updatedStartTime, this.updatedEndTime, this.shift, this.staffID, this.date)
                            .subscribe({
                              next: data => {
                                debugger
                                this.loader = true;
                                let temp: any = data;
                                console.log(temp);
                                this.ot = parseFloat(temp[0].normalOT) + parseFloat(temp[0].restNormalOT) + parseFloat(temp[0].legalNormalOT) + parseFloat(temp[0].specialNormalOT) + parseFloat(temp[0].specialRestNormalOT) + parseFloat(temp[0].legalRestNormalOT) + ' Hours',
                                  this.nightOT = parseFloat(temp[0].nightOt) + parseFloat(temp[0].restNightOt) + parseFloat(temp[0].legalNightOt) + parseFloat(temp[0].specialNightOt) + parseFloat(temp[0].specialRestNightOt) + parseFloat(temp[0].legalRestNightOt) + ' Hours',
                                  this.noOfHours = temp[0].normalOT == null ? 0 : temp[0].normalOT,
                                  this.nightOTHours = temp[0].nightOt == null ? 0 : temp[0].nightOt,
                                  this.exccessNormalOT = temp[0].exccess8NormalOt == null ? 0 : temp[0].exccess8NormalOt,
                                  this.exccessNightOT = temp[0].exccess8NightOt == null ? 0 : temp[0].exccess8NightOt,
                                  this.nSDRegular = temp[0].nsD_REGULAR == null ? 0 : temp[0].nsD_REGULAR,
                                  this.restNightOT = temp[0].restNightOt == null ? 0 : temp[0].restNightOt,
                                  this.restNormalOT = temp[0].restNormalOT == null ? 0 : temp[0].restNormalOT,
                                  this.exccessRestNormalOT = temp[0].exccessRestNormalOt == null ? 0 : temp[0].exccessRestNormalOt,
                                  this.restExccessNightOT = temp[0].restExccessNightOt == null ? 0 : temp[0].restExccessNightOt,
                                  this.legalNightOT = temp[0].legalNightOt == null ? 0 : temp[0].legalNightOt,
                                  this.legalNormalOT = temp[0].legalNormalOT == null ? 0 : temp[0].legalNormalOT,
                                  this.legalExccessNormalOT = temp[0].legalExccessNormalOt == null ? 0 : temp[0].legalExccessNormalOt,
                                  this.legalExccessNightOT = temp[0].legalExccessNightOt == null ? 0 : temp[0].legalExccessNightOt,
                                  this.specialHoliday = temp[0].specialHoliday == null ? 0 : temp[0].specialHoliday,
                                  this.specialNightOT = temp[0].specialNightOt == null ? 0 : temp[0].specialNightOt,
                                  this.specialNormalOT = temp[0].specialNormalOT == null ? 0 : temp[0].specialNormalOT,
                                  this.specialExccessNormalOT = temp[0].specialExccessNormalOt == null ? 0 : temp[0].specialExccessNormalOt,
                                  this.specialExccessNightOT = temp[0].specialExccessNightOt == null ? 0 : temp[0].specialExccessNightOt,
                                  this.specialRestNightOT = temp[0].specialRestNightOt == null ? 0 : temp[0].specialRestNightOt,
                                  this.specialRestNormalOT = temp[0].specialRestNormalOT == null ? 0 : temp[0].specialRestNormalOT,
                                  this.specialRestExccessNormalOT = temp[0].specialRestExccessNormalOt == null ? 0 : temp[0].specialRestExccessNormalOt,
                                  this.specialRestExccessNightOT = temp[0].specialRestExccessNightOt == null ? 0 : temp[0].specialRestExccessNightOt,
                                  this.legalRestNightOT = temp[0].legalRestNightOt == null ? 0 : temp[0].legalRestNightOt,
                                  this.legalRestNormalOT = temp[0].legalRestNormalOT == null ? 0 : temp[0].legalRestNormalOT,
                                  this.legalExccessRestNormalOT = temp[0].legalExccessRestNormalOt == null ? 0 : temp[0].legalExccessRestNormalOt,
                                  this.legalExccessRestNightOT = temp[0].legalExccessRestNightOt == null ? 0 : temp[0].legalExccessRestNightOt;
                                this.loader = false;
                                Swal.fire('Please Check All OT Details Before Submitting');
                              }
                            })
                          this.loader = false;
                        }
                      }
                    })
                }
              }
            })
        }
      })
    }
  }

  onRemove21(event: any) {
    this.attachments21.splice(this.attachments.indexOf(event), 1);
  }

  onSelect21(event: any) {
    debugger
    this.showPopup = 0;
    this.attachments21.length = 0;
    if (event.addedFiles[0].size / 1048576 > 2) {
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 14;
    }
    else {
      const uploadedFiles: File[] = event.addedFiles;
      for (const file of uploadedFiles) {
        try {
          const img = new Image();
          img.src = window.URL.createObjectURL(file);
          img.onload = async () => {
            if ((event.addedFiles[0].size) > 5242880) {
              Swal.fire('Please upload a file that is less than or equal to 5 MB.')
              this.attachments21.length = 0;
            }
            else {
              this.attachments21.push(...event.addedFiles);
              Swal.fire('Attachment uploaded');
            }
          }
        } catch (e) {
          throw 'This is being thrown after setting img.src';
        }
      };
    }
  }
}