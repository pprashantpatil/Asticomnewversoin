import { Component, Inject, OnInit } from '@angular/core';
import { DigiofficecorehrService } from '../../../../Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-otratesnew',
  templateUrl: './otratesnew.component.html',
  styleUrls: ['./otratesnew.component.css']
})
export class OtratesnewComponent implements OnInit {

  constructor(public DigiofficeService: DigiofficecorehrService, private activatedroute: ActivatedRoute, @Inject(MAT_DIALOG_DATA) public id: any, public dialogRef: MatDialogRef<OtratesnewComponent>) { }
  day: any;
  normal: any;
  oT: any;
  nD: any;
  nDOT: any;
  result: any;

  currentUrl: any;
  loader: any;
  showPopup: number = 0;
  messageId: number = 0;
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader = true;
    this.GetOTRatesActiveParam();
  }

  public GetOTRatesActiveParam() {
    this.loader = true;
    this.activatedroute.params.subscribe(params => {
      debugger

      this.loader = false;
      if (this.id != null && this.id != undefined) {
        this.GetOTRates();
        this.loader = false;
      }
    })
  }

  public Cancel() {
    debugger
    location.href = "#/Admin/Otratesdash";
    this.loader = false;
  }

  GetOTRates() {
    this.loader = true;
    this.DigiofficeService.GetOTRates()
      .subscribe({
        next: data => {
          debugger
          this.result = data;
          this.loader = false;
          this.result = this.result.filter((x: { id: any; }) => x.id == Number(this.id));
          this.day = this.result[0].day;
          this.normal = this.result[0].normal;
          this.oT = this.result[0].ot;
          this.nD = this.result[0].nd;
          this.nDOT = this.result[0].ndot;
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

  save() {
    this.showPopup = 0;
    this.loader = true;
    if (this.day == undefined || this.day == null || this.day == '' ||
      this.normal == undefined || this.normal == null || this.normal == '' || this.oT == undefined ||
      this.oT == null || this.oT == '') {
      /*  Swal.fire("Please fill Mandatory Fields"); */
      this.loader = false;
      this.showPopup = 1;
      this.messageId = 7;
    } else {
      var json = {
        "Day": this.day,
        "Normal": this.normal,
        "OT": this.oT,
        "ND": this.nD,
        "NDOT": this.nDOT,
      }
      this.DigiofficeService.InsertOTRates(json)
        .subscribe({
          next: data => {
            debugger
            let result = data;
            /*     Swal.fire('Saved Successfully!!') */
            this.dialogRef.close(false);
            this.loader = false;
            this.showPopup = 1;
            this.messageId = 8;
          }, error: (err) => {
            // Swal.fire('Issue in Inserting OT Rates');
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

  Update() {
    debugger
    this.showPopup = 0;
    this.loader = true;
    var json = {
      "ID": this.id,
      "Day": this.day,
      "Normal": this.normal,
      "OT": this.oT,
      "ND": this.nD,
      "NDOT": this.nDOT,
    };
    this.DigiofficeService.UpdateOTRates(json)
      .subscribe({
        next: data => {
          debugger
          let result = data;
          this.dialogRef.close(false);
          /*     Swal.fire("Updated Successfully.....!"); */
          this.loader = false;
          this.showPopup = 1;
          this.messageId = 10;
        }, error: (err) => {
          // Swal.fire('Issue in Updating OT Rates');
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
