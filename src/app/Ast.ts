export class Ast {
  public info: string;

  public text: string;

  public textq: string;

  public fullTextq: string;

  public ref: Ast[];

  static are(): Ast {
    return null;
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

