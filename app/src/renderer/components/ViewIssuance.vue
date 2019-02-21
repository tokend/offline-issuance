<template>
  <div class="view">

    <div class="app__header">
      <h2>View issuance</h2>
    </div>

    <div class="view__action" v-if="!fileName">
      <md-button @click="open">Open issuance file</md-button>
    </div>

    <md-card v-if="fileName">
      <issuances :items="items"/>
    </md-card>

    <div class="view__action" v-if="fileName">
      <md-button @click="open">Open another file</md-button>
    </div>

  </div>
</template>

<script>
  import FileStorage from '../fileStorage'
  import Issuances from './ViewIssuance/Issuances'
  import { base } from '@tokend/js-sdk'

  export default {
    components: {
      Issuances
    },
    methods: {
      open () {
        FileStorage.openIssuances((result, fileName) => {
          this.items = []
          for (var i = 0; i < result.length; i++) {
            var preEmission = base.xdr.PreIssuanceRequest.fromXDR(result[i].preEmission, 'hex')
            var item = base.PreIssuanceRequest.dataFromXdr(preEmission)
            item.used = result[i].used
            item.xdr = preEmission
            this.items.push(item)
          }
          this.fileName = fileName
        })
      },
      update (items) {
        FileStorage.updateIssuances(items, this.fileName)
      }
    },
    data: function () {
      return {
        items: [],
        fileName: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/styles/mixins';

  .view {
    height: 100%;
    position: relative;
  }
  .view__action {
    @include center;
    position: absolute;
  }
</style>
