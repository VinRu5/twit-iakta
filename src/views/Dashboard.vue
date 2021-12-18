<template>
    <div>
        Dashboard
        <NewPost/>

        <Posts/>

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

        <Logout/>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Logout from '../components/Logout.vue';
import NewPost from '../components/NewPost.vue';
import Posts from '../components/Posts.vue';
import Users from '../components/Users.vue';

export default {
  components: { Users, Logout, NewPost, Posts },
    name: 'Dashboard',

    created() {
        this.getApi()
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

        getApi() {
            this.$store.dispatch('getApiUsers')
                .then(()=> {
                    console.log('ok')
                })
                .catch(err => {
                    console.log(err)
                    this.$router.replace('/login')
                })
            this.$store.dispatch('getApiFollowedUsers')
        },

        addUser(id) {
            console.log('add', id)
            
            //genero un array di supporto per determinare gli id degli utenti che sto seguendo
            const allID = this.followedUsers.map(user => user.id)
            console.log('allID', allID)

            //se non ho già aggiunto quel determinato utente allora lo aggiungo ai seguiti
            if(!allID.includes(id)) {
                console.log('push')
                this.$store.dispatch('addFollowUser', { id: id })
                .then(()=>{
                    this.getApi()
                })
            }

        },

        removeUser(id) {
            console.log('remove', id)

            this.$store.dispatch('removeFollowUser', { id: id })
            .then(()=> {
                this.getApi()
            })
        },
    }
}
</script>