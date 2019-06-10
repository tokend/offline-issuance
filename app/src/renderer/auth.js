import { base } from '@tokend/js-sdk'
import sjcl from '../../../node_modules/sjcl'

export default {
  install (Vue, options) {
    Vue.auth = this
  },
  login (encryptedData, password, store) {
    try {
      var data = sjcl.decrypt(password, encryptedData)
      var keyPair = base.Keypair.fromSecret(data)
    } catch (e) {
      alert('Invalid keyFile or password')
      return false
    }
    store.dispatch('authorize')
    store.dispatch('setKeypair', keyPair)
    return true
  },
  loginWithSeed (seed, store) {
    try {
      var keyPair = base.Keypair.fromSeed(seed)
    } catch (e) {
      alert('Invalid seed')
      return false
    }
    store.dispatch('authorize')
    store.dispatch('setKeypair', keyPair)
    return true
  },
  logout (store, router) {
    store.dispatch('unauthorize')
    store.dispatch('clearKeypair')
    router.push('/')
  }
}
