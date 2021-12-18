<template>
    <div>
        <input 
            type="text"
            placeholder="Commenta..."
            v-model="commentText"
        >
        <button @click="addComment">Commenta</button>
    </div>
</template>

<script>
export default {
    name: 'AddComment',

    data() {
        return {
            commentText: '',
        }
    },

    props: {
        postId: Number,
    },

    methods: {
        addComment() {
            console.log(this.commentText)
            this.$store.dispatch('addComment', { postId: this.postId, comment: this.commentText })
                .then(()=> {
                    this.commentText = ''
                    this.$store.dispatch('getApiPostDetails', { id: this.postId })
                })
        }
    }

}
</script>