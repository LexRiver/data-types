import { expect, test } from 'vitest'
import { DataTypes } from "./DataTypes.mjs"
import { JsonCompatible, JsonType } from './Types.mjs'


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

    if(DataTypes.isValidJsonObject(x)){
        const y = x
        console.log('y.a=', y.a)
    }
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
    expect(DataTypes.isEqual(x,y,{ignoreCaseInStrings:true})).toEqual(true)
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

test('isEqual two object with different keys length (1)', () => {
    const x = {a:'a', b:'b', c:undefined}
    const y = {a:'a', b:'b', c:null}
    expect(DataTypes.isEqual(x,y,{ignoreNullAndUndefinedValuesInObject:true})).toEqual(true)
})
test('isEqual two object with different keys length (2)', () => {
    const x = {a:'a', b:'b', c:undefined}
    const y = {a:'a', b:'b'}
    expect(DataTypes.isEqual(x,y,{ignoreNullAndUndefinedValuesInObject:true})).toEqual(true)
})
test('isEqual two object with different keys length (3)', () => {
    const x = {a:'a', b:'b'}
    const y = {a:'a', b:'b', c:undefined}
    expect(DataTypes.isEqual(x,y,{ignoreNullAndUndefinedValuesInObject:true})).toEqual(true)
})
test('isEqual two object with different keys length (4)', () => {
    const x = {a:'a', b:'b'}
    const y = {a:'a', b:'b', c:null}
    expect(DataTypes.isEqual(x,y,{ignoreNullAndUndefinedValuesInObject:true})).toEqual(true)
})
test('isEqual two object with different keys length (5)', () => {
    const x = {a:'a', b:'b'}
    const y = {a:'a', b:'b', c:null}
    expect(DataTypes.isEqual(x,y,{ignoreNullAndUndefinedValuesInObject:false})).toEqual(false)
})
test('isEqual two object with different keys length (6)', () => {
    const x = {a:'a', b:'b', c:undefined}
    const y = {a:'a', b:'b'}
    expect(DataTypes.isEqual(x,y,{ignoreNullAndUndefinedValuesInObject:false})).toEqual(false)
})
test('isEqual two object with different keys length (7)', () => {
    const x = {a:'a', b:'b', c:''}
    const y = {a:'a', b:'b'}
    expect(DataTypes.isEqual(x,y,{ignoreNullAndUndefinedValuesInObject:true})).toEqual(false)
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



test('hasProperty', () => {
    type TypeA = {a:string}
    type TypeB = {b:string}

    function func(param1:TypeA|TypeB){
        if('c' in param1){ // no compilation error
            //...
            return 'c'
        }    

        if(DataTypes.hasProperty(param1, 'a')){ 
            //...
            return 'a'
        }
        return undefined
    }

    expect(func({a:'a', b:'b'})).toEqual('a')
    // expect(func({a:'a', b:'b', c:'c'})).toEqual('c')

    const x = {a:'a', b:'b'}
    expect(DataTypes.hasProperty(x, 'a')).toBeTruthy()
    expect(DataTypes.hasProperty(x, 'b')).toBeTruthy()
    // expect(DataTypes.hasProperty(x, 'c')).toBeFalsy()
})

test('JsonCompatible', () => {

    function expectingJsonCompatible<T extends JsonCompatible<T>>(data: T){
        console.log(JSON.stringify(data))
    }

    function expectingJsonType<T>(x:JsonType<T>){
        console.log(JSON.stringify(x))
    }

    function expectingAnyJsonValue(x:any){
        console.log(JSON.stringify(x))
    }

    expectingJsonCompatible(5)
    expectingJsonType(5) 
    expectingAnyJsonValue(5)

    expectingJsonCompatible({a:'a1'})
    expectingJsonType({a:'a1'})
    expectingAnyJsonValue({a:'a1'})



    
    let safe = {a:'a1', b:5}
    expectingJsonCompatible(safe)
    expectingJsonType(safe)
    expectingAnyJsonValue(safe)


    let unsafe = {
        a:'a1',
        f: (x:string)=>{console.log(x)}
    }
    expectingJsonCompatible(unsafe) // compile error
    expectingJsonType(unsafe) // compile error
    expectingAnyJsonValue(unsafe) // no error

    type SafeJsonType = {a:string, b:number}
    type NonSafeJsonType = {a:string, f: (x:string)=>void}

    let unsafe2:NonSafeJsonType = {a:'a1', f: (x:string)=>{console.log(x)}}
    let safe2:SafeJsonType = {a:'a1', b:5}

    expectingJsonCompatible(safe2)
    expectingJsonCompatible(unsafe2) // compile error

    expectingJsonType(safe2)
    expectingJsonType(unsafe2) // compile error

    expectingAnyJsonValue(safe2) 
    expectingAnyJsonValue(unsafe2) // no error
    

    let safe3 = {a: {b:'b1'}}
    let unsafe3 = {a: {b:'b1', f: (x:string)=>{console.log(x)}}}

    expectingJsonCompatible(safe3)
    expectingJsonCompatible(unsafe3) // compile error

    expectingJsonType(safe3)
    expectingJsonType(unsafe3) // compile error

    expectingAnyJsonValue(safe3)
    expectingAnyJsonValue(unsafe3) // no error

    let safe4 = {a:{b:{c:'c1'}}}
    let unsafe4 = {a:{b:{c:'c1', f: (x:string)=>{console.log(x)}}}}

    expectingJsonCompatible(safe4)
    expectingJsonCompatible(unsafe4) // compile error
    expectingJsonType(safe4)
    expectingJsonType(unsafe4) // compile error

    let unsafe5 = {a:BigInt(0)}

    expectingJsonCompatible(unsafe5) // compile error
    expectingJsonType(unsafe5) // compile error

    type NonSafeType2 = {
        a:string,
        b:{
            c:Date,
            f:()=>void
        }
    }

    let unsafe6:NonSafeType2 = {
        a:'a1',
        b:{
            c:new Date(),
            f:()=>{}
        }
    }

    expectingJsonCompatible(unsafe6) // compile error
    expectingJsonType(unsafe6) // compile error

    type Test1 = JsonCompatible<string>
    let test1:Test1 = 'a1'
    type Test1D = JsonType<string>
    let test1d:Test1D = 'a1'
    

    type Test2 = JsonCompatible<{a:string, b:number}>
    let test2:Test2 = {a:'a1', b:5}
    type Test2D = JsonType<{a:string, b:number}>
    let test2d:Test2D = {a:'a1', b:5}

    type Test3 = JsonCompatible<{a:string, b:number, f:()=>void}> 
    let test3:Test3 = {a:'a1', b:5, f:()=>{}} //compile error

    type Test3D = JsonType<{a:string, b:number, f:()=>void}>
    let test3d:Test3D = {a:'a1', b:5, f:()=>{}} // compile error

    type Test4 = JsonCompatible<{a:string, b:BigInt}>
    let test4:Test4 = {a:'a1', b:BigInt(10)} // compile error
    type Test4D = JsonType<{a:string, b:BigInt}>
    let test4d:Test4D = {a:'a1', b:BigInt(10)} // compile error

    type Test5 = JsonCompatible<{a:string, b:{c:string}}>
    let test5:Test5 = {a:'a1', b:{c:'c1'}}
    type Test5D = JsonType<{a:string, b:{c:string}}>
    let test5d:Test5D = {a:'a1', b:{c:'c1'}}

    type Test6 = JsonCompatible<{a:string, b:{c:string, f:()=>void, d:Date, e:BigInt}}>
    let test6:Test6 = {a:'a1', b:{c:'c1', f:()=>{}, d:new Date(), e:BigInt(10)}} // compile error
    type Test6D = JsonType<{a:string, b:{c:string, f:()=>void, d:Date, e:BigInt}}>
    let test6d:Test6D = {a:'a1', b:{c:'c1', f:()=>{}, d:new Date(), e:BigInt(10)}} // compile error

    type Test7 = JsonCompatible<{a:string, b:{c:string, f:()=>void, d:Date, e:BigInt, g:Map<string, number>}}>
    let test7:Test7 = {a:'a1', b:{c:'c1', f:()=>{}, d:new Date(), e:BigInt(10), g:new Map()}} // compile error
    type Test7D = JsonType<{a:string, b:{c:string, f:()=>void, d:Date, e:BigInt, g:Map<string, number>}}>
    let test7d:Test7D = {a:'a1', b:{c:'c1', f:()=>{}, d:new Date(), e:BigInt(10), g:new Map()}} // compile error

    class MyClass1{
        constructor(public a:string){
        }
    }
    

    type Test8 = JsonCompatible<{a:string, b:MyClass1}>
    let test8:Test8 = {a:'a1', b:new MyClass1('a')}
    type Test8D = JsonType<{a:string, b:MyClass1}>
    let test8d:Test8D = {a:'a1', b:new MyClass1('a')} // compile error

    class MyClass2{
        constructor(public a:string, public f:()=>void){
        }
    }

    type Test9 = JsonCompatible<{a:string, b:MyClass2}>
    let test9:Test9 = {a:'a1', b:new MyClass2('a', ()=>{})} // compile error

    type Test9D = JsonType<{a:string, b:MyClass2}>
    let test9d:Test9D = {a:'a1', b:new MyClass2('a', ()=>{})} // compile error

    expectingJsonCompatible(new Date()) // compile error (!)
    expectingJsonType(new Date())

    expectingJsonCompatible(new Map()) // compile error
    expectingJsonType(new Map()) // compile error

    expectingJsonCompatible(new Set())  // compile error
    expectingJsonType(new Set()) // compile error

    expectingJsonCompatible(new WeakMap()) // compile error
    expectingJsonType(new WeakMap()) // compile error

    expectingJsonCompatible(new WeakSet()) // compile error
    expectingJsonType(new WeakSet()) // compile error

    expectingJsonCompatible(new ArrayBuffer(10)) // compile error
    expectingJsonType(new ArrayBuffer(10)) // compile error

    expectingJsonCompatible(new Int8Array(10)) // compile error
    expectingJsonType(new Int8Array(10)) // compile error

    expectingJsonCompatible(new Uint8Array(10)) // compile error
    expectingJsonType(new Uint8Array(10)) // compile error

    expectingJsonCompatible(new ArrayBuffer(10)) // compile error
    expectingJsonType(new ArrayBuffer(10)) // compile error

    interface User {
        name:string
    }
    let user:User = {name:'a'}
    expectingJsonCompatible(user)
    expectingJsonType(user) // compile error (!)

    interface UserNonJson {
        name:string
        fn:()=>void
    }
    let userNonJson:UserNonJson = {name:'a', fn:()=>{}}
    expectingJsonCompatible(userNonJson) // compile error
    expectingJsonType(userNonJson) // compile error


    
})

test('toAnyJsonValue', () => {
    let r1 = DataTypes.toJsonCompatible(5)
    let r1d = DataTypes.toAnyJsonValue(5)
    let r2 = DataTypes.toJsonCompatible('a')
    let r2d = DataTypes.toAnyJsonValue('a')
    let r3 = DataTypes.toJsonCompatible(new Date())
    let r3d = DataTypes.toAnyJsonValue(new Date())
    let r4 = DataTypes.toJsonCompatible(new Map())
    let r4d = DataTypes.toAnyJsonValue(new Map())
    let r5 = DataTypes.toJsonCompatible(new Set())
    let r5d = DataTypes.toAnyJsonValue(new Set())
    let r6 = DataTypes.toJsonCompatible(new WeakMap())
    let r6d = DataTypes.toAnyJsonValue(new WeakMap())
    let r7 = DataTypes.toJsonCompatible(new WeakSet())
    let r7d = DataTypes.toAnyJsonValue(new WeakSet())
    let r8 = DataTypes.toJsonCompatible(new ArrayBuffer(10))
    let r8d = DataTypes.toAnyJsonValue(new ArrayBuffer(10))
    let r9 = DataTypes.toJsonCompatible(new ArrayBuffer(10))
    let r9d = DataTypes.toAnyJsonValue(new ArrayBuffer(10))
    let r10 = DataTypes.toJsonCompatible(new Int8Array(10))
    let r10d = DataTypes.toAnyJsonValue(new Int8Array(10))
    let r11 = DataTypes.toJsonCompatible(new Uint8Array(10))
    let r11d = DataTypes.toAnyJsonValue(new Uint8Array(10))
    let r12 = DataTypes.toJsonCompatible(new Uint8ClampedArray(10))
    let r12d = DataTypes.toAnyJsonValue(new Uint8ClampedArray(10))
    let r13 = DataTypes.toJsonCompatible({a:'a', b:'b'})
    let r13d = DataTypes.toAnyJsonValue({a:'a', b:'b'})
    let r14 = DataTypes.toJsonCompatible({a:'a', b:()=>{}})
    let r14d = DataTypes.toAnyJsonValue({a:'a', b:()=>{}})

})

test('hasDefinedProperty - property exists and is defined', () => {
    type TypeA = {a: string, b?: number}
    type TypeB = {c: string}
    
    function func(p: TypeA | TypeB) {
        if (DataTypes.hasDefinedProperty(p, 'a')) {
            // Type narrowing should work here
            expect(p.a).toBe('a')

        } 
        
        if(DataTypes.hasDefinedProperty(p, 'c')){
            expect(p.c).toBe('c')

        } 
        
        if(DataTypes.hasDefinedProperty(p, 'b')){
            expect(p.b).toBe(5)
        } 
            
    }

    func({a:'a'})
    func({c:'c'})
    func({a:'a', b:5})
})

test('hasDefinedProperty - property exists but is undefined', () => {
    const obj = {a: 'test', b: undefined}
    
    expect(DataTypes.hasDefinedProperty(obj, 'a')).toBe(true)
    expect(DataTypes.hasDefinedProperty(obj, 'b')).toBe(false)
})

test('hasDefinedProperty - property does not exist', () => {
    type TypeA = {a: string}
    type TypeB = {b: string}
    
    const obj: TypeA | TypeB = {a: 'test'}
    
    expect(DataTypes.hasDefinedProperty(obj, 'a')).toBe(true)
    expect(DataTypes.hasDefinedProperty(obj, 'b')).toBe(false)
})

test('hasDefinedProperty - property with null value', () => {
    const obj = {a: 'test', b: null}
    
    expect(DataTypes.hasDefinedProperty(obj, 'a')).toBe(true)
    expect(DataTypes.hasDefinedProperty(obj, 'b')).toBe(true) // null is not undefined
})

test('hasDefinedProperty - property with falsy values', () => {
    const obj = {a: 0, b: '', c: false, d: undefined}
    
    expect(DataTypes.hasDefinedProperty(obj, 'a')).toBe(true)
    expect(DataTypes.hasDefinedProperty(obj, 'b')).toBe(true)
    expect(DataTypes.hasDefinedProperty(obj, 'c')).toBe(true)
    expect(DataTypes.hasDefinedProperty(obj, 'd')).toBe(false)
})

test('hasDefinedPropertyAndValue - property exists with defined non-null value', () => {
    type TypeA = {a: string, b?: number | null}
    type TypeB = {c: string}
    
    const obj1: TypeA | TypeB = {a: 'test', b: 42}
    
    if (DataTypes.hasDefinedPropertyAndValue(obj1, 'a')) {
        expect(obj1.a).toBe('test')
    } else {
        throw new Error('Should have property a with value')
    }
})

test('hasDefinedPropertyAndValue - property exists but is undefined', () => {
    const obj = {a: 'test', b: undefined}
    
    expect(DataTypes.hasDefinedPropertyAndValue(obj, 'a')).toBe(true)
    expect(DataTypes.hasDefinedPropertyAndValue(obj, 'b')).toBe(false)
})

test('hasDefinedPropertyAndValue - property exists but is null', () => {
    const obj = {a: 'test', b: null}
    
    expect(DataTypes.hasDefinedPropertyAndValue(obj, 'a')).toBe(true)
    expect(DataTypes.hasDefinedPropertyAndValue(obj, 'b')).toBe(false)
})

test('hasDefinedPropertyAndValue - property does not exist', () => {
    type TypeA = {a: string}
    type TypeB = {b: string}
    
    const obj: TypeA | TypeB = {a: 'test'}
    
    expect(DataTypes.hasDefinedPropertyAndValue(obj, 'a')).toBe(true)
    expect(DataTypes.hasDefinedPropertyAndValue(obj, 'b')).toBe(false)
})

test('hasDefinedPropertyAndValue - property with falsy values', () => {
    const obj = {a: 0, b: '', c: false, d: undefined, e: null}
    
    expect(DataTypes.hasDefinedPropertyAndValue(obj, 'a')).toBe(true)
    expect(DataTypes.hasDefinedPropertyAndValue(obj, 'b')).toBe(true)
    expect(DataTypes.hasDefinedPropertyAndValue(obj, 'c')).toBe(true)
    expect(DataTypes.hasDefinedPropertyAndValue(obj, 'd')).toBe(false)
    expect(DataTypes.hasDefinedPropertyAndValue(obj, 'e')).toBe(false)
})

test('hasDefinedPropertyAndValue - complex object', () => {
    const obj = {
        name: 'John',
        age: 30,
        address: null,
        phone: undefined,
        active: true
    }
    
    expect(DataTypes.hasDefinedPropertyAndValue(obj, 'name')).toBe(true)
    expect(DataTypes.hasDefinedPropertyAndValue(obj, 'age')).toBe(true)
    expect(DataTypes.hasDefinedPropertyAndValue(obj, 'address')).toBe(false)
    expect(DataTypes.hasDefinedPropertyAndValue(obj, 'phone')).toBe(false)
    expect(DataTypes.hasDefinedPropertyAndValue(obj, 'active')).toBe(true)
})

