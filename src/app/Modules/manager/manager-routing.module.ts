import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyTeamAttendenceComponent } from './Attendance/my-team-attendence/my-team-attendence.component';
import { AuthguardGuard } from 'src/app/Services/authguard.guard';

const routes: Routes = [
  { path: 'MyTeamAttendence', component: MyTeamAttendenceComponent ,canActivate: [AuthguardGuard]},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  
  export class ManagerRoutingModule { }