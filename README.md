# DataTypes

Package for checking type of a variable

## Install

```
npm install @lexriver/data-types
```

## Import
```typescript
import {DataTypes} from '@lexriver/data-types'
```


## Usage


### DataTypes.isFunction(x:any):boolean

Check if variable is a function

<br/>
<br/>

### DataTypes.isClass(x:any):boolean

Check if variable is a class

<br/>
<br/>

### DataTypes.isClassInstance(classInstance:any, className:any):boolean

Check if variable is instance of a class, internally the same as ```classInstance instanceof className```

<br/>
<br/>

### DataTypes.isDate(date: any): boolean

Check if variable is instance of ```Date```

<br/>
<br/>

### DataTypes.isObject(o: any): boolean 

Check if variable is object

<br/>
<br/>

### DataTypes.isObjectWithKeys(o:any): boolean 

Check if variable is object with keys

```typescript
DataTypes.isObjectWithKeys({a:'a'}) // true
DataTypes.isObjectWithKeys({}) // false
DataTypes.isObjectWithKeys('some string') // false
```

### DataTypes.isString(x: any): boolean

Check if variable is a string

<br/>
<br/>

### DataTypes.isNumber(x: any): boolean

Check if variable is a number

<br/>
<br/>

### DataTypes.isNullOrUndefined(x: any): boolean 

Check if variable is null or undefined

<br/>
<br/>

### DataTypes.isBoolean(x: any): boolean 

Check if variable is a boolean

<br/>
<br/>

### DataTypes.isArray(x: any): boolean

Check if variable is array

<br/>
<br/>

### DataTypes.isPrimitive(x: any): boolean

Check if variable is ```undefined``` or ```null``` or ```boolean``` or ```string``` or ```symbol```

<br/>
<br/>

### DataTypes.isEqual(x: any, y: any): boolean

Check if two variables are the same

```typescript
DataTypes.isEqual(1, 1) // true
```

```typescript
DataTypes.isEqual(1, '1') // false
```

```typescript
DataTypes.isEqual('a', 'a') // true
```

```typescript
DataTypes.isEqual('a', '1') // false
```

```typescript
DataTypes.isEqual(1.11, 1.11) // true
```

```typescript
DataTypes.isEqual(new Date('2019-11-12'), new Date('2019-11-12')) // true
DataTypes.isEqual(new Date('2019-11-12'), new Date('2019-11-13')) // false
```

```typescript
const x = new Date()
const y = x
DataTypes.isEqual(x, y) // true
```

```typescript
DataTypes.isEqual(
    [1,'1',new Date('2019-11-12')],
    [1,'1',new Date('2019-11-12')]
) //true
```



```typescript
DataTypes.isEqual(
    [1,'1',new Date('2019-11-12'), 1],
    [1,'1',new Date('2019-11-12')]
) //false
```

```typescript
DataTypes.isEqual(
    [1,'1',new Date('2019-11-12')],
    [1,'1',new Date('2019-11-12')]
) //true
```

```typescript
DataTypes.isEqual(
    {a:'aa', b:'bb'},
    {b: 'bb', a: 'aa'}
) //true
```

```typescript
DataTypes.isEqual(
    {a:'aa', b:'bb'},
    {a: 'aa', b:1}
) //false
```

```typescript
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
    DataTypes.isEqual(x,y) // true
```

<br/>
<br/>

### DataTypes.isObjectContainsObject(p:{bigObject:Object, smallObject:Object, ignoreCaseInStringValues?:boolean, ignoreEmptySmallObject?:boolean}):boolean

Check if object contains another object

__Parameters__
* `bigObject:Object` - big object to check 
* `smallObject:Object` - small object
* `ignoreCaseInStringValues?:boolean` - ignore case for strings when compare
* `ignoreEmptySmallObject?:boolean` - if true the function returns false if small object is empty

__Examples__

```typescript
const big =   {a:'a', b:true, c:3, d:false}
const small = {a:'a', b:true, c:3}
DataTypes.isObjectContainsObject({bigObject: big, smallObject: small}) // true
```

```typescript
const big =   {a:'a', b:{b1:'b1', b2:'b2'}, c:'c', d:new Date(2019,12,10)}
const small = {a:'a', b:{b1:'b1'}, d:new Date(2019,12,10)}
DataTypes.isObjectContainsObject({bigObject: big, smallObject: small}) // true
```

```typescript
const big =   {a:'a', b:{b1:'b1', b2:'b2'}, c:'c'}
const small = {}
DataTypes.isObjectContainsObject({bigObject: big, smallObject: small}) // true
DataTypes.isObjectContainsObject({bigObject: big, smallObject: small, ignoreEmptySmallObject: true}) // false
```

```typescript
const small = {a: 'AAA'}
const big = {a:'aaa', b:'b', d:new Date(2019,10,11)}
    DataTypes.isObjectContainsObject({ 
        bigObject: big, 
        smallObject: small, 
        ignoreCaseInStringValues: true
    }) //true

    DataTypes.isObjectContainsObject({ 
        bigObject: big, 
        smallObject: small, 
        ignoreCaseInStringValues: false
    }) //false
```

```typescript
const big =    {date:new Date(2019,10,11)}
const small =  {date:new Date(2019,10,10)}
const small2 = {date:new Date(2019,10,11)}
DataTypes.isObjectContainsObject({bigObject: big, smallObject: small}) // false
DataTypes.isObjectContainsObject({bigObject: big, smallObject: small2}) // true
```

<br/>
<br/>

### DataTypes.filterObjectByKeys(o: any, keysToCopy: (key: string) => boolean, recursive?: boolean): object 

Returns a new object only with keys specified by predicate function

__Parameters__
* `o: any` - object to filter
* `keysToCopy: (key: string) => boolean` - function to check each property for object
* `recursive?: boolean` - if true, then perform a deep clone with filter


__Example__
```typescript
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
    const output = DataTypes.filterObjectByKeys(input, k => k[0] !== '_', true)
/*
    output = {
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
*/    
```

<br/>
<br/>

### DataTypes.isValidJsonObject(json: any)

Check if no instances of classes in object

```typescript
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
    DataTypes.isValidJsonObject(x) // true
```

```typescript
    class MyClass{
        constructor(public a:string){
        }
    }

    const x = new MyClass('x')

    DataTypes.isValidJsonObject({a:x}) // false
```

<br/>
<br/>

### DataTypes.toJson(o:any)

Convert any object to valid json object

<br/>
<br/>

### DataTypes.isValueExistsInEnum(value:any, EnumType:any): boolean

Check if value exists in enum

```typescript
enum EnumForTest{
    First = 'first',
    Second = 'second'
}

DataTypes.isValueExistsInEnum(EnumForTest.First, EnumForTest) // true
DataTypes.isValueExistsInEnum('first', EnumForTest) // true
DataTypes.isValueExistsInEnum('First', EnumForTest) // false

enum EnumForTestNumber{
    First, // =0
    Second // =1
}

DataTypes.isValueExistsInEnum(1, EnumForTestNumber) // true
DataTypes.isValueExistsInEnum(100, EnumForTestNumber) // false
DataTypes.isValueExistsInEnum(undefined, EnumForTestNumber) // false
```
