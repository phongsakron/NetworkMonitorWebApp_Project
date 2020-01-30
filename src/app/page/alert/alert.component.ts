import { LoggingServiceService } from './../../service/loggingService.service';
import { UserServiceService } from './../../service/user-service.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBar, MatSnackBarConfig, MatSnackBarVerticalPosition } from '@angular/material';
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {


  conActive :Boolean 
  disActive :Boolean

  
  constructor(public snackBar: MatSnackBar,
    private userr : UserServiceService
    ,private logging : LoggingServiceService) {
   }
  id 
  ngOnInit() {
    this.id = this.logging.getId()
    this.userr.getUserById(this.id).subscribe(data=>{
        console.log(data);
        if(data[0]['emailAlert'] == 1){
          this.disActive = true
          this.conActive = false
        }else{
          this.disActive = false
          this.conActive = true
        }
    })

  }


  message: string = 'Now you will get alert to you register email';
  actionButtonLabel: string = 'close';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 10000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  addExtraClass: boolean = false;
  openSnackBar() {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    this.snackBar.open(this.message, this.action ? this.actionButtonLabel : undefined, config);
  }

  

  butConnect(){
    let j = { 'id': this.id}
    this.userr.toogleAlert(j).subscribe(data=>{
      this.message = 'Now you will get alert to you register email';
      this.openSnackBar()
      this.conActive = !this.conActive
      this.disActive = !this.disActive
    })
    
  }

  butDisconnect(){
    let j = { 'id': this.id}
    this.userr.toogleAlert(j).subscribe(data=>{
      this.message = 'Now you will not recive alert';
    this.openSnackBar()
    this.conActive = !this.conActive
    this.disActive = !this.disActive
    })
    
  }

  

}
