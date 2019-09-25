import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Brand from '../components/brands/Home'
import New from '../components/brands/New'
import Pagechange from '../components/brands/Pagechange'
import  Category from '../components/brands/Category'
import   Add from '../components/brands/Add'
import   Rewrite from '../components/brands/Rewrite'
import   Member from '../components/customer/Member'
import   Goods from '../components/goods/Goods'
import   NewProduct from '../components/goods/NewProduct'
import Delete from "../components/goods/Delete";
import Statistics from "../components/goods/Statistics";




Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/brand',
        name: 'brand',
        component: Brand
    },
    {
        path: '/brand/new',
        name: 'new',
        component: New
    },
    {
        path: 'brand/pagechange/:id',
        name: 'pagechange',
        component: Pagechange
    },
    {
        path: '/category',
        name: 'category',
        component: Category
    },
    {
        path: '/category/add',
        name: 'add',
        component: Add
    },
    {
        path: '/category/rewrite/:id',
        name: 'rewrite',
        component:Rewrite
    },
    {
        path: '/member',
        name: 'member',
        component:Member
    },
    {
        path: '/goods',
        name: 'goods',
        component:Goods
    },
    {
        path: '/goods/new',
        name: 'newProduct',
        component:NewProduct
    },

    {
        path: '/goods/delete',
        name: 'delete',
        component:Delete
    },
    {
        path: '/goods/statistics',
        name: 'statistics',
        component:Statistics
    },





];

const router = new VueRouter({
    routes
});

export default router;
