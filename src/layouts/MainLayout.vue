<template>
  <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
    <q-header elevated>
      <q-toolbar>
        <q-avatar>
          <img alt="logo imagen" src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
        </q-avatar>

        <q-toolbar-title>
          Films App
        </q-toolbar-title>

        <q-btn flat dense @click="goGithub">Desarrollado por Renzo Rojas (@renzorh98) </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',


  setup () {
    const goGithub = () => {
      window.open('https://github.com/renzorh98/films-project.git');
    }

    return {
      goGithub
    }
  }
})
</script>
