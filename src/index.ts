import * as es256k from './converters/ES256K.js'
import * as ut from './utils.js'

type alg = 'ES256K'

function jwkToMbase(jwk: JsonWebKey): string {
    // validate jwk
    const validJwk = ut.validateJwk(jwk);
    if (validJwk === false) {
        throw new Error("Invalid JWK");
    }

    // set key values to convert
    const x = validJwk.x;
    const y = validJwk.y;

    // convert jwk using crv specific function
    let mbase = '';
    switch (validJwk.crv) {
        case 'secp256k1':
            mbase = es256k.toMbase(x, y);
            break;
        default:
            throw new Error(validJwk.crv + " is not a supported algorithm");
            break;
    }

    return mbase;
}

function mbaseToJwk(mbase: string, alg: alg): JsonWebKey {
    // validate mbase
    const validMbase = ut.validateMbase(mbase);
    if (validMbase === false) {
        throw new Error("Invalid JWK");
    }

    // convert jwk using alg specific function
    let jwk: JsonWebKey;
    switch (alg) {
        case 'ES256K':
            jwk = es256k.toJwk(mbase);
            break;
        default:
            throw new Error(alg + " is not a supported algorithm");
            break;
    }

    return jwk;
}

function jwkToDidKey(jwk: JsonWebKey): string {
    // generate mbase string
    const mbase = jwkToMbase(jwk);

    // return with did key prefix
    return 'did:key:' + mbase
}

function didKeyToJwk(didKey: string, alg: alg): JsonWebKey {
    // strip did key prefix
    const mbase = didKey.replace('did:key:', '');

    // convert to jwk
    const jwk = mbaseToJwk(mbase, alg);

    return jwk;
}

export {
    jwkToMbase,
    mbaseToJwk,
    jwkToDidKey,
    didKeyToJwk
}
