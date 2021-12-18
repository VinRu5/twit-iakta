<template>
    <div class="comments">
        <div 
            v-for="comment in comments" 
            :key="comment.Id"
        >
            {{ comment.Text }}
            <button @click="removeComment(comment.Id)">Elimina</button>
        </div>
        <AddComment 
            :postId="idPost"
        />
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AddComment from './AddComment.vue';
export default {
    components: { AddComment },
    name:'Comments',

    props:{
        idPost: Number,
    },

    created() {
        this.$store.dispatch('getApiPostDetails', { id: this.idPost })
    },

    computed: {
        ...mapGetters([
            'getPostDetails'
        ]),

        comments() {
            return this.getPostDetails;
        }
    },

    methods: {
        removeComment(id) {
            console.log(id)
            this.$store.dispatch('removeComment', { postId: this.idPost, commentId: id })
                .then(()=> {
                    this.$store.dispatch('getApiPostDetails', { id: this.idPost })
                })
        }
    },
}
</script>