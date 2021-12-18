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

    methods: {
        addComment() {
            console.log(this.commentText)
        }
    }

}
</script>