<template>
    <div>
        <div class="username">{{ userName(post.UserId) }}</div>
        <div class="message">{{ post.message }}</div>
        <div class="date">{{ post.date }}</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'Post',

    props: {
        post: Object,
    },

    computed: {
        ...mapGetters([
            'getUsers'
        ]),
    },

    methods: {
        userName(id) {

            const users = this.getUsers;

            const userObj = users.find(user => id === user.id);

            return userObj.username;
        },
    }
}
</script>