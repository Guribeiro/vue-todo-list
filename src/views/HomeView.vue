<script lang="ts">
import { reactive } from 'vue';
import ButtonPrimary from '../components/Button.vue';

interface LoginForm {
  username: string | null;
  password: string | null
}

export default {
  name: 'Home-',
  components: {
    ButtonPrimary,
  },
  setup() {
    const form = reactive<LoginForm>({
      username: null,
      password: null,
    })

    return form
  },

  methods: {
    onSubmit() {
      console.log({
        username: this.username,
        password: this.password
      })
    }
  }
}
</script>

<template>
  <main>
    <h1>Formulário de login</h1>
    <form @submit.prevent="onSubmit">
      <label for="username">
        username
      </label>
      <input id="username" v-model="username" type="text">
      <label for="password">
        password
      </label>
      <input id="password" v-model="password" type="password" >
      <ButtonPrimary class="submit-button" text="Enviar" />
    </form>

  </main>
</template>

<style scoped>
main {
  max-width: 460px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
}

h1 {
  text-align: center;
  margin-bottom: 1rem;
  font-weight: 500;
}


label {
  display: block;
  padding: 4px 0;
}

input {
  display: block;
  width: 100%;

  padding: 12px;
  border-radius: 4px;

  border: none;
}

input + label {
  margin-top: .4rem;
}

.submit-button {
  margin-top: 1rem;
}
</style>