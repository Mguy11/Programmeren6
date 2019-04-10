import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/App.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'Games',
      path:'/',
      component: Games
    }
    
  ]
})
