import { DataService } from './../../service/data.service';
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf'
import 'jspdf-autotable';
@Component({
  selector: 'app-report03',
  templateUrl: './report03.component.html',
  styleUrls: ['./report03.component.css']
})
export class Report03Component implements OnInit {

  constructor(private dataSer : DataService) { }

  node
  build
  rack
  location
  contractNumber
  nodes
  builds
  racks
  locations
  contractNumbers

  reportList
  amount
  ngOnInit() {
    this.dataSer.getLocationDistrict().subscribe(data=>{
      // console.log(data);
        this.nodes =data['node']
        this.builds = data['build']
        this.racks = data['rack']
        this.locations = data['location']   
        this.contractNumbers = data['contractnumber']   
        
    })
    this.reportList = []
  }

  sendFilter(){
    let jData = {
      "node" :this.node,
      "build" : this.build,
      "rack" : this.rack,
      "location" : this.location,
      "contract" : this.contractNumber
    }

    this.dataSer.getReport3(jData).subscribe(data=>{
      // console.log(data);
      this.reportList = data
      this.amount = this.reportList.length
      this.amount = this.amount.toString()
    })
    
  }

  downloadPDF() {
    const doc = new jsPDF({
      format: "a4",
      orientation: 'landscape'
    });

    doc.setTextColor(0, 0, 0)
    doc.setFontSize(18);
    doc.text('Report Summary Device down and Detail', 14, 22);
    doc.setFontSize(11);
    const build = "Report form : node " +this.node+ " location " +this.location+ " build " +this.build+ " rack " +this.rack
    const form = "ContractNumber :" + this.contractNumber
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
}
