<template>
  <div id="app">
    <!-- Barra de navegación u otros elementos comunes -->
    <router-view />
  </div>
</template>

<script>
import Login from './components/Login.vue';
import Home from './components/Home.vue';

export default {
  components: {
    Login, 
    Home,
    // Otros componentes
  },
  // Otro código necesario
};
</script>
