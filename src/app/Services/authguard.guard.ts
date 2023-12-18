import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  session: any

  constructor(
    private router: Router) { }
    
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): 
    
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
// <<<<<<< HEAD
// <<<<<<< HEAD
      this.session = sessionStorage.getItem('temp23');
// =======
//        this.session = localStorage.getItem('token');
  
// >>>>>>> c2974a382ae2bb6c80d6d9636d5c5fbc38a89aa5
// =======
// <<<<<<< HEAD
//       this.session = sessionStorage.getItem('temp23');
// =======
      //  this.session = localStorage.getItem('token');
  
// >>>>>>> c2974a382ae2bb6c80d6d9636d5c5fbc38a89aa5
// =======
      // this.session = sessionStorage.getItem('temp');
// >>>>>>> 8686f2058f864d0939e7750314645c5d08acc04b
// >>>>>>> 660e0c685b9cfc83626a45fc6cd41438a2caaff0
      debugger
      //var isAuthenticated = this.session;
      if (this.session == null ||this.session==undefined||this.session=='') {
        debugger
        //
        debugger
        localStorage.clear()
        sessionStorage.clear();
        localStorage.setItem('roledid', "0");
        this.router.navigate(['/Login']);
        location.reload()
        return false;
   
      }
      else {
        return true;
      }
  }
  
}
