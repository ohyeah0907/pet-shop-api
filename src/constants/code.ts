export const codeConstants = {
    password: process.env.PASSWORD_CODE,
    key: process.env.KEY_CODE || 'ee70668e6926e987a07e33947064899f',
}

export const tokenConstants = {
    expires_in: process.env.EXPIRES_IN_TOKEN || 0,
    token_type: 'Bearer'
}