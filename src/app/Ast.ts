export class Ast {
  public info: string;

  public text: string;

  public textq: string;

  public fullTextq: string;

  public ref: Ast[];

  static are(): Ast {
    return null;
  }


  public stringToArray(str: string): string[] {
    let arr= str.split("");
    let array = [""];
    let result = [""];
    let y = 0;
    let ignore = 0;
    let counter = 0;
    let case1 = 0;
    let ignoreAll = false;
    var howManyClosersAndOpeners = 0;
    let counting = 0;

    for (var x = 0; x < arr.length ; x++) {
      // remove tabs and new line
      if (arr[x] !== '\t' && arr[x] !== '\n') {
        array[counter] = arr[x];
        counter++;
      }
// make sure that there is no more than 1 space in a row
      if (arr[x] === ' ') {
        var z = x;
        for (; z < arr.length ; z++) {
          if (arr[z] !== ' ') {
            break;
          }
        }
        x = z - 1;
      }
    }

    for (var x = 0; x < array.length; x++) {
      result[x] = "";
    }
    for (var x=0;x<array.length;x++) {
      // avoid keywords like 'for' , 'while','case' inside a quote
      if (array[x].includes("\"")) {
        result[y] += array[x];
        ignoreAll=!ignoreAll;
      }
      if (ignoreAll) { result[y] += array[x]; continue; }

      if (counting > 0 && howManyClosersAndOpeners == -1) {
        counting--;
        result[y]='}';
        y++;
      }

      if (array[x].includes(';') && ignore == 0) {
        result[y] += array[x];
        y++;
      }
      else if (array[x].includes('{')) {
        y++;
        result[y] = '{';
        y++;
        if (counting > 0) { howManyClosersAndOpeners++; }
      }
      else if (array[x].includes('}')) {
        result[y] = '}';
        y++;
        if (counting > 0) { howManyClosersAndOpeners--; }
      }
      else if (array[x].includes('e') && array[x+1].includes('l') && array[x+2].includes('s') && array[x+3].includes('e') && array[x+5].includes('i') && array[x+6].includes('f') ) {
        result[y] = 'else';
        y++;
        result[y] = '{';
        y++;
        result[y] = 'if';
        x=x+7;
        counting++;
      }
      else if (array[x].includes('e') && array[x+1].includes('l') && array[x+2].includes('s') && array[x+3].includes('e')) {
        result[y] = 'else';
        y++;
        x=x+3;
      }
      else if (array[x].includes('f') && array[x+1].includes('o') && array[x+2].includes('r')) {
        result[y] += array[x];
        ignore=1;
      }
      else if (array[x].includes('c') && array[x+1].includes('a') && array[x+2].includes('s') && array[x+3].includes('e')) {
        result[y] += array[x];
        case1=1;
      }
      else if (case1 == 1 && array[x].includes(':')) {
        case1=0;
        result[y] += array[x];
        y++;
      }
      else if (array[x].includes('d') && array[x+1].includes('e') && array[x+2].includes('f') && array[x+3].includes('a')) {
        result[y] += 'default:';
        x = x + 7;
        y++;
      }
      else if (ignore === 1 && array[x].includes(')')) {
        ignore = 0;
        result[y] += array[x];
      }
      else
      {
        result[y] += array[x];
      }
    }
    return result;
  }


  static build(__function: string): Ast {
    const funcx: Ast = new Ast();
    let functionx: Ast = new Ast();
    let str = __function;
    const txtq = '';
     str = /* replace */str.split('\n').join('#');
    str = /* replace */str.split(';').join(';#');
    str = /* replace */str.split('{').join('#{#');
    str = /* replace */str.split('}').join('#}#');
    let stt: string[] = str.split('#');
     let c = 0;
    for (let i = 0; i < stt.length; i++) {
      if (!/* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) {
          return o1.equals(o2); } else { return o1 === o2; } })(stt[i].trim(), ''))) {
        c++;
      }
    }
     const strq: string[] = new Array(c);
    let ind = 0;
     for (let i = 0; i < stt.length; i++) {
       if (!/* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) {
         return o1.equals(o2); } else { return o1 === o2; } })(stt[i].trim(), ''))) {
         strq[ind] = stt[i];
         ind++;
       }
     }
     stt = strq;
    let count = 0;
    let cq = 0;
    let cin = 0;
    let stq = '';
    funcx.textq = '';
    for (let i = 0; i < stt.length; i++) {
      if (/* contains */stt[i].indexOf(';') !== -1 && /* contains */stt[i].toLowerCase().indexOf('default') === -1 ) {
        count++;
        stq += stt[i] + ' ';
      }
      if (/* contains */(stt[i].toLowerCase()).trim().indexOf('for') === 0) {
        funcx.fullTextq += '\n' + stt[i];
        if (count !== 0) {
          funcx.info = count + '';
          funcx.text = 'Variable Deceleration';
          funcx.ref = null;
          functionx = functionx.add(funcx);
          funcx.textq = '';
          count = 0;
          stq = '';
        }
        if (/* contains */stt[i + 1].indexOf('{') !== -1 === false) {
          funcx.info = '1';
          funcx.text = 'for';
          funcx.ref = null;
          if (/* contains */stt[i + 1].indexOf(';') !== -1) {
            funcx.textq += '\n' + stt[i + 1];
            funcx.fullTextq += '\n' + stt[i + 1];
            i++;
          }
          functionx = functionx.add(funcx);
          funcx.textq = '';
          funcx.fullTextq = '';
        } else {
          for (let j: number = i + 1; j < stt.length; j++) {
            if (/* contains */stt[j].indexOf('{') !== -1) {
              funcx.fullTextq += '\n' + stt[j];
              if (cq !== 0) {
                funcx.textq += '\n' + stt[j];
              }
              cq++;
            } else {
              if (/* contains */stt[j].indexOf('}') !== -1) {
                funcx.fullTextq += '\n' + stt[j];
                cq--;
                if (cq === 0) {
                  funcx.info = cin + '';
                  funcx.text = 'for';
                  funcx.ref = null;
                  if (/* contains */funcx.textq.indexOf('{') !== -1 || /* contains */funcx.textq.toLowerCase().trim().indexOf('case') === 0
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('for') === 0
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('if') === 0
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('else') === 0
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('switch') === 0
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('while') === 0) { funcx.ref = this.build(funcx.textq).ref; }
                  functionx = functionx.add(funcx);
                  cin = 0;
                  cq = 0;
                  i = j;
                  funcx.textq = '';
                  funcx.fullTextq = '';
                  break;
                } else {
                  funcx.textq += '\n' + stt[j];
                }
              } else {
                if (!(/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) { return o1.equals(o2); } else {
                      return o1 === o2; } })(stt[j], '')) || /* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) {
                    return o1.equals(o2); } else { return o1 === o2; } })(stt[j], ' ')))) {
                  cin++;
                  funcx.textq += '\n' + stt[j];
                  funcx.fullTextq += '\n' + stt[j];
                }
              }
            }
          }
        }
      }
      if (/* contains */(stt[i].toLowerCase()).trim().indexOf('if') === 0) {
        funcx.fullTextq += '\n' + stt[i];
        if (count !== 0) {
          funcx.info = count + '';
          funcx.text = 'Variable Deceleration';
          funcx.ref = null;
          functionx = functionx.add(funcx);
          funcx.textq = '';
          count = 0;
          stq = '';
        }
        if (/* contains */stt[i + 1].indexOf('{') !== -1 === false) {
          funcx.info = '1';
          funcx.text = 'if';
          funcx.ref = null;
          if (/* contains */stt[i + 1].indexOf(';') !== -1) {
            funcx.textq += '\n' + stt[i + 1];
            funcx.fullTextq += '\n' + stt[i + 1];
            i++;
          }
          functionx = functionx.add(funcx);
          funcx.textq = '';
          funcx.fullTextq = '';
        } else {
          for (let j: number = i + 1; j < stt.length; j++) {
            if (/* contains */stt[j].indexOf('{') !== -1) {
              funcx.fullTextq += '\n' + stt[j];
              if (cq !== 0) {
                funcx.textq += '\n' + stt[j];
              }
              cq++;
            } else {
              if (/* contains */stt[j].indexOf('}') !== -1) {
                funcx.fullTextq += '\n' + stt[j];
                cq--;
                if (cq === 0) {
                  funcx.info = cin + '';
                  funcx.text = 'if';
                  funcx.ref = null;
                  if (/* contains */funcx.textq.indexOf('{') !== -1 || /* contains */funcx.textq.toLowerCase().trim().indexOf('case') === 0
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('for') === 0
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('if') === 0
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('else') === 0
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('switch') === 0
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('while') === 0) { funcx.ref = this.build(funcx.textq).ref; }
                  functionx = functionx.add(funcx);
                  cin = 0;
                  cq = 0;
                  i = j;
                  funcx.textq = '';
                  funcx.fullTextq = '';
                  break;
                } else {
                  funcx.textq += '\n' + stt[j];
                }
              } else {
                if (!(/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) { return o1.equals(o2); } else {
                      return o1 === o2; } })(stt[j], '')) || /* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) {
                    return o1.equals(o2); } else { return o1 === o2; } })(stt[j], ' ')))) {
                  cin++;
                  funcx.textq += '\n' + stt[j];
                  funcx.fullTextq += '\n' + stt[j];
                }
              }
            }
          }
        }
      }
      if (/* contains */(stt[i].toLowerCase()).trim().indexOf('while') === 0) {
        funcx.fullTextq += '\n' + stt[i];
        if (count !== 0) {
          funcx.info = count + '';
          funcx.text = 'Variable Deceleration';
          funcx.ref = null;
          functionx = functionx.add(funcx);
          funcx.textq = '';
          count = 0;
          stq = '';
        }
        if (/* contains */stt[i + 1].indexOf('{') !== -1 === false) {
          funcx.info = '1';
          funcx.text = 'while';
          funcx.ref = null;
          if (/* contains */stt[i + 1].indexOf(';') !== -1) {
            funcx.textq += '\n' + stt[i + 1];
            funcx.fullTextq += '\n' + stt[i + 1];
            i++;
          }
          functionx = functionx.add(funcx);
          funcx.textq = '';
          funcx.fullTextq = '';
        } else {
          for (let j: number = i + 1; j < stt.length; j++) {
            if (/* contains */stt[j].indexOf('{') !== -1) {
              funcx.fullTextq += '\n' + stt[j];
              if (cq !== 0) {
                funcx.textq += '\n' + stt[j];
              }
              cq++;
            } else {
              if (/* contains */stt[j].indexOf('}') !== -1) {
                funcx.fullTextq += '\n' + stt[j];
                cq--;
                if (cq === 0) {
                  funcx.info = cin + '';
                  funcx.text = 'while';
                  funcx.ref = null;
                  if (/* contains */funcx.textq.indexOf('{') !== -1 || /* contains */funcx.textq.toLowerCase().trim().indexOf('case') === 0
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('for') === 0
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('if') === 0
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('else') === 0
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('switch') === 0
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('while') === 0) { funcx.ref = this.build(funcx.textq).ref; }
                  functionx = functionx.add(funcx);
                  cin = 0;
                  cq = 0;
                  i = j;
                  funcx.textq = '';
                  funcx.fullTextq = '';
                  break;
                } else {
                  funcx.textq += '\n' + stt[j];
                }
              } else {
                if (!(/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) { return o1.equals(o2); } else {
                      return o1 === o2; } })(stt[j], '')) || /* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) {
                    return o1.equals(o2); } else { return o1 === o2; } })(stt[j], ' ')))) {
                  cin++;
                  funcx.textq += '\n' + stt[j];
                  funcx.fullTextq += '\n' + stt[j];
                }
              }
            }
          }
        }
      }
      if (/* contains */(stt[i].toLowerCase()).trim().indexOf('switch') === 0) {
        funcx.fullTextq += '\n' + stt[i];
        if (count !== 0) {
          funcx.info = count + '';
          funcx.text = 'Variable Deceleration';
          funcx.ref = null;
          functionx = functionx.add(funcx);
          funcx.textq = '';
          count = 0;
          stq = '';
        }
        if (/* contains */stt[i + 1].indexOf('{') !== -1 === false) {
          funcx.info = '1';
          funcx.text = 'switch';
          funcx.ref = null;
          functionx = functionx.add(funcx);
          funcx.fullTextq = '\n' + stt[i + 1];
          funcx.textq = '';
        } else {
          for (let j: number = i + 1; j < stt.length; j++) {
            if (/* contains */stt[j].indexOf('{') !== -1) {
              funcx.fullTextq += '\n' + stt[j];
              if (cq !== 0) {
                funcx.textq += '\n' + stt[j];
              }
              cq++;
            } else {
              if (/* contains */stt[j].indexOf('}') !== -1) {
                cq--;
                funcx.fullTextq += '\n' + stt[j];
                if (cq === 0) {
                  funcx.info = cin + '';
                  funcx.text = 'switch';
                  funcx.ref = null;
                  if (/* contains */funcx.textq.indexOf('{') !== -1 || /* contains */funcx.textq.toLowerCase().trim().indexOf('case') === 0
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('for') === 0
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('if') === 0
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('else') === 0
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('switch') === 0
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('while') === 0) { funcx.ref = this.build(funcx.textq).ref; }
                  functionx = functionx.add(funcx);
                  cin = 0;
                  cq = 0;
                  i = j;
                  funcx.textq = '';
                  funcx.fullTextq = '';
                  break;
                } else {
                  funcx.textq += '\n' + stt[j];
                  funcx.fullTextq += '\n' + stt[j];
                }
              } else {
                if (!(/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) { return o1.equals(o2); } else {
                      return o1 === o2; } })(stt[j], '')) || /* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) {
                    return o1.equals(o2); } else { return o1 === o2; } })(stt[j], ' ')))) {
                  cin++;
                  funcx.fullTextq += '\n' + stt[j];
                  funcx.textq += '\n' + stt[j];
                }
              }
            }
          }
        }
      }
      if (/* contains */(stt[i].toLowerCase()).trim().indexOf('case') === 0) {
        funcx.fullTextq += '\n' + stt[i];
        if (count !== 0) {
          funcx.info = count + '';
          funcx.text = 'Variable Deceleration';
          funcx.ref = null;
          functionx = functionx.add(funcx);
          funcx.textq = '';
          count = 0;
          stq = '';
        }
        if (/* contains */(stt[i + 1].toLowerCase()).trim().indexOf('break') === 0) {
          funcx.info = '1';
          funcx.text = 'case';
          funcx.textq = stt[i + 1];
          funcx.fullTextq += '\n' + stt[i + 1];
          funcx.ref = null;
          functionx = functionx.add(funcx);
          funcx.textq = '';
          funcx.fullTextq = '';
        } else {
          for (let j: number = i + 1; j < stt.length; j++) {
            if (/* contains */(stt[j].toLowerCase()).trim().indexOf('break') === 0) {
              funcx.info = cin + '';
              funcx.text = 'case';
              funcx.textq += stt[j];
              funcx.fullTextq += '\n' + stt[j];
              funcx.ref = null;
              if (/* contains */funcx.textq.indexOf('{') !== -1 || /* contains */funcx.textq.toLowerCase().trim().indexOf('case') === 0
              || /* contains */funcx.textq.toLowerCase().trim().indexOf('for') === 0
              || /* contains */funcx.textq.toLowerCase().trim().indexOf('if') === 0
              || /* contains */funcx.textq.toLowerCase().trim().indexOf('else') === 0
              || /* contains */funcx.textq.toLowerCase().trim().indexOf('switch') === 0
              || /* contains */funcx.textq.toLowerCase().trim().indexOf('while') === 0) { funcx.ref = this.build(funcx.textq).ref; }
              functionx = functionx.add(funcx);
              cin = 0;
              cq = 0;
              i = j;
              funcx.textq = '';
              funcx.fullTextq = '';
              break;
            } else {
             if ( j === stt.length - 1 || /* contains */stt[j + 1].toLowerCase().trim().indexOf('case') === 0
               || /* contains */stt[j + 1].toLowerCase().trim().indexOf('default') === 0 ) {
                funcx.info = cin + '';
                funcx.text = 'case';
                funcx.textq += stt[j];
               funcx.fullTextq += '\n' + stt[j];
                funcx.ref = null;
                if (/* contains */funcx.textq.indexOf('{') !== -1 || /* contains */funcx.textq.toLowerCase().trim().indexOf('case') === 0
                || /* contains */funcx.textq.toLowerCase().trim().indexOf('for') === 0
                || /* contains */funcx.textq.toLowerCase().trim().indexOf('if') === 0
                || /* contains */funcx.textq.toLowerCase().trim().indexOf('else') === 0
                || /* contains */funcx.textq.toLowerCase().trim().indexOf('switch') === 0
                || /* contains */funcx.textq.toLowerCase().trim().indexOf('while') === 0) {
                  funcx.ref = this.build(funcx.textq).ref;
                }
                functionx = functionx.add(funcx);
                cin = 0;
                cq = 0;
                i = j;
                funcx.textq = '';
               funcx.fullTextq = '';
                break;
              } else {
              if (!(/* equals */(<any>((o1: any, o2: any) => {
                  if (o1 && o1.equals) {
                    return o1.equals(o2);
                  } else {
                    return o1 === o2;
                  }
                })(stt[j], '')) || /* equals */(<any>((o1: any, o2: any) => {
                  if (o1 && o1.equals) {
                    return o1.equals(o2);
                  } else {
                    return o1 === o2;
                  }
                })(stt[j], ' ')))) {
                cin++;
                funcx.fullTextq += '\n' + stt[j];
                funcx.textq += stt[j];
              }
            }
            }
          }
        }
      }
      if (/* contains */stt[i].toLowerCase().trim().indexOf('default') === 0) {
        funcx.fullTextq += '\n' + stt[i];
        if (count !== 0) {
          funcx.info = count + '';
          funcx.text = 'Variable Deceleration';
          funcx.ref = null;
          functionx = functionx.add(funcx);
          funcx.textq = '';
          count = 0;
          stq = '';
        }
          for (let j: number = i + 1 ; j < stt.length; j++) {
            if (j === stt.length - 1 ) {
              if (!(/* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) {
                  return o1.equals(o2); } else {
                  return o1 === o2; } })(stt[j], '')) || /* equals */(<any>((o1: any, o2: any) => {
                  if (o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })(stt[j], ' ')))) {
                cin++;
                funcx.textq += stt[j];
                funcx.fullTextq += '\n' + stt[j];
              }
              funcx.info = cin + '';
              funcx.text = 'case';
              funcx.ref = null;
              if (/* contains */funcx.textq.indexOf('{') !== -1 || /* contains */funcx.textq.toLowerCase().trim().indexOf('case') === 0
              || /* contains */funcx.textq.toLowerCase().trim().indexOf('for') === 0
              || /* contains */funcx.textq.toLowerCase().trim().indexOf('if') === 0
              || /* contains */funcx.textq.toLowerCase().trim().indexOf('else') === 0
              || /* contains */funcx.textq.toLowerCase().trim().indexOf('switch') === 0
              || /* contains */funcx.textq.toLowerCase().trim().indexOf('while') === 0) { funcx.ref = this.build(funcx.textq).ref; }
              functionx = functionx.add(funcx);
              cin = 0;
              cq = 0;
              i = j;
              funcx.textq = '';
              funcx.fullTextq = '';
              break;
            } else {
              if (!(/* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) {
                  return o1.equals(o2); } else {
                  return o1 === o2; } })(stt[j], '')) || /* equals */(<any>((o1: any, o2: any) => {
                  if (o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })(stt[j], ' ')))) {
                cin++;
                funcx.textq += stt[j];
                funcx.fullTextq += '\n' + stt[j];
              }
            }
          }
      }
      if (/* contains */(stt[i].toLowerCase()).trim().indexOf('else') === 0) {
        funcx.fullTextq += '\n' + stt[i];
        if (count !== 0) {
          funcx.info = count + '';
          funcx.text = 'Variable Deceleration';
          funcx.ref = null;
          functionx = functionx.add(funcx);
          funcx.textq = '';
          count = 0;
          stq = '';
        }
        if (/* contains */stt[i + 1].indexOf('{') !== -1 === false) {
          funcx.info = '1';
          funcx.text = 'else';
          funcx.ref = null;
          if (/* contains */stt[i + 1].indexOf(';') !== -1) {
            funcx.textq += '\n' + stt[i + 1];
            funcx.fullTextq += '\n' + stt[i + 1];
            i++;
          }
          functionx = functionx.add(funcx);
          funcx.textq = '';
          funcx.fullTextq = '';
        } else {
          for (let j: number = i + 1; j < stt.length; j++) {
            if (/* contains */stt[j].indexOf('{') !== -1) {
              funcx.fullTextq += '\n' + stt[j];
              if (cq !== 0) {
                funcx.textq += '\n' + stt[j];
              }
              cq++;
            } else {
              if (/* contains */stt[j].indexOf('}') !== -1) {
                funcx.fullTextq += '\n' + stt[j];
                cq--;
                if (cq === 0) {
                  funcx.info = cin + '';
                  funcx.text = 'else';
                  funcx.ref = null;
                  if (/* contains */funcx.textq.indexOf('{') !== -1 || /* contains */funcx.textq.toLowerCase().trim().indexOf('case') === 0
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('for') === 0
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('if') === 0
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('else') === 0
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('switch') === 0
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('while') === 0) { funcx.ref = this.build(funcx.textq).ref; }
                  functionx = functionx.add(funcx);
                  cin = 0;
                  cq = 0;
                  i = j;
                  funcx.textq = '';
                  funcx.fullTextq = '';
                  break;
                } else {
                  funcx.textq += '\n' + stt[j];
                }
              } else {
                if (!(/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) { return o1.equals(o2); } else {
                      return o1 === o2; } })(stt[j], '')) || /* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) {
                    return o1.equals(o2); } else { return o1 === o2; } })(stt[j], ' ')))) {
                  cin++;
                  funcx.textq += '\n' +  stt[j];
                  funcx.fullTextq += '\n' + stt[j];
                }
              }
            }
          }
        }
      }
    }
    if (count !== 0) {
      funcx.info = count + '';
      funcx.text = 'Variable Deceleration';
      funcx.ref = null;
      functionx = functionx.add(funcx);
      funcx.textq = '';
      count = 0;
      stq = null;
    }
    return functionx;
  }
  public add(__function: Ast): Ast {
    let x: Ast[];
    if (this.ref != null) {
      x = new Array(this.ref.length + 1);
    } else {
      x = new Array(1);
    }
    let i = 0;
    if (this.ref != null) {
      for (i = 0; i < this.ref.length; i++) {
        x[i] = this.ref[i];
      }
    }
    x[i] = new Ast();
    x[i].info = __function.info;
    x[i].text = __function.text;
    x[i].textq = __function.textq;
    x[i].fullTextq = __function.fullTextq;
    if (__function.ref != null) {
      x[i].ref = new Array(__function.ref.length);
      for (let j = 0; j < __function.ref.length; j++) {
        x[i].ref[j] = __function.ref[j];
      }
    }
    this.ref = x;
    return this;
  }




constructor() {
    this.info = null;
    this.text = null;
    this.textq = null;
    this.ref = null;
    this.fullTextq = '';
  }
}

