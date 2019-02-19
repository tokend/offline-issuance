export const isAuthorized = state => state.auth.authorized
export const keyPair = state => state.keypair.main
export const publicKey = state => state.keypair.main.accountId()
