export type AllKeys<T> = T extends unknown ? keyof T : never;
export type UniqueKeys<T, U extends T = T> = T extends unknown ? Exclude<keyof T, AllKeys<Exclude<U, T>>> : never
export type FilterByKnownKey<T, K extends PropertyKey> = T extends unknown ? K extends keyof T ? T : never : never;
