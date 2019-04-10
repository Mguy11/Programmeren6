<template id="delete">

    <div>
        <div>
         <h2>Delete Game:</h2>
         <h4>{{ game.title }}</h4>
        </div>
         <form v-on:submit.prevent = "deleteGame">
             <button type="submit" class="btn btn-xs btn-danger">Delete</button>
             <router-link class="btn btn-xs btn-primary" v-bind:to="{path:'/'}" >Cancel</router-link>
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
        deleteGame: function () {

            let uri = 'http://51.68.188.157:8000/api/'
            let id = this.$route.params.id 

            axios.delete(uri + id, this.game)
            .then(res => this.$router.push({name: 'Games'}))
            .catch(err => console.log(err))
        }
    }
    
}

</script>

