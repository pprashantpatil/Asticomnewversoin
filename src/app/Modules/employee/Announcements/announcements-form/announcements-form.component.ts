import { Component, Inject, OnInit } from '@angular/core';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  short: any;
  description: any;
  startDate: any;
  public attachments21: any = [];
  public attachments: any = [];
  public attachmentsurl: any = [];
  link: any;
  endDate: any;
  venue: any;
  announcementList: any;
  attachment: any;
  attachmentPath: any;
  companyID: any;

  constructor(public DigiofficecorehrService: DigiofficecorehrService, public router: Router, public dialogRef: MatDialogRef<AnnouncementsDashComponent>,
    @Inject(MAT_DIALOG_DATA) public ID: any) { }

  ngOnInit(): void {
    debugger
    this.companyID = sessionStorage.getItem('companyid');
    this.getData();
  }

  public getData() {
    this.DigiofficecorehrService.GetAnnouncementsByBuildingID(56)
      .subscribe({
        next: data => {
          debugger
          this.announcementList = data.filter(x => x.id == this.ID);
          this.loader = false;
          this.short = this.announcementList[0].name;
          this.description = this.announcementList[0].description;
          this.endDate = this.announcementList[0].time;
          this.venue = this.announcementList[0].venue;
          this.startDate = this.announcementList[0].dateTime
          this.attachment = this.announcementList[0].attachment;
          this.attachmentPath = this.announcementList[0].attachmentpath;
          this.link = this.announcementList[0].reason;
        }
      })
  }

  public cancel() {
    location.href = "#/Employee/AnnouncementsDash";
    this.loader = false;
    this.dialogRef.close(false);
  }

  public submit() {
    this.showPopup = 0;
    debugger
    this.loader = true;
    if (this.attachments21.length == 0) {
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    }
    else {
      this.DigiofficecorehrService.ProjectAttachments(this.attachments21)
        .subscribe({
          next: data => {
            debugger
            this.attachmentsurl.push(data);
            this.attachments.length = 0;
            this.InsertAnnouncement();
            this.loader = false;
          }
        })
    }
  }

  public InsertAnnouncement() {
    this.loader = true;
    this.showPopup = 0;
    debugger
    if (this.short == undefined || this.short == "" || this.description == undefined || this.description == "" || this.startDate == undefined || this.startDate == "" || this.endDate == undefined || this.endDate == "" || this.venue == undefined || this.venue == "") {
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 13;
    }
    else {
      var eb = {
        'Name': this.short,
        'FloorID': 1071322,
        'Description': this.description,
        'Reason': this.link,
        'DateTime': this.startDate,
        'Time': this.endDate,
        'Venue': this.venue,
        'ModifiedBy': 'Admin',
        'BuildingID': 56,
        'Attachment': this.attachmentsurl[0],
        'CityID': 0,

      }
      this.DigiofficecorehrService.InsertAnnouncements(eb)
        .subscribe({
          next: data => {
            debugger
            this.router.navigate(['/Employee/AnnouncementsDash']);
            this.dialogRef.close(false);
            this.InsertNotification();
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 8;
          }
        })
    }
  }

  public InsertNotification() {
    this.showPopup = 0
    debugger
    var entity = {
      'Date': new Date(),
      'Event': 'Announcement',
      'FromUser': 'Admin',
      'ToUser': this.companyID,
      'Message': 'There is an Announcement From HR',
      'Photo': 'Null',
      'Building': 'Dynamics 1',
      'UserID': localStorage.getItem('staffid'),
      'NotificationTypeID': 15,
      'VendorID': 0
    }
    this.DigiofficecorehrService.InsertNotification(entity)
      .subscribe({
        next: data => {
          debugger
          if (data != 0) {
          }
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 8;
          // location.reload();
          this.loader = false;
        }
      })
  }

  public update() {
    this.DigiofficecorehrService.ProjectAttachments(this.attachments21)
    .subscribe({
      next: data => {
        debugger
        this.attachmentsurl.push(data);
        this.attachments.length = 0;
        this.UpdateAnnouncement();
        this.loader = false;
      }
    })
  }

  public UpdateAnnouncement() {
    debugger
    this.showPopup = 0;
    this.loader = true;
    var eb = {
      'ID': this.ID,
      'Name': this.short,
      'Description': this.description,
      'Reason': this.link,
      'DateTime': this.startDate,
      'Venue': this.venue,
      'Time': this.endDate,
      'BuildingID': 56,
      'FloorID': 1071322,
      'CityID': 0,
      'Attachment': this.attachmentsurl[0] == "" ? this.attachmentPath : this.attachmentsurl[0],
    }
    this.DigiofficecorehrService.UpdateAnnouncements(eb)
      .subscribe({
        next: data => {
          debugger
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 10;
          this.attachments.length = 0;
          this.dialogRef.close(false);
          this.router.navigate(['/Employee/AnnouncementsDash']);
          this.loader = false;
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