export class activeDevice {
  id: string; //index
  ip: string; //ip
  name: string; //commu string
}

export class AddDeviceForms {
  ip: string; //ip
  name: string; //commu string
  active: string; //monitor active
}


export class User{
  firstName: string;
  lastName: string;
  type: string;
}

export class allDeviceDetail{
  active : Number;
  build: string ;
  deviceid: Number ; 
  icmpstatus: string ; 
  ip : string ;
  lastCheck : Number ; 
  location : string ; 
  locationID : Number ; 
  node : string ; 
  rack : string ; 
  timedate : string;
  
}
