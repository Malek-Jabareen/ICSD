import { Component, OnInit, Input  } from '@angular/core';
import * as jQuery from 'jquery';
import { Ast } from '../Ast';
import * as _ from 'lodash';
import * as $$ from 'backbone';
import {getExpressionScope} from '@angular/compiler-cli';
import {V} from 'jointjs';
import {build$} from 'protractor/built/element';
const joint = require('../../../node_modules/jointjs/dist/joint.js');
declare var $: any;
let dialogNumber=1;
var cellDialog= [];

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})


export class DiagramComponent implements OnInit {
   public fieldA: Array<any> = [];
   newAttribute: any = {};
  title = 'ICSD';


  @Input() functionText = '';

  constructor () {
  }



ngOnInit() {

  function closeDialogEvent(cellv) {
    cellv.model.attr('text/text','');

    if (cellv.model.attr('text/type') == 'ELSE') {
      cellv.model.attr('polygon/fill','#FFA533');
    } else if ( cellv.model.attr('text/type') == 'IF') {
      cellv.model.attr('polygon/fill','#ffe665');
    } else if ( cellv.model.attr('text/type') == 'CASE') {
      cellv.model.attr('polygon/fill','#792fff');

    } else if ( cellv.model.attr('text/type') == 'SWITCH') {
      cellv.model.attr('polygon/fill','#FF3333');

    } else if ( cellv.model.attr('text/type') == 'FOR') {
      cellv.model.attr('circle/fill','#33B0FF');
    } else if ( cellv.model.attr('text/type') == 'WHILE') {
      cellv.model.attr('circle/fill','#33FF51');
    }
  }


  $( function() {
    $.noConflict();
    $("#dialog1").dialog({
      close: function() {
        closeDialogEvent($("#dialog1").data('p1'));
      },
      autoOpen: false,
      height: 500,
      width: 500});
    $("#dialog2").dialog({
      close: function() {
        closeDialogEvent($("#dialog2").data('p1'));
      },
      position: { my: "left top", at: "left bottom" },
      autoOpen: false,
      height: 500,
      width: 500});
    $("#dialog3").dialog({
      close: function() {
        closeDialogEvent($("#dialog3").data('p1'));
      },
      position: { my: "right top", at: "right bottom" },
      autoOpen: false,
      height: 500,
      width: 500});
    $("#dialog4").dialog({
      close: function() {
        closeDialogEvent($("#dialog4").data('p1'));
      },
      autoOpen: false,
      height: 500,
      width: 500});
  } );



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

        const x0 = sourcePosition.x + sourceSize.width / 2;
        const y0 = sourcePosition.y + sourceSize.height / 2;
        const x = targetPosition.x + targetSize.width / 2;
        const a = sourceSize.width / 2 ;
        const b = sourceSize.height / 2 ;
        let q = sourcePosition.y + sourceSize.height;
        if ( this._sourceModel.attr('text/type') === ('WHILE' ) ) {
          q = Math.sqrt( 1 - (Math.pow( ( x - x0 ) , 2 ) ) / Math.pow( a , 2 )) * b + y0;
        }
        if ( this._sourceModel.attr('text/type') === ('FOR' ) ) {
          q = Math.sqrt( 1 - (Math.pow( ( x - x0 ) , 2 ) ) / Math.pow( a , 2 )) * b + y0;
        }
        if ( this._sourceModel.attr('text/type') === ('ELSE' ) ) {
          if ( x < sourcePosition.x + 0.1 * sourceSize.width ) {
            const  m = (sourcePosition.y - (sourcePosition.y + sourceSize.height))
              / (sourcePosition.x - (sourcePosition.x + 0.1 * sourceSize.width) ) ;
            q = m * ((targetPosition.x + targetSize.width / 2 ) - sourcePosition.x ) + sourcePosition.y ;
          }
          if ( x > sourcePosition.x + 0.9 * sourceSize.width ) {
            const m1 = (sourcePosition.y - (sourcePosition.y + sourceSize.height))
              / ((sourcePosition.x + sourceSize.width ) - (sourcePosition.x + 0.9 * sourceSize.width) ) ;
            q = m1 * ((targetPosition.x + targetSize.width / 2 ) - (sourcePosition.x + sourceSize.width ) ) + sourcePosition.y ;
          }
        }
        if ( this._sourceModel.attr('text/type') === ('SWITCH' ) ) {
          if ( x < sourcePosition.x + 0.25 * sourceSize.width ) {
            const  m = ((sourcePosition.y + sourceSize.height / 2 ) - (sourcePosition.y + sourceSize.height))
              / (sourcePosition.x - (sourcePosition.x + 0.25 * sourceSize.width) ) ;
            q = m * ((targetPosition.x + targetSize.width / 2 ) - sourcePosition.x ) + (sourcePosition.y + sourceSize.height / 2 );
          }
          if ( x > sourcePosition.x + 0.75 * sourceSize.width ) {
            const  m = ((sourcePosition.y + sourceSize.height / 2 ) - (sourcePosition.y + sourceSize.height))
              / ((sourcePosition.x + sourceSize.width ) - (sourcePosition.x + 0.75 * sourceSize.width) ) ;
            q = m * ((targetPosition.x + targetSize.width / 2 ) - (sourcePosition.x + sourceSize.width ) )
              + (sourcePosition.y + sourceSize.height / 2 );
          }
        }
        sourcePosition = {
          x: targetPosition.x + targetSize.width / 2,
          y: q
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
        'stroke': 'black',
        'stroke-width': 0.3
      });
    }
  });
    const graph = new joint.dia.Graph;
    const graph2 = new joint.dia.Graph;
    /*const paper = new joint.dia.Paper({
      el: jQuery('#diagram'),
      gridSize: 10,
      width: 920,
      height: 1000,
      model: graph,
      linkView: joint.dia.LightLinkView,
      interactive: function(cellView, method) {
        return !(cellView instanceof joint.dia.ElementView );
    });

  paper.setInteractivity({elementMove: false});
  const paper2 = new joint.dia.Paper({
      el: jQuery('#header'),
      width: 920,
      height: 120,
      model: graph2,
      gridSize: 1,
      interactive: false
    });*/

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
      position: { x: 20, y: 1 },
      size: { width: 110, height: 50 },
// attrs: { 'polygon': { transform: 'rotate(180)'}}
    });
    trp.attr({

      polygon: { fill: '#ffe665', 'stroke-width': 1, stroke: 'black' },
      text: {
        text: 'IF',
        color: 'black'
      }
    });

    const trp2 =  new joint.shapes.basic.trapezR({
      position: { x: 170, y: 1 },
      size: { width: 110 , height: 50 },
    });
  trp2.attr({
    polygon: { fill: '#FFA533', 'stroke-width': 1, stroke: 'black' },
    text: {
      text: 'ELSE'
    }
  });
    const s = new joint.shapes.basic.Circle({
      position: { x: 320, y: 1 },
      size: { width: 110, height: 50 },
      attrs: { circle: { fill: '#33B0FF' }, text: { text: 'FOR', fill: 'white' } }
    });


    const s2 = new joint.shapes.basic.Circle({
      position: { x: 470, y: 1 },
      size: { width: 110, height: 50 },
      attrs: { circle: { fill: '#33FF51' }, text: { text: 'WHILE', fill: 'white' } }
    });



    const si =  new joint.shapes.basic.six({
      position: { x: 620, y: 1 },
      size: { width: 110, height: 50 },
    });
    si.attr({

      polygon: { fill: '#FF3333', 'stroke-width': 1, stroke: 'black' },
      text: {
        text: 'SWITCH'
      }
    });

    const trp3 =  new joint.shapes.basic.trapez({
      position: { x: 770, y: 1 },
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

  build(Qer: Ast , num: number , graph: joint.dia.Graph , rect: joint.shapes.basic.Generic , c: number ) {
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
    let qq: Ast;
    qq = Qer;
    let ww = 0;
    for (let i = 0 ; i < qq.ref.length; i++) {
      ww = ww + parseInt(qq.ref[i].info, 10 );
    }
    for (let i = 0 ; i < qq.ref.length; i++) {
      if ( /* contains */qq.ref[i].text.toLowerCase().indexOf('for') !== -1) {
        const s = new joint.shapes.basic.Circle({
          position: { x: c, y: num * 55 + 50 * num },
          size: { width: ( parseInt(qq.ref[i].info, 10 ) / ww ) * rect.size().width , height: 50 },
          attrs: { circle: { fill: '#33B0FF' }, text: { text: '', type: 'FOR', fill: 'white' , textF: qq.ref[i].textq} }
        });
        const link = new joint.dia.Link({
          source: { id: rect.id },
          target: { id: s.id },
        });
        graph.addCells([s, link ]);
        if ( qq.ref[i].ref !== null ) {
          this.build(qq.ref[i], num + 1, graph, s, c);
        }
        c = c + ( parseInt(qq.ref[i].info, 10 ) / ww ) * rect.size().width;
      } else {
        if ( /* contains */qq.ref[i].text.toLowerCase().indexOf('while') !== -1) {
          const s = new joint.shapes.basic.Circle({
            position: { x: c, y: num * 55 + 50 * num },
            size: { width: ( parseInt(qq.ref[i].info, 10 ) / ww ) * rect.size().width , height: 50 },
            attrs: { circle: { fill: '#33FF51' }, text: { text: 'WHILE', fill: 'white' , textF: qq.ref[i].textq } }
          });
          const link = new joint.dia.Link({
            source: { id: rect.id },
            target: { id: s.id },
          });
          graph.addCells([s, link ]);
          if ( qq.ref[i].ref !== null ) {
            this.build(qq.ref[i], num + 1, graph, s, c);
          }
          c = c + ( parseInt(qq.ref[i].info, 10 ) / ww ) * rect.size().width;
        } else {
          if ( /* contains */qq.ref[i].text.toLowerCase().indexOf('if') !== -1) {
            const s =  new joint.shapes.basic.trapez({
              position: { x: c, y: num * 55 + 50 * num },
              size: { width: ( parseInt(qq.ref[i].info, 10 ) / ww ) * rect.size().width , height: 50 },
            });
            s.attr({

              polygon: { fill: '#ffe665', 'stroke-width': 1, stroke: 'black' },
              text: {
                // if
                type: 'IF',
                text: '',
                color: 'black' , textF: qq.ref[i].textq
              }
            });
            const link = new joint.dia.Link({
              source: { id: rect.id },
              target: { id: s.id }
            });
            graph.addCells([s, link ]);
            if ( qq.ref[i].ref !== null ) {
              this.build(qq.ref[i], num + 1, graph, s, c);
            }
            c = c + ( parseInt(qq.ref[i].info, 10 ) / ww ) * rect.size().width;
          } else {
            if ( /* contains */qq.ref[i].text.toLowerCase().indexOf('else') !== -1) {
              const s =  new joint.shapes.basic.trapezR({
                position: { x: c, y: num * 55 + 50 * num },
                size: { width: ( parseInt(qq.ref[i].info, 10 ) / ww ) * rect.size().width , height: 50 },
              });
              s.attr({
                polygon: { fill: '#FFA533', 'stroke-width': 1, stroke: 'black' },
                text: {
                  // else
                  type: 'ELSE',
                  text: '', textF: qq.ref[i].textq
                }
              });
              const link = new joint.dia.Link({
                source: { id: rect.id },
                target: { id: s.id }
              });
              graph.addCells([s, link ]);
              if ( qq.ref[i].ref !== null ) {
                this.build(qq.ref[i], num + 1, graph, s, c);
              }
              c = c + ( parseInt(qq.ref[i].info, 10 ) / ww ) * rect.size().width;
            } else {
              if ( /* contains */qq.ref[i].text.toLowerCase().indexOf('switch') !== -1) {
                const s =  new joint.shapes.basic.six({
                  position: { x: c, y: num * 55 + 50 * num },
                  size: { width: ( parseInt(qq.ref[i].info, 10 ) / ww ) * rect.size().width , height: 50 },
                });
                s.attr({

                  polygon: { fill: '#FF3333', 'stroke-width': 1, stroke: 'black' },
                  text: {
                    // switch
                    type: 'SWITCH',
                    text: '' , textF: qq.ref[i].textq
                  }
                });
                const link = new joint.dia.Link({
                  source: { id: rect.id },
                  target: { id: s.id }
                });
                graph.addCells([s, link ]);
                if ( qq.ref[i].ref !== null ) {
                  this.build(qq.ref[i], num + 1, graph, s, c);
                }
                c = c + ( parseInt(qq.ref[i].info, 10 ) / ww ) * rect.size().width;
              } else {
                if (/* contains */qq.ref[i].text.toLowerCase().indexOf('case') !== -1) {
                  const s = new joint.shapes.basic.trapez({
                    position: {x: c, y: num * 55 + 50 * num},
                    size: {width: (parseInt(qq.ref[i].info, 10) / ww) * rect.size().width, height: 50},
                  });
                  s.attr({

                    polygon: {fill: '#792fff', 'stroke-width': 1, stroke: 'black'},
                    text: {
                      // case
                      type: 'CASE',
                      text: '' , textF: qq.ref[i].textq
                    }
                  });
                  const link = new joint.dia.Link({
                    source: {id: rect.id},
                    target: {id: s.id}
                  });
                  graph.addCells([s, link]);
                  if (qq.ref[i].ref !== null) {
                    this.build(qq.ref[i], num + 1, graph, s, c);
                  }
                  c = c + (parseInt(qq.ref[i].info, 10) / ww) * rect.size().width;
                } else {
                  c = c + (parseInt(qq.ref[i].info, 10) / ww) * rect.size().width;
                }
              }
            }
          }
        }
      }
    }
  }
  alirt() {
    const strx  = 'ast[] x; if(this.ref!=null){ x=new ast[this.ref.length+1]; }' +
      ' else{x=new ast[1];}int i=0; if(this.ref!=null){for (i = 0; i < this.ref.length;' +
      ' i++){x[i]=this.ref[i];}}x[i]=new ast();x[i].info=function.info;x[i].text=function.text;x[i].textq=function.textq;' +
      'if(function.ref!=null){x[i].ref=new ast[function.ref.length];for (int j = 0; j < function.ref.length; j++)' +
      '{x[i].ref[j]=function.ref[j];}}this.ref=x;return this;';
    const ssss = 'if(x=2){x++;y++;if(z){y--;q+0;}else{w++;w++;w=w+8;q--;}s+=8;z--;}while(true){' +
      '  x++;for(dd){  w+2;if(wer){q--;m+2;}else{q+1; w++;} l--;}r++;}while(f)' +
      '{q++;w++;e++;r++;t++;y++;a++;s++;d++;f++;g++;v++;c++;x++;z++;k++;}';
    const alonAdoni = '\t\tString[] wordsTemp1 = s1.split(" ");\n' +
      '\t\tString[] wordsTemp2 = s2.split(" ");\n' +
      '\t\tString[] words1 = new String[wordsTemp1.length];\n' +
      '\t\tString[] words2 = new String[wordsTemp2.length];\n' +
      '\t\t\n' +
      '\t\tint wcounter1=0;\n' +
      '\t\tint wcounter2=0;\n' +
      '\t\tfor (int ) {\n' +
      '\t\t\tif (!wordsTemp1.equals("")) {\n' +
      '\t\t\t\twords1[x] = wordsTemp1[x];\n' +
      '\t\t\t\twcounter1++;\n' +
      'for (int ) {\n' +
      '\t\t\tif (!wordsTemp1.equals("")) {\n' +
      '\t\t\t\twords1[x] = wordsTemp1[x];\n' +
      '\t\t\t\twcounter1++;\n' +
      '\t\t\t}\n' +
      '\t\t}\n' +
      'for (int ) {\n' +
      '\t\t\tif (!wordsTemp1.equals("")) {\n' +
      '\t\t\t\twords1[x] = wordsTemp1[x];\n' +
      '\t\t\t\twcounter1++;\n' +
      '\t\t\t}\n' +
      '\t\t}\n' +
      'for (int ) {\n' +
      'for (int ) {\n' +
      '\t\t\tif (!wordsTemp1.equals("")) {\n' +
      '\t\t\t\twords1[x] = wordsTemp1[x];\n' +
      '\t\t\t\twcounter1++;\n' +
      '\t\t\t}\n' +
      '\t\t}\n' +
      '\t\t\tif (!wordsTemp1.equals("")) {\n' +
      '\t\t\t\twords1[x] = wordsTemp1[x];\n' +
      '\t\t\t\twcounter1++;\n' +
      '\t\t\t}\n' +
      '\t\t}\n' +
      '\t\t\t}\n' +
      '\t\t}\n' +
      '\t\tfor (int ) {\n' +
      'String[] wordsTemp1 = s1.split(" ");\n' +
      '\t\tString[] wordsTemp2 = s2.split(" ");\n' +
      '\t\tString[] words1 = new String[wordsTemp1.length];\n' +
      '\t\t\tif (!wordsTemp2.equals("")) {\n' +
      '\t\t\t\twords2[x] = wordsTemp2[x];\n' +
      '\t\t\t\twcounter2++;\n' +
      'for (int ) {\n' +
      'String[] wordsTemp1 = s1.split(" ");\n' +
      '\t\tString[] wordsTemp2 = s2.split(" ");\n' +
      '\t\tString[] words1 = new String[wordsTemp1.length];\n' +
      '\t\t\tif (!wordsTemp2.equals("")) {\n' +
      '\t\t\t\twords2[x] = wordsTemp2[x];\n' +
      '\t\t\t\twcounter2++;\n' +
      '\t\t\t}\n' +
      '\t\t}for (int ) {\n' +
      'String[] wordsTemp1 = s1.split(" ");\n' +
      '\t\tString[] wordsTemp2 = s2.split(" ");\n' +
      '\t\tString[] words1 = new String[wordsTemp1.length];\n' +
      '\t\t\tif (!wordsTemp2.equals("")) {\n' +
      '\t\t\t\twords2[x] = wordsTemp2[x];\n' +
      '\t\t\t\twcounter2++;\n' +
      '\t\t\t}\n' +
      'if (!wordsTemp2.equals("")) {\n' +
      '\t\t\t\twords2[x] = wordsTemp2[x];\n' +
      '\t\t\t\twcounter2++;\n' +
      '\t\t\t}\n' +
      'if (!wordsTemp2.equals("")) {\n' +
      '\t\t\t\twords2[x] = wordsTemp2[x];\n' +
      '\t\t\t\twcounter2++;\n' +
      '\t\t\t}\n' +
      '\t\t}\n' +
      '\t\t\t}\n' +
      '\t\t}\n' +
      '\t\t\n' +
      '\t\tString newString = "";\n' +
      '\t\t\n' +
      '\t\tfor (int ) {\n' +
      '\t\t\tfor (int y) {\n' +
      '\t\t\t\tif (words1[x].equals(words2[y])) {\n' +
      '\t\t\t\t\tnewString=newString + " " + words1[x];\n' +
      '\t\t\t\t}\n' +
      'if (!wordsTemp2.equals("")) {\n' +
      '\t\t\t\twords2[x] = wordsTemp2[x];\n' +
      '\t\t\t\twcounter2++;\n' +
      '\t\t\t}\n' +
      'if (!wordsTemp2.equals("")) {\n' +
      '\t\t\t\twords2[x] = wordsTemp2[x];\n' +
      '\t\t\t\twcounter2++;\n' +
      '\t\t\t}\n' +
      '\t\t\t}\n' +
      'for (int ) {\n' +
      '\t\t\tfor (int ) {\n' +
      '\t\t\t\tif (words1[x].equals(words2[y])) {\n' +
      '\t\t\t\t\tnewString=newString + " " + words1[x];\n' +
      '\t\t\t\t}\n' +
      'if (!wordsTemp2.equals("")) {\n' +
      '\t\t\t\twords2[x] = wordsTemp2[x];\n' +
      '\t\t\t\twcounter2++;\n' +
      '\t\t\t}\n' +
      'if (!wordsTemp2.equals("")) {\n' +
      '\t\t\t\twords2[x] = wordsTemp2[x];\n' +
      '\t\t\t\twcounter2++;\n' +
      '\t\t\t}\n' +
      '\t\t\t}\n' +
      '\t\t}\n' +
      '\t\t}\n' +
      '\t\t\n' +
      '\t\tSystem.out.println(newString.trim());\n' +
      '\t\t\n' +
      '\tSystem.out.println(newString.trim());\n' +
      'System.out.println(newString.trim());\n' +
      'System.out.println(newString.trim());';
    const graph = new joint.dia.Graph;
    const paper = new joint.dia.Paper({
      el: jQuery('#diagramXXX'),
      gridSize: 10,
      width: 920,
      model: graph,
      linkView: joint.dia.LightLinkView,
      /*interactive: function(cellView, method) {
        return !(cellView instanceof joint.dia.ElementView );*/
    });
    paper.setInteractivity({elementMove: false});
    if (this.functionText !== '') {
     let funcName = '';
      let funcName2 = '';
      let funcName3 = '';
     funcName = this.functionText.substring( 0 , this.functionText.indexOf('('));
     const a = funcName.split(' ');
     funcName = a[a.length - 1 ];
      let qq: Ast;
      qq = null;
      funcName3 = this.functionText.substring(this.functionText.indexOf('{') + 1, this.functionText.lastIndexOf('}'));
      funcName2 = /* replaceAll */funcName3.replace(new RegExp('(for)([^;:])*(;)([^;])*(;)([^\\)])*\\)', 'g'), ' for() ');
      qq = Ast.build(funcName2);
      const rect = new joint.shapes.basic.Rect({
        position: {x: 3, y: 3},
        size: {width: 900, height: 50},
        attrs: {rect: {fill: 'orange'}, text: {text: funcName, fill: 'white' , textF: funcName3}}
      });
      graph.addCells([rect]);
      this.build(qq, 1, graph, rect, 3);
      let fieldArray: Array<String>;
      fieldArray = [ ];
      this.fieldA = fieldArray;


      paper.on('cell:pointerdown',
        function(cellView, evt, x, y) {
          if (cellDialog[dialogNumber-1] != undefined) {
            $("#dialog" + dialogNumber).dialog("close");
          }
          $("#dialog" + dialogNumber).data('p1', cellView).dialog("open");
          var text = cellView.model.attr('text/textF');
var text2 = text.replace(/\n/g,"<br>");
          var text3 = text2.replace(/\t/g,"&nbsp;");
          document.getElementById("dialogText" + dialogNumber).innerHTML=text3;
          fieldArray.push(cellView.model.attr('text/textF'));

          cellDialog.splice(dialogNumber, 0, cellView);

          if (cellView.model.attr('text/type') == 'ELSE') {
            cellView.model.attr('polygon/fill','#EA780D');
          } else if ( cellView.model.attr('text/type') == 'IF') {
            cellView.model.attr('polygon/fill','#ffd700');
        } else if ( cellView.model.attr('text/type') == 'CASE') {
        cellView.model.attr('polygon/fill','#6C0E9E');

        } else if ( cellView.model.attr('text/type') == 'SWITCH') {
        cellView.model.attr('polygon/fill','#AD1F12');

        } else if ( cellView.model.attr('text/type') == 'FOR') {
        cellView.model.attr('circle/fill','#247ED6');
          } else if ( cellView.model.attr('text/type') == 'WHILE') {
            cellView.model.attr('circle/fill','#68D624');
          }

        cellView.model.attr('text/text','•');
        cellView.model.attr('text/fill','red');
          dialogNumber++;
          if (dialogNumber == 5) {
            dialogNumber = 1;

          }
        }
      );
    }
  }
  killY() {
    for (let i = 0 ; i < this.fieldA.length ; i++) {
      alert(this.fieldA[i]);
    }
  }
}
