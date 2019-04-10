<template id="edit">

    <div>

        <h3>Edit Game</h3>

        <form v-on:submit.prevent = "editGame">
            <div class="form-group">
                <label for="edit-title">Title</label>
                <input v-model="game.title" class="form-control" id="edit-title" placeholder="game.title" required />
            </div>
            <div class="form-group">
                <label for="edit-studio">Studio</label>
                <input v-model="game.studio" class="form-control" id="edit-studio" placeholder="Game Studio" required />
            </div>
            <div class="form-group">
                <label for="edit-genre">Genre</label>
                <input v-model="game.genre" class="form-control" id="edit-genre" placeholder="Game Genre" required />
            </div>

            <button type="submit" class="btn btn-xs btn-primary">Edit Game </button>
            <router-link class="btn btn-xs btn-warning" v-bind:to="{path:'/'}">Cancel</router-link>
        </form>

    </div>

</template>

<script>

import VueRouter from 'vue-router'
import VueAxios from 'vue-axios'
import axios from 'axios'



export default {
    data: function() {
        return {
            game: {
                title: '',
                studio: '',
                genre: ''
            }
        }
    },

    created: function() {

            let uri = 'http://51.68.188.157:8000/api/'
            let id = this.$route.params.id 

            axios.get(uri + id).then((response) => {
                console.log(response)
                this.game = response.data
            })
            .catch(function (error){
                console.log(error)
            })
    
    },
    
    methods: {
        editGame: function () {

            let uri = 'http://51.68.188.157:8000/api/'
            let id = this.$route.params.id 

            axios.put(uri + id, this.game).then((response) => {
                console.log(response)
                this.$router.push({name: 'Games'})
            })
            .catch(function (error){
                console.log(error)
            })
        }
    }
    
}

</script>
