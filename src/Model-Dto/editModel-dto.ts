
export class editAllEmployee_dto{
    constructor(
        public employeeId :any,
        public  firstName : string,
        public lastName : string,
        public salary : number, 
        public department : number, 
        public isActive: true,
        public gender : any, 
        public language : any,
        public countryName : string,
        public stateName : string ,
        public districtName : string,
        public imagePath : string
    ){}
}