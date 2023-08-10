import * as crypto from 'crypto';
import { codeConstants } from '../constants';

function decrypt(ivCiphertextB64: string): string {
    try {
        const key = codeConstants.key;
        const ivCiphertext = Buffer.from(ivCiphertextB64, 'base64');
        const iv = ivCiphertext.slice(0, 16);
        const ciphertext = ivCiphertext.slice(16);
        const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
        let decryptedData = decipher.update(ciphertext, undefined, 'utf8');
        decryptedData += decipher.final('utf8');
        return decryptedData;
    } catch (exception) {
        throw exception;
    }
}

function encrypt(plaintext: string): string {
    const key = codeConstants.key;
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let ciphertext = cipher.update(plaintext, 'utf8', 'binary');
    ciphertext += cipher.final('binary');
    const ivCiphertext = Buffer.concat([iv, Buffer.from(ciphertext, 'binary')]);
    const ivCiphertextB64 = ivCiphertext.toString('base64');
    return ivCiphertextB64;
}


export {
    decrypt,
    encrypt
}