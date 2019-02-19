<template>
  <div class="login">
    <div class="app__header">
      <md-button class="md-icon-button app__back-btn" to="/">
        <md-icon class="app__icon-back">arrow_back</md-icon>
      </md-button>
      <h2>Login</h2>
    </div>

    <form class="app__form" v-if="!filename" @submit.prevent="loginWithSeed">
      <div class="app__form-content">
        <p>Log in with seed</p>
        <md-field :md-toggle-password="false" class="login__seed">
          <label>Seed</label>
          <md-input v-model="seed"
                    type="password"
                    id="login-seed"
          />
        </md-field>
      </div>
      <md-button type="submit" class="md-primary md-raised">Log in</md-button>
    </form>

    <div class="login__action" v-if="!filename">
      <p>or</p>
      <md-button v-on:click="open" class="md-primary"> Open encrypted keyfile</md-button>
    </div>


    <div class="login__current" v-if="filename">
      <p class="login__current-name">Opened {{filename}}</p>
      <md-button v-on:click="open" class="md-primary">open another</md-button>
    </div>

    <form class="app__form" @submit.prevent="unlock" v-if="filename">
      <div class="app__form-content">
        <md-field :md-toggle-password="false" class="login__password">
          <label>{{ 'Password for ' + filename }}</label>
          <md-input v-model="password"
                    type="password"
                    id="login-password"
          />
        </md-field>
      </div>
      <div class="app__form-buttons">
        <md-button type="submit" class="md-primary md-raised">Unlock file</md-button>
        <md-button type="button" @click="filename = ''; password = ''; encryptedData = ''">Cancel</md-button>
      </div>
    </form>

  </div>
</template>

<script>
  import FileStorage from '../fileStorage'
  import Auth from '../auth'
  import $ from 'jquery'
  export default {
    data: _ => ({
      filename: '',
      password: '',
      seed: '',
      encryptedData: ''
    }),
    methods: {
      open () {
        var self = this
        FileStorage.loadKey(function (fileName, data) {
          self.filename = fileName
          self.encryptedData = data
          setTimeout(() => {
            $('input[type="password"]').focus()
          }, 100)
        })
      },
      loginWithSeed () {
        if (!this.seed) {
          alert('Please provide seed first')
          return
        }
        if (Auth.loginWithSeed(this.seed, this.$store)) {
          this.$router.push('create')
        }
      },
      unlock () {
        if (!this.password) {
          alert('Please provide password first')
          return
        }
        if (Auth.login(this.encryptedData, this.password, this.$store)) {
          this.$router.push('create')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/styles/colors';
  @import '../assets/styles/mixins';

  .login {
    height: 100%;
    position: relative;
  }

  .login__action {
    text-align: center;
  }

  .login__current {
    text-align: center;
  }

  .login__current-name {
    margin-bottom: 0;
  }
</style>

