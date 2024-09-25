// import {describe, expect, test} from '@jest/globals';
import { expect, test } from 'vitest'
import { DataTypes } from "./DataTypes.mjs"


test('isValidJsonObject', () => {
    const x = {
        a: 'a',
        b: 'b',
        c: {
            c1:'c1',
            c2: 23234,
            c3: new Date()
        },
        d:[
            'd1', 'd2', 'd3'
        ]
    }
    expect(DataTypes.isValidJsonObject(x)).toBe(true)
})

test('isValidJsonObject: class instances should fail', () => {
    class MyClass{
        constructor(public a:string){
        }
    }

    const x = new MyClass('x')

    expect(DataTypes.isValidJsonObject({a:x})).toBe(false)
})

test('isValidJsonObject: Map', () => {
    expect(DataTypes.isValidJsonObject({a:new Map()})).toBe(false)
})

test('isFunction', () => {
    function myFunction(){
        console.log('myFunction')
    }

    expect(DataTypes.isFunction(myFunction)).toBe(true)
})

test('isFunction (2)', () => {
    const x = () => {}
    expect(DataTypes.isFunction(x)).toBe(true)
})

test('filterObjectByKeys', () => {
    const date = new Date()
    const input = {
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
    }
    const output = {
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
    }
    expect(DataTypes.filterObjectByKeys(input, k => k[0] !== '_', true)).toEqual(output)
})

test('isEqual (1)', () => {
    const x = 1
    const y = 1
    expect(DataTypes.isEqual(x,y)).toEqual(true)
})

test('isEqual (2)', () => {
    const x = 1
    const y = '1'
    expect(DataTypes.isEqual(x,y)).toEqual(false)
})

test('isEqual (3)', () => {
    const x = 'a'
    const y = 'a'
    expect(DataTypes.isEqual(x,y)).toEqual(true)
})

test('isEqual (4)', () => {
    const x = 'a'
    const y = '1'
    expect(DataTypes.isEqual(x,y)).toEqual(false)
})

test('isEqual (5)', () => {
    const x = 1.11
    const y = 1.11
    expect(DataTypes.isEqual(x,y)).toEqual(true)
})

test('isEqual (6)', () => {
    const x = new Date('2019-11-12')
    const y = new Date('2019-11-12')
    expect(DataTypes.isEqual(x,y)).toEqual(true)
})

test('isEqual (7)', () => {
    const x = new Date()
    const y = x
    expect(DataTypes.isEqual(x,y)).toEqual(true)
})

test('isEqual (8)', () => {
    const x = [1,'1',new Date('2019-11-12')]
    const y = [1, '1', new Date('2019-11-12')]
    expect(DataTypes.isEqual(x,y)).toEqual(true)
})


test('isEqual (9)', () => {
    const x = [1,'1',new Date('2019-11-12'), 1]
    const y = [1, '1', new Date('2019-11-12')]
    expect(DataTypes.isEqual(x,y)).toEqual(false)
})

test('isEqual (10)', () => {
    const x = {a:'aa', b:'bb'}
    const y = {a: 'aa', b: 1}
    expect(DataTypes.isEqual(x,y)).toEqual(false)
})

test('isEqual (11)', () => {
    const x = {a:'aa', b:'bb'}
    const y = {b: 'bb', a: 'aa'}
    expect(DataTypes.isEqual(x,y)).toEqual(true)
})

test('isEqual (12)', () => {
    const x = {a:'aa', b:'bb'}
    const y = {a: 'aa' }
    expect(DataTypes.isEqual(x,y)).toEqual(false)
})


test('isEqual (13)', () => {
    const x = {
        a:'aa', 
        b:'bb', 
        c: new Date('2019-11-12'), 
        d: [
            1,
            2,
            '3tt', 
            new Date('2019-11-13'), 
            {
                a: 'aa', 
                b: {
                    bb:'bb', 
                    dd:'dd'
                }
            }
        ],
        e: {
            a:'aaa', 
            b: {
                bb:'bb',
                dd: new Date('2019-11-13'),
                ee: 123
            }
        }
    }
    const y = {
        a:'aa', 
        b:'bb', 
        c: new Date('2019-11-12'), 
        d: [
            1,
            2,
            '3tt', 
            new Date('2019-11-13'), 
            {
                a: 'aa', 
                b: {
                    bb:'bb', 
                    dd:'dd'
                }
            }
        ],
        e: {
            a:'aaa', 
            b: {
                bb:'bb',
                dd: new Date('2019-11-13'),
                ee: 123
            }
        }
    }
    expect(DataTypes.isEqual(x,y)).toEqual(true)
})

test('isEqual (14)', () => {
    const x = {date:new Date(2019,10,10)}
    const y = {date:new Date(2019,10,20)}
    expect(DataTypes.isEqual(x,y)).toEqual(false)
})


test('isObjectContainsObject (1)', () => {
    const small = {a:'a', b:true, c:3}
    const big = {a:'a', b:true, c:3, d:false}
    expect(DataTypes.isObjectContainsObject({ bigObject: big, smallObject: small})).toEqual(true)
})



test('isObjectContainsObject (2)', () => {
    const small = {a:'a', b:{b1:'b1'}, d:new Date(2019,12,10)}
    const big = {a:'a', b:{b1:'b1', b2:'b2'}, c:'c', d:new Date(2019,12,10)}
    expect(DataTypes.isObjectContainsObject({ bigObject: big, smallObject: small})).toEqual(true)
})

test('isObjectContainsObject (3)', () => {
    const small = {}
    const big = {a:'a', b:{b1:'b1', b2:'b2'}, c:'c'}
    expect(DataTypes.isObjectContainsObject({ bigObject: big, smallObject: small})).toEqual(true)
})

test('isObjectContainsObject (4)', () => {
    const small = {date:new Date(2019,10,10)}
    const big = {date:new Date(2019,10,11)}
    expect(DataTypes.isObjectContainsObject({ bigObject: big, smallObject: small})).toEqual(false)
})

test('isObjectContainsObject (5)', () => {
    const small = {date:new Date(2019,10,20)}
    const big = {date:new Date(2019,10,20)}
    expect(DataTypes.isObjectContainsObject({ bigObject: big, smallObject: small})).toEqual(true)
})

test('isObjectContainsObject (6)', () => {
    const small = {a:'a', d:new Date(2019,10,10)}
    const big = {a:'a', b:'b', d:new Date(2019,10,11)}
    expect(DataTypes.isObjectContainsObject({ bigObject: big, smallObject: small})).toEqual(false)
})

test('isObjectContainsObject (7)', () => {
    const small = {}
    const big = {a:'a', b:'b', d:new Date(2019,10,11)}
    expect(DataTypes.isObjectContainsObject({ 
        bigObject: big, 
        smallObject: small, 
        ignoreEmptySmallObject: true
    })).toEqual(false)
})

test('isObjectContainsObject (8)', () => {
    const small = {a: 'AAA'}
    const big = {a:'aaa', b:'b', d:new Date(2019,10,11)}
    expect(DataTypes.isObjectContainsObject({ 
        bigObject: big, 
        smallObject: small, 
        ignoreCaseInStringValues: true
    })).toEqual(true)
    expect(DataTypes.isObjectContainsObject({ 
        bigObject: big, 
        smallObject: small, 
        ignoreCaseInStringValues: false
    })).toEqual(false)

})

test('isObjectWithKeys (1)', () => {
    const x = {a:'a', b:true}
    expect(DataTypes.isObjectWithKeys(x)).toEqual(true)
})

test('isObjectWithKeys (2)', () => {
    const x = 'some string'
    expect(DataTypes.isObjectWithKeys(x)).toEqual(false)
})

test('isObjectWithKeys (3)', () => {
    const x = {}
    expect(DataTypes.isObjectWithKeys(x)).toEqual(false)
})


test('isObject (1)', () => {
    expect(DataTypes.isObject({})).toEqual(true)
    expect(DataTypes.isObject({a:'a'})).toEqual(true)
    expect(DataTypes.isObject(123)).toEqual(false)
    expect(DataTypes.isObject('some string')).toEqual(false)
    expect(DataTypes.isObject(true)).toEqual(false)
    expect(DataTypes.isObject(new Date())).toEqual(false)
    expect(DataTypes.isObject([])).toEqual(false)
    expect(DataTypes.isObject([1,2,3])).toEqual(false)
    expect(DataTypes.isObject(() => {})).toEqual(false)
})


class C{
    constructor(public a:string){
         
    }
}

test('isClass', () => {
    let c = new C('aaa')
    console.log('c.a=', c.a)
    expect(DataTypes.isClassInstance(c, C)).toBeTruthy()
    console.log('typeof C', typeof C)
    console.log('C.toString()=', C.toString())
    expect(DataTypes.isClass(C)).toBeTruthy()
})


enum EnumForTest{
    First = 'first',
    Second = 'second'
}

enum EnumForTestNumber{
    First, // =0
    Second // =1
}

test('checkIfValueExistsInEnum', () => {
    expect(DataTypes.isValueExistsInEnum(EnumForTest.First, EnumForTest)).toBeTruthy()
    expect(DataTypes.isValueExistsInEnum('first', EnumForTest)).toBeTruthy()
    expect(DataTypes.isValueExistsInEnum('First', EnumForTest)).toBeFalsy()
    expect(DataTypes.isValueExistsInEnum(1, EnumForTestNumber)).toBeTruthy()
    expect(DataTypes.isValueExistsInEnum(100, EnumForTestNumber)).toBeFalsy()
    expect(DataTypes.isValueExistsInEnum(undefined, EnumForTestNumber)).toBeFalsy()
})


// test('iterable object', () => {
//     expect(DataTypes.isIterableObject([1,2,3])).toBeTruthy()
//     expect(DataTypes.isIterableObject([])).toBeTruthy()
//     expect(DataTypes.isIterableObject({})).toBeTruthy()
//     expect(DataTypes.isIterableObject({a:'a', b:'b'})).toBeTruthy()
//     expect(DataTypes.isIterableObject(123)).toBeFalsy()
//     expect(DataTypes.isIterableObject('some string')).toBeTruthy()
//     expect(DataTypes.isIterableObject(new Date())).toBeFalsy()
// })

