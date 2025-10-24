
export type AllKeys<T> = T extends unknown ? keyof T : never;
export type UniqueKeys<T, U extends T = T> = T extends unknown ? Exclude<keyof T, AllKeys<Exclude<U, T>>> : never
export type FilterByKnownKey<T, K extends PropertyKey> = T extends unknown ? K extends keyof T ? T : never : never;
export type FilterByDefinedKey<T, K extends PropertyKey> = T extends unknown 
    ? K extends keyof T 
        ? T & { [P in K]-?: Exclude<T[P], undefined> }
        : never 
    : never;

export type AnyJsonValue =
    | string
    | number
    | boolean
    | null
    | Date
    | { readonly [K in string]: AnyJsonValue }
    | Array<AnyJsonValue>
    | undefined

type NotAssignableToJson = 
    | bigint 
    | symbol 
    | Function;


// (c) https://hackernoon.com/mastering-type-safe-json-serialization-in-typescript
export type JsonCompatible<T> = unknown extends T 
    ? never 
    : { [P in keyof T]: 
        T[P] extends AnyJsonValue 
            ? T[P] 
            : T[P] extends NotAssignableToJson 
                ? never 
                : JsonCompatible<T[P]>;
    };


export type JsonType<T> = T extends AnyJsonValue ? T : never;



/**
 * Make some fields of an object optional, but keep the rest of the object as is.
 * 
 * use like this:
 * PartiallyPartial<JsonUser, 'password'>
 * PartiallyPartial<JsonUser, 'password' | 'emailLowered'>
 * 
 * Alias for SomeOptional<T, K>
 */
export type PartiallyPartial<T, K extends keyof T> =
  T extends unknown
    ? Pick<Partial<T>, Extract<K, keyof T>> & Omit<T, Extract<K, keyof T>>
    : never;
/**
 * Make some fields of an object optional, but keep the rest of the object as is.
 * 
 * use like this:
 * SomeOptional<JsonUser, 'id'>
 * SomeOptional<JsonUser, 'emailLowered' | 'id'>
 * 
 * Alias for PartiallyPartial<T, K>
 */
export type SomeOptional<T, K extends keyof T> = PartiallyPartial<T, K>;

/**
 * Make all fields optional except a specified subset required.
 * 
 * use like this:
 * PartialExcept<JsonUser, 'id'>
 * PartialExcept<JsonUser, 'emailLowered' | 'id'>
 * 
 * Alias for SomeRequired<T, K>
 */
export type PartialExcept<T, K extends keyof T> =
  T extends unknown
    ? Required<Pick<T, Extract<K, keyof T>>> & Partial<Omit<T, Extract<K, keyof T>>>
    : never;
/**
 * Make all fields optional except a specified subset required.
 * 
 * use like this:
 * SomeRequired<JsonUser, 'id'>
 * SomeRequired<JsonUser, 'emailLowered' | 'id'>
 * 
 * Alias for PartialExcept<T, K>
 */
export type SomeRequired<T, K extends keyof T> = PartialExcept<T, K>;


/**
 * Make at least one field required and all other fields optional.
 * 
 * use like this: 
 * AtLeastOne<JsonUser, 'emailLowered'>
 * AtLeastOne<JsonUser, 'emailLowered' | 'id'>
 */
export type AtLeastOne<T, K extends keyof T> =
  T extends unknown
    ? [Extract<K, keyof T>] extends [never]
      ? never
      : K extends any
        ? Required<Pick<T, Extract<K, keyof T>>> & Partial<Omit<T, Extract<K, keyof T>>>
        : never
    : never;


