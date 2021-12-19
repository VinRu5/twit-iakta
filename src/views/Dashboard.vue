<template>
    <div class="container-fluid container-twit">
        <div class="row justify-content-end">

            <Logout class="col-1"/>
        </div>
        <div class="row">
            <div class="col-1">
                <Navbar/>

            </div>

            <div class="col">
                <div class="row">
                    <div class="col border-container">

                        <NewPost/>

                        <Posts/>
                    </div>
                    <div class="col-12 col-md-3 col-lg-3">
                        
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
                    </div>
                </div>

            </div>



            
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Logout from '../components/Logout.vue';
import Navbar from '../components/Navbar.vue';
import NewPost from '../components/NewPost.vue';
import Posts from '../components/Posts.vue';
import Users from '../components/Users.vue';

export default {
    components: { Users, Logout, NewPost, Posts, Navbar },
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