export declare namespace DataTypes {
    function isFunction(x: any): boolean;
    function isClass(x: any): boolean;
    function isClassInstance(classInstance: any, className: any): boolean;
    function isDate(date: any): boolean;
    /**
     * returns true if object but not array
     * @param o
     */
    function isObject(o: any): boolean;
    function isObjectWithKeys(o: any): boolean;
    function isString(x: any): boolean;
    function isNumber(x: any): boolean;
    function isNullOrUndefined(x: any): boolean;
    function isBoolean(x: any): boolean;
    function isArray(x: any): boolean;
    /**
     * primitive = boolean | number | string | symbol | undefined
     * @param x
     */
    function isPrimitive(x: any): boolean;
    /**
     * compare if two variable are the same
     * @param x any valid json-like object, not instance of some custom class
     * @param y any valid json-like object, not instance of some custom class
     * @param options {ignoreCaseInStrings:boolean} - ignore case in strings and in string-values for objects
     */
    function isEqual(x: any, y: any, options?: {
        ignoreCaseInStrings: boolean;
    }): boolean;
    /**
     * Check if object contains another object
     * @param {Object} p options
     * @param {Object} p.bigObject
     * @param {Object} p.smallObject
     * @param {boolean|undefined} p.ignoreCaseInStringValues
     * @param {boolean|undefined} p.ignoreEmptySmallObject when true, function returns false if small object is empty
     */
    function isObjectContainsObject(p: {
        bigObject: Object;
        smallObject: Object;
        ignoreCaseInStringValues?: boolean;
        ignoreEmptySmallObject?: boolean;
    }): boolean;
    /**
      * Returns a new object only with keys specified by predicate function
      * @param o
      * @param keysToRemove
      * @param recursive
      */
    function filterObjectByKeys(o: any, keysToCopy: (key: string) => boolean, recursive?: boolean): object;
    /**
     * Check if no instances of classes in object
     * @param json
     */
    function isValidJsonObject(json: any): boolean;
    function toJson(o: any): any;
    function isValueExistsInEnum(value: any, EnumType: any): boolean;
}
