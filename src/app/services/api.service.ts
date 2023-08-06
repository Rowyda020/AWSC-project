import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  /******************************** crud Group **********************************/
  url="http://ims.aswan.gov.eg/api"
  postGroup(data: any) {
    return this.http.post<any>("http://localhost:3000/StrOpen/", data);
  }
  getGroup() {
    return this.http.get<any>("http://localhost:3000/GroupList/");
  }
  putGroup(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/GroupList/" + id, data);
  }
  deleteGroup(id: number) {
    return this.http.delete<any>("http://localhost:3000/GroupList/" + id);
  }

  postStrOpen(data: any) {
    return this.http.post<any>("http://localhost:3000/StrOpen/", data);
  }
  getStrOpen() {
    return this.http.get<any>("http://localhost:3000/StrOpen/");
  }
  putStrOpen(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/StrOpen/" + id, data);
  }
  deleteStrOpen(id: number) {
    return this.http.delete<any>("http://localhost:3000/StrOpen/" + id);
  }

  postStrOpenDetails(data: any) {
    return this.http.post<any>("http://localhost:3000/StrOpenDetails/", data);
  }
  getStrOpenDetails() {
    return this.http.get<any>("http://localhost:3000/StrOpenDetails/");
  }
  putStrOpenDetails(data: any, id: number) {
    // console.log("strOpenDetails id: ", id, "stropenedDetails data: ", data);
    return this.http.put<any>("http://localhost:3000/StrOpenDetails/" + id, data);
  }
  deleteStrOpenDetails(HeaderId: number) {
    // console.log("deleted row id: ", HeaderId)
    return this.http.delete<any>("http://localhost:3000/StrOpenDetails/" + HeaderId);
  }

  getStoreList() {
    return this.http.get<any>("http://localhost:3000/StoreList/");
  }
  getStoreByID(id: number) {
    return this.http.get<any>("http://localhost:3000/StoreList/" + id);
  }


/********************************  unit crud  **********************************/

postunit(data : any){
  return this.http.post<any>("https://ims.aswan.gov.eg/api/STR_Unit/Add-Unit",data);
}
getunit(){
  return this.http.get<any>("https://ims.aswan.gov.eg/api/STR_Unit/get-all-Unit");
}
putunit(data:any){
  return this.http.put<any>("https://ims.aswan.gov.eg/api/STR_Unit/update-Unit",data);
}
deleteunit(id:number){
  return this.http.delete<any>("https://ims.aswan.gov.eg/api/STR_Unit/delete-Unit-by-id/{id}");
}

 //Grades

 postGrade(data : any){
  return this.http.post<any>("https://ims.aswan.gov.eg/api/STR_Grade/Add-grade",data);
}
getGrade(){
  return this.http.get<any>("https://ims.aswan.gov.eg/api/STR_Grade/get-all-grades");
}
putGrade(data:any){
  return this.http.put<any>("https://ims.aswan.gov.eg/api/STR_Grade/update-grade-by-id/{id}" ,data);
}
deleteGrade(id:number){
  return this.http.delete<any>("https://ims.aswan.gov.eg/api/STR_Grade/delete-grade/{id}");
}
getAllCommodity():Observable<any> {
  return this.http.get<any>("https://ims.aswan.gov.eg/api/STR_Commodity/get-all-commodity");
}



    //Platoon

    postPlatoon(data : any){
      return this.http.post<any>("https://ims.aswan.gov.eg/api/STR_Platoon/Add-platoon",data);
    }
    getPlatoon(){
      return this.http.get<any>("https://ims.aswan.gov.eg/api/STR_Platoon/get-all-Platoons");
    }
    putPlatoon(data:any){
      return this.http.put<any>("https://ims.aswan.gov.eg/api/STR_Platoon/update-Platoon",data);
    }
    deletePlatoon(id:number){
      return this.http.delete<any>("https://ims.aswan.gov.eg/api/STR_Platoon/delete-Platoon/{id}");
    }
    getAllGrades():Observable<any> {
      return this.http.get<any>("https://ims.aswan.gov.eg/api/STR_Grade/get-all-grades");
    }


/**crud group */

  postStores(data: any){
    return this.http.post<any>("http://localhost:3000/storeList/",data);
  }

  
  
  getstores(){
    return this.http.get<any>("http://localhost:3000/storeList/");
  }
 
 
  putstores(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/storeList/"+id,data);
  }
 

  

  deletestores(id:number){
    return this.http.delete<any>("http://localhost:3000/storeList/"+id);
  }
  getAllTodos() :Observable<any>{
    return this.http.get<any>("http://localhost:3000/commidity/");
  }
  

  getAllstores() :Observable<any>{
    return this.http.get<any>("http://localhost:3000/store/");
  }


  


  // crud role

  postRole(data : any){
    return this.http.post<any>(`${this.url}/PR_Role/add-Role`,data);
  }
  getAllRole(){
    return this.http.get<any>(`${this.url}/PR_Role/get-all-roles`);
  }
  putRole(data : any,id :number){
    return this.http.put<any>("http://localhost:3000/rolelist/"+id,data);
  }
  deleteRole(id:number){
    return this.http.delete<any>("http://localhost:3000/rolelist/"+id);
  }


  // salvana
  postProduct(data: any){
    return this.http.post<any>("http://localhost:3000/productList/",data);
  }
  putProduct(data:any,id:number){
    return this.http.put<any>("http://localhost:3000/productList/"+id,data);
  }
 
  getProduct(){
    return this.http.get<any>("http://localhost:3000/productList/");
  }
 

  deleteProduct(id:number){
    return this.http.delete<any>("http://localhost:3000/productList/"+id);
  }

  
  // Crud CostCenter
  postCostCenter(data: any){
    return this.http.post<any>(`${this.url}/FI_CostCenter/Add-CostCenter`,data);
  }

  getCostCenter(){
    return this.http.get<any>(`${this.url}/FI_CostCenter/get-all-CostCenter`);
  }


  putCostCenter(data:any,id:number){
    return this.http.put<any>(`${this.url}/FI_CostCenter/update-CostCenter`+id,data);
  }

  deleteCostCenter(id:number){
    return this.http.delete<any>(`${this.url}FI_CostCenter/delete-CostCenter-by-id/${id}`+id);
  }

// crud category
  
  postCategory(data: any){
    return this.http.post<any>(`${this.url}`,data);
  }

  getCategory(){
    return this.http.get<any>(`${this.url}`);
  }


  putCategory(data:any,id:number){
    return this.http.put<any>(`${this.url}`+id,data);
  }

  deleteCategory(id:number){
    return this.http.delete<any>(`${this.url}`+id);
  }
  
  getAllcommodity():any{
    return this.http.get<any>("http://localhost:3000/commodity/")
  } 
  getAllgrade(): any{
    return this.http.get<any>("http://localhost:3000/gradelist/")
  }
  getAllgroup(): any{
    return this.http.get<any>("http://localhost:3000/group/")
  }

getAllplaton(): any{
  return this.http.get<any>("http://localhost:3000/platon/")
}
getAllunit(): Observable<any>{
  return this.http.get<any>("http://localhost:3000/unit/")
}


// CRUD STORE

postStore(data: any){
  return this.http.post<any>(`${this.url}`,data);
}

getStore(){
  return this.http.get<any>(`${this.url}/STR_Store/get-all-Store`);
}


putStore(data:any,id:number){
  return this.http.put<any>("http://localhost:3000/store/"+id,data);
}

deleteStore(id:number){
  return this.http.delete<any>("http://localhost:3000/store/"+id);
}


}
