import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { CommonalertpageComponent } from '../commonalertpage/commonalertpage.component';



@NgModule({
  declarations: [
    LoaderComponent,
    CommonalertpageComponent
  ],
  imports: [
    CommonModule,
    
  ],
  exports:[
    LoaderComponent,
    CommonalertpageComponent,
    CommonModule
  ]
})
export class SharedModuleModule { }
