import { activeDevice } from './../../class/class';
import { DataService } from './../../service/data.service';
import { Chart } from 'chart.js';
import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf'

@Component({
  selector: 'app-report04',
  templateUrl: './report04.component.html',
  styleUrls: ['./report04.component.css']
})
export class Report04Component implements OnInit {

  constructor(private dataS: DataService) { }

  // parameter
  dateFrom: Date
  dateToo: Date
  selectList = ['location', 'node', 'build', 'rack']
  activeList = ['active', 'noactive']
  select
  active

  Chart
  myData
  ngOnInit() {
    this.dataS.getReport4().subscribe(data => {
      this.myData = data
      // console.log(data);

    })
    // back ground black problem
    Chart.plugins.register({
      beforeDraw: function (chartInstance) {
        var ctx = chartInstance.ctx;
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, chartInstance.width, chartInstance.height);
      }
    });
    this.myVarticalChartFunc()
  }



  data2 = {
    labels: [],
    datasets: [
      {
        label: "Amount",
        backgroundColor: [],
        data: []
      }
    ]
  }
  myVarticalChart
  myVarticalChartFunc() {
    this.myVarticalChart = new Chart('varticalChart', {
      type: 'bar',
      data: this.data2,
      options: {
        legend: { display: false },
        scales: {
          yAxes: [{
            ticks: {
              min: 0, // it is for ignoring negative step.
    beginAtZero: true,
    callback: function(value, index, values) {
        if (Math.floor(value) === value) {
            return value;
        }
    }
            }
          }]
        },
        plugins: { //setup chartjs-plugin-labels plug in 
          labels: [

            {
              render: 'value',
              fontStyle: 'bold',
            }
          ],
        }

      }
    });
  }
  getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }




  downloadPDF() {
    const doc = new jsPDF({
      format: "a4",
      orientation: 'landscape'
    });

    doc.setTextColor(0, 0, 0)
    doc.setFontSize(18);
    doc.text('Overview Report', 14, 22);
    doc.setFontSize(11);
    const form = "Graph show amount of devices"


    // pageSize = doc.internal.pageSize;
    // pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    // arrMy = doc.splitTextToSize(myText, pageWidth - 35)
    
    doc.text(form, 14, 36);

    doc.addImage(document.getElementById("varticalChart"), 14, 50, 150, 84)
    // Source:
    // modules/addimage.js, line 596
    // Adds an Image to the PDF.
    // (inner) addImage(imageData, format, x, y, width, height, alias, compression, rotation)

    // Parameters:
    // Name	Type	Description
    // imageData	string | HTMLImageElement | HTMLCanvasElement | Uint8Array	
    // imageData as base64 encoded DataUrl or Image-HTMLElement or Canvas-HTMLElement

    // format	string	
    // format of file if filetype-recognition fails or in case of a Canvas-Element needs to be specified (default for Canvas is JPEG), e.g. 'JPEG', 'PNG', 'WEBP'

    // x	number	
    // x Coordinate (in units declared at inception of PDF document) against left edge of the page

    // y	number	
    // y Coordinate (in units declared at inception of PDF document) against upper edge of the page

    // width	number	
    // width of the image (in units declared at inception of PDF document)

    // height	number	
    // height of the Image (in units declared at inception of PDF document)

    // alias	string	
    // alias of the image (if used multiple times)

    // compression	string	
    // compression of the generated JPEG, can have the values 'NONE', 'FAST', 'MEDIUM' and 'SLOW'

    // rotation	number	
    // rotation of the image in degrees (0-359)

    doc.save('sample-file.pdf');
  }

  dateFromView: string
  dateTooView: string
  sendFilter() {

    this.myVarticalChart.data.datasets[0].data = []

    this.myVarticalChart.data.datasets[0].backgroundColor = []

    this.myVarticalChart.data.labels.push = []
    this.dataS.getReport4().subscribe(data => {
      let la = []
      let va = []
      let col = []
      data[this.active][this.select].forEach(el => {
        la.push(Object.values(el)[0])
        va.push(Object.keys(el)[0])
        col.push(this.getRandomColor())

      })
      this.myVarticalChart.data.datasets[0].data = la

      this.myVarticalChart.data.datasets[0].backgroundColor = col

      this.myVarticalChart.data.labels = va
      console.log(this.myVarticalChart)
      
      let max = Math.max(...this.myVarticalChart.data.datasets[0].data);
      this.myVarticalChart.options.scales.yAxes[0].ticks.max = max+1
      // console.log(stepSize);
      
      this.myVarticalChart.update()

    })


  }
}
