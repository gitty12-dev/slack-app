<template>
  <div class="flex flex-col h-screen">
    <header class="flex justify-between p-4 border-b items-center">
      <h1 class="font-semibold text-xl leading-tight">Slack Clone</h1>
      <button class="py-1 px-4 border-2 border-green-800 rounded">
        <router-link to="/register">Slack Cloneではじめる</router-link>
      </button>
    </header>
    <div class="bg-gray-100 flex-auto">
      <div class="flex justify-center mt-16">
        <div class="w-2/5 border bg-white">
          <div class="my-12 text-center">
            <h2 class="text-4xl font-bold">サインイン</h2>
            <p class="my-4">
              <span class="font-semibold">メールアドレス</span>と
              <span class="font-semibold">パスワード</span>を入力してください
            </p>
            <form @submit.prevent="signin">
              <div class="mb-2">
                <input type="email" v-model="email" placeholder="you@example.com" class="text-xl w-3/5 p-3 border rounded"/>
              </div>
              <div class="mb-2">
                <input type="password" v-model="password" class="text-xl w-3/5 p-3 border rounded" placeholder="パスワード"/>
              </div>
              <button type="submit" class="text-xl w-3/5 bg-green-800 text-white py-2 rounded">サインイン</button>
            </form>
            <div v-if="errors.length">
              <ul class="my-4">
                <li v-for="(error, idx) in errors" :key="idx" class="font-semibold text-red-700">
                  {{ error }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'


export default {
  name: 'SigninView',
  data() {
    return {
      email: "",
      password: "",
      errors: [],
    }
  },
  methods: {
    signin() {
      signInWithEmailAndPassword(getAuth(), this.email, this.password)
        .then(response => {
          console.log(response);
          this.$router.push("/");
        })
        .catch(() => {
          this.password = "";
          this.errors.push("ユーザ名 または パスワードが間違えています");
        })
    }
  }
};
</script>