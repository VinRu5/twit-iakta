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

export default {
    name: 'Login',

    data() {
        return {
            login: {},
        }
    },

    methods: {
        sendLogin() {

            this.$store.dispatch('login', { username: this.login.username, password: this.login.password})

            // axios.post('http://staging.iakta.net:8000/api/login', this.login)
            // .then(res => {
            //     console.log(res.data);
            //     this.$cookies.set('token', res.data.token);
            //     //localStorage.token = res.data.token;
            //     this.$emit('loginTrue');
            // })
            // .catch(e => {
            //     console.error(e);
                
            // })
        }
    }

}
</script>