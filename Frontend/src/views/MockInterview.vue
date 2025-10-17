<template>
  <v-container fluid class="pa-6">
    <v-row>
      <v-col cols="12">
        <h1 class="text-h4 font-weight-bold text-primary mb-2">Mock Interview Practice</h1>
        <p class="text-subtitle-1 text-grey-darken-1 mb-6">
          Prepare for your interview by practicing with a curated list of questions.
        </p>
      </v-col>
    </v-row>

    <v-row v-if="!questions" justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card elevation="4">
          <v-card-title class="text-h5 text-center py-4">Choose an Interview Type</v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col v-for="type in commonInterviewTypes" :key="type.value" cols="12" md="4">
                <v-card class="interview-type-card" @click="handleTypeSelection(type.value)">
                  <v-card-text class="text-center pa-6">
                    <v-icon size="64" :color="type.color">{{ type.icon }}</v-icon>
                    <h4 class="text-h6 mt-4">{{ type.label }}</h4>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" md="4">
                <v-card class="interview-type-card" @click="selectedType = 'technical'">
                  <v-card-text class="text-center pa-6">
                    <v-icon size="64" color="primary">mdi-code-tags</v-icon>
                    <h4 class="text-h6 mt-4">Technical</h4>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="selectedType === 'technical' && !questions" justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card elevation="4">
          <v-card-title class="text-h5 d-flex align-center py-4">
            <v-btn icon variant="text" @click="resetSelection" class="mr-2"><v-icon>mdi-arrow-left</v-icon></v-btn>
            Select a Technical Role
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text class="pa-6">
            <v-select
              v-model="selectedRole"
              :items="technicalRoles"
              label="Choose a job role"
              variant="outlined"
              prepend-inner-icon="mdi-briefcase"
            ></v-select>
            <v-btn
              block
              size="large"
              color="primary"
              :disabled="!selectedRole"
              :loading="isLoading"
              @click="handleRoleSelection"
            >
              Get Questions
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="questions" justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card elevation="4">
          <v-card-title class="text-h5 d-flex align-center py-4">
            <v-btn icon variant="text" @click="resetSelection" class="mr-2"><v-icon>mdi-arrow-left</v-icon></v-btn>
            {{ selectedType }} Questions
            <span v-if="selectedRole" class="font-weight-regular text-grey-darken-1 ml-2">- {{ selectedRole }}</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <div v-if="isLoading" class="text-center py-12">
              <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
            </div>
            <v-expansion-panels v-else variant="accordion">
              <v-expansion-panel
                v-for="(question, index) in questionsToShow"
                :key="index"
                :title="question"
              >
                <v-expansion-panel-text>
                  <p class="text-grey">Use this space to outline your answer using the STAR method (Situation, Task, Action, Result).</p>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from '@/services/api'; // Use our authenticated api service

export default {
  name: 'MockInterview',
  data() {
    return {
      isLoading: false,
      selectedType: null, 
      selectedRole: null, 
      questions: null, 
      
      commonInterviewTypes: [
        { label: 'Behavioral', value: 'behavioural', icon: 'mdi-account-star', color: 'info' },
        { label: 'HR Round', value: 'hr', icon: 'mdi-account-tie', color: 'success' },
      ],
      technicalRoles: [
        'Web Developer',
        'Full Stack Developer',
        'Automation Engineer',
        'Data Analyst',
        'Software Tester'
      ]
    };
  },
  computed: {
    questionsToShow() {
      if (!this.questions || !this.selectedType) {
        return [];
      }
      return this.questions[this.selectedType] || [];
    }
  },
  methods: {
    async fetchQuestions(role) {
      this.isLoading = true;
      this.questions = null;
      try {
        const response = await api.get(`/interview/questions/${role}`);
        this.questions = response.data;
      } catch (error) {
        console.error("Failed to fetch interview questions:", error);
      } finally {
        this.isLoading = false;
      }
    },
    handleTypeSelection(type) {
      this.selectedType = type;
      this.fetchQuestions('Web Developer');
    },
    handleRoleSelection() {
      if (!this.selectedRole) return;
    
      this.fetchQuestions(this.selectedRole);
    },
    resetSelection() {
      
      this.selectedType = null;
      this.selectedRole = null;
      this.questions = null;
      this.isLoading = false;
    }
  }
};
</script>

