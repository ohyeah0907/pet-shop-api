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

    let secret = '';
    while (secret.length < length) {
        const randomBytes = crypto.randomBytes(1);
        const randomIndex = randomBytes[0] % charactersLength;
        secret += characters.charAt(randomIndex);
    }

    return secret;
}

export function seperateArray(arr: any[]): any[][]  {
    var result: any[] = []
    var tmp = []

    for (var i = 0; i < arr.length; i++) {
        if (i === 0) {
            result.push([arr[0]])
        } else if (arr[i] != arr[i - 1] + 1) {
            result.push([arr[i]])
        } else {
            tmp = result[result.length - 1]
            tmp.push(arr[i])
            result[result.length - 1] = tmp
        }
    }
    return result
}
