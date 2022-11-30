import { toJwk, toMbase } from "../../lib/converters/ES256K.js"

// establish test values
const testAlg = 'ES256K';
const testMbase = 'zQ3shtxV1FrJfhqE1dvxYRcCknWNjHc3c5X1y3ZSoPDi2aur2';
const testJwk = {
    'kty': 'EC',
    'crv': 'secp256k1',
    'x': '1LjPGVO9OOqfeaUcT9S-Ml_5wQOybbSQ0SGgMgG9U0M',
    'y': 'aq-OS5tX6WqaY6fDHtATYwbIUijr8PvcGWd-FnCNQBM'
}

// test mbase to JWK
test('ES256K Multibase to JWK', () => {
    const newJwk = toJwk(testMbase);

    expect(newJwk).toStrictEqual(testJwk)
})

// test JWK to mbase
test('ES256K JWK to Multibase', () => {
    const newMbase = toMbase(testJwk.x, testJwk.y);

    expect(newMbase).toStrictEqual(testMbase)
})
