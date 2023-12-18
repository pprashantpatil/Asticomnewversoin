import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Login/login/login.component';
// import { LoginComponent } from './Pages/login/login.component';
import { AuthguardGuard } from './Services/authguard.guard'

const routes: Routes = [

  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
 { path: 'Manager', loadChildren: () => import('./Modules/manager/manager.module').then(m => m.ManagerModule) ,canActivate: [AuthguardGuard]},
 

];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
