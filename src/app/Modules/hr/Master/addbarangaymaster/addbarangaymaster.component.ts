import { Component, Inject, OnInit } from '@angular/core';
import { DigiofficecorehrService } from '../../../../Services/digiofficecorehr.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-addbarangaymaster',
  templateUrl: './addbarangaymaster.component.html',
  styleUrls: ['./addbarangaymaster.component.css']
})
export class AddbarangaymasterComponent implements OnInit {

  constructor(public DigiofficeService: DigiofficecorehrService, private activatedroute: ActivatedRoute,private matDialog: MatDialog, @Inject(MAT_DIALOG_DATA) public ID: any, public dialogRef: MatDialogRef<AddbarangaymasterComponent>) { }

  leavelist: any;
  Short: any;
  Description: any;
  Countrylist: any;
  StateID: any;
  Name: any;
  Citylist: any;
  Statelist: any;
  loader: any;
  term: any;
  CountryID: any;
  CityID: any;

  ngOnInit(): void {
    this.CountryID="0";
    this.StateID="0";
    this.CityID="0";
    this.GetCountryType();
    this.GetStateType();
    this.ActivatedRouteCall();
    this.loader = true;
  }

  public ActivatedRouteCall() {
    this.activatedroute.params.subscribe(params => {
      debugger;

      if (this.ID == undefined) {
        // this.CountryID = "";
        // this.StateID = "";
        // this.CityID = "";
        this.loader = false;
      }
      else {
        this.DigiofficeService.GetBarangayMaster().subscribe(
          data => {
            debugger
            this.leavelist = data.filter(x => x.id == this.ID);
            this.CountryID = this.leavelist[0].countryID;
       
            this.DigiofficeService.GetStateType().subscribe(data => {
              debugger
              this.leavelist = data.filter(x => x.CountryID == this.CountryID);
            })
            this.StateID = this.leavelist[0].provinceID;

            this.Name = this.leavelist[0].description;

            this.GetStateType();
            this.DigiofficeService.GetCityType().subscribe(data => {
              debugger
              this.Citylist = data.filter(x => x.stateID == this.StateID)

            })
            this.CityID = this.leavelist[0].cityID;
          },
        );
        this.loader = false;
      }
    }
    )
  }

  public GetCountryType() {
    this.DigiofficeService.GetCountryType().subscribe(data => {
      debugger
      this.Countrylist = data;
    })
  }

  public GetStateID(evene: any) {
    debugger
    this.DigiofficeService.GetCityType().subscribe(data => {
      debugger
      this.Citylist = data.filter(x => x.stateID == evene.target.value);
      this.loader = false;
    })
  }

  public GetCountryID(evene: any) {
    debugger
    this.DigiofficeService.GetStateType().subscribe(data => {
      debugger
      this.leavelist = data.filter(x => x.countryID == evene.target.value);
      this.loader = false;
    })
  }


  public GetStateType() {
    debugger
    this.DigiofficeService.GetStateType().subscribe(data => {
      debugger
      this.leavelist = data;
      this.loader = false;
    })
  }

  public Cancel() {
    debugger
    location.href = "#/Admin/Barangaymaster";
  }

  public InsertCityType() {
    debugger;
    if (this.StateID == undefined || this.StateID == 0 || this.Name == undefined || this.Name == "" || this.CityID == undefined || this.CityID == 0) {
      Swal.fire('Please Fill All Fields');
      this.loader = false;
    } else {
      var entity = {
        'Name': this.Name,
        'CountryID': this.CountryID,
        'ProvinceID': this.StateID,
        'CityID': this.CityID,
        'Description': this.Name
      }
      this.DigiofficeService.InsertBarangayMaster(entity).subscribe(data => {
        if (data != 0) {
          Swal.fire("Saved Successfully");
          this.dialogRef.close(false);
         
          this.loader = false;
        }
      })
    }
  }

  public UpdateCityType() {
    debugger;
    if (this.StateID == undefined || this.StateID == 0 || this.Name == undefined || this.Name == "" || this.CityID == undefined || this.CityID == 0) {
      Swal.fire('Please Fill All Fields');
      this.loader = false;
    } else {
      var entity = {
        ID: this.ID,
        'Name': this.Name,
        'CountryID': this.CountryID,
        'ProvinceID': this.StateID,
        'CityID': this.CityID,
        'Description': this.Name
      }
      this.DigiofficeService.UpdateBarangayMaster(entity).subscribe(data => {
        Swal.fire("Updated Successfully");
        this.loader = false;
        this.dialogRef.close(false);
      })
    }
  }
}
