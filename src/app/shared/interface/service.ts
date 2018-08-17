export class Service {
    id?: Number;
    company_id:Number;
    name:String;
    description: String;
    duration: Number;
    spaces:Number;
    available_spaces:Number;
    price:Number;
    program:object;
    constructor() { 
        this.available_spaces=this.spaces;
        this.program = {
            mon:{7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0},
            tue:{7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0},
            wed:{7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0},
            thu:{7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0},
            fri:{7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0},
            sat:{7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0},
            sun:{7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:0,16:0,17:0,18:0},
        }
    }
  }
    