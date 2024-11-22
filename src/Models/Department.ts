export interface Department{
    departmentId : number;
    departmentName :string;
}


export class Language{
    constructor(
        public languageID : number,
        public languageName : string,
    ){}
}