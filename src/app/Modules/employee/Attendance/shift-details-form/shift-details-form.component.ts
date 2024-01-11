import { Component, Inject, OnInit } from '@angular/core';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShiftDetailsDashComponent } from '../shift-details-dash/shift-details-dash.component';

@Component({
  selector: 'app-shift-details-form',
  templateUrl: './shift-details-form.component.html',
  styleUrls: ['./shift-details-form.component.css']
})
export class ShiftDetailsFormComponent implements OnInit {
  loader: any;
  startDate: any;
  endDate: any;
  shiftName: any;
  shiftNameList: any;
  startTime: any;
  endTime: any;
  restDays: any;
  restDayList: any;
  shiftTimeList: any;
  shiftID: any;
  dropdownSettingsRestDays: any = {};
  public restDaysArray: any = [];
  public restDaysArray1: any = [];
  shiftDetailsList: any;
  employeeName: any;
  public selectedstaff: any = [];
  jDate: any;
  userName:any;
  attactments: any = [];
  showPopup: number = 0;
  messageId: number = 0;
  managerEmailList: any;
  managerEmailID: any;

  constructor(public DigiofficecorehrService: DigiofficecorehrService, private activatedroute: ActivatedRoute, public dialogRef: MatDialogRef<ShiftDetailsDashComponent>,
    @Inject(MAT_DIALOG_DATA) public ID: any) { }

  ngOnInit(): void {
    debugger
    this.jDate = localStorage.getItem('jdate');
    this.userName = localStorage.getItem('UserName');
    this.shiftName = "";
    this.restDays = "";
    this.dropdownSettingsRestDays = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 2,
      limitSelection: 2,
      allowSearchFilter: true
    };

    this.restDayList = [
      {
        'id': 1,
        'name': 'Monday'
      },
      {
        'id': 2,
        'name': 'Tuesday'
      },
      {
        'id': 3,
        'name': 'Wednesday'
      },
      {
        'id': 4,
        'name': 'Thursday'
      },
      {
        'id': 5,
        'name': 'Friday'
      },
      {
        'id': 6,
        'name': 'Saturday'
      },
      {
        'id': 7,
        'name': 'Sunday'
      }
    ]

    this.getData();
  }

  public getData() {
    this.DigiofficecorehrService.GetShiftMaster()
      .subscribe({
        next: data => {
          debugger
          this.shiftNameList = data;
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
              this.shiftDetailsList = data.filter(x => x.id == this.ID);
              this.startDate = this.shiftDetailsList[0].filterdate;
              this.endDate = this.shiftDetailsList[0].filterenddate;
              this.shiftName = this.shiftDetailsList[0].shiftName;
              this.startTime = this.shiftDetailsList[0].startTime;
              this.endTime = this.shiftDetailsList[0].endTime;
              this.restDays = this.shiftDetailsList[0].restdays;
              this.employeeName = this.shiftDetailsList[0].name;
            }
          })
      }
    })

    this.DigiofficecorehrService.GetMyDetailsByStaffID(localStorage.getItem('staffid'))
      .subscribe({
        next: data => {
          debugger
          this.managerEmailList = data;
          this.managerEmailID = this.managerEmailList[0].manageremailid;
          this.loader = false;
        }
      })
  }

  public cancel() {
    location.href = "#/Employee/ShiftDetailsDash";
    this.loader = false;
    this.dialogRef.close(false);
  }

  public submit() {
    debugger;
    this.showPopup = 0;
    // this.restDays = '';
    // for (let i = 0; i < this.restDaysArray1.length; i++) {
    //   this.restDays = this.restDays + this.restDaysArray1[i].name + ','
    // }
    if (this.startDate == undefined || this.shiftName == undefined || this.shiftName == "" ||
      this.endDate == undefined ||
      this.startTime == undefined || this.endTime == undefined) {
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 7;
    }
    else {
    
      for (let i = 0; i < this.restDaysArray1.length; i++) {
        this.restDays = this.restDays + this.restDaysArray1[i].name + ',';
      }
      let entity = {
        'ShiftDate': this.startDate,
        'ShiftName': this.shiftName,
        'StartTime': '2022-04-30 10:00:00.000',
        'EndTime': '2022-04-30 10:00:00.000',
        'StaffID1': localStorage.getItem('staffid'),
        'EndDate': this.endDate,
        'RestDays': this.restDays
      }
      this.DigiofficecorehrService.InsertStaffShiftDetails(entity).subscribe(res => {
        debugger;
        if (res == 0) {
          Swal.fire('Please choose another dates as these dates are overlapping with your existing shift');
        }
        else {
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 8;
          this.dialogRef.close(false);
          location.href = "#/Employee/ShiftDetailsDash";
          this.sendEmail();
          this.InsertPushNotification();
          this.InsertPushNotificationformanager();
        }
      })
    }
  }

  deviceid: any;
  public InsertPushNotification() {
    this.DigiofficecorehrService.pushnotificationtomobile(
    localStorage.getItem('staffid'),
      'Your Shift Request Sent Successfully !!',
      'Shift'
    );
  }


  public InsertPushNotificationformanager() {
    this.DigiofficecorehrService.pushnotificationtomobile(
      localStorage.getItem('supervisor'),
      'Hi  <br> Your Employee ' + this.userName + ' has Applied Shift Request in Digi-Office.',
      'Shift'
    );
  }



  public sendEmail() {
    var entity1 = {
      'FromUser': 'Admin',
      'emailto': this.managerEmailID,
      'emailsubject': 'Shift Request',
      'Message': 'Your Shift Request Sent Successfully !!',
      'emailbody': 'Hi  <br> Your Employee ' + this.userName + ' has Applied Shift Request in Digi-Office., <br> Please Login in DigiOffice to Approve. <br><br>' + '<br>  <br> Thanks <br> Team Digi-Office',
      'attachmenturl': this.attactments,
      'cclist': this.managerEmailID,
      'bcclist': this.managerEmailID,
    }
    this.DigiofficecorehrService.sendemailattachementsforemail(entity1)
      .subscribe({
        next: data => {
          debugger
          this.attactments = [];
          this.loader = false;
        }
      })
  }

  public update() {
    this.showPopup = 0;
    // for (let i = 0; i < this.restDaysArray1.length; i++) {
    //   this.restDays = this.restDays + this.restDaysArray1[i].name + ','
    // }
    // if (this.restDaysArray1.length == 1) {
    //   this.getDaysBetweenDates(this.startDate, this.endDate, this.restDaysArray1[0].name, '');
    // } else {
    //   this.getDaysBetweenDates(this.startDate, this.endDate, this.restDaysArray1[0].name, this.restDaysArray1[1].name);
    // }
    var entity = {
      'ID': this.ID,
      'ShiftDate': this.startDate,
      'ShiftName': this.shiftName,
      'StartTime': this.startTime,
      'EndTime': this.endTime,
      'EndDate': this.endDate
    }
    this.DigiofficecorehrService.UpdateStaffShiftDetails(entity).subscribe(res => {
      debugger
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 10;
      this.dialogRef.close(false);
      location.href = "#/Employee/ShiftDetailsDash";
      this.loader = false;
    })
  }

  onItemSelect(item: any) {
    debugger
    console.log(item);
    this.restDaysArray1.push(item)
  }

  restDaysOnItemDeSelect(item: any): void {
    debugger
    var index = this.restDaysArray1.filter((x: { name: any; }) => x.name == item.name);
    let index1 = index[0].id
    var inde = this.restDaysArray1.map((x: { id: any; }) => {
      return x.id;
    }).indexOf(index1);
    this.restDaysArray1.splice(inde, 1);
  }

  public getShiftTime() {
    debugger
    this.DigiofficecorehrService.GetShiftMaster()
      .subscribe({
        next: data => {
          debugger
          this.loader = false;
          this.shiftTimeList = data.filter(x => x.description == this.shiftName)
          this.startTime = this.shiftTimeList[0].starttime,
            this.endTime = this.shiftTimeList[0].endtime,
            this.shiftID = this.shiftTimeList[0].id
        }
      })
  }

  public getDaysBetweenDates(start: any, end: any, dayName: any, dayName2: any) {
    debugger
    var result = [];
    var result1 = [];
    var days: any = { sun: 0, mon: 1, tue: 2, wed: 3, thu: 4, fri: 5, sat: 6 };
    var day = days[dayName.toLowerCase().substr(0, 3)];
    var day1 = days[dayName2.toLowerCase().substr(0, 3)];
    var current = new Date(start);
    current.setDate(current.getDate() + (day - current.getDay() + 7) % 7);
    while (current < new Date(end)) {
      result.push(new Date(+current));
      current.setDate(current.getDate() + 7);
    }
    var current1 = new Date(start);
    current1.setDate(current1.getDate() + (day1 - current1.getDay() + 7) % 7);
    while (current1 < new Date(end)) {
      result.push(new Date(+current1));
      current1.setDate(current1.getDate() + 7);
    }
    console.log(result.length + result1.length)
    debugger
    return result;
  }

  public getEndDate() {
    this.showPopup = 0;
    if (this.endDate < this.startDate) {
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 29;
      this.endDate = "";
    }
    if (new Date(this.jDate) > new Date(this.startDate)) {
      this.loader = false;
      Swal.fire('Sorry, Shift Date is prior the New Hire Date');
      this.loader = false;
    }
    this.DigiofficecorehrService.GetCurrentPhTime(localStorage.getItem('staffid'), this.startDate, this.endDate)
      .subscribe({
        next: data => {
          debugger
          let temp: any = data;
          if (temp[0].overlappingshifts > 0) {
            Swal.fire('Please choose another dates as these dates are overlapping with your existing shift');
            this.loader = false;
          }
        }
      })
  }
}