<template>
  <v-container fluid class="pa-6">
    <div v-if="!analysisComplete">
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card elevation="4" class="text-center pa-8">
            <v-card-title class="text-h4 font-weight-bold text-primary mb-4">
              Analyze Your Skills
            </v-card-title>
            <v-card-subtitle class="mb-6">
              Select one of your applied jobs to generate a personalized learning roadmap.
            </v-card-subtitle>

            <div v-if="isLoadingTitles">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </div>
            
            <div v-else-if="error">
              <v-alert type="error" variant="tonal" class="mb-4">{{ error }}</v-alert>
              <v-btn color="primary" @click="$router.push('/jobs')">Apply for a Job</v-btn>
            </div>

            <div v-else>
              <v-select
                v-model="selectedJobTitle"
                :items="appliedJobTitles"
                label="Select a Job Title to Analyze"
                variant="outlined"
                prepend-inner-icon="mdi-briefcase"
                class="mb-4"
              ></v-select>
              <v-btn
                size="large"
                color="primary"
                :disabled="!selectedJobTitle"
                :loading="isLoadingAnalysis"
                @click="fetchSkillAnalysis"
              >
                <v-icon start>mdi-chart-bar</v-icon>
                Analyze My Skills
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div v-else>
      <v-row>
        <v-col cols="12">
          <h1 class="text-h4 font-weight-bold text-primary mb-2">Skills & Learning</h1>
          <p class="text-subtitle-1 text-grey-darken-1 mb-6">
            Your personalized roadmap for the role of **{{ selectedJobTitle }}**
          </p>

          <v-card elevation="4" class="mb-6">
            <v-tabs v-model="currentTab" color="primary" align-tabs="center" grow>
              <v-tab value="skills">Skills Overview</v-tab>
              <v-tab value="learning">Learning Resources</v-tab>
            </v-tabs>

            <v-card-text>
              <v-window v-model="currentTab">
                <v-window-item value="skills">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-card flat class="mb-4">
                        <v-card-title class="text-h6 font-weight-bold text-success">
                          <v-icon left>mdi-check-circle</v-icon> Skills You Have
                        </v-card-title>
                        <v-card-text>
                          <v-chip
                            v-for="skill in skillsYouHave"
                            :key="skill.name"
                            class="ma-1"
                            color="success"
                            label
                          >
                            <v-icon start>mdi-check</v-icon>
                            {{ skill.name }}
                          </v-chip>
                          <p v-if="skillsYouHave.length === 0" class="text-grey-darken-1">
                            No matching skills found from your profile for this job.
                          </p>
                        </v-card-text>
                      </v-card>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-card flat class="mb-4">
                        <v-card-title class="text-h6 font-weight-bold text-warning">
                          <v-icon left>mdi-alert-circle</v-icon> Skills To Learn
                        </v-card-title>
                        <v-card-text>
                          <v-chip
                            v-for="skill in skillsToLearn"
                            :key="skill.name"
                            class="ma-1"
                            color="warning"
                            label
                          >
                            <v-icon start>mdi-school</v-icon>
                            {{ skill.name }}
                          </v-chip>
                          <p v-if="skillsToLearn.length === 0" class="text-grey-darken-1">
                            You have all the required skills for this job!
                          </p>
                        </v-card-text>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-window-item>

                <v-window-item value="learning">
                  <h2 class="text-h5 font-weight-bold mb-4">Learning Roadmap</h2>
                  <div v-if="skillsToLearn.length === 0">
                    <v-alert type="success" variant="tonal" class="mb-4">
                      You already have all the skills for this role! No learning resources needed.
                    </v-alert>
                  </div>
                  <v-expansion-panels v-else>
                    <v-expansion-panel
                      v-for="skill in skillsToLearn"
                      :key="skill.name"
                      class="mb-4"
                    >
                      <v-expansion-panel-title>
                        <v-icon start color="warning">mdi-school</v-icon>
                        <span class="font-weight-bold">{{ skill.name }}</span>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          variant="tonal"
                          size="small"
                          @click.stop="openAssessmentDialog(skill.name)"
                        >
                          Assess Skill
                        </v-btn>
                      </v-expansion-panel-title>
                      <v-expansion-panel-text>
                        <h3 class="text-subtitle-1 font-weight-bold mb-2">Learning Resources:</h3>
                        <div v-if="skill.resources && skill.resources.length > 0">
                          <v-row>
                            <v-col
                              v-for="resource in skill.resources"
                              :key="resource.id"
                              cols="12"
                              md="4"
                            >
                              <v-card class="pa-2" outlined>
                                <a :href="resource.url" target="_blank" rel="noopener noreferrer">
                                  <v-img :src="resource.thumbnail" height="150px" cover></v-img>
                                </a>
                                <v-card-title class="text-subtitle-2 pt-2 pb-0">
                                  <a :href="resource.url" target="_blank" rel="noopener noreferrer" class="text-decoration-none text-primary">
                                    {{ resource.title }}
                                  </a>
                                </v-card-title>
                                <v-card-subtitle class="pb-2">
                                  {{ resource.type }} - {{ resource.difficulty }}
                                </v-card-subtitle>
                              </v-card>
                            </v-col>
                          </v-row>
                        </div>
                        <div v-else>
                          <v-alert type="info" variant="tonal" class="mt-2">
                            No learning resources found for {{ skill.name }} at the moment.
                          </v-alert>
                        </div>
                      </v-expansion-panel-text>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-window-item>
              </v-window>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <v-dialog v-model="assessmentDialog" max-width="800">
      <v-card>
        <v-card-title class="text-h5 text-primary">Assess Your {{ assessmentSkill }} Skills</v-card-title>
        <v-card-text v-if="isAssessing">
          <v-row justify="center">
            <v-col cols="12" class="text-center py-8">
              <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
              <p class="mt-4 text-h6 text-grey-darken-1">Generating assessment questions...</p>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text v-else-if="assessmentQuestions.length > 0">
          <h3 class="text-h6 mb-4">Question {{ currentQuestionIndex + 1 }} of {{ assessmentQuestions.length }}</h3>
          <p class="text-body-1 font-weight-medium mb-4">{{ assessmentQuestions[currentQuestionIndex].question }}</p>
          <v-radio-group v-model="selectedAnswer" hide-details>
            <v-radio
              v-for="(option, i) in assessmentQuestions[currentQuestionIndex].options"
              :key="i"
              :label="option"
              :value="option"
              class="mb-2"
            ></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-text v-else>
          <v-alert type="info" variant="tonal">
            Could not generate an assessment for {{ assessmentSkill }} at this time. Please try again later.
          </v-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey" variant="text" @click="closeAssessmentDialog" :disabled="isAssessing">Close</v-btn>
          <v-btn
            color="primary"
            @click="submitAnswer"
            :disabled="!selectedAnswer || isAssessing || assessmentQuestions.length === 0"
            v-if="currentQuestionIndex < assessmentQuestions.length - 1"
          >
            Next Question
          </v-btn>
          <v-btn
            color="success"
            @click="submitAnswer"
            :disabled="!selectedAnswer || isAssessing || assessmentQuestions.length === 0"
            v-else-if="assessmentQuestions.length > 0"
          >
            View Results
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="resultsDialog" max-width="600" persistent>
      <v-card>
        <v-card-title class="text-h5 text-primary">Assessment Results for {{ assessmentSkill }}</v-card-title>
        <v-card-text class="text-center pa-6">
          <v-progress-circular
            :model-value="(correctAnswers / assessmentQuestions.length) * 100"
            :color="resultColor"
            size="120"
            width="15"
            class="mb-6"
          >
            <span class="text-h5 font-weight-bold">{{ Math.round((correctAnswers / assessmentQuestions.length) * 100) }}%</span>
          </v-progress-circular>
          <p class="text-h6 mb-2">You answered {{ correctAnswers }} out of {{ assessmentQuestions.length }} questions correctly!</p>
          <v-alert :type="resultType" variant="tonal" class="mt-4">
            {{ resultMessage }}
          </v-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="closeResultsDialog">Got It!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="assessmentDialog" max-width="800" persistent>
  <v-card>
    <v-card-title class="d-flex align-center text-h5 text-primary">
      Assess Your {{ assessmentSkill }} Skills
      <v-spacer></v-spacer>
      <v-btn icon="mdi-close" variant="text" @click="closeAssessmentDialog"></v-btn>
    </v-card-title>
    <v-card-text v-if="isAssessing">
      <v-row justify="center">
        <v-col cols="12" class="text-center py-8">
          <v-progress-circular indeterminate color="primary" size="64"></v-progress-circular>
          <p class="mt-4 text-h6 text-grey-darken-1">Generating assessment with AI...</p>
        </v-col>
      </v-row>
    </v-card-text>
    
    <v-card-text v-else-if="assessmentQuestions.length > 0">
      <h3 class="text-h6 mb-4">Question {{ currentQuestionIndex + 1 }} of {{ assessmentQuestions.length }}</h3>
      <p class="text-body-1 font-weight-medium mb-4">{{ assessmentQuestions[currentQuestionIndex].question }}</p>
      <v-radio-group v-model="selectedAnswer" hide-details>
        <v-radio
          v-for="(option, i) in assessmentQuestions[currentQuestionIndex].options"
          :key="i"
          :label="option"
          :value="option"
          class="mb-2"
        ></v-radio>
      </v-radio-group>
    </v-card-text>

    <v-card-text v-else>
      <v-alert type="error" variant="tonal">
        The AI could not generate an assessment for {{ assessmentSkill }} at this time. Please try again later.
      </v-alert>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="grey" variant="text" @click="closeAssessmentDialog" :disabled="isAssessing">Cancel</v-btn>
      <v-btn
        color="primary"
        @click="submitAnswer"
        :disabled="!selectedAnswer || isAssessing || assessmentQuestions.length === 0"
        v-if="currentQuestionIndex < assessmentQuestions.length - 1"
      >
        Next Question
      </v-btn>
      <v-btn
        color="success"
        @click="submitAnswer"
        :disabled="!selectedAnswer || isAssessing || assessmentQuestions.length === 0"
        v-else-if="assessmentQuestions.length > 0"
      >
        View Results
      </v-btn>
    </v-card-actions>
  </v-card>
</v-dialog>

    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :timeout="3000"
      bottom
      right
    >
      {{ snackbar.text }}
      <template v-slot:actions>
        <v-btn color="white" variant="text" @click="snackbar.show = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import api from '@/services/api';
import { useAuthStore } from '@/stores/authStore';

export default {
  name: 'SkillAnalysis',
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      // Step 1: State for choosing a job
      isLoadingTitles: true,
      appliedJobTitles: [],
      selectedJobTitle: null,
      
      // Step 2: State for showing analysis
      isLoadingAnalysis: false,
      analysisComplete: false,
      error: null,
      
      skillsYouHave: [],
      skillsToLearn: [],
      currentTab: 'skills',
      
      // Assessment state
      isAssessing: false,
      assessmentSkill: null,
      assessmentDialog: false,
      resultsDialog: false,
      assessmentQuestions: [],
      currentQuestionIndex: 0,
      selectedAnswer: null,
      correctAnswers: 0,
      
      // Snackbar state
      snackbar: { show: false, text: '', color: 'success' },
    };
  },
  computed: {
    allSkills() {
      return [...this.skillsYouHave.map(s => s.name), ...this.skillsToLearn.map(s => s.name)];
    },
    overallProgress() {
      if (this.allSkills.length === 0) return 0;
      const completedSkillsCount = this.skillsYouHave.length;
      return (completedSkillsCount / this.allSkills.length) * 100;
    },
    resultColor() {
      const score = (this.correctAnswers / this.assessmentQuestions.length) * 100;
      if (score >= 75) return 'success';
      if (score >= 50) return 'warning';
      return 'error';
    },
    resultType() {
      const score = (this.correctAnswers / this.assessmentQuestions.length) * 100;
      if (score >= 75) return 'success';
      if (score >= 50) return 'warning';
      return 'error';
    },
    resultMessage() {
      const score = (this.correctAnswers / this.assessmentQuestions.length) * 100;
      if (score >= 75) {
        return 'Excellent! You have a strong understanding of this skill.';
      } else if (score >= 50) {
        return 'Good effort! You have some knowledge, but there is room for improvement.';
      } else {
        return 'Keep learning! Review the resources to strengthen your understanding.';
      }
    }
  },
  async created() {
    await this.fetchAppliedJobTitles();
  },
  methods: {
    async fetchAppliedJobTitles() {
      this.isLoadingTitles = true;
      this.error = null;
      try {
        const response = await api.get('/user/applied-job-titles');
        this.appliedJobTitles = response.data;
        if (this.appliedJobTitles.length === 0) {
          throw new Error('Apply for a job first to get a personalized skill analysis.');
        }
      } catch (err) {
        this.error = err.response?.data?.message || err.message;
      } finally {
        this.isLoadingTitles = false;
      }
    },
    async fetchSkillAnalysis() {
      if (!this.selectedJobTitle) return;
      this.isLoadingAnalysis = true;
      this.error = null;
      try {
        const response = await api.post('/skills/analyze', { jobTitle: this.selectedJobTitle });
        const { skillsYouHave, skillsToLearn } = response.data;
        this.skillsYouHave = skillsYouHave;
        this.skillsToLearn = skillsToLearn;
        this.analysisComplete = true;
      } catch (err) {
        this.showSnackbar(err.response?.data?.message || err.message, 'error');
        this.error = err.response?.data?.message || err.message;
        this.analysisComplete = false;
      } finally {
        this.isLoadingAnalysis = false;
      }
    },
    async openAssessmentDialog(skillName) {
      this.assessmentSkill = skillName;
      this.assessmentDialog = true;
      this.isAssessing = true;
      this.assessmentQuestions = [];
      this.currentQuestionIndex = 0;
      this.selectedAnswer = null;
      this.correctAnswers = 0;

      this.showSnackbar(`Generating assessment for ${this.assessmentSkill}...`, 'info');
      try {
        const response = await api.get('/skills/assessment', {
          params: { skill: this.assessmentSkill, jobTitle: this.selectedJobTitle }
        });
        this.assessmentQuestions = response.data;
        if (this.assessmentQuestions.length === 0) {
           this.showSnackbar(`No assessment questions found for ${this.assessmentSkill}.`, 'warning');
           this.closeAssessmentDialog(); // Close if no questions
        }
      } catch (error) {
        this.showSnackbar(error.response?.data?.message || 'Could not generate assessment.', 'error');
        this.closeAssessmentDialog(); // Close on error
      } finally {
        this.isAssessing = false;
      }
    },
    submitAnswer() {
      if (!this.selectedAnswer) {
        this.showSnackbar('Please select an answer.', 'warning');
        return;
      }

      const currentQuestion = this.assessmentQuestions[this.currentQuestionIndex];
      if (this.selectedAnswer === currentQuestion.correctAnswer) {
        this.correctAnswers++;
      }

      if (this.currentQuestionIndex < this.assessmentQuestions.length - 1) {
        this.currentQuestionIndex++;
        this.selectedAnswer = null; // Reset for next question
      } else {
        // End of assessment
        this.assessmentDialog = false;
        this.resultsDialog = true;
      }
    },
    closeAssessmentDialog() {
      this.assessmentDialog = false;
      this.resetAssessment();
    },
    closeResultsDialog() {
      this.resultsDialog = false;
      this.resetAssessment();
    },
    resetAssessment() {
      this.assessmentSkill = null;
      this.assessmentQuestions = [];
      this.currentQuestionIndex = 0;
      this.selectedAnswer = null;
      this.correctAnswers = 0;
      this.isAssessing = false;
    },
    showSnackbar(text, color = 'success') {
      this.snackbar.text = text;
      this.snackbar.color = color;
      this.snackbar.show = true;
    }
  }
}
</script>

