import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.css']
})

export class ExamplesComponent implements OnInit {
  private fs = require('fs');
  constructor() {
  }

  ngOnInit() {
  }

   myf(f: string) {
    document.getElementById('s').innerHTML = ' <img src="assets/pictures/' + f + '.png" style="width: 100%"> ';
     for (let i = 1; i <= 13; i++) {
       document.getElementById('f' + i).innerHTML = 'f' + i;
     }
     document.getElementById(f).innerHTML = '<strong style="color: red">' + f + '>>></strong>';

    const funcText = this.readFile('assets/functionsText/' + f + '.txt');
     /*document.getElementById('t').innerHTML = '<pre>' + funcText + '</pre>';*/
    /*if ( f === 'f1' ) {
      this.funcTxt = this.f1;
    }
     if ( f === 'f2' ) {
       this.funcTxt = this.f2;
     }*/
  }
  readFile(file) {
    const raw = new XMLHttpRequest(); // create a request
    let allText = '';
    raw.open('GET', file, false); // open file
    raw.onreadystatechange = function () { // file is ready to read
      if (raw.readyState === 4) {
        if ( raw.status === 200 || raw.status === 0) {
          allText = raw.responseText;
          document.getElementById('t').innerHTML = '<pre>' + allText + '</pre>';
        }
      }
    };
    raw.send(null); // return control
  }
}
