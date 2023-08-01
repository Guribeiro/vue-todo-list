<script lang="ts">
import { github } from '@/api/github';

export interface User {
  id: string;
  login: string;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  bio: string;
  twitter_username: string;
  public_repos: string;
  public_gists: string;
  followers: string;
  following: string;
  created_at: string;
  avatar_url: string;
  html_url: string;
  followers_url: string
  following_url: string
  repos_url: string
}

import { ref } from 'vue';
import ButtonPrimary from '@/shared/components/Button.vue';
import BaseInput from '@/shared/components/BaseInput.vue';
import EmptyIndicator from '@/shared/components/EmptyIndicator.vue';

export default {
  name: 'home-view',
  components: {
    ButtonPrimary,
    BaseInput,
    EmptyIndicator
  },
  setup() {
    const username = ref('')
    const user = ref<User | undefined>();
    const loading = ref(false)

    return {
      username,
      loading,
      user,
      async handleSearchGithubUser(event: Event) {
        try {
          loading.value = true
          event.preventDefault()

          if (!username.value.length) return;

          if (username.value.length > 60) {
            window.alert(`Todo username is too long`)
            return
          }

          console.log(username.value)

          const { data } = await github.get(`/${username.value}`)

          // username.value = ''
          user.value = data;
        } catch (error) {
          console.log(error)
          window.alert('algo deu errado')
        } finally {
          loading.value = false
        }
      },

    }
  },
}
</script>

<template>
  <main>
    <header>
      <img src="../assets/logo.png" alt="github logo">
    </header>
    <article class="container">
      <form @submit.prevent="handleSearchGithubUser">
        <BaseInput id="title" placeholder="github/{username}" v-model="username" />
        <ButtonPrimary v-show="!loading" class="submit-button" text="Add"/>
      </form>

      <section>
        <article v-if="user">
          <p>{{ user.id }}</p>
        </article>

        <EmptyIndicator v-else title="Search for a github user..." subTitle="Add some tasks to your todo list" imgSrc="../../../shared/assets/Clipboard.svg" />
      </section>
    </article>
  </main>
</template>

<style scoped>
main {
  background-color: var(--vt-c-divider-light-2);
  min-height: 100vh;
}

header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 12.5rem;
  background-color: var(--color-background);
}

article.container {
  max-width: 680px;
  margin: 0 auto;
  padding: 0 1rem;
}

form {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -1.5rem;
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 500;
}

section {
  margin-top: 3.4rem;
}

.todos-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.todos-list-header p {
  color: #8284FA;
  font-weight: 500;
}

.todos-list-header span {
  padding: .2rem .4rem;
  font-size: .8rem;
  background-color: var(--vt-c-divider-dark-1);
  border-radius: .4rem;
  color: var(--vt-c-white);
}

h3 {
  margin-bottom: .4rem;
  color: #FFF;
  font-size: 1.6rem;
  font-weight: 500;
}

.submit-button {
  margin-left: .6rem;
}
</style>