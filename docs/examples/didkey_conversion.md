## Converting a did:key to a Public JWK

The following code shows the complete roundabout for generation, PubKey to **did:key**, and did:key back to Public JWK.

This is an ECMAScript module so it is included using the `import` keyword.
Import the `didKeyToJwk` function to convert your did:key string to a JWK.
You will need to specify the algorithm as the second parameter.
This will match with the algorithm string required by JOSE to generate a JWK.
Current options are:

 - `ES256K`: for the secp256k1 curve
 - `ES384`: for the nistp384 curve

You can convert it using this code:

```javascript
import * as jose from 'jose';
// import the necessary functions
import { jwkToDidKey, didKeyToJwk } from 'jwk-multibase-key-converter';

// create the JWK
const alg = 'ES256K';
const { publicKey, privateKey } = await generateKeyPair(alg, {
    extractable: true,
});
const jwk = await exportJWK(publicKey);
// convert it to a did:key
const didKey = jwkToDidKey(jwk);

// this converts the did:key to a JWK, you need to specify the algorithm
const dJwk = didKeyToJwk(mbase, alg);
```
