import { DataService } from './../../service/data.service';
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf'
import 'jspdf-autotable';
import { MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition} from '@angular/material';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(public snackBar: MatSnackBar
    ,private dataS :DataService) { }

  ngOnInit() {
    this.reportList = []
  }


  dateToo: Date
  dateFrom: Date
  selectList = ['node','build','location']
  select

  downloadPDF() {
    const doc = new jsPDF({
      format: "a4",
      orientation: 'landscape'
    });

    doc.setTextColor(0, 0, 0)
    doc.setFontSize(18);
    doc.text('Report overview status of device', 14, 22);
    doc.setFontSize(11);
    const build = "Report from node1 ICT Floor 3 UPN4_R3_ICT_F3-01"
    const form = "From : "+this.dateFromView+" Too : " + this.dateTooView
    
    
    // pageSize = doc.internal.pageSize;
    // pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    // arrMy = doc.splitTextToSize(myText, pageWidth - 35)
    doc.text(build, 14, 30);
    doc.text(form, 14, 36);
    doc.autoTable({
      theme: 'grid',
      headStyles: { fillColor: [0, 0, 0] },
      html: '#table1',
      startY: 50,
      showHead: 'firstPage'
    });


    doc.save('sample-file.pdf');
  }

  message: string = 'Snack Bar opened.';
  actionButtonLabel: string = 'Retry';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 2000;
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

  dateFromView : string
  dateTooView : string
  reportList 
  finalTable = []
  sendFilter(){
    if (this.dateFrom) {
      this.dateFromView = this.dateFrom.getDate()+"/" +(this.dateFrom.getMonth()+1)+"/" +this.dateFrom.getFullYear()
    }
    if (this.dateToo) {
      this.dateTooView = this.dateToo.getDate()+"/" +(this.dateToo.getMonth()+1)+"/" +this.dateToo.getFullYear()
    }
    let dataJ = {
      'select' : this.select,
      'dateFrom' : this.dateFrom.getFullYear()+"-" +(this.dateFrom.getMonth()+1)+"-" +this.dateFrom.getDate(),
      'dateToo' : this.dateToo.getFullYear()+"-" +(this.dateToo.getMonth()+1)+"-" +this.dateToo.getDate()
    }

    this.dataS.getReport1(dataJ).subscribe(data=>{
      console.log("data:",data);
      
      this.finalTable = []
      this.reportList = data      
      for (const i of this.reportList) {
        this.finalTable.push([{'location':Object.keys(i)[0],
                              'amount' : i[Object.keys(i)[0]].length,
                              'stable':"Null",
                              'sumdown':i['sumDuration']}]) 
      }
      console.log(this.finalTable);
      
    })
  }

 

}

