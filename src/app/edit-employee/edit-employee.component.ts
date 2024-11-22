import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DropdownService } from '../../services/dropdown.service';
import { Gender } from '../../Models/Employee';
import { DomSanitizer } from '@angular/platform-browser';

import { editAllEmployee_dto } from '../../Model-Dto/editModel-dto';
import { UpdateEmployee_dto } from '../../Model-Dto/updateModel_dto';
import { error } from 'console';


@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})


export class EditEmployeeComponent {

  employee: editAllEmployee_dto ;    
  departmentList: any;     
  selectDepartment : number;
  gender:{id:number ; name:string}[]=[];
  selectedgender: number;
  languageList : { languageID : number;languageName : string}[]=[]; 
  selectedLanguage: number[] = []; 
  countryList : any[]=[];
  StateList:any[]=[];
  DistrictList :any[] = [];
  selectedCountry :  number;
  selectedState: number;
  selectedDistrict : number;
  selectedImage : string;
  updatedImage : File;
  previousImage: string;
  
  //imageUrl: string;

  load_state_by_country_id:any;
  load_District_by_state_id:any;

    constructor(private _employeeService : EmployeeService , private _activatedRoute:ActivatedRoute,
     private _dropdownService : DropdownService ,private sanitizer:DomSanitizer,private _http:HttpClient,private _router:Router
    )
    {}           
    

    ngOnInit() {
      this.getDepartmentList().subscribe(departmentList => {
        this.departmentList = departmentList;
        console.log("test-1");
        
        this.getLanguage().subscribe(languageList => {
          this.languageList = languageList;
          console.log("test2");
          
          this.getGender();
    
            this.getCountryList().subscribe(countryList => {
              this.countryList = countryList;
              console.log("test-3");
    
              this.getStateList().subscribe(stateList => {
                this.StateList = stateList;
                console.log("test-4");
    
                this.getDistrictList().subscribe(districtList => {
                  this.DistrictList = districtList;
                  console.log("test-5");    
                 
                  this.getEmployeeDetailsbyId(this._activatedRoute.snapshot.params['id'])
                });
              });
            });        
        });
      }, error => {
        console.error(error);
      });
    }

    
    async getEmployeeDetailsbyId(id){
     
      return  await this._employeeService.GetAllEmployeeById(id).subscribe( (response) =>{
        this.employee = response;        
        console.log("getby id _ employee ",this.employee)   
       
         this.setSelectedDepartment();
         this.setselectedGender();
        this.setselectedLanguage();
        this.setSelectedCountry();
         this.setSelectedState();
        this.setSelectedDistrict();
        this. SetSelectedImage();
        
      },error=>{
        console.log(error)
      })  
  
    }

    

//departmetnt
    onDropdownChange(e : any){     
      console.log(e)  
    }

    setSelectedDepartment(){     
      if (this.departmentList && this.departmentList.length > 0 && this.employee) {
      for(var i=0 ; i<this.departmentList.length; i++)
        {
          if(this.departmentList[i].departmentName === this.employee[0].department){
            this.selectDepartment = this.departmentList[i].departmentId           
          }      
      }
    }
    else{
      console.log("not binded")
    }
    }
  
      getDepartmentList(){
      return  this._dropdownService.getDepartmentList() 
    }


    onchangedepartment(event : any) {
     
      console.log(event)
     this.selectDepartment = event;
    }

//gener
    
  public getGender(): void {
    for(var n in Gender) {
      if (typeof Gender[n] === 'number') {
        this.gender.push({id: <any>Gender[n], name: n});
      }
    }
    //this. setselectedGender();
  }

  setselectedGender(){   
    this.selectedgender = this.employee[0].gender;    
  }


  choose(genderid : number){
    this.selectedgender = genderid;   
  }


//language

  public getLanguage(){   
    return this._dropdownService.getLanguageList()
  }

  setselectedLanguage() {
    debugger;
    if (this.employee) {
      const selectedLanguages = this.employee[0].language.split(',');       
      //this.selectedLanguage = []; 
        
      for (const lang of selectedLanguages) {
        const foundLang = this.languageList.find(l => l.languageName === lang);
        if (foundLang) {
          this.selectedLanguage.push( foundLang.languageID); 
        }
      }
     
    }
  }



  isSelected(value: number): boolean {
    debugger;
    let isSelected = false;
    for (let i = 0; i < this.selectedLanguage.length; i++) {
      if (this.selectedLanguage[i] === value) {
        isSelected = true;
        break;
      }
    }   
    return isSelected;
  }

  
  onChange(value: number, checked: boolean) {
    debugger;
    console.log(value, checked);
    if (checked) {
      this.selectedLanguage.push( value);
    } else {
      const index = this.selectedLanguage.indexOf(value);
      if (index !== -1) {
          this.selectedLanguage.splice(index, 1);
      }
    }
  }
  //for address
  
getCountryList(){ 
  return this._dropdownService.getCountryList()
}

setSelectedCountry(){ 
  if(this.countryList && this.countryList.length >0 && this.employee){
    for(var i=0 ; i<this.countryList.length; i++){
      if(this.countryList[i].countryName == this.employee[0].countryName){
        this.selectedCountry = this.countryList[i].countryId;
        this. OnchangeCountry(this.selectedCountry);     //call the onchange method to laod the options
      }
    }
  }
  else{
    console.log("not binded")
  }
  
}

OnchangeCountry(countryId:any){
  this.load_state_by_country_id = this.StateList.filter((item)=>item.countryId == countryId);
 
}


getStateList(){ 
  return this._dropdownService.getStateList()
}


  setSelectedState(){
   
    if(this.StateList && this.StateList.length>0 && this.employee){
      for (var i=0; i<this.StateList.length ; i++){
        if(this.StateList[i].stateName== this.employee[0].stateName){
        this.selectedState   = this.StateList[i].stateId;        
          this.OnchangeState(this.selectedState);   
         
        }
      }
     
    }
  }
  
  OnchangeState(stateId : number){    
    this.load_District_by_state_id = this.DistrictList.filter((item)=>item.stateId == stateId);
}

getDistrictList(){ 
    return this._dropdownService.getDistrictList()
}


  setSelectedDistrict(){
   
    //this.OnchangeState(this.selectedState)
    if(this.DistrictList && this.DistrictList.length>0 && this.employee){
      for(var i=0; i<this.DistrictList.length; i++){
        if(this.DistrictList[i].districtName == this.employee[0].districtName){
        this.selectedDistrict = this.DistrictList[i].districtId;   
        
      }
    }
  }
  }


//image 
  SetSelectedImage(){
    debugger;
    if(this.employee){    
      this.selectedImage = this.employee[0].imagePath;        
    }
  }
  
onfilechange(event){ 
    debugger;
    const file = event.target.files[0];
   
    if (file) {
      this.updatedImage = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);   
      reader.onload = (e: any) => {
        debugger;
        this.selectedImage = e.target.result; // This will be a base64 data URL        
        this.previousImage = e.target.result;
        console.log("previous image",this.previousImage);
      };
      
    }else {
      // When no file is selected (canceled), revert to previous image
      this.selectedImage = this.previousImage; 
  }  

}
  
    UpdateEmployee(id:number):void {
      debugger;
      const fileUpdate : FormData = new FormData();

      const updateEmployee_dto :  UpdateEmployee_dto = {
        employeeId : id,
        FirstName: this.employee[0].firstName,
        LastName: this.employee[0].lastName,
        salary: this.employee[0].salary,
        department: this.selectDepartment,
        Gender: this.selectedgender,
        isActive : true,
        Language : this.selectedLanguage.toString(),
        CountryId : this.selectedCountry,
        StateId : this.selectedState,
        DistrictId : this.selectedDistrict,
        file : this.updatedImage               
      };
      console.log("updated employee",updateEmployee_dto)

        Object.keys(updateEmployee_dto).forEach(key=>{
          console.log(key);
          fileUpdate.append(key,updateEmployee_dto[key])
        });

        
        for (let [key, value] of (fileUpdate as any).entries()) {
          debugger;
          console.log(key, value);
        }


        this._employeeService.UpdateEmployee(fileUpdate).subscribe({
          next:(res)=>{
            this._router.navigate(['/home']);
          },
          error:(e)=>console.log(e)

        });
    }


    
} 
