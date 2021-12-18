<template>
    <div>
        Dashboard
        <button class="btn btn-light" @click="logout()">Logout</button>
    </div>
</template>

<script>
export default {
    name: 'Dashboard',

    created() {
        this.$store.dispatch('getUsers')
    },

    methods: {
        logout() {
            this.$store.dispatch('logout');
        }
    }
}
</script>