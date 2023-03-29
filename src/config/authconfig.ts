import { config } from './configuration';

export const AuthConfigConstants = {
    secretKeyJwt: config.acSecretKeyJwt,
    cookieOptions: {
        secure: config.acSecure,
        domain: config.acDomain,
        httpOnly: config.acHttpOnly,
    },
}