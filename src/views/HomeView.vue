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
      <div class="mt-5 flex justify-between items-center">
        <div class="font-bold opacity-50 text-lg">チャンネル</div>
        <PlusCircleIcon />
      </div>
      <div class="text-left opacity-50 mt-1" v-for="channel in channels" :key="channel.id">
        # {{ channel.name }}
      </div>
      <div class="mt-5 flex justify-between items-center">
        <div class="font-bold opacity-50 text-lg">ダイレクトメッセージ</div>
        <PlusCircleIcon />
      </div>
      <div class="mt-2 flex items-center" v-for="user in users" :key="user.id">
        <span class="bg-yellow-400 rounded-full w-3 h-3 mr-2"></span>
        <div class="opacity-50">{{ user.user_email }}</div>
      </div>
    </div>

    <div class="flex flex-col flex-grow bg-gray-100">
      <header class="border-b">
        <div class="flex justify-between items-center m-3">
          <div>
            <div class="font-bold text-lg">{{ user.email }}</div>
            <StarIcon />
          </div>
          <div class="flex items-center text-gray-700">
            <PhoneIcon class="mx-2" />
            <InformationIcon />
            <CogIcon class="mx-2" />
            <div class="flex col border w-64 rounded p-1 mx-2">
              <SearchIcon />
              <span class="ml-2 text-gray-700">検索</span>
            </div>
            <AtSymbolIcon class="mx-2" />
            <StarIcon class="mx-2"/>
            <div>
              <button class="py-1 px-4 bg-gray-800 text-white rounded" @click="signout">サインアウト</button>
            </div>
          </div>
        </div>
      </header>

      <main class="overflow-y-scroll flex-grow">
        <div class="flex flex-col ml-6 h-full">
          <div class="flex-grow overflow-y-scroll">
            <p>メッセージ一覧</p>
          </div>
          <div class="border border-gray-900 rounded mb-4">
            <textarea class="w-full pt-4 pl-8 outline-none" placeholder="XXXXへのメッセージ"></textarea>
            <div class="text-left bg-gray-100 p-2">
              <button class="bg-green-900 text-sm text-white font-bold py-1 px-2 rounded">送信</button>
            </div>
          </div>
        </div>
      </main>

    </div>
  </div>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth'
import NotificationIcon from '../components/icons/NotificationIcon.vue'
import PlusCircleIcon from '../components/icons/PlusCircleIcon.vue'
import SearchIcon from "../components/icons/SearchIcon.vue";
import StarIcon from "../components/icons/StarIcon.vue";
import CogIcon from "../components/icons/CogIcon.vue";
import PhoneIcon from "../components/icons/PhoneIcon.vue";
import InformationIcon from "../components/icons/InformationIcon.vue";
import AtSymbolIcon from "../components/icons/AtSymbolIcon.vue";

export default {
  name: 'HomeView',
  data() {
    return {
      user: "",
      channels: [
        {id: 1, name: "営業"},
        {id: 2, name: "事務"},
        {id: 3, name: "情シス"},
      ],
      users: [
        {id: 11, user_email: "xxxx@gmail.com"},
        {id: 12, user_email: "yyyy@gmail.com"},
        {id: 13, user_email: "zzzz@gmail.com"},
      ]
    }
  },
  components: {
    NotificationIcon,
    PlusCircleIcon,
    SearchIcon,
    StarIcon,
    CogIcon,
    PhoneIcon,
    InformationIcon,
    AtSymbolIcon,
  },
  methods: {
    signout() {
      signOut(getAuth());
      this.$router.push('/signin')
    }
  },
  mounted() {
    this.user = getAuth().currentUser;
  }
  
}

</script>
