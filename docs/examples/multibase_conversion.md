## Converting a Multibase Key to a Public JWK

The following code shows the complete roundabout for generation, PubKey to multibase key, and multibase key back to Public JWK.

This is an ECMAScript module so it is included using the `import` keyword.
Import the `mbaseToJwk` function to convert your Multibase string to a JWK.
You will need to specify the algorithm as the second parameter.
This will match with the algorithm string required by JOSE to generate a JWK.
Current options are:

 - `ES256K`: for the secp256k1 curve
 - `ES384`: for the nistp384 curve

You can convert it using this code:

```javascript
import * as jose from 'jose';
// import the necessary functions
import { jwkToMbase, mbaseToJwk } from 'jwk-multibase-key-converter';

// create the JWK
const alg = 'ES256K';
const { publicKey, privateKey } = await generateKeyPair(alg, {
    extractable: true,
});
const jwk = await exportJWK(publicKey);
// convert it to a multibase string
const mbase = jwkToMbase(jwk);

// this converts the multibase string to a JWK, you need to specify the algorithm
const mJwk = mbaseToJwk(mbase, alg);
```
