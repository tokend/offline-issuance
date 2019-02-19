import StellarBase from 'exports-loader?StellarBase!../../../node_modules/js-base/dist/stellar-base.js'
import sjcl from '../../../node_modules/stellar-wallet-js-sdk/lib/util/sjcl'
export default {
  install (Vue, options) {
    Vue.auth = this
  },
  login (encryptedData, password, store) {
    try {
      var data = sjcl.decrypt(password, encryptedData)
      var keyPair = StellarBase.Keypair.fromSeed(data)
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
      var keyPair = StellarBase.Keypair.fromSeed(seed)
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
