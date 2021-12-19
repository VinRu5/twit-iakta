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

            const userObj = users.filter(user => id === user.id);
            
            console.log(userObj)

            return userObj[0].username;
        }
    }
}
</script>