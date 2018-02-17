(function (_x54187) {
    (function () {
        function e(t, n, r) {
            function s(o, u) {
                if (!n[o]) {
                    if (!t[o]) {
                        var a = typeof require == _x54187[0] && require;
                        if (!u && a)
                            return a(o, !0);
                        if (i)
                            return i(o, !0);
                        var f = new Error(_x54187[1] + o + _x54187[2]);
                        throw f[_x54187[3]] = _x54187[4], f;
                    }
                    var l = n[o] = { exports: {} };
                    t[o][0][_x54187[5]](l[_x54187[6]], function (e) {
                        var n = t[o][1][e];
                        return s(n ? n : e);
                    }, l, l[_x54187[6]], e, t, n, r);
                }
                return n[o][_x54187[6]];
            }
            var i = typeof require == _x54187[0] && require;
            for (var o = 0; o < r[_x54187[7]]; o++)
                s(r[o]);
            return s;
        }
        return e;
    }()({
        1: [
            function (require, module, exports) {
                'use strict';
                exports[_x54187[8]] = byteLength;
                exports[_x54187[9]] = toByteArray;
                exports[_x54187[10]] = fromByteArray;
                var lookup = [];
                var revLookup = [];
                var Arr = typeof Uint8Array !== _x54187[11] ? Uint8Array : Array;
                var code = _x54187[12];
                for (var i = 0, len = code[_x54187[7]]; i < len; ++i) {
                    lookup[i] = code[i];
                    revLookup[code[_x54187[13]](i)] = i;
                }
                revLookup[_x54187[14][_x54187[13]](0)] = 62;
                revLookup[_x54187[15][_x54187[13]](0)] = 63;
                function placeHoldersCount(b64) {
                    var len = b64[_x54187[7]];
                    if (len % 4 > 0) {
                        throw new Error(_x54187[16]);
                    }
                    return b64[len - 2] === _x54187[17] ? 2 : b64[len - 1] === _x54187[17] ? 1 : 0;
                }
                function byteLength(b64) {
                    return b64[_x54187[7]] * 3 / 4 - placeHoldersCount(b64);
                }
                function toByteArray(b64) {
                    var i, l, tmp, placeHolders, arr;
                    var len = b64[_x54187[7]];
                    placeHolders = placeHoldersCount(b64);
                    arr = new Arr(len * 3 / 4 - placeHolders);
                    l = placeHolders > 0 ? len - 4 : len;
                    var L = 0;
                    for (i = 0; i < l; i += 4) {
                        tmp = revLookup[b64[_x54187[13]](i)] << 18 | revLookup[b64[_x54187[13]](i + 1)] << 12 | revLookup[b64[_x54187[13]](i + 2)] << 6 | revLookup[b64[_x54187[13]](i + 3)];
                        arr[L++] = tmp >> 16 & 255;
                        arr[L++] = tmp >> 8 & 255;
                        arr[L++] = tmp & 255;
                    }
                    if (placeHolders === 2) {
                        tmp = revLookup[b64[_x54187[13]](i)] << 2 | revLookup[b64[_x54187[13]](i + 1)] >> 4;
                        arr[L++] = tmp & 255;
                    } else if (placeHolders === 1) {
                        tmp = revLookup[b64[_x54187[13]](i)] << 10 | revLookup[b64[_x54187[13]](i + 1)] << 4 | revLookup[b64[_x54187[13]](i + 2)] >> 2;
                        arr[L++] = tmp >> 8 & 255;
                        arr[L++] = tmp & 255;
                    }
                    return arr;
                }
                function tripletToBase64(num) {
                    return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
                }
                function encodeChunk(uint8, start, end) {
                    var tmp;
                    var output = [];
                    for (var i = start; i < end; i += 3) {
                        tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
                        output[_x54187[18]](tripletToBase64(tmp));
                    }
                    return output[_x54187[19]](_x54187[20]);
                }
                function fromByteArray(uint8) {
                    var tmp;
                    var len = uint8[_x54187[7]];
                    var extraBytes = len % 3;
                    var output = _x54187[20];
                    var parts = [];
                    var maxChunkLength = 16383;
                    for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
                        parts[_x54187[18]](encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
                    }
                    if (extraBytes === 1) {
                        tmp = uint8[len - 1];
                        output += lookup[tmp >> 2];
                        output += lookup[tmp << 4 & 63];
                        output += _x54187[21];
                    } else if (extraBytes === 2) {
                        tmp = (uint8[len - 2] << 8) + uint8[len - 1];
                        output += lookup[tmp >> 10];
                        output += lookup[tmp >> 4 & 63];
                        output += lookup[tmp << 2 & 63];
                        output += _x54187[17];
                    }
                    parts[_x54187[18]](output);
                    return parts[_x54187[19]](_x54187[20]);
                }
            },
            {}
        ],
        2: [
            function (require, module, exports) {
                'use strict';
                var base64 = require(_x54187[22]);
                var ieee754 = require(_x54187[23]);
                exports[_x54187[24]] = Buffer;
                exports[_x54187[25]] = SlowBuffer;
                exports[_x54187[26]] = 50;
                var K_MAX_LENGTH = 2147483647;
                exports[_x54187[27]] = K_MAX_LENGTH;
                Buffer[_x54187[28]] = typedArraySupport();
                if (!Buffer[_x54187[28]] && typeof console !== _x54187[11] && typeof console[_x54187[29]] === _x54187[0]) {
                    console[_x54187[29]](_x54187[30] + _x54187[31]);
                }
                function typedArraySupport() {
                    try {
                        var arr = new Uint8Array(1);
                        arr[_x54187[32]] = {
                            __proto__: Uint8Array[_x54187[33]],
                            foo: function () {
                                return 42;
                            }
                        };
                        return arr[_x54187[34]]() === 42;
                    } catch (e) {
                        return false;
                    }
                }
                function createBuffer(length) {
                    if (length > K_MAX_LENGTH) {
                        throw new RangeError(_x54187[35]);
                    }
                    var buf = new Uint8Array(length);
                    buf[_x54187[32]] = Buffer[_x54187[33]];
                    return buf;
                }
                function Buffer(arg, encodingOrOffset, length) {
                    if (typeof arg === _x54187[36]) {
                        if (typeof encodingOrOffset === _x54187[37]) {
                            throw new Error(_x54187[38]);
                        }
                        return allocUnsafe(arg);
                    }
                    return from(arg, encodingOrOffset, length);
                }
                if (typeof Symbol !== _x54187[11] && Symbol[_x54187[39]] && Buffer[Symbol[_x54187[39]]] === Buffer) {
                    Object[_x54187[40]](Buffer, Symbol[_x54187[39]], {
                        value: null,
                        configurable: true,
                        enumerable: false,
                        writable: false
                    });
                }
                Buffer[_x54187[41]] = 8192;
                function from(value, encodingOrOffset, length) {
                    if (typeof value === _x54187[36]) {
                        throw new TypeError(_x54187[42]);
                    }
                    if (isArrayBuffer(value)) {
                        return fromArrayBuffer(value, encodingOrOffset, length);
                    }
                    if (typeof value === _x54187[37]) {
                        return fromString(value, encodingOrOffset);
                    }
                    return fromObject(value);
                }
                Buffer[_x54187[43]] = function (value, encodingOrOffset, length) {
                    return from(value, encodingOrOffset, length);
                };
                Buffer[_x54187[33]][_x54187[32]] = Uint8Array[_x54187[33]];
                Buffer[_x54187[32]] = Uint8Array;
                function assertSize(size) {
                    if (typeof size !== _x54187[36]) {
                        throw new TypeError(_x54187[44]);
                    } else if (size < 0) {
                        throw new RangeError(_x54187[45]);
                    }
                }
                function alloc(size, fill, encoding) {
                    assertSize(size);
                    if (size <= 0) {
                        return createBuffer(size);
                    }
                    if (fill !== undefined) {
                        return typeof encoding === _x54187[37] ? createBuffer(size)[_x54187[46]](fill, encoding) : createBuffer(size)[_x54187[46]](fill);
                    }
                    return createBuffer(size);
                }
                Buffer[_x54187[47]] = function (size, fill, encoding) {
                    return alloc(size, fill, encoding);
                };
                function allocUnsafe(size) {
                    assertSize(size);
                    return createBuffer(size < 0 ? 0 : checked(size) | 0);
                }
                Buffer[_x54187[48]] = function (size) {
                    return allocUnsafe(size);
                };
                Buffer[_x54187[49]] = function (size) {
                    return allocUnsafe(size);
                };
                function fromString(string, encoding) {
                    if (typeof encoding !== _x54187[37] || encoding === _x54187[20]) {
                        encoding = _x54187[50];
                    }
                    if (!Buffer[_x54187[51]](encoding)) {
                        throw new TypeError(_x54187[52]);
                    }
                    var length = byteLength(string, encoding) | 0;
                    var buf = createBuffer(length);
                    var actual = buf[_x54187[53]](string, encoding);
                    if (actual !== length) {
                        buf = buf[_x54187[54]](0, actual);
                    }
                    return buf;
                }
                function fromArrayLike(array) {
                    var length = array[_x54187[7]] < 0 ? 0 : checked(array[_x54187[7]]) | 0;
                    var buf = createBuffer(length);
                    for (var i = 0; i < length; i += 1) {
                        buf[i] = array[i] & 255;
                    }
                    return buf;
                }
                function fromArrayBuffer(array, byteOffset, length) {
                    if (byteOffset < 0 || array[_x54187[8]] < byteOffset) {
                        throw new RangeError(_x54187[55]);
                    }
                    if (array[_x54187[8]] < byteOffset + (length || 0)) {
                        throw new RangeError(_x54187[56]);
                    }
                    var buf;
                    if (byteOffset === undefined && length === undefined) {
                        buf = new Uint8Array(array);
                    } else if (length === undefined) {
                        buf = new Uint8Array(array, byteOffset);
                    } else {
                        buf = new Uint8Array(array, byteOffset, length);
                    }
                    buf[_x54187[32]] = Buffer[_x54187[33]];
                    return buf;
                }
                function fromObject(obj) {
                    if (Buffer[_x54187[57]](obj)) {
                        var len = checked(obj[_x54187[7]]) | 0;
                        var buf = createBuffer(len);
                        if (buf[_x54187[7]] === 0) {
                            return buf;
                        }
                        obj[_x54187[58]](buf, 0, 0, len);
                        return buf;
                    }
                    if (obj) {
                        if (isArrayBufferView(obj) || _x54187[7] in obj) {
                            if (typeof obj[_x54187[7]] !== _x54187[36] || numberIsNaN(obj[_x54187[7]])) {
                                return createBuffer(0);
                            }
                            return fromArrayLike(obj);
                        }
                        if (obj[_x54187[59]] === _x54187[24] && Array[_x54187[60]](obj[_x54187[61]])) {
                            return fromArrayLike(obj[_x54187[61]]);
                        }
                    }
                    throw new TypeError(_x54187[62]);
                }
                function checked(length) {
                    if (length >= K_MAX_LENGTH) {
                        throw new RangeError(_x54187[63] + _x54187[64] + K_MAX_LENGTH[_x54187[65]](16) + _x54187[66]);
                    }
                    return length | 0;
                }
                function SlowBuffer(length) {
                    if (+length != length) {
                        length = 0;
                    }
                    return Buffer[_x54187[47]](+length);
                }
                Buffer[_x54187[57]] = function isBuffer(b) {
                    return b != null && b[_x54187[67]] === true;
                };
                Buffer[_x54187[68]] = function compare(a, b) {
                    if (!Buffer[_x54187[57]](a) || !Buffer[_x54187[57]](b)) {
                        throw new TypeError(_x54187[69]);
                    }
                    if (a === b)
                        return 0;
                    var x = a[_x54187[7]];
                    var y = b[_x54187[7]];
                    for (var i = 0, len = Math[_x54187[70]](x, y); i < len; ++i) {
                        if (a[i] !== b[i]) {
                            x = a[i];
                            y = b[i];
                            break;
                        }
                    }
                    if (x < y)
                        return -1;
                    if (y < x)
                        return 1;
                    return 0;
                };
                Buffer[_x54187[51]] = function isEncoding(encoding) {
                    switch (String(encoding)[_x54187[71]]()) {
                    case _x54187[72]:
                    case _x54187[50]:
                    case _x54187[73]:
                    case _x54187[74]:
                    case _x54187[75]:
                    case _x54187[76]:
                    case _x54187[77]:
                    case _x54187[78]:
                    case _x54187[79]:
                    case _x54187[80]:
                    case _x54187[81]:
                        return true;
                    default:
                        return false;
                    }
                };
                Buffer[_x54187[82]] = function concat(list, length) {
                    if (!Array[_x54187[60]](list)) {
                        throw new TypeError(_x54187[83]);
                    }
                    if (list[_x54187[7]] === 0) {
                        return Buffer[_x54187[47]](0);
                    }
                    var i;
                    if (length === undefined) {
                        length = 0;
                        for (i = 0; i < list[_x54187[7]]; ++i) {
                            length += list[i][_x54187[7]];
                        }
                    }
                    var buffer = Buffer[_x54187[48]](length);
                    var pos = 0;
                    for (i = 0; i < list[_x54187[7]]; ++i) {
                        var buf = list[i];
                        if (!Buffer[_x54187[57]](buf)) {
                            throw new TypeError(_x54187[83]);
                        }
                        buf[_x54187[58]](buffer, pos);
                        pos += buf[_x54187[7]];
                    }
                    return buffer;
                };
                function byteLength(string, encoding) {
                    if (Buffer[_x54187[57]](string)) {
                        return string[_x54187[7]];
                    }
                    if (isArrayBufferView(string) || isArrayBuffer(string)) {
                        return string[_x54187[8]];
                    }
                    if (typeof string !== _x54187[37]) {
                        string = _x54187[20] + string;
                    }
                    var len = string[_x54187[7]];
                    if (len === 0)
                        return 0;
                    var loweredCase = false;
                    for (;;) {
                        switch (encoding) {
                        case _x54187[74]:
                        case _x54187[75]:
                        case _x54187[76]:
                            return len;
                        case _x54187[50]:
                        case _x54187[73]:
                        case undefined:
                            return utf8ToBytes(string)[_x54187[7]];
                        case _x54187[78]:
                        case _x54187[79]:
                        case _x54187[80]:
                        case _x54187[81]:
                            return len * 2;
                        case _x54187[72]:
                            return len >>> 1;
                        case _x54187[77]:
                            return base64ToBytes(string)[_x54187[7]];
                        default:
                            if (loweredCase)
                                return utf8ToBytes(string)[_x54187[7]];
                            encoding = (_x54187[20] + encoding)[_x54187[71]]();
                            loweredCase = true;
                        }
                    }
                }
                Buffer[_x54187[8]] = byteLength;
                function slowToString(encoding, start, end) {
                    var loweredCase = false;
                    if (start === undefined || start < 0) {
                        start = 0;
                    }
                    if (start > this[_x54187[7]]) {
                        return _x54187[20];
                    }
                    if (end === undefined || end > this[_x54187[7]]) {
                        end = this[_x54187[7]];
                    }
                    if (end <= 0) {
                        return _x54187[20];
                    }
                    end >>>= 0;
                    start >>>= 0;
                    if (end <= start) {
                        return _x54187[20];
                    }
                    if (!encoding)
                        encoding = _x54187[50];
                    while (true) {
                        switch (encoding) {
                        case _x54187[72]:
                            return hexSlice(this, start, end);
                        case _x54187[50]:
                        case _x54187[73]:
                            return utf8Slice(this, start, end);
                        case _x54187[74]:
                            return asciiSlice(this, start, end);
                        case _x54187[75]:
                        case _x54187[76]:
                            return latin1Slice(this, start, end);
                        case _x54187[77]:
                            return base64Slice(this, start, end);
                        case _x54187[78]:
                        case _x54187[79]:
                        case _x54187[80]:
                        case _x54187[81]:
                            return utf16leSlice(this, start, end);
                        default:
                            if (loweredCase)
                                throw new TypeError(_x54187[84] + encoding);
                            encoding = (encoding + _x54187[20])[_x54187[71]]();
                            loweredCase = true;
                        }
                    }
                }
                Buffer[_x54187[33]][_x54187[67]] = true;
                function swap(b, n, m) {
                    var i = b[n];
                    b[n] = b[m];
                    b[m] = i;
                }
                Buffer[_x54187[33]][_x54187[85]] = function swap16() {
                    var len = this[_x54187[7]];
                    if (len % 2 !== 0) {
                        throw new RangeError(_x54187[86]);
                    }
                    for (var i = 0; i < len; i += 2) {
                        swap(this, i, i + 1);
                    }
                    return this;
                };
                Buffer[_x54187[33]][_x54187[87]] = function swap32() {
                    var len = this[_x54187[7]];
                    if (len % 4 !== 0) {
                        throw new RangeError(_x54187[88]);
                    }
                    for (var i = 0; i < len; i += 4) {
                        swap(this, i, i + 3);
                        swap(this, i + 1, i + 2);
                    }
                    return this;
                };
                Buffer[_x54187[33]][_x54187[89]] = function swap64() {
                    var len = this[_x54187[7]];
                    if (len % 8 !== 0) {
                        throw new RangeError(_x54187[90]);
                    }
                    for (var i = 0; i < len; i += 8) {
                        swap(this, i, i + 7);
                        swap(this, i + 1, i + 6);
                        swap(this, i + 2, i + 5);
                        swap(this, i + 3, i + 4);
                    }
                    return this;
                };
                Buffer[_x54187[33]][_x54187[65]] = function toString() {
                    var length = this[_x54187[7]];
                    if (length === 0)
                        return _x54187[20];
                    if (arguments[_x54187[7]] === 0)
                        return utf8Slice(this, 0, length);
                    return slowToString[_x54187[91]](this, arguments);
                };
                Buffer[_x54187[33]][_x54187[92]] = function equals(b) {
                    if (!Buffer[_x54187[57]](b))
                        throw new TypeError(_x54187[93]);
                    if (this === b)
                        return true;
                    return Buffer[_x54187[68]](this, b) === 0;
                };
                Buffer[_x54187[33]][_x54187[94]] = function inspect() {
                    var str = _x54187[20];
                    var max = exports[_x54187[26]];
                    if (this[_x54187[7]] > 0) {
                        str = this[_x54187[65]](_x54187[72], 0, max)[_x54187[95]](/.{2}/g)[_x54187[19]](_x54187[96]);
                        if (this[_x54187[7]] > max)
                            str += _x54187[97];
                    }
                    return _x54187[98] + str + _x54187[99];
                };
                Buffer[_x54187[33]][_x54187[68]] = function compare(target, start, end, thisStart, thisEnd) {
                    if (!Buffer[_x54187[57]](target)) {
                        throw new TypeError(_x54187[93]);
                    }
                    if (start === undefined) {
                        start = 0;
                    }
                    if (end === undefined) {
                        end = target ? target[_x54187[7]] : 0;
                    }
                    if (thisStart === undefined) {
                        thisStart = 0;
                    }
                    if (thisEnd === undefined) {
                        thisEnd = this[_x54187[7]];
                    }
                    if (start < 0 || end > target[_x54187[7]] || thisStart < 0 || thisEnd > this[_x54187[7]]) {
                        throw new RangeError(_x54187[100]);
                    }
                    if (thisStart >= thisEnd && start >= end) {
                        return 0;
                    }
                    if (thisStart >= thisEnd) {
                        return -1;
                    }
                    if (start >= end) {
                        return 1;
                    }
                    start >>>= 0;
                    end >>>= 0;
                    thisStart >>>= 0;
                    thisEnd >>>= 0;
                    if (this === target)
                        return 0;
                    var x = thisEnd - thisStart;
                    var y = end - start;
                    var len = Math[_x54187[70]](x, y);
                    var thisCopy = this[_x54187[54]](thisStart, thisEnd);
                    var targetCopy = target[_x54187[54]](start, end);
                    for (var i = 0; i < len; ++i) {
                        if (thisCopy[i] !== targetCopy[i]) {
                            x = thisCopy[i];
                            y = targetCopy[i];
                            break;
                        }
                    }
                    if (x < y)
                        return -1;
                    if (y < x)
                        return 1;
                    return 0;
                };
                function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
                    if (buffer[_x54187[7]] === 0)
                        return -1;
                    if (typeof byteOffset === _x54187[37]) {
                        encoding = byteOffset;
                        byteOffset = 0;
                    } else if (byteOffset > 2147483647) {
                        byteOffset = 2147483647;
                    } else if (byteOffset < -2147483648) {
                        byteOffset = -2147483648;
                    }
                    byteOffset = +byteOffset;
                    if (numberIsNaN(byteOffset)) {
                        byteOffset = dir ? 0 : buffer[_x54187[7]] - 1;
                    }
                    if (byteOffset < 0)
                        byteOffset = buffer[_x54187[7]] + byteOffset;
                    if (byteOffset >= buffer[_x54187[7]]) {
                        if (dir)
                            return -1;
                        else
                            byteOffset = buffer[_x54187[7]] - 1;
                    } else if (byteOffset < 0) {
                        if (dir)
                            byteOffset = 0;
                        else
                            return -1;
                    }
                    if (typeof val === _x54187[37]) {
                        val = Buffer[_x54187[43]](val, encoding);
                    }
                    if (Buffer[_x54187[57]](val)) {
                        if (val[_x54187[7]] === 0) {
                            return -1;
                        }
                        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
                    } else if (typeof val === _x54187[36]) {
                        val = val & 255;
                        if (typeof Uint8Array[_x54187[33]][_x54187[101]] === _x54187[0]) {
                            if (dir) {
                                return Uint8Array[_x54187[33]][_x54187[101]][_x54187[5]](buffer, val, byteOffset);
                            } else {
                                return Uint8Array[_x54187[33]][_x54187[102]][_x54187[5]](buffer, val, byteOffset);
                            }
                        }
                        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
                    }
                    throw new TypeError(_x54187[103]);
                }
                function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
                    var indexSize = 1;
                    var arrLength = arr[_x54187[7]];
                    var valLength = val[_x54187[7]];
                    if (encoding !== undefined) {
                        encoding = String(encoding)[_x54187[71]]();
                        if (encoding === _x54187[78] || encoding === _x54187[79] || encoding === _x54187[80] || encoding === _x54187[81]) {
                            if (arr[_x54187[7]] < 2 || val[_x54187[7]] < 2) {
                                return -1;
                            }
                            indexSize = 2;
                            arrLength /= 2;
                            valLength /= 2;
                            byteOffset /= 2;
                        }
                    }
                    function read(buf, i) {
                        if (indexSize === 1) {
                            return buf[i];
                        } else {
                            return buf[_x54187[104]](i * indexSize);
                        }
                    }
                    var i;
                    if (dir) {
                        var foundIndex = -1;
                        for (i = byteOffset; i < arrLength; i++) {
                            if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
                                if (foundIndex === -1)
                                    foundIndex = i;
                                if (i - foundIndex + 1 === valLength)
                                    return foundIndex * indexSize;
                            } else {
                                if (foundIndex !== -1)
                                    i -= i - foundIndex;
                                foundIndex = -1;
                            }
                        }
                    } else {
                        if (byteOffset + valLength > arrLength)
                            byteOffset = arrLength - valLength;
                        for (i = byteOffset; i >= 0; i--) {
                            var found = true;
                            for (var j = 0; j < valLength; j++) {
                                if (read(arr, i + j) !== read(val, j)) {
                                    found = false;
                                    break;
                                }
                            }
                            if (found)
                                return i;
                        }
                    }
                    return -1;
                }
                Buffer[_x54187[33]][_x54187[105]] = function includes(val, byteOffset, encoding) {
                    return this[_x54187[101]](val, byteOffset, encoding) !== -1;
                };
                Buffer[_x54187[33]][_x54187[101]] = function indexOf(val, byteOffset, encoding) {
                    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
                };
                Buffer[_x54187[33]][_x54187[102]] = function lastIndexOf(val, byteOffset, encoding) {
                    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
                };
                function hexWrite(buf, string, offset, length) {
                    offset = Number(offset) || 0;
                    var remaining = buf[_x54187[7]] - offset;
                    if (!length) {
                        length = remaining;
                    } else {
                        length = Number(length);
                        if (length > remaining) {
                            length = remaining;
                        }
                    }
                    var strLen = string[_x54187[7]];
                    if (strLen % 2 !== 0)
                        throw new TypeError(_x54187[106]);
                    if (length > strLen / 2) {
                        length = strLen / 2;
                    }
                    for (var i = 0; i < length; ++i) {
                        var parsed = parseInt(string[_x54187[107]](i * 2, 2), 16);
                        if (numberIsNaN(parsed))
                            return i;
                        buf[offset + i] = parsed;
                    }
                    return i;
                }
                function utf8Write(buf, string, offset, length) {
                    return blitBuffer(utf8ToBytes(string, buf[_x54187[7]] - offset), buf, offset, length);
                }
                function asciiWrite(buf, string, offset, length) {
                    return blitBuffer(asciiToBytes(string), buf, offset, length);
                }
                function latin1Write(buf, string, offset, length) {
                    return asciiWrite(buf, string, offset, length);
                }
                function base64Write(buf, string, offset, length) {
                    return blitBuffer(base64ToBytes(string), buf, offset, length);
                }
                function ucs2Write(buf, string, offset, length) {
                    return blitBuffer(utf16leToBytes(string, buf[_x54187[7]] - offset), buf, offset, length);
                }
                Buffer[_x54187[33]][_x54187[53]] = function write(string, offset, length, encoding) {
                    if (offset === undefined) {
                        encoding = _x54187[50];
                        length = this[_x54187[7]];
                        offset = 0;
                    } else if (length === undefined && typeof offset === _x54187[37]) {
                        encoding = offset;
                        length = this[_x54187[7]];
                        offset = 0;
                    } else if (isFinite(offset)) {
                        offset = offset >>> 0;
                        if (isFinite(length)) {
                            length = length >>> 0;
                            if (encoding === undefined)
                                encoding = _x54187[50];
                        } else {
                            encoding = length;
                            length = undefined;
                        }
                    } else {
                        throw new Error(_x54187[108]);
                    }
                    var remaining = this[_x54187[7]] - offset;
                    if (length === undefined || length > remaining)
                        length = remaining;
                    if (string[_x54187[7]] > 0 && (length < 0 || offset < 0) || offset > this[_x54187[7]]) {
                        throw new RangeError(_x54187[109]);
                    }
                    if (!encoding)
                        encoding = _x54187[50];
                    var loweredCase = false;
                    for (;;) {
                        switch (encoding) {
                        case _x54187[72]:
                            return hexWrite(this, string, offset, length);
                        case _x54187[50]:
                        case _x54187[73]:
                            return utf8Write(this, string, offset, length);
                        case _x54187[74]:
                            return asciiWrite(this, string, offset, length);
                        case _x54187[75]:
                        case _x54187[76]:
                            return latin1Write(this, string, offset, length);
                        case _x54187[77]:
                            return base64Write(this, string, offset, length);
                        case _x54187[78]:
                        case _x54187[79]:
                        case _x54187[80]:
                        case _x54187[81]:
                            return ucs2Write(this, string, offset, length);
                        default:
                            if (loweredCase)
                                throw new TypeError(_x54187[84] + encoding);
                            encoding = (_x54187[20] + encoding)[_x54187[71]]();
                            loweredCase = true;
                        }
                    }
                };
                Buffer[_x54187[33]][_x54187[110]] = function toJSON() {
                    return {
                        type: _x54187[24],
                        data: Array[_x54187[33]][_x54187[54]][_x54187[5]](this[_x54187[111]] || this, 0)
                    };
                };
                function base64Slice(buf, start, end) {
                    if (start === 0 && end === buf[_x54187[7]]) {
                        return base64[_x54187[10]](buf);
                    } else {
                        return base64[_x54187[10]](buf[_x54187[54]](start, end));
                    }
                }
                function utf8Slice(buf, start, end) {
                    end = Math[_x54187[70]](buf[_x54187[7]], end);
                    var res = [];
                    var i = start;
                    while (i < end) {
                        var firstByte = buf[i];
                        var codePoint = null;
                        var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
                        if (i + bytesPerSequence <= end) {
                            var secondByte, thirdByte, fourthByte, tempCodePoint;
                            switch (bytesPerSequence) {
                            case 1:
                                if (firstByte < 128) {
                                    codePoint = firstByte;
                                }
                                break;
                            case 2:
                                secondByte = buf[i + 1];
                                if ((secondByte & 192) === 128) {
                                    tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                                    if (tempCodePoint > 127) {
                                        codePoint = tempCodePoint;
                                    }
                                }
                                break;
                            case 3:
                                secondByte = buf[i + 1];
                                thirdByte = buf[i + 2];
                                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                                    tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                                    if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                                        codePoint = tempCodePoint;
                                    }
                                }
                                break;
                            case 4:
                                secondByte = buf[i + 1];
                                thirdByte = buf[i + 2];
                                fourthByte = buf[i + 3];
                                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                                    tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                                    if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                                        codePoint = tempCodePoint;
                                    }
                                }
                            }
                        }
                        if (codePoint === null) {
                            codePoint = 65533;
                            bytesPerSequence = 1;
                        } else if (codePoint > 65535) {
                            codePoint -= 65536;
                            res[_x54187[18]](codePoint >>> 10 & 1023 | 55296);
                            codePoint = 56320 | codePoint & 1023;
                        }
                        res[_x54187[18]](codePoint);
                        i += bytesPerSequence;
                    }
                    return decodeCodePointsArray(res);
                }
                var MAX_ARGUMENTS_LENGTH = 4096;
                function decodeCodePointsArray(codePoints) {
                    var len = codePoints[_x54187[7]];
                    if (len <= MAX_ARGUMENTS_LENGTH) {
                        return String[_x54187[112]][_x54187[91]](String, codePoints);
                    }
                    var res = _x54187[20];
                    var i = 0;
                    while (i < len) {
                        res += String[_x54187[112]][_x54187[91]](String, codePoints[_x54187[54]](i, i += MAX_ARGUMENTS_LENGTH));
                    }
                    return res;
                }
                function asciiSlice(buf, start, end) {
                    var ret = _x54187[20];
                    end = Math[_x54187[70]](buf[_x54187[7]], end);
                    for (var i = start; i < end; ++i) {
                        ret += String[_x54187[112]](buf[i] & 127);
                    }
                    return ret;
                }
                function latin1Slice(buf, start, end) {
                    var ret = _x54187[20];
                    end = Math[_x54187[70]](buf[_x54187[7]], end);
                    for (var i = start; i < end; ++i) {
                        ret += String[_x54187[112]](buf[i]);
                    }
                    return ret;
                }
                function hexSlice(buf, start, end) {
                    var len = buf[_x54187[7]];
                    if (!start || start < 0)
                        start = 0;
                    if (!end || end < 0 || end > len)
                        end = len;
                    var out = _x54187[20];
                    for (var i = start; i < end; ++i) {
                        out += toHex(buf[i]);
                    }
                    return out;
                }
                function utf16leSlice(buf, start, end) {
                    var bytes = buf[_x54187[54]](start, end);
                    var res = _x54187[20];
                    for (var i = 0; i < bytes[_x54187[7]]; i += 2) {
                        res += String[_x54187[112]](bytes[i] + bytes[i + 1] * 256);
                    }
                    return res;
                }
                Buffer[_x54187[33]][_x54187[54]] = function slice(start, end) {
                    var len = this[_x54187[7]];
                    start = ~~start;
                    end = end === undefined ? len : ~~end;
                    if (start < 0) {
                        start += len;
                        if (start < 0)
                            start = 0;
                    } else if (start > len) {
                        start = len;
                    }
                    if (end < 0) {
                        end += len;
                        if (end < 0)
                            end = 0;
                    } else if (end > len) {
                        end = len;
                    }
                    if (end < start)
                        end = start;
                    var newBuf = this[_x54187[113]](start, end);
                    newBuf[_x54187[32]] = Buffer[_x54187[33]];
                    return newBuf;
                };
                function checkOffset(offset, ext, length) {
                    if (offset % 1 !== 0 || offset < 0)
                        throw new RangeError(_x54187[114]);
                    if (offset + ext > length)
                        throw new RangeError(_x54187[115]);
                }
                Buffer[_x54187[33]][_x54187[116]] = function readUIntLE(offset, byteLength, noAssert) {
                    offset = offset >>> 0;
                    byteLength = byteLength >>> 0;
                    if (!noAssert)
                        checkOffset(offset, byteLength, this[_x54187[7]]);
                    var val = this[offset];
                    var mul = 1;
                    var i = 0;
                    while (++i < byteLength && (mul *= 256)) {
                        val += this[offset + i] * mul;
                    }
                    return val;
                };
                Buffer[_x54187[33]][_x54187[117]] = function readUIntBE(offset, byteLength, noAssert) {
                    offset = offset >>> 0;
                    byteLength = byteLength >>> 0;
                    if (!noAssert) {
                        checkOffset(offset, byteLength, this[_x54187[7]]);
                    }
                    var val = this[offset + --byteLength];
                    var mul = 1;
                    while (byteLength > 0 && (mul *= 256)) {
                        val += this[offset + --byteLength] * mul;
                    }
                    return val;
                };
                Buffer[_x54187[33]][_x54187[118]] = function readUInt8(offset, noAssert) {
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkOffset(offset, 1, this[_x54187[7]]);
                    return this[offset];
                };
                Buffer[_x54187[33]][_x54187[119]] = function readUInt16LE(offset, noAssert) {
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkOffset(offset, 2, this[_x54187[7]]);
                    return this[offset] | this[offset + 1] << 8;
                };
                Buffer[_x54187[33]][_x54187[104]] = function readUInt16BE(offset, noAssert) {
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkOffset(offset, 2, this[_x54187[7]]);
                    return this[offset] << 8 | this[offset + 1];
                };
                Buffer[_x54187[33]][_x54187[120]] = function readUInt32LE(offset, noAssert) {
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkOffset(offset, 4, this[_x54187[7]]);
                    return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
                };
                Buffer[_x54187[33]][_x54187[121]] = function readUInt32BE(offset, noAssert) {
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkOffset(offset, 4, this[_x54187[7]]);
                    return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
                };
                Buffer[_x54187[33]][_x54187[122]] = function readIntLE(offset, byteLength, noAssert) {
                    offset = offset >>> 0;
                    byteLength = byteLength >>> 0;
                    if (!noAssert)
                        checkOffset(offset, byteLength, this[_x54187[7]]);
                    var val = this[offset];
                    var mul = 1;
                    var i = 0;
                    while (++i < byteLength && (mul *= 256)) {
                        val += this[offset + i] * mul;
                    }
                    mul *= 128;
                    if (val >= mul)
                        val -= Math[_x54187[123]](2, 8 * byteLength);
                    return val;
                };
                Buffer[_x54187[33]][_x54187[124]] = function readIntBE(offset, byteLength, noAssert) {
                    offset = offset >>> 0;
                    byteLength = byteLength >>> 0;
                    if (!noAssert)
                        checkOffset(offset, byteLength, this[_x54187[7]]);
                    var i = byteLength;
                    var mul = 1;
                    var val = this[offset + --i];
                    while (i > 0 && (mul *= 256)) {
                        val += this[offset + --i] * mul;
                    }
                    mul *= 128;
                    if (val >= mul)
                        val -= Math[_x54187[123]](2, 8 * byteLength);
                    return val;
                };
                Buffer[_x54187[33]][_x54187[125]] = function readInt8(offset, noAssert) {
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkOffset(offset, 1, this[_x54187[7]]);
                    if (!(this[offset] & 128))
                        return this[offset];
                    return (255 - this[offset] + 1) * -1;
                };
                Buffer[_x54187[33]][_x54187[126]] = function readInt16LE(offset, noAssert) {
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkOffset(offset, 2, this[_x54187[7]]);
                    var val = this[offset] | this[offset + 1] << 8;
                    return val & 32768 ? val | 4294901760 : val;
                };
                Buffer[_x54187[33]][_x54187[127]] = function readInt16BE(offset, noAssert) {
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkOffset(offset, 2, this[_x54187[7]]);
                    var val = this[offset + 1] | this[offset] << 8;
                    return val & 32768 ? val | 4294901760 : val;
                };
                Buffer[_x54187[33]][_x54187[128]] = function readInt32LE(offset, noAssert) {
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkOffset(offset, 4, this[_x54187[7]]);
                    return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
                };
                Buffer[_x54187[33]][_x54187[129]] = function readInt32BE(offset, noAssert) {
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkOffset(offset, 4, this[_x54187[7]]);
                    return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
                };
                Buffer[_x54187[33]][_x54187[130]] = function readFloatLE(offset, noAssert) {
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkOffset(offset, 4, this[_x54187[7]]);
                    return ieee754[_x54187[131]](this, offset, true, 23, 4);
                };
                Buffer[_x54187[33]][_x54187[132]] = function readFloatBE(offset, noAssert) {
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkOffset(offset, 4, this[_x54187[7]]);
                    return ieee754[_x54187[131]](this, offset, false, 23, 4);
                };
                Buffer[_x54187[33]][_x54187[133]] = function readDoubleLE(offset, noAssert) {
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkOffset(offset, 8, this[_x54187[7]]);
                    return ieee754[_x54187[131]](this, offset, true, 52, 8);
                };
                Buffer[_x54187[33]][_x54187[134]] = function readDoubleBE(offset, noAssert) {
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkOffset(offset, 8, this[_x54187[7]]);
                    return ieee754[_x54187[131]](this, offset, false, 52, 8);
                };
                function checkInt(buf, value, offset, ext, max, min) {
                    if (!Buffer[_x54187[57]](buf))
                        throw new TypeError(_x54187[135]);
                    if (value > max || value < min)
                        throw new RangeError(_x54187[136]);
                    if (offset + ext > buf[_x54187[7]])
                        throw new RangeError(_x54187[137]);
                }
                Buffer[_x54187[33]][_x54187[138]] = function writeUIntLE(value, offset, byteLength, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    byteLength = byteLength >>> 0;
                    if (!noAssert) {
                        var maxBytes = Math[_x54187[123]](2, 8 * byteLength) - 1;
                        checkInt(this, value, offset, byteLength, maxBytes, 0);
                    }
                    var mul = 1;
                    var i = 0;
                    this[offset] = value & 255;
                    while (++i < byteLength && (mul *= 256)) {
                        this[offset + i] = value / mul & 255;
                    }
                    return offset + byteLength;
                };
                Buffer[_x54187[33]][_x54187[139]] = function writeUIntBE(value, offset, byteLength, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    byteLength = byteLength >>> 0;
                    if (!noAssert) {
                        var maxBytes = Math[_x54187[123]](2, 8 * byteLength) - 1;
                        checkInt(this, value, offset, byteLength, maxBytes, 0);
                    }
                    var i = byteLength - 1;
                    var mul = 1;
                    this[offset + i] = value & 255;
                    while (--i >= 0 && (mul *= 256)) {
                        this[offset + i] = value / mul & 255;
                    }
                    return offset + byteLength;
                };
                Buffer[_x54187[33]][_x54187[140]] = function writeUInt8(value, offset, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkInt(this, value, offset, 1, 255, 0);
                    this[offset] = value & 255;
                    return offset + 1;
                };
                Buffer[_x54187[33]][_x54187[141]] = function writeUInt16LE(value, offset, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkInt(this, value, offset, 2, 65535, 0);
                    this[offset] = value & 255;
                    this[offset + 1] = value >>> 8;
                    return offset + 2;
                };
                Buffer[_x54187[33]][_x54187[142]] = function writeUInt16BE(value, offset, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkInt(this, value, offset, 2, 65535, 0);
                    this[offset] = value >>> 8;
                    this[offset + 1] = value & 255;
                    return offset + 2;
                };
                Buffer[_x54187[33]][_x54187[143]] = function writeUInt32LE(value, offset, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkInt(this, value, offset, 4, 4294967295, 0);
                    this[offset + 3] = value >>> 24;
                    this[offset + 2] = value >>> 16;
                    this[offset + 1] = value >>> 8;
                    this[offset] = value & 255;
                    return offset + 4;
                };
                Buffer[_x54187[33]][_x54187[144]] = function writeUInt32BE(value, offset, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkInt(this, value, offset, 4, 4294967295, 0);
                    this[offset] = value >>> 24;
                    this[offset + 1] = value >>> 16;
                    this[offset + 2] = value >>> 8;
                    this[offset + 3] = value & 255;
                    return offset + 4;
                };
                Buffer[_x54187[33]][_x54187[145]] = function writeIntLE(value, offset, byteLength, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    if (!noAssert) {
                        var limit = Math[_x54187[123]](2, 8 * byteLength - 1);
                        checkInt(this, value, offset, byteLength, limit - 1, -limit);
                    }
                    var i = 0;
                    var mul = 1;
                    var sub = 0;
                    this[offset] = value & 255;
                    while (++i < byteLength && (mul *= 256)) {
                        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
                            sub = 1;
                        }
                        this[offset + i] = (value / mul >> 0) - sub & 255;
                    }
                    return offset + byteLength;
                };
                Buffer[_x54187[33]][_x54187[146]] = function writeIntBE(value, offset, byteLength, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    if (!noAssert) {
                        var limit = Math[_x54187[123]](2, 8 * byteLength - 1);
                        checkInt(this, value, offset, byteLength, limit - 1, -limit);
                    }
                    var i = byteLength - 1;
                    var mul = 1;
                    var sub = 0;
                    this[offset + i] = value & 255;
                    while (--i >= 0 && (mul *= 256)) {
                        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
                            sub = 1;
                        }
                        this[offset + i] = (value / mul >> 0) - sub & 255;
                    }
                    return offset + byteLength;
                };
                Buffer[_x54187[33]][_x54187[147]] = function writeInt8(value, offset, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkInt(this, value, offset, 1, 127, -128);
                    if (value < 0)
                        value = 255 + value + 1;
                    this[offset] = value & 255;
                    return offset + 1;
                };
                Buffer[_x54187[33]][_x54187[148]] = function writeInt16LE(value, offset, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkInt(this, value, offset, 2, 32767, -32768);
                    this[offset] = value & 255;
                    this[offset + 1] = value >>> 8;
                    return offset + 2;
                };
                Buffer[_x54187[33]][_x54187[149]] = function writeInt16BE(value, offset, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkInt(this, value, offset, 2, 32767, -32768);
                    this[offset] = value >>> 8;
                    this[offset + 1] = value & 255;
                    return offset + 2;
                };
                Buffer[_x54187[33]][_x54187[150]] = function writeInt32LE(value, offset, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkInt(this, value, offset, 4, 2147483647, -2147483648);
                    this[offset] = value & 255;
                    this[offset + 1] = value >>> 8;
                    this[offset + 2] = value >>> 16;
                    this[offset + 3] = value >>> 24;
                    return offset + 4;
                };
                Buffer[_x54187[33]][_x54187[151]] = function writeInt32BE(value, offset, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    if (!noAssert)
                        checkInt(this, value, offset, 4, 2147483647, -2147483648);
                    if (value < 0)
                        value = 4294967295 + value + 1;
                    this[offset] = value >>> 24;
                    this[offset + 1] = value >>> 16;
                    this[offset + 2] = value >>> 8;
                    this[offset + 3] = value & 255;
                    return offset + 4;
                };
                function checkIEEE754(buf, value, offset, ext, max, min) {
                    if (offset + ext > buf[_x54187[7]])
                        throw new RangeError(_x54187[137]);
                    if (offset < 0)
                        throw new RangeError(_x54187[137]);
                }
                function writeFloat(buf, value, offset, littleEndian, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    if (!noAssert) {
                        checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
                    }
                    ieee754[_x54187[53]](buf, value, offset, littleEndian, 23, 4);
                    return offset + 4;
                }
                Buffer[_x54187[33]][_x54187[152]] = function writeFloatLE(value, offset, noAssert) {
                    return writeFloat(this, value, offset, true, noAssert);
                };
                Buffer[_x54187[33]][_x54187[153]] = function writeFloatBE(value, offset, noAssert) {
                    return writeFloat(this, value, offset, false, noAssert);
                };
                function writeDouble(buf, value, offset, littleEndian, noAssert) {
                    value = +value;
                    offset = offset >>> 0;
                    if (!noAssert) {
                        checkIEEE754(buf, value, offset, 8, 1.7976931348623157e+308, -1.7976931348623157e+308);
                    }
                    ieee754[_x54187[53]](buf, value, offset, littleEndian, 52, 8);
                    return offset + 8;
                }
                Buffer[_x54187[33]][_x54187[154]] = function writeDoubleLE(value, offset, noAssert) {
                    return writeDouble(this, value, offset, true, noAssert);
                };
                Buffer[_x54187[33]][_x54187[155]] = function writeDoubleBE(value, offset, noAssert) {
                    return writeDouble(this, value, offset, false, noAssert);
                };
                Buffer[_x54187[33]][_x54187[58]] = function copy(target, targetStart, start, end) {
                    if (!start)
                        start = 0;
                    if (!end && end !== 0)
                        end = this[_x54187[7]];
                    if (targetStart >= target[_x54187[7]])
                        targetStart = target[_x54187[7]];
                    if (!targetStart)
                        targetStart = 0;
                    if (end > 0 && end < start)
                        end = start;
                    if (end === start)
                        return 0;
                    if (target[_x54187[7]] === 0 || this[_x54187[7]] === 0)
                        return 0;
                    if (targetStart < 0) {
                        throw new RangeError(_x54187[156]);
                    }
                    if (start < 0 || start >= this[_x54187[7]])
                        throw new RangeError(_x54187[157]);
                    if (end < 0)
                        throw new RangeError(_x54187[158]);
                    if (end > this[_x54187[7]])
                        end = this[_x54187[7]];
                    if (target[_x54187[7]] - targetStart < end - start) {
                        end = target[_x54187[7]] - targetStart + start;
                    }
                    var len = end - start;
                    var i;
                    if (this === target && start < targetStart && targetStart < end) {
                        for (i = len - 1; i >= 0; --i) {
                            target[i + targetStart] = this[i + start];
                        }
                    } else if (len < 1000) {
                        for (i = 0; i < len; ++i) {
                            target[i + targetStart] = this[i + start];
                        }
                    } else {
                        Uint8Array[_x54187[33]][_x54187[159]][_x54187[5]](target, this[_x54187[113]](start, start + len), targetStart);
                    }
                    return len;
                };
                Buffer[_x54187[33]][_x54187[46]] = function fill(val, start, end, encoding) {
                    if (typeof val === _x54187[37]) {
                        if (typeof start === _x54187[37]) {
                            encoding = start;
                            start = 0;
                            end = this[_x54187[7]];
                        } else if (typeof end === _x54187[37]) {
                            encoding = end;
                            end = this[_x54187[7]];
                        }
                        if (val[_x54187[7]] === 1) {
                            var code = val[_x54187[13]](0);
                            if (code < 256) {
                                val = code;
                            }
                        }
                        if (encoding !== undefined && typeof encoding !== _x54187[37]) {
                            throw new TypeError(_x54187[160]);
                        }
                        if (typeof encoding === _x54187[37] && !Buffer[_x54187[51]](encoding)) {
                            throw new TypeError(_x54187[84] + encoding);
                        }
                    } else if (typeof val === _x54187[36]) {
                        val = val & 255;
                    }
                    if (start < 0 || this[_x54187[7]] < start || this[_x54187[7]] < end) {
                        throw new RangeError(_x54187[161]);
                    }
                    if (end <= start) {
                        return this;
                    }
                    start = start >>> 0;
                    end = end === undefined ? this[_x54187[7]] : end >>> 0;
                    if (!val)
                        val = 0;
                    var i;
                    if (typeof val === _x54187[36]) {
                        for (i = start; i < end; ++i) {
                            this[i] = val;
                        }
                    } else {
                        var bytes = Buffer[_x54187[57]](val) ? val : new Buffer(val, encoding);
                        var len = bytes[_x54187[7]];
                        for (i = 0; i < end - start; ++i) {
                            this[i + start] = bytes[i % len];
                        }
                    }
                    return this;
                };
                var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
                function base64clean(str) {
                    str = str[_x54187[163]]()[_x54187[162]](INVALID_BASE64_RE, _x54187[20]);
                    if (str[_x54187[7]] < 2)
                        return _x54187[20];
                    while (str[_x54187[7]] % 4 !== 0) {
                        str = str + _x54187[17];
                    }
                    return str;
                }
                function toHex(n) {
                    if (n < 16)
                        return _x54187[164] + n[_x54187[65]](16);
                    return n[_x54187[65]](16);
                }
                function utf8ToBytes(string, units) {
                    units = units || Infinity;
                    var codePoint;
                    var length = string[_x54187[7]];
                    var leadSurrogate = null;
                    var bytes = [];
                    for (var i = 0; i < length; ++i) {
                        codePoint = string[_x54187[13]](i);
                        if (codePoint > 55295 && codePoint < 57344) {
                            if (!leadSurrogate) {
                                if (codePoint > 56319) {
                                    if ((units -= 3) > -1)
                                        bytes[_x54187[18]](239, 191, 189);
                                    continue;
                                } else if (i + 1 === length) {
                                    if ((units -= 3) > -1)
                                        bytes[_x54187[18]](239, 191, 189);
                                    continue;
                                }
                                leadSurrogate = codePoint;
                                continue;
                            }
                            if (codePoint < 56320) {
                                if ((units -= 3) > -1)
                                    bytes[_x54187[18]](239, 191, 189);
                                leadSurrogate = codePoint;
                                continue;
                            }
                            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
                        } else if (leadSurrogate) {
                            if ((units -= 3) > -1)
                                bytes[_x54187[18]](239, 191, 189);
                        }
                        leadSurrogate = null;
                        if (codePoint < 128) {
                            if ((units -= 1) < 0)
                                break;
                            bytes[_x54187[18]](codePoint);
                        } else if (codePoint < 2048) {
                            if ((units -= 2) < 0)
                                break;
                            bytes[_x54187[18]](codePoint >> 6 | 192, codePoint & 63 | 128);
                        } else if (codePoint < 65536) {
                            if ((units -= 3) < 0)
                                break;
                            bytes[_x54187[18]](codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
                        } else if (codePoint < 1114112) {
                            if ((units -= 4) < 0)
                                break;
                            bytes[_x54187[18]](codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
                        } else {
                            throw new Error(_x54187[165]);
                        }
                    }
                    return bytes;
                }
                function asciiToBytes(str) {
                    var byteArray = [];
                    for (var i = 0; i < str[_x54187[7]]; ++i) {
                        byteArray[_x54187[18]](str[_x54187[13]](i) & 255);
                    }
                    return byteArray;
                }
                function utf16leToBytes(str, units) {
                    var c, hi, lo;
                    var byteArray = [];
                    for (var i = 0; i < str[_x54187[7]]; ++i) {
                        if ((units -= 2) < 0)
                            break;
                        c = str[_x54187[13]](i);
                        hi = c >> 8;
                        lo = c % 256;
                        byteArray[_x54187[18]](lo);
                        byteArray[_x54187[18]](hi);
                    }
                    return byteArray;
                }
                function base64ToBytes(str) {
                    return base64[_x54187[9]](base64clean(str));
                }
                function blitBuffer(src, dst, offset, length) {
                    for (var i = 0; i < length; ++i) {
                        if (i + offset >= dst[_x54187[7]] || i >= src[_x54187[7]])
                            break;
                        dst[i + offset] = src[i];
                    }
                    return i;
                }
                function isArrayBuffer(obj) {
                    return obj instanceof ArrayBuffer || obj != null && obj[_x54187[166]] != null && obj[_x54187[166]][_x54187[167]] === _x54187[168] && typeof obj[_x54187[8]] === _x54187[36];
                }
                function isArrayBufferView(obj) {
                    return typeof ArrayBuffer[_x54187[169]] === _x54187[0] && ArrayBuffer[_x54187[169]](obj);
                }
                function numberIsNaN(obj) {
                    return obj !== obj;
                }
            },
            {
                'base64-js': 1,
                'ieee754': 3
            }
        ],
        3: [
            function (require, module, exports) {
                exports[_x54187[131]] = function (buffer, offset, isLE, mLen, nBytes) {
                    var e, m;
                    var eLen = nBytes * 8 - mLen - 1;
                    var eMax = (1 << eLen) - 1;
                    var eBias = eMax >> 1;
                    var nBits = -7;
                    var i = isLE ? nBytes - 1 : 0;
                    var d = isLE ? -1 : 1;
                    var s = buffer[offset + i];
                    i += d;
                    e = s & (1 << -nBits) - 1;
                    s >>= -nBits;
                    nBits += eLen;
                    for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
                    }
                    m = e & (1 << -nBits) - 1;
                    e >>= -nBits;
                    nBits += mLen;
                    for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
                    }
                    if (e === 0) {
                        e = 1 - eBias;
                    } else if (e === eMax) {
                        return m ? NaN : (s ? -1 : 1) * Infinity;
                    } else {
                        m = m + Math[_x54187[123]](2, mLen);
                        e = e - eBias;
                    }
                    return (s ? -1 : 1) * m * Math[_x54187[123]](2, e - mLen);
                };
                exports[_x54187[53]] = function (buffer, value, offset, isLE, mLen, nBytes) {
                    var e, m, c;
                    var eLen = nBytes * 8 - mLen - 1;
                    var eMax = (1 << eLen) - 1;
                    var eBias = eMax >> 1;
                    var rt = mLen === 23 ? Math[_x54187[123]](2, -24) - Math[_x54187[123]](2, -77) : 0;
                    var i = isLE ? 0 : nBytes - 1;
                    var d = isLE ? 1 : -1;
                    var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
                    value = Math[_x54187[170]](value);
                    if (isNaN(value) || value === Infinity) {
                        m = isNaN(value) ? 1 : 0;
                        e = eMax;
                    } else {
                        e = Math[_x54187[171]](Math[_x54187[172]](value) / Math[_x54187[173]]);
                        if (value * (c = Math[_x54187[123]](2, -e)) < 1) {
                            e--;
                            c *= 2;
                        }
                        if (e + eBias >= 1) {
                            value += rt / c;
                        } else {
                            value += rt * Math[_x54187[123]](2, 1 - eBias);
                        }
                        if (value * c >= 2) {
                            e++;
                            c /= 2;
                        }
                        if (e + eBias >= eMax) {
                            m = 0;
                            e = eMax;
                        } else if (e + eBias >= 1) {
                            m = (value * c - 1) * Math[_x54187[123]](2, mLen);
                            e = e + eBias;
                        } else {
                            m = value * Math[_x54187[123]](2, eBias - 1) * Math[_x54187[123]](2, mLen);
                            e = 0;
                        }
                    }
                    for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
                    }
                    e = e << mLen | m;
                    eLen += mLen;
                    for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
                    }
                    buffer[offset + i - d] |= s * 128;
                };
            },
            {}
        ],
        4: [
            function (require, module, exports) {
                var process = module[_x54187[6]] = {};
                var cachedSetTimeout;
                var cachedClearTimeout;
                function defaultSetTimout() {
                    throw new Error(_x54187[174]);
                }
                function defaultClearTimeout() {
                    throw new Error(_x54187[175]);
                }
                (function () {
                    try {
                        if (typeof setTimeout === _x54187[0]) {
                            cachedSetTimeout = setTimeout;
                        } else {
                            cachedSetTimeout = defaultSetTimout;
                        }
                    } catch (e) {
                        cachedSetTimeout = defaultSetTimout;
                    }
                    try {
                        if (typeof clearTimeout === _x54187[0]) {
                            cachedClearTimeout = clearTimeout;
                        } else {
                            cachedClearTimeout = defaultClearTimeout;
                        }
                    } catch (e) {
                        cachedClearTimeout = defaultClearTimeout;
                    }
                }());
                function runTimeout(fun) {
                    if (cachedSetTimeout === setTimeout) {
                        return setTimeout(fun, 0);
                    }
                    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
                        cachedSetTimeout = setTimeout;
                        return setTimeout(fun, 0);
                    }
                    try {
                        return cachedSetTimeout(fun, 0);
                    } catch (e) {
                        try {
                            return cachedSetTimeout[_x54187[5]](null, fun, 0);
                        } catch (e) {
                            return cachedSetTimeout[_x54187[5]](this, fun, 0);
                        }
                    }
                }
                function runClearTimeout(marker) {
                    if (cachedClearTimeout === clearTimeout) {
                        return clearTimeout(marker);
                    }
                    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
                        cachedClearTimeout = clearTimeout;
                        return clearTimeout(marker);
                    }
                    try {
                        return cachedClearTimeout(marker);
                    } catch (e) {
                        try {
                            return cachedClearTimeout[_x54187[5]](null, marker);
                        } catch (e) {
                            return cachedClearTimeout[_x54187[5]](this, marker);
                        }
                    }
                }
                var queue = [];
                var draining = false;
                var currentQueue;
                var queueIndex = -1;
                function cleanUpNextTick() {
                    if (!draining || !currentQueue) {
                        return;
                    }
                    draining = false;
                    if (currentQueue[_x54187[7]]) {
                        queue = currentQueue[_x54187[82]](queue);
                    } else {
                        queueIndex = -1;
                    }
                    if (queue[_x54187[7]]) {
                        drainQueue();
                    }
                }
                function drainQueue() {
                    if (draining) {
                        return;
                    }
                    var timeout = runTimeout(cleanUpNextTick);
                    draining = true;
                    var len = queue[_x54187[7]];
                    while (len) {
                        currentQueue = queue;
                        queue = [];
                        while (++queueIndex < len) {
                            if (currentQueue) {
                                currentQueue[queueIndex][_x54187[176]]();
                            }
                        }
                        queueIndex = -1;
                        len = queue[_x54187[7]];
                    }
                    currentQueue = null;
                    draining = false;
                    runClearTimeout(timeout);
                }
                process[_x54187[177]] = function (fun) {
                    var args = new Array(arguments[_x54187[7]] - 1);
                    if (arguments[_x54187[7]] > 1) {
                        for (var i = 1; i < arguments[_x54187[7]]; i++) {
                            args[i - 1] = arguments[i];
                        }
                    }
                    queue[_x54187[18]](new Item(fun, args));
                    if (queue[_x54187[7]] === 1 && !draining) {
                        runTimeout(drainQueue);
                    }
                };
                function Item(fun, array) {
                    this[_x54187[178]] = fun;
                    this[_x54187[179]] = array;
                }
                Item[_x54187[33]][_x54187[176]] = function () {
                    this[_x54187[178]][_x54187[91]](null, this[_x54187[179]]);
                };
                process[_x54187[180]] = _x54187[181];
                process[_x54187[181]] = true;
                process[_x54187[182]] = {};
                process[_x54187[183]] = [];
                process[_x54187[184]] = _x54187[20];
                process[_x54187[185]] = {};
                function noop() {
                }
                process[_x54187[186]] = noop;
                process[_x54187[187]] = noop;
                process[_x54187[188]] = noop;
                process[_x54187[189]] = noop;
                process[_x54187[190]] = noop;
                process[_x54187[191]] = noop;
                process[_x54187[192]] = noop;
                process[_x54187[193]] = noop;
                process[_x54187[194]] = noop;
                process[_x54187[195]] = function (name) {
                    return [];
                };
                process[_x54187[196]] = function (name) {
                    throw new Error(_x54187[197]);
                };
                process[_x54187[198]] = function () {
                    return _x54187[199];
                };
                process[_x54187[200]] = function (dir) {
                    throw new Error(_x54187[201]);
                };
                process[_x54187[202]] = function () {
                    return 0;
                };
            },
            {}
        ],
        5: [
            function (require, module, exports) {
                (function (module, exports) {
                    'use strict';
                    function assert(val, msg) {
                        if (!val)
                            throw new Error(msg || _x54187[203]);
                    }
                    function inherits(ctor, superCtor) {
                        ctor[_x54187[204]] = superCtor;
                        var TempCtor = function () {
                        };
                        TempCtor[_x54187[33]] = superCtor[_x54187[33]];
                        ctor[_x54187[33]] = new TempCtor();
                        ctor[_x54187[33]][_x54187[166]] = ctor;
                    }
                    function BN(number, base, endian) {
                        if (BN[_x54187[205]](number)) {
                            return number;
                        }
                        this[_x54187[206]] = 0;
                        this[_x54187[207]] = null;
                        this[_x54187[7]] = 0;
                        this[_x54187[208]] = null;
                        if (number !== null) {
                            if (base === _x54187[209] || base === _x54187[210]) {
                                endian = base;
                                base = 10;
                            }
                            this[_x54187[211]](number || 0, base || 10, endian || _x54187[210]);
                        }
                    }
                    if (typeof module === _x54187[212]) {
                        module[_x54187[6]] = BN;
                    } else {
                        exports[_x54187[213]] = BN;
                    }
                    BN[_x54187[213]] = BN;
                    BN[_x54187[214]] = 26;
                    var Buffer;
                    try {
                        Buffer = require(_x54187[215] + _x54187[216])[_x54187[24]];
                    } catch (e) {
                    }
                    BN[_x54187[205]] = function isBN(num) {
                        if (num instanceof BN) {
                            return true;
                        }
                        return num !== null && typeof num === _x54187[212] && num[_x54187[166]][_x54187[214]] === BN[_x54187[214]] && Array[_x54187[60]](num[_x54187[207]]);
                    };
                    BN[_x54187[217]] = function max(left, right) {
                        if (left[_x54187[218]](right) > 0)
                            return left;
                        return right;
                    };
                    BN[_x54187[70]] = function min(left, right) {
                        if (left[_x54187[218]](right) < 0)
                            return left;
                        return right;
                    };
                    BN[_x54187[33]][_x54187[211]] = function init(number, base, endian) {
                        if (typeof number === _x54187[36]) {
                            return this[_x54187[219]](number, base, endian);
                        }
                        if (typeof number === _x54187[212]) {
                            return this[_x54187[220]](number, base, endian);
                        }
                        if (base === _x54187[72]) {
                            base = 16;
                        }
                        assert(base === (base | 0) && base >= 2 && base <= 36);
                        number = number[_x54187[65]]()[_x54187[162]](/\s+/g, _x54187[20]);
                        var start = 0;
                        if (number[0] === _x54187[14]) {
                            start++;
                        }
                        if (base === 16) {
                            this[_x54187[221]](number, start);
                        } else {
                            this[_x54187[222]](number, base, start);
                        }
                        if (number[0] === _x54187[14]) {
                            this[_x54187[206]] = 1;
                        }
                        this[_x54187[223]]();
                        if (endian !== _x54187[209])
                            return;
                        this[_x54187[220]](this[_x54187[224]](), base, endian);
                    };
                    BN[_x54187[33]][_x54187[219]] = function _initNumber(number, base, endian) {
                        if (number < 0) {
                            this[_x54187[206]] = 1;
                            number = -number;
                        }
                        if (number < 67108864) {
                            this[_x54187[207]] = [number & 67108863];
                            this[_x54187[7]] = 1;
                        } else if (number < 4503599627370496) {
                            this[_x54187[207]] = [
                                number & 67108863,
                                number / 67108864 & 67108863
                            ];
                            this[_x54187[7]] = 2;
                        } else {
                            assert(number < 9007199254740992);
                            this[_x54187[207]] = [
                                number & 67108863,
                                number / 67108864 & 67108863,
                                1
                            ];
                            this[_x54187[7]] = 3;
                        }
                        if (endian !== _x54187[209])
                            return;
                        this[_x54187[220]](this[_x54187[224]](), base, endian);
                    };
                    BN[_x54187[33]][_x54187[220]] = function _initArray(number, base, endian) {
                        assert(typeof number[_x54187[7]] === _x54187[36]);
                        if (number[_x54187[7]] <= 0) {
                            this[_x54187[207]] = [0];
                            this[_x54187[7]] = 1;
                            return this;
                        }
                        this[_x54187[7]] = Math[_x54187[225]](number[_x54187[7]] / 3);
                        this[_x54187[207]] = new Array(this[_x54187[7]]);
                        for (var i = 0; i < this[_x54187[7]]; i++) {
                            this[_x54187[207]][i] = 0;
                        }
                        var j, w;
                        var off = 0;
                        if (endian === _x54187[210]) {
                            for (i = number[_x54187[7]] - 1, j = 0; i >= 0; i -= 3) {
                                w = number[i] | number[i - 1] << 8 | number[i - 2] << 16;
                                this[_x54187[207]][j] |= w << off & 67108863;
                                this[_x54187[207]][j + 1] = w >>> 26 - off & 67108863;
                                off += 24;
                                if (off >= 26) {
                                    off -= 26;
                                    j++;
                                }
                            }
                        } else if (endian === _x54187[209]) {
                            for (i = 0, j = 0; i < number[_x54187[7]]; i += 3) {
                                w = number[i] | number[i + 1] << 8 | number[i + 2] << 16;
                                this[_x54187[207]][j] |= w << off & 67108863;
                                this[_x54187[207]][j + 1] = w >>> 26 - off & 67108863;
                                off += 24;
                                if (off >= 26) {
                                    off -= 26;
                                    j++;
                                }
                            }
                        }
                        return this[_x54187[223]]();
                    };
                    function parseHex(str, start, end) {
                        var r = 0;
                        var len = Math[_x54187[70]](str[_x54187[7]], end);
                        for (var i = start; i < len; i++) {
                            var c = str[_x54187[13]](i) - 48;
                            r <<= 4;
                            if (c >= 49 && c <= 54) {
                                r |= c - 49 + 10;
                            } else if (c >= 17 && c <= 22) {
                                r |= c - 17 + 10;
                            } else {
                                r |= c & 15;
                            }
                        }
                        return r;
                    }
                    BN[_x54187[33]][_x54187[221]] = function _parseHex(number, start) {
                        this[_x54187[7]] = Math[_x54187[225]]((number[_x54187[7]] - start) / 6);
                        this[_x54187[207]] = new Array(this[_x54187[7]]);
                        for (var i = 0; i < this[_x54187[7]]; i++) {
                            this[_x54187[207]][i] = 0;
                        }
                        var j, w;
                        var off = 0;
                        for (i = number[_x54187[7]] - 6, j = 0; i >= start; i -= 6) {
                            w = parseHex(number, i, i + 6);
                            this[_x54187[207]][j] |= w << off & 67108863;
                            this[_x54187[207]][j + 1] |= w >>> 26 - off & 4194303;
                            off += 24;
                            if (off >= 26) {
                                off -= 26;
                                j++;
                            }
                        }
                        if (i + 6 !== start) {
                            w = parseHex(number, start, i + 6);
                            this[_x54187[207]][j] |= w << off & 67108863;
                            this[_x54187[207]][j + 1] |= w >>> 26 - off & 4194303;
                        }
                        this[_x54187[223]]();
                    };
                    function parseBase(str, start, end, mul) {
                        var r = 0;
                        var len = Math[_x54187[70]](str[_x54187[7]], end);
                        for (var i = start; i < len; i++) {
                            var c = str[_x54187[13]](i) - 48;
                            r *= mul;
                            if (c >= 49) {
                                r += c - 49 + 10;
                            } else if (c >= 17) {
                                r += c - 17 + 10;
                            } else {
                                r += c;
                            }
                        }
                        return r;
                    }
                    BN[_x54187[33]][_x54187[222]] = function _parseBase(number, base, start) {
                        this[_x54187[207]] = [0];
                        this[_x54187[7]] = 1;
                        for (var limbLen = 0, limbPow = 1; limbPow <= 67108863; limbPow *= base) {
                            limbLen++;
                        }
                        limbLen--;
                        limbPow = limbPow / base | 0;
                        var total = number[_x54187[7]] - start;
                        var mod = total % limbLen;
                        var end = Math[_x54187[70]](total, total - mod) + start;
                        var word = 0;
                        for (var i = start; i < end; i += limbLen) {
                            word = parseBase(number, i, i + limbLen, base);
                            this[_x54187[226]](limbPow);
                            if (this[_x54187[207]][0] + word < 67108864) {
                                this[_x54187[207]][0] += word;
                            } else {
                                this[_x54187[227]](word);
                            }
                        }
                        if (mod !== 0) {
                            var pow = 1;
                            word = parseBase(number, i, number[_x54187[7]], base);
                            for (i = 0; i < mod; i++) {
                                pow *= base;
                            }
                            this[_x54187[226]](pow);
                            if (this[_x54187[207]][0] + word < 67108864) {
                                this[_x54187[207]][0] += word;
                            } else {
                                this[_x54187[227]](word);
                            }
                        }
                    };
                    BN[_x54187[33]][_x54187[58]] = function copy(dest) {
                        dest[_x54187[207]] = new Array(this[_x54187[7]]);
                        for (var i = 0; i < this[_x54187[7]]; i++) {
                            dest[_x54187[207]][i] = this[_x54187[207]][i];
                        }
                        dest[_x54187[7]] = this[_x54187[7]];
                        dest[_x54187[206]] = this[_x54187[206]];
                        dest[_x54187[208]] = this[_x54187[208]];
                    };
                    BN[_x54187[33]][_x54187[228]] = function clone() {
                        var r = new BN(null);
                        this[_x54187[58]](r);
                        return r;
                    };
                    BN[_x54187[33]][_x54187[229]] = function _expand(size) {
                        while (this[_x54187[7]] < size) {
                            this[_x54187[207]][this[_x54187[7]]++] = 0;
                        }
                        return this;
                    };
                    BN[_x54187[33]][_x54187[223]] = function strip() {
                        while (this[_x54187[7]] > 1 && this[_x54187[207]][this[_x54187[7]] - 1] === 0) {
                            this[_x54187[7]]--;
                        }
                        return this[_x54187[230]]();
                    };
                    BN[_x54187[33]][_x54187[230]] = function _normSign() {
                        if (this[_x54187[7]] === 1 && this[_x54187[207]][0] === 0) {
                            this[_x54187[206]] = 0;
                        }
                        return this;
                    };
                    BN[_x54187[33]][_x54187[94]] = function inspect() {
                        return (this[_x54187[208]] ? _x54187[231] : _x54187[232]) + this[_x54187[65]](16) + _x54187[99];
                    };
                    var zeros = [
                        _x54187[20],
                        _x54187[164],
                        _x54187[233],
                        _x54187[234],
                        _x54187[235],
                        _x54187[236],
                        _x54187[237],
                        _x54187[238],
                        _x54187[239],
                        _x54187[240],
                        _x54187[241],
                        _x54187[242],
                        _x54187[243],
                        _x54187[244],
                        _x54187[245],
                        _x54187[246],
                        _x54187[247],
                        _x54187[248],
                        _x54187[249],
                        _x54187[250],
                        _x54187[251],
                        _x54187[252],
                        _x54187[253],
                        _x54187[254],
                        _x54187[255],
                        _x54187[256]
                    ];
                    var groupSizes = [
                        0,
                        0,
                        25,
                        16,
                        12,
                        11,
                        10,
                        9,
                        8,
                        8,
                        7,
                        7,
                        7,
                        7,
                        6,
                        6,
                        6,
                        6,
                        6,
                        6,
                        6,
                        5,
                        5,
                        5,
                        5,
                        5,
                        5,
                        5,
                        5,
                        5,
                        5,
                        5,
                        5,
                        5,
                        5,
                        5,
                        5
                    ];
                    var groupBases = [
                        0,
                        0,
                        33554432,
                        43046721,
                        16777216,
                        48828125,
                        60466176,
                        40353607,
                        16777216,
                        43046721,
                        10000000,
                        19487171,
                        35831808,
                        62748517,
                        7529536,
                        11390625,
                        16777216,
                        24137569,
                        34012224,
                        47045881,
                        64000000,
                        4084101,
                        5153632,
                        6436343,
                        7962624,
                        9765625,
                        11881376,
                        14348907,
                        17210368,
                        20511149,
                        24300000,
                        28629151,
                        33554432,
                        39135393,
                        45435424,
                        52521875,
                        60466176
                    ];
                    BN[_x54187[33]][_x54187[65]] = function toString(base, padding) {
                        base = base || 10;
                        padding = padding | 0 || 1;
                        var out;
                        if (base === 16 || base === _x54187[72]) {
                            out = _x54187[20];
                            var off = 0;
                            var carry = 0;
                            for (var i = 0; i < this[_x54187[7]]; i++) {
                                var w = this[_x54187[207]][i];
                                var word = ((w << off | carry) & 16777215)[_x54187[65]](16);
                                carry = w >>> 24 - off & 16777215;
                                if (carry !== 0 || i !== this[_x54187[7]] - 1) {
                                    out = zeros[6 - word[_x54187[7]]] + word + out;
                                } else {
                                    out = word + out;
                                }
                                off += 2;
                                if (off >= 26) {
                                    off -= 26;
                                    i--;
                                }
                            }
                            if (carry !== 0) {
                                out = carry[_x54187[65]](16) + out;
                            }
                            while (out[_x54187[7]] % padding !== 0) {
                                out = _x54187[164] + out;
                            }
                            if (this[_x54187[206]] !== 0) {
                                out = _x54187[14] + out;
                            }
                            return out;
                        }
                        if (base === (base | 0) && base >= 2 && base <= 36) {
                            var groupSize = groupSizes[base];
                            var groupBase = groupBases[base];
                            out = _x54187[20];
                            var c = this[_x54187[228]]();
                            c[_x54187[206]] = 0;
                            while (!c[_x54187[257]]()) {
                                var r = c[_x54187[258]](groupBase)[_x54187[65]](base);
                                c = c[_x54187[259]](groupBase);
                                if (!c[_x54187[257]]()) {
                                    out = zeros[groupSize - r[_x54187[7]]] + r + out;
                                } else {
                                    out = r + out;
                                }
                            }
                            if (this[_x54187[257]]()) {
                                out = _x54187[164] + out;
                            }
                            while (out[_x54187[7]] % padding !== 0) {
                                out = _x54187[164] + out;
                            }
                            if (this[_x54187[206]] !== 0) {
                                out = _x54187[14] + out;
                            }
                            return out;
                        }
                        assert(false, _x54187[260]);
                    };
                    BN[_x54187[33]][_x54187[261]] = function toNumber() {
                        var ret = this[_x54187[207]][0];
                        if (this[_x54187[7]] === 2) {
                            ret += this[_x54187[207]][1] * 67108864;
                        } else if (this[_x54187[7]] === 3 && this[_x54187[207]][2] === 1) {
                            ret += 4503599627370496 + this[_x54187[207]][1] * 67108864;
                        } else if (this[_x54187[7]] > 2) {
                            assert(false, _x54187[262]);
                        }
                        return this[_x54187[206]] !== 0 ? -ret : ret;
                    };
                    BN[_x54187[33]][_x54187[110]] = function toJSON() {
                        return this[_x54187[65]](16);
                    };
                    BN[_x54187[33]][_x54187[263]] = function toBuffer(endian, length) {
                        assert(typeof Buffer !== _x54187[11]);
                        return this[_x54187[264]](Buffer, endian, length);
                    };
                    BN[_x54187[33]][_x54187[224]] = function toArray(endian, length) {
                        return this[_x54187[264]](Array, endian, length);
                    };
                    BN[_x54187[33]][_x54187[264]] = function toArrayLike(ArrayType, endian, length) {
                        var byteLength = this[_x54187[8]]();
                        var reqLength = length || Math[_x54187[217]](1, byteLength);
                        assert(byteLength <= reqLength, _x54187[265]);
                        assert(reqLength > 0, _x54187[266]);
                        this[_x54187[223]]();
                        var littleEndian = endian === _x54187[209];
                        var res = new ArrayType(reqLength);
                        var b, i;
                        var q = this[_x54187[228]]();
                        if (!littleEndian) {
                            for (i = 0; i < reqLength - byteLength; i++) {
                                res[i] = 0;
                            }
                            for (i = 0; !q[_x54187[257]](); i++) {
                                b = q[_x54187[267]](255);
                                q[_x54187[268]](8);
                                res[reqLength - i - 1] = b;
                            }
                        } else {
                            for (i = 0; !q[_x54187[257]](); i++) {
                                b = q[_x54187[267]](255);
                                q[_x54187[268]](8);
                                res[i] = b;
                            }
                            for (; i < reqLength; i++) {
                                res[i] = 0;
                            }
                        }
                        return res;
                    };
                    if (Math[_x54187[269]]) {
                        BN[_x54187[33]][_x54187[270]] = function _countBits(w) {
                            return 32 - Math[_x54187[269]](w);
                        };
                    } else {
                        BN[_x54187[33]][_x54187[270]] = function _countBits(w) {
                            var t = w;
                            var r = 0;
                            if (t >= 4096) {
                                r += 13;
                                t >>>= 13;
                            }
                            if (t >= 64) {
                                r += 7;
                                t >>>= 7;
                            }
                            if (t >= 8) {
                                r += 4;
                                t >>>= 4;
                            }
                            if (t >= 2) {
                                r += 2;
                                t >>>= 2;
                            }
                            return r + t;
                        };
                    }
                    BN[_x54187[33]][_x54187[271]] = function _zeroBits(w) {
                        if (w === 0)
                            return 26;
                        var t = w;
                        var r = 0;
                        if ((t & 8191) === 0) {
                            r += 13;
                            t >>>= 13;
                        }
                        if ((t & 127) === 0) {
                            r += 7;
                            t >>>= 7;
                        }
                        if ((t & 15) === 0) {
                            r += 4;
                            t >>>= 4;
                        }
                        if ((t & 3) === 0) {
                            r += 2;
                            t >>>= 2;
                        }
                        if ((t & 1) === 0) {
                            r++;
                        }
                        return r;
                    };
                    BN[_x54187[33]][_x54187[272]] = function bitLength() {
                        var w = this[_x54187[207]][this[_x54187[7]] - 1];
                        var hi = this[_x54187[270]](w);
                        return (this[_x54187[7]] - 1) * 26 + hi;
                    };
                    function toBitArray(num) {
                        var w = new Array(num[_x54187[272]]());
                        for (var bit = 0; bit < w[_x54187[7]]; bit++) {
                            var off = bit / 26 | 0;
                            var wbit = bit % 26;
                            w[bit] = (num[_x54187[207]][off] & 1 << wbit) >>> wbit;
                        }
                        return w;
                    }
                    BN[_x54187[33]][_x54187[273]] = function zeroBits() {
                        if (this[_x54187[257]]())
                            return 0;
                        var r = 0;
                        for (var i = 0; i < this[_x54187[7]]; i++) {
                            var b = this[_x54187[271]](this[_x54187[207]][i]);
                            r += b;
                            if (b !== 26)
                                break;
                        }
                        return r;
                    };
                    BN[_x54187[33]][_x54187[8]] = function byteLength() {
                        return Math[_x54187[225]](this[_x54187[272]]() / 8);
                    };
                    BN[_x54187[33]][_x54187[274]] = function toTwos(width) {
                        if (this[_x54187[206]] !== 0) {
                            return this[_x54187[170]]()[_x54187[276]](width)[_x54187[275]](1);
                        }
                        return this[_x54187[228]]();
                    };
                    BN[_x54187[33]][_x54187[277]] = function fromTwos(width) {
                        if (this[_x54187[278]](width - 1)) {
                            return this[_x54187[280]](width)[_x54187[275]](1)[_x54187[279]]();
                        }
                        return this[_x54187[228]]();
                    };
                    BN[_x54187[33]][_x54187[281]] = function isNeg() {
                        return this[_x54187[206]] !== 0;
                    };
                    BN[_x54187[33]][_x54187[282]] = function neg() {
                        return this[_x54187[228]]()[_x54187[279]]();
                    };
                    BN[_x54187[33]][_x54187[279]] = function ineg() {
                        if (!this[_x54187[257]]()) {
                            this[_x54187[206]] ^= 1;
                        }
                        return this;
                    };
                    BN[_x54187[33]][_x54187[283]] = function iuor(num) {
                        while (this[_x54187[7]] < num[_x54187[7]]) {
                            this[_x54187[207]][this[_x54187[7]]++] = 0;
                        }
                        for (var i = 0; i < num[_x54187[7]]; i++) {
                            this[_x54187[207]][i] = this[_x54187[207]][i] | num[_x54187[207]][i];
                        }
                        return this[_x54187[223]]();
                    };
                    BN[_x54187[33]][_x54187[284]] = function ior(num) {
                        assert((this[_x54187[206]] | num[_x54187[206]]) === 0);
                        return this[_x54187[283]](num);
                    };
                    BN[_x54187[33]][_x54187[285]] = function or(num) {
                        if (this[_x54187[7]] > num[_x54187[7]])
                            return this[_x54187[228]]()[_x54187[284]](num);
                        return num[_x54187[228]]()[_x54187[284]](this);
                    };
                    BN[_x54187[33]][_x54187[286]] = function uor(num) {
                        if (this[_x54187[7]] > num[_x54187[7]])
                            return this[_x54187[228]]()[_x54187[283]](num);
                        return num[_x54187[228]]()[_x54187[283]](this);
                    };
                    BN[_x54187[33]][_x54187[287]] = function iuand(num) {
                        var b;
                        if (this[_x54187[7]] > num[_x54187[7]]) {
                            b = num;
                        } else {
                            b = this;
                        }
                        for (var i = 0; i < b[_x54187[7]]; i++) {
                            this[_x54187[207]][i] = this[_x54187[207]][i] & num[_x54187[207]][i];
                        }
                        this[_x54187[7]] = b[_x54187[7]];
                        return this[_x54187[223]]();
                    };
                    BN[_x54187[33]][_x54187[288]] = function iand(num) {
                        assert((this[_x54187[206]] | num[_x54187[206]]) === 0);
                        return this[_x54187[287]](num);
                    };
                    BN[_x54187[33]][_x54187[289]] = function and(num) {
                        if (this[_x54187[7]] > num[_x54187[7]])
                            return this[_x54187[228]]()[_x54187[288]](num);
                        return num[_x54187[228]]()[_x54187[288]](this);
                    };
                    BN[_x54187[33]][_x54187[290]] = function uand(num) {
                        if (this[_x54187[7]] > num[_x54187[7]])
                            return this[_x54187[228]]()[_x54187[287]](num);
                        return num[_x54187[228]]()[_x54187[287]](this);
                    };
                    BN[_x54187[33]][_x54187[291]] = function iuxor(num) {
                        var a;
                        var b;
                        if (this[_x54187[7]] > num[_x54187[7]]) {
                            a = this;
                            b = num;
                        } else {
                            a = num;
                            b = this;
                        }
                        for (var i = 0; i < b[_x54187[7]]; i++) {
                            this[_x54187[207]][i] = a[_x54187[207]][i] ^ b[_x54187[207]][i];
                        }
                        if (this !== a) {
                            for (; i < a[_x54187[7]]; i++) {
                                this[_x54187[207]][i] = a[_x54187[207]][i];
                            }
                        }
                        this[_x54187[7]] = a[_x54187[7]];
                        return this[_x54187[223]]();
                    };
                    BN[_x54187[33]][_x54187[292]] = function ixor(num) {
                        assert((this[_x54187[206]] | num[_x54187[206]]) === 0);
                        return this[_x54187[291]](num);
                    };
                    BN[_x54187[33]][_x54187[293]] = function xor(num) {
                        if (this[_x54187[7]] > num[_x54187[7]])
                            return this[_x54187[228]]()[_x54187[292]](num);
                        return num[_x54187[228]]()[_x54187[292]](this);
                    };
                    BN[_x54187[33]][_x54187[294]] = function uxor(num) {
                        if (this[_x54187[7]] > num[_x54187[7]])
                            return this[_x54187[228]]()[_x54187[291]](num);
                        return num[_x54187[228]]()[_x54187[291]](this);
                    };
                    BN[_x54187[33]][_x54187[276]] = function inotn(width) {
                        assert(typeof width === _x54187[36] && width >= 0);
                        var bytesNeeded = Math[_x54187[225]](width / 26) | 0;
                        var bitsLeft = width % 26;
                        this[_x54187[229]](bytesNeeded);
                        if (bitsLeft > 0) {
                            bytesNeeded--;
                        }
                        for (var i = 0; i < bytesNeeded; i++) {
                            this[_x54187[207]][i] = ~this[_x54187[207]][i] & 67108863;
                        }
                        if (bitsLeft > 0) {
                            this[_x54187[207]][i] = ~this[_x54187[207]][i] & 67108863 >> 26 - bitsLeft;
                        }
                        return this[_x54187[223]]();
                    };
                    BN[_x54187[33]][_x54187[280]] = function notn(width) {
                        return this[_x54187[228]]()[_x54187[276]](width);
                    };
                    BN[_x54187[33]][_x54187[295]] = function setn(bit, val) {
                        assert(typeof bit === _x54187[36] && bit >= 0);
                        var off = bit / 26 | 0;
                        var wbit = bit % 26;
                        this[_x54187[229]](off + 1);
                        if (val) {
                            this[_x54187[207]][off] = this[_x54187[207]][off] | 1 << wbit;
                        } else {
                            this[_x54187[207]][off] = this[_x54187[207]][off] & ~(1 << wbit);
                        }
                        return this[_x54187[223]]();
                    };
                    BN[_x54187[33]][_x54187[296]] = function iadd(num) {
                        var r;
                        if (this[_x54187[206]] !== 0 && num[_x54187[206]] === 0) {
                            this[_x54187[206]] = 0;
                            r = this[_x54187[297]](num);
                            this[_x54187[206]] ^= 1;
                            return this[_x54187[230]]();
                        } else if (this[_x54187[206]] === 0 && num[_x54187[206]] !== 0) {
                            num[_x54187[206]] = 0;
                            r = this[_x54187[297]](num);
                            num[_x54187[206]] = 1;
                            return r[_x54187[230]]();
                        }
                        var a, b;
                        if (this[_x54187[7]] > num[_x54187[7]]) {
                            a = this;
                            b = num;
                        } else {
                            a = num;
                            b = this;
                        }
                        var carry = 0;
                        for (var i = 0; i < b[_x54187[7]]; i++) {
                            r = (a[_x54187[207]][i] | 0) + (b[_x54187[207]][i] | 0) + carry;
                            this[_x54187[207]][i] = r & 67108863;
                            carry = r >>> 26;
                        }
                        for (; carry !== 0 && i < a[_x54187[7]]; i++) {
                            r = (a[_x54187[207]][i] | 0) + carry;
                            this[_x54187[207]][i] = r & 67108863;
                            carry = r >>> 26;
                        }
                        this[_x54187[7]] = a[_x54187[7]];
                        if (carry !== 0) {
                            this[_x54187[207]][this[_x54187[7]]] = carry;
                            this[_x54187[7]]++;
                        } else if (a !== this) {
                            for (; i < a[_x54187[7]]; i++) {
                                this[_x54187[207]][i] = a[_x54187[207]][i];
                            }
                        }
                        return this;
                    };
                    BN[_x54187[33]][_x54187[298]] = function add(num) {
                        var res;
                        if (num[_x54187[206]] !== 0 && this[_x54187[206]] === 0) {
                            num[_x54187[206]] = 0;
                            res = this[_x54187[299]](num);
                            num[_x54187[206]] ^= 1;
                            return res;
                        } else if (num[_x54187[206]] === 0 && this[_x54187[206]] !== 0) {
                            this[_x54187[206]] = 0;
                            res = num[_x54187[299]](this);
                            this[_x54187[206]] = 1;
                            return res;
                        }
                        if (this[_x54187[7]] > num[_x54187[7]])
                            return this[_x54187[228]]()[_x54187[296]](num);
                        return num[_x54187[228]]()[_x54187[296]](this);
                    };
                    BN[_x54187[33]][_x54187[297]] = function isub(num) {
                        if (num[_x54187[206]] !== 0) {
                            num[_x54187[206]] = 0;
                            var r = this[_x54187[296]](num);
                            num[_x54187[206]] = 1;
                            return r[_x54187[230]]();
                        } else if (this[_x54187[206]] !== 0) {
                            this[_x54187[206]] = 0;
                            this[_x54187[296]](num);
                            this[_x54187[206]] = 1;
                            return this[_x54187[230]]();
                        }
                        var cmp = this[_x54187[218]](num);
                        if (cmp === 0) {
                            this[_x54187[206]] = 0;
                            this[_x54187[7]] = 1;
                            this[_x54187[207]][0] = 0;
                            return this;
                        }
                        var a, b;
                        if (cmp > 0) {
                            a = this;
                            b = num;
                        } else {
                            a = num;
                            b = this;
                        }
                        var carry = 0;
                        for (var i = 0; i < b[_x54187[7]]; i++) {
                            r = (a[_x54187[207]][i] | 0) - (b[_x54187[207]][i] | 0) + carry;
                            carry = r >> 26;
                            this[_x54187[207]][i] = r & 67108863;
                        }
                        for (; carry !== 0 && i < a[_x54187[7]]; i++) {
                            r = (a[_x54187[207]][i] | 0) + carry;
                            carry = r >> 26;
                            this[_x54187[207]][i] = r & 67108863;
                        }
                        if (carry === 0 && i < a[_x54187[7]] && a !== this) {
                            for (; i < a[_x54187[7]]; i++) {
                                this[_x54187[207]][i] = a[_x54187[207]][i];
                            }
                        }
                        this[_x54187[7]] = Math[_x54187[217]](this[_x54187[7]], i);
                        if (a !== this) {
                            this[_x54187[206]] = 1;
                        }
                        return this[_x54187[223]]();
                    };
                    BN[_x54187[33]][_x54187[299]] = function sub(num) {
                        return this[_x54187[228]]()[_x54187[297]](num);
                    };
                    function smallMulTo(self, num, out) {
                        out[_x54187[206]] = num[_x54187[206]] ^ self[_x54187[206]];
                        var len = self[_x54187[7]] + num[_x54187[7]] | 0;
                        out[_x54187[7]] = len;
                        len = len - 1 | 0;
                        var a = self[_x54187[207]][0] | 0;
                        var b = num[_x54187[207]][0] | 0;
                        var r = a * b;
                        var lo = r & 67108863;
                        var carry = r / 67108864 | 0;
                        out[_x54187[207]][0] = lo;
                        for (var k = 1; k < len; k++) {
                            var ncarry = carry >>> 26;
                            var rword = carry & 67108863;
                            var maxJ = Math[_x54187[70]](k, num[_x54187[7]] - 1);
                            for (var j = Math[_x54187[217]](0, k - self[_x54187[7]] + 1); j <= maxJ; j++) {
                                var i = k - j | 0;
                                a = self[_x54187[207]][i] | 0;
                                b = num[_x54187[207]][j] | 0;
                                r = a * b + rword;
                                ncarry += r / 67108864 | 0;
                                rword = r & 67108863;
                            }
                            out[_x54187[207]][k] = rword | 0;
                            carry = ncarry | 0;
                        }
                        if (carry !== 0) {
                            out[_x54187[207]][k] = carry | 0;
                        } else {
                            out[_x54187[7]]--;
                        }
                        return out[_x54187[223]]();
                    }
                    var comb10MulTo = function comb10MulTo(self, num, out) {
                        var a = self[_x54187[207]];
                        var b = num[_x54187[207]];
                        var o = out[_x54187[207]];
                        var c = 0;
                        var lo;
                        var mid;
                        var hi;
                        var a0 = a[0] | 0;
                        var al0 = a0 & 8191;
                        var ah0 = a0 >>> 13;
                        var a1 = a[1] | 0;
                        var al1 = a1 & 8191;
                        var ah1 = a1 >>> 13;
                        var a2 = a[2] | 0;
                        var al2 = a2 & 8191;
                        var ah2 = a2 >>> 13;
                        var a3 = a[3] | 0;
                        var al3 = a3 & 8191;
                        var ah3 = a3 >>> 13;
                        var a4 = a[4] | 0;
                        var al4 = a4 & 8191;
                        var ah4 = a4 >>> 13;
                        var a5 = a[5] | 0;
                        var al5 = a5 & 8191;
                        var ah5 = a5 >>> 13;
                        var a6 = a[6] | 0;
                        var al6 = a6 & 8191;
                        var ah6 = a6 >>> 13;
                        var a7 = a[7] | 0;
                        var al7 = a7 & 8191;
                        var ah7 = a7 >>> 13;
                        var a8 = a[8] | 0;
                        var al8 = a8 & 8191;
                        var ah8 = a8 >>> 13;
                        var a9 = a[9] | 0;
                        var al9 = a9 & 8191;
                        var ah9 = a9 >>> 13;
                        var b0 = b[0] | 0;
                        var bl0 = b0 & 8191;
                        var bh0 = b0 >>> 13;
                        var b1 = b[1] | 0;
                        var bl1 = b1 & 8191;
                        var bh1 = b1 >>> 13;
                        var b2 = b[2] | 0;
                        var bl2 = b2 & 8191;
                        var bh2 = b2 >>> 13;
                        var b3 = b[3] | 0;
                        var bl3 = b3 & 8191;
                        var bh3 = b3 >>> 13;
                        var b4 = b[4] | 0;
                        var bl4 = b4 & 8191;
                        var bh4 = b4 >>> 13;
                        var b5 = b[5] | 0;
                        var bl5 = b5 & 8191;
                        var bh5 = b5 >>> 13;
                        var b6 = b[6] | 0;
                        var bl6 = b6 & 8191;
                        var bh6 = b6 >>> 13;
                        var b7 = b[7] | 0;
                        var bl7 = b7 & 8191;
                        var bh7 = b7 >>> 13;
                        var b8 = b[8] | 0;
                        var bl8 = b8 & 8191;
                        var bh8 = b8 >>> 13;
                        var b9 = b[9] | 0;
                        var bl9 = b9 & 8191;
                        var bh9 = b9 >>> 13;
                        out[_x54187[206]] = self[_x54187[206]] ^ num[_x54187[206]];
                        out[_x54187[7]] = 19;
                        lo = Math[_x54187[300]](al0, bl0);
                        mid = Math[_x54187[300]](al0, bh0);
                        mid = mid + Math[_x54187[300]](ah0, bl0) | 0;
                        hi = Math[_x54187[300]](ah0, bh0);
                        var w0 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
                        c = (hi + (mid >>> 13) | 0) + (w0 >>> 26) | 0;
                        w0 &= 67108863;
                        lo = Math[_x54187[300]](al1, bl0);
                        mid = Math[_x54187[300]](al1, bh0);
                        mid = mid + Math[_x54187[300]](ah1, bl0) | 0;
                        hi = Math[_x54187[300]](ah1, bh0);
                        lo = lo + Math[_x54187[300]](al0, bl1) | 0;
                        mid = mid + Math[_x54187[300]](al0, bh1) | 0;
                        mid = mid + Math[_x54187[300]](ah0, bl1) | 0;
                        hi = hi + Math[_x54187[300]](ah0, bh1) | 0;
                        var w1 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
                        c = (hi + (mid >>> 13) | 0) + (w1 >>> 26) | 0;
                        w1 &= 67108863;
                        lo = Math[_x54187[300]](al2, bl0);
                        mid = Math[_x54187[300]](al2, bh0);
                        mid = mid + Math[_x54187[300]](ah2, bl0) | 0;
                        hi = Math[_x54187[300]](ah2, bh0);
                        lo = lo + Math[_x54187[300]](al1, bl1) | 0;
                        mid = mid + Math[_x54187[300]](al1, bh1) | 0;
                        mid = mid + Math[_x54187[300]](ah1, bl1) | 0;
                        hi = hi + Math[_x54187[300]](ah1, bh1) | 0;
                        lo = lo + Math[_x54187[300]](al0, bl2) | 0;
                        mid = mid + Math[_x54187[300]](al0, bh2) | 0;
                        mid = mid + Math[_x54187[300]](ah0, bl2) | 0;
                        hi = hi + Math[_x54187[300]](ah0, bh2) | 0;
                        var w2 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
                        c = (hi + (mid >>> 13) | 0) + (w2 >>> 26) | 0;
                        w2 &= 67108863;
                        lo = Math[_x54187[300]](al3, bl0);
                        mid = Math[_x54187[300]](al3, bh0);
                        mid = mid + Math[_x54187[300]](ah3, bl0) | 0;
                        hi = Math[_x54187[300]](ah3, bh0);
                        lo = lo + Math[_x54187[300]](al2, bl1) | 0;
                        mid = mid + Math[_x54187[300]](al2, bh1) | 0;
                        mid = mid + Math[_x54187[300]](ah2, bl1) | 0;
                        hi = hi + Math[_x54187[300]](ah2, bh1) | 0;
                        lo = lo + Math[_x54187[300]](al1, bl2) | 0;
                        mid = mid + Math[_x54187[300]](al1, bh2) | 0;
                        mid = mid + Math[_x54187[300]](ah1, bl2) | 0;
                        hi = hi + Math[_x54187[300]](ah1, bh2) | 0;
                        lo = lo + Math[_x54187[300]](al0, bl3) | 0;
                        mid = mid + Math[_x54187[300]](al0, bh3) | 0;
                        mid = mid + Math[_x54187[300]](ah0, bl3) | 0;
                        hi = hi + Math[_x54187[300]](ah0, bh3) | 0;
                        var w3 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
                        c = (hi + (mid >>> 13) | 0) + (w3 >>> 26) | 0;
                        w3 &= 67108863;
                        lo = Math[_x54187[300]](al4, bl0);
                        mid = Math[_x54187[300]](al4, bh0);
                        mid = mid + Math[_x54187[300]](ah4, bl0) | 0;
                        hi = Math[_x54187[300]](ah4, bh0);
                        lo = lo + Math[_x54187[300]](al3, bl1) | 0;
                        mid = mid + Math[_x54187[300]](al3, bh1) | 0;
                        mid = mid + Math[_x54187[300]](ah3, bl1) | 0;
                        hi = hi + Math[_x54187[300]](ah3, bh1) | 0;
                        lo = lo + Math[_x54187[300]](al2, bl2) | 0;
                        mid = mid + Math[_x54187[300]](al2, bh2) | 0;
                        mid = mid + Math[_x54187[300]](ah2, bl2) | 0;
                        hi = hi + Math[_x54187[300]](ah2, bh2) | 0;
                        lo = lo + Math[_x54187[300]](al1, bl3) | 0;
                        mid = mid + Math[_x54187[300]](al1, bh3) | 0;
                        mid = mid + Math[_x54187[300]](ah1, bl3) | 0;
                        hi = hi + Math[_x54187[300]](ah1, bh3) | 0;
                        lo = lo + Math[_x54187[300]](al0, bl4) | 0;
                        mid = mid + Math[_x54187[300]](al0, bh4) | 0;
                        mid = mid + Math[_x54187[300]](ah0, bl4) | 0;
                        hi = hi + Math[_x54187[300]](ah0, bh4) | 0;
                        var w4 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
                        c = (hi + (mid >>> 13) | 0) + (w4 >>> 26) | 0;
                        w4 &= 67108863;
                        lo = Math[_x54187[300]](al5, bl0);
                        mid = Math[_x54187[300]](al5, bh0);
                        mid = mid + Math[_x54187[300]](ah5, bl0) | 0;
                        hi = Math[_x54187[300]](ah5, bh0);
                        lo = lo + Math[_x54187[300]](al4, bl1) | 0;
                        mid = mid + Math[_x54187[300]](al4, bh1) | 0;
                        mid = mid + Math[_x54187[300]](ah4, bl1) | 0;
                        hi = hi + Math[_x54187[300]](ah4, bh1) | 0;
                        lo = lo + Math[_x54187[300]](al3, bl2) | 0;
                        mid = mid + Math[_x54187[300]](al3, bh2) | 0;
                        mid = mid + Math[_x54187[300]](ah3, bl2) | 0;
                        hi = hi + Math[_x54187[300]](ah3, bh2) | 0;
                        lo = lo + Math[_x54187[300]](al2, bl3) | 0;
                        mid = mid + Math[_x54187[300]](al2, bh3) | 0;
                        mid = mid + Math[_x54187[300]](ah2, bl3) | 0;
                        hi = hi + Math[_x54187[300]](ah2, bh3) | 0;
                        lo = lo + Math[_x54187[300]](al1, bl4) | 0;
                        mid = mid + Math[_x54187[300]](al1, bh4) | 0;
                        mid = mid + Math[_x54187[300]](ah1, bl4) | 0;
                        hi = hi + Math[_x54187[300]](ah1, bh4) | 0;
                        lo = lo + Math[_x54187[300]](al0, bl5) | 0;
                        mid = mid + Math[_x54187[300]](al0, bh5) | 0;
                        mid = mid + Math[_x54187[300]](ah0, bl5) | 0;
                        hi = hi + Math[_x54187[300]](ah0, bh5) | 0;
                        var w5 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
                        c = (hi + (mid >>> 13) | 0) + (w5 >>> 26) | 0;
                        w5 &= 67108863;
                        lo = Math[_x54187[300]](al6, bl0);
                        mid = Math[_x54187[300]](al6, bh0);
                        mid = mid + Math[_x54187[300]](ah6, bl0) | 0;
                        hi = Math[_x54187[300]](ah6, bh0);
                        lo = lo + Math[_x54187[300]](al5, bl1) | 0;
                        mid = mid + Math[_x54187[300]](al5, bh1) | 0;
                        mid = mid + Math[_x54187[300]](ah5, bl1) | 0;
                        hi = hi + Math[_x54187[300]](ah5, bh1) | 0;
                        lo = lo + Math[_x54187[300]](al4, bl2) | 0;
                        mid = mid + Math[_x54187[300]](al4, bh2) | 0;
                        mid = mid + Math[_x54187[300]](ah4, bl2) | 0;
                        hi = hi + Math[_x54187[300]](ah4, bh2) | 0;
                        lo = lo + Math[_x54187[300]](al3, bl3) | 0;
                        mid = mid + Math[_x54187[300]](al3, bh3) | 0;
                        mid = mid + Math[_x54187[300]](ah3, bl3) | 0;
                        hi = hi + Math[_x54187[300]](ah3, bh3) | 0;
                        lo = lo + Math[_x54187[300]](al2, bl4) | 0;
                        mid = mid + Math[_x54187[300]](al2, bh4) | 0;
                        mid = mid + Math[_x54187[300]](ah2, bl4) | 0;
                        hi = hi + Math[_x54187[300]](ah2, bh4) | 0;
                        lo = lo + Math[_x54187[300]](al1, bl5) | 0;
                        mid = mid + Math[_x54187[300]](al1, bh5) | 0;
                        mid = mid + Math[_x54187[300]](ah1, bl5) | 0;
                        hi = hi + Math[_x54187[300]](ah1, bh5) | 0;
                        lo = lo + Math[_x54187[300]](al0, bl6) | 0;
                        mid = mid + Math[_x54187[300]](al0, bh6) | 0;
                        mid = mid + Math[_x54187[300]](ah0, bl6) | 0;
                        hi = hi + Math[_x54187[300]](ah0, bh6) | 0;
                        var w6 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
                        c = (hi + (mid >>> 13) | 0) + (w6 >>> 26) | 0;
                        w6 &= 67108863;
                        lo = Math[_x54187[300]](al7, bl0);
                        mid = Math[_x54187[300]](al7, bh0);
                        mid = mid + Math[_x54187[300]](ah7, bl0) | 0;
                        hi = Math[_x54187[300]](ah7, bh0);
                        lo = lo + Math[_x54187[300]](al6, bl1) | 0;
                        mid = mid + Math[_x54187[300]](al6, bh1) | 0;
                        mid = mid + Math[_x54187[300]](ah6, bl1) | 0;
                        hi = hi + Math[_x54187[300]](ah6, bh1) | 0;
                        lo = lo + Math[_x54187[300]](al5, bl2) | 0;
                        mid = mid + Math[_x54187[300]](al5, bh2) | 0;
                        mid = mid + Math[_x54187[300]](ah5, bl2) | 0;
                        hi = hi + Math[_x54187[300]](ah5, bh2) | 0;
                        lo = lo + Math[_x54187[300]](al4, bl3) | 0;
                        mid = mid + Math[_x54187[300]](al4, bh3) | 0;
                        mid = mid + Math[_x54187[300]](ah4, bl3) | 0;
                        hi = hi + Math[_x54187[300]](ah4, bh3) | 0;
                        lo = lo + Math[_x54187[300]](al3, bl4) | 0;
                        mid = mid + Math[_x54187[300]](al3, bh4) | 0;
                        mid = mid + Math[_x54187[300]](ah3, bl4) | 0;
                        hi = hi + Math[_x54187[300]](ah3, bh4) | 0;
                        lo = lo + Math[_x54187[300]](al2, bl5) | 0;
                        mid = mid + Math[_x54187[300]](al2, bh5) | 0;
                        mid = mid + Math[_x54187[300]](ah2, bl5) | 0;
                        hi = hi + Math[_x54187[300]](ah2, bh5) | 0;
                        lo = lo + Math[_x54187[300]](al1, bl6) | 0;
                        mid = mid + Math[_x54187[300]](al1, bh6) | 0;
                        mid = mid + Math[_x54187[300]](ah1, bl6) | 0;
                        hi = hi + Math[_x54187[300]](ah1, bh6) | 0;
                        lo = lo + Math[_x54187[300]](al0, bl7) | 0;
                        mid = mid + Math[_x54187[300]](al0, bh7) | 0;
                        mid = mid + Math[_x54187[300]](ah0, bl7) | 0;
                        hi = hi + Math[_x54187[300]](ah0, bh7) | 0;
                        var w7 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
                        c = (hi + (mid >>> 13) | 0) + (w7 >>> 26) | 0;
                        w7 &= 67108863;
                        lo = Math[_x54187[300]](al8, bl0);
                        mid = Math[_x54187[300]](al8, bh0);
                        mid = mid + Math[_x54187[300]](ah8, bl0) | 0;
                        hi = Math[_x54187[300]](ah8, bh0);
                        lo = lo + Math[_x54187[300]](al7, bl1) | 0;
                        mid = mid + Math[_x54187[300]](al7, bh1) | 0;
                        mid = mid + Math[_x54187[300]](ah7, bl1) | 0;
                        hi = hi + Math[_x54187[300]](ah7, bh1) | 0;
                        lo = lo + Math[_x54187[300]](al6, bl2) | 0;
                        mid = mid + Math[_x54187[300]](al6, bh2) | 0;
                        mid = mid + Math[_x54187[300]](ah6, bl2) | 0;
                        hi = hi + Math[_x54187[300]](ah6, bh2) | 0;
                        lo = lo + Math[_x54187[300]](al5, bl3) | 0;
                        mid = mid + Math[_x54187[300]](al5, bh3) | 0;
                        mid = mid + Math[_x54187[300]](ah5, bl3) | 0;
                        hi = hi + Math[_x54187[300]](ah5, bh3) | 0;
                        lo = lo + Math[_x54187[300]](al4, bl4) | 0;
                        mid = mid + Math[_x54187[300]](al4, bh4) | 0;
                        mid = mid + Math[_x54187[300]](ah4, bl4) | 0;
                        hi = hi + Math[_x54187[300]](ah4, bh4) | 0;
                        lo = lo + Math[_x54187[300]](al3, bl5) | 0;
                        mid = mid + Math[_x54187[300]](al3, bh5) | 0;
                        mid = mid + Math[_x54187[300]](ah3, bl5) | 0;
                        hi = hi + Math[_x54187[300]](ah3, bh5) | 0;
                        lo = lo + Math[_x54187[300]](al2, bl6) | 0;
                        mid = mid + Math[_x54187[300]](al2, bh6) | 0;
                        mid = mid + Math[_x54187[300]](ah2, bl6) | 0;
                        hi = hi + Math[_x54187[300]](ah2, bh6) | 0;
                        lo = lo + Math[_x54187[300]](al1, bl7) | 0;
                        mid = mid + Math[_x54187[300]](al1, bh7) | 0;
                        mid = mid + Math[_x54187[300]](ah1, bl7) | 0;
                        hi = hi + Math[_x54187[300]](ah1, bh7) | 0;
                        lo = lo + Math[_x54187[300]](al0, bl8) | 0;
                        mid = mid + Math[_x54187[300]](al0, bh8) | 0;
                        mid = mid + Math[_x54187[300]](ah0, bl8) | 0;
                        hi = hi + Math[_x54187[300]](ah0, bh8) | 0;
                        var w8 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
                        c = (hi + (mid >>> 13) | 0) + (w8 >>> 26) | 0;
                        w8 &= 67108863;
                        lo = Math[_x54187[300]](al9, bl0);
                        mid = Math[_x54187[300]](al9, bh0);
                        mid = mid + Math[_x54187[300]](ah9, bl0) | 0;
                        hi = Math[_x54187[300]](ah9, bh0);
                        lo = lo + Math[_x54187[300]](al8, bl1) | 0;
                        mid = mid + Math[_x54187[300]](al8, bh1) | 0;
                        mid = mid + Math[_x54187[300]](ah8, bl1) | 0;
                        hi = hi + Math[_x54187[300]](ah8, bh1) | 0;
                        lo = lo + Math[_x54187[300]](al7, bl2) | 0;
                        mid = mid + Math[_x54187[300]](al7, bh2) | 0;
                        mid = mid + Math[_x54187[300]](ah7, bl2) | 0;
                        hi = hi + Math[_x54187[300]](ah7, bh2) | 0;
                        lo = lo + Math[_x54187[300]](al6, bl3) | 0;
                        mid = mid + Math[_x54187[300]](al6, bh3) | 0;
                        mid = mid + Math[_x54187[300]](ah6, bl3) | 0;
                        hi = hi + Math[_x54187[300]](ah6, bh3) | 0;
                        lo = lo + Math[_x54187[300]](al5, bl4) | 0;
                        mid = mid + Math[_x54187[300]](al5, bh4) | 0;
                        mid = mid + Math[_x54187[300]](ah5, bl4) | 0;
                        hi = hi + Math[_x54187[300]](ah5, bh4) | 0;
                        lo = lo + Math[_x54187[300]](al4, bl5) | 0;
                        mid = mid + Math[_x54187[300]](al4, bh5) | 0;
                        mid = mid + Math[_x54187[300]](ah4, bl5) | 0;
                        hi = hi + Math[_x54187[300]](ah4, bh5) | 0;
                        lo = lo + Math[_x54187[300]](al3, bl6) | 0;
                        mid = mid + Math[_x54187[300]](al3, bh6) | 0;
                        mid = mid + Math[_x54187[300]](ah3, bl6) | 0;
                        hi = hi + Math[_x54187[300]](ah3, bh6) | 0;
                        lo = lo + Math[_x54187[300]](al2, bl7) | 0;
                        mid = mid + Math[_x54187[300]](al2, bh7) | 0;
                        mid = mid + Math[_x54187[300]](ah2, bl7) | 0;
                        hi = hi + Math[_x54187[300]](ah2, bh7) | 0;
                        lo = lo + Math[_x54187[300]](al1, bl8) | 0;
                        mid = mid + Math[_x54187[300]](al1, bh8) | 0;
                        mid = mid + Math[_x54187[300]](ah1, bl8) | 0;
                        hi = hi + Math[_x54187[300]](ah1, bh8) | 0;
                        lo = lo + Math[_x54187[300]](al0, bl9) | 0;
                        mid = mid + Math[_x54187[300]](al0, bh9) | 0;
                        mid = mid + Math[_x54187[300]](ah0, bl9) | 0;
                        hi = hi + Math[_x54187[300]](ah0, bh9) | 0;
                        var w9 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
                        c = (hi + (mid >>> 13) | 0) + (w9 >>> 26) | 0;
                        w9 &= 67108863;
                        lo = Math[_x54187[300]](al9, bl1);
                        mid = Math[_x54187[300]](al9, bh1);
                        mid = mid + Math[_x54187[300]](ah9, bl1) | 0;
                        hi = Math[_x54187[300]](ah9, bh1);
                        lo = lo + Math[_x54187[300]](al8, bl2) | 0;
                        mid = mid + Math[_x54187[300]](al8, bh2) | 0;
                        mid = mid + Math[_x54187[300]](ah8, bl2) | 0;
                        hi = hi + Math[_x54187[300]](ah8, bh2) | 0;
                        lo = lo + Math[_x54187[300]](al7, bl3) | 0;
                        mid = mid + Math[_x54187[300]](al7, bh3) | 0;
                        mid = mid + Math[_x54187[300]](ah7, bl3) | 0;
                        hi = hi + Math[_x54187[300]](ah7, bh3) | 0;
                        lo = lo + Math[_x54187[300]](al6, bl4) | 0;
                        mid = mid + Math[_x54187[300]](al6, bh4) | 0;
                        mid = mid + Math[_x54187[300]](ah6, bl4) | 0;
                        hi = hi + Math[_x54187[300]](ah6, bh4) | 0;
                        lo = lo + Math[_x54187[300]](al5, bl5) | 0;
                        mid = mid + Math[_x54187[300]](al5, bh5) | 0;
                        mid = mid + Math[_x54187[300]](ah5, bl5) | 0;
                        hi = hi + Math[_x54187[300]](ah5, bh5) | 0;
                        lo = lo + Math[_x54187[300]](al4, bl6) | 0;
                        mid = mid + Math[_x54187[300]](al4, bh6) | 0;
                        mid = mid + Math[_x54187[300]](ah4, bl6) | 0;
                        hi = hi + Math[_x54187[300]](ah4, bh6) | 0;
                        lo = lo + Math[_x54187[300]](al3, bl7) | 0;
                        mid = mid + Math[_x54187[300]](al3, bh7) | 0;
                        mid = mid + Math[_x54187[300]](ah3, bl7) | 0;
                        hi = hi + Math[_x54187[300]](ah3, bh7) | 0;
                        lo = lo + Math[_x54187[300]](al2, bl8) | 0;
                        mid = mid + Math[_x54187[300]](al2, bh8) | 0;
                        mid = mid + Math[_x54187[300]](ah2, bl8) | 0;
                        hi = hi + Math[_x54187[300]](ah2, bh8) | 0;
                        lo = lo + Math[_x54187[300]](al1, bl9) | 0;
                        mid = mid + Math[_x54187[300]](al1, bh9) | 0;
                        mid = mid + Math[_x54187[300]](ah1, bl9) | 0;
                        hi = hi + Math[_x54187[300]](ah1, bh9) | 0;
                        var w10 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
                        c = (hi + (mid >>> 13) | 0) + (w10 >>> 26) | 0;
                        w10 &= 67108863;
                        lo = Math[_x54187[300]](al9, bl2);
                        mid = Math[_x54187[300]](al9, bh2);
                        mid = mid + Math[_x54187[300]](ah9, bl2) | 0;
                        hi = Math[_x54187[300]](ah9, bh2);
                        lo = lo + Math[_x54187[300]](al8, bl3) | 0;
                        mid = mid + Math[_x54187[300]](al8, bh3) | 0;
                        mid = mid + Math[_x54187[300]](ah8, bl3) | 0;
                        hi = hi + Math[_x54187[300]](ah8, bh3) | 0;
                        lo = lo + Math[_x54187[300]](al7, bl4) | 0;
                        mid = mid + Math[_x54187[300]](al7, bh4) | 0;
                        mid = mid + Math[_x54187[300]](ah7, bl4) | 0;
                        hi = hi + Math[_x54187[300]](ah7, bh4) | 0;
                        lo = lo + Math[_x54187[300]](al6, bl5) | 0;
                        mid = mid + Math[_x54187[300]](al6, bh5) | 0;
                        mid = mid + Math[_x54187[300]](ah6, bl5) | 0;
                        hi = hi + Math[_x54187[300]](ah6, bh5) | 0;
                        lo = lo + Math[_x54187[300]](al5, bl6) | 0;
                        mid = mid + Math[_x54187[300]](al5, bh6) | 0;
                        mid = mid + Math[_x54187[300]](ah5, bl6) | 0;
                        hi = hi + Math[_x54187[300]](ah5, bh6) | 0;
                        lo = lo + Math[_x54187[300]](al4, bl7) | 0;
                        mid = mid + Math[_x54187[300]](al4, bh7) | 0;
                        mid = mid + Math[_x54187[300]](ah4, bl7) | 0;
                        hi = hi + Math[_x54187[300]](ah4, bh7) | 0;
                        lo = lo + Math[_x54187[300]](al3, bl8) | 0;
                        mid = mid + Math[_x54187[300]](al3, bh8) | 0;
                        mid = mid + Math[_x54187[300]](ah3, bl8) | 0;
                        hi = hi + Math[_x54187[300]](ah3, bh8) | 0;
                        lo = lo + Math[_x54187[300]](al2, bl9) | 0;
                        mid = mid + Math[_x54187[300]](al2, bh9) | 0;
                        mid = mid + Math[_x54187[300]](ah2, bl9) | 0;
                        hi = hi + Math[_x54187[300]](ah2, bh9) | 0;
                        var w11 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
                        c = (hi + (mid >>> 13) | 0) + (w11 >>> 26) | 0;
                        w11 &= 67108863;
                        lo = Math[_x54187[300]](al9, bl3);
                        mid = Math[_x54187[300]](al9, bh3);
                        mid = mid + Math[_x54187[300]](ah9, bl3) | 0;
                        hi = Math[_x54187[300]](ah9, bh3);
                        lo = lo + Math[_x54187[300]](al8, bl4) | 0;
                        mid = mid + Math[_x54187[300]](al8, bh4) | 0;
                        mid = mid + Math[_x54187[300]](ah8, bl4) | 0;
                        hi = hi + Math[_x54187[300]](ah8, bh4) | 0;
                        lo = lo + Math[_x54187[300]](al7, bl5) | 0;
                        mid = mid + Math[_x54187[300]](al7, bh5) | 0;
                        mid = mid + Math[_x54187[300]](ah7, bl5) | 0;
                        hi = hi + Math[_x54187[300]](ah7, bh5) | 0;
                        lo = lo + Math[_x54187[300]](al6, bl6) | 0;
                        mid = mid + Math[_x54187[300]](al6, bh6) | 0;
                        mid = mid + Math[_x54187[300]](ah6, bl6) | 0;
                        hi = hi + Math[_x54187[300]](ah6, bh6) | 0;
                        lo = lo + Math[_x54187[300]](al5, bl7) | 0;
                        mid = mid + Math[_x54187[300]](al5, bh7) | 0;
                        mid = mid + Math[_x54187[300]](ah5, bl7) | 0;
                        hi = hi + Math[_x54187[300]](ah5, bh7) | 0;
                        lo = lo + Math[_x54187[300]](al4, bl8) | 0;
                        mid = mid + Math[_x54187[300]](al4, bh8) | 0;
                        mid = mid + Math[_x54187[300]](ah4, bl8) | 0;
                        hi = hi + Math[_x54187[300]](ah4, bh8) | 0;
                        lo = lo + Math[_x54187[300]](al3, bl9) | 0;
                        mid = mid + Math[_x54187[300]](al3, bh9) | 0;
                        mid = mid + Math[_x54187[300]](ah3, bl9) | 0;
                        hi = hi + Math[_x54187[300]](ah3, bh9) | 0;
                        var w12 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
                        c = (hi + (mid >>> 13) | 0) + (w12 >>> 26) | 0;
                        w12 &= 67108863;
                        lo = Math[_x54187[300]](al9, bl4);
                        mid = Math[_x54187[300]](al9, bh4);
                        mid = mid + Math[_x54187[300]](ah9, bl4) | 0;
                        hi = Math[_x54187[300]](ah9, bh4);
                        lo = lo + Math[_x54187[300]](al8, bl5) | 0;
                        mid = mid + Math[_x54187[300]](al8, bh5) | 0;
                        mid = mid + Math[_x54187[300]](ah8, bl5) | 0;
                        hi = hi + Math[_x54187[300]](ah8, bh5) | 0;
                        lo = lo + Math[_x54187[300]](al7, bl6) | 0;
                        mid = mid + Math[_x54187[300]](al7, bh6) | 0;
                        mid = mid + Math[_x54187[300]](ah7, bl6) | 0;
                        hi = hi + Math[_x54187[300]](ah7, bh6) | 0;
                        lo = lo + Math[_x54187[300]](al6, bl7) | 0;
                        mid = mid + Math[_x54187[300]](al6, bh7) | 0;
                        mid = mid + Math[_x54187[300]](ah6, bl7) | 0;
                        hi = hi + Math[_x54187[300]](ah6, bh7) | 0;
                        lo = lo + Math[_x54187[300]](al5, bl8) | 0;
                        mid = mid + Math[_x54187[300]](al5, bh8) | 0;
                        mid = mid + Math[_x54187[300]](ah5, bl8) | 0;
                        hi = hi + Math[_x54187[300]](ah5, bh8) | 0;
                        lo = lo + Math[_x54187[300]](al4, bl9) | 0;
                        mid = mid + Math[_x54187[300]](al4, bh9) | 0;
                        mid = mid + Math[_x54187[300]](ah4, bl9) | 0;
                        hi = hi + Math[_x54187[300]](ah4, bh9) | 0;
                        var w13 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
                        c = (hi + (mid >>> 13) | 0) + (w13 >>> 26) | 0;
                        w13 &= 67108863;
                        lo = Math[_x54187[300]](al9, bl5);
                        mid = Math[_x54187[300]](al9, bh5);
                        mid = mid + Math[_x54187[300]](ah9, bl5) | 0;
                        hi = Math[_x54187[300]](ah9, bh5);
                        lo = lo + Math[_x54187[300]](al8, bl6) | 0;
                        mid = mid + Math[_x54187[300]](al8, bh6) | 0;
                        mid = mid + Math[_x54187[300]](ah8, bl6) | 0;
                        hi = hi + Math[_x54187[300]](ah8, bh6) | 0;
                        lo = lo + Math[_x54187[300]](al7, bl7) | 0;
                        mid = mid + Math[_x54187[300]](al7, bh7) | 0;
                        mid = mid + Math[_x54187[300]](ah7, bl7) | 0;
                        hi = hi + Math[_x54187[300]](ah7, bh7) | 0;
                        lo = lo + Math[_x54187[300]](al6, bl8) | 0;
                        mid = mid + Math[_x54187[300]](al6, bh8) | 0;
                        mid = mid + Math[_x54187[300]](ah6, bl8) | 0;
                        hi = hi + Math[_x54187[300]](ah6, bh8) | 0;
                        lo = lo + Math[_x54187[300]](al5, bl9) | 0;
                        mid = mid + Math[_x54187[300]](al5, bh9) | 0;
                        mid = mid + Math[_x54187[300]](ah5, bl9) | 0;
                        hi = hi + Math[_x54187[300]](ah5, bh9) | 0;
                        var w14 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
                        c = (hi + (mid >>> 13) | 0) + (w14 >>> 26) | 0;
                        w14 &= 67108863;
                        lo = Math[_x54187[300]](al9, bl6);
                        mid = Math[_x54187[300]](al9, bh6);
                        mid = mid + Math[_x54187[300]](ah9, bl6) | 0;
                        hi = Math[_x54187[300]](ah9, bh6);
                        lo = lo + Math[_x54187[300]](al8, bl7) | 0;
                        mid = mid + Math[_x54187[300]](al8, bh7) | 0;
                        mid = mid + Math[_x54187[300]](ah8, bl7) | 0;
                        hi = hi + Math[_x54187[300]](ah8, bh7) | 0;
                        lo = lo + Math[_x54187[300]](al7, bl8) | 0;
                        mid = mid + Math[_x54187[300]](al7, bh8) | 0;
                        mid = mid + Math[_x54187[300]](ah7, bl8) | 0;
                        hi = hi + Math[_x54187[300]](ah7, bh8) | 0;
                        lo = lo + Math[_x54187[300]](al6, bl9) | 0;
                        mid = mid + Math[_x54187[300]](al6, bh9) | 0;
                        mid = mid + Math[_x54187[300]](ah6, bl9) | 0;
                        hi = hi + Math[_x54187[300]](ah6, bh9) | 0;
                        var w15 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
                        c = (hi + (mid >>> 13) | 0) + (w15 >>> 26) | 0;
                        w15 &= 67108863;
                        lo = Math[_x54187[300]](al9, bl7);
                        mid = Math[_x54187[300]](al9, bh7);
                        mid = mid + Math[_x54187[300]](ah9, bl7) | 0;
                        hi = Math[_x54187[300]](ah9, bh7);
                        lo = lo + Math[_x54187[300]](al8, bl8) | 0;
                        mid = mid + Math[_x54187[300]](al8, bh8) | 0;
                        mid = mid + Math[_x54187[300]](ah8, bl8) | 0;
                        hi = hi + Math[_x54187[300]](ah8, bh8) | 0;
                        lo = lo + Math[_x54187[300]](al7, bl9) | 0;
                        mid = mid + Math[_x54187[300]](al7, bh9) | 0;
                        mid = mid + Math[_x54187[300]](ah7, bl9) | 0;
                        hi = hi + Math[_x54187[300]](ah7, bh9) | 0;
                        var w16 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
                        c = (hi + (mid >>> 13) | 0) + (w16 >>> 26) | 0;
                        w16 &= 67108863;
                        lo = Math[_x54187[300]](al9, bl8);
                        mid = Math[_x54187[300]](al9, bh8);
                        mid = mid + Math[_x54187[300]](ah9, bl8) | 0;
                        hi = Math[_x54187[300]](ah9, bh8);
                        lo = lo + Math[_x54187[300]](al8, bl9) | 0;
                        mid = mid + Math[_x54187[300]](al8, bh9) | 0;
                        mid = mid + Math[_x54187[300]](ah8, bl9) | 0;
                        hi = hi + Math[_x54187[300]](ah8, bh9) | 0;
                        var w17 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
                        c = (hi + (mid >>> 13) | 0) + (w17 >>> 26) | 0;
                        w17 &= 67108863;
                        lo = Math[_x54187[300]](al9, bl9);
                        mid = Math[_x54187[300]](al9, bh9);
                        mid = mid + Math[_x54187[300]](ah9, bl9) | 0;
                        hi = Math[_x54187[300]](ah9, bh9);
                        var w18 = (c + lo | 0) + ((mid & 8191) << 13) | 0;
                        c = (hi + (mid >>> 13) | 0) + (w18 >>> 26) | 0;
                        w18 &= 67108863;
                        o[0] = w0;
                        o[1] = w1;
                        o[2] = w2;
                        o[3] = w3;
                        o[4] = w4;
                        o[5] = w5;
                        o[6] = w6;
                        o[7] = w7;
                        o[8] = w8;
                        o[9] = w9;
                        o[10] = w10;
                        o[11] = w11;
                        o[12] = w12;
                        o[13] = w13;
                        o[14] = w14;
                        o[15] = w15;
                        o[16] = w16;
                        o[17] = w17;
                        o[18] = w18;
                        if (c !== 0) {
                            o[19] = c;
                            out[_x54187[7]]++;
                        }
                        return out;
                    };
                    if (!Math[_x54187[300]]) {
                        comb10MulTo = smallMulTo;
                    }
                    function bigMulTo(self, num, out) {
                        out[_x54187[206]] = num[_x54187[206]] ^ self[_x54187[206]];
                        out[_x54187[7]] = self[_x54187[7]] + num[_x54187[7]];
                        var carry = 0;
                        var hncarry = 0;
                        for (var k = 0; k < out[_x54187[7]] - 1; k++) {
                            var ncarry = hncarry;
                            hncarry = 0;
                            var rword = carry & 67108863;
                            var maxJ = Math[_x54187[70]](k, num[_x54187[7]] - 1);
                            for (var j = Math[_x54187[217]](0, k - self[_x54187[7]] + 1); j <= maxJ; j++) {
                                var i = k - j;
                                var a = self[_x54187[207]][i] | 0;
                                var b = num[_x54187[207]][j] | 0;
                                var r = a * b;
                                var lo = r & 67108863;
                                ncarry = ncarry + (r / 67108864 | 0) | 0;
                                lo = lo + rword | 0;
                                rword = lo & 67108863;
                                ncarry = ncarry + (lo >>> 26) | 0;
                                hncarry += ncarry >>> 26;
                                ncarry &= 67108863;
                            }
                            out[_x54187[207]][k] = rword;
                            carry = ncarry;
                            ncarry = hncarry;
                        }
                        if (carry !== 0) {
                            out[_x54187[207]][k] = carry;
                        } else {
                            out[_x54187[7]]--;
                        }
                        return out[_x54187[223]]();
                    }
                    function jumboMulTo(self, num, out) {
                        var fftm = new FFTM();
                        return fftm[_x54187[301]](self, num, out);
                    }
                    BN[_x54187[33]][_x54187[302]] = function mulTo(num, out) {
                        var res;
                        var len = this[_x54187[7]] + num[_x54187[7]];
                        if (this[_x54187[7]] === 10 && num[_x54187[7]] === 10) {
                            res = comb10MulTo(this, num, out);
                        } else if (len < 63) {
                            res = smallMulTo(this, num, out);
                        } else if (len < 1024) {
                            res = bigMulTo(this, num, out);
                        } else {
                            res = jumboMulTo(this, num, out);
                        }
                        return res;
                    };
                    function FFTM(x, y) {
                        this[_x54187[303]] = x;
                        this[_x54187[304]] = y;
                    }
                    FFTM[_x54187[33]][_x54187[305]] = function makeRBT(N) {
                        var t = new Array(N);
                        var l = BN[_x54187[33]][_x54187[270]](N) - 1;
                        for (var i = 0; i < N; i++) {
                            t[i] = this[_x54187[306]](i, l, N);
                        }
                        return t;
                    };
                    FFTM[_x54187[33]][_x54187[306]] = function revBin(x, l, N) {
                        if (x === 0 || x === N - 1)
                            return x;
                        var rb = 0;
                        for (var i = 0; i < l; i++) {
                            rb |= (x & 1) << l - i - 1;
                            x >>= 1;
                        }
                        return rb;
                    };
                    FFTM[_x54187[33]][_x54187[307]] = function permute(rbt, rws, iws, rtws, itws, N) {
                        for (var i = 0; i < N; i++) {
                            rtws[i] = rws[rbt[i]];
                            itws[i] = iws[rbt[i]];
                        }
                    };
                    FFTM[_x54187[33]][_x54187[308]] = function transform(rws, iws, rtws, itws, N, rbt) {
                        this[_x54187[307]](rbt, rws, iws, rtws, itws, N);
                        for (var s = 1; s < N; s <<= 1) {
                            var l = s << 1;
                            var rtwdf = Math[_x54187[309]](2 * Math[_x54187[310]] / l);
                            var itwdf = Math[_x54187[311]](2 * Math[_x54187[310]] / l);
                            for (var p = 0; p < N; p += l) {
                                var rtwdf_ = rtwdf;
                                var itwdf_ = itwdf;
                                for (var j = 0; j < s; j++) {
                                    var re = rtws[p + j];
                                    var ie = itws[p + j];
                                    var ro = rtws[p + j + s];
                                    var io = itws[p + j + s];
                                    var rx = rtwdf_ * ro - itwdf_ * io;
                                    io = rtwdf_ * io + itwdf_ * ro;
                                    ro = rx;
                                    rtws[p + j] = re + ro;
                                    itws[p + j] = ie + io;
                                    rtws[p + j + s] = re - ro;
                                    itws[p + j + s] = ie - io;
                                    if (j !== l) {
                                        rx = rtwdf * rtwdf_ - itwdf * itwdf_;
                                        itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
                                        rtwdf_ = rx;
                                    }
                                }
                            }
                        }
                    };
                    FFTM[_x54187[33]][_x54187[312]] = function guessLen13b(n, m) {
                        var N = Math[_x54187[217]](m, n) | 1;
                        var odd = N & 1;
                        var i = 0;
                        for (N = N / 2 | 0; N; N = N >>> 1) {
                            i++;
                        }
                        return 1 << i + 1 + odd;
                    };
                    FFTM[_x54187[33]][_x54187[313]] = function conjugate(rws, iws, N) {
                        if (N <= 1)
                            return;
                        for (var i = 0; i < N / 2; i++) {
                            var t = rws[i];
                            rws[i] = rws[N - i - 1];
                            rws[N - i - 1] = t;
                            t = iws[i];
                            iws[i] = -iws[N - i - 1];
                            iws[N - i - 1] = -t;
                        }
                    };
                    FFTM[_x54187[33]][_x54187[314]] = function normalize13b(ws, N) {
                        var carry = 0;
                        for (var i = 0; i < N / 2; i++) {
                            var w = Math[_x54187[315]](ws[2 * i + 1] / N) * 8192 + Math[_x54187[315]](ws[2 * i] / N) + carry;
                            ws[i] = w & 67108863;
                            if (w < 67108864) {
                                carry = 0;
                            } else {
                                carry = w / 67108864 | 0;
                            }
                        }
                        return ws;
                    };
                    FFTM[_x54187[33]][_x54187[316]] = function convert13b(ws, len, rws, N) {
                        var carry = 0;
                        for (var i = 0; i < len; i++) {
                            carry = carry + (ws[i] | 0);
                            rws[2 * i] = carry & 8191;
                            carry = carry >>> 13;
                            rws[2 * i + 1] = carry & 8191;
                            carry = carry >>> 13;
                        }
                        for (i = 2 * len; i < N; ++i) {
                            rws[i] = 0;
                        }
                        assert(carry === 0);
                        assert((carry & ~8191) === 0);
                    };
                    FFTM[_x54187[33]][_x54187[317]] = function stub(N) {
                        var ph = new Array(N);
                        for (var i = 0; i < N; i++) {
                            ph[i] = 0;
                        }
                        return ph;
                    };
                    FFTM[_x54187[33]][_x54187[301]] = function mulp(x, y, out) {
                        var N = 2 * this[_x54187[312]](x[_x54187[7]], y[_x54187[7]]);
                        var rbt = this[_x54187[305]](N);
                        var _ = this[_x54187[317]](N);
                        var rws = new Array(N);
                        var rwst = new Array(N);
                        var iwst = new Array(N);
                        var nrws = new Array(N);
                        var nrwst = new Array(N);
                        var niwst = new Array(N);
                        var rmws = out[_x54187[207]];
                        rmws[_x54187[7]] = N;
                        this[_x54187[316]](x[_x54187[207]], x[_x54187[7]], rws, N);
                        this[_x54187[316]](y[_x54187[207]], y[_x54187[7]], nrws, N);
                        this[_x54187[308]](rws, _, rwst, iwst, N, rbt);
                        this[_x54187[308]](nrws, _, nrwst, niwst, N, rbt);
                        for (var i = 0; i < N; i++) {
                            var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
                            iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
                            rwst[i] = rx;
                        }
                        this[_x54187[313]](rwst, iwst, N);
                        this[_x54187[308]](rwst, iwst, rmws, _, N, rbt);
                        this[_x54187[313]](rmws, _, N);
                        this[_x54187[314]](rmws, N);
                        out[_x54187[206]] = x[_x54187[206]] ^ y[_x54187[206]];
                        out[_x54187[7]] = x[_x54187[7]] + y[_x54187[7]];
                        return out[_x54187[223]]();
                    };
                    BN[_x54187[33]][_x54187[318]] = function mul(num) {
                        var out = new BN(null);
                        out[_x54187[207]] = new Array(this[_x54187[7]] + num[_x54187[7]]);
                        return this[_x54187[302]](num, out);
                    };
                    BN[_x54187[33]][_x54187[319]] = function mulf(num) {
                        var out = new BN(null);
                        out[_x54187[207]] = new Array(this[_x54187[7]] + num[_x54187[7]]);
                        return jumboMulTo(this, num, out);
                    };
                    BN[_x54187[33]][_x54187[300]] = function imul(num) {
                        return this[_x54187[228]]()[_x54187[302]](num, this);
                    };
                    BN[_x54187[33]][_x54187[226]] = function imuln(num) {
                        assert(typeof num === _x54187[36]);
                        assert(num < 67108864);
                        var carry = 0;
                        for (var i = 0; i < this[_x54187[7]]; i++) {
                            var w = (this[_x54187[207]][i] | 0) * num;
                            var lo = (w & 67108863) + (carry & 67108863);
                            carry >>= 26;
                            carry += w / 67108864 | 0;
                            carry += lo >>> 26;
                            this[_x54187[207]][i] = lo & 67108863;
                        }
                        if (carry !== 0) {
                            this[_x54187[207]][i] = carry;
                            this[_x54187[7]]++;
                        }
                        return this;
                    };
                    BN[_x54187[33]][_x54187[320]] = function muln(num) {
                        return this[_x54187[228]]()[_x54187[226]](num);
                    };
                    BN[_x54187[33]][_x54187[321]] = function sqr() {
                        return this[_x54187[318]](this);
                    };
                    BN[_x54187[33]][_x54187[322]] = function isqr() {
                        return this[_x54187[300]](this[_x54187[228]]());
                    };
                    BN[_x54187[33]][_x54187[123]] = function pow(num) {
                        var w = toBitArray(num);
                        if (w[_x54187[7]] === 0)
                            return new BN(1);
                        var res = this;
                        for (var i = 0; i < w[_x54187[7]]; i++, res = res[_x54187[321]]()) {
                            if (w[i] !== 0)
                                break;
                        }
                        if (++i < w[_x54187[7]]) {
                            for (var q = res[_x54187[321]](); i < w[_x54187[7]]; i++, q = q[_x54187[321]]()) {
                                if (w[i] === 0)
                                    continue;
                                res = res[_x54187[318]](q);
                            }
                        }
                        return res;
                    };
                    BN[_x54187[33]][_x54187[323]] = function iushln(bits) {
                        assert(typeof bits === _x54187[36] && bits >= 0);
                        var r = bits % 26;
                        var s = (bits - r) / 26;
                        var carryMask = 67108863 >>> 26 - r << 26 - r;
                        var i;
                        if (r !== 0) {
                            var carry = 0;
                            for (i = 0; i < this[_x54187[7]]; i++) {
                                var newCarry = this[_x54187[207]][i] & carryMask;
                                var c = (this[_x54187[207]][i] | 0) - newCarry << r;
                                this[_x54187[207]][i] = c | carry;
                                carry = newCarry >>> 26 - r;
                            }
                            if (carry) {
                                this[_x54187[207]][i] = carry;
                                this[_x54187[7]]++;
                            }
                        }
                        if (s !== 0) {
                            for (i = this[_x54187[7]] - 1; i >= 0; i--) {
                                this[_x54187[207]][i + s] = this[_x54187[207]][i];
                            }
                            for (i = 0; i < s; i++) {
                                this[_x54187[207]][i] = 0;
                            }
                            this[_x54187[7]] += s;
                        }
                        return this[_x54187[223]]();
                    };
                    BN[_x54187[33]][_x54187[324]] = function ishln(bits) {
                        assert(this[_x54187[206]] === 0);
                        return this[_x54187[323]](bits);
                    };
                    BN[_x54187[33]][_x54187[268]] = function iushrn(bits, hint, extended) {
                        assert(typeof bits === _x54187[36] && bits >= 0);
                        var h;
                        if (hint) {
                            h = (hint - hint % 26) / 26;
                        } else {
                            h = 0;
                        }
                        var r = bits % 26;
                        var s = Math[_x54187[70]]((bits - r) / 26, this[_x54187[7]]);
                        var mask = 67108863 ^ 67108863 >>> r << r;
                        var maskedWords = extended;
                        h -= s;
                        h = Math[_x54187[217]](0, h);
                        if (maskedWords) {
                            for (var i = 0; i < s; i++) {
                                maskedWords[_x54187[207]][i] = this[_x54187[207]][i];
                            }
                            maskedWords[_x54187[7]] = s;
                        }
                        if (s === 0) {
                        } else if (this[_x54187[7]] > s) {
                            this[_x54187[7]] -= s;
                            for (i = 0; i < this[_x54187[7]]; i++) {
                                this[_x54187[207]][i] = this[_x54187[207]][i + s];
                            }
                        } else {
                            this[_x54187[207]][0] = 0;
                            this[_x54187[7]] = 1;
                        }
                        var carry = 0;
                        for (i = this[_x54187[7]] - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
                            var word = this[_x54187[207]][i] | 0;
                            this[_x54187[207]][i] = carry << 26 - r | word >>> r;
                            carry = word & mask;
                        }
                        if (maskedWords && carry !== 0) {
                            maskedWords[_x54187[207]][maskedWords[_x54187[7]]++] = carry;
                        }
                        if (this[_x54187[7]] === 0) {
                            this[_x54187[207]][0] = 0;
                            this[_x54187[7]] = 1;
                        }
                        return this[_x54187[223]]();
                    };
                    BN[_x54187[33]][_x54187[325]] = function ishrn(bits, hint, extended) {
                        assert(this[_x54187[206]] === 0);
                        return this[_x54187[268]](bits, hint, extended);
                    };
                    BN[_x54187[33]][_x54187[326]] = function shln(bits) {
                        return this[_x54187[228]]()[_x54187[324]](bits);
                    };
                    BN[_x54187[33]][_x54187[327]] = function ushln(bits) {
                        return this[_x54187[228]]()[_x54187[323]](bits);
                    };
                    BN[_x54187[33]][_x54187[328]] = function shrn(bits) {
                        return this[_x54187[228]]()[_x54187[325]](bits);
                    };
                    BN[_x54187[33]][_x54187[329]] = function ushrn(bits) {
                        return this[_x54187[228]]()[_x54187[268]](bits);
                    };
                    BN[_x54187[33]][_x54187[278]] = function testn(bit) {
                        assert(typeof bit === _x54187[36] && bit >= 0);
                        var r = bit % 26;
                        var s = (bit - r) / 26;
                        var q = 1 << r;
                        if (this[_x54187[7]] <= s)
                            return false;
                        var w = this[_x54187[207]][s];
                        return !!(w & q);
                    };
                    BN[_x54187[33]][_x54187[330]] = function imaskn(bits) {
                        assert(typeof bits === _x54187[36] && bits >= 0);
                        var r = bits % 26;
                        var s = (bits - r) / 26;
                        assert(this[_x54187[206]] === 0, _x54187[331]);
                        if (this[_x54187[7]] <= s) {
                            return this;
                        }
                        if (r !== 0) {
                            s++;
                        }
                        this[_x54187[7]] = Math[_x54187[70]](s, this[_x54187[7]]);
                        if (r !== 0) {
                            var mask = 67108863 ^ 67108863 >>> r << r;
                            this[_x54187[207]][this[_x54187[7]] - 1] &= mask;
                        }
                        return this[_x54187[223]]();
                    };
                    BN[_x54187[33]][_x54187[332]] = function maskn(bits) {
                        return this[_x54187[228]]()[_x54187[330]](bits);
                    };
                    BN[_x54187[33]][_x54187[275]] = function iaddn(num) {
                        assert(typeof num === _x54187[36]);
                        assert(num < 67108864);
                        if (num < 0)
                            return this[_x54187[333]](-num);
                        if (this[_x54187[206]] !== 0) {
                            if (this[_x54187[7]] === 1 && (this[_x54187[207]][0] | 0) < num) {
                                this[_x54187[207]][0] = num - (this[_x54187[207]][0] | 0);
                                this[_x54187[206]] = 0;
                                return this;
                            }
                            this[_x54187[206]] = 0;
                            this[_x54187[333]](num);
                            this[_x54187[206]] = 1;
                            return this;
                        }
                        return this[_x54187[227]](num);
                    };
                    BN[_x54187[33]][_x54187[227]] = function _iaddn(num) {
                        this[_x54187[207]][0] += num;
                        for (var i = 0; i < this[_x54187[7]] && this[_x54187[207]][i] >= 67108864; i++) {
                            this[_x54187[207]][i] -= 67108864;
                            if (i === this[_x54187[7]] - 1) {
                                this[_x54187[207]][i + 1] = 1;
                            } else {
                                this[_x54187[207]][i + 1]++;
                            }
                        }
                        this[_x54187[7]] = Math[_x54187[217]](this[_x54187[7]], i + 1);
                        return this;
                    };
                    BN[_x54187[33]][_x54187[333]] = function isubn(num) {
                        assert(typeof num === _x54187[36]);
                        assert(num < 67108864);
                        if (num < 0)
                            return this[_x54187[275]](-num);
                        if (this[_x54187[206]] !== 0) {
                            this[_x54187[206]] = 0;
                            this[_x54187[275]](num);
                            this[_x54187[206]] = 1;
                            return this;
                        }
                        this[_x54187[207]][0] -= num;
                        if (this[_x54187[7]] === 1 && this[_x54187[207]][0] < 0) {
                            this[_x54187[207]][0] = -this[_x54187[207]][0];
                            this[_x54187[206]] = 1;
                        } else {
                            for (var i = 0; i < this[_x54187[7]] && this[_x54187[207]][i] < 0; i++) {
                                this[_x54187[207]][i] += 67108864;
                                this[_x54187[207]][i + 1] -= 1;
                            }
                        }
                        return this[_x54187[223]]();
                    };
                    BN[_x54187[33]][_x54187[334]] = function addn(num) {
                        return this[_x54187[228]]()[_x54187[275]](num);
                    };
                    BN[_x54187[33]][_x54187[335]] = function subn(num) {
                        return this[_x54187[228]]()[_x54187[333]](num);
                    };
                    BN[_x54187[33]][_x54187[336]] = function iabs() {
                        this[_x54187[206]] = 0;
                        return this;
                    };
                    BN[_x54187[33]][_x54187[170]] = function abs() {
                        return this[_x54187[228]]()[_x54187[336]]();
                    };
                    BN[_x54187[33]][_x54187[337]] = function _ishlnsubmul(num, mul, shift) {
                        var len = num[_x54187[7]] + shift;
                        var i;
                        this[_x54187[229]](len);
                        var w;
                        var carry = 0;
                        for (i = 0; i < num[_x54187[7]]; i++) {
                            w = (this[_x54187[207]][i + shift] | 0) + carry;
                            var right = (num[_x54187[207]][i] | 0) * mul;
                            w -= right & 67108863;
                            carry = (w >> 26) - (right / 67108864 | 0);
                            this[_x54187[207]][i + shift] = w & 67108863;
                        }
                        for (; i < this[_x54187[7]] - shift; i++) {
                            w = (this[_x54187[207]][i + shift] | 0) + carry;
                            carry = w >> 26;
                            this[_x54187[207]][i + shift] = w & 67108863;
                        }
                        if (carry === 0)
                            return this[_x54187[223]]();
                        assert(carry === -1);
                        carry = 0;
                        for (i = 0; i < this[_x54187[7]]; i++) {
                            w = -(this[_x54187[207]][i] | 0) + carry;
                            carry = w >> 26;
                            this[_x54187[207]][i] = w & 67108863;
                        }
                        this[_x54187[206]] = 1;
                        return this[_x54187[223]]();
                    };
                    BN[_x54187[33]][_x54187[338]] = function _wordDiv(num, mode) {
                        var shift = this[_x54187[7]] - num[_x54187[7]];
                        var a = this[_x54187[228]]();
                        var b = num;
                        var bhi = b[_x54187[207]][b[_x54187[7]] - 1] | 0;
                        var bhiBits = this[_x54187[270]](bhi);
                        shift = 26 - bhiBits;
                        if (shift !== 0) {
                            b = b[_x54187[327]](shift);
                            a[_x54187[323]](shift);
                            bhi = b[_x54187[207]][b[_x54187[7]] - 1] | 0;
                        }
                        var m = a[_x54187[7]] - b[_x54187[7]];
                        var q;
                        if (mode !== _x54187[339]) {
                            q = new BN(null);
                            q[_x54187[7]] = m + 1;
                            q[_x54187[207]] = new Array(q[_x54187[7]]);
                            for (var i = 0; i < q[_x54187[7]]; i++) {
                                q[_x54187[207]][i] = 0;
                            }
                        }
                        var diff = a[_x54187[228]]()[_x54187[337]](b, 1, m);
                        if (diff[_x54187[206]] === 0) {
                            a = diff;
                            if (q) {
                                q[_x54187[207]][m] = 1;
                            }
                        }
                        for (var j = m - 1; j >= 0; j--) {
                            var qj = (a[_x54187[207]][b[_x54187[7]] + j] | 0) * 67108864 + (a[_x54187[207]][b[_x54187[7]] + j - 1] | 0);
                            qj = Math[_x54187[70]](qj / bhi | 0, 67108863);
                            a[_x54187[337]](b, qj, j);
                            while (a[_x54187[206]] !== 0) {
                                qj--;
                                a[_x54187[206]] = 0;
                                a[_x54187[337]](b, 1, j);
                                if (!a[_x54187[257]]()) {
                                    a[_x54187[206]] ^= 1;
                                }
                            }
                            if (q) {
                                q[_x54187[207]][j] = qj;
                            }
                        }
                        if (q) {
                            q[_x54187[223]]();
                        }
                        a[_x54187[223]]();
                        if (mode !== _x54187[340] && shift !== 0) {
                            a[_x54187[268]](shift);
                        }
                        return {
                            div: q || null,
                            mod: a
                        };
                    };
                    BN[_x54187[33]][_x54187[341]] = function divmod(num, mode, positive) {
                        assert(!num[_x54187[257]]());
                        if (this[_x54187[257]]()) {
                            return {
                                div: new BN(0),
                                mod: new BN(0)
                            };
                        }
                        var div, mod, res;
                        if (this[_x54187[206]] !== 0 && num[_x54187[206]] === 0) {
                            res = this[_x54187[282]]()[_x54187[341]](num, mode);
                            if (mode !== _x54187[339]) {
                                div = res[_x54187[340]][_x54187[282]]();
                            }
                            if (mode !== _x54187[340]) {
                                mod = res[_x54187[339]][_x54187[282]]();
                                if (positive && mod[_x54187[206]] !== 0) {
                                    mod[_x54187[296]](num);
                                }
                            }
                            return {
                                div: div,
                                mod: mod
                            };
                        }
                        if (this[_x54187[206]] === 0 && num[_x54187[206]] !== 0) {
                            res = this[_x54187[341]](num[_x54187[282]](), mode);
                            if (mode !== _x54187[339]) {
                                div = res[_x54187[340]][_x54187[282]]();
                            }
                            return {
                                div: div,
                                mod: res[_x54187[339]]
                            };
                        }
                        if ((this[_x54187[206]] & num[_x54187[206]]) !== 0) {
                            res = this[_x54187[282]]()[_x54187[341]](num[_x54187[282]](), mode);
                            if (mode !== _x54187[340]) {
                                mod = res[_x54187[339]][_x54187[282]]();
                                if (positive && mod[_x54187[206]] !== 0) {
                                    mod[_x54187[297]](num);
                                }
                            }
                            return {
                                div: res[_x54187[340]],
                                mod: mod
                            };
                        }
                        if (num[_x54187[7]] > this[_x54187[7]] || this[_x54187[218]](num) < 0) {
                            return {
                                div: new BN(0),
                                mod: this
                            };
                        }
                        if (num[_x54187[7]] === 1) {
                            if (mode === _x54187[340]) {
                                return {
                                    div: this[_x54187[342]](num[_x54187[207]][0]),
                                    mod: null
                                };
                            }
                            if (mode === _x54187[339]) {
                                return {
                                    div: null,
                                    mod: new BN(this[_x54187[258]](num[_x54187[207]][0]))
                                };
                            }
                            return {
                                div: this[_x54187[342]](num[_x54187[207]][0]),
                                mod: new BN(this[_x54187[258]](num[_x54187[207]][0]))
                            };
                        }
                        return this[_x54187[338]](num, mode);
                    };
                    BN[_x54187[33]][_x54187[340]] = function div(num) {
                        return this[_x54187[341]](num, _x54187[340], false)[_x54187[340]];
                    };
                    BN[_x54187[33]][_x54187[339]] = function mod(num) {
                        return this[_x54187[341]](num, _x54187[339], false)[_x54187[339]];
                    };
                    BN[_x54187[33]][_x54187[343]] = function umod(num) {
                        return this[_x54187[341]](num, _x54187[339], true)[_x54187[339]];
                    };
                    BN[_x54187[33]][_x54187[344]] = function divRound(num) {
                        var dm = this[_x54187[341]](num);
                        if (dm[_x54187[339]][_x54187[257]]())
                            return dm[_x54187[340]];
                        var mod = dm[_x54187[340]][_x54187[206]] !== 0 ? dm[_x54187[339]][_x54187[297]](num) : dm[_x54187[339]];
                        var half = num[_x54187[329]](1);
                        var r2 = num[_x54187[267]](1);
                        var cmp = mod[_x54187[218]](half);
                        if (cmp < 0 || r2 === 1 && cmp === 0)
                            return dm[_x54187[340]];
                        return dm[_x54187[340]][_x54187[206]] !== 0 ? dm[_x54187[340]][_x54187[333]](1) : dm[_x54187[340]][_x54187[275]](1);
                    };
                    BN[_x54187[33]][_x54187[258]] = function modn(num) {
                        assert(num <= 67108863);
                        var p = (1 << 26) % num;
                        var acc = 0;
                        for (var i = this[_x54187[7]] - 1; i >= 0; i--) {
                            acc = (p * acc + (this[_x54187[207]][i] | 0)) % num;
                        }
                        return acc;
                    };
                    BN[_x54187[33]][_x54187[259]] = function idivn(num) {
                        assert(num <= 67108863);
                        var carry = 0;
                        for (var i = this[_x54187[7]] - 1; i >= 0; i--) {
                            var w = (this[_x54187[207]][i] | 0) + carry * 67108864;
                            this[_x54187[207]][i] = w / num | 0;
                            carry = w % num;
                        }
                        return this[_x54187[223]]();
                    };
                    BN[_x54187[33]][_x54187[342]] = function divn(num) {
                        return this[_x54187[228]]()[_x54187[259]](num);
                    };
                    BN[_x54187[33]][_x54187[345]] = function egcd(p) {
                        assert(p[_x54187[206]] === 0);
                        assert(!p[_x54187[257]]());
                        var x = this;
                        var y = p[_x54187[228]]();
                        if (x[_x54187[206]] !== 0) {
                            x = x[_x54187[343]](p);
                        } else {
                            x = x[_x54187[228]]();
                        }
                        var A = new BN(1);
                        var B = new BN(0);
                        var C = new BN(0);
                        var D = new BN(1);
                        var g = 0;
                        while (x[_x54187[346]]() && y[_x54187[346]]()) {
                            x[_x54187[268]](1);
                            y[_x54187[268]](1);
                            ++g;
                        }
                        var yp = y[_x54187[228]]();
                        var xp = x[_x54187[228]]();
                        while (!x[_x54187[257]]()) {
                            for (var i = 0, im = 1; (x[_x54187[207]][0] & im) === 0 && i < 26; ++i, im <<= 1);
                            if (i > 0) {
                                x[_x54187[268]](i);
                                while (i-- > 0) {
                                    if (A[_x54187[347]]() || B[_x54187[347]]()) {
                                        A[_x54187[296]](yp);
                                        B[_x54187[297]](xp);
                                    }
                                    A[_x54187[268]](1);
                                    B[_x54187[268]](1);
                                }
                            }
                            for (var j = 0, jm = 1; (y[_x54187[207]][0] & jm) === 0 && j < 26; ++j, jm <<= 1);
                            if (j > 0) {
                                y[_x54187[268]](j);
                                while (j-- > 0) {
                                    if (C[_x54187[347]]() || D[_x54187[347]]()) {
                                        C[_x54187[296]](yp);
                                        D[_x54187[297]](xp);
                                    }
                                    C[_x54187[268]](1);
                                    D[_x54187[268]](1);
                                }
                            }
                            if (x[_x54187[218]](y) >= 0) {
                                x[_x54187[297]](y);
                                A[_x54187[297]](C);
                                B[_x54187[297]](D);
                            } else {
                                y[_x54187[297]](x);
                                C[_x54187[297]](A);
                                D[_x54187[297]](B);
                            }
                        }
                        return {
                            a: C,
                            b: D,
                            gcd: y[_x54187[323]](g)
                        };
                    };
                    BN[_x54187[33]][_x54187[348]] = function _invmp(p) {
                        assert(p[_x54187[206]] === 0);
                        assert(!p[_x54187[257]]());
                        var a = this;
                        var b = p[_x54187[228]]();
                        if (a[_x54187[206]] !== 0) {
                            a = a[_x54187[343]](p);
                        } else {
                            a = a[_x54187[228]]();
                        }
                        var x1 = new BN(1);
                        var x2 = new BN(0);
                        var delta = b[_x54187[228]]();
                        while (a[_x54187[349]](1) > 0 && b[_x54187[349]](1) > 0) {
                            for (var i = 0, im = 1; (a[_x54187[207]][0] & im) === 0 && i < 26; ++i, im <<= 1);
                            if (i > 0) {
                                a[_x54187[268]](i);
                                while (i-- > 0) {
                                    if (x1[_x54187[347]]()) {
                                        x1[_x54187[296]](delta);
                                    }
                                    x1[_x54187[268]](1);
                                }
                            }
                            for (var j = 0, jm = 1; (b[_x54187[207]][0] & jm) === 0 && j < 26; ++j, jm <<= 1);
                            if (j > 0) {
                                b[_x54187[268]](j);
                                while (j-- > 0) {
                                    if (x2[_x54187[347]]()) {
                                        x2[_x54187[296]](delta);
                                    }
                                    x2[_x54187[268]](1);
                                }
                            }
                            if (a[_x54187[218]](b) >= 0) {
                                a[_x54187[297]](b);
                                x1[_x54187[297]](x2);
                            } else {
                                b[_x54187[297]](a);
                                x2[_x54187[297]](x1);
                            }
                        }
                        var res;
                        if (a[_x54187[349]](1) === 0) {
                            res = x1;
                        } else {
                            res = x2;
                        }
                        if (res[_x54187[349]](0) < 0) {
                            res[_x54187[296]](p);
                        }
                        return res;
                    };
                    BN[_x54187[33]][_x54187[350]] = function gcd(num) {
                        if (this[_x54187[257]]())
                            return num[_x54187[170]]();
                        if (num[_x54187[257]]())
                            return this[_x54187[170]]();
                        var a = this[_x54187[228]]();
                        var b = num[_x54187[228]]();
                        a[_x54187[206]] = 0;
                        b[_x54187[206]] = 0;
                        for (var shift = 0; a[_x54187[346]]() && b[_x54187[346]](); shift++) {
                            a[_x54187[268]](1);
                            b[_x54187[268]](1);
                        }
                        do {
                            while (a[_x54187[346]]()) {
                                a[_x54187[268]](1);
                            }
                            while (b[_x54187[346]]()) {
                                b[_x54187[268]](1);
                            }
                            var r = a[_x54187[218]](b);
                            if (r < 0) {
                                var t = a;
                                a = b;
                                b = t;
                            } else if (r === 0 || b[_x54187[349]](1) === 0) {
                                break;
                            }
                            a[_x54187[297]](b);
                        } while (true);
                        return b[_x54187[323]](shift);
                    };
                    BN[_x54187[33]][_x54187[351]] = function invm(num) {
                        return this[_x54187[345]](num)[_x54187[352]][_x54187[343]](num);
                    };
                    BN[_x54187[33]][_x54187[346]] = function isEven() {
                        return (this[_x54187[207]][0] & 1) === 0;
                    };
                    BN[_x54187[33]][_x54187[347]] = function isOdd() {
                        return (this[_x54187[207]][0] & 1) === 1;
                    };
                    BN[_x54187[33]][_x54187[267]] = function andln(num) {
                        return this[_x54187[207]][0] & num;
                    };
                    BN[_x54187[33]][_x54187[353]] = function bincn(bit) {
                        assert(typeof bit === _x54187[36]);
                        var r = bit % 26;
                        var s = (bit - r) / 26;
                        var q = 1 << r;
                        if (this[_x54187[7]] <= s) {
                            this[_x54187[229]](s + 1);
                            this[_x54187[207]][s] |= q;
                            return this;
                        }
                        var carry = q;
                        for (var i = s; carry !== 0 && i < this[_x54187[7]]; i++) {
                            var w = this[_x54187[207]][i] | 0;
                            w += carry;
                            carry = w >>> 26;
                            w &= 67108863;
                            this[_x54187[207]][i] = w;
                        }
                        if (carry !== 0) {
                            this[_x54187[207]][i] = carry;
                            this[_x54187[7]]++;
                        }
                        return this;
                    };
                    BN[_x54187[33]][_x54187[257]] = function isZero() {
                        return this[_x54187[7]] === 1 && this[_x54187[207]][0] === 0;
                    };
                    BN[_x54187[33]][_x54187[349]] = function cmpn(num) {
                        var negative = num < 0;
                        if (this[_x54187[206]] !== 0 && !negative)
                            return -1;
                        if (this[_x54187[206]] === 0 && negative)
                            return 1;
                        this[_x54187[223]]();
                        var res;
                        if (this[_x54187[7]] > 1) {
                            res = 1;
                        } else {
                            if (negative) {
                                num = -num;
                            }
                            assert(num <= 67108863, _x54187[354]);
                            var w = this[_x54187[207]][0] | 0;
                            res = w === num ? 0 : w < num ? -1 : 1;
                        }
                        if (this[_x54187[206]] !== 0)
                            return -res | 0;
                        return res;
                    };
                    BN[_x54187[33]][_x54187[218]] = function cmp(num) {
                        if (this[_x54187[206]] !== 0 && num[_x54187[206]] === 0)
                            return -1;
                        if (this[_x54187[206]] === 0 && num[_x54187[206]] !== 0)
                            return 1;
                        var res = this[_x54187[355]](num);
                        if (this[_x54187[206]] !== 0)
                            return -res | 0;
                        return res;
                    };
                    BN[_x54187[33]][_x54187[355]] = function ucmp(num) {
                        if (this[_x54187[7]] > num[_x54187[7]])
                            return 1;
                        if (this[_x54187[7]] < num[_x54187[7]])
                            return -1;
                        var res = 0;
                        for (var i = this[_x54187[7]] - 1; i >= 0; i--) {
                            var a = this[_x54187[207]][i] | 0;
                            var b = num[_x54187[207]][i] | 0;
                            if (a === b)
                                continue;
                            if (a < b) {
                                res = -1;
                            } else if (a > b) {
                                res = 1;
                            }
                            break;
                        }
                        return res;
                    };
                    BN[_x54187[33]][_x54187[356]] = function gtn(num) {
                        return this[_x54187[349]](num) === 1;
                    };
                    BN[_x54187[33]][_x54187[357]] = function gt(num) {
                        return this[_x54187[218]](num) === 1;
                    };
                    BN[_x54187[33]][_x54187[358]] = function gten(num) {
                        return this[_x54187[349]](num) >= 0;
                    };
                    BN[_x54187[33]][_x54187[359]] = function gte(num) {
                        return this[_x54187[218]](num) >= 0;
                    };
                    BN[_x54187[33]][_x54187[360]] = function ltn(num) {
                        return this[_x54187[349]](num) === -1;
                    };
                    BN[_x54187[33]][_x54187[361]] = function lt(num) {
                        return this[_x54187[218]](num) === -1;
                    };
                    BN[_x54187[33]][_x54187[362]] = function lten(num) {
                        return this[_x54187[349]](num) <= 0;
                    };
                    BN[_x54187[33]][_x54187[363]] = function lte(num) {
                        return this[_x54187[218]](num) <= 0;
                    };
                    BN[_x54187[33]][_x54187[364]] = function eqn(num) {
                        return this[_x54187[349]](num) === 0;
                    };
                    BN[_x54187[33]][_x54187[365]] = function eq(num) {
                        return this[_x54187[218]](num) === 0;
                    };
                    BN[_x54187[208]] = function red(num) {
                        return new Red(num);
                    };
                    BN[_x54187[33]][_x54187[366]] = function toRed(ctx) {
                        assert(!this[_x54187[208]], _x54187[367]);
                        assert(this[_x54187[206]] === 0, _x54187[368]);
                        return ctx[_x54187[370]](this)[_x54187[369]](ctx);
                    };
                    BN[_x54187[33]][_x54187[371]] = function fromRed() {
                        assert(this[_x54187[208]], _x54187[372]);
                        return this[_x54187[208]][_x54187[373]](this);
                    };
                    BN[_x54187[33]][_x54187[369]] = function _forceRed(ctx) {
                        this[_x54187[208]] = ctx;
                        return this;
                    };
                    BN[_x54187[33]][_x54187[374]] = function forceRed(ctx) {
                        assert(!this[_x54187[208]], _x54187[367]);
                        return this[_x54187[369]](ctx);
                    };
                    BN[_x54187[33]][_x54187[375]] = function redAdd(num) {
                        assert(this[_x54187[208]], _x54187[376]);
                        return this[_x54187[208]][_x54187[298]](this, num);
                    };
                    BN[_x54187[33]][_x54187[377]] = function redIAdd(num) {
                        assert(this[_x54187[208]], _x54187[378]);
                        return this[_x54187[208]][_x54187[296]](this, num);
                    };
                    BN[_x54187[33]][_x54187[379]] = function redSub(num) {
                        assert(this[_x54187[208]], _x54187[380]);
                        return this[_x54187[208]][_x54187[299]](this, num);
                    };
                    BN[_x54187[33]][_x54187[381]] = function redISub(num) {
                        assert(this[_x54187[208]], _x54187[382]);
                        return this[_x54187[208]][_x54187[297]](this, num);
                    };
                    BN[_x54187[33]][_x54187[383]] = function redShl(num) {
                        assert(this[_x54187[208]], _x54187[384]);
                        return this[_x54187[208]][_x54187[385]](this, num);
                    };
                    BN[_x54187[33]][_x54187[386]] = function redMul(num) {
                        assert(this[_x54187[208]], _x54187[387]);
                        this[_x54187[208]][_x54187[388]](this, num);
                        return this[_x54187[208]][_x54187[318]](this, num);
                    };
                    BN[_x54187[33]][_x54187[389]] = function redIMul(num) {
                        assert(this[_x54187[208]], _x54187[387]);
                        this[_x54187[208]][_x54187[388]](this, num);
                        return this[_x54187[208]][_x54187[300]](this, num);
                    };
                    BN[_x54187[33]][_x54187[390]] = function redSqr() {
                        assert(this[_x54187[208]], _x54187[391]);
                        this[_x54187[208]][_x54187[392]](this);
                        return this[_x54187[208]][_x54187[321]](this);
                    };
                    BN[_x54187[33]][_x54187[393]] = function redISqr() {
                        assert(this[_x54187[208]], _x54187[394]);
                        this[_x54187[208]][_x54187[392]](this);
                        return this[_x54187[208]][_x54187[322]](this);
                    };
                    BN[_x54187[33]][_x54187[395]] = function redSqrt() {
                        assert(this[_x54187[208]], _x54187[396]);
                        this[_x54187[208]][_x54187[392]](this);
                        return this[_x54187[208]][_x54187[397]](this);
                    };
                    BN[_x54187[33]][_x54187[398]] = function redInvm() {
                        assert(this[_x54187[208]], _x54187[399]);
                        this[_x54187[208]][_x54187[392]](this);
                        return this[_x54187[208]][_x54187[351]](this);
                    };
                    BN[_x54187[33]][_x54187[400]] = function redNeg() {
                        assert(this[_x54187[208]], _x54187[401]);
                        this[_x54187[208]][_x54187[392]](this);
                        return this[_x54187[208]][_x54187[282]](this);
                    };
                    BN[_x54187[33]][_x54187[402]] = function redPow(num) {
                        assert(this[_x54187[208]] && !num[_x54187[208]], _x54187[403]);
                        this[_x54187[208]][_x54187[392]](this);
                        return this[_x54187[208]][_x54187[123]](this, num);
                    };
                    var primes = {
                        k256: null,
                        p224: null,
                        p192: null,
                        p25519: null
                    };
                    function MPrime(name, p) {
                        this[_x54187[167]] = name;
                        this[_x54187[404]] = new BN(p, 16);
                        this[_x54187[405]] = this[_x54187[404]][_x54187[272]]();
                        this[_x54187[406]] = new BN(1)[_x54187[323]](this[_x54187[405]])[_x54187[297]](this[_x54187[404]]);
                        this[_x54187[407]] = this[_x54187[408]]();
                    }
                    MPrime[_x54187[33]][_x54187[408]] = function _tmp() {
                        var tmp = new BN(null);
                        tmp[_x54187[207]] = new Array(Math[_x54187[225]](this[_x54187[405]] / 13));
                        return tmp;
                    };
                    MPrime[_x54187[33]][_x54187[409]] = function ireduce(num) {
                        var r = num;
                        var rlen;
                        do {
                            this[_x54187[410]](r, this[_x54187[407]]);
                            r = this[_x54187[411]](r);
                            r = r[_x54187[296]](this[_x54187[407]]);
                            rlen = r[_x54187[272]]();
                        } while (rlen > this[_x54187[405]]);
                        var cmp = rlen < this[_x54187[405]] ? -1 : r[_x54187[355]](this[_x54187[404]]);
                        if (cmp === 0) {
                            r[_x54187[207]][0] = 0;
                            r[_x54187[7]] = 1;
                        } else if (cmp > 0) {
                            r[_x54187[297]](this[_x54187[404]]);
                        } else {
                            r[_x54187[223]]();
                        }
                        return r;
                    };
                    MPrime[_x54187[33]][_x54187[410]] = function split(input, out) {
                        input[_x54187[268]](this[_x54187[405]], 0, out);
                    };
                    MPrime[_x54187[33]][_x54187[411]] = function imulK(num) {
                        return num[_x54187[300]](this[_x54187[406]]);
                    };
                    function K256() {
                        MPrime[_x54187[5]](this, _x54187[412], _x54187[413]);
                    }
                    inherits(K256, MPrime);
                    K256[_x54187[33]][_x54187[410]] = function split(input, output) {
                        var mask = 4194303;
                        var outLen = Math[_x54187[70]](input[_x54187[7]], 9);
                        for (var i = 0; i < outLen; i++) {
                            output[_x54187[207]][i] = input[_x54187[207]][i];
                        }
                        output[_x54187[7]] = outLen;
                        if (input[_x54187[7]] <= 9) {
                            input[_x54187[207]][0] = 0;
                            input[_x54187[7]] = 1;
                            return;
                        }
                        var prev = input[_x54187[207]][9];
                        output[_x54187[207]][output[_x54187[7]]++] = prev & mask;
                        for (i = 10; i < input[_x54187[7]]; i++) {
                            var next = input[_x54187[207]][i] | 0;
                            input[_x54187[207]][i - 10] = (next & mask) << 4 | prev >>> 22;
                            prev = next;
                        }
                        prev >>>= 22;
                        input[_x54187[207]][i - 10] = prev;
                        if (prev === 0 && input[_x54187[7]] > 10) {
                            input[_x54187[7]] -= 10;
                        } else {
                            input[_x54187[7]] -= 9;
                        }
                    };
                    K256[_x54187[33]][_x54187[411]] = function imulK(num) {
                        num[_x54187[207]][num[_x54187[7]]] = 0;
                        num[_x54187[207]][num[_x54187[7]] + 1] = 0;
                        num[_x54187[7]] += 2;
                        var lo = 0;
                        for (var i = 0; i < num[_x54187[7]]; i++) {
                            var w = num[_x54187[207]][i] | 0;
                            lo += w * 977;
                            num[_x54187[207]][i] = lo & 67108863;
                            lo = w * 64 + (lo / 67108864 | 0);
                        }
                        if (num[_x54187[207]][num[_x54187[7]] - 1] === 0) {
                            num[_x54187[7]]--;
                            if (num[_x54187[207]][num[_x54187[7]] - 1] === 0) {
                                num[_x54187[7]]--;
                            }
                        }
                        return num;
                    };
                    function P224() {
                        MPrime[_x54187[5]](this, _x54187[414], _x54187[415]);
                    }
                    inherits(P224, MPrime);
                    function P192() {
                        MPrime[_x54187[5]](this, _x54187[416], _x54187[417]);
                    }
                    inherits(P192, MPrime);
                    function P25519() {
                        MPrime[_x54187[5]](this, _x54187[418], _x54187[419]);
                    }
                    inherits(P25519, MPrime);
                    P25519[_x54187[33]][_x54187[411]] = function imulK(num) {
                        var carry = 0;
                        for (var i = 0; i < num[_x54187[7]]; i++) {
                            var hi = (num[_x54187[207]][i] | 0) * 19 + carry;
                            var lo = hi & 67108863;
                            hi >>>= 26;
                            num[_x54187[207]][i] = lo;
                            carry = hi;
                        }
                        if (carry !== 0) {
                            num[_x54187[207]][num[_x54187[7]]++] = carry;
                        }
                        return num;
                    };
                    BN[_x54187[420]] = function prime(name) {
                        if (primes[name])
                            return primes[name];
                        var prime;
                        if (name === _x54187[412]) {
                            prime = new K256();
                        } else if (name === _x54187[414]) {
                            prime = new P224();
                        } else if (name === _x54187[416]) {
                            prime = new P192();
                        } else if (name === _x54187[421]) {
                            prime = new P25519();
                        } else {
                            throw new Error(_x54187[422] + name);
                        }
                        primes[name] = prime;
                        return prime;
                    };
                    function Red(m) {
                        if (typeof m === _x54187[37]) {
                            var prime = BN[_x54187[420]](m);
                            this[_x54187[423]] = prime[_x54187[404]];
                            this[_x54187[424]] = prime;
                        } else {
                            assert(m[_x54187[356]](1), _x54187[425]);
                            this[_x54187[423]] = m;
                            this[_x54187[424]] = null;
                        }
                    }
                    Red[_x54187[33]][_x54187[392]] = function _verify1(a) {
                        assert(a[_x54187[206]] === 0, _x54187[368]);
                        assert(a[_x54187[208]], _x54187[426]);
                    };
                    Red[_x54187[33]][_x54187[388]] = function _verify2(a, b) {
                        assert((a[_x54187[206]] | b[_x54187[206]]) === 0, _x54187[368]);
                        assert(a[_x54187[208]] && a[_x54187[208]] === b[_x54187[208]], _x54187[426]);
                    };
                    Red[_x54187[33]][_x54187[427]] = function imod(a) {
                        if (this[_x54187[424]])
                            return this[_x54187[424]][_x54187[409]](a)[_x54187[369]](this);
                        return a[_x54187[343]](this[_x54187[423]])[_x54187[369]](this);
                    };
                    Red[_x54187[33]][_x54187[282]] = function neg(a) {
                        if (a[_x54187[257]]()) {
                            return a[_x54187[228]]();
                        }
                        return this[_x54187[423]][_x54187[299]](a)[_x54187[369]](this);
                    };
                    Red[_x54187[33]][_x54187[298]] = function add(a, b) {
                        this[_x54187[388]](a, b);
                        var res = a[_x54187[298]](b);
                        if (res[_x54187[218]](this[_x54187[423]]) >= 0) {
                            res[_x54187[297]](this[_x54187[423]]);
                        }
                        return res[_x54187[369]](this);
                    };
                    Red[_x54187[33]][_x54187[296]] = function iadd(a, b) {
                        this[_x54187[388]](a, b);
                        var res = a[_x54187[296]](b);
                        if (res[_x54187[218]](this[_x54187[423]]) >= 0) {
                            res[_x54187[297]](this[_x54187[423]]);
                        }
                        return res;
                    };
                    Red[_x54187[33]][_x54187[299]] = function sub(a, b) {
                        this[_x54187[388]](a, b);
                        var res = a[_x54187[299]](b);
                        if (res[_x54187[349]](0) < 0) {
                            res[_x54187[296]](this[_x54187[423]]);
                        }
                        return res[_x54187[369]](this);
                    };
                    Red[_x54187[33]][_x54187[297]] = function isub(a, b) {
                        this[_x54187[388]](a, b);
                        var res = a[_x54187[297]](b);
                        if (res[_x54187[349]](0) < 0) {
                            res[_x54187[296]](this[_x54187[423]]);
                        }
                        return res;
                    };
                    Red[_x54187[33]][_x54187[385]] = function shl(a, num) {
                        this[_x54187[392]](a);
                        return this[_x54187[427]](a[_x54187[327]](num));
                    };
                    Red[_x54187[33]][_x54187[300]] = function imul(a, b) {
                        this[_x54187[388]](a, b);
                        return this[_x54187[427]](a[_x54187[300]](b));
                    };
                    Red[_x54187[33]][_x54187[318]] = function mul(a, b) {
                        this[_x54187[388]](a, b);
                        return this[_x54187[427]](a[_x54187[318]](b));
                    };
                    Red[_x54187[33]][_x54187[322]] = function isqr(a) {
                        return this[_x54187[300]](a, a[_x54187[228]]());
                    };
                    Red[_x54187[33]][_x54187[321]] = function sqr(a) {
                        return this[_x54187[318]](a, a);
                    };
                    Red[_x54187[33]][_x54187[397]] = function sqrt(a) {
                        if (a[_x54187[257]]())
                            return a[_x54187[228]]();
                        var mod3 = this[_x54187[423]][_x54187[267]](3);
                        assert(mod3 % 2 === 1);
                        if (mod3 === 3) {
                            var pow = this[_x54187[423]][_x54187[298]](new BN(1))[_x54187[268]](2);
                            return this[_x54187[123]](a, pow);
                        }
                        var q = this[_x54187[423]][_x54187[335]](1);
                        var s = 0;
                        while (!q[_x54187[257]]() && q[_x54187[267]](1) === 0) {
                            s++;
                            q[_x54187[268]](1);
                        }
                        assert(!q[_x54187[257]]());
                        var one = new BN(1)[_x54187[366]](this);
                        var nOne = one[_x54187[400]]();
                        var lpow = this[_x54187[423]][_x54187[335]](1)[_x54187[268]](1);
                        var z = this[_x54187[423]][_x54187[272]]();
                        z = new BN(2 * z * z)[_x54187[366]](this);
                        while (this[_x54187[123]](z, lpow)[_x54187[218]](nOne) !== 0) {
                            z[_x54187[377]](nOne);
                        }
                        var c = this[_x54187[123]](z, q);
                        var r = this[_x54187[123]](a, q[_x54187[334]](1)[_x54187[268]](1));
                        var t = this[_x54187[123]](a, q);
                        var m = s;
                        while (t[_x54187[218]](one) !== 0) {
                            var tmp = t;
                            for (var i = 0; tmp[_x54187[218]](one) !== 0; i++) {
                                tmp = tmp[_x54187[390]]();
                            }
                            assert(i < m);
                            var b = this[_x54187[123]](c, new BN(1)[_x54187[323]](m - i - 1));
                            r = r[_x54187[386]](b);
                            c = b[_x54187[390]]();
                            t = t[_x54187[386]](c);
                            m = i;
                        }
                        return r;
                    };
                    Red[_x54187[33]][_x54187[351]] = function invm(a) {
                        var inv = a[_x54187[348]](this[_x54187[423]]);
                        if (inv[_x54187[206]] !== 0) {
                            inv[_x54187[206]] = 0;
                            return this[_x54187[427]](inv)[_x54187[400]]();
                        } else {
                            return this[_x54187[427]](inv);
                        }
                    };
                    Red[_x54187[33]][_x54187[123]] = function pow(a, num) {
                        if (num[_x54187[257]]())
                            return new BN(1);
                        if (num[_x54187[349]](1) === 0)
                            return a[_x54187[228]]();
                        var windowSize = 4;
                        var wnd = new Array(1 << windowSize);
                        wnd[0] = new BN(1)[_x54187[366]](this);
                        wnd[1] = a;
                        for (var i = 2; i < wnd[_x54187[7]]; i++) {
                            wnd[i] = this[_x54187[318]](wnd[i - 1], a);
                        }
                        var res = wnd[0];
                        var current = 0;
                        var currentLen = 0;
                        var start = num[_x54187[272]]() % 26;
                        if (start === 0) {
                            start = 26;
                        }
                        for (i = num[_x54187[7]] - 1; i >= 0; i--) {
                            var word = num[_x54187[207]][i];
                            for (var j = start - 1; j >= 0; j--) {
                                var bit = word >> j & 1;
                                if (res !== wnd[0]) {
                                    res = this[_x54187[321]](res);
                                }
                                if (bit === 0 && current === 0) {
                                    currentLen = 0;
                                    continue;
                                }
                                current <<= 1;
                                current |= bit;
                                currentLen++;
                                if (currentLen !== windowSize && (i !== 0 || j !== 0))
                                    continue;
                                res = this[_x54187[318]](res, wnd[current]);
                                currentLen = 0;
                                current = 0;
                            }
                            start = 26;
                        }
                        return res;
                    };
                    Red[_x54187[33]][_x54187[370]] = function convertTo(num) {
                        var r = num[_x54187[343]](this[_x54187[423]]);
                        return r === num ? r[_x54187[228]]() : r;
                    };
                    Red[_x54187[33]][_x54187[373]] = function convertFrom(num) {
                        var res = num[_x54187[228]]();
                        res[_x54187[208]] = null;
                        return res;
                    };
                    BN[_x54187[428]] = function mont(num) {
                        return new Mont(num);
                    };
                    function Mont(m) {
                        Red[_x54187[5]](this, m);
                        this[_x54187[429]] = this[_x54187[423]][_x54187[272]]();
                        if (this[_x54187[429]] % 26 !== 0) {
                            this[_x54187[429]] += 26 - this[_x54187[429]] % 26;
                        }
                        this[_x54187[430]] = new BN(1)[_x54187[323]](this[_x54187[429]]);
                        this[_x54187[431]] = this[_x54187[427]](this[_x54187[430]][_x54187[321]]());
                        this[_x54187[432]] = this[_x54187[430]][_x54187[348]](this[_x54187[423]]);
                        this[_x54187[433]] = this[_x54187[432]][_x54187[318]](this[_x54187[430]])[_x54187[333]](1)[_x54187[340]](this[_x54187[423]]);
                        this[_x54187[433]] = this[_x54187[433]][_x54187[343]](this[_x54187[430]]);
                        this[_x54187[433]] = this[_x54187[430]][_x54187[299]](this[_x54187[433]]);
                    }
                    inherits(Mont, Red);
                    Mont[_x54187[33]][_x54187[370]] = function convertTo(num) {
                        return this[_x54187[427]](num[_x54187[327]](this[_x54187[429]]));
                    };
                    Mont[_x54187[33]][_x54187[373]] = function convertFrom(num) {
                        var r = this[_x54187[427]](num[_x54187[318]](this[_x54187[432]]));
                        r[_x54187[208]] = null;
                        return r;
                    };
                    Mont[_x54187[33]][_x54187[300]] = function imul(a, b) {
                        if (a[_x54187[257]]() || b[_x54187[257]]()) {
                            a[_x54187[207]][0] = 0;
                            a[_x54187[7]] = 1;
                            return a;
                        }
                        var t = a[_x54187[300]](b);
                        var c = t[_x54187[332]](this[_x54187[429]])[_x54187[318]](this[_x54187[433]])[_x54187[330]](this[_x54187[429]])[_x54187[318]](this[_x54187[423]]);
                        var u = t[_x54187[297]](c)[_x54187[268]](this[_x54187[429]]);
                        var res = u;
                        if (u[_x54187[218]](this[_x54187[423]]) >= 0) {
                            res = u[_x54187[297]](this[_x54187[423]]);
                        } else if (u[_x54187[349]](0) < 0) {
                            res = u[_x54187[296]](this[_x54187[423]]);
                        }
                        return res[_x54187[369]](this);
                    };
                    Mont[_x54187[33]][_x54187[318]] = function mul(a, b) {
                        if (a[_x54187[257]]() || b[_x54187[257]]())
                            return new BN(0)[_x54187[369]](this);
                        var t = a[_x54187[318]](b);
                        var c = t[_x54187[332]](this[_x54187[429]])[_x54187[318]](this[_x54187[433]])[_x54187[330]](this[_x54187[429]])[_x54187[318]](this[_x54187[423]]);
                        var u = t[_x54187[297]](c)[_x54187[268]](this[_x54187[429]]);
                        var res = u;
                        if (u[_x54187[218]](this[_x54187[423]]) >= 0) {
                            res = u[_x54187[297]](this[_x54187[423]]);
                        } else if (u[_x54187[349]](0) < 0) {
                            res = u[_x54187[296]](this[_x54187[423]]);
                        }
                        return res[_x54187[369]](this);
                    };
                    Mont[_x54187[33]][_x54187[351]] = function invm(a) {
                        var res = this[_x54187[427]](a[_x54187[348]](this[_x54187[423]])[_x54187[318]](this[_x54187[431]]));
                        return res[_x54187[369]](this);
                    };
                }(typeof module === _x54187[11] || module, this));
            },
            {}
        ],
        6: [
            function (require, module, exports) {
                (function (Buffer) {
                    'use strict';
                    var utils = require(_x54187[434]);
                    var uint256Coder = utils[_x54187[435]];
                    var coderBoolean = utils[_x54187[436]];
                    var coderFixedBytes = utils[_x54187[437]];
                    var coderAddress = utils[_x54187[438]];
                    var coderDynamicBytes = utils[_x54187[439]];
                    var coderString = utils[_x54187[440]];
                    var coderArray = utils[_x54187[441]];
                    var paramTypePart = utils[_x54187[442]];
                    var getParamCoder = utils[_x54187[443]];
                    function Result() {
                    }
                    function encodeParams(types, values) {
                        if (types[_x54187[7]] !== values[_x54187[7]]) {
                            throw new Error(_x54187[444] + types[_x54187[7]] + _x54187[445] + values[_x54187[7]]);
                        }
                        var parts = [];
                        types[_x54187[446]](function (type, index) {
                            var coder = getParamCoder(type);
                            parts[_x54187[18]]({
                                dynamic: coder[_x54187[447]],
                                value: coder[_x54187[448]](values[index])
                            });
                        });
                        function alignSize(size) {
                            return parseInt(32 * Math[_x54187[225]](size / 32));
                        }
                        var staticSize = 0, dynamicSize = 0;
                        parts[_x54187[446]](function (part) {
                            if (part[_x54187[447]]) {
                                staticSize += 32;
                                dynamicSize += alignSize(part[_x54187[449]][_x54187[7]]);
                            } else {
                                staticSize += alignSize(part[_x54187[449]][_x54187[7]]);
                            }
                        });
                        var offset = 0, dynamicOffset = staticSize;
                        var data = new Buffer(staticSize + dynamicSize);
                        parts[_x54187[446]](function (part, index) {
                            if (part[_x54187[447]]) {
                                uint256Coder[_x54187[448]](dynamicOffset)[_x54187[58]](data, offset);
                                offset += 32;
                                part[_x54187[449]][_x54187[58]](data, dynamicOffset);
                                dynamicOffset += alignSize(part[_x54187[449]][_x54187[7]]);
                            } else {
                                part[_x54187[449]][_x54187[58]](data, offset);
                                offset += alignSize(part[_x54187[449]][_x54187[7]]);
                            }
                        });
                        return _x54187[450] + data[_x54187[65]](_x54187[72]);
                    }
                    function decodeParams(names, types, data) {
                        var useNumberedParams = arguments[_x54187[7]] > 3 && arguments[3] !== undefined ? arguments[3] : true;
                        if (arguments[_x54187[7]] < 3) {
                            data = types;
                            types = names;
                            names = [];
                        }
                        data = utils[_x54187[451]](data);
                        var values = new Result();
                        var offset = 0;
                        types[_x54187[446]](function (type, index) {
                            var coder = getParamCoder(type);
                            if (coder[_x54187[447]]) {
                                var dynamicOffset = uint256Coder[_x54187[452]](data, offset);
                                var result = coder[_x54187[452]](data, dynamicOffset[_x54187[449]][_x54187[261]]());
                                offset += dynamicOffset[_x54187[453]];
                            } else {
                                var result = coder[_x54187[452]](data, offset);
                                offset += result[_x54187[453]];
                            }
                            if (useNumberedParams)
                                values[index] = result[_x54187[449]];
                            if (names[index]) {
                                values[names[index]] = result[_x54187[449]];
                            }
                        });
                        return values;
                    }
                    function encodeMethod(method, values) {
                        var signature = method[_x54187[167]] + _x54187[454] + utils[_x54187[455]](method[_x54187[456]], _x54187[59])[_x54187[19]](_x54187[457]) + _x54187[458];
                        var signatureEncoded = _x54187[450] + new Buffer(utils[_x54187[459]](signature), _x54187[72])[_x54187[54]](0, 4)[_x54187[65]](_x54187[72]);
                        var paramsEncoded = encodeParams(utils[_x54187[455]](method[_x54187[456]], _x54187[59]), values)[_x54187[460]](2);
                        return _x54187[20] + signatureEncoded + paramsEncoded;
                    }
                    function decodeMethod(method, data) {
                        var outputNames = utils[_x54187[455]](method[_x54187[461]], _x54187[167], true);
                        var outputTypes = utils[_x54187[455]](method[_x54187[461]], _x54187[59]);
                        return decodeParams(outputNames, outputTypes, utils[_x54187[451]](data));
                    }
                    function encodeEvent(eventObject, values) {
                        return encodeMethod(eventObject, values);
                    }
                    function eventSignature(eventObject) {
                        var signature = eventObject[_x54187[167]] + _x54187[454] + utils[_x54187[455]](eventObject[_x54187[456]], _x54187[59])[_x54187[19]](_x54187[457]) + _x54187[458];
                        return _x54187[450] + utils[_x54187[459]](signature);
                    }
                    function decodeEvent(eventObject, data, topics) {
                        var useNumberedParams = arguments[_x54187[7]] > 3 && arguments[3] !== undefined ? arguments[3] : true;
                        var nonIndexed = eventObject[_x54187[456]][_x54187[462]](function (input) {
                            return !input[_x54187[463]];
                        });
                        var nonIndexedNames = utils[_x54187[455]](nonIndexed, _x54187[167], true);
                        var nonIndexedTypes = utils[_x54187[455]](nonIndexed, _x54187[59]);
                        var event = decodeParams(nonIndexedNames, nonIndexedTypes, utils[_x54187[451]](data), useNumberedParams);
                        var topicOffset = eventObject[_x54187[464]] ? 0 : 1;
                        eventObject[_x54187[456]][_x54187[462]](function (input) {
                            return input[_x54187[463]];
                        })[_x54187[465]](function (input, i) {
                            var topic = new Buffer(topics[i + topicOffset][_x54187[54]](2), _x54187[72]);
                            var coder = getParamCoder(input[_x54187[59]]);
                            event[input[_x54187[167]]] = coder[_x54187[452]](topic, 0)[_x54187[449]];
                        });
                        event[_x54187[466]] = eventObject[_x54187[167]];
                        return event;
                    }
                    function decodeLogItem(eventObject, log) {
                        var useNumberedParams = arguments[_x54187[7]] > 2 && arguments[2] !== undefined ? arguments[2] : true;
                        if (eventObject && log[_x54187[467]][0] === eventSignature(eventObject)) {
                            return decodeEvent(eventObject, log[_x54187[61]], log[_x54187[467]], useNumberedParams);
                        }
                    }
                    function logDecoder(abi) {
                        var useNumberedParams = arguments[_x54187[7]] > 1 && arguments[1] !== undefined ? arguments[1] : true;
                        var eventMap = {};
                        abi[_x54187[462]](function (item) {
                            return item[_x54187[59]] === _x54187[468];
                        })[_x54187[465]](function (item) {
                            eventMap[eventSignature(item)] = item;
                        });
                        return function (logItems) {
                            return logItems[_x54187[465]](function (log) {
                                return decodeLogItem(eventMap[log[_x54187[467]][0]], log, useNumberedParams);
                            })[_x54187[462]](function (i) {
                                return i;
                            });
                        };
                    }
                    module[_x54187[6]] = {
                        encodeParams: encodeParams,
                        decodeParams: decodeParams,
                        encodeMethod: encodeMethod,
                        decodeMethod: decodeMethod,
                        encodeEvent: encodeEvent,
                        decodeEvent: decodeEvent,
                        decodeLogItem: decodeLogItem,
                        logDecoder: logDecoder,
                        eventSignature: eventSignature
                    };
                }[_x54187[5]](this, require(_x54187[469])[_x54187[24]]));
            },
            {
                './utils/index.js': 7,
                'buffer': 2
            }
        ],
        7: [
            function (require, module, exports) {
                (function (Buffer) {
                    'use strict';
                    var BN = require(_x54187[470]);
                    var numberToBN = require(_x54187[471]);
                    var keccak256 = require(_x54187[473])[_x54187[472]];
                    function stripZeros(aInput) {
                        var a = aInput;
                        var first = a[0];
                        while (a[_x54187[7]] > 0 && first[_x54187[65]]() === _x54187[164]) {
                            a = a[_x54187[54]](1);
                            first = a[0];
                        }
                        return a;
                    }
                    function bnToBuffer(bnInput) {
                        var bn = bnInput;
                        var hex = bn[_x54187[65]](16);
                        if (hex[_x54187[7]] % 2) {
                            hex = _x54187[164] + hex;
                        }
                        return stripZeros(new Buffer(hex, _x54187[72]));
                    }
                    function isHexString(value, length) {
                        if (typeof value !== _x54187[37] || !value[_x54187[95]](/^0x[0-9A-Fa-f]*$/)) {
                            return false;
                        }
                        if (length && value[_x54187[7]] !== 2 + 2 * length) {
                            return false;
                        }
                        return true;
                    }
                    function hexOrBuffer(valueInput, name) {
                        var value = valueInput;
                        if (!Buffer[_x54187[57]](value)) {
                            if (!isHexString(value)) {
                                var error = new Error(name ? _x54187[474] + name : _x54187[475]);
                                error[_x54187[476]] = _x54187[477];
                                error[_x54187[449]] = value;
                                throw error;
                            }
                            value = value[_x54187[460]](2);
                            if (value[_x54187[7]] % 2) {
                                value = _x54187[164] + value;
                            }
                            value = new Buffer(value, _x54187[72]);
                        }
                        return value;
                    }
                    function hexlify(value) {
                        if (typeof value === _x54187[36]) {
                            return _x54187[450] + bnToBuffer(new BN(value))[_x54187[65]](_x54187[72]);
                        } else if (value[_x54187[339]] || value[_x54187[478]]) {
                            return _x54187[450] + bnToBuffer(value)[_x54187[65]](_x54187[72]);
                        } else {
                            return _x54187[450] + hexOrBuffer(value)[_x54187[65]](_x54187[72]);
                        }
                    }
                    function getKeys(params, key, allowEmpty) {
                        var result = [];
                        if (!Array[_x54187[60]](params)) {
                            throw new Error(_x54187[479] + JSON[_x54187[480]](params));
                        }
                        for (var i = 0; i < params[_x54187[7]]; i++) {
                            var value = params[i][key];
                            if (allowEmpty && !value) {
                                value = _x54187[20];
                            } else if (typeof value !== _x54187[37]) {
                                throw new Error(_x54187[481]);
                            }
                            result[_x54187[18]](value);
                        }
                        return result;
                    }
                    function coderNumber(size, signed) {
                        return {
                            encode: function encodeNumber(valueInput) {
                                var value = valueInput;
                                if (typeof value === _x54187[212] && value[_x54187[65]] && (value[_x54187[274]] || value[_x54187[482]])) {
                                    value = value[_x54187[65]](10)[_x54187[410]](_x54187[483])[0];
                                }
                                if (typeof value === _x54187[37] || typeof value === _x54187[36]) {
                                    value = String(value)[_x54187[410]](_x54187[483])[0];
                                }
                                value = numberToBN(value);
                                value = value[_x54187[274]](size * 8)[_x54187[332]](size * 8);
                                if (signed) {
                                    value = value[_x54187[277]](size * 8)[_x54187[274]](256);
                                }
                                return value[_x54187[264]](Buffer, _x54187[210], 32);
                            },
                            decode: function decodeNumber(data, offset) {
                                var junkLength = 32 - size;
                                var value = new BN(data[_x54187[54]](offset + junkLength, offset + 32));
                                if (signed) {
                                    value = value[_x54187[277]](size * 8);
                                } else {
                                    value = value[_x54187[332]](size * 8);
                                }
                                return {
                                    consumed: 32,
                                    value: new BN(value[_x54187[65]](10))
                                };
                            }
                        };
                    }
                    var uint256Coder = coderNumber(32, false);
                    var coderBoolean = {
                        encode: function encodeBoolean(value) {
                            return uint256Coder[_x54187[448]](value ? 1 : 0);
                        },
                        decode: function decodeBoolean(data, offset) {
                            var result = uint256Coder[_x54187[452]](data, offset);
                            return {
                                consumed: result[_x54187[453]],
                                value: !result[_x54187[449]][_x54187[257]]()
                            };
                        }
                    };
                    function coderFixedBytes(length) {
                        return {
                            encode: function encodeFixedBytes(valueInput) {
                                var value = valueInput;
                                value = hexOrBuffer(value);
                                if (value[_x54187[7]] === 32) {
                                    return value;
                                }
                                var result = new Buffer(32);
                                result[_x54187[46]](0);
                                value[_x54187[58]](result);
                                return result;
                            },
                            decode: function decodeFixedBytes(data, offset) {
                                if (data[_x54187[7]] !== 0 && data[_x54187[7]] < offset + 32) {
                                    throw new Error(_x54187[484] + length);
                                }
                                return {
                                    consumed: 32,
                                    value: _x54187[450] + data[_x54187[54]](offset, offset + length)[_x54187[65]](_x54187[72])
                                };
                            }
                        };
                    }
                    var coderAddress = {
                        encode: function encodeAddress(valueInput) {
                            var value = valueInput;
                            var result = new Buffer(32);
                            if (!isHexString(value, 20)) {
                                throw new Error(_x54187[485]);
                            }
                            value = hexOrBuffer(value);
                            result[_x54187[46]](0);
                            value[_x54187[58]](result, 12);
                            return result;
                        },
                        decode: function decodeAddress(data, offset) {
                            if (data[_x54187[7]] === 0) {
                                return {
                                    consumed: 32,
                                    value: _x54187[450]
                                };
                            }
                            if (data[_x54187[7]] !== 0 && data[_x54187[7]] < offset + 32) {
                                throw new Error(_x54187[486] + data[_x54187[7]]);
                            }
                            return {
                                consumed: 32,
                                value: _x54187[450] + data[_x54187[54]](offset + 12, offset + 32)[_x54187[65]](_x54187[72])
                            };
                        }
                    };
                    function encodeDynamicBytesHelper(value) {
                        var dataLength = parseInt(32 * Math[_x54187[225]](value[_x54187[7]] / 32));
                        var padding = new Buffer(dataLength - value[_x54187[7]]);
                        padding[_x54187[46]](0);
                        return Buffer[_x54187[82]]([
                            uint256Coder[_x54187[448]](value[_x54187[7]]),
                            value,
                            padding
                        ]);
                    }
                    function decodeDynamicBytesHelper(data, offset) {
                        if (data[_x54187[7]] !== 0 && data[_x54187[7]] < offset + 32) {
                            throw new Error(_x54187[487] + data[_x54187[7]] + _x54187[488] + (offset + 32));
                        }
                        var length = uint256Coder[_x54187[452]](data, offset)[_x54187[449]];
                        length = length[_x54187[261]]();
                        if (data[_x54187[7]] !== 0 && data[_x54187[7]] < offset + 32 + length) {
                            throw new Error(_x54187[487] + data[_x54187[7]] + _x54187[488] + (offset + 32 + length));
                        }
                        return {
                            consumed: parseInt(32 + 32 * Math[_x54187[225]](length / 32), 10),
                            value: data[_x54187[54]](offset + 32, offset + 32 + length)
                        };
                    }
                    var coderDynamicBytes = {
                        encode: function encodeDynamicBytes(value) {
                            return encodeDynamicBytesHelper(hexOrBuffer(value));
                        },
                        decode: function decodeDynamicBytes(data, offset) {
                            var result = decodeDynamicBytesHelper(data, offset);
                            result[_x54187[449]] = _x54187[450] + result[_x54187[449]][_x54187[65]](_x54187[72]);
                            return result;
                        },
                        dynamic: true
                    };
                    var coderString = {
                        encode: function encodeString(value) {
                            return encodeDynamicBytesHelper(new Buffer(value, _x54187[50]));
                        },
                        decode: function decodeString(data, offset) {
                            var result = decodeDynamicBytesHelper(data, offset);
                            result[_x54187[449]] = result[_x54187[449]][_x54187[65]](_x54187[50]);
                            return result;
                        },
                        dynamic: true
                    };
                    function coderArray(coder, lengthInput) {
                        return {
                            encode: function encodeArray(value) {
                                var result = new Buffer(0);
                                var length = lengthInput;
                                if (!Array[_x54187[60]](value)) {
                                    throw new Error(_x54187[489]);
                                }
                                if (length === -1) {
                                    length = value[_x54187[7]];
                                    result = uint256Coder[_x54187[448]](length);
                                }
                                if (length !== value[_x54187[7]]) {
                                    throw new Error(_x54187[490] + length + _x54187[491] + value[_x54187[7]]);
                                }
                                value[_x54187[446]](function (resultValue) {
                                    result = Buffer[_x54187[82]]([
                                        result,
                                        coder[_x54187[448]](resultValue)
                                    ]);
                                });
                                return result;
                            },
                            decode: function decodeArray(data, offsetInput) {
                                var length = lengthInput;
                                var offset = offsetInput;
                                var consumed = 0;
                                var decodeResult;
                                if (length === -1) {
                                    decodeResult = uint256Coder[_x54187[452]](data, offset);
                                    length = decodeResult[_x54187[449]][_x54187[261]]();
                                    consumed += decodeResult[_x54187[453]];
                                    offset += decodeResult[_x54187[453]];
                                }
                                var value = [];
                                for (var i = 0; i < length; i++) {
                                    var loopResult = coder[_x54187[452]](data, offset);
                                    consumed += loopResult[_x54187[453]];
                                    offset += loopResult[_x54187[453]];
                                    value[_x54187[18]](loopResult[_x54187[449]]);
                                }
                                return {
                                    consumed: consumed,
                                    value: value
                                };
                            },
                            dynamic: lengthInput === -1
                        };
                    }
                    var paramTypePart = new RegExp(/^((u?int|bytes)([0-9]*)|(address|bool|string)|(\[([0-9]*)\]))/);
                    function getParamCoder(typeInput) {
                        var type = typeInput;
                        var coder = null;
                        var invalidTypeErrorMessage = _x54187[492] + JSON[_x54187[480]](type) + _x54187[493];
                        while (type) {
                            var part = type[_x54187[95]](paramTypePart);
                            if (!part) {
                                throw new Error(invalidTypeErrorMessage);
                            }
                            type = type[_x54187[460]](part[0][_x54187[7]]);
                            var prefix = part[2] || part[4] || part[5];
                            switch (prefix) {
                            case _x54187[494]:
                            case _x54187[495]:
                                if (coder) {
                                    throw new Error(invalidTypeErrorMessage);
                                }
                                var intSize = parseInt(part[3] || 256);
                                if (intSize === 0 || intSize > 256 || intSize % 8 !== 0) {
                                    throw new Error(_x54187[496] + type + _x54187[497] + prefix + _x54187[498] + type);
                                }
                                coder = coderNumber(intSize / 8, prefix === _x54187[494]);
                                break;
                            case _x54187[499]:
                                if (coder) {
                                    throw new Error(invalidTypeErrorMessage);
                                }
                                coder = coderBoolean;
                                break;
                            case _x54187[37]:
                                if (coder) {
                                    throw new Error(invalidTypeErrorMessage);
                                }
                                coder = coderString;
                                break;
                            case _x54187[500]:
                                if (coder) {
                                    throw new Error(invalidTypeErrorMessage);
                                }
                                if (part[3]) {
                                    var size = parseInt(part[3]);
                                    if (size === 0 || size > 32) {
                                        throw new Error(_x54187[501] + type + _x54187[502] + size + _x54187[503]);
                                    }
                                    coder = coderFixedBytes(size);
                                } else {
                                    coder = coderDynamicBytes;
                                }
                                break;
                            case _x54187[504]:
                                if (coder) {
                                    throw new Error(invalidTypeErrorMessage);
                                }
                                coder = coderAddress;
                                break;
                            case _x54187[505]:
                                if (!coder || coder[_x54187[447]]) {
                                    throw new Error(invalidTypeErrorMessage);
                                }
                                coder = coderArray(coder, -1);
                                break;
                            default:
                                if (!coder || coder[_x54187[447]]) {
                                    throw new Error(invalidTypeErrorMessage);
                                }
                                var defaultSize = parseInt(part[6]);
                                coder = coderArray(coder, defaultSize);
                            }
                        }
                        if (!coder) {
                            throw new Error(invalidTypeErrorMessage);
                        }
                        return coder;
                    }
                    module[_x54187[6]] = {
                        BN: BN,
                        bnToBuffer: bnToBuffer,
                        isHexString: isHexString,
                        hexOrBuffer: hexOrBuffer,
                        hexlify: hexlify,
                        stripZeros: stripZeros,
                        keccak256: keccak256,
                        getKeys: getKeys,
                        numberToBN: numberToBN,
                        coderNumber: coderNumber,
                        uint256Coder: uint256Coder,
                        coderBoolean: coderBoolean,
                        coderFixedBytes: coderFixedBytes,
                        coderAddress: coderAddress,
                        coderDynamicBytes: coderDynamicBytes,
                        coderString: coderString,
                        coderArray: coderArray,
                        paramTypePart: paramTypePart,
                        getParamCoder: getParamCoder
                    };
                }[_x54187[5]](this, require(_x54187[469])[_x54187[24]]));
            },
            {
                'bn.js': 5,
                'buffer': 2,
                'js-sha3': 16,
                'number-to-bn': 17
            }
        ],
        8: [
            function (require, module, exports) {
                'use strict';
                var abi = require(_x54187[506]);
                var keccak256 = require(_x54187[473])[_x54187[472]];
                var EthFilter = require(_x54187[507]);
                var getKeys = require(_x54187[508])[_x54187[455]];
                var arrayContainsArray = require(_x54187[508])[_x54187[509]];
                function hasTransactionObject(args) {
                    var txObjectProperties = [
                        _x54187[43],
                        _x54187[510],
                        _x54187[61],
                        _x54187[449],
                        _x54187[511],
                        _x54187[512]
                    ];
                    if (typeof args === _x54187[212] && Array[_x54187[60]](args) === true && args[_x54187[7]] > 0) {
                        if (typeof args[args[_x54187[7]] - 1] === _x54187[212] && (Object[_x54187[513]](args[args[_x54187[7]] - 1])[_x54187[7]] === 0 || arrayContainsArray(Object[_x54187[513]](args[args[_x54187[7]] - 1]), txObjectProperties, true))) {
                            return true;
                        }
                    }
                    return false;
                }
                function getConstructorFromABI(contractABI) {
                    return contractABI[_x54187[462]](function (json) {
                        return json[_x54187[59]] === _x54187[166];
                    })[0];
                }
                function getCallableMethodsFromABI(contractABI) {
                    return contractABI[_x54187[462]](function (json) {
                        return (json[_x54187[59]] === _x54187[0] || json[_x54187[59]] === _x54187[468]) && json[_x54187[167]][_x54187[7]] > 0;
                    });
                }
                function contractFactory(query) {
                    return function ContractFactory(contractABI, contractBytecode, contractDefaultTxObject) {
                        if (!Array[_x54187[60]](contractABI)) {
                            throw new Error(_x54187[514] + typeof contractABI);
                        }
                        if (typeof contractBytecode !== _x54187[11] && typeof contractBytecode !== _x54187[37]) {
                            throw new Error(_x54187[515] + typeof contractBytecode);
                        }
                        if (typeof contractDefaultTxObject !== _x54187[11] && typeof contractDefaultTxObject !== _x54187[212]) {
                            throw new Error(_x54187[516] + typeof contractABI);
                        }
                        var output = {};
                        output[_x54187[517]] = function atContract(address) {
                            function Contract() {
                                var self = this;
                                self[_x54187[518]] = contractABI || [];
                                self[_x54187[519]] = query;
                                self[_x54187[504]] = address || _x54187[450];
                                self[_x54187[520]] = contractBytecode || _x54187[450];
                                self[_x54187[521]] = contractDefaultTxObject || {};
                                self[_x54187[522]] = new EthFilter(query);
                                getCallableMethodsFromABI(contractABI)[_x54187[446]](function (methodObject) {
                                    self[methodObject[_x54187[167]]] = function contractMethod() {
                                        var queryMethod = _x54187[5];
                                        var providedTxObject = {};
                                        var methodCallback = function methodCallback() {
                                        };
                                        var methodArgs = [][_x54187[54]][_x54187[5]](arguments);
                                        if (typeof methodArgs[methodArgs[_x54187[7]] - 1] === _x54187[0]) {
                                            methodCallback = methodArgs[_x54187[523]]();
                                        }
                                        if (methodObject[_x54187[59]] === _x54187[0]) {
                                            return new Promise(function (resolve, reject) {
                                                function newMethodCallback(callbackError, callbackResult) {
                                                    if (queryMethod === _x54187[5] && !callbackError) {
                                                        try {
                                                            var decodedMethodResult = abi[_x54187[524]](methodObject, callbackResult);
                                                            resolve(decodedMethodResult);
                                                            methodCallback(null, decodedMethodResult);
                                                        } catch (decodeFormattingError) {
                                                            var decodingError = new Error(_x54187[525] + JSON[_x54187[480]](callbackResult) + _x54187[96] + decodeFormattingError);
                                                            reject(decodingError);
                                                            methodCallback(decodingError, null);
                                                        }
                                                    } else if (queryMethod === _x54187[526] && !callbackError) {
                                                        resolve(callbackResult);
                                                        methodCallback(null, callbackResult);
                                                    } else {
                                                        reject(callbackError);
                                                        methodCallback(callbackError, null);
                                                    }
                                                }
                                                if (hasTransactionObject(methodArgs))
                                                    providedTxObject = methodArgs[_x54187[523]]();
                                                var methodTxObject = Object[_x54187[527]]({}, self[_x54187[521]], providedTxObject, { to: self[_x54187[504]] });
                                                methodTxObject[_x54187[61]] = abi[_x54187[528]](methodObject, methodArgs);
                                                if (methodObject[_x54187[529]] === false) {
                                                    queryMethod = _x54187[526];
                                                }
                                                query[queryMethod](methodTxObject, newMethodCallback);
                                            });
                                        } else if (methodObject[_x54187[59]] === _x54187[468]) {
                                            var _ret = function () {
                                                var filterInputTypes = getKeys(methodObject[_x54187[456]], _x54187[59], false);
                                                var filterTopic = _x54187[450] + keccak256(methodObject[_x54187[167]] + _x54187[454] + filterInputTypes[_x54187[19]](_x54187[457]) + _x54187[458]);
                                                var filterTopcis = [filterTopic];
                                                var argsObject = Object[_x54187[527]]({}, methodArgs[0]) || {};
                                                return {
                                                    v: new self[_x54187[522]][_x54187[530]](Object[_x54187[527]]({}, argsObject, {
                                                        decoder: function decoder(logData) {
                                                            return abi[_x54187[531]](methodObject, logData, filterTopcis);
                                                        },
                                                        defaultFilterObject: Object[_x54187[527]]({}, methodArgs[0] || {}, {
                                                            to: self[_x54187[504]],
                                                            topics: filterTopcis
                                                        })
                                                    }))
                                                };
                                            }();
                                            if (typeof _ret === _x54187[212])
                                                return _ret[_x54187[532]];
                                        }
                                    };
                                });
                            }
                            return new Contract();
                        };
                        output[_x54187[533]] = function newContract() {
                            var providedTxObject = {};
                            var newMethodCallback = function newMethodCallback() {
                            };
                            var newMethodArgs = [][_x54187[54]][_x54187[5]](arguments);
                            if (typeof newMethodArgs[newMethodArgs[_x54187[7]] - 1] === _x54187[0])
                                newMethodCallback = newMethodArgs[_x54187[523]]();
                            if (hasTransactionObject(newMethodArgs))
                                providedTxObject = newMethodArgs[_x54187[523]]();
                            var constructMethod = getConstructorFromABI(contractABI);
                            var assembleTxObject = Object[_x54187[527]]({}, contractDefaultTxObject, providedTxObject);
                            if (contractBytecode) {
                                assembleTxObject[_x54187[61]] = contractBytecode;
                            }
                            if (constructMethod) {
                                var constructBytecode = abi[_x54187[534]](getKeys(constructMethod[_x54187[456]], _x54187[59]), newMethodArgs)[_x54187[460]](2);
                                assembleTxObject[_x54187[61]] = _x54187[20] + assembleTxObject[_x54187[61]] + constructBytecode;
                            }
                            return query[_x54187[526]](assembleTxObject, newMethodCallback);
                        };
                        return output;
                    };
                }
                function EthContract(query) {
                    return contractFactory(query);
                }
                module[_x54187[6]] = EthContract;
            },
            {
                'ethjs-abi': 6,
                'ethjs-filter': 9,
                'ethjs-util': 14,
                'js-sha3': 16
            }
        ],
        9: [
            function (require, module, exports) {
                'use strict';
                function constructFilter(filterName, query) {
                    function Filter(options) {
                        var self = this;
                        self[_x54187[535]] = null;
                        self[_x54187[536]] = Object[_x54187[527]]({
                            delay: 300,
                            decoder: function decodeData(data) {
                                return data;
                            },
                            defaultFilterObject: {}
                        }, options || {});
                        self[_x54187[537]] = {};
                        self[_x54187[538]] = setInterval(function () {
                            if (self[_x54187[535]] !== null && Object[_x54187[513]](self[_x54187[537]])[_x54187[7]] > 0) {
                                query[_x54187[539]](self[_x54187[535]], function (changeError, changeResult) {
                                    var decodedChangeResults = [];
                                    var decodingError = null;
                                    if (!changeError) {
                                        try {
                                            changeResult[_x54187[446]](function (log, logIndex) {
                                                decodedChangeResults[logIndex] = changeResult[logIndex];
                                                decodedChangeResults[logIndex][_x54187[61]] = self[_x54187[536]][_x54187[540]](decodedChangeResults[logIndex][_x54187[61]]);
                                            });
                                        } catch (decodingErrorMesage) {
                                            decodingError = new Error(_x54187[541] + JSON[_x54187[480]](decodedChangeResults) + _x54187[542] + decodingErrorMesage);
                                        }
                                    }
                                    Object[_x54187[513]](self[_x54187[537]])[_x54187[446]](function (id) {
                                        var watcher = self[_x54187[537]][id];
                                        if (watcher[_x54187[543]] === true) {
                                            delete self[_x54187[537]][id];
                                            return;
                                        }
                                        if (decodingError) {
                                            watcher[_x54187[544]](decodingError);
                                            watcher[_x54187[545]](decodingError, null);
                                        } else {
                                            if (changeError) {
                                                watcher[_x54187[544]](changeError);
                                            } else if (Array[_x54187[60]](decodedChangeResults) && changeResult[_x54187[7]] > 0) {
                                                watcher[_x54187[546]](decodedChangeResults);
                                            }
                                            watcher[_x54187[545]](changeError, decodedChangeResults);
                                        }
                                    });
                                });
                            }
                        }, self[_x54187[536]][_x54187[547]]);
                    }
                    Filter[_x54187[33]][_x54187[517]] = function atFilter(filterId) {
                        var self = this;
                        self[_x54187[535]] = filterId;
                    };
                    Filter[_x54187[33]][_x54187[548]] = function watchFilter(watchCallbackInput) {
                        var callback = watchCallbackInput || function () {
                        };
                        var self = this;
                        var id = Math[_x54187[549]]()[_x54187[65]](36)[_x54187[460]](7);
                        var output = new Promise(function (resolve, reject) {
                            self[_x54187[537]][id] = {
                                resolve: resolve,
                                reject: reject,
                                callback: callback,
                                stop: false
                            };
                        });
                        output[_x54187[550]] = function stopWatching() {
                            self[_x54187[537]][id][_x54187[543]] = true;
                        };
                        return output;
                    };
                    Filter[_x54187[33]][_x54187[551]] = function uninstallFilter(cb) {
                        var self = this;
                        var callback = cb || function emptyCallback() {
                        };
                        self[_x54187[537]] = Object[_x54187[527]]({});
                        clearInterval(self[_x54187[538]]);
                        return new Promise(function (resolve, reject) {
                            query[_x54187[552]](self[_x54187[535]], function (uninstallError, uninstallResilt) {
                                if (uninstallError) {
                                    reject(uninstallError);
                                } else {
                                    resolve(uninstallResilt);
                                }
                                callback(uninstallError, uninstallResilt);
                            });
                        });
                    };
                    Filter[_x54187[33]][_x54187[533]] = function newFilter() {
                        var callback = function callback() {
                        };
                        var self = this;
                        var filterInputs = [];
                        var args = [][_x54187[54]][_x54187[5]](arguments);
                        if (typeof args[args[_x54187[7]] - 1] === _x54187[0]) {
                            callback = args[_x54187[523]]();
                        }
                        if (filterName === _x54187[530]) {
                            filterInputs[_x54187[18]](Object[_x54187[527]](self[_x54187[536]][_x54187[553]], args[args[_x54187[7]] - 1] || {}));
                        }
                        return new Promise(function (resolve, reject) {
                            filterInputs[_x54187[18]](function (setupError, filterId) {
                                if (!setupError) {
                                    self[_x54187[535]] = filterId;
                                    resolve(filterId);
                                } else {
                                    reject(setupError);
                                }
                                callback(setupError, filterId);
                            });
                            query[_x54187[533] + filterName][_x54187[91]](query, filterInputs);
                        });
                    };
                    return Filter;
                }
                function EthFilter(query) {
                    var self = this;
                    if (!(self instanceof EthFilter)) {
                        throw new Error(_x54187[554]);
                    }
                    if (typeof query !== _x54187[212]) {
                        throw new Error(_x54187[555]);
                    }
                    self[_x54187[530]] = constructFilter(_x54187[530], query);
                    self[_x54187[556]] = constructFilter(_x54187[556], query);
                    self[_x54187[557]] = constructFilter(_x54187[557], query);
                }
                module[_x54187[6]] = EthFilter;
            },
            {}
        ],
        10: [
            function (require, module, exports) {
                'use strict';
                var schema = require(_x54187[558]);
                var util = require(_x54187[508]);
                var numberToBN = require(_x54187[471]);
                var stripHexPrefix = require(_x54187[559]);
                var padToEven = util[_x54187[560]];
                var arrayContainsArray = util[_x54187[509]];
                var getBinarySize = util[_x54187[561]];
                function formatQuantity(value, encode) {
                    if ([
                            _x54187[37],
                            _x54187[36],
                            _x54187[212]
                        ][_x54187[101]](typeof value) === -1 || value === null) {
                        return value;
                    }
                    var numberValue = numberToBN(value);
                    if (numberToBN(value)[_x54187[281]]()) {
                        throw new Error(_x54187[562] + numberValue[_x54187[65]](10) + _x54187[563]);
                    }
                    return encode ? _x54187[450] + numberValue[_x54187[65]](16) : numberValue;
                }
                function formatQuantityOrTag(value, encode) {
                    var output = value;
                    if (schema[_x54187[564]][_x54187[101]](value) === -1) {
                        output = formatQuantity(value, encode);
                    }
                    return output;
                }
                function formatData(value, byteLength) {
                    var output = value;
                    var outputByteLength = 0;
                    if (typeof value === _x54187[37]) {
                        output = _x54187[450] + padToEven(stripHexPrefix(value));
                        outputByteLength = getBinarySize(output);
                    }
                    if (output === _x54187[565]) {
                        output = _x54187[566];
                    }
                    if (typeof byteLength === _x54187[36] && value !== null && output !== _x54187[450] && output !== _x54187[566] && (!/^[0-9A-Fa-f]+$/[_x54187[567]](stripHexPrefix(output)) || outputByteLength !== 2 + byteLength * 2)) {
                        throw new Error(_x54187[568] + output + _x54187[569] + (2 + byteLength * 2) + _x54187[570] + outputByteLength + _x54187[66]);
                    }
                    return output;
                }
                function formatObject(formatter, value, encode) {
                    var output = Object[_x54187[527]]({}, value);
                    var formatObject = null;
                    if (typeof formatter === _x54187[37]) {
                        if (formatter === _x54187[571]) {
                            formatObject = Object[_x54187[527]]({}, schema[_x54187[573]][_x54187[572]]);
                        } else if (formatter === _x54187[574]) {
                            formatObject = Object[_x54187[527]]({}, schema[_x54187[573]][_x54187[575]]);
                        } else {
                            formatObject = Object[_x54187[527]]({}, schema[_x54187[573]][formatter]);
                        }
                    }
                    if (!arrayContainsArray(Object[_x54187[513]](value), formatObject[_x54187[576]])) {
                        throw new Error(_x54187[577] + JSON[_x54187[480]](value) + _x54187[578] + formatObject[_x54187[576]][_x54187[19]](_x54187[579]));
                    }
                    Object[_x54187[513]](formatObject)[_x54187[446]](function (valueKey) {
                        if (valueKey !== _x54187[576] && typeof value[valueKey] !== _x54187[11]) {
                            output[valueKey] = format(formatObject[valueKey], value[valueKey], encode);
                        }
                    });
                    return output;
                }
                function formatArray(formatter, value, encode, lengthRequirement) {
                    var output = value[_x54187[54]]();
                    var formatObject = formatter;
                    if (formatter === _x54187[580]) {
                        formatObject = [_x54187[581]];
                    }
                    if (formatter === _x54187[582] && typeof value[0] === _x54187[37]) {
                        formatObject = [_x54187[583]];
                    }
                    if (encode === true && typeof lengthRequirement === _x54187[36] && value[_x54187[7]] < lengthRequirement) {
                        throw new Error(_x54187[584] + JSON[_x54187[480]](value) + _x54187[585] + lengthRequirement + _x54187[586] + value[_x54187[7]] + _x54187[483]);
                    }
                    formatObject = formatObject[_x54187[54]]();
                    value[_x54187[446]](function (valueKey, valueIndex) {
                        var formatObjectKey = 0;
                        if (formatObject[_x54187[7]] > 1) {
                            formatObjectKey = valueIndex;
                        }
                        output[valueIndex] = format(formatObject[formatObjectKey], valueKey, encode);
                    });
                    return output;
                }
                function format(formatter, value, encode, lengthRequirement) {
                    var output = value;
                    if (formatter === _x54187[587]) {
                        output = formatQuantity(value, encode);
                    } else if (formatter === _x54187[588]) {
                        output = formatQuantityOrTag(value, encode);
                    } else if (formatter === _x54187[581]) {
                        output = formatData(value);
                    } else if (formatter === _x54187[589]) {
                        output = formatData(value, 20);
                    } else if (formatter === _x54187[583]) {
                        output = formatData(value, 32);
                    } else {
                        if (typeof value === _x54187[212] && value !== null && Array[_x54187[60]](value) === false) {
                            output = formatObject(formatter, value, encode);
                        } else if (Array[_x54187[60]](value)) {
                            output = formatArray(formatter, value, encode, lengthRequirement);
                        }
                    }
                    return output;
                }
                function formatInputs(method, inputs) {
                    return format(schema[_x54187[590]][method][0], inputs, true, schema[_x54187[590]][method][2]);
                }
                function formatOutputs(method, outputs) {
                    return format(schema[_x54187[590]][method][1], outputs, false);
                }
                module[_x54187[6]] = {
                    schema: schema,
                    formatQuantity: formatQuantity,
                    formatQuantityOrTag: formatQuantityOrTag,
                    formatObject: formatObject,
                    formatArray: formatArray,
                    format: format,
                    formatInputs: formatInputs,
                    formatOutputs: formatOutputs
                };
            },
            {
                'ethjs-schema': 13,
                'ethjs-util': 14,
                'number-to-bn': 17,
                'strip-hex-prefix': 18
            }
        ],
        11: [
            function (require, module, exports) {
                'use strict';
                var format = require(_x54187[591]);
                var EthRPC = require(_x54187[592]);
                module[_x54187[6]] = Eth;
                function Eth(provider, options) {
                    var self = this;
                    var optionsObject = options || {};
                    if (!(this instanceof Eth)) {
                        throw new Error(_x54187[593]);
                    }
                    if (typeof provider !== _x54187[212]) {
                        throw new Error(_x54187[594] + typeof provider + _x54187[595]);
                    }
                    self[_x54187[536]] = Object[_x54187[527]]({
                        debug: optionsObject[_x54187[596]] || false,
                        logger: optionsObject[_x54187[597]] || console,
                        jsonSpace: optionsObject[_x54187[598]] || 0
                    });
                    self[_x54187[599]] = new EthRPC(provider);
                    self[_x54187[600]] = self[_x54187[599]][_x54187[600]];
                }
                Eth[_x54187[33]][_x54187[172]] = function log(message) {
                    var self = this;
                    if (self[_x54187[536]][_x54187[596]])
                        self[_x54187[536]][_x54187[597]][_x54187[172]](_x54187[601] + message);
                };
                Object[_x54187[513]](format[_x54187[602]][_x54187[590]])[_x54187[446]](function (rpcMethodName) {
                    Object[_x54187[40]](Eth[_x54187[33]], rpcMethodName[_x54187[162]](_x54187[603], _x54187[20]), {
                        enumerable: true,
                        value: generateFnFor(rpcMethodName, format[_x54187[602]][_x54187[590]][rpcMethodName])
                    });
                });
                function generateFnFor(method, methodObject) {
                    return function outputMethod() {
                        var protoCallback = function protoCallback() {
                        };
                        var inputs = null;
                        var inputError = null;
                        var self = this;
                        var args = [][_x54187[54]][_x54187[5]](arguments);
                        var protoMethod = method[_x54187[162]](_x54187[603], _x54187[20]);
                        if (args[_x54187[7]] > 0 && typeof args[args[_x54187[7]] - 1] === _x54187[0]) {
                            protoCallback = args[_x54187[523]]();
                        }
                        return new Promise(function (resolve, reject) {
                            var cb = function cb(callbackError, callbackResult) {
                                if (callbackError) {
                                    reject(callbackError);
                                    protoCallback(callbackError, null);
                                } else {
                                    try {
                                        self[_x54187[172]](_x54187[604] + protoMethod + _x54187[605] + JSON[_x54187[480]](callbackResult, null, self[_x54187[536]][_x54187[598]]));
                                        var methodOutputs = format[_x54187[606]](method, callbackResult);
                                        self[_x54187[172]](_x54187[607] + protoMethod + _x54187[608] + JSON[_x54187[480]](methodOutputs, null, self[_x54187[536]][_x54187[598]]));
                                        resolve(methodOutputs);
                                        protoCallback(null, methodOutputs);
                                    } catch (outputFormattingError) {
                                        var outputError = new Error(_x54187[609] + JSON[_x54187[480]](callbackResult, null, self[_x54187[536]][_x54187[598]]) + _x54187[610] + protoMethod + _x54187[611] + outputFormattingError);
                                        reject(outputError);
                                        protoCallback(outputError, null);
                                    }
                                }
                            };
                            if (args[_x54187[7]] < methodObject[2]) {
                                return cb(new Error(_x54187[612] + protoMethod + _x54187[613] + methodObject[2] + _x54187[614] + methodObject[0][0] + _x54187[615] + args[_x54187[7]] + _x54187[616] + method[_x54187[71]]()));
                            }
                            if (args[_x54187[7]] > methodObject[0][_x54187[7]]) {
                                return cb(new Error(_x54187[612] + protoMethod + _x54187[617] + methodObject[0][_x54187[7]] + _x54187[618] + args[_x54187[7]] + _x54187[619] + JSON[_x54187[480]](args, null, self[_x54187[536]][_x54187[598]]) + _x54187[620] + method[_x54187[71]]()));
                            }
                            if (methodObject[3] && args[_x54187[7]] < methodObject[3]) {
                                args[_x54187[18]](_x54187[621]);
                            }
                            self[_x54187[172]](_x54187[604] + protoMethod + _x54187[622] + JSON[_x54187[480]](args, null, self[_x54187[536]][_x54187[598]]));
                            try {
                                inputs = format[_x54187[623]](method, args);
                                self[_x54187[172]](_x54187[607] + protoMethod + _x54187[624] + JSON[_x54187[480]](inputs, null, self[_x54187[536]][_x54187[598]]));
                            } catch (formattingError) {
                                return cb(new Error(_x54187[625] + JSON[_x54187[480]](args, null, self[_x54187[536]][_x54187[598]]) + _x54187[610] + protoMethod + _x54187[626] + formattingError));
                            }
                            return self[_x54187[599]][_x54187[627]]({
                                method: method,
                                params: inputs
                            }, cb);
                        });
                    };
                }
            },
            {
                'ethjs-format': 10,
                'ethjs-rpc': 12
            }
        ],
        12: [
            function (require, module, exports) {
                'use strict';
                module[_x54187[6]] = EthRPC;
                function EthRPC(cprovider, options) {
                    var self = this;
                    var optionsObject = options || {};
                    if (!(this instanceof EthRPC)) {
                        throw new Error(_x54187[628]);
                    }
                    self[_x54187[536]] = Object[_x54187[527]]({
                        jsonSpace: optionsObject[_x54187[598]] || 0,
                        max: optionsObject[_x54187[217]] || 9999999999999
                    });
                    self[_x54187[629]] = Math[_x54187[171]](Math[_x54187[549]]() * self[_x54187[536]][_x54187[217]]);
                    self[_x54187[600]] = function (provider) {
                        if (typeof provider !== _x54187[212]) {
                            throw new Error(_x54187[630] + typeof provider + _x54187[631]);
                        }
                        self[_x54187[632]] = provider;
                    };
                    self[_x54187[600]](cprovider);
                }
                EthRPC[_x54187[33]][_x54187[627]] = function sendAsync(payload, cb) {
                    var self = this;
                    var callback = cb || function () {
                    };
                    self[_x54187[629]] = self[_x54187[629]] % self[_x54187[536]][_x54187[217]];
                    var parsedPayload = createPayload(payload, self[_x54187[629]]++);
                    return new Promise(function (resolve, reject) {
                        self[_x54187[632]][_x54187[627]](parsedPayload, function (err, response) {
                            var responseObject = response || {};
                            if (err || responseObject[_x54187[29]]) {
                                var payloadErrorMessage = _x54187[633] + (responseObject[_x54187[29]] && _x54187[599] || _x54187[20]) + _x54187[634] + JSON[_x54187[480]](parsedPayload, null, self[_x54187[536]][_x54187[598]]) + _x54187[96] + (err ? String(err) : JSON[_x54187[480]](responseObject[_x54187[29]], null, self[_x54187[536]][_x54187[598]]));
                                var payloadError = new Error(payloadErrorMessage);
                                payloadError[_x54187[449]] = err || responseObject[_x54187[29]];
                                reject(payloadError);
                                return callback(payloadError, null);
                            }
                            resolve(responseObject[_x54187[635]]);
                            return callback(null, responseObject[_x54187[635]]);
                        });
                    });
                };
                function createPayload(data, id) {
                    return Object[_x54187[527]]({}, {
                        id: id,
                        jsonrpc: _x54187[636],
                        params: []
                    }, data);
                }
            },
            {}
        ],
        13: [
            function (require, module, exports) {
                module[_x54187[6]] = {
                    'methods': {
                        'web3_clientVersion': [
                            [],
                            _x54187[637]
                        ],
                        'web3_sha3': [
                            [_x54187[637]],
                            _x54187[581],
                            1
                        ],
                        'net_version': [
                            [],
                            _x54187[637]
                        ],
                        'net_peerCount': [
                            [],
                            _x54187[587]
                        ],
                        'net_listening': [
                            [],
                            _x54187[638]
                        ],
                        'personal_sign': [
                            [
                                _x54187[581],
                                _x54187[589],
                                _x54187[637]
                            ],
                            _x54187[581],
                            2
                        ],
                        'personal_ecRecover': [
                            [
                                _x54187[581],
                                _x54187[581]
                            ],
                            _x54187[589],
                            2
                        ],
                        'eth_protocolVersion': [
                            [],
                            _x54187[637]
                        ],
                        'eth_syncing': [
                            [],
                            _x54187[639]
                        ],
                        'eth_coinbase': [
                            [],
                            _x54187[589]
                        ],
                        'eth_mining': [
                            [],
                            _x54187[638]
                        ],
                        'eth_hashrate': [
                            [],
                            _x54187[587]
                        ],
                        'eth_gasPrice': [
                            [],
                            _x54187[587]
                        ],
                        'eth_accounts': [
                            [],
                            [_x54187[589]]
                        ],
                        'eth_blockNumber': [
                            [],
                            _x54187[587]
                        ],
                        'eth_getBalance': [
                            [
                                _x54187[589],
                                _x54187[588]
                            ],
                            _x54187[587],
                            1,
                            2
                        ],
                        'eth_getStorageAt': [
                            [
                                _x54187[589],
                                _x54187[587],
                                _x54187[588]
                            ],
                            _x54187[581],
                            2,
                            2
                        ],
                        'eth_getTransactionCount': [
                            [
                                _x54187[589],
                                _x54187[588]
                            ],
                            _x54187[587],
                            1,
                            2
                        ],
                        'eth_getBlockTransactionCountByHash': [
                            [_x54187[583]],
                            _x54187[587],
                            1
                        ],
                        'eth_getBlockTransactionCountByNumber': [
                            [_x54187[588]],
                            _x54187[587],
                            1
                        ],
                        'eth_getUncleCountByBlockHash': [
                            [_x54187[583]],
                            _x54187[587],
                            1
                        ],
                        'eth_getUncleCountByBlockNumber': [
                            [_x54187[587]],
                            _x54187[587],
                            1
                        ],
                        'eth_getCode': [
                            [
                                _x54187[589],
                                _x54187[588]
                            ],
                            _x54187[581],
                            1,
                            2
                        ],
                        'eth_sign': [
                            [
                                _x54187[589],
                                _x54187[581]
                            ],
                            _x54187[581],
                            2
                        ],
                        'eth_signTypedData': [
                            [
                                _x54187[580],
                                _x54187[589]
                            ],
                            _x54187[581],
                            1
                        ],
                        'eth_sendTransaction': [
                            [_x54187[640]],
                            _x54187[581],
                            1
                        ],
                        'eth_sendRawTransaction': [
                            [_x54187[581]],
                            _x54187[583],
                            1
                        ],
                        'eth_call': [
                            [
                                _x54187[641],
                                _x54187[588]
                            ],
                            _x54187[581],
                            1,
                            2
                        ],
                        'eth_estimateGas': [
                            [
                                _x54187[642],
                                _x54187[588]
                            ],
                            _x54187[587],
                            1
                        ],
                        'eth_getBlockByHash': [
                            [
                                _x54187[583],
                                _x54187[638]
                            ],
                            _x54187[643],
                            2
                        ],
                        'eth_getBlockByNumber': [
                            [
                                _x54187[588],
                                _x54187[638]
                            ],
                            _x54187[643],
                            2
                        ],
                        'eth_getTransactionByHash': [
                            [_x54187[583]],
                            _x54187[575],
                            1
                        ],
                        'eth_getTransactionByBlockHashAndIndex': [
                            [
                                _x54187[583],
                                _x54187[587]
                            ],
                            _x54187[575],
                            2
                        ],
                        'eth_getTransactionByBlockNumberAndIndex': [
                            [
                                _x54187[588],
                                _x54187[587]
                            ],
                            _x54187[575],
                            2
                        ],
                        'eth_getTransactionReceipt': [
                            [_x54187[583]],
                            _x54187[644],
                            1
                        ],
                        'eth_getUncleByBlockHashAndIndex': [
                            [
                                _x54187[583],
                                _x54187[587]
                            ],
                            _x54187[643],
                            1
                        ],
                        'eth_getUncleByBlockNumberAndIndex': [
                            [
                                _x54187[588],
                                _x54187[587]
                            ],
                            _x54187[643],
                            2
                        ],
                        'eth_getCompilers': [
                            [],
                            [_x54187[637]]
                        ],
                        'eth_compileLLL': [
                            [_x54187[637]],
                            _x54187[581],
                            1
                        ],
                        'eth_compileSolidity': [
                            [_x54187[637]],
                            _x54187[581],
                            1
                        ],
                        'eth_compileSerpent': [
                            [_x54187[637]],
                            _x54187[581],
                            1
                        ],
                        'eth_newFilter': [
                            [_x54187[530]],
                            _x54187[587],
                            1
                        ],
                        'eth_newBlockFilter': [
                            [],
                            _x54187[587]
                        ],
                        'eth_newPendingTransactionFilter': [
                            [],
                            _x54187[587]
                        ],
                        'eth_uninstallFilter': [
                            [_x54187[587]],
                            _x54187[638],
                            1
                        ],
                        'eth_getFilterChanges': [
                            [_x54187[587]],
                            [_x54187[582]],
                            1
                        ],
                        'eth_getFilterLogs': [
                            [_x54187[587]],
                            [_x54187[582]],
                            1
                        ],
                        'eth_getLogs': [
                            [_x54187[530]],
                            [_x54187[582]],
                            1
                        ],
                        'eth_getWork': [
                            [],
                            [_x54187[581]]
                        ],
                        'eth_submitWork': [
                            [
                                _x54187[581],
                                _x54187[583],
                                _x54187[583]
                            ],
                            _x54187[638],
                            3
                        ],
                        'eth_submitHashrate': [
                            [
                                _x54187[581],
                                _x54187[581]
                            ],
                            _x54187[638],
                            2
                        ],
                        'db_putString': [
                            [
                                _x54187[637],
                                _x54187[637],
                                _x54187[637]
                            ],
                            _x54187[638],
                            2
                        ],
                        'db_getString': [
                            [
                                _x54187[637],
                                _x54187[637]
                            ],
                            _x54187[637],
                            2
                        ],
                        'db_putHex': [
                            [
                                _x54187[637],
                                _x54187[637],
                                _x54187[581]
                            ],
                            _x54187[638],
                            2
                        ],
                        'db_getHex': [
                            [
                                _x54187[637],
                                _x54187[637]
                            ],
                            _x54187[581],
                            2
                        ],
                        'shh_post': [
                            [_x54187[645]],
                            _x54187[638],
                            1
                        ],
                        'shh_version': [
                            [],
                            _x54187[637]
                        ],
                        'shh_newIdentity': [
                            [],
                            _x54187[581]
                        ],
                        'shh_hasIdentity': [
                            [_x54187[581]],
                            _x54187[638]
                        ],
                        'shh_newGroup': [
                            [],
                            _x54187[581]
                        ],
                        'shh_addToGroup': [
                            [_x54187[581]],
                            _x54187[638],
                            1
                        ],
                        'shh_newFilter': [
                            [_x54187[646]],
                            _x54187[587],
                            1
                        ],
                        'shh_uninstallFilter': [
                            [_x54187[587]],
                            _x54187[638],
                            1
                        ],
                        'shh_getFilterChanges': [
                            [_x54187[587]],
                            [_x54187[647]],
                            1
                        ],
                        'shh_getMessages': [
                            [_x54187[587]],
                            [_x54187[647]],
                            1
                        ]
                    },
                    'tags': [
                        _x54187[621],
                        _x54187[648],
                        _x54187[649]
                    ],
                    'objects': {
                        'EthSyncing': {
                            '__required': [],
                            'startingBlock': _x54187[587],
                            'currentBlock': _x54187[587],
                            'highestBlock': _x54187[587]
                        },
                        'SendTransaction': {
                            '__required': [
                                _x54187[43],
                                _x54187[61]
                            ],
                            'from': _x54187[589],
                            'to': _x54187[589],
                            'gas': _x54187[587],
                            'gasPrice': _x54187[587],
                            'value': _x54187[587],
                            'data': _x54187[581],
                            'nonce': _x54187[587]
                        },
                        'EstimateTransaction': {
                            '__required': [],
                            'from': _x54187[589],
                            'to': _x54187[589],
                            'gas': _x54187[587],
                            'gasPrice': _x54187[587],
                            'value': _x54187[587],
                            'data': _x54187[581],
                            'nonce': _x54187[587]
                        },
                        'CallTransaction': {
                            '__required': [_x54187[510]],
                            'from': _x54187[589],
                            'to': _x54187[589],
                            'gas': _x54187[587],
                            'gasPrice': _x54187[587],
                            'value': _x54187[587],
                            'data': _x54187[581],
                            'nonce': _x54187[587]
                        },
                        'Block': {
                            '__required': [],
                            'number': _x54187[587],
                            'hash': _x54187[583],
                            'parentHash': _x54187[583],
                            'nonce': _x54187[581],
                            'sha3Uncles': _x54187[581],
                            'logsBloom': _x54187[581],
                            'transactionsRoot': _x54187[581],
                            'stateRoot': _x54187[581],
                            'receiptsRoot': _x54187[581],
                            'miner': _x54187[581],
                            'difficulty': _x54187[587],
                            'totalDifficulty': _x54187[587],
                            'extraData': _x54187[581],
                            'size': _x54187[587],
                            'gasLimit': _x54187[587],
                            'gasUsed': _x54187[587],
                            'timestamp': _x54187[587],
                            'transactions': [_x54187[574]],
                            'uncles': [_x54187[581]]
                        },
                        'Transaction': {
                            '__required': [],
                            'hash': _x54187[583],
                            'nonce': _x54187[587],
                            'blockHash': _x54187[583],
                            'blockNumber': _x54187[587],
                            'transactionIndex': _x54187[587],
                            'from': _x54187[589],
                            'to': _x54187[589],
                            'value': _x54187[587],
                            'gasPrice': _x54187[587],
                            'gas': _x54187[587],
                            'input': _x54187[581]
                        },
                        'Receipt': {
                            '__required': [],
                            'transactionHash': _x54187[583],
                            'transactionIndex': _x54187[587],
                            'blockHash': _x54187[583],
                            'blockNumber': _x54187[587],
                            'cumulativeGasUsed': _x54187[587],
                            'gasUsed': _x54187[587],
                            'contractAddress': _x54187[589],
                            'logs': [_x54187[582]]
                        },
                        'Filter': {
                            '__required': [],
                            'fromBlock': _x54187[588],
                            'toBlock': _x54187[588],
                            'address': _x54187[589],
                            'topics': [_x54187[581]]
                        },
                        'FilterChange': {
                            '__required': [],
                            'removed': _x54187[638],
                            'logIndex': _x54187[587],
                            'transactionIndex': _x54187[587],
                            'transactionHash': _x54187[583],
                            'blockHash': _x54187[583],
                            'blockNumber': _x54187[587],
                            'address': _x54187[589],
                            'data': _x54187[580],
                            'topics': [_x54187[581]]
                        },
                        'SHHPost': {
                            '__required': [
                                _x54187[467],
                                _x54187[650],
                                _x54187[651],
                                _x54187[652]
                            ],
                            'from': _x54187[581],
                            'to': _x54187[581],
                            'topics': [_x54187[581]],
                            'payload': _x54187[581],
                            'priority': _x54187[587],
                            'ttl': _x54187[587]
                        },
                        'SHHFilter': {
                            '__required': [_x54187[467]],
                            'to': _x54187[581],
                            'topics': [_x54187[581]]
                        },
                        'SHHFilterChange': {
                            '__required': [],
                            'hash': _x54187[581],
                            'from': _x54187[581],
                            'to': _x54187[581],
                            'expiry': _x54187[587],
                            'ttl': _x54187[587],
                            'sent': _x54187[587],
                            'topics': [_x54187[581]],
                            'payload': _x54187[581],
                            'workProved': _x54187[587]
                        },
                        'SHHMessage': {
                            '__required': [],
                            'hash': _x54187[581],
                            'from': _x54187[581],
                            'to': _x54187[581],
                            'expiry': _x54187[587],
                            'ttl': _x54187[587],
                            'sent': _x54187[587],
                            'topics': [_x54187[581]],
                            'payload': _x54187[581],
                            'workProved': _x54187[587]
                        }
                    }
                };
            },
            {}
        ],
        14: [
            function (require, module, exports) {
                (function (Buffer) {
                    'use strict';
                    var isHexPrefixed = require(_x54187[653]);
                    var stripHexPrefix = require(_x54187[559]);
                    function padToEven(value) {
                        var a = value;
                        if (typeof a !== _x54187[37]) {
                            throw new Error(_x54187[654] + typeof a + _x54187[655]);
                        }
                        if (a[_x54187[7]] % 2) {
                            a = _x54187[164] + a;
                        }
                        return a;
                    }
                    function intToHex(i) {
                        var hex = i[_x54187[65]](16);
                        return _x54187[450] + padToEven(hex);
                    }
                    function intToBuffer(i) {
                        var hex = intToHex(i);
                        return Buffer[_x54187[43]](hex[_x54187[54]](2), _x54187[72]);
                    }
                    function getBinarySize(str) {
                        if (typeof str !== _x54187[37]) {
                            throw new Error(_x54187[656] + typeof str + _x54187[657]);
                        }
                        return Buffer[_x54187[8]](str, _x54187[50]);
                    }
                    function arrayContainsArray(superset, subset, some) {
                        if (Array[_x54187[60]](superset) !== true) {
                            throw new Error(_x54187[658] + typeof superset + _x54187[2]);
                        }
                        if (Array[_x54187[60]](subset) !== true) {
                            throw new Error(_x54187[659] + typeof subset + _x54187[2]);
                        }
                        return subset[Boolean(some) && _x54187[660] || _x54187[661]](function (value) {
                            return superset[_x54187[101]](value) >= 0;
                        });
                    }
                    function toUtf8(hex) {
                        var bufferValue = new Buffer(padToEven(stripHexPrefix(hex)[_x54187[162]](/^0+|0+$/g, _x54187[20])), _x54187[72]);
                        return bufferValue[_x54187[65]](_x54187[50]);
                    }
                    function toAscii(hex) {
                        var str = _x54187[20];
                        var i = 0, l = hex[_x54187[7]];
                        if (hex[_x54187[460]](0, 2) === _x54187[450]) {
                            i = 2;
                        }
                        for (; i < l; i += 2) {
                            var code = parseInt(hex[_x54187[107]](i, 2), 16);
                            str += String[_x54187[112]](code);
                        }
                        return str;
                    }
                    function fromUtf8(stringValue) {
                        var str = new Buffer(stringValue, _x54187[50]);
                        return _x54187[450] + padToEven(str[_x54187[65]](_x54187[72]))[_x54187[162]](/^0+|0+$/g, _x54187[20]);
                    }
                    function fromAscii(stringValue) {
                        var hex = _x54187[20];
                        for (var i = 0; i < stringValue[_x54187[7]]; i++) {
                            var code = stringValue[_x54187[13]](i);
                            var n = code[_x54187[65]](16);
                            hex += n[_x54187[7]] < 2 ? _x54187[164] + n : n;
                        }
                        return _x54187[450] + hex;
                    }
                    function getKeys(params, key, allowEmpty) {
                        if (!Array[_x54187[60]](params)) {
                            throw new Error(_x54187[662] + typeof params + _x54187[2]);
                        }
                        if (typeof key !== _x54187[37]) {
                            throw new Error(_x54187[663] + typeof key + _x54187[657]);
                        }
                        var result = [];
                        for (var i = 0; i < params[_x54187[7]]; i++) {
                            var value = params[i][key];
                            if (allowEmpty && !value) {
                                value = _x54187[20];
                            } else if (typeof value !== _x54187[37]) {
                                throw new Error(_x54187[664]);
                            }
                            result[_x54187[18]](value);
                        }
                        return result;
                    }
                    function isHexString(value, length) {
                        if (typeof value !== _x54187[37] || !value[_x54187[95]](/^0x[0-9A-Fa-f]*$/)) {
                            return false;
                        }
                        if (length && value[_x54187[7]] !== 2 + 2 * length) {
                            return false;
                        }
                        return true;
                    }
                    module[_x54187[6]] = {
                        arrayContainsArray: arrayContainsArray,
                        intToBuffer: intToBuffer,
                        getBinarySize: getBinarySize,
                        isHexPrefixed: isHexPrefixed,
                        stripHexPrefix: stripHexPrefix,
                        padToEven: padToEven,
                        intToHex: intToHex,
                        fromAscii: fromAscii,
                        fromUtf8: fromUtf8,
                        toAscii: toAscii,
                        toUtf8: toUtf8,
                        getKeys: getKeys,
                        isHexString: isHexString
                    };
                }[_x54187[5]](this, require(_x54187[469])[_x54187[24]]));
            },
            {
                'buffer': 2,
                'is-hex-prefixed': 15,
                'strip-hex-prefix': 18
            }
        ],
        15: [
            function (require, module, exports) {
                module[_x54187[6]] = function isHexPrefixed(str) {
                    if (typeof str !== _x54187[37]) {
                        throw new Error(_x54187[665] + typeof str + _x54187[666]);
                    }
                    return str[_x54187[54]](0, 2) === _x54187[450];
                };
            },
            {}
        ],
        16: [
            function (require, module, exports) {
                (function (process, global) {
                    (function (root) {
                        'use strict';
                        var NODE_JS = typeof process == _x54187[212] && process[_x54187[185]] && process[_x54187[185]][_x54187[667]];
                        if (NODE_JS) {
                            root = global;
                        }
                        var COMMON_JS = !root[_x54187[668]] && typeof module == _x54187[212] && module[_x54187[6]];
                        var HEX_CHARS = _x54187[669][_x54187[410]](_x54187[20]);
                        var SHAKE_PADDING = [
                            31,
                            7936,
                            2031616,
                            520093696
                        ];
                        var KECCAK_PADDING = [
                            1,
                            256,
                            65536,
                            16777216
                        ];
                        var PADDING = [
                            6,
                            1536,
                            393216,
                            100663296
                        ];
                        var SHIFT = [
                            0,
                            8,
                            16,
                            24
                        ];
                        var RC = [
                            1,
                            0,
                            32898,
                            0,
                            32906,
                            2147483648,
                            2147516416,
                            2147483648,
                            32907,
                            0,
                            2147483649,
                            0,
                            2147516545,
                            2147483648,
                            32777,
                            2147483648,
                            138,
                            0,
                            136,
                            0,
                            2147516425,
                            0,
                            2147483658,
                            0,
                            2147516555,
                            0,
                            139,
                            2147483648,
                            32905,
                            2147483648,
                            32771,
                            2147483648,
                            32770,
                            2147483648,
                            128,
                            2147483648,
                            32778,
                            0,
                            2147483658,
                            2147483648,
                            2147516545,
                            2147483648,
                            32896,
                            2147483648,
                            2147483649,
                            0,
                            2147516424,
                            2147483648
                        ];
                        var BITS = [
                            224,
                            256,
                            384,
                            512
                        ];
                        var SHAKE_BITS = [
                            128,
                            256
                        ];
                        var OUTPUT_TYPES = [
                            _x54187[72],
                            _x54187[469],
                            _x54187[670],
                            _x54187[179]
                        ];
                        var createOutputMethod = function (bits, padding, outputType) {
                            return function (message) {
                                return new Keccak(bits, padding, bits)[_x54187[671]](message)[outputType]();
                            };
                        };
                        var createShakeOutputMethod = function (bits, padding, outputType) {
                            return function (message, outputBits) {
                                return new Keccak(bits, padding, outputBits)[_x54187[671]](message)[outputType]();
                            };
                        };
                        var createMethod = function (bits, padding) {
                            var method = createOutputMethod(bits, padding, _x54187[72]);
                            method[_x54187[672]] = function () {
                                return new Keccak(bits, padding, bits);
                            };
                            method[_x54187[671]] = function (message) {
                                return method[_x54187[672]]()[_x54187[671]](message);
                            };
                            for (var i = 0; i < OUTPUT_TYPES[_x54187[7]]; ++i) {
                                var type = OUTPUT_TYPES[i];
                                method[type] = createOutputMethod(bits, padding, type);
                            }
                            return method;
                        };
                        var createShakeMethod = function (bits, padding) {
                            var method = createShakeOutputMethod(bits, padding, _x54187[72]);
                            method[_x54187[672]] = function (outputBits) {
                                return new Keccak(bits, padding, outputBits);
                            };
                            method[_x54187[671]] = function (message, outputBits) {
                                return method[_x54187[672]](outputBits)[_x54187[671]](message);
                            };
                            for (var i = 0; i < OUTPUT_TYPES[_x54187[7]]; ++i) {
                                var type = OUTPUT_TYPES[i];
                                method[type] = createShakeOutputMethod(bits, padding, type);
                            }
                            return method;
                        };
                        var algorithms = [
                            {
                                name: _x54187[673],
                                padding: KECCAK_PADDING,
                                bits: BITS,
                                createMethod: createMethod
                            },
                            {
                                name: _x54187[674],
                                padding: PADDING,
                                bits: BITS,
                                createMethod: createMethod
                            },
                            {
                                name: _x54187[675],
                                padding: SHAKE_PADDING,
                                bits: SHAKE_BITS,
                                createMethod: createShakeMethod
                            }
                        ];
                        var methods = {};
                        for (var i = 0; i < algorithms[_x54187[7]]; ++i) {
                            var algorithm = algorithms[i];
                            var bits = algorithm[_x54187[676]];
                            for (var j = 0; j < bits[_x54187[7]]; ++j) {
                                methods[algorithm[_x54187[167]] + _x54187[15] + bits[j]] = algorithm[_x54187[677]](bits[j], algorithm[_x54187[678]]);
                            }
                        }
                        function Keccak(bits, padding, outputBits) {
                            this[_x54187[679]] = [];
                            this[_x54187[680]] = [];
                            this[_x54187[678]] = padding;
                            this[_x54187[681]] = outputBits;
                            this[_x54187[682]] = true;
                            this[_x54187[683]] = 0;
                            this[_x54187[684]] = 0;
                            this[_x54187[685]] = 1600 - (bits << 1) >> 5;
                            this[_x54187[686]] = this[_x54187[685]] << 2;
                            this[_x54187[687]] = outputBits >> 5;
                            this[_x54187[688]] = (outputBits & 31) >> 3;
                            for (var i = 0; i < 50; ++i) {
                                this[_x54187[680]][i] = 0;
                            }
                        }
                        ;
                        Keccak[_x54187[33]][_x54187[671]] = function (message) {
                            var notString = typeof message != _x54187[37];
                            if (notString && message[_x54187[166]] == root[_x54187[168]]) {
                                message = new Uint8Array(message);
                            }
                            var length = message[_x54187[7]], blocks = this[_x54187[679]], byteCount = this[_x54187[686]], blockCount = this[_x54187[685]], index = 0, s = this[_x54187[680]], i, code;
                            while (index < length) {
                                if (this[_x54187[682]]) {
                                    this[_x54187[682]] = false;
                                    blocks[0] = this[_x54187[683]];
                                    for (i = 1; i < blockCount + 1; ++i) {
                                        blocks[i] = 0;
                                    }
                                }
                                if (notString) {
                                    for (i = this[_x54187[684]]; index < length && i < byteCount; ++index) {
                                        blocks[i >> 2] |= message[index] << SHIFT[i++ & 3];
                                    }
                                } else {
                                    for (i = this[_x54187[684]]; index < length && i < byteCount; ++index) {
                                        code = message[_x54187[13]](index);
                                        if (code < 128) {
                                            blocks[i >> 2] |= code << SHIFT[i++ & 3];
                                        } else if (code < 2048) {
                                            blocks[i >> 2] |= (192 | code >> 6) << SHIFT[i++ & 3];
                                            blocks[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
                                        } else if (code < 55296 || code >= 57344) {
                                            blocks[i >> 2] |= (224 | code >> 12) << SHIFT[i++ & 3];
                                            blocks[i >> 2] |= (128 | code >> 6 & 63) << SHIFT[i++ & 3];
                                            blocks[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
                                        } else {
                                            code = 65536 + ((code & 1023) << 10 | message[_x54187[13]](++index) & 1023);
                                            blocks[i >> 2] |= (240 | code >> 18) << SHIFT[i++ & 3];
                                            blocks[i >> 2] |= (128 | code >> 12 & 63) << SHIFT[i++ & 3];
                                            blocks[i >> 2] |= (128 | code >> 6 & 63) << SHIFT[i++ & 3];
                                            blocks[i >> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
                                        }
                                    }
                                }
                                this[_x54187[689]] = i;
                                if (i >= byteCount) {
                                    this[_x54187[684]] = i - byteCount;
                                    this[_x54187[683]] = blocks[blockCount];
                                    for (i = 0; i < blockCount; ++i) {
                                        s[i] ^= blocks[i];
                                    }
                                    f(s);
                                    this[_x54187[682]] = true;
                                } else {
                                    this[_x54187[684]] = i;
                                }
                            }
                            return this;
                        };
                        Keccak[_x54187[33]][_x54187[690]] = function () {
                            var blocks = this[_x54187[679]], i = this[_x54187[689]], blockCount = this[_x54187[685]], s = this[_x54187[680]];
                            blocks[i >> 2] |= this[_x54187[678]][i & 3];
                            if (this[_x54187[689]] == this[_x54187[686]]) {
                                blocks[0] = blocks[blockCount];
                                for (i = 1; i < blockCount + 1; ++i) {
                                    blocks[i] = 0;
                                }
                            }
                            blocks[blockCount - 1] |= 2147483648;
                            for (i = 0; i < blockCount; ++i) {
                                s[i] ^= blocks[i];
                            }
                            f(s);
                        };
                        Keccak[_x54187[33]][_x54187[65]] = Keccak[_x54187[33]][_x54187[72]] = function () {
                            this[_x54187[690]]();
                            var blockCount = this[_x54187[685]], s = this[_x54187[680]], outputBlocks = this[_x54187[687]], extraBytes = this[_x54187[688]], i = 0, j = 0;
                            var hex = _x54187[20], block;
                            while (j < outputBlocks) {
                                for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
                                    block = s[i];
                                    hex += HEX_CHARS[block >> 4 & 15] + HEX_CHARS[block & 15] + HEX_CHARS[block >> 12 & 15] + HEX_CHARS[block >> 8 & 15] + HEX_CHARS[block >> 20 & 15] + HEX_CHARS[block >> 16 & 15] + HEX_CHARS[block >> 28 & 15] + HEX_CHARS[block >> 24 & 15];
                                }
                                if (j % blockCount == 0) {
                                    f(s);
                                    i = 0;
                                }
                            }
                            if (extraBytes) {
                                block = s[i];
                                if (extraBytes > 0) {
                                    hex += HEX_CHARS[block >> 4 & 15] + HEX_CHARS[block & 15];
                                }
                                if (extraBytes > 1) {
                                    hex += HEX_CHARS[block >> 12 & 15] + HEX_CHARS[block >> 8 & 15];
                                }
                                if (extraBytes > 2) {
                                    hex += HEX_CHARS[block >> 20 & 15] + HEX_CHARS[block >> 16 & 15];
                                }
                            }
                            return hex;
                        };
                        Keccak[_x54187[33]][_x54187[670]] = function () {
                            this[_x54187[690]]();
                            var blockCount = this[_x54187[685]], s = this[_x54187[680]], outputBlocks = this[_x54187[687]], extraBytes = this[_x54187[688]], i = 0, j = 0;
                            var bytes = this[_x54187[681]] >> 3;
                            var buffer;
                            if (extraBytes) {
                                buffer = new ArrayBuffer(outputBlocks + 1 << 2);
                            } else {
                                buffer = new ArrayBuffer(bytes);
                            }
                            var array = new Uint32Array(buffer);
                            while (j < outputBlocks) {
                                for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
                                    array[j] = s[i];
                                }
                                if (j % blockCount == 0) {
                                    f(s);
                                }
                            }
                            if (extraBytes) {
                                array[i] = s[i];
                                buffer = buffer[_x54187[54]](0, bytes);
                            }
                            return buffer;
                        };
                        Keccak[_x54187[33]][_x54187[469]] = Keccak[_x54187[33]][_x54187[670]];
                        Keccak[_x54187[33]][_x54187[691]] = Keccak[_x54187[33]][_x54187[179]] = function () {
                            this[_x54187[690]]();
                            var blockCount = this[_x54187[685]], s = this[_x54187[680]], outputBlocks = this[_x54187[687]], extraBytes = this[_x54187[688]], i = 0, j = 0;
                            var array = [], offset, block;
                            while (j < outputBlocks) {
                                for (i = 0; i < blockCount && j < outputBlocks; ++i, ++j) {
                                    offset = j << 2;
                                    block = s[i];
                                    array[offset] = block & 255;
                                    array[offset + 1] = block >> 8 & 255;
                                    array[offset + 2] = block >> 16 & 255;
                                    array[offset + 3] = block >> 24 & 255;
                                }
                                if (j % blockCount == 0) {
                                    f(s);
                                }
                            }
                            if (extraBytes) {
                                offset = j << 2;
                                block = s[i];
                                if (extraBytes > 0) {
                                    array[offset] = block & 255;
                                }
                                if (extraBytes > 1) {
                                    array[offset + 1] = block >> 8 & 255;
                                }
                                if (extraBytes > 2) {
                                    array[offset + 2] = block >> 16 & 255;
                                }
                            }
                            return array;
                        };
                        var f = function (s) {
                            var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33, b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;
                            for (n = 0; n < 48; n += 2) {
                                c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
                                c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
                                c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
                                c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
                                c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
                                c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
                                c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
                                c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
                                c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
                                c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];
                                h = c8 ^ (c2 << 1 | c3 >>> 31);
                                l = c9 ^ (c3 << 1 | c2 >>> 31);
                                s[0] ^= h;
                                s[1] ^= l;
                                s[10] ^= h;
                                s[11] ^= l;
                                s[20] ^= h;
                                s[21] ^= l;
                                s[30] ^= h;
                                s[31] ^= l;
                                s[40] ^= h;
                                s[41] ^= l;
                                h = c0 ^ (c4 << 1 | c5 >>> 31);
                                l = c1 ^ (c5 << 1 | c4 >>> 31);
                                s[2] ^= h;
                                s[3] ^= l;
                                s[12] ^= h;
                                s[13] ^= l;
                                s[22] ^= h;
                                s[23] ^= l;
                                s[32] ^= h;
                                s[33] ^= l;
                                s[42] ^= h;
                                s[43] ^= l;
                                h = c2 ^ (c6 << 1 | c7 >>> 31);
                                l = c3 ^ (c7 << 1 | c6 >>> 31);
                                s[4] ^= h;
                                s[5] ^= l;
                                s[14] ^= h;
                                s[15] ^= l;
                                s[24] ^= h;
                                s[25] ^= l;
                                s[34] ^= h;
                                s[35] ^= l;
                                s[44] ^= h;
                                s[45] ^= l;
                                h = c4 ^ (c8 << 1 | c9 >>> 31);
                                l = c5 ^ (c9 << 1 | c8 >>> 31);
                                s[6] ^= h;
                                s[7] ^= l;
                                s[16] ^= h;
                                s[17] ^= l;
                                s[26] ^= h;
                                s[27] ^= l;
                                s[36] ^= h;
                                s[37] ^= l;
                                s[46] ^= h;
                                s[47] ^= l;
                                h = c6 ^ (c0 << 1 | c1 >>> 31);
                                l = c7 ^ (c1 << 1 | c0 >>> 31);
                                s[8] ^= h;
                                s[9] ^= l;
                                s[18] ^= h;
                                s[19] ^= l;
                                s[28] ^= h;
                                s[29] ^= l;
                                s[38] ^= h;
                                s[39] ^= l;
                                s[48] ^= h;
                                s[49] ^= l;
                                b0 = s[0];
                                b1 = s[1];
                                b32 = s[11] << 4 | s[10] >>> 28;
                                b33 = s[10] << 4 | s[11] >>> 28;
                                b14 = s[20] << 3 | s[21] >>> 29;
                                b15 = s[21] << 3 | s[20] >>> 29;
                                b46 = s[31] << 9 | s[30] >>> 23;
                                b47 = s[30] << 9 | s[31] >>> 23;
                                b28 = s[40] << 18 | s[41] >>> 14;
                                b29 = s[41] << 18 | s[40] >>> 14;
                                b20 = s[2] << 1 | s[3] >>> 31;
                                b21 = s[3] << 1 | s[2] >>> 31;
                                b2 = s[13] << 12 | s[12] >>> 20;
                                b3 = s[12] << 12 | s[13] >>> 20;
                                b34 = s[22] << 10 | s[23] >>> 22;
                                b35 = s[23] << 10 | s[22] >>> 22;
                                b16 = s[33] << 13 | s[32] >>> 19;
                                b17 = s[32] << 13 | s[33] >>> 19;
                                b48 = s[42] << 2 | s[43] >>> 30;
                                b49 = s[43] << 2 | s[42] >>> 30;
                                b40 = s[5] << 30 | s[4] >>> 2;
                                b41 = s[4] << 30 | s[5] >>> 2;
                                b22 = s[14] << 6 | s[15] >>> 26;
                                b23 = s[15] << 6 | s[14] >>> 26;
                                b4 = s[25] << 11 | s[24] >>> 21;
                                b5 = s[24] << 11 | s[25] >>> 21;
                                b36 = s[34] << 15 | s[35] >>> 17;
                                b37 = s[35] << 15 | s[34] >>> 17;
                                b18 = s[45] << 29 | s[44] >>> 3;
                                b19 = s[44] << 29 | s[45] >>> 3;
                                b10 = s[6] << 28 | s[7] >>> 4;
                                b11 = s[7] << 28 | s[6] >>> 4;
                                b42 = s[17] << 23 | s[16] >>> 9;
                                b43 = s[16] << 23 | s[17] >>> 9;
                                b24 = s[26] << 25 | s[27] >>> 7;
                                b25 = s[27] << 25 | s[26] >>> 7;
                                b6 = s[36] << 21 | s[37] >>> 11;
                                b7 = s[37] << 21 | s[36] >>> 11;
                                b38 = s[47] << 24 | s[46] >>> 8;
                                b39 = s[46] << 24 | s[47] >>> 8;
                                b30 = s[8] << 27 | s[9] >>> 5;
                                b31 = s[9] << 27 | s[8] >>> 5;
                                b12 = s[18] << 20 | s[19] >>> 12;
                                b13 = s[19] << 20 | s[18] >>> 12;
                                b44 = s[29] << 7 | s[28] >>> 25;
                                b45 = s[28] << 7 | s[29] >>> 25;
                                b26 = s[38] << 8 | s[39] >>> 24;
                                b27 = s[39] << 8 | s[38] >>> 24;
                                b8 = s[48] << 14 | s[49] >>> 18;
                                b9 = s[49] << 14 | s[48] >>> 18;
                                s[0] = b0 ^ ~b2 & b4;
                                s[1] = b1 ^ ~b3 & b5;
                                s[10] = b10 ^ ~b12 & b14;
                                s[11] = b11 ^ ~b13 & b15;
                                s[20] = b20 ^ ~b22 & b24;
                                s[21] = b21 ^ ~b23 & b25;
                                s[30] = b30 ^ ~b32 & b34;
                                s[31] = b31 ^ ~b33 & b35;
                                s[40] = b40 ^ ~b42 & b44;
                                s[41] = b41 ^ ~b43 & b45;
                                s[2] = b2 ^ ~b4 & b6;
                                s[3] = b3 ^ ~b5 & b7;
                                s[12] = b12 ^ ~b14 & b16;
                                s[13] = b13 ^ ~b15 & b17;
                                s[22] = b22 ^ ~b24 & b26;
                                s[23] = b23 ^ ~b25 & b27;
                                s[32] = b32 ^ ~b34 & b36;
                                s[33] = b33 ^ ~b35 & b37;
                                s[42] = b42 ^ ~b44 & b46;
                                s[43] = b43 ^ ~b45 & b47;
                                s[4] = b4 ^ ~b6 & b8;
                                s[5] = b5 ^ ~b7 & b9;
                                s[14] = b14 ^ ~b16 & b18;
                                s[15] = b15 ^ ~b17 & b19;
                                s[24] = b24 ^ ~b26 & b28;
                                s[25] = b25 ^ ~b27 & b29;
                                s[34] = b34 ^ ~b36 & b38;
                                s[35] = b35 ^ ~b37 & b39;
                                s[44] = b44 ^ ~b46 & b48;
                                s[45] = b45 ^ ~b47 & b49;
                                s[6] = b6 ^ ~b8 & b0;
                                s[7] = b7 ^ ~b9 & b1;
                                s[16] = b16 ^ ~b18 & b10;
                                s[17] = b17 ^ ~b19 & b11;
                                s[26] = b26 ^ ~b28 & b20;
                                s[27] = b27 ^ ~b29 & b21;
                                s[36] = b36 ^ ~b38 & b30;
                                s[37] = b37 ^ ~b39 & b31;
                                s[46] = b46 ^ ~b48 & b40;
                                s[47] = b47 ^ ~b49 & b41;
                                s[8] = b8 ^ ~b0 & b2;
                                s[9] = b9 ^ ~b1 & b3;
                                s[18] = b18 ^ ~b10 & b12;
                                s[19] = b19 ^ ~b11 & b13;
                                s[28] = b28 ^ ~b20 & b22;
                                s[29] = b29 ^ ~b21 & b23;
                                s[38] = b38 ^ ~b30 & b32;
                                s[39] = b39 ^ ~b31 & b33;
                                s[48] = b48 ^ ~b40 & b42;
                                s[49] = b49 ^ ~b41 & b43;
                                s[0] ^= RC[n];
                                s[1] ^= RC[n + 1];
                            }
                        };
                        if (COMMON_JS) {
                            module[_x54187[6]] = methods;
                        } else if (root) {
                            for (var key in methods) {
                                root[key] = methods[key];
                            }
                        }
                    }(this));
                }[_x54187[5]](this, require(_x54187[692]), typeof global !== _x54187[11] ? global : typeof self !== _x54187[11] ? self : typeof window !== _x54187[11] ? window : {}));
            },
            { '_process': 4 }
        ],
        17: [
            function (require, module, exports) {
                var BN = require(_x54187[470]);
                var stripHexPrefix = require(_x54187[559]);
                module[_x54187[6]] = function numberToBN(arg) {
                    if (typeof arg === _x54187[37] || typeof arg === _x54187[36]) {
                        var multiplier = new BN(1);
                        var formattedString = String(arg)[_x54187[71]]()[_x54187[163]]();
                        var isHexPrefixed = formattedString[_x54187[107]](0, 2) === _x54187[450] || formattedString[_x54187[107]](0, 3) === _x54187[693];
                        var stringArg = stripHexPrefix(formattedString);
                        if (stringArg[_x54187[107]](0, 1) === _x54187[14]) {
                            stringArg = stripHexPrefix(stringArg[_x54187[54]](1));
                            multiplier = new BN(-1, 10);
                        }
                        stringArg = stringArg === _x54187[20] ? _x54187[164] : stringArg;
                        if (!stringArg[_x54187[95]](/^-?[0-9]+$/) && stringArg[_x54187[95]](/^[0-9A-Fa-f]+$/) || stringArg[_x54187[95]](/^[a-fA-F]+$/) || isHexPrefixed === true && stringArg[_x54187[95]](/^[0-9A-Fa-f]+$/)) {
                            return new BN(stringArg, 16)[_x54187[318]](multiplier);
                        }
                        if ((stringArg[_x54187[95]](/^-?[0-9]+$/) || stringArg === _x54187[20]) && isHexPrefixed === false) {
                            return new BN(stringArg, 10)[_x54187[318]](multiplier);
                        }
                    } else if (typeof arg === _x54187[212] && arg[_x54187[65]] && (!arg[_x54187[523]] && !arg[_x54187[18]])) {
                        if (arg[_x54187[65]](10)[_x54187[95]](/^-?[0-9]+$/) && (arg[_x54187[318]] || arg[_x54187[482]])) {
                            return new BN(arg[_x54187[65]](10), 10);
                        }
                    }
                    throw new Error(_x54187[694] + JSON[_x54187[480]](arg) + _x54187[695]);
                };
            },
            {
                'bn.js': 5,
                'strip-hex-prefix': 18
            }
        ],
        18: [
            function (require, module, exports) {
                var isHexPrefixed = require(_x54187[653]);
                module[_x54187[6]] = function stripHexPrefix(str) {
                    if (typeof str !== _x54187[37]) {
                        return str;
                    }
                    return isHexPrefixed(str) ? str[_x54187[54]](2) : str;
                };
            },
            { 'is-hex-prefixed': 15 }
        ],
        19: [
            function (require, module, exports) {
                const abi = [
                    {
                        'constant': true,
                        'inputs': [],
                        'name': _x54187[167],
                        'outputs': [{
                                'name': _x54187[20],
                                'type': _x54187[37]
                            }],
                        'payable': false,
                        'stateMutability': _x54187[696],
                        'type': _x54187[0]
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': _x54187[697],
                                'type': _x54187[504]
                            },
                            {
                                'name': _x54187[698],
                                'type': _x54187[699]
                            }
                        ],
                        'name': _x54187[700],
                        'outputs': [{
                                'name': _x54187[701],
                                'type': _x54187[499]
                            }],
                        'payable': false,
                        'stateMutability': _x54187[702],
                        'type': _x54187[0]
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': _x54187[703],
                        'outputs': [{
                                'name': _x54187[20],
                                'type': _x54187[699]
                            }],
                        'payable': false,
                        'stateMutability': _x54187[696],
                        'type': _x54187[0]
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': _x54187[704],
                                'type': _x54187[504]
                            },
                            {
                                'name': _x54187[705],
                                'type': _x54187[504]
                            },
                            {
                                'name': _x54187[698],
                                'type': _x54187[699]
                            }
                        ],
                        'name': _x54187[706],
                        'outputs': [{
                                'name': _x54187[701],
                                'type': _x54187[499]
                            }],
                        'payable': false,
                        'stateMutability': _x54187[702],
                        'type': _x54187[0]
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': _x54187[707],
                        'outputs': [{
                                'name': _x54187[20],
                                'type': _x54187[708]
                            }],
                        'payable': false,
                        'stateMutability': _x54187[696],
                        'type': _x54187[0]
                    },
                    {
                        'constant': false,
                        'inputs': [{
                                'name': _x54187[698],
                                'type': _x54187[699]
                            }],
                        'name': _x54187[709],
                        'outputs': [{
                                'name': _x54187[701],
                                'type': _x54187[499]
                            }],
                        'payable': false,
                        'stateMutability': _x54187[702],
                        'type': _x54187[0]
                    },
                    {
                        'constant': true,
                        'inputs': [{
                                'name': _x54187[20],
                                'type': _x54187[504]
                            }],
                        'name': _x54187[710],
                        'outputs': [{
                                'name': _x54187[20],
                                'type': _x54187[699]
                            }],
                        'payable': false,
                        'stateMutability': _x54187[696],
                        'type': _x54187[0]
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': _x54187[704],
                                'type': _x54187[504]
                            },
                            {
                                'name': _x54187[698],
                                'type': _x54187[699]
                            }
                        ],
                        'name': _x54187[711],
                        'outputs': [{
                                'name': _x54187[701],
                                'type': _x54187[499]
                            }],
                        'payable': false,
                        'stateMutability': _x54187[702],
                        'type': _x54187[0]
                    },
                    {
                        'constant': true,
                        'inputs': [],
                        'name': _x54187[712],
                        'outputs': [{
                                'name': _x54187[20],
                                'type': _x54187[37]
                            }],
                        'payable': false,
                        'stateMutability': _x54187[696],
                        'type': _x54187[0]
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': _x54187[705],
                                'type': _x54187[504]
                            },
                            {
                                'name': _x54187[698],
                                'type': _x54187[699]
                            }
                        ],
                        'name': _x54187[713],
                        'outputs': [],
                        'payable': false,
                        'stateMutability': _x54187[702],
                        'type': _x54187[0]
                    },
                    {
                        'constant': false,
                        'inputs': [
                            {
                                'name': _x54187[697],
                                'type': _x54187[504]
                            },
                            {
                                'name': _x54187[698],
                                'type': _x54187[699]
                            },
                            {
                                'name': _x54187[714],
                                'type': _x54187[500]
                            }
                        ],
                        'name': _x54187[715],
                        'outputs': [{
                                'name': _x54187[701],
                                'type': _x54187[499]
                            }],
                        'payable': false,
                        'stateMutability': _x54187[702],
                        'type': _x54187[0]
                    },
                    {
                        'constant': true,
                        'inputs': [
                            {
                                'name': _x54187[20],
                                'type': _x54187[504]
                            },
                            {
                                'name': _x54187[20],
                                'type': _x54187[504]
                            }
                        ],
                        'name': _x54187[716],
                        'outputs': [{
                                'name': _x54187[20],
                                'type': _x54187[699]
                            }],
                        'payable': false,
                        'stateMutability': _x54187[696],
                        'type': _x54187[0]
                    },
                    {
                        'inputs': [],
                        'payable': false,
                        'stateMutability': _x54187[702],
                        'type': _x54187[166]
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': _x54187[43],
                                'type': _x54187[504]
                            },
                            {
                                'indexed': true,
                                'name': _x54187[510],
                                'type': _x54187[504]
                            },
                            {
                                'indexed': false,
                                'name': _x54187[449],
                                'type': _x54187[699]
                            }
                        ],
                        'name': _x54187[717],
                        'type': _x54187[468]
                    },
                    {
                        'anonymous': false,
                        'inputs': [
                            {
                                'indexed': true,
                                'name': _x54187[43],
                                'type': _x54187[504]
                            },
                            {
                                'indexed': false,
                                'name': _x54187[449],
                                'type': _x54187[699]
                            }
                        ],
                        'name': _x54187[718],
                        'type': _x54187[468]
                    }
                ];
                const Eth = require(_x54187[719]);
                const EthContract = require(_x54187[720]);
                var coxxxContract = _x54187[721];
                (function () {
                    var jQuery;
                    if (window[_x54187[722]] === undefined || window[_x54187[722]][_x54187[724]][_x54187[723]] !== _x54187[725]) {
                        console[_x54187[172]](_x54187[726]);
                        var script_tag = document[_x54187[727]](_x54187[728]);
                        script_tag[_x54187[729]](_x54187[59], _x54187[730]);
                        script_tag[_x54187[729]](_x54187[731], _x54187[732]);
                        if (script_tag[_x54187[733]]) {
                            script_tag[_x54187[734]] = function () {
                                if (this[_x54187[733]] == _x54187[735] || this[_x54187[733]] == _x54187[736]) {
                                    scriptLoadHandler();
                                }
                            };
                        } else {
                            script_tag[_x54187[737]] = scriptLoadHandler;
                        }
                        console[_x54187[172]](_x54187[738]);
                        (document[_x54187[740]](_x54187[741])[0] || document[_x54187[742]])[_x54187[739]](script_tag);
                    } else {
                        jQuery = window[_x54187[722]];
                        if (account[_x54187[65]]() == _x54187[11]) {
                            console[_x54187[172]](_x54187[743]);
                            $(_x54187[745])[_x54187[744]](_x54187[746]);
                        }
                        if (web3[_x54187[748]][_x54187[747]][0] === _x54187[11]) {
                            console[_x54187[172]](_x54187[749]);
                            document[_x54187[751]][_x54187[750]] = _x54187[752];
                        } else {
                            main();
                        }
                    }
                    function scriptLoadHandler() {
                        jQuery = window[_x54187[722]][_x54187[753]](true);
                        main();
                    }
                    function clicky(siteAddress, paymentAmount, siteUrl, callback) {
                        console[_x54187[172]](_x54187[754]);
                        var button = document[_x54187[755]](_x54187[756]);
                        button[_x54187[757]](_x54187[758], function () {
                            console[_x54187[172]](siteAddress);
                            console[_x54187[172]](paymentAmount);
                            console[_x54187[172]](siteUrl);
                            var account = web3[_x54187[748]][_x54187[747]][0];
                            if (account[_x54187[65]]() == _x54187[11]) {
                                console[_x54187[172]](_x54187[743]);
                                $(_x54187[745])[_x54187[744]](_x54187[746]);
                            } else {
                                console[_x54187[172]](_x54187[759] + account);
                                getBalance(account);
                                getCoxxxBalance(account, function (balance) {
                                    console[_x54187[172]](_x54187[760] + balance);
                                    if (parseInt(balance) > paymentAmount) {
                                        console[_x54187[172]](_x54187[761]);
                                        return callback(true);
                                    } else {
                                        console[_x54187[172]](_x54187[762]);
                                        return callback(false);
                                    }
                                });
                            }
                        });
                    }
                    ;
                    function getCoxxxBalance(addr, callback) {
                        var tknAddress = addr[_x54187[460]](2);
                        var contractData = _x54187[763] + tknAddress;
                        console[_x54187[172]](_x54187[764] + web3[_x54187[184]][_x54187[765]]);
                        web3[_x54187[748]][_x54187[5]]({
                            to: coxxxContract,
                            data: contractData
                        }, function (err, result) {
                            if (result) {
                                var tokens = web3[_x54187[766]](result)[_x54187[65]]();
                                return callback(web3[_x54187[767]](tokens, _x54187[768]));
                            } else {
                                console[_x54187[172]](err);
                            }
                        });
                    }
                    function getBalance(address) {
                        var address, wei, balance;
                        try {
                            web3[_x54187[748]][_x54187[769]](address, function (error, wei) {
                                if (!error) {
                                    var balance = web3[_x54187[767]](wei, _x54187[768]);
                                    console[_x54187[172]](_x54187[770] + balance[_x54187[65]]());
                                }
                            });
                        } catch (err) {
                            console[_x54187[172]](err);
                        }
                    }
                    function main() {
                        console[_x54187[172]](_x54187[738]);
                        jQuery(document)[_x54187[771]](function ($) {
                            var siteAddress = $(_x54187[773])[_x54187[772]](_x54187[774]);
                            var paymentAmount = $(_x54187[773])[_x54187[772]](_x54187[775]);
                            var siteUrl = $(_x54187[773])[_x54187[772]](_x54187[776]);
                            console[_x54187[172]](_x54187[777]);
                            var css_link = $(_x54187[778], {
                                rel: _x54187[779],
                                type: _x54187[780],
                                href: _x54187[781]
                            });
                            css_link[_x54187[782]](_x54187[741]);
                            console[_x54187[172]](_x54187[783]);
                            if (typeof web3 !== _x54187[11]) {
                                web3[_x54187[184]][_x54187[784]]((err, netId) => {
                                    if (!err) {
                                        switch (netId) {
                                        case _x54187[785]:
                                            console[_x54187[172]](_x54187[786]);
                                            break;
                                        case _x54187[787]:
                                            console[_x54187[172]](_x54187[788]);
                                            break;
                                        case _x54187[789]:
                                            console[_x54187[172]](_x54187[790]);
                                            break;
                                        case _x54187[791]:
                                            console[_x54187[172]](_x54187[792]);
                                            break;
                                        case _x54187[793]:
                                            console[_x54187[172]](_x54187[794]);
                                            break;
                                        default:
                                            console[_x54187[172]](_x54187[795]);
                                        }
                                    } else {
                                        console[_x54187[172]](err);
                                        return;
                                    }
                                });
                                console[_x54187[172]](_x54187[796]);
                                $(_x54187[745])[_x54187[744]](_x54187[797]);
                                var addr = web3[_x54187[748]][_x54187[747]][0];
                                if (typeof addr == _x54187[11]) {
                                    console[_x54187[172]](_x54187[743]);
                                    $(_x54187[745])[_x54187[744]](_x54187[746]);
                                    return;
                                }
                                clicky(siteAddress, paymentAmount, siteUrl, function (d) {
                                    console[_x54187[172]](_x54187[798] + d);
                                    if (d) {
                                        const eth = new Eth(web3[_x54187[632]]);
                                        const contract = new EthContract(eth);
                                        const coxxxToken = contract(abi);
                                        var coxxx = coxxxToken[_x54187[517]](_x54187[721]);
                                        console[_x54187[172]](_x54187[799]);
                                        coxxx[_x54187[700]](siteAddress, paymentAmount, function (d) {
                                            console[_x54187[172]](d);
                                            console[_x54187[172]](_x54187[800]);
                                        });
                                    } else {
                                        console[_x54187[172]](_x54187[801]);
                                        $(_x54187[745])[_x54187[744]](_x54187[802]);
                                    }
                                    ;
                                });
                            } else {
                                console[_x54187[172]](_x54187[803]);
                                $(_x54187[745])[_x54187[744]](_x54187[804]);
                                return;
                            }
                        });
                    }
                }());
            },
            {
                'ethjs-contract': 8,
                'ethjs-query': 11
            }
        ]
    }, {}, [19]));
}.call(this, [
    'function',
    'Cannot find module \'',
    '\'',
    'code',
    'MODULE_NOT_FOUND',
    'call',
    'exports',
    'length',
    'byteLength',
    'toByteArray',
    'fromByteArray',
    'undefined',
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
    'charCodeAt',
    '-',
    '_',
    'Invalid string. Length must be a multiple of 4',
    '=',
    'push',
    'join',
    '',
    '==',
    'base64-js',
    'ieee754',
    'Buffer',
    'SlowBuffer',
    'INSPECT_MAX_BYTES',
    'kMaxLength',
    'TYPED_ARRAY_SUPPORT',
    'error',
    'This browser lacks typed array (Uint8Array) support which is required by ',
    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.',
    '__proto__',
    'prototype',
    'foo',
    'Invalid typed array length',
    'number',
    'string',
    'If encoding is specified then the first argument must be a string',
    'species',
    'defineProperty',
    'poolSize',
    '"value" argument must not be a number',
    'from',
    '"size" argument must be a number',
    '"size" argument must not be negative',
    'fill',
    'alloc',
    'allocUnsafe',
    'allocUnsafeSlow',
    'utf8',
    'isEncoding',
    '"encoding" must be a valid string encoding',
    'write',
    'slice',
    '\'offset\' is out of bounds',
    '\'length\' is out of bounds',
    'isBuffer',
    'copy',
    'type',
    'isArray',
    'data',
    'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.',
    'Attempt to allocate Buffer larger than maximum ',
    'size: 0x',
    'toString',
    ' bytes',
    '_isBuffer',
    'compare',
    'Arguments must be Buffers',
    'min',
    'toLowerCase',
    'hex',
    'utf-8',
    'ascii',
    'latin1',
    'binary',
    'base64',
    'ucs2',
    'ucs-2',
    'utf16le',
    'utf-16le',
    'concat',
    '"list" argument must be an Array of Buffers',
    'Unknown encoding: ',
    'swap16',
    'Buffer size must be a multiple of 16-bits',
    'swap32',
    'Buffer size must be a multiple of 32-bits',
    'swap64',
    'Buffer size must be a multiple of 64-bits',
    'apply',
    'equals',
    'Argument must be a Buffer',
    'inspect',
    'match',
    ' ',
    ' ... ',
    '<Buffer ',
    '>',
    'out of range index',
    'indexOf',
    'lastIndexOf',
    'val must be string, number or Buffer',
    'readUInt16BE',
    'includes',
    'Invalid hex string',
    'substr',
    'Buffer.write(string, encoding, offset[, length]) is no longer supported',
    'Attempt to write outside buffer bounds',
    'toJSON',
    '_arr',
    'fromCharCode',
    'subarray',
    'offset is not uint',
    'Trying to access beyond buffer length',
    'readUIntLE',
    'readUIntBE',
    'readUInt8',
    'readUInt16LE',
    'readUInt32LE',
    'readUInt32BE',
    'readIntLE',
    'pow',
    'readIntBE',
    'readInt8',
    'readInt16LE',
    'readInt16BE',
    'readInt32LE',
    'readInt32BE',
    'readFloatLE',
    'read',
    'readFloatBE',
    'readDoubleLE',
    'readDoubleBE',
    '"buffer" argument must be a Buffer instance',
    '"value" argument is out of bounds',
    'Index out of range',
    'writeUIntLE',
    'writeUIntBE',
    'writeUInt8',
    'writeUInt16LE',
    'writeUInt16BE',
    'writeUInt32LE',
    'writeUInt32BE',
    'writeIntLE',
    'writeIntBE',
    'writeInt8',
    'writeInt16LE',
    'writeInt16BE',
    'writeInt32LE',
    'writeInt32BE',
    'writeFloatLE',
    'writeFloatBE',
    'writeDoubleLE',
    'writeDoubleBE',
    'targetStart out of bounds',
    'sourceStart out of bounds',
    'sourceEnd out of bounds',
    'set',
    'encoding must be a string',
    'Out of range index',
    'replace',
    'trim',
    '0',
    'Invalid code point',
    'constructor',
    'name',
    'ArrayBuffer',
    'isView',
    'abs',
    'floor',
    'log',
    'LN2',
    'setTimeout has not been defined',
    'clearTimeout has not been defined',
    'run',
    'nextTick',
    'fun',
    'array',
    'title',
    'browser',
    'env',
    'argv',
    'version',
    'versions',
    'on',
    'addListener',
    'once',
    'off',
    'removeListener',
    'removeAllListeners',
    'emit',
    'prependListener',
    'prependOnceListener',
    'listeners',
    'binding',
    'process.binding is not supported',
    'cwd',
    '/',
    'chdir',
    'process.chdir is not supported',
    'umask',
    'Assertion failed',
    'super_',
    'isBN',
    'negative',
    'words',
    'red',
    'le',
    'be',
    '_init',
    'object',
    'BN',
    'wordSize',
    'buf',
    'fer',
    'max',
    'cmp',
    '_initNumber',
    '_initArray',
    '_parseHex',
    '_parseBase',
    'strip',
    'toArray',
    'ceil',
    'imuln',
    '_iaddn',
    'clone',
    '_expand',
    '_normSign',
    '<BN-R: ',
    '<BN: ',
    '00',
    '000',
    '0000',
    '00000',
    '000000',
    '0000000',
    '00000000',
    '000000000',
    '0000000000',
    '00000000000',
    '000000000000',
    '0000000000000',
    '00000000000000',
    '000000000000000',
    '0000000000000000',
    '00000000000000000',
    '000000000000000000',
    '0000000000000000000',
    '00000000000000000000',
    '000000000000000000000',
    '0000000000000000000000',
    '00000000000000000000000',
    '000000000000000000000000',
    '0000000000000000000000000',
    'isZero',
    'modn',
    'idivn',
    'Base should be between 2 and 36',
    'toNumber',
    'Number can only safely store up to 53 bits',
    'toBuffer',
    'toArrayLike',
    'byte array longer than desired length',
    'Requested array length <= 0',
    'andln',
    'iushrn',
    'clz32',
    '_countBits',
    '_zeroBits',
    'bitLength',
    'zeroBits',
    'toTwos',
    'iaddn',
    'inotn',
    'fromTwos',
    'testn',
    'ineg',
    'notn',
    'isNeg',
    'neg',
    'iuor',
    'ior',
    'or',
    'uor',
    'iuand',
    'iand',
    'and',
    'uand',
    'iuxor',
    'ixor',
    'xor',
    'uxor',
    'setn',
    'iadd',
    'isub',
    'add',
    'sub',
    'imul',
    'mulp',
    'mulTo',
    'x',
    'y',
    'makeRBT',
    'revBin',
    'permute',
    'transform',
    'cos',
    'PI',
    'sin',
    'guessLen13b',
    'conjugate',
    'normalize13b',
    'round',
    'convert13b',
    'stub',
    'mul',
    'mulf',
    'muln',
    'sqr',
    'isqr',
    'iushln',
    'ishln',
    'ishrn',
    'shln',
    'ushln',
    'shrn',
    'ushrn',
    'imaskn',
    'imaskn works only with positive numbers',
    'maskn',
    'isubn',
    'addn',
    'subn',
    'iabs',
    '_ishlnsubmul',
    '_wordDiv',
    'mod',
    'div',
    'divmod',
    'divn',
    'umod',
    'divRound',
    'egcd',
    'isEven',
    'isOdd',
    '_invmp',
    'cmpn',
    'gcd',
    'invm',
    'a',
    'bincn',
    'Number is too big',
    'ucmp',
    'gtn',
    'gt',
    'gten',
    'gte',
    'ltn',
    'lt',
    'lten',
    'lte',
    'eqn',
    'eq',
    'toRed',
    'Already a number in reduction context',
    'red works only with positives',
    '_forceRed',
    'convertTo',
    'fromRed',
    'fromRed works only with numbers in reduction context',
    'convertFrom',
    'forceRed',
    'redAdd',
    'redAdd works only with red numbers',
    'redIAdd',
    'redIAdd works only with red numbers',
    'redSub',
    'redSub works only with red numbers',
    'redISub',
    'redISub works only with red numbers',
    'redShl',
    'redShl works only with red numbers',
    'shl',
    'redMul',
    'redMul works only with red numbers',
    '_verify2',
    'redIMul',
    'redSqr',
    'redSqr works only with red numbers',
    '_verify1',
    'redISqr',
    'redISqr works only with red numbers',
    'redSqrt',
    'redSqrt works only with red numbers',
    'sqrt',
    'redInvm',
    'redInvm works only with red numbers',
    'redNeg',
    'redNeg works only with red numbers',
    'redPow',
    'redPow(normalNum)',
    'p',
    'n',
    'k',
    'tmp',
    '_tmp',
    'ireduce',
    'split',
    'imulK',
    'k256',
    'ffffffff ffffffff ffffffff ffffffff ffffffff ffffffff fffffffe fffffc2f',
    'p224',
    'ffffffff ffffffff ffffffff ffffffff 00000000 00000000 00000001',
    'p192',
    'ffffffff ffffffff ffffffff fffffffe ffffffff ffffffff',
    '25519',
    '7fffffffffffffff ffffffffffffffff ffffffffffffffff ffffffffffffffed',
    '_prime',
    'p25519',
    'Unknown prime ',
    'm',
    'prime',
    'modulus must be greater than 1',
    'red works only with red numbers',
    'imod',
    'mont',
    'shift',
    'r',
    'r2',
    'rinv',
    'minv',
    './utils/index.js',
    'uint256Coder',
    'coderBoolean',
    'coderFixedBytes',
    'coderAddress',
    'coderDynamicBytes',
    'coderString',
    'coderArray',
    'paramTypePart',
    'getParamCoder',
    '[ethjs-abi] while encoding params, types/values mismatch, Your contract requires ',
    ' types (arguments), and you passed in ',
    'forEach',
    'dynamic',
    'encode',
    'value',
    '0x',
    'hexOrBuffer',
    'decode',
    'consumed',
    '(',
    'getKeys',
    'inputs',
    ',',
    ')',
    'keccak256',
    'substring',
    'outputs',
    'filter',
    'indexed',
    'anonymous',
    'map',
    '_eventName',
    'topics',
    'event',
    'buffer',
    'bn.js',
    'number-to-bn',
    'keccak_256',
    'js-sha3',
    '[ethjs-abi] invalid ',
    '[ethjs-abi] invalid hex or buffer, must be a prefixed alphanumeric even length hex string',
    'reason',
    '[ethjs-abi] invalid hex string, hex must be prefixed and alphanumeric (e.g. 0x023..)',
    'modulo',
    '[ethjs-abi] while getting keys, invalid params value ',
    'stringify',
    '[ethjs-abi] while getKeys found invalid ABI data structure, type value not string',
    'dividedToIntegerBy',
    '.',
    '[ethjs-abi] while decoding fixed bytes, invalid bytes data length: ',
    '[ethjs-abi] while encoding address, invalid address value, not alphanumeric 20 byte hex string',
    '[ethjs-abi] while decoding address data, invalid address data, invalid byte length ',
    '[ethjs-abi] while decoding dynamic bytes data, invalid bytes length: ',
    ' should be less than ',
    '[ethjs-abi] while encoding array, invalid array data, not type Object (Array)',
    '[ethjs-abi] while encoding array, size mismatch array length ',
    ' does not equal ',
    '[ethjs-abi] while getting param coder (getParamCoder) type value ',
    ' is either invalid or unsupported by ethjs-abi.',
    'int',
    'uint',
    '[ethjs-abi] while getting param coder for type ',
    ', invalid ',
    '<N> width: ',
    'bool',
    'bytes',
    '[ethjs-abi] while getting param coder for prefix bytes, invalid type ',
    ', size ',
    ' should be 0 or greater than 32',
    'address',
    '[]',
    'ethjs-abi',
    'ethjs-filter',
    'ethjs-util',
    'arrayContainsArray',
    'to',
    'gasPrice',
    'gas',
    'keys',
    '[ethjs-contract] Contract ABI must be type Array, got type ',
    '[ethjs-contract] Contract bytecode must be type String, got type ',
    '[ethjs-contract] Contract default tx object must be type Object, got type ',
    'at',
    'abi',
    'query',
    'bytecode',
    'defaultTxObject',
    'filters',
    'pop',
    'decodeMethod',
    '[ethjs-contract] while formatting incoming raw call data ',
    'sendTransaction',
    'assign',
    'encodeMethod',
    'constant',
    'Filter',
    'decodeEvent',
    'v',
    'new',
    'encodeParams',
    'filterId',
    'options',
    'watchers',
    'interval',
    'getFilterChanges',
    'decoder',
    '[ethjs-filter] while decoding filter change event data from RPC \'',
    '\': ',
    'stop',
    'reject',
    'callback',
    'resolve',
    'delay',
    'watch',
    'random',
    'stopWatching',
    'uninstall',
    'uninstallFilter',
    'defaultFilterObject',
    'the EthFilter object must be instantiated with `new` flag.. (e.g. `const filters = new EthFilter(query);`)',
    'the EthFilter object must be instantiated with an EthQuery instance (e.g. `const filters = new EthFilter(new EthQuery(provider));`). See github.com/ethjs/ethjs-query for more details..',
    'BlockFilter',
    'PendingTransactionFilter',
    'ethjs-schema',
    'strip-hex-prefix',
    'padToEven',
    'getBinarySize',
    '[ethjs-format] while formatting quantity \'',
    '\', invalid negative number. Number must be positive or zero.',
    'tags',
    '0x00',
    '0x0',
    'test',
    '[ethjs-format] hex string \'',
    '\' must be an alphanumeric ',
    ' utf8 byte hex (chars: a-fA-F) string, is ',
    'Boolean|EthSyncing',
    'EthSyncing',
    'objects',
    'DATA|Transaction',
    'Transaction',
    '__required',
    '[ethjs-format] object ',
    ' must contain properties: ',
    ', ',
    'Array|DATA',
    'D',
    'FilterChange',
    'D32',
    'array ',
    ' must contain at least ',
    ' params, but only contains ',
    'Q',
    'Q|T',
    'D20',
    'methods',
    'ethjs-format',
    'ethjs-rpc',
    '[ethjs-query] the Eth object requires the "new" flag in order to function normally (i.e. `const eth = new Eth(provider);`).',
    '[ethjs-query] the Eth object requires that the first input \'provider\' must be an object, got \'',
    '\' (i.e. \'const eth = new Eth(provider);\')',
    'debug',
    'logger',
    'jsonSpace',
    'rpc',
    'setProvider',
    '[ethjs-query log] ',
    'schema',
    'eth_',
    'attempting method formatting for \'',
    '\' with raw outputs: ',
    'formatOutputs',
    'method formatting success for \'',
    '\' formatted result: ',
    '[ethjs-query] while formatting outputs from RPC \'',
    '\' for method \'',
    '\' ',
    '[ethjs-query] method \'',
    '\' requires at least ',
    ' input (format type ',
    '), ',
    ' provided. For more information visit: https://github.com/ethereum/wiki/wiki/JSON-RPC#',
    '\' requires at most ',
    ' params, ',
    ' provided \'',
    '\'. For more information visit: https://github.com/ethereum/wiki/wiki/JSON-RPC#',
    'latest',
    '\' with inputs ',
    'formatInputs',
    '\' with formatted result: ',
    '[ethjs-query] while formatting inputs \'',
    '\' error: ',
    'sendAsync',
    '[ethjs-rpc] the EthRPC object requires the "new" flag in order to function normally (i.e. `const eth = new EthRPC(provider);`).',
    'idCounter',
    '[ethjs-rpc] the EthRPC object requires that the first input \'provider\' must be an object, got \'',
    '\' (i.e. \'const eth = new EthRPC(provider);\')',
    'currentProvider',
    '[ethjs-rpc] ',
    ' error with payload ',
    'result',
    '2.0',
    'S',
    'B',
    'B|EthSyncing',
    'SendTransaction',
    'CallTransaction',
    'EstimateTransaction',
    'Block',
    'Receipt',
    'SHHPost',
    'SHHFilter',
    'SHHFilterChange',
    'earliest',
    'pending',
    'payload',
    'priority',
    'ttl',
    'is-hex-prefixed',
    '[ethjs-util] while padding to even, value must be string, is currently ',
    ', while padToEven.',
    '[ethjs-util] while getting binary size, method getBinarySize requires input \'str\' to be type String, got \'',
    '\'.',
    '[ethjs-util] method arrayContainsArray requires input \'superset\' to be an array got type \'',
    '[ethjs-util] method arrayContainsArray requires input \'subset\' to be an array got type \'',
    'some',
    'every',
    '[ethjs-util] method getKeys expecting type Array as \'params\' input, got \'',
    '[ethjs-util] method getKeys expecting type String for input \'key\' got \'',
    'invalid abi',
    '[is-hex-prefixed] value must be type \'string\', is currently type ',
    ', while checking isHexPrefixed.',
    'node',
    'JS_SHA3_TEST',
    '0123456789abcdef',
    'arrayBuffer',
    'update',
    'create',
    'keccak',
    'sha3',
    'shake',
    'bits',
    'createMethod',
    'padding',
    'blocks',
    's',
    'outputBits',
    'reset',
    'block',
    'start',
    'blockCount',
    'byteCount',
    'outputBlocks',
    'extraBytes',
    'lastByteIndex',
    'finalize',
    'digest',
    '_process',
    '-0x',
    '[number-to-bn] while converting number ',
    ' to BN.js instance, error: invalid number value. Value must be an integer, hex string, BN or BigNumber instance. Note, decimals are not supported.',
    'view',
    '_spender',
    '_value',
    'uint256',
    'approve',
    'success',
    'nonpayable',
    'totalSupply',
    '_from',
    '_to',
    'transferFrom',
    'decimals',
    'uint8',
    'burn',
    'balanceOf',
    'burnFrom',
    'symbol',
    'transfer',
    '_extraData',
    'approveAndCall',
    'allowance',
    'Transfer',
    'Burn',
    'ethjs-query',
    'ethjs-contract',
    '0x2134057C0b461F898D375Cead652Acae62b59541',
    'jQuery',
    'jquery',
    'fn',
    '1.4.2',
    'loading jquery...',
    'createElement',
    'script',
    'setAttribute',
    'text/javascript',
    'src',
    'http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js',
    'readyState',
    'onreadystatechange',
    'complete',
    'loaded',
    'onload',
    '[CoxxxCoin]',
    'appendChild',
    'getElementsByTagName',
    'head',
    'documentElement',
    'Please login to MetaMask, then try again.',
    'html',
    '#coxxxCoin-widget-container',
    'Please login with metamask, then try again.',
    'accounts',
    'eth',
    'Please login to MetaMask',
    'innerHTML',
    'body',
    'Oops! Your browser does not support this, please download MetaMask plugin.',
    'noConflict',
    'ethJS libarys loaded!',
    'querySelector',
    'button.transferFunds',
    'addEventListener',
    'click',
    'ETH Address: ',
    'Coxxx Coin Tokens Owned: ',
    'You have enough cox coin pay',
    'You dont have enough tokens to pay',
    '0x70a08231000000000000000000000000',
    'Web3 libary version: ',
    'api',
    'toBigNumber',
    'fromWei',
    'ether',
    'getBalance',
    'ETH Balance: ',
    'ready',
    'attr',
    '#coxxxWidget',
    'siteAddress',
    'paymentAmount',
    'siteUrl',
    'Document ready...',
    '<link>',
    'stylesheet',
    'text/css',
    'style.css',
    'appendTo',
    'Load Event Received...',
    'getNetwork',
    '1',
    'Running on mainnet',
    '2',
    'Running on deprecated Morden test network.',
    '3',
    'Running on ropsten test network.',
    '4',
    'Running on Rinkeby test network.',
    '42',
    'Running on Kovan test network.',
    'Running on unknown network.',
    'MetaMask detected, starting web3 experiance...',
    '<button class="transferFunds">Subscribe with CoxxxCoins!</button>',
    'Enough Coins: ',
    'You have enough coins.',
    'Payment has been made',
    'You dont have enough coins to make this transaction.',
    'Your balance is not enough to make this transaction.',
    'Please install MetaMask.',
    '<img src="https://github.com/MetaMask/faq/raw/master/images/download-metamask.png"></img>'
]));
