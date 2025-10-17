<template>
  <v-app>
    <template v-if="authStore.isLoggedIn">
      <v-navigation-drawer
        v-model="drawer"
        app
        color="primary"
        dark
        :permanent="$vuetify.display.mdAndUp"
      >
        <v-list-item class="px-2 py-4">
          <v-list-item-title class="text-h5 font-weight-bold">
            <v-icon size="32" class="mr-2">mdi-rocket-launch</v-icon>
            PlacementPilot
          </v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense nav>
          <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            :to="item.route"
            :prepend-icon="item.icon"
            :title="item.title"
            class="my-1"
          ></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-app-bar app elevation="2" color="white">
        <v-app-bar-nav-icon
          @click="drawer = !drawer"
          v-if="$vuetify.display.smAndDown"
        ></v-app-bar-nav-icon>

        <v-toolbar-title class="text-primary font-weight-bold">
          {{ currentPageTitle }}
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props" class="mr-2">
              <v-avatar color="primary" size="36">
                <span class="white--text text-h6">{{ authStore.user?.name?.charAt(0).toUpperCase() }}</span>
              </v-avatar>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title class="font-weight-bold">{{ authStore.user?.name }}</v-list-item-title>
              <v-list-item-subtitle>{{ authStore.user?.email }}</v-list-item-subtitle>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item @click="authStore.logout">
              <template v-slot:prepend>
                <v-icon>mdi-logout</v-icon>
              </template>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-app-bar>
    </template>
    
    <v-main :class="{ 'bg-grey-lighten-4': authStore.isLoggedIn }">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<script>
import { useAuthStore } from '@/stores/authStore';

export default {
  name: 'App',
  setup() {
    const authStore = useAuthStore();
    return { authStore };
  },
  data() {
    return {
      drawer: true,
      menuItems: [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', route: '/' },
        { title: 'Job Discovery', icon: 'mdi-briefcase-search', route: '/jobs' },
        { title: 'Skills & Learning', icon: 'mdi-school', route: '/skills' },
        { title: 'Interview Questions', icon: 'mdi-microphone', route: '/interview' },
        { title: 'Resume', icon: 'mdi-file-document-edit', route: '/resume' }
      ]
    }
  },
  computed: {
    currentPageTitle() {
      return this.$route.meta.title || 'PlacementPilot'
    }
  }
}
</script>

