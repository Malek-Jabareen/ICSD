import { Component, OnInit  } from '@angular/core';
import * as jQuery from 'jquery';
import * as _ from 'lodash';
import * as $ from 'backbone';
const joint = require('../../../node_modules/jointjs/dist/joint.js');

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})
export class DiagramComponent implements OnInit {
  title = 'ICSD';

  ngOnInit() {
    let graph = new joint.dia.Graph;

    let paper = new joint.dia.Paper({
      el: jQuery("#diagram"),
      width: 700,
      height: 1000,
      model: graph,
      gridSize: 1
    });



    joint.shapes.basic.trapez = joint.shapes.basic.Generic.extend({

      markup: '<g class="rotatable"><g class="scalable"><polygon points="20,0 180,0 200,100 0,100"/></g><text/></g>',

      defaults: joint.util.deepSupplement({

        type: 'basic.Polygon',
        attrs: {
          'polygon': { fill: '#FFFFFF', stroke: 'black', width: 1, height: 1 },
          'text': { 'font-size': 14, 'ref-x': .5, 'ref-y': .5, ref: 'polygon', 'y-alignment': 'middle', 'x-alignment': 'middle' }
        }

      }, joint.shapes.basic.Generic.prototype.defaults)
    });


    joint.shapes.basic.six = joint.shapes.basic.Generic.extend({

      markup: '<g class="rotatable"><g class="scalable"><polygon points="0,50 50,0 150,0 200,50 150,100 50,100"/></g><text/></g>',

      defaults: joint.util.deepSupplement({

        type: 'basic.Polygon',
        attrs: {
          'polygon': { fill: '#FFFFFF', stroke: 'black', width: 1, height: 1 },
          'text': { 'font-size': 14, 'ref-x': .5, 'ref-y': .5, ref: 'polygon', 'y-alignment': 'middle', 'x-alignment': 'middle' }
        }

      }, joint.shapes.basic.Generic.prototype.defaults)
    });


    // header

    var trp =  new joint.shapes.basic.trapez({
      position: { x: 0, y: 0 },
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
      position: { x: 200, y: 50 },
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
      position: { x: 200, y: 0 },
      size: { width: 100, height: 50 },
      attrs: { circle: { fill: '#33B0FF' }, text: { text: 'FOR', fill: 'white' } }
    });


    let s2 = new joint.shapes.basic.Circle({
      position: { x: 305, y: 0 },
      size: { width: 100, height: 50 },
      attrs: { circle: { fill: '#33FF51' }, text: { text: 'WHILE', fill: 'white' } }
    });



    var si =  new joint.shapes.basic.six({
      position: { x: 410, y: 0 },
      size: { width: 100, height: 50 },
    });
    si.attr({

      polygon: { fill: '#FF3333', 'stroke-width': 1, stroke: 'black' },
      text: {
        text: 'SWITCH'
      }
    });

    var trp3 =  new joint.shapes.basic.trapez({
      position: { x: 510, y: 0 },
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

    // diagram

    let rect = new joint.shapes.basic.Rect({
      position: { x: 0, y: 200 },
      size: { width: 100, height: 50 },
      attrs: { rect: { fill: 'blue' }, text: { text: 'Rect', fill: 'white' } }
    });

    let rect2 = new joint.shapes.basic.Rect({
      position: { x: 120, y: 200 },
      size: { width: 100, height: 50 },
      attrs: { rect: { fill: 'red' }, text: { text: 'Rect', fill: 'white' } }
    });

    let sq = new joint.shapes.basic.Circle({
      position: { x: 60, y: 100 },
      size: { width: 100, height: 50 },
      attrs: { circle: { fill: 'yellow' }, text: { text: 'Rect', fill: 'black' } }
    });

    let sq2 = new joint.shapes.basic.Circle({
      position: { x: 400, y: 200 },
      size: { width: 100, height: 50 },
      attrs: { circle: { fill: 'black' }, text: { text: 'Circle', fill: 'white' } }
    });

    let rect3 = new joint.shapes.basic.Rect({
      position: { x: 340, y: 400 },
      size: { width: 100, height: 50 },
      attrs: { rect: { fill: 'blue' }, text: { text: 'Rect', fill: 'white' } }
    });

    let rect4 = new joint.shapes.basic.Rect({
      position: { x: 460, y: 400 },
      size: { width: 100, height: 50 },
      attrs: { rect: { fill: 'red' }, text: { text: 'Rect', fill: 'white' } }
    });

    var link = new joint.dia.Link({
      source: { id: rect.id },
      target: { id: rect2.id }
    });
    var link2 = new joint.dia.Link({
      source: { id: rect2.id },
      target: { id: sq.id }
    });
    var link3 = new joint.dia.Link({
      source: { id: rect.id },
      target: { id: sq.id }
    });
    var link4 = new joint.dia.Link({
      source: { id: sq2.id },
      target: { id: rect3.id }
    });
    var link5 = new joint.dia.Link({
      source: { id: sq2.id },
      target: { id: rect4.id }
    });
    var link6 = new joint.dia.Link({
      source: { id: rect2.id },
      target: { id: sq2.id }
    });

    graph.addCells([rect, rect2, link, sq, link2, link3, sq2, rect3, rect4, link4, link5, link6, trp,si,trp2,s,s2,trp3]);
  }
}
