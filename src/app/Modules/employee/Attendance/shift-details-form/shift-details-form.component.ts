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
  short: any;
  description: any;
  startDate: any;
  endDate: any;
  shiftName: any;
  shiftNameList: any;
  startTime: any;
  endTime: any;
  restDays: any;
  restDayList: any;
  dropdownSettingsRestDays: any = {};
  public restDaysArray: any = [];
  public restDaysArray1: any = [];

  constructor(public DigiofficecorehrService: DigiofficecorehrService, private activatedroute: ActivatedRoute, public dialogRef: MatDialogRef<ShiftDetailsDashComponent>,
    @Inject(MAT_DIALOG_DATA) public ID: any) { }

  ngOnInit(): void {
    debugger
    this.shiftName = "";
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
  }

  public cancel() {
    location.href = "#/Employee/ShiftDetailsDash";
    this.loader = false;
    this.dialogRef.close(false);
  }

  public submit() {
    let Entity = {
      'ShiftDate': this.startDate,
      'ShiftName': this.shiftName,
      'StartTime': '2022-04-30 10:00:00.000',
      'EndTime': '2022-04-30 10:00:00.000',
      'StaffID1': localStorage.getItem('staffid'),
      'EndDate': this.endDate,
      'RestDays': this.restDays
    }
    this.DigiofficecorehrService.InsertStaffShiftDetails(Entity).subscribe(res => {
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
}