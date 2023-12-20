import { Component, Inject, OnInit } from '@angular/core';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ViewPolicyDashComponent } from '../view-policy-dash/view-policy-dash.component';

@Component({
  selector: 'app-policies-form',
  templateUrl: './policies-form.component.html',
  styleUrls: ['./policies-form.component.css']
})
export class PoliciesFormComponent implements OnInit {
  loader: any;
  showPopup: number = 0;
  messageId: number = 0;
  date: any;
  documentName: any;
  description: any;
  version: any;
  public attachments21: any = [];
  public attachments: any = [];
  public attachmentsurl: any = [];
  startDate: any;
  endDate: any;

  constructor(public DigiofficecorehrService: DigiofficecorehrService, public router: Router, public dialogRef: MatDialogRef<ViewPolicyDashComponent>,
    @Inject(MAT_DIALOG_DATA) public ID: any) { }

  ngOnInit(): void {
    debugger
  }

  public cancel() {
    this.router.navigate(['Employee/ViewPolicyDash', this.ID]);
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
        this.loader = false;
        this.InsertPolicies();
      }
    })
  }

  public InsertPolicies() {
    debugger;
    this.showPopup = 0;
    this.loader = true;
    var entity = {
      Date: this.date,
      Documnet_Name: this.documentName,
      Documnet_Description: this.description,
      Version: this.version,
      Attachment: this.attachmentsurl[0],
      FolderID: this.ID
    }
    this.DigiofficecorehrService.InsertPolicies(entity)
      .subscribe({
        next: data => {
          debugger
          if (data != 0) {
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 8;
            this.dialogRef.close(false);
            this.router.navigate(['Employee/ViewPolicyDash', this.ID]);
          }
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