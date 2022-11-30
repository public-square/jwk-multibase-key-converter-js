## Converting a Public JWK to a did:key

This is an ECMAScript module so it is included using the `import` keyword.
Import the `jwkToDidKey` function to convert your JWK to a did:key.

You can convert it using this code:

```javascript
import * as jose from 'jose';
// import the necessary function
import { jwkToDidKey } from 'jwk-multibase-key-converter';

// create the JWK
const alg = 'ES256K';
const { publicKey, privateKey } = await generateKeyPair(alg, {
    extractable: true,
});
const jwk = await exportJWK(publicKey);

// this converts your jwk to a did:key
const didKey = jwkToDidKey(jwk);
```
