import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import * as jQuery from 'jquery';
import { Ast } from '../Ast';
import * as _ from 'lodash';
import * as $$ from 'backbone';
import {getExpressionScope} from '@angular/compiler-cli';
import {V} from 'jointjs';
import {build$} from 'protractor/built/element';
const joint = require('../../../node_modules/jointjs/dist/joint.js');
declare var $: any;
let dialogNumber = 1;
let maxR = 1;
const cellDialog = [];
let paper;
let sizeH = 12000;
let graphScale = 1;
let matches = [];
let ctrlArrayCounter = 0 ;
let ctrlArrayCounter2 = 0 ;
const ctrlCodeArray = [[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,],[,]];
let fieldArray: Array<String>;
let firstTimeShape = true;
let ctrlListening = false;
let self = null;
let diagramheight=0;

@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})


export class DiagramComponent implements OnInit {
  @Output() funcTextEvent = new EventEmitter<string>();
  show = false;
  onchange(value: string) {
    this.funcTextEvent.emit(value);
    /* alert('hello'); */
  }


  public fieldA: Array<any> = [];
  public number: number = 1;
  newAttribute: any = {};
  title = 'ICSD';
  public autoWin: boolean = true;
  public dialogOpacity: boolean = false;
  public ignoreP: boolean = false;
  public ignoreI: boolean = false;
  public ignoreN: boolean = true;
  public ignoreCbra: boolean = true;

  @Input() functionText = '';

  constructor() {
    self = this;
  }


  ngOnInit() {
    /* $(document).keydown(function(event) {
       if (event.which == "17") {
         cntrlIsPressed = true;
         alert('ctrl on');
       }
     }); */

    $(document).keyup(function (event) {
      if (event.which == "17" && ctrlListening == true) {
        self.CtrlUnpress();
        ctrlListening = false;
      }
    });

    const functionTextConvert = 'private Dimension getSize(Container parent, LayoutSize layoutSize, boolean fillRawSizes,\n' +
      '    \t\t\t\t\t  Dimension gridSize, List<List<ExtendedGridLayoutConstraints>> gridRows,\n' +
      '    \t\t\t\t\t  Set<ExtendedGridLayoutConstraints> colspans,\n' +
      '    \t\t\t\t\t  Set<ExtendedGridLayoutConstraints> rowspans,\n' +
      '    \t\t\t\t\t  int[][] resultArrays)\n' +
      '    \t\t{\n' +
      '    \t\t\tif (fillRawSizes && (resultArrays.length < 6))\n' +
      '    \t\t\t{\n' +
      '    \t\t\t\tthrow new IllegalArgumentException("If fillRawSizes is true, resultArrays.length must be >= 6 (" + resultArrays.length + \')\');\n' +
      '   \t\t\t}\n' +
      '   \t\t\tint[] minimumColWidths = new int[gridSize.width];\n' +
      '   \t\t\tint[] minimumRowHeights = new int[gridSize.height];\n' +
      '   \t\t\tint[] preferredColWidths = new int[gridSize.width];\n' +
      '   \t\t\tint[] preferredRowHeights = new int[gridSize.height];\n' +
      '   \t\t\tint[] maximumColWidths = new int[gridSize.width];\n' +
      '   \t\t\tint[] maximumRowHeights = new int[gridSize.height];\n' +
      '   \t\t\tArrays.fill(minimumColWidths,0);\n' +
      '   \t\t\tArrays.fill(minimumRowHeights,0);\n' +
      '   \t\t\tArrays.fill(preferredColWidths,0);\n' +
      '   \t\t\tArrays.fill(preferredRowHeights,0);\n' +
      '   \t\t\tArrays.fill(maximumColWidths,0);\n' +
      '   \t\t\tArrays.fill(maximumRowHeights,0);\n' +
      '   \t\n' +
      '   \t\t\t// get the maximum of the minimum sizes,\n' +
      '   \t\t\t//     the maximum of the preferred sizes and\n' +
      '   \t\t\t//     the minimum of the maximum sizes\n' +
      '   \t\t\t// of all rows and columns, not taking\n' +
      '   \t\t\t// rowspans and colspans into account\n' +
      '   \t\t\tfor (int row=0 ; row<gridSize.height ; row++)\n' +
      '   \t\t\t{\n' +
      '   \t\t\t\tList<ExtendedGridLayoutConstraints> gridRow = gridRows.get(row);\n' +
      '   \t\t\t\tfor (int col=0 ; col<gridSize.width ; col++)\n' +
      '   \t\t\t\t{\n' +
      '  \t\t\t\t\tExtendedGridLayoutConstraints cell = gridRow.get(col);\n' +
      '   \t\t\t\t\tif ((null != cell) && (null != cell.getComponent()))\n' +
      '   \t\t\t\t\t{\n' +
      '   \t\t\t\t\t\tComponent component = cell.getComponent();\n' +
      '   \t\t\t\t\t\tDimension minimumSize = component.getMinimumSize();\n' +
      '   \t\t\t\t\t\tDimension preferredSize = component.getPreferredSize();\n' +
      '   \t\t\t\t\t\tDimension maximumSize = component.getMaximumSize();\n' +
      '   \t\t\t\t\t\tif (!colspans.contains(cell))\n' +
      '   \t\t\t\t\t\t{\n' +
      '   \t\t\t\t\t\t\tminimumColWidths[col] = Math.max(minimumColWidths[col],minimumSize.width);\n' +
      '   \t\t\t\t\t\t\tpreferredColWidths[col] = Math.max(preferredColWidths[col],preferredSize.width);\n' +
      '   \t\t\t\t\t\t\tmaximumColWidths[col] = Math.max(maximumColWidths[col],maximumSize.width);\n' +
      '   \t\t\t\t\t\t}\n' +
      '   \t\t\t\t\t\tif (!rowspans.contains(cell))\n' +
      '   \t\t\t\t\t\t{\n' +
      '   \t\t\t\t\t\t\tminimumRowHeights[row] = Math.max(minimumRowHeights[row],minimumSize.height);\n' +
      '   \t\t\t\t\t\t\tpreferredRowHeights[row] = Math.max(preferredRowHeights[row],preferredSize.height);\n' +
      '   \t\t\t\t\t\t\tmaximumRowHeights[row] = Math.max(maximumRowHeights[row],maximumSize.height);\n' +
      '   \t\t\t\t\t\t}\n' +
      '   \t\t\t\t\t}\n' +
      '   \t\t\t\t}\n' +
      '   \t\t\t}\n' +
      '   \t\n' +
      '   \t\t\t// correct cases where\n' +
      '   \t\t\t// minimumColWidths[col] <= preferredColWidths[col] <= maximumColWidths[col]\n' +
      '   \t\t\t// is not true by clipping to the minimumColWidths and maximumColWidths\n' +
      '   \t\t\tfor (int col=0 ; col<gridSize.width ; col++)\n' +
      '   \t\t\t{\n' +
      '   \t\t\t\tif (minimumColWidths[col] >= maximumColWidths[col])\n' +
      '   \t\t\t\t{\n' +
      '   \t\t\t\t\tmaximumColWidths[col] = minimumColWidths[col];\n' +
      '   \t\t\t\t\tpreferredColWidths[col] = minimumColWidths[col];\n' +
      '   \t\t\t\t}\n' +
      '   \t\t\t\telse if (preferredColWidths[col] < minimumColWidths[col])\n' +
      '   \t\t\t\t{\n' +
      '   \t\t\t\t\tpreferredColWidths[col] = minimumColWidths[col];\n' +
      '  \t\t\t\t}\n' +
      '   \t\t\t\telse if (preferredColWidths[col] > maximumColWidths[col])\n' +
      '   \t\t\t\t{\n' +
      '   \t\t\t\t\tpreferredColWidths[col] = maximumColWidths[col];\n' +
      '   \t\t\t\t}\n' +
      '   \t\t\t}\n' +
      '   \t\n' +
      '   \t\t\t// plug in the colspans and correct the minimum, preferred and\n' +
      '   \t\t\t// maximum column widths the colspans are part of\n' +
      '   \t\t\tfor (ExtendedGridLayoutConstraints cell : colspans)\n' +
      '   \t\t\t{\n' +
      '   \t\t\t\tint fromCol = cell.getCol();\n' +
      '   \t\t\t\tint colspan = cell.getEffectiveColspan();\n' +
      '   \t\t\t\tint toCol = fromCol + colspan;\n' +
      '   \t\t\t\tint currentMinimumColWidth = 0;\n' +
      '   \t\t\t\tint currentPreferredColWidth = 0;\n' +
      '   \t\t\t\tint currentMaximumColWidth = 0;\n' +
      '   \t\t\t\tfor (int col=fromCol ; col<toCol ; col++)\n' +
      '   \t\t\t\t{\n' +
      '   \t\t\t\t\tint minimumColWidth = minimumColWidths[col];\n' +
      '   \t\t\t\t\tif ((Integer.MAX_VALUE-minimumColWidth) < currentMinimumColWidth)\n' +
      '   \t\t\t\t\t{\n' +
      '   \t\t\t\t\t\tcurrentMinimumColWidth = Integer.MAX_VALUE;\n' +
      '   \t\t\t\t\t}\n' +
      '   \t\t\t\t\telse\n' +
      '   \t\t\t\t\t{\n' +
      '   \t\t\t\t\t\tcurrentMinimumColWidth += minimumColWidth;\n' +
      '   \t\t\t\t\t}\n' +
      '   \t\t\t\t\tint preferredColWidth = preferredColWidths[col];\n' +
      '   \t\t\t\t\tif ((Integer.MAX_VALUE-preferredColWidth) < currentPreferredColWidth)\n' +
      '  \t\t\t\t\t{\n' +
      '  \t\t\t\t\t\tcurrentPreferredColWidth = Integer.MAX_VALUE;\n' +
      '  \t\t\t\t\t}\n' +
      '  \t\t\t\t\telse\n' +
      '  \t\t\t\t\t{\n' +
      '  \t\t\t\t\t\tcurrentPreferredColWidth += preferredColWidth;\n' +
      '  \t\t\t\t\t}\n' +
      '  \t\t\t\t\tint maximumColWidth = maximumColWidths[col];\n' +
      '  \t\t\t\t\tif ((Integer.MAX_VALUE-maximumColWidth) < currentMaximumColWidth)\n' +
      '  \t\t\t\t\t{\n' +
      '  \t\t\t\t\t\tcurrentMaximumColWidth = Integer.MAX_VALUE;\n' +
      '  \t\t\t\t\t}\n' +
      '  \t\t\t\t\telse\n' +
      '  \t\t\t\t\t{\n' +
      '  \t\t\t\t\t\tcurrentMaximumColWidth += maximumColWidth;\n' +
      '  \t\t\t\t\t}\n' +
      '  \t\t\t\t}\n' +
      '  \t\t\t\tComponent component = cell.getComponent();\n' +
      '  \t\t\t\tint wantedMaximumColWidth = component.getMaximumSize().width - ((colspan - 1) * hgap);\n' +
      '  \t\t\t\tif (currentMaximumColWidth < wantedMaximumColWidth)\n' +
      '  \t\t\t\t{\n' +
      '  \t\t\t\t\tredistributeSpace(currentMaximumColWidth,\n' +
      '  \t\t\t\t\t\t\t  wantedMaximumColWidth,\n' +
      '  \t\t\t\t\t\t\t  fromCol,toCol,\n' +
      '  \t\t\t\t\t\t\t  maximumColWidths,\n' +
      '  \t\t\t\t\t\t\t  maximumColWidths,\n' +
      '  \t\t\t\t\t\t\t  maximumColWidths);\n' +
      '  \t\t\t\t}\n' +
      '  \t\t\t\tint wantedMinimumColWidth = component.getMinimumSize().width - ((colspan - 1) * hgap);\n' +
      '  \t\t\t\tif (currentMinimumColWidth < wantedMinimumColWidth)\n' +
      '  \t\t\t\t{\n' +
      '  \t\t\t\t\tredistributeSpace(currentMinimumColWidth,\n' +
      '  \t\t\t\t\t\t\t  wantedMinimumColWidth,\n' +
      '  \t\t\t\t\t\t\t  fromCol,toCol,\n' +
      '  \t\t\t\t\t\t\t  minimumColWidths,\n' +
      '  \t\t\t\t\t\t  minimumColWidths,\n' +
      '  \t\t\t\t\t\t\t  maximumColWidths);\n' +
      '  \t\t\t\t}\n' +
      '  \t\t\t\tint wantedPreferredColWidth = component.getPreferredSize().width - ((colspan - 1) * hgap);\n' +
      '  \t\t\t\tif (currentPreferredColWidth < wantedPreferredColWidth)\n' +
      '  \t\t\t{\n' +
      '  \t\t\t\t\tredistributeSpace(currentPreferredColWidth,\n' +
      '  \t\t\t\t\t\t\t  wantedPreferredColWidth,\n' +
      '  \t\t\t\t\t\t\t  fromCol,toCol,\n' +
      '  \t\t\t\t\t\t\t  preferredColWidths,\n' +
      ' \t\t\t\t\t\t  minimumColWidths,\n' +
      '  \t\t\t\t\t\t\t  maximumColWidths);\n' +
      '  \t\t\t\t}\n' +
      '  \t\t\t}\n' +
      ' \t\n' +
      '  \t\t\t// correct cases where\n' +
      '  \t\t\t// minimumColWidths[col] <= preferredColWidths[col] <= maximumColWidths[col]\n' +
      '  \t\t// is not true by clipping to the minimumColWidths and maximumColWidths\n' +
      '  \t\t\tfor (int col=0 ; col<gridSize.width ; col++)\n' +
      '  \t\t\t{\n' +
      '  \t\t\t\tif (minimumColWidths[col] >= maximumColWidths[col])\n' +
      '  \t\t\t{\n' +
      '  \t\t\t\t\tmaximumColWidths[col] = minimumColWidths[col];\n' +
      '  \t\t\t\t\tpreferredColWidths[col] = minimumColWidths[col];\n' +
      ' \t\t\t\t}\n' +
      '  \t\t\t\telse if (preferredColWidths[col] < minimumColWidths[col])\n' +
      ' \t\t\t\t{\n' +
      '  \t\t\t\t\tpreferredColWidths[col] = minimumColWidths[col];\n' +
      '  \t\t\t\t}\n' +
      '  \t\t\t\telse if (preferredColWidths[col] > maximumColWidths[col])\n' +
      ' \t\t\t\t{\n' +
      '  \t\t\t\t\tpreferredColWidths[col] = maximumColWidths[col];\n' +
      '  \t\t\t\t}\n' +
      '\t\t\t}\n' +
      '  \t\n' +
      '  \t\t\t// correct cases where\n' +
      '  \t\t\t// minimumRowHeights[row] <= preferredRowHeights[row] <= maximumRowHeights[row]\n' +
      '  \t\t\t// is not true by clipping to the minimumRowHeights and maximumRowHeights\n' +
      '  \t\t\tfor (int row=0 ; row<gridSize.height ; row++)\n' +
      '  \t\t\t{\n' +
      '  \t\t\t\tif (minimumRowHeights[row] >= maximumRowHeights[row])\n' +
      '  \t\t\t\t{\n' +
      '  \t\t\t\t\tmaximumRowHeights[row] = minimumRowHeights[row];\n' +
      '  \t\t\t\t\tpreferredRowHeights[row] = minimumRowHeights[row];\n' +
      '  \t\t\t\t}\n' +
      '  \t\t\t\telse if (preferredRowHeights[row] < minimumRowHeights[row])\n' +
      '  \t\t\t\t{\n' +
      '  \t\t\t\t\tpreferredRowHeights[row] = minimumRowHeights[row];\n' +
      '  \t\t\t\t}\n' +
      '  \t\t\t\telse if (preferredRowHeights[row] > maximumRowHeights[row])\n' +
      ' \t\t\t\t{\n' +
      '  \t\t\t\t\tpreferredRowHeights[row] = maximumRowHeights[row];\n' +
      '  \t\t\t\t}\n' +
      '  \t\t\t}\n' +
      '  \t\n' +
      '  \t\t\t// plug in the rowspans and correct the minimum, preferred and\n' +
      '  \t\t\t// maximum row heights the rowspans are part of\n' +
      '  \t\t\tfor (ExtendedGridLayoutConstraints cell : rowspans)\n' +
      '  \t\t\t{\n' +
      '  \t\t\t\tint fromRow = cell.getRow();\n' +
      '  \t\t\t\tint rowspan = cell.getEffectiveRowspan();\n' +
      '  \t\t\t\tint toRow = fromRow + rowspan;\n' +
      '\t\t\t\tint currentMinimumRowHeight = 0;\n' +
      '  \t\t\t\tint currentPreferredRowHeight = 0;\n' +
      '  \t\t\t\tint currentMaximumRowHeight = 0;\n' +
      '  \t\t\t\tfor (int row=fromRow ; row<toRow ; row++)\n' +
      '  \t\t\t\t{\n' +
      '  \t\t\t\t\tint minimumRowHeight = minimumRowHeights[row];\n' +
      '  \t\t\t\t\tif ((Integer.MAX_VALUE-minimumRowHeight) < currentMinimumRowHeight)\n' +
      '  \t\t\t\t\t{\n' +
      '  \t\t\t\t\t\tcurrentMinimumRowHeight = Integer.MAX_VALUE;\n' +
      '  \t\t\t\t\t}\n' +
      '  \t\t\t\t\telse\n' +
      '  \t\t\t\t\t{\n' +
      '  \t\t\t\t\t\tcurrentMinimumRowHeight += minimumRowHeight;\n' +
      '  \t\t\t\t\t}\n' +
      '  \t\t\t\t\tint preferredRowHeight = preferredRowHeights[row];\n' +
      '  \t\t\t\t\tif ((Integer.MAX_VALUE-preferredRowHeight) < currentPreferredRowHeight)\n' +
      '  \t\t\t\t\t{\n' +
      '  \t\t\t\t\t\tcurrentPreferredRowHeight = Integer.MAX_VALUE;\n' +
      '  \t\t\t\t\t}\n' +
      '  \t\t\t\t\telse\n' +
      '  \t\t\t\t\t{\n' +
      '  \t\t\t\t\t\tcurrentPreferredRowHeight += preferredRowHeight;\n' +
      '  \t\t\t\t\t}\n' +
      '  \t\t\t\t\tint maximumRowHeight = maximumRowHeights[row];\n' +
      '  \t\t\t\t\tif ((Integer.MAX_VALUE-maximumRowHeight) < currentMaximumRowHeight)\n' +
      '  \t\t\t\t\t{\n' +
      '  \t\t\t\t\t\tcurrentMaximumRowHeight = Integer.MAX_VALUE;\n' +
      '  \t\t\t\t\t}\n' +
      '  \t\t\t\t\telse\n' +
      '  \t\t\t\t\t{\n' +
      '  \t\t\t\t\t\tcurrentMaximumRowHeight += maximumRowHeight;\n' +
      '  \t\t\t\t\t}\n' +
      '  \t\t\t\t}\n' +
      '  \t\t\t\tComponent component = cell.getComponent();\n' +
      '  \t\t\t\tint wantedMaximumRowHeight = component.getMaximumSize().height - ((rowspan - 1) * vgap);\n' +
      '  \t\t\t\tif (currentMaximumRowHeight < wantedMaximumRowHeight)\n' +
      '  \t\t\t\t{\n' +
      '  \t\t\t\t\tredistributeSpace(currentMaximumRowHeight,\n' +
      '  \t\t\t\t\t\t\t  wantedMaximumRowHeight,\n' +
      '  \t\t\t\t\t\t\t  fromRow,toRow,\n' +
      '  \t\t\t\t\t\t\t  maximumRowHeights,\n' +
      '  \t\t\t\t\t\t\t  maximumRowHeights,\n' +
      '  \t\t\t\t\t\t\t  maximumRowHeights);\n' +
      '  \t\t\t\t}\n' +
      '  \t\t\t\tint wantedMinimumRowHeight = component.getMinimumSize().height - ((rowspan - 1) * vgap);\n' +
      '  \t\t\t\tif (currentMinimumRowHeight < wantedMinimumRowHeight)\n' +
      ' \t\t\t{\n' +
      '  \t\t\t\t\tredistributeSpace(currentMinimumRowHeight,\n' +
      '  \t\t\t\t\t\t\t  wantedMinimumRowHeight,\n' +
      '  \t\t\t\t\t\t\t  fromRow,toRow,\n' +
      '  \t\t\t\t\t\t\t  minimumRowHeights,\n' +
      '  \t\t\t\t\t\t\t  minimumRowHeights,\n' +
      '  \t\t\t\t\t\t\t  maximumRowHeights);\n' +
      '  \t\t\t}\n' +
      '  \t\t\t\tint wantedPreferredRowHeight = component.getPreferredSize().height - ((rowspan - 1) * vgap);\n' +
      '  \t\t\t\tif (currentPreferredRowHeight < wantedPreferredRowHeight)\n' +
      '  \t\t\t\t{\n' +
      '  \t\t\t\t\tredistributeSpace(currentPreferredRowHeight,\n' +
      '  \t\t\t\t\t\t\t  wantedPreferredRowHeight,\n' +
      '  \t\t\t\t\t\t\t  fromRow,toRow,\n' +
      '  \t\t\t\t\t\t\t  preferredRowHeights,\n' +
      '  \t\t\t\t\t\t\t  minimumRowHeights,\n' +
      '  \t\t\t\t\t\t\t  maximumRowHeights);\n' +
      '  \t\t\t\t}\n' +
      '  \t\t\t}\n' +
      '  \t\n' +
      '  \t\t\t// correct cases where\n' +
      '  \t\t\t// minimumRowHeights[row] <= preferredRowHeights[row] <= maximumRowHeights[row]\n' +
      '  \t\t\t// is not true by clipping to the minimumRowHeights and maximumRowHeights\n' +
      '  \t\t\tfor (int row=0 ; row<gridSize.height ; row++)\n' +
      '  \t\t\t{\n' +
      '  \t\t\t\tif (minimumRowHeights[row] >= maximumRowHeights[row])\n' +
      '  \t\t\t\t{\n' +
      '  \t\t\t\t\tmaximumRowHeights[row] = minimumRowHeights[row];\n' +
      '  \t\t\t\t\tpreferredRowHeights[row] = minimumRowHeights[row];\n' +
      '  \t\t\t\t}\n' +
      '  \t\t\t\telse if (preferredRowHeights[row] < minimumRowHeights[row])\n' +
      '  \t\t\t\t{\n' +
      '  \t\t\t\t\tpreferredRowHeights[row] = minimumRowHeights[row];\n' +
      '  \t\t\t\t}\n' +
      '  \t\t\t\telse if (preferredRowHeights[row] > maximumRowHeights[row])\n' +
      '  \t\t\t\t{\n' +
      '  \t\t\t\t\tpreferredRowHeights[row] = maximumRowHeights[row];\n' +
      '  \t\t\t\t}\n' +
      '  \t\t\t}\n' +
      '  \t\n' +
      '  \t\t\t// copies the computed sizes to the result arrays\n' +
      '  \t\t\tif (fillRawSizes)\n' +
      '  \t\t\t{\n' +
      '  \t\t\t\tresultArrays[0] = minimumColWidths;\n' +
      '  \t\t\t\tresultArrays[1] = minimumRowHeights;\n' +
      '  \t\t\t\tresultArrays[2] = preferredColWidths;\n' +
      '  \t\t\t\tresultArrays[3] = preferredRowHeights;\n' +
      '  \t\t\t\tresultArrays[4] = maximumColWidths;\n' +
      '  \t\t\t\tresultArrays[5] = maximumRowHeights;\n' +
      '  \t\t\t}\n' +
      '  \t\n' +
      '  \t\t\t// sums up the sizes for return value\n' +
      '  \t\t\tint[] colWidths;\n' +
      '  \t\t\tint[] rowHeights;\n' +
      '  \t\t\tswitch (layoutSize)\n' +
      '  \t\t\t{\n' +
      '  \t\t\t\tcase MINIMUM:\n' +
      '  \t\t\t\t\tcolWidths = minimumColWidths;\n' +
      '  \t\t\t\t\trowHeights = minimumRowHeights;\n' +
      '  \t\t\t\t\tbreak;\n' +
      '  \t\n' +
      '  \t\t\t\tcase PREFERRED:\n' +
      '  \t\t\t\t\tcolWidths = preferredColWidths;\n' +
      '  \t\t\t\t\trowHeights = preferredRowHeights;\n' +
      '  \t\t\t\t\tbreak;\n' +
      '  \t\n' +
      '  \t\t\t\tcase MAXIMUM:\n' +
      '  \t\t\t\t\tcolWidths = maximumColWidths;\n' +
      '  \t\t\t\t\trowHeights = maximumRowHeights;\n' +
      '  \t\t\t\t\tbreak;\n' +
      '  \t\n' +
      '  \t\t\t\tdefault:\n' +
      '  \t\t\t\t\tthrow new InternalError("Missing case branch for LayoutSize: " + layoutSize);\n' +
      '  \t\t\t}\n' +
      '  \t\t\tlong totalWidth = 0;\n' +
      '  \t\t\tlong totalHeight = 0;\n' +
      '  \t\t\tfor (int width : colWidths)\n' +
      '  \t\t\t{\n' +
      '  \t\t\t\ttotalWidth += width;\n' +
      '  \t\t\t}\n' +
      '  \t\t\tfor (int height : rowHeights)\n' +
      '  \t\t\t{\n' +
      '  \t\t\t\ttotalHeight += height;\n' +
      '  \t\t\t}\n' +
      '  \t\n' +
      '  \t\t\t// add space between components or between\n' +
      '  \t\t\t// componetns and the borders of the parent container\n' +
      '  \t\t\tif (!fillRawSizes)\n' +
      '  \t\t\t{\n' +
      '  \t\t\t\tInsets insets = parent.getInsets();\n' +
      '  \t\t\t\ttotalWidth += insets.left + insets.right + ((gridSize.width - 1) * hgap) + distanceToBorders.left + distanceToBorders.right;\n' +
      '  \t\t\t\ttotalHeight += insets.top + insets.bottom + ((gridSize.height - 1) * vgap) + distanceToBorders.top + distanceToBorders.bottom;\n' +
      '  \t\t\t}\n' +
      '  \t\n' +
      '  \t\t\t// clip the size to Integer.MAX_VALUE if too big\n' +
      '  \t\t\tif (totalWidth > Integer.MAX_VALUE)\n' +
      '  \t\t\t{\n' +
      '  \t\t\t\ttotalWidth = Integer.MAX_VALUE;\n' +
      '  \t\t\t}\n' +
      '  \t\t\tif (totalHeight > Integer.MAX_VALUE)\n' +
      '  \t\t\t{\n' +
      '  \t\t\t\ttotalHeight = Integer.MAX_VALUE;\n' +
      '  \t\t\t}\n' +
      '  \t\n' +
      '  \t\t\treturn new Dimension((int)totalWidth,(int)totalHeight);\n' +
      '  \t\t}';

    this.functionText = functionTextConvert;
    this.funcTextEvent.emit(functionTextConvert);





    $(function () {
      $.noConflict();
      $(document).tooltip({
        items: ":hover"
      });
      $('#dialogHelp').dialog({
        //  close: function() { $('#convert').focus(); },
        open: function () {
          $('#accordion').accordion({
            heightStyle: "content"
          });
        },

        autoOpen: false,
        height: 600,
        width: 1000
      });
      $('#dialogPreview').dialog({
        //  close: function() { $('#convert').focus(); },

        buttons: {
          'Close': {
            text: 'Close',
            click: function () {
              $(this).dialog('close');
            }
          },
          'Load': {
            id: 'load',
            text: 'Load',
            click: function () {
              var text = document.getElementById('previewText').value;
              self.functionText=text;
              self.funcTextEvent.emit(text);
              document.getElementById('func').value=text;
              $(this).dialog('close');
              $('#dialogLoad').dialog('close');

            }
          }
        },
        autoOpen: false,
        height: 600,
        width: 1000
      });
      $('#dialogExample').dialog({


        autoOpen: false,
        height: 600,
        width: 1100
      });
      $('#dialogSave').dialog({
        //   close: function() { $('#convert').focus(); },
        buttons: {
          'Close': {
            id: 'closebtn12',
            text: 'Close',
            click: function () {
              $(this).dialog('close');
            }
          },
          'Save': {
            id: 'savebtn12',
            text: 'Save',
            click: function () {
              $(this).dialog('close');
            }
          }
        },
        autoOpen: false,
        height: 500,
        width: 500
      });
      $('#dialogLoad').dialog({
        //  close: function() { $('#convert').focus(); },
        buttons: {
          'Close': {
            text: 'Close',
            click: function () {
              $(this).dialog('close');
            }
          },
          'Load': {
            id: 'loadbtn12',
            text: 'Load',
            click: function () {
              $(this).dialog('close');
            }
          }
        },
        autoOpen: false,
        height: 500,
        width: 500
      });
      $('#dialogSim').dialog({
        open: function () {
          let table = self.simRatios();
          $('#dialogTextSim').html(table);
        },
        // close: function() { $('#convert').focus(); },
        autoOpen: false,
        height: 230,
        width: 300,
      }).on("refreshEvent", function () {
        let table = self.simRatios();
        $('#dialogTextSim').html(table);
      });
      $('#dialogPref').dialog({
        autoOpen: false,
        height: 400,
        width: 430,
      });

      $('#dialogFunc').dialog({
        open: function () {
          $('#func2').scrollTop(0);
        },
        // close: function() { self.alirt(); },
        resize: function () {
          let w = $('#dialogFunc').width();
          let h = $('#dialogFunc').height();
          $('#func2').css('width', w - 10);
          $('#func2').css('height', h - 10);
        },
        autoOpen: false,
        height: 590,
        width: 1000
      });


    });


    joint.dia.LightLinkView = joint.dia.CellView.extend({
      node: V('<path class="connection" fill="none" />'),

      init: function () {
        this.vel.attr({
          'class': 'link',
          'model-id': this.model.id
        });
      },

      render: function () {

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

      update: function () {

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
          const a = sourceSize.width / 2;
          const b = sourceSize.height / 2;
          let q = sourcePosition.y + sourceSize.height;
          if (this._sourceModel.attr('text/type') === ('WHILE')) {
            q = Math.sqrt(1 - (Math.pow((x - x0), 2)) / Math.pow(a, 2)) * b + y0;
          }
          if (this._sourceModel.attr('text/type') === ('FOR')) {
            q = Math.sqrt(1 - (Math.pow((x - x0), 2)) / Math.pow(a, 2)) * b + y0;
          }
          if (this._sourceModel.attr('text/type') === ('ELSE')) {
            if (x < sourcePosition.x + 0.3 * sourceSize.width) {
              const m = (sourcePosition.y - (sourcePosition.y + sourceSize.height))
                / (sourcePosition.x - (sourcePosition.x + 0.3 * sourceSize.width));
              q = m * ((targetPosition.x + targetSize.width / 2) - sourcePosition.x) + sourcePosition.y;
            }
            if (x > sourcePosition.x + 0.7 * sourceSize.width) {
              const m1 = (sourcePosition.y - (sourcePosition.y + sourceSize.height))
                / ((sourcePosition.x + sourceSize.width) - (sourcePosition.x + 0.7 * sourceSize.width));
              q = m1 * ((targetPosition.x + targetSize.width / 2) - (sourcePosition.x + sourceSize.width)) + sourcePosition.y;
            }
          }
          if (this._sourceModel.attr('text/type') === ('SWITCH')) {
            if (x < sourcePosition.x + 0.25 * sourceSize.width) {
              const m = ((sourcePosition.y + sourceSize.height / 2) - (sourcePosition.y + sourceSize.height))
                / (sourcePosition.x - (sourcePosition.x + 0.25 * sourceSize.width));
              q = m * ((targetPosition.x + targetSize.width / 2) - sourcePosition.x) + (sourcePosition.y + sourceSize.height / 2);
            }
            if (x > sourcePosition.x + 0.75 * sourceSize.width) {
              const m = ((sourcePosition.y + sourceSize.height / 2) - (sourcePosition.y + sourceSize.height))
                / ((sourcePosition.x + sourceSize.width) - (sourcePosition.x + 0.75 * sourceSize.width));
              q = m * ((targetPosition.x + targetSize.width / 2) - (sourcePosition.x + sourceSize.width))
                + (sourcePosition.y + sourceSize.height / 2);
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

      markup: '<g class="rotatable"><g class="scalable"><polygon points="60,0 140,0 200,100 0,100"/></g><text/></g>',

      defaults: joint.util.deepSupplement({

        type: 'basic.Polygon',
        attrs: {
          'polygon': {fill: '#FFFFFF', stroke: 'black', width: 1, height: 1},
          'text': {
            'font-size': 14, 'font-family': 'arial', 'ref-x': .5, 'ref-y': .5,
            ref: 'polygon', 'y-alignment': 'middle', 'x-alignment': 'middle'
          }
        }

      }, joint.shapes.basic.Generic.prototype.defaults)
    });

    joint.shapes.basic.trapezR = joint.shapes.basic.Generic.extend({

      markup: '<g class="rotatable"><g class="scalable"><polygon points="0,0 200,0 180,100 20,100"/></g><text/></g>',

      defaults: joint.util.deepSupplement({

        type: 'basic.Polygon',
        attrs: {
          'polygon': {fill: '#FFFFFF', stroke: 'black', width: 1, height: 1},
          'text': {
            'font-size': 14, 'font-family': 'arial', 'ref-x': .5, 'ref-y': .5,
            ref: 'polygon', 'y-alignment': 'middle', 'x-alignment': 'middle'
          }
        }

      }, joint.shapes.basic.Generic.prototype.defaults)
    });

    joint.shapes.basic.six = joint.shapes.basic.Generic.extend({

      markup: '<g class="rotatable"><g class="scalable"><polygon points="0,50 50,0 150,0 200,50 150,100 50,100"/></g><text/></g>',

      defaults: joint.util.deepSupplement({

        type: 'basic.Polygon',
        attrs: {
          'polygon': {fill: '#FFFFFF', stroke: 'black', width: 1, height: 1},
          'text': {
            'font-size': 14, 'font-family': 'arial', 'ref-x': .5,
            'ref-y': .5, ref: 'polygon', 'y-alignment': 'middle', 'x-alignment': 'middle'
          }
        }

      }, joint.shapes.basic.Generic.prototype.defaults)
    });


    // header

    const trp = new joint.shapes.basic.trapez({
      position: {x: 20, y: 1},
      size: {width: 110, height: 50},
// attrs: { 'polygon': { transform: 'rotate(180)'}}
    });
    trp.attr({

      polygon: {fill: '#ffe665', 'stroke-width': 1, stroke: 'black'},
      text: {
        text: 'IF',
        color: 'black'
      }
    });

    const trp2 = new joint.shapes.basic.trapezR({
      position: {x: 170, y: 1},
      size: {width: 110, height: 50},
    });
    trp2.attr({
      polygon: {fill: '#FFA533', 'stroke-width': 1, stroke: 'black'},
      text: {
        text: 'ELSE'
      }
    });
    const s = new joint.shapes.basic.Circle({
      position: {x: 320, y: 1},
      size: {width: 110, height: 50},
      attrs: {circle: {fill: '#33B0FF'}, text: {text: 'FOR', fill: 'white'}}
    });


    const s2 = new joint.shapes.basic.Circle({
      position: {x: 470, y: 1},
      size: {width: 110, height: 50},
      attrs: {circle: {fill: '#33FF51'}, text: {text: 'WHILE', fill: 'white'}}
    });


    const si = new joint.shapes.basic.six({
      position: {x: 620, y: 1},
      size: {width: 110, height: 50},
    });
    si.attr({

      polygon: {fill: '#FF3333', 'stroke-width': 1, stroke: 'black'},
      text: {
        text: 'SWITCH'
      }
    });

    const trp3 = new joint.shapes.basic.trapez({
      position: {x: 770, y: 1},
      size: {width: 100, height: 50},
// attrs: { 'polygon': { transform: 'rotate(180)'}}
    });
    trp3.attr({

      polygon: {fill: '#792fff', 'stroke-width': 1, stroke: 'black'},
      text: {
        text: 'CASE',
        color: 'white'
      }
    });

    // diagram

    const rect = new joint.shapes.basic.Rect({
      position: {x: 3, y: 3},
      size: {width: 900, height: 50},
      attrs: {rect: {fill: 'orange'}, text: {text: 'myFunc', fill: 'white'}}
    });

    const firstif = new joint.shapes.basic.trapez({
      position: {x: 3, y: 105},
      size: {width: 272, height: 50},
// attrs: { 'polygon': { transform: 'rotate(180)'}}
    });
    firstif.attr({
      polygon: {fill: '#ffe665', 'stroke-width': 1, stroke: 'black'},
      text: {
        text: 'IF',
        color: 'black'
      }
    });

    const secondif = new joint.shapes.basic.trapez({
      position: {x: 41, y: 210},
      size: {width: 77, height: 50},
// attrs: { 'polygon': { transform: 'rotate(180)'}}
    });
    secondif.attr({

      polygon: {fill: '#ffe665', 'stroke-width': 1, stroke: 'black'},
      text: {
        text: 'IF',
        color: 'black'
      }
    });

    const firstelse = new joint.shapes.basic.trapezR({
      position: {x: 118, y: 210},
      size: {width: 119, height: 50},
    });
    firstelse.attr({
      polygon: {fill: '#FFA533', 'stroke-width': 1, stroke: 'black'},
      text: {
        text: 'ELSE'
      }
    });

    const firstwhile = new joint.shapes.basic.Circle({
      position: {x: 275, y: 105},
      size: {width: 272, height: 50},
      attrs: {circle: {fill: '#33FF51'}, text: {text: 'WHILE', fill: 'white'}}
    });

    const firstfor = new joint.shapes.basic.Circle({
      position: {x: 295, y: 210},
      size: {width: 232, height: 50},
      attrs: {circle: {fill: '#33B0FF'}, text: {text: 'FOR', fill: 'white'}}
    });

    const ifinfor = new joint.shapes.basic.trapez({
      position: {x: 318, y: 315},
      size: {width: 93, height: 50},
// attrs: { 'polygon': { transform: 'rotate(180)'}}
    });
    ifinfor.attr({

      polygon: {fill: '#ffe665', 'stroke-width': 1, stroke: 'black'},
      text: {
        text: 'IF',
        color: 'black'
      }
    });

    const elseinfor = new joint.shapes.basic.trapezR({
      position: {x: 411, y: 315},
      size: {width: 93, height: 50},
    });
    elseinfor.attr({
      polygon: {fill: '#FFA533', 'stroke-width': 1, stroke: 'black'},
      text: {
        text: 'ELSE'
      }
    });

    const secondwhile = new joint.shapes.basic.Circle({
      position: {x: 547, y: 105},
      size: {width: 356, height: 50},
      attrs: {circle: {fill: '#33FF51'}, text: {text: 'WHILE', fill: 'white'}}
    });


    const link = new joint.dia.Link({
      source: {id: firstif.id},
      target: {id: secondif.id}
    });

    const link2 = new joint.dia.Link({
      source: {id: firstif.id},
      target: {id: firstelse.id}
    });

    const link3 = new joint.dia.Link({
      source: {id: firstwhile.id},
      target: {id: firstfor.id}
    });

    const link4 = new joint.dia.Link({
      source: {id: rect.id},
      target: {id: firstif.id, port: 'in'},
    });

    const link5 = new joint.dia.Link({
      source: {id: rect.id},
      target: {id: firstwhile.id}
    });

    const link6 = new joint.dia.Link({
      source: {id: rect.id},
      target: {id: secondwhile.id}
    });

    const link7 = new joint.dia.Link({
      source: {id: firstfor.id},
      target: {id: ifinfor.id}
    });

    const link8 = new joint.dia.Link({
      source: {id: firstfor.id},
      target: {id: elseinfor.id}
    });

    graph2.addCells([trp, si, trp2, s, s2, trp3]);
    graph.addCells([rect, ifinfor, elseinfor, firstwhile, firstelse,
      firstfor, firstif, secondwhile, secondif, link, link2, link3, link4, link5, link6, link7, link8]);
  }

  // this is a temp bug fix for jquery ui open bug
  resizeEvent(event, ui) {
    $(this).height($(this).parent().height() - $(this).prev('.ui-dialog-titlebar').height() - 30);
    $(this).width($(this).prev('.ui-dialog-titlebar').width());
  }

   CtrlUnpress() {
    self.shapeClick(ctrlCodeArray[ctrlArrayCounter - 1][ctrlArrayCounter2], null, 0, 0);
    ctrlArrayCounter2++;
  }


   preprocess(str: string) {
    str = str.toLowerCase();
    str = str.replace(new RegExp('//(.*)\n', 'g'), '');
   // str = str.replace(new RegExp('\\/\\*(.|\n)*\\*\\/', 'g'), '');
     str = str.replace(new RegExp('\\/\\*[^\\*]*[^\\/]*\\*\\/', 'g'), '');

    str = str.replace(new RegExp('for([ ]*)\\(([^\\()]*)(\\(.*\\))*([^\\(]*)\\)', 'g'), function (s) {
      var c = (s.match(/;/g) || []).length;
      var res = 'F';
      for (var z = 0; z < c; z++) {
       if (self.ignoreI == false) { res = res + 'L'; }
      }
      return res;
    });
    str = str.replace(new RegExp('if([ ]*)\\(([^\\()]*)(\\(.*\\))*([^\\(]*)\\)', 'g'), function (s) {
      var c = (s.match(new RegExp('(\\|\\||\\&\\&)', 'g')) || []).length;
      var res = 'I';
      if (c > 1) {
        for (var z = 0; z < c; z++) {
          if (self.ignoreI == false) {  res = res + 'O'; }
        }
      }
      return res;
    });
    str = str.replace(new RegExp('while([ ]*)\\(([^\\()]*)(\\(.*\\))*([^\\(]*)\\)', 'g'), 'W');
    str = str.replace(new RegExp('switch([ ]*)\\(([^\\()]*)(\\(.*\\))*([^\\(]*)\\)', 'g'), 'S');
    str = str.replace(new RegExp('else', 'g'), 'E');
    str = str.replace(new RegExp('case', 'g'), 'C');
    /*for (let x = 0; x < matches.length; x++){
      var re = new RegExp(matches[x],"g");
      str = str.replace(re,'x');
    } */
    str = str.replace(new RegExp('(\[a-zA-Z]+.+)([ ]*)\\(([^\\(]*)\\)', 'g'), '');
    str = str.replace(new RegExp('([^A-Z{};]+);', 'g'), 'L');

    if (this.ignoreP == false) {
      str = str.replace(/{/g, 'B');
      str = str.replace(/}/g, 'P');
    }
    else {
      str = str.replace(/{/g, '');
      str = str.replace(/}/g, '');
    }

    if (this.ignoreN == true) {
      str = str.replace(/\n/g, '');
      str = str.replace(/\t/g, '');
    }
    else {
      str = str.replace(/\n/g, 'N');
      str = str.replace(/\t/g, 'T');
    }
    str = str.replace(/ /g, '');


    return str;
  }


   simRatios() {
    let y = 0;
    let y2 = 0;
    while (y < maxR) {
      if (cellDialog[y] !== undefined) {
        y2++;
      }
      y++;
    }

    let table = '';
    if (y2 === 0 || y2 === 1) {
      return 'Please click on more than one shape in order to show similarity ratios';
    }
    table += '<table style="width:100%; border: 1px solid #f1f1f1; padding:0px; line-height: 14px; margin:auto; "><tr><td style="font-weight: bold;">Code A</td><td style="font-weight: bold;">Code B</td><td style="font-weight: bold;">Similarity</td></tr>';



    for (let z = 0; z < maxR; z++) {
      if (cellDialog[z] !== undefined) {
        for (let zz = 0; zz < maxR; zz++) {
          if (z === zz) {
            continue;
          }
          if (z < zz) {
            continue;
          }
          if (cellDialog[zz] !== undefined) {
            let z2 = z + 1;
            let zz2 = zz + 1;
            table += '<tr><td>Code ' + z2 + '</td><td>Code ' + zz2 + '</td><td id="resulttd' + z + '' + zz + '">';

            //  var a = $('#dialog' + z2).data('p1').model.attr('text/textF');
            //   var b = $('#dialog' + zz2).data('p1').model.attr('text/textF');

            var a = $('#dialog' + z2).data('p3');
            var b = $('#dialog' + zz2).data('p3');

            a = this.preprocess(a);
            b = this.preprocess(b);

            //  alert(a);
            //  alert(b);

            this.simAlgo(a, b, z, zz);

            table += 'loading</td></tr>';
          }
        }
      }
    }
    table += '</table>';
    return table;

  }

   simAlgo(a, b, z, zz) {
    $.ajax({
      type: "GET",
      crossDomain: true,
      url: "https://alon1992.pythonanywhere.com/",
      data: {"string": a, "string2": b},
      cache: true,
      error: function () {
        let simple = self.simpleSimAlgo(a, b);
        document.getElementById('resulttd' + z + '' + zz).innerHTML = simple + '%';
        document.getElementById('serverstatus').innerHTML = 'Remote server is unavailable ,results are not accurate';
      },
      success: function (data) {
        let ajaxresult1 = data.r;
        let ajaxresult2 = data.l;
        // alert('?string=' + a + '&string2=' +b);
        document.getElementById('resulttd' + z + '' + zz).innerHTML = ajaxresult1 + '% | ' + ajaxresult2 + '%';
        document.getElementById('serverstatus').innerHTML = '';
      }
    });
  }


   simpleSimAlgo(a, b) {
    var l2 = a.length;
    var l2 = b.length;
    var grade = 0;
    var minLength = 0;
    var maxLength = 0;

    if (a.length > b.length) {
      minLength = b.length;
      maxLength = a.length;
    } else {
      minLength = a.length;
      maxLength = b.length;
    }

    for (let i = 0; i < minLength; i++) {
      if (a[i] === b[i]) {
        grade++;
      }
    }

    let weight = grade / maxLength;
    let result = (weight * 100);
    return Math.round(result);
  }

   closeDialogEvent(cellv, n, ctrlWin) {
//alert(ctrlWin);

     $("#dialog" + n).dialog("option", "width", 580);
     $("#dialog" + n).dialog("option", "height", 580);


    // alert(n + " | " + dialogNumber)
       document.getElementById('dialog' + n + 'b').style.display = 'none';


    if (isNaN(parseInt(cellv.model.attr('text/text'))) === false) {
      cellv.model.attr('text/text', '');
    }

    cellDialog[n - 1] = undefined;

// bug fix
    let x = 0;
    let y = 0;
    while (x < n - 1) {
      if (cellDialog[x] === undefined) {
        y = 1;
      }
      x++;
    }
    if (y === 0) {
      dialogNumber = n;
    }



    // $('#convert').focus();

    if (ctrlWin != -1) {
      let k = 0;
      while (ctrlCodeArray[k][ctrlWin] !== undefined) {
        this.originalColor(ctrlCodeArray[k][ctrlWin]);
        if (isNaN(parseInt(ctrlCodeArray[k][ctrlWin].model.attr('text/text'))) === false) {
          ctrlCodeArray[k][ctrlWin].model.attr('text/text', '');
        }
        k++;
      }
    } else {
      this.originalColor(cellv);
    }

    if ($('#dialogSim').dialog('isOpen')) {
      $('#dialogSim').trigger('refreshEvent');
    }
  }


   originalColor(cellv) {
    if (cellv.model.attr('text/type') === 'ELSE') {
      cellv.model.attr('polygon/fill', '#FFA533');
    } else if (cellv.model.attr('text/type') === 'IF') {
      cellv.model.attr('polygon/fill', '#fff58c');
    } else if (cellv.model.attr('text/type') === 'CASE') {
      cellv.model.attr('polygon/fill', '#792fff');

    } else if (cellv.model.attr('text/type') === 'SWITCH') {
      cellv.model.attr('polygon/fill', '#FF3333');

    } else if (cellv.model.attr('text/type') === 'FOR') {
      cellv.model.attr('circle/fill', '#33B0FF');
    } else if (cellv.model.attr('text/type') === 'WHILE') {
      cellv.model.attr('circle/fill', '#33FF51');
    }
  }


  build(Qer: Ast, num: number, graph: joint.dia.Graph, rect: joint.shapes.basic.Generic, c: number, p: joint.dia.Paper) {
    joint.shapes.basic.trapez = joint.shapes.basic.Generic.extend({

      markup: '<g class="rotatable"><g class="scalable"><polygon points="60,0 140,0 200,100 0,100"/></g><text/></g>',

      defaults: joint.util.deepSupplement({

        type: 'basic.Polygon',
        attrs: {
          'polygon': {fill: '#FFFFFF', stroke: 'black', width: 1, height: 1},
          'text': {
            'font-size': 14, 'font-family': 'arial', 'ref-x': .5, 'ref-y': .5,
            ref: 'polygon', 'y-alignment': 'middle', 'x-alignment': 'middle'
          }
        }

      }, joint.shapes.basic.Generic.prototype.defaults)
    });

    joint.shapes.basic.trapezR = joint.shapes.basic.Generic.extend({

      markup: '<g class="rotatable"><g class="scalable"><polygon points="0,0 200,0 140,100 60,100"/></g><text/></g>',

      defaults: joint.util.deepSupplement({

        type: 'basic.Polygon',
        attrs: {
          'polygon': {fill: '#FFFFFF', stroke: 'black', width: 1, height: 1},
          'text': {
            'font-size': 14, 'font-family': 'arial', 'ref-x': .5, 'ref-y': .5,
            ref: 'polygon', 'y-alignment': 'middle', 'x-alignment': 'middle'
          }
        }

      }, joint.shapes.basic.Generic.prototype.defaults)
    });
    let qq: Ast;
    qq = Qer;
    let ww = 0;
    for (let i = 0; i < qq.ref.length; i++) {
      ww = ww + parseInt(qq.ref[i].info, 10);
    }
    for (let i = 0; i < qq.ref.length; i++) {
      if (/* contains */qq.ref[i].text.toLowerCase().indexOf('for') !== -1) {
        const s = new joint.shapes.basic.Circle({
          position: {x: c, y: num * 55 + 50 * num},
          size: {width: (parseInt(qq.ref[i].info, 10) / ww) * rect.size().width, height: 50},
          attrs: {circle: {fill: '#33B0FF'}, text: {text: '', type: 'FOR', fill: 'white', textF: qq.ref[i].fullTextq}}
        });
        const link = new joint.dia.Link({
          source: {id: rect.id},
          target: {id: s.id},
        });
        graph.addCells([s, link]);
        if (qq.ref[i].ref !== null) {
          this.build(qq.ref[i], num + 1, graph, s, c, paper);
        }
        c = c + (parseInt(qq.ref[i].info, 10) / ww) * rect.size().width;
      } else {
        if (/* contains */qq.ref[i].text.toLowerCase().indexOf('while') !== -1) {
          const s = new joint.shapes.basic.Circle({
            position: {x: c, y: num * 55 + 50 * num},
            size: {width: (parseInt(qq.ref[i].info, 10) / ww) * rect.size().width, height: 50},
            attrs: {circle: {fill: '#33FF51'}, text: {text: '', type: 'WHILE', fill: 'white', textF: qq.ref[i].fullTextq}}
          });
          const link = new joint.dia.Link({
            source: {id: rect.id},
            target: {id: s.id},
          });
          graph.addCells([s, link]);
          if (qq.ref[i].ref !== null) {
            this.build(qq.ref[i], num + 1, graph, s, c, paper);
          }
          c = c + (parseInt(qq.ref[i].info, 10) / ww) * rect.size().width;
        } else {
          if (/* contains */qq.ref[i].text.toLowerCase().indexOf('if') !== -1) {
            const s = new joint.shapes.basic.trapez({
              position: {x: c, y: num * 55 + 50 * num},
              size: {width: (parseInt(qq.ref[i].info, 10) / ww) * rect.size().width, height: 50},
            });
            s.attr({

              polygon: {fill: '#fff58c', 'stroke-width': 1, stroke: 'black'},
              text: {
                // if
                type: 'IF',
                text: '',
                color: 'black', textF: qq.ref[i].fullTextq
              }
            });
            const link = new joint.dia.Link({
              source: {id: rect.id},
              target: {id: s.id}
            });
            graph.addCells([s, link]);
            if (qq.ref[i].ref !== null) {
              this.build(qq.ref[i], num + 1, graph, s, c, paper);
            }
            c = c + (parseInt(qq.ref[i].info, 10) / ww) * rect.size().width;
          } else {
            if (/* contains */qq.ref[i].text.toLowerCase().indexOf('else') !== -1) {
              const s = new joint.shapes.basic.trapezR({
                position: {x: c, y: num * 55 + 50 * num},
                size: {width: (parseInt(qq.ref[i].info, 10) / ww) * rect.size().width, height: 50},
              });
              s.attr({
                polygon: {fill: '#FFA533', 'stroke-width': 1, stroke: 'black'},
                text: {
                  // else
                  type: 'ELSE',
                  text: '', textF: qq.ref[i].fullTextq
                }
              });
              const link = new joint.dia.Link({
                source: {id: rect.id},
                target: {id: s.id}
              });
              graph.addCells([s, link]);
              if (qq.ref[i].ref !== null) {
                this.build(qq.ref[i], num + 1, graph, s, c, paper);
              }
              c = c + (parseInt(qq.ref[i].info, 10) / ww) * rect.size().width;
            } else {
              if (/* contains */qq.ref[i].text.toLowerCase().indexOf('switch') !== -1) {
                const s = new joint.shapes.basic.six({
                  position: {x: c, y: num * 55 + 50 * num},
                  size: {width: (parseInt(qq.ref[i].info, 10) / ww) * rect.size().width, height: 50},
                });
                s.attr({

                  polygon: {fill: '#FF3333', 'stroke-width': 1, stroke: 'black'},
                  text: {
                    // switch
                    type: 'SWITCH',
                    text: '', textF: qq.ref[i].fullTextq
                  }
                });
                const link = new joint.dia.Link({
                  source: {id: rect.id},
                  target: {id: s.id}
                });
                graph.addCells([s, link]);
                if (qq.ref[i].ref !== null) {
                  this.build(qq.ref[i], num + 1, graph, s, c, paper);
                }
                c = c + (parseInt(qq.ref[i].info, 10) / ww) * rect.size().width;
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
                      text: '', textF: qq.ref[i].fullTextq
                    }
                  });
                  const link = new joint.dia.Link({
                    source: {id: rect.id},
                    target: {id: s.id}
                  });
                  graph.addCells([s, link]);
                  if (qq.ref[i].ref !== null) {
                    this.build(qq.ref[i], num + 1, graph, s, c, paper);
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


  // test() { alert('hey'); }


  shapeClick(cellView, evt, x, yy) {
    let cntrlIsPressed = false;

    if (evt != null) {
      if (evt.ctrlKey) {
        cntrlIsPressed = true;
        ctrlListening = true;
        ctrlCodeArray[ctrlArrayCounter][ctrlArrayCounter2] = cellView;
        ctrlArrayCounter++;

      }
    }

    if (!cntrlIsPressed) {




      for (let n = 0; n < dialogNumber; n++) {
        if (cellDialog[n] !== undefined) {
          if (cellView === cellDialog[n]) {
            //   alert($('#dialog' + (n+1)).data('p2'));
            if ($('#dialog' + (n + 1)).data('p2') === -1) {
              alert('There is an active window that assinged that shape');
              $('#dialog' + (n + 1)).parent().show();
                document.getElementById('dialog' + (n + 1) + 'b').style.display = 'none';
              return;
            }
          }
        }
      }

   /*   if (cellDialog[dialogNumber - 1] !== undefined) {
        $('#dialog' + dialogNumber).dialog('close');
      } */

   while (cellDialog[dialogNumber - 1] !== undefined) {
     dialogNumber++;
   }

      //   <li class="liHide2" id="dialog4b"><a href="#" onclick="$('#dialog4').parent().show(); document.getElementById('dialog4b').style.display='none';" title="Show dialog">Win 4</a></li>
if ( document.getElementById('dialog' + dialogNumber + 'b') == undefined) {
  let ul = document.getElementById("menu");
  let li = document.createElement("li");
  li.setAttribute("id", "dialog" + dialogNumber + "b");
  li.innerHTML = '<a href="#" onclick="$(\'#dialog' + dialogNumber + '\').parent().show(); document.getElementById(\'dialog' + dialogNumber + 'b\').style.display=\'none\';" title="Show dialog">Win ' + dialogNumber + '</a>';
  li.setAttribute("class", "liHide2");
  ul.appendChild(li);
}


      $("<div id='dialog" +  dialogNumber + "'><p id='dialogText" +  dialogNumber + "'></p></div>").dialog({
     /* close: function () {
        let d = dialogNumber;
        self.closeDialogEvent($('#dialog' + d).data('p1'), d, $('#dialog' + d).data('p2'));
      }, */
      autoOpen: false,
        resizeStop: self.resizeEvent,
         height: 580,
        width: 580
    });



      if (self.autoWin) {

        let pageH = $(document).height();
        let pageW = $(document).width();


        let count = 0;
        // 100 - the auto set will stop working after reopening 100 windows in one session, which is very rare.
        for (let n = 0; n < 100; n++) {
          if (cellDialog[n] !== undefined) {
            count++;
          }
        }

        let winWidth = (pageW / (count+1+0.5));
       // alert(winWidth);
        if (winWidth > 550) { winWidth = 550; }
        if (winWidth < 400) { winWidth = 400; }

        let x = 0;
        // 100 - the auto set will stop working after reopening 100 windows in one session, which is very rare.
        for (let n = 0; n < 100; n++) {
          if (cellDialog[n] !== undefined) {
            // alert('dialog ' + x +' is open' );
            // n+1 is the dialog that currently open

            if (count == 1) {
              $("#dialog" + (n + 1)).dialog("option", "position", {my: "left center", at: "left center", of: window});
              $("#dialog" + (n + 1)).dialog("option", "width", winWidth);
              $("#dialog" + dialogNumber).dialog("option", "position", {my: "right center", at: "right center", of: window});
              $("#dialog" + dialogNumber).dialog("option", "width", winWidth);
            } else if (count == 2) {
              if (x == 0) {
                $("#dialog" + (n + 1)).dialog("option", "position", {my: "left center", at: "left center", of: window});
                $("#dialog" + (n + 1)).dialog("option", "width", winWidth);
              } else if (x == 1) {
                $("#dialog" + (n + 1)).dialog("option", "position", {my: "center center", at: "center center", of: window});
                $("#dialog" + (n + 1)).dialog("option", "width", winWidth);
              }
                $("#dialog" + dialogNumber).dialog("option", "position", {my: "right center", at: "right center", of: window});
                $("#dialog" + dialogNumber).dialog("option", "width", winWidth);
              x++;
            }
            else if (count == 3) {
              if (x == 0) {
                $("#dialog" + (n + 1)).dialog("option", "position", {my: "left top", at: "left top", of: window});
                $("#dialog" + (n + 1)).dialog("option", "width", winWidth);
                let height = $("#dialog" + (n + 1)).dialog("option", "height");
                // alert(height + ' ' + pageH);
                if (((pageH / 2) - 125) < height) {
                  $("#dialog" + (n + 1)).dialog("option", "height", ((pageH / 2) - 125));
                }

              } else if (x == 1) {
                $("#dialog" + (n + 1)).dialog("option", "position", {my: "center top", at: "center top", of: window});
                $("#dialog" + (n + 1)).dialog("option", "width", winWidth);
              }
              else if (x == 2) {
                $("#dialog" + (n+1)).dialog("option", "position", {my: "right top", at: "right top", of: window});
                $("#dialog" + (n+1)).dialog("option", "width", winWidth);
              }
              $("#dialog" + dialogNumber).dialog("option", "position", {my: "left bottom", at: "left bottom", of: window});
              $("#dialog" + dialogNumber).dialog("option", "height", ((pageH / 2) - 125));
              $("#dialog" + dialogNumber).dialog("option", "width", winWidth);
              x++;
            }
            else if (count == 4) {
              if (x == 0) {
                $("#dialog" + (n + 1)).dialog("option", "position", {my: "left top", at: "left top", of: window});
                $("#dialog" + (n + 1)).dialog("option", "width", winWidth);
                let height = $("#dialog" + (n + 1)).dialog("option", "height");
                if (((pageH / 2) - 125) < height) {
                  $("#dialog" + (n + 1)).dialog("option", "height", ((pageH / 2) - 125));
                }

              } else if (x == 1) {
                $("#dialog" + (n + 1)).dialog("option", "position", {my: "center top", at: "center top", of: window});
                $("#dialog" + (n + 1)).dialog("option", "width", winWidth);

                let height = $("#dialog" + (n + 1)).dialog("option", "height");
                if (((pageH / 2) - 125) < height) {
                  $("#dialog" + (n + 1)).dialog("option", "height", ((pageH / 2) - 125));
                }
              }
              else if (x == 2) {
                $("#dialog" + (n+1)).dialog("option", "position", {my: "right top", at: "right top", of: window});
                $("#dialog" + (n+1)).dialog("option", "width", winWidth);
              }
              else if (x == 3) {
                $("#dialog" + (n+1)).dialog("option", "position", {my: "left bottom", at: "left bottom", of: window});
                $("#dialog" + (n+1)).dialog("option", "height", ((pageH / 2) - 125));
                $("#dialog" + (n+1)).dialog("option", "width", winWidth);
              }
              $("#dialog" + dialogNumber).dialog("option", "position", {my: "center bottom", at: "center bottom", of: window});
              $("#dialog" + dialogNumber).dialog("option", "height", ((pageH / 2) - 125));
              $("#dialog" + dialogNumber).dialog("option", "width", winWidth);
              x++;
            }
            else if (count == 5) {
              if (x == 0) {
                $("#dialog" + (n + 1)).dialog("option", "position", {my: "left top", at: "left top", of: window});
                $("#dialog" + (n + 1)).dialog("option", "width", winWidth);
                let height = $("#dialog" + (n + 1)).dialog("option", "height");
                if (((pageH / 2) - 125) < height) {
                  $("#dialog" + (n + 1)).dialog("option", "height", ((pageH / 2) - 125));
                }

              } else if (x == 1) {
                $("#dialog" + (n + 1)).dialog("option", "position", {my: "center top", at: "center top", of: window});
                $("#dialog" + (n + 1)).dialog("option", "width", winWidth);

                let height = $("#dialog" + (n + 1)).dialog("option", "height");
                if (((pageH / 2) - 125) < height) {
                  $("#dialog" + (n + 1)).dialog("option", "height", ((pageH / 2) - 125));
                }
              }
              else if (x == 2) {
                $("#dialog" + (n+1)).dialog("option", "position", {my: "right top", at: "right top", of: window});
                $("#dialog" + (n+1)).dialog("option", "width", winWidth);

                let height = $("#dialog" + (n + 1)).dialog("option", "height");
                if (((pageH / 2) - 125) < height) {
                  $("#dialog" + (n + 1)).dialog("option", "height", ((pageH / 2) - 125));
                }
              }
              else if (x == 3) {
                $("#dialog" + (n+1)).dialog("option", "position", {my: "left bottom", at: "left bottom", of: window});
                $("#dialog" + (n+1)).dialog("option", "height", ((pageH / 2) - 125));
                $("#dialog" + (n+1)).dialog("option", "width", winWidth);
              }
              else if (x == 4) {
                $("#dialog" + (n+1)).dialog("option", "position", {my: "center bottom", at: "center bottom", of: window});
                $("#dialog" + (n+1)).dialog("option", "height", ((pageH / 2) - 125));
                $("#dialog" + (n+1)).dialog("option", "width", winWidth);
              }
              $("#dialog" + dialogNumber).dialog("option", "position", {my: "right bottom", at: "right bottom", of: window});
              $("#dialog" + dialogNumber).dialog("option", "height", ((pageH / 2) - 125));
              $("#dialog" + dialogNumber).dialog("option", "width", winWidth);
              x++;
            }
            else if (count >= 6) {
              $("#dialog" + dialogNumber).dialog("option", "width", winWidth);
            }

          }
        }
      }


     $('#dialog' + dialogNumber).dialog('open');

      if (self.dialogOpacity) {
        $(".ui-dialog").css({"backgroundColor": "rgba(255,255,255,0.9)"});
      }

      $('#dialog' + dialogNumber).data('p1', cellView)
      let ctrlWin = -1;
      if (evt == null) {
        ctrlWin = ctrlArrayCounter2;
      }
      $('#dialog' + dialogNumber).data('p2', ctrlWin);
      let d = dialogNumber;
      $( "#dialog" + dialogNumber ).off( "dialogclose");
      $( "#dialog" + dialogNumber ).on( "dialogclose", function(  ) {
       // alert(d);
        self.closeDialogEvent(cellView, d, ctrlWin);
      } );

      let n = 0;
      while (n < dialogNumber) {
        if (cellDialog[n] === undefined) {
          break;
        }
        n++;
      }
      let nn = n + 1;


      //  alert(cellDialog[0] + ' ' + cellDialog[1] + ' ' + cellDialog[2] + ' ' + cellDialog[3]);


      $('#dialog' + dialogNumber).dialog('option', 'title', 'Code ' + nn);
      let text = cellView.model.attr('text/textF');
      let originalText = text;
      text = text.replace(/</g, '&lt;');
      text = text.replace(/>/g, '&gt;');
      text = text.replace(/\n/g, '<br>');
      text = text.replace(/\t/g, '&nbsp;');

      let y = 0;
      let y2 = 0;
      while (y < dialogNumber) {
        if (cellDialog[y] !== undefined) {
          y2++;
        }
        y++;
      }


      fieldArray.push(cellView.model.attr('text/textF'));

      //cellDialog.splice(dialogNumber-1, 0, cellView);

      cellDialog[dialogNumber - 1] = cellView;


      if (evt == null) {
        text = '';
        originalText = '';
        for (let x = 0; x < ctrlArrayCounter; x++) {

          let text2 = '';
          text2 = ctrlCodeArray[x][ctrlArrayCounter2].model.attr('text/textF');
          originalText = originalText + text2;
          text2 = text2.replace(/</g, '&lt;');
          text2 = text2.replace(/>/g, '&gt;');
          text2 = text2.replace(/\n/g, '<br>');
          text2 = text2.replace(/\t/g, '&nbsp;');
          text = text + text2;
        }
        // ctrlArrayCounter = 0;
      }

      let linesToComp = (text.length / 65);
      let newHeight = linesToComp * 40 + 120;
      let brs = (text.match(/<br>/g) || []).length;
      let calc = brs - linesToComp;
      if (calc > 0) {
        newHeight = newHeight + calc * 10;
      }
      let currentHeight =  $("#dialog" + dialogNumber).dialog("option", "height");
      let currentWidth =  $("#dialog" + dialogNumber).dialog("option", "width");

      if (currentWidth < 500) {
        //alert('fixed');
        newHeight = newHeight + 30;
      }

      if (newHeight < currentHeight) {
        $("#dialog" + dialogNumber).dialog("option", "height", newHeight);
      }



      $('#dialog' + dialogNumber).data('p3', originalText);
      let msg = '<a href="#" onclick="$(\'#dialogSim\').dialog(\'open\');">Similarity ratios</a> ';
        msg = msg + '| <a href="#" onclick="$(\'#dialog' + dialogNumber + '\').parent().hide(); win = document.getElementById(\'dialog' + dialogNumber + 'b\'); win.style.display=\'inline-block\';  inter = setInterval(function() { win.style.backgroundColor = (win.style.backgroundColor == \'\' ? \'#8b0000\' : \'\');}, 100); setTimeout(function() { clearInterval(inter); win.style.backgroundColor = \'\'; },400); ">Minimize window</a>';
      //  msg = msg + ' | <a href="#" onclick="$(\'#dialog' + dialogNumber + '\').css({\'backgroundColor\': \'rgba(255,255,255,0.9)\'});">Transparent dialog</a>';
      document.getElementById('dialogText' + dialogNumber).innerHTML = msg + '<code>' + text + '</code>';

    }


    if (cellView.model.attr('text/type') === 'ELSE') {
      cellView.model.attr('polygon/fill', '#ea6c0d');
    } else if (cellView.model.attr('text/type') === 'IF') {
      cellView.model.attr('polygon/fill', '#ffdb03');
    } else if (cellView.model.attr('text/type') === 'CASE') {
      cellView.model.attr('polygon/fill', '#6C0E9E');

    } else if (cellView.model.attr('text/type') === 'SWITCH') {
      cellView.model.attr('polygon/fill', '#AD1F12');

    } else if (cellView.model.attr('text/type') === 'FOR') {
      cellView.model.attr('circle/fill', '#247ED6');
    } else if (cellView.model.attr('text/type') === 'WHILE') {
      cellView.model.attr('circle/fill', '#29d646');
    }

    if (cntrlIsPressed) {
      return;
    }

    let t = $('#dialog' + dialogNumber).dialog('option', 'title');
    let t2 = t.replace('Code ', '');

    if (evt == null) {
      for (let x = 0; x < ctrlArrayCounter; x++) {
        if (ctrlCodeArray[x][ctrlArrayCounter2].model.attr('text/text') === '') {
          ctrlCodeArray[x][ctrlArrayCounter2].model.attr('text/text', t2);
        }
      }
      ctrlArrayCounter = 0;
    } else {
      if (cellView.model.attr('text/text') === '') {
        cellView.model.attr('text/text', t2);
      }
    }
    // cellView.model.attr('text/fill', 'red');

    dialogNumber++;
    if (dialogNumber > maxR) {
      maxR = dialogNumber;
    }
   /* if (dialogNumber === maxWindows + 1) {
      dialogNumber = 1;

    } */
    if ($('#dialogSim').dialog('isOpen')) {
      $('#dialogSim').trigger('refreshEvent');
    }
  }

  /* proccessSimRatio(s: String) {
   let funtext = s;
   funtext = funtext.replace(/\n/g, '');
   funtext = funtext.replace(/\t/g, '');
   funtext = funtext.replace(/ /g, '');
   var regex = /(int)(\w+)/g;


   funtext.replace(regex, function(s, x, m)  { if (m.length > 2) { matches.push(m); } return s; });

   matches.sort(function(a, b) {
     return b.length - a.length;
   });

 } */

  alirt() {
    graphScale=1;

    const strx = 'ast[] x; if(this.ref!=null){ x=new ast[this.ref.length+1]; }' +
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
    let funcNamex = '';
    let funcName2x = '';
    let funcName3x = '';
    funcNamex = this.functionText.substring(0, this.functionText.indexOf('('));
    const a = funcNamex.trim().split(' ');
    funcNamex = a[a.length - 1];
    let qq: Ast;
    qq = null;
    funcName3x = this.functionText.substring(this.functionText.indexOf('{') + 1, this.functionText.lastIndexOf('}'));
    funcName2x = /* replaceAll */funcName3x.replace(new RegExp('for([ ]*)\\(([^;:]*)(;)([^;]*)(;)([^\\)]*)\\)', 'g'), ' for$1($2,$4,$6) ');
  let height = Ast.build( funcName2x , this.ignoreCbra ).deepth * 115 + 275;
    diagramheight = height;
    paper = new joint.dia.Paper({
      el: jQuery('#diagramXXX'),
      gridSize: 10,
      width: 920,
      height : height,
      model: graph,
      linkView: joint.dia.LightLinkView,
      /*interactive: function(cellView, method) {
        return !(cellView instanceof joint.dia.ElementView );*/
    });

    paper.setInteractivity({elementMove: false});
    if (this.functionText !== '') {
      //  document.getElementById('func2').innerHTML=this.functionText;

      // self.proccessSimRatio(this.functionText);

      let funcName = '';
      let funcName2 = '';
      let funcName3 = '';
      funcName = this.functionText.substring(0, this.functionText.indexOf('('));
      const a = funcName.trim().split(' ');
      funcName = a[a.length - 1];
      let qq: Ast;
      qq = null;
      funcName3 = this.functionText.substring(this.functionText.indexOf('{') + 1, this.functionText.lastIndexOf('}'));
      funcName2 = /* replaceAll */funcName3.replace(new RegExp('for([ ]*)\\(([^;:]*)(;)([^;]*)(;)([^\\)]*)\\)', 'g'), ' for$1($2,$4,$6) ');
      qq = Ast.build( funcName2 , this.ignoreCbra );
      const rect = new joint.shapes.basic.Rect({
        position: {x: 3, y: 3},
        size: {width: 900, height: 50},
        attrs: {rect: {fill: 'orange'}, text: {text: funcName, fill: 'white', textF: this.functionText}}
      });
      graph.addCells([rect]);
      let xPoint = [];
      let yPoint = [];
      this.lineChartLabels.length = 0;
      yPoint.push(0);
      let max = 0;
      this.lineChartLabels.push(0);
      let v = 0;
      for ( let n = 0 ; n < qq.ref.length ; n++ ) {
        if ( qq.ref[n].deepth > max ) {
          max = qq.ref[n].deepth;
        }
        if (/* contains */qq.ref[n].text.trim().indexOf('Variable Deceleration') === -1) {
          v++;
          yPoint.push(qq.ref[n].deepth);
          this.lineChartLabels.push(v);
        }
      }

      yPoint.push(max + 1);
      this.lineChartData = yPoint;
      this.build(qq, 1, graph, rect, 3, paper);
      fieldArray = [ ];
      this.fieldA = fieldArray;

      /*paper.on('cell:pointerdown', function(cellView, evt, x, y) {
        alert(cellView.model.attr('text/textF'));
      });*/

      paper.on('cell:pointerdown', this.shapeClick);
    }
  }

  killY() {
    for (let i = 0; i < this.fieldA.length; i++) {
      alert(this.fieldA[i]);
    }
  }

  zoomin() {
    graphScale += 0.3;
    paper.setDimensions(920 + (graphScale - 1) * 1000, diagramheight * graphScale);
   paper.scale(graphScale, graphScale);
  }

  zoomout() {
    graphScale -= 0.3;
    paper.setDimensions(920 + (graphScale - 1) * 1000, diagramheight * graphScale);
    paper.scale(graphScale, graphScale);
  }

  /*autofit() {
    autoWin = !autoWin;
    if (autoWin) {
      alert('Auto window fit turned on');
    } else {
      alert('Auto window fit turned off');
    }
  } */

  public lineChartData: Array<any> = [
    {data: [], label: 'Series A'},
  ];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions:any = {
    responsive: true,
    scaleBeginAtZero : true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';

  public randomize():void {
    const _lineChartData: Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }

  public showHide(): void {
    document.getElementById('chartContainer').style.display = 'none' ;
  }
  clicked() {
    alert(this.show);
    this.show = !this.show;
    alert(this.show);
  }
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }
  public dialogOpacityEvent() {
    if (this.dialogOpacity) {
      $(".ui-dialog").css({"backgroundColor": "rgba(255,255,255,0.9)"});
    }
    else {
      $(".ui-dialog").css({"backgroundColor": "rgba(255,255,255,1)"});
    }
  }
  public refreshSim() {
    if ($('#dialogSim').dialog('isOpen')) {
      $('#dialogSim').trigger('refreshEvent');
    }
  }

}
