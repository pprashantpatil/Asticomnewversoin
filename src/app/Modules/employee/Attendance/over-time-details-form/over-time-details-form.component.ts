import { Component, Inject, OnInit } from '@angular/core';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShiftDetailsDashComponent } from '../shift-details-dash/shift-details-dash.component';
import { DatePipe } from '@angular/common';

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

  constructor(public DigiofficecorehrService: DigiofficecorehrService, public Datepipe: DatePipe, private activatedroute: ActivatedRoute, public dialogRef: MatDialogRef<ShiftDetailsDashComponent>,
    @Inject(MAT_DIALOG_DATA) public ID: any) { }

  ngOnInit(): void {
    debugger
    this.showbtn = true;
    this.showSpinners = false;
    this.staffID = localStorage.getItem('staffid');
    this.maxDate = new Date().toISOString().split("T")[0];
    this.getData();
  }

  public getData() {
    this.DigiofficecorehrService.GetShiftMaster()
      .subscribe({
        next: data => {
          debugger
          // this.shiftNameList = data;
          this.loader = false;
        }
      })

    this.activatedroute.params.subscribe(params => {
      debugger;
      if (this.ID == undefined) {
        this.loader = false;
      }
      else {
        this.DigiofficecorehrService.GetStaffShiftDetails()
          .subscribe({
            next: data => {
              debugger
              this.loader = false;
              // this.shiftDetailsList = data.filter(x => x.id == this.ID);
              // this.startDate = this.shiftDetailsList[0].filterdate;
              // this.endDate = this.shiftDetailsList[0].filterenddate;
              // this.shiftName = this.shiftDetailsList[0].shiftName;
              // this.startTime = this.shiftDetailsList[0].startTime;
              // this.endTime = this.shiftDetailsList[0].endTime;
              // this.restDays = this.shiftDetailsList[0].restdays;
              // this.employeeName = this.shiftDetailsList[0].name;
            }
          })
      }
    })
  }

  public cancel() {
    location.href = "#/Employee/ShiftDetailsDash";
    this.loader = false;
    this.dialogRef.close(false);
  }

  public submit() {
    if (this.date == undefined) {
      Swal.fire('Please fill out all mandatory fields');
    }
    else {
      let entity = {
        // 'ShiftDate': this.startDate,
        // 'ShiftName': this.shiftName,
        // 'StartTime': '2022-04-30 10:00:00.000',
        // 'EndTime': '2022-04-30 10:00:00.000',
        // 'StaffID1': localStorage.getItem('staffid'),
        // 'EndDate': this.endDate,
        // 'RestDays': this.restDays
      }
      this.DigiofficecorehrService.InsertStaffShiftDetails(entity).subscribe(res => {
        debugger;
        if (res == 0) {
          Swal.fire('Please choose another dates as these dates are overlapping with your existing shift');
        }
        else {
          Swal.fire("Saved Successfully");
          location.href = "#/Employee/ShiftDetailsDash";
        }
      })
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
      location.href = "#/Employee/ShiftDetailsDash";
      this.loader = false;
    })
  }

  getOverTimeDate() {
    debugger
    this.DigiofficecorehrService.GetApprovedStaffLeavesByStaffID(localStorage.getItem('staffid'), 1, this.date, this.date)
      .subscribe({
        next: data => {
          debugger
          let temp: any = data.filter(x => x.halfDayBit == 0);
          if (temp.length > 0) {
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
    this.updatedStartTime = this.add_leading0(this.startTime.getHours()) + ':' + this.add_leading0(this.startTime.getMinutes());
    let date = new Date(this.date);
    let dayname = date.toLocaleDateString('en-US', { weekday: 'long' });
    if (this.date == undefined || this.date == null) {
      this.loader = false;
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
              } else {
                if (temp[0].restdays.includes(dayname) == true) {
                } else {
                  if (this.updatedStartTime < temp[0].shifendtime) {
                    this.loader = false;
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
    }
    else {
      this.updatedEndTime = this.add_leading0(this.endTime.getHours()) + ':' + this.add_leading0(this.endTime.getMinutes());
      if (this.date == undefined || this.date == null) {
        Swal.fire("Please Select the Date Before adding End Time");
        this.loader = false;
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
                          Swal.fire('You have not worked on this day. So Cant Apply Ot');
                          this.loader = false;
                        }
                        this.updatedStartTime = this.startTime.getHours() + ':' + this.startTime.getMinutes()
                        this.updatedEndTime = this.add_leading0(this.endTime.getHours()) + ':' + this.add_leading0(this.endTime.getMinutes());
                        if (this.updatedEndTime > temp[0].etime) {
                          Swal.fire('Endtime time must be less than sign out time');
                          this.loader = false;
                        }
                        if (temp[0].webSignoutDate == null || temp[0].webSignoutDate == undefined) {
                          Swal.fire('You can not Apply Overtime as you are not Punched Out on this day');
                          this.loader = false;
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
                  Swal.fire('Please Add shift and Get Approved From your Manager Before Applying OT for this date.')
                  this.loader = false;
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
                          Swal.fire('You have not worked on this day. So Cant Apply Ot');
                          this.loader = false;
                        }
                        if (this.startTime < temp[0].endTime && this.shift == 1) {
                          Swal.fire('OT Start  time must be greater  than Punch Out time');
                          this.loader = false;
                        }
                        if (temp5[0].restdays.includes(dayname) == true) {
                        } else {
                          if (temp[0].minutesdiff < 480 && temp[0].minutesdiff > 0) {
                            Swal.fire('You have not worked 8 hours on this date. So Cant Apply Ot');
                            this.loader = false;
                          }
                          if (temp[0].mlate > 240) {
                            Swal.fire('You are late more than half day  on this date. So Cant Apply Ot');
                            this.loader = false;
                          }
                          if (this.updatedStartTime < temp5[0].shifendtime) {
                            Swal.fire('OT Start time must be greater than Shift End time');
                            this.loader = false;
                          }
                        }
                        this.updatedStartTime = this.startTime.getHours() + ':' + this.startTime.getMinutes()
                        this.updatedEndTime = this.add_leading0(this.endTime.getHours()) + ':' + this.add_leading0(this.endTime.getMinutes());
                        if (this.updatedEndTime != temp[0].etime) {
                          Swal.fire('Endtime  must be equal to sign out time');
                        }
                        if (temp[0].webSignoutDate == null || temp[0].webSignoutDate == undefined) {
                          Swal.fire('You can not Apply Overtime as you are not Punched Out on this day');
                          this.loader = false;
                          this.loader = false;
                        }
                        if (temp.length == 1) {
                          if (temp[0].undertime == "Yes" && this.overNight != 1) {
                            Swal.fire('You can not Apply Overtime as you are undertime on this Day');
                            this.loader = false;
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
}