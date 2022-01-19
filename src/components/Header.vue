<template>
  <div>
    <div class="fixed w-full top-0 z-10 header-blur">
      <div class="z-20">
        <div
          class="
            container hero forum px-6 lg:px-0 py-4 hero mx-auto flex justify-between items-center w-full"
        >
          <div class="navigation flex justify-between items-center w-full">
            <RouterLink
              class="
                font-bold text-xl text-black flex items-center mx-4"
              to="/"
              ><img
                class="logo"
                height="30"
                width="30"
                src="https://vuejs.org/images/logo.svg"
              /><span class="ml-3">Segwitz Blogs</span></RouterLink
            >

            <div class="items-center flex mx-4 header-links">
              <RouterLink v-if="isLoggedIn != ''" to="/write-blog" class="px-4 mx-4 font-bold">Write a Blog</RouterLink>
              <RouterLink v-if="isLoggedIn == ''" to="/login" class="px-4 myx4 font-bold">Login</RouterLink>
              <div v-else class="px-4 myx4 font-bold">Hi, {{username}}! <span class="cursor-pointer" @click="logout">Logout</span></div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: "Header",
  data() {
    return {
      data_loaded: false,
      blogs: [],
    };
  },
  computed:{
      isLoggedIn(){
        return this.$store.state.isLoggedIn;
      },
      username(){
        return this.$store.state.username;
      }
  },
  methods:{
    logout: function(){
      this.cookies.remove('user-auth')
      this.$router.push('/')
      window.location.reload()
    }
  },

})
</script>

<style lang="scss" scoped>
.header-links {
  a {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      bottom: -12px;
      left: 0;
      right:0;
      width: 50%;
      margin: auto;
      height: 2px;
      opacity: 0;
      background-color: black;
      transition: opacity 300ms, transform 300ms;
      opacity: 1;
      transform: scale(0);
      transform-origin: center;
    }
    &:hover::after,
    &:focus::after {
      transform: scale(1);
    }
  }
}
</style>