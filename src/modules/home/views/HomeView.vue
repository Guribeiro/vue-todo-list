<script lang="ts">
import { ref } from 'vue';
import githubUserFinderLogo from '../../github-user-finder/assets/logo.png';
import todoListLogo from '../../todo-list/assets/Logo.svg';

interface Link {
  path: string;
  img: string;
}

export default {
  name: 'home-view',
  setup() {
    const items = ref<Link[]>([
      {
        path: '/github-user-finder',
        img: githubUserFinderLogo
      },
      {
        path: '/todo-list',
        img: todoListLogo
      },
    ]);

    return {
      items,
    }
  }

}
</script>

<template>
  <main>
    <section>
      <RouterLink :key="item.path" v-for="item in items" class="card" :to="item.path">
          <img :src="item.img" :alt="item.path">
      </RouterLink>
    </section>
  </main>
</template>

<style scoped>
main {
  min-height: 100vh;
  display: flex;
  align-items: center;
}

section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 980px;
  margin: 0 auto;
}

.card {
  border-radius: 1rem;
  padding: 2rem;
  margin: 1rem;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all .3s ease;
}

.card:hover {
  background: rgba(201, 201, 201, 0.2);

}
</style>