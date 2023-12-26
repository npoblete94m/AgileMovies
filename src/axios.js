import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://161.35.140.236:9005/',
  timeout: 10000,
  // Otras configuraciones de Axios
});

// Interceptor para agregar el token a las solicitudes
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Manejar la respuesta después de iniciar sesión
instance.interceptors.response.use(
  (response) => {
    const tokenFromResponse = response.data.data.payload.token; // Obtener el token de la respuesta
    if (tokenFromResponse) {
      localStorage.setItem('accessToken', tokenFromResponse); // Almacenar el token en localStorage
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
