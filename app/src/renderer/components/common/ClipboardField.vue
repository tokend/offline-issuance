<template>
  <div class="clipboard__outer">
    <div class="clipboard">
      <div class="clipboard__value-outer">
        <label class="clipboard__label">{{ label }}</label>
        <span class="clipboard__value" id="clipboard-target">{{ value }}</span>
      </div>
      <md-button
        class="md-icon-button clipboard__icon-btn"
        id="clipboard-btn"
        @click="showSuccess"
        data-clipboard-target="#clipboard-target"
      >
        <md-icon class="clipboard__icon">content_copy</md-icon>
        <md-tooltip>Copy</md-tooltip>
      </md-button>
    </div>
  </div>
</template>

<script>
  import Clipboard from 'clipboard'

  export default {
    name: 'clipboard-field',
    props: {
      value: { type: String, default: '' },
      label: { type: String, default: '' }
    },
    mounted () {
      const btn = document.querySelector('#clipboard-btn')
      if (!btn) return
      this.clipboard = new Clipboard(btn)
    },
    methods: {
      showSuccess () {
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../../assets/styles/colors';
  @import '../../assets/styles/mixins';
  @import '../../assets/styles/typography';

  .clipboard {
    align-items: center;
    border-bottom: 1px solid $col-unfocused;
    display: flex;
    justify-content: space-between;
    max-width: 100%;
  }

  .clipboard__value {
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .clipboard__value-outer {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .clipboard__label {
    font-size: $fs-tip;
    color: $col-unfocused;
  }

  .clipboard__icon-btn {
    position: relative;
    top: 7px;
  }

  .clipboard__icon {
    font-size: 16px !important;
  }
</style>
