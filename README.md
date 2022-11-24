JWK Multibase Key Converter
=================

[![Version](https://img.shields.io/npm/v/jwk-multibase-key-converter.svg)](https://npmjs.org/package/jwk-multibase-key-converter)
[![Downloads/week](https://img.shields.io/npm/dw/jwk-multibase-key-converter.svg)](https://npmjs.org/package/jwk-multibase-key-converter)
[![License](https://img.shields.io/npm/l/jwk-multibase-key-converter.svg)](https://github.com/public-square/jwk-multibase-key-converter-js/blob/main/package.json)

## Information

This library is a tool to assist in the conversion of **did:key** method keys to JWK, and vice versa. It utilizes Multiformats to aid in these conversions and is built for JWKs made using the [JOSE library](https://github.com/panva/jose) (but should work with JWKs that meet the standard).

For more information on the **did:key** spec, please read the current unofficial draft [here](https://w3c-ccg.github.io/did-method-key/).

Currently, the only support curves are as follows:

 - secp256k1

## Installation

You can install this library via NPM :

`npm i jwk-multibase-key-converter`

## Generating a JWK

We recommend using the [JOSE library](https://github.com/panva/jose) to create it. Install it using:

`npm i jose`

and then you should be able to create a JWK using this code:

```javascript
import * as jose from 'jose';

// set the algorithm
const alg = 'ES256K';
// This generates a secp256k1 private and public key (kty, crv, d, x, y)
const { publicKey, privateKey } = await generateKeyPair(alg, {
    extractable: true,
});
// this exports the public key as a JWK
const jwk = await exportJWK(publicKey);
```

## Converting a JWK to a Multibase Key or did:key

This is an ECMAScript module so it is included using the `import` keyword.
Import the `jwkToMbase` and `jwkToDidKey` functions to convert your JWK to a Multibase string and did:key respectively.

You can convert it using this code:

```javascript
import * as jose from 'jose';
// import the necessary functions
import { jwkToMbase, jwkToDidKey } from 'jwk-multibase-key-converter';

const alg = 'ES256K';
const { publicKey, privateKey } = await generateKeyPair(alg, {
    extractable: true,
});
const jwk = await exportJWK(publicKey);

// this converts your jwk to a multibase string
const mbase = jwkToMbase(jwk);

// this converts your jwk to a did:key
const didKey = jwkToDidKey(jwk);
```

## Converting a Multibase Key or did:key to a Public JWK

This is an ECMAScript module so it is included using the `import` keyword.
Import the `mbaseToJwk` and `didKeyToMbase` functions to convert your Multibase string or did:key to a JWK respectively.
You will need to specify the algorithm as the second parameter.
This will match with the algorithm string required by JOSE to generate a JWK.
Current options are:

 - `ES256K`: for the secp256k1 curve

You can convert it using this code:

```javascript
import * as jose from 'jose';
// import the necessary functions
import { jwkToMbase, jwkToDidKey, mbaseToJwk, didKeyToMbase } from 'jwk-multibase-key-converter';

const alg = 'ES256K';
const { publicKey, privateKey } = await generateKeyPair(alg, {
    extractable: true,
});
const jwk = await exportJWK(publicKey);

const mbase = jwkToMbase(jwk);
const didKey = jwkToDidKey(jwk);

// this converts the multibase string to a JWK, you need to specify the algorithm
const mJwk = mbaseToJwk(mbase, alg);
// this converts the did:key to a JWK, you need to specify the algorithm
const dJwk = didKeyToJwk(didKey, alg);
```

## Importing Algorithm-specific functions

If you are only using a specific algorithm and want to only import those functions you can by appending the algorithm string as the path and specify `toJwk` or `toMbase`.
For instance, if you wanted to work with only secp256k1 keys, you would append `ES256K` like so:

`import { toJwk, toMbase } from 'jwk-multibase-key-converter/ES256K'`

Every supported algorithm will have these 2 functions:

1. `toMbase(x: string, y: string)`: this accepts the `x` and `y` values of the JWK and returns the multibase string version
1. `toJwk(mbase: string)`: this accepts a multibase string and returns the JWK version

It is recommended to use the default root level functions however, because they include validation steps and feedback.

## Contribute

Please open a pull request.

## License

This software is release under [MIT license](LICENSE).
