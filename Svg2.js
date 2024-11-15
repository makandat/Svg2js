/* SVG class v2.2.0 */
'use strict';

/* == SVG コンテナクラス (v2.2.0) == */
class SvgContainer {
  /* バージョン */
  get Version() {
    "2.2.0";
  }
  
  /* コンストラクタ */
  constructor(width, height) {
    // キャンバスのサイズ
    this._width = width;
    this._height = height;
    // SVG 図形のコレクション
    this._elements = new Array();
    // viewBox (v2.1.0)
    this._viewBox = {x:0, y:0, width:this._width, height:this._height};
    // defs タグのリテラル
    this._defs_literal = "";
  }

  /* xml タグ */  
  get tagXML() {
    return "<?xml version=\"1.0\" encoding=\"utf-8\" standalone=\"no\" ?>\n";
  }
  
  /* svg タグ */
  get tagSVG() {
    return `<svg width="${this._width}" height="${this._height}" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="${this._viewBox.x} ${this._viewBox.y} ${this._viewBox.width} ${this._viewBox.height}">\n`;
  }
  
  /* キャンバスの幅 */
  get width() {
    return this._width;
  }

  /* キャンバスの高さ */
  get height() {
    return this._height;
  }
  
  /* defs のリテラル (v2.2.0) */
  get defs_literal() {
    return this._defs_literal;
  }

  set defs_literal(literal) {
    this._defs_literal = literal;
  }
  
  /* SVG 要素（図形）を追加する。*/
  add(svg) {
    svg.setSize(this.width, this.height);
    this._elements.push(svg);
  }
  
  /* viewBox を設定する。(v2.1.0) */
  viewBox(x, y, w, h) {
    this._viewBox.x = x;
    this._viewBox.y = y;
    this._viewBox.width = w;
    this._viewBox.height = h;
  }

  /* 文字列表現 (v2.2.0) */
  toString(xml=false) {
    let str = "";
    if (xml) {
      str += this.tagXML;
    }
    str += this.tagSVG;
    if (this.defs_literal != "")
      str += this.defs_literal;
    for (let elem of this._elements) {
      str += elem;
    }
    str += "</svg>\n";
    return str;
  }
  
  /* id で指定された内容に body を設定する。*/
  static setSvgById(id, body) {
    let el = document.getElementById(id);
    el.innerHTML = body;
  } 

  /* cls で指定された内容に body を設定する。*/
  static setSvgByClass(cls, body) {
    let elements = document.getElementsByClassName(cls);
    for (let el of elements) {
      el.innerHTML =body;
    }
  } 

  /* tag で指定された内容に body を設定する。*/
  static setSvgByTag(tag, body) {
    let elements = document.getElementsByTagName(tag);
    for (let el of elements) {
      el.innerHTML =body;
    }
  } 
}


/* == SVG 図形の基本クラス (v2.2.0) == */
class SvgShape {
  /* コンストラクタ (v.2.2.0) */
  constructor(options=null) {
    this._width = 640;
    this._height = 480;
    if (options == null) {
      this._fgcolor = "black";
      this._bgcolor = "white";
      this._borderWidth = 1;
      this._title = "";
    }
    else {
      this._fgcolor = options["fgcolor"] == undefined ? "black" : options["fgcolor"];
      this._bgcolor = options["bgcolor"] == undefined ? "white" : options["bgcolor"];
      this._borderWidth = options["borderWidth"] == undefined ? 1 : options["borderWidth"];
      this._title = options["title"] == undefined ? "" : options["title"];
    }
  }
  
  /* キャンバスサイズを設定する。*/
  setSize(w, h) {
    this._width = w;
    this._height = h;
  }

  /* 前景(描画)色 */
  get fgColor() {
    return this._fgcolor;
  }
  
  set fgColor(c) {
    this._fgcolor = c;
  }
  
  /* 背景色 */
  get bgColor() {
    return this._bgcolor;
  }
  
  set bgColor(c) {
    this._bgcolor = c;
  }
  
  /* 描画幅 */
  get borderWidth() {
    return this._borderWidth;
  }
  
  set borderWidth(c) {
    this._borderWidth = c;
  }
  
  /* タイトル */
  get title() {
    return this._title;
  }
  
  set title(c) {
    this._title = c;
  }
}

/* == 直線クラス == */
class SvgLine extends SvgShape {
  /* コンストラクタ */
  constructor(x1, y1, x2, y2, options=null) {
    super(options);
    this._x1 = x1;
    this._y1 = y1;
    this._x2 = x2;
    this._y2 = y2;
  }

  /* SVG の文字列(body+style) */
  toString() {
    let style = `stroke:${this._fgcolor};stroke-width:${this._borderWidth};`;
    let shape = `<line x1="${this._x1}" y1="${this._y1}" x2="${this._x2}" y2="${this._y2}" style="${style}" />\n`;
    return shape;
  }
}


/* == 矩形クラス == */
class SvgRect extends SvgShape {
  /* コンストラクタ */
  constructor(x, y, w, h, options=null) {
    super(options);
    this._x = x;
    this._y = y;
    this._rect_width = w;
    this._rect_height = h;
    this._rx = 0;
    this._ry = 0;
  }
  
  /* 矩形の丸みを設定 */
  setRound(rx, ry) {
    this._rx = rx;
    this._ry = ry;
  }

  /* SVG の文字列(body+style) */
  toString() {
    let style = `stroke:${this._fgcolor};stroke-width:${this._borderWidth};fill:${this._bgcolor}`;
    let shape = `<rect x="${this._x}" y ="${this._y}" width="${this._rect_width}" height="${this._rect_height}" rx="${this._rx}" ry="${this._ry}" style="${style}" />\n`;
    return shape;    
  }
}

/* == 円クラス == */
class SvgCircle extends SvgShape {
  /* コンストラクタ */
  constructor(x, y, r, options=null) {
    super(options);
    this._x = x;
    this._y = y;
    this._r = r;
  }

  /* SVG の文字列(body+style) */
  toString() {
    let style = `stroke:${this._fgcolor};stroke-width:${this._borderWidth};fill:${this._bgcolor}`;
    let shape = `<circle cx="${this._x}" cy ="${this._y}" r="${this._r}" style="${style}" />\n`;
    return shape;
  }
}


/* == 楕円クラス == */
class SvgEllipse extends SvgShape {
  /* コンストラクタ */
  constructor(x, y, rx, ry, options=null) {
    super(x, y, options);
    this._x = x;
    this._y = y;
    this._rx = rx;
    this._ry = ry;
  }

  /* SVG の文字列(body+style) */
  toString() {
    let style = `stroke:${this._fgcolor};stroke-width:${this._borderWidth};fill:${this._bgcolor}`;
    let shape = `<ellipse cx="${this._x}" cy ="${this._y}" rx="${this._rx}" ry="${this._ry}" style="${style}" />`;
    return shape;
  }
}


/* == 折れ線 クラス == */
class SvgPolyline extends SvgShape {
  /* コンストラクタ */
  constructor(options=null) {
    super(options);
    this._points = new Array();
  }
  
  /* 点を追加する。*/
  addPoint(x, y) {
    this._points.push(x, y);
  }
  
  /* 点のリスト */
  get points() {
    return this._points;
  }
  
  set points(pts) {
    this._points = new Array();
    for (let p of pts) {
      this._points.push(p);
    } 
  }

  /* SVG の文字列(body+style) */
  toString() {
    let style = `stroke:${this._fgcolor};stroke-width:${this._borderWidth};`;
    let p = this._points.join(' ');
    let shape = `<polyline fill="none" points="${p}" style="${style}" />`;
    return shape;
  }
}


/* == 多角形 クラス == */
class SvgPolygon extends SvgShape {
  /* コンストラクタ */
  constructor(options=null) {
    super(options);
    this._points = new Array();
  }

  /* 点を追加する。*/
  addPoint(x, y) {
    this._points.push(x, y);
  }
  
  /* 点のリスト */
  get points() {
    return this._points;
  }

  set points(pts) {
    this._points = new Array();
    for (let p of pts) {
      this._points.push(p);
    } 
  }

  /* SVG の文字列(body+style) */
  toString() {
    let style = `stroke:${this._fgcolor};stroke-width:${this._borderWidth};fill:${this._bgcolor}`;
    let p = this._points.toString();
    let shape = `<polygon fill="none" points="${p}" style="${style}" />`;
    return shape;
  }
}

/* == 文字列クラス == */
class SvgText extends SvgShape {
  /* コンストラクタ */
  constructor(text, x=0, y=0, options=null) {
    super(options);
    this._text = text;
    this._x = x;
    this._y = y;
    this._fontfamily = "sans-serif";
    this._fontsize = 24;
  }
  
  /* フォントサイズ */
  get fontSize() {
    return this._fontsize;
  }
  
  set fontSize(pt) {
    this._fontsize = pt;
  }
  
  /* フォント種別 */
  get fontFamily() {
    return this._fontfamily;
  }
  
  set fontFamily(name) {
    this._fontFamily = name;
  }

  /* SVG の文字列(body+style) */
  toString() {
    let body = `<text x="${this._x}" y="${this._y}" fill="${this._fgcolor}" font-family="${this._fontfamily}" font-size="${this._fontsize}">`;
    body += this._text;
    let text = body + "</text>";
    return text;
  }
}

/* == Path クラス (v2.2.0) == */
class SvgPath extends SvgShape {
  /* コンストラクタ */
  constructor(options=null) {
    super(options);
    this._path = "";
  }
  
  /* パスコマンドを追加する。*/
  addCommand(cmd) {
    this._path += cmd;
  }
  
  /* パスを表すプロパティ */
  get path() {
    return this._path;
  }
  
  set path(p) {
    this._path = p;
  }
  
  /* 文字列表現 */
  toString() {
    let style = `stroke:${this._fgcolor};stroke-width:${this._borderWidth};fill:${this._bgcolor}`;
    let shape = `<path d="${this._path}" style="${style}" />`;
    return shape;
  }
}


/* == Use クラス (v2.2.0) == */
class SvgUse extends SvgShape{
  /* コンストラクタ */
  constructor(x, y, w, h, xlink, options=null) {
    super(options);
    this._x = x;
    this._y = y;
    this._width = w;
    this._height = h;
    this._xlink = xlink;
  }

  /* 文字列表現 */
  toString() {
    let use = `<use x="${this._x}" y="${this._y}" width="${this._width}" height="${this._height}" xlink:href="${this._xlink}" />`;
    return use;
  }
}


