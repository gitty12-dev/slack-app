<template>
  <div class="flex flex-col h-screen">
    <header class="flex justify-between p-4 border-b items-center">
      <h1 class="font-semibold text-xl leading-tight">Slack Clone</h1>
      <button class="py-1 px-4 border-2 border-green-800 rounded">
        <router-link to="/signin">サインイン</router-link>
      </button>
    </header>
    <div class="bg-gray-100 flex-auto">
      <div class="flex justify-center mt-16">
        <div class="w-2/5 border bg-white">
          <div class="my-12 text-center">
            <h2 class="text-4xl font-bold">ユーザの登録</h2>
            <p class="my-4">
              <span class="font-semibold">メールアドレス</span>と
              <span class="font-semibold">パスワード</span>を入力してください
            </p>
            <form @submit.prevent="registerUser">
              <div class="mb-2">
                <input type="email" v-model="email" placeholder="you@example.com" class="text-xl w-3/5 p-3 border rounded"/>
              </div>
              <div class="mb-2">
                <input type="password" v-model="password" class="text-xl w-3/5 p-3 border rounded" placeholder="パスワード"/>
              </div>
              <div v-if="errors.length">
                <ul class="my-4">
                  <li class="font-semibold text-red-700" v-for="(error, index) in errors" :key="index">
                    {{ error }}
                  </li>
                </ul>
              </div>
              <button type="submit" class="text-xl w-3/5 bg-green-800 text-white py-2 rounded">ユーザの登録</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// v9 compat pakages
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database"

export default {
  name: 'RegisterView',
  data() {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    registerUser() {
      // console.log(this.email, this.password);
      createUserWithEmailAndPassword(getAuth(), this.email, this.password)
        .then(response => {
          const user = response.user;
          set(ref(getDatabase(), "users/" + user.uid), {
            user_id: user.uid,
            email: user.email,
          })
            .then(() => {
              this.$router.push('/');
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(e => {
          console.log("ERROR : " + e);
          if (e.code == "auth/email-already-in-use") {
            this.errors.push("入力したメールアドレスは登録済です。");
          } else {
            this.errors.push("入力したメールアドレスかパスワードに問題があります。");
          }
        });
    }
  }

};
</script>