<script lang="ts">
import { useRoute } from 'vue-router';

export default {
  computed: {
    currentRouteName() {
      const route = useRoute()
      return route
    }
  }
}
</script>

<template>
  <nav>
    <RouterLink v-if="currentRouteName.path !== '/'" to="/">Go to home</RouterLink>
  </nav>
  <main>
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
</template>

<style scoped>
nav {
  padding: 16px;
  position: absolute;
}

a {
  color: var(--vt-c-text-dark-1);
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  transition: all .3s ease;
}

a:hover {
  color: var(--vt-c-text-dark-2)
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
