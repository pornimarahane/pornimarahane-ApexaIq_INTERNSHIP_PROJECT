<template>
  <v-container fluid class="pa-6">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold text-primary mb-2">Resume Optimization</h1>
        <p class="text-subtitle-1 text-grey-darken-1 mb-6">
          Analyze your resume's keyword density for different job roles.
        </p>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">

        <div v-if="!analysisResults">
          <v-card elevation="3" class="upload-card">
            <v-card-text class="pa-8">
              <div class="upload-area" @dragover.prevent @drop.prevent="handleDrop">
                <div v-if="isLoading" class="text-center">
                  <v-progress-circular indeterminate size="64" color="primary"></v-progress-circular>
                  <p class="mt-4 text-h6">Analyzing your resume...</p>
                </div>
                <div v-else class="text-center">
                  <v-icon size="100" color="grey">mdi-cloud-upload</v-icon>
                  <h3 class="text-h5 mt-4 mb-2">Upload Your Resume</h3>
                  <p class="text-body-1 text-grey-darken-1 mb-4">
                    Drag and drop your file here or click to browse
                  </p>
                  <v-btn color="primary" size="large" @click="$refs.fileInput.click()">
                    <v-icon start>mdi-file-upload</v-icon>
                    Choose File
                  </v-btn>
                  <input ref="fileInput" type="file" accept=".pdf" style="display: none" @change="handleFileUpload"/>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </div>

        <div v-else>
          <v-card elevation="3">
            <v-card-title class="text-h5 d-flex justify-space-between align-center">
              Resume Analysis Results
              <v-btn color="primary" variant="outlined" @click="resetAnalysis">Analyze Another</v-btn>
            </v-card-title>
            <v-card-text>
              <div v-for="result in analysisResults" :key="result.role" class="mb-6">
                <h3 class="text-h6 font-weight-bold mb-2">{{ result.role }}</h3>
                <div class="d-flex align-center mb-2">
                  <v-progress-linear
                    :model-value="result.matchPercentage"
                    color="primary"
                    height="20"
                    rounded
                  >
                    <strong>{{ result.matchPercentage }}% Match</strong>
                  </v-progress-linear>
                </div>
                
                <div v-if="result.lackingSkills.length > 0">
                  <p class="text-body-2 font-weight-medium mb-2">Recommended Keywords to Add:</p>
                  <v-chip
                    v-for="skill in result.lackingSkills"
                    :key="skill"
                    class="ma-1"
                    color="warning"
                    variant="outlined"
                    size="small"
                  >
                    {{ skill }}
                  </v-chip>
                </div>
                <v-alert v-else type="success" variant="tonal" density="compact" class="mt-2">
                  Excellent keyword coverage for this role!
                </v-alert>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="4000">
      {{ snackbar.text }}
    </v-snackbar>
  </v-container>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'ResumeOptimization',
  data() {
    return {
      isLoading: false,
      resumeFile: null,
      analysisResults: null, 
      snackbar: { show: false, text: '', color: 'success' },
    }
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) this.analyzeResume(file);
    },
    handleDrop(event) {
      const file = event.dataTransfer.files[0];
      if (file) this.analyzeResume(file);
    },
    async analyzeResume(file) {
      if (this.isLoading) return;
      this.isLoading = true;

      const formData = new FormData();
      formData.append('resume', file);

      try {
        const response = await api.post('/resume/analyze', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        this.analysisResults = response.data; 
      } catch (error) {
        this.showSnackbar(error.response?.data?.message || 'Failed to analyze resume.', 'error');
        this.analysisResults = null; 
      } finally {
        this.isLoading = false;
      }
    },
    resetAnalysis() {
      this.analysisResults = null;
      this.resumeFile = null;
    },
    showSnackbar(text, color = 'success') {
      this.snackbar.text = text;
      this.snackbar.color = color;
      this.snackbar.show = true;
    },
  }
}
</script>

