import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) { }
  /******************************** crud Group **********************************/
  url = 'http://ims.aswan.gov.eg/api';
  baseApiUrl = "https://file.io"
  public reportData: [] = [];

  getSubGrads(selectedOption: any) {
    throw new Error('Method not implemented.');
  }
  get(arg0: string) {
    throw new Error('Method not implemented.');
  }

  /********************************  unit crud  **********************************/

  postunit(data: any) {
    return this.http.post<any>(
      'https://ims.aswan.gov.eg/api/STR_Unit/Add-Unit',
      data
    );
  }
  // here
  getunit() {
    return this.http.get<any>(
      'https://ims.aswan.gov.eg/api/STR_Unit/get-all-Unit'
    );
  }
  putunit(data: any) {
    return this.http.put<any>(
      'https://ims.aswan.gov.eg/api/STR_Unit/update-Unit/',
      data
    );
  }
  deleteunit(id: number) {
    return this.http.delete<any>(
      `http://ims.aswan.gov.eg/api/STR_Unit/delete-Unit-by-id/${id}`
    );
  }

  // start crud grade

  postGrade(data: any) {
    return this.http.post<any>(
      'https://ims.aswan.gov.eg/api/STR_Grade/Add-grade/',
      data
    );
  }
  getGrade() {
    return this.http.get<any>(
      'https://ims.aswan.gov.eg/api/STR_Grade/get-all-grades'
    );
  }
  putGrade(data: any) {
    return this.http.put<any>(
      'http://ims.aswan.gov.eg/api/STR_Grade/update-grade-by-id/',
      data
    );
  }
  deleteGrade(id: number) {
    return this.http.delete<any>(
      `https://ims.aswan.gov.eg/api/STR_Grade/delete-grade/${id}`
    );
  }
  getAllCommodity(): Observable<any> {
    return this.http.get<any>(
      'https://ims.aswan.gov.eg/api/STR_Commodity/get-all-commodity'
    );
  }

  getStrOpenDetails() {
    return this.http.get<any>('http://localhost:3000/StrOpenDetails/');
  }

  getStoreList() {
    return this.http.get<any>('http://localhost:3000/StoreList/');
  }
  getStoreByID(id: number) {
    return this.http.get<any>('http://localhost:3000/StoreList/' + id);
  }



  //Fatma

  //Platoon

  postPlatoon(data: any) {
    return this.http.post<any>(
      'https://ims.aswan.gov.eg/api/STR_Platoon/Add-platoon',
      data
    );
  }
  getPlatoon() {
    return this.http.get<any>(
      'https://ims.aswan.gov.eg/api/STR_Platoon/get-all-Platoons'
    );
  }
  putPlatoon(data: any) {
    return this.http.put<any>(
      'https://ims.aswan.gov.eg/api/STR_Platoon/update-Platoon',
      data
    );
  }
  deletePlatoon(id: number) {
    return this.http.delete<any>(
      `https://ims.aswan.gov.eg/api/STR_Platoon/delete-Platoon/${id}`
    );
  }
  getAllCommodities(): Observable<any> {
    return this.http.get<any>(
      'http://ims.aswan.gov.eg/api/STR_Commodity/get-all-commodity'
    );
  }
  getAllGrades(): Observable<any> {
    return this.http.get<any>(
      'https://ims.aswan.gov.eg/api/STR_Grade/get-all-grades'
    );
  }

    //Group

    postGroups(data: any) {
      return this.http.post<any>("https://ims.aswan.gov.eg/api/STR_Group/Add-group", data);
    }
    getGroups() {
      return this.http.get<any>("https://ims.aswan.gov.eg/api/STR_Group/get-all-Groups");
    }
    putGroups(data: any) {
      return this.http.put<any>("https://ims.aswan.gov.eg/api/STR_Group/update-Group", data);
    }
    deleteGroups(id: number) {
      return this.http.delete<any>(`https://ims.aswan.gov.eg/api/STR_Group/delete-Group/${id}`);
    }
    getAllCommoditiesg(): Observable<any> {
      return this.http.get<any>("https://ims.aswan.gov.eg/api/STR_Commodity/get-all-commodity");
    }
    getAllGradesg(): Observable<any> {
      return this.http.get<any>("https://ims.aswan.gov.eg/api/STR_Grade/get-all-grades");
    }

    getAllPlatoonsg(): Observable<any> {
      return this.http.get<any>("https://ims.aswan.gov.eg/api/STR_Platoon/get-all-Platoons");
    }

    //Item

    postItems(data: any) {
      return this.http.post<any>("https://ims.aswan.gov.eg/api/STR_Item/Add-item", data);
    }
    getItem() {
      return this.http.get<any>("https://ims.aswan.gov.eg/api/STR_Item/get-all-Items");
    }
    putItem(data: any) {
      return this.http.put<any>("https://ims.aswan.gov.eg/api/STR_Item/update-Item", data);
    }
    deleteItems(id: number) {
      return this.http.delete<any>(`https://ims.aswan.gov.eg/api/STR_Item/delete-Item-by-id/${id}`);
    }
    getAllCommoditiesi(): Observable<any> {
      return this.http.get<any>("https://ims.aswan.gov.eg/api/STR_Commodity/get-all-commodity");
    }
    getAllGradesi(): Observable<any> {
      return this.http.get<any>("https://ims.aswan.gov.eg/api/STR_Grade/get-all-grades");
    }

    getAllPlatoonsi(): Observable<any> {
      return this.http.get<any>("https://ims.aswan.gov.eg/api/STR_Platoon/get-all-Platoons");
    }

    getAllGroupsi(): Observable<any> {
      return this.http.get<any>("https://ims.aswan.gov.eg/api/STR_Group/get-all-Groups");
    }

    getAllUnitsi(): Observable<any> {
      return this.http.get<any>("https://ims.aswan.gov.eg/api/STR_Unit/get-all-Unit");
    }



  /**crud group */

  postStores(data: any, id: number) {
    return this.http.post<any>('http://localhost:3000/storeList/' + id, data);
  }

  getstores() {
    return this.http.get<any>('http://localhost:3000/storeList/');
  }

  putstores(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/storeList/' + id, data);
  }

  deletestores(id: number) {
    return this.http.delete<any>('http://localhost:3000/storeList/' + id);
  }
  getAllTodos(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/commidity/');
  }

  getAllstores(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/store/');
  }

  // crud role

  postRole(data: any) {
    return this.http.post<any>(`${this.url}/PR_Role/add-Role`, data);
  }
  getAllRole() {
    return this.http.get<any>(`${this.url}/PR_Role/get-all-roles`);
  }
  putRole(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/rolelist/' + id, data);
  }
  deleteRole(id: number) {
    return this.http.delete<any>('http://localhost:3000/rolelist/' + id);
  }

  // salvana
  postProduct(data: any) {
    return this.http.post<any>('http://localhost:3000/productList/', data);
  }
  putProduct(data: any, id: number) {
    return this.http.put<any>('http://localhost:3000/productList/' + id, data);
  }

  getProduct() {
    return this.http.get<any>('http://localhost:3000/productList/');
  }

  deleteProduct(id: number) {
    return this.http.delete<any>('http://localhost:3000/productList/' + id);
  }

  postCostCenter(data: any) {
    return this.http.post<any>(
      `${this.url}/FI_CostCenter/Add-CostCenter`,
      data
    );
  }

  getCostCenter() {
    return this.http.get<any>(`${this.url}/FI_CostCenter/get-all-CostCenter`);
  }

  putCostCenter(data: any) {
    return this.http.put<any>(
      `${this.url}/FI_CostCenter/update-CostCenter`,
      data
    );
  }

  deleteCostCenter(id: number) {
    return this.http.delete<any>(
      `${this.url}/FI_CostCenter/delete-CostCenter-by-id/` + id
    );
  }

  // crud items

  postItem(data: any) {
    console.log('post data:', data);
    return this.http.post<any>(
      'http://ims.aswan.gov.eg/api/STR_Item/Add-item',
      data
    );
  }

  getcommodity() {
    return this.http.get<any>(
      'http://ims.aswan.gov.eg/api/STR_Commodity/get-all-commodity'
    );
  }
  postStrOpenItems(data: any) {
    return this.http.post<any>(
      'http://ims.aswan.gov.eg/api/STR_Item/Add-item',
      data
    );
  }

  putItems(data: any) {
    console.log('put data:', data);
    return this.http.put<any>(
      'http://ims.aswan.gov.eg/api/STR_Item/update-Item',
      data
    );
  }

  deleteItem(id: number) {
    return this.http.delete<any>(
      'http://ims.aswan.gov.eg/api/STR_Item/delete-Item-by-id/' + id
    );
  }

  getAllcommodity(): any {
    return this.http.get<any>(
      'http://ims.aswan.gov.eg/api/STR_Commodity/get-all-commodity'
    );
  }
  getAllplatoon(): any {
    return this.http.get<any>(
      'http://ims.aswan.gov.eg/api/STR_Platoon/get-all-Platoons'
    );
  }
  getAllgroup(): any {
    return this.http.get<any>(
      'http://ims.aswan.gov.eg/api/STR_Group/get-all-Groups'
    );
  }

  getAllgrade(): any {
    return this.http.get<any>(
      'http://ims.aswan.gov.eg/api/STR_Grade/get-all-grades'
    );
  }
  getAllunit(): Observable<any> {
    return this.http.get<any>(
      'http://ims.aswan.gov.eg/api/STR_Unit/get-all-Unit'
    );
  }

  // CRUD STORE

  postStore(data: any) {
    return this.http.post<any>(`${this.url}/STR_Store/Add-Store`, data);
  }

  putStore(data: any) {
    return this.http.put<any>(`${this.url}/STR_Store/update-Store`, data);
  }

  deleteStore(id: number) {
    return this.http.delete<any>(
      `${this.url}/STR_Store/delete-Store-by-id/` + id
    );
  }
  //  commodity
  postCommodity(data: any) {
    console.log('add product data: ', data);

    return this.http.post<any>(
      'http://ims.aswan.gov.eg/api/STR_Commodity/Add-Commodity',
      data
    );
  }

  getCommodity() {
    return this.http.get<any>(
      'http://ims.aswan.gov.eg/api/STR_Commodity/get-all-commodity'
    );
  }

  putCommodity(data: any) {
    console.log('edit data by id: ', data);

    return this.http.put<any>(
      'http://ims.aswan.gov.eg/api/STR_Commodity/update-commodity',
      data
    );
  }

  deleteCommodity(id: number) {
    console.log('delete by id: ', id);
    return this.http.delete<any>(
      'http://ims.aswan.gov.eg/api/STR_Commodity/delete-commodity-by-id/' + id
    );
  }


  ///////////////////////////////// STR-Group /////////////////////////////
  postGroup(data: any) {
    console.log('form add data to apiii: ', data);
    return this.http.post<any>(
      'https://ims.aswan.gov.eg/api/STR_Group/Add-group',
      data
    );
    // return this.http.post<any>("http://localhost:3000/GroupList/", data);
  }
  getGroup() {
    return this.http.get<any>(
      'https://ims.aswan.gov.eg/api/STR_Group/get-all-Groups'
    );
    // return this.http.get<any>("http://localhost:3000/GroupList/");
  }
  putGroup(data: any) {
    return this.http.put<any>(
      'https://ims.aswan.gov.eg/api/STR_Group/update-Group/',
      data
    );
  }
  deleteGroup(id: number) {
    console.log('form delete data from apiii, id: ', id);
    return this.http.delete<any>(
      'https://ims.aswan.gov.eg/api/STR_Group/delete-Group/' + id
    );
  }

  getPlatoons() {
    return this.http.get<any>(
      'https://ims.aswan.gov.eg/api/STR_Platoon/get-all-Platoons'
    );
    // return this.http.get<any>("http://localhost:3000/StoreList/");
  }

  ///////////////////////////////// STR-OpeningStock & details/////////////////////////////
  postStrOpen(data: any) {
    return this.http.post<any>(
      'https://ims.aswan.gov.eg/api/STR_Opening_Stock/Add-Opening_Stock',
      data
    );
  }
  getStrOpen() {
    return this.http.get<any>(
      'https://ims.aswan.gov.eg/api/STR_Opening_Stock/get-all-Opening_Stock/'
    );
  }
  putStrOpen(data: any) {
    return this.http.put<any>(
      'https://ims.aswan.gov.eg/api/STR_Opening_Stock/update-Opening_Stock',
      data
    );
  }
  deleteStrOpen(id: number) {
    return this.http.delete<any>(
      'https://ims.aswan.gov.eg/api/STR_Opening_Stock/delete-Opening_Stock/' +
      id
    );
  }

  postStrOpenDetails(data: any) {
    return this.http.post<any>(
      'https://ims.aswan.gov.eg/api/STR_Opening_Stock/Add-Opening_Stock_Details',
      data
    );
  }
  // getStrOpenDetails() {
  //   return this.http.get<any>("https://ims.aswan.gov.eg/api/STR_Opening_Stock/get-all-Opening_Stock_Details");
  // }
  putStrOpenDetails(data: any, id: number) {
    console.log('strOpenDetails id: ', id, 'strOpenDetails data: ', data);
    return this.http.put<any>(
      'https://ims.aswan.gov.eg/api/STR_Opening_Stock/update-Opening_Stock_Details-by-id/' +
      id,
      data
    );
  }
  deleteStrOpenDetails(HeaderId: number) {
    // console.log("deleted row id: ", HeaderId)
    return this.http.delete<any>(
      'https://ims.aswan.gov.eg/api/STR_Opening_Stock/delete-Opening_Stock_Details-by-id/' +
      HeaderId
    );
  }

  getStore() {
    return this.http.get<any>(
      'https://ims.aswan.gov.eg/api/STR_Store/get-all-Store'
    );
    // return this.http.get<any>("http://localhost:3000/StoreList/");
  }

  getItems() {
    return this.http.get<any>(
      'https://ims.aswan.gov.eg/api/STR_Item/get-all-Items'
    );
  }

  getFiscalYears() {
    return this.http.get<any>(
      'https://ims.aswan.gov.eg/api/StrFiscalYear/get-all-FiscalYear'
    );
  }

  getAvgPrice(storeid: any, FiscalYearid: any, Date: any, itemid: any) {
    console.log("Avg price inputs to backend")
    return this.http.get<any>(
      `https://ims.aswan.gov.eg/api/STR_Add/get-Avgprice-by-itemid/${storeid}/${FiscalYearid}/${Date}/${itemid}`
    );
  }

  getStrOpenSearach(no: any, storeId: any, date: any, fiscalYear: any) {
    //enter no.
    if (no != '' && !storeId && !date && !fiscalYear) {
      console.log('enter no. strOpen search');
      return this.http.get<any>(
        `https://ims.aswan.gov.eg/api/STR_Opening_Stock/search?No=${no}`
      );
    }
    //enter store
    else if (!no && storeId && !date && !fiscalYear) {
      console.log('enter store strOpen search');
      return this.http.get<any>(
        `https://ims.aswan.gov.eg/api/STR_Opening_Stock/search?StoreId=${storeId}`
      );
    }
    //enter date
    else if (!no && !storeId && date && !fiscalYear) {
      console.log('enter date strOpen search');
      return this.http.get<any>(
        `https://ims.aswan.gov.eg/api/STR_Opening_Stock/search?Date=${date}`
      );
    }
    //enter fiscalYear
    else if (!no && !storeId && !date && fiscalYear) {
      console.log('enter fisalYear strOpen search');
      return this.http.get<any>(
        `https://ims.aswan.gov.eg/api/STR_Opening_Stock/search?fiscalyear=${fiscalYear}`
      );
    }
    //enter no. & store
    else if (no && storeId && !date) {
      console.log('enter no. & store strOpen search');
      return this.http.get<any>(
        `https://ims.aswan.gov.eg/api/STR_Opening_Stock/search?StoreId=${storeId}&No=${no}`
      );
    }
    //enter no. & date
    else if (no && !storeId && date) {
      console.log('enter no. & date strOpen search');
      return this.http.get<any>(
        `https://ims.aswan.gov.eg/api/STR_Opening_Stock/search?Date=${date}&No=${no}`
      );
    }
    //enter store & date
    else if (!no && storeId && date) {
      console.log('enter store & date strOpen search');
      return this.http.get<any>(
        `https://ims.aswan.gov.eg/api/STR_Opening_Stock/search?StoreId=${storeId}&Date=${date}`
      );
    }
    //enter all data
    else if (no != '' && storeId != '' && date != '' && fiscalYear != '') {
      console.log('enter all data strOpen search');
      return this.http.get<any>(
        `https://ims.aswan.gov.eg/api/STR_Opening_Stock/search?StoreId=${storeId}&Date=${date}&No=${no}&fiscalyear=${fiscalYear}`
      );
    }

    console.log("didn't enter any condition search");
    return this.http.get<any>(
      `https://ims.aswan.gov.eg/api/STR_Opening_Stock/search?StoreId=${0}`
    );
  }


  ///////////////////////////////// STR-EmployeeExchange & details/////////////////////////////
  getHrEmployees() {
    return this.http.get<any>("https://ims.aswan.gov.eg/api/HR_Employee/get-all-employee");
    // return this.http.get<any>("http://localhost:3000/StoreList/");
  }

  getFiCostCenter() {
    return this.http.get<any>("https://ims.aswan.gov.eg/api/FI_CostCenter/get-all-CostCenter");
    // return this.http.get<any>("http://localhost:3000/StoreList/");
  }

  postStrEmployeeExchange(data: any) {
    return this.http.post<any>("https://ims.aswan.gov.eg/api/STR_Employe_Exchange/Add-Employee-Exchange", data);
  }
  getStrEmployeeExchange() {
    return this.http.get<any>("https://ims.aswan.gov.eg/api/STR_Employe_Exchange/get-Employee-Exchang/");
  }
  putStrEmployeeExchange(data: any) {
    return this.http.put<any>("https://ims.aswan.gov.eg/api/STR_Employe_Exchange/update-Employee-Exchange", data);
  }
  deleteStrEmployeeExchange(id: number) {
    return this.http.delete<any>("https://ims.aswan.gov.eg/api/STR_Employe_Exchange/delete-Employee-Exchang-by-id/" + id);
  }

  postStrEmployeeExchangeDetails(data: any) {
    return this.http.post<any>("https://ims.aswan.gov.eg/api/STR_Employee_Exchange_Details/Add-Employee-Exchange-Details", data);
  }
  putStrEmployeeExchangeDetails(data: any) {
    console.log("StrEmployeeExchangeDetails data: ", data);
    return this.http.put<any>("https://ims.aswan.gov.eg/api/STR_Employee_Exchange_Details/update-Employee-Exchange-Details/", data);
  }
  deleteStrEmployeeExchangeDetails(HeaderId: number) {
    console.log("deleted row id: ", HeaderId)
    return this.http.delete<any>("https://ims.aswan.gov.eg/api/STR_Employee_Exchange_Details/delete-Employee-Exchang-Details-by-id/" + HeaderId);
  }
  getStrEmployeeExchangeSearach(no: any, costCenterId: any, employeeId: any, date: any, distEmployee: any) {
    console.log("values search passed: 'no: '", no, "' costCenterId: '", costCenterId, "' employeeId: '", employeeId, "' date: '", date, "' distEmployee: '", distEmployee);
    //enter no.
    if (no != '' && !costCenterId && !employeeId && !date && !distEmployee) {
      console.log('enter no. strOpen search');
      return this.http.get<any>(
        `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?No=${no}`
      );
    }
    //enter costCenter
    else if (!no && costCenterId && !employeeId && !date && !distEmployee) {
      console.log('enter costCenter strOpen search');
      return this.http.get<any>(
        `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?CostCenterId=${costCenterId}`
      );
    }
    //enter employee
    else if (!no && !costCenterId && employeeId && !date && !distEmployee) {
      console.log('enter employee strOpen search');
      return this.http.get<any>(
        `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?EmployeeId=${employeeId}`
      );
    }
    //enter date
    else if (!no && !costCenterId && !employeeId && date && !distEmployee) {
      console.log('enter date strOpen search');
      return this.http.get<any>(
        `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?Date=${date}`
      );
    }
    //enter distEmployee
    else if (!no && !costCenterId && !employeeId && !date && distEmployee) {
      console.log('enter distEmployee strOpen search');
      return this.http.get<any>(
        `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?DestEmployeeId=${distEmployee}`
      );
    }

    //enter no. & costCenter
    else if (no && costCenterId && !employeeId && !date && !distEmployee) {
      console.log('enter no. & costCenter strOpen search');
      return this.http.get<any>(
        `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?No=${no}&CostCenterId=${costCenterId}`
      );
    }
    //enter no. & employee
    else if (no && !costCenterId && employeeId && !date && !distEmployee) {
      console.log('enter no. & employee strOpen search');
      return this.http.get<any>(
        `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?No=${no}&EmployeeId=${employeeId}`
      );
    }
    //enter no. & date
    else if (no && !costCenterId && !employeeId && date && !distEmployee) {
      console.log('enter no. & date strOpen search');
      return this.http.get<any>(
        `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?Date=${date}&No=${no}`
      );
    }
    //enter no & distEmployee
    else if (no && !costCenterId && !employeeId && !date && distEmployee) {
      console.log('enter no. & distEmployee strOpen search');
      return this.http.get<any>(
        `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?No=${no}&DestEmployeeId=${distEmployee}`
      );
    }

    //enter costCenter & employee
    else if (!no && costCenterId && employeeId && !date && !distEmployee) {
      console.log('enter costCenter & employee strOpen search');
      return this.http.get<any>(
        `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?CostCenterId=${costCenterId}&EmployeeId=${employeeId}`
      );
    }
    //enter costCenter & date
    else if (!no && costCenterId && !employeeId && date && !distEmployee) {
      console.log('enter costCenter & date strOpen search');
      return this.http.get<any>(
        `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?Date=${date}&CostCenterId=${costCenterId}`
      );
    }
    //enter costCenter & distEmployee
    else if (!no && costCenterId && !employeeId && !date && distEmployee) {
      console.log('enter costCenter & distEmployee strOpen search');
      return this.http.get<any>(
        `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?DestEmployeeId=${distEmployee}&CostCenterId=${costCenterId}`
      );
    }

    //enter employee & date
    else if (!no && !costCenterId && employeeId && date && !distEmployee) {
      console.log('enter employee & date strOpen search');
      return this.http.get<any>(
        `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?Date=${date}&EmployeeId=${employeeId}`
      );
    }
    //enter employee & distEmployee
    else if (!no && !costCenterId && employeeId && !date && distEmployee) {
      console.log('enter employee & distEmployee strOpen search');
      return this.http.get<any>(
        `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?DestEmployeeId=${distEmployee}&EmployeeId=${employeeId}`
      );
    }

    //enter distEmployee & date
    else if (!no && !costCenterId && !employeeId && date && distEmployee) {
      console.log('enter distEmployee & date strOpen search');
      return this.http.get<any>(
        `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?Date=${date}&DestEmployeeId=${distEmployee}`
      );
    }

    //enter all data
    else if (no != '' && costCenterId != '' && employeeId != '' && date != '' && distEmployee != '') {
      console.log('enter all data strOpen search');
      return this.http.get<any>(
        `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?Date=${date}&No=${no}&DestEmployeeId=${distEmployee}&CostCenterId=${costCenterId}&EmployeeId=${employeeId}`
      );
    }

    console.log("didn't enter any condition search");
    return this.http.get<any>(
      `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?No=${0}`
    );
  }


  // open Empoyee
  postStrEmployeeOpen(data: any) {
    return this.http.post<any>("https://ims.aswan.gov.eg/api/STR_Employee_Opening_Custody/Add-Employee_Opening_Custody", data);
  }
  getStrEmployeeOpen() {
    return this.http.get<any>("https://ims.aswan.gov.eg/api/STR_Employee_Opening_Custody/get-all-Employee_Opening_Custody");
  }
  putStrEmployeeOpen(data: any) {
    return this.http.put<any>("https://ims.aswan.gov.eg/api/STR_Employee_Opening_Custody/update-Employee_Opening_Custody", data);
  }
  deleteStrEmployeeOpen(id: number) {
    return this.http.delete<any>("https://ims.aswan.gov.eg/api/STR_Employee_Opening_Custody/delete-Employee_Opening_Custody/" + id);
  }
  getAllEmployees() {
    return this.http.get<any>("https://ims.aswan.gov.eg/api/HR_Employee/get-all-employee");
  }

  postStrEmployeeOpenDetails(data: any) {
    return this.http.post<any>("https://ims.aswan.gov.eg/api/STR_Employee_Opening_Custody/Add-Employee_Opening_Custody_Detail", data);
  }
  // getStrOpenDetails() {
  //   return this.http.get<any>("https://ims.aswan.gov.eg/api/STR_Opening_Stock/get-all-Opening_Stock_Details");
  // }
  putStrEmployeeOpenDetails(data: any) {
    console.log("putStrEmployeeOpenDetails data: ", data);
    return this.http.put<any>("https://ims.aswan.gov.eg/api/STR_Employee_Opening_Custody/update-Employee_Opening_Custody_Detail/", data);
  }

  deleteStrEmployeeOpenDetails(HeaderId: number) {
    console.log("deleted row id: ", HeaderId)
    return this.http.delete<any>("https://ims.aswan.gov.eg/api/STR_Employee_Opening_Custody/delete-Employee_Opening_Custody_Detail/" + HeaderId);
  }



  /////////////withdraw///////////
 
  postStrWithdraw(data: any) {
    console.log('post data:',data)
    return this.http.post<any>("http://ims.aswan.gov.eg/api/STR_Withdraw/Add-withdraw", data);
  }

  getStrWithdraw() {
    return this.http.get<any>("https://ims.aswan.gov.eg/api/STR_Withdraw/get-all-Withdraw");
  }
  putStrWithdraw(data: any) {
    console.log("put data ",data)

    return this.http.put<any>("https://ims.aswan.gov.eg/api/STR_Withdraw/update-Withdraw", data);
  }
  deleteStrWithdraw(id: number) {
    return this.http.delete<any>("https://ims.aswan.gov.eg/api/STR_Withdraw/delete-Withdraw-by-id/" + id);
  }

  postStrWithdrawDetails(data: any) {
    console.log("post details",data)
    return this.http.post<any>("https://ims.aswan.gov.eg/api/Withdraw_Details/Add-STRwithdrawdetails", data);
  }
  getStrWithdrawDetails() {
    return this.http.get<any>("https://ims.aswan.gov.eg/api/Withdraw_Details/get-all-WithdrawDetails");
  }
  putStrWithdrawDetails(data: any) {
    console.log("put details")

    return this.http.put<any>("https://ims.aswan.gov.eg ​/api​/Withdraw_Details​/update-WithdrawDetails" , data);
  }
  deleteStrWithdrawDetails(HeaderId: number) {
    // console.log("deleted row id: ", HeaderId)
    return this.http.delete<any>("https://ims.aswan.gov.eg/api/Withdraw_Details/delete-WithdrawDetails-by-id/" + HeaderId);
  }
  // getGroup() {
  //   return this.http.get<any>("https://ims.aswan.gov.eg/api/STR_Group/get-all-Groups");
  //   // return this.http.get<any>("http://localhost:3000/GroupList/");
  // }
 
  getDestStore() {
    return this.http.get<any>("https://ims.aswan.gov.eg/api/STR_Store/get-all-Store");
    // return this.http.get<any>("http://localhost:3000/StoreList/");
  }
 
  getEmployee() {
    return this.http.get<any>("https://ims.aswan.gov.eg/api/HR_Employee/get-all-employee");
    // return this.http.get<any>("http://localhost:3000/StoreList/");
  }
  getseller() {
    return this.http.get<any>("http://ims.aswan.gov.eg/api/PRO_Seller/get-all-seller    ");
    // return this.http.get<any>("http://localhost:3000/StoreList/");
  }

  

  // postStrOpen(data: any) {
  //   return this.http.post<any>("https://ims.aswan.gov.eg/api/STR_Opening_Stock/Add-Opening_Stock", data);
  // }


////////file upload/////////
upload(file:any):Observable<any> {
  
  // Create form data
  const formData = new FormData(); 
    
  // Store form name as "file" with file data
  formData.append("file", file, file.name);
    
  // Make http post request over api
  // with formData as req
  return this.http.post(this.baseApiUrl, formData)
}

  ///////////////////////////////// STR-Product/////////////////////////////
  postStrProduct(data: any) {
    console.log('form add product data to backend: ', data);
    return this.http.post<any>(
      'https://ims.aswan.gov.eg/api/STR_Product/Add',
      data
    );
  }
  getStrProduct() {
    return this.http.get<any>(
      'https://ims.aswan.gov.eg/api/STR_Product/get-all-add'
    );
  }
  putStrProduct(data: any) {
    return this.http.put<any>(
      'https://ims.aswan.gov.eg/api/STR_Product/update',
      data
    );
  }
  deleteStrProduct(id: number) {
    console.log('delete product data from api, id: ', id);
    return this.http.delete<any>(
      'https://ims.aswan.gov.eg/api/STR_Product/Delete/' + id
    );
  }

  getVendors() {
    return this.http.get<any>(
      'https://ims.aswan.gov.eg/api/StrVendor/get-all-Vendor'
    );
  }

  getModels() {
    return this.http.get<any>(
      'https://ims.aswan.gov.eg/api/StrModel/get-all-Model'
    );
  }



  ///////////////////////////////// Fi-Entry & details/////////////////////////////
  getJournals() {
    return this.http.get<any>('https://ims.aswan.gov.eg/get-all-Journals');
  }

  postFiEntry(data: any) {
    return this.http.post<any>("https://ims.aswan.gov.eg/Add-Entry", data);
  }
  getFiEntry() {
    return this.http.get<any>("https://ims.aswan.gov.eg/get-all-entry");
  }
  putFiEntry(data: any) {
    return this.http.put<any>("https://ims.aswan.gov.eg/update-Entry", data);
  }
  deleteFiEntry(id: number) {
    return this.http.delete<any>("https://ims.aswan.gov.eg/delete-Entry/" + id);
  }

  // postFiEntryDetails(data: any) {
  //   return this.http.post<any>("https://ims.aswan.gov.eg/api/STR_Employee_Exchange_Details/Add-Employee-Exchange-Details", data);
  // }
  // putFiEntryDetails(data: any) {
  //   console.log("FiEntryDetails data: ", data);
  //   return this.http.put<any>("https://ims.aswan.gov.eg/api/STR_Employee_Exchange_Details/update-Employee-Exchange-Details/", data);
  // }
  // deleteFiEntryDetails(HeaderId: number) {
  //   console.log("deleted row id: ", HeaderId)
  //   return this.http.delete<any>("https://ims.aswan.gov.eg/api/STR_Employee_Exchange_Details/delete-Employee-Exchang-Details-by-id/" + HeaderId);
  // }
  // getFiEntrySearach(no: any, costCenterId: any, employeeId: any, date: any, distEmployee: any) {
  //   console.log("values search passed: 'no: '", no, "' costCenterId: '", costCenterId, "' employeeId: '", employeeId, "' date: '", date, "' distEmployee: '", distEmployee);
  //   //enter no.
  //   if (no != '' && !costCenterId && !employeeId && !date && !distEmployee) {
  //     console.log('enter no. strOpen search');
  //     return this.http.get<any>(
  //       `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?No=${no}`
  //     );
  //   }
  //   //enter costCenter
  //   else if (!no && costCenterId && !employeeId && !date && !distEmployee) {
  //     console.log('enter costCenter strOpen search');
  //     return this.http.get<any>(
  //       `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?CostCenterId=${costCenterId}`
  //     );
  //   }
  //   //enter employee
  //   else if (!no && !costCenterId && employeeId && !date && !distEmployee) {
  //     console.log('enter employee strOpen search');
  //     return this.http.get<any>(
  //       `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?EmployeeId=${employeeId}`
  //     );
  //   }
  //   //enter date
  //   else if (!no && !costCenterId && !employeeId && date && !distEmployee) {
  //     console.log('enter date strOpen search');
  //     return this.http.get<any>(
  //       `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?Date=${date}`
  //     );
  //   }
  //   //enter distEmployee
  //   else if (!no && !costCenterId && !employeeId && !date && distEmployee) {
  //     console.log('enter distEmployee strOpen search');
  //     return this.http.get<any>(
  //       `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?DestEmployeeId=${distEmployee}`
  //     );
  //   }

  //   //enter no. & costCenter
  //   else if (no && costCenterId && !employeeId && !date && !distEmployee) {
  //     console.log('enter no. & costCenter strOpen search');
  //     return this.http.get<any>(
  //       `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?No=${no}&CostCenterId=${costCenterId}`
  //     );
  //   }
  //   //enter no. & employee
  //   else if (no && !costCenterId && employeeId && !date && !distEmployee) {
  //     console.log('enter no. & employee strOpen search');
  //     return this.http.get<any>(
  //       `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?No=${no}&EmployeeId=${employeeId}`
  //     );
  //   }
  //   //enter no. & date
  //   else if (no && !costCenterId && !employeeId && date && !distEmployee) {
  //     console.log('enter no. & date strOpen search');
  //     return this.http.get<any>(
  //       `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?Date=${date}&No=${no}`
  //     );
  //   }
  //   //enter no & distEmployee
  //   else if (no && !costCenterId && !employeeId && !date && distEmployee) {
  //     console.log('enter no. & distEmployee strOpen search');
  //     return this.http.get<any>(
  //       `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?No=${no}&DestEmployeeId=${distEmployee}`
  //     );
  //   }

  //   //enter costCenter & employee
  //   else if (!no && costCenterId && employeeId && !date && !distEmployee) {
  //     console.log('enter costCenter & employee strOpen search');
  //     return this.http.get<any>(
  //       `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?CostCenterId=${costCenterId}&EmployeeId=${employeeId}`
  //     );
  //   }
  //   //enter costCenter & date
  //   else if (!no && costCenterId && !employeeId && date && !distEmployee) {
  //     console.log('enter costCenter & date strOpen search');
  //     return this.http.get<any>(
  //       `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?Date=${date}&CostCenterId=${costCenterId}`
  //     );
  //   }
  //   //enter costCenter & distEmployee
  //   else if (!no && costCenterId && !employeeId && !date && distEmployee) {
  //     console.log('enter costCenter & distEmployee strOpen search');
  //     return this.http.get<any>(
  //       `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?DestEmployeeId=${distEmployee}&CostCenterId=${costCenterId}`
  //     );
  //   }

  //   //enter employee & date
  //   else if (!no && !costCenterId && employeeId && date && !distEmployee) {
  //     console.log('enter employee & date strOpen search');
  //     return this.http.get<any>(
  //       `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?Date=${date}&EmployeeId=${employeeId}`
  //     );
  //   }
  //   //enter employee & distEmployee
  //   else if (!no && !costCenterId && employeeId && !date && distEmployee) {
  //     console.log('enter employee & distEmployee strOpen search');
  //     return this.http.get<any>(
  //       `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?DestEmployeeId=${distEmployee}&EmployeeId=${employeeId}`
  //     );
  //   }

  //   //enter distEmployee & date
  //   else if (!no && !costCenterId && !employeeId && date && distEmployee) {
  //     console.log('enter distEmployee & date strOpen search');
  //     return this.http.get<any>(
  //       `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?Date=${date}&DestEmployeeId=${distEmployee}`
  //     );
  //   }

  //   //enter all data
  //   else if (no != '' && costCenterId != '' && employeeId != '' && date != '' && distEmployee != '') {
  //     console.log('enter all data strOpen search');
  //     return this.http.get<any>(
  //       `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?Date=${date}&No=${no}&DestEmployeeId=${distEmployee}&CostCenterId=${costCenterId}&EmployeeId=${employeeId}`
  //     );
  //   }

  //   console.log("didn't enter any condition search");
  //   return this.http.get<any>(
  //     `https://ims.aswan.gov.eg/api/STR_Employe_Exchange/search?No=${0}`
  //   );
  // }

}

