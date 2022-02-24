import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  readonly APIurl  = "http://localhost:5211/api";
  readonly Photourl = "http://localhost:5211/Photos/";

  // header = new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Headers': 'Content-Type',
  //   'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  //    // 'Authorization': 'Bearer szdp79a2kz4wh4frjzuqu4sz6qeth8m3'
  // });

   headerDict = {
    'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
  }
  
   requestOptions = {                                                                                                                                                                                 
    headers: new HttpHeaders(this.headerDict), 
  };
  
  constructor(private http:HttpClient) { }

  getDepList():Observable<any[]>{
    return this.http.get<any>(this.APIurl+'/Department',this.requestOptions);
  }

  addDepartment(data:any){
    return this.http.post(this.APIurl+'/Department',data);
  }
  
  updateDepartment(data:any){
    return this.http.put(this.APIurl+`/Department`,data);
  }

  deleteDepartment(id:number){
    return this.http.delete(this.APIurl+`/Department/${id}`);
  }

  getEmpList():Observable<any[]>{
    return this.http.get<any>(this.APIurl+'/Employee');
  }

  addEmployee(data:any){
    return this.http.post(this.APIurl+'/Employee',data);
  }
  
  updateEmployee(data:any){
    return this.http.put(this.APIurl+`/Employee`,data);
  }

  deleteEmployee(id:number){
    return this.http.delete(this.APIurl+`/Employee/${id}`);
  }

  uploadPhoto(val:any){
    return this.http.post(this.APIurl+'/Employee/SaveFile',val);
  }

  getAllDepNames():Observable<any[]>{
    return this.http.get<any[]>(this.APIurl+'/Employee/GetAllDepartmentNames');
  }
}
