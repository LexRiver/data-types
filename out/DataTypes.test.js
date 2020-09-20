"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataTypes_1 = require("./DataTypes");
test('isValidJsonObject', function () {
    var x = {
        a: 'a',
        b: 'b',
        c: {
            c1: 'c1',
            c2: 23234,
            c3: new Date()
        },
        d: [
            'd1', 'd2', 'd3'
        ]
    };
    expect(DataTypes_1.DataTypes.isValidJsonObject(x)).toBe(true);
});
test('isValidJsonObject: class instances should fail', function () {
    var MyClass = /** @class */ (function () {
        function MyClass(a) {
            this.a = a;
        }
        return MyClass;
    }());
    var x = new MyClass('x');
    expect(DataTypes_1.DataTypes.isValidJsonObject({ a: x })).toBe(false);
});
test('isValidJsonObject: Map', function () {
    expect(DataTypes_1.DataTypes.isValidJsonObject({ a: new Map() })).toBe(false);
});
test('isFunction', function () {
    function myFunction() {
        console.log('myFunction');
    }
    expect(DataTypes_1.DataTypes.isFunction(myFunction)).toBe(true);
});
test('isFunction (2)', function () {
    var x = function () { };
    expect(DataTypes_1.DataTypes.isFunction(x)).toBe(true);
});
test('filterObjectByKeys', function () {
    var date = new Date();
    var input = {
        a: 'a',
        b: 'b',
        _c: '_c',
        _d: 'd',
        e: {
            e1: 'e1',
            _e2: '_e2'
        },
        f: [
            { f1: 'f1' },
            { _f2: 'f2' }
        ],
        g: date,
        _h: date,
        i: 34,
        _j: 45
    };
    var output = {
        a: 'a',
        b: 'b',
        e: {
            e1: 'e1',
        },
        f: [
            { f1: 'f1' },
            {}
        ],
        g: date,
        i: 34
    };
    expect(DataTypes_1.DataTypes.filterObjectByKeys(input, function (k) { return k[0] !== '_'; }, true)).toEqual(output);
});
test('isEqual (1)', function () {
    var x = 1;
    var y = 1;
    expect(DataTypes_1.DataTypes.isEqual(x, y)).toEqual(true);
});
test('isEqual (2)', function () {
    var x = 1;
    var y = '1';
    expect(DataTypes_1.DataTypes.isEqual(x, y)).toEqual(false);
});
test('isEqual (3)', function () {
    var x = 'a';
    var y = 'a';
    expect(DataTypes_1.DataTypes.isEqual(x, y)).toEqual(true);
});
test('isEqual (4)', function () {
    var x = 'a';
    var y = '1';
    expect(DataTypes_1.DataTypes.isEqual(x, y)).toEqual(false);
});
test('isEqual (5)', function () {
    var x = 1.11;
    var y = 1.11;
    expect(DataTypes_1.DataTypes.isEqual(x, y)).toEqual(true);
});
test('isEqual (6)', function () {
    var x = new Date('2019-11-12');
    var y = new Date('2019-11-12');
    expect(DataTypes_1.DataTypes.isEqual(x, y)).toEqual(true);
});
test('isEqual (7)', function () {
    var x = new Date();
    var y = x;
    expect(DataTypes_1.DataTypes.isEqual(x, y)).toEqual(true);
});
test('isEqual (8)', function () {
    var x = [1, '1', new Date('2019-11-12')];
    var y = [1, '1', new Date('2019-11-12')];
    expect(DataTypes_1.DataTypes.isEqual(x, y)).toEqual(true);
});
test('isEqual (9)', function () {
    var x = [1, '1', new Date('2019-11-12'), 1];
    var y = [1, '1', new Date('2019-11-12')];
    expect(DataTypes_1.DataTypes.isEqual(x, y)).toEqual(false);
});
test('isEqual (10)', function () {
    var x = { a: 'aa', b: 'bb' };
    var y = { a: 'aa', b: 1 };
    expect(DataTypes_1.DataTypes.isEqual(x, y)).toEqual(false);
});
test('isEqual (11)', function () {
    var x = { a: 'aa', b: 'bb' };
    var y = { a: 'aa', b: 'bb' };
    expect(DataTypes_1.DataTypes.isEqual(x, y)).toEqual(true);
});
test('isEqual (12)', function () {
    var x = { a: 'aa', b: 'bb' };
    var y = { a: 'aa' };
    expect(DataTypes_1.DataTypes.isEqual(x, y)).toEqual(false);
});
test('isEqual (13)', function () {
    var x = {
        a: 'aa',
        b: 'bb',
        c: new Date('2019-11-12'),
        d: [
            1,
            2,
            '3tt',
            new Date('2019-11-13'),
            {
                a: 'aa',
                b: {
                    bb: 'bb',
                    dd: 'dd'
                }
            }
        ],
        e: {
            a: 'aaa',
            b: {
                bb: 'bb',
                dd: new Date('2019-11-13'),
                ee: 123
            }
        }
    };
    var y = {
        a: 'aa',
        b: 'bb',
        c: new Date('2019-11-12'),
        d: [
            1,
            2,
            '3tt',
            new Date('2019-11-13'),
            {
                a: 'aa',
                b: {
                    bb: 'bb',
                    dd: 'dd'
                }
            }
        ],
        e: {
            a: 'aaa',
            b: {
                bb: 'bb',
                dd: new Date('2019-11-13'),
                ee: 123
            }
        }
    };
    expect(DataTypes_1.DataTypes.isEqual(x, y)).toEqual(true);
});
test('isEqual (14)', function () {
    var x = { date: new Date(2019, 10, 10) };
    var y = { date: new Date(2019, 10, 20) };
    expect(DataTypes_1.DataTypes.isEqual(x, y)).toEqual(false);
});
test('isObjectContainsObject (1)', function () {
    var small = { a: 'a', b: true, c: 3 };
    var big = { a: 'a', b: true, c: 3, d: false };
    expect(DataTypes_1.DataTypes.isObjectContainsObject(big, small)).toEqual(true);
});
test('isObjectContainsObject (2)', function () {
    var small = { a: 'a', b: { b1: 'b1' }, d: new Date(2019, 12, 10) };
    var big = { a: 'a', b: { b1: 'b1', b2: 'b2' }, c: 'c', d: new Date(2019, 12, 10) };
    expect(DataTypes_1.DataTypes.isObjectContainsObject(big, small)).toEqual(true);
});
test('isObjectContainsObject (3)', function () {
    var small = {};
    var big = { a: 'a', b: { b1: 'b1', b2: 'b2' }, c: 'c' };
    expect(DataTypes_1.DataTypes.isObjectContainsObject(big, small)).toEqual(true);
});
test('isObjectContainsObject (4)', function () {
    var small = { date: new Date(2019, 10, 10) };
    var big = { date: new Date(2019, 10, 11) };
    expect(DataTypes_1.DataTypes.isObjectContainsObject(big, small)).toEqual(false);
});
test('isObjectContainsObject (5)', function () {
    var small = { date: new Date(2019, 10, 20) };
    var big = { date: new Date(2019, 10, 20) };
    expect(DataTypes_1.DataTypes.isObjectContainsObject(big, small)).toEqual(true);
});
test('isObjectContainsObject (6)', function () {
    var small = { a: 'a', d: new Date(2019, 10, 10) };
    var big = { a: 'a', b: 'b', d: new Date(2019, 10, 11) };
    expect(DataTypes_1.DataTypes.isObjectContainsObject(big, small)).toEqual(false);
});
test('isObjectWithKeys (1)', function () {
    var x = { a: 'a', b: true };
    expect(DataTypes_1.DataTypes.isObjectWithKeys(x)).toEqual(true);
});
test('isObjectWithKeys (2)', function () {
    var x = 'some string';
    expect(DataTypes_1.DataTypes.isObjectWithKeys(x)).toEqual(false);
});
test('isObjectWithKeys (3)', function () {
    var x = {};
    expect(DataTypes_1.DataTypes.isObjectWithKeys(x)).toEqual(false);
});
test('isObject (1)', function () {
    expect(DataTypes_1.DataTypes.isObject({})).toEqual(true);
    expect(DataTypes_1.DataTypes.isObject({ a: 'a' })).toEqual(true);
    expect(DataTypes_1.DataTypes.isObject(123)).toEqual(false);
    expect(DataTypes_1.DataTypes.isObject('some string')).toEqual(false);
    expect(DataTypes_1.DataTypes.isObject(true)).toEqual(false);
    expect(DataTypes_1.DataTypes.isObject(new Date())).toEqual(false);
    expect(DataTypes_1.DataTypes.isObject([])).toEqual(false);
    expect(DataTypes_1.DataTypes.isObject([1, 2, 3])).toEqual(false);
    expect(DataTypes_1.DataTypes.isObject(function () { })).toEqual(false);
});
var C = /** @class */ (function () {
    function C(a) {
        this.a = a;
    }
    return C;
}());
test('isClass', function () {
    var c = new C('aaa');
    console.log('c.a=', c.a);
    expect(DataTypes_1.DataTypes.isClassInstance(c, C)).toBeTruthy();
    console.log('typeof C', typeof C);
    console.log('C.toString()=', C.toString());
    expect(DataTypes_1.DataTypes.isClass(C)).toBeTruthy();
});
var EnumForTest;
(function (EnumForTest) {
    EnumForTest["First"] = "first";
    EnumForTest["Second"] = "second";
})(EnumForTest || (EnumForTest = {}));
var EnumForTestNumber;
(function (EnumForTestNumber) {
    EnumForTestNumber[EnumForTestNumber["First"] = 0] = "First";
    EnumForTestNumber[EnumForTestNumber["Second"] = 1] = "Second"; // =1
})(EnumForTestNumber || (EnumForTestNumber = {}));
test('checkIfValueExistsInEnum', function () {
    expect(DataTypes_1.DataTypes.isValueExistsInEnum(EnumForTest.First, EnumForTest)).toBeTruthy();
    expect(DataTypes_1.DataTypes.isValueExistsInEnum('first', EnumForTest)).toBeTruthy();
    expect(DataTypes_1.DataTypes.isValueExistsInEnum('First', EnumForTest)).toBeFalsy();
    expect(DataTypes_1.DataTypes.isValueExistsInEnum(1, EnumForTestNumber)).toBeTruthy();
    expect(DataTypes_1.DataTypes.isValueExistsInEnum(100, EnumForTestNumber)).toBeFalsy();
    expect(DataTypes_1.DataTypes.isValueExistsInEnum(undefined, EnumForTestNumber)).toBeFalsy();
});
