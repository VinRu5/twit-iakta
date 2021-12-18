<template>
    <div class="posts">
        <div 
            class="post" 
            v-for="post in posts"
            :key="post.id"
        >
            {{ post.message }}
            <Comments
                :idPost="post.id"
            />
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Comments from './Comments.vue';
export default {
  components: { Comments },
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