<template>
  <v-container v-if="isLoading" class="fill-height">
    <v-row align="center" justify="center">
      <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
    </v-row>
  </v-container>

  <v-container v-else fluid class="pa-6">
    <h1 class="text-h4 font-weight-bold text-primary mb-2">
      Welcome back, {{ userData.fullName }}!
    </h1>
    </v-container>
</template>

<script>
import axios from 'axios'; 
import { useAuthStore } from '@/stores/authStore';

const API_URL = 'http://localhost:5000/api';

export default {
  name: 'Dashboard',
  data() {
    return {
      isLoading: true,
      userData: {
        fullName: '',
        avatarUrl: ''
      },
      userProgress: {
        jobFitScore: 0,
        skillsCompleted: 0,
        totalSkills: 0,
        mockInterviewsDone: 0,
        gdSessionsDone: 0
      },
      detailedStats: [
        { title: 'Resume Score', value: 'N/A', route: '/resume', /* ... */ },
        { title: 'GD Sessions', value: 0, route: '/interview', /* ... */ },
        { title: 'Active Applications', value: 0, route: '/jobs', /* ... */ },
      ],
      quickActions: [
        { title: 'Start Mock Interview', route: '/interview', /* ... */ },
        { title: 'Browse Jobs', route: '/jobs', /* ... */ },
        { title: 'Learn New Skill', route: '/skills', /* ... */ },
        { title: 'Optimize Resume', route: '/resume', /* ... */ }
      ],
      topJobs: []
    }
  },
  async created() {
    await this.fetchDashboardData();
  },
  methods: {
    async fetchDashboardData() {
      this.isLoading = true;
      const authStore = useAuthStore();
      
      if (!authStore.token) {
        this.$router.push('/auth');
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/dashboard`, {
          headers: {
            Authorization: `Bearer ${authStore.token}`
          }
        });

        const data = response.data;

        // Populate all the data properties with the response from the backend
        this.userData = data.userData;
        this.userProgress = data.userProgress;
        this.topJobs = data.topJobs;

        // Update detailed stats with dynamic data
        this.detailedStats.find(s => s.title === 'Active Applications').value = data.detailedStats.activeApplications;
        this.detailedStats.find(s => s.title === 'Resume Score').value = data.detailedStats.resumeScore;
        this.detailedStats.find(s => s.title === 'GD Sessions').value = data.userProgress.gdSessionsDone;

      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        this.isLoading = false;
      }
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    viewJob(job) {
      this.$router.push('/jobs');
    }
  }
}
</script>

