<template id="game-list">
    
    <div class="row container">
    <div class="pull-right">
        <router-link class="btn btn-xs btn-primary" v-bind:to="{path:'/add'}">
            <span class="glyphicon glyphicon-plus"></span>Add new Game
        </router-link>
      
    </div><br><br>

    <table class="table table-bordered col-md-12">

        <thead>
            <tr>
                <th>#</th>
                <th>Title</th>
                <th>Studio</th> 
                <th>Genre</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="game in games" :key="game._id">
                <td>{{ game._id }}</td>
                <td> {{ game.title }}</td>
                <td> {{ game.studio }} </td>
                <td> {{ game.genre}} </td>
                <td>
                    <router-link class="btn btn-info btn-xs" v-bind:to="{name: 'game', params: {id:game._id}}">Details</router-link>
                    <router-link class="btn btn-warning btn-xs" v-bind:to="{name: 'EditGame', params: {id:game._id}}">Edit</router-link>
                    <router-link class="btn btn-danger btn-xs" v-bind:to="{name: 'DeleteGame', params: {id:game._id}}">Delete</router-link>
                </td>
            </tr>
        </tbody>
    
    </table>
  
  </div>

</template>

<script>
export default {
  data() {
    return {
      games: []
    };
  },
  mounted: function() {
    this.axios
      .get("http://51.68.188.157:8000/api/")
      .then(response => {
        this.games = response.data.items;
        console.log(response.data.items);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<style>
.pull-right {
  top:25px;
  position: relative;
  align-content: center;
}
table {
  top: 50px;
  position: relative;
}
</style>