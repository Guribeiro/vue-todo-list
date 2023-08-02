<script lang="ts">
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
import { github } from '@/api/github';
import { errorHandler } from '@/shared/services/errorHandler'
import ButtonPrimary from '@/shared/components/Button.vue';
import BaseInput from '@/shared/components/BaseInput.vue';
import EmptyIndicator from '@/shared/components/EmptyIndicator.vue';
import Toast, { type IToastProps } from '@/shared/components/Toast.vue';

export default {
  name: 'home-view',
  components: {
    ButtonPrimary,
    BaseInput,
    EmptyIndicator,
    Toast
  },
  setup() {
    const username = ref('')
    const user = ref<User | undefined>();
    const loading = ref(false);
    const toast = ref<IToastProps | undefined>();

    return {
      username,
      loading,
      user,
      toast,
      async handleSearchGithubUser(event: Event) {
        try {
          loading.value = true
          event.preventDefault()

          if (!username.value.length) {
            user.value = undefined
            return;
          }

          if (username.value.length > 60) {
            window.alert(`Todo username is too long`)
            return
          }

          const { data } = await github.get(`/${username.value}`)

          user.value = data;
        } catch (error) {
          const message = errorHandler(error)
          user.value = undefined;
          toast.value = {
            title: 'Error',
            type: 'error',
            description: message,
          }
          setTimeout(() => toast.value = undefined, 1000)
        } finally {
          loading.value = false
        }
      },
      handleCloseToast(){
        toast.value = undefined
      }
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
        <BaseInput id="title" placeholder="Ex: Guribeiro" v-model="username" />
        <ButtonPrimary v-show="!loading" class="submit-button" text="Search" />
      </form>

      <section>
        <h1 v-if="loading">Loading...</h1>
        <Transition v-else-if="user" name="empty-indicator" appear>
          <article class="card">
            <img :src="user.avatar_url" :alt="user.name">
            <article class="user-details">
              <h2>{{ user.name }}</h2>
              <h4 v-show="user.twitter_username">@{{ user.twitter_username }}</h4>
              <p>{{ user.bio }}</p>
            </article>
            <article class="follows">
              <span>{{ user.followers }} followers</span>
              <span> · </span>
              <span>{{ user.following }} following</span>
            </article>
            <article>
              <p>{{ user.company }}</p>
              <p>{{ user.location }}</p>
              <a :href="user.blog" target="_blank">{{ user.blog }}</a>
            </article>
          </article>
        </Transition>

        <Transition v-else name="empty-indicator" appear>
          <EmptyIndicator title="Search for a github user..." subTitle="Fill the box above to find who you're looking for"
            imgSrc="../../../shared/assets/Clipboard.svg" />
        </Transition>
      </section>
    </article>
    <Transition name="toast">
      <Toast v-if="toast" :toast="toast" :onClose="handleCloseToast" />
    </Transition>
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

.container {
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

.card {
  border: 1px solid var(--vt-c-divider-dark-2);
  text-align: center;
  padding: 2rem;
  border-radius: .8rem;
}

.card>img {
  width: 9rem;
  border-radius: 4.5rem;
}

.user-details {
  margin-bottom: 1rem;
}

.follows span {
  font-size: .8rem;
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

.empty-indicator-enter-from {
  opacity: 0;
  transform: scale(.6);
}

.empty-indicator-enter-to {
  opacity: 1;
  transform: scale(1);
}

.empty-indicator-enter-active {
  transition: all .4s ease;
}

.empty-indicator-leave-from {
  opacity: 1;
  transform: scale(1);
}

.empty-indicator-leave-to {
  opacity: 0;
  transform: translateX(15px);
}

.empty-indicator-leave-active {
  transition: all .1s ease;
  position: absolute;
}
.toast-enter-from {
  opacity: 0;
  transform: translateY(4rem);
}

.toast-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.toast-enter-active {
  transition: all .3s ease;
}
.toast-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(4rem);
}

.toast-leave-active {
  transition: all .3s ease;
}
</style>