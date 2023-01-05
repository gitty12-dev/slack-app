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
      <div class="mt-2 flex items-center" v-for="(user, idx) in users" :key="idx">
        <span class="bg-yellow-400 rounded-full w-3 h-3 mr-2"></span>
        <div class="opacity-50" @click="directMessage(user)">{{ user.email }}</div>
      </div>
    </div>

    <div class="flex flex-col flex-grow bg-gray-100">
      <header class="border-b">
        <div class="flex justify-between items-center m-3">
          <div>
            <div class="font-bold text-lg">{{ channel_name }}</div>
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

      <main class="flex-grow">
        <div class="flex flex-col ml-6 h-full">
          <div class="flex-grow overflow-y-scroll">
            <div class="mt-2 mb-4 flex" v-for="message in messages" :key="message.key">
              <AvaterView :user="message.user"/>
              <div class="ml-2 text-left">
                <div class="font-bold">{{ message.user }}</div>
                <div>{{ message.content }}</div>
              </div>
            </div>
          </div>
          <div class="border border-gray-900 rounded mb-4">
            <textarea class="w-full pt-4 pl-8 outline-none" :placeholder="placeholder"
             v-model="message"></textarea>
            <div class="text-left bg-gray-100 p-2">
              <button class="bg-green-900 text-sm text-white font-bold py-1 px-2 rounded"
               @click="sendMessage()">送信</button>
            </div>
          </div>
        </div>
      </main>

    </div>
  </div>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth'
import { getDatabase, ref, push, set, child, onChildAdded, off, serverTimestamp } from 'firebase/database'
import NotificationIcon from '../components/icons/NotificationIcon.vue'
import PlusCircleIcon from '../components/icons/PlusCircleIcon.vue'
import SearchIcon from "../components/icons/SearchIcon.vue";
import StarIcon from "../components/icons/StarIcon.vue";
import CogIcon from "../components/icons/CogIcon.vue";
import PhoneIcon from "../components/icons/PhoneIcon.vue";
import InformationIcon from "../components/icons/InformationIcon.vue";
import AtSymbolIcon from "../components/icons/AtSymbolIcon.vue";
import AvaterView from "../components/Avator.vue"

export default {
  name: 'HomeView',
  data() {
    return {
      user: "",
      users: [],
      channels: [
        {id: 1, name: "営業"},
        {id: 2, name: "事務"},
        {id: 3, name: "情シス"},
      ],
      channel_id: "",
      channel_name: "",
      message: "",
      messages: [],
      placeholder: "",
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
    AvaterView,
  },
  methods: {
    // サインアウト処理
    signout() {
      signOut(getAuth());
      this.$router.push('/signin')
    },
    // ダイレクトメッセージ アドレス選択処理
    directMessage(user) {
      this.messages = [];
      // チャンネルID設定(対象のuidを連結した値)
      this.user.uid > user.user_id
        ? (this.channel_id = this.user.uid + "-" + user.user_id)
        : (this.channel_id = user.user_id + "-" + this.user.uid);
      // 初期処理：リスナー削除
      if (this.channel_id != "") {
        off(ref(getDatabase(), "messages"));
      }
      // 初期処理：表示設定
      this.channel_name = user.email;
      this.placeholder = user.email + "へのメッセージ";
      // 既存メッセージの取得
      onChildAdded(ref(getDatabase(), "messages/" + this.channel_id), (snap) => {
        this.messages.push(snap.val());
      });
    },
    // メッセージ送信処理
    sendMessage() {
      const db = getDatabase();
      const newMessage = push(child(ref(db), 'messages/' + this.channel_id));
      const key_id = newMessage.key;

      set(newMessage, {
        key: key_id,
        content: this.message,
        user: this.user.email,
        createdAt: serverTimestamp(),
      });

      this.message = "";
    }
  },
  mounted() {
    // 初期表示：自ユーザ情報保存
    this.user = getAuth().currentUser;
    // 初期表示：ダイレクトメッセージ一覧保存
    onChildAdded(ref(getDatabase(), "users"), (snap) => {
      this.users.push(snap.val());
      // console.log(snap.val());
    });
  },
  beforeUnmount() {
    // 終了時：リスナー削除
    off(ref(getDatabase(), "users"));
    off(ref(getDatabase(), "messages/" + this.channel_id));
  }
  
}

</script>
