<template>
    <div class="row justify-content-center">
        <h1>Registrati subito!</h1>
        <form @submit.prevent="sendRegister" class="form-container col-8">
            <div class="row form-section"> 
                <label for="username" class="col-12">Username</label>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    class="col-12" 
                    v-model="register.username"
                />
            </div>

            <div class="row form-section">
                <label for="email" class="col-12">Email</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    class="col-12"
                    v-model="register.email"
                />
            </div>

            <div class="row form-section">
                <label for="password" class="col-12">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    class="col-12"
                    v-model="register.password"
                />
            </div>

            <div class="form-section">
                <input type="submit" value="Registrati" class="btn btn-primary"> 
            </div>
        </form>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Register',

    created() {

        if(this.isAuthenticated) {
            this.$router.replace('/dashboard');
        }

    },

    computed: {
        ...mapGetters([
            'isAuthenticated',
        ])
    },

    data() {
        return {
            register: {},
        }
    },

    methods: {
        sendRegister() {
            console.log('register', this.register);

            this.$store.dispatch('register', 
                {
                    username: this.register.username,
                    email: this.register.email,
                    password: this.register.password
                }
            )
            .then(()=> {
                this.$router.replace('/dashboard')
            })
            .catch(e => {
                console.log(e)
            })
        }
    }

}
</script>