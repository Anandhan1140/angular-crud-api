import { Component, OnInit } from '@angular/core';
import { DropdownService } from '../../services/dropdown.service';
import {  Gender } from '../../Models/Employee';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { PostEmployee_dto } from '../../Model-Dto/postmodel-dto';





@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})

export class CreateComponent implements OnInit{

  departmentList: any; 
  PostEmployee_dto : PostEmployee_dto;
  public gender: { id: number; name: string }[] = [];
  languageList : { languageID : number;languageName : string}[]=[]; //SUPPOSE if i give simply type Language  it will show error
  public selectedGender: number; 
  public selectedLanguage: any[] = [];
  countryList :{countryId:number;countryName : string}[]=[];
  selectedCountry :{countryId:number;countryName : string};
  StateList : any;
  load_state_by_id :{stateId:number; stateName:string;countryId:number}[]=[];
  DistrictList : any;  
  load_District_by_id :{districtId:number;districtName:string;stateId:number}[]=[];

  uploadedFile: File | null = null;
  imagePreviewUrl: string | null = null; // Property for image preview

    //submitted = false;


  constructor(private _dropdownService: DropdownService, private _employeeService : EmployeeService ,private _router:Router) {
    this.PostEmployee_dto = new PostEmployee_dto('', '', null, null, true,null,'',null,null,null,null);
    this.gender = []; 
  }

  ngOnInit() {      
    this.getDepartmentList();   
    this.getGender();
    this.setDefaultGender();
    this.getLanguage();   
    this.getCountryList();
    this.getStateList();    
    this.getDistrictList();
  }
  
  //dropdown
  onDropdownChange(e : any){
    debugger;
    console.log(e)  
  }

  getDepartmentList(){
    this._dropdownService.getDepartmentList() .subscribe(
      (departmentList) => {       
        this.departmentList = departmentList;
      }
    );    
  }
//gender

  public getGender(): void {
    for(var n in Gender) {
      if (typeof Gender[n] === 'number') {
        this.gender.push({id: <any>Gender[n], name: n});
      }
    }
  }

  setDefaultGender() {
    // Change the selectedGender programmatically this is working on two way binindg
    this.selectedGender = 1; // Example: Set default to 'Female'
  }


  public choose(genderId: number): void {
      //this.selectedGender = genderId;
      console.log('Selected Gender ID:', this.selectedGender);
  }

//language

  public getLanguage(){
    this._dropdownService.getLanguageList().subscribe(
      (language)=>{
      
        this.languageList = language
       
      }
    )
  }


  public onLanguageChange(languageID: number, isChecked: boolean) {
    if (isChecked) {
        this.selectedLanguage.push(languageID);
    } else {
        this.selectedLanguage = this.selectedLanguage.filter(id => id !== languageID);
    }
  
}

//country

getCountryList(){
  this._dropdownService.getCountryList().subscribe(
    (countryList)=>{
   
      this.countryList=countryList;
    }
  )
}

getStateList(){
  this._dropdownService.getStateList().subscribe(
    (stateList)=>{
      this.StateList=stateList;
     
    }
  )
}

OnchangeCountry(countryId: any) {
  debugger;
  
  if (countryId == "null") {
    this.load_state_by_id = []; 
    this.load_District_by_id = [];  
    this.PostEmployee_dto.StateId = null;
    this.PostEmployee_dto.DistrictId = null;
    return; 
  }

  this.load_state_by_id = this.StateList.filter((item) => item.countryId == countryId);
  console.log(this.load_state_by_id);
}


getDistrictList(){
  debugger;
    this._dropdownService.getDistrictList().subscribe(
      (districtList)=>{
        this.DistrictList = districtList;
        
      }
    )
}


OnchangeState(stateId: number) {
  debugger; 
  if (stateId == null) {
    this.load_District_by_id = []; 
    this.PostEmployee_dto.DistrictId = null;
   
    return; 
  }

  this.load_District_by_id = this.DistrictList.filter((item) => item.stateId == stateId);
}


onfilechange(event){
  debugger;
  this.PostEmployee_dto.file = event.target.files[0]; 

  // Create a URL for the image preview
  if (this.PostEmployee_dto.file) {
    this.imagePreviewUrl = URL.createObjectURL(this.PostEmployee_dto.file);
  } else {
    this.imagePreviewUrl = null; // Reset if no file is selected
  }
}
  

submitEmployee(): void {
  debugger;
  const fileUploadForm: FormData = new FormData();

  // Construct PostEmployee_dto without JSON.stringify
  const postEmployeeDto: PostEmployee_dto = {
 
      firstName: this.PostEmployee_dto.firstName,
      lastName: this.PostEmployee_dto.lastName,
      salary: this.PostEmployee_dto.salary,
      department: this.PostEmployee_dto.department,
      isActive: true,
      Gender: this.selectedGender,
      Language: this.selectedLanguage.toString(),
      CountryId: this.PostEmployee_dto.CountryId,
      StateId: this.PostEmployee_dto.StateId,
      DistrictId: this.PostEmployee_dto.DistrictId,
      file: this.PostEmployee_dto.file
  };
  
  Object.keys(postEmployeeDto).forEach(key => {
    debugger;
      fileUploadForm.append(key, postEmployeeDto[key]);
  });


for (let [key, value] of (fileUploadForm as any).entries()) {
  console.log(key, value);
}

  this._employeeService.createEmployee(fileUploadForm).subscribe({
      next: (res) => {
          console.log("Employee posted: number of rows affected", res);
          this._router.navigate(['/home']);
      },
      error: (e) => console.log(e)
  });
}



}
