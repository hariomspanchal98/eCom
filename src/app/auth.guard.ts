import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from './services/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   constructor(private router : Router, private service : HttpService){}

   canActivate(): any {
    if(this.service.loggedIn()){
      return true;
    }
    else{
      // console.log('hi')
      this.router.navigate(['seller/auth/login']);
    }
   }
}
