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
const cellDialog = [];
let paper;
let graphScale = 1;


@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.css']
})


export class DiagramComponent implements OnInit {
  @Output() funcTextEvent = new EventEmitter<string>();

  onchange(value: string) {
    this.funcTextEvent.emit(value);
    /* alert('hello'); */
  }

   public fieldA: Array<any> = [];
   newAttribute: any = {};
  title = 'ICSD';


  @Input() functionText = '';

  constructor () {
  }



ngOnInit() {
this.funcTextEvent.emit('private Dimension getSize(Container parent, LayoutSize layoutSize, boolean fillRawSizes,\n' +
  '    \t\t\t\t\t  Dimension gridSize, List<List<ExtendedGridLayoutConstraints>> gridRows,\n' +
  '    \t\t\t\t\t  Set<ExtendedGridLayoutConstraints> colspans,\n' +
  '    \t\t\t\t\t  Set<ExtendedGridLayoutConstraints> rowspans,\n' +
  '    \t\t\t\t\t  int[][] resultArrays)\n' +
  '    \t\t{\n' +
  '    \t\t\tif (fillRawSizes && (resultArrays.length < 6))\n' +
  '    \t\t\t{\n' + '    \t\t\t\tthrow new IllegalArgumentException("If fillRawSizes is true, resultArrays.length must be >= 6 (" + resultArrays.length + \')\');\n' +
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
  '   \t\t\t\telse{ if (preferredColWidths[col] < minimumColWidths[col])\n' +
  '   \t\t\t\t{\n' +
  '   \t\t\t\t\tpreferredColWidths[col] = minimumColWidths[col];\n' +
  '  \t\t\t\t}\n' +
  '   \t\t\t\telse {if (preferredColWidths[col] > maximumColWidths[col])\n' +
  '   \t\t\t\t{\n' +
  '   \t\t\t\t\tpreferredColWidths[col] = maximumColWidths[col];\n' +
  '   \t\t\t\t}\n' +
  '}\n' +
  '}\n' +
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
  '  \t\t\t\telse {if (preferredColWidths[col] < minimumColWidths[col])\n' +
  ' \t\t\t\t{\n' +
  '  \t\t\t\t\tpreferredColWidths[col] = minimumColWidths[col];\n' +
  '  \t\t\t\t}\n' +
  '  \t\t\t\telse{ if (preferredColWidths[col] > maximumColWidths[col])\n' +
  ' \t\t\t\t{\n' +
  '  \t\t\t\t\tpreferredColWidths[col] = maximumColWidths[col];\n' +
  '  \t\t\t\t}}\n' +
  '\t\t\t}}\n' +
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
  '  \t\t\t\telse{ if (preferredRowHeights[row] < minimumRowHeights[row])\n' +
  '  \t\t\t\t{\n' +
  '  \t\t\t\t\tpreferredRowHeights[row] = minimumRowHeights[row];\n' +
  '  \t\t\t\t}\n' +
  '  \t\t\t\telse {if (preferredRowHeights[row] > maximumRowHeights[row])\n' +
  ' \t\t\t\t{\n' +
  '  \t\t\t\t\tpreferredRowHeights[row] = maximumRowHeights[row];\n' +
  '  \t\t\t\t}\n' +
  '  \t\t\t}}}\n' +
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
  '  \t\t\t\telse {if (preferredRowHeights[row] < minimumRowHeights[row])\n' +
  '  \t\t\t\t{\n' +
  '  \t\t\t\t\tpreferredRowHeights[row] = minimumRowHeights[row];\n' +
  '  \t\t\t\t}\n' +
  '  \t\t\t\telse {if (preferredRowHeights[row] > maximumRowHeights[row])\n' +
  '  \t\t\t\t{\n' +
  '  \t\t\t\t\tpreferredRowHeights[row] = maximumRowHeights[row];\n' +
  '  \t\t\t\t}\n' +
  '  \t\t\t}}}\n' +
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
  '  \t\t\t{\n' + '  \t\t\t\tInsets insets = parent.getInsets();\n' + '  \t\t\t\ttotalWidth += insets.left + insets.right' +
  ' + ((gridSize.width - 1) * hgap) + distanceToBorders.left + distanceToBorders.right;\n' + '  \t\t\t\ttotalHeight += insets.top ' +
  '+ insets.bottom + ((gridSize.height - 1) * vgap) + distanceToBorders.top + distanceToBorders.bottom;\n' +
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
  '  \t\t}');




  function closeDialogEvent(cellv) {
  //  cellv.model.attr('text/text','');
    $('#convert').focus();
    if (cellv.model.attr('text/type') === 'ELSE') {
      cellv.model.attr('polygon/fill', '#FFA533');
    } else if ( cellv.model.attr('text/type') === 'IF') {
      cellv.model.attr('polygon/fill', '#fff58c');
    } else if ( cellv.model.attr('text/type') === 'CASE') {
      cellv.model.attr('polygon/fill', '#792fff');

    } else if ( cellv.model.attr('text/type') === 'SWITCH') {
      cellv.model.attr('polygon/fill', '#FF3333');

    } else if ( cellv.model.attr('text/type') === 'FOR') {
      cellv.model.attr('circle/fill', '#33B0FF');
    } else if ( cellv.model.attr('text/type') === 'WHILE') {
      cellv.model.attr('circle/fill', '#33FF51');
    }
  }


  $( function() {
    $.noConflict();
    $( document ).tooltip();
    $('#dialogHelp').dialog({
      close: function() { $('#convert').focus(); },
      buttons: {
        'Close': {
          text: 'Close',
          click: function() { $(this).dialog('close'); }
        }},
      autoOpen: false,
      height: 400,
      width: 400});
    $('#dialogFunc').dialog({
     open: function() {  $('#func2').scrollTop(0); },
      close: function() { $('#convert').focus(); },
      autoOpen: false,
      height: 580,
      width: 800});
    $('#dialog1').dialog({
      close: function() {
        closeDialogEvent($('#dialog1').data('p1'));
      },
      autoOpen: false,
      height: 580,
      width: 580});
    $('#dialog2').dialog({
      close: function() {
        closeDialogEvent($('#dialog2').data('p1'));
      },
      position: { my: 'left top', at: 'left bottom' },
      autoOpen: false,
      height: 580,
      width: 580});
    $('#dialog3').dialog({
      close: function() {
        closeDialogEvent($('#dialog3').data('p1'));
      },
      position: { my: 'right top', at: 'right bottom' },
      autoOpen: false,
      height: 580,
      width: 580});
    $('#dialog4').dialog({
      close: function() {
        closeDialogEvent($('#dialog4').data('p1'));
      },
      autoOpen: false,
      height: 580,
      width: 580});
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

              polygon: { fill: '#fff58c', 'stroke-width': 1, stroke: 'black' },
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
    graphScale = 1;
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
     paper = new joint.dia.Paper({
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
    //  document.getElementById('func2').innerHTML=this.functionText;

     let funcName = '';
      let funcName2 = '';
      let funcName3 = '';
     funcName = this.functionText.substring( 0 , this.functionText.indexOf('('));
     const a = funcName.split(' ');
     funcName = a[a.length - 1 ];
      let qq: Ast;
      qq = null;
      funcName3 = this.functionText.substring(this.functionText.indexOf('{') + 1, this.functionText.lastIndexOf('}'));
      funcName2 = /* replaceAll */funcName3.replace(new RegExp('for([ ])*\\(([^;:])*(;)([^;])*(;)([^\\)])*\\)', 'g'), ' for() ');
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
          if (cellDialog[dialogNumber - 1] !== undefined) {
            $('#dialog' + dialogNumber).dialog('close');
          }
          $('#dialog' + dialogNumber).data('p1', cellView).dialog('open');
          const text = cellView.model.attr('text/textF');
const text2 = text.replace(/\n/g, '<br>');
          const text3 = text2.replace(/\t/g, '&nbsp;');
          document.getElementById('dialogText' + dialogNumber).innerHTML = text3;
          fieldArray.push(cellView.model.attr('text/textF'));

          cellDialog.splice(dialogNumber, 0, cellView);

          if (cellView.model.attr('text/type') === 'ELSE') {
            cellView.model.attr('polygon/fill', '#ea6c0d');
          } else if ( cellView.model.attr('text/type') === 'IF') {
            cellView.model.attr('polygon/fill', '#ffdb03');
        } else if ( cellView.model.attr('text/type') === 'CASE') {
        cellView.model.attr('polygon/fill', '#6C0E9E');

        } else if ( cellView.model.attr('text/type') === 'SWITCH') {
        cellView.model.attr('polygon/fill', '#AD1F12');

        } else if ( cellView.model.attr('text/type') === 'FOR') {
        cellView.model.attr('circle/fill', '#247ED6');
          } else if ( cellView.model.attr('text/type') === 'WHILE') {
            cellView.model.attr('circle/fill', '#29d646' );
          }


         //   cellView.model.attr('text/text', '•');
           // cellView.model.attr('text/fill', 'red');

          dialogNumber++;
          if (dialogNumber === 5) {
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
  zoomin() {
    graphScale += 0.1;
    paper.setDimensions(920 + (graphScale - 1) * 1000, 800);
    paper.scale(graphScale, graphScale);
  }
  zoomout() {
    graphScale -= 0.1;
    paper.setDimensions(920 + (graphScale - 1) * 1000 , 800);
    paper.scale(graphScale, graphScale);
  }
  help() {
    $('#dialogHelp').dialog('open');
  }

}
