## Importing Algorithm-specific functions

If you are only using a specific algorithm and want to only import those functions you can by appending the algorithm string as the path and specify `toJwk` or `toMbase`.
Current options are:

 - `ES256K`: for the secp256k1 curve
 - `ES384`: for the nistp384 curve


For instance, if you wanted to work with only secp256k1 keys, you would append `ES256K` like so:

`import { toJwk, toMbase } from 'jwk-multibase-key-converter/ES256K'`

Every supported algorithm will have these 2 functions:

1. `toMbase(x: string, y: string)`: this accepts the `x` and `y` values of the JWK and returns the multibase string version
2. `toJwk(mbase: string)`: this accepts a multibase string and returns the JWK version

Here is a code example:
```javascript
import * as jose from 'jose';
// import the necessary functions
import { toMbase } from 'jwk-multibase-key-converter/ES256K';

// create the JWK
const alg = 'ES256K';
const { publicKey, privateKey } = await generateKeyPair(alg, {
    extractable: true,
});
const jwk = await exportJWK(publicKey);

// use the algorithm-specific function to convert it to a multibase string
const mbase = toMbase(jwk.x, jwk.y);
```

It is recommended to use the default root level functions however, because they include validation steps and feedback.
