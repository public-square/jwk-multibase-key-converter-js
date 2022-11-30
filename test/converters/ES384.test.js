import { toJwk, toMbase } from "../../lib/converters/ES384.js"

// establish test values
const testAlg = 'ES384';
const testMbase = 'z82Lm1MpAkeJcix9K8TMiLd5NMAhnwkjjCBeWHXyu3U4oT2MVJJKXkcVBgjGhnLBn2Kaau9';
const testJwk = {
    'kty': 'EC',
    'crv': 'P-384',
    'x': 'lInTxl8fjLKp_UCrxI0WDklahi-7-_6JbtiHjiRvMvhedhKVdHBfi2HCY8t_QJyc',
    'y': 'y6N1IC-2mXxHreETBW7K3mBcw0qGr3CWHCs-yl09yCQRLcyfGv7XhqAngHOu51Zv',
}

// test mbase to JWK
test('ES384 Multibase to JWK', () => {
    const newJwk = toJwk(testMbase);

    expect(newJwk).toStrictEqual(testJwk)
})

// test JWK to mbase
test('ES384 JWK to Multibase', () => {
    const newMbase = toMbase(testJwk.x, testJwk.y);

    expect(newMbase).toStrictEqual(testMbase)
})
