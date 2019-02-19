<template>
  <md-app id="app" md-waterfall md-mode="fixed">
    <md-app-toolbar class="md-primary"
                    v-if="$store.getters.isAuthorized">

      <header class="app__toolbar">
        <nav class="app__navigation">
          <md-tabs class="md-primary" md-sync-route>
            <md-tab md-label="Create" to="/create" id="route-create"></md-tab>
            <md-tab md-label="View" to="/view" id="route-view"></md-tab>
            <md-tab md-label="Change asset issuer" to="/change-issuer" id="route-issuer"></md-tab>
          </md-tabs>


          <div class="logout">
            <md-button v-on:click="logout">Log out</md-button>
          </div>

        </nav>
      </header>
    </md-app-toolbar>

    <md-app-content class="app__content">
      <div class="app__public-key-outer" v-if="$store.getters.isAuthorized">
        <p class="app__public-key-note">Your public key:</p>
        <p class="app__public-key">{{ $store.getters.publicKey }}</p>
      </div>

      <router-view></router-view>

    </md-app-content>
  </md-app>
</template>

<script>
  import Auth from './auth'
  export default {
    methods: {
      logout () {
        Auth.logout(this.$store, this.$router)
      }
    },
    data () {
      return {
        isShowed: false
      }
    },
    computed: {
      publicKey () {
        const keypair = this.$store.getters.keyPair
        if (keypair) {
          return keypair.accountId()
        }
      }
    }
  }
</script>

<style lang="scss">
  @import './assets/styles/colors';
  @import './assets/styles/mixins';

  .app__toolbar {
    width: 100%;
  }

  .app__navigation {
    display: flex;
    justify-content: space-between;
  }


  .app__content {
    position: relative;
  }

  .app__public-key {
    font-size: .6rem;
  }


  .app__public-key-outer {
    position: absolute;
    right: 20px;
    text-align: right;
  }

  .app__public-key-note,
  .app__public-key {
    margin: 0;
  }
</style>
