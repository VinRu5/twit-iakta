<template>
    <div class="container container-twit">
        <div class="row justify-content-center">
            <div class="post mt-4 col-8">

                <Post
                    :post="post"
                />
                    
                <Comments
                    :idPost="idPost"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Comments from '../components/Comments.vue'
import Post from '../components/Post.vue'
export default {
    components: { Post, Comments },

    name: 'DetailPost',

    created() {
        this.$store.dispatch('getApiPosts')

        if(!this.isAuthenticated){
            this.$router.replace('/login')
        }
    },

    computed: {

        ...mapGetters([
            'getPosts',
            'isAuthenticated'
        ]),

        idPost() {
            return Number(this.$route.params.id)
        },

        posts() {
            return this.getPosts;
        },

        post() {
            return this.posts.find(post => this.idPost === post.id)
        },
    },
}
</script>
