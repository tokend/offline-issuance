import * as types from '../mutation-types'

const state = {
  main: null
}

const mutations = {
  [types.SET_KEYPAIR] (state, keyPair) {
    state.main = keyPair
  },
  [types.CLEAR_KEYPAIR] (state) {
    state.main = null
  }
}

export default {
  state,
  mutations
}
