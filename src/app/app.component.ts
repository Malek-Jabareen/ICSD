import { Component, OnInit  } from '@angular/core';
import * as jQuery from 'jquery';
import * as _ from 'lodash';
import * as $ from 'backbone';
const joint = require('../../node_modules/jointjs/dist/joint.js');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ICSD';

  ngOnInit() {
    let graph = new joint.dia.Graph;

    let paper = new joint.dia.Paper({
      el: jQuery("#diagram"),
      width: 1000,
      height: 1000,
      model: graph,
      gridSize: 1
    });

    let rect = new joint.shapes.basic.Rect({
      position: { x: 0, y: 0 },
      size: { width: 100, height: 50 },
      attrs: { rect: { fill: 'blue' }, text: { text: 'Rect', fill: 'white' } }
    });

    let rect2 = new joint.shapes.basic.Rect({
      position: { x: 120, y: 0 },
      size: { width: 100, height: 50 },
      attrs: { rect: { fill: 'red' }, text: { text: 'Rect', fill: 'white' } }
    });

    let sq = new joint.shapes.basic.Circle({
      position: { x: 240, y: 0 },
      size: { width: 100, height: 50 },
      attrs: { circle: { fill: 'yellow' }, text: { text: 'Rect', fill: 'black' } }
    });



    var link = new joint.dia.Link({
      source: { id: rect.id },
      target: { id: rect2.id }
    });
    var link2 = new joint.dia.Link({
      source: { id: rect2.id },
      target: { id: sq.id }
    });

    graph.addCells([rect, rect2, sq, link, link2]);
  }
}
