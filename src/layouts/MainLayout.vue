<template>
  <q-layout view="hHh lpR fff">
    <AppHeader></AppHeader>
    <router-view />
    <AppFooter></AppFooter>
  </q-layout>
</template>

<script>
import AppHeader from 'components/AppHeader.vue'
import AppFooter from 'components/AppFooter.vue'

export default {
  components: {
    AppHeader,
    AppFooter
  }
}
</script>
