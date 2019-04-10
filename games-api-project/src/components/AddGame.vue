<template id="add">

    <div>
        <h3>Add new Game</h3>

        <form v-on:submit.prevent = "createGame">

            <div class="form-group">
                <label for="add-title">Title</label>
                <input v-model="game.title" class="form-control" id="add-title" placeholder="Game Title" required />
            </div>

            <div class="form-group">
                <label for="add-studio">Studio</label>
                <input v-model="game.studio" class="form-control" id="add-studio" placeholder="Game Studio" required />
            </div>

            <div class="form-group">
                <label for="add-genre">Genre</label>
                <input v-model="game.genre" class="form-control" id="add-genre" placeholder="Game Genre" required />
            </div>

            <button type="submit" class="btn btn-xs btn-primary">Add Game</button>
            <router-link class="btn btn-xs btn-warning" v-bind:to="{path:'/'}">Cancel</router-link>

        </form>
    </div>

</template>

<script>

import Vue from 'vue'
import axios from 'axios'
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios'



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

    methods: {
        createGame: function() {

            let uri = 'http://51.68.188.157:8000/api/'
            
            axios.post(uri, this.game)
            .then(res => this.$router.push({name:'Games'})
        )
            .catch(function(err){console.log(err)})
    }

    }
    
}

</script>
