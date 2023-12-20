import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';
import { CommonalertpageComponent } from '../commonalertpage/commonalertpage.component';
import { NgWizardConfig, NgWizardModule, THEME } from 'ng-wizard';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.circles
};
@NgModule({
  declarations: [
    LoaderComponent,
    CommonalertpageComponent
  ],
  imports: [
    CommonModule,
    NgWizardModule.forRoot(ngWizardConfig),
  ],
  exports:[
    LoaderComponent,
    CommonalertpageComponent,
    CommonModule,
    NgWizardModule
  ]
})
export class SharedModuleModule { }
