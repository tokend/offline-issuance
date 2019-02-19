<template>
  <div class="welcome">
    <div class="welcome__inner">
      <div class="welcome__logo">
        <img src="../assets/svg/tokend-logo.svg" alt="">
        <p class="welcome__what">offline device pre-issuance tool</p>
      </div>

      <p>
        <router-link to="login">Log in</router-link>
        with your seed/keyfile or <router-link to="generate">generate</router-link> new one
      </p>
    </div>

    <footer class="welcome__footer">
      <div class="copy">
        TokenD © 2018
      </div>
    </footer>
  </div>
</template>

<script>

  export default {
    name: 'landing-page'
  }
</script>

<style lang="scss" scoped>
  @import '../assets/styles/_colors.scss';
  @import '../assets/styles/mixins.scss';

  h1,
  p {
    text-align: center;
  }

  .welcome {
    width: 550px;
    height: 100%;
    position: relative;
    text-align: center;
    margin: auto;

    &__inner {
      position: absolute;
      @include center;
    }

    &__what {
      color: $col-md-unfocused;
      margin: 0 0 65px;
      font-size: .8rem;
      text-transform: uppercase;
      letter-spacing: 0.1rem;
      padding-right: 1rem;
      text-align: right;
    }

    &__logo {
      margin: 0 auto 30px;
      text-align: center;
      width: 450px;

      img {
        margin: 0;
      }
    }

    &__footer {
      bottom: 2px;
      font-size: 12px;
      position: absolute;

      @include center-horizontally;
    }
  }
</style>
