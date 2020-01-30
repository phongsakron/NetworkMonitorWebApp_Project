import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf'
import { DataService } from './../../service/data.service';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-report05',
  templateUrl: './report05.component.html',
  styleUrls: ['./report05.component.css']
})
export class Report05Component implements OnInit {


  constructor(private dataS: DataService) { }

  // parameter
  dateFrom: Date
  dateToo: Date
  selectList = ['location', 'node', 'build', 'rack']
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
              max :100,
              callback: function (value, index, values) {
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
  change() {
    this.myVarticalChart.data.datasets[0].data = []

    this.myVarticalChart.data.datasets[0].backgroundColor = []

    this.myVarticalChart.data.labels = []
    for (const i of this.myData[this.active][this.select]) {
      let key = Object.keys(i)
      let value = Object.values(i)
      // console.log(key[0],value[0]);


      this.myVarticalChart.data.datasets[0].data.push(value[0])

      this.myVarticalChart.data.datasets[0].backgroundColor.push(this.getRandomColor())

      this.myVarticalChart.data.labels.push(key[0])

    }
    this.myVarticalChart.update()
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
    const build = "From : " + this.dateFromView + " Too : " + this.dateTooView
    const form = "Graph show status of devices"


    // pageSize = doc.internal.pageSize;
    // pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    // arrMy = doc.splitTextToSize(myText, pageWidth - 35)
    doc.text(build, 14, 30);
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
    if (this.dateFrom) {
      this.dateFromView = this.dateFrom.getDate() + "/" + (this.dateFrom.getMonth() + 1) + "/" + this.dateFrom.getFullYear()
    }
    if (this.dateToo) {
      this.dateTooView = this.dateToo.getDate() + "/" + (this.dateToo.getMonth() + 1) + "/" + this.dateToo.getFullYear()
    }
    let dataJ = {
      'select': this.select,
      'dateFrom': this.dateFrom.getFullYear() + "-" + (this.dateFrom.getMonth() + 1) + "-" + this.dateFrom.getDate(),
      'dateToo': this.dateToo.getFullYear() + "-" + (this.dateToo.getMonth() + 1) + "-" + this.dateToo.getDate()
    }

    this.dataS.getReport5(dataJ).subscribe(data => {
      this.myVarticalChart.data.datasets[0].data = []

      this.myVarticalChart.data.datasets[0].backgroundColor = []

      this.myVarticalChart.data.labels = []
      console.log(data);
      for (const i in data) {
        let sum = 0
        data[i]['data'].forEach(el => {
          sum += el['data'].length
          // console.log(el)
        })
        this.myVarticalChart.data.labels.push(data[i]['location'])
        this.myVarticalChart.data.datasets[0].data.push(sum)
        this.myVarticalChart.data.datasets[0].backgroundColor.push(this.getRandomColor())
      }
      console.log(this.myVarticalChart);
      
      let max = Math.max(...this.myVarticalChart.data.datasets[0].data);
      this.myVarticalChart.options.scales.yAxes[0].ticks.max = max+1
      // console.log(stepSize);
      
      this.myVarticalChart.update()
      
      // console.log(this.myVarticalChart.scales['y-axis-0'])
      // let len = 0
      // console.log(this.myVarticalChart.scales['y-axis-0'].ticksAsNumbers);
      // for (let i = 2; i < this.myVarticalChart.scales['y-axis-0'].ticks.length; i++) {
      //   console.log(i,this.myVarticalChart.scales['y-axis-0'].ticks[i]);
        
      //   if (this.myVarticalChart.scales['y-axis-0'].ticks[i]) {
      //     len = this.myVarticalChart.scales['y-axis-0'].ticks[i]
      //     break
      //   }
      // }
      // console.log("len" ,len);
      // console.log("this.myVarticalChart.scales['y-axis-0'].ticks[0]" ,this.myVarticalChart.scales['y-axis-0'].ticks[1]);
      
      // len = this.myVarticalChart.scales['y-axis-0'].ticks[1]-len
      // this.myVarticalChart.options.scales.yAxes[0].ticks.max = max+len
      // this.myVarticalChart.update()
    })


  }

}
