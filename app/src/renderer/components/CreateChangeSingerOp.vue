<template>
  <div class="change-issuer">

    <div class="app__header">
      <h2>Change asset issuer</h2>
    </div>

    <form @submit.prevent="save" class="app__form">
      <div class="app__form-content">
        <md-field class="app__form-row">
          <label>Asset</label>
          <md-input id="change-asset"
                    v-model="form.asset"
          />
        </md-field>
        <md-field class="app__form-row">
          <label>New issuer public key</label>
          <md-input id="change-account"
                    v-model.trim="form.accountId"
          />
        </md-field>
        <md-field class="app__form-row">
          <label>Transaction source</label>
          <md-input id="set-source"
                    v-model.trim="form.source"
          />
        </md-field>

        <md-field class="app__form-row">
          <label>Network passphrase</label>
          <md-input id="set-passphrase"
                    v-model.trim="form.passphrase"
          />
        </md-field>
      </div>
      <md-button type="submit" class="md-raised md-primary">Create file</md-button>
    </form>
  </div>
</template>

<script>
  import StellarBase from 'exports-loader?StellarBase!../../../../node_modules/js-base/dist/stellar-base.js'
  import FileStorage from '../fileStorage'

  export default {
    name: 'create-change-singer-op',
    data () {
      return {
        form: {
          asset: '',
          accountId: '',
          source: '',
          passphrase: ''
        }
      }
    },
    methods: {
      save () {
        if (!StellarBase.Keypair.isValidPublicKey(this.form.accountId)) {
          alert('Invalid account id!')
          return
        }
        FileStorage.createChangeIssuerOp({
          asset: this.form.asset,
          accountId: this.form.accountId,
          passphrase: this.form.passphrase,
          source: this.form.source,
          keypair: this.$store.getters.keyPair
        })
      }
    }
  }
</script>

<style scoped>
  .form {
    padding: 45px 20px;
    width: 550px;
  }

  .heading {
    margin-bottom: 40px;
  }

  .field {
    margin-bottom: 30px;
  }
</style>