JWK Multibase Key Converter
=================

[![Version](https://img.shields.io/npm/v/jwk-multibase-key-converter.svg)](https://npmjs.org/package/jwk-multibase-key-converter)
[![Downloads/week](https://img.shields.io/npm/dw/jwk-multibase-key-converter.svg)](https://npmjs.org/package/jwk-multibase-key-converter)
[![License](https://img.shields.io/npm/l/jwk-multibase-key-converter.svg)](https://github.com/public-square/jwk-multibase-key-converter-js/blob/main/package.json)

## Information

This library is a tool to assist in the conversion of **did:key** method keys to JWK, and vice versa. It utilizes Multiformats and the NodeJS crypto module to aid in these conversions and is built for JWKs made using the [JOSE library](https://github.com/panva/jose) (but should work with JWKs that meet the standard). All algorithm strings follow the JOSE specified names that can be found [here](https://github.com/panva/jose/blob/main/src/runtime/node/generate.ts#L42).

For more information on the **did:key** spec, please read the current unofficial draft [here](https://w3c-ccg.github.io/did-method-key/).

Currently, the only supported curves are as follows:

 - secp256k1 (specified as the `ES256K` algorithm)
 - nistp384 (specified as `ES384` algorithm)

## Requirements
- NodeJS v16+
- NPM v8+

## Installation

You can install this library via NPM :

`npm i jwk-multibase-key-converter`


## How It Works
- Public JWK Generation
  - [Generating a Public Key](docs/examples/jwk_generation.md)
- Multibase Conversion
  - [Converting a Multibase Key to a Public JWK](docs/examples/multibase_conversion.md)
- **did:key** Conversion
  - [Converting a did:key to a Public JWK](docs/examples/didkey_conversion.md)
- Public JWK Conversion
  - [Converting a Public JWK to a Multibase Key](docs/examples/jwk_to_mbase.md)
  - [Converting a Public JWK to a did:key](docs/examples/jwk_to_didkey.md)
- Algorithm-specific Functions
  - [Importing Algorithm-specific functions](docs/examples/algo_specific_functions.md)

## Contribute

Please open a pull request.

## License

This software is release under [MIT license](LICENSE).
