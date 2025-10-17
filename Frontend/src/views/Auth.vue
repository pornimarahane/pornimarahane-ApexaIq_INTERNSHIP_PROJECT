<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="elevation-12">
          
          <div v-if="isLoginMode">
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Login to Your Account</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="handleLogin">
                <v-text-field v-model="email" label="Email" prepend-icon="mdi-account" type="email" required></v-text-field>
                <v-text-field v-model="password" label="Password" prepend-icon="mdi-lock" type="password" required></v-text-field>
                <v-alert v-if="error" type="error" dense class="mt-3">{{ error }}</v-alert>
                <v-card-actions>
                  <v-btn text @click="isLoginMode = false">Need an account?</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn type="submit" color="primary" :loading="loading">Login</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </div>

          <div v-else>
            <v-toolbar color="primary" dark flat>
              <v-toolbar-title>Create an Account</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="handleSignup">
                <v-text-field v-model="name" label="Full Name" prepend-icon="mdi-account-box" type="text" required></v-text-field>
                <v-text-field v-model="email" label="Email" prepend-icon="mdi-at" type="email" required></v-text-field>
                <v-text-field v-model="password" label="Password" prepend-icon="mdi-lock" type="password" required></v-text-field>
                <v-alert v-if="error" type="error" dense class="mt-3">{{ error }}</v-alert>
                <v-card-actions>
                  <v-btn text @click="isLoginMode = true">Already have an account?</v-btn>
                  <v-spacer></v-spacer>
                  <v-btn type="submit" color="primary" :loading="loading">Sign Up</v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </div>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';

export default {
  data: () => ({
    isLoginMode: true, 
    name: '',
    email: '',
    password: '',
    error: null,
    loading: false,
  }),
  methods: {
    async handleLogin() {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        await authStore.login({ email: this.email, password: this.password });
        this.$router.push('/jobs'); 
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to log in.';
      } finally {
        this.loading = false;
      }
    },
    async handleSignup() {
      this.loading = true;
      this.error = null;
      try {
        const authStore = useAuthStore();
        await authStore.signup({ name: this.name, email: this.email, password: this.password });
        this.$router.push('/jobs'); // Redirect after successful signup
      } catch (err) {
        this.error = err.response?.data?.message || 'Failed to sign up.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>