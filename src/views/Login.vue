<template>
    <div class="row justify-content-center">
        <form @submit.prevent="sendLogin" class="form-container col-8">
            <div class="row form-section"> 
                <label for="username" class="col-12">Username</label>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    class="col-12" 
                    v-model="login.username"
                />
            </div>

            <div class="row form-section">
                <label for="password" class="col-12">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    class="col-12"
                    v-model="login.password"
                />
            </div>

            <div class="form-section">
                <input type="submit" value="Accedi" class="btn btn-primary"> 
            </div>
        </form>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Login',

    created() {

        if(this.isAuthenticated) {
            this.$router.replace('/dashboard')
        }
    },

    computed: {

        ...mapGetters([
            'isAuthenticated'
        ]),

    },

    data() {
        return {
            login: {},
        }
    },

    methods: {
        sendLogin() {

            this.$store.dispatch('login', 
                { 
                    username: this.login.username, 
                    password: this.login.password
                }
            )
            .then(()=> {
                console.log('login vue then')
                this.$router.replace('/dashboard')
            })
            .catch(e => {
                console.log(e)
            })

        }
    }

}
</script>