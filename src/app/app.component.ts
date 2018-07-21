import {Component, OnInit, ViewChild} from '@angular/core';
import {DiagramComponent} from './diagram/diagram.component';
import * as $ from 'jquery';
import * as _ from 'lodash';
 import * as $$ from 'backbone';
import {getExpressionScope} from '@angular/compiler-cli';
import {build$} from 'protractor/built/element';
const joint = require('./../../node_modules/jointjs/dist/joint.js');
/* declare var $: any; */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('component1') component1: DiagramComponent;
  title = 'ICSD';
  hide = true;
  ccc: string;
  fT2 = '';

  hideDiagram() {
    this.hide = !this.hide;
    if (this.hide == false) {
      this.zoomin();
      this.zoomin();
    } else {
      this.zoomout();
      this.zoomout();
    }
  }


  ngOnInit() {

    const graph = new joint.dia.Graph;
    const paper = new joint.dia.Paper({
      el: jQuery('#header'),
      width: 920,
      height: 50,
      model: graph,
      gridSize: 1,
      interactive: false
    });
    joint.shapes.basic.trapez = joint.shapes.basic.Generic.extend({

      markup: '<g class="rotatable"><g class="scalable"><polygon points="60,0 140,0 200,100 0,100"/></g><text/></g>',

      defaults: joint.util.deepSupplement({

        type: 'basic.Polygon',
        attrs: {
          'polygon': { fill: '#FFFFFF', stroke: 'black', width: 1, height: 1 },
          'text': { 'font-size': 14, 'font-family': 'arial', 'ref-x': .5, 'ref-y': .5,
            ref: 'polygon', 'y-alignment': 'middle', 'x-alignment': 'middle' }
        }

      }, joint.shapes.basic.Generic.prototype.defaults)
    });

    joint.shapes.basic.trapezR = joint.shapes.basic.Generic.extend({

      markup: '<g class="rotatable"><g class="scalable"><polygon points="0,0 200,0 140,100 60,100"/></g><text/></g>',

      defaults: joint.util.deepSupplement({

        type: 'basic.Polygon',
        attrs: {
          'polygon': { fill: '#FFFFFF', stroke: 'black', width: 1, height: 1 },
          'text': { 'font-size': 14, 'font-family': 'arial', 'ref-x': .5, 'ref-y': .5,
            ref: 'polygon', 'y-alignment': 'middle', 'x-alignment': 'middle' }
        }

      }, joint.shapes.basic.Generic.prototype.defaults)
    });

    joint.shapes.basic.six = joint.shapes.basic.Generic.extend({

      markup: '<g class="rotatable"><g class="scalable"><polygon points="0,50 50,0 150,0 200,50 150,100 50,100"/></g><text/></g>',

      defaults: joint.util.deepSupplement({

        type: 'basic.Polygon',
        attrs: {
          'polygon': { fill: '#FFFFFF', stroke: 'black', width: 1, height: 1 },
          'text': { 'font-size': 14, 'font-family': 'arial', 'ref-x': .5,
            'ref-y': .5, ref: 'polygon', 'y-alignment': 'middle', 'x-alignment': 'middle' }
        }

      }, joint.shapes.basic.Generic.prototype.defaults)
    });


    // header

    const trp =  new joint.shapes.basic.trapez({
      position: { x: 20, y: 1 },
      size: { width: 110, height: 48 },
// attrs: { 'polygon': { transform: 'rotate(180)'}}
    });
    trp.attr({

      polygon: { fill: '#fff58c', 'stroke-width': 1, stroke: 'black' },
      text: {
        text: 'IF',
        color: 'black'
      }
    });

    const trp2 =  new joint.shapes.basic.trapezR({
      position: { x: 170, y: 1 },
      size: { width: 110 , height: 48 },
    });
    trp2.attr({
      polygon: { fill: '#FFA533', 'stroke-width': 1, stroke: 'black' },
      text: {
        text: 'ELSE'
      }
    });
    const s = new joint.shapes.basic.Circle({
      position: { x: 320, y: 1 },
      size: { width: 110, height: 48 },
      attrs: { circle: { fill: '#33B0FF' }, text: { text: 'FOR', fill: 'white' } }
    });


    const s2 = new joint.shapes.basic.Circle({
      position: { x: 470, y: 1 },
      size: { width: 110, height: 48 },
      attrs: { circle: { fill: '#33FF51' }, text: { text: 'WHILE', fill: 'white' } }
    });



    const si =  new joint.shapes.basic.six({
      position: { x: 620, y: 1 },
      size: { width: 110, height: 48 },
    });
    si.attr({

      polygon: { fill: '#FF3333', 'stroke-width': 1, stroke: 'black' },
      text: {
        text: 'SWITCH'
      }
    });

    const trp3 =  new joint.shapes.basic.trapez({
      position: { x: 770, y: 1 },
      size: { width: 100, height: 48 },
// attrs: { 'polygon': { transform: 'rotate(180)'}}
    });
    trp3.attr({

      polygon: { fill: '#792fff', 'stroke-width': 1, stroke: 'black' },
      text: {
        text: 'CASE',
        color: 'white'
      }
    });


    graph.addCells([trp, si, trp2, s, s2, trp3]);
  }
  build() {
    this.component1.alirt();
  }
  zoomin() {
    this.component1.zoomin();
  }
  zoomout() {
    this.component1.zoomout();
  }
  help() {
    this.component1.help();
  }

}
