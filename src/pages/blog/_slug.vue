<template>
  <div class="pt-36 container px-6">
    <div>
      <img
          class="h-64 w-full object-cover object-center rounded-lg"
          :src="`https://source.unsplash.com/random`"
          alt="content"
      />
      <h1
        class="
          text-4xl
          leading-none
          font-extrabold
          tracking-tight
          text-gray-900
          mt-10
          sm:mt-14
          mb-10
        "
      >
        {{data.title}}
      </h1>
    </div>
    <div class="text-lg">
        {{data.description}}
    </div>
    <div v-if="isLoggedIn" @click="DeleteBlog" class="text-red-500 float-right font-bold mt-2 cursor-pointer">Delete this blog</div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
export default defineComponent({
  name: "BlogList",
  data() {
    return {
       slug: this.$route.params.slug,
       data: {}
    };
  },
  mounted(){
    this.GetBlogs();
  },
  computed:{
      isLoggedIn(){
        return this.$store.state.isLoggedIn;
      },
  },
  methods:{
     GetBlogs: function(){
       this.$store.dispatch('GetSingleBlog', this.slug).then(res => {
          this.data = res.data
       })
     },
     DeleteBlog: function(){
       this.$store.dispatch('DeleteBlog', this.slug).then(res => {
          this.$router.push('/')
       })
     },
  },

})
</script>

<style lang="scss" scoped>
.container{
    @apply max-w-screen-md
}
</style>