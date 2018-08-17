export class User {
    id?: Number;
    email: String;
    username:String;
    password: String;
    active?: Number;
    token: String;
    roles?: Number[];
    logo: String;
    companyDescription:String;
    companyName:String;
  
    constructor() {this.logo="https://d2z1ksq6nul58p.cloudfront.net/sites/default/files/logo-white.svg" }
  }
  