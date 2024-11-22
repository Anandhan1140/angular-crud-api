export class UpdateEmployee_dto{
    constructor (   
        public employeeId : number,  
       public  FirstName : string,
       public LastName : string,
       public salary : number, 
       public department : number, 
       public isActive: true,
       public Gender : number, 
       public Language : string,
       public  CountryId : number,
       public StateId : number,
       public DistrictId : number,
       public file : File

    ){}

}