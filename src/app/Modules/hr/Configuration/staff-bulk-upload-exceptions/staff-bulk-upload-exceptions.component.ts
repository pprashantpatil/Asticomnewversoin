import { Component, OnInit } from '@angular/core';
import { DigiofficecorehrService } from 'src/app/Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-staff-bulk-upload-exceptions',
  templateUrl: './staff-bulk-upload-exceptions.component.html',
  styleUrls: ['./staff-bulk-upload-exceptions.component.css']
})
export class StaffBulkUploadExceptionsComponent implements OnInit {
search: any;
  constructor(public DigiofficeService: DigiofficecorehrService) { }
  currentUrl: any;
  term: any;
  exceptionList: any;
  loader:any;
  p: any = 1;
  count1: any = 10;
  showPopup: number = 0;
  messageId: number = 0;
  fileName = 'Bulk Exception Log.xlsx';
  
  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.loader=true;
    this.GetStaffBulkUploadExceptions();
  }
  
  public GetStaffBulkUploadExceptions() {
    debugger
    this.loader=true;
      this.DigiofficeService.GetStaffBulkUploadExceptions()
        .subscribe({
          next: data => {
            debugger
            this.exceptionList = data;
            this.loader=false;
          }, error: (err) => {
            // Swal.fire('Issue in Getting Exception');
            this.loader = false;
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

  public openDeletePopUp(id: any) {
    this.showPopup=0;
    Swal.fire({
      title: 'Delete record',
      text: "Are you sure you want to delete it?",
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Proceed'
    }).then((result) => {
      if (result.value == true) {
        this.DigiofficeService.DeleteStaffBulkUploadExceptions(id)
          .subscribe({
            next: data => {
              Swal.fire('Deleted Successfully');
              this.ngOnInit();
            }
          })
      }
    });
  }

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('document');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

}