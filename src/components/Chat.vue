<template>
  <q-page padding class="row justify-center">
    <div style="width: 500px; max-width: 90vw">
      <q-chat-message
        v-for="message in messages"
        v-bind:key="message._id"
        :name="message.name"
        :text="[message.text]"
        :stamp="time(message.timestamp)"
        :avatar="message.avatar"
        size="10"
        :sent="isMe(message.user)"
      />
    </div>
    <q-layout-footer>
      <q-toolbar color="primary">
        <q-input
          inverted-light
          color="white"
          clearable
          style="flex-grow: 1;"
          placeholder="Type your message"
          :count="130"
          v-model="textToSend"
          @keyup.enter="send"
         />
         <q-btn xs flat round icon="mdi-send" @click="send" />
      </q-toolbar>
    </q-layout-footer>
  </q-page>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addLocale(en)

export default {
  name: 'Chat',
  data() {
    return {
      messages: [],
      textToSend: ''
    }
  },
  methods: {
    send: function () {
      if (this.textToSend.trim() === '') return
      const message = {
        text: this.textToSend.trim(),
        timestamp: Date.now(),
        user: this.$root.user.uid,
        name: this.$root.user.displayName,
        avatar: this.$root.user.photoURL,
      }
      this.$firebaseRefs.messages.push(message)
      this.textToSend = ''
    },
    time: function (timestamp) {
      const timeAgo = new TimeAgo('en-US')
      return timeAgo.format(timestamp)
    },
    isMe: function (user) {
      return user === this.$root.user.uid
    }
  },
  watch: {
    messages: function () {
      setTimeout(() => {
        window.scrollTo({
          left: 0,
          top: document.body.scrollHeight,
          behavior: 'smooth'
        })
      }, 100)
    }
  },
  firebase () {
    return {
      messages: firebase.database().ref('messages')
    }
  }
}
</script>

