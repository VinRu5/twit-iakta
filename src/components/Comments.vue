<template>
    <div class="comments">
        <div 
            v-for="comment in comments" 
            :key="comment.id"
        >
            {{ comment.Text }}
        </div>
        <AddComment/>
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
}
</script>