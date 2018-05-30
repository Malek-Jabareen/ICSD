export class Ast {
  public info: string;

  public text: string;

  public textq: string;

  public ref: Ast[];

  static are(): Ast {
    return null;
  }
   static build(__function: string): Ast {
    const funcx: Ast = new Ast();
    let functionx: Ast = new Ast();
    let str = __function;
    const txtq = '';
    str = __function.replace(new RegExp('(for)([^;])*(;)([^;])*(;)([^\\)])*\\)', 'g'), 'for()');
    str = /* replace */str.split(';').join(';#');
    str = /* replace */str.split('{').join('#{#');
    str = /* replace */str.split('}').join('#}#');
    const stt: string[] = str.split('#');
    let count = 0;
    let cq = 0;
    let cin = 0;
    let stq = '';
    funcx.textq = '';
    for (let i = 0; i < stt.length; i++) {
      if (/* contains */stt[i].indexOf(';') !== -1) {
        count++;
        stq += stt[i] + ' ';
      }
      if (/* contains */stt[i].toLowerCase().indexOf('for') !== -1) {
        if (count !== 0) {
          funcx.info = count + '';
          funcx.text = 'Variable Deceleration';
          funcx.ref = null;
          functionx = functionx.add(funcx);
          count = 0;
          stq = '';
        }
        if (/* contains */stt[i + 1].indexOf('{') !== -1 === false) {
          funcx.info = '1';
          funcx.text = 'for';
          funcx.ref = null;
          functionx = functionx.add(funcx);
        } else {
          for (let j: number = i + 1; j < stt.length; j++) {
            if (/* contains */stt[j].indexOf('{') !== -1) {
              if (cq !== 0) {
                funcx.textq += stt[j];
              }
              cq++;
            } else {
              if (/* contains */stt[j].indexOf('}') !== -1) {
                cq--;
                if (cq === 0) {
                  funcx.info = cin + '';
                  funcx.text = 'for';
                  funcx.ref = null;
                  if (/* contains */funcx.textq.indexOf('{') !== -1) { funcx.ref = this.build(funcx.textq).ref; }
                  functionx = functionx.add(funcx);
                  cin = 0;
                  cq = 0;
                  i = j;
                  funcx.textq = '';
                  break;
                } else {
                  funcx.textq += stt[j];
                }
              } else {
                if (!(/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) { return o1.equals(o2); } else {
                      return o1 === o2; } })(stt[j], '')) || /* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) {
                    return o1.equals(o2); } else { return o1 === o2; } })(stt[j], ' ')))) {
                  cin++;
                  funcx.textq += stt[j];
                }
              }
            }
          }
        }
      }
      if (/* contains */stt[i].toLowerCase().indexOf('if') !== -1) {
        if (count !== 0) {
          funcx.info = count + '';
          funcx.text = 'Variable Deceleration';
          funcx.ref = null;
          functionx = functionx.add(funcx);
          count = 0;
          stq = '';
        }
        if (/* contains */stt[i + 1].indexOf('{') !== -1 === false) {
          funcx.info = '1';
          funcx.text = 'if';
          funcx.ref = null;
          functionx = functionx.add(funcx);
        } else {
          for (let j: number = i + 1; j < stt.length; j++) {
            if (/* contains */stt[j].indexOf('{') !== -1) {
              if (cq !== 0) {
                funcx.textq += stt[j];
              }
              cq++;
            } else {
              if (/* contains */stt[j].indexOf('}') !== -1) {
                cq--;
                if (cq === 0) {
                  funcx.info = cin + '';
                  funcx.text = 'if';
                  funcx.ref = null;
                  if (/* contains */funcx.textq.indexOf('{') !== -1) { funcx.ref = this.build(funcx.textq).ref; }
                  functionx = functionx.add(funcx);
                  cin = 0;
                  cq = 0;
                  i = j;
                  funcx.textq = '';
                  break;
                } else {
                  funcx.textq += stt[j];
                }
              } else {
                if (!(/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) { return o1.equals(o2); } else {
                      return o1 === o2; } })(stt[j], '')) || /* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) {
                    return o1.equals(o2); } else { return o1 === o2; } })(stt[j], ' ')))) {
                  cin++;
                  funcx.textq += stt[j];
                }
              }
            }
          }
        }
      }
      if (/* contains */stt[i].toLowerCase().indexOf('while') !== -1) {
        if (count !== 0) {
          funcx.info = count + '';
          funcx.text = 'Variable Deceleration';
          funcx.ref = null;
          functionx = functionx.add(funcx);
          count = 0;
          stq = '';
        }
        if (/* contains */stt[i + 1].indexOf('{') !== -1 === false) {
          funcx.info = '1';
          funcx.text = 'while';
          funcx.ref = null;
          functionx = functionx.add(funcx);
        } else {
          for (let j: number = i + 1; j < stt.length; j++) {
            if (/* contains */stt[j].indexOf('{') !== -1) {
              if (cq !== 0) {
                funcx.textq += stt[j];
              }
              cq++;
            } else {
              if (/* contains */stt[j].indexOf('}') !== -1) {
                cq--;
                if (cq === 0) {
                  funcx.info = cin + '';
                  funcx.text = 'while';
                  funcx.ref = null;
                  if (/* contains */funcx.textq.indexOf('{') !== -1) { funcx.ref = this.build(funcx.textq).ref; }
                  functionx = functionx.add(funcx);
                  cin = 0;
                  cq = 0;
                  i = j;
                  funcx.textq = '';
                  break;
                } else {
                  funcx.textq += stt[j];
                }
              } else {
                if (!(/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) { return o1.equals(o2); } else {
                      return o1 === o2; } })(stt[j], '')) || /* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) {
                    return o1.equals(o2); } else { return o1 === o2; } })(stt[j], ' ')))) {
                  cin++;
                  funcx.textq += stt[j];
                }
              }
            }
          }
        }
      }
      if (/* contains */stt[i].toLowerCase().indexOf('switch') !== -1) {
        if (count !== 0) {
          funcx.info = count + '';
          funcx.text = 'Variable Deceleration';
          funcx.ref = null;
          functionx = functionx.add(funcx);
          count = 0;
          stq = '';
        }
        if (/* contains */stt[i + 1].indexOf('{') !== -1 === false) {
          funcx.info = '1';
          funcx.text = 'switch';
          funcx.ref = null;
          functionx = functionx.add(funcx);
        } else {
          for (let j: number = i + 1; j < stt.length; j++) {
            if (/* contains */stt[j].indexOf('{') !== -1) {
              if (cq !== 0) {
                funcx.textq += stt[j];
              }
              cq++;
            } else {
              if (/* contains */stt[j].indexOf('}') !== -1) {
                cq--;
                if (cq === 0) {
                  funcx.info = cin + '';
                  funcx.text = 'switch';
                  funcx.ref = null;
                  if (/* contains */funcx.textq.indexOf('{') !== -1) { funcx.ref = this.build(funcx.textq).ref; }
                  functionx = functionx.add(funcx);
                  cin = 0;
                  cq = 0;
                  i = j;
                  funcx.textq = '';
                  break;
                } else {
                  funcx.textq += stt[j];
                }
              } else {
                if (!(/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) { return o1.equals(o2); } else {
                      return o1 === o2; } })(stt[j], '')) || /* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) {
                    return o1.equals(o2); } else { return o1 === o2; } })(stt[j], ' ')))) {
                  cin++;
                  funcx.textq += stt[j];
                }
              }
            }
          }
        }
      }
      if (/* contains */stt[i].toLowerCase().indexOf('else') !== -1) {
        if (count !== 0) {
          funcx.info = count + '';
          funcx.text = 'Variable Deceleration';
          funcx.ref = null;
          functionx = functionx.add(funcx);
          count = 0;
          stq = '';
        }
        if (/* contains */stt[i + 1].indexOf('{') !== -1 === false) {
          funcx.info = '1';
          funcx.text = 'else';
          funcx.ref = null;
          functionx = functionx.add(funcx);
        } else {
          for (let j: number = i + 1; j < stt.length; j++) {
            if (/* contains */stt[j].indexOf('{') !== -1) {
              if (cq !== 0) {
                funcx.textq += stt[j];
              }
              cq++;
            } else {
              if (/* contains */stt[j].indexOf('}') !== -1) {
                cq--;
                if (cq === 0) {
                  funcx.info = cin + '';
                  funcx.text = 'else';
                  funcx.ref = null;
                  if (/* contains */funcx.textq.indexOf('{') !== -1) { funcx.ref = this.build(funcx.textq).ref; }
                  functionx = functionx.add(funcx);
                  cin = 0;
                  cq = 0;
                  i = j;
                  funcx.textq = '';
                  break;
                } else {
                  funcx.textq += stt[j];
                }
              } else {
                if (!(/* equals */(<any>((o1: any, o2: any) => {
                    if (o1 && o1.equals) { return o1.equals(o2); } else {
                      return o1 === o2; } })(stt[j], '')) || /* equals */(<any>((o1: any, o2: any) => { if (o1 && o1.equals) {
                    return o1.equals(o2); } else { return o1 === o2; } })(stt[j], ' ')))) {
                  cin++;
                  funcx.textq += stt[j];
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
  }
}
