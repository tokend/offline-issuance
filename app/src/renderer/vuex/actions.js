import * as types from './mutation-types'

export const authorize = ({ commit }) => {
  commit(types.AUTHORIZE)
}

export const unauthorize = ({ commit }) => {
  commit(types.UNAUTHORIZE)
}

export const setKeypair = ({ commit }, keyPair) => {
  commit(types.SET_KEYPAIR, keyPair)
}

export const clearKeypair = ({ commit }) => {
  commit(types.CLEAR_KEYPAIR)
}
