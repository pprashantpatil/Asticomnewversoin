import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { MyTeamAttendenceComponent } from './Attendance/my-team-attendence/my-team-attendence.component';
import { MyTeamWeeklyShiftComponent } from './Attendance/my-team-weekly-shift/my-team-weekly-shift.component';
import { MyTeamOverTimeDetailsComponent } from './Attendance/my-team-over-time-details/my-team-over-time-details.component';
import { MyTeamAttendanceCorrectionComponent } from './Attendance/my-team-attendance-correction/my-team-attendance-correction.component';
import { MyTeamLeaveDetailsComponent } from './Requests/my-team-leave-details/my-team-leave-details.component';
import { MyTeamTimesheetComponent } from './Requests/my-team-timesheet/my-team-timesheet.component';
import { ExitformalityformdashComponent } from './Requests/exitformalityformdash/exitformalityformdash.component';
import { TeamAttendanceReportsComponent } from './Reports/team-attendance-reports/team-attendance-reports.component';
import { TeamAttendanceCorrectionReportsComponent } from './Reports/team-attendance-correction-reports/team-attendance-correction-reports.component';
import { TeamLeaveReportsComponent } from './Reports/team-leave-reports/team-leave-reports.component';
import { TeamTimesheetReportsComponent } from './Reports/team-timesheet-reports/team-timesheet-reports.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModuleModule } from 'src/app/Shared/shared-module/shared-module.module';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ManagerRoutingModule } from './manager-routing.module';

@NgModule({
  declarations: [
    MyTeamAttendenceComponent,
    MyTeamWeeklyShiftComponent,
    MyTeamOverTimeDetailsComponent,
    MyTeamAttendanceCorrectionComponent,
    MyTeamLeaveDetailsComponent,
    MyTeamTimesheetComponent,
    ExitformalityformdashComponent,
    TeamAttendanceReportsComponent,
    TeamAttendanceCorrectionReportsComponent,
    TeamLeaveReportsComponent,
    TeamTimesheetReportsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxDropzoneModule,
    Ng2SearchPipeModule,
    NgbModule,
    BsDatepickerModule.forRoot(),
    NgxPaginationModule,
    SharedModuleModule,
    NgMultiSelectDropDownModule,
    ManagerRoutingModule
  ],
})
export class ManagerModule {}
