import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios'

require('./App.vue')


const Games = Vue.component('Games', require ('./components/Games.vue').default)

const AddGame = Vue.component('AddGame', require ('./components/AddGame.vue').default)

const EditGame = Vue.component('EditGame', require ('./components/EditGame.vue').default)

const DeleteGame = Vue.component('DeleteGame', require ('./components/DeleteGame.vue').default)

const Game = Vue.component('Game', require ('./components/Game.vue').default)

Vue.use(VueAxios, axios)
Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  {
    name: 'Games',
    path:'/',
    component: Games
  },
  {
    name: 'AddGame',
    path:'/add',
    component: AddGame
  },
  {
    name: 'EditGame',
    path:'/edit/:id',
    component: EditGame
  },
  {
    name: 'DeleteGame',
    path:'/delete',
    component: DeleteGame
  },
  {
    name: 'game',
    path:'/games/:id',
    component: Game
  }
]

const router = new VueRouter({
  mode:'history',
  routes: routes
})
window.onload = function () {
    new Vue ({
      el: '#app',
      router,
      components: { App },
      template: '<App />'
    })
}