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
      position: { x: 60, y: 0 },
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

    graph.addCells([rect, rect2, link, sq, link2, link3, sq2, rect3, rect4, link4, link5, link6]);
  }
}
