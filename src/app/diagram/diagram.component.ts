import { Component, OnInit  } from '@angular/core';
import * as jQuery from 'jquery';
import * as _ from 'lodash';
import * as $ from 'backbone';
import {getExpressionScope} from '@angular/compiler-cli';
import {V} from 'jointjs';
const joint = require('../../../node_modules/jointjs/dist/joint.js');


@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})
export class DiagramComponent implements OnInit {
  title = 'ICSD';

ngOnInit() {


  joint.dia.LightLinkView = joint.dia.CellView.extend({
    node: V('<path class="connection" fill="none" />'),

    init: function() {
      this.vel.attr({
        'class': 'link',
        'model-id': this.model.id
      });
    },

    render: function() {

      const model = this.model;
      this._sourceModel = model.getSourceElement();
      this._targetModel = model.getTargetElement();

      this._sourceModel.on('change:position', this.update, this);
      this._targetModel.on('change:position', this.update, this);

      this.listenTo(model, 'change:vertices change:color change:thickness', this.update);

      const node = this._pathNode = this.node.clone();
      V(this.el).append(node);

      this.update();
    },

    update: function() {

      let sourcePosition = this._sourceModel.get('position');
      let targetPosition = this._targetModel.get('position');
      const node = this._pathNode;
      const model = this.model;

      if (sourcePosition && targetPosition) {

        const sourceSize = this._sourceModel.get('size');
        const targetSize = this._targetModel.get('size');

        sourcePosition = {
          x: targetPosition.x + targetSize.width / 2,
          y: sourcePosition.y + sourceSize.height
        };
        targetPosition = {
          x: targetPosition.x + targetSize.width / 2,
          y: targetPosition.y
        };

        const connector = (model.get('smooth')) ? 'smooth' : 'normal';

        node.attr('d', joint.connectors[connector](
          sourcePosition,
          targetPosition,
          model.get('vertices') || []
        ));
      }

      node.attr({
        'stroke': model.get('color') || 'black',
        'stroke-width': model.get('thickness') || 1
      });
    }
  });
    const graph = new joint.dia.Graph;
    const graph2 = new joint.dia.Graph;
    const paper = new joint.dia.Paper({
      el: jQuery('#diagram'),
      gridSize: 10,
      width: 920,
      height: 1000,
      model: graph,
      linkView: joint.dia.LightLinkView,
      /*interactive: function(cellView, method) {
        return !(cellView instanceof joint.dia.ElementView );*/
    });

  paper.setInteractivity({elementMove: false});
  const paper2 = new joint.dia.Paper({
      el: jQuery('#header'),
      width: 920,
      height: 120,
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
          'text': { 'font-size': 14, 'font-family': 'arial', 'ref-x': .5, 'ref-y': .5,
            ref: 'polygon', 'y-alignment': 'middle', 'x-alignment': 'middle' }
        }

      }, joint.shapes.basic.Generic.prototype.defaults)
    });

  joint.shapes.basic.trapezR = joint.shapes.basic.Generic.extend({

    markup: '<g class="rotatable"><g class="scalable"><polygon points="0,0 200,0 180,100 20,100"/></g><text/></g>',

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

    const trp2 =  new joint.shapes.basic.trapez({
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

    const s = new joint.shapes.basic.Circle({
      position: { x: 210, y: 1 },
      size: { width: 100, height: 50 },
      attrs: { circle: { fill: '#33B0FF' }, text: { text: 'FOR', fill: 'white' } }
    });


    const s2 = new joint.shapes.basic.Circle({
      position: { x: 320, y: 1 },
      size: { width: 100, height: 50 },
      attrs: { circle: { fill: '#33FF51' }, text: { text: 'WHILE', fill: 'white' } }
    });



    const si =  new joint.shapes.basic.six({
      position: { x: 430, y: 1 },
      size: { width: 100, height: 50 },
    });
    si.attr({

      polygon: { fill: '#FF3333', 'stroke-width': 1, stroke: 'black' },
      text: {
        text: 'SWITCH'
      }
    });

    const trp3 =  new joint.shapes.basic.trapez({
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

    // diagram

    const rect = new joint.shapes.basic.Rect({
      position: { x: 3, y: 3 },
      size: { width: 900, height: 50 },
      attrs: { rect: { fill: 'orange' }, text: { text: 'myFunc', fill: 'white' } }
    });

    const firstif =  new joint.shapes.basic.trapez({
      position: { x: 3, y: 105 },
      size: { width: 272, height: 50 },
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
      position: { x: 41, y: 210 },
      size: { width: 77, height: 50 },
// attrs: { 'polygon': { transform: 'rotate(180)'}}
    });
    secondif.attr({

      polygon: { fill: '#ffe665', 'stroke-width': 1, stroke: 'black' },
      text: {
        text: 'IF',
        color: 'black'
      }
    });

    const firstelse =  new joint.shapes.basic.trapezR({
      position: { x: 118, y: 210 },
      size: { width: 119, height: 50 },
    });
    firstelse.attr({
      polygon: { fill: '#FFA533', 'stroke-width': 1, stroke: 'black' },
      text: {
        text: 'ELSE'
      }
    });

    const firstwhile = new joint.shapes.basic.Circle({
      position: { x: 275, y: 105 },
      size: { width: 272, height: 50 },
      attrs: { circle: { fill: '#33FF51' }, text: { text: 'WHILE', fill: 'white' } }
    });

    const firstfor = new joint.shapes.basic.Circle({
      position: { x: 295, y: 210 },
      size: { width: 232, height: 50 },
      attrs: { circle: { fill: '#33B0FF' }, text: { text: 'FOR', fill: 'white' } }
    });

    const ifinfor =  new joint.shapes.basic.trapez({
      position: { x: 318, y: 315 },
      size: { width: 93, height: 50 },
// attrs: { 'polygon': { transform: 'rotate(180)'}}
    });
    ifinfor.attr({

      polygon: { fill: '#ffe665', 'stroke-width': 1, stroke: 'black' },
      text: {
        text: 'IF',
        color: 'black'
      }
    });

    const elseinfor =  new joint.shapes.basic.trapezR({
      position: { x: 411, y: 315 },
      size: { width: 93, height: 50 },
    });
    elseinfor.attr({
      polygon: { fill: '#FFA533', 'stroke-width': 1, stroke: 'black' },
      text: {
        text: 'ELSE'
      }
    });

    const secondwhile = new joint.shapes.basic.Circle({
      position: { x: 547, y: 105 },
      size: { width: 356, height: 50 },
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
      source: { id: rect.id } ,
      target: { id: firstif.id, port: 'in' } ,
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
