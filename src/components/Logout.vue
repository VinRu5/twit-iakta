<template>
  <button class="button" @click="logout()">Logout</button>
</template>

<script>
export default {

    name: 'Logout',

    methods: {

        logout() {
            this.$store.dispatch('logout')
            .then(()=> {
                this.$router.replace('/login')
            })
        },
    }
}
</script>