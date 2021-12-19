<template>
    <section v-if="users.length > 0" :class="section">
        <h2>{{ viewComponent.title }}</h2>
        <div v-for="user in users" :key="user.id">
            <div class="user-img">
                <img src="../assets/defaultPhoto.gif" alt="">

            </div>
            {{ user.username }}
            <button @click="eventUser(user.id)">{{ viewComponent.buttonText }}</button>
        </div>
    </section>
</template>

<script>
export default {
    name: "Users",

    props: {
        users: Array,
        section: String,
    },

    computed: {
        viewComponent() {

            let content;

            switch(this.section) {
                case 'all':
                    content = {
                        title: 'Gli utenti di Twit',
                        buttonText: 'Aggiungi',
                    }
                    break
                case 'followed':
                    content = {
                        title: 'Utenti che segui',
                        buttonText: 'Non seguire più',
                    }
                    break
            }

            return content;
        }
    },

    methods: {
        eventUser(id) {

            this.$emit('buttonUser', id);
        }
    }
};
</script>