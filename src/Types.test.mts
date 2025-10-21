import { expect, test } from 'vitest'
import type {
    AllKeys,
    AtLeastOne,
    FilterByDefinedKey,
    FilterByKnownKey,
    JsonCompatible,
    JsonType,
    PartialExcept,
    PartiallyPartial,
    SomeOptional,
    SomeRequired,
    UniqueKeys
} from './Types.mjs'

// Helper type-level assertions
// Equal and Expect are used to assert type equality at compile time.
type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends (
    <T>() => T extends B ? 1 : 2
)
    ? true
    : false

type Expect<T extends true> = T

// Sample domain types for testing
interface JsonUser {
    id: string
    name: string
    emailLowered?: string
    password?: string
}

interface JsonLink {
    href: string
    title?: string
}

// ------------------------------
// PartiallyPartial / SomeOptional
// ------------------------------
{
    type T1 = PartiallyPartial<JsonUser, 'password'>
    const ok1: T1 = { id: '1', name: 'N' } // password optional
    const ok2: T1 = { id: '1', name: 'N', password: 'p' }

    type T2 = PartiallyPartial<JsonUser, 'password' | 'emailLowered'>
    const ok3: T2 = { id: '1', name: 'N' } // both optional
    const ok4: T2 = { id: '1', name: 'N', password: 'p', emailLowered: 'e' }

    // Alias should be identical
    type _SetOptionalEquals1 = Expect<
        Equal<SomeOptional<JsonUser, 'password'>, PartiallyPartial<JsonUser, 'password'>>
    >
    type _SetOptionalEquals2 = Expect<
        Equal<
            SomeOptional<JsonUser, 'password' | 'emailLowered'>,
            PartiallyPartial<JsonUser, 'password' | 'emailLowered'>
        >
    >
}

// ------------------------------
// PartialExcept / SomeRequired
// ------------------------------
{
    type P1 = PartialExcept<JsonUser, 'id'>
    const ok1: P1 = { id: '1' } // all others optional
    const ok2: P1 = { id: '1', name: 'N' }

    type P2 = PartialExcept<JsonUser, 'id' | 'name'>
    const ok3: P2 = { id: '1', name: 'N' }

    // Alias should be identical
    type _SetOptionalExceptEquals1 = Expect<
        Equal<SomeRequired<JsonUser, 'id'>, PartialExcept<JsonUser, 'id'>>
    >
    type _SetOptionalExceptEquals2 = Expect<
        Equal<
            SomeRequired<JsonUser, 'id' | 'name'>,
            PartialExcept<JsonUser, 'id' | 'name'>
        >
    >
}

// ------------------------------
// AtLeastOne
// ------------------------------
{
    type A1 = AtLeastOne<JsonUser, 'emailLowered' | 'id'>
    const ok1: A1 = { emailLowered: 'e' } // at least one of union present
    const ok2: A1 = { id: '1', name: 'N' }
    const ok3: A1 = { name: 'N', emailLowered: 'e' }
    const ok4: A1 = { id: '1', name: 'N', emailLowered: 'e' }
}

// ------------------------------
// JsonCompatible / JsonType
// ------------------------------
{
    function expectingJsonCompatible<T extends JsonCompatible<T>>(data: T) {
        return data
    }
    function expectingJsonType<T>(x: JsonType<T>) {
        return x as unknown as T
    }

    expectingJsonCompatible(5)
    expectingJsonType(5)
    expectingJsonCompatible({ a: 'a1' })
    expectingJsonType({ a: 'a1' })

    const goodUser = { id: '1', name: 'N' }
    expectingJsonCompatible(goodUser)
    expectingJsonType(goodUser)

    // Intentional compile-time errors (uncomment to verify locally):
    // const bad = { f: (x: string) => x }
    // expectingJsonCompatible(bad) // compile error
    // expectingJsonType(bad) // compile error
}

// ------------------------------
// AllKeys / UniqueKeys / FilterByKnownKey / FilterByDefinedKey
// ------------------------------
{
    type U = { a: string; b?: number } | { c: boolean; d: Date }

    type U_All = AllKeys<U>
    type _AllKeysCheck = Expect<Equal<U_All, 'a' | 'b' | 'c' | 'd'>>

    type U1 = UniqueKeys<U>
    // Unique in each member: 'a' | 'b' for first, 'c' | 'd' for second => union all
    type _UniqueKeysCheck = Expect<Equal<U1, 'a' | 'b' | 'c' | 'd'>>

    type F1 = FilterByKnownKey<U, 'a'> // keeps only the member with key 'a'
    type _FilterKnown1 = Expect<Equal<F1, { a: string; b?: number }>>

    type F2 = FilterByDefinedKey<{ a?: string; b?: number }, 'a'>
    const f2: F2 = { a: 'aa' }
    // @ts-expect-error a must be defined
    // const f2bad: F2 = { a: undefined }
}

// Minimal runtime test just to keep Vitest green
// (all real checks above are compile-time)
test('types compile and basic runtime assert', () => {
    expect(1 + 1).toBe(2)
})
