export class PostEmployee_dto{
     constructor (     
        public  firstName : string,
        public lastName : string,
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