import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getAllEmployee_dto } from '../Model-Dto/getAllModel-dto';
import { editAllEmployee_dto } from '../Model-Dto/editModel-dto';



@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private myAppUrl = 'https://localhost:7177/';
  constructor( private _http:HttpClient) { }


  createEmployee(fileUploadForm: FormData): Observable<any> {
    return this._http.post(this.myAppUrl + 'api/Employee/CreateEmployee', fileUploadForm);
}


  GetAllEmployee():Observable<getAllEmployee_dto[]>{
      return this._http.get<getAllEmployee_dto[]>(this.myAppUrl + 'api/Employee/GetAllEmployee');
  }

  GetAllEmployeeById(id:any):Observable<editAllEmployee_dto>{
    debugger;    
    return this._http.get<editAllEmployee_dto>(this.myAppUrl +`api/Employee/GetAllEmployeeById/${id}`);     
  }

  UpdateEmployee(fileUpdate : FormData):Observable<any>{
    return this._http.post(this.myAppUrl + 'api/Employee/UpdateEmployee', fileUpdate)
  }



  DeleteEmployee(id: number): Observable<any> {
    return this._http.delete(`${this.myAppUrl}api/Employee/softDeleteEmployee/${id}`);
  }
  
  GetImageFile(id:number):Observable<Blob>{
    return this._http.get(this.myAppUrl + `api/Employee/Downlaod_Image/${id}`,{ responseType: 'blob' })
  }

}
