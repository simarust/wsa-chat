<template>
  <q-layout id="q-app" view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar color="primary">

        <q-toolbar-title>
          WSA Chat
        </q-toolbar-title>
        <q-btn v-if="user" xs flat round icon="mdi-logout" @click="logout" />
      </q-toolbar>
    </q-layout-header>

    <q-page-container>
      <Chat v-if="user" />
      <Login v-else />
    </q-page-container>
  </q-layout>
</template>

<script>
import Chat from './components/Chat.vue'
import Login from './components/Login.vue'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'LayoutDefault',
  components: {
    Chat,
    Login,
  },
  computed: {
    user: function () {
      return this.$root.user
    }
  },
  data () {
    return {
    }
  },
  methods: {
    logout: function () {
      firebase.auth().signOut()
    }
  }
}
</script>

<style>
</style>
