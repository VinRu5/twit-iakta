<template>
    <div class="posts row justify-content-center">
        <div 
            class="post col-10" 
            v-for="post in posts"
            :key="post.id"
        >
            <Post
                :post="post"
            />

            <router-link :to="`/post/${post.id}`" class="view-comment">
                Vai al post =>
            </router-link>
            
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Post from './Post.vue';
export default {
    components: { Post },
    name: 'Posts',

    created() {
        this.$store.dispatch('getApiPosts')
    },

    computed: {
        ...mapGetters([
            'getPosts',
        ]),

        posts() {
            return this.getPosts;
        },

        
    },
}
</script>