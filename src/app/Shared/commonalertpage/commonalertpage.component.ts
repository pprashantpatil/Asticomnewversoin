import { Component, Input, OnChanges } from '@angular/core';
import Swal from 'sweetalert2';
import { DigiofficecorehrService } from '../../Services/digiofficecorehr.service';

@Component({
  selector: 'app-commonalertpage',
  templateUrl: './commonalertpage.component.html',
  styleUrls: ['./commonalertpage.component.css']
})
export class CommonalertpageComponent implements OnChanges {

  @Input() messageId: number = 0;
  message: string = "";

  constructor(private DigiofficecorehrService: DigiofficecorehrService) { }

  ngOnChanges(): void {
    console.log("messageId", this.messageId)
    this.DigiofficecorehrService.getMessages().subscribe((data: any) => {

      let list = data.filter((x: { id: number; }) => x.id == this.messageId);

      this.message = list[0].message;

      Swal.fire(this.message)


    }, error => {
      //console.log("error", error)
    })



  }

}

