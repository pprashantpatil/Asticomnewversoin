import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HrRoutingModule } from './hr-routing.module';
import { AddressDetailsWizardComponent } from './address-details-wizard/address-details-wizard.component';
import { SharedModuleModule } from 'src/app/Shared/shared-module/shared-module.module';
import { FormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AddressDetailsWizardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HrRoutingModule,
    SharedModuleModule,
    NgMultiSelectDropDownModule
  ]
})
export class HrModule { }
