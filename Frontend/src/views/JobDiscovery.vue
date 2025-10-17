<template>
  <v-container fluid class="pa-6">
    <v-row v-if="!authStore.user?.skills || authStore.user.skills.length === 0" justify="center" class="text-center mt-8">
      <v-col cols="12" md="6">
        <v-card elevation="5" class="pa-8">
          <v-card-title class="text-h4 font-weight-bold text-primary mb-4">
            Start Your Job Search
          </v-card-title>
          <v-card-subtitle>
            Upload your resume to get personalized job recommendations.
          </v-card-subtitle>
          <v-file-input
            v-model="resumeFile"
            label="Upload Resume (.pdf)"
            variant="outlined"
            prepend-icon="mdi-paperclip"
            accept=".pdf"
            class="my-6"
            :loading="isParsing"
            :disabled="isParsing"
          ></v-file-input>
          <v-btn
            size="large"
            color="primary"
            @click="parseResume"
            :disabled="!resumeFile || isParsing"
            :loading="isParsing"
          >
            <v-icon start>mdi-rocket-launch</v-icon>
            Parse & Find Jobs
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12" md="3">
        <v-card elevation="3">
          <v-card-title class="bg-primary text-white">
            <v-icon start>mdi-filter-variant</v-icon>
            Search Filters
          </v-card-title>
          <v-card-text class="pt-4">
            <v-text-field
              v-model="searchQuery.what"
              label="Job Role, Skills..."
              prepend-inner-icon="mdi-briefcase"
              variant="outlined"
              density="compact"
            ></v-text-field>
            <v-text-field
              v-model="searchQuery.where"
              label="Location"
              prepend-inner-icon="mdi-map-marker"
              variant="outlined"
              density="compact"
              class="mt-4"
            ></v-text-field>
            <v-btn
              block
              color="primary"
              class="mt-6"
              @click="fetchJobs"
              :loading="isLoadingJobs"
              :disabled="isLoadingJobs"
            >
              <v-icon start>mdi-magnify</v-icon>
              Search
            </v-btn>
          </v-card-text>
        </v-card>
        <v-card v-if="authStore.user" elevation="3" class="mt-4 pa-4 text-center">
            <v-avatar color="primary" size="64" class="mb-2">
                <v-icon dark>mdi-account</v-icon>
            </v-avatar>
            <p class="text-grey font-weight-bold">{{ authStore.user.email }}</p>
        </v-card>
      </v-col>

      <v-col cols="12" md="9">
        <v-row v-if="isLoadingJobs">
          <v-col v-for="n in 6" :key="n" cols="12" md="6" lg="4">
            <v-skeleton-loader type="card-avatar"></v-skeleton-loader>
          </v-col>
        </v-row>
        
        <v-row v-else-if="jobs.length > 0">
          <v-col cols="12" md="6" lg="4" v-for="job in sortedJobs" :key="job.id">
            <v-card elevation="4" class="job-card h-100 d-flex flex-column">
              <v-card-text>
                <h3 class="text-h6 font-weight-bold mb-1">{{ job.title }}</h3>
                <p class="text-body-2 text-grey-darken-1">{{ job.company }}</p>
                <div class="mt-3">
                  <v-chip size="small" :color="getFitScoreColor(job.fitScore)" label class="mr-2 mb-2">
                    <v-icon start size="16">mdi-target</v-icon>
                    {{ job.fitScore }}% Match
                  </v-chip>
                  <v-chip size="small" label variant="outlined" class="mb-2">
                    <v-icon start size="16">mdi-map-marker</v-icon>
                    {{ job.location }}
                  </v-chip>
                </div>
                <p class="text-body-2 text-grey-darken-2 my-3">{{ job.description.substring(0, 120) }}...</p>
              </v-card-text>
              <v-spacer></v-spacer>
              <v-card-actions class="px-4 pb-4">
                  <v-btn block color="primary" variant="flat" :href="job.applyUrl" target="_blank" @click="handleApplyClick(job.id)">
                    View & Apply
                  </v-btn>
              </v-card-actions>
              <v-expand-transition>
                  <div v-if="recentlyViewedJobs.has(job.id) && !appliedJobs.has(job.id)">
                    <v-sheet color="light-blue-lighten-5" class="pa-3 text-center">
                        <p class="text-body-2 mb-2">Did you apply for this job?</p>
                        <v-btn size="small" color="success" @click.stop="trackApplication(job)">
                          Yes, I Applied
                        </v-btn>
                    </v-sheet>
                  </div>
              </v-expand-transition>
              <v-sheet v-if="appliedJobs.has(job.id)" color="green-lighten-5" class="pa-2 text-center text-success text-caption font-weight-bold">
                <v-icon size="small">mdi-check-circle</v-icon>
                Application Tracked
              </v-sheet>
            </v-card>
          </v-col>
        </v-row>
        
        <v-row v-else class="mt-8">
           <v-col cols="12" class="text-center">
             <v-icon size="100" color="grey">mdi-briefcase-search-outline</v-icon>
             <h3 class="text-h5 mt-4 text-grey-darken-1">No jobs found</h3>
             <p class="text-body-1 text-grey">Try a different search or check back later.</p>
           </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
      {{ snackbar.text }}
    </v-snackbar>
  </v-container>
</template>

<script>
import api from '@/services/api'; 
import { useAuthStore } from '@/stores/authStore';

export default {
  name: 'JobDiscovery',
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      resumeFile: null,
      isParsing: false,
      isLoadingJobs: false,
      searchQuery: { what: '', where: '' },
      jobs: [],
      recentlyViewedJobs: new Set(),
      appliedJobs: new Set(),
      snackbar: { show: false, text: '', color: 'success' },
    }
  },
  computed: {
    sortedJobs() {
      return [...this.jobs].sort((a, b) => b.fitScore - a.fitScore);
    }
  },
  methods: {
    showSnackbar(text, color = 'success') {
        this.snackbar.text = text;
        this.snackbar.color = color;
        this.snackbar.show = true;
    },
    async parseResume() {
      if (!this.resumeFile) return;
      this.isParsing = true;
      const formData = new FormData();
      formData.append('resume', this.resumeFile);
      try {
        const response = await api.post('/user/upload-resume', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        this.authStore.updateUser(response.data.user);
        this.showSnackbar(response.data.message);
        if (this.authStore.user.skills?.length > 0) {
          this.searchQuery.what = this.authStore.user.skills.slice(0, 2).join(' ');
          this.searchQuery.where = 'India';
          await this.fetchJobs();
        }
      } catch (error) {
        this.showSnackbar(error.response?.data?.message || 'Failed to parse resume.', 'error');
      } finally {
        this.isParsing = false; 
      }
    },
    async fetchJobs() {
        if (!this.searchQuery.what || !this.searchQuery.where) {
            this.showSnackbar('Please provide both job role and location.', 'warning');
            return;
        }
        this.isLoadingJobs = true;
        this.jobs = [];
        try {
            const response = await api.get('/jobs/search', {
                params: this.searchQuery
            });
            this.jobs = response.data;
        } catch (error) {
            this.showSnackbar(error.response?.data?.message || 'Failed to fetch jobs.', 'error');
        } finally {
            this.isLoadingJobs = false;
        }
    },
    handleApplyClick(jobId) {
      this.recentlyViewedJobs.add(jobId);
    },
    
    async trackApplication(job) {
        try {
            await api.post('/user/track-application', {
                adzunaId: job.id,
                title: job.title,
                company: job.company
            });
            this.appliedJobs.add(job.id);
            this.showSnackbar(`Application for "${job.title}" tracked!`);
        } catch (error) {
            this.showSnackbar('Could not track application.', 'error');
        }
    },
    getFitScoreColor(score) {
      if (score >= 85) return 'success'
      if (score >= 70) return 'info'
      if (score >= 50) return 'warning'
      return 'grey'
    },
  },
  created() {
    if (this.authStore.user?.skills?.length > 0) {
      this.searchQuery.what = this.authStore.user.skills.slice(0, 2).join(' ');
      this.searchQuery.where = 'India';
      this.fetchJobs();
    }
  }
}
</script>

