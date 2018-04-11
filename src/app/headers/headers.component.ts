import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import * as _ from 'lodash';
import * as $ from 'backbone';
const joint = require('../../../node_modules/jointjs/dist/joint.js');


@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let graph2 = new joint.dia.Graph;

    let paper2 = new joint.dia.Paper({
      el: jQuery("#headers"),
      width: 700,
      height: 100,
      model: graph2,
      gridSize: 1,
      interactive: false
    });



    joint.shapes.basic.trapez = joint.shapes.basic.Generic.extend({

      markup: '<g class="rotatable"><g class="scalable"><polygon points="20,0 180,0 200,100 0,100"/></g><text/></g>',

      defaults: joint.util.deepSupplement({

        type: 'basic.Polygon',
        attrs: {
          'polygon': { fill: '#FFFFFF', stroke: 'black', width: 1, height: 1 },
          'text': { 'font-size': 14, 'font-family': 'arial', 'ref-x': .5, 'ref-y': .5, ref: 'polygon', 'y-alignment': 'middle', 'x-alignment': 'middle' }
        }

      }, joint.shapes.basic.Generic.prototype.defaults)
    });


    joint.shapes.basic.six = joint.shapes.basic.Generic.extend({

      markup: '<g class="rotatable"><g class="scalable"><polygon points="0,50 50,0 150,0 200,50 150,100 50,100"/></g><text/></g>',

      defaults: joint.util.deepSupplement({

        type: 'basic.Polygon',
        attrs: {
          'polygon': { fill: '#FFFFFF', stroke: 'black', width: 1, height: 1 },
          'text': { 'font-size': 14, 'font-family':'arial', 'ref-x': .5, 'ref-y': .5, ref: 'polygon', 'y-alignment': 'middle', 'x-alignment': 'middle' }
        }

      }, joint.shapes.basic.Generic.prototype.defaults)
    });


    // header

    var trp =  new joint.shapes.basic.trapez({
      position: { x: 0, y: 1 },
      size: { width: 100, height: 50 },
// attrs: { 'polygon': { transform: 'rotate(180)'}}
    });
    trp.attr({

      polygon: { fill: '#ffe665', 'stroke-width': 1, stroke: 'black' },
      text: {
        text: 'IF',
        color: 'black'
      }
    });

    var trp2 =  new joint.shapes.basic.trapez({
      position: { x: 205, y: 50 },
      size: { width: 100, height: 50 },
      attrs: { 'polygon': { transform: 'rotate(180)'}}
    });
    trp2.attr({

      polygon: { fill: '#FFA533', 'stroke-width': 1, stroke: 'black' },
      text: {
        text: 'ELSE'
      }
    });

    let s = new joint.shapes.basic.Circle({
      position: { x: 210, y: 1 },
      size: { width: 100, height: 50 },
      attrs: { circle: { fill: '#33B0FF' }, text: { text: 'FOR', fill: 'white' } }
    });


    let s2 = new joint.shapes.basic.Circle({
      position: { x: 320, y: 1 },
      size: { width: 100, height: 50 },
      attrs: { circle: { fill: '#33FF51' }, text: { text: 'WHILE', fill: 'white' } }
    });



    var si =  new joint.shapes.basic.six({
      position: { x: 430, y: 1 },
      size: { width: 100, height: 50 },
    });
    si.attr({

      polygon: { fill: '#FF3333', 'stroke-width': 1, stroke: 'black' },
      text: {
        text: 'SWITCH'
      }
    });

    var trp3 =  new joint.shapes.basic.trapez({
      position: { x: 540, y: 1 },
      size: { width: 100, height: 50 },
// attrs: { 'polygon': { transform: 'rotate(180)'}}
    });
    trp3.attr({

      polygon: { fill: '#792fff', 'stroke-width': 1, stroke: 'black' },
      text: {
        text: 'CASE',
        color: 'white'
      }
    });



    //  header.addCells([trp,si,trp2,s,s2,trp3]);
    graph2.addCells([trp,si,trp2,s,s2,trp3]);
  }

}
