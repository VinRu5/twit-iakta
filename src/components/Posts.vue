<template>
    <div class="posts">
        <div 
            class="post" 
            v-for="post in posts"
            :key="post.id"
        >
            {{ post.message }}
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'Posts',

    created() {
        this.$store.dispatch('getApiPosts')
    },

    computed: {
        ...mapGetters([
            'getPosts'
        ]),

        posts() {
            return this.getPosts;
        }
    },

    methods: {
    
    }
}
</script>