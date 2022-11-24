import { toJwk, toMbase } from "../../lib/converters/ES256K.js"

// establish test values
const testAlg = 'ES256K';
const testMbase = 'zQ3shRMUDsuR12dhT5zysSQ54ek54prn7sSbXmrosdBGJ4eaF';
const testJwk = {
    kty: 'EC',
    x: 'OpUMi44Gxsm1-gaOdLN8t0o_Qn8zlPj9ewCC1_mK-SQ',
    y: 'zivOA9VjtGpv4D3irg6Wzo__onTZ5BAcGu2-eLgo_ug',
    crv: 'secp256k1'
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
