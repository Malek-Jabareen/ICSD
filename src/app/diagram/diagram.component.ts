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

    const graph = new joint.dia.Graph;


    const paper = new joint.dia.Paper({
      el: jQuery('#diagram'),
      width: 700,
      height: 1000,
      model: graph,
      gridSize: 1,
      interactive: function(cellView, method) {
        return !(cellView instanceof joint.dia.LinkView); }
    });





    joint.shapes.basic.trapez = joint.shapes.basic.Generic.extend({

      markup: '<g class="rotatable"><g class="scalable"><polygon points="20,0 180,0 200,100 0,100"/></g><text/></g>',

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





    // diagram

    const rect = new joint.shapes.basic.Rect({
      position: { x: 0, y: 1 },
      size: { width: 700, height: 50 },
      attrs: { rect: { fill: 'orange' }, text: { text: 'myFunc', fill: 'white' } }
    });

    const firstif =  new joint.shapes.basic.trapez({
      position: { x: 0, y: 200 },
      size: { width: 160, height: 50 },
// attrs: { 'polygon': { transform: 'rotate(180)'}}
    });
    firstif.attr({
      polygon: { fill: '#ffe665', 'stroke-width': 1, stroke: 'black' },
      text: {
        text: 'IF',
        color: 'black'
      }
    });

    const secondif =  new joint.shapes.basic.trapez({
      position: { x: 0, y: 300 },
      size: { width: 40, height: 50 },
// attrs: { 'polygon': { transform: 'rotate(180)'}}
    });
    secondif.attr({

      polygon: { fill: '#ffe665', 'stroke-width': 1, stroke: 'black' },
      text: {
        text: 'IF',
        color: 'black'
      }
    });

    const firstelse =  new joint.shapes.basic.trapez({
      position: { x: 150, y: 350 },
      size: { width: 60, height: 50 },
      attrs: { 'polygon': { transform: 'rotate(180)'}}
    });
    firstelse.attr({
      polygon: { fill: '#FFA533', 'stroke-width': 1, stroke: 'black' },
      text: {
        text: 'ELSE'
      }
    });

    const firstwhile = new joint.shapes.basic.Circle({
      position: { x: 160, y: 200 },
      size: { width: 160, height: 50 },
      attrs: { circle: { fill: '#33FF51' }, text: { text: 'WHILE', fill: 'white' } }
    });

    const firstfor = new joint.shapes.basic.Circle({
      position: { x: 170, y: 300 },
      size: { width: 140, height: 50 },
      attrs: { circle: { fill: '#33B0FF' }, text: { text: 'FOR', fill: 'white' } }
    });

    const ifinfor =  new joint.shapes.basic.trapez({
      position: { x: 170, y: 400 },
      size: { width: 40, height: 50 },
// attrs: { 'polygon': { transform: 'rotate(180)'}}
    });
    ifinfor.attr({

      polygon: { fill: '#ffe665', 'stroke-width': 1, stroke: 'black' },
      text: {
        text: 'IF',
        color: 'black'
      }
    });

    const elseinfor =  new joint.shapes.basic.trapez({
      position: { x: 300, y: 450 },
      size: { width: 40, height: 50 },
      attrs: { 'polygon': { transform: 'rotate(180)'}}
    });
    elseinfor.attr({
      polygon: { fill: '#FFA533', 'stroke-width': 1, stroke: 'black' },
      text: {
        text: 'ELSE'
      }
    });

    const secondwhile = new joint.shapes.basic.Circle({
      position: { x: 330, y: 200 },
      size: { width: 370, height: 50 },
      attrs: { circle: { fill: '#33FF51' }, text: { text: 'WHILE', fill: 'white' } }
    });


    const link = new joint.dia.Link({
      source: { id: firstif.id },
      target: { id: secondif.id }
    });

    const link2 = new joint.dia.Link({
      source: { id: firstif.id },
      target: { id: firstelse.id }
    });

    const link3 = new joint.dia.Link({
      source: { id: firstwhile.id },
      target: { id: firstfor.id }
    });

    const link4 = new joint.dia.Link({
      source: { id: rect.id },
      target: { id: firstif.id }
    });

    const link5 = new joint.dia.Link({
      source: { id: rect.id },
      target: { id: firstwhile.id }
    });

    const link6 = new joint.dia.Link({
      source: { id: rect.id },
      target: { id: secondwhile.id }
    });

    const link7 = new joint.dia.Link({
      source: { id: firstfor.id },
      target: { id: ifinfor.id }
    });

     const link8 = new joint.dia.Link({
      source: { id: firstfor.id },
      target: { id: elseinfor.id }
    });

    graph2.addCells([trp, si, trp2, s, s2, trp3]);
    graph.addCells([rect, ifinfor, elseinfor, firstwhile, firstelse,
      firstfor, firstif, secondwhile, secondif, link, link2, link3, link4, link5, link6, link7, link8]);

  }
}
