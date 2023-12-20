import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressDetailsWizardComponent } from './address-details-wizard/address-details-wizard.component';
import { AuthguardGuard } from '../../Services/authguard.guard';
const routes: Routes = [
  { path: 'AddressDetailsWizard', component: AddressDetailsWizardComponent  ,canActivate: [AuthguardGuard]},
  { path: 'AddressDetailsWizard/:id', component: AddressDetailsWizardComponent  ,canActivate: [AuthguardGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }
