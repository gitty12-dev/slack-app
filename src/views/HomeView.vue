<template>
  <div class="flex h-screen">
    <div class="w-1/5 bg-gray-800 text-white pt-3 px-4">
      <div class="flex justify-between items-center">
        <h1 class="font-semibold text-xl leading-tight">Slack Clone</h1>
        <NotificationIcon />
      </div>
      <div class="flex items-center">
        <span class="bg-yellow-400 rounded-full w-3 h-3 mr-2"></span>
        <div class="opacity-50">{{ user.email }}</div>
      </div>
    </div>
    <div class="flex-grow bg-gray-100">
      <p>ログイン中</p>
      <div>
        <button class="py-1 px-4 bg-gray-800 text-white rounded" @click="signout">サインアウト</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth'
import NotificationIcon from '../components/icon/NotificationIcon.vue'

const auth = getAuth();

export default {
  name: 'HomeView',
  data() {
    return {
      user: "",
    }
  },
  components: {
    NotificationIcon
  },
  methods: {
    signout() {
      signOut(getAuth());
      this.$router.push('/signin')
    }
  },
  mounted() {
    this.user = auth.currentUser;
  }
  
}

</script>
