## Converting a Public JWK to a Multibase Key

This is an ECMAScript module so it is included using the `import` keyword.
Import the `jwkToMbase` function to convert your JWK to a Multibase string.

You can convert it using this code:

```javascript
import * as jose from 'jose';
// import the necessary function
import { jwkToMbase } from 'jwk-multibase-key-converter';

// create the JWK
const alg = 'ES256K';
const { publicKey, privateKey } = await generateKeyPair(alg, {
    extractable: true,
});
const jwk = await exportJWK(publicKey);

// this converts your jwk to a multibase string
const mbase = jwkToMbase(jwk);
```
