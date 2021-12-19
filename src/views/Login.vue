<template>
    <div class="container container-twit">
        <div class="home-link">
            <router-link to="/" class="home-link-rel">Home</router-link>
        </div>

        <div class="row justify-content-center">
            <h1 class="form-title">Accedi immediatamente!</h1>
            <div class="col-10 col-md-8 col-lg-6">

                <form @submit.prevent="sendLogin" class="form-container">
                    <div class="row form-section"> 
                        <label for="username" class="col-12">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            name="username" 
                            class="col-12 input-text"
                            placeholder="Inserisci il tuo username" 
                            v-model="login.username"
                        />
                    </div>

                    <div class="row form-section">
                        <label for="password" class="col-12">Password</label>
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            class="col-12 input-text"
                            placeholder="Inserisci la tua password" 
                            v-model="login.password"
                        />
                    </div>

                    <div class="form-section">
                        <input type="submit" value="Accedi" class="button"> 
                    </div>
                </form>
            </div>

        </div>
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
            ).then(()=> {
                console.log('login vue then')
                this.$router.replace('/dashboard')
            }).catch(e => {
                console.log(e)
            })

        }
    }

}
</script>