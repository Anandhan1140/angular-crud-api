import { Component } from '@angular/core';
import { Employee, Gender } from '../../Models/Employee';
import { EmployeeService } from '../../services/employee.service';
import { getAllEmployee_dto } from '../../Model-Dto/getAllModel-dto';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-list-of-employee',
  templateUrl: './list-of-employee.component.html',
  styleUrl: './list-of-employee.component.css'
})


export class ListOfEmployeeComponent {

  employee:getAllEmployee_dto[]=[];
  file : Blob;

  constructor(private _employeeService : EmployeeService){}

  ngOnInit(){
    this.getListofEmployee();    
  } 

  getListofEmployee(){
    debugger;
    this._employeeService.GetAllEmployee().subscribe(
      (employee:getAllEmployee_dto[]) =>{
        console.log("list-oof-employee",employee);
        this.employee = employee.map(emp=>{
          emp.gender = this.getGenderText(emp.gender);
          return emp;
        })
      }
    )
  }


  getGenderText(gendervalue : number):string{
    switch(gendervalue){
      case 0:
        return Gender[Gender.Male]
        case 1:
      return Gender[Gender.Female];
    case 2:
      return Gender[Gender.others];
    default:
      return 'Unknown';
    }
  }

  
  DownnloadImage(id:number){
    debugger
      this._employeeService.GetImageFile(id).subscribe((response:Blob)=>{
        let bloburl = window.URL.createObjectURL(response);
     
       const fileName = 'downloaded_image.jpg'; 
       saveAs(bloburl, fileName);

       
       window.URL.revokeObjectURL(bloburl);
   }, error => {
       console.error('Error downloading image', error);
   });     
        
     
  }


  confirmDelete(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.deleteEmployee(id);
    }
  }
  
  deleteEmployee(id: number) {
    debugger;
    this._employeeService.DeleteEmployee(id).subscribe(
      response => {
        console.log(response.message); 
        this.employee = this.employee.filter(emp => emp.employeeId !== id); // Remove deleted employee from list
      },
      error => {
        console.error('Error deleting employee', error);
        alert('An error occurred while deleting the employee.'); 
      }
    );
  }
  


}
