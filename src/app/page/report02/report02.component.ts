import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';
import jsPDF from 'jspdf'
@Component({
  selector: 'app-report02',
  templateUrl: './report02.component.html',
  styleUrls: ['./report02.component.css']
})
export class Report02Component implements OnInit {

  
  constructor(private dataSer : DataService) { }

  node
  build
  rack
  location
  nodes
  builds
  racks
  locations
  dateToo: Date
  dateFrom: Date
  dateFromView
  dateTooView
  reportList
  amount
  ngOnInit() {
    this.dataSer.getLocationDistrict().subscribe(data=>{
      // console.log(data);
        this.nodes =data['node']
        this.builds = data['build']
        this.racks = data['rack']
        this.locations = data['location']   
        
    })
    this.reportList = {'data':[]}
  }

  finaldata = []
  sendFilter(){
    if (this.dateFrom) {
      this.dateFromView = this.dateFrom.getDate()+"/" +(this.dateFrom.getMonth()+1)+"/" +this.dateFrom.getFullYear()
    }
    if (this.dateToo) {
      this.dateTooView = this.dateToo.getDate()+"/" +(this.dateToo.getMonth()+1)+"/" +this.dateToo.getFullYear()
    }
    let jData = {
      "node" :this.node,
      "build" : this.build,
      "rack" : this.rack,
      "location" : this.location,
      'dateFrom' : this.dateFrom.getFullYear()+"-" +(this.dateFrom.getMonth()+1)+"-" +this.dateFrom.getDate(),
      'dateToo' : this.dateToo.getFullYear()+"-" +(this.dateToo.getMonth()+1)+"-" +this.dateToo.getDate()
    }

    this.dataSer.getReport2(jData).subscribe(data=>{
      // console.log(data);
      this.reportList = data
      console.log(data);
      
      this.amount = this.reportList['data'].length
      this.amount = this.amount.toString()
      // <tr *ngFor="let list of reportList['data']">
      //                       <ng-container *ngFor="let li of list['data']">
      //                           <td>{{list['data'][0]['start'].ip}}</td>
      //                           <td>{{list['data'].length}}</td>
      //                           <td>{{li['duration']}}</td>
      //                           <td>{{li['start'].timedate}}</td>
      //                           <td>{{li['end'].timedate}}</td>
      //                       </ng-container>

      //                   </tr>
      this.finaldata = []
      for(let list of this.reportList['data']){
          for(let li of list['data']){
            this.finaldata.push({'ip' : list['data'][0]['start'].ip,
            'length' : list['data'].length,
            'duration' : li['duration'],
            'start' : li['start'].timedate,
            'end' : li['end'].timedate,
            'sumDuration' :list['sumDuration']
          })
          }
      }
      console.log(this.finaldata);
      
    })
    
  }

  downloadPDF() {
    const doc = new jsPDF({
      format: "a4",
      orientation: 'landscape'
    });

    doc.setTextColor(0, 0, 0)
    doc.setFontSize(18);
    doc.text('Report summary devices downtime and detail', 14, 22);
    doc.setFontSize(11);
    const build = "Report from node"
    const form = "ContractNumber :"
    const amount = "Amount of device " + this.amount;
    
    
    // pageSize = doc.internal.pageSize;
    // pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    // arrMy = doc.splitTextToSize(myText, pageWidth - 35)
    doc.text(build, 14, 30);
    doc.text(form, 14, 36);
    doc.text(amount, 14, 42);
    doc.autoTable({
      theme: 'grid',
      headStyles: { fillColor: [0, 0, 0] },
      html: '#table1',
      startY: 50,
      showHead: 'firstPage'
    });


    doc.save('sample-file.pdf');
  }

  viewPre = {
    'ip':'',
    'length':'',
    'sumDuration':'',
  } 
  count = 0
  tableFrom(li){
    if(li['ip']==this.viewPre['ip'] && li['length']==this.viewPre['length'] && li['sumDuration']==this.viewPre['sumDuration']){
      if (this.count < 2) {
        this.count += 1
        return true
      }
      
      
      return false
    }else{
      this.viewPre = li
      this.count = 0
      return true 
    }
  }

  

}
