<template>
  <div class="row">
    <div class="container-fluid">
      <section class=" text-center text-lg-start">
        <div class="card mb-12">
          <div class="row g-0 d-flex align-items-center">
            <div class="col-lg-12 d-none d-lg-flex">
              <img src="@/assets/logo.svg" alt="Trendy Pants and Shoes"
                class="w-100 rounded-t-5 rounded-tr-lg-0 rounded-bl-lg-5 p-5" />
            </div>
            <div class="col-lg-12">
              <div class="card-body py-5 px-md-12">

                <form @submit.prevent="login">
                  <!-- Email input -->
                  <div class="form-outline mb-12">
                    <input type="text" class="form-control" id="username" v-model="username" required />
                    <label class="form-label" for="username">Username</label>
                  </div>

                  <!-- Password input -->
                  <div class="form-outline mb-12">
                    <input type="password" class="form-control" id="password" v-model="password" required />
                    <label class="form-label" for="password">Password</label>
                  </div>

                  <!-- Error messages -->
                  <div class="form-outline mb-12">
                    <p v-if="loginError" class="text-danger">{{ loginError }}</p>
                  </div>

                  <!-- Submit button -->
                  <button type="submit" class="btn btn-primary btn-block mb-4">Login</button>

                </form>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  <!-- Section: Design Block -->
</template>
  
<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://161.35.140.236:9005/api/auth/login', {
          username: this.username,
          password: this.password
        });
        
        const accessToken = response.data.data.payload.token;
        const firstName = response.data.data.user.firstName;

        // Almacena el token en el localStorage
        localStorage.setItem('accessToken', accessToken); 
        localStorage.setItem('firstName', firstName);   
        
        const refreshToken = response.data.data.payload.refresh_token;
        localStorage.setItem('refreshToken', refreshToken);  

        const tokenExpiration = response.data.tokenExpiration; 

        const tokenDuration = tokenExpiration - Date.now();
        setTimeout(async () => {
          await this.refreshToken(refreshToken);
        }, tokenDuration - 30000); // Refresh token 30 seconds before it expires
        
        // Redirige al usuario al home después del inicio de sesión exitoso
        this.$router.push('/home');

      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.loginError = 'Usuario o contraseña incorrectos. Por favor, verifica tus credenciales.';
        } else {
          this.loginError = 'Ha ocurrido un error durante el inicio de sesión. Por favor, inténtalo de nuevo más tarde.';
        }
        console.error('Login error:', error);
      }
    },
    async refreshToken(refreshToken) {
      try {
        const response = await axios.post('http://161.35.140.236:9005/api/auth/refresh', {
          refreshToken
        });
        const newAccessToken = response.data.data.payload.token;
      } catch (error) {
        console.error('Token refresh error:', error);
      }
    }
  }
};
</script>

<style>
.rounded-t-5 {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
}

@media (min-width: 992px) {
  .rounded-tr-lg-0 {
    border-top-right-radius: 0;
  }

  .rounded-bl-lg-5 {
    border-bottom-left-radius: 0.5rem;
  }
}
</style>