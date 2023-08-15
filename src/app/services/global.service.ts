import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  isLogIn = false
  bgColor :any
  isStatus= "مفعل"

  

  public navFlag:boolean=true

  baseUrl = "http://127.0.0.1:8000/api"

  url="http://ims.aswan.gov.eg/api"
  constructor(private http : HttpClient,private router : Router) { }

  
  // getUsers():Observable<any>{
  //   return this.http.get(`${this.baseUrl}/auth/users`);
  // }

  getUsers():Observable<any>{
    return this.http.get(`https://ims.aswan.gov.eg/api/AddReceipt/get-all-Receipt`);
  }

 getUserById(id:any):Observable<any>{
  return this.http.get(`${this.url}/PR_User/get-user-by-id/${id}`)
}


  login(obj:any):Observable<any>{
    // console.log("obj ", obj)
    return this.http.get(`${this.url}/PR_User/chekUser/${obj.name},${obj.password}`)
  }

  register(obj : any):Observable<any>{
    return this.http.post('http://ims.aswan.gov.eg/api/PR_User/Add-user' , obj)
  }

  authUser():Observable<any>{
    return this.http.get(`${this.baseUrl}/auth/user-profile`)
  }

  updateUser(obj : any):Observable<any>{
    return this.http.post(`${this.baseUrl}/auth/user-profile`,obj)
  }

  getRolesByUserId(userId:any):Observable<any>{
   console.log("userId ", userId)
   return this.http.get(`${this.url}/PR_User/getuser role/${userId}`)
  }
//  crud group
postGroup(data: any){
  return this.http.post<any>(`${this.url}/FI_CostCenter/Add-CostCenter`,data);
}

getGroup(){
  return this.http.get<any>(`${this.url}/PR_Group/get-all-groups`);
}


putGroup(data:any,id:number){
  return this.http.put<any>(`${this.url}/FI_CostCenter/update-CostCenter`+id,data);
}

deleteGroup(id:number){
  return this.http.delete<any>(`${this.url}FI_CostCenter/delete-CostCenter-by-id/${id}`+id);
  
}

getPermissionUserRoles(role:any){
 let userRoles=localStorage.getItem('userRoles')?.split('')
 console.log( userRoles)
  for(let i = 0; i < userRoles!.length; i++) {
    
    if(role== userRoles![i])
    
     return true
}
window.alert('You dont have the permission to visit this page')
this.router.navigate(['/home'])
      
return false
}
}


  