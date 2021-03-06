export class Ast {
  public info: string;

  public text: string;

  public textq: string;

  public fullTextq: string;

  public deepth: number;

  public ref: Ast[];

  static are(): Ast {
    return null;
  }




  static build(__function: string , flagCbra: boolean ): Ast {
    const funcx: Ast = new Ast();
    let functionx: Ast = new Ast();
    let str = __function;
    const txtq = '';
    funcx.deepth = 1;
    str = str.toLowerCase();
    str = str.replace(new RegExp('default([ ]*)\\:', 'g'), 'default:');
    str = /* replaceAll */str.replace(new RegExp('#([^\\n]*)', 'g'), '');
    str = /* replaceAll */str.replace(new RegExp('\\/\\/([^\n]*)else([^\n]*)\n', 'g'), '//$1ellse$2\n');
    str = /* replaceAll */str.replace(new RegExp('\\[\\]([ ]*)\\{([^\\}]*)\\}', 'g'), '[]$1($2)');
    str = /* replaceAll */str.replace(new RegExp('\\/\\/([^\n]*)if([^\n]*)\n', 'g'), '//$1ief$2\n');
    str = /* replaceAll */str.replace(new RegExp('\\/\\/([^\n]*)for([^\n]*)\n', 'g'), '//$1foor$2\n');
    str = /* replaceAll */str.replace(new RegExp('\\/\\/([^\n]*)while([^\n]*)\n', 'g'), '//$1whiile$2\n');
    str = /* replaceAll */str.replace(new RegExp('\\/\\/([^\n]*)switch([^\n]*)\n', 'g'), '//$1swittch$2\n');
    str = /* replaceAll */str.replace(new RegExp('\\/\\/([^\n]*)case([^\n]*)\n', 'g'), '//$1casse$2\n');
    str = /* replaceAll */str.replace(new RegExp('\\/\\/([^\n]*)do([^\n]*)\n', 'g'), '//$1dao$2\n');
    str = /* replaceAll */str.replace(new RegExp('\\/\\/([^\n]*)default([^\n]*)\n', 'g'), '//$1defullt$2\n');
    while (!/* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })
    (/* replaceAll */str.replace(new RegExp('\\/\\/([^\n]*){([^\n]*)\n', 'g'), '//$1[$2\n') , str ))) {
      str = /* replaceAll */str.replace(new RegExp('\\/\\/([^\n]*){([^\n]*)\n', 'g'), '//$1[$2\n');
    }
    while (!/* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })
    (/* replaceAll */str.replace(new RegExp('\\/\\/([^\n]*)}([^\n]*)\n', 'g'), '//$1]$2\n'), str ))) {
      str = /* replaceAll */str.replace(new RegExp('\\/\\/([^\n]*)}([^\n]*)\n', 'g'), '//$1]$2\n');
    }
    while (!/* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })
    (/* replaceAll */str.replace(new RegExp('\\/\\*([^\\*]*[^\\/]*)}([^\\*]*[^\\/]*)\\*\\/', 'g'), '/*$1]$2*/\n') , str ))) {
      str = /* replaceAll */str.replace(new RegExp('\\/\\*([^\\*]*[^\\/]*)}([^\\*]*[^\\/]*)\\*\\/', 'g'), '/*$1]$2*/\n');
    }
    while (!/* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })
    (/* replaceAll */str.replace(new RegExp('\\/\\*([^\\*]*[^\\/]*){([^\\*]*[^\\/]*)\\*\\/', 'g'), '/*$1[$2*/\n') , str ))) {
      str = /* replaceAll */str.replace(new RegExp('\\/\\*([^\\*]*[^\\/]*){([^\\*]*[^\\/]*)\\*\\/', 'g'), '/*$1[$2*/\n');
    }
    str = /* replaceAll */str.replace(new RegExp('//([^\\n]*)', 'g'), '//$1###');
    str = /* replace */str.split('\n').join(' ');
    str = /* replaceAll */str.replace(new RegExp('\\/\\*([^\\*]*[^\\/]*)\\*\\/', 'g'), '/*$1*/###');
    while (!/* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })
    (/* replaceAll */str.replace(new RegExp('\\/\\*([^\\*]*[^\\/]*)if', 'g'), '/*$1ief' ), str ))) {
      str = /* replaceAll */str.replace(new RegExp('\\/\\*([^\\*]*[^\\/]*)if', 'g'), '/*$1ief');
    }
    str = /* replaceAll */str.replace(new
    RegExp('if([ ]*)(\\(([^()]*|\\(([^()]*|\\(([^()]*|\\(([^()]*|\\(([^()]*|\\(([^()]*|\\([^()]*\\))*\\))*\\))*\\))*\\))*\\))*\\))',
      'g'), 'if$1$2###');
    while (!/* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })
    (/* replaceAll */str.replace(new RegExp('\\/\\*([^\\*]*[^\\/]*)for', 'g'), '/*$1foor' ), str ))) {
      str = /* replaceAll */str.replace(new RegExp('\\/\\*([^\\*]*[^\\/]*)for', 'g'), '/*$1foor');
    }
    str = /* replaceAll */str.replace(new
    RegExp('for([ ]*)(\\(([^()]*|\\(([^()]*|\\(([^()]*|\\(([^()]*|\\(([^()]*|\\(([^()]*|\\([^()]*\\))*\\))*\\))*\\))*\\))*\\))*\\))',
      'g'), 'for$1$2###');
    while (!/* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })
    (/* replaceAll */str.replace(new RegExp('\\/\\*([^\\*]*[^\\/]*)do', 'g'), '/*$1doa' ), str ))) {
      str = /* replaceAll */str.replace(new RegExp('\\/\\*([^\\*]*[^\\/]*)do', 'g'), '/*$1doa');
    }
    str = /* replaceAll */str.replace(new
    RegExp('do([ ]*)\n',
      'g'), 'do###');
    while (!/* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })
    (/* replaceAll */str.replace(new RegExp('\\/\\*([^\\*]*[^\\/]*)while', 'g'), '/*$1whille' ), str ))) {
      str = /* replaceAll */str.replace(new RegExp('\\/\\*([^\\*]*[^\\/]*)while', 'g'), '/*$1whille');
    }
    //\(((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*)\)
    str = /* replaceAll */str.replace(new
    RegExp('while([ ]*)(\\(([^()]*|\\(([^()]*|\\(([^()]*|\\(([^()]*|\\(([^()]*|\\(([^()]*|\\([^()]*\\))*\\))*\\))*\\))*\\))*\\))*\\))',
      'g'), 'while$1$2###');
    while (!/* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })
    (/* replaceAll */str.replace(new RegExp('\\/\\*([^\\*]*[^\\/]*)else', 'g'), '/*$1ellse' ), str ))) {
      str = /* replaceAll */str.replace(new RegExp('\\/\\*([^\\*]*[^\\/]*)else', 'g'), '/*$1ellse');
    }
    str = /* replaceAll */str.replace(new RegExp('else', 'g'), 'else###');
    while (!/* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })
    (/* replaceAll */str.replace(new RegExp('\\/\\*([^\\*]*[^\\/]*)default', 'g'), '/*$1defult' ), str ))) {
      str = /* replaceAll */str.replace(new RegExp('\\/\\*([^\\*]*[^\\/]*)default', 'g'), '/*$1defult');
    }
    str = /* replaceAll */str.replace(new RegExp('default:', 'g'), 'default:###');
    while (!/* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })
    (/* replaceAll */str.replace(new RegExp('\\/\\*([^\\*]*[^\\/]*)case', 'g'), '/*$1caase' ), str ))) {
      str = /* replaceAll */str.replace(new RegExp('\\/\\*([^\\*]*[^\\/]*)case', 'g'), '/*$1caase');
    }
    str = /* replaceAll */str.replace(new RegExp('case([ ]*)([^ ]*)([ ]*):', 'g'), 'case$1$2$3:###');
    str = /* replaceAll */str.replace(new RegExp(';', 'g'), ';###');
    str = /* replaceAll */str.replace(new RegExp('{', 'g'), '###{###');
    str = /* replaceAll */str.replace(new RegExp('}', 'g'), '###}###');
    let stt: string[] = str.split('###');
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
    let qin = 0;
    let stq = '';
    let caseIf = 0;
    let caseV = 0;
    funcx.textq = '';
    for (let i = 0; i < stt.length; i++) {
      if (/* contains */stt[i].indexOf(';') !== -1 && /* contains */stt[i].toLowerCase().indexOf('default') === -1) {
        count++;
        stq += stt[i] + ' ';
      }
      if (/* contains */(stt[i].toLowerCase()).trim().indexOf('for') === 0) {
        funcx.fullTextq += '\n' + stt[i];
        if (qin === 1) {
          funcx.textq += '\n' + stt[i];
          funcx.info = cin + '';
        }
        while (/* contains */stt[i + 1].trim().indexOf('//') === 0 ||
        /* contains */stt[i + 1].trim().indexOf('/*') === 0) {
          funcx.textq += '\n' + stt[i + 1];
          funcx.fullTextq += '\n' + stt[i + 1];
          i++;
        }
        cin++;
        if (count !== 0) {
          funcx.info = count + '';
          funcx.text = 'Variable Deceleration';
          funcx.ref = null;
          funcx.fullTextq = /* replaceAll */funcx.fullTextq.replace(new
          RegExp('for([ ]*)\\(([^,:]*)(,)([^,]*)(,)([^\\)]*)\\)', 'g'), ' for$1($2;$4;$6) ');
          functionx = functionx.add(funcx);
          funcx.textq = '';
          funcx.deepth = 1;
          count = 0;
          stq = '';
        }
        if (/* contains */stt[i + 1].indexOf('{') !== -1 === false) {
          if (qin === 0) {
            funcx.info = '1';
            funcx.text = 'for';
          }
          funcx.ref = null;
          if (/* contains */stt[i + 1].trim().indexOf('if') === 0
          || /* contains */stt[i + 1].trim().indexOf('for') === 0
          || /* contains */stt[i + 1].trim().indexOf('while') === 0
          || /* contains */stt[i + 1].trim().indexOf('switch') === 0
          || /* contains */stt[i + 1].trim().indexOf('else') === 0) {
            funcx.info = cin + '';
            funcx.text = 'for';
            qin = 1;
            continue;
          }
          if (/* contains */stt[i + 1].indexOf(';') !== -1) {
            cin++;
            funcx.textq += '\n' + stt[i + 1];
            funcx.fullTextq += '\n' + stt[i + 1];
            funcx.info = cin + '';
            i++;
          }
          funcx.fullTextq = /* replaceAll */funcx.fullTextq.replace(new
          RegExp('for([ ]*)\\(([^,:]*)(,)([^,]*)(,)([^\\)]*)\\)', 'g'), ' for$1($2;$4;$6) ');
          funcx.info = cin + '';
          if (qin === 1) {
            funcx.deepth = Math.max(this.build(funcx.textq, flagCbra).deepth + 1, funcx.deepth);
            funcx.ref = this.build(funcx.textq, flagCbra).ref;
          }
          functionx = functionx.add(funcx);
          funcx.textq = '';
          funcx.deepth = 1;
          qin = 0;
          funcx.fullTextq = '';
          cin = 0;
        } else {
          for (let j: number = i + 1; j < stt.length; j++) {
            if (/* contains */stt[j].indexOf('{') !== -1) {
              if (flagCbra) {
                cin++;
              }
              funcx.fullTextq += '\n' + stt[j];
              if (cq !== 0 || qin === 1) {
                funcx.textq += '\n' + stt[j];
              }
              cq++;
            } else {
              if (/* contains */stt[j].indexOf('}') !== -1) {
                if (flagCbra) {
                  cin++;
                }
                funcx.fullTextq += '\n' + stt[j];
                cq--;
                if (cq === 0) {
                  if (qin === 1) {
                    funcx.textq += '\n' + stt[j];
                    funcx.info = cin + '';
                  } else {
                    funcx.info = cin + '';
                    funcx.text = 'for';
                    funcx.ref = null;
                  }
                  funcx.info = cin + '';
                  if (/* contains */funcx.textq.indexOf('\n{') !== -1
                  || /* contains */funcx.textq.indexOf('{') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)case', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('case') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)for', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('for') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)if', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('if') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)else', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('else') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)switch', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('switch') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)while', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('while') === 0) {
                    funcx.deepth = Math.max(this.build(funcx.textq, flagCbra).deepth + 1, funcx.deepth);
                    funcx.ref = this.build(funcx.textq, flagCbra).ref;
                  }
                  funcx.fullTextq = /* replaceAll */funcx.fullTextq.replace(new
                  RegExp('for([ ]*)\\(([^,:]*)(,)([^,]*)(,)([^\\)]*)\\)', 'g'), ' for$1($2;$4;$6) ');
                  functionx = functionx.add(funcx);
                  cin = 0;
                  cq = 0;
                  i = j;
                  qin = 0;
                  funcx.textq = '';
                  funcx.deepth = 1;
                  funcx.fullTextq = '';
                  break;
                } else {
                  funcx.textq += '\n' + stt[j];
                }
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
        if (qin === 1) {
          funcx.textq += '\n' + stt[i];
          funcx.info = '1';
        }
        while (/* contains */stt[i + 1].trim().indexOf('//') === 0 ||
        /* contains */stt[i + 1].trim().indexOf('/*') === 0) {
          funcx.textq += '\n' + stt[i + 1];
          funcx.fullTextq += '\n' + stt[i + 1];
          i++;
        }
        cin++;
        if (count !== 0) {
          funcx.info = count + '';
          funcx.text = 'Variable Deceleration';
          funcx.ref = null;
          funcx.fullTextq = /* replaceAll */funcx.fullTextq.replace(new
          RegExp('for([ ]*)\\(([^,:]*)(,)([^,]*)(,)([^\\)]*)\\)', 'g'), ' for$1($2;$4;$6) ');
          functionx = functionx.add(funcx);
          funcx.textq = '';
          funcx.deepth = 1;
          count = 0;
          stq = '';
        }

        if (/* contains */stt[i + 1].indexOf('{') !== -1 === false) {
          if (qin === 0) {
            funcx.info = '1';
            funcx.text = 'if';
          }
          funcx.ref = null;
          if (/* contains */stt[i + 1].trim().indexOf('if') === 0
          || /* contains */stt[i + 1].trim().indexOf('for') === 0
          || /* contains */stt[i + 1].trim().indexOf('while') === 0
          || /* contains */stt[i + 1].trim().indexOf('switch') === 0
          || /* contains */stt[i + 1].trim().indexOf('else') === 0) {
            funcx.info = '1';
            funcx.text = 'if';
            qin = 1;
            continue;
          }
          if (/* contains */stt[i + 1].indexOf(';') !== -1) {
            cin++;
            funcx.textq += '\n' + stt[i + 1];
            funcx.fullTextq += '\n' + stt[i + 1];
            i++;
            //
            if (i + 1 < stt.length) {
              if (stt[i + 1].trim().indexOf('else') === 0 && qin === 1) {
                continue;
              }
            }
            //
          }
          funcx.fullTextq = /* replaceAll */funcx.fullTextq.replace(new
          RegExp('for([ ]*)\\(([^,:]*)(,)([^,]*)(,)([^\\)]*)\\)', 'g'), ' for$1($2;$4;$6) ');
          funcx.info = cin + '';
          if (qin === 1) {
            funcx.info = cin + '';
            funcx.deepth = Math.max(this.build(funcx.textq, flagCbra).deepth + 1, funcx.deepth);
            funcx.ref = this.build(funcx.textq, flagCbra).ref;
          }
          functionx = functionx.add(funcx);
          funcx.textq = '';
          cin = 0;
          qin = 0;
          funcx.deepth = 1;
          funcx.fullTextq = '';
        } else {
          for (let j: number = i + 1; j < stt.length; j++) {
            if (/* contains */stt[j].indexOf('{') !== -1) {
              if (flagCbra) {
                cin++;
              }
              funcx.fullTextq += '\n' + stt[j];
              if (cq !== 0 || qin === 1) {
                funcx.textq += '\n' + stt[j];
              }
              cq++;
            } else {
              if (/* contains */stt[j].indexOf('}') !== -1) {
                if (flagCbra) {
                  cin++;
                }
                funcx.fullTextq += '\n' + stt[j];
                cq--;
                if (cq === 0) {
                  if (qin === 1) {
                    funcx.textq += '\n' + stt[j];
                    funcx.info = cin + '';
                    if (j + 1 < stt.length) {
                      if (stt[j + 1].trim().indexOf('else') === 0 && qin === 1) {
                        i = j;
                        break;
                      }
                    }
                  } else {
                    funcx.info = cin + '';
                    funcx.text = 'if';
                    funcx.ref = null;
                  }
                  funcx.info = cin + '';
                  if (/* contains */funcx.textq.indexOf('\n{') !== -1
                  || /* contains */funcx.textq.indexOf('{') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)case', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('case') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)for', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('for') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)if', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('if') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)else', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('else') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)switch', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('switch') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)while', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('while') === 0) {
                    funcx.deepth = Math.max(this.build(funcx.textq, flagCbra).deepth + 1, funcx.deepth);
                    funcx.ref = this.build(funcx.textq, flagCbra).ref;
                  }
                  funcx.fullTextq = /* replaceAll */funcx.fullTextq.replace(new
                  RegExp('for([ ]*)\\(([^,:]*)(,)([^,]*)(,)([^\\)]*)\\)', 'g'), ' for$1($2;$4;$6) ');
                  functionx = functionx.add(funcx);
                  cin = 0;
                  cq = 0;
                  i = j;
                  qin = 0;
                  funcx.textq = '';
                  funcx.deepth = 1;
                  funcx.fullTextq = '';
                  break;
                } else {
                  funcx.textq += '\n' + stt[j];
                }
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
        if (qin === 1) {
          funcx.textq += '\n' + stt[i];
          funcx.info = cin + '';
        }
        while (/* contains */stt[i + 1].trim().indexOf('//') === 0 ||
        /* contains */stt[i + 1].trim().indexOf('/*') === 0) {
          funcx.textq += '\n' + stt[i + 1];
          funcx.fullTextq += '\n' + stt[i + 1];
          i++;
        }
        cin++;
        if (count !== 0) {
          funcx.info = count + '';
          funcx.text = 'Variable Deceleration';
          funcx.ref = null;
          funcx.fullTextq = /* replaceAll */funcx.fullTextq.replace(new
          RegExp('for([ ]*)\\(([^,:]*)(,)([^,]*)(,)([^\\)]*)\\)', 'g'), ' for$1($2;$4;$6) ');
          functionx = functionx.add(funcx);
          funcx.textq = '';
          funcx.deepth = 1;
          count = 0;
          stq = '';
        }
        if (/* contains */stt[i + 1].indexOf('{') !== -1 === false) {
          if (qin === 0) {
            funcx.info = '1';
            funcx.text = 'while';
          }
          funcx.ref = null;
          if (/* contains */stt[i + 1].trim().indexOf('if') === 0
          || /* contains */stt[i + 1].trim().indexOf('for') === 0
          || /* contains */stt[i + 1].trim().indexOf('while') === 0
          || /* contains */stt[i + 1].trim().indexOf('switch') === 0
          || /* contains */stt[i + 1].trim().indexOf('else') === 0) {
            funcx.info = '1';
            funcx.text = 'while';
            qin = 1;
            continue;
          }
          if (/* contains */stt[i + 1].indexOf(';') !== -1) {
            cin++;
            funcx.textq += '\n' + stt[i + 1];
            funcx.fullTextq += '\n' + stt[i + 1];
            i++;
          }
          funcx.info = cin + '';
          funcx.fullTextq = /* replaceAll */funcx.fullTextq.replace(new
          RegExp('for([ ]*)\\(([^,:]*)(,)([^,]*)(,)([^\\)]*)\\)', 'g'), ' for$1($2;$4;$6) ');
          if (qin === 1) {
            funcx.info = cin + '';
            funcx.deepth = Math.max(this.build(funcx.textq, flagCbra).deepth + 1, funcx.deepth);
            funcx.ref = this.build(funcx.textq, flagCbra).ref;
          }
          functionx = functionx.add(funcx);
          funcx.textq = '';
          funcx.deepth = 1;
          qin = 0;
          cin = 0;
          funcx.fullTextq = '';
        } else {
          for (let j: number = i + 1; j < stt.length; j++) {
            if (/* contains */stt[j].indexOf('{') !== -1) {
              if (flagCbra) {
                cin++;
              }
              funcx.fullTextq += '\n' + stt[j];
              if (cq !== 0 || qin === 1) {
                funcx.textq += '\n' + stt[j];
              }
              cq++;
            } else {
              if (/* contains */stt[j].indexOf('}') !== -1) {
                if (flagCbra) {
                  cin++;
                }
                funcx.fullTextq += '\n' + stt[j];
                cq--;
                if (cq === 0) {
                  if (qin === 1) {
                    funcx.textq += '\n' + stt[j];
                    funcx.info = cin + '';
                  } else {
                    funcx.info = cin + '';
                    funcx.text = 'while';
                    funcx.ref = null;
                  }
                  if (/* contains */funcx.textq.indexOf('\n{') !== -1
                  || /* contains */funcx.textq.indexOf('{') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)case', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('case') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)for', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('for') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)if', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('if') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)else', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('else') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)switch', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('switch') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)while', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('while') === 0) {
                    funcx.deepth = Math.max(this.build(funcx.textq, flagCbra).deepth + 1, funcx.deepth);
                    funcx.ref = this.build(funcx.textq, flagCbra).ref;
                  }
                  funcx.fullTextq = /* replaceAll */funcx.fullTextq.replace(new
                  RegExp('for([ ]*)\\(([^,:]*)(,)([^,]*)(,)([^\\)]*)\\)', 'g'), ' for$1($2;$4;$6) ');
                  functionx = functionx.add(funcx);
                  cin = 0;
                  cq = 0;
                  i = j;
                  qin = 0;
                  funcx.textq = '';
                  funcx.deepth = 1;
                  funcx.fullTextq = '';
                  break;
                } else {
                  funcx.textq += '\n' + stt[j];
                }
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
                  funcx.textq += '\n' + stt[j];
                  funcx.fullTextq += '\n' + stt[j];
                }
              }
            }
          }
        }
      }
      if (/* contains */(stt[i].toLowerCase()).trim().indexOf('do') === 0) {
        funcx.fullTextq += '\n' + stt[i];
        if (qin === 1) {
          funcx.textq += '\n' + stt[i];
          funcx.info = cin + '';
        }
        while (/* contains */stt[i + 1].trim().indexOf('//') === 0 ||
        /* contains */stt[i + 1].trim().indexOf('/*') === 0) {
          funcx.textq += '\n' + stt[i + 1];
          funcx.fullTextq += '\n' + stt[i + 1];
          i++;
        }
        cin++;
        if (count !== 0) {
          funcx.info = count + '';
          funcx.text = 'Variable Deceleration';
          funcx.ref = null;
          funcx.fullTextq = /* replaceAll */funcx.fullTextq.replace(new
          RegExp('for([ ]*)\\(([^,:]*)(,)([^,]*)(,)([^\\)]*)\\)', 'g'), ' for$1($2;$4;$6) ');
          functionx = functionx.add(funcx);
          funcx.textq = '';
          funcx.deepth = 1;
          count = 0;
          stq = '';
        }
        if (/* contains */stt[i + 1].indexOf('{') !== -1 === false) {
          if (qin === 0) {
            funcx.info = '1';
            funcx.text = 'while';
          }
          funcx.ref = null;
          if (/* contains */stt[i + 1].trim().indexOf('if') === 0
          || /* contains */stt[i + 1].trim().indexOf('for') === 0
          || /* contains */stt[i + 1].trim().indexOf('while') === 0
          || /* contains */stt[i + 1].trim().indexOf('switch') === 0
          || /* contains */stt[i + 1].trim().indexOf('else') === 0) {
            funcx.info = '1';
            funcx.text = 'while';
            qin = 1;
            continue;
          }
          if (/* contains */stt[i + 1].indexOf(';') !== -1) {
            cin++;
            funcx.textq += '\n' + stt[i + 1];
            funcx.fullTextq += '\n' + stt[i + 1];
            i++;
            funcx.fullTextq += '\n' + stt[i + 1];
            i++;
          }
          funcx.info = cin + '';
          funcx.fullTextq = /* replaceAll */funcx.fullTextq.replace(new
          RegExp('for([ ]*)\\(([^,:]*)(,)([^,]*)(,)([^\\)]*)\\)', 'g'), ' for$1($2;$4;$6) ');
          if (qin === 1) {
            funcx.info = cin + '';
            funcx.deepth = Math.max(this.build(funcx.textq, flagCbra).deepth + 1, funcx.deepth);
            funcx.ref = this.build(funcx.textq, flagCbra).ref;
          }
          functionx = functionx.add(funcx);
          funcx.textq = '';
          funcx.deepth = 1;
          qin = 0;
          cin = 0;
          funcx.fullTextq = '';
        } else {
          for (let j: number = i + 1; j < stt.length; j++) {
            if (/* contains */stt[j].indexOf('{') !== -1) {
              if (flagCbra) {
                cin++;
              }
              funcx.fullTextq += '\n' + stt[j];
              if (cq !== 0 || qin === 1) {
                funcx.textq += '\n' + stt[j];
              }
              cq++;
            } else {
              if (/* contains */stt[j].indexOf('}') !== -1) {
                if (flagCbra) {
                  cin++;
                }
                funcx.fullTextq += '\n' + stt[j];
                cq--;
                if (cq === 0) {
                  funcx.fullTextq += '\n' + stt[j + 1];
                  j++;
                  if (qin === 1) {
                    funcx.textq += '\n' + stt[j];
                    funcx.info = cin + '';
                  } else {
                    funcx.info = cin + '';
                    funcx.text = 'while';
                    funcx.ref = null;
                  }
                  if (/* contains */funcx.textq.indexOf('\n{') !== -1
                  || /* contains */funcx.textq.indexOf('{') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)case', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('case') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)for', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('for') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)if', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('if') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)else', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('else') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)switch', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('switch') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)while', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('while') === 0) {
                    funcx.deepth = Math.max(this.build(funcx.textq, flagCbra).deepth + 1, funcx.deepth);
                    funcx.ref = this.build(funcx.textq, flagCbra).ref;
                  }
                  funcx.fullTextq = /* replaceAll */funcx.fullTextq.replace(new
                  RegExp('for([ ]*)\\(([^,:]*)(,)([^,]*)(,)([^\\)]*)\\)', 'g'), ' for$1($2;$4;$6) ');
                  functionx = functionx.add(funcx);
                  cin = 0;
                  cq = 0;
                  i = j;
                  qin = 0;
                  funcx.textq = '';
                  funcx.deepth = 1;
                  funcx.fullTextq = '';
                  break;
                } else {
                  funcx.textq += '\n' + stt[j];
                }
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
        if (qin === 1) {
          funcx.textq += '\n' + stt[i];
          funcx.info = cin + '';
        }
        while (/* contains */stt[i + 1].trim().indexOf('//') === 0 ||
        /* contains */stt[i + 1].trim().indexOf('/*') === 0) {
          funcx.textq += '\n' + stt[i + 1];
          funcx.fullTextq += '\n' + stt[i + 1];
          i++;
        }
        cin++;
        if (count !== 0) {
          funcx.info = count + '';
          funcx.text = 'Variable Deceleration';
          funcx.ref = null;
          funcx.fullTextq = /* replaceAll */funcx.fullTextq.replace(new
          RegExp('for([ ]*)\\(([^,:]*)(,)([^,]*)(,)([^\\)]*)\\)', 'g'), ' for$1($2;$4;$6) ');
          functionx = functionx.add(funcx);
          funcx.textq = '';
          funcx.deepth = 1;
          count = 0;
          stq = '';
        }
        if (/* contains */stt[i + 1].indexOf('{') !== -1 === false) {
          if (qin === 0) {
            funcx.text = 'switch';
            funcx.info = '1';
          }
          funcx.ref = null;
          funcx.fullTextq = /* replaceAll */funcx.fullTextq.replace(new
          RegExp('for([ ]*)\\(([^,:]*)(,)([^,]*)(,)([^\\)]*)\\)', 'g'), ' for$1($2;$4;$6) ');
          if (qin === 1) {
            funcx.deepth = Math.max(this.build(funcx.textq, flagCbra).deepth + 1, funcx.deepth);
            funcx.ref = this.build(funcx.textq, flagCbra).ref;
          }
          functionx = functionx.add(funcx);
          cin++;
          funcx.fullTextq = '\n' + stt[i + 1];
          funcx.textq = '';
          funcx.deepth = 1;
          cin = 0;
        } else {
          for (let j: number = i + 1; j < stt.length; j++) {
            if (/* contains */stt[j].indexOf('{') !== -1) {
              if (flagCbra) {
                cin++;
              }
              funcx.fullTextq += '\n' + stt[j];
              if (cq !== 0 || qin === 1) {
                funcx.textq += '\n' + stt[j];
              }
              cq++;
            } else {
              if (/* contains */stt[j].indexOf('}') !== -1) {
                cq--;
                if (flagCbra) {
                  cin++;
                }
                funcx.fullTextq += '\n' + stt[j];
                if (cq === 0) {
                  if (qin === 1) {
                    funcx.textq += '\n' + stt[j];
                    funcx.info = cin + '';
                  } else {
                    funcx.info = cin + '';
                    funcx.text = 'switch';
                    funcx.ref = null;
                  }
                  if (/* contains */funcx.textq.indexOf('\n{') !== -1
                  || /* contains */funcx.textq.indexOf('{') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)case', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('case') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)for', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('for') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)if', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('if') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)else', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('else') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)switch', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('switch') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) {
                      return o1.equals(o2);
                    } else {
                      return o1 === o2;
                    }
                  })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)while', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('while') === 0) {
                    funcx.deepth = Math.max(this.build(funcx.textq, flagCbra).deepth + 1, funcx.deepth);
                    funcx.ref = this.build(funcx.textq, flagCbra).ref;
                  }
                  funcx.fullTextq = /* replaceAll */funcx.fullTextq.replace(new
                  RegExp('for([ ]*)\\(([^,:]*)(,)([^,]*)(,)([^\\)]*)\\)', 'g'), ' for$1($2;$4;$6) ');
                  functionx = functionx.add(funcx);
                  cin = 0;
                  cq = 0;
                  i = j;
                  qin = 0;
                  funcx.textq = '';
                  funcx.deepth = 1;
                  funcx.fullTextq = '';
                  break;
                } else {
                  cin++;
                  funcx.textq += '\n' + stt[j];
                  funcx.fullTextq += '\n' + stt[j];
                  funcx.info = cin + '';
                }
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
                  funcx.textq += '\n' + stt[j];
                  funcx.info = cin + '';
                }
              }
            }
          }
        }
      }
      if (/* contains */(stt[i].toLowerCase()).trim().indexOf('case') === 0) {
        funcx.fullTextq += '\n' + stt[i];
        while (/* contains */stt[i + 1].trim().indexOf('//') === 0 ||
        /* contains */stt[i + 1].trim().indexOf('/*') === 0) {
          funcx.textq += '\n' + stt[i + 1];
          funcx.fullTextq += '\n' + stt[i + 1];
          i++;
        }
        cin++;
        if (count !== 0) {
          funcx.info = count + '';
          funcx.text = 'Variable Deceleration';
          funcx.ref = null;
          funcx.fullTextq = /* replaceAll */funcx.fullTextq.replace(new
          RegExp('for([ ]*)\\(([^,:]*)(,)([^,]*)(,)([^\\)]*)\\)', 'g'), ' for$1($2;$4;$6) ');
          functionx = functionx.add(funcx);
          funcx.textq = '';
          funcx.deepth = 1;
          funcx.ref = null;
          count = 0;
          stq = '';
        }
        if ( stt.length === i + 2 ) {
          funcx.info = cin + '';
          funcx.text = 'case';
          funcx.textq += '\n' + stt[i + 1];
          cin++;
          funcx.fullTextq += '\n' + stt[i + 1];
          funcx.fullTextq = /* replaceAll */funcx.fullTextq.replace(new
          RegExp('for([ ]*)\\(([^,:]*)(,)([^,]*)(,)([^\\)]*)\\)', 'g'), ' for$1($2;$4;$6) ');
          functionx = functionx.add(funcx);
          cin = 0;
          cq = 0;
          caseV = 0;
          qin = 0;
          funcx.textq = '';
          funcx.deepth = 1;
          funcx.ref = null;
          funcx.fullTextq = '';
          break;
        }
        if ((/* contains */(stt[i + 1].toLowerCase()).trim().indexOf('break') === 0 &&
            (/* contains */(stt[i + 2].toLowerCase()).trim().indexOf('}') === 0 ||
              (/* contains */(stt[i + 2].toLowerCase()).trim().indexOf('case') === 0 &&
                /* contains */(stt[i + 1].toLowerCase()).trim().indexOf('case') === 0)) ||
            /* contains */(stt[i + 2].toLowerCase()).trim().indexOf('default') === 0) ||
          (/* contains */(stt[i + 1].toLowerCase()).trim().indexOf('case') === 0 &&
            /* contains */(stt[i].toLowerCase()).trim().indexOf('case') === 0)) {
          funcx.info = '1';
          funcx.text = 'case';
          funcx.textq += '\n' + stt[i + 1];
          cin++;
          funcx.fullTextq += '\n' + stt[i + 1];
          funcx.ref = null;
          funcx.fullTextq = /* replaceAll */funcx.fullTextq.replace(new
          RegExp('for([ ]*)\\(([^,:]*)(,)([^,]*)(,)([^\\)]*)\\)', 'g'), ' for$1($2;$4;$6) ');
          functionx = functionx.add(funcx);
          funcx.textq = '';
          funcx.deepth = 1;
          qin = 0;
          funcx.fullTextq = '';
          cin = 0;
        } else {
          if (/* contains */(stt[i + 1].toLowerCase()).trim().indexOf('{') === 0) {
            caseV = 1;
          }
          for (let j: number = i + 1; j < stt.length; j++) {
            while (/* contains */stt[j].trim().indexOf('//') === 0 ||
            /* contains */stt[j].trim().indexOf('/*') === 0) {
              funcx.textq += '\n' + stt[j];
              funcx.fullTextq += '\n' + stt[j];
              j++;
              if (j === stt.length - 1) {
                break;
              }
            }
            if (/* contains */(stt[j].toLowerCase()).trim().indexOf('{') === 0) {
              caseIf++;
            }
            if (/* contains */(stt[j].toLowerCase()).trim().indexOf('}') === 0) {
              caseIf--;
            }
            if ((/* contains */(stt[i + 1].toLowerCase()).trim().indexOf('break') === 0 &&
                (/* contains */(stt[i + 2].toLowerCase()).trim().indexOf('}') === 0 ||
                  /* contains */(stt[i + 2].toLowerCase()).trim().indexOf('case') === 0) ||
                /* contains */(stt[i + 2].toLowerCase()).trim().indexOf('default') === 0) ||
              (/* contains */(stt[j].toLowerCase()).trim().indexOf('break') === 0 && caseV === 0)) {
              funcx.info = cin + '';
              funcx.text = 'case';
              funcx.textq += '\n' + stt[j];
              cin++;
              funcx.fullTextq += '\n' + stt[j];
              if (stt.length > j + 1 ) {
                if ((stt[j + 1].toLowerCase()).trim().indexOf('}') === 0 ) {
                  funcx.textq += '\n' + stt[j + 1];
                  funcx.fullTextq += '\n' + stt[j + 1];
                }
              }
              funcx.ref = null;
              if (/* contains */funcx.textq.indexOf('\n{') !== -1
              || /* contains */funcx.textq.indexOf('{') === 0
              || !/* equals */(<any>((o1: any, o2: any) => {
                if (o1 && o1.equals) {
                  return o1.equals(o2);
                } else {
                  return o1 === o2;
                }
              })
              (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
              ('\n([ ]*)case', 'g'), ' '), funcx.textq.toLowerCase().trim()))
              || /* contains */funcx.textq.toLowerCase().trim().indexOf('case') === 0
              || !/* equals */(<any>((o1: any, o2: any) => {
                if (o1 && o1.equals) {
                  return o1.equals(o2);
                } else {
                  return o1 === o2;
                }
              })
              (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
              ('\n([ ]*)for', 'g'), ' '), funcx.textq.toLowerCase().trim()))
              || /* contains */funcx.textq.toLowerCase().trim().indexOf('for') === 0
              || !/* equals */(<any>((o1: any, o2: any) => {
                if (o1 && o1.equals) {
                  return o1.equals(o2);
                } else {
                  return o1 === o2;
                }
              })
              (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
              ('\n([ ]*)if', 'g'), ' '), funcx.textq.toLowerCase().trim()))
              || /* contains */funcx.textq.toLowerCase().trim().indexOf('if') === 0
              || !/* equals */(<any>((o1: any, o2: any) => {
                if (o1 && o1.equals) {
                  return o1.equals(o2);
                } else {
                  return o1 === o2;
                }
              })
              (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
              ('\n([ ]*)else', 'g'), ' '), funcx.textq.toLowerCase().trim()))
              || /* contains */funcx.textq.toLowerCase().trim().indexOf('else') === 0
              || !/* equals */(<any>((o1: any, o2: any) => {
                if (o1 && o1.equals) {
                  return o1.equals(o2);
                } else {
                  return o1 === o2;
                }
              })
              (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
              ('\n([ ]*)switch', 'g'), ' '), funcx.textq.toLowerCase().trim()))
              || /* contains */funcx.textq.toLowerCase().trim().indexOf('switch') === 0
              || !/* equals */(<any>((o1: any, o2: any) => {
                if (o1 && o1.equals) {
                  return o1.equals(o2);
                } else {
                  return o1 === o2;
                }
              })
              (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
              ('\n([ ]*)while', 'g'), ' '), funcx.textq.toLowerCase().trim()))
              || /* contains */funcx.textq.toLowerCase().trim().indexOf('while') === 0) {
                funcx.deepth = Math.max(this.build(funcx.textq, flagCbra).deepth + 1, funcx.deepth);
                funcx.ref = this.build(funcx.textq, flagCbra).ref;
              }
              funcx.fullTextq = /* replaceAll */funcx.fullTextq.replace(new
              RegExp('for([ ]*)\\(([^,:]*)(,)([^,]*)(,)([^\\)]*)\\)', 'g'), ' for$1($2;$4;$6) ');
              functionx = functionx.add(funcx);
              cin = 0;
              cq = 0;
              caseV = 0;
              i = j;
              qin = 0;
              funcx.textq = '';
              funcx.deepth = 1;
              funcx.ref = null;
              funcx.fullTextq = '';
              break;
            } else {
              if (j === stt.length - 1 || (/* contains */stt[j + 1].toLowerCase().trim().indexOf('case') === 0 && caseIf === 0)
                || (/* contains */stt[j + 1].toLowerCase().trim().indexOf('default') === 0 && caseIf === 0 )) {
                funcx.info = cin + '';
                funcx.text = 'case';
                funcx.textq += '\n' + stt[j];
                cin++;
                funcx.fullTextq += '\n' + stt[j];
                funcx.ref = null;
                if (/* contains */funcx.textq.indexOf('\n{') !== -1
                || /* contains */funcx.textq.indexOf('{') === 0
                || !/* equals */(<any>((o1: any, o2: any) => {
                  if (o1 && o1.equals) {
                    return o1.equals(o2);
                  } else {
                    return o1 === o2;
                  }
                })
                (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                ('\n([ ]*)case', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                || /* contains */funcx.textq.toLowerCase().trim().indexOf('case') === 0
                || !/* equals */(<any>((o1: any, o2: any) => {
                  if (o1 && o1.equals) {
                    return o1.equals(o2);
                  } else {
                    return o1 === o2;
                  }
                })
                (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                ('\n([ ]*)for', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                || /* contains */funcx.textq.toLowerCase().trim().indexOf('for') === 0
                || !/* equals */(<any>((o1: any, o2: any) => {
                  if (o1 && o1.equals) {
                    return o1.equals(o2);
                  } else {
                    return o1 === o2;
                  }
                })
                (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                ('\n([ ]*)if', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                || /* contains */funcx.textq.toLowerCase().trim().indexOf('if') === 0
                || !/* equals */(<any>((o1: any, o2: any) => {
                  if (o1 && o1.equals) {
                    return o1.equals(o2);
                  } else {
                    return o1 === o2;
                  }
                })
                (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                ('\n([ ]*)else', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                || /* contains */funcx.textq.toLowerCase().trim().indexOf('else') === 0
                || !/* equals */(<any>((o1: any, o2: any) => {
                  if (o1 && o1.equals) {
                    return o1.equals(o2);
                  } else {
                    return o1 === o2;
                  }
                })
                (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                ('\n([ ]*)switch', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                || /* contains */funcx.textq.toLowerCase().trim().indexOf('switch') === 0
                || !/* equals */(<any>((o1: any, o2: any) => {
                  if (o1 && o1.equals) {
                    return o1.equals(o2);
                  } else {
                    return o1 === o2;
                  }
                })
                (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                ('\n([ ]*)while', 'g'), ' '), funcx.textq.toLowerCase().trim()))
                || /* contains */funcx.textq.toLowerCase().trim().indexOf('while') === 0) {
                  funcx.deepth = Math.max(this.build(funcx.textq, flagCbra).deepth + 1, funcx.deepth);
                  funcx.ref = this.build(funcx.textq, flagCbra).ref;
                }
                funcx.fullTextq = /* replaceAll */funcx.fullTextq.replace(new
                RegExp('for([ ]*)\\(([^,:]*)(,)([^,]*)(,)([^\\)]*)\\)', 'g'), ' for$1($2;$4;$6) ');
                functionx = functionx.add(funcx);
                cin = 0;
                cq = 0;
                caseV = 0;
                i = j;
                qin = 0;
                funcx.textq = '';
                funcx.deepth = 1;
                funcx.ref = null;
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
                  funcx.textq += '\n' + stt[j];
                }
              }
            }
          }
        }
      }
      if (/* contains */stt[i].toLowerCase().trim().indexOf('default') === 0) {
        if (stt.length > i) {
          funcx.textq += '\n' + stt[i];
          funcx.fullTextq += '\n' + stt[i];
          funcx.text = 'case';
          funcx.info = '1';
          functionx = functionx.add(funcx);
          cin = 0;
          cq = 0;
          qin = 0;
          funcx.textq = '';
          funcx.ref = null;
          funcx.deepth = 1;
          funcx.fullTextq = '';
          break;
        } else {
          funcx.fullTextq += '\n' + stt[i];
        while (/* contains */stt[i + 1].trim().indexOf('//') === 0 ||
        /* contains */stt[i + 1].trim().indexOf('/*') === 0) {
          funcx.textq += '\n' + stt[i + 1];
          funcx.fullTextq += '\n' + stt[i + 1];
          i++;
        }
        cin++;
        if (count !== 0) {
          funcx.info = count + '';
          funcx.text = 'Variable Deceleration';
          funcx.ref = null;
          funcx.fullTextq = /* replaceAll */funcx.fullTextq.replace(new
          RegExp('for([ ]*)\\(([^,:]*)(,)([^,]*)(,)([^\\)]*)\\)', 'g'), ' for$1($2;$4;$6) ');
          functionx = functionx.add(funcx);
          funcx.textq = '';
          funcx.deepth = 1;
          funcx.ref = null;
          count = 0;
          stq = '';
        }
        for (let j: number = i + 1; j < stt.length; j++) {
          if (j === stt.length - 1) {
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
              funcx.textq += '\n' + stt[j];
              funcx.fullTextq += '\n' + stt[j];
            }
            funcx.info = cin + '';
            funcx.text = 'case';
            funcx.ref = null;
            if (/* contains */funcx.textq.indexOf('\n{') !== -1
            || /* contains */funcx.textq.indexOf('{') === 0
            || !/* equals */(<any>((o1: any, o2: any) => {
              if (o1 && o1.equals) {
                return o1.equals(o2);
              } else {
                return o1 === o2;
              }
            })
            (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
            ('\n([ ]*)case', 'g'), ' '), funcx.textq.toLowerCase().trim()))
            || /* contains */funcx.textq.toLowerCase().trim().indexOf('case') === 0
            || !/* equals */(<any>((o1: any, o2: any) => {
              if (o1 && o1.equals) {
                return o1.equals(o2);
              } else {
                return o1 === o2;
              }
            })
            (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
            ('\n([ ]*)for', 'g'), ' '), funcx.textq.toLowerCase().trim()))
            || /* contains */funcx.textq.toLowerCase().trim().indexOf('for') === 0
            || !/* equals */(<any>((o1: any, o2: any) => {
              if (o1 && o1.equals) {
                return o1.equals(o2);
              } else {
                return o1 === o2;
              }
            })
            (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
            ('\n([ ]*)if', 'g'), ' '), funcx.textq.toLowerCase().trim()))
            || /* contains */funcx.textq.toLowerCase().trim().indexOf('if') === 0
            || !/* equals */(<any>((o1: any, o2: any) => {
              if (o1 && o1.equals) {
                return o1.equals(o2);
              } else {
                return o1 === o2;
              }
            })
            (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
            ('\n([ ]*)else', 'g'), ' '), funcx.textq.toLowerCase().trim()))
            || /* contains */funcx.textq.toLowerCase().trim().indexOf('else') === 0
            || !/* equals */(<any>((o1: any, o2: any) => {
              if (o1 && o1.equals) {
                return o1.equals(o2);
              } else {
                return o1 === o2;
              }
            })
            (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
            ('\n([ ]*)switch', 'g'), ' '), funcx.textq.toLowerCase().trim()))
            || /* contains */funcx.textq.toLowerCase().trim().indexOf('switch') === 0
            || !/* equals */(<any>((o1: any, o2: any) => {
              if (o1 && o1.equals) {
                return o1.equals(o2);
              } else {
                return o1 === o2;
              }
            })
            (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
            ('\n([ ]*)while', 'g'), ' '), funcx.textq.toLowerCase().trim()))
            || /* contains */funcx.textq.toLowerCase().trim().indexOf('while') === 0) {
              funcx.deepth = Math.max(this.build(funcx.textq, flagCbra).deepth + 1, funcx.deepth);
              funcx.ref = this.build(funcx.textq, flagCbra).ref;
            }
            funcx.fullTextq = /* replaceAll */funcx.fullTextq.replace(new
            RegExp('for([ ]*)\\(([^,:]*)(,)([^,]*)(,)([^\\)]*)\\)', 'g'), ' for$1($2;$4;$6) ');
            functionx = functionx.add(funcx);
            cin = 0;
            cq = 0;
            i = j;
            qin = 0;
            funcx.textq = '';
            funcx.deepth = 1;
            funcx.ref = null;
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
              funcx.textq += '\n' + stt[j];
              funcx.fullTextq += '\n' + stt[j];
            }
          }
        }
      }
    }
      if (/* contains */(stt[i].toLowerCase()).trim().indexOf('else') === 0) {
        funcx.fullTextq += '\n' + stt[i];
        while (/* contains */stt[i + 1].trim().indexOf('//') === 0 ||
        /* contains */stt[i + 1].trim().indexOf('/*') === 0 ) {
          funcx.textq += '\n' + stt[i + 1];
          funcx.fullTextq += '\n' + stt[i + 1];
          i++;
        }
        cin++;
        if (count !== 0) {
          funcx.info = count + '';
          funcx.text = 'Variable Deceleration';
          funcx.ref = null;
          funcx.fullTextq = /* replaceAll */funcx.fullTextq.replace(new
          RegExp('for([ ]*)\\(([^,:]*)(,)([^,]*)(,)([^\\)]*)\\)', 'g'), ' for$1($2;$4;$6) ');
          functionx = functionx.add(funcx);
          funcx.textq = '';
          funcx.deepth = 1;
          count = 0;
          stq = '';
        }
        if (/* contains */stt[i + 1].indexOf('{') !== -1 === false) {
          //
          if ( qin === 0) {
            funcx.info = '1';
            funcx.text = 'else';
          }
          //
          funcx.ref = null;
          if (/* contains */stt[i + 1].trim().indexOf('if') === 0
          || /* contains */stt[i + 1].trim().indexOf('for') === 0
          || /* contains */stt[i + 1].trim().indexOf('while') === 0
          || /* contains */stt[i + 1].trim().indexOf('switch') === 0
          || /* contains */stt[i + 1].trim().indexOf('else') === 0) {
            if (qin === 0 ) {
              funcx.info = '1';
              funcx.text = 'else';
            }
            //
            if (qin === 1) {
              funcx.textq += '\n' + stt[i];
            }
            //
            qin = 1 ;
            continue;
          }
          if (/* contains */stt[i + 1].indexOf(';') !== -1) {
            cin++;
            funcx.textq += '\n' + stt[i + 1];
            funcx.fullTextq += '\n' + stt[i + 1];
            i++;
          }
          funcx.fullTextq = /* replaceAll */funcx.fullTextq.replace(new
          RegExp('for([ ]*)\\(([^,:]*)(,)([^,]*)(,)([^\\)]*)\\)', 'g'), ' for$1($2;$4;$6) ');
          funcx.info = cin + '';
          if ( qin === 1) {
            funcx.info = cin + '';
            funcx.deepth = Math.max(this.build(funcx.textq , flagCbra).deepth + 1 , funcx.deepth);
            funcx.ref = this.build(funcx.textq , flagCbra).ref;
          }
          functionx = functionx.add(funcx);
          funcx.textq = '';
          funcx.deepth = 1;
          qin = 0;
          funcx.fullTextq = '';
          cin = 0;
        } else {
          if (qin === 1) {
            funcx.textq += '\n' + stt[i];
          }
          for (let j: number = i + 1; j < stt.length; j++) {
            if (/* contains */stt[j].indexOf('{') !== -1) {
              if (flagCbra) {
                cin++;
              }              funcx.fullTextq += '\n' + stt[j];
              if (cq !== 0 || qin === 1) {
                funcx.textq += '\n' + stt[j];
              }
              cq++;
            } else {
              if (/* contains */stt[j].indexOf('}') !== -1) {
                if (flagCbra) {
                  cin++;
                }                funcx.fullTextq += '\n' + stt[j];
                cq--;
                if (cq === 0) {
                  if (qin === 1) {
                    funcx.textq += '\n' + stt[j];
                  }
                  funcx.info = cin + '';
                  funcx.text = 'else';
                  funcx.ref = null;
                  if (/* contains */funcx.textq.indexOf('\n{') !== -1
                  || /* contains */funcx.textq.indexOf('{') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)case', 'g'), ' ' ), funcx.textq.toLowerCase().trim() ))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('case') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)for', 'g'), ' ' ), funcx.textq.toLowerCase().trim() ))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('for') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)if', 'g'), ' ' ), funcx.textq.toLowerCase().trim() ))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('if') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)else', 'g'), ' ' ), funcx.textq.toLowerCase().trim() ))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('else') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)switch', 'g'), ' ' ), funcx.textq.toLowerCase().trim() ))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('switch') === 0
                  || !/* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })
                  (/* replaceAll */funcx.textq.toLowerCase().trim().replace(new RegExp
                  ('\n([ ]*)while', 'g'), ' ' ), funcx.textq.toLowerCase().trim() ))
                  || /* contains */funcx.textq.toLowerCase().trim().indexOf('while') === 0) {
                    funcx.deepth = Math.max(this.build(funcx.textq , flagCbra).deepth + 1 , funcx.deepth);
                    funcx.ref = this.build(funcx.textq , flagCbra).ref;
                  } else {
                    if ( qin === 1) {
                      funcx.info = cin + '';
                      funcx.deepth = Math.max(this.build(funcx.textq , flagCbra).deepth + 1 , funcx.deepth);
                      funcx.ref = this.build(funcx.textq , flagCbra).ref;
                    }
                  }
                  funcx.fullTextq = /* replaceAll */funcx.fullTextq.replace(new
                  RegExp('for([ ]*)\\(([^,:]*)(,)([^,]*)(,)([^\\)]*)\\)', 'g'), ' for$1($2;$4;$6) ');
                  functionx = functionx.add(funcx);
                  cin = 0;
                  cq = 0;
                  i = j;
                  qin = 0;
                  funcx.textq = '';
                  funcx.deepth = 1;
                  funcx.fullTextq = '';
                  break;
                } else {
                  funcx.textq += '\n' + stt[j];
                }
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
                  funcx.textq += '\n' + stt[j];
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
      funcx.fullTextq = /* replaceAll */funcx.fullTextq.replace(new
      RegExp('for([ ]*)\\(([^,:]*)(,)([^,]*)(,)([^\\)]*)\\)', 'g'), ' for$1($2;$4;$6) ');
      functionx = functionx.add(funcx);
      funcx.textq = '';
      funcx.deepth = 1;
      count = 0;
      stq = null;
    }
    return functionx;
  }
  public add(__function: Ast): Ast {
    let x: Ast[];
    let max ;
    max = 0;
    if (this.ref != null) {
      x = new Array(this.ref.length + 1);
    } else {
      x = new Array(1);
    }
    let i = 0;
    if (this.ref != null) {
      for (i = 0; i < this.ref.length; i++) {
        max = Math.max(max , this.ref[i].deepth);
        x[i] = this.ref[i];
      }
    }
    x[i] = new Ast();
    x[i].info = __function.info;
    x[i].text = __function.text;
    x[i].textq = __function.textq;
    x[i].fullTextq = __function.fullTextq;
    x[i].deepth = __function.deepth;
    if (__function.ref != null) {
      x[i].ref = new Array(__function.ref.length);
      for (let j = 0; j < __function.ref.length; j++) {
        x[i].ref[j] = __function.ref[j];
      }
    }
    this.deepth = Math.max(__function.deepth , this.deepth);
    this.ref = x;
    return this;
  }




  constructor() {
    this.info = null;
    this.text = null;
    this.textq = null;
    this.ref = null;
    this.deepth = 0;
    this.fullTextq = '';
  }
}

