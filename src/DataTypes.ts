export module DataTypes {
    export function isFunction(x: any):boolean {
        return typeof x === 'function'
    }

    export function isClass(x:any):boolean{
        //console.log('x.toString()=', x.toString())
        return typeof x === 'function' && /^\s*class\s+/.test(x.toString());
    }

    export function isClassInstance(classInstance:any, className:any):boolean{
        return classInstance instanceof className
    }

    export function isDate(date: any): boolean {
        return Object.prototype.toString.call(date) === '[object Date]'
    }
    // function isDate(d) {
    //     return isObject(d) && objectToString(d) === '[object Date]';
    //   }

    /**
     * returns true if object but not array
     * @param o 
     */
    export function isObject(o: any): boolean {
        //return o === Object(o) && Object.prototype.toString.call(o) !== '[object Array]'
        return o === Object(o) && Object.prototype.toString.call(o) === '[object Object]'
    }

    // function isObject(arg) {
    //     return typeof arg === 'object' && arg !== null;
    //   }  
    export function isObjectWithKeys(o:any):boolean {
        return isObject(o) && Object.keys(o).length>0
    }

    function isIterableObject(o:any):boolean {
        return Object.prototype.toString.call(o) === '[object Object]'
    }


    export function isString(x: any): boolean {
        return typeof x === 'string'
    }

    export function isNumber(x: any): boolean {
        return typeof x === 'number'
    }

    export function isNullOrUndefined(x: any): boolean {
        return x == null
    }


    export function isBoolean(x: any): boolean {
        return typeof x === 'boolean'
    }

    export function isArray(x: any): boolean {
        return Array.isArray(x)
    }
  

    /**
     * primitive = boolean | number | string | symbol | undefined
     * @param x
     */
    export function isPrimitive(x: any): boolean {
        return x === null ||
            typeof x === 'boolean' ||
            typeof x === 'number' ||
            typeof x === 'string' ||
            typeof x === 'symbol' ||  // ES6 symbol
            typeof x === 'undefined';
    }


    /**
     * compare if two variable are the same
     * @param x any valid json-like object, not instance of some custom class
     * @param y any valid json-like object, not instance of some custom class
     */
    export function isEqual(x: any, y: any): boolean {
        if (x === y) return true
        if (isPrimitive(x)) {
            if (isPrimitive(y)) {
                return x === y
            }
            return false
        }
        if (isPrimitive(y)) return false
        if (typeof x !== typeof y) return false
        // so both are non-primitive here
        if (isDate(x) && isDate(y)) {
            return x.getTime() == y.getTime()
        }
        if (isArray(x) && isArray(y) && x.length == y.length) {
            for (let i = 0; i < x.length; i++) {
                if (isEqual(x[i], y[i]) == false) return false
            }
            return true
        }
        //if (isObject(x) && isObject(y) && isValidJsonObject(x) && isValidJsonObject(y)) {
        if(isIterableObject(x) && isIterableObject(y)){
            for (let [k, v] of Object.entries(x)) {
                if (isEqual(v, y[k]) == false) return false
            }
            return true
        }
        return false
    }

    /**
     * Return true if object contains another object
     * @param bigObject 
     * @param smallObject 
     */
    export function isObjectContainsObject(bigObject:Object, smallObject:Object):boolean{
        /*
            small = {a:'a', b:{b1:'b1'}}
            big =  {a:'a', b:{b1:'b1', b2:'b2'}, c:'c'}
        */
        if(isIterableObject(smallObject) && isIterableObject(bigObject)){
            //ok
        } else return false

        if(Object.entries(smallObject).length == 0) return true // {} is subObject of any other object
        for(let [smallKey, smallValue] of Object.entries(smallObject)){
            if(bigObject.hasOwnProperty(smallKey) == false) return false
            if(isIterableObject(smallValue)){
                // compare recursievly
                //console.log('[Data] iterable', smallValue, 'so recursive compare')
                if(isObjectContainsObject(bigObject[smallKey], smallValue) == false) return false
            } else {
                //console.log('[Data] compare by isEqual', smallValue, bigObject[smallKey])
                if(isEqual(smallValue, bigObject[smallKey]) == false) return false
            }
        }
        return true

   }


    /**
      * Returns a new object only with keys specified by predicate function
      * @param o 
      * @param keysToRemove 
      * @param recursive 
      */
    export function filterObjectByKeys(o: any, keysToCopy: (key: string) => boolean, recursive?: boolean): object {
        if (!o) throw new Error(`filterObjectByKeys failed, o=${o}`)
        if (isValidJsonObject(o) == false) {
            console.warn('filterObjectByKeys is trying to filter not a valid json object', 'o=', o)
        }
        try {
            //console.log('#### o=', o)
            if (isArray(o)) {
                return o.map(x => filterObjectByKeys(x, keysToCopy, recursive))
            }
            if (isDate(o)) {
                return o
            }
            if (isObject(o)) {
                let result: { [name: string]: any } = {}
                Object.entries(o).forEach(([key, value]) => {
                    if (keysToCopy(key)) {
                        // modify nested object first
                        if (recursive && value) {
                            //if(isObject(value) && !isDate(value)){
                            value = filterObjectByKeys(value, keysToCopy, recursive)
                            //}
                        }
                        //console.log('key=', key, 'value=', value)
                        result[key] = value
                        //console.log('result=', result)
                    }
                })
                return result
            }
            return o
        } catch (x) {
            console.error('filterObjectByKeys failed', 'o=', o)
            throw x;
        }
    }

    /**
     * Check if no instances of classes in object
     * @param json 
     */
    export function isValidJsonObject(json: any) {
        if (json === null || json === undefined) return true
        const typeName = json.constructor.name
        switch (typeName) {
            case 'Boolean':
            case 'Number':
            case 'String':
            case 'Date':
                return true
            case 'Object':
                //iterate object
                for (let [k, v] of Object.entries(json)) {
                    //log.message('k=', k, 'v=', v)
                    if (isValidJsonObject(v) == false) return false
                }
                return true
            case 'Array':
                // iterate array
                for (let v of json) {
                    if (isValidJsonObject(v) == false) return false
                }
                return true
            default: return false
        }
    }


    export function toJson(o:any){
        return JSON.parse(JSON.stringify(o))
    }


    export function isValueExistsInEnum(value:any, EnumType:any): boolean{
        for(let enumValue in EnumType){
            //console.log('enumValue=', enumValue, EnumType[enumValue])
            if(value == EnumType[enumValue]) return true
        }
        return false
    }







}