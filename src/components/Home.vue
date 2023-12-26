<template>
        <div>
            <h3 v-if="userData.firstName && userData.lastName">{{ userData.firstName }} {{ userData.lastName }}</h3>
            <!-- Resto del código del carrusel -->
        </div>
    <div>
      <h3 v-if="userData.firstName && userData.lastName">{{ userData.firstName }} {{ userData.lastName }}</h3>
  
      <b-carousel
        controls
        indicators
        background="#ababab"
        interval="4000"
        @sliding-start="loadMoreMovies"
        style="margin-top: 20px;">
        <b-carousel-slide v-for="(movie, index) in movies" :key="index">
          <img :src="imageBaseUrl + movie.poster_path" alt="Movie Poster">
          <h4>{{ movie.title }}</h4>
          <p>{{ movie.overview }}</p>
        </b-carousel-slide>
      </b-carousel>
    </div>
</template>

  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        userData: {},
        movies: [],
        imageBaseUrl: 'https://image.tmdb.org/t/p/w500',
        page: 1,
        totalPages: null
      };
    },
    async created() {
        await this.loadUserData();
        await this.loadMoreMovies();
    },

    methods: {
        async loadUserData() {
            try {
                const response = await axios.get('http://161.35.140.236:9005/api/auth/login');
                this.userData = response.data.data.user; // Obtener la info de 'user' en los datos
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        },
        async loadMoreMovies() {
            if (this.page <= this.totalPages || this.totalPages === null) {
              try {
                  const token = localStorage.getItem('accessToken'); // Obtener el token del localStorage
                  const headers = { Authorization: `Bearer ${token}` }; 
                  const response = await axios.get(`http://161.35.140.236:9005/api/movies/now_playing?page=${this.page}`, { headers });
                  this.movies.push(...response.data.data[i]++);
                  this.totalPages = response.data.total_pages;
                  this.page++;
                  console.log(response.data)
              } catch (error) {
                  console.error('Error fetching movies:', error);
              }
            }
            console.log('Quiero ver datos2:'+response.data); // Verifica que la respuesta contenga los datos esperados
        }
    }
  };
  </script>
  
    <style>
    /* Estilos si es necesario */
    </style>
    