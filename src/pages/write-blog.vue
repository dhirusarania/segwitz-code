<template>
    <div class="pt-20 container px-6 lg:px-0">
        <h1 class="text-4xl leading-none font-extrabold tracking-tight text-gray-900 mt-10 sm:mt-14 mb-10">Write a Blog</h1>
        <div class="form">
            <div class="mb-5">
                <label>Title</label>
                <input v-model="title" class="border border-gray-300 w-full px-4 py-4 rounded mt-2" type="text" placeholder="Write a blog title">
            </div>
            <div>
                <label>Description</label>
                <textarea v-model="description" class="border border-gray-300 w-full px-4 py-4 rounded mt-2 h-64"></textarea>
            </div>
            <div class="bg-blue-500 inline-block text-white font-bold mt-5 px-6 py-3 rounded-md float-right cursor-pointer" @click="submitBlog">Submit</div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: "WriteBlog",
  data() {
    return {
        title: "",
        description: "",
    };
  },
  methods:{
     submitBlog: function () {
         var payload = {
             title: this.title,
             description: this.description
         }
        this.$store.dispatch('CreateBlog', payload).then(res=>{
          this.$router.push('/')
        })
     }
  },

})
</script>

<style lang="scss" scoped>
label{
    @apply font-bold
}

.container{
    @apply max-w-screen-md
}
</style>