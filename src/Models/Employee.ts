export class Employee{
    constructor(         
        public employeeId : number,  
        public  firstName : string,
        public lastName : string,
        public salary : number ,
        public department : number,         
        public isActive: true
    ){}
}


export class EmployeeDetail{
    constructor(
        public EmployeeDetailId : number | null,
        public Gender : number, 
        public Language : string
    ){}

}


export class Image{
    constructor(
        public ImageId : number,
        public ImagePath : string,
        public CreatedOn : Date,
        //public File : IFormFile
    ){}
}

export enum Gender{
    Male,
    Female,
    others
}

export class Country{
    constructor(
        public  countryId : number,
        public  countryName:string

    ){}
}


export class State{
    constructor(
        public StateId : number,
        public StateName : string
    ){}
}

export class District{
    constructor(
        public DistrictId : number,
        public DistrictName : string
    ){}
}

