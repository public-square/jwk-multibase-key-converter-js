import * as es256k from './converters/ES256K.js'
import * as es384 from './converters/ES384.js'
import * as ut from './utils.js'

// these are the currently supported algorithms
type alg = 'ES256K' | 'ES384'

/**
 * This function accepts a JSON Web Key,
 * validates it, and converts it to a multibase encoded
 * string if it is using a supported algorithm
 *
 * @param jwk a JSON Web Key
 * @returns a multibase encoded version of the key
 */
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
        case 'P-384':
            mbase = es384.toMbase(x, y);
            break;
        default:
            throw new Error(validJwk.crv + " is not a supported algorithm");
            break;
    }

    return mbase;
}

/**
 * This functions accepts a multibase string,
 * validates it, and converts it to a JSON Web Key.
 *
 * @param mbase a multibase encoded key
 * @param alg the algorithm that the key uses
 * @returns a JSON Web Key version of the key
 */
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
        case 'ES384':
            jwk = es384.toJwk(mbase);
            break;
        default:
            throw new Error(alg + " is not a supported algorithm");
            break;
    }

    return jwk;
}

/**
 * This function accepts a JSON Web Key,
 * validates it, and converts it to a did:key
 * string if it is using a supported algorithm
 *
 * @param jwk a JSON Web Key
 * @returns a did:key version of the key
 */
function jwkToDidKey(jwk: JsonWebKey): string {
    // generate mbase string
    const mbase = jwkToMbase(jwk);

    // return with did key prefix
    return 'did:key:' + mbase
}

/**
 * This functions accepts a did:key string,
 * validates it, and converts it to a JSON Web Key.
 *
 * @param didKey a did:key string
 * @param alg the algorithm that the key uses
 * @returns a JSON Web Key version of the key
 */
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
