import './assets/main.css'

import { createApp } from 'vue';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

// Componentes del para el sitio
import LoginComponent from './components/Login.vue';
import HomeComponent from './components/Home.vue';

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'



const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LoginComponent },
    { path: '/home', component: HomeComponent, meta: { requiresAuth: true } },
    // Agrega más rutas según tu aplicación
  ],
});

createApp(App).use(router).mount('#app');

