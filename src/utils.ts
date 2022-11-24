import BigNumber from "bignumber.js";
import { base58btc } from "multiformats/bases/base58";

interface ValidatedJwk {
    x: string,
    y: string,
    crv: string
}

function base64ToHex(str64: string): string {
    const hex = Buffer.from(str64, 'base64url').toString('hex');

    return hex;
}

function hexToBase64Url(hex: string): string {
    const str64 = Buffer.from(hex, 'hex').toString('base64url');

    return str64;
}

function base64ToBig(str64: string): BigNumber {
    const hex = base64ToHex(str64);
    const big = new BigNumber(hex, 16);

    return big;
}

function isBase64Even(str64: string): boolean {
    const hex = base64ToHex(str64);
    const big = new BigNumber(hex, 16);
    const isEven = big.modulo(2).eq(0);

    return isEven;
}

function compressedToMbase(compressed: string): string {
    const mbase = base58btc.encode(Buffer.from(compressed, 'hex'));

    return mbase;
}

function mbaseToCompressed(mbase: string): string {
    const compressed = Buffer.from(base58btc.decode(mbase)).toString('hex');

    return compressed;
}

function validateJwk(jwk: JsonWebKey): false | ValidatedJwk {
    // run basic null checks
    if (typeof jwk.x === 'undefined' ||
        typeof jwk.y === 'undefined' ||
        typeof jwk.crv === 'undefined'
    ) {
        return false;
    }

    // try base64 conversion
    try {
        base64ToHex(jwk.x);
        base64ToHex(jwk.y);
    } catch (error) {
        return false;
    }

    return {
        x: jwk.x,
        y: jwk.y,
        crv: jwk.crv
    };
}


function validateMbase(mbase: string): false | string {
    // run basic null checks
    if (typeof mbase === 'undefined' ||
        mbase === ''
    ) {
        return false;
    }

    return mbase;
}

export {
    base64ToHex,
    hexToBase64Url,
    base64ToBig,
    isBase64Even,
    compressedToMbase,
    mbaseToCompressed,
    validateJwk,
    validateMbase
}
