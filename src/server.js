// src/server.js
import { createServer, Model, Response } from "miragejs"

export function makeServer({ environment = "development" } = {}) {
    let server = createServer({
        environment,

        models: {
            user: Model,
        },

        seeds(server) {
            server.create("user", { name: "Bob" })
            server.create("user", { name: "Alice" })
        },

        routes() {
            this.namespace = "api"

            this.post("/login", (schema, request) => {
                let attrs = JSON.parse(request.requestBody)
                if (attrs.username == 'user' && attrs.password == 'user') {
                    return new Response(200, {}, { status: "ok", access: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" });
                } else {
                    return new Response(401, {}, { errors: ['wrong credentials'] });
                }
            })

            this.post("/blog/create", (schema, request) => {
                let attrs = JSON.parse(request.requestBody)
                addBlogIndex(attrs)
                return new Response(200, {}, { status: "ok" });
            })

            this.get("/blogs", (schema) => {
                let blogs = getBlogs()
                return blogs
            })

            this.get("/blog/:slug", (schema, request) => {
                let slug = request.params.slug
                let blog = getSingleBlog(slug)
                return blog
            })

            this.delete("/blog/:slug", (schema, request) => {
                let slug = request.params.slug
                deleteThisBlog(slug)
                return new Response(200, {}, { status: "deleted",});
            })
        },
    })


    function getBlogs() {
        let blogs = []
        if ("blog_index" in localStorage) {
            let blogIndexes = JSON.parse(localStorage.getItem('blog_index'))
            for (let i = 0; i < blogIndexes.length; i++) {
                var blog = JSON.parse(localStorage.getItem(blogIndexes[i]))
                blogs.push(blog)
            }
        }
        return blogs
    }

    function getSingleBlog(slug) {
        let blogIndexes = JSON.parse(localStorage.getItem('blog_index'))
        blogIndexes = blogIndexes.filter(index => index !== slug);
        localStorage.setItem('blog_index', JSON.stringify(blogIndexes))
        let blog = JSON.parse(localStorage.getItem(slug))
        return blog
    }

    function deleteThisBlog(slug) {
        localStorage.removeItem(slug);
    }

    function addBlogIndex(blog_data) {
        var _id = uuidv4();

        if (localStorage.getItem("blog_index") === null) {
            localStorage.setItem('blog_index', JSON.stringify([]))
        }

        // Add post to index
        let blogIndexes = JSON.parse(localStorage.getItem('blog_index'))
        let slug = convertToSlug(blog_data.title);
        blogIndexes.push(slug)
        localStorage.setItem('blog_index', JSON.stringify(blogIndexes))
        var testObject = { 'title': blog_data.title, 'description': blog_data.description, 'id': _id, 'slug': slug, 'created': getFormattedDate() }
        localStorage.setItem(slug, JSON.stringify(testObject))
    }

    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }

    function getFormattedDate() {
        var date = new Date();
        var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
        return str;
    }

    function convertToSlug(Text) {
        // TODO Add unique slug conversion
        return Text.toLowerCase()
            .replace(/ /g, '-')
            .replace(/[^\w-]+/g, '');
    }

    return server
}