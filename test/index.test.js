import * as jmkc from "../"

// establish test values
const testAlg = 'ES256K';
const testMbase = 'zQ3shokFTS3brHcDQrn82RUDfCZESWL1ZdCEJwekUDPQiYBme';
const testJwk = {
    'kty': 'EC',
    'crv': 'secp256k1',
    'x': 'h0wVx_2iDlOcblulc8E5iEw1EYh5n1RYtLQfeSTyNc0',
    'y': 'O2EATIGbu6DezKFptj5scAIRntgfecanVNXxat1rnwE'
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
