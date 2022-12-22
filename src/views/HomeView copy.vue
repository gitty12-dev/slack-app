<template>
  <div class="home">
    <div>
      <h1>Firebaseを使った読み書き確認</h1>
      <input v-model="message" />
      <button @click="addMessage">メッセージを追加</button>
    </div>
    <div>
      <h1>メッセージ一覧</h1>
      <ul>
        <li v-for="(msg, index) in messages" :key="index">
          {{ msg.content }} index:{{ index }}
          <span @click="deleteMessage(index)">X</span>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>

import firebase from "firebase/compat/app";
import "firebase/compat/database";

export default {
  name: "Home",
  data() {
    return {
      message: "",
      messages: [], 
    };
  },
  methods: {
    addMessage() {
      firebase.database().ref("slack")
        .push({
          content: this.message,
          user: {
            name: "John Doe"
          }
        });
    },
    deleteMessage(idx) {
      firebase.database().ref("slack")
        .child(idx).remove();
    }
  },
  mounted() {
    firebase.database().ref("slack")
      .on("value", snapshot => this.messages = snapshot.val());
  }
};
</script>
