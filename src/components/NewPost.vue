<template>
    <div class="mt-4 mb-4 row justify-content-center">
        <div class="col-10">

            <div class="row justify-content-center">
                <input 
                    type="text" 
                    placeholder="Cosa stai pensando?"
                    class="input-text col-8"
                    v-model="postText"
                >
                <button @click="addPost" class="button col-2">Twitta</button>
            </div>
        </div>
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