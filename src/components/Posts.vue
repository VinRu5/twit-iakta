<template>
    <div class="posts row justify-content-center">
        <div 
            class="post col-10" 
            v-for="post in posts"
            :key="post.id"
        >
            <div class="username">{{ userName(post.UserId) }}</div>
            <div class="message">{{ post.message }}</div>
            <div class="date">{{ post.date }}</div>
            
            <Comments
                :idPost="post.id"
                v-if="post.viewComment"
            />
            <div class="view-comment" @click="showComment(post.id)">Vai al post =></div>
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
            'getPosts',
            'getUsers'
        ]),

        posts() {
            return this.getPosts;
        },

        
    },

    methods: {
        userName(id) {

            const users = this.getUsers;

            const userObj = users.find(user => id === user.id);

            return userObj.username;
        },

        showComment(id) {

            const postReset = this.posts.map(post => {
                return {...post, viewComment: false}
            });

            console.log('reset',postReset)
            this.posts = postReset;

            const index = this.posts.findIndex(post=> id === post.id);
            
            this.posts[index].viewComment = true;
        }
    }
}
</script>