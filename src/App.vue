<script lang="ts" setup>
import Header from "./components/Header.vue";
import "./assets/index.css";

</script>

<template>
  <Header/>
  <router-view></router-view>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: "App",
  data() {
    return {
      data_loaded: false,
      blogs: [],
    };
  },
  mounted(){
    this.LoadStateFromCookie();
  },
  methods:{
     LoadStateFromCookie: function(){
      this.$store.commit('INIT_STATE');
     },
     parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }
  },
})
</script>



<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');

html {
  font-family: "Inter", Helvetica, Arial, sans-serif;
  font-size: 14px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

* {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  @apply w-full relative relative max-w-screen-lg mx-auto;
}

.clamp3 {
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

</style>
