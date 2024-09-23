"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var DataTypes;
(function (DataTypes) {
    function isFunction(x) {
        return typeof x === 'function';
    }
    DataTypes.isFunction = isFunction;
    function isClass(x) {
        //console.log('x.toString()=', x.toString())
        return typeof x === 'function' && /^\s*class\s+/.test(x.toString());
    }
    DataTypes.isClass = isClass;
    function isClassInstance(classInstance, className) {
        return classInstance instanceof className;
    }
    DataTypes.isClassInstance = isClassInstance;
    function isDate(date) {
        return Object.prototype.toString.call(date) === '[object Date]';
    }
    DataTypes.isDate = isDate;
    // function isDate(d) {
    //     return isObject(d) && objectToString(d) === '[object Date]';
    //   }
    /**
     * returns true if object but not array
     * @param o
     */
    function isObject(o) {
        //return o === Object(o) && Object.prototype.toString.call(o) !== '[object Array]'
        return o === Object(o) && Object.prototype.toString.call(o) === '[object Object]';
    }
    DataTypes.isObject = isObject;
    // function isObject(arg) {
    //     return typeof arg === 'object' && arg !== null;
    //   }  
    function isObjectWithKeys(o) {
        return isObject(o) && Object.keys(o).length > 0;
    }
    DataTypes.isObjectWithKeys = isObjectWithKeys;
    function isIterableObject(o) {
        return Object.prototype.toString.call(o) === '[object Object]';
    }
    function isString(x) {
        return typeof x === 'string';
    }
    DataTypes.isString = isString;
    function isNumber(x) {
        return typeof x === 'number';
    }
    DataTypes.isNumber = isNumber;
    function isNullOrUndefined(x) {
        return x == null;
    }
    DataTypes.isNullOrUndefined = isNullOrUndefined;
    function isBoolean(x) {
        return typeof x === 'boolean';
    }
    DataTypes.isBoolean = isBoolean;
    function isArray(x) {
        return Array.isArray(x);
    }
    DataTypes.isArray = isArray;
    /**
     * primitive = boolean | number | string | symbol | undefined
     * @param x
     */
    function isPrimitive(x) {
        return x === null ||
            typeof x === 'boolean' ||
            typeof x === 'number' ||
            typeof x === 'string' ||
            typeof x === 'symbol' || // ES6 symbol
            typeof x === 'undefined';
    }
    DataTypes.isPrimitive = isPrimitive;
    /**
     * compare if two variable are the same
     * @param x any valid json-like object, not instance of some custom class
     * @param y any valid json-like object, not instance of some custom class
     * @param options {ignoreCaseInStrings:boolean} - ignore case in strings and in string-values for objects
     */
    function isEqual(x, y, options) {
        var e_1, _a;
        var _b;
        if (x === y)
            return true;
        if (isPrimitive(x)) {
            if (isPrimitive(y)) {
                if (typeof x === 'string' && typeof y === 'string' && ((_b = options) === null || _b === void 0 ? void 0 : _b.ignoreCaseInStrings)) {
                    return x.toLocaleLowerCase() === y.toLocaleLowerCase();
                }
                return x === y;
            }
            return false;
        }
        if (isPrimitive(y))
            return false;
        if (typeof x !== typeof y)
            return false;
        // so both are non-primitive here
        if (isDate(x) && isDate(y)) {
            return x.getTime() == y.getTime();
        }
        if (isArray(x) && isArray(y) && x.length == y.length) {
            for (var i = 0; i < x.length; i++) {
                if (isEqual(x[i], y[i]) == false)
                    return false;
            }
            return true;
        }
        //if (isObject(x) && isObject(y) && isValidJsonObject(x) && isValidJsonObject(y)) {
        if (isIterableObject(x) && isIterableObject(y)) {
            if (Object.keys(x).length !== Object.keys(y).length)
                return false;
            try {
                for (var _c = __values(Object.entries(x)), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var _e = __read(_d.value, 2), k = _e[0], v = _e[1];
                    if (isEqual(v, y[k], options) == false)
                        return false;
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return true;
        }
        return false;
    }
    DataTypes.isEqual = isEqual;
    /**
     * Check if object contains another object
     * @param {Object} p options
     * @param {Object} p.bigObject
     * @param {Object} p.smallObject
     * @param {boolean|undefined} p.ignoreCaseInStringValues
     * @param {boolean|undefined} p.ignoreEmptySmallObject when true, function returns false if small object is empty
     */
    function isObjectContainsObject(p) {
        var e_2, _a;
        var _b;
        /*
            small = {a:'a', b:{b1:'b1'}}
            big =  {a:'a', b:{b1:'b1', b2:'b2'}, c:'c'}
        */
        if (isIterableObject(p.smallObject) && isIterableObject(p.bigObject)) {
            //ok
        }
        else
            return false;
        if (Object.entries(p.smallObject).length == 0) { // empty object
            if (p.ignoreEmptySmallObject) {
                return false;
            }
            return true; // empty object is subObject of any other object
        }
        try {
            for (var _c = __values(Object.entries(p.smallObject)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var _e = __read(_d.value, 2), smallKey = _e[0], smallValue = _e[1];
                if (p.bigObject.hasOwnProperty(smallKey) == false)
                    return false;
                if (isIterableObject(smallValue)) {
                    // compare recursievly
                    //console.log('[Data] iterable', smallValue, 'so recursive compare')
                    if (isObjectContainsObject({
                        bigObject: p.bigObject[smallKey],
                        smallObject: smallValue,
                        ignoreCaseInStringValues: p.ignoreCaseInStringValues,
                        ignoreEmptySmallObject: p.ignoreEmptySmallObject
                    }) === false)
                        return false;
                }
                else {
                    //console.log('[Data] compare by isEqual', smallValue, bigObject[smallKey])
                    if (isEqual(smallValue, p.bigObject[smallKey], { ignoreCaseInStrings: (_b = p.ignoreCaseInStringValues, (_b !== null && _b !== void 0 ? _b : false)) }) === false)
                        return false;
                }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return true;
    }
    DataTypes.isObjectContainsObject = isObjectContainsObject;
    /**
      * Returns a new object only with keys specified by predicate function
      * @param o
      * @param keysToRemove
      * @param recursive
      */
    function filterObjectByKeys(o, keysToCopy, recursive) {
        if (!o)
            throw new Error("filterObjectByKeys failed, o=" + o);
        if (isValidJsonObject(o) == false) {
            console.warn('filterObjectByKeys is trying to filter not a valid json object', 'o=', o);
        }
        try {
            //console.log('#### o=', o)
            if (isArray(o)) {
                return o.map(function (x) { return filterObjectByKeys(x, keysToCopy, recursive); });
            }
            if (isDate(o)) {
                return o;
            }
            if (isObject(o)) {
                var result_1 = {};
                Object.entries(o).forEach(function (_a) {
                    var _b = __read(_a, 2), key = _b[0], value = _b[1];
                    if (keysToCopy(key)) {
                        // modify nested object first
                        if (recursive && value) {
                            //if(isObject(value) && !isDate(value)){
                            value = filterObjectByKeys(value, keysToCopy, recursive);
                            //}
                        }
                        //console.log('key=', key, 'value=', value)
                        result_1[key] = value;
                        //console.log('result=', result)
                    }
                });
                return result_1;
            }
            return o;
        }
        catch (x) {
            console.error('filterObjectByKeys failed', 'o=', o);
            throw x;
        }
    }
    DataTypes.filterObjectByKeys = filterObjectByKeys;
    /**
     * Check if no instances of classes in object
     * @param json
     */
    function isValidJsonObject(json) {
        var e_3, _a, e_4, _b;
        if (json === null || json === undefined)
            return true;
        var typeName = json.constructor.name;
        switch (typeName) {
            case 'Boolean':
            case 'Number':
            case 'String':
            case 'Date':
                return true;
            case 'Object':
                try {
                    //iterate object
                    for (var _c = __values(Object.entries(json)), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var _e = __read(_d.value, 2), k = _e[0], v = _e[1];
                        //log.message('k=', k, 'v=', v)
                        if (isValidJsonObject(v) == false)
                            return false;
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                return true;
            case 'Array':
                try {
                    // iterate array
                    for (var json_1 = __values(json), json_1_1 = json_1.next(); !json_1_1.done; json_1_1 = json_1.next()) {
                        var v = json_1_1.value;
                        if (isValidJsonObject(v) == false)
                            return false;
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (json_1_1 && !json_1_1.done && (_b = json_1.return)) _b.call(json_1);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                return true;
            default: return false;
        }
    }
    DataTypes.isValidJsonObject = isValidJsonObject;
    function toJson(o) {
        return JSON.parse(JSON.stringify(o));
    }
    DataTypes.toJson = toJson;
    function isValueExistsInEnum(value, EnumType) {
        for (var enumValue in EnumType) {
            //console.log('enumValue=', enumValue, EnumType[enumValue])
            if (value == EnumType[enumValue])
                return true;
        }
        return false;
    }
    DataTypes.isValueExistsInEnum = isValueExistsInEnum;
})(DataTypes = exports.DataTypes || (exports.DataTypes = {}));
