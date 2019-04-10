<template id="game">
    
    <div>
        <h3>{{game.title}}</h3>

        <div>
            
                <dt>Studio</dt>
                <dl>{{game.studio}}</dl>
                <dt>Genre</dt>
                <dl>{{game.genre}}</dl>


        </div>

        <span class="glyphicon glyphicon-arrow-left"></span>
        <router-link class="btn btn-xs btn-primary" v-bind:to="{path:'/'}" >Back</router-link>

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
    
    }

}
</script>