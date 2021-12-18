<template>
    <div>
        Dashboard
        <Users 
            :users="allUsers" 
            section='all'
            @buttonUser="addUser"
        />
        <Users 
            :users="followedUsers" 
            section='followed'
            @buttonUser="removeUser"
        />

        <button class="btn btn-light" @click="logout()">Logout</button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Users from '../components/Users.vue';

export default {
  components: { Users },
    name: 'Dashboard',

    created() {
        this.$store.dispatch('getApiUsers')
    },

    computed: {
        ...mapGetters([
            'getUsers',
            'getFollowedUsers',
        ]),

        allUsers() {
            return this.getUsers;
        },

        followedUsers() {
            return this.getFollowedUsers;
        }
    },

    methods: {
        logout() {
            this.$store.dispatch('logout')
            .then(()=> {
                this.$router.replace('/login')
            })
        },

        addUser(id) {
            console.log('add', id)
        },

        removeUser(id) {
            console.log('remove', id)
        },
    }
}
</script>