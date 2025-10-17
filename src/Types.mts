
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





