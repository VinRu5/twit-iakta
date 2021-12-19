<template>
    <section v-if="users.length > 0" :class="section" class="mt-4">
        <h4 class="user-title">{{ viewComponent.title }}</h4>
        <div class="row">
            <div v-for="user in users" :key="user.id" class="col-3 col-sm-2 col-md-6 col-lg-4">
                <div class="user-card">
                    <div class="user-card-inner">
                        <div class="user-img">
                            <img src="../assets/defaultPhoto.gif" alt="">

                        </div>
                        <div class="user-name">
                            {{ user.username }}
                        </div>
                    </div>
                    <button @click="eventUser(user.id)" class="button-small" :class="viewComponent.buttonClass">{{ viewComponent.buttonText }}</button>
                </div>
            </div>

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
                        title: 'Chi twitta in giro...',
                        buttonText: '+',
                        buttonClass: 'button-small-blue',
                    }
                    break
                case 'followed':
                    content = {
                        title: 'Stai seguendo...',
                        buttonText: 'x',
                        buttonClass: 'button-small-red',
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