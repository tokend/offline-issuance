<template>
  <table class="user-list">
    <thead>
      <tr>
        <th v-for="key in columns" class="material">
          {{ key }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" class="material">
        <td>
          {{ localize(item.amount) }}
        </td>
        <td>
          {{ item.asset }}
        </td>
        <!--<td>-->
          <!--{{ item.signatures.length }}-->
        <!--</td>-->
        <td v-if="isMySig(item)">
          Signed by you
        </td>
        <td v-else>
          Isn't signed by you
          <!--<button v-on:click="addSignature(index)" class="btn btn-success btn-blue">Sign</button>-->
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import StellarBase from 'exports-loader?StellarBase!../../../../../node_modules/js-base/dist/stellar-base.js'
import localize from '../../localize'
export default {
  props: ['items', 'update'],
  data: function () {
    return {
      columns: ['amount', 'asset', 'signatures'],
      localize
    }
  },
  methods: {
    isMySig (item) {
      return StellarBase.PreIssuanceRequest.isXdrPreIssuanceRequestSigned(item.xdr, this.$store.getters.keyPair)
    },
    addSignature (index) {
      var item = this.items[index]
      StellarBase.PreIssuanceRequest.addSignature(item, this.$store.getters.keyPair)
      this.items.splice(index, 1, item)
      this.$parent.update(this.items)
    }

  }
}
</script>

<style scoped>
  table {
    border: none;
    width: 100%
  }

  thead {
    margin-bottom: 20px;
  }

  th::first-letter {
    text-transform: capitalize;
  }

  th, td {
    min-width: 25%;
    padding: 10px 20px;
    text-align: center;
  }
</style>
