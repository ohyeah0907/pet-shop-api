import crypto from 'crypto';

export function generateClientId(length: number) {
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;

    let clientId = '';
    while (clientId.length < length) {
        const randomBytes = crypto.randomBytes(1);
        const randomIndex = randomBytes[0] % charactersLength;
        clientId += characters.charAt(randomIndex);
    }

    return clientId;
}

export function generateSecret(length: number) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789';
    const charactersLength = characters.length;

    let secret= '';
    while (secret.length < length) {
        const randomBytes = crypto.randomBytes(1);
        const randomIndex = randomBytes[0] % charactersLength;
        secret+= characters.charAt(randomIndex);
    }

    return secret;
}
