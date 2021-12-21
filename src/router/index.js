import Vue from 'vue'
import VueRouter from 'vue-router'
import ProductsTable from '../views/ProductsTable.vue'
import ProductsForm from '../views/ProductForm.vue'
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Table',
    component: ProductsTable
  },
  {
    path: '/new',
    name: 'Form',
    component: ProductsForm
  },
  {
    path: '/edit/:id',
    name: 'Form',
    component: ProductsForm,
    props: true
  },
  {
    path:'/about',
    name: 'About',
    component: About
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
