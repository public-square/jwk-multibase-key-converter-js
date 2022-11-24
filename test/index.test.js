import * as jmkc from "../"

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
test('General Multibase to JWK', () => {
    const newJwk = jmkc.mbaseToJwk(testMbase, testAlg);

    expect(newJwk).toStrictEqual(testJwk)
})

// test did:key to JWK
test('General did:key to JWK', () => {
    const newJwk = jmkc.didKeyToJwk('did:key:' + testMbase, testAlg);

    expect(newJwk).toStrictEqual(testJwk)
})

// test JWK to mbase
test('General JWK to Multibase', () => {
    const newMbase = jmkc.jwkToMbase(testJwk);

    expect(newMbase).toStrictEqual(testMbase)
})

// test JWK to did:key
test('General JWK to did:key', () => {
    const newDidKey = jmkc.jwkToDidKey(testJwk);

    expect(newDidKey).toStrictEqual('did:key:' + testMbase)
})
