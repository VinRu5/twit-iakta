<template>
    <div>
        <input 
            type="text" 
            placeholder="Cosa stai pensando?"
            v-model="postText"
        >
        <button @click="addPost">Pubblica</button>
    </div>
</template>

<script>
export default {
    name: 'NewPost',

    data() {
        return {
            postText: '',
        }
    },

    methods: {
        addPost() {
            console.log(this.postText)
            this.$store.dispatch('postMessage', { text: this.postText })
                .then(()=> {
                    this.postText = ''
                })
                .catch(err => {
                    console.log(err)
                    this.$router.replace('/login')
                })
        }
    }
}
</script>
