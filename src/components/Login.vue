<template>
  <q-page padding class="row items-center justify-center">
    <q-btn label="Login with Google" icon="mdi-google" color="primary" @click="login" />
  </q-page>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'Login',
  methods: {
    login: function () {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
    }
  }
}
</script>
