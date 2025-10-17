import { createRouter, createWebHistory } from 'vue-router';


import Auth from '../views/Auth.vue'; 

const routes = [
  
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'), 
    meta: { title: 'Dashboard', requiresAuth: true }
  },
  {
    path: '/jobs',
    name: 'JobDiscovery',
    component: () => import('../views/JobDiscovery.vue'),
    meta: { title: 'Job Discovery', requiresAuth: true }
  },
  {
    path: '/skills',
    name: 'SkillAnalysis',
    component: () => import('../views/SkillAnalysis.vue'),
    meta: { title: 'Skills & Learning', requiresAuth: true }
  },
  {
    path: '/interview',
    name: 'MockInterview',
    component: () => import('../views/MockInterview.vue'),
    meta: { title: 'Mock Interview & GD', requiresAuth: true }
  },
  {
    path: '/resume',
    name: 'ResumeOptimization',
    component: () => import('../views/ResumeOptimization.vue'),
    meta: { title: 'Resume Optimization', requiresAuth: true }
  },


  
  {
    path: '/auth', 
    name: 'Auth',
    component: Auth,
    meta: { title: 'Login or Sign Up' }
  },
  
  {
    path: '/login',
    redirect: '/auth'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const user = localStorage.getItem('user');

  if (requiresAuth && !user) {
  
    next('/auth');
  } else if (to.name === 'Auth' && user) {
  
    next('/');
  } else {
    
    next();
  }
});

export default router;