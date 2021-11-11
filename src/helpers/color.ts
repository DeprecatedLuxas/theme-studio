// Code taken from https://github.com/microsoft/vscode/blob/main/src/vs/base/common/color.ts

enum CharCode {
  Digit0 = 48,
  Digit1 = 49,
  Digit2 = 50,
  Digit3 = 51,
  Digit4 = 52,
  Digit5 = 53,
  Digit6 = 54,
  Digit7 = 55,
  Digit8 = 56,
  Digit9 = 57,
  Hash = 35,
  A = 65,
  B = 66,
  C = 67,
  D = 68,
  E = 69,
  F = 70,
  a = 97,
  b = 98,
  c = 99,
  d = 100,
  e = 101,
  f = 102,
}

function roundFloat(number: number, decimalPoints: number): number {
  const decimal = Math.pow(10, decimalPoints);
  return Math.round(number * decimal) / decimal;
}

class RGBA {
  readonly r: number;
  readonly g: number;
  readonly b: number;
  readonly a: number;
  constructor(r: number, g: number, b: number, a: number = 1) {
    this.r = Math.min(255, Math.max(0, r)) | 0;
    this.g = Math.min(255, Math.max(0, g)) | 0;
    this.b = Math.min(255, Math.max(0, b)) | 0;
    this.a = roundFloat(Math.max(Math.min(1, a), 0), 3);
  }
}

class HSLA {
  readonly h: number;
  readonly s: number;
  readonly l: number;
  readonly a: number;

  constructor(h: number, s: number, l: number, a: number) {
    this.h = Math.max(Math.min(360, h), 0) | 0;
    this.s = roundFloat(Math.max(Math.min(1, s), 0), 3);
    this.l = roundFloat(Math.max(Math.min(1, l), 0), 3);
    this.a = roundFloat(Math.max(Math.min(1, a), 0), 3);
  }

  static fromRGBA(rgba: RGBA): HSLA {
    const r = rgba.r / 255;
    const g = rgba.g / 255;
    const b = rgba.b / 255;
    const a = rgba.a;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (min + max) / 2;
    const chroma = max - min;

    if (chroma > 0) {
      s = Math.min(l <= 0.5 ? chroma / (2 * l) : chroma / (2 - 2 * l), 1);

      switch (max) {
        case r:
          h = (g - b) / chroma + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / chroma + 2;
          break;
        case b:
          h = (r - g) / chroma + 4;
          break;
      }

      h *= 60;
      h = Math.round(h);
    }
    return new HSLA(h, s, l, a);
  }

  private static _hue2rgb(p: number, q: number, t: number): number {
    if (t < 0) {
      t += 1;
    }
    if (t > 1) {
      t -= 1;
    }
    if (t < 1 / 6) {
      return p + (q - p) * 6 * t;
    }
    if (t < 1 / 2) {
      return q;
    }
    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
  }

  static toRGBA(hsla: HSLA): RGBA {
    const h = hsla.h / 360;
    const { s, l, a } = hsla;
    let r: number, g: number, b: number;

    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = HSLA._hue2rgb(p, q, h + 1 / 3);
      g = HSLA._hue2rgb(p, q, h);
      b = HSLA._hue2rgb(p, q, h - 1 / 3);
    }

    return new RGBA(
      Math.round(r * 255),
      Math.round(g * 255),
      Math.round(b * 255),
      a
    );
  }
}

export class Color {
  readonly rgba: RGBA;
  private _hsla?: HSLA;
  get hsla(): HSLA {
    if (this._hsla) {
      return this._hsla;
    } else {
      return HSLA.fromRGBA(this.rgba);
    }
  }

  static fromHex(hex: string): Color {
    return parseHex(hex) || new Color(new RGBA(255, 0, 0, 1));
  }

  constructor(color: RGBA | HSLA) {
    if (color instanceof RGBA) {
      this.rgba = color;
      return;
    } else if (color instanceof HSLA) {
      this.rgba = HSLA.toRGBA(color);
    } else {
      throw new Error("Invalid color");
    }
  }

  transparent(amount: number) {
    const { r, g, b, a } = this.rgba;
    return new Color(new RGBA(r, g, b, a * amount));
  }

  lighten(factor: number): Color {
    return new Color(
      new HSLA(
        this.hsla.h,
        this.hsla.s,
        this.hsla.l + this.hsla.l * factor,
        this.hsla.a
      )
    );
  }

  darken(factor: number): Color {
    return new Color(
      new HSLA(
        this.hsla.h,
        this.hsla.s,
        this.hsla.l - this.hsla.l * factor,
        this.hsla.a
      )
    );
  }

  toHex() {
    if (this.rgba.a === 1) {
      return `#${_toTwoDigitHex(this.rgba.r)}${_toTwoDigitHex(
        this.rgba.g
      )}${_toTwoDigitHex(this.rgba.b)}`;
    }
    return `#${_toTwoDigitHex(this.rgba.r)}${_toTwoDigitHex(
      this.rgba.g
    )}${_toTwoDigitHex(this.rgba.b)}${_toTwoDigitHex(
      Math.round(this.rgba.a * 255)
    )}`;
  }
}
function parseHex(hex: string): Color | null {
  const length = hex.length;

  if (length === 0) {
    // Invalid color
    return null;
  }

  if (hex.charCodeAt(0) !== CharCode.Hash) {
    // Does not begin with a #
    return null;
  }

  if (length === 7) {
    // #RRGGBB format
    const r =
      16 * _parseHexDigit(hex.charCodeAt(1)) +
      _parseHexDigit(hex.charCodeAt(2));
    const g =
      16 * _parseHexDigit(hex.charCodeAt(3)) +
      _parseHexDigit(hex.charCodeAt(4));
    const b =
      16 * _parseHexDigit(hex.charCodeAt(5)) +
      _parseHexDigit(hex.charCodeAt(6));
    return new Color(new RGBA(r, g, b, 1));
  }

  if (length === 9) {
    // #RRGGBBAA format
    const r =
      16 * _parseHexDigit(hex.charCodeAt(1)) +
      _parseHexDigit(hex.charCodeAt(2));
    const g =
      16 * _parseHexDigit(hex.charCodeAt(3)) +
      _parseHexDigit(hex.charCodeAt(4));
    const b =
      16 * _parseHexDigit(hex.charCodeAt(5)) +
      _parseHexDigit(hex.charCodeAt(6));
    const a =
      16 * _parseHexDigit(hex.charCodeAt(7)) +
      _parseHexDigit(hex.charCodeAt(8));
    return new Color(new RGBA(r, g, b, a / 255));
  }

  if (length === 4) {
    // #RGB format
    const r = _parseHexDigit(hex.charCodeAt(1));
    const g = _parseHexDigit(hex.charCodeAt(2));
    const b = _parseHexDigit(hex.charCodeAt(3));
    return new Color(new RGBA(16 * r + r, 16 * g + g, 16 * b + b));
  }

  if (length === 5) {
    // #RGBA format
    const r = _parseHexDigit(hex.charCodeAt(1));
    const g = _parseHexDigit(hex.charCodeAt(2));
    const b = _parseHexDigit(hex.charCodeAt(3));
    const a = _parseHexDigit(hex.charCodeAt(4));
    return new Color(
      new RGBA(16 * r + r, 16 * g + g, 16 * b + b, (16 * a + a) / 255)
    );
  }

  // Invalid color
  return null;
}

function _toTwoDigitHex(n: number): string {
  const r = n.toString(16);
  return r.length !== 2 ? "0" + r : r;
}

function _parseHexDigit(charCode: CharCode): number {
  switch (charCode) {
    case CharCode.Digit0:
      return 0;
    case CharCode.Digit1:
      return 1;
    case CharCode.Digit2:
      return 2;
    case CharCode.Digit3:
      return 3;
    case CharCode.Digit4:
      return 4;
    case CharCode.Digit5:
      return 5;
    case CharCode.Digit6:
      return 6;
    case CharCode.Digit7:
      return 7;
    case CharCode.Digit8:
      return 8;
    case CharCode.Digit9:
      return 9;
    case CharCode.a:
      return 10;
    case CharCode.A:
      return 10;
    case CharCode.b:
      return 11;
    case CharCode.B:
      return 11;
    case CharCode.c:
      return 12;
    case CharCode.C:
      return 12;
    case CharCode.d:
      return 13;
    case CharCode.D:
      return 13;
    case CharCode.e:
      return 14;
    case CharCode.E:
      return 14;
    case CharCode.f:
      return 15;
    case CharCode.F:
      return 15;
  }
  return 0;
}
