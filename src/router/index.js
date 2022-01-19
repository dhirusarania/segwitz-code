import { createRouter, createWebHistory } from "vue-router";
import Index from "../pages/index.vue";
import Login from "../components/Login.vue";
import WriteBlog from "../pages/write-blog.vue";
import Blog from "../pages/blog/_slug.vue";

const history = createWebHistory();

const router = createRouter({
    history,
    routes: [
        {
            path: "/",
            component: Index
        },
        {
            path: "/write-blog",
            component: WriteBlog
        },
        {
            path: "/login",
            component: Login
        },
        {
            path: '/blog/:slug',
            component: Blog
        }
    ]
})

export default router;