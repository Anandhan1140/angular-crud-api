import { HttpClient } from '@angular/common/http';
import {Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Department, Language } from '../Models/Department';
import { Country, District, State } from '../Models/Employee';



@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  private myAppUrl = 'https://localhost:7177/api/Employee';

  constructor(private _http:HttpClient){} 
   

getDepartmentList(){
  debugger;
  return this._http.get(this.myAppUrl+'/departments')

}

getLanguageList(): Observable<any>{
  debugger;
  return this._http.get(this.myAppUrl+'/getAllLanguage')
}


getCountryList():Observable<Country[]>{
  return this._http.get<Country[]>(this.myAppUrl+'/GetCountryList');
}

getStateList():Observable<State[]>{
  return this._http.get<State[]>(this.myAppUrl+'/GetStateList');  
}

getDistrictList():Observable<District[]>{
  return this._http.get<District[]>(this.myAppUrl + '/GetDistrictList')
}


}
