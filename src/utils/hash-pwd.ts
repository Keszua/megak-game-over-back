import { createHmac } from 'crypto';

export const hashPwd = (p: string): string => {
    const hmac = createHmac('sha512', '*Pozdrowienia_dla-Kubu i-Bartka_:) 857857438kjfkanfnvmf=33mmm###$$%(*(&kldmv');
    hmac.update(p);
    return hmac.digest('hex');
};