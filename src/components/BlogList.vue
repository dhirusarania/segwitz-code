<template>
  <div class="pt-20 container px-6" v-if="data_loaded">
    <div v-if="blogs.length == 0" class="text-center">
      <img src="empty.gif" class="mx-auto w-[500px]">
      <h1 class="text-2xl font-bold">Oh no!! No post added</h1>
      <p>Write something awesome</p>
      <RouterLink to="write-blog" class="bg-blue-500 inline-block text-white font-bold mt-5 px-6 py-3 rounded-md cursor-pointer">Write</RouterLink>
    </div>
    <div class="flex" v-else>
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
        Featured Blogs
      </h1>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-16">
      <div class="w-full post cursor-pointer" v-for="(p, i) in blogs" :key="p.id">
         <RouterLink :to="`/blog/${p.slug}`" class="">
          <div
            class="
              relative
              mb-6
              h-48
              w-full
              object-cover object-center
              overflow-hidden
              rounded-lg
            "
          >
            <img
              class="absolute h-48 w-full object-cover object-center"
              :src="`https://source.unsplash.com/random?sig=${i}`"
              alt="content"
            />
          </div>
          <h2 class="text-lg text-gray-900 font-black title-font">
            {{p.title}}
          </h2>
          <p class="leading-relaxed text-base pt-2 clamp3">
            {{p.description}}
          </p>
        </RouterLink>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
export default defineComponent({
  name: "BlogList",
  data() {
    return {
      data_loaded: false,
      blogs: [],
    };
  },
  mounted(){
    this.GetBlogs();
  },
  methods:{
     GetBlogs: function(){
       this.$store.dispatch('GetBlogs').then(res => {
          this.blogs = res.data
          this.data_loaded = true
       })
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

<style lang="scss" scoped>
.post {
  img {
    transition: transform 0.3s ease-out;
  }
  &:hover {
    img {
      transform: scale(1.1);
      transition: transform 0.3s ease-out;
    }
  }
}
</style>
