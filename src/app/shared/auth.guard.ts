import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class authGuard implements CanActivate {
  constructor(private router : Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let userRole= localStorage.getItem('userRoles')
     

  //     userRole.forEach(element => {
  //     if( element==1)
  //       return true
  //     else
  //     window.alert('You dont have the permission to visit this page')
  //     this.router.navigateByUrl('login')
  //     return false;
  // })

  for(let i = 0; i < userRole!.length; i++) {
    let role = userRole![i];
    console.log(role);
    if(role=='3')
     return true
   else
   window.alert('You dont have the permission to visit this page')
   this.router.navigateByUrl('login')
    return false;
  }
  return true
}}