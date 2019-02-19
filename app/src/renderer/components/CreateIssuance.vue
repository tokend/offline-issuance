<template>
  <div>
    <div class="app__header">
      <h2>Create issuance</h2>
    </div>

    <form @submit.prevent="save" class="app__form">
      <div class="app__form-content">
        <md-field class="app__form-row">
          <label>Amount</label>
          <md-input type="number"
                    id="create-amount"
                    v-model.number="amount"
          />
        </md-field>
        <md-field class="app__form-row">
          <label>Asset</label>
          <md-input id="create-asset"
                    v-model="asset"
          />
        </md-field>
      </div>
      <md-button type="submit" class="md-raised md-primary">Create</md-button>
    </form>
  </div>
</template>

<script>
  import FileStorage from '../fileStorage'
  export default {
    methods: {
      save (event) {
        if (this.amount === parseInt(this.amount)) {
          FileStorage.createIssuances(this.quantity || 1, this.amount, this.asset, this.$store.getters.keyPair)
        } else {
          alert('Use integer values')
        }
      }
    },
    data () {
      return {
        amount: 100,
        asset: ''
      }
    }
  }
</script>

<style scoped>
</style>
