<template>
  <div>
    <div class="app__header">
      <md-button class="md-icon-button app__back-btn" to="/">
        <md-icon class="app__icon-back">arrow_back</md-icon>
      </md-button>
      <h2>Generate keyfile</h2>
    </div>

    <form @submit.prevent="save" class="app__form">
      <div class="app__form-content">
        <clipboard-field class="generate__public-key app__form-row"
                label="Generated public key"
                :value="publicKey"/>

        <md-field :md-toggle-password="false" class="generate__password">
          <label>Password to decrypt the file</label>
          <md-input v-model="password"
                    type="password"
                    id="password"
          />
        </md-field>
      </div>

      <md-button type="submit" class="md-primary md-raised">Save file</md-button>
    </form>
  </div>
</template>

<script>
  import StellarBase from 'exports-loader?StellarBase!../../../../node_modules/js-base/dist/stellar-base.js'
  import FileStorage from '../fileStorage'
  import $ from 'jquery'
  import ClipboardField from './common/ClipboardField'

  export default {
    components: { ClipboardField },
    data: _ => ({
      publicKey: '',
      privateKey: '',
      password: ''
    }),
    created () {
      this.generate()
    },
    methods: {
      generate () {
        var keyPair = StellarBase.Keypair.random()
        this.publicKey = keyPair.accountId()
        this.privateKey = keyPair.seed()
        setTimeout(() => {
          $('input[type="password"]').focus()
        }, 100)
      },
      save () {
        if (!this.password) {
          alert('Please provide password first')
          return
        }
        FileStorage.storeKey(this.privateKey, this.password)
        this.$router.push('login')
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
