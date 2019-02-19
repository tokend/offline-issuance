import * as types from '../mutation-types'

const state = {
  authorized: false
}

const mutations = {
  [types.AUTHORIZE] (state) {
    state.authorized = true
  },
  [types.UNAUTHORIZE] (state) {
    state.authorized = false
  }
}

export default {
  state,
  mutations
}
