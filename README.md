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
DataTypes.isObjectContainsObject({
    bigObject: {a:'a', b:true, c:3, d:false}, 
    smallObject: {a:'a', b:true, c:3}
}) // true
```

```typescript
DataTypes.isObjectContainsObject({
    bigObject: {a:'a', b:{b1:'b1', b2:'b2'}, c:'c', d:new Date(2019,12,10)}, 
    smallObject: {a:'a', b:{b1:'b1'}, d:new Date(2019,12,10)}
}) // true
```

```typescript
DataTypes.isObjectContainsObject({
    bigObject: {a:'a', b:{b1:'b1', b2:'b2'}, c:'c'}, 
    smallObject: {}
}) // true

DataTypes.isObjectContainsObject({
    bigObject: {a:'a', b:{b1:'b1', b2:'b2'}, c:'c'}, 
    smallObject: {},
    ignoreEmptySmallObject: true
}) // false
```

```typescript
DataTypes.isObjectContainsObject({ 
    bigObject: {a:'aaa', b:'b', d:new Date(2019,10,11)}, 
    smallObject: {a: 'AAA'}, 
    ignoreCaseInStringValues: true
}) //true

DataTypes.isObjectContainsObject({ 
    bigObject: {a:'aaa', b:'b', d:new Date(2019,10,11)}, 
    smallObject: {a: 'AAA'}, 
    ignoreCaseInStringValues: false
}) //false
```

```typescript
DataTypes.isObjectContainsObject({
    bigObject: {date:new Date(2019,10,11)},
    smallObject: {date:new Date(2019,10,10)}
}) // false

DataTypes.isObjectContainsObject({
    bigObject: {date:new Date(2019,10,11)},
    smallObject: {date:new Date(2019,10,11)}
}) // true

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

<br/>
<br/>


### DataTypes.hasProperty(obj: T, key: string): boolean

Type-safe check if object has property

```typescript
type TypeA = {a:string}
type TypeB = {b:string}

function func(param1:TypeA|TypeB){
    if('c' in param1){ // no compilation error
        //...
    }    

    if(DataTypes.hasProperty(param1, 'c')){ // compilation error 
        //...
    }
}
```

<br/>
<br/>

### DataTypes.hasDefinedProperty(obj: T, key: K): boolean

Type-safe check if object has property and the property value is not `undefined`. This function performs type narrowing and returns `true` if the property exists and is not `undefined`. Note that `null` values will return `true`.

__Parameters__
* `obj: T` - object to check
* `key: K` - property key to check (must be a valid key of the union type)

__Returns__
* `boolean` - `true` if property exists and is not `undefined`, `false` otherwise

__Examples__

```typescript
type TypeA = {a: string, b?: number}
type TypeB = {c: string}

const obj: TypeA | TypeB = {a: 'test', b: 42}

if (DataTypes.hasDefinedProperty(obj, 'a')) {
    // TypeScript knows obj has property 'a' here
    console.log(obj.a) // OK
}

```

```typescript
const obj = {a: 'test', b: undefined, c: null}

DataTypes.hasDefinedProperty(obj, 'a') // true
DataTypes.hasDefinedProperty(obj, 'b') // false (undefined)
DataTypes.hasDefinedProperty(obj, 'c') // true (null is not undefined)
```

```typescript
const obj = {a: 0, b: '', c: false}

DataTypes.hasDefinedProperty(obj, 'a') // true (0 is defined)
DataTypes.hasDefinedProperty(obj, 'b') // true (empty string is defined)
DataTypes.hasDefinedProperty(obj, 'c') // true (false is defined)
```

<br/>
<br/>

### DataTypes.hasDefinedPropertyAndValue(obj: T, key: K): boolean

Type-safe check if object has property and the property value is not `undefined` and not `null`. This is stricter than `hasDefinedProperty` as it also excludes `null` values.

__Parameters__
* `obj: T` - object to check
* `key: K` - property key to check (must be a valid key of the union type)

__Returns__
* `boolean` - `true` if property exists and is neither `undefined` nor `null`, `false` otherwise

__Examples__

```typescript
type TypeA = {a: string, b?: number | null}
type TypeB = {c: string}

const obj: TypeA | TypeB = {a: 'test', b: 42}

if (DataTypes.hasDefinedPropertyAndValue(obj, 'a')) {
    // TypeScript knows obj has property 'a' with a value here
    console.log(obj.a) // OK
}
```

```typescript
const obj = {a: 'test', b: undefined, c: null}

DataTypes.hasDefinedPropertyAndValue(obj, 'a') // true
DataTypes.hasDefinedPropertyAndValue(obj, 'b') // false (undefined)
DataTypes.hasDefinedPropertyAndValue(obj, 'c') // false (null)
```

```typescript
const obj = {a: 0, b: '', c: false}

DataTypes.hasDefinedPropertyAndValue(obj, 'a') // true (0 is a value)
DataTypes.hasDefinedPropertyAndValue(obj, 'b') // true (empty string is a value)
DataTypes.hasDefinedPropertyAndValue(obj, 'c') // true (false is a value)
```

<br/>
<br/>

### type AnyJsonValue

Represents any json value

```typescript
export type AnyJsonValue =
    | string
    | number
    | boolean
    | null
    | Date
    | { readonly [K in string]: AnyJsonValue }
    | Array<AnyJsonValue>
    | undefined
```


<br/>
<br/>

### DataTypes.isValidJsonObject(json: any):json is AnyJsonValue

Check if parameter is valid json object

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

Convert any object to valid json object via JSON.parse(JSON.stringify(o))

<br/>
<br/>

### type JsonType\<T\>

Represents JSON type to use as parameter for function

__Example__
```typescript
function expectingJsonType<T>(x:JsonType<T>){
    // here we can be sure that parameter is valid json object
    return JSON.stringify(json) // or save to database, etc
}

type Person = {
    name:string
}
type NonJsonType = {
    fn: ()=>void
}

const person:Person = {
    name: 'John'
}

expectingJsonType(person) // ok

const nonJson:NonJsonType = {
    fn: ()=>{}
}

expectingJsonType(nonJson) // compilation error

```

### type JsonCompatible\<T\>

Type `JsonCompatible` is a type that can be safely converted to JSON. This type sometimes works better than `JsonType<T>`, for example with interfaces.

```typescript

    function expectingJsonCompatible<T extends JsonCompatible<T>>(data: T){
        console.log(JSON.stringify(data))
    }

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


```

### type PartiallyPartial<T, K extends keyof T>

Make selected fields optional while keeping all other fields unchanged.

```typescript
type User = {
    id: string
    email: string
    password: string
}

type UserWithOptionalEmailAndPassword = PartiallyPartial<User, 'email' | 'password'>
/*
    Equivalent to:
    {
        id: string;              // unchanged (still required)
        email?: string | undefined;
        password?: string | undefined;
    }
*/
```

__Use cases__
* Making a subset of fields optional in update payloads while keeping identifiers required.

<br/>
<br/>

### type AtLeastOne<T, K extends keyof T>

Require that at least one of the specified keys is present. Useful for filters or input where multiple alternative identifiers are allowed.

```typescript
type User = {
    id: string
    email: string
    username: string
}

type UserLookup = AtLeastOne<User, 'id' | 'email' | 'username'>

function findUser(query: UserLookup){
    // query must contain at least one of: id, email, username
}

findUser({ id: '123' }) // OK
findUser({ email: 'a@b.com' }) // OK
findUser({}) // compile error
```

__Notes__
* Other non-listed fields are optional in the resulting type, but at least one of `K` must be present.
