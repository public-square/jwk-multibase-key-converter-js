## Generating a Public JWK

We recommend using the [JOSE library](https://github.com/panva/jose) to create the JWK. Install it using:

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
