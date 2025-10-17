import { defineStore } from 'pinia';
import axios from 'axios';
import router from '@/router'; 

const API_URL = 'http://localhost:5000/api/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
    token: (state) => state.user?.token,
    userId: (state) => state.user?._id,
  },
  actions: {
    async login(userData) {
      // This is where the frontend "matches" the data with the backend
      const response = await axios.post(`${API_URL}/login`, userData);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        this.user = response.data;
      }
      return response.data;
    },
    async signup(userData) {
      const response = await axios.post(`${API_URL}/signup`, userData);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        this.user = response.data;
      }
      return response.data;
    },
    updateUser(updatedData) {
      this.user = { ...this.user, ...updatedData };
      localStorage.setItem('user', JSON.stringify(this.user));
    },
    logout() {
      localStorage.removeItem('user');
      this.user = null;
      // After logout, send the user back to the login page
      router.push('/login');
    },
  },
});