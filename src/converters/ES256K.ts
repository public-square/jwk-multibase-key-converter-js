import * as ut from "../utils.js"
import { ECDH } from "crypto"

const algPrefix = 'e701';

/**
 *
 * @param x
 * @param y
 * @returns
 */
function toMbase(x: string, y: string): string {
    // check if y is even
    const isYEven = ut.isBase64Even(y);

    // assemble compressed key by adding alg specific prefix, Y is even indicator and converting to hex
    const compressed = algPrefix + (isYEven ? '02' : '03') + ut.base64ToHex(x);

    // convert to multibase
    const mbase = ut.compressedToMbase(compressed);

    return mbase;
}

function toJwk(mbase: string): JsonWebKey {
    // setup empty jwk
    const jwk = {
        x: '',
        y: '',
        kty: 'EC',
        crv: 'secp256k1'
    }

    // get compressed key from mbase encoding
    const compressed = ut.mbaseToCompressed(mbase);

    // use crypto lib to generate uncompressed key ('04' + x + y) from compressed key (without mbase prefix)
    const uncompressedKey = ECDH.convertKey(compressed.replace(algPrefix,''),
        'secp256k1', 'hex', 'base64url', 'uncompressed').toString();

    // remove prefix indicating this is an uncompressed key
    const keyBuffer = Buffer.from(uncompressedKey, 'base64url');
    const trimmedUncompressedKey = keyBuffer.slice(1);

    // first half is x, second half is y
    jwk.x = trimmedUncompressedKey.slice(0, trimmedUncompressedKey.length / 2).toString('base64url');
    jwk.y = trimmedUncompressedKey.slice(trimmedUncompressedKey.length / 2).toString('base64url');

    return jwk;
}

export {
    toMbase, toJwk
}
