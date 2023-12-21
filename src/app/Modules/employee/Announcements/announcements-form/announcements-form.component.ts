import { Component, Inject, OnInit } from '@angular/core';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { AnnouncementsDashComponent } from '../announcements-dash/announcements-dash.component';

@Component({
  selector: 'app-announcements-form',
  templateUrl: './announcements-form.component.html',
  styleUrls: ['./announcements-form.component.css']
})
export class AnnouncementsFormComponent implements OnInit {
  loader: any;
  showPopup: number = 0;
  messageId: number = 0;
  type: any;
  short: any;
  description: any;
  startDate: any;
  allCity: any;
  cityList: any;
  city: any;
  public attachments21: any = [];
  public attachments: any = [];
  public attachmentsurl: any = [];
  staffList: any;
  holidayList: any;
  attachment: any;
  attachment1: any;
  link: any;
  endDate: any;
venue: any;

  constructor(public DigiofficecorehrService: DigiofficecorehrService, private datepipe: DatePipe, public dialogRef: MatDialogRef<AnnouncementsDashComponent>,
    @Inject(MAT_DIALOG_DATA) public ID: any) { }

  ngOnInit(): void {
    debugger
    this.type = "";
    this.city = "";
    this.getData();
  }

  public getData() {
    this.DigiofficecorehrService.GetCityType()
      .subscribe({
        next: data => {
          debugger
          this.cityList = data;
          this.loader = false;
        }
      })

    this.DigiofficecorehrService.GetHolidays()
      .subscribe({
        next: data => {
          debugger
          this.holidayList = data.filter(x => x.id == this.ID);
          this.short = this.holidayList[0].holiday
          this.description = this.holidayList[0].holidayDescription
          this.startDate = this.datepipe.transform(this.holidayList[0].holidayDate, 'yyyy-MM-dd');
          this.attachment = this.holidayList[0].attachment;
          this.attachment1 = this.holidayList[0].attachment1;
          this.type = this.holidayList[0].holidayCategory;
          this.city = this.holidayList[0].region;
          this.loader = false;
        }
      })
  }

  public cancel() {
    location.href = "#/Employee/HolidaysDash";
    this.loader = false;
    this.dialogRef.close(false);
  }

  public submit() {
    this.showPopup = 0;
    this.loader = true;
    if (this.type == undefined || this.type == null || this.type == '' ||
      this.type == 0 || this.short == null || this.short == '' || this.short == undefined ||
      this.short == 0 || this.description == '' || this.description == undefined || this.description == null ||
      this.startDate == '' || this.startDate == undefined || this.startDate == null || this.attachments21 == null || this.attachments21 == undefined
      || this.attachments21 == "") {
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 7
    } else {
      this.DigiofficecorehrService.ProjectAttachments(this.attachments21)
        .subscribe({
          next: data => {
            debugger
            this.attachmentsurl.push(data);
            this.attachments21.length = 0;
            this.InsertHolidays();
            this.loader = false;
          }
        })
    }
  }

  public InsertHolidays() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    var entity = {
      Holiday: this.short,
      HolidayDescription: this.description,
      HolidayDate: this.startDate,
      Attachment: this.attachmentsurl[0],
      HolidayCategory: this.type,
      Region: this.city
    }
    this.DigiofficecorehrService.InsertHolidays(entity)
      .subscribe({
        next: data => {
          debugger
          if (data != 0) {
            this.saveEmployeeAttendanceHolidays();
            Swal.fire("Saved Successfully")
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 8
            this.dialogRef.close(false);
            location.href = "#/Employee/HolidayDashboard";
          }
        }
      })
  }

  public saveEmployeeAttendanceHolidays() {
    debugger
    this.DigiofficecorehrService.GetAllStaffNew().
      subscribe({
        next: data => {
          debugger
          this.staffList = data.filter(x => x.payrollBit == 0);
          for (let i = 0; i < this.staffList.length; i++) {
            var obj = {
              'EmployeeID': this.staffList[i].id,
              'Date': this.startDate,
              'Holidaytype': this.type
            }
            this.DigiofficecorehrService.InsertEmployeeAttendance_Holidays(obj).subscribe(
              data => {
                debugger
              },
            )
          }
        }
      })
  }

  public update() {
    this.showPopup = 0;
    if (this.type == undefined || this.type == null || this.type == '' ||
      this.type == 0 || this.short == null || this.short == '' || this.short == undefined ||
      this.short == 0 || this.description == '' || this.description == undefined || this.description == null ||
      this.startDate == '' || this.startDate == undefined || this.startDate == null || this.attachment == undefined) {
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 7
    } else {
      this.loader = true;
      this.DigiofficecorehrService.ProjectAttachments(this.attachments21)
        .subscribe({
          next: data => {
            debugger
            this.attachmentsurl.push(data);
            this.attachments21.length = 0;
            this.UpdateHolidays();
            this.loader = false;
          }
        })
    }
  }

  public UpdateHolidays() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    var entity = {
      ID: this.ID,
      Holiday: this.short,
      HolidayDescription: this.description,
      HolidayDate: this.startDate,
      Attachment: this.attachmentsurl[0] == "" ? this.attachment1 : this.attachmentsurl[0],
      HolidayCategory: this.type,
      Region: this.city
    }
    this.DigiofficecorehrService.UpdateHolidays(entity)
      .subscribe({
        next: data => {
          debugger
          location.href = "#/Employee/HolidayDashboard";
          Swal.fire("Updated Successfully")
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 10
          this.dialogRef.close(false);
        }
      })
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